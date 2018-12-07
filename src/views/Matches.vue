<template>
  <div class="matches">
    <h1 class="m-5 font-weight-bold">Matches</h1>
    <div class="container">
      <div class="row">
        <div class="mb-3 col-6">
          <!-- create dropdown from sorted teams array -->
          <b-form-select v-model="selected1">
            <option :value="null">select a team</option>
            <!-- <option v-for="(team, index) in allTeams" :key="index" :value="team.id">{{ team.name }}</option> -->
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
            <option :value="null">select a team</option>
            <option
              v-for="(team, index) in awayTeamArr"
              :key="index"
              :value="team.id"
            >{{ team.name }}</option>
          </b-form-select>

          <img v-if="showSelected" :src="teamIdLogosDict[selected2]" alt>
          <!-- show all matches -->
        </div>
      </div>

      <button @click="teamUpdate($event)">Find matches</button>
      <div class="row">
        <div class="d-flex col-12 justify-content-around" v-for="(m, index) in matches" :key="m.id">
          <div class="home col-6">
            <p>{{ m.homeTeam.name }}</p>
            <img :src="teamIdLogosDict[m.homeTeam.id]" alt>
          </div>
          <div class="away col-6">
            <img :src="teamIdLogosDict[m.awayTeam.id]" alt>
          </div>
        </div>

        <!-- <div
          class="away d-flex flex-column col-6"
          v-for="(m, index) in matches"
          :key="m.id + 10000000"
        >
          <div>
            <p>{{ m.awayTeam.name }}</p>
          </div>
          <div>
            <img :src="getURL(m.awayTeam.name)" alt>
          </div>
        </div>-->
      </div>
    </div>
  </div>
</template>


<script>
import Team from "@/components/Team.vue";
export default {
  name: "Matches",
  components: {
    Team
  },
  data() {
    return {
      allTeams: this.$route.params.teams,
      selected1: null,
      selected2: null,
      matches: [],
      originalMatches: [],
      homeTeamArr: [],
      awayTeamArr: [],
      teamIdLogosDict: {},
      // teamNameLogoDict: {},
      showMatch: true,
      showSelected: false
    };
  },
  computed: {},
  methods: {
    // getURL: function(key) {
    //   let objKey = key;
    //   return this.teamNameLogoDict[objKey];
    // },
    teamUpdate: function(event) {
      //is only giving us one team
      if (!this.selected1 || !this.selected2) return this.originalMatches;
      let filteredMembersId = this.originalMatches.filter(match => {
        return (
          match.homeTeam.id === this.selected1 ||
          match.awayTeam.id === this.selected2
        );
      });
      this.matches = filteredMembersId;
      console.log(this.matches);
    }
  },

  created() {
    let url =
      "https://api.football-data.org/v2/competitions/CL/matches/?status=SCHEDULED";
    let header = { "X-Auth-Token": "a43af3a65b2b477c979e6b354684816b" };

    fetch(url, { headers: header })
      .then(response => {
        if (response.ok) {
          console.log("Request succeeded: " + response.statusText);
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(json => {
        this.matches = json.matches;
        this.originalMatches = json.matches;

        // Create unique home & away team array
        let homeTeamArr = [];
        let awayTeamArr = [];
        for (let match of this.originalMatches) {
          let homeTeamName = match.homeTeam.name;
          if (!homeTeamArr.map(o => o.name).includes(homeTeamName)) {
            homeTeamArr.push(match.homeTeam);
          }
          let awayTeamName = match.awayTeam.name;

          if (!awayTeamArr.map(o => o.name).includes(awayTeamName)) {
            awayTeamArr.push(match.awayTeam);
          }
        }

        // Sort home & away team array
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
          // this.teamNameLogoDict[team.name] = team.crestUrl;
        }

        console.log(this.teamLogosDict);
        console.log(this.teamNameLogoDict);
      })
      .catch(error => {
        console.log("Request failed: " + error.message);
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


