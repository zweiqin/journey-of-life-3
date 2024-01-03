<template>
	<view class="container">
		<JHeader title="小账本" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view>小账本页</view>
	</view>
</template>

<script>
import { getStatisticsAmountRelationshipApi, getStatisticsRecordRelationshipApi } from '../../../api/anotherTFInterface'
export default {
	name: 'SmallLedger',
	components: {
	},
	onLoad() {
		uni.showLoading()
		getStatisticsAmountRelationshipApi()
			.then((res) => {
				uni.hideLoading()
			})
			.catch((e) => {
				uni.hideLoading()
			})
		getStatisticsRecordRelationshipApi()
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
