
/*make navigation inside app -> it will be another component with all the links to the other pages like matches*/

<template>
  <div id="app" :style="{ background: 'url(' + bgImage + ')' }">
    <div class="container">
      <nav id="navLanding" class="navbar navbar-expand-lg d-flex justify-content-center">
        <div v-if="!checkLanding">
          <b-nav>
            <b-nav-item class="ext-light bg-light m-3" style="font-size: 25px">
              <router-link to="/home">Home</router-link>
            </b-nav-item>
            <b-nav-item class="text-light bg-light m-3" style="font-size: 25px">
              <router-link
                :to="{ name: 'Teams', params: { teams: this.teams, teamsId: this.teamsId } }"
              >Teams</router-link>
            </b-nav-item>
            <b-nav-item class="text-light bg-light m-3" style="font-size: 25px">
              <router-link to="/matches">Matches</router-link>
            </b-nav-item>
            <b-nav-item class="text-light bg-light m-3" style="font-size: 25px">
              <router-link to="/more">More</router-link>
            </b-nav-item>
          </b-nav>
        </div>
      </nav>
    </div>

    <router-view/>
  </div>
</template>


<script>
// import Teams from "./views/Teams";

export default {
  name: "app",
  components: {
    // Teams
  },
  data() {
    return {
      teams: [],
      teamsId: [],
      image: require("./assets/football-1406106_1920.jpg")
    };
  },
  computed: {
    checkLanding: function() {
      return this.$route.name === "Landing";
    },
    bgImage: function() {
      if (this.$route.name == "Landing") {
        return require("./assets/football-1406106_1922.png");
      } else {
        return require("./assets/dan-gold-407757-unsplash.png");
      }
    }
  },
  methods: {
    getTeamData: async function(teamID) {
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
          console.log(json);
          // return json;
        });
    }
  },
  created() {
    let url = "https://api.football-data.org/v2/competitions/CL/teams";
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
        let teamData = [];
        // console.log(json.teams);
        this.teams = json.teams;
        let Id = this.teams.map(team => team.id);
        this.teamsId = Id;
        console.log(Id);
      })
      .catch(error => {
        console.log("Request failed: " + error.message);
      });

    // return fetch("https://api.football-data.org/v2/teams/", { headers: header })
    // .then(response => {
    //   if (response.ok) {
    //     console.log("Request succeeded: " + response.statusText);
    //     return response.json();
    //   }
    //   throw new Error(response.statusText);
    // })
    // .then(json => {
    //   console.log(json)
    //   return json
    // })
    // .catch(error => {
    // console.log("Request failed: " + error.message);
  }
};
</script>

<style>
body {
  width: 100%;
  height: 100%;
  opacity: 1;
}
</style>


<style scoped>
#app {
  width: 100%;
  min-height: 100vh;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
  text-decoration: none;
}
</style>
