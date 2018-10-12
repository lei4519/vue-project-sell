import Vue from 'vue'
import axios from 'axios'

import './common/scss/index.scss'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
