<template>
	<view class="recharge">
		<view class="return">
			<img src="../../../static/images/icon/return.png" alt="" class="return-logo" @click="handleBack">
		</view>
		<view class="orange">
			<view class="money">可用余额</view>
			<view class="number-list">
				<view class="money-logo">￥</view>
				<view class="number">9999</view>
			</view>
		</view>
		<view class="amount">充值金额</view>
		<view class="item-list">
			<view class="item" 
			:class="{ active: currentTab === item.value }" 
			@click="handleClick(item)"
			v-for="item in items"
			:key="item.value">￥<view class="sum">{{ item.number }}</view></view>
		</view>
		<view class="custom">自定义充值金额</view>
		<view class="custom-recharge">
			<view class="logo">￥</view>
			<!-- <view class="num">0.00</view> -->
			<input type="text" class="input" placeholder="0.00" placeholder-class="num">
		</view>
		<view class="type">选择充值方式</view>
		<view class="type-list">
			<view class="left">
				<img src="../../../static/images/user/vx.png" alt="" class="vx">
				<view class="text">微信支付</view>
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
				<view class="btn">确认充值</view>
			</view>
		</view>
	</view>
</template>

<script>
import { items } from './config'
export default {
	name: "Recharge",
	props: {

	},
	data() {
		return {
			items,
			currentTab:'',
		}
	},
	methods: {
		handleBack() {
			uni.navigateBack()
		},
		handleClick(index) {
			if(this.currentTab === index.value){
				this.currentTab = ''
				this.number ='';
				return
			}
			this.currentTab = index.value;
			this.number = index.number;
			
		}
	},
	created() { }
}
</script>

<style lang="less" scoped>
.recharge {
	width: 100vw;
	min-height: 100vh;
	padding: 36upx 32upx 120upx 32upx;
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
		display: flex;
    flex-direction: column;
    justify-content: center;
		.money{
			font-size: 28upx;
			color: rgba(255, 255, 255, 0.64);
			text-align: center;
		}
		.number-list{
			color: #FFFFFF;
			display: flex;
			align-items: baseline;
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
	.amount{
		font-size: 32upx;
		color: #B3B2AD;
		padding-top: 64upx;
		padding-bottom: 32upx;
	}
	.item-list{
		display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
		padding-bottom: 10upx;
		.item{
			width: 214upx;
			height: 160upx;
			border-radius: 24upx;
			border: 3upx solid #D5D4D1;
			color: #8F8D85;
			display: flex;
			align-items: center;
    	justify-content: center;
			margin-bottom: 22upx;
			&.active{
				border: 3upx solid #FFC117;
				background: #FFF6DC;
				color: #FFC117;
			}
			.sum{
				font-size: 42upx;
			}
		}
	}
	.custom{
		font-size: 32upx;
		color: #B3B2AD;
	}
	.custom-recharge{
		display: flex;
		align-items: center;
		padding: 32upx 0;
		border-bottom: 2upx solid #D5D4D1;
		margin-bottom: 64upx;
		.logo{
			font-size: 42upx;
			font-weight: bold;
			color: #3A3629;
			padding-right: 8upx;
		}
		.num{
			font-size: 42upx;
			font-weight: bold;
			color: #D5D4D1;
		}
		.input{
			font-size: 42upx;
			font-weight: bold;
			color: #3A3629;
		}
	}
	.type{
		font-size: 32upx;
		color: #B3B2AD;
	}
	.type-list{
		display: flex;
		align-items: center;
    justify-content: space-between;
		margin-top: 40upx;
		margin-bottom: 72upx;
		.left{
			display: flex;
			align-items: center;
			.vx{
				width: 64upx;
				height: 64upx;
				margin-right: 16upx;
			}
			.text{
				font-size: 28upx;
				color: #141000;
			}
		}
		.right{
			width: 40upx;
			height: 40upx;
			.arrow{
				width: 40upx;
				height: 40upx;
			}
		}
	}
	.foot{
		width: 100%;
		height: 120upx;
		position: fixed;
		bottom: 0;
		left: 0;
		background: #FFFFFF;
		border-top: 1upx solid #E5E5E5;
		.foot-list{
			display: flex;
			align-items: center;
    	justify-content: space-between;
			margin: 16upx 32upx;
			.foot-money{}
			.btn{
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
