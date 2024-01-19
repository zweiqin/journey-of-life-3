<template>
	<view class="coupon-list-container">
		<JHeader title="优惠券" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<template v-if="couponList && couponList.length">
			<view v-for="item in couponList" :key="item.couponId" class="couponItem flex-items">
				<view class="itemLeft" @click="go(`/another-tf/another-serve/coupon/product?id=${item.couponId}`)">
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
						<view @click="go(`/another-tf/another-serve/coupon/product?id=${item.couponId}`)">
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
					<view
						class="couponType fs28 font-color-FFF"
						@click="go(`/another-tf/another-serve/coupon/product?id=${item.couponId}`)"
					>
						{{ item.discountMode === 1 ? '满减券'
							: '折扣券' }}
					</view>
				</view>
			</view>
		</template>
		<view style="padding-bottom: 45upx;">
			<LoadingMore
				:status="!isEmpty && !couponList.length
					? 'loading' : !isEmpty && couponList.length && (couponList.length >= couponTotal) ? 'no-more' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="isEmpty" :fixed="false" style="margin-top: 60upx;">暂无优惠券</tui-no-data>
		</view>
	</view>
</template>

<script>
import { getCanvasCouponsApi } from '../../../api/anotherTFInterface'

export default {
	name: 'List',
	data() {
		return {
			isEmpty: false,
			couponList: [],
			couponTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20
			}
		}
	},
	onLoad() {
		this.getCouponDataList()
	},
	methods: {
		getCouponDataList(isLoadmore) {
			uni.showLoading()
			getCanvasCouponsApi(this.queryInfo).then((res) => {
				this.couponTotal = res.data.total
				if (isLoadmore) {
					this.couponList.push(...res.data.list)
				} else {
					this.couponList = res.data.list
				}
				this.isEmpty = this.couponList.length === 0
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		success() {
			this.queryInfo.page = 1
			this.getCouponDataList()
		}
	},
	onReachBottom() {
		if (this.couponList.length < this.couponTotal) {
			++this.queryInfo.page
			this.getCouponDataList(true)
		}
	}
}
</script>

<style lang="less" scoped>
.coupon-list-container {
	min-height: 100%;
	background-color: #f8f8f8;
	box-sizing: border-box;
	padding: 0 20rpx 40upx;

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
</style>
