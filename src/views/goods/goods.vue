<template>
    <div class="goods-wrapper" ref="bScroll">
			<div class="content">
				<ul class="goods-list">
					<li class="goods-list-title">热销榜</li>
					<li class="goods-list-title active">单人特色套餐</li>
					<li class="goods-list-title">特色粥品</li>
					<li class="goods-list-title">精选热菜</li>
					<li class="goods-list-title">爽口凉菜</li>
					<li class="goods-list-title">半成品</li>
					<li class="goods-list-title">饭类</li>
					<li class="goods-list-title">面类</li>
				</ul>
				<ul class="goods-info">
					<li v-for="(item, i) in goodsList" :key="i">
						<div class="goods-info-title">{{ item.name }}</div>
						<div class="goods-info-item" v-for="(itemInfo, i) in item.foods" :key="i">
							<img :src="itemInfo.image" width="57px" height="57px">
							<div class="info-box">
							<h3 class="title">{{ itemInfo.name }}</h3>
							<p class="describe">{{ itemInfo.description }}</p>
							<p class="sales"><span class="sales-info">月售{{itemInfo.sellCount}}份</span><span class="evaluate">好评率{{itemInfo.rating}}%</span></p>
							<p class="price"><span class="favoured-price">¥{{itemInfo.price}}</span><span class="old-price">¥{{itemInfo.oldPrice}}</span></p>
							</div>
						</div>
					</li>
				</ul>
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
			}	else {
				alert('商品信息获取失败')
			}
		} catch (err) {
			alert(err.message)
		}
		
	},
	mounted() {
		this.$nextTick(() => {
			new BScroll(this.$refs.bScroll, {})
		})
	}
}
</script>

<style lang="scss" scoped>
@import '../../common/scss/mixin.scss';
.goods-wrapper{
	position: absolute;
	top: 176px;
	bottom: 48px;
	width: 100%;
	overflow: hidden;
	.content{
		display: flex;
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
