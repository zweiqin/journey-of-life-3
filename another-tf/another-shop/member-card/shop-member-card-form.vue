<template>
	<view class="shop-member-card-form-container">
		<JHeader title="商家会员卡表单" width="50" height="50"></JHeader>
		<view>商家会员卡表单页</view>
	</view>
</template>

<script>
import { getByIdShopMemberCardApi, addShopMemberCardApi, updateShopMemberCardApi } from '../../../api/anotherTFInterface'
export default {
	name: 'ShopMemberCardForm',
	components: {
	},
	onLoad() {
		uni.showLoading()
		getByIdShopMemberCardApi()
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
.shop-member-card-form-container {
	min-height: 100vh;
	box-sizing: border-box;

	/deep/ .j-header-wrapper {
		padding: 24rpx 12rpx 10rpx;
		background-color: #f5f5f5;
	}
}
</style>
