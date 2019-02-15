<template>
  <div class="goods-wrapper">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul ref="goodsList">
        <li
          class="menu-item"
          v-for="(item, i) in goodsList"
          :key="i"
          :class="{'current': checkedIndex === i}"
          @click="selectedMenu(i, $event)"
        >
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul ref="goodsInfo">
        <li v-for="(item, lv1Index) in goodsList" :key="lv1Index" class="food-list">
          <h2 class="title">{{ item.name }}</h2>
          <ul>
            <li class="food-item" v-for="(food, lv2Index) in item.foods" :key="lv2Index">
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h3 class="name" @click="selectedFood=food;isFoodShow=true">{{ food.name }}</h3>
                <p class="describe">{{ food.description }}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥{{food.price}}</span>
                  <del class="old" v-if="food.oldPrice">¥{{food.oldPrice}}</del>
                </div>
                <div class="cartcontrol-wrapper">
                  <cart-control
                    :lv1="lv1Index"
                    :lv2="lv2Index"
                    :productNum="food.productNum"
                    @cartAdd="cartAdd"
                  ></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shop-cart ref="shopCart"></shop-cart>
    <transition>
      <goods-info
        v-if="isFoodShow"
        @closeFoodInfo="closeFoodInfo"
        @cartAdd="cartAdd"
        :food="selectedFood"
      ></goods-info>
    </transition>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import cartControl from '@/components/cartControl/cartControl.vue'
import shopCart from '@/components/shopCart/shopCart.vue'
import goodsInfo from '@/views/goods/goodsInfo.vue'

export default {
  name: 'goods',
  data() {
    return {
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      scrollHeightList: [],
      foodsScroll: null,
      menuScroll: null,
      scrollY: 0,
      isFoodShow: false,
      selectedFood: null
    }
  },
  methods: {
    _initScroll() {
      if (!this.menuScroll) {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
      } else {
        this.menuScroll.refresh()
      }
      if (!this.foodsScroll) {
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3,
          click: true
        })
      } else {
        this.menuScroll.refresh()
      }
      const li = Array.from(this.$refs.goodsInfo.children)
      this.scrollHeightList = li.map(item => item.offsetTop)
    },
    selectedMenu(i, e) {
      if (!e._constructed) {
        return
      }
      this.foodsScroll.scrollToElement(this.$refs.goodsInfo.children[i], 300)
    },
    cartAdd(el) {
      this.$nextTick(() => {
        this.$refs.shopCart.drop(el)
      })
    },
    closeFoodInfo() {
      this.isFoodShow = false
    }
  },
  computed: {
    goodsList() {
      return this.$store.state.goodsList
    },
    checkedIndex() {
      const index = this.scrollHeightList.findIndex(item => item > Math.abs(this.scrollY))
      return index !== -1 ? index - 1 : this.scrollHeightList.length - 1
    }
  },
  async created() {
    try {
      const res = (await this.axios.get('/api/goods')).data
      if (res.errCode === 0) {
        res.data.forEach((item, lv1) => {
          item.foods.forEach((subItem, lv2) => {
            subItem.lv1 = lv1
            subItem.lv2 = lv2
            subItem.productNum = 0
          })
        })
        this.$store.commit('initGoodsList', res.data)
        this.$nextTick(() => {
          this._initScroll()
          this.foodsScroll.on('scroll', pos => {
            this.scrollY = pos.y
            this.menuScroll.scrollToElement(
              this.$refs.goodsList.children[this.checkedIndex],
              300
            )
          })
        })
      } else {
        alert('商品信息获取失败')
      }
    } catch (err) {
      alert(err.message)
    }
  },
  components: {
    cartControl,
    shopCart,
    goodsInfo
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/scss/mixin.scss";

.v-enter,
.v-leave-to {
  transform: translateX(100%);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s;
}

.goods-wrapper {
  display: flex;
  position: absolute;
  top: 170px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;
  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background-color: #f3f5f7;
    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;
      &.current {
        position: relative;
        z-index: 10;
        background-color: #fff;
        margin-top: -1px;
        border: none;
        font-weight: 700;
        .text::after {
          border: none;
        }
      }
      .icon {
        display: inline-block;
        vertical-align: top;
        margin-right: 2px;
        width: 12px;
        height: 12px;
        &.decrease {
          @include bgImg("./images/decrease_3");
        }
        &.discount {
          @include bgImg("./images/discount_3");
        }
        &.guarantee {
          @include bgImg("./images/guarantee_3");
        }
        &.invoice {
          @include bgImg("./images/invoice_3");
        }
        &.special {
          @include bgImg("./images/special_3");
        }
      }
      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        font-size: 12px;
        @include border-1px(rgba(7, 17, 27, 0.1));
      }
    }
  }
  .foods-wrapper {
    flex: 1;
    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background-color: #f3f5f7;
    }
    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      @include border-1px(rgba(7, 17, 27, 0.1));
      &:last-child {
        margin-bottom: 0;
        &::after {
          border: none;
        }
      }
      .icon {
        flex: 0 0 57px;
        width: 57px;
        margin-right: 10px;
      }
      .content {
        flex: 1;
        .name {
          font-size: 14px;
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          color: rgb(7, 17, 27);
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .describe,
        .extra {
          font-size: 10px;
          line-height: 10px;
          color: rgb(147, 153, 159);
        }
        .describe {
          line-height: 12px;
          margin-bottom: 8px;
        }
        .extra {
          .count {
            margin-right: 12px;
          }
        }
        .price {
          font-weight: 700;
          line-height: 24px;
          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }
          .old {
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 10px;
        }
      }
    }
  }
}
</style>
