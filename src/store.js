import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    goodsList: []
  },
  mutations: {
    initGoodsList(state, dataArr) {
      state.goodsList = dataArr
    },
    alterProductNum(state, options) {
      state.goodsList[options.lv1].foods[options.lv2].productNum += options.count
    }
  },
  getters: {
    productTotal(state) {
      let total = 0
      state.goodsList.forEach((item) => {
        total += item.foods.reduce((acc, cur) => acc + cur.productNum, 0)
      })
      return total
    },
    productList(state) {
      const list = []
      state.goodsList.forEach((item) => {
        item.foods.forEach((food) => {
          if (food.productNum > 0) {
            list.push(food)
          }
        })
      })
      return list
    }
  },
});
