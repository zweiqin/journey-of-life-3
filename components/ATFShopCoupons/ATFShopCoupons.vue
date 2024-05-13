<template>
	<view class="shop-coupons-container" :style="{ margin }">
		<view
			style="display: flex;align-items: center;justify-content: space-between;padding: 20rpx;border: 2rpx solid #E4E5E6;"
			@click="$emit('click')"
		>
			<view style="font-size: 26rpx;color: #333333;">店铺优惠</view>
			<view style="display: flex;align-items: center;color: #C5AA7B;">
				<view v-if="settlement.shops[sIndex] && settlement.shops[sIndex].currentCoupon && (settlement.shops[sIndex].currentCoupon.couponType === 1)">
					-￥{{ settlement.shops[sIndex].currentCoupon.reduceMoney }}
				</view>
				<view v-if="settlement.shops[sIndex] && settlement.shops[sIndex].currentCoupon && (settlement.shops[sIndex].currentCoupon.couponType === 2)">
					{{ settlement.shops[sIndex].currentCoupon.reduceMoney }}折券
				</view>
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
						<view v-if="shopCouponsList && shopCouponsList.length" style="padding: 30rpx;">
							<view style="font-size: 28rpx;color: #333333;">可用优惠券列表</view>
							<view style="display: flex;flex-wrap: wrap;justify-content: space-between;margin-top: 10rpx;">
								<view
									v-for="(cItem, couponIndex) in shopCouponsList" :key="cItem.id"
									style="width: 48%;padding: 20rpx;margin-bottom: 30rpx;background-color: #eeeeee;border-radius: 100rpx;color: #C5AA7B;text-align: center;box-sizing: border-box;"
									@click="handleShopCouponItemTap({ settlement, shopIndex, couponIndex, isShowShopCoupons: show, selectedShopCouponList, selectedPlatformCoupon })"
								>
									<view style="font-size: 40rpx;padding-top: 30rpx;">
										<text v-if="cItem.couponType === 1">￥{{ cItem.reduceMoney }}</text>
										<text v-else>{{ cItem.reduceMoney }}折券</text>
									</view>
									<view style="font-size:22rpx;margin-top: 10rpx;color: #999999;">
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
import { resolveShopCouponItemSelect } from '../../utils'

export default {
	name: 'ATFShopCoupons',
	props: {
		margin: {
			type: String,
			default: ''
		},
		settlement: {
			type: Object,
			default: () => ({ shops: [] })
		},
		sIndex: {
			type: Number,
			required: true
		},
		shopIndex: {
			type: Number,
			default: 0
		},
		shopCouponsList: {
			type: Array,
			default: () => []
		},
		show: {
			type: Boolean,
			required: true
		},
		selectedShopCouponList: {
			type: Array,
			default: () => []
		},
		selectedPlatformCoupon: {
			type: Object,
			default: () => ({ couponId: '' })
		}
	},
	data() {
		return {
		}
	},
	methods: {
		// 点击店铺优惠券
		handleShopCouponItemTap(obj) {
			const shopCouponItemSelectObj = resolveShopCouponItemSelect({
				settlement: obj.settlement,
				shopIndex: obj.shopIndex,
				couponIndex: obj.couponIndex,
				isShowShopCoupons: obj.isShowShopCoupons,
				selectedShopCouponList: obj.selectedShopCouponList,
				selectedPlatformCoupon: obj.selectedPlatformCoupon
			})
			this.$emit('select', shopCouponItemSelectObj)
		}
	}
}
</script>

<style lang="scss" scoped>
.shop-coupons-container {
	box-sizing: border-box;
}
</style>
