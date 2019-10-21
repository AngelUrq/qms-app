import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './vuexStore/store'
import './plugins'
import vuetify from './plugins/vuetify'
import { sync } from 'vuex-router-sync'
import CKEditor from '@ckeditor/ckeditor5-vue'

Vue.use(CKEditor)

sync(store, router)

export const EventBus = new Vue()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
