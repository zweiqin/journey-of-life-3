<template>
	<view class="member-card-equity-form-container">
		<JHeader title="会员卡权益表单" width="50" height="50"></JHeader>
		<view>会员卡权益表单页</view>
	</view>
</template>

<script>
import { getByIdShopMemberCardEquityApi, addShopMemberCardEquityApi, updateShopMemberCardEquityApi } from '../../../api/anotherTFInterface'
export default {
	name: 'MemberCardEquityForm',
	components: {
	},
	onLoad() {
		uni.showLoading()
		getByIdShopMemberCardEquityApi()
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
.member-card-equity-form-container {
	min-height: 100vh;
	box-sizing: border-box;

	/deep/ .j-header-wrapper {
		padding: 24rpx 12rpx 10rpx;
		background-color: #f5f5f5;
	}
}
</style>
