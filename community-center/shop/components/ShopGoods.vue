<template>
	<view
		class="item"
		@click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${shopId}&productId=${cItem.productId}&skuId=${cItem.skuId}`)"
	>
		<image :src="common.seamingImgUrl(cItem.image)" mode="aspectFit" class="product-img"></image>
		<view class="product-bottom-box">
			<view class="product-name">{{ cItem.productName }}</view>
			<view v-if="cItem.number" class="product-num font-color-C5AA7B mar-top-10">
				已售{{ cItem.number }}件
			</view>
			<view class="product-line-box">
				<view class="product-price-box">
					<ATFActivityImage :type="cItem.activityType"></ATFActivityImage>
					<view style="flex: 1;display: flex;align-items: center;flex-wrap: wrap;">
						<text class="price-box fs40 font-color-C83732 mar-right-20">
							<text class="fs32">￥</text>
							{{ cItem.price }}
						</text>
						<text v-if="cItem.price !== cItem.originalPrice" class="price-through">￥{{ cItem.originalPrice }}</text>
					</view>
				</view>
				<view
					style="padding: 10upx;background-color: #ffe500;border-radius: 50%;line-height: 1;"
					@click.stop="$emit('add-car', cItem)"
				>
					<tui-icon name="plus" color="#000000" :size="28" unit="upx" bold></tui-icon>
				</view>
			</view>
			<view
				v-if="cItem.voucherId && cItem.voucherPrice"
				style="width: fit-content;max-width: 100%;padding: 2upx 8upx;margin: 10upx 0;color: #E24747;font-size: 26upx;border: 1upx solid #e247478c;border-radius: 8upx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
			>
				可使用{{ cItem.voucherPrice }}代金券抵扣
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'ShopGoods',
	props: {
		shopId: {
			type: [Number, String],
			required: true
		},
		cItem: {
			type: Object,
			required: true
		}
	},
	methods: {
	}
}
</script>

<style lang="less" scoped>
.item {
	// width: 100%;
	width: 340upx;
	margin: 12rpx 0;
	background: #d6d6d6;
	border-radius: 10rpx;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;

	.product-img {
		width: 340rpx;
		height: 340rpx;
		border-radius: 20upx;
		overflow: hidden;
	}

	.product-bottom-box {
		padding: 20rpx;
		box-sizing: border-box;
		background: #fff;

		.product-name {
			display: block;
			font-size: 28rpx;
			color: #333;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.product-num {
			font-size: 24rpx;
			margin-top: 15rpx;
			border: 2rpx solid #E4E5E6;
			padding: 10rpx;
			display: inline-block;
		}

		.product-line-box {
			margin-top: 18rpx;
			display: flex;
			justify-content: space-between;
			flex-direction: row;
			align-items: center;
			flex-wrap: wrap;

			.product-price-box {
				flex: 1;
				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
				flex-wrap: wrap;
			}

			.product-price-box .price-through {
				text-decoration: line-through;
				font-size: 24rpx;
				color: #CCC;
			}
		}

	}
}

// .item:nth-of-type(2n) {
// 	margin-left: 2%;
// 	margin-right: 0;
// }
</style>
