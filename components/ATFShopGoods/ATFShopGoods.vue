<template>
	<view
		class="shop-goods-container"
		@click="isToDetail && go(`/another-tf/another-serve/goodsDetails/index?shopId=${shopId}&productId=${cItem.productId}&skuId=${cItem.skuId}&isSelection=${Number(isSelection)}`)"
	>
		<view style="width: 340rpx;height: 340rpx;box-sizing: border-box;" :style="{ padding: picPadding }">
			<image
				:src="common.seamingImgUrl(cItem.image)" mode="aspectFit"
				style="width: 100%;height: 100%;border-radius: 20rpx;background-color: #f5f4f6;overflow: hidden;vertical-align: middle;"
			>
			</image>
		</view>
		<view class="product-bottom-box">
			<view style="display: flex;justify-content: space-between;align-items: center;">
				<view
					style="flex: 1;width: 0;font-size: 28rpx;font-weight: bold;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
				>
					{{ cItem.productName }}
				</view>
				<view v-if="showSales && cItem.number" style="font-size: 24rpx;padding: 0 10rpx;color: #C5AA7B;">
					已售{{ cItem.number }}件
				</view>
			</view>
			<view
				v-if="showBrief && cItem.productBrief"
				style="margin-top: 10rpx;font-size: 24rpx;color: #7f7f7f;overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
			>
				{{ cItem.productBrief }}
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
						<text
							v-if="cItem.price !== cItem.originalPrice"
							style="margin-left: 12rpx;text-decoration: line-through;font-size: 24rpx;color: #cccccc;"
						>
							￥{{ cItem.originalPrice }}
						</text>
					</view>
				</view>
				<view
					v-if="showIcon" style="padding: 10rpx;background-color: #ffe500;border-radius: 50%;line-height: 1;"
					@click.stop="$emit('add-car', cItem)"
				>
					<tui-icon name="plus" color="#000000" :size="28" unit="rpx" bold></tui-icon>
				</view>
				<slot name="line" :data="cItem">
				</slot>
			</view>
			<view v-if="showTips" style="display: flex;align-items: center;flex-wrap: wrap;">
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
			<view v-else style="margin: 10rpx 0 0;">
				<ATFActivityImage :type="cItem.activityType"></ATFActivityImage>
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
		isToDetail: {
			type: Boolean,
			default: true
		},
		isSelection: {
			type: Boolean,
			default: false
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
		},
		showTips: {
			type: Boolean,
			default: true
		}
	},
	methods: {
	}
}
</script>

<style lang="less" scoped>
.shop-goods-container {
	width: 100%;
	// width: 340rpx;
	margin: 12rpx 0;
	background-color: #ffffff;
	border-radius: 20rpx;
	display: flex;
	align-items: center;
	flex-direction: column;
	box-sizing: border-box;

	.product-bottom-box {
		width: 100%;
		padding: 16rpx 16rpx 32rpx;
		box-sizing: border-box;
	}
}

// .item:nth-of-type(2n) {
// 	margin-left: 2%;
// 	margin-right: 0;
// }
</style>
