<template>
    <div class="goods-wrapper">
			<div class="goods-content">
				<div class="bScroll bScroll-left" ref="goodsListScroll">
					<ul class="goods-list">
						<li class="goods-list-title" v-for="(item, i) in goodsList" :key="i">{{ item.name }}</li>
					</ul>
				</div>
				<div class="bScroll bScroll-right" ref="goodsInfoScroll">
					<ul class="goods-info">
						<li v-for="(item, i) in goodsList" :key="i">
							<div class="goods-info-title">{{ item.name }}</div>
							<div class="goods-info-item" v-for="(itemInfo, i) in item.foods" :key="i">
								<img :src="itemInfo.image" width="57px" height="57px">
								<div class="info-box">
								<h3 class="title">{{ itemInfo.name }}</h3>
								<p class="describe" v-if="itemInfo.description">{{ itemInfo.description }}</p>
								<p class="sales"><span class="sales-info">月售{{itemInfo.sellCount}}份</span><span class="evaluate">好评率{{itemInfo.rating}}%</span></p>
								<p class="price"><span class="favoured-price">¥{{itemInfo.price}}</span><del class="old-price" v-if="itemInfo.oldPrice">¥{{itemInfo.oldPrice}}</del></p>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
	name: 'goods',
	data() {
		return {
			goodsList: []
		}
	},
	async created() {
		try {
			const res = (await this.axios.get('/api/goods')).data
			if (res.errCode === 0) {
				this.goodsList = res.data
				this.$nextTick(() => {
					new BScroll(this.$refs.goodsListScroll, {})
					new BScroll(this.$refs.goodsInfoScroll, {})
				})
			}	else {
				alert('商品信息获取失败')
			}
		} catch (err) {
			alert(err.message)
		}
	},
	mounted() {
	}
}
</script>

<style lang="scss" scoped>
@import '../../common/scss/mixin.scss';
.goods-wrapper{
	.goods-content{
		display: flex;
		.bScroll{
			position: absolute;
			top: 176px;
			bottom: 48px;
			overflow: hidden;
			&.bScroll-right{
				right: 0;
				margin-left: 80px;
			}
		}
		.goods-list{
			width: 80px;
			.goods-list-title{
				width: 100%;
				height: 54px;
				text-align: center;
				font-size: 12px;
				color: rgb(20, 20, 20);
				font-weight: 200;
				line-height: 54px;
				background-color: #f3f5f7;
				@include border-1px(rgba(7, 17, 27, 0.1));
				&.active{
					background-color: #fff;
					color: rgb(240, 20, 20);
				}
			}
		}
		.goods-info{
			flex: 1;
			.goods-info-title{
				position: relative;
				height: 26px;
				padding-left: 14px;
				font-size: 12px;
				line-height: 26px;
				color: rgb(147, 153, 159);
				background-color: #f3f5f7;
				&::after{
					content: '';
					position: absolute;
					top: 0;
					bottom: 0;
					width: 2px;
					left: 0;
					background-color: #d9dde1;
				}
			}
			.goods-info-item{
				display: flex;
				margin: 18px;
				.info-box{
					flex: 1;
					margin-left: 10px;
					padding-top: 2px;
					.title{
						margin-bottom: 8px;
						font-size: 14px;
						color: rgb(7, 17, 27);
						line-height: 14px;
						white-space: nowrap;
						text-overflow:ellipsis;
					}
					.describe{
						margin-bottom: 8px;
						font-size: 10px;
						line-height: 10px;
						color: rgb(147, 153, 159);
					}
					.sales{
						margin-bottom: 8px;
						font-size: 10px;
						line-height: 10px;
						color: rgb(147, 153, 159);
						white-space: nowrap;
						text-overflow:ellipsis;
						.sales-info{
							margin-right: 12px;
						}
					}
					.price{
						.favoured-price{
							font-size: 24px;
							line-height: 24px;
							font-weight: 700;
							color: #f40;
							margin-right: 8px;
						}
						.old-price{
							font-size: 10px;
							line-height: 24px;
							font-weight: 700;
							color: rgb(147, 153, 159);
						}
					}
				}
				
			}
		}
	}
	
}
</style>
