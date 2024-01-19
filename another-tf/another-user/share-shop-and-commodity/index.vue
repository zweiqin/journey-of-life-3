<template>
	<view class="container">
		<JHeader title="商家商品分享" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view>商家商品分享页</view>
		<view>{{ isSharer }}</view>
		<view>{{ shopId }}</view>
		<view>{{ goodsArr }}</view>
	</view>
</template>

<script>
export default {
	name: 'ShareShopAndCommodity',
	data() {
		return {
			isSharer: false,
			shopId: '',
			goodsArr: []
		}
	},
	onLoad(options) {
		uni.showLoading()
		if (options.isSharer) this.isSharer = true
		if (options.shopId) this.shopId = Number(options.shopId)
		if (options.goods) this.goodsArr = JSON.parse(options.goods)
	},

	computed: {
	}
}
</script>

<style lang="less" scoped>
.container {
  min-height: 100vh;
	box-sizing: border-box;
}
</style>
