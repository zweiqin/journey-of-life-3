<template>
	<view v-if="visible">
		<view
			v-if="adInfo && adInfo.jumpType === 3 && couponList && couponList.length > 0"
			class="mask mask-coupon ad-coupons" @touchmove.stop.prevent="moveHandle"
		>
			<view class="ad-box-warp">
				<view class="ad-boxs">
					<image class="img" :src="adInfo.popupImg"></image>
					<view class="coupon-list">
						<scroll-view :scroll-top="0" class="scrollBox" scroll-y="true">
							<view v-for="(item, index) in couponList" :key="index" class="item">
								<view class="leftBox borderBox">
									<view class="boxTop"></view>
									<view class="boxCent"></view>
									<view class="boxBottom"></view>
								</view>
								<view class="centerBox">
									<view class="money">
										<text class="num" :class="[ item.discountMode === 1 ? 'num-minus' : 'num-discount' ]">
											{{ item.reduceMoney }}
										</text>
										<text class="text">
											满{{ item.fullMoney }}元可用
										</text>
									</view>
									<view class="text">
										<text>
											{{ item.activityName }}
										</text>
									</view>
								</view>
								<view class="rightBox borderBox">
									<view class="boxTop"></view>
									<view class="boxCent"></view>
									<view class="boxBottom"></view>
								</view>
							</view>
						</scroll-view>
					</view>
					<ATFWXSendCoupon v-if="couponList && couponList.length > 0" :coupon-list="couponList" @closeAd="close">
						<view class="btn-receive">一键领取</view>
					</ATFWXSendCoupon>
				</view>
				<view class="close-btn">
					<image :src="adInfo.closeImg" class="btn" mode="widthFix" @click="close()"></image>
				</view>
			</view>
		</view>
		<view v-else-if="adInfo && adInfo.jumpType !== 3" class="mask mask-coupon ad-link">
			<view class="ad-box-warp">
				<view class="ad-boxs" @click="goRoll()">
					<image class="img" :src="adInfo.popupImg" mode="widthFix"></image>
				</view>
				<view class="close-btn">
					<image :src="adInfo.closeImg" class="btn" mode="widthFix" @click="close()"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { T_STORAGE_KEY } from '../../constant'
import { getSelectByConditionAdvertApi, getCanvasCouponsApi, updateCloseAdvertApi } from '../../api/anotherTFInterface'

export default {
	name: 'ATFAdWindow',
	props: {
		triggerCondition: {
			type: Number,
			default: 1
		}
	},
	data() {
		return {
			visible: false,
			adInfo: {},
			jumpContent: {},
			couponList: [],
			isLogin: false,
			buyerUserId: 0,
			cParams: {}
		}
	},
	methods: {
		// 阻止滑动
		moveHandle() {},
		// 获取广告信息
		getAd() {
			const res = uni.getStorageSync(T_STORAGE_KEY)
			const token = res.token
			setTimeout(() => {
				this.buyerUserId = res.buyerUserId
				this.isLogin = !!token
				getSelectByConditionAdvertApi({
					triggerCondition: this.triggerCondition
				}).then((res) => {
					if (res.data) {
						this.adInfo = res.data[0]
						// console.log(this.adInfo)
						if (this.adInfo && this.adInfo.jumpContent) {
							this.jumpContent = JSON.parse(this.adInfo.jumpContent)
						}
						this.visible = true
						if (this.adInfo && this.adInfo.jumpType === 3) {
							this.getCoupons()
						}
					}
				})
			}, 500)
		},
		// 查询优惠券
		getCoupons() {
			if (this.isLogin) {
				const _items = this.jumpContent.items
				if (_items) {
					getCanvasCouponsApi({
						page: 1,
						pageSize: 99,
						ids: _items
					}).then((res) => {
						if (res.data) {
							this.couponList = res.data.list
						}
					})
				}
			} else {
				uni.showToast({
					title: '登录之后领取更多优惠',
					icon: 'none'
				})
			}
		},
		// 关闭弹窗
		close() {
			this.visible = false
			var params = {}
			if (this.isLogin) {
				params.buyerUserId = this.buyerUserId
			} else {
				uni.getSystemInfo({
					success(res) {
						params.deviceId = res.deviceId
					}
				})
			}
			updateCloseAdvertApi(params).then((res) => {})
		},
		goRoll() {
			this.visible = false
			switch (this.adInfo.jumpType) {
				case 1:
					uni.navigateTo({ url: `/another-tf/another-serve/goodsDetails/index?shopId=${this.jumpContent.shopId}&productId=${this.jumpContent.id}&skuId=${this.jumpContent.skuId}` })
					break
				case 2:
					uni.navigateTo({
						url: `/another-tf/another-serve/goodsList/index?classifyId=${this.jumpContent.id[this.jumpContent.id.length - 1]}`
					})
					break
				case 4:
					uni.navigateToMiniProgram({
						appId: this.jumpContent.appId,
						path: this.jumpContent.link,
						success(res) {
							// 打开成功
						}
					})
					break
				case 5:
					uni.navigateTo({
						path: this.jumpContent.link
					})
					break
			}
		}
	}
}
</script>

<style lang="less" scoped>
.mask {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 55;
	background-color: rgba(0, 0, 0, 0.7);
}

.mask-coupon {
	z-index: 9999;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	.ad-box-warp {
		width: 100%;
		position: relative;
	}

	.ad-boxs {
		position: relative;
		width: 100%;
		text-align: center;

		.img {
			width: 70%;
		}
	}

	.btn-receive {
		width: 446rpx;
		height: 84rpx;
		background: #EC6F43;
		border-radius: 42rpx;
		display: block;
		text-align: center;
		font-size: 28rpx;
		line-height: 84rpx;
		color: #fff;
		position: absolute;
		bottom: 32rpx;
		left: 50%;
		margin-left: -223rpx;
	}

	.close-btn {
		position: absolute;
		bottom: -70rpx;
		left: 50%;
		margin-left: -25rpx;

		.btn {
			width: 50rpx;
			height: 50rpx;
		}
	}
}

.ad-coupons {
	.ad-box-warp {
		width: 510rpx;
		position: relative;

		.ad-boxs {
			min-height: 700rpx;

			.img {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
		}
	}

	.coupon-list {
		width: 446rpx;
		height: 40%;
		overflow: auto;
		position: absolute;
		top: 40%;
		left: 50%;
		margin-left: -223rpx;

		.scrollBox {
			height: 450upx;
		}

		.item {
			width: 100%;
			height: 140rpx;
			margin-top: 15rpx;
			border-radius: 8rpx;
			display: flex;
			position: relative;
			align-items: center;
			overflow: hidden;

			&:first-child {
				margin-top: 0px;
			}

			.borderBox {
				width: 32rpx;
				height: 140rpx;
				overflow: hidden;

				.boxTop {
					width: 32rpx;
					height: 54rpx;
					background: #FFFFFF;
				}

				.boxCent {
					height: 36rpx;
					overflow: hidden;
					position: relative;

					&:after {
						content: '';
						width: 32rpx;
						height: 32rpx;
						border-radius: 50%;
						display: block;
						position: absolute;
						top: 50%;
						margin-top: -47rpx;
						left: -15rpx;
						border: 32rpx solid #FFFFFF;
					}
				}

				.boxBottom {
					width: 32rpx;
					height: 54rpx;
					background: #FFFFFF;
				}
			}

			.leftBox {
				.boxCent {
					&:after {
						left: -50rpx;
					}
				}
			}

			.centerBox {
				display: flex;
				align-items: center;
				height: 140rpx;
				background: #FFFFFF;
				flex: 1;
			}

			.money {
				width: 190rpx;
				text-align: center;

				.num {
					font-size: 48rpx;
					color: #EC6F43;
					display: block;

					&.num-minus::before {
						content: '¥';
						font-size: 36rpx;
					}

					&.num-discount::after {
						content: '折';
						font-size: 36rpx;
					}
				}

				.text {
					font-size: 24rpx;
					color: #999;
				}
			}

			.text {
				flex: 1;
				padding-right: 16rpx;
				width: 0;

				text {
					font-size: 32rpx;
					color: #333;
					display: block;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
	}
}
</style>
