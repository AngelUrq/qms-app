import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins'
import vuetify from './plugins/vuetify'
import { sync } from 'vuex-router-sync'
import CKEditor from '@ckeditor/ckeditor5-vue'
const loginVerification = require('../src/utils/isLogged')

Vue.use(CKEditor)

sync(store, router)

export const EventBus = new Vue()

Vue.config.productionTip = false

router.beforeEach(async (to, from, next) => {
  const isAllowed = await loginVerification.isLogged()
  if (!isAllowed && to.path !== '/') {
    next('/')
  } else if (isAllowed && from.path === '/' && to.path === '/') {
    next('/dashboard')
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
