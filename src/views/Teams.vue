<template>
  <div class="teams">
    <h1 v-if="showModal">This is the MODAL!</h1>
    <h1 class="m-5 font-weight-bold">Teams</h1>
    <!-- dropdown -->
    <b-form-select class="mb-3 w-50" @change="teamUpdate($event)" v-model="selected">
      <option :value="null">select a team</option>
      <option v-for="(team, index) in allTeams" :key="index" :value="team.id">{{ team.name }}</option>
    </b-form-select>

    <Team v-on:open="openModal" v-bind:teamInfo="teamInfo" v-if="teamSelected"/>
  </div>
</template>

<script>
import Team from "@/components/Team.vue";

export default {
  name: "Teams",
  components: {
    Team
  },
  data() {
    return {
      allTeams: this.$route.params.teams,
      teamInfo: {},
      selected: null,
      teamSelected: false,
      showModal: false
    };
  },
  methods: {
    openModal: function() {
      console.log("open modal");
      this.showModal = !this.showModal;
    },
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

          console.log("TEAMINFO HERE" + this.teamInfo);
          this.teamSelected = true;
        });
    }
  }
};
</script>

  
<style scoped>
h1 {
  color: firebrick;
  font-size: 60px;
}
</style>