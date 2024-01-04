<template>
	<view class="coupon-popup" :class="showActivity && 'show'">
		<view class="mask" @click="closePopup"></view>
		<view id="popupInner" class="couponShow-box">
			<view style="padding: 0 20upx;">
				<tui-tabs
					style="width: 710upx;padding: 0 0upx 0 0upx;overflow: hidden;" :slider-width="355" :padding="20"
					item-width="355rpx" selected-color="#C5AA7B" bold slider-bg-color="#ffffff"
					:tabs="activeTypeList"
					:current-tab="activeTypeFlag" @change="activeTypeActive"
				></tui-tabs>
			</view>
			<view v-show="activeTypeFlag === 0">
				<view class="couponShow">
					<tui-icon
						name="close" :size="25" unit="upx" color="#999999"
						class="close-btn"
						@click="onActivityClose"
					></tui-icon>
					<view class="shopCouponBox" :class="markTools.length === 0 && 'flex'">
						<view v-if="markTools.length > 0" class="list">
							<view v-for="(item, index) in markTools" :key="index" class="item" :class="{ received: item.state === 1 }">
								<view class="info-box">
									<view v-if="item.couponType == 1" class="discoun">
										<text style="font-size: 28rpx">￥</text>{{ item.reduceMoney }}
									</view>
									<view v-if="item.couponType == 2" class="discoun">{{ item.reduceMoney }}折</view>
									<view class="info-date">{{ getDate(item.startTime) }}-{{ getDate(item.endTime) }}</view>
									<view class="info-condition mar-top-30">{{ item.content }}</view>
									<!--                  <view class="info-condition" v-if="item.couponType == 2">{{item.reduceMoney}}折优惠</view> -->
									<ATFWXSendCoupon v-if="item.state === 3" :coupon-list="[ item ]" @success="success">
										<view v-if="item.state === 3" class="use-btn mar-top-10">
											立即领取
										</view>
									</ATFWXSendCoupon>
									<view v-if="item.state === 0" class="use-btn mar-top-10">已领取</view>
									<view v-if="item.state === 1" class="use-btn mar-top-10">已使用</view>
								</view>
							</view>
						</view>
						<view v-else class="emptyOrder-box flex-items-plus flex-column">
							<image class="emptyOrder-img" src="../../../../static/images/new-business/shop/bgnull.png"></image>
							<label class="font-color-999 fs26 mar-top-30">你还没有优惠券哦～</label>
						</view>
					</view>
				</view>
			</view>
			<view v-show="activeTypeFlag === 1">
				<view class="couponShow">
					<tui-icon
						name="close" :size="25" unit="upx" color="#999999"
						class="close-btn"
						@click="onActivityClose"
					></tui-icon>
					<view class="shopCouponBox" :class="shopMarkTools.length === 0 && 'flex'">
						<view v-if="shopMarkTools.length > 0" class="list">
							<view
								v-for="(item, index) in shopMarkTools" :key="index" class="item"
								:class="{ received: item.state === 1 }"
							>
								<view class="info-box">
									<view v-if="item.couponType === 1" class="discoun">
										<text style="font-size: 28rpx">
											￥
										</text>{{ item.reduceMoney }}
									</view>
									<view v-if="item.couponType === 2" class="discoun">{{ item.reduceMoney }}折</view>
									<view class="info-date">{{ getDate(item.startTime) }}-{{ getDate(item.endTime) }}</view>
									<view v-if="item.couponType === 1" class="info-condition">
										满{{ item.fullMoney }}元减{{ item.reduceMoney }}元
									</view>
									<view v-if="item.couponType === 2" class="info-condition">
										{{ item.reduceMoney }}折优惠
									</view>
									<view v-if="item.state === 3" class="use-btn" @click="receiveTap(item, 1)">
										立即领取
									</view>
									<view v-if="item.state === 0" class="use-btn">已领取</view>
								</view>
							</view>
						</view>
						<view v-else class="emptyOrder-box flex-items-plus flex-column">
							<image class="emptyOrder-img" src="../../../../static/images/new-business/shop/bgnull.png"></image>
							<label class="font-color-999 fs26 mar-top-30">你还没有优惠券哦～</label>
						</view>
					</view>
				</view>
			</view>
			<view v-if="isShowSuccess" class="receive-success">
				<view class="success-box">
					<tui-icon name="coupon" :size="65" unit="upx" color="#ffffff"></tui-icon>
					<view class="text">领取成功</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { updateTakeCouponReceiveApi } from '../../../../api/anotherTFInterface'

export default {
	name: 'CouponPopup',
	props: {
		markTools: {
			type: Array,
			default: () => []
		},
		shopMarkTools: {
			type: Array,
			default: () => []
		},
		setTop: {
			type: Number,
			default: 0
		},
		currentActive: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			showActivity: false,
			isShowSuccess: false,
			activeTypeFlag: this.currentActive,
			activeTypeList: [{
				name: '平台活动'
			}, {
				name: '店铺活动'
			}]
		}
	},
	methods: {
		activeTypeActive(e) {
			this.activeTypeFlag = e.index
		},
		// 关闭优惠券弹窗
		onActivityClose() {
			this.showActivity = false
		},
		// 时间格式化
		getDate(time) {
			if (!time) return ''
			return time.split(' ')[0].split('-').join('.')
		},
		// 领取优惠券
		receiveTap(couponItemInfo, type) {
			uni.showLoading({
				mask: true,
				title: '领取中...'
			})
			let ReceiveCoupon
			if (type === 0) {
				ReceiveCoupon = {
					couponId: couponItemInfo.couponId,
					shopId: this.shopId
				}
			} else {
				ReceiveCoupon = {
					shopCouponId: couponItemInfo.shopCouponId,
					shopId: this.shopId
				}
			}
			updateTakeCouponReceiveApi(ReceiveCoupon).then((res) => {
				uni.hideLoading()
				this.isShowSuccess = true
				setTimeout(() => {
					this.isShowSuccess = false
					// this.showActivity = false;
					// this.queryProductDetail()
				}, 1500)
			})
				.catch((res) => {
					uni.hideLoading()
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				})
		},
		success() {
			this.isShowSuccess = true
			setTimeout(() => {
				this.isShowSuccess = false
			}, 1500)
		},
		closePopup() {
			this.showActivity = false
		}
	}
}
</script>

<style lang="scss" scoped>
.coupon-popup {
	display: block;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	overflow: hidden;
	// background-color: rgba(0, 0, 0, 0.6);
	z-index: -1;
	opacity: 0;

	&.show {
		z-index: 1000;
		opacity: 1;

		.couponShow-box {
			/*transform: translate3D(0px, 0px, 0px);*/
			bottom: 0;
		}
	}

	.tui-tabs-view {
		/deep/ .tui-tabs-slider {
			margin-left: -20upx;
		}
	}

	.mask {
		display: block;
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		background-color: rgba(0, 0, 0, 0.6);
		z-index: 1001;
	}

	.couponShow-box {
		width: 100%;
		height: auto;
		/*transform: translate3d(0px, 100%, 0px);*/
		transition: all 0.3s ease-in-out 0s;
		background-color: #fff;
		position: absolute;
		left: 0;
		right: 0;
		bottom: -100%;
		z-index: 1002;

		.couponShow {
			height: 1000rpx;
			z-index: 333;
		}

		.close-btn {
			width: 50upx;
			height: 50upx;
			box-sizing: border-box;
			position: absolute;
			top: 20upx;
			right: 20upx;
		}

		// #ifdef MP-ALIPAY
		.close-btn {
			width: 30upx;
			height: 30upx;
			top: 10upx;
			right: 10upx;
		}

		// #endif
		.shopCouponBox {
			height: 100%;
			overflow: auto;
			position: relative;

			&.flex {
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.emptyOrder-box {
				position: absolute;
				top: 0;
				bottom: 0;
				right: 0;
				left: 0;
				margin: auto;

				// padding-top: 80upx;
				.emptyOrder-img {
					width: 225upx;
					height: 196upx;
				}
			}

			.list {
				display: flex;
				flex-wrap: wrap;
			}

			.item {
				width: 50%;
				height: 291rpx;
				background: url("../../../../static/images/new-business/shop/couponsIcon.png") no-repeat center top;
				border-radius: 10rpx;
				margin-top: 20rpx;
				display: flex;
				flex-direction: row;
				position: relative;
				background-size: contain;
				padding: 0 50rpx;
				margin-bottom: 30rpx;
			}

			.received {
				background: url("../../../../static/images/new-business/shop/couponsIcon1.png") no-repeat center top;
				background-size: contain;

				.discoun {
					color: #999999;
					padding-top: 35rpx;
				}

				.use-btn {
					height: 48rpx;
					border: 2rpx solid #CCCCCC;
					line-height: 48rpx;
					text-align: center;
					font-size: 24rpx;
					font-weight: 400;
					background-color: #CCCCCC;
					color: #FFFFFF;
					margin: 50rpx auto 0 auto;
					padding: 0 10rpx;
				}
			}

			/*.item:last-child {*/
			/*margin-bottom: 100rpx;*/
			/*}*/

			.discoun {
				display: flex;
				flex-direction: row;
				align-items: baseline;
				font-size: 40rpx;
				color: #C5AA7B;
				margin: 0 auto;
				padding-top: 40rpx;
			}

			.discoun text {
				display: inline-block;
			}

			.info-box {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
			}

			.info-condition {
				font-size: 20rpx;
				font-weight: 400;
				color: #999999;
				margin: 0 auto;
			}

			.info-date {
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
				margin: 10rpx auto;
				line-height: 20rpx;
			}

			.use-btn {
				height: 48rpx;
				border: 2rpx solid #C5AA7B;
				line-height: 48rpx;
				text-align: center;
				font-size: 24rpx;
				font-weight: 400;
				background-color: #C5AA7B;
				color: #FFFFFF;
				margin: 50rpx auto 0 auto;
				padding: 0 10rpx;
			}
		}
	}
}

.receive-success {
	width: 100%;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	z-index: 8888;

	.success-box {
		width: 380upx;
		height: 280upx;
		background: rgba(0, 0, 0, 0.5);
		border-radius: 10upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.text {
			font-size: 28upx;
			margin-top: 50upx;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
		}
	}
}
</style>
