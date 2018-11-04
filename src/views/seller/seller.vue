<template>
    <div class="seller-wrapper" ref="sellerWrapper">
        <div class="seller-content">
            <div class="overview">
                <h1 class="title">{{seller.name}}</h1>
                <div class="desc">
                    <Star class="star" :size="36" :score="seller.score"></Star>
                    <span class="text">({{seller.ratingCount}})</span>
                    <span class="text">月售{{seller.sellCount}}单</span>
                </div>
                <div class="favorite">
                    <span class="icon icon-favorite"></span>
                    <span class="text">收藏</span>
                </div>
                <ul class="remark">
                    <li class="block">
                        <h2>起送价</h2>
                        <div class="content">
                            <span class="stress">{{seller.minPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>商家配送</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>平均配送时间</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryTime}}</span>元
                        </div>
                    </li>
                </ul>
            </div>
            <div class="split"></div>
            <div class="bulletin">
                <h2 class="title">公告与活动</h2>
                <p class="content">{{seller.bulletin}}</p>
                <ul v-if="seller.supports" class="supports">
                    <li class="support-item" v-for="(item, i) in seller.supports" :key="i">
                        <span :class="['icon', classMap[item.type]]"></span>
                        <span class="text">{{item.description}}</span>
                    </li>
                </ul>
            </div>
            <div class="split"></div>
            <div class="pics">
                <h2 class="title">商家实景</h2>
                <div class="pic-wrapper" ref="picList">
                    <ul class="pic-list">
                        <li class="pic-item"
                            v-for="(pic, i) in seller.pics" :key="i">
                            <img :src="pic">
                        </li>
                    </ul>
                </div>
            </div>
            <div class="split"></div>
            <div class="info">
                <h2 class="title">商家信息</h2>
                <ul>
                    <li class="info-item" v-for="(item, i) in seller.infos" :key="i">
                        {{item}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
  import Star from '@/components/star/star.vue'
  import BScroll from 'better-scroll'

  export default {
    data: () => ({
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      scroll: null,
      picListScroll: null,
      seller: []
    }),
    async created() {
      try {
        const sellerRes = (await this.axios.get('/api/seller')).data
        if (sellerRes.errCode === 0) {
          this.seller = sellerRes.data
        }
        this.$nextTick(() => {
          this.$refs.picList.children[0].style.width = this.seller.pics.length * 126 + 'px'
        })
        if (!this.scroll) {
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.sellerWrapper, {
              click: true
            })
            this.picListScroll = new BScroll(this.$refs.picList, {
              scrollY: false,
              scrollX: true
            })
          })
        } else {
          this.scroll.refresh()
        }
      } catch (err) {
        alert(err.message)
      }
    },
    components: {
      Star
    }
  }
</script>

<style lang="scss" scoped>
    @import "../../common/scss/mixin";

    .seller-wrapper {
        position: absolute;
        top: 174px;
        bottom: 0;
        left: 0;
        width: 100%;
        overflow: hidden;
        .seller-content {
            .overview {
                position: relative;
                padding: 18px;
                .title {
                    font-size: 14px;
                    line-height: 14px;
                    color: rgb(7, 17, 27);
                    margin-bottom: 8px;
                }
                .desc {
                    font-size: 0;
                    padding-bottom: 18px;
                    @include border-1px(rgba(7, 17, 27, 0.1));
                    .star {
                        display: inline-block;
                        vertical-align: top;
                        margin-right: 8px;
                    }
                    .text {
                        display: inline-block;
                        vertical-align: top;
                        margin-right: 12px;
                        font-size: 10px;
                        line-height: 18px;
                        color: rgb(77, 85, 93);
                    }
                }
                .favorite {
                    position: absolute;
                    right: 11px;
                    text-align: center;
                    top: 18px;
                    width: 50px;
                    .icon {
                        display: block;
                        font-size: 24px;
                        line-height: 24px;
                        color: rgb(240, 20, 20);
                        margin-bottom: 4px;
                    }
                    .text {
                        font-size: 10px;
                        line-height: 10px;
                        color: rgb(77, 85, 93);
                    }
                }
                .remark {
                    padding-top: 18px;
                    display: flex;
                    justify-content: space-around;
                    .block {
                        position: relative;
                        flex: 1;
                        text-align: center;
                        &::after {
                            position: absolute;
                            top: 0;
                            right: 0;
                            width: 1px;
                            height: 100%;
                            background-color: rgba(7, 17, 27, 0.1);
                            content: '';
                        }
                        &:last-child{
                            &::after{
                                display: none;
                            }
                        }
                        h2 {
                            font-size: 10px;
                            line-height: 10px;
                            color: rgb(147, 153, 159);
                            margin-bottom: 4px;
                        }
                        .content {
                            font-size: 10px;
                            line-height: 24px;
                            .stress {
                                font-size: 24px;
                                font-weight: 200;
                                color: rgb(7, 17, 27);
                            }
                        }
                    }
                }
            }
            .bulletin {
                padding: 18px;
                padding-bottom: 0;
                .title {
                    font-size: 14px;
                    line-height: 14px;
                    color: rgb(7, 17, 27);
                    margin-bottom: 8px;
                }
                .content {
                    padding: 0 12px 16px 12px;
                    font-size: 12px;
                    line-height: 24px;
                    color: rgb(240, 20, 20);
                    font-weight: 200;
                    @include border-1px(rgba(7, 17, 27, 0.1));
                }
                .supports {
                    .support-item {
                        font-size: 0;
                        padding: 16px 12px;
                        .icon {
                            display: inline-block;
                            vertical-align: top;
                            width: 16px;
                            height: 16px;
                            margin-right: 6px;
                            &.decrease {
                                @include bgImg("./images/decrease_4");
                            }
                            &.discount {
                                @include bgImg("./images/discount_4");
                            }
                            &.guarantee {
                                @include bgImg("./images/guarantee_4");
                            }
                            &.invoice {
                                @include bgImg("./images/invoice_4");
                            }
                            &.special {
                                @include bgImg("./images/special_4");
                            }
                        }
                        span {
                            display: inline-block;
                            vertical-align: top;
                            font-size: 12px;
                            line-height: 16px;
                            font-weight: 200;
                            color: rgb(7, 17, 27);
                        }
                    }
                }
            }
            .pics {
                padding: 18px;
                .title {
                    font-size: 14px;
                    line-height: 14px;
                    color: rgb(7, 17, 27);
                    margin-bottom: 12px;
                }
                .pic-wrapper {
                    width: 100%;
                    overflow: hidden;
                    white-space: nowrap;
                    .pic-list {
                        font-size: 0;
                        .pic-item {
                            display: inline-block;
                            height: 90px;
                            width: 120px;
                            margin-right: 6px;
                            &:last-child {
                                margin-right: 0;
                            }
                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
                }
            }
            .info {
                padding: 18px;
                .title {
                    font-size: 14px;
                    line-height: 14px;
                    color: rgb(7, 17, 27);
                    padding-bottom: 12px;
                    @include border-1px(rgba(7, 17, 27, 0.1));
                }
                .info-item {
                    padding: 16px 12px;
                    font-size: 12px;
                    line-height: 16px;
                    font-weight: 200;
                    color: rgb(7, 17, 27);
                    @include border-1px(rgba(7, 17, 27, 0.1));
                    &:last-child {
                        padding-bottom: 0;
                        &::after {
                            border: none;
                        }
                    }
                }
            }
        }
    }
</style>
