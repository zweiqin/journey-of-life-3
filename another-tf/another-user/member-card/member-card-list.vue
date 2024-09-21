<template>
	<view class="member-card-list-container">
		<JHeader title="会员卡购买" width="50" height="50"></JHeader>
		<view>会员卡购买页</view>
	</view>
</template>

<script>
import { getPageAllShopMemberCardApi, submitShopMemberCardOrderApi } from '../../../api/anotherTFInterface'
export default {
	name: 'MemberCardList',
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
.member-card-list-container {
	min-height: 100vh;
	box-sizing: border-box;

	/deep/ .j-header-wrapper {
		padding: 24rpx 12rpx 10rpx;
		background-color: #f5f5f5;
	}
}
</style>
