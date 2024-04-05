<template>
	<view class="product-selection-management-container">
		<JHeader title="选品管理" width="50" height="50"></JHeader>
		<view>选品管理页</view>
	</view>
</template>

<script>
import { getAllPlatformProductApi } from '../../../api/anotherTFInterface'
export default {
	name: 'ProductSelectionManagement',
	components: {
	},
	onLoad() {
		uni.showLoading()
		getAllPlatformProductApi()
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
.product-selection-management-container {
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
