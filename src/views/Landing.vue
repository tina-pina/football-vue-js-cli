<template>
  <!-- this is the landing page -->
  <div class="landing">
    <h1>GYG - GetYourGoal</h1>
    <div>
      <b-nav class="d-flex justify-content-center align-items-center">
        <b-nav-item class="enter pt-3 pb-3 pl-5 pr-5">
          <router-link to="/home">Enter</router-link>
        </b-nav-item>
      </b-nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "landing",
  components: {}
};
</script>

<style scoped>
h1 {
  font-family: Righteous;
  color: white;
  font-size: 80px;
  margin: 20px;
}
@import url("https://fonts.googleapis.com/css?family=Righteous");

.enter {
  background-color: black;
  margin: 80px;
}

.enter a {
  text-decoration: none;
  color: white;
}
</style>
