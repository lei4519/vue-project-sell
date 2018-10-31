import Vue from 'vue';
import Router from 'vue-router';

import Goods from '@/views/goods/goods'
import Ratings from '@/views/ratings/ratings'
import Seller from '@/views/seller/seller'
import goodsInfo from '@/views/goods/goodsInfo'

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
      children: [
        {
          path: 'goodsInfo/:lv1/:lv2',
          component: goodsInfo
        }
      ],
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
