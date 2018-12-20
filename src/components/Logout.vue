<template>
  <div class="logout">
    <font-awesome-icon
      v-on:click="logout()"
      class="signOut mx-auto fa-w-5"
      style="color: black"
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
    // logout() {
    //   firebase
    //     .auth()
    //     .onAuthStateChanged(user => {
    //       if (user) {
    //         if (user === null) {
    //           firebase.auth().signOut();
    //         } else {
    //           this.$router.push("/home");
    //         }
    //       } else {
    //         // will get to here from a logout event
    //         this.$router.push("/");
    //       }
    //     })
    //     .catch(function(error) {
    //       alert("logout failed");
    //     });
    // }
  }
};
</script>
