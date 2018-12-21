<template>
  <div class="logout">
    <font-awesome-icon
      v-on:click="logout()"
      class="signOut"
      style="color: black; white-space: nowrap; margin-right: 5px"
      icon="sign-out-alt"
    />Logout
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
export default {
  name: "logout",
  components: {},
  data() {
    return {
      user: null
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          console.log("Sign-out successful");
          // move to home after login
          this.$router.push({ path: "/home" });
        })
        .catch(function(error) {
          // An error happened.
          alert("Logout failed");
        });
    }
  }
};
</script>
