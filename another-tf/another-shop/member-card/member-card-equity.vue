<template>
	<view class="member-card-equity-container">
		<JHeader title="商家会员卡权益列表" width="50" height="50"></JHeader>
		<view>商家会员卡权益列表页</view>
	</view>
</template>

<script>
import { getPageAllShopMemberCardApi, deleteByIdShopMemberCardEquityApi } from '../../../api/anotherTFInterface'
export default {
	name: 'MemberCardEquity',
	components: {
	},
	onLoad() {
		uni.showLoading()
		getPageAllShopMemberCardApi()
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
.member-card-equity-container {
	min-height: 100vh;
	box-sizing: border-box;

	/deep/ .j-header-wrapper {
		padding: 24rpx 12rpx 10rpx;
		background-color: #f5f5f5;
	}
}
</style>
