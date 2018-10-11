<template>
    <div class="header" @click="toggle">
        <div class="content-wrapper">
            <div class="avatar">
                <img width="64" height="64" :src="seller.avatar">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{ seller.name }}</span>
                </div>
                <div class="description">
                    {{ seller.description }}/{{ seller.deliveryTime }}分钟送达
                </div>
                <div v-if="seller.supports" class="support">
                    <span :class="['icon', classMap[seller.supports[0].type]]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="support-count">
                <span class="count">{{ seller.supports.length }}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrapper">
            <span class="bulletin-title"></span><span class="bulletin-text">{{ seller.bulletin }}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%">
        </div>
        <div v-show="detailShow" class="detail">
          <div class="title-info">
            <div class="store-name">{{ seller.name }}</div>
            <div class="score">
              <span class="start"></span>
              <span class="start"></span>
              <span class="start"></span>
              <span class="start"></span>
              <span class="start"></span>
            </div>
          </div>
          <div class="discount-info">
            <div class="discount-title title-line">优惠信息</div>
            <span class="bulletin-title"></span><span class="bulletin-text"></span>
          </div>
          <div class="bulletin-info">
            <div class="bulletin-title"></div>
            <div class="bulletin-text"></div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  data: () => ({
    classMap: ["decrease", "discount", "special", "invoice", "guarantee"],
    detailShow: false
  }),
  props: {
    seller: {
      type: Object
    }
  },
  methods: {
    toggle() {
      this.detailShow = !this.detailShow;
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "../../common/scss/mixin.scss";
.header {
  position: relative;
  color: #fff;
  background-color: rgba(7, 17, 27, 0.5);
  overflow: hidden;
  .content-wrapper {
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0;
    line-height: 0;
    .avatar {
      display: inline-block;
      vertical-align: top;
      img {
        border-radius: 2px;
      }
    }
    .content {
      display: inline-block;
      font-size: 14px;
      margin-left: 16px;
      .title {
        margin: 2px 0 8px 0;
        .brand {
          display: inline-block;
          width: 30px;
          height: 18px;
          @include bgImg("./images/brand");
          vertical-align: top;
        }
        .name {
          margin-left: 6px;
          font-size: 16px;
          line-height: 18px;
          font-weight: bold;
        }
      }
      .description {
        font-size: 12px;
        line-height: 12px;
        margin-bottom: 10px;
      }
      .support {
        margin-bottom: 2px;
        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          &.decrease {
            @include bgImg("./images/decrease_1");
          }
          &.discount {
            @include bgImg("./images/discount_1");
          }
          &.guarantee {
            @include bgImg("./images/guarantee_1");
          }
          &.invoice {
            @include bgImg("./images/invoice_1");
          }
          &.special {
            @include bgImg("./images/special_1");
          }
          vertical-align: top;
        }
        .text {
          font-size: 10px;
          line-height: 12px;
          margin-left: 4px;
        }
      }
    }
    .support-count {
      position: absolute;
      right: 12px;
      bottom: 14px;
      padding: 0 8px;
      height: 24px;
      line-height: 24px;
      border-radius: 14px;
      background-color: rgba(0, 0, 0, 0.2);
      text-align: center;
      .count {
        vertical-align: top;
        font-size: 10px;
      }
      .icon-keyboard_arrow_right {
        line-height: 24px;
        margin-left: 2px;
        font-size: 10px;
      }
    }
  }
  .bulletin-wrapper {
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: rgba(7, 17, 27, 0.2);
    .bulletin-title {
      vertical-align: top;
      display: inline-block;
      margin-top: 8px;
      width: 22px;
      height: 12px;
      @include bgImg("./images/bulletin");
    }
    .bulletin-text {
      vertical-align: top;
      margin: 0 4px;
      font-size: 10px;
    }
    .icon-keyboard_arrow_right {
      position: absolute;
      top: 8px;
      right: 12px;
      font-size: 10px;
    }
  }
  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }
  .detail {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(7, 17, 27, 0.8);
    color: #fff;
    text-align: center;
    .title-info {
      .store-name {
        margin-top: 64px;
        line-height: 16px;
        font-size: 16px;
        font-weight: 700;
      }
      .score {
        margin: 16px 0 28px 0;
        .start {
          display: inline-block;
          height: 24px;
          width: 22px;
          margin-right: 10px;
          @include bgImg("./images/star48_on");
        }
      }
    }
    .discount-info {
      .discount-title {
        line-height: 14px;
        font-size: 14px;
        font-weight: 700;
      }
      .bulletin-title {
      }
    }
    .bulletin-info {
      .bulletin-title {
        line-height: 14px;
        font-size: 14px;
        font-weight: 700;
      }
      .bulletin-text {
      }
    }
    .title-line {
      position: relative;
      &::after,
      &::before {
        position: absolute;
        top: 5px;
        height: 1px;
        width: 112px;
        content: "";
        background-color: rgba(255, 255, 255, 0.2);
      }
      &::after {
        left: 36px;
      }
      &::before {
        right: 36px;
      }
    }
  }
}
</style>
