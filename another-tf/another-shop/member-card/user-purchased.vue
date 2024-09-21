<template>
	<view class="user-purchased-container">
		<JHeader title="用户购买会员卡列表" width="50" height="50"></JHeader>
		<view>用户购买会员卡列表页</view>
	</view>
</template>

<script>
import { getPageCardUserAllShopMemberCardApi, getPageAllShopMemberCardUserApi } from '../../../api/anotherTFInterface'
export default {
	name: 'UserPurchased',
	components: {
	},
	onLoad() {
		uni.showLoading()
		getPageCardUserAllShopMemberCardApi()
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
.user-purchased-container {
	min-height: 100vh;
	box-sizing: border-box;

	/deep/ .j-header-wrapper {
		padding: 24rpx 12rpx 10rpx;
		background-color: #f5f5f5;
	}
}
</style>
