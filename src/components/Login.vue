<template>
  <div class="login">
    <button class="btn btn-dark" v-on:click="login()">Login</button>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import router from "../router.js";

export default {
  name: "login",
  components: {},
  data() {
    return {
      user: null
    };
  },
  methods: {
    login() {
      console.log("in login");
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // let user = firebase.auth().currentUser;
          this.user = user;
          console.log(user);
          console.log(user.displayName);
          console.log(user.email);
          this.$router.push({ path: "/home" });
        })
        .catch(function(error) {
          alert("error" + error.message);
          // // Handle Errors here.
          // var errorCode = error.code;
          // var errorMessage = error.message;
          // // The email of the user's account used.
          // var email = error.email;
          // // The firebase.auth.AuthCredential type that was used.
          // var credential = error.credential;
          // // ...
        });
    }
  }
};
</script>

<style scoped>
button {
  margin: 30px;
}
</style>
