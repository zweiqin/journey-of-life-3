<template>
	<view class="voucher-record-detail-container">
		<JHeader title="收支明细" width="50" height="50"></JHeader>
		<view v-if="voucherRecordData.id" style="padding: 240rpx 80rpx 0;">
			<view v-if="[ 1 ].includes(fromOrigin)">
				<view style="display: flex;align-items: center;flex-direction: column;">
					<view
						style="width: fit-content;padding: 28rpx;font-size: 52rpx;font-weight: bold;color: #ffffff;border-radius: 50%;line-height: 1;background-color: #ef530e;"
					>
						<text>收</text>
					</view>
					<view style="margin-top: 40rpx;font-size: 42rpx;">
						<text v-if="voucherRecordData.waterType === 1">充值</text>
						<text v-else-if="voucherRecordData.waterType === 2">转入</text>
						<text v-else-if="voucherRecordData.waterType === 3">签到</text>
						<text v-else-if="voucherRecordData.waterType === 4">抽奖</text>
						<text v-else-if="voucherRecordData.waterType === 5">充值赠送</text>
						<text v-else-if="voucherRecordData.waterType === 6">商城下单</text>
						<text v-else-if="voucherRecordData.waterType === 7">商圈下单</text>
						<text v-else-if="voucherRecordData.waterType === 8">社区下单</text>
						<text v-else-if="voucherRecordData.waterType === 9">活动</text>
						<text v-else-if="voucherRecordData.waterType === 10">退款</text>
						<text v-else>--</text>
					</view>
					<view style="margin-top: 32rpx;font-size: 42rpx;">
						+{{ voucherRecordData.number }}代金券
					</view>
				</view>
				<view style="margin-top: 78rpx;font-size: 28rpx;">
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">平台代金券ID</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ voucherRecordData.platformVoucherId }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">入账用户ID</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ voucherRecordData.buyerUserId || '--' }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">来源类型</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">
							<text v-if="voucherRecordData.sourceType === 1">平台</text>
							<text v-else-if="voucherRecordData.sourceType === 2">商家</text>
							<text v-else-if="voucherRecordData.sourceType === 3">用户</text>
							<text v-else-if="voucherRecordData.sourceType === 4">社区</text>
							<text v-else>--</text>
						</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">来源ID</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">
							<text v-if="voucherRecordData.sourceId === 0">平台</text>
							<text v-else>{{ voucherRecordData.sourceId }}</text>
						</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">来源订单编号</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ voucherRecordData.orderFormid || '--' }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">有效时间</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ voucherRecordData.effectiveTime || '--' }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">创建时间</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ voucherRecordData.createTime }}</view>
					</view>
				</view>
			</view>
			<view v-else-if="[ 2 ].includes(fromOrigin)">
				<view style="display: flex;align-items: center;flex-direction: column;">
					<view
						style="width: fit-content;padding: 28rpx;font-size: 52rpx;font-weight: bold;color: #ffffff;border-radius: 50%;line-height: 1;background-color: #208f57;"
					>
						<text>支</text>
					</view>
					<view style="margin-top: 40rpx;font-size: 42rpx;">
						<text v-if="voucherRecordData.waterType === 1">商城兑换</text>
						<text v-else-if="voucherRecordData.waterType === 2">商圈兑换</text>
						<text v-else-if="voucherRecordData.waterType === 3">社区兑换</text>
						<text v-else-if="voucherRecordData.waterType === 4">转出</text>
						<text v-else>--</text>
					</view>
					<view style="margin-top: 32rpx;font-size: 42rpx;">
						+{{ voucherRecordData.number }}代金券
					</view>
				</view>
				<view style="margin-top: 78rpx;font-size: 28rpx;">
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">平台代金券ID</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ voucherRecordData.platformVoucherId }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">出账用户ID</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ voucherRecordData.buyerUserId || '--' }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">兑换订单编号</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ voucherRecordData.orderFormid || '--' }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">创建时间</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ voucherRecordData.createTime }}</view>
					</view>
				</view>
			</view>
			<view v-else-if="[ 3 ].includes(fromOrigin)">
				<view style="display: flex;align-items: center;flex-direction: column;">
					<view
						style="width: fit-content;padding: 28rpx;font-size: 52rpx;font-weight: bold;color: #ffffff;border-radius: 50%;line-height: 1;background-color: #ef530e;"
					>
						<text>收</text>
					</view>
					<view style="margin-top: 40rpx;font-size: 42rpx;">
						{{ ['未付款', '取消', '已付款', '支付失败'][voucherRecordData.status] }}
					</view>
					<view style="margin-top: 32rpx;font-size: 42rpx;">
						购买{{ voucherRecordData.number }}代金券
					</view>
				</view>
				<view style="margin-top: 78rpx;font-size: 28rpx;">
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">购买的代金券ID</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ voucherRecordData.voucherId }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">购买者ID</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ voucherRecordData.buyerUserId || '--' }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">充值订单编号</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ voucherRecordData.orderFormid || '--' }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">第三方支付ID</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ voucherRecordData.trxId || '--' }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">支付时间</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ voucherRecordData.payTime || '--' }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">消费金额</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ voucherRecordData.payGrade }}元</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">创建时间</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ voucherRecordData.createTime }}</view>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>

export default {
	name: 'VoucherRecordDetail',
	components: {
	},
	data() {
		return {
			voucherRecordData: {
				id: ''
			},
			fromOrigin: ''
		}
	},
	onLoad(options) {
		uni.$on('sendVoucherRecordDetailMsg', (data) => {
			console.log(data)
			this.voucherRecordData = data.voucherRecordData
			this.fromOrigin = Number(data.fromOrigin)
		})
	},
	beforeDestroy() {
		uni.$off('sendVoucherRecordDetailMsg')
	},
	methods: {
	}
}
</script>

<style lang="less" scoped>
.voucher-record-detail-container {
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
