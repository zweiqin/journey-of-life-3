<template>
	<view class="platform-discount-goods-container">
		<view
			v-if="discountList && discountList.length"
			style="padding: 22rpx 22rpx 36rpx;background: linear-gradient(150deg, #FDF3F1 3%, #FEEAEC 6%, #FFFBEF 10%, #FFFFFF 45%);"
		>
			<view style="display: flex;align-items: center;flex-wrap: wrap;">
				<text style="font-size: 34rpx;font-weight: bold;">超低一口价</text>
				<view
					style="display: flex;align-items: center;margin-left: 18rpx;background-color: #fce5df;border-radius: 20rpx;"
				>
					<view
						style="width: 110rpx;height: 36rpx;padding: 6rpx 12rpx;font-size: 28rpx;color: #ffffff;text-align: center;background-color: #f15d43;border-radius: 20rpx 0 26rpx 20rpx;clip-path: polygon(0rpx 0rpx, 134rpx 0, 124rpx 8rpx, 124rpx 48rpx, 0 48rpx);"
					>
						<text style="margin-left: -10rpx;">限时购</text>
					</view>
					<view style="font-size: 26rpx;font-weight: bold;color: #f84715;padding: 0 14rpx 0;">
						<tui-countdown
							:width="34" :height="30" :size="26" :colon-size="26"
							colon-color="#f84715" color="#f84715"
							border-color="transparent" background-color="transparent"
							days :is-colon="false"
							:time="Math.floor(discountInfo.endTime / 1000)"
						></tui-countdown>
					</view>
				</view>
			</view>
			<view style="margin-top: 20rpx;">
				<view
					v-for="(item, index) in discountList.slice(0, 3)" :key="index" style="display: flex;margin-top: 18rpx;"
					@click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${item.shopId}&productId=${item.productId}&skuId=${item.skuId}`)"
				>
					<view>
						<BeeIcon
							width="180rpx" height="252rpx" style="width: fit-content;border-radius: 22rpx;overflow: hidden;"
							:src="item.url ? common.seamingImgUrl(item.url) : require('../../../../static/images/con-center/hongbao.png')"
						>
						</BeeIcon>
					</view>
					<view style="flex: 1;width: 0;margin-left: 20rpx;">
						<view
							style="font-size: 34rpx;font-weight: bold;word-break: break-all;display: -webkit-box;overflow: hidden;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
						>
							{{ item.productName || '--' }}
						</view>
						<view
							v-if="item.limitNumber"
							style="margin-top: 6rpx;font-size: 26rpx;color: #9e9e9e;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
						>
							限量{{ item.limitNumber }}件 / 剩余{{ item.limitStockNumber }}件
						</view>
						<view style="margin-top: 8rpx;">
							<view style="font-size: 26rpx;color: #9e9e9e;text-align: right;">
								<text v-if="(item.total - item.limitStockNumber) > 0">已售{{ item.total - item.limitStockNumber }}件</text>
								<text v-else>已售10+</text>
							</view>
							<view style="display: flex;justify-content: flex-end;align-items: center;margin-top: 14rpx;">
								<view style="margin-right: 12rpx;">
									<view style="font-size: 26rpx;color: #9e9e9e;text-align: right;">商品价</view>
									<view style="display: flex;align-items: center;color: #ef530e;">
										<view style="font-size: 24rpx;color: #9e9e9e;text-decoration: line-through;">
											￥{{ Number.parseFloat(Number(item.originalPrice || 0)).toFixed(2) }}
										</view>
										<text>
											<text style="font-size: 24rpx;">￥</text>
											<text style="font-size: 38rpx;font-weight: bold;">
												{{ Number.parseFloat(Number(item.price || 0)).toFixed(2) }}
											</text>
										</text>
										<text
											style="padding: 2rpx 10rpx;margin-left: 10rpx;font-size: 24rpx;border: 1rpx solid #f9c1a6;border-radius: 12rpx;white-space: nowrap;"
										>
											{{ discountInfo.discount || '--' }}折
										</text>
									</view>
								</view>
								<tui-button
									type="warning" width="140rpx" height="72rpx" shape="circle"
									style="background: #ee6529!important;"
									@click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${item.shopId}&productId=${item.productId}&skuId=${item.skuId}`)"
								>
									抢购
								</tui-button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getQueryPlatformDiscountApi, getPlatformDiscountProductListApi } from '../../../../api/anotherTFInterface'

export default {
	name: 'PlatformDiscountGoods',
	props: {
	},
	data() {
		return {
			discountInfo: {
				discount: '',
				endTime: 0
			},
			discountList: []
		}
	},
	created() {
		getQueryPlatformDiscountApi({
			discountId: ''
		}).then((res) => {
			this.discountInfo = res.data
		})
		getPlatformDiscountProductListApi({
			page: 1,
			pageSize: 20,
			type: 1,
			volume: 1,
			discountId: ''
		}).then((res) => {
			this.discountList = res.data.list
		})
	},

	methods: {
	}
}
</script>

<style lang="less" scoped>
.platform-discount-goods-container {
	box-sizing: border-box;
}
</style>
