import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins'
import vuetify from './plugins/vuetify'
import { sync } from 'vuex-router-sync'
import CKEditor from '@ckeditor/ckeditor5-vue'
import { defaultRoute, pathAccepted } from './data'

const loginVerification = require('../src/utils/isLogged')

Vue.use(CKEditor)

sync(store, router)

export const EventBus = new Vue()

Vue.config.productionTip = false

router.beforeEach(async (to, from, next) => {
  const isAllowed = await loginVerification.isLogged()
  console.log('ruta to : ' + to.path + ' ruta from: ' + from.path)
  if (isAllowed) {
    if (to.path !== pathAccepted) {
      next(pathAccepted)
    } else {
      next()
    }
  } else {
    if (to.path !== defaultRoute) {
      next(defaultRoute)
    } else {
      next()
    }
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
