<template>
	<view v-if="goodsData" class="voucher-goods-container" @click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${goodsData.shopId}6&productId=${goodsData.productId}&skuId=${goodsData.skuId}`)">
		<view class="goods-wrapper">
			<image class="goods-img" :src="common.seamingImgUrl(goodsData.image)"></image>
		</view>

		<view class="goods-info">
			<view class="goods-name">{{ goodsData.productName }}</view>
			<view class="price-wrapper">
				￥<text class="price-text">{{ goodsData.price }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		goodsData: {
			type: Object,
			required: true
		}
	}
}
</script>

<style lang="less" scoped>
.voucher-goods-container {

  .goods-wrapper {
    position: relative;
    width: 150upx;
    height: 158upx;
    background-color: #F5F5F5;
    border-radius: 10upx;
    display: flex;
    align-items: center;
    justify-content: center;

    .goods-img {
      width: 143.38upx;
      height: 132.86upx;
      border-radius: 10upx;
    }
  }

  .goods-info {
    width: 150upx;
    padding: 6upx 4upx;

    .goods-name {
      width: 143upx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 24upx;
      color: #222229;
    }

    .price-wrapper {
      color: #E24747;
      font-size: 20upx;
      margin-top: 6upx;

      .price-text {
        font-size: 28upx;
        font-weight: 500;
      }
    }
  }

}
</style>
