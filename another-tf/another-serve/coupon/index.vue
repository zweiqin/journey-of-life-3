<template>
	<view class="coupon-container">
		<JHeader title="我的卡券" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view class="list">
			<view v-for="(item, index) in couponDataList" v-if="item.state === 0" :key="index" class="item">
				<view class="info-box">
					<view v-if="item.couponType == 1" class="discoun">
						<text style="font-size: 28rpx">￥</text>{{ item.reduceMoney }}
					</view>
					<view v-if="item.couponType == 2" class="discoun">{{ item.reduceMoney }}折</view>
					<view class="info-date">{{ getDate(item.startTime) }}-{{ getDate(item.endTime) }}</view>
					<view v-if="item.couponType == 1" class="info-condition">满{{ item.fullMoney }}元减{{ item.reduceMoney }}元</view>
					<view v-if="item.couponType == 2" class="info-condition">{{ item.reduceMoney }}折优惠</view>
					<view class="use-btn" @click="useTap(item)">立即使用</view>
				</view>
			</view>
		</view>
		<view style="padding-bottom: 45upx;">
			<LoadingMore :status="isLoading ? 'loading' : ''"></LoadingMore>
			<view v-if="!isLoading && !couponDataList.length">
				<tui-no-data :fixed="false" style="padding-top: 60upx;">你还没有优惠券哦～</tui-no-data>
			</view>
		</view>
	</view>
</template>

<script>
import { getCouponsCouponApi } from '../../../api/anotherTFInterface'
export default {
	name: 'Coupon',
	data() {
		return {
			couponDataList: [],
			isLoading: true
		}
	},
	onShow() {
		this.getFindCouponList()
	},
	methods: {
		getFindCouponList() {
			uni.showLoading()
			this.isLoading = true
			getCouponsCouponApi({})
				.then((res) => {
					this.couponDataList = res.data
					uni.hideLoading()
					this.isLoading = false
				})
				.catch((e) => {
					uni.hideLoading()
					this.isLoading = false
				})
		},
		getDate(time) {
			if (!time) return ''
			return time.split(' ')[0].split('-').join('.')
		},
		useTap(item) {
			uni.navigateTo({
				url: `/another-tf/another-serve/couponShopList/index?activityId=${item.activityId}&shopCouponId=${item.shopCouponId}`
			})
		}
	}
}
</script>

<style lang="less" scoped>
.coupon-container {
	min-height: 100vh;
	box-sizing: border-box;

	.list {
		display: flex;
		flex-wrap: wrap;
	}

	.item {
		width: 50%;
		height: 291rpx;
		background-color: #f8f7f6;
		border-radius: 10rpx;
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
		position: relative;
		background-size: contain;
		padding: 0 56rpx;
		margin-bottom: 30rpx;
	}

	.discoun {
		display: flex;
		flex-direction: row;
		align-items: baseline;
		font-size: 40rpx;
		color: #C5AA7B;
		margin: 0 auto;
		padding-top: 50rpx;
	}

	.discoun text {
		display: inline-block;
	}

	.info-box {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
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
		margin: 0 auto;
	}

	.use-btn {
		height: 48rpx;
		border: 2rpx solid #C5AA7B;
		line-height: 48rpx;
		text-align: center;
		font-size: 24rpx;
		font-weight: 500;
		background-color: #C5AA7B;
		color: #FFFFFF;
		margin: 50rpx auto 0 auto;
		padding: 0 5rpx;
	}
}
</style>
