<template>
  <div class="app">
      <v-header></v-header>
      <div class="tab border-1px">
          <div class="tab-item">
              <router-link to="/goods">商品</router-link>
          </div>
          <div class="tab-item">
              <router-link to="/ratings">评论</router-link>
          </div>
          <div class="tab-item">
              <router-link to="/seller">商家</router-link>
          </div>
      </div>
      <keep-alive>
				<router-view></router-view>
			</keep-alive>
  </div>
</template>

<script>
import Header from '@/components/header/header'

export default {
	data: () => ({}),
	components: {
		'v-header': Header
	}
}
</script>

<style lang="scss" scoped>
@import './common/scss/mixin.scss';
.app {
	.tab {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		height: 40px;
		line-height: 40px;
		@include border-1px(rgba(7, 17, 27, 0.1));
		.tab-item {
			flex: 1;
			text-align: center;
			a {
				display: block;
				width: 100%;
				height: 100%;
				font-size: 14px;
				color: rgb(77, 85, 93);
				&.active {
					color: rgb(240, 20, 20);
				}
			}
		}
	}
}
</style>
