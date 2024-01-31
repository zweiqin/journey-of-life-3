<template>
	<view
		class="shop-goods-container"
		@click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${shopId}&productId=${cItem.productId}&skuId=${cItem.skuId}`)"
	>
		<view style="width: 340rpx;height: 340rpx;box-sizing: border-box;" :style="{ padding: picPadding }">
			<image
				:src="common.seamingImgUrl(cItem.image)" mode="aspectFit"
				style="width: 100%;height: 100%;border-radius: 20upx;background-color: #f5f4f6;overflow: hidden;vertical-align: middle;"
			>
			</image>
		</view>
		<view class="product-bottom-box">
			<view style="display: flex;justify-content: space-between;align-items: center;">
				<view
					style="flex: 1;width: 0;font-size: 28upx;font-weight: bold;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
				>
					{{ cItem.productName }}
				</view>
				<view v-if="showSales && cItem.number" style="font-size: 24upx;padding: 0 10rpx;color: #C5AA7B;">
					已售{{ cItem.number }}件
				</view>
			</view>
			<view
				v-if="showBrief && cItem.productBrief"
				style="margin-top: 10upx;font-size: 24upx;color: #7f7f7f;overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
			>
				{{ cItem.productBrief }}
			</view>
			<view
				style="display: flex;justify-content: space-between;flex-direction: row;align-items: center;flex-wrap: wrap;margin-top: 14upx;"
			>
				<view style="flex: 1;display: flex;flex-direction: row;align-items: center;flex-wrap: wrap;">
					<view style="flex: 1;display: flex;align-items: flex-end;flex-wrap: wrap;">
						<view style="font-weight: bold;" :style="{ color: priceColor }">
							<text style="font-size: 26upx;">￥</text>
							<text style="font-size: 34upx;">{{ cItem.price }}</text>
						</view>
						<text
							v-if="cItem.price !== cItem.originalPrice"
							style="margin-left: 12upx;text-decoration: line-through;font-size: 24rpx;color: #cccccc;"
						>
							￥{{ cItem.originalPrice }}
						</text>
					</view>
				</view>
				<view
					v-if="showIcon" style="padding: 10upx;background-color: #ffe500;border-radius: 50%;line-height: 1;"
					@click.stop="$emit('add-car', cItem)"
				>
					<tui-icon name="plus" color="#000000" :size="28" unit="upx" bold></tui-icon>
				</view>
			</view>
			<view style="display: flex;align-items: center;flex-wrap: wrap;">
				<ATFActivityImage :type="cItem.activityType" style="margin: 10upx 2upx 0 0;"></ATFActivityImage>
				<view
					v-if="cItem.voucherId && cItem.voucherPrice"
					style="width: fit-content;max-width: 100%;padding: 2upx 8upx;margin: 10upx 6upx 0 0;color: #E24747;font-size: 26upx;border: 1upx solid #e247478c;border-radius: 8upx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
				>
					可使用{{ cItem.voucherPrice }}代金券抵扣
				</view>
				<view
					v-if="cItem.presenterVoucher"
					style="width: fit-content;max-width: 100%;padding: 2upx 8upx;margin: 10upx 6upx 0 0;color: #E24747;font-size: 26upx;border: 1upx solid #e247478c;border-radius: 8upx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
				>
					赠送 {{ cItem.presenterVoucher }} 代金券
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'ATFShopGoods',
	props: {
		shopId: {
			type: [Number, String],
			required: true
		},
		cItem: {
			type: Object,
			required: true
		},
		picPadding: {
			type: String,
			default: '0'
		},
		priceColor: {
			type: String,
			default: '#c83732'
		},
		showIcon: {
			type: Boolean,
			default: true
		},
		showBrief: {
			type: Boolean,
			default: false
		},
		showSales: {
			type: Boolean,
			default: false
		}
	},
	methods: {
	}
}
</script>

<style lang="less" scoped>
.shop-goods-container {
	width: 100%;
	// width: 340upx;
	margin: 12rpx 0;
	background-color: #ffffff;
	border-radius: 20upx;
	display: flex;
	align-items: center;
	flex-direction: column;
	box-sizing: border-box;

	.product-bottom-box {
		width: 100%;
		padding: 16rpx 16upx 32upx;
		box-sizing: border-box;
	}
}

// .item:nth-of-type(2n) {
// 	margin-left: 2%;
// 	margin-right: 0;
// }
</style>
