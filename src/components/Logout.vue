<template>
  <div class="logout">
    <button class="btn btn-dark" v-on:click="logout()">Logout</button>
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
        })
        .catch(function(error) {
          // An error happened.
          alert("Logout failed");
        });
    }
  }
};
</script>