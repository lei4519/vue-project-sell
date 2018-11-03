<template>
    <div class="food-wrapper">
        <div class="content">
            <div class="banner">
                <img :src="food.image">
            </div>
            <div class="food-content">
                <div class="title">{{ food.name }}</div>
                <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <del class="old" v-if="food.oldPrice">{{food.oldPrice}}</del>
                </div>
                <div class="cartcontrol-wrapper">
                    <cart-control ref="cartCtrl" @cartAdd="cartAdd" :productNum="food.productNum" :lv1="food.lv1"
                                  :lv2="food.lv2"></cart-control>
                </div>
                <transition name="fade">
                    <div class="add-food" v-show="!food.productNum" @click="addFood($event)">加入购物车</div>
                </transition>
            </div>
            <div class="split"></div>
            <div class="info">
                <div class="title">商品介绍</div>
                <div class="desc">{{food.info}}</div>
            </div>
            <div class="back" @click="$emit('closeFoodInfo')">
                <i class="icon-arrow_lift"></i>
            </div>
            <div class="split"></div>
            <div class="rating">
                <div class="title">商品评价</div>
                <rating-select
                        @toggleContent="toggleContent"
                        @select="select"
                        :rating="food.ratings"
                        :selectType="selectType"
                        :onlyContent="onlyContent"
                        :desc="desc">
                </rating-select>
                <div class="rating-wrapper">
                    <div class="no-rating"
                         v-show="!food.ratings || !food.ratings.length">
                        还没有人评论呦~
                    </div>
                    <ul v-show="food.ratings && food.ratings.length">
                        <li v-for="(rating, i) in food.ratings"
                            :key="i"
                            class="rating-item"
                            v-show="isRatingShow(rating)">
                            <div class="rating-info">
                                <div class="time">{{ rating.rateTime | dateFormat }}</div>
                                <div class="user">
                                    <span class="username">{{ rating.username }}</span>
                                    <img :src="rating.avatar" height="12px" width="12px" class="avatar">
                                </div>
                            </div>
                            <div class="rating-content">
                                <span class="praise"
                                      :class="[rating.rateType ? 'icon-thumb_down' : 'icon-thumb_up']"></span>
                                <span class="text">{{ rating.text }}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import cartControl from '@/components/cartControl/cartControl.vue'
  import ratingSelect from '@/components/ratingSelect/ratingSelect.vue'
  import BScroll from 'better-scroll'

  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2
  export default {
    props: {
      food: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        scroll: null,
        selectType: ALL,
        onlyContent: false,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    methods: {
      isRatingShow(rating) {
        if (this.onlyContent && !rating.text) {
          return false
        }
        if (this.selectType !== 2) {
          return rating.rateType === this.selectType
        }
        return true
      },
      addFood(e) {
        this.$refs.cartCtrl.alterProductNum('add', e)
      },
      cartAdd(e) {
        this.$emit('cartAdd', e)
      },
      select(type, e) {
        if (!e._constructed) {
          return
        }
        this.selectType = type
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      toggleContent(e) {
        if (!e._constructed) {
          return
        }
        this.onlyContent = !this.onlyContent
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      }
    },
    components: {
      cartControl,
      ratingSelect
    },
    mounted() {
      if (!this.scroll) {
        this.scroll = new BScroll('.food-wrapper', {
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import "../../common/scss/mixin";

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.3s;
    }

    .food-wrapper {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #fff;
        .content {
            box-sizing: border-box;
            padding-bottom: 48px;
            .banner {
                position: relative;
                width: 100%;
                height: 0;
                padding-top: 100%;
                img {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
            }
            .food-content {
                position: relative;
                padding: 18px;
                .title {
                    margin-bottom: 8px;
                    font-size: 14px;
                    font-weight: 700;
                    line-height: 14px;
                    color: rgb(7, 17, 27);
                }
                .extra {
                    margin-bottom: 18px;
                    font-size: 10px;
                    line-height: 10px;
                    color: rgb(147, 153, 159);
                    .count {
                        margin-right: 12px;
                    }
                }
                .price {
                    line-height: 24px;
                    .now {
                        font-size: 14px;
                        font-weight: 700;
                        color: rgb(240, 20, 20);
                        margin-right: 8px;
                    }
                    .old {
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                }
                .cartcontrol-wrapper {
                    position: absolute;
                    right: 12px;
                    bottom: 12px;
                }
                .add-food {
                    position: absolute;
                    bottom: 18px;
                    right: 18px;
                    z-index: 10;
                    width: 74px;
                    height: 24px;
                    text-align: center;
                    color: #fff;
                    border-radius: 12px;
                    background-color: rgb(0, 160, 220);
                    line-height: 24px;
                    font-size: 10px;
                }
            }
            .info {
                padding: 18px;
                .title {
                    font-size: 14px;
                    line-height: 14px;
                    color: rgb(7, 17, 27);
                }
                .desc {
                    padding: 6px 8px;
                    font-size: 12px;
                    line-height: 24px;
                    font-weight: 200;
                    color: rgb(77, 85, 93);
                }
            }
            .rating {
                padding-top: 18px;
                .title {
                    margin-left: 18px;
                    font-size: 14px;
                    line-height: 14px;
                    color: rgb(7, 17, 27);
                }
                .rating-wrapper {
                    padding: 0 18px;
                    .no-rating {
                        padding: 16px 0;
                        font-size: 12px;
                        line-height: 16px;
                        text-align: center;
                        color: rgb(7, 17, 27);
                    }
                    .rating-item {
                        padding: 16px 0;
                        @include border-1px(rgba(7, 17, 27, 0.1));
                        .rating-info {
                            display: flex;
                            justify-content: space-between;
                            .time {
                                font-size: 10px;
                                line-height: 12px;
                                color: rgb(147, 153, 159);
                            }
                            .user {
                                .username {
                                    display: inline-block;
                                    vertical-align: top;
                                    font-size: 10px;
                                    line-height: 12px;
                                    color: rgb(147, 153, 159);
                                }
                                .avatar {
                                    display: inline-block;
                                    vertical-align: top;
                                    border-radius: 50%;
                                    margin-left: 6px;
                                }
                            }
                        }
                        .rating-content {
                            .praise {
                                margin-right: 4px;
                                font-size: 12px;
                                line-height: 16px;
                                color: rgb(147, 153, 159);
                                &.icon-thumb_up {
                                    color: rgb(0, 160, 200);
                                }
                            }
                            .text {
                                font-size: 12px;
                                line-height: 16px;
                                color: rgb(7, 17, 27);
                            }
                        }
                    }
                }
            }
            .back {
                position: absolute;
                top: 10px;
                padding: 10px;
                font-size: 20px;
                color: #fff;
            }
        }
    }
</style>
