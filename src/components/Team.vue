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
                <b-card-header header-tag="header" class="playerInfo p-1" role="tab">
                  <b-btn
                    block
                    href="#"
                    v-b-toggle.active
                    variant="success"
                    @click="showCollapse = !showCollapse"
                    :class="showCollapse ? 'collapsed' : null"
                    aria-controls="collapse4"
                    :aria-expanded="showCollapse ? 'true' : 'false'"
                  >
                    <font-awesome-icon icon="running"/>Player Info
                  </b-btn>
                </b-card-header>
                <b-collapse
                  id="active"
                  visible
                  accordion="my-accordion"
                  role="tabpanel"
                  v-model="showCollapse"
                >
                  <b-card-body v-if="isActive === key" class="item-active">
                    <span class="p-2">
                      <font-awesome-icon icon="futbol"/>
                    </span>
                    <span
                      class="card-text p-0"
                      style="font-size: 20px"
                    >Position : {{ value.position }}</span>
                    <br>
                    <span class="p-2">
                      <font-awesome-icon icon="futbol"/>
                    </span>
                    <span
                      class="card-text p-0"
                      style="font-size: 20px"
                    >Birthday : {{ value.dateOfBirth | formatDate }}</span>
                    <span class="p-2">
                      <font-awesome-icon icon="futbol"/>
                    </span>
                    <span
                      class="card-text p-0"
                      style="font-size: 20px"
                    >Born in : {{ value.countryOfBirth }}</span>
                    <br>
                    <span class="p-2">
                      <font-awesome-icon icon="futbol"/>
                    </span>
                    <span
                      class="card-text p-0"
                      style="font-size: 20px"
                    >Nationality : {{ value.nationality }}</span>

                    <!-- <p class="card-text">
                  <a target="_blank" v-bind:href="article.url">More Info</a>
                    </p>-->
                  </b-card-body>
                </b-collapse>
              </b-card>
            </div>
          </div>
          <!-- end collapse -->
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
      isActive: null
    };
  },
  methods: {
    toggleItem(key) {
      this.isActive = key;
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
  height: auto;
  background-color: white;
}

.members {
  padding: 20px;
  border: 1px solid white;
  font-size: 20px;
}

iframe {
  padding: 20px;
}

.playerInfo a {
  font-size: 20px;
}
</style>