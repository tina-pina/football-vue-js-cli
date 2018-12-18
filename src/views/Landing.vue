<template>
  <!-- this is the landing page -->
  <div class="landing">
    <div class="container">
      <div class="row">
        <div class="col-12 d-flex justify-content-center align-items-center mt-4">
          <h1>GYG</h1>
          <h4>GetYourGoal</h4>
        </div>
      </div>
      <div class="row d-flex justify-content-center">
        <div class="col-8 offset-md-2">
          <div id="content" class="content mt-5 p-1" style="background-color: darkgrey">
            <p class="text1" style="color: white; font-size: 20px">UEFA Champions League</p>
            <p>Get close to the action!
              <font-awesome-icon class="footballIcon" style="color: white" icon="futbol"/>
            </p>
            <p
              class="text2"
              style="color: white; font-size: 20px"
            >newest games, matches, livechat and more...</p>
          </div>
        </div>
      </div>
      <div class="bigSize row">
        <b-nav
          class="box col-12 d-flex justify-content-center align-items-start"
          style="height: 50%"
        >
          <!-- <b-nav-item class="enter pt-3 pb-3 pl-4 pr-4"> -->
          <Login v-bind:btnMsg="'Login with Google'" :color="'red'"/>
          <Login v-bind:btnMsg="'Login with Facebook'" :color="'blue'"/>
          <Login v-bind:btnMsg="'Login with EMail'" :color="''"/>
          <!-- </b-nav-item> -->
        </b-nav>
      </div>
    </div>
  </div>
</template>

<script>
import Login from '@/components/Login.vue'

export default {
  name: 'landing',
  components: {
    Login
  }
}
</script>

<style scoped>
/* font family */

@import url("https://fonts.googleapis.com/css?family=Righteous");

h1 {
  font-family: Righteous;
  color: white;
  font-size: 80px;
}

nav-item.enter {
  margin: 0 auto;
  justify-content: center;
}

.enter {
  background-color: black;
  margin-bottom: 20px;
}

.enter a {
  text-decoration: none;
  color: white;
  margin: 0 20px;
}

.bigSize {
  display: inline;
}

/* add media query */

@media only screen and (max-width: 450px) and (min-width: 0px) {
  #content p.text1 {
    display: inline;
  }

  #content p.text2 {
    display: none;
  }
}

@media only screen and (max-width: 768) and (min-width: 451px) {
  .row {
    display: flex;
    margin-top: 200px;
  }

  p.text2,
  .content {
    display: none;
  }

  .bigSize {
    display: inline;
  }
}
</style>
