<template>
  <div class="teams">
    <h1 class="m-5 font-weight-bold">Teams</h1>
    <!-- dropdown -->
    <b-form-select class="mb-3 w-50" @change="teamUpdate($event)" v-model="selected">
      <option :value="null">select a team</option>
      <option v-for="(team, index) in allTeams" :key="index" :value="team.id">{{ team.name }}</option>
    </b-form-select>
    <Team v-bind:teamInfo="teamInfo" v-bind:location="location" v-if="teamSelected"/>
  </div>
</template>

<script>
import Team from '@/components/Team.vue'
import Vue from 'vue'

export default {
  name: 'Teams',
  components: {
    Team
  },
  data () {
    return {
      allTeams: this.$route.params.teams,
      teamInfo: {},
      selected: null,
      teamSelected: false,
      location: {}
    }
  },
  methods: {
    teamUpdate: function (event) {
      if (!event) return

      let teamID = event
      let url = `https://api.football-data.org/v2/teams/${teamID}`
      let header = { 'X-Auth-Token': 'a43af3a65b2b477c979e6b354684816b' }

      fetch(url, { headers: header })
        .then(response => {
          if (response.ok) {
            console.log('Request succeeded: ' + response.statusText)
            return response.json()
          }
          throw new Error(response.statusText)
        })
        .then(json => {
          this.teamInfo = json

          var addressObj = {
            address_line_1: this.teamInfo.venue
          }

          Vue.$geocoder.send(addressObj, response => {
            console.log(response)
            this.location = response.results[0].geometry.location // {lat: ..., lng: ...}
          })
          this.teamSelected = true
        })
    }
  }
}
</script>

<style scoped>
h1 {
  color: firebrick;
  font-size: 60px;
}
</style>
