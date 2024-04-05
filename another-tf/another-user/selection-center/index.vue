<template>
	<view class="selection-center-container">
		<JHeader title="选品中心" width="50" height="50"></JHeader>
		<view>选品中心页</view>
	</view>
</template>

<script>
import { getBuyerSelectionLibraryApi } from '../../../api/anotherTFInterface'
export default {
	name: 'SelectionCenter',
	components: {
	},
	onLoad() {
		uni.showLoading()
		getBuyerSelectionLibraryApi()
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
.selection-center-container {
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
