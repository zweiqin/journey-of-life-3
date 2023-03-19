<template>
	<view class="tixian">
		<view class="return">
			<img src="../../../static/images/icon/return.png" alt="" class="return-logo" @click="handleBack">
		</view>
		<view class="tixian-name">提现金额</view>
		<view class="tixian-list">
			<view class="logo">￥</view>
			<input type="text" class="input" placeholder="0.00" placeholder-class="num" v-model="number">
		</view>
		<view class="tixian-money">
			<view class="allow">
				<view class="allow-text">可提现</view>
				<view class="allow-money">￥2540</view>
			</view>
			<view class="all">全部提现</view>
		</view>
		<view class="go-to">提现到</view>
		<view class="type-list">
			<view class="left">
				<img src="../../../static/images/user/vx.png" alt="" class="vx">
				<view class="text">微信余额</view>
			</view>
			<view class="right">
				<img src="../../../static/images/user/arrow.png" alt="" class="arrow">
			</view>
		</view>
		<view class="foot">
			<view class="foot-list">
				<view class="foot-money">
					<text style="font-size: 32upx;font-weight: bold;color: #FC4023;">￥</text>
					<text style="font-size: 48upx;font-weight: bold;color: #FC4023;">{{ number }}</text>
				</view>
				<view class="btn">确认提现</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: "Tixian",
	props: {

	},
	data() {
		return {
			number:"",
		}
	},
	methods: {
		handleBack() {
			uni.navigateBack()
		},
	},
	created() { }
}
</script>

<style lang="less" scoped>
.tixian {
	padding: 36upx 32upx 0 32upx;

	.return {
		.return-logo {
			width: 24upx;
			height: 48upx;
		}
	}

	.tixian-name {
		font-size: 32upx;
		color: #B3B2AD;
		padding-top: 36upx;
	}

	.tixian-list {
		display: flex;
		align-items: center;
		padding: 32upx 0;
		border-bottom: 2upx solid #D5D4D1;
		margin-bottom: 16upx;

		.logo {
			font-size: 42upx;
			font-weight: bold;
			color: #3A3629;
			padding-right: 8upx;
		}

		.num {
			font-size: 42upx;
			font-weight: bold;
			color: #D5D4D1;
		}

		.input {
			font-size: 42upx;
			font-weight: bold;
			color: #3A3629;
		}
	}

	.tixian-money {
		display: flex;
		align-items: center;

		.allow {
			display: flex;
			font-size: 28upx;
			color: #3A3629;
			padding-right: 12upx;

			.allow-text {
				padding-right: 6upx;
			}

			.allow-money {}
		}

		.all {
			font-size: 28upx;
			color: #FFC117;
		}
	}

	.go-to {
		font-size: 32upx;
		color: #B3B2AD;
		padding-top: 64upx;
	}

	.type-list {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 40upx;

		// margin-bottom: 72upx;
		.left {
			display: flex;
			align-items: center;

			.vx {
				width: 64upx;
				height: 64upx;
				margin-right: 16upx;
			}

			.text {
				font-size: 28upx;
				color: #141000;
			}
		}

		.right {
			width: 40upx;
			height: 40upx;

			.arrow {
				width: 40upx;
				height: 40upx;
			}
		}
	}

	.foot {
		width: 100%;
		height: 120upx;
		position: fixed;
		bottom: 0;
		left: 0;
		background: #FFFFFF;
		border-top: 1upx solid #E5E5E5;

		.foot-list {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 16upx 32upx;

			.foot-money {}

			.btn {
				width: 240upx;
				height: 88upx;
				border-radius: 44upx;
				background: #FFCB05;
				font-size: 32upx;
				font-weight: 500;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
}
</style>
