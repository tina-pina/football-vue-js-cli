<template>
  <div class="matches">
    <h1 class="m-5 font-weight-bold">Matches</h1>
    <div class="container p-4">
      <div class="row d-flex justify-content-between">
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
import Match from '@/components/Match.vue'
export default {
  name: 'Matches',
  components: {
    Match
  },
  data () {
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
    }
  },
  methods: {
    // getURL: function(key) {
    //   let objKey = key;
    //   return this.teamNameLogoDict[objKey];
    // },
    teamUpdateScheduled: function (event) {
      // get one team
      this.finished = false
      this.all = false
      this.scheduled = true

      // filter for scheduled matches
      let filteredMembersIdScheduled = this.scheduledOriginalMatches.filter(
        match => {
          return (
            match.homeTeam.id === this.selected1 ||
            match.awayTeam.id === this.selected2
          )
        }
      )
      this.scheduledMatches = filteredMembersIdScheduled

      if (this.scheduledMatches.length === 0) {
        alert('there are no upcoming matches right now')
      }
    },
    teamUpdateFinished: function (event) {
      this.finished = true
      this.all = false
      this.scheduled = false

      let filteredMembersIdFinished = this.finishedOriginalMatches.filter(
        match => {
          return (
            match.homeTeam.id === this.selected1 ||
            match.awayTeam.id === this.selected2
          )
        }
      )
      this.finishedMatches = filteredMembersIdFinished
      console.log(this.finishedMatches)
    },
    teamUpdateAll: function (event) {
      this.all = true
      this.scheduled = false
      this.finished = false
      this.scheduledMatches = this.scheduledOriginalMatches
      this.finishedMatches = this.finishedOriginalMatches
    }
  },

  created () {
    let baseURL = 'https://api.football-data.org/v2/competitions/CL/matches/'
    let scheduledParam = '?status=SCHEDULED'
    let finishedParam = '?status=FINISHED'
    let header = { 'X-Auth-Token': 'a43af3a65b2b477c979e6b354684816b' }

    fetch(baseURL + scheduledParam, { headers: header })
      .then(response => {
        if (response.ok) {
          console.log('Scheduled Request succeeded: ' + response.statusText)
          return response.json()
        }
        throw new Error(response.statusText)
      })
      .then(json => {
        console.log('original data', json)
        let sortedMatches = json.matches.sort(function (a, b) {
          return new Date(b.utcDate) - new Date(a.utcDate)
        })
        this.scheduledMatches = sortedMatches
        this.scheduledOriginalMatches = sortedMatches

        // Create logo array
        let teams = this.allTeams
        for (let team of teams) {
          this.teamIdLogosDict[team.id] = team.crestUrl
        }
      })
      .catch(error => {
        console.log('Request failed: ' + error.message)
      })

    fetch(baseURL + finishedParam, { headers: header })
      .then(response => {
        if (response.ok) {
          console.log('Finished Request succeeded: ' + response.statusText)
          return response.json()
        }
        throw new Error(response.statusText)
      })
      .then(json => {
        let sortedMatches = json.matches.sort(function (a, b) {
          return new Date(b.utcDate) - new Date(a.utcDate)
        })
        this.finishedMatches = sortedMatches
        this.finishedOriginalMatches = sortedMatches

        let homeTeamArr = []
        let awayTeamArr = []
        for (let match of this.finishedOriginalMatches) {
          let homeTeamName = match.homeTeam.name
          if (!homeTeamArr.map(o => o.name).includes(homeTeamName)) {
            homeTeamArr.push(match.homeTeam)
          }

          let awayTeamName = match.awayTeam.name
          if (!awayTeamArr.map(o => o.name).includes(awayTeamName)) {
            awayTeamArr.push(match.awayTeam)
          }
        }

        this.homeTeamArr = homeTeamArr.sort((a, b) => {
          let teamA = a.name.toLowerCase()
          let teamB = b.name.toLowerCase()
          return teamA < teamB ? -1 : teamA > teamB ? 1 : 0
        })
        this.awayTeamArr = awayTeamArr.sort((a, b) => {
          let teamA = a.name.toLowerCase()
          let teamB = b.name.toLowerCase()
          return teamA < teamB ? -1 : teamA > teamB ? 1 : 0
        })
      })
  }
}
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
