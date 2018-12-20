import firebase from 'firebase/app'
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Landing from './views/Landing.vue'
import Teams from './views/Teams.vue'
import Matches from './views/Matches.vue'
import More from './views/More.vue'
import Lifechat from './views/Lifechat.vue'

Vue.use(Router)

let router = new Router({
  routes: [{
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/home',
      name: 'Home',
      meta: {
        requiresAuth: true
      },
      component: Home
    },
    {
      path: '/teams',
      name: 'Teams',
      meta: {
        requiresAuth: true
      },
      component: Teams
    },
    {
      path: '/matches',
      name: 'Matches',
      meta: {
        requiresAuth: true
      },
      component: Matches
    },
    {
      path: '/more',
      name: 'More',
      meta: {
        requiresAuth: true
      },
      component: More
    },
    {
      path: '/lifechat',
      name: 'Lifechat',
      meta: {
        requiresAuth: true
      },
      component: Lifechat
    }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser) {
    next({
      path: '/home'
    })
  } else if (!requiresAuth && currentUser) {
    next({
      path: '/home'
    })
  } else next()
})

export default router
