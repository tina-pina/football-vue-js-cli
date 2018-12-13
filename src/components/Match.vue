<template>
  <div class="match row w-100 border-light border-bottom pt-2 pb-4">
    <div class="col-12 d-flex justify-content-between">
      <div class="home col-4 p-2" v-if="logo[match.homeTeam.id]">
        <p class="m-3 homeTeam">{{ match.homeTeam.name }}</p>
        <img :src="logo[match.homeTeam.id]" alt>
      </div>
      <div class="home col-4 p-2" v-else>
        <p class="m-3 homeTeam">{{ match.homeTeam.name }}</p>
        <img src="../assets/logo.png" alt>
      </div>

      <div class="col-4">
        <p class="m-3">
          <font-awesome-icon icon="table"/>
          {{ match.utcDate | formatDate }}
        </p>
        <p>{{ match.utcDate | formatHours }}</p>
        <p class="group">{{ match.group }}</p>
        <div
          v-if="isFinished"
        >{{ Number(match.score.fullTime.homeTeam) }} : {{ Number(match.score.fullTime.awayTeam) }}</div>
      </div>

      <div class="away col-4 p-2" v-if="logo[match.awayTeam.id]">
        <p class="awayTeam m-3">{{ match.awayTeam.name }}</p>
        <img :src="logo[match.awayTeam.id]" alt>
      </div>
      <div class="away col-4 p-2" v-else>
        <p class="awayTeam m-3">{{ match.awayTeam.name }}</p>
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
      let str = date.toGMTString();
      return str
        .split(" ")
        .slice(0, 4)
        .join(" ");
    },
    formatHours: function(dateString) {
      let date = new Date(dateString);

      let str = date.toLocaleString().split(" ");
      let newStr = str.slice(1, 2);
      let newest = newStr.join("").slice(0, 4);

      let pm = date.toLocaleString().split(" ");
      let pmStr = str.slice(2).join("");

      return newest + " " + pmStr;
    }
  }
};
</script>

<style scoped>
img {
  height: 100px;
  width: 100px;
}

p.homeTeam {
  height: 88px;
  font-weight: bold;
}

p.group {
  font-weight: bold;
}

p.awayTeam {
  height: 88px;
  font-weight: bold;
}
</style>