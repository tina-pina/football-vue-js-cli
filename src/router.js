import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Landing from './views/Landing.vue'
import Teams from './views/Teams.vue'
import Matches from './views/Matches.vue'
import More from './views/More.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/teams',
      name: 'Teams',
      component: Teams
    },
    {
      path: '/matches',
      name: 'Matches',
      component: Matches
    },
    {
      path: '/more',
      name: 'More',
      component: More
    },
  ]
})
