<template>
  <div class="wrapper">
    <a href="#" @click="$router.go(-1)">退</a>
    商品详情页
  </div>
</template>

<script>
export default {
  data: () => ({
    food: {}
  }),
  created() {
    const lv1 = this.$route.params.lv1
    const lv2 = this.$route.params.lv2
    this.food = this.$store.state.goodsList[lv1].foods[lv2]
    console.log(this.food);
    
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
}
</style>
