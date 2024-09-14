<template>
	<view class="container">
		<JHeader title="商家订单记录" width="50" height="50"></JHeader>
		<view>订单记录页</view>
	</view>
</template>

<script>
import { getShopMemberListApi } from '../../../api/anotherTFInterface'
export default {
	name: 'SmallLedger',
	components: {
	},
	onLoad() {
		uni.showLoading()
		getShopMemberListApi()
			.then((res) => {
				uni.hideLoading()
			})
			.catch((e) => {
				uni.hideLoading()
			})
	}
}
</script>

<style lang="less" scoped>
.container {
	min-height: 100vh;
	box-sizing: border-box;

	/deep/ .j-header-wrapper {
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
