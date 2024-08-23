<!-- 物流详情 -->
<template>
	<view class="logistics-info-container">
		<JHeader title="订单物流信息" width="50" height="50"></JHeader>
		<view v-if="steps.length > 0" class="content" style="padding-bottom:100rpx;">
			<view class="order-details-information mt20">
				<view class="order-title-box">
					<view class="order-title padd-l">
						<text class="line"></text>
						<text style="margin-left: 10rpx;">物流信息</text>
					</view>
				</view>
			</view>
			<view class="logistics">
				<tui-steps direction="column" :items="steps" spacing="180rpx" :active-steps="0"></tui-steps>
			</view>
		</view>
		<view v-else style="padding-bottom: 45rpx;">
			<tui-no-data :fixed="false" style="padding-top: 60rpx;">你还没有物流信息哦～</tui-no-data>
		</view>
	</view>
</template>

<script>
import { getOrderDileveryShippingTraceApi } from '../../../api/anotherTFInterface'
export default {
	name: 'LogisticsInfo',
	data() {
		return {
			express: '',
			deliverFormid: '',
			steps: []
		}
	},
	onLoad(options) {
		this.express = options.express
		this.deliverFormid = options.deliverFormid
		this.getShippingTrace(this.express, this.deliverFormid)
	},
	methods: {
		// 物流信息
		getShippingTrace(express, deliverFormid) {
			getOrderDileveryShippingTraceApi({
				express,
				deliverFormid
			}).then((res) => {
				for (let i = 0; i < res.data.length; i++) {
					const item = res.data[i]
					this.steps.push({
						title: item.reason,
						desc: item.time
					})
				}
				this.steps = this.steps.reverse()
			})
		}
	}
}
</script>

<style lang="less" scoped>
.logistics-info-container {

	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}

	page {
		background: #f7f7f7;
	}

	.logistics {
		padding: 20rpx 20rpx;
	}

	.content {
		padding: 0 0 120rpx 0;
	}

	.order-details-information {
		background: #fff;
		flex-shrink: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 98rpx;

	}

	.order-details-information .order-title {
		font-size: 30rpx;
		margin-left: 30rpx;
		color: #333;
		font-weight: 500;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.order-details-information .order-title .line {
		width: 10rpx;
		height: 30rpx;
		background: #ff7911;
		margin-right: 10rpx;
	}

	.mt20 {
		margin-top: 20rpx;
	}
}
</style>
