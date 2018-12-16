<template>
  <div id="lifechat">
    <div class="container">
      <div class="row">
        <div>
          <input type="text" v-model="msg">
          <button v-on:click="writeNewPost()">Send</button>
          <hr>
          <div v-for="(msg, index) in messages" :key="index">
            <p>{{msg.name}}</p>
            <p>{{msg.date}}</p>
            <p>{{msg.body}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export default {
  name: "Lifechat",
  props: {},
  data() {
    return {
      msg: "",
      user: null,
      messages: []
    };
  },
  methods: {
    writeNewPost() {
      console.log(this.user.displayName);
      console.log(this.msg);
      const post = {
        name: this.user.displayName,
        body: this.msg,
        date: new Date().toLocaleString("en-US")
      };
      const newPostKey = firebase
        .database()
        .ref()
        .child("mainChat")
        .push().key;
      const updates = {};
      updates[newPostKey] = post;
      firebase
        .database()
        .ref("mainChat")
        .update(updates);
      this.msg = null;
      this.getPosts();
    },
    getPosts() {
      firebase
        .database()
        .ref("mainChat")
        .on("value", data => {
          this.messages = data.val();
        });
    }
  },
  created: function() {
    var user = firebase.auth().currentUser;
    this.user = user;
  }
};
</script>

<style scoped>
.container {
  background-color: rgba(255, 255, 255, 0.7);
  color: darkblue;
}
</style>