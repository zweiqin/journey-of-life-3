<template>
	<view class="container">
		<view class="backHeader">
			<image class="backIcon" src="../../../static/index/convenient-services/return.png" @click="goBack"></image>
			<text class="pageTitle">订单状态</text>
		</view>
		<view class="statusBox">
			<view class="orderStatus">
				<image class="statusIcon" :src="statusImgSrc[Number(orderStatus)]"></image>
				<text class="statusTitle">{{ (istopUp ? '充值' : '转赠') + (orderStatus ? '成功' : '失败') }}</text>
			</view>
			<image class="orderType" :src="imgSrc[Number(istopUp)]"></image>
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
			imgSrc: [require('../../../static/images/user/voucher/zhuan.png'), require('../../../static/images/user/voucher/chon.png')],
			statusImgSrc: [require('../../../static/images/user/voucher/error.png'), require('../../../static/images/user/voucher/great.png')]
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
