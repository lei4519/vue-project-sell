<template>
    <div class="food-wrapper">
        <div class="banner">
            <img :src="food.image">
        </div>
        <div class="food-content">
            <div class="title">{{ food.name }}</div>
            <div class="extra">
                <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
            </div>
            <div class="price">
                <span class="now">￥{{food.price}}</span><del class="old" v-if="food.oldPrice">{{food.oldPrice}}</del>
            </div>
        </div>
        <div class="split"></div>
        <div class="info">
            <div class="title">商品介绍</div>
            <div class="desc">{{food.info}}</div>
        </div>
        <div class="back" @click="$emit('closeFoodInfo')">
            <i class="icon-arrow_lift"></i>
        </div>
    </div>
</template>

<script>
  export default {
    props: {
      food: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
    .food-wrapper {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #fff;
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
            padding: 18px;
            .title {
                margin-bottom: 8px;
                font-size: 14px;
                font-weight: 700;
                line-height: 14px;
                color: rgb(7, 17, 27);
            }
            .extra{
                margin-bottom: 18px;
                font-size: 10px;
                line-height: 10px;
                color: rgb(147, 153, 159);
                .count{
                    margin-right: 12px;
                }
            }
            .price{
                line-height: 24px;
                .now{
                    font-size: 14px;
                    font-weight: 700;
                    color: rgb(240, 20, 20);
                    margin-right: 8px;
                }
                .old{
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                }
            }
        }
        .info{
            padding: 18px;
            .title{
                font-size: 14px;
                line-height: 14px;
                color: rgb(7, 17, 27);
            }
            .desc{
                padding: 6px 8px;
                font-size: 12px;
                line-height: 24px;
                font-weight: 200;
                color: rgb(77, 85, 93);
            }
        }
        .split{
            height: 16px;
            width: 100%;
            border-top: 1px solid rgba(7, 17, 27, 0.1);
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            background-color: #f3f5f7;
        }
        .back {
            position: absolute;
            left: 10px;
            top: 20px;
            font-size: 24px;
            color: #fff;
        }
    }
</style>
