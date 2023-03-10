<template>
	<view class="recharge">
		<view class="return">
			<img src="../../../static/images/icon/return.png" alt="" class="return-logo">
		</view>
		<view class="orange">
			<view class="money">可用余额</view>
			<view class="number-list">
				<view class="money-logo">￥</view>
				<view class="number">9999</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: "Recharge",
	props: {

	},
	data() {
		return {}
	},
	methods: {
	},
	created() { }
}
</script>

<style lang="less" scoped>
.recharge {
	width: 100%;
	padding: 36upx 32upx 0upx 32upx;
	box-sizing: border-box;

	.return {
		margin-bottom: 36upx;

		.return-logo {
			width: 24upx;
			height: 48upx;
		}
	}

	.orange {
		width: 100%;
		height: 320upx;
		border-radius: 24upx;
		background: linear-gradient(165deg, #FF8C2E 8%, #FF8C2E 19%, #FFC117 92%);
		.money{
			font-size: 28upx;
			color: rgba(255, 255, 255, 0.64);
			text-align: center;
		}
		.number-list{
			color: #FFFFFF;
			display: flex;
			align-items: center;
    	justify-content: center;
			.money-logo{
				font-size: 40upx;
				font-weight: bold;
			}
			.number{
				font-size: 72upx;
				font-weight: bold;
			}
		}
	}
}</style>
