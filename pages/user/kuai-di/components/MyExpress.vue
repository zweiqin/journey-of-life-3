<template>
	<view class="myExpressView">
		<view class="myExpress">
			<view class="UserInfo">
				<image src="../image/touxiang.png" mode=""></image>
				<view class="msg">
					<p class="myMessage"><span>微信用户</span> <span><image src="../image/pre_icon_shimingrenzheng.png" mode=""></image>未实名</span> </p>
					<p>13286520927</p>
				</view>
				<image class="userInfoBtn" src="../image/youjiantou.png" mode=""></image>
			</view>
			<view class="myExpressStatus">
				<view class="btnItem">
					<image src="../image/jinhangzhong.png" mode=""></image>
					<p>进行中</p>
				</view>
				<view class="btnItem">
					<image src="../image/daizhifu.png" mode=""></image>
					<p>待支付</p>
				</view>
				<view class="btnItem">
					<image src="../image/delTask_slt.png" mode=""></image>
					<p>已寄出</p>
				</view>
				<view class="btnItem">
					<image src="../image/quanbu.png" mode=""></image>
					<p>全部</p>
					<p>寄件订单</p>
				</view>
			</view>
			<view class="OtherServices">
				<view class="btnItem">
					<image src="../image/chazhaojilu.png" mode=""></image>
					<p>查件记录</p>
				</view>
				<view class="btnItem">
					<image src="../image/wodeqiajuan.png" mode=""></image>
					<p>我的卡卷</p>
				</view>
				<view class="btnItem">
					<image src="../image/tongxunlu.png" mode=""></image>
					<p>地址管理</p>
				</view>
				<view class="btnItem">
					<image src="../image/dianzifapiao.png" mode=""></image>
					<p>电子发票</p>
				</view>
			</view>
			<view class="OtherServices">
				<view class="btnItem">
					<image src="../image/xiaochengxu.png" mode=""></image>
					<p>推荐小程序</p>
				</view>
				<view class="btnItem">
					<image src="../image/lianxiwomen.png" mode=""></image>
					<p>联系我们</p>
				</view>
				<view class="btnItem">
					<image src="../image/bangzhuzhongxin.png" mode=""></image>
					<p>帮助中心</p>
				</view>
				<!-- <view class="btnItem">
					<image src="../image/dianzifapiao.png" mode=""></image>
					<p>消息中心</p>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.myExpress {
		box-sizing: border-box;
		position: relative;
		width: 100vw;
		height: 270rpx;
		padding: 0rpx 30rpx;
		margin-bottom: 80rpx;
		background-color: #327ee4;
		border-bottom-left-radius: 20%;
		border-bottom-right-radius: 20%;
		display: flex;
		flex-direction: column;
		align-items: center;
		.UserInfo {
			margin-top: 50rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: white;
			width: 100%;
			height: 120rpx;
			> image {
				width: 110rpx;
				height: 110rpx;
			}
			.myMessage {
				display: flex;
				align-items: center;
				font-size: 38rpx;
				> span:nth-of-type(2) {
					display: inline-flex;
					box-sizing: border-box;
					border-radius: 50rpx;
					padding: 8rpx 10rpx;
					background-color: rgba(172, 172, 172, 0.262);
					font-size: 24rpx;
				}
				image {
					margin-right: 10rpx;
					width: 26rpx;
					height: 32rpx;
				}
			}
			.msg {
				margin-left: -240rpx;
				> p:nth-of-type(2) {
					margin-top: 15rpx;
					font-size: 26rpx;
				}
			}
			.userInfoBtn {
				width: 25rpx;
				height: 32rpx;
			}
		}
		.myExpressStatus {
			margin-top: 15rpx;
			padding: 15rpx 0rpx 35rpx 0rpx;
			width: 100%;
			// height: 180rpx;
			border-radius: 15rpx;
			background-color: white;
			display: flex;
			justify-content: space-around;
			.btnItem {
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;
				> image {
					width: 55rpx;
					height: 55rpx;
				}
				> p {
					margin-top: 3rpx;
					font-size: 30rpx;
					font-weight: 550;
				}
				> p:nth-of-type(2) {
					text-align: center;
					font-size: 26rpx;
					min-width: 120rpx;
					position: absolute;
					bottom: -30rpx;
					color: rgb(135, 135, 135);
				}
			}
		}
		.OtherServices {
			margin-top: 15rpx;
			padding: 15rpx 0rpx 35rpx 0rpx;
			width: 100%;
			// height: 180rpx;
			border-radius: 15rpx;
			background-color: white;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			.btnItem {
				position: relative;
				// margin-left: 46rpx;
				float: left;
				display: flex;
				flex-direction: column;
				align-items: center;
				> image {
					width: 55rpx;
					height: 55rpx;
				}
				> p {
					margin-top: 3rpx;
					font-size: 30rpx;
					font-weight: 550;
					color: rgb(135, 135, 135);
				}
			}
		}
	}
</style>