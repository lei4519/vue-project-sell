import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './common/scss/index.scss'
import { dateFormat } from './common/js/dateFormat'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

Vue.filter('dateFormat', date => dateFormat(date, 'yyyy-MM-dd hh:mm'))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
