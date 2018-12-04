<template>
  <div class="teams">
    <div>
      <b-form-select v-model="selected" class="mb-3 w-50">
        <option :value="null">Select a team</option>
        <option v-for="(team, index) in allTeams" :key="index" :value="team.name">{{ team.name }}</option>
      </b-form-select>
    </div>
    <p>{{teamsId}}</p>
  </div>
</template>

<script>
export default {
  name: "Teams",
  data() {
    return {
      allTeams: this.$route.params.teams,
      teamsId: this.$route.params.teamsId,
      selected: null
    };
  },

  methods: {
    getTeamData: async function(teamID) {
      this.teamsId = teamID;

      let header = {
        "X-Auth-Token": "a43af3a65b2b477c979e6b354684816b"
      };
      return fetch(`https://api.football-data.org/v2/teams/${teamID}`, {
        headers: header
      })
        .then(response => {
          if (response.ok) {
            console.log("Request succeeded: " + response.statusText);
            return response.json();
          }
          throw new Error(response.statusText);
        })
        .then(json => {
          this.allTeams = json.allTeams;
          console.log(this.allTeams);
        });
    }
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
</style>