<template>
	<div class="hom-pro-list">
		<div class="title">
			<!-- #ifdef MP-WEIXIN -->
			<img class="title-img" src="../../../static/images/product/img-title.png" alt="商品推荐" mode="widthFix" />
			<!-- #endif -->
			<!-- #ifdef H5 || APP-PLUS -->
			<image class="title-img" src="../../../static/images/product/img-title.png" alt="商品推荐" mode="widthFix" />
			<!-- #endif -->
		</div>
		<div v-if="componentContent.arrangeType == '横向滑动' && productData.length > 2" class="product-list">
			<swiper
				ref="mySwiper" class="swiper product-list-box" :circular="true" :indicator-dots="false"
				:autoplay="true"
				:display-multiple-items="2" @change="swiperChange"
			>
				<swiper-item v-for="(item, index) in productData" :key="index" class="product-list-item-warp">
					<div v-if="JSON.stringify(item) !== '{}'" class="product-list-item" @click="jumpProductDetail(item)">
						<div class="product-list-img">
							<img class="img pic-img default-img" :src="item.image">
						</div>
						<div class="product-list-info">
							<label class="product-name">{{ item.productName }}</label>
							<div class="flex">
								<div v-if="typeId == 1" class="shop-box" @click.stop="jumpStore(item)">
									<label class="shop-name">{{ item.shopName }}</label>
									<div class="shop-logo">
										<img :src="item.shopLogo">
									</div>
								</div>
								<label class="buy-count">已售{{ item.number ? item.number : 0 }}件</label>
							</div>
							<div class="price-warp">
								<!-- #ifdef MP-WEIXIN || H5 || APP-PLUS -->
								<ATFActivityImage :type="item.activityType"></ATFActivityImage>
								<!-- #endif -->
								<div class="price">
									¥ {{ item.price }}
								</div>
								<div class="original-price">
									¥ {{ item.originalPrice }}
								</div>
							</div>
						</div>
					</div>
					<!-- 自定义骨架屏 -->
					<div v-else class="product-list-item ske-loading">
						<div class="product-list-img child-loading">

						</div>
						<div class="product-list-info">
							<label class="product-name child-loading"></label>
							<div class="price-warp child-loading" style="padding: 5px 0">
							</div>
							<div class="price-warp child-loading" style="padding: 5px 0">
							</div>
						</div>
					</div>
				</swiper-item>
			</swiper>
			<view v-if="productData && productData.length > 2" class="swiper-dots">
				<text
					v-for="(dot, index) in productData.length" :key="index" class="dot"
					:class="index - swiperCurrent <= 1 && index - swiperCurrent >= 0 && 'dot-active'"
				></text>
			</view>
		</div>
		<div v-else class="product-list">
			<LoadingMore v-if="isFirst" :status="loading ? 'loading' : 'no-more'"></LoadingMore>
			<div v-else class="product-list-box">
				<!-- <div class="product-list-box"> -->
				<div v-for="(item, index) in productData" :key="index" class="product-list-item-warp">
					<div class="product-list-item" @click="jumpProductDetail(item)">
						<div class="product-list-img">
							<img class="img pic-img default-img" :src="item.image">
						</div>
						<div class="product-list-info">
							<label class="product-name">{{ item.productName }}</label>
							<div class="flex">
								<div v-if="typeId == 1" class="shop-box" @click.stop="jumpStore(item)">
									<label class="shop-name">{{ item.shopName }}</label>
									<div class="shop-logo">
										<img :src="item.shopLogo">
									</div>
								</div>
								<label class="buy-count">已售{{ item.number ? item.number : 0 }}件</label>
							</div>
							<div class="price-warp">
								<!-- #ifdef MP-WEIXIN || H5 || APP-PLUS -->
								<ATFActivityImage :type="item.activityType"></ATFActivityImage>
								<!-- #endif -->
								<div class="price">
									¥ {{ item.price }}
								</div>
								<div v-if="item.originalPrice && item.originalPrice > item.price" class="original-price">
									¥ {{ item.originalPrice }}
								</div>
							</div>
							<div style="display: flex;align-items: center;flex-wrap: wrap;">
								<div
									v-if="item.voucherId && item.voucherPrice"
									style="width: fit-content;padding: 6upx 12upx;margin: 10upx 6upx 0 0;background-color: #f0f0f0;font-size: 28upx;color: #fa5151;border-radius: 22upx;"
								>
									可使用{{ item.voucherPrice }}代金券抵扣
								</div>
								<div
									v-if="item.presenterVoucher"
									style="width: fit-content;padding: 6upx 12upx;margin: 10upx 6upx 0 0;background-color: #f0f0f0;font-size: 28upx;color: #fa5151;border-radius: 22upx;"
								>
									赠送 {{ item.price
										? `${(Number.parseFloat(item.presenterVoucher / item.price).toFixed(3) * 1000) / 10}%`
										: item.presenterVoucher }} 代金券
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<button v-show="componentContent.showMore" class="btn-more" @click="jumpProList(componentContent.productData)">
			查看全部 <span class="icon iconfont icon-arrow-right"></span>
		</button>
	</div>
</template>

<script>
import { commonMixin } from '../mixin'
export default {
	components: {
	},
	mixins: [ commonMixin ],
	data() {
		return {
			swiperCurrent: 0
		}
	},
	methods: {
		swiperChange(e) {
			this.swiperCurrent = e.detail.current
		}
	}
}
</script>

<style
    lang="scss"
    scoped
>
.hom-pro-list {
	padding: 20rpx 13rpx;

	.title {
		text-align: center;
		margin-bottom: 20rpx;

		.title-img {
			width: 211rpx;
		}
	}

	/**多行多列**/
	.product-list {
		position: relative;

		&-box {
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;

			&.swiper {
				height: 620rpx;
			}
		}

		&.product-swiper .product-list-box {
			padding-left: 0;
		}

		&-item-warp {
			margin: 0 0 20rpx 0;
		}

		&-item {
			width: 348rpx;
			padding: 0 7rpx;
			box-sizing: content-box;
		}

		&-img {
			width: 348rpx;
			height: 348rpx;
			background-color: #f5f5f5;
			border-radius: 10rpx 10rpx 0 0;

			.img {
				width: 100%;
				height: 100%;
				object-fit: contain;
			}
		}

		&-info {
			background-color: #FFFFFF;
			//box-shadow: 0px 0px 15px 0px rgba(52, 52, 52, 0.15);
			border-radius: 0 0 10rpx 10rpx;
			padding: 20rpx;

			label {
				font-weight: normal;
			}

			.product-name {
				font-size: 28rpx;
				color: #333;
				display: block;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin-bottom: 18rpx;
				line-height: 40rpx;
			}

			.flex {
				display: flex;
				align-items: center;
			}

			.shop-box {
				background-color: #333333;
				border-radius: 0rpx 20rpx 20rpx 0rpx;
				line-height: 40rpx;
				display: flex;
				align-items: center;
				height: 40rpx;
				margin-right: 10rpx;

				.shop-name {
					font-size: 20rpx;
					color: #FFEBC4;
					padding: 0 8rpx 0 12rpx;
				}

				.shop-logo {
					border: 2rpx solid #707070;
					border-radius: 50%;
					overflow: hidden;
					float: right;

					img {
						width: 34rpx;
						height: 34rpx;
						display: block;
					}
				}
			}

			.buy-count {
				color: #C5AA7B;
				font-size: 20rpx;
				border: 2rpx solid #E4E5E6;
				line-height: 40rpx;
				padding: 0 5rpx;
			}

			.price-warp {
				display: flex;
				align-items: baseline;
				line-height: 56rpx;

				.price {
					color: #C83732;
					font-size: 40rpx;
					margin-right: 20rpx;
				}

				.original-price {
					font-size: 24rpx;
					color: #ccc;
					text-decoration: line-through;
				}
			}
		}

		//::v-deep .swiper-pagination-bullet{
		//  display: none;
		//}
	}
}

//::v-deep .uni-swiper-dots{
//  display: flex;
//  justify-content: center;
//  padding: 10rpx 0;
//  .uni-swiper-dot{
//    width: 10rpx;
//    height: 10rpx;
//    background: #333333;
//    opacity: 0.3;
//    border-radius: 5rpx;
//    margin: 0 5rpx;
//    &-active{
//      width: 20rpx;
//      height: 10rpx;
//      opacity: 1;
//    }
//  }
//}
.swiper-dots {
	display: flex;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	bottom: 15rpx;
	z-index: 66;

	.dot {
		width: 10rpx;
		height: 10rpx;
		background: #333333;
		opacity: 0.3;
		border-radius: 5rpx;
		margin: 0 10rpx;
	}

	.dot-active {
		width: 20rpx;
		opacity: 1;
	}
}

//.pagination{
//  display: flex;
//  justify-content: center;
//  padding: 20rpx 0;
//  ::v-deep .swiper-pagination-bullet{
//    width: 10rpx;
//    height: 10rpx;
//    background: #333333;
//    opacity: 0.3;
//    border-radius: 5rpx;
//    margin: 0 5rpx;
//  }
//  ::v-deep .swiper-pagination-bullet-active{
//    width: 20rpx;
//    height: 10rpx;
//    opacity: 1;
//  }
//}

.btn-more {
	width: 170rpx;
	height: 54rpx;
	line-height: 54rpx;
	border: 2rpx solid #C5AA7B;
	color: #C5AA7B;
	font-size: 24rpx;
	background-color: transparent;
	margin: 20rpx auto 0;
	display: flex;
	align-items: center;
}
</style>
