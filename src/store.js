import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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
    productInfo(state) {
      const info = {
        total: 0,
        count: 0,
        list: []
      }
      state.goodsList.forEach((item, lv1) => {
        item.foods.forEach((food, lv2) => {
          if (food.productNum > 0) {
            food.lv1 = lv1
            food.lv2 = lv2
            info.list.push(food)
            info.count += food.productNum
            info.total += (food.productNum * food.price)
          }
        })
      })
      return info
    }
  }
})
