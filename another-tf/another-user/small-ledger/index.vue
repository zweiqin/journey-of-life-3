<template>
	<view class="container">
		<JHeader title="我的账本" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view>我的账本页</view>
	</view>
</template>

<script>
import { getSmallAccountBookStatisticsApi, getCommissionDeatilListApi } from '../../../api/anotherTFInterface'
export default {
	name: 'SmallLedger',
	components: {
	},
	onLoad() {
		uni.showLoading()
		getSmallAccountBookStatisticsApi()
			.then((res) => {
				uni.hideLoading()
			})
			.catch((e) => {
				uni.hideLoading()
			})
		getCommissionDeatilListApi()
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
}
</style>
