<template>
	<div v-if="productData.length > 0" class="hom-pro-list">
		<div class="product-swiper">
			<div class="product-swiper-box">
				<div v-for="(item, index) in productData.slice(0, 3)" :key="index" class="product-swiper-warp">
					<div class=" product-swiper-item" @click="jumpProductDetail(item)">
						<div class="product-swiper-img">
							<img class="img pic-img default-img" :src="item.image">
						</div>
						<div class="product-swiper-info">
							<label class="product-name">{{ item.productName }}</label>
							<div class="price-warp">
								<!-- #ifdef MP-WEIXIN -->
								<img v-if="item.activityType == 1" class="iconImg" src="../../../static/images/groupBuyIcon.png">
								<img v-if="item.activityType == 2" class="iconImg" src="../../../static/images/spikeIcon.png">
								<img v-if="item.activityType == 4" class="iconImg" src="../../../static/images/spikeIcon.png">
								<img v-if="item.activityType == 3" class="iconImg" src="../../../static/images/discountListIcon.png">
								<img v-if="item.activityType == 5" class="iconImg" src="../../../static/images/discountListIcon.png">
								<img v-if="item.activityType == 9" class="iconImg" src="../../../static/images/memberCenterIcon.png">
								<img
									v-if="item.activityType == 8" class="iconImg"
									src="../../../../../static/images/new-business/shop/jierizhekou.png"
								>
								<!-- #endif -->
								<!-- #ifdef H5 || APP-PLUS -->
								<image v-if="item.activityType == 1" class="iconImg" src="../../../static/images/groupBuyIcon.png">
								</image>
								<image v-if="item.activityType == 2" class="iconImg" src="../../../static/images/spikeIcon.png"></image>
								<image v-if="item.activityType == 4" class="iconImg" src="../../../static/images/spikeIcon.png"></image>
								<image v-if="item.activityType == 3" class="iconImg" src="../../../static/images/discountListIcon.png">
								</image>
								<image v-if="item.activityType == 5" class="iconImg" src="../../../static/images/discountListIcon.png">
								</image>
								<image v-if="item.activityType == 9" class="iconImg" src="../../../static/images/memberCenterIcon.png">
								</image>
								<image
									v-if="item.activityType == 8" class="iconImg"
									src="../../../../../static/images/new-business/shop/jierizhekou.png"
								>
								</image>
								<!-- #endif -->
								<div class="price">
									¥ {{ item.price }}
								</div>
								<!--                <div class="original-price"> -->
								<!--                  ¥ {{item.originalPrice}} -->
								<!--                </div> -->
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="pagination new-pagination"></div>
		</div>
		<button v-show="componentContent.showMore" class="btn-more" @click="jumpProList(componentContent.productData)">
			查看全部
			<span class="icon iconfont icon-arrow-right"></span>
		</button>
	</div>
</template>

<script>
import { commonMixin } from '../mixin'
export default {
	mixins: [ commonMixin ]
	// data () {
	// return {
	//   index: 1,
	//   swiperOption: {
	//     slidesPerView: 3,
	//     spaceBetween: 12,
	//     autoplay: false, // 可选选项，自动滑动
	//     loop: true,
	//     pagination: {
	//       el: '.new-pagination'
	//     }
	//   }
	// }
	// }
}
</script>

<style lang="scss" scoped>
.hom-pro-list {
	::v-deep .swiper-wrapper {
		position: static;
	}

	/**横向滑动**/
	.product-swiper {
		width: 100%;
		height: 454upx;
		padding: 90upx 34upx 0;
		background: url("../../../static/images/newProduct/bg-product-card.png") no-repeat center;
		background-size: 710upx 454upx;
		box-sizing: border-box;
		position: relative;

		&+.btn-more {
			margin-top: 20upx;
		}

		.title {
			padding: 22upx 0upx 0 0;

			label {
				background-image: none;
				color: #A56C4C;
				font-style: italic;
				padding: 0;
			}
		}

		&-box {
			padding-bottom: 20upx;
			display: flex;
		}

		&-warp {
			padding: 0 5upx;
		}

		&-item {
			width: 220upx;
			position: relative;
			background-color: #FFFFFF;
		}

		&-img {
			width: 220upx;
			height: 220upx;
			position: relative;

			&:after {
				content: '';
				display: block;
				width: 54upx;
				height: 54upx;
				background: url("../../../static/images/newProduct/flag-new.png") no-repeat;
				background-size: 100% 100%;
				position: absolute;
				top: 0;
				left: 0;
			}

			.img {
				width: 100%;
				height: 100%;
				object-fit: contain;
			}
		}

		&-info {
			background-color: #FFFFFF;
			padding: 10upx;
			text-align: center;

			.product-name {
				font-size: 20upx;
				color: #333;
				display: block;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin-bottom: 6upx;
				line-height: 28upx;
			}

			.price-warp {
				display: flex;
				justify-content: center;
				align-items: center;
				line-height: 28upx;

				.iconImg {
					width: 58rpx;
					height: 36rpx;
					margin-right: 10rpx;
				}

				.price {
					color: #C83732;
					font-size: 20upx;
					margin-right: 10upx;
				}

				.original-price {
					font-size: 16upx;
					color: #ccc;
					text-decoration: line-through;
				}
			}
		}
	}
}

.pagination {
	display: flex;
	justify-content: center;
	width: 100%;
	bottom: 0;

	::v-deep .swiper-pagination-bullet {
		width: 24upx;
		height: 4upx;
		background: #FFFFFF;
		opacity: 0.5;
		border-radius: 2upx;
		margin: 0 10upx;
	}

	::v-deep .swiper-pagination-bullet-active {
		opacity: 1;
	}
}

.btn-more {
	width: 170upx;
	height: 54upx;
	border: 2upx solid #C5AA7B;
	color: #C5AA7B;
	font-size: 24upx;
	background-color: transparent;
	margin: 20upx auto 0;
	display: flex;
	align-items: center;
}
</style>
