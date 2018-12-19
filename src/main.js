import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase/app'

import Geocoder from '@pderas/vue2-geocoder'

import BootstrapVue from 'bootstrap-vue'
import {
  library
} from '@fortawesome/fontawesome-svg-core'
import {
  faFutbol,
  faTable,
  faRunning,
  faHandPointer,
  faComment,
  faSignOutAlt,
  faHome,
  faTrophy
} from '@fortawesome/free-solid-svg-icons'
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// vue modal
import vmodal from 'vue-js-modal'

import Vuebar from 'vuebar'

import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false
Vue.use(Vuebar)

Vue.use(Geocoder, {
  googleMapsApiKey: 'AIzaSyBKBdq1yiLk5-pQQnRn9q-VFRwkmpJ96OA'
})
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBKBdq1yiLk5-pQQnRn9q-VFRwkmpJ96OA',
    libraries: 'places' // necessary for places input
  }
})

// bootstrap
Vue.use(BootstrapVue)

Vue.use(vmodal)

Vue.config.productionTip = false

// font awesome
library.add(faFutbol)
library.add(faTable)
library.add(faRunning)
library.add(faHandPointer)
library.add(faComment)
library.add(faSignOutAlt)
library.add(faHome)
library.add(faTrophy)

Vue.component('font-awesome-icon', FontAwesomeIcon)

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyD8vHD10Ltb9qcoiC667y-kcRyLPIWcyJE',
  authDomain: 'football-vue.firebaseapp.com',
  databaseURL: 'https://football-vue.firebaseio.com',
  projectId: 'football-vue',
  storageBucket: 'football-vue.appspot.com',
  messagingSenderId: '760203642493'
}
firebase.initializeApp(config)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
