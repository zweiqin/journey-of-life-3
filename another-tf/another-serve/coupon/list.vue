<template>
	<view class="couponList">
		<template v-if="couponList.length > 0">
			<view v-for="item in couponList" :key="item.couponId" class="couponItem flex-items">
				<view class="itemLeft" @click="goProductList(item)">
					<view class="topIcon"></view>
					<view class="bottomIcon"></view>
					<view class="price flex-items">
						<view v-if="item.discountMode === 1" class="flex-column flex-end unitBox">
							<view class="unit">￥</view>
						</view>
						<view class="priceValue">{{ item.reduceMoney }}{{ item.discountMode === 1 ? '' : '折' }}</view>
					</view>
					<text class="fs24 font-color-999">满{{ item.fullMoney }}元可用</text>
				</view>
				<view class="itemRight">
					<view class="topInfo flex-items flex-sp-between">
						<view @click="goProductList(item)">
							<view class="couponTit fs32 font-color-FFF">{{ item.activityName }}</view>
							<view class="couponDate fs24 font-color-999">{{ item.endTime }}到期</view>
						</view>
						<view class="exchangeBtnBox flex-column flex-end">
							<view v-if="item.state === 0" class="exchangeBtn fs24 font-color-FFF">
								已领取
							</view>
							<ATFWXSendCoupon v-else :coupon-list="[ item ]" @success="success">
								<view class="exchangeBtn fs24 font-color-FFF">{{ item.ifCredit ? '立即兑换' : '立即领取' }}</view>
							</ATFWXSendCoupon>
						</view>
					</view>
					<view class="couponType fs28 font-color-FFF" @click="goProductList(item)">
						{{ item.discountMode === 1 ? '满减券'
							: '折扣券' }}
					</view>
				</view>
			</view>
		</template>
		<Empty :show="couponList.length <= 0" />
	</view>
</template>

<script>
import { getCouponsCouponApi } from '../../../api/anotherTFInterface'

export default {
	name: 'List',
	data() {
		return {
			loading: false,
			isFirstComeIn: true,
			couponList: [{}, {}, {}, {}, {}, {}], // 优惠券列表getCoupons
			page: 1,
			pageSize: 10,
			loadingType: 0
		}
	},
	onLoad() {
		this.getCouponList()
	},
	onReachBottom() {
		if (this.loadingType == 1) {
			uni.stopPullDownRefresh()
		} else {
			this.page = this.page + 1
			this.getCouponList()
		}
	},
	methods: {
		getCouponList() {
			uni.showLoading()
			this.loading = true
			NET.request(API.getCoupons, {
				page: this.page,
				pageSize: this.pageSize
			}, 'GET').then((res) => {
				uni.hideLoading()
				if (res.data.list.length === 0) {
					this.loadingType = 1
				} else {
					this.couponList = this.couponList.concat(res.data.list)
					this.$forceUpdate()
				}
				this.couponList = this.couponList.filter((item) => JSON.stringify(item) !== '{}')
				this.loading = false
				this.isFirstComeIn = false
			})
				.catch((res) => {
					uni.hideLoading()
				})
		},
		// 跳转到可用商品列表
		goProductList(item) {
			uni.navigateTo({
				url: `../coupon/product?id=${item.couponId}`
			})
		},
		success() {
			this.page = 1
			this.couponList = []
			this.getCouponList()
		}
	}
}
</script>

<style lang="less" scoped>
page {
	background: #F8F8F8;

	.couponList {
		padding: 0 20rpx 40upx;
		margin-top: 30rpx;

		.couponItem {
			background: #333333;
			margin-top: 40rpx;
			padding: 25rpx 35rpx;
			overflow: hidden;

			.itemLeft {
				padding-right: 10rpx;
				position: relative;
				border-right: 2rpx dashed #666666;
				width: 170rpx;

				.topIcon {
					position: absolute;
					right: -16rpx;
					top: -50rpx;
					width: 32rpx;
					height: 32rpx;
					background: #FFFFFF;
					border-radius: 50%;
				}

				.bottomIcon {
					position: absolute;
					right: -16rpx;
					bottom: -50rpx;
					width: 32rpx;
					height: 32rpx;
					background: #FFFFFF;
					border-radius: 50%;
				}

				//.price {
				//  width: 100rpx;
				//}
				.unitBox {
					height: 70rpx;
				}

				.unit {
					color: #FFEBC4;
					font-size: 36rpx;
				}

				.priceValue {
					font-size: 52rpx;
					color: #FFEBC4;
				}
			}

			.itemRight {
				padding-left: 45rpx;
				flex: 1;

				.topInfo {
					padding-bottom: 10rpx;
					border-bottom: 2rpx solid #444444;
					margin-bottom: 10rpx;

					.couponDate {
						width: 300rpx;
					}

					.exchangeBtnBox {
						width: 110rpx;
						height: 70rpx;
						text-align: center;

						.exchangeBtn {
							padding: 5rpx;
							border: 2rpx solid #999999;
						}
					}
				}
			}
		}
	}

	.Put-box1 {
		.btn {
			text-align: center;
			margin-top: 40rpx;
			border: 2rpx solid #333333;
			height: 80upx;
			line-height: 80upx;
			width: 100%;
			color: #333333;
		}

		.submit {
			background-color: #333333;
			color: #FFEBC4;
			margin-left: 20rpx;
		}
	}
}

// 触底样式
.reachBottom {
	margin-top: 30rpx;
	display: flex;
	flex-direction: column;
	align-items: center;

	.reach-icon {
		width: 150rpx;
		height: 150rpx;
	}

	.reach-text {
		margin: 20rpx 0;
		color: #CCCCCC;
	}
}
</style>
