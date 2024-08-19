<template>
	<view class="transaction-record-detail-container">
		<JHeader title="收支明细" width="50" height="50"></JHeader>
		<view v-if="transactionRecordData.id" style="padding: 240rpx 80rpx 0;">
			<view v-if="[ 1 ].includes(fromOrigin)">
				<view style="display: flex;align-items: center;flex-direction: column;">
					<view
						style="width: fit-content;padding: 28rpx;font-size: 52rpx;font-weight: bold;color: #ffffff;border-radius: 50%;line-height: 1;background-color: #208f57;"
					>
						支
					</view>
					<view style="margin-top: 40rpx;font-size: 42rpx;">
						<text v-if="transactionRecordData.waterType === 1">商城消费</text>
						<text v-else-if="transactionRecordData.waterType === 2">商圈消费</text>
						<text v-else-if="transactionRecordData.waterType === 3">社区消费</text>
						<text v-else-if="transactionRecordData.waterType === 4">转出消费</text>
						<text v-else-if="transactionRecordData.waterType === 5">退款退回（获得）</text>
						<text v-else>--</text>
					</view>
					<view style="margin-top: 32rpx;font-size: 42rpx;">
						-{{ Number.parseFloat(Number(transactionRecordData.number || 0)).toFixed(2) }}
					</view>
				</view>
				<view style="margin-top: 78rpx;font-size: 28rpx;">
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">出账用户ID</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ transactionRecordData.buyerUserId }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">消费订单编号</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ transactionRecordData.orderFormid }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">去向ID</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ transactionRecordData.destinationId }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">创建时间</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ transactionRecordData.createTime }}</view>
					</view>
				</view>
			</view>
			<view v-else-if="[ 2 ].includes(fromOrigin)">
				<view style="display: flex;align-items: center;flex-direction: column;">
					<view
						style="width: fit-content;padding: 28rpx;font-size: 52rpx;font-weight: bold;color: #ffffff;border-radius: 50%;line-height: 1;background-color: #ef530e;"
					>
						收
					</view>
					<view style="margin-top: 40rpx;font-size: 42rpx;">
						<text v-if="transactionRecordData.waterType === -1">退款退回（消费）</text>
						<text v-else-if="transactionRecordData.waterType === 1">升级活动</text>
						<text v-else-if="transactionRecordData.waterType === 2">分佣活动</text>
						<text v-else-if="transactionRecordData.waterType === 3">社区活动</text>
						<text v-else-if="transactionRecordData.waterType === 4">赠券活动</text>
						<text v-else-if="transactionRecordData.waterType === 5">赠金活动</text>
						<text v-else-if="transactionRecordData.waterType === 6">商圈订单</text>
						<text v-else-if="transactionRecordData.waterType === 7">爆品家具</text>
						<text v-else-if="transactionRecordData.waterType === 8">社区订单</text>
						<text v-else-if="transactionRecordData.waterType === 9">用户代金券转增</text>
						<text v-else-if="transactionRecordData.waterType === 10">商家代金券转赠</text>
						<text v-else-if="transactionRecordData.waterType === 11">同城联盟卡</text>
						<text v-else>--</text>
					</view>
					<view style="margin-top: 32rpx;font-size: 42rpx;">
						+{{ Number.parseFloat(Number(transactionRecordData.number || 0)).toFixed(2) }}
					</view>
				</view>
				<view style="margin-top: 78rpx;font-size: 28rpx;">
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">入账用户ID</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ transactionRecordData.buyerUserId }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">来源ID</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ transactionRecordData.sourceId }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">来源类型</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">
							<text v-if="transactionRecordData.sourceType === 1">平台</text>
							<text v-else-if="transactionRecordData.sourceType === 2">商圈</text>
							<text v-else-if="transactionRecordData.sourceType === 3">商城</text>
							<text v-else-if="transactionRecordData.sourceType === 4">社区</text>
							<text v-else-if="transactionRecordData.sourceType === 5">用户</text>
							<text v-else>--</text>
						</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">来源订单编号</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ transactionRecordData.orderFormid }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">是否可用</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">
							<text v-if="transactionRecordData.isAvailable === 1">选择消费</text>
							<text v-else-if="transactionRecordData.isAvailable === 2">待选择</text>
							<text v-else-if="transactionRecordData.isAvailable === 3">选择签到</text>
							<text v-else>--</text>
						</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">有效时间</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ transactionRecordData.effectiveTime || '--' }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">创建时间</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ transactionRecordData.createTime }}</view>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>

export default {
	name: 'TransactionRecordDetail',
	components: {
	},
	data() {
		return {
			transactionRecordData: {
				id: ''
			},
			fromOrigin: ''
		}
	},
	onLoad(options) {
		uni.$on('sendTransactionRecordDetailMsg', (data) => {
			console.log(data)
			this.transactionRecordData = data.transactionRecordData
			this.fromOrigin = Number(data.fromOrigin)
		})
	},
	beforeDestroy() {
		uni.$off('sendTransactionRecordDetailMsg')
	},
	methods: {
	}
}
</script>

<style lang="less" scoped>
.transaction-record-detail-container {
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
