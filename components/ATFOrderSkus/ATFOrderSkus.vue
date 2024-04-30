<template>
	<view class="order-skus-container">
		<view
			v-for="proItem in data" :key="proItem.productId"
			style="display: flex;align-items: center;padding: 20upx 0;"
			@click="goodsItemTap(proItem.shopId, proItem.productId, proItem.skuId)"
		>
			<image
				:src="common.seamingImgUrl(proItem.image)" class="default-img"
				style="width: 90upx;height: 90upx;border-radius: 10upx;margin-right: 30upx;"
			></image>
			<view style="flex: 1;display: flex;flex-direction: column;justify-content: space-between;">
				<view style="display: flex;align-items: center;justify-content: space-between;">
					<view style="flex: 1;width: 0;">
						<text
							style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis;word-break: break-all;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
						>
							{{ proItem.productName }}
						</text>
						<view
							v-if="proItem.presenterVoucher"
							style="width: fit-content;padding: 6upx 12upx;margin: 10upx 6upx 0 0;background-color: #f0f0f0;font-size: 28upx;color: #fa5151;border-radius: 22upx;"
						>
							赠送 {{ proItem.presenterVoucher }} 代金券
						</view>
						<view style="margin-top: 8upx;">
							<view v-for="(vItem, vIndex) in proItem.values" :key="vIndex">
								<text>{{ vItem }}</text>
							</view>
						</view>
					</view>
					<view style="margin-left: 10upx;display: flex;align-items: center;">
						<view>￥{{ proItem.price }}</view>
						<view style="margin-left: 20upx;">x {{ proItem.number }}</view>
					</view>
				</view>
				<slot name="rightFoot" :pro-item="proItem"></slot>
			</view>
		</view>
	</view>
</template>

<script>

export default {
	name: 'ATFOrderSkus',
	props: {
		data: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
		}
	},
	methods: {
		// 商品详情
		goodsItemTap(shopId, productId, skuId) {
			uni.navigateTo({
				url: '/another-tf/another-serve/goodsDetails/index?shopId=' + shopId + '&productId=' + productId + '&skuId=' + skuId
			})
		}
	}
}
</script>

<style lang="less" scoped>
.order-skus-container {
}
</style>
