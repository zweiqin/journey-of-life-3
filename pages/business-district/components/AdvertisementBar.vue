<template>
	<view class="advertisement-bar-container">
		<view
			v-if="(spikeLikeList && spikeLikeList.length) || (discountList && discountList.length) || (couponList && couponList.length)"
			style="flex-wrap: wrap;display: flex;align-items: stretch;justify-content: space-between;width: 100%;padding: 2rpx -5rpx 0;"
		>
			<view
				v-if="spikeLikeList && spikeLikeList.length"
				style="flex: 1;margin: 24rpx 5rpx 0;border: 2rpx solid #f67e8f;border-radius: 12rpx;background: linear-gradient(180deg, #FFD8DD 0%, #FFFFFF 30%);"
			>
				<view style="padding: 8rpx 14rpx 14rpx;box-sizing: border-box;">
					<view
						style="display: flex;align-items: center;justify-content: space-between;"
						@click="go('/another-tf/another-serve/discount/spikeList')"
					>
						<image
							style="width: 112rpx;height: 24rpx;"
							src="../../../static/images/new-business/home/miaoshahuodong.png"
						>
						</image>
						<view style="display: flex;align-items: center;justify-content: space-between;">
							<view style="font-size: 24rpx">更多</view>
							<tui-icon name="arrowright" color="#000000" size="26" unit="rpx" margin="0 0 0 6rpx"></tui-icon>
						</view>
					</view>
					<view style="margin-top: 6rpx;">
						<view
							v-for="item in spikeLikeList.slice(0, 2)" :key="item.skuId"
							style="display: flex;align-items: center;padding-top: 14rpx;"
							@click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${item.shopId}&productId=${item.productId}&skuId=${item.skuId}`)"
						>
							<image
								style="width: 130rpx;height: 130rpx;margin-right: 16rpx;border-radius: 10rpx;"
								:src="common.seamingImgUrl(item.image)"
							>
							</image>
							<view style="flex: 1;width: 0;display: flex;align-items: center;flex-wrap: wrap;">
								<view
									style="margin: 0 10rpx 0 0;font-size: 24rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
								>
									{{ item.productName }}
								</view>
								<view
									style="padding: 4rpx 16rpx;margin: 10rpx 10rpx 0 0;font-size: 20rpx;color: #FF0000;background-color: #ffdce0;border-radius: 6rpx;"
								>
									直降{{ Number.parseFloat(Number(item.discount || 0)).toFixed(2) }}元
								</view>
								<view style="display: flex;align-items: end;flex-wrap: wrap;">
									<view
										style="margin-right: 6rpx;font-size: 24rpx;font-weight: bold;color: #FF0000;padding-top: 10rpx;"
									>
										￥{{ Number.parseFloat(Number(item.price || 0)).toFixed(2) }}
									</view>
									<view style="font-size: 20upx;text-decoration: line-through;color: #767676;padding-top: 10rpx;">
										￥{{ Number.parseFloat(Number(item.originalPrice || 0)).toFixed(2) }}
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view
				v-if="(discountList && discountList.length) || (couponList && couponList.length)"
				style="display: flex;flex-direction: column;justify-content: space-between;align-items: stretch;margin: 24rpx 5rpx 0;"
				:style="{
					width: (discountList && (discountList.length === 1) && !couponList.length) || (couponList && (couponList.length === 1) && !discountList.length) ? '100%' : 'auto',
					flex: (discountList && (discountList.length === 1) && !couponList.length) || (couponList && (couponList.length === 1) && !discountList.length) ? '0 1 auto' : '1'
				}"
			>
				<view
					v-if="discountList && discountList.length"
					style="flex: 1;border: 2rpx solid #fcca6e;border-radius: 12rpx;padding: 8rpx 14rpx 10rpx;background: linear-gradient(180deg, #FBE2A0 0%, rgba(255, 255, 255, 0) 27%);box-sizing: border-box;"
					:style="{ margin: couponList && couponList.length ? '0 0 12rpx' : '0' }"
				>
					<view
						style="display: flex;align-items: center;justify-content: space-between;"
						@click="go('/another-tf/another-serve/discount/platformDiscount')"
					>
						<image
							style="width: 112rpx;height: 24rpx;"
							src="../../../static/images/new-business/home/xianshizhekou.png"
						>
						</image>
						<view style="display: flex;align-items: center;justify-content: space-between;">
							<view style="font-size: 24rpx">更多</view>
							<tui-icon name="arrowright" color="#000000" size="26" unit="rpx" margin="0 0 0 6rpx"></tui-icon>
						</view>
					</view>
					<view style="margin-top: 6rpx;">
						<view
							v-for="item in discountList.slice(0, !couponList.length ? 2 : 1)" :key="item.skuId"
							style="display: flex;align-items: center;padding-top: 14rpx;"
							@click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${item.shopId}&productId=${item.productId}&skuId=${item.skuId}`)"
						>
							<image
								style="width: 110rpx;height: 110rpx;margin-right: 26rpx;border-radius: 10rpx;"
								:src="common.seamingImgUrl(item.image)"
							>
							</image>
							<view style="flex: 1;width: 0;display: flex;align-items: center;flex-wrap: wrap;">
								<view
									style="margin: 0 10rpx 0 0;font-size: 24rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
								>
									{{ item.productName }}
								</view>
								<view
									style="display: flex;align-items: center;padding: 4rpx 28rpx;margin: 10rpx 10rpx 0 0;font-size: 20rpx;color: #FF0000;background-color: #ffdce0;border-radius: 8rpx;"
								>
									<image
										style="width: 20rpx;height: 24rpx;margin-right: 12rpx;"
										src="../../../static/images/icon/arrow-fall.png"
									>
									</image>
									<text>享{{ item.discount }}折</text>
								</view>
								<view style="display: flex;align-items: end;flex-wrap: wrap;">
									<view
										style="margin-right: 6rpx;font-size: 24rpx;font-weight: bold;color: #FF0000;padding-top: 10rpx;"
									>
										￥{{ Number.parseFloat(Number(item.price || 0)).toFixed(2) }}
									</view>
									<view style="font-size: 20upx;text-decoration: line-through;color: #767676;padding-top: 10rpx;">
										￥{{ Number.parseFloat(Number(item.originalPrice || 0)).toFixed(2) }}
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view
					v-if="couponList && couponList.length"
					style="flex: 1;border: 2rpx solid #ffa585;border-radius: 12rpx;padding: 8rpx 14rpx 10rpx;background: linear-gradient(180deg, #FFCCB6 0%, #FFFFFF 30%);box-sizing: border-box;"
					@click="go('/another-tf/another-serve/coupon/list')"
				>
					<view style="display: flex;align-items: center;justify-content: space-between;">
						<image
							style="width: 112rpx;height: 24rpx;"
							src="../../../static/images/new-business/home/tiantianlingquan.png"
						>
						</image>
						<view style="display: flex;align-items: center;justify-content: space-between;">
							<view style="font-size: 24rpx">更多</view>
							<tui-icon name="arrowright" color="#000000" size="26" unit="rpx" margin="0 0 0 6rpx"></tui-icon>
						</view>
					</view>
					<view style="margin-top: 6rpx;">
						<view
							v-for="item in couponList.slice(0, !discountList.length ? 2 : 1)" :key="item.skuId"
							style="display: flex;align-items: center;padding-top: 14rpx;"
						>
							<view style="width: 110rpx;height: 110rpx;margin-right: 26rpx;border-radius: 10rpx;overflow: hidden;">
								<tui-icon name="coupon" color="#d3a7a9" size="98" unit="rpx" margin="0"></tui-icon>
							</view>
							<view style="flex: 1;width: 0;display: flex;align-items: center;flex-wrap: wrap;">
								<view
									style="margin: 0 10rpx 0 0;font-size: 24rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
								>
									领优惠券
								</view>
								<view
									style="margin: 4rpx 10rpx 0 0;font-size: 24rpx;font-weight: bold;color: #FF0000;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
								>
									<text v-if="item.fullMoney">满{{ item.fullMoney }}</text>
									<text v-if="item.discountMode === 1">减{{ item.reduceMoney }}</text>
									<text v-else>享{{ item.reduceMoney }}折</text>
								</view>
								<view
									style="display: flex;align-items: center;padding: 4rpx 18rpx;margin: 10rpx 0 0;font-size: 20rpx;color: #FF0000;background-color: #ffdce0;border-radius: 8rpx;"
								>
									<text>立即领取</text>
									<view
										style="padding: 2rpx;margin-left: 10rpx;background-color: #ffffff;border-radius: 50%;line-height: 1;"
									>
										<tui-icon name="arrowright" color="#ffdce0" size="18" unit="rpx" margin="0"></tui-icon>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="padding-bottom: 2rpx;">
			<LoadingMore :status="isLoading ? 'loading' : ''"></LoadingMore>
			<!-- <view v-if="!isLoading && !spikeLikeList.length">
				<tui-no-data :fixed="false" style="padding-top: 60rpx;">暂无秒杀活动～</tui-no-data>
				</view> -->
		</view>
	</view>
</template>

<script>
import { getPlatformSeckillsCanvasApi, getPlatformDiscountProductListApi, getCanvasCouponsApi } from '../../../api/anotherTFInterface'

export default {
	name: 'AdvertisementBar',
	data() {
		return {
			isLoading: true,
			spikeLikeList: [],
			discountList: [],
			couponList: []
		}
	},
	created() {
		this.isLoading = true
		getPlatformSeckillsCanvasApi({ seckillId: '' })
			.then((res) => {
				this.spikeLikeList = res.data.filter((item) => item.products && item.products.length).map((item) => item.products)
					.flatMap((item) => item)
				this.isLoading = false
			})
			.catch((e) => {
				this.isLoading = false
			})
		getPlatformDiscountProductListApi({
			page: 1,
			pageSize: 9999,
			type: 1,
			volume: 1,
			discountId: ''
		}).then((res) => {
			this.discountList = res.data.list
		})
		getCanvasCouponsApi({
			page: 1,
			pageSize: 9999
		}).then((res) => {
			this.couponList = res.data.list
		})
	},
	methods: {

	}
}
</script>

<style lang="less" scoped>
.advertisement-bar-container {
	width: 100%;
	box-sizing: border-box;
}
</style>
