<template>
  <div class="teams">
    <h1 class="m-5 font-weight-bold">Teams</h1>

    <b-form-select class="mb-3 w-50" @change="teamUpdate($event)">
      <option :value="null">Select a team</option>
      <option v-for="(team, index) in allTeams" :key="index" :value="team.id">{{ team.name }}</option>
    </b-form-select>

    <div>{{ teamInfo }}</div>
    <img :src="teamInfo.crestUrl" alt>
  </div>
</template>

<script>
export default {
  name: "Teams",
  data() {
    return {
      allTeams: this.$route.params.teams,
      teamInfo: {}
    };
  },
  methods: {
    teamUpdate: function(event) {
      if (!event) return;

      let teamID = event;
      let url = `https://api.football-data.org/v2/teams/${teamID}`;
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
          // console.log(json);
          this.teamInfo = json;
        });
    },
    getTeamData: async function(teamID) {}
  }

  // methods: {
  //   getTeamData: async function(teamID) {
  //     this.teamsId = teamID;
  //     let header = {
  //       "X-Auth-Token": "a43af3a65b2b477c979e6b354684816b"
  //     };
  //     return fetch(`https://api.football-data.org/v2/teams/${teamID}`, {
  //       headers: header
  //     })
  //       .then(response => {
  //         if (response.ok) {
  //           console.log("Request succeeded: " + response.statusText);
  //           return response.json();
  //         }
  //         throw new Error(response.statusText);
  //       })
  //       .then(json => {
  //         console.log(json);
  //         return json;
  //       });
  //   }
  // }

  //sort the name of clubs alphabetically

  // methods: {
  //   sorted: function() {
  //     let sortedArr = [];
  //     let Teams;
  //     Teams = this.allTeams;
  //     for (let team in Teams) {
  //       let sortedTeam = team.name;
  //       console.log(sortedTeam);
  //       sortedArr.push(sortedTeam);
  //     }
  //     return sortedArr.sort();
  //   }

  // filters: {
  //   sorted: function() {
  //     let Teams;
  //     this.allTeams = Teams;
  //     for (team in Teams) {
  //       let sortedTeam = team.name.sort();
  //       console.log(team.name.sort());
  //     }
  //     return sortedTeam;
  //   }
  // }
};
</script>

  
<style scoped>
h1 {
  color: firebrick;
  font-size: 60px;
}
</style>