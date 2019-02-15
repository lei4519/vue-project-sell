<template>
  <div class="shop-cart">
    <div class="content">
      <div class="content-left" @click="setListShow">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight': productInfo.count}">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="num" v-show="productInfo.count">{{ productInfo.count }}</div>
        </div>
        <div class="price" :class="{'highlight': productInfo.total}">￥ {{ productInfo.total }}</div>
        <div class="desc">另需配送费 ￥{{seller.deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div
          class="pay"
          @click="pay"
          :class="[ text === '去结算' ? 'enough' : 'not-enough']"
          v-text="text"
        ></div>
      </div>
    </div>
    <div class="ball-container">
      <div v-for="(ball,index) in balls" :key="index">
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
    <transition name="down2up">
      <div class="shop-cart-list" v-show="isListShow" ref="shop-cart-list">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="$store.commit('clearProductList')">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food" v-for="(food, i) in productInfo.list" :key="i">
              <span class="name">{{ food.name }}</span>
              <div class="price">
                <span>￥{{ food.productNum * food.price }}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cart-control
                  :productNum="food.productNum"
                  :lv1="food.lv1"
                  :lv2="food.lv2"
                  @cartAdd="cartAdd"
                ></cart-control>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="list-mask" @click="setListShow" v-show="isListShow"></div>
    </transition>
  </div>
</template>

<script>
/* eslint-disable */
import cartControl from '@/components/cartControl/cartControl.vue'
import BScroll from 'better-scroll'
const innerClsHook = 'inner-hook'
export default {
  data: () => ({
    seller: [],
    isListClick: false,
    balls: [
      {
        show: false
      },
      {
        show: false
      },
      {
        show: false
      },
      {
        show: false
      },
      {
        show: false
      }
    ],
    dropBalls: [],
    scroll: null
  }),
  methods: {
    pay() {
      if (this.productInfo.total < 20) {
        return
      }
      window.alert(`支付${this.productInfo.total}元`)
    },
    setListShow() {
      if (this.productInfo.count !== 0) {
        this.isListClick = !this.isListClick
      }
    },
    cartAdd(el) {
      this.drop(el)
    },
    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        const ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    beforeEnter(el) {
      const ball = this.dropBalls[this.dropBalls.length - 1]
      const rect = ball.el.getBoundingClientRect()
      const x = rect.left - 32
      const y = -(window.innerHeight - rect.top - 22)
      el.style.display = ''
      el.style.transform = el.style.webkitTransform = `translate3d(0,${y}px,0)`
      const inner = el.getElementsByClassName(innerClsHook)[0]
      inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px,0,0)`
    },
    enter(el, done) {
      this._reflow = document.body.offsetHeight
      el.style.transform = el.style.webkitTransform = `translate3d(0,0,0)`
      const inner = el.getElementsByClassName(innerClsHook)[0]
      inner.style.transform = inner.style.webkitTransform = `translate3d(0,0,0)`
      el.addEventListener('transitionend', done)
    },
    afterEnter(el) {
      const ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    }
  },
  computed: {
    productInfo() {
      const info = {
        total: 0,
        count: 0,
        list: []
      }
      this.$store.state.goodsList.forEach((item) => {
        item.foods.forEach((food) => {
          if (food.productNum > 0) {
            info.list.push(food)
            info.count += food.productNum
            info.total += (food.productNum * food.price)
          }
        })
      })
      return info
    },
    text() {
      if (this.productInfo.total === 0) {
        return `￥${this.seller.minPrice}起送`
      } else if (this.productInfo.total < this.seller.minPrice) {
        return `还差￥${this.seller.minPrice - this.productInfo.total}起送`
      }
      return '去结算'
    },
    isListShow() {
      if (this.productInfo.count === 0) {
        this.isListClick = false
      }
      const show = this.productInfo.count !== 0 && this.isListClick === true
      if (!this.scroll) {
        if (show) {
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            })
          })
        }
      }
      return show
    }
  },
  components: {
    cartControl
  },
  async created() {
    try {
      const res = (await this.axios.get('/api/seller')).data
      if (res.errCode === 0) {
        this.seller = res.data
      }
    } catch (err) {
      alert(err.message)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/scss/mixin.scss";

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

.down2up-enter-active {
  animation: move 0.5s;
}

.down2up-leave-active {
  animation: move 0.5s reverse;
}

@keyframes move {
  from {
    transform: translate3d(0, 0%, 0);
  }
  to {
    transform: translate3d(0, -100%, 0);
  }
}

.shop-cart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 48px;
  .content {
    display: flex;
    background-color: #141d27;
    .content-left {
      flex: 1;
      .logo-wrapper {
        display: inline-block;
        vertical-align: top;
        box-sizing: border-box;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        height: 56px;
        width: 56px;
        border-radius: 50%;
        background-color: #141d27;
        text-align: center;
        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: center;
          background: #2b343c;
          &.highlight {
            background: #00a0dc;
            i {
              color: #fff;
            }
          }
          i {
            line-height: 44px;
            font-size: 24px;
            color: #80858a;
          }
        }
        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight: 700;
          color: #fff;
          background: #f01414;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        }
      }
      .price {
        display: inline-block;
        vertical-align: top;
        margin-top: 12px;
        line-height: 24px;
        padding-right: 12px;
        box-sizing: border-box;
        border-right: 1px solid hsla(0, 0%, 100%, 0.1);
        font-size: 16px;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.4);
        &.highlight {
          color: #fff;
        }
      }
      .desc {
        display: inline-block;
        vertical-align: top;
        margin: 12px 0 0 12px;
        line-height: 24px;
        font-size: 10px;
        color: rgba(255, 255, 255, 0.4);
      }
    }
    .content-right {
      flex: 0 0 105px;
      width: 105px;
      .pay {
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.4);
        &.not-enough {
          background-color: #2b333b;
        }
        &.enough {
          background-color: #00b43c;
          color: #fff;
        }
      }
    }
  }
  .ball-container {
    .ball {
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 99;
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
      .inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: rgb(0, 160, 220);
        transition: all 0.4s linear;
      }
    }
  }
  .shop-cart-list {
    transform: translate3d(0, -100%, 0);
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    .list-header {
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      .title {
        float: left;
        font-size: 14px;
        color: #07111b;
      }
      .empty {
        float: right;
        font-size: 12px;
        color: #00a0dc;
      }
    }
    .list-content {
      padding: 0 18px;
      max-height: 217px;
      overflow: hidden;
      background: #fff;
      .food {
        padding: 12px 0;
        box-sizing: border-box;
        position: relative;
        @include border-1px(rgba(7, 17, 27, 0.1));
        .name {
          line-height: 24px;
          font-size: 14px;
          color: #07111b;
        }
        .price {
          position: absolute;
          right: 90px;
          bottom: 12px;
          line-height: 24px;
          font-size: 14px;
          font-weight: 700;
          color: #f01414;
        }
        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 6px;
        }
      }
    }
  }
  .list-mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -10;
    background-color: rgba(7, 17, 27, 0.6);
    backdrop-filter: blur(10px);
  }
}
</style>
