<template>
  <div class="matches">
    <h1 class="m-5 font-weight-bold">Matches</h1>
    <div class="container">
      <div class="row">
        <div class="mb-3 col-6">
          <b-form-select>
            <option :value="null">Select a team</option>
            <option v-for="(team, index) in allTeams" :key="index" :value="team.id">{{ team.name }}</option>
          </b-form-select>
        </div>

        <div class="mb-3 col-6">
          <b-form-select>
            <option :value="null">Select a team</option>
            <option v-for="(team, index) in allTeams" :key="index" :value="team.id">{{ team.name }}</option>
          </b-form-select>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Matches",
  data() {
    return {
      allTeams: this.$route.params.teams
    };
  },

  created() {
    let url = "https://api.football-data.org/v2/competitions/CL/matches";
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
        // console.log(this.matches);
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


