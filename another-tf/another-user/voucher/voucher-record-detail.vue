<template>
	<view class="voucher-record-detail-container">
		<JHeader title="收支明细" width="50" height="50"></JHeader>
		<view v-if="voucherRecordData.id" style="padding: 240rpx 80rpx 0;">
			<view v-if="[3, 2].includes(fromOrigin)">
				<view style="display: flex;align-items: center;flex-direction: column;">
					<view
						style="width: fit-content;padding: 28rpx;font-size: 52rpx;font-weight: bold;color: #ffffff;border-radius: 50%;line-height: 1;"
						:style="{ backgroundColor: [2, 4].includes(voucherRecordData.type) ? '#ef530e' : '#208f57' }"
					>
						<text
							v-if="([ 2 ].includes(fromOrigin) && [2, 4].includes(voucherRecordData.type)) || ([ 3 ].includes(fromOrigin) && [ 4 ].includes(voucherRecordData.type))"
						>
							支
						</text>
						<text v-else>收</text>
					</view>
					<view style="margin-top: 40rpx;font-size: 42rpx;">
						<text v-if="voucherRecordData.type === 1">充值</text>
						<text v-else-if="voucherRecordData.type === 2">转赠</text>
						<text v-else-if="voucherRecordData.type === 3">签到</text>
						<text v-else-if="voucherRecordData.type === 4">抵扣</text>
						<text v-else-if="voucherRecordData.type === 5">核销</text>
						<text v-else-if="voucherRecordData.type === 6">抽奖</text>
						<text v-else-if="voucherRecordData.type === 7">退款</text>
						<text v-else-if="voucherRecordData.type === 8">充值赠送</text>
						<text v-else-if="voucherRecordData.type === 9">下单</text>
						<text v-else>--</text>
					</view>
					<view style="margin-top: 32rpx;font-size: 42rpx;">
						{{ ([ 2 ].includes(fromOrigin) && [2, 4].includes(voucherRecordData.type)) ||
							([ 3 ].includes(fromOrigin) && [ 4 ].includes(voucherRecordData.type)) ? '-' : '+' }}
						{{ voucherRecordData.number }}代金券
					</view>
				</view>
				<view style="margin-top: 78rpx;font-size: 28rpx;">
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">支付时间</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ voucherRecordData.createTime }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">方式</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">代金券</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">订单号</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ voucherRecordData.orderSn }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">类型</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ voucherRecordData.typeStrName }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">名称</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">
							<text v-if="[ 2 ].includes(fromOrigin) && voucherRecordData.username">
								{{ voucherRecordData.username }}
							</text>
							<text v-else-if="[ 3 ].includes(fromOrigin) && voucherRecordData.userNameOne">
								{{ voucherRecordData.userNameOne }}
							</text>
						</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">账号</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">
							<text v-if="[ 2 ].includes(fromOrigin) && voucherRecordData.username">
								{{ voucherRecordData.userId || '--' }}
							</text>
							<text v-else-if="[ 3 ].includes(fromOrigin) && voucherRecordData.userNameOne">
								{{ voucherRecordData.holdId || '--' }}
							</text>
						</view>
					</view>
				</view>
			</view>
			<view v-else-if="[ 1 ].includes(fromOrigin)">
				<view style="display: flex;align-items: center;flex-direction: column;">
					<view
						style="width: fit-content;padding: 28rpx;font-size: 52rpx;font-weight: bold;color: #ffffff;background-color: #ef530e;border-radius: 50%;line-height: 1;"
					>
						收
					</view>
					<view style="margin-left: 14rpx;">
						<view style="font-size: 28rpx;font-weight: bold;color: #222229;">
							{{ voucherRecordData.typeStrName }}代金券
						</view>
					</view>
					<view style="margin-top: 32rpx;font-size: 42rpx;">
						+{{ voucherRecordData.number }}代金券
					</view>
				</view>
				<view style="margin-top: 78rpx;font-size: 28rpx;">
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">创建时间</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ voucherRecordData.createTime }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">订单号</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ voucherRecordData.orderSn }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">类型</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ voucherRecordData.typeStrName }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">金额</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">
							￥{{ voucherRecordData.payGrade }}元（{{ ['未付款', '取消',
								'已付款', '未发放', '已发放', '支付失败'][voucherRecordData.status] }}）
						</view>
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
