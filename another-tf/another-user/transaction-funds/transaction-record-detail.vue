<template>
	<view class="transaction-record-detail-container">
		<JHeader title="收支明细" width="50" height="50"></JHeader>
		<view v-if="transactionRecordData" style="padding: 240rpx 80rpx 0;">
			<view>
				<view style="display: flex;align-items: center;flex-direction: column;">
					<view
						style="width: fit-content;padding: 28rpx;font-size: 52rpx;font-weight: bold;color: #ffffff;border-radius: 50%;line-height: 1;"
						:style="{ backgroundColor: transactionRecordData.fee > 0 ? '#208f57' : transactionRecordData.fee < 0 ? '#ef530e' : '#d8d8d8' }"
					>
						<text v-if="transactionRecordData.fee > 0">支</text>
						<text v-else-if="transactionRecordData.fee < 0">收</text>
						<text v-else>--</text>
					</view>
					<view style="margin-top: 40rpx;font-size: 42rpx;">
						<text v-if="transactionRecordData.targetType === 1">充值</text>
						<text v-else-if="transactionRecordData.targetType === 2">提现</text>
						<text v-else-if="transactionRecordData.targetType === 3">下单</text>
						<text v-else-if="transactionRecordData.targetType === 4">退款</text>
						<text v-else-if="transactionRecordData.targetType === 5">赠送</text>
						<text v-else>--</text>
					</view>
					<view style="margin-top: 32rpx;font-size: 42rpx;">
						{{ transactionRecordData.fee > 0 ? '+' : transactionRecordData.fee < 0 ? '-' : '？' }}{{
							Number.parseFloat(Math.abs(transactionRecordData.fee) || 0).toFixed(2) }}元
					</view>
				</view>
				<view style="margin-top: 78rpx;font-size: 28rpx;">
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">用户ID</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ transactionRecordData.buyerUserId }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">创建时间</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ transactionRecordData.createTime }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">业务类型</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">
							<text v-if="transactionRecordData.targetType === 1">充值</text>
							<text v-else-if="transactionRecordData.targetType === 2">提现</text>
							<text v-else-if="transactionRecordData.targetType === 3">订单</text>
							<text v-else-if="transactionRecordData.targetType === 4">退款</text>
							<text v-else-if="transactionRecordData.targetType === 5">赠送</text>
							<text v-else>--</text>
						</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">操作类型</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">
							<text v-if="transactionRecordData.actionType === 1">充值</text>
							<text v-else-if="transactionRecordData.actionType === 2">提现</text>
							<text v-else-if="transactionRecordData.actionType === 3">订单</text>
							<text v-else-if="transactionRecordData.actionType === 4">退款</text>
							<text v-else-if="transactionRecordData.actionType === 5">赠送</text>
							<text v-else>--</text>
						</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">变更前交易金</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">
							<text v-if="transactionRecordData.originalAccountJson">
								{{ JSON.parse(transactionRecordData.originalAccountJson).beeCoinPrice || '--' }}
							</text>
							<text v-else>--</text>
						</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">变更后交易金</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">
							<text v-if="transactionRecordData.disposeAccountJson">
								{{ JSON.parse(transactionRecordData.disposeAccountJson).beeCoinPrice || '--' }}
							</text>
							<text v-else>--</text>
						</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">流水号</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ transactionRecordData.number }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">来源uuid</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ transactionRecordData.targetUuid }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">处理状态</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">
							<text v-if="transactionRecordData.status === 0">未完成</text>
							<text v-else-if="transactionRecordData.status === 1">处理完成</text>
							<text v-else>--</text>
						</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">处理结果</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">
							<text v-if="transactionRecordData.resultType === 0">无变更</text>
							<text v-else-if="transactionRecordData.resultType === 1">有变更</text>
							<text v-else>--</text>
						</view>
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
				buyerUserId: '',
				createTime: '',
				fee: '',
				targetType: '',
				actionType: '',
				number: '',
				targetUuid: '',
				status: '',
				resultType: '',
				originalAccountJson: '',
				disposeAccountJson: ''
			}
		}
	},
	onLoad(options) {
		uni.$on('sendTransactionRecordDetailMsg', (data) => {
			console.log(data)
			this.transactionRecordData = data.transactionRecordData
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
