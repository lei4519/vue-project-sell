<template>
  <div class="shop-cart">
    <div class="content">
      <div class="content-left" @click="isListShow=true">
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
        <div class="pay" :class="[ text === '去结算' ? 'enough' : 'not-enough']" v-text="text"></div>
      </div>
    </div>
    <transition>
      <div class="shop-cart-list" v-if="isListShow" ref="shop-cart-list">
        <div class="list-header"><h1 class="title">购物车</h1> <span class="empty">清空</span></div>
        <div class="list-content">
          <ul>
            <li class="food" v-for="(food, i) in productInfo.list" :key="i">
              <span class="name">{{ food.name }}</span>
              <div class="price"><span>￥{{ food.productNum * food.price }}</span></div>
              <div class="cartcontrol-wrapper">
                <cart-control :productNum="food.productNum" :lv1="food.lv1" :lv2="food.lv2"></cart-control>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
    import cartControl from '@/components/cartControl/cartControl.vue'

    export default {
        data: () => ({
            seller: [],
            isListShow: false
        }),
        methods: {
        },
        computed: {
            productInfo() {
                return this.$store.getters.productInfo
            },
            text() {
                if (this.productInfo.total === 0) {
                    return `￥${this.seller.minPrice}起送`
                } else if (this.productInfo.total < this.seller.minPrice) {
                    return `还差￥${this.seller.minPrice - this.productInfo.total}起送`
                }
                return '去结算'
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

  .v-enter, .v-leave-to {
    transform: translate3d(0, 0, 0);
  }

  .v-enter-active, .v-leave-active {
    transition: transform 3.5s linear;
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
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4);
          }
        }
        .price {
          display: inline-block;
          vertical-align: top;
          margin-top: 12px;
          line-height: 24px;
          padding-right: 12px;
          box-sizing: border-box;
          border-right: 1px solid hsla(0, 0%, 100%, .1);
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
    .shop-cart-list {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      width: 100%;
      transform: translate3d(0, -100%, 0);
      .list-header {
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, .1);
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
          @include border-1px(rgba(7, 17, 27, .1));
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
  }
</style>
