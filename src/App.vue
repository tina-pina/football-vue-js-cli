
<template>
  <div id="app" :style="{ background: 'url(' + bgImage + ')' }">
    <div class="container-fluid w-100">
      <div v-if="!checkLanding">
        <!-- NAVBAR START -->
        <nav
          id="navLanding"
          class="navbar navbar-expand-lg d-flex justify-content-between shadow-sm"
        >
          <!-- nav FLEX ELEMENT  -->
          <div id="mainLogoBig" class="float-left" v-on:click="infoAlert()">
            <img class="mainLogo float-left text-left pr-2" src="./assets/007-champion.png" alt>
            <p
              class="pr-2"
              style="font-size: 9px; margin-bottom: 0px;"
              v-on:click="infoAlert()"
            >Info</p>
          </div>

          <!-- nav FLEX ELEMENT  -->
          <div v-if="!checkLanding" class="d-flex justify-content-between">
            <b-nav type="dark">
              <b-nav-item class="text-light bg-light" style="font-size: 22px">
                <router-link to="/home">
                  <!-- <font-awesome-icon class="homeIcon" icon="home"/> -->
                  <img class="icon" src="./assets/home.png" alt>
                </router-link>
                <p style="font-size: 9px; margin-bottom: 0px">Home</p>
              </b-nav-item>

              <b-nav-item class="text-light bg-light" style="font-size: 22px ">
                <router-link :to="{ name: 'Teams', params: { teams: this.teams } }">
                  <img class="icon" src="./assets/teamLogo.png" alt>
                </router-link>
                <p style="font-size: 9px; margin-bottom: 0px">Teams</p>
              </b-nav-item>

              <b-nav-item class="text-light bg-light" style="font-size: 22px">
                <router-link :to="{ name: 'Matches', params: { teams: this.teams } }">
                  <img class="icon" src="./assets/match.png" alt>
                </router-link>
                <p style="font-size: 9px; margin-bottom: 0px">Matches</p>
              </b-nav-item>
            </b-nav>
          </div>

          <!-- nav FLEX ELEMENT  -->
          <div class="dropdown p-0">
            <b-nav>
              <b-nav-item-dropdown
                id="ddown1"
                variant="info"
                text="More"
                size="lg"
                class="text-dark btn-light"
                style="font-size: 12px; background-color: white; color:black"
                right
              >
                <b-nav-item id="whiteMore" class="more text-light">
                  <router-link id="whiteMore" class="more" to="/lifechat">
                    <font-awesome-icon class="comments" icon="comment"/>
                    <!-- Chat -->
                    &nbsp;Chat
                  </router-link>
                </b-nav-item>

                <b-nav-item id="whiteMore" class="more text-light" href="/more">
                  <router-link
                    id="whiteMore"
                    class="more"
                    :to="{ name: 'More', params: { teams: this.teams } }"
                  >
                    <font-awesome-icon class="trophy" icon="trophy"/>&nbsp;Scorers
                  </router-link>
                </b-nav-item>

                <b-nav-item id="whiteMore" class="more logout text-light" href="/">
                  <Logout/>&nbsp;
                </b-nav-item>
              </b-nav-item-dropdown>
            </b-nav>
          </div>
        </nav>
        <!-- NAVBAR END -->
      </div>
    </div>

    <router-view/>
  </div>
</template>

<script>
import Logout from "./components/Logout.vue";

export default {
  name: "app",
  components: {
    Logout
  },

  data() {
    return {
      teams: [],
      image: require("./assets/football-1406106_1920.jpg"),
      img: require("./assets/icon-football.png")
    };
  },
  computed: {
    checkLanding: function() {
      return this.$route.name === "Landing";
    },

    bgImage: function() {
      let viewportWidth =
        window.innerWidth || document.documentElement.clientWidth;
      if (viewportWidth < 450) {
        if (this.$route.name === "Landing") {
          return require("./assets/football-1406106_1922.png");
        } else {
          return require("./assets/dan-gold-407757-unsplash.png");
        }
      } else {
        if (this.$route.name === "Landing") {
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
    },
    infoAlert: function() {
      alert("info and help: tina@gmail.com");
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
  margin: 0;
  padding: 0;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
}
</style>

<style scoped>
a,
a:hover,
span {
  color: black;
}
svg {
  color: black;
}

#app {
  width: 100%;
  min-height: 100vh;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  background-repeat: no-repeat;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  text-align: center;
  color: black;
}

.container-fluid {
  width: 100%;
  padding: 0px;
  margin: 0px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: black;
}

#nav a.router-link-exact-active {
  color: black;
  text-decoration: none;
}

a.nav-link {
  padding-top: 0px;
  padding-bottom: 0px;
  background: white;
  margin: 0 auto;
  color: black;
  white-space: nowrap;
}

nav#navLanding {
  background: white;
  height: 90px;
}

img.mainLogo {
  width: 40px;
  height: 40px;
}

.more {
  color: black;
}
/* 
#whiteMore .logout {
  white-space: nowrap;
}

#whiteMore a.nav-link {
  color: black;
  white-space: nowrap;
} */

#whiteMore.nav-item.more.text-light {
  background-color: rgba(255, 255, 255, 0.7);
}

a #ddown1 span {
  color: black;
}

label #ddown1 .dropdown-menu {
  width: 100px;
}

.icon {
  height: 35px;
  width: 35px;
}

.info {
  height: 35px;
  width: 35px;
}

@media only screen and (max-width: 450px) and (min-width: 0px) {
  #navText {
    display: inline;
  }

  .icon {
    height: 27px;
    width: 27px;
  }

  .info {
    height: 27px;
    width: 27px;
  }
}
</style>
