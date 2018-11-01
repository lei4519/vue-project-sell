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
                <span class="now">￥{{food.price}}</span><del class="old" v-if="food.oldPrice">{{food.oldPrice}}</del>
            </div>
            <div class="cartcontrol-wrapper">
                <cart-control ref="cartCtrl" :productNum="food.productNum" :lv1="food.lv1" :lv2="food.lv2"></cart-control>
            </div>
            <div class="add-food" @click="$refs.cartCtrl.alterProductNum('add', $event)">加入购物车</div>
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
    </div>
</template>

<script>
import cartControl from '@/components/cartControl/cartControl.vue'
import BScroll from 'better-scroll'

export default {
	props: {
		food: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			scroll: null
		}
	},
	components: {
		cartControl
	},
	mounted() {
		this.scroll = new BScroll('.food-wrapper', {
			click: true
		})
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
	.split {
		height: 16px;
		width: 100%;
		border-top: 1px solid rgba(7, 17, 27, 0.1);
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
		background-color: #f3f5f7;
	}
	.back {
		position: absolute;
		top: 10px;
		padding: 10px;
		font-size: 20px;
		color: #fff;
	}
}
</style>
