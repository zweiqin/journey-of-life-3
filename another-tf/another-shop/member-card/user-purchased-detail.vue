<template>
	<view class="user-purchased-detail-container">
		<JHeader title="用户购买会员卡详情" width="50" height="50"></JHeader>
		<view>用户购买会员卡详情页</view>
	</view>
</template>

<script>
import { getPageCardUserIdShopMemberCardApi, getByIdShopMemberCardUserApi } from '../../../api/anotherTFInterface'
export default {
	name: 'UserPurchasedDetail',
	components: {
	},
	onLoad() {
		uni.showLoading()
		getPageCardUserIdShopMemberCardApi()
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
.user-purchased-detail-container {
	min-height: 100vh;
	box-sizing: border-box;

	/deep/ .j-header-wrapper {
		padding: 24rpx 12rpx 10rpx;
		background-color: #f5f5f5;
	}
}
</style>
