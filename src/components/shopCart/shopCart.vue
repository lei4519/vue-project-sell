<template>
  <div class="shop-cart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo">
            <span class="icon-shopping_cart"></span>
          </div>
        </div>
        <div class="price">¥0</div>
        <div class="desc"></div>
      </div>
      <div class="content-right"></div>
    </div>
  </div>
</template>

<script lang="ts">
    export default {}
</script>

<style lang="scss" scoped>
.shop-cart{
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 48px;
	background-color: #141d27;
  .content{
		display: flex;
    .content-left{
			flex: 1;
			height: 48px;
			.logo-wrapper{
				box-sizing: border-box;
				position: absolute;
				left: 18px;
				bottom: 0;
				z-index: 10;
				height: 58px;
				width: 58px;
				border: 5px solid #141d27;
				border-radius: 50%;
				background-color: rgba(0, 0, 0, 0.2);
				line-height: 58px;
				text-align: center;
				.logo{
					font-size: 24px;
					color: rgba(255, 255, 255, 0.4);
				}
			}
			.price{
				margin-left: 94px;
				line-height: 48px;
				font-size: 16px;
				color: rgba(255, 255, 255, 0.4);
				font-weight: 700;
			}
			.desc{
				
			}
		}
    .content-right{
			flex: 0 0 105px;
			width: 105px;
			height: 48px;
			background-color: #f40;
		}
  }
}
</style>
