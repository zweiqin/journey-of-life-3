<template>
	<view
		class="brand-goods-container"
		@click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${shopId}&productId=${cItem.productId}&skuId=${cItem.skuId}`)"
	>
		<view style="width: 98%;height: 266rpx;box-sizing: border-box;" :style="{ padding: picPadding }">
			<image
				:src="common.seamingImgUrl(cItem.image)" mode="aspectFit"
				style="width: 100%;height: 100%;border-radius: 20rpx;background-color: #f5f4f6;overflow: hidden;vertical-align: middle;"
			>
			</image>
		</view>
		<view class="product-bottom-box">
			<view
				style="font-size: 28rpx;font-weight: bold;overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
			>
				{{ cItem.productName }}
			</view>
			<view
				v-if="showBrief && cItem.productBrief"
				style="margin-top: 10rpx;font-size: 24rpx;color: #7f7f7f;overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
			>
				{{ cItem.productBrief }}
			</view>
			<view style="margin-top: 10rpx;">
				<view
					v-if="showSales"
					style="width: fit-content;padding: 2rpx 10rpx;margin-right: 12rpx;font-size: 24rpx;color: #b3b3b3;background-color: #ffffff;border: 2rpx solid #b3b3b3;border-radius: 8rpx;"
				>
					{{ cItem.number ? `已售${cItem.number}件` : '热门商品' }}
				</view>
			</view>
			<view
				style="display: flex;justify-content: space-between;flex-direction: row;align-items: center;flex-wrap: wrap;margin-top: 14rpx;"
			>
				<view style="flex: 1;display: flex;flex-direction: row;align-items: center;flex-wrap: wrap;">
					<view style="flex: 1;display: flex;align-items: flex-end;flex-wrap: wrap;">
						<view style="font-weight: bold;" :style="{ color: priceColor }">
							<text style="font-size: 26rpx;">￥</text>
							<text style="font-size: 34rpx;">{{ cItem.price }}</text>
						</view>
						<!-- <text
							v-if="cItem.price !== cItem.originalPrice"
							style="margin-left: 12rpx;text-decoration: line-through;font-size: 24rpx;color: #cccccc;"
							>
							￥{{ cItem.originalPrice }}
							</text> -->
					</view>
				</view>
				<view
					v-if="showIcon" style="padding: 10rpx;background-color: #ffe500;border-radius: 50%;line-height: 1;"
					@click.stop="$emit('add-car', cItem)"
				>
					<tui-icon name="plus" color="#000000" :size="28" unit="rpx" bold></tui-icon>
				</view>
			</view>
			<view style="display: flex;align-items: center;flex-wrap: wrap;">
				<view style="margin: 10rpx 0 0;">
					<ATFActivityImage :type="cItem.activityType"></ATFActivityImage>
				</view>
				<view
					v-if="cItem.voucherId && cItem.voucherPrice"
					style="width: fit-content;max-width: 218rpx;padding: 2rpx 8rpx;margin: 10rpx 6rpx 0 0;color: #E24747;font-size: 26rpx;border: 1rpx solid #e247478c;border-radius: 8rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
				>
					可使用{{ cItem.voucherPrice }}代金券抵扣
				</view>
				<view
					v-if="cItem.presenterVoucher"
					style="width: fit-content;max-width: 218rpx;padding: 2rpx 8rpx;margin: 10rpx 6rpx 0 0;color: #E24747;font-size: 26rpx;border: 1rpx solid #e247478c;border-radius: 8rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
				>
					赠送 {{ cItem.price
						? `${(Number.parseFloat(cItem.presenterVoucher / cItem.price).toFixed(3) * 1000) / 10}%`
						: cItem.presenterVoucher }} 代金券
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'BrandGoods',
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
.brand-goods-container {
	width: 100%;
	margin: 12rpx 0;
	// background-color: #ffffff;
	border-radius: 20rpx;
	display: flex;
	align-items: center;
	flex-direction: column;
	box-sizing: border-box;

	.product-bottom-box {
		width: 100%;
		padding: 16rpx 48rpx 32rpx;
		box-sizing: border-box;
	}
}
</style>
