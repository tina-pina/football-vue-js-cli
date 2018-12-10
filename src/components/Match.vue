<template>
  <!-- this is the landing page -->
  <div class="match row w-100 border-light border-bottom pt-2 pb-4">
    <div class="col-12 d-flex justify-content-between">
      <div class="home col-4" v-if="logo[match.homeTeam.id]">
        <p class="m-3" style="height:88px">{{ match.homeTeam.name }}</p>
        <img :src="logo[match.homeTeam.id]" alt>
      </div>
      <div class="home col-4" v-else>
        <p class="m-3" style="height:88px">{{ match.homeTeam.name }}</p>
        <img src="../assets/logo.png" alt>
      </div>

      <div class="col-4">
        <p class="m-3">
          <font-awesome-icon icon="table"/>
          {{ match.utcDate | formatDate }}
        </p>
        <p>{{ match.group }}</p>
        <div
          v-if="isFinished"
        >{{ Number(match.score.fullTime.homeTeam) }} : {{ Number(match.score.fullTime.awayTeam) }}</div>
      </div>

      <div class="away col-4" v-if="logo[match.awayTeam.id]">
        <p class="m-3" style="height:88px">{{ match.awayTeam.name }}</p>
        <img :src="logo[match.awayTeam.id]" alt>
      </div>
      <div class="away col-4" v-else>
        <p class="m-3" style="height:88px">{{ match.awayTeam.name }}</p>
        <img src="../assets/logo.png" alt>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Match",
  props: {
    match: Object,
    logo: Object,
    isFinished: Boolean
  },
  data() {
    return {};
  },

  filters: {
    formatDate: function(dateString) {
      let date = new Date(dateString);
      let year = date.getFullYear();
      let month = date.getMonth();
      let days = date.getDate();
      return year + "-" + month + "-" + days;
    }
  }
};
</script>

<style scoped>
img {
  height: 100px;
  width: 100px;
}
</style>