<template>
	<view class="promotion-record-container">
		<JHeader title="会员卡推广记录" width="50" height="50"></JHeader>
		<view>会员卡推广记录页</view>
	</view>
</template>

<script>
import { getCardStatisticsShopMemberCardApi, getCardPromoterAllShopMemberCardApi, getGroupShopMemberCardApi, updateSettlementShopMemberCardApi } from '../../../api/anotherTFInterface'
export default {
	name: 'PromotionRecord',
	components: {
	},
	onLoad() {
		uni.showLoading()
		getCardStatisticsShopMemberCardApi()
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
.promotion-record-container {
	min-height: 100vh;
	box-sizing: border-box;

	/deep/ .j-header-wrapper {
		padding: 24rpx 12rpx 10rpx;
		background-color: #f5f5f5;
	}
}
</style>
