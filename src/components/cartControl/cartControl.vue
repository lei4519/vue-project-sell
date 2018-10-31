<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="productNum" @click="alterProductNum('sub', $event)">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="productNum">{{ productNum }}</div>
    <div class="cart-add icon-add_circle" @click="alterProductNum('add', $event)"></div>
  </div>
</template>

<script>
export default {
	props: ['productNum', 'lv1', 'lv2'],
	methods: {
		alterProductNum(type, e) {
			let count = 0
			if (type === 'sub') {
				if (this.productNum === 0) {
					return
				}
				count = -1
			} else {
				count = 1
				this.$emit('cartAdd', e.target)
			}
			console.log(e.target);
			this.$store.commit('alterProductNum', {
				lv1: this.lv1,
				lv2: this.lv2,
				count
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.move-enter,
.move-leave-to {
	opacity: 0;
	transform: translate3d(24px, 0, 0);
	.inner {
		transform: rotate(180deg);
	}
}
.move-enter-active,
.move-leave-active {
	transition: all 0.4s linear;
}
.cartcontrol {
	font-size: 0;
	.cart-decrease {
		display: inline-block;
		padding: 6px;
		.inner {
			display: inline-block;
			line-height: 24px;
			font-size: 24px;
			color: #00a0dc;
			transition: all 0.4s linear;
		}
	}
	.cart-count {
		display: inline-block;
		vertical-align: top;
		width: 12px;
		padding-top: 6px;
		line-height: 24px;
		text-align: center;
		font-size: 10px;
		color: #93999f;
	}
	.cart-add {
		display: inline-block;
		padding: 6px;
		line-height: 24px;
		font-size: 24px;
		color: #00a0dc;
	}
}
</style>
