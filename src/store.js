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
    },
    clearProductList(state) {
      state.goodsList.forEach((item) => {
        item.foods.forEach((food) => {
          food.productNum = 0
        })
      })
    }
  }
})
