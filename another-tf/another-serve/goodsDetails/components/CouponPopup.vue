<template>
	<view class="coupon-popup" :class="showActivity && 'show'">
		<view class="mask" @click="closePopup"></view>
		<view id="popupInner" class="couponShow-box">
			<view style="padding: 0 20upx;">
				<tui-tabs
					style="width: 710upx;padding: 0 0upx 0 0upx;overflow: hidden;" :slider-width="355" :padding="20"
					item-width="355rpx" selected-color="#C5AA7B" bold slider-bg-color="#ffffff"
					:tabs="activeTypeList"
					:current-tab="activeTypeFlag" @change="(e) => activeTypeFlag = e.index"
				></tui-tabs>
			</view>
			<view v-show="activeTypeFlag === 0">
				<view class="couponShow">
					<tui-icon
						name="close" :size="25" unit="upx" color="#999999"
						class="close-btn"
						@click="onActivityClose"
					></tui-icon>
					<view class="shopCouponBox">
						<view
							v-if="platformMarkTools.length"
							style="display: flex;align-items: stretch;justify-content: space-between;flex-wrap: wrap;"
						>
							<view
								v-for="(item, index) in platformMarkTools" :key="index"
								style="width: 48%;padding: 20rpx;margin-bottom: 30rpx;background-color: #eeeeee;border-radius: 100rpx;box-sizing: border-box;"
							>
								<view style="display: flex;flex-direction: column;align-items: center;text-align: center;">
									<view
										style="font-size: 40rpx;padding-top: 40rpx;"
										:style="{ color: item.state === 1 ? '#999999' : '#C5AA7B' }"
									>
										<text v-if="item.couponType == 1">￥{{ item.reduceMoney }}</text>
										<text v-if="item.couponType == 2">{{ item.reduceMoney }}折</text>
									</view>
									<view style="font-size: 20rpx;color: #999999;">
										{{ getDate(item.startTime) }}-{{ getDate(item.endTime) }}
									</view>
									<view style="font-size: 20rpx;color: #999999;">{{ item.content }}</view>
									<view
										style="font-size: 24rpx;color: #FFFFFF;padding: 10rpx;"
										:style="{ backgroundColor: item.state === 1 ? '#CCCCCC' : '#C5AA7B' }"
									>
										<text v-if="item.state === 0">已领取</text>
										<text v-else-if="item.state === 1">已使用</text>
										<ATFWXSendCoupon v-else-if="item.state === 3" :coupon-list="[ item ]" @success="success">
											<text v-if="item.state === 3">
												立即领取
											</text>
										</ATFWXSendCoupon>
									</view>
								</view>
							</view>
						</view>
						<view v-else style="padding-bottom: 45upx;">
							<tui-no-data :fixed="false" style="padding-top: 60upx;">你还没有优惠券哦～</tui-no-data>
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
					<view class="shopCouponBox">
						<view
							v-if="shopMarkTools.length"
							style="display: flex;align-items: stretch;justify-content: space-between;flex-wrap: wrap;"
						>
							<view
								v-for="(item, index) in shopMarkTools" :key="index"
								style="width: 48%;padding: 20rpx;margin-bottom: 30rpx;background-color: #eeeeee;border-radius: 100rpx;box-sizing: border-box;"
							>
								<view style="display: flex;flex-direction: column;align-items: center;text-align: center;">
									<view
										style="font-size: 40rpx;padding-top: 40rpx;"
										:style="{ color: item.state === 1 ? '#999999' : '#C5AA7B' }"
									>
										<text v-if="item.couponType == 1">￥{{ item.reduceMoney }}</text>
										<text v-else-if="item.couponType == 2">{{ item.reduceMoney }}折</text>
									</view>
									<view style="font-size: 20rpx;color: #999999;">
										{{ getDate(item.startTime) }}-{{ getDate(item.endTime) }}
									</view>
									<view style="font-size: 20rpx;color: #999999;">
										<text v-if="item.couponType === 1">满{{ item.fullMoney }}元减{{ item.reduceMoney }}元</text>
										<text v-else-if="item.couponType === 2">{{ item.reduceMoney }}折优惠</text>
									</view>
									<view
										style="font-size: 24rpx;color: #FFFFFF;padding: 10rpx;"
										:style="{ backgroundColor: item.state === 1 ? '#CCCCCC' : '#C5AA7B' }"
									>
										<text v-if="item.state === 0">已领取</text>
										<text v-else-if="item.state === 3" @click="handleReceiveCoupon(item)">
											立即领取
										</text>
									</view>
								</view>
							</view>
						</view>
						<view v-else style="padding-bottom: 45upx;">
							<tui-no-data :fixed="false" style="padding-top: 60upx;">你还没有优惠券哦～</tui-no-data>
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
		platformMarkTools: {
			type: Array,
			default: () => []
		},
		shopMarkTools: {
			type: Array,
			default: () => []
		},
		shopId: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			showActivity: false,
			isShowSuccess: false,
			activeTypeFlag: 0, // 优惠券选项卡类型
			activeTypeList: [{
				name: '平台活动'
			}, {
				name: '店铺活动'
			}]
		}
	},
	methods: {
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
		handleReceiveCoupon(couponItemInfo) {
			uni.showLoading({
				mask: true,
				title: '领取中...'
			})
			updateTakeCouponReceiveApi({
				shopCouponId: couponItemInfo.shopCouponId,
				shopId: this.shopId
			}).then((res) => {
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
	z-index: -1;
	opacity: 0;
	box-sizing: border-box;

	&.show {
		z-index: 1000;
		opacity: 1;

		.couponShow-box {
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
			position: absolute;
			top: 20upx;
			right: 20upx;
		}

		.shopCouponBox {
			height: 100%;
			overflow: auto;
			position: relative;
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
