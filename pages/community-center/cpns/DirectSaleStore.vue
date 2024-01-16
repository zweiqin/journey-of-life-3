<template>
	<div
		v-if="shopInfo" class="direct-sale-store-container"
		@click="go(`/another-tf/another-user/shop/shop-detail?shopId=${shopInfo.shopId}`)"
	>
		<view class="item-1">
			<view class="shop-name">{{ shopInfo.shopName }}</view>
			<button class="uni-btn">进店</button>
		</view>

		<view v-if="shopInfo.shopNameSimple" class="tags">
			<view class="tag">{{ shopInfo.shopNameSimple }}</view>
			<!-- <view class="tag">官方直营</view> -->
		</view>

		<view v-if="shopInfo.mainBusiness" class="description">主营：{{ shopInfo.mainBusiness }}</view>

		<scroll-view v-if="shopImageList.length" scroll-x="true">
			<view class="image-list">
				<image
					v-for="img in shopImageList" :key="img" class="shop-img"
					:style="{ width: shopImageList.length === 1 ? '100%' : '' }" :src="img"
				></image>
			</view>
		</scroll-view>
	</div>
</template>

<script>
export default {
	props: {
		shopInfo: {
			type: Object
		}
	},

	computed: {
		shopImageList() {
			if (this.shopInfo && this.shopInfo.rotationChart) {
				return this.shopInfo.rotationChart.split(',')
			} else if (this.shopInfo && this.shopInfo.businessLicense) {
				return this.shopInfo.businessLicense.split(',')
			}
			return []
		}
	}
}
</script>

<style lang="less" scoped>
.direct-sale-store-container {
	width: 100%;
	margin-bottom: 18upx;

	.item-1 {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.shop-name {
			color: 32upx;
			font-weight: 500;
			color: #222229;
		}

		.uni-btn {
			width: 107upx;
			height: 49upx;
			border-radius: 8upx;
			background: linear-gradient(270deg, #ef5410 0%, #ee682d 100%);
			display: flex;
			align-items: center;
			color: #fff;
			font-size: 28upx;
			justify-content: center;
			transition: all 350ms;

			&:active {
				opacity: 0.7;
			}
		}
	}

	.tags {
		display: flex;
		align-items: center;
		margin: 14upx 0;

		.tag {
			font-size: 24upx;
			color: #ef530e;
			line-height: 1.5;
			padding: 4upx 10upx;
			border-radius: 8upx;
			background-color: #fdf6ec;
			margin-right: 15upx;
		}
	}

	.description {
		font-size: 24upx;
		color: #888889;
		width: 500upx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.image-list {
		display: flex;
		margin: 18upx 0;

		.shop-img {
			width: 358upx;
			height: 218upx;
			border-radius: 20upx;
			margin-right: 20upx;
			flex-shrink: 0;
		}
	}
}
</style>
