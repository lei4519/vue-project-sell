<template>
    <div class="rating-select">
        <div class="rating-type">
            <span
                    @click="$emit('select',2, $event)"
                    class="block positive"
                    :class="{'active': selectType === 2}">
                {{ desc.all }}
                <span class="count">{{ rating.length }}</span>
            </span>
            <span
                    @click="$emit('select',0, $event)"
                    class="block positive"
                    :class="{'active': selectType === 0}">
                {{ desc.positive }}
                <span class="count">{{ positives.length }}</span>
            </span>
            <span
                    @click="$emit('select',1, $event)"
                    class="block negative"
                    :class="{'active': selectType === 1}">
                {{ desc.negative }}
                <span class="count">{{ negatives.length }}</span>
            </span>
        </div>
        <div class="switch"
             :class="{'on':onlyContent}"
             @click="$emit('toggleContent',$event)">
            <span class="icon-check_circle"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script>
  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2
  export default {
    props: {
      rating: {
        type: Array,
        default() {
          return []
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    computed: {
      positives() {
        return this.rating.filter((item) => {
          return item.rateType === POSITIVE
        })
      },
      negatives() {
        return this.rating.filter((item) => {
          return item.rateType === NEGATIVE
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import "../../common/scss/mixin";

    .rating-select {
        .rating-type {
            margin: 0 18px;
            padding: 18px 0;
            font-size: 0;
            @include border-1px(rgba(7, 17, 27, 0.1));
            .block {
                display: inline-block;
                margin-right: 8px;
                padding: 8px 12px;
                font-size: 12px;
                line-height: 16px;
                border-radius: 2px;
                color: rgb(77, 85, 93);
                &.active {
                    color: #fff;
                }
                &.positive {
                    background-color: rgba(0, 160, 220, 0.2);
                    &.active {
                        background-color: rgba(0, 160, 220, 1);
                    }
                }
                &.negative {
                    background-color: rgba(77, 85, 93, 0.2);
                    &.active {
                        background-color: rgba(77, 85, 93, 1);
                    }
                }
                .count {
                    font-size: 8px;
                }
            }
        }
        .switch {
            padding: 12px 18px;
            font-size: 0;
            line-height: 24px;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            color: rgb(147, 153, 159);
            &.on {
                .icon-check_circle {
                    color: #00c850;
                }
            }
            .icon-check_circle {
                display: inline-block;
                vertical-align: top;
                margin-right: 4px;
                font-size: 24px;
            }
            .text {
                display: inline-block;
                vertical-align: top;
                font-size: 12px;
            }
        }
    }
</style>
