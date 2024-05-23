<template>
	<view class="platform-coupon-container" :style="{ margin }">
		<view
			style="display: flex;align-items: center;justify-content: space-between;background-color: #ffffff;"
			:style="{ padding, borderRadius: radius }"
			@click="$emit('click')"
		>
			<view style="font-size: 26rpx;color: #333333;">平台优惠</view>
			<view style="display: flex;align-items: center;">
				<view v-if="selectedPlatformCoupon && selectedPlatformCoupon.couponId" style="color: #C5AA7B;">
					<text v-if="selectedPlatformCoupon.couponType === 2">{{ selectedPlatformCoupon.reduceMoney }}折</text>
					<text v-else> -￥{{ (parseInt((selectedPlatformCoupon.reduceMoney || 0) * 100) / 100).toFixed(2) }}</text>
				</view>
				<view v-else-if="!settlement.coupons || !settlement.coupons.length" style="font-size: 26rpx;color: #333333;">
					暂无可用
				</view>
				<view v-else style="font-size: 26rpx;color: #333333;">不使用</view>
				<tui-icon name="arrowright" :size="30" unit="rpx" color="#999999" margin="0 0 0 20rpx"></tui-icon>
			</view>
		</view>
		<tui-bottom-popup :show="show" @close="$emit('close')">
			<view>
				<view style="display: flex;justify-content: flex-end;padding: 12rpx;border-bottom: solid 1rpx #EEEEEE;">
					<tui-icon name="close" :size="50" unit="rpx" color="#999999" @click="$emit('close')"></tui-icon>
				</view>
				<view>
					<scroll-view scroll-y style="height: 900rpx;">
						<view v-if="settlement.coupons && settlement.coupons.length" style="padding: 30rpx;">
							<view style="font-size: 28rpx;color: #333333;">可用优惠券列表</view>
							<view style="display: flex;flex-wrap: wrap;justify-content: space-between;margin-top: 10rpx;">
								<view
									v-for="(cItem, couponIndex) in settlement.coupons" :key="couponIndex"
									style="width: 48%;padding: 20rpx;margin-bottom: 30rpx;background-color: #eeeeee;border-radius: 100rpx;color: #C5AA7B;text-align: center;box-sizing: border-box;"
									@click="handlePlatformCouponItemTap({ settlement, couponIndex, isShowPlatformCoupon: show, selectedPlatformCoupon, selectedShopCouponList })"
								>
									<view style="font-size: 40rpx;padding-top: 30rpx;">
										<text v-if="cItem.couponType === 1">￥{{ cItem.reduceMoney }}</text>
										<text v-else>{{ cItem.reduceMoney }}折券</text>
									</view>
									<view style="font-size:22rpx;margin-top: 20rpx;color: #999999;">
										{{ cItem.startTime && cItem.startTime.split(' ')[0].split('-').join('.')
										}}-{{ cItem.endTime && cItem.endTime.split(' ')[0].split('-').join('.') }}
									</view>
									<view style="margin-top: 10rpx;font-size: 24rpx;color: #999999;">
										满{{ cItem.fullMoney }}元可用
									</view>
									<tui-icon
										v-if="cItem.checked" name="circle-fill" :size="40" unit="rpx"
										color="#c5aa7b"
										margin="40rpx 0 0 0"
									></tui-icon>
									<tui-icon v-else name="circle" :size="40" unit="rpx" color="#cccccc" margin="40rpx 0 0 0"></tui-icon>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</tui-bottom-popup>
	</view>
</template>

<script>
import { resolvePlatformCouponItemSelect } from '../../utils'

export default {
	name: 'ATFPlatformCoupon',
	props: {
		margin: {
			type: String,
			default: ''
		},
		padding: {
			type: String,
			default: '28rpx 20rpx'
		},
		radius: {
			type: String,
			default: '0'
		},
		settlement: {
			type: Object,
			default: () => ({ shops: [] })
		},
		show: {
			type: Boolean,
			required: true
		},
		selectedPlatformCoupon: {
			type: Object,
			default: () => ({ couponId: '' })
		},
		selectedShopCouponList: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
		}
	},
	methods: {
		// 平台优惠券选择
		handlePlatformCouponItemTap(obj) {
			const platformCouponItemSelectObj = resolvePlatformCouponItemSelect({
				settlement: obj.settlement,
				couponIndex: obj.couponIndex,
				isShowPlatformCoupon: obj.isShowPlatformCoupon,
				selectedPlatformCoupon: obj.selectedPlatformCoupon,
				selectedShopCouponList: obj.selectedShopCouponList
			})
			this.$emit('select', platformCouponItemSelectObj)
		}
	}
}
</script>

<style lang="scss" scoped>
.platform-coupon-container {
	box-sizing: border-box;
}
</style>
