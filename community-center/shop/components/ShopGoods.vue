<template>
	<view class="item" @click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${shopId}&productId=${cItem.productId}&skuId=${cItem.skuId}`)">
		<image :src="cItem.image" class="product-img default-img"></image>
		<view class="product-bottom-box">
			<view class="product-name">{{ cItem.productName }}</view>
			<view class="product-num font-color-C5AA7B mar-top-10">
				已售{{ cItem.number }}件
			</view>
			<view class="product-price-box">
				<image
					v-if="cItem.activityType === 1" class="iconImg"
					src="../../../static/images/new-business/shop/groupBuyIcon.png" alt="拼团icon"
				></image>
				<image
					v-if="cItem.activityType === 2" class="iconImg"
					src="../../../static/images/new-business/shop/spikeIcon.png" alt="秒杀活动"
				>
				</image>
				<image
					v-if="cItem.activityType === 3" class="iconImg discountIcon"
					src="../../../static/images/new-business/shop/xianshizhekou.png" alt="限时折扣活动"
				></image>
				<image
					v-if="cItem.activityType === 4" class="iconImg"
					src="../../../static/images/new-business/shop/spikeIcon.png" alt="平台秒杀"
				>
				</image>
				<image
					v-if="cItem.activityType === 5" class="iconImg"
					src="../../../static/images/new-business/shop/discountListIcon.png" alt="平台折扣"
				></image>
				<image
					v-if="cItem.activityType === 9" class="iconImg"
					src="../../../static/images/new-business/shop/memberCenterIcon.png" alt="会员价"
				></image>
				<image
					v-if="cItem.activityType === 8" class="iconImg"
					src="../../../static/images/new-business/shop/jierizhekou.png" alt="场景营销"
				></image>
				<text class="price-box fs40 font-color-C83732 mar-right-20">
					￥{{ cItem.price }}
				</text>
				<text class="price-through">￥{{ cItem.originalPrice }}</text>
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

	.product-img {
		width: 340rpx;
		height: 340rpx;
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

		.product-price-box {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-top: 30rpx;

			.iconImg {
				width: 58rpx;
				height: 36rpx;
				margin-right: 10rpx;
			}

			.discountIcon {
				width: 100rpx;
			}
		}

		.product-price-box .price-through {
			text-decoration: line-through;
			font-size: 24rpx;
			color: #CCC;
		}
	}
}

// .item:nth-of-type(2n) {
// 	margin-left: 2%;
// 	margin-right: 0;
// }
</style>
