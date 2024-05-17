<template>
	<view class="shop-skus-container" :style="{ margin }">
		<view v-if="shopData.shopId">
			<view>
				<view v-if="isShowShopDetail" style="padding: 20rpx 0 0;">
					<view style="display: flex;align-items: stretch;">
						<image
							style="width: 96rpx;height: 96rpx;margin-right: 30rpx;border-radius: 10rpx"
							:src="common.seamingImgUrl(brandDetail.shopLogo)"
						>
						</image>
						<view style="flex: 1;width: 0;">
							<view
								style="font-size: 30rpx;color: #333;font-weight: bold;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
							>
								<text>{{ brandDetail.shopName }}</text>
								<text v-if="brandDetail.shopBrief">（{{ brandDetail.shopBrief }}）</text>
							</view>
							<view style="margin-top: 12rpx;display: flex;align-items: center;font-size: 28rpx;">
								<tui-icon name="position" :size="18" color="#767676"></tui-icon>
								<text
									style="margin-left: 8rpx;flex: 1;width: 0;color: #767676;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
								>
									{{ brandDetail.shopAdress || '--' }}
								</text>
							</view>
						</view>
					</view>
					<view style="display: flex;flex-wrap: wrap;padding: 4rpx 0;">
						<view
							v-if="brandDetail.isBeeCoin === 1"
							style="width: fit-content;padding: 2rpx 6rpx;margin: 8rpx 6rpx 0 0;border: 1rpx solid rgba(226, 71, 71, 0.5);border-radius: 12rpx;font-size: 24rpx;color: #E24747;"
						>
							支持交易金
						</view>
						<view
							v-if="brandDetail.isVoucher"
							style="width: fit-content;padding: 2rpx 6rpx;margin: 8rpx 6rpx 0 0;border: 1rpx solid rgba(226, 71, 71, 0.5);border-radius: 12rpx;font-size: 24rpx;color: #E24747;"
						>
							支持代金券
						</view>
						<view
							v-if="brandDetail.voucherReturn"
							style="width: fit-content;padding: 2rpx 6rpx;margin: 8rpx 6rpx 0 0;border: 1rpx solid rgba(226, 71, 71, 0.5);border-radius: 12rpx;font-size: 24rpx;color: #E24747;"
						>
							补贴代金券{{ brandDetail.voucherReturn || 0 }}%
						</view>
					</view>
				</view>
				<view v-else>
					<view
						v-if="!shopData.shopName.startsWith('团蜂')"
						style="display: flex;align-items: center;padding: 20rpx 30rpx;background-color: #ffffff;border-radius: 20rpx 20rpx 0 0;"
					>
						<tui-icon name="shop" :size="34" unit="rpx" color="#2b2b2b" margin="0 20rpx 0 0"></tui-icon>
						<text style="font-size: 30rpx;color: #333333;font-weight: bold;">{{ shopData.shopName }}</text>
					</view>
				</view>
			</view>
			<view
				style="padding: 0 30rpx;background-color: #ffffff;"
				:style="{
					borderRadius: isShowShopDetail ? detailRadius : skusRadius,
					margin: isShowShopDetail ? '20rpx 0 0' : '0'
				}"
			>
				<view v-if="isShowSkus">
					<view>
						<view
							v-for="skuItem in shopData.skus" :key="skuItem.skuId"
							style="display: flex;align-items: center;padding: 20rpx 0;"
						>
							<image
								:src="common.seamingImgUrl(skuItem.image)"
								style="width: 180rpx;height: 180rpx;border-radius: 10rpx;margin-right: 30rpx;"
							></image>
							<view>
								<text
									style="font-size: 26rpx;color: #333333;display: -webkit-box;overflow: hidden;text-overflow: ellipsis;word-break: break-all;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
								>
									{{ skuItem.productName }}
								</text>
								<view style="display: flex;margin-top: 12rpx;font-size: 24rpx;color: #999999;">
									<view v-for="(vItem, index) in skuItem.values" :key="index" style="margin-right: 20rpx;">
										{{ vItem }}
									</view>
								</view>
								<view style="margin-top: 12rpx;display: flex;">
									<view style="font-size: 28rpx;color: #C83732;">
										￥<text style="font-size: 32rpx;">{{ skuItem.price }}</text>
									</view>
									<view style="margin-left: 10rpx;color: #999999;">x {{ skuItem.number }}</view>
								</view>
							</view>
						</view>
					</view>
					<view style="margin-top: 20rpx;">
						<view v-if="shopData.receiveNotMatch" style="color: #D53912;">
							当前地址不支持配送，可更换其他地址试试
						</view>
						<view
							style="padding: 20rpx;display: flex;align-items: center;justify-content: space-between;font-size: 26rpx;border: 2rpx solid #E4E5E6;"
						>
							<view>配送方式</view>
							<view>
								<text v-if="shopData.distribution.distributionPrice" style="white-space: nowrap;">
									快递 ￥ {{ shopData.distribution.distributionPrice }}
								</text>
								<text v-else>快递 免邮</text>
							</view>
						</view>
					</view>
					<view
						v-if="shopData.skuDiscountInfoMap && shopData.skuDiscountInfoMap.length"
						style="display: flex;align-items: center;margin-top: 20rpx;color: #666666;font-size: 24rpx;"
					>
						<text v-for="(hItem, hIndex) in shopData.skuDiscountInfoMap" :key="hIndex">
							{{ hItem[0] }}
						</text>
					</view>
				</view>
				<slot name="operateBody" :shop-item="shopData"></slot>
				<view v-if="isShowSkus" style="padding: 20rpx 0;font-size: 26rpx;color: #333333;text-align: right;">
					<text>共{{ shopData.number }}件</text>
					<text style="margin-left: 10rpx;">总计</text>
					<text v-if="shopData.totalAfterDiscount" style="margin-left: 10rpx;font-size: 46rpx;">
						￥{{
							(parseFloat(shopData.totalAfterDiscount) + parseFloat(shopData.distribution.distributionPrice ||
								0)).toFixed(2)
						}}
					</text>
					<text v-else style="margin-left: 10rpx;font-size: 46rpx;">￥0.00</text>
				</view>
				<view style="border-bottom: 2rpx solid #eeeeee;"></view>
			</view>
		</view>
	</view>
</template>

<script>
import { getIndexShopDetailApi } from '../../api/anotherTFInterface'

export default {
	name: 'ATFShopSkus',
	props: {
		margin: {
			type: String,
			default: ''
		},
		detailRadius: {
			type: String,
			default: '20rpx'
		},
		skusRadius: {
			type: String,
			default: '0 0 20rpx 20rpx'
		},
		shopData: {
			type: Object,
			default: () => ({})
		},
		isShowShopDetail: {
			type: Boolean,
			default: false
		},
		isShowSkus: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			brandDetail: {}
		}
	},
	created() {
		if (this.isShowShopDetail) {
			getIndexShopDetailApi({
				shopId: this.shopData.shopId,
				longitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[0],
				latitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[1]
			})
				.then((res) => {
					this.brandDetail = res.data || {}
					this.$emit('get-detail', JSON.parse(JSON.stringify(res.data)))
				})
		}
	},
	methods: {
	}
}
</script>

<style lang="less" scoped>
.shop-skus-container {
	box-sizing: border-box;
}
</style>
