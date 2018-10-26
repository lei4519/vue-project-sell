import Vue from 'vue';
import Router from 'vue-router';

import Goods from '@/views/goods/goods'
import Ratings from '@/views/ratings/ratings'
import Seller from '@/views/seller/seller'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
			component: Goods,
			meta: {
				keepAlive: true
			}
    },
    {
      path: '/ratings',
      component: Ratings
    },
    {
      path: '/seller',
      component: Seller
    }
  ]
})
