import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins'
import vuetify from './plugins/vuetify'
import { sync } from 'vuex-router-sync'
import CKEditor from '@ckeditor/ckeditor5-vue'
import { defaultRoute, dashboardRoute, loginRoute } from './data'

const loginVerification = require('../src/utils/isLogged')

Vue.use(CKEditor)

sync(store, router)

export const EventBus = new Vue()

Vue.config.productionTip = false

router.beforeEach(async (to, from, next) => {
  var isAllowed = await loginVerification.isLogged()

  if (isAllowed === undefined) {
    isAllowed = false
  } if (isAllowed) {
    if (to.path === defaultRoute || to.path === loginRoute) {
      next(dashboardRoute)
    } else {
      next()
    }
  } else {
    if (to.path === loginRoute) {
      next()
    } else {
      next(loginRoute)
    }
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
