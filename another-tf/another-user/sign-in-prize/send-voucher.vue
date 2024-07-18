<template>
	<view class="send-voucher-container">
		<JHeader title="签到送代金券" width="50" height="50"></JHeader>
		<view>签到送代金券页</view>
	</view>
</template>

<script>
import { updateCreditSignInApi, updateCreditSelectByMonthApi } from '../../../api/anotherTFInterface'
export default {
	name: 'SendVoucher',
	data() {
		return {
			signList: []
		}
	},
	onLoad() {
		uni.showLoading()
		updateCreditSignInApi()
			.then((res) => {
				uni.hideLoading()
			})
			.catch((e) => {
				uni.hideLoading()
			})
		updateCreditSelectByMonthApi()
			.then((res) => {
				uni.hideLoading()
			})
			.catch((e) => {
				uni.hideLoading()
			})
	},
	methods: {
	}
}
</script>

<style lang="less" scoped>
.send-voucher-container {
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
