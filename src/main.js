import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from "firebase/app";

Vue.config.productionTip = false

// import maps

import Geocoder from "@pderas/vue2-geocoder";

Vue.use(Geocoder, {
  googleMapsApiKey: "AIzaSyBKBdq1yiLk5-pQQnRn9q-VFRwkmpJ96OA"
});

import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBKBdq1yiLk5-pQQnRn9q-VFRwkmpJ96OA",
    libraries: "places" // necessary for places input
  }
});

//bootstrap

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// vue modal
import vmodal from 'vue-js-modal'
Vue.use(vmodal)

Vue.config.productionTip = false

// font awesome

import {
  library
} from '@fortawesome/fontawesome-svg-core'
import {
  faFutbol,
  faTable,
  faRunning,
  faHandPointer
} from '@fortawesome/free-solid-svg-icons'
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'

library.add(faFutbol)
library.add(faTable)
library.add(faRunning)
library.add(faHandPointer)

Vue.component('font-awesome-icon', FontAwesomeIcon)

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD8vHD10Ltb9qcoiC667y-kcRyLPIWcyJE",
  authDomain: "football-vue.firebaseapp.com",
  databaseURL: "https://football-vue.firebaseio.com",
  projectId: "football-vue",
  storageBucket: "football-vue.appspot.com",
  messagingSenderId: "760203642493"
};
firebase.initializeApp(config);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
