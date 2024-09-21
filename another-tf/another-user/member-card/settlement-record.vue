<template>
	<view class="settlement-record-container">
		<JHeader title="会员卡结算记录列表" width="50" height="50"></JHeader>
		<view>会员卡结算记录列表页</view>
	</view>
</template>

<script>
import { getBuyerSettlementShopMemberCardApi } from '../../../api/anotherTFInterface'
export default {
	name: 'SettlementRecord',
	components: {
	},
	onLoad() {
		uni.showLoading()
		getBuyerSettlementShopMemberCardApi()
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
.settlement-record-container {
	min-height: 100vh;
	box-sizing: border-box;

	/deep/ .j-header-wrapper {
		padding: 24rpx 12rpx 10rpx;
		background-color: #f5f5f5;
	}
}
</style>
