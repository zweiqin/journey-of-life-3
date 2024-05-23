<template>
	<view class="commission-record-detail-container">
		<JHeader title="收支明细" width="50" height="50"></JHeader>
		<view v-if="commissionRecordData" style="padding: 240rpx 80rpx 0;">
			<view>
				<view style="display: flex;align-items: center;flex-direction: column;">
					<view
						style="width: fit-content;padding: 28rpx;font-size: 52rpx;font-weight: bold;color: #ffffff;border-radius: 50%;line-height: 1;"
						:style="{ backgroundColor: [5, 7, 6].includes(commissionRecordData.type) ? '#208f57' : [1, 2, 3, 4].includes(commissionRecordData.type) ? '#ef530e' : '#d8d8d8' }"
					>
						<text v-if="[5, 7, 6].includes(commissionRecordData.type)">支</text>
						<text v-else-if="[1, 2, 3, 4].includes(commissionRecordData.type)">收</text>
						<text v-else>--</text>
					</view>
					<view style="margin-top: 40rpx;font-size: 42rpx;">
						<text v-if="commissionRecordData.type === 1">关系链</text>
						<text v-else-if="commissionRecordData.type === 2">商城</text>
						<text v-else-if="commissionRecordData.type === 3">本地</text>
						<text v-else-if="commissionRecordData.type === 4">服务</text>
						<text v-else-if="commissionRecordData.type === 5">支付</text>
						<text v-else-if="commissionRecordData.type === 6">佣金退款</text>
						<text v-else-if="commissionRecordData.type === 7">佣金提现</text>
						<text v-else-if="commissionRecordData.type === 8">交易金</text>
						<text v-else>--</text>
					</view>
					<view style="margin-top: 32rpx;font-size: 42rpx;">
						{{ [5, 7, 6].includes(commissionRecordData.type) ? '-'
							: [1, 2, 3, 4].includes(commissionRecordData.type) ? '+' : '？' }}
						{{ commissionRecordData.amount }}元
					</view>
				</view>
				<view style="margin-top: 78rpx;font-size: 28rpx;">
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">创建时间</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ commissionRecordData.createTime }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">方式</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">代金券</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">订单号</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ commissionRecordData.orderSn }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">订单总额</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ commissionRecordData.totalAmount }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">状态</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">
							<text v-if="commissionRecordData.isTo === 0" style="color: #00ff00;">订单未完成</text>
							<text v-else-if="commissionRecordData.isTo === 1" style="color: #ff0000;">确认收货</text>
							<text v-else-if="commissionRecordData.isTo === 2" style="color: #ff0000;">已提现</text>
							<text v-else-if="commissionRecordData.isTo === 3" style="color: #ff0000;">已退款</text>
							<text v-else-if="commissionRecordData.isTo === 4" style="color: #ff0000;">已支付</text>
							<text v-else style="color: #00ff00;">--</text>
						</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">来源</view>
						<view style="flex: 1;display: flex;align-items: center;margin: 0 0 0 40rpx;font-size: 24rpx;">
							<image
								:src="common.seamingImgUrl(commissionRecordData.imgOne)" mode="scaleToFill"
								style="width: 90rpx;height: 90rpx;border-radius: 50%;margin-right: 18rpx;"
							/>
							<text v-if="commissionRecordData.userNameOne">
								{{ commissionRecordData.userNameOne || '--' }}
							</text>
						</view>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>

export default {
	name: 'CommissionRecordDetail',
	components: {
	},
	data() {
		return {
			commissionRecordData: {
				type: '',
				userNameOne: '',
				amount: '',
				createTime: '',
				orderSn: '',
				isTo: '',
				imgOne: '',
				totalAmount: ''
			}
		}
	},
	onLoad(options) {
		uni.$on('sendCommissionRecordDetailMsg', (data) => {
			console.log(data)
			this.commissionRecordData = data.commissionRecordData
		})
	},
	beforeDestroy() {
		uni.$off('sendCommissionRecordDetailMsg')
	},
	methods: {
	}
}
</script>

<style lang="less" scoped>
.commission-record-detail-container {
	min-height: 100vh;
	box-sizing: border-box;

	/deep/ .j-header-container {
		padding: 18rpx 0 16rpx;
		background-color: #f5f5f5;

		.title {
			font-size: 36rpx;
			color: #222229;
			font-weight: normal;
		}
	}
}
</style>
