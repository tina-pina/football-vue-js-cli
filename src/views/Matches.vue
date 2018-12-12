<template>
  <div class="matches">
    <h1 class="m-5 font-weight-bold">Matches</h1>
    <div class="container p-4">
      <div class="row d-flex justify-content-between">
        <!-- <p class="col-12" style="font-weight: bold">1</p> -->
        <div class="mb-3 col-6">
          <!-- create dropdown from sorted teams array -->
          <b-form-select v-model="selected1">
            <option :value="null">select home team first</option>
            <option
              v-for="(team, index) in homeTeamArr"
              :key="index"
              :value="team.id"
            >{{ team.name }}</option>
          </b-form-select>
          <img v-if="showSelected" :src="teamIdLogosDict[selected1]" alt>
        </div>

        <div class="mb-3 col-6">
          <b-form-select v-model="selected2">
            <option :value="null">select away team first</option>
            <option
              v-for="(team, index) in awayTeamArr"
              :key="index"
              :value="team.id"
            >{{ team.name }}</option>
          </b-form-select>

          <img v-if="showSelected" :src="teamIdLogosDict[selected2]" alt>
        </div>
      </div>
      <div class="d-flex flex-row justify-content-start">
        <!-- <p style="font-weight: bold">2</p> -->
        <div>
          <button
            type="button1"
            class="btn btn-success m-2"
            @click="teamUpdateScheduled($event)"
          >upcoming matches</button>
        </div>

        <div>
          <button
            type="button2"
            class="btn btn-success m-2"
            @click="teamUpdateFinished($event)"
          >finished matches</button>
        </div>
      </div>
      <div class="d-flex justify-content-start">
        <!-- <p style="font-weight: bold">3</p> -->
        <button
          type="button3"
          class="btn btn-info m-2"
          @click="teamUpdateAll($event)"
        >all matches & teams</button>
      </div>

      <!-- scheduled matches -->
      <div class="row" v-if="scheduled && !finished && !all">
        <div class="d-flex justify-content-center col-12">
          <h4 class="p-4">Upcoming matches</h4>
        </div>
        <div
          class="d-flex col-12 justify-content-around"
          v-for="(m, index) in scheduledMatches"
          :key="m.id"
        >
          <Match v-bind:match="m" :logo="teamIdLogosDict" v-bind:isFinished="false"/>
        </div>
      </div>

      <!-- finished -->
      <div class="row" v-if="finished && !scheduled && !all">
        <div class="d-flex justify-content-center col-12">
          <h4 class="p-4">Finished matches</h4>
        </div>
        <div
          class="d-flex col-12 justify-content-around"
          v-for="(m, index) in finishedMatches"
          :key="m.id"
        >
          <Match v-bind:match="m" :logo="teamIdLogosDict" v-bind:isFinished="true"/>
        </div>
      </div>
      <!-- all -->
      <div class="all" v-if="all && !scheduled && !finished">
        <div class="row">
          <div class="d-flex justify-content-center col-12">
            <h4 class="p-4">Upcoming matches</h4>
          </div>
          <div
            class="d-flex col-12 justify-content-around"
            v-for="(m, index) in scheduledMatches"
            :key="m.id"
          >
            <Match v-bind:match="m" :logo="teamIdLogosDict" v-bind:isFinished="false"/>
          </div>
        </div>
        <div class="row">
          <div class="d-flex justify-content-center col-12">
            <h4 class="p-4">Finished matches</h4>
          </div>
          <div
            class="d-flex col-12 justify-content-around"
            v-for="(m, index) in finishedMatches"
            :key="m.id"
          >
            <Match v-bind:match="m" :logo="teamIdLogosDict" v-bind:isFinished="true"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Match from "@/components/Match.vue";
export default {
  name: "Matches",
  components: {
    Match
  },
  data() {
    return {
      allTeams: this.$route.params.teams,
      selected1: null,
      selected2: null,

      scheduledMatches: [],
      scheduledOriginalMatches: [],

      finishedMatches: [],
      finishedOriginalMatches: [],
      homeTeamArr: [],
      awayTeamArr: [],
      teamIdLogosDict: {},
      showMatch: true,
      showSelected: false,
      finished: null,
      scheduled: null,
      all: null,
      notFinished: null
    };
  },
  methods: {
    // getURL: function(key) {
    //   let objKey = key;
    //   return this.teamNameLogoDict[objKey];
    // },
    teamUpdateScheduled: function(event) {
      //is only giving us one team
      this.finished = false;
      this.all = false;
      this.scheduled = true;

      //filter for scheduled matches
      let filteredMembersIdScheduled = this.scheduledOriginalMatches.filter(
        match => {
          return (
            match.homeTeam.id === this.selected1 ||
            match.awayTeam.id === this.selected2
          );
        }
      );
      this.scheduledMatches = filteredMembersIdScheduled;
      // console.log(this.scheduledMatches);
      //filter for finished matches
    },
    teamUpdateFinished: function(event) {
      this.finished = true;
      this.all = false;
      this.scheduled = false;

      let filteredMembersIdFinished = this.finishedOriginalMatches.filter(
        match => {
          return (
            match.homeTeam.id === this.selected1 ||
            match.awayTeam.id === this.selected2
          );
        }
      );
      this.finishedMatches = filteredMembersIdFinished;
    },
    teamUpdateAll: function(event) {
      this.all = true;
      this.scheduled = false;
      this.finished = false;
      this.scheduledMatches = this.scheduledOriginalMatches;
      this.finishedMatches = this.finishedOriginalMatches;
      // console.log(this.finishedMatches);
    }
  },

  created() {
    let baseURL = "https://api.football-data.org/v2/competitions/CL/matches/";
    let scheduledParam = "?status=SCHEDULED";
    let finishedParam = "?status=FINISHED";
    let header = { "X-Auth-Token": "a43af3a65b2b477c979e6b354684816b" };

    fetch(baseURL + scheduledParam, { headers: header })
      .then(response => {
        if (response.ok) {
          console.log("Scheduled Request succeeded: " + response.statusText);
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(json => {
        // console.log(json);
        let sortedMatches = json.matches.sort(function(a, b) {
          return new Date(b.utcDate) - new Date(a.utcDate);
        });
        this.scheduledMatches = sortedMatches;
        // console.log("scheduled match count", sortedMatches.length);
        this.scheduledOriginalMatches = sortedMatches;
        // console.log(this.scheduledOriginalMatches);
        // Create unique home & away team array
        let homeTeamArr = [];
        let awayTeamArr = [];
        for (let match of this.scheduledOriginalMatches) {
          let homeTeamName = match.homeTeam.name;
          if (!homeTeamArr.map(o => o.name).includes(homeTeamName)) {
            homeTeamArr.push(match.homeTeam);
          }
          let awayTeamName = match.awayTeam.name;
          if (!awayTeamArr.map(o => o.name).includes(awayTeamName)) {
            awayTeamArr.push(match.awayTeam);
          }
        }

        this.homeTeamArr = homeTeamArr.sort((a, b) => {
          let teamA = a.name.toLowerCase();
          let teamB = b.name.toLowerCase();
          return teamA < teamB ? -1 : teamA > teamB ? 1 : 0;
        });
        this.awayTeamArr = awayTeamArr.sort((a, b) => {
          let teamA = a.name.toLowerCase();
          let teamB = b.name.toLowerCase();
          return teamA < teamB ? -1 : teamA > teamB ? 1 : 0;
        });
        // Create logo array
        let teams = this.allTeams;
        for (let team of teams) {
          this.teamIdLogosDict[team.id] = team.crestUrl;
        }
      })
      .catch(error => {
        console.log("Request failed: " + error.message);
      });

    fetch(baseURL + finishedParam, { headers: header })
      .then(response => {
        if (response.ok) {
          console.log("Finished Request succeeded: " + response.statusText);
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(json => {
        let sortedMatches = json.matches.sort(function(a, b) {
          return new Date(b.utcDate) - new Date(a.utcDate);
        });
        this.finishedMatches = sortedMatches;
        // console.log("finished match count", sortedMatches.length);
        this.finishedOriginalMatches = sortedMatches;
      });
  }
};
</script>


<style scoped>
img {
  height: 100px;
  width: 100px;
}

p {
  margin: 0;
  padding: 0;
}

h1 {
  color: firebrick;
  font-size: 60px;
}

.container {
  background-color: rgba(255, 255, 255, 0.7);
  color: darkblue;
}

.card {
  background-color: rgba(255, 255, 255, 0.7);
}

.container p {
  color: black;
  font-weight: bold;
}
</style>


