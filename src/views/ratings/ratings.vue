<template>
    <div class="ratings-wrapper" ref="ratingsWrapper">
        <div class="ratings">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{ seller.score }}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{ seller.rankRate }}%</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <Star class="star" :size="36" :score="seller.serviceScore"></Star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <Star class="star" :size="36" :score="seller.foodScore"></Star>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <div class="split"></div>
            <rating-select
                    @toggleContent="toggleContent"
                    @select="select"
                    :rating="ratings"
                    :selectType="selectType"
                    :onlyContent="onlyContent"
                    :desc="desc">
            </rating-select>
            <div class="ratings-info">
                <ul v-show="ratings && ratings.length">
                    <li v-for="(rating, i) in ratings"
                        :key="i"
                        class="rating-item"
                        v-show="isRatingShow(rating)">
                        <div class="avatar">
                            <img :src="rating.avatar" height="28" width="28">
                        </div>
                        <div class="content">
                            <h2 class="name">{{rating.username}}</h2>
                            <div class="star-wrapper">
                                <Star class="star" :size="24" :score="rating.score"></Star>
                                <span class="delivery" v-if="rating.deliveryTime">{{ rating.deliveryTime }}分钟送达</span>
                            </div>
                            <p class="text">{{rating.text}}</p>
                            <div class="recommend">
                                <span class="icon" :class="[ rating.rateType ? 'icon-thumb_down' : 'icon-thumb_up']"></span>
                                <span v-for="(item, i) in rating.recommend"
                                      :key="i"
                                      class="item">{{item}}</span>
                            </div>
                            <div class="time">{{ rating.rateTime | dateFormat }}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
  import Star from '@/components/star/star.vue'
  import ratingSelect from '@/components/ratingSelect/ratingSelect.vue'
  import BScroll from 'better-scroll'

  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2
  export default {
    data: () => ({
      scroll: null,
      seller: [],
      ratings: [],
      selectType: ALL,
      onlyContent: false,
      desc: {
        all: '全部',
        positive: '满意',
        negative: '不满意'
      }
    }),
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
    async created() {
      try {
        const sellerRes = (await this.axios.get('/api/seller')).data
        const ratingRes = (await this.axios.get('/api/rating')).data
        if (sellerRes.errCode === 0) {
          this.seller = sellerRes.data
        }
        if (ratingRes.errCode === 0) {
          this.ratings = ratingRes.data
        }
        if (!this.scroll) {
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.ratingsWrapper, {
              click: true
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
      Star,
      ratingSelect
    }
  }
</script>

<style lang="scss" scoped>
    @import "../../common/scss/mixin";
    .ratings-wrapper {
        position: absolute;
        top: 174px;
        bottom: 0;
        left: 0;
        width: 100%;
        overflow: hidden;
        .ratings {
            .overview {
                display: flex;
                padding: 18px 0;
                .overview-left {
                    flex: 0 0 137px;
                    width: 137px;
                    padding: 6px 0;
                    text-align: center;
                    border-right: 1px solid rgba(7, 17, 27, 0.1);
                    @media only screen and (max-width: 320px) {
                        flex: 0 0 120px;
                        width: 120px;
                    }
                    .score {
                        font-size: 24px;
                        line-height: 28px;
                        color: rgb(255, 153, 0);
                        margin-bottom: 6px;
                    }
                    .title {
                        font-size: 12px;
                        line-height: 12px;
                        color: rgb(7, 17, 27);
                        margin-bottom: 8px;
                    }
                    .rank {
                        font-size: 10px;
                        line-height: 10px;
                        color: rgb(147, 153, 159);
                        margin-bottom: 6px;
                    }
                }
                .overview-right {
                    padding: 6px 0 6px 24px;
                    @media only screen and (max-width: 320px) {
                        padding-left: 6px;
                    }
                    .score-wrapper {
                        font-size: 0;
                        margin-bottom: 8px;
                        .title {
                            display: inline-block;
                            vertical-align: top;
                            font-size: 12px;
                            line-height: 18px;
                            color: rgb(7, 17, 27);
                        }
                        .star {
                            display: inline-block;
                            vertical-align: top;
                            margin: 0 12px;
                        }
                        .score {
                            display: inline-block;
                            vertical-align: top;
                            font-size: 12px;
                            line-height: 18px;
                            color: rgb(255, 153, 0);
                        }
                    }
                    .delivery-wrapper {
                        font-size: 0;
                        .title {
                            display: inline-block;
                            vertical-align: top;
                            font-size: 12px;
                            line-height: 18px;
                            color: rgb(7, 17, 27);
                        }
                        .delivery {
                            display: inline-block;
                            vertical-align: top;
                            font-size: 12px;
                            line-height: 18px;
                            color: rgb(147, 153, 159);
                            margin-left: 12px;
                        }
                    }
                }
            }
            .ratings-info{
                padding: 0 18px;
                .rating-item{
                    display: flex;
                    padding: 18px 0;
                    @include border-1px(rgba(7, 17, 27, 0.1));
                    .avatar{
                        flex: 0 0 28px;
                        width: 28px;
                        margin-right: 12px;
                        img{
                            border-radius: 50%;
                        }
                    }
                    .content{
                        flex: 1;
                        position: relative;
                        .name{
                            font-size: 10px;
                            line-height: 12px;
                            color: rgb(7, 17, 27);
                            margin-bottom: 4px;
                        }
                        .star-wrapper{
                            font-size: 0;
                            .star{
                                display: inline-block;
                                margin: 0 6px 6px 0;
                            }
                            .delivery{
                                display: inline-block;
                                font-size: 10px;
                                line-height: 12px;
                                color: rgb(147, 153, 159);
                                font-weight: 200;
                            }
                        }
                        .text{
                            font-size: 12px;
                            line-height: 18px;
                            color: rgb(7, 17, 27);
                            margin-bottom: 8px;
                        }
                        .recommend{
                            line-height: 16px;
                            .icon{
                                font-size: 12px;
                                line-height: 16px;
                                color: rgb(183, 187, 191);
                                margin-right: 8px;
                                &.icon-thumb_up{
                                    color: rgb(0, 160, 220);
                                }
                            }
                            .item{
                                display: inline-block;
                                margin-right: 8px;
                                margin-bottom: 4px;
                                padding: 0 6px;
                                font-size: 9px;
                                color: rgb(147, 153, 159);
                                border: 1px solid rgba(7, 17, 27, 0.1);;
                                border-radius: 1px;
                                background-color: #fff;
                            }
                        }
                        .time{
                            position: absolute;
                            top: 0;
                            right: 0;
                            font-size: 10px;
                            line-height: 12px;
                            color: rgb(147, 153, 159);
                            font-weight: 200;
                        }
                    }
                }
            }
        }

    }
</style>
