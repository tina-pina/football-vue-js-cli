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
          <span>{{ selected1 }}</span>
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
          <span>{{ selected2 }}</span>
        </div>
      </div>
      <button @click="teamUpdate($event)">Get Matches</button>
      <h1 v-for="m in matches">{{ m }}</h1>
    </div>
  </div>
</template>


<script>
export default {
  name: "Matches",
  data() {
    return {
      allTeams: this.$route.params.teams,
      selected1: null,
      selected2: null,
      matches: [],
      originalMatches: [],
      homeTeamArr: [],
      awayTeamArr: []
    };
  },

  methods: {
    teamUpdate: function(event) {
      if (!this.selected1 || !this.selected2) return this.originalMatches;
      let filteredMembersId = this.originalMatches.filter(match => {
        return (
          match.homeTeam.id === this.selected1 &&
          match.awayTeam.id === this.selected2
        );
      });
      this.matches = filteredMembersId;
    }
  },

  created() {
    let url = "https://api.football-data.org/v2/competitions/CL/matches/";
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
        this.originalMatches = json.matches;
        console.log(this.originalMatches);
        let homeTeamArr = [];
        let awayTeamArr = [];
        for (let match of this.originalMatches) {
          let homeTeamName = match.homeTeam.name;
          // let homeTeamId = match.homeTeam.id;
          if (!homeTeamArr.map(o => o.name).includes(homeTeamName)) {
            // let homeObj = { name: homeTeamName, id: homeTeamId };
            homeTeamArr.push(match.homeTeam);
          }
          let awayTeamName = match.awayTeam.name;
          // let awayTeamId = match.awayTeam.id;
          if (!awayTeamArr.map(o => o.name).includes(awayTeamName)) {
            // let awayObj = { name: awayTeamName, id: awayTeamId };
            awayTeamArr.push(match.awayTeam);
          }
        }
        this.homeTeamArr = homeTeamArr;
        console.log(this.homeTeamArr);
        this.awayTeamArr = awayTeamArr;
        console.log(this.awayTeamArr);
      })
      .catch(error => {
        console.log("Request failed: " + error.message);
      });
  }
};
</script>


<style scoped>
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


