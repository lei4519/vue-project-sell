<template>
    <div class="header">
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
            <div v-if="seller.supports" class="support-count" @click="showDetail">
                <span class="count">{{ seller.supports.length }}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrapper"  @click="showDetail">
            <span class="bulletin-title"></span><span class="bulletin-text">{{ seller.bulletin }}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%">
        </div>
        <transition name="fade">
          <div v-show="detailShow" class="detail">
          <div class="detail-wrapper clearfix">
            <div class="detail-main">
              <h1 class="name">{{ seller.name }}</h1>
              <div class="star-wrapper">
                <Star :size="48" :score="seller.score"></Star>
              </div>
              <div class="title">
                <div class="line"></div>
                <div class="text">优惠信息</div>
                <div class="line"></div>
              </div>
              <ul v-if="seller.supports" class="supports">
                <li class="support-item" v-for="(item, i) in seller.supports" :key="i">
                  <span :class="['icon', classMap[item.type]]"></span>
                  <span class="text">{{item.description}}</span>
                </li>
              </ul>
              <div class="title">
                <div class="line"></div>
                <div class="text">商家公告</div>
                <div class="line"></div>
              </div>
              <div class="bulletin">
                <p class="content">{{ seller.bulletin }}</p>
              </div>
            </div>
            </div>
            <div class="detail-close" @click="hiddenDetail">
              <i class="icon-close"></i>
            </div>
          </div>
        </transition>
    </div>
</template>

<script>
import Star from "@/components/star/star";

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
    showDetail() {
      this.detailShow = true;
    },
    hiddenDetail() {
      this.detailShow = false;
    }
  },
  components: {
    Star
  }
};
</script>

<style lang="scss" scoped>
@import "../../common/scss/mixin.scss";
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
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
    backdrop-filter: blur(10px);
    background-color: rgba(7, 17, 27, 0.8);
    color: #fff;
    text-align: center;
    .detail-wrapper {
      width: 100%;
      min-height: 100%;
      .detail-main {
        padding: 64px 0;
        .name {
          line-height: 16px;
          font-size: 16px;
          text-align: center;
          font-weight: 700;
        }
        .star-wrapper {
          margin-top: 18px;
          padding: 2px 0;
        }
        .title {
          display: flex;
          width: 80%;
          margin: 28px auto 24px auto;
          .line {
            flex: 1;
            position: relative;
            top: -6px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          }
          .text {
            padding: 0 12px;
            font-size: 14px;
            font-weight: 700;
          }
        }
        .supports {
          width: 80%;
          margin: 0 auto;
          .support-item {
            padding: 0 12px;
            margin-bottom: 12px;
            font-size: 0;
            text-align: left;
            &:last-child {
              margin-bottom: 0;
            }
            .icon {
              display: inline-block;
              width: 16px;
              height: 16px;
              vertical-align: top;
              margin-right: 6px;
              &.decrease {
                @include bgImg("./images/decrease_2");
              }
              &.discount {
                @include bgImg("./images/discount_2");
              }
              &.guarantee {
                @include bgImg("./images/guarantee_2");
              }
              &.invoice {
                @include bgImg("./images/invoice_2");
              }
              &.special {
                @include bgImg("./images/special_2");
              }
            }
            .text {
              line-height: 16px;
              font-size: 12px;
            }
          }
        }
        .bulletin {
          width: 80%;
          margin: 0 auto;
          .content {
            padding: 0 12px;
            line-height: 24px;
            font-size: 12px;
            text-align: left;
          }
        }
      }
    }
    .detail-close {
      position: relative;
      width: 32px;
      height: 32px;
      margin: -64px auto 0 auto;
      clear: both;
      font-size: 32px;
      .icon-close {
        display: inline-block;
      }
    }
  }
}
</style>
