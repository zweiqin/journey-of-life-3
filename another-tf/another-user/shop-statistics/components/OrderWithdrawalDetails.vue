<template>
	<view style="height: 100%;">
		<scroll-view scroll-y style="height: 100%;">
			<view style="padding-top: 20upx;display: flex;justify-content: flex-end;">
				<view style="padding: 10upx 16upx;color: #222229;background-color: #ffffff;">
					<view @click="$refs.dateTimeWithdrawalDetails && $refs.dateTimeWithdrawalDetails.show()">
						<tui-icon name="calendar" :size="18" color="#222229"></tui-icon>
						<text v-if="queryInfo.startTime && queryInfo.endTime" style="margin-left: 10upx;font-size: 32upx;">{{ `${queryInfo.startTime}~${queryInfo.endTime}` }}</text>
						<text v-else style="margin-left: 10upx;font-size: 32upx;">选择时间段</text>
					</view>
					<tui-calendar
						ref="dateTimeWithdrawalDetails" :type="2" is-fixed
						:max-date="new Date(Date.now()).toLocaleString().substring(0, 10).replaceAll('/', '-')"
						@change="handleWithdrawalDetailsCalendar"
					></tui-calendar>
				</view>
			</view>
			<view style="padding: 20upx;">
				<view style="font-size: 28upx;font-weight: bold;color: #222229;">
					<text>共有</text>
					<text style="color: #EF530E;">{{ withdrawalList.length }}</text>
					<text>笔汇款记录</text>
				</view>
				<view v-if="withdrawalList && withdrawalList.length" style="margin-top: 30upx;">
					<view v-for="(item, index) in withdrawalList" :key="index" style="margin-bottom: 24upx;">
						<view style="display: flex;justify-content: space-between;align-items: center;font-size: 28upx;color: #222229;">
							<view>提现到：{{ item.bankName || '未知' }}（{{ item.bankCard.slice(-4) }}）</view>
							<view>
								状态：
								<text>
									<text v-if="item.state === 0">待审核</text>
									<text v-else-if="item.state === 1">通过</text>
									<text v-else-if="item.state === 2">拒绝</text>
									<text v-else>--</text>
								</text>
							</view>
						</view>
						<view style="display: flex;justify-content: space-between;align-items: flex-end;margin-top: 1upx;">
							<view style="font-size: 24upx;color: #9E9E9E;">{{ item.applyTime || '--' }}</view>
							<view style="font-size: 28upx;color: #222229;">
								￥{{ item.withdrawalMoney || '--' }}
							</view>
						</view>
					</view>
				</view>
				<view style="padding-bottom: 45upx;">
					<LoadingMore :status="isLoading ? 'loading' : ''"></LoadingMore>
					<view v-if="!isLoading && !withdrawalList.length">
						<tui-no-data :fixed="false" style="padding-top: 60upx;">暂无提现数据</tui-no-data>
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
