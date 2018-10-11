<template>
    <div :class="['star', starType]">
        <span v-for="(itemClass, i) in itemClasses" :key="i" :class="['star-item', itemClass]"></span>
    </div>
</template>

<script>
const LENGHT = 5,
  CLS_ON = "on",
  CLS_HALF = "half",
  CLS_OFF = "off";

export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType() {
      return `star-${this.size}`;
    },
    itemClasses() {
      let result = [];
      let score = Math.floor(this.score * 2) / 2;
      let hasDecimal = score % 1 !== 0;
      let integer = Math.floor(score);
      while (integer--) {
        result.push(CLS_ON);
      }
      if (hasDecimal) {
        result.push(CLS_HALF);
      }
      while (result.length < LENGHT) {
        result.push(CLS_OFF);
      }
      return result;
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../common/scss/mixin.scss";
.star {
  font-size: 0;
  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }
  &.star-48 {
    .star-item {
      width: 20px;
      height: 20px;
      margin-right: 22px;
      background-size: 20px 20px;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        @include bgImg("./images/star48_on");
      }
      &.off {
        @include bgImg("./images/star48_off");
      }
      &.half {
        @include bgImg("./images/star48_half");
      }
    }
  }
  &.star-36 {
    .star-item {
      width: 15px;
      height: 15px;
      margin-right: 6px;
      background-size: 15px 15px;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        @include bgImg("./images/star36_on");
      }
      &.off {
        @include bgImg("./images/star36_off");
      }
      &.half {
        @include bgImg("./images/star36_half");
      }
    }
  }
  &.star-24 {
    .star-item {
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        @include bgImg("./images/star24_on");
      }
      &.off {
        @include bgImg("./images/star24_off");
      }
      &.half {
        @include bgImg("./images/star24_half");
      }
    }
  }
}
</style>
