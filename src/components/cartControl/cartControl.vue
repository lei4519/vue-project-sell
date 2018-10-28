<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="productNum" @click="alterProductNum('sub')">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="productNum">{{ productNum }}</div>
    <div class="cart-add icon-add_circle" @click="alterProductNum('add')"></div>
  </div>
</template>

<script>
  export default {
    props: ['productNum', 'lv1', 'lv2'],
    methods: {
      alterProductNum(type) {
        const count = type === 'sub' ? -1 : 1
        this.$store.commit('alterProductNum', {
          lv1: this.lv1,
          lv2: this.lv2,
          count
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cartcontrol {
    font-size: 0;
    .cart-decrease {
      display: inline-block;
      padding: 6px;
      opacity: 1;
      transform: translateZ(0);
      .inner {
        display: inline-block;
        line-height: 24px;
        font-size: 24px;
        color: #00a0dc;
        transition: all .4s linear;
        transform: rotate(0);
      }
    }
    .cart-count {
      display: inline-block;
      vertical-align: top;
      width: 12px;
      padding-top: 6px;
      line-height: 24px;
      text-align: center;
      font-size: 10px;
      color: #93999f;
    }
    .cart-add {
      display: inline-block;
      padding: 6px;
      line-height: 24px;
      font-size: 24px;
      color: #00a0dc;
    }
  }
</style>
