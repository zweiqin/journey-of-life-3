<template>
	<view class="payCourteous">
		<JHeader title="支付成功" width="50" height="50"></JHeader>
		<view class="payTitBox flex-items flex-center" :style="{ 'padding-top': topHeight + 'px' }">
			<view class="payTit fs30">支付成功</view>
		</view>
		<view class="resultCard">
			<view class="imgBox">
				<tui-icon name="wallet" :size="166" unit="rpx" color="#333333"></tui-icon>
			</view>
			<view class="successful">支付成功</view>
			<view class="btnBox fs28 font-color-333">
				<view class="orderBtn btn" @click="goToOrder">查看订单</view>
				<view class="homeBtn btn" @click="goToHome">返回首页</view>
			</view>
			<view v-if="orderPolite.growth || orderPolite.couponList" class="orderPolite">
				<view>
					<tui-icon name="service-fill" :size="186" unit="rpx" color="#f94f98"></tui-icon>
				</view>
				<view class="rightInfo">
					<view v-if="orderPolite.credit" class="growthBox">
						恭喜获得额外积分<text class="growth">{{ orderPolite.credit }}</text>
					</view>
					<view v-if="orderPolite.growth" class="growthBox">
						恭喜获得额外会员成长值<text class="growth">{{ orderPolite.growth }}</text>
					</view>
					<view v-for="(item, index) in orderPolite.couponList" :key="index" class="couponBox">
						恭喜获得<text class="coupon">{{ item.discount }}</text>{{ item.couponType === 1 ? '满减优惠券' : '折扣券' }}
					</view>
				</view>
			</view>
		</view>

		<!-- 推荐 -->
		<ATFHoteRecommed></ATFHoteRecommed>
		<!-- 广告 -->
		<ATFAdWindow ref="refATFAdWindow" :trigger-condition="2"></ATFAdWindow>
	</view>
</template>

<script>
import { getOrderPoliteApi } from '../../../api/anotherTFInterface'

export default {
	name: 'PaySuccessful',
	data() {
		return {
			orderId: null,
			orderPolite: {},
			topHeight: 0
		}
	},
	onShow() {
		// #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
		const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
		this.topHeight = menuButtonInfo.top + 10
		// #endif
	},
	onLoad(option) {
		this.orderId = option.orderId
		if (this.orderId) {
			this.getOrderPoliteFn()
		}
		this.$nextTick(() => {
			this.$refs.refATFAdWindow.getAd()
		})
	},
	methods: {
		goToOrder() {
			this.$switchTab('/pages/order/order')
		},
		goToHome() {
			this.$switchTab('/pages/index/index')
		},
		getOrderPoliteFn() {
			uni.showLoading({
				mask: true,
				title: '加载中...'
			})
			getOrderPoliteApi({
				orderId: this.orderId
			}).then((res) => {
				uni.hideLoading()
				this.orderPolite = res.data
			})
				.catch((e) => {
					uni.hideLoading()
				})
		}
	}
}
</script>

<style lang="less" scoped>
.payCourteous {
	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}

	.payTitBox {
		height: 100rpx;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		background: #FFFFFF;
		z-index: 99;
	}

	.resultCard {
		padding: 200rpx 0 50rpx 0;

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

		.orderPolite {
			display: flex;
			align-items: center;
			width: 670rpx;
			background: #FFF9F6;
			border: 2rpx solid #FBE9E6;
			margin: 50rpx auto 0 auto;
			padding: 0 30rpx;
			box-sizing: border-box;

			.rightInfo {
				flex: 1;
				font-size: 28rpx;
				color: #333333;

				.growthBox {
					margin-bottom: 30rpx;

					.growth {
						color: #C83732;
					}
				}

				.couponBox {
					margin-bottom: 30rpx;

					.coupon {
						color: #C83732;
					}

					&:last-child {
						margin-bottom: 0 !important;
					}
				}
			}
		}
	}
}
</style>
