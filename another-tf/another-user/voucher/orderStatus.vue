<template>
	<view class="container">
		<view class="backHeader">
			<tui-icon
				name="arrowleft" :size="60" unit="rpx"
				color="#000000"
				margin="0" @click="goBack"
			></tui-icon>
			<text class="pageTitle">订单状态</text>
		</view>
		<view class="statusBox">
			<view class="orderStatus">
				<tui-icon
					:name="statusImgSrc[Number(orderStatus)].name" :size="52" unit="rpx"
					:color="statusImgSrc[Number(orderStatus)].color"
					margin="0"
				></tui-icon>
				<text class="statusTitle">{{ (istopUp ? '充值' : '转赠') + (orderStatus ? '成功' : '失败') }}</text>
			</view>
			<view style="margin-top: 74rpx;">
				<view v-if="Number(istopUp)" style="border-radius: 50%;background-color: #ff380c;padding: 20rpx;font-size: 40rpx;color: #ffffff;font-weight: bold;line-height: 1;">
					充
				</view>
				<view v-else style="border-radius: 50%;background-color: #3982f1;padding: 20rpx;font-size: 40rpx;color: #ffffff;font-weight: bold;line-height: 1;">
					转
				</view>
			</view>
			<view class="orderForm">{{ istopUp ? '代金券充值-平台充值' : '代金券转赠-平台转赠' }}</view>
			<view class="orderCount">{{ count }}</view>
			<button class="goBackFn" @click="goBack">{{ istopUp ? '再次充值' : '再次转赠' }}</button>
		</view>
	</view>
</template>

<script>
export default {
	name: 'OrderStatus',
	data() {
		return {
			count: 0,
			istopUp: false,
			orderStatus: true,
			statusImgSrc: [{ name: 'close-fill', color: '#e02208' }, { name: 'circle-fill', color: '#208f57' }]
		}
	},
	onLoad(options) {
		console.log(options)
		this.count = Number(options.count)
		this.istopUp = Boolean(Number(options.istopUp))
		this.orderStatus = Boolean(Number(options.orderStatus))
		// console.log(this.count,this.istopUp,this.orderStatus);
	},
	methods: {
		goBack() {
			uni.navigateBack()
		}
	}
}
</script>

<style lang="scss" scoped>
.container {
	width: 100vw;
	height: 100vh;
	background-color: #F5F5F5;

	.backHeader {
		position: relative;
		width: 750rpx;
		height: 88rpx;
		background-color: #F6F6F8;
		display: flex;
		align-items: center;

		.backIcon {
			width: 60rpx;
			height: 60rpx;
		}

		.pageTitle {
			font-size: 32rpx;
			font-weight: 600;
			line-height: 44rpx;
			letter-spacing: 0.32rpx;
			color: #222229;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
		}
	}

	.statusBox {
		width: 750rpx;
		height: 750rpx;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
		align-items: center;

		.orderStatus {
			margin-top: 126rpx;
			display: flex;
			align-items: center;

			.statusIcon {
				width: 52rpx;
				height: 52rpx;
				border-radius: 50%;
			}

			.statusTitle {
				margin-left: 10rpx;
				font-family: Source Han Sans;
				font-size: 36rpx;
				font-weight: normal;
				line-height: 40rpx;
				text-align: center;
				font-feature-settings: "kern" on;
				color: #208F57;
			}
		}

		.orderType {
			margin-top: 74rpx;
			width: 90rpx;
			height: 90rpx;
			border-radius: 50%;
			background: #3982F1;
		}

		.orderForm {
			margin-top: 24rpx;
			font-size: 36rpx;
			line-height: 40rpx;
			text-align: center;
			font-feature-settings: "kern" on;
			color: #222229;
		}

		.orderCount {
			margin-top: 32rpx;
			font-size: 52rpx;
			font-weight: 500;
			line-height: 40rpx;
			text-align: center;
			font-feature-settings: "kern" on;
			color: #222229;
		}

		.goBackFn {
			margin-top: 104rpx;
			width: 216rpx;
			height: 88rpx;
			border-radius: 50rpx;
			font-family: Source Han Sans;
			font-size: 32rpx;
			line-height: 88rpx;
			font-weight: normal;
		}
	}
}
</style>
