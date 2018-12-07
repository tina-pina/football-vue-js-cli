<template>
  <!-- this is the landing page -->
  <div class="team">
    <img :src="getProperLogoHome" alt>

    <p>{{ match.homeTeam.name }} VS.</p>

    <img :src="getProperLogoAway" alt>
    <p>{{ match.awayTeam.name }}</p>
    <button v-on:click="showThis()"></button>
  </div>
</template>

<script>
export default {
  name: "Team",
  props: ["logos", "match"],
  data() {
    return {
      link: "https://unsplash.com/photos/zs4Pahjo5ww"
    };
  },
  methods: {
    showThis: function() {
      console.log(this.logos);
      console.log(this.match);
    }
  },
  computed: {
    getProperLogoHome: function() {
      let arr = this.logos.filter(
        logo => logo.name == this.match.homeTeam.name
      );
      if (arr[0].crestUrl !== "null") {
        return arr[0].crestUrl;
      } else {
        return "";
      }
    },
    getProperLogoAway: function() {
      let arr = this.logos.filter(
        logo => logo.name == this.match.awayTeam.name
      );
      return arr[0].crestUrl;
    }
  }
};
</script>

<style scoped>
</style>