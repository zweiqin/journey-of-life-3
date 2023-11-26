<template>
	<view>
		<view style="margin: 10upx 0;text-align: right;">
			<tui-button
				type="blue" width="220rpx" height="60rpx" margin="0 30upx 0 0"
				style="display: inline-block;border-radius: 30rpx;" @click="$refs.dateTimeWithdrawalDetails && $refs.dateTimeWithdrawalDetails.show()"
			>
				选择时间段
			</tui-button>
			<tui-calendar
				ref="dateTimeWithdrawalDetails" :type="2" is-fixed
				:max-date="new Date(Date.now()).toLocaleString().substring(0, 10).replaceAll('/', '-')"
				@change="handleWithdrawalDetailsCalendar"
			></tui-calendar>
		</view>
		<view style="padding: 20upx;">
			<view v-if="withdrawalList && withdrawalList.length">
				<view v-for="(item, index) in withdrawalList" :key="index">
					<view style="display: flex;justify-content: space-between;align-items: center;font-size: 26upx;color: #999999;">
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
					<view style="display: flex;justify-content: space-between;align-items: flex-end;margin-top: 12upx;">
						<view>
							金额：
							<text style="color: #ff0e0e;font-weight: bold;">{{ item.withdrawalMoney || '--' }}</text>
						</view>
						<view style="font-size: 26upx;color: #999999;">{{ item.applyTime || '--' }}</view>
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
