<template>
	<view class="lottery-record-container">
		<JHeader title="中奖记录" width="50" height="50"></JHeader>
		<view v-if="lotteryRecordList.length > 0" style="padding: 20rpx 10rpx 0;">
			<view
				v-for="(item, index) in lotteryRecordList" :key="item.id"
				style="padding: 14rpx;margin-bottom: 38rpx;background-color: #fafafa;"
			>
				<view style="font-size: 30rpx;font-weight: bold;">奖品：{{ item.prizeName || '--' }}（ID：{{ item.itemId || '--' }}）</view>
				<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 6rpx;font-size: 26rpx;color: #222229;">
					<view>IP：{{ item.accountIp || '--' }}</view>
					<view>用户ID：{{ item.buyerUserId || '--' }}</view>
				</view>
				<view style="margin-top: 6rpx;font-size: 24rpx;color: #888889;">中奖时间：{{ item.creatTime || '--' }}</view>
			</view>
		</view>
		<view style="padding-bottom: 45rpx;">
			<LoadingMore :status="isLoading ? 'loading' : ''"></LoadingMore>
			<view v-if="!isLoading && !lotteryRecordList.length">
				<tui-no-data :fixed="false" style="padding-top: 60rpx;">暂无中奖记录～</tui-no-data>
			</view>
		</view>
	</view>
</template>

<script>
import { getLotteryRecordApi } from '../../../api/anotherTFInterface'
export default {
	name: 'LotteryRecord',
	data() {
		return {
			lotteryRecordList: [],
			isLoading: true
		}
	},
	onLoad() {
		this.getLotteryRecordList()
	},
	methods: {
		getLotteryRecordList() {
			uni.showLoading()
			this.isLoading = true
			getLotteryRecordApi({})
				.then((res) => {
					this.lotteryRecordList = res.data
					uni.hideLoading()
					this.isLoading = false
				})
				.catch((e) => {
					uni.hideLoading()
					this.isLoading = false
				})
		}
	}
}
</script>

<style lang="less" scoped>
.lottery-record-container {
	min-height: 100vh;
	box-sizing: border-box;

	/deep/ .j-header-wrapper {
		padding: 24rpx 0 10rpx;
		background-color: #f5f5f5;

		.title {
			font-size: 36rpx;
			color: #222229;
			font-weight: normal;
		}
	}
}
</style>
