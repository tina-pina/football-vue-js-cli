
/*make navigation inside app -> it will be another component with all the links to the other pages like matches*/

<template>
  <div id="app" :style="{ background: 'url(' + bgImage + ')' }">
    <div class="container">
      <nav id="navLanding" class="navbar navbar-expand-lg d-flex justify-content-center">
        <div v-if="!checkLanding">
          <b-nav>
            <b-nav-item class="text-light bg-light m-3" style="font-size: 25px">
              <router-link to="/home">Home</router-link>
            </b-nav-item>
            <b-nav-item class="text-light bg-light m-3" style="font-size: 25px">
              <router-link :to="{ name: 'Teams', params: { teams: this.teams } }">Teams</router-link>
            </b-nav-item>
            <b-nav-item class="text-light bg-light m-3" style="font-size: 25px">
              <router-link :to="{ name: 'Matches', params: { teams: this.teams } }">Matches</router-link>
            </b-nav-item>
            <div class="d-flex align-items-center">
              <b-dropdown
                id="ddown1"
                text="More"
                variant="link"
                size="lg"
                class="text-light bg-light m-3"
                style="font-size: 25px; width: 120px; height:53px"
              >
                <b-nav-item class="text-light bg-light m-3" href="/more" style="font-size: 25px">
                  <router-link :to="{ name: 'More', params: { teams: this.teams } }">Standings</router-link>
                </b-nav-item>
                <b-nav-item class="text-light bg-light m-3" href="/more" style="font-size: 25px">
                  <router-link :to="{ name: 'More', params: { teams: this.teams } }">Scorers</router-link>
                </b-nav-item>
                <b-dropdown-divider></b-dropdown-divider>
                <!-- <b-dropdown-item href="/more" style="font-size: 25px">
                  <router-link to="/more">Pictures</router-link>
                </b-dropdown-item>-->
              </b-dropdown>
            </div>
          </b-nav>
        </div>
      </nav>
    </div>

    <router-view/>
  </div>
</template>


<script>
export default {
  name: "app",
  components: {},
  data() {
    return {
      teams: [],
      image: require("./assets/football-1406106_1920.jpg")
    };
  },
  computed: {
    checkLanding: function() {
      return this.$route.name === "Landing";
    },

    bgImage: function() {
      let viewportWidth =
        window.innerWidth || document.documentElement.clientWidth;
      // console.log(viewportWidth);
      if (viewportWidth < 450) {
        if (this.$route.name == "Landing") {
          return require("./assets/football-1406106_1922_cropped.png");
        } else {
          return require("./assets/dan-gold-407757-unsplash.png");
        }
      } else {
        if (this.$route.name == "Landing") {
          return require("./assets/football-1406106_1922.png");
        } else {
          return require("./assets/dan-gold-407757-unsplash.png");
        }
      }
    }
  },

  methods: {
    returnTeamExtraInfo: function() {
      return [
        {
          id: 851,
          name: "Club Brugge KV",
          crestUrl:
            "https://s.glbimg.com/es/sde/f/original/2011/08/11/Brugge65.png"
        },
        {
          id: 7283,
          name: "FK Crvena Zvezda",
          crestUrl:
            "https://s.glbimg.com/es/sde/f/organizacoes/2012/04/27/Estrela_Vermelha65.png"
        },
        {
          id: 1899,
          name: "PAE AEK",
          crestUrl:
            "https://s.glbimg.com/es/sde/f/organizacoes/2017/10/14/AEKAtenas_65.png"
        },
        {
          id: 1871,
          name: "BSC Young Boys",
          crestUrl:
            "https://s.glbimg.com/es/sde/f/organizacoes/2012/04/27/youngboys65.png"
        },
        {
          id: 1887,
          name: "FK Shakhtar Donetsk",
          crestUrl:
            "https://s.glbimg.com/es/sde/f/equipes/2018/03/12/shakhtar-donetsk.svg"
        },
        {
          id: 1881,
          name: "FC Viktoria Plzeň",
          crestUrl:
            "https://s.glbimg.com/es/sde/f/original/2011/08/24/Viktoria_65x65.png"
        },
        {
          id: 1900,
          name: "PFC CSKA Moskva",
          crestUrl:
            "https://s.glbimg.com/es/sde/f/organizacoes/2017/12/03/CSKA-65.png"
        },
        {
          id: 5455,
          name: "FK Lokomotiv Moskva",
          crestUrl:
            "https://s.glbimg.com/es/sde/f/organizacoes/2012/04/27/lokomotivmoscou65.png"
        },
        {
          id: 1903,
          name: "Sport Lisboa e Benfica",
          crestUrl:
            "https://s.glbimg.com/es/sde/f/equipes/2018/03/11/benfica.svg"
        }
      ];
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
        let allTeams = json.teams.concat(this.returnTeamExtraInfo());

        this.teams = allTeams.sort((a, b) => {
          let teamA = a.name.toLowerCase();
          let teamB = b.name.toLowerCase();
          return teamA < teamB ? -1 : teamA > teamB ? 1 : 0;
        });
      })
      .catch(error => {
        console.log("Request failed: " + error.message);
      });
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

a.nav-link {
  width: 120px;
  height: 53px;
}

button#ddown1 {
  font-weight: bold;
  color: #2c3e50;
  width: 120px;
  height: 53px;
  padding: 0 auto;
}
</style>
