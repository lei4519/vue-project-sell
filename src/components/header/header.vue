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
        </div>
        <div class="bulletin-wrapper">

        </div>
    </div>
</template>

<script>
export default {
  data: () => ({
    classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }),
  props: {
    seller: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/scss/mixin.scss";
    .header{
        color: #fff;
        background-color: rgba(0, 0, 0, 0.2);
        .content-wrapper{
            padding: 24px 12px 18px 24px;
            font-size: 0;
            line-height: 0;
            .avatar{
                display: inline-block;
                vertical-align: top;
                img{
                    border-radius: 2px;
                }
            }
            .content{
                display: inline-block;
                font-size: 14px;
                margin-left: 16px;
                .title{
                    margin: 2px 0 8px 0;
                    .brand{
                        display: inline-block;
                        width: 30px;
                        height: 18px;
                        @include bgImg('./images/brand');
                        vertical-align: top;
                    }
                    .name{
                        margin-left: 6px;
                        font-size: 16px;
                        line-height: 18px;
                        font-weight: bold;
                    }
                }
                .description{
                    font-size: 12px;
                    line-height: 12px;
                    margin-bottom: 10px;
                }
                .support{
                    margin-bottom: 2px;
                    .icon{
                        display: inline-block;
                        width: 12px;
                        height: 12px;
                        &.decrease{
                            @include bgImg('./images/decrease_1');
                        }
                        &.discount{
                            @include bgImg('./images/discount_1');
                        }
                        &.guarantee{
                            @include bgImg('./images/guarantee_1');
                        }
                        &.invoice{
                            @include bgImg('./images/invoice_1');
                        }
                        &.special{
                            @include bgImg('./images/special_1');
                        }
                        vertical-align: top;
                    }
                    .text{
                        font-size: 10px;
                        line-height: 12px;
                        margin-left: 4px;
                    }
                }
            }
        }
    }
</style>
