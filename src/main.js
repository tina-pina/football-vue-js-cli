import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// bootstrap

import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue);


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// font awesome

import {
  library
} from '@fortawesome/fontawesome-svg-core'
import {
  faFutbol,
  faTable,
  faRunning
} from '@fortawesome/free-solid-svg-icons'
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'

library.add(faFutbol)
library.add(faTable)
library.add(faRunning)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
