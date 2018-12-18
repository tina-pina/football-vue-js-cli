<template>
  <font-awesome-icon
    v-on:click="logout()"
    class="signOut mx-auto fa-w-5"
    style="color: black"
    icon="sign-out-alt"
  />
  <!-- <div class="logout">
    <button
      class="btn btn-light d-flex justify-content-center align-items-center"
      v-on:click="logout()"
    >
      <font-awesome-icon class="signOut mx-auto fa-w-5" style="color: #007bff" icon="sign-out-alt"/>
    </button>
  </div>-->
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
