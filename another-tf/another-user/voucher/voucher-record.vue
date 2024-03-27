<template>
	<view class="container">
		<JHeader title="代金券收支明细" width="50" height="50"></JHeader>
		<view>代金券收支明细页</view>
	</view>
</template>

<script>
import { getTransferLogsVoucherShopHoldApi, getAllVoucherOrderApi } from '../../../api/anotherTFInterface'
export default {
	name: 'VoucherRecord',
	components: {
	},
	onLoad() {
		uni.showLoading()
		getTransferLogsVoucherShopHoldApi()
			.then((res) => {
				uni.hideLoading()
			})
			.catch((e) => {
				uni.hideLoading()
			})
		getAllVoucherOrderApi()
			.then((res) => {
				uni.hideLoading()
			})
			.catch((e) => {
				uni.hideLoading()
			})
	},

	computed: {
	}
}
</script>

<style lang="less" scoped>
.container {
	min-height: 100vh;
	box-sizing: border-box;

	/deep/ .j-header-container {
		padding: 24rpx 0 10rpx;
		background-color: #f5f5f5;

		.title {
			font-size: 36rpx;
			color: #222229;
			font-weight: normal;
		}
	}
}
</style>
