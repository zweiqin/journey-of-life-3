<template>
	<view class="member-card-record-container">
		<JHeader title="会员卡收支明细" width="50" height="50"></JHeader>
		<view>会员卡收支明细页</view>
	</view>
</template>

<script>
import { getOutgoingRecordShopMemberCardApi, getEntryRecordShopMemberCardApi } from '../../../api/anotherTFInterface'
export default {
	name: 'MemberCardRecord',
	components: {
	},
	onLoad() {
		uni.showLoading()
		getOutgoingRecordShopMemberCardApi()
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
.member-card-record-container {
	min-height: 100vh;
	box-sizing: border-box;

	/deep/ .j-header-wrapper {
		padding: 24rpx 12rpx 10rpx;
		background-color: #f5f5f5;
	}
}
</style>
