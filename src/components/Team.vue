<template>
  <div class="team">
    <div class="container">
      <!-- team name and logo start -->
      <div class="row">
        <div
          class="col-12 teamNameLogo d-flex align-items-center justify-content-center flex-column"
        >
          <h2 class="align-middle">{{ teamInfo.name }}</h2>
          <div>
            <div class="teamLogo col-6" v-if="teamInfo.crestUrl">
              <img :src="teamInfo.crestUrl" alt>
            </div>
            <div class="teamLogo col-6" v-else>
              <img src="../assets/logo.png" alt>
            </div>
          </div>
        </div>
      </div>

      <div class="row d-flex justify-content-center align-items-center">
        <div class="modal-button col-12 d-flex justify-content-center align-items-center">
          <button
            class="btn btn-success"
            style="font-weight: bold; font-size: 17px; color:white"
            v-on:click="openModal"
          >show map</button>
        </div>
        <div v-if="showModal" class="col-12 w-100 mb-4">
          <google-map :lat="location.lat" :lng="location.lng"/>
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

      <!-- single members end -->
      <!-- start collapse -->
      <div class="container">
        <div class="row">
          <div
            class="border-light border-bottom pt-2 pd-2 w-100"
            role="tablist"
            v-for="(value, key, index) in teamInfo.squad"
            @click="toggleItem(key)"
            :class="{active: isActive === key}"
          >
            <div class="row d-flex">
              <p class="col-6" style="font-size:30px; font-weight:bold">{{ value.name }}</p>

              <b-card
                no-body
                class="mb-1 col-6"
                :style="{'backgroundColor': 'rgba(255,255,255,0)', 'border-style': 'none'}"
              >
                <b-card-header
                  header-tag="header"
                  class="playerInfo p-1"
                  role="tab"
                  :style="{'backgroundColor': 'rgba(255,255,255,0)', 'border-style': 'none'}"
                >
                  <b-btn
                    block
                    href="#"
                    v-b-toggle.active
                    variant="success"
                    @click="showCollapse = !showCollapse"
                    :class="showCollapse ? 'collapsed' : null"
                    aria-controls="collapse4"
                    :aria-expanded="showCollapse ? 'true' : 'false'"
                  >Player Info
                    <font-awesome-icon icon="running"/>
                  </b-btn>
                </b-card-header>
                <b-collapse
                  id="active"
                  visible
                  accordion="my-accordion"
                  role="tabpanel"
                  v-model="showCollapse"
                  :style="{'backgroundColor': 'rgba(255,255,255,0)', 'border-style': 'none'}"
                >
                  <b-card-body
                    v-if="isActive === key"
                    class="item-active"
                    :style="{'backgroundColor': 'rgba(255,255,255,0)', 'border-style': 'none'}"
                  >
                    <span class="p-2">
                      <font-awesome-icon icon="futbol"/>
                    </span>
                    <span
                      class="card-text p-0"
                      style="color: darkblue"
                    >Position : {{ value.position }}</span>
                    <br>
                    <span class="p-2">
                      <font-awesome-icon icon="futbol"/>
                    </span>
                    <span
                      class="card-text p-0"
                      style="color: darkblue"
                    >Birthday : {{ value.dateOfBirth | formatDate }}</span>
                    <span class="p-2">
                      <font-awesome-icon icon="futbol"/>
                    </span>
                    <span
                      class="card-text p-0"
                      style="color: darkblue"
                    >Born in : {{ value.countryOfBirth }}</span>
                    <br>
                    <span class="p-2">
                      <font-awesome-icon icon="futbol"/>
                    </span>
                    <span
                      class="card-text p-0"
                      style="color: darkblue"
                    >Nationality : {{ value.nationality }}</span>
                  </b-card-body>
                </b-collapse>
              </b-card>
            </div>
          </div>
          <!-- end collapse -->
          <!-- <iframe
            width="100%"
            height="600"
            src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=Tokyo&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed",
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
          ></iframe>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoogleMap from "./GoogleMap.vue";
import { loaded } from "vue2-google-maps";
import Vue from "vue";

export default {
  name: "Team",
  props: {
    teamInfo: Object,
    location: Object // {lat:..., lng:...}
  },
  components: {
    GoogleMap
  },
  data() {
    return {
      showCollapse: true,
      isActive: null,
      googleURL: null,
      showModal: false,
      googleMapsInitialized: null
    };
  },
  methods: {
    openModal: function() {
      this.showModal = !this.showModal;
    },
    toggleItem(key) {
      this.isActive = key;
    },
    createModalTest() {
      console.log("clicked");
    }
  },
  computed: {
    icon() {
      let baseIcon = {
        path: "..assets/logo.png"
      };
      if (this.googleMapsInitialized) {
        // we have google maps in the window
        baseIcon.scaledSize = new window.google.maps.Size(30, 30);
      }
      return baseIcon;
    }
  },
  async mounted() {
    loaded.then(() => {
      this.googleMapsInitialized = true; // define this property in data
    });
  },
  filters: {
    formatDate: function(dateString) {
      let date = new Date(dateString);
      let year = date.getFullYear();
      let month = date.getMonth();
      let days = date.getDate();
      return year + "-" + month + "-" + days;
    }
  },

  created() {
    console.log("TEAM" + this.teamInfo);
  }
};
</script>


<style scoped>
.container {
  background-color: rgba(255, 255, 255, 0.1);
  color: darkblue;
}

.teamNameLogo {
  padding: 20px;
}

.teamLogo img {
  width: 100px;
  height: 100px;
}

.modal-button {
  padding: 10px;
  margin: 20px auto;
  background-color: rgba(255, 255, 255, 0.7);
}

.modal-button button {
  color: black;
  font-weight: black;
}

.members {
  padding: 20px;
  border: 1px solid white;
  font-size: 20px;
}

iframe {
  padding: 20px;
}

.card-text {
  font-size: 21px;
  color: white;
}

.playerInfo a {
  font-size: 20px;
}
</style>