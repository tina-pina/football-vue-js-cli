<template>
  <div class="team">
    <div class="container">
      <!-- team name and logo start -->
      <button v-on:click="$emit('open')">create modal</button>
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
      <!-- team name and logo end -->
      <!-- single members start -->
      <div
        class="row title d-flex justify-content-center border-bottom border-danger"
        style="background-color:white; border-width:3px !important"
      >
        <h2 class="text-center p-2">Team members</h2>
      </div>

      <!-- <div class="container">
        <div class="row members">
          <div
            class="d-flex justify-content-between col-3"
            v-for="(member, index) in teamInfo.squad"
            :key="index"
          >
            <div>
              <p class="col-1">{{ member.name }}</p>
            </div>
          </div>
        </div>
      </div>-->
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
export default {
  name: "Team",
  props: {
    teamInfo: Object
  },
  data() {
    return {
      showCollapse: true,
      isActive: null,
      googleURL: null
    };
  },
  methods: {
    toggleItem(key) {
      this.isActive = key;
    },
    createModalTest() {
      console.log("clicked");
    }
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
    console.log(this.teamInfo);
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