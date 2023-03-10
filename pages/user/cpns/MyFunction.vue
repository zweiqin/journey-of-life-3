<template>
	<view class="order-pane">
		<view class="title-wrapper">
			<view class="title-item">我的功能</view>
		</view>

		<view class="menus-container">
			<view class="swiper-item">
				<view class="menu-item" @click="
					$emit('handleNavigate', { url: '/user/sever/shopCar/shopCar' })
				">
					<image class="menu-icon" src="../../../static/images/new-user/function/shop-car.png" mode="" />
					<text class="menu-title">购物车</text>
					<!-- <view class="sub-script">
            <text>1</text>
          </view> -->
				</view>

				<view class="menu-item" @click="
					$emit('handleNavigate', {
						url: '/user/sever/view-history?page=collection',
					})
				">
					<image class="menu-icon" src="../../../static/images/new-user/function/collection.png" mode="" />
					<text class="menu-title">收藏</text>
				</view>

				<view class="menu-item" @click="
					$emit('handleNavigate', {
						url: '/user/sever/view-history?page=history',
					})
				">
					<image class="menu-icon" src="../../../static/images/new-user/function/foot-print.png" mode="" />
					<text class="menu-title">足迹</text>
				</view>

				<view class="menu-item" @click="
					$emit('handleNavigate', {
						url: '/user/sever/view-history?page=follow',
					})
				">
					<image class="menu-icon" src="../../../static/images/new-user/function/follow.png" mode="" />
					<text class="menu-title">订阅</text>
				</view>

				<!-- <view class="menu-item" @click="
					$emit('handleNavigate', {
						url: '/user/digital-store/information-sentry',
					})
				">
					<image class="menu-icon" src="../../../static/images/new-user/function/sentry.png" mode="" />
					<text class="menu-title">信息哨兵</text>
				</view>

				<view class="menu-item" @click="
					$emit('handleNavigate', {
						url: '/user/digital-store/newBusiness/index',
					})
				">
					<image class="menu-icon" src="../../../static/images/new-user/function/collect.png" mode="" />
					<text class="menu-title">业务管理</text>
				</view>

				<view class="menu-item" @click="
					$emit('handleNavigate', {
						url: '/user/digital-store/performance',
					})
				">
					<image class="menu-icon" src="../../../static/images/new-user/function/work.png" mode="" />
					<text class="menu-title">业务哨兵</text>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
import { myEquity } from '../data'
export default {
	data() {
		return {
			myEquity: Object.freeze(myEquity),
		}
	},
}
</script>

<style lang="less" scoped>
view,
text {
	line-height: 1.5 !important;
}

.order-pane {
	padding: 32upx 24upx;
	background-color: #fff;
	border-radius: 24upx;

	.title-wrapper {
		color: #b3b2ad;
		font-size: 28upx;
		padding-bottom: 24upx;
		border-bottom: 1upx solid #f1f1f0;

		.title-item {
			margin-right: 24upx;
			font-weight: 500;
			color: #141000;
		}
	}

	.menus-container {

		height: 120upx;
		.swiper-item {
			padding: 28upx 0 32upx 0;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			// height: 280upx;

			.menu-item {
				position: relative;
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				// width: 25%;
				// height: 104upx;

				.sub-script {
					position: absolute;
					padding: 4upx;
					background-color: #fff;
					border: 1upx solid #fc4023;
					border-radius: 100px;

					text {
						background-color: #fc4023;
						border-radius: 100px;
						font-size: 20upx;
						color: #fff;
					}
				}
			}
		}
	}
}
</style>
