<template>
	<view class="lottery-awards-container">
		<JHeader title="抽奖奖项" width="50" height="50"></JHeader>
		<view v-if="lotteryItemRecordList.length > 0" style="padding: 20rpx 10rpx 0;">
			<view
				v-for="(item, index) in lotteryItemRecordList" :key="item.id"
				style="padding: 14rpx;margin-bottom: 38rpx;background-color: #fafafa;"
			>
				<view style="font-size: 30rpx;font-weight: bold;">奖项：{{ item.itemName || '--' }}（ID：{{ item.id || '--' }}）</view>
				<view style="font-size: 26rpx;color: #222229;">
					<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 8rpx;">
						<view>关联抽奖活动ID：{{ item.lotteryId || '--' }}</view>
						<view>奖项等级：{{ typeof item.level === 'number' ? item.level : '--' }}</view>
					</view>
					<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 8rpx;">
						<view>关联抽奖奖品ID：{{ item.prizeId || '--' }}</view>
						<view>奖项概率：{{ typeof item.percent === 'number' ? item.percent : '--' }}</view>
					</view>
				</view>
				<view style="margin-top: 6rpx;font-size: 24rpx;color: #888889;">创建时间：{{ item.creatTime || '--' }}</view>
				<view style="margin-top: 6rpx;font-size: 24rpx;color: #888889;">
					<text>是否默认：</text>
					<text v-if="item.defaultItem === 0">不是</text>
					<text v-else-if="item.defaultItem === 1">是</text>
					<text v-else>--</text>
				</view>
			</view>
		</view>
		<view style="padding-bottom: 45rpx;">
			<LoadingMore :status="isLoading ? 'loading' : ''"></LoadingMore>
			<view v-if="!isLoading && !lotteryItemRecordList.length">
				<tui-no-data :fixed="false" style="padding-top: 60rpx;">暂无奖项～</tui-no-data>
			</view>
		</view>
	</view>
</template>

<script>
import { getLotteryItemRecordApi } from '../../../api/anotherTFInterface'
export default {
	name: 'LotteryAwards',
	data() {
		return {
			lotteryActivityId: '',
			lotteryItemRecordList: [],
			isLoading: true
		}
	},
	onLoad(options) {
		this.lotteryActivityId = options.id || ''
		this.getLotteryItemRecordList()
	},
	methods: {
		getLotteryItemRecordList() {
			uni.showLoading()
			this.isLoading = true
			getLotteryItemRecordApi({ id: this.lotteryActivityId })
				.then((res) => {
					this.lotteryItemRecordList = res.data
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
.lottery-awards-container {
	min-height: 100vh;
	box-sizing: border-box;

	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}
}
</style>
