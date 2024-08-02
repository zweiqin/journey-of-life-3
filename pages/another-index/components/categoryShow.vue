<template>
	<view class="goodRecommend">
		<LoadingMore v-if="isFirst" :status="loading ? 'loading' : 'no-more'"></LoadingMore>
		<template v-if="!isFirst">
			<view class="product-list">
				<view class="product-list-box">
					<view v-for="(item, index) in productList" :key="index" class="product-list-item-warp">
						<view class="product-list-item">
							<view class="product-list-img" @click="handleJumpProductDetail(item)">
								<img v-show="item.image" class="img" :src="item.image">
							</view>
							<view class="product-list-info u-skeleton-fillet">
								<view class="product-name">{{ item.productName }}</view>
								<view class="flex">
									<view class="shop-box" @click.stop="handleJumpStore(item)">
										<view class="shop-name" @click="handleJumpProductDetail(item)">
											{{ item.shopName }}
										</view>
										<view class="shop-logo">
											<img :src="item.shopLogo">
										</view>
									</view>
									<view class="buy-count">{{ item.users ? item.users : 0 }}人付款</view>
								</view>
								<div class="price-warp">
									<ATFActivityImage :type="item.activityType"></ATFActivityImage>
									<div class="price">
										¥ {{ item.price }}
									</div>
									<div class="original-price">
										¥ {{ item.originalPrice }}
									</div>
								</div>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 空状态 -->
			<view style="padding-bottom: 45rpx;">
				<tui-no-data v-if="!loading && productList.length < 0" :fixed="false" style="padding-top: 60rpx;">这里空空如也</tui-no-data>
			</view>

			<!-- 底部提示 -->
			<ListBottomTips
				v-show="loading || total !== 0 && total === productList.length" :loading="loading"
				:type="productList.length < total ? 1 : 0"
			/>
		</template>
	</view>
</template>

<script>
import { getProducts2CanvasApi } from '../../../api/anotherTFInterface'
import ListBottomTips from './ListBottomTips'

export default {
	name: 'CategoryShow',
	components: {
		ListBottomTips
	},
	props: {
		classifyId: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			page: 1,
			pageSize: 10,
			total: 0,
			productList: [],
			isFirst: true,
			loading: true // 是否正在请求
		}
	},
	watch: {
		'classifyId': {
			handler() {
				this.handleResetList()
				this.handleResetPage()
				this.handleGetProductData()
			},
			deep: true
		}
	},
	mounted() {
		this.handleResetList()
		this.handleResetPage()
		this.handleGetProductData()
	},
	methods: {
		// 重设苏族
		handleResetList() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			})
			this.isFirst = true
			this.productList = []
		},
		handleResetPage() {
			this.total = 0
			this.page = 1
		},
		// 获取商品数据
		handleGetProductData() {
			if (this.total !== 0 && this.productList.length >= this.total) {
				return
			}
			this.loading = true
			getProducts2CanvasApi({
				classifyId: this.classifyId,
				page: this.page,
				pageSize: this.pageSize
			}).then((res) => {
				this.productList = [...this.productList, ...res.data.list]
				this.total = res.data.total
			})
				.catch((err) => {
					throw Error(err)
				})
				.finally(() => {
					this.loading = false
					this.isFirst = false
				})
		},
		// 跳转到店铺主页
		handleJumpStore(item) {
			uni.navigateTo({
				url: `/another-tf/another-user/shop/shop-detail?shopId=${item.shopId}`
			})
		},
		// 跳转到商品详情
		handleJumpProductDetail(item) {
			uni.navigateTo({
				url: '/another-tf/another-serve/goodsDetails/index?shopId=' + item.shopId + '&productId=' + item.productId + '&skuId=' + item.skuId
			})
		}
	}
}
</script>

<style
    lang="scss"
    scoped
>
.goodRecommend {
	padding-top: 20rpx;

	.product-list {
		position: relative;
		padding: 0 13rpx;
		width: 100%;

		//min-height: 60vh;
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
			background-color: #d0d0d0;
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
				float: left;

				.shop-name {
					font-size: 20rpx;
					color: #FFEBC4;
					padding: 0 8rpx 0 12rpx;
					line-height: 40rpx;
					display: inline-block;
					float: left;
					max-width: 170rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
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
				line-height: 36rpx;
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
	}

	.emptyCart-box {
		margin-top: 70rpx;

		.emptyCart-img {
			width: 216rpx;
			height: 156rpx;
		}
	}
}
</style>
