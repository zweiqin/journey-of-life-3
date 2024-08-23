<template>
	<view class="payCourteous">
		<JHeader title="评价成功" width="50" height="50"></JHeader>
		<view class="evaBox">
			<view class="imgBox">
				<tui-icon name="wallet" :size="166" unit="rpx" color="#333333"></tui-icon>
			</view>
			<view class="successful">评价成功</view>
			<view class="btnBox fs28 font-color-333">
				<view class="orderBtn btn" @click="goToOrder">查看订单</view>
				<view class="homeBtn btn" @click="goToHome">返回首页</view>
			</view>
		</view>

		<ATFHoteRecommed></ATFHoteRecommed>
	</view>
</template>

<script>

export default {
	name: 'EvaSuccessful',
	data() {
		return {
			orderId: null,
			orderPolite: {},
			list: []
		}
	},
	methods: {
		goToOrder() {
			this.$switchTab('/pages/order/order')
		},
		goToHome() {
			this.$switchTab('/pages/index/index')
		}
	}
}
</script>

<style lang="less" scoped>
.payCourteous {
	min-height: 100vh;
	border-top: 2rpx solid #F3F4F5;
	background-color: #F8F8F8;
	box-sizing: border-box;
	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}

	.evaBox {
		padding: 30rpx 30rpx 50rpx 30rpx;
		background: #FFFFFF;

		.imgBox {
			padding-top: 100rpx;
			display: flex;
			justify-content: center;
		}

		.successful {
			text-align: center;
			margin-top: 30rpx;
		}

		.btnBox {
			display: flex;
			justify-content: center;
			margin-top: 30rpx;

			.btn {
				width: 140rpx;
				height: 58rpx;
				line-height: 58rpx;
				border: 2rpx solid #999999;
				text-align: center;
				font-size: 24rpx;
				color: #999999;
			}

			.orderBtn {
				margin-right: 30rpx;
			}

			.homeBtn {
				background: #333333;
				border: none;
				color: #FFEBC4;
			}
		}
	}
}
</style>
