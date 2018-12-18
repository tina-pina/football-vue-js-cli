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
            class="map-button btn btn-success"
            style="font-weight: bold; font-size: 17px; color: white;"
            v-on:click="openModal"
          >show map</button>
        </div>
        <div v-if="showModal" class="col-12 w-100 mb-4">
          <google-map :lat="location.lat" :lng="location.lng"/>
        </div>
      </div>
      <!-- team name and logo end -->
      <!-- single members start -->
      <div class="row title d-flex justify-content-center border-bottom border-danger">
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
            <div class="memberInfo row d-flex">
              <p class="col-6">{{ value.name }}</p>

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
                    <span class="card-text p-0">Position : {{ value.position }}</span>
                    <br>
                    <span class="p-2">
                      <font-awesome-icon icon="futbol"/>
                    </span>
                    <span class="card-text p-0">Birthday : {{ value.dateOfBirth | formatDate }}</span>
                    <span class="p-2">
                      <font-awesome-icon icon="futbol"/>
                    </span>
                    <span class="card-text p-0">Born in : {{ value.countryOfBirth }}</span>
                    <br>
                    <span class="p-2">
                      <font-awesome-icon icon="futbol"/>
                    </span>
                    <span class="card-text p-0">Nationality : {{ value.nationality }}</span>
                  </b-card-body>
                </b-collapse>
              </b-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoogleMap from './GoogleMap.vue'
import Vue from 'vue'

export default {
  name: 'Team',
  props: {
    teamInfo: Object,
    location: Object // {lat:..., lng:...}
  },
  components: {
    GoogleMap
  },
  data () {
    return {
      showCollapse: true,
      isActive: null,
      googleURL: null,
      showModal: false
    }
  },
  methods: {
    openModal: function () {
      this.showModal = !this.showModal
    },
    toggleItem (key) {
      this.isActive = key
    }
  },

  filters: {
    formatDate: function (dateString) {
      let date = new Date(dateString)
      let year = date.getFullYear()
      let month = date.getMonth()
      let days = date.getDate()
      return year + '-' + month + '-' + days
    }
  }
}
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

.title {
  background-color: white;
  border-width: 3px !important;
}

.memberInfo p {
  font-size: 30px;
  font-weight: bold;
}

.card-text {
  font-size: 21px;
  color: darkblue;
}

.playerInfo a {
  font-size: 20px;
}
</style>
