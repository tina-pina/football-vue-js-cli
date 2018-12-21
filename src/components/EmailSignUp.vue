<template>
  <div id="EmailSignUp">
    <b-container fluid>
      <b-row class="my-1">
        <b-col sm="3">
          <label for="`type-email`" style=" font-weight: bold">Email</label>
        </b-col>
        <b-col sm="9">
          <b-form-input id="`type-email`" type="email" v-model="email"></b-form-input>
        </b-col>
      </b-row>
    </b-container>

    <b-container fluid>
      <b-row class="my-1">
        <b-col sm="3">
          <label for="`type-password`" style="font-weight: bold; ">Password</label>
        </b-col>
        <b-col sm="9">
          <b-form-input id="`type-password`" type="password" v-model="password"></b-form-input>
        </b-col>
      </b-row>
    </b-container>

    <b-container fluid>
      <b-row class="my-1 d-flex justify-content-center">
        <button class="btn btn-primary m-2" v-on:click="signUp">Sign up</button>
        <button class="btn btn-primary m-2" v-on:click="signIn">Sign in</button>
      </b-row>
    </b-container>
  </div>
</template>
<script>
// @ is an alias to /src
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
export default {
  name: "EmailSignUp",
  components: {},
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signUp() {
      let email = this.email;
      let password = this.password;

      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
          // Handle Errors here.

          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
    },
    signIn() {
      // console.log("clicked again");
      let email = this.email;
      let password = this.password;

      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          this.$router.push({ path: "/home" });
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
    }
  }
};
</script>
<style scoped>
#EmailSignUp {
  background-color: rgba(255, 255, 255, 0.7);
}
</style>
