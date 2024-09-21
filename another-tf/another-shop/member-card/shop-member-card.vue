<template>
	<view class="shop-member-card-container">
		<JHeader title="商家会员卡列表" width="50" height="50"></JHeader>
		<view>商家会员卡列表页</view>
	</view>
</template>

<script>
import { getPageAllShopMemberCardApi, updateShelfShopMemberCardApi, updateIssueShopMemberCardApi } from '../../../api/anotherTFInterface'
export default {
	name: 'ShopMemberCard',
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
.shop-member-card-container {
	min-height: 100vh;
	box-sizing: border-box;

	/deep/ .j-header-wrapper {
		padding: 24rpx 12rpx 10rpx;
		background-color: #f5f5f5;
	}
}
</style>
