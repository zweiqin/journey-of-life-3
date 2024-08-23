<template>
	<view class="commission-record-detail-container">
		<JHeader title="收支明细" width="50" height="50"></JHeader>
		<view v-if="commissionRecordData.id" style="padding: 240rpx 80rpx 0;">
			<view v-if="[ 1 ].includes(fromOrigin)">
				<view style="display: flex;align-items: center;flex-direction: column;">
					<view
						style="width: fit-content;padding: 28rpx;font-size: 52rpx;font-weight: bold;color: #ffffff;border-radius: 50%;line-height: 1;background-color: #ef530e;"
					>
						<text>收</text>
					</view>
					<view style="margin-top: 40rpx;font-size: 42rpx;">
						<text v-if="commissionRecordData.waterType === 1">升级角色</text>
						<text v-else-if="commissionRecordData.waterType === 2">分佣</text>
						<text v-else-if="commissionRecordData.waterType === 3">社区服务</text>
						<text v-else-if="commissionRecordData.waterType === 4">代金券</text>
						<text v-else-if="commissionRecordData.waterType === 5">消费金</text>
						<text v-else-if="commissionRecordData.waterType === 6">商圈订单</text>
						<text v-else-if="commissionRecordData.waterType === 7">爆品家具</text>
						<text v-else-if="commissionRecordData.waterType === 8">社区订单</text>
						<text v-else>--</text>
					</view>
					<view style="margin-top: 32rpx;font-size: 42rpx;">
						+{{ commissionRecordData.commissionNumber }}元
					</view>
				</view>
				<view style="margin-top: 78rpx;font-size: 28rpx;">
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">入账用户ID</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ commissionRecordData.buyerUserId || '--' }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">来源类型</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">
							<text v-if="commissionRecordData.sourceType === 1">平台</text>
							<text v-else-if="commissionRecordData.sourceType === 2">商家</text>
							<text v-else-if="commissionRecordData.sourceType === 3">用户</text>
							<text v-else-if="commissionRecordData.sourceType === 4">社区</text>
							<text v-else>--</text>
						</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">来源ID</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ commissionRecordData.sourceId || '--' }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">来源订单编号</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ commissionRecordData.orderFormid || '--' }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">有效时间</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ commissionRecordData.effectiveTime || '--' }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">创建时间</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ commissionRecordData.createTime }}</view>
					</view>
					<!-- <view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">来源</view>
						<view style="flex: 1;display: flex;align-items: center;margin: 0 0 0 40rpx;font-size: 24rpx;">
						<image
						:src="common.seamingImgUrl(commissionRecordData.xxx)" mode="scaleToFill"
						style="width: 90rpx;height: 90rpx;border-radius: 50%;margin-right: 18rpx;"
						/>
						<text v-if="commissionRecordData.xxx">
						{{ commissionRecordData.xxx || '--' }}
						</text>
						</view>
						</view> -->
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
						<text v-if="commissionRecordData.waterType === 1">商城购买</text>
						<text v-else-if="commissionRecordData.waterType === 2">商圈购买</text>
						<text v-else-if="commissionRecordData.waterType === 3">社区购买</text>
						<text v-else-if="commissionRecordData.waterType === 4">提现</text>
						<text v-else>--</text>
					</view>
					<view style="margin-top: 32rpx;font-size: 42rpx;">
						-{{ commissionRecordData.commissionNumber }}元
					</view>
				</view>
				<view style="margin-top: 78rpx;font-size: 28rpx;">
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">出账用户ID</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ commissionRecordData.buyerUserId || '--' }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">去向ID</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ commissionRecordData.destinationId || '--' }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">购买订单编号</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ commissionRecordData.orderFormid || '--' }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 24rpx;">
						<view style="min-width: 112rpx;color: #6E7079">创建时间</view>
						<view style="flex: 1;margin: 0 0 0 40rpx;font-size: 24rpx;">{{ commissionRecordData.createTime }}</view>
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
				id: '',
				buyerUserId: '',
				sourceType: '',
				sourceId: '',
				orderFormid: '',
				commissionNumber: '',
				waterType: '',
				effectiveTime: '',
				createTime: '',
				updateTime: '',
				destinationId: '' // 去向ID
			},
			fromOrigin: ''
		}
	},
	onLoad(options) {
		uni.$on('sendCommissionRecordDetailMsg', (data) => {
			console.log(data)
			this.commissionRecordData = data.commissionRecordData
			this.fromOrigin = Number(data.fromOrigin)
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

	/deep/ .j-header-wrapper {
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
