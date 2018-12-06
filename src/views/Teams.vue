<template>
  <div class="teams">
    <h1 class="m-5 font-weight-bold">Teams</h1>
    <!-- dropdown -->
    <b-form-select class="mb-3 w-50" @change="teamUpdate($event)" v-model="selected">
      <option :value="null">select a team</option>
      <option v-for="(team, index) in allTeams" :key="index" :value="team.id">{{ team.name }}</option>
    </b-form-select>

    <div class="container" v-if="teamSelected">
      <!-- team name and logo start -->
      <div class="row teamNameLogo">
        <div class="teamName col-6 d-flex align-items-center justify-content-center">
          <div class="d-flex flex-column">
            <div>
              <h3 class="p-2" style="background-color: white">Team</h3>
            </div>
            <div>
              <p>{{ teamInfo.name }}</p>
            </div>
          </div>
        </div>
        <div>
          <div class="teamLogo col-6" v-if="teamInfo.crestUrl">
            <img :src="teamInfo.crestUrl" alt>
          </div>
          <div class="teamLogo col-6" v-else>
            <img src="../assets/logo.png" alt>
          </div>
        </div>
      </div>
      <!-- team name and logo end -->
      <!-- single members start -->
      <div
        class="row title d-flex justify-content-center border-bottom border-danger"
        style="background-color:white; border-width:3px !important"
      >
        <h2 class="text-center p-2">Team members</h2>
      </div>
      <div class="row members">
        <!-- 1. Make MemberInfo component -->
        <!-- <MemberInfo v-for="member in teamInfo.squad" memberInfo="member" /> -->
        <div
          class="d-flex justify-content-between col-3"
          v-for="(member, index) in teamInfo.squad"
          :key="index"
        >
          <p class="col-3">{{ member.name }}</p>
          <p style="font-size: 8px">{{ member.id }}</p>
          <!-- modal start -->
          <!-- <button v-on:click="modal = !modal" class="buy btn btn-lg btn-primary">more info</button>
          <div v-if="modal" class="modal">
            <div class="field-inside d-flex align-items-center justify-content-center mt-5">
              <div>
                <div class="pl-1">{{ member.id }}</div>
                <button v-on:click="modal =! modal" id="close" class="btn btn-lg btn-primary">Close</button>
              </div>
            </div>
          </div>-->
        </div>
      </div>
      <!-- modal end -->
      <!-- single members end -->
      <!-- show map start -->
      <div class="row">
        <div class="map col-12 d-flex align-items-center justify-content-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21828916.675729126!2d4.138980060202768!3d48.09745095866821!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46ed8886cfadda85%3A0x72ef99e6b3fcf079!2sEurope!5e0!3m2!1sen!2sde!4v1544017899376"
            width="300"
            height="225"
            frameborder="0"
            style="border:0"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <!-- show map start -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Teams",
  data() {
    return {
      allTeams: this.$route.params.teams,
      teamInfo: {},
      teamSelected: false,
      selected: null,
      modal: false
      // options: [{ value: null, text: "Please select a team" }]
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
          console.log(json);
          this.teamInfo = json;
          this.teamSelected = true;
        });
    }
    // getTeamData: async function(teamID) {}
  }
};
</script>

  
<style scoped>
h1 {
  color: firebrick;
  font-size: 60px;
}

.container {
  background-color: rgba(255, 255, 255, 0.7);
  color: darkblue;
}

.teamNameLogo {
  padding: 20px;
}

.teamLogo img {
  width: 100px;
  height: 100px;
}

.emptyLogo {
  width: 100px;
  height: 100px;
  background-color: white;
}

.teamName {
  font-size: 20px;
}

.members {
  padding: 20px;
  border: 1px solid white;
  font-size: 20px;
}

.modal {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  display: table;
}

iframe {
  padding: 20px;
}
</style>