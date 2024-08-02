<template>
	<view class="recharge-record-container">
		<JHeader title="平台充值流水记录" width="50" height="50" style="padding: 24rpx 0 10rpx;background-color: #f5f5f5;"></JHeader>
		<view style="padding: 40rpx 26rpx;">
			<view style="font-size: 34rpx;font-weight: bold;">明细统计</view>
			<view v-if="rechargeRecordList && rechargeRecordList.length" style="margin-top: 40rpx;">
				<view
					v-for="(item, index) in rechargeRecordList" :key="index"
					style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 48rpx;"
				>
					<view style="display: flex;align-items: center;">
						<view
							style="width: 76rpx;height: 76rpx;text-align: center;border-radius: 50%;overflow: hidden;font-size: 38rpx;font-weight: bold;color: #ffffff;"
						>
							<view
								v-if="item.actionType === 1"
								style="width: 100%;height: 100%;background-color: #ef530e;line-height: 76rpx;"
							>
								充
							</view>
							<view
								v-else-if="item.actionType === 2"
								style="width: 100%;height: 100%;background-color: #439544;line-height: 76rpx;"
							>
								提
							</view>
							<view
								v-else-if="item.actionType === 3"
								style="width: 100%;height: 100%;background-color: #499cca;line-height: 76rpx;"
							>
								订
							</view>
							<view v-else>？</view>
						</view>
						<view style="margin-left: 12rpx;">
							<view style="font-weight: bold;color: #222229;">
								<text v-if="item.actionType === 1">充值</text>
								<text v-else-if="item.actionType === 2">提现</text>
								<text v-else-if="item.actionType === 3">订单</text>
								<text v-else>--</text>
							</view>
							<view style="font-size: 28rpx;color: #888889;">{{ item.createTime }}</view>
						</view>
					</view>
					<view style="text-align: right;">
						<view style="font-weight: bold;color: #222229;">{{ item.fee }}元</view>
						<view style="font-size: 28rpx;color: #888889;">
							<text v-if="item.status === 0">未完成</text>
							<text v-else-if="item.status === 1">处理完成</text>
							<text v-else>--</text>
						</view>
					</view>
				</view>
			</view>
			<view style="padding-bottom: 45rpx;">
				<LoadingMore
					:status="!isEmpty && !rechargeRecordList.length
						? 'loading' : !isEmpty && rechargeRecordList.length && (rechargeRecordList.length >= rechargeRecordTotal) ? 'no-more' : ''"
				>
				</LoadingMore>
				<tui-no-data v-if="isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无数据</tui-no-data>
			</view>
		</view>
	</view>
</template>

<script>
import { getByAllBuyerUserRechargeLogApi } from '../../../api/anotherTFInterface'

export default {
	name: 'RechargeRecord',
	data() {
		return {
			isEmpty: false,
			rechargeRecordTotal: 0,
			rechargeRecordList: [],
			queryInfo: {
				amounts: '',
				page: 1,
				pageSize: 20
			}
		}
	},
	onLoad(options) {
		this.getRechargeRecordList()
	},

	methods: {
		getRechargeRecordList(isLoadmore) {
			uni.showLoading()
			getByAllBuyerUserRechargeLogApi(this.queryInfo)
				.then((res) => {
					this.rechargeRecordTotal = res.data.total
					if (isLoadmore) {
						this.rechargeRecordList.push(...res.data.records)
					} else {
						this.rechargeRecordList = res.data.records
					}
					this.isEmpty = this.rechargeRecordList.length === 0
					uni.hideLoading()
				})
				.catch((e) => {
					uni.hideLoading()
				})
		}
	},
	onReachBottom() {
		if (this.rechargeRecordList.length < this.rechargeRecordTotal) {
			++this.queryInfo.page
			this.getRechargeRecordList(true)
		}
	}
}
</script>

<style lang="less" scoped>
.recharge-record-container {
	position: relative;
	min-height: 100vh;
	box-sizing: border-box;
}
</style>
