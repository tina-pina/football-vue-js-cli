<template>
  <div id="lifechat">
    <div class="container">
      <div class="row">
        <nav class="col-12 chatHeader d-flex justify-content-between align-items-center">
          <p>x</p>
          <h1>Live chat</h1>
          <p>?</p>
        </nav>
      </div>
      <div class="send row">
        <div class="col-12 chatBox p-3 pt-5 m-2">
          <div class="d-flex align-items-center justify-content-center">
            <input
              type="text"
              class="form-control col-6 m-2"
              style="width: 200px !important;
  height: 50px !important;"
              v-model="msg"
            >
            <button class="btn btn-success m-2" v-on:click="writeNewPost()">Send</button>
          </div>
        </div>
      </div>
    </div>
    <div v-bar>
      <!-- el1 -->
      <div>
        <!-- el2 -->
        <!-- your scrollable content -->
        <div id="scrollme" class="chat">
          <div v-for="(msg, index) in messages" :key="index">
            <div v-if="user.displayName === msg.name">
              <!-- My Message -->
              <div
                class="message talk-bubble tri-right left-in"
                style="background-color: lightblue;"
              >
                <p class="name border-bottom-3 text-center" style="font-weight: bold;">{{msg.name}}</p>
                <p class="body text-left">{{msg.body}}</p>
                <p class="date text-left" style="font-size: 11px">{{msg.date}}</p>
              </div>
            </div>
            <div v-else>
              <!-- Someone else`s Message -->
              <div class="message talk-bubble tri-right btm-right">
                <p class="name border-bottom-3 text-center" style="font-weight: bold;">{{msg.name}}</p>
                <p class="body text-left">{{msg.body}}</p>
                <p class="date text-left" style="font-size: 11px">{{msg.date}}</p>
              </div>
            </div>
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
      currentUserObj: {},
      messages: [],
      index: 0,
      nextIndex: 1,
      UseBubbleOne: false,
      UseBubbleTwo: false
    };
  },
  updated() {
    this.scroll();
  },
  methods: {
    writeNewPost() {
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
    },
    scroll() {
      document.getElementById("scrollme").scrollTop = document.getElementById(
        "scrollme"
      ).scrollHeight;
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

nav.chatHeader {
  background-color: rgba(255, 255, 255, 0.7);
  height: 50px;
}

h1 {
  color: red;
  margin: 0;
}

.chatBox {
  margin: 30px;
  height: 130px;
}

input.form-control {
  width: 200px;
  height: 100px;
}

.chat {
  overflow-y: scroll;
  height: 300px;
  scroll-behavior: smooth;
}

.messageBox p.name {
  font-weight: bold;
  color: brown;
}

p.text-left {
  color: black;
  word-wrap: break-word;
}

.talk-bubble {
  margin: 20px;
  display: inline-block;
  position: relative;
  width: 200px;
  height: auto;
  background-color: lightyellow;
  padding-left: 10px;
  padding-right: 10px;
}

.border {
  border: 8px solid #666;
}
.round {
  border-radius: 30px;
  -webkit-border-radius: 30px;
  -moz-border-radius: 30px;
}

/* bubble no. 1 start */
/* Right triangle, left side slightly down */
.tri-right.border.left-in:before {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: -40px;
  right: auto;
  top: 30px;
  bottom: auto;
  border: 20px solid;
  border-color: #666 #666 transparent transparent;
}
.tri-right.left-in:after {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: -20px;
  right: auto;
  top: 38px;
  bottom: auto;
  border: 12px solid;
  border-color: lightblue lightblue transparent transparent;
}

/* bubble no. 1 end */

/* bubble no. 2 start */

/*Right triangle, placed bottom right side slightly in*/
.tri-right.border.btm-right:before {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: auto;
  right: -8px;
  bottom: -40px;
  border: 20px solid;
  border-color: #666 #666 transparent transparent;
}
.tri-right.btm-right:after {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: auto;
  right: 0px;
  bottom: -20px;
  border: 12px solid;
  border-color: lightyellow lightyellow transparent transparent;
}
/* bubble no. 2 end */
</style>
