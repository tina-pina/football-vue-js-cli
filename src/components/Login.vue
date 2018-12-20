<template>
  <button v-if="color === 'red'" class="btn-danger" v-on:click="loginGoogle()">{{ btnMsg }}</button>
  <button v-else-if="color === 'blue'" class="btn-primary" v-on:click="loginFB()">{{ btnMsg }}</button>
  <button v-else class="btn-secondary" v-on:click="loginMail()">{{ btnMsg }}</button>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import router from "../router.js";

export default {
  name: "login",
  props: {
    color: String,
    btnMsg: String
  },
  data() {
    return {
      user: null
    };
  },
  methods: {
    loginGoogle() {
      console.log("in login");
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(function() {
          // Existing and future Auth states are now persisted in the current
          // session only. Closing the window would clear any existing state even
          // if a user forgets to sign out.
          // ...
          // New sign-in will be persisted with session persistence.

          return firebase
            .auth()
            .signInWithPopup(provider)
            .then(result => {
              console.log(result.additionalUserInfo.profile.name);
              console.log(result.credential.accessToken);

              // // This gives you a Google Access Token. You can use it to access the Google API.
              // var token = result.credential.accessToken;
              // // The signed-in user info.
              // var user = result.user;
              // // let user = firebase.auth().currentUser;
              // this.user = user;
              // move to home after login
            })
            .catch(function(error) {
              alert("error:" + error.message);
            });
        })
        .then(() => {
          this.$router.push({ path: "/home" });
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    },
    loginFB() {
      // do something
    },
    loginMail() {}
  }
};
</script>

<style scoped>
button {
  font-weight: bold;
  margin: 6px;
  width: 250px;
  border-radius: 10px;
}
</style>
