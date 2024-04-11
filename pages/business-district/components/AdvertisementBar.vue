<template>
	<view class="advertisement-bar-container">
		<view style="display: flex;align-items: stretch;justify-content: space-between;">
			<view
				v-if="spikeLikeList && spikeLikeList.length"
				style="flex: 1;margin-right: 20rpx;border: 2rpx solid #f67e8f;border-radius: 12rpx;"
			>
				<view>
					<image
						style="width: 96rpx;height: 40rpx;margin-right: 24rpx;border-radius: 50%"
						src="../../../static/images/new-business/home/miaoshahuodong.png"
					>
					</image>
				</view>
				<view>
					<view v-for="item in spikeLikeList" :key="item.skuId" style="display: flex;align-items: center">
						<image
							style="width: 96rpx;height: 96rpx;margin-right: 24rpx;border-radius: 10rpx"
							:src="common.seamingImgUrl(item.shopLogo)"
						>
						</image>
						<view style="flex: 1;display: flex;align-items: center;">

						</view>
					</view>
				</view>
			</view>
			<view style="flex: 1;display: flex;flex-direction: column;justify-content: space-between;">
				<view
					v-if="discountList && discountList.length"
					style="width: 100%;border: 2rpx solid #fcca6e;border-radius: 12rpx;"
				>
					222
				</view>
				<view
					v-if="couponList && couponList.length"
					style="width: 100%;border: 2rpx solid #ffa585;border-radius: 12rpx;"
				>
					333
				</view>
			</view>
		</view>
		<view style="padding-bottom: 2rpx;">
			<LoadingMore :status="isLoading ? 'loading' : ''"></LoadingMore>
			<view v-if="!isLoading && !spikeLikeList.length">
				<tui-no-data :fixed="false" style="padding-top: 60rpx;">暂无秒杀活动～</tui-no-data>
			</view>
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
	box-sizing: border-box;
	margin: 26rpx 0 0;
}
</style>
