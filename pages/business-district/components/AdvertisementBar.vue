<template>
	<view class="advertisement-bar-container">
		<view style="display: flex;align-items: stretch;justify-content: space-between;">
			<view v-if="limitedTimeSeckillArr && limitedTimeSeckillArr.length">
				<view>111</view>
			</view>
			<view>
				<view></view>
				<view></view>
			</view>
		</view>
		<view style="padding-bottom: 2rpx;">
			<LoadingMore :status="isLoading ? 'loading' : ''"></LoadingMore>
			<view v-if="!isLoading && !limitedTimeSeckillArr.length">
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
			limitedTimeSeckillArr: [],
			discountList: [],
			couponList: []
		}
	},
	created() {
		this.isLoading = true
		getPlatformSeckillsCanvasApi({ seckillId: '' })
			.then((res) => {
				this.limitedTimeSeckillArr = res.data.filter((item) => item.products && item.products.length)
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
