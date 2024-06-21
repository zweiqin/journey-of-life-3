<template>
	<view style="height: 100%;">
		<scroll-view scroll-y style="height: 100%;">
			<view style="padding-top: 20rpx;display: flex;justify-content: flex-end;">
				<view style="padding: 10rpx 16rpx;color: #222229;background-color: #ffffff;">
					<view @click="$refs.dateTimeWithdrawalDetails && $refs.dateTimeWithdrawalDetails.show()">
						<tui-icon name="calendar" :size="18" color="#222229"></tui-icon>
						<text v-if="queryInfo.startTime && queryInfo.endTime" style="margin-left: 10rpx;font-size: 32rpx;">{{ `${queryInfo.startTime}~${queryInfo.endTime}` }}</text>
						<text v-else style="margin-left: 10rpx;font-size: 32rpx;">选择时间段</text>
					</view>
					<tui-calendar
						ref="dateTimeWithdrawalDetails" :type="2" is-fixed
						:max-date="`${String(new Date().getFullYear())}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`"
						@change="handleWithdrawalDetailsCalendar"
					></tui-calendar>
				</view>
			</view>
			<view style="padding: 20rpx;">
				<view style="font-size: 28rpx;font-weight: bold;color: #222229;">
					<text>共有</text>
					<text style="color: #EF530E;">{{ withdrawalList.length }}</text>
					<text>笔汇款记录</text>
				</view>
				<view v-if="withdrawalList && withdrawalList.length" style="margin-top: 30rpx;">
					<view v-for="(item, index) in withdrawalList" :key="index" style="margin-bottom: 24rpx;">
						<view style="display: flex;justify-content: space-between;align-items: center;font-size: 28rpx;color: #222229;">
							<view>提现到：{{ item.bankName || '未知' }}（{{ item.bankCard.slice(-4) }}）</view>
							<view>
								状态：
								<text>
									<text v-if="item.state === 0">待处理</text>
									<text v-else-if="item.state === 1">已处理</text>
									<text v-else-if="item.state === 2">通过</text>
									<text v-else-if="item.state === 3">拒绝</text>
									<text v-else>--</text>
								</text>
							</view>
						</view>
						<view v-if="(item.state === 2) && item.cause" style="font-size: 28rpx;">
							<text style="font-weight: bold;">拒绝原因：</text>
							<text>{{ item.cause }}</text>
						</view>
						<view style="display: flex;justify-content: space-between;align-items: flex-end;margin-top: 1rpx;">
							<view style="font-size: 24rpx;color: #9E9E9E;">{{ item.applyTime || '--' }}</view>
							<view style="font-size: 28rpx;color: #222229;">
								￥{{ item.withdrawalMoney || '--' }}
							</view>
						</view>
					</view>
				</view>
				<view style="padding-bottom: 45rpx;">
					<LoadingMore :status="isLoading ? 'loading' : ''"></LoadingMore>
					<view v-if="!isLoading && !withdrawalList.length">
						<tui-no-data :fixed="false" style="padding-top: 60rpx;">暂无提现数据</tui-no-data>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import { getShopWithdrawalDetailsApi } from '../../../../api/anotherTFInterface'

export default {
	name: 'OrderWithdrawalDetails',
	props: {},

	data() {
		return {
			queryInfo: {
				startTime: '',
				endTime: ''
			},
			isLoading: false,
			withdrawalList: []
		}
	},

	created() {
		// console.log(this.$refs)
		// this.getShopWithdrawalDetails()
	},

	methods: {
		getShopWithdrawalDetails() {
			this.isLoading = true
			getShopWithdrawalDetailsApi({ ...this.queryInfo })
				.then((res) => {
					this.withdrawalList = res.data
					this.isLoading = false
				})
				.catch(() => {
					this.isLoading = false
				})
		},
		handleWithdrawalDetailsCalendar(e) {
			console.log(e)
			if (e.startDate === e.endDate) return this.$showToast('不能选择同一天')
			this.queryInfo.startTime = e.startDate
			this.queryInfo.endTime = e.endDate
			this.getShopWithdrawalDetails()
		}
	}
}
</script>

<style lang="less" scoped></style>
