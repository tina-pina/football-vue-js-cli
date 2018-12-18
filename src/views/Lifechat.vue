<template>
  <div id="lifechat">
    <div class="container">
      <div class="send row d-flex align-items-center justify-content-center">
        <div
          class="col-12 chatBox d-flex align-items-center justify-content-center flex-column p-3"
        >
          <input type="text" class="form-control col-6" v-model="msg">
          <button class="btn btn-success m-4" v-on:click="writeNewPost()">Send</button>

          <hr>
        </div>
      </div>
    </div>
    <div v-bar>
      <!-- el1 -->
      <div>
        <!-- el2 -->
        <!-- your scrollable content -->
        <div class="message bubble" v-for="(msg, index) in messages" :key="index">
          <div class="messageBox d-flex flex-column justify-content-start">
            <p class="name border-bottom-3 text-center">{{msg.name}}</p>
            <p class="body text-left">{{msg.body}}</p>
            <p class="date text-left">{{msg.date}}</p>
          </div>
        </div>
      </div>
      <!-- dragger will be automatically added here -->
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export default {
  name: "Lifechat",
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
      var options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      };
      const post = {
        name: this.user.displayName,
        body: this.msg,
        date: new Date().toLocaleString("en-US", options)
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
    },
    getPosts() {
      firebase
        .database()
        .ref("mainChat")
        .on("value", data => {
          this.messages = data.val();
          // console.log(this.messages);
        });
    }
  },
  created: function() {
    var user = firebase.auth().currentUser;
    this.user = user;
    this.getPosts();
  }
};
</script>

<style scoped>
.container {
  background-color: rgba(255, 255, 255, 0.7);
  color: darkblue;
}

.chatBox {
  margin: 20px;
}

.messageBox p.name {
  font-weight: bold;
  color: brown;
}

p.name {
  /* background-color: #28a745;
  border-color: #28a745; */
  border-radius: 25px;
}

p.date {
  background-color: #007bff;
  border-color: #007bff;
  font-size: 10px;
}

p.body {
  background-color: #007bff;
  border-color: #007bff;
  color: white;
  max-width: 230px;
  display: inline-block;
  word-wrap: break-word;
}

.bubble {
  position: relative;
  background: #007bff;
  border: 1px solid #007bff;
  max-width: 250px;
  padding: 10px;
  font-family: arial;
  margin: 20px auto;
  font-size: 14px;
  border-radius: 6px;
}
.bubble:after,
.bubble:before {
  right: 100%;
  top: 50%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.bubble:after {
  border-color: rgba(255, 255, 204, 0);
  border-right-color: #007bff;
  border-width: 15px;
  margin-top: -15px;
}
.bubble:before {
  border-color: rgba(255, 204, 0, 0);
  border-right-color: #007bff;
  border-width: 16px;
  margin-top: -16px;
}
</style>
