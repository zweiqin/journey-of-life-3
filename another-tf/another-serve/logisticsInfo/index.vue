<!-- 物流详情 -->
<template>
	<view>
		<JHeader title="物流信息" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view v-if="steps.length > 0" class="content" style="padding-bottom:100upx;">
			<view class="order-details-information mt20">
				<view class="order-title-box">
					<view class="order-title padd-l">
						<text class="line"></text>
						<text style="margin-left: 10upx;">物流信息</text>
					</view>
				</view>
			</view>
			<view class="logistics">
				<tui-steps direction="column" :items="steps" spacing="180rpx" :active-steps="0"></tui-steps>
			</view>
		</view>
		<view v-else class="emptyOrder-box flex-items-plus flex-column">
			<image class="emptyOrder-img" src="../../../static/images/new-business/shop/bgnull.png"></image>
			<label class="font-color-999 fs26 mar-top-30">你还没有物流信息哦～</label>
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
				const traces = res.data
				const len = traces.length
				for (let i = 0; i < len; i++) {
					const item = traces[i]
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
.emptyOrder-box {
	margin-top: 70upx;

	.emptyOrder-img {
		width: 113upx;
		height: 98upx;
	}
}

page {
	background: #f7f7f7;
}

.logistics {
	padding: 20upx 20upx;
}

.content {
	padding: 0 0 120upx 0;
}

.order-details-information {
	background: #fff;
	flex-shrink: 0;
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 98upx;

}

.order-details-information .order-title {
	font-size: 30upx;
	margin-left: 30upx;
	color: #333;
	font-weight: 500;
	display: flex;
	flex-direction: row;
	align-items: center;
}

.order-details-information .order-title .line {
	width: 10upx;
	height: 30upx;
	background: #ff7911;
	margin-right: 10upx;
}

.mt20 {
	margin-top: 20upx;
}
</style>
