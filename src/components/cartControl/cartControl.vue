<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="productNum" @click="alterProductNum('sub', $event)">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="productNum">{{ productNum }}</div>
    <div class="cart-add icon-add_circle" @click="alterProductNum('add', $event)"></div>
		<div class="ball-container">
			<transition-group name="ball"
			 	@before-enter="beforeEnter"
				@enter="enter"
				@after-enter="afterEnter">
				<div class="ball" v-for="(ball, i) in balls" :key="i" v-show="ball.show">
					<div class="inner" ></div>
				</div>
			</transition-group>
		</div>
  </div>
</template>

<script>
export default {
	props: ['productNum', 'lv1', 'lv2'],
	data: () => ({
		balls: [
			{ show: false },
			{ show: false },
			{ show: false },
			{ show: false },
			{ show: false }
		],
		dropBalls: []
	}),
	methods: {
		drop() {
			for (let i = 0; i < this.balls.length; i++) {
				if (!this.balls[i].show) {
					this.balls[i].show = true
				}
			}
		},
		beforeEnter(el) {
			let count = this.balls.length
			while (count--) {
				const ball = this.balls[count]
				if (ball.show) {
					el.style.transform = 'translate3d(0, 0, 0)'
					el.children[0].style.transform = 'translate3d(0, 0, 0)'
				}
			}
		},
		enter(el, done) {
			const ballPosition = el.getBoundingClientRect()
			const shopCartPosition = document
				.querySelector('.icon-shopping_cart')
				.getBoundingClientRect()
			const x = shopCartPosition.x - ballPosition.x
			const y = shopCartPosition.y - ballPosition.y
			this.$nextTick(() => {
				el.style.transform = `translate3d(0, ${y}px, 0)`
				el.children[0].style.transform = `translate3d(${x}px,0, 0)`
				el.style.transition = 'all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)'
				el.children[0].style.transition = 'all 0.4s linear'
				done()
			})
		},
		afterEnter(el) {
			const ball = this.dropBalls.shift()
			if (ball) {
				ball.show = false
			}
		},
		alterProductNum(type, e) {
			let count = 0
			if (type === 'sub') {
				count = -1
			} else {
				count = 1
				this.drop()
			}
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
	.ball-container {
		.ball {
			position: absolute;
			left: 43px;
			top: -5px;
			z-index: 99;
			.inner {
				width: 16px;
				height: 16px;
				border-radius: 50%;
				background-color: rgb(0, 160, 220);
			}
		}
	}
}
</style>
