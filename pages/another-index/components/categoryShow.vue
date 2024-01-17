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
									<image class="iconImg" :src="getPriceActivity(item.activityType)" />
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
			<view style="padding-bottom: 45upx;">
				<tui-no-data v-if="!loading && productList.length < 0" :fixed="false" style="margin-top: 60upx;">这里空空如也</tui-no-data>
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
	computed: {
		// 获取活动小图标
		getPriceActivity() {
			return (activityType) => {
				switch (activityType) {
					case 1:
						return require('../../../static/images/new-business/shop/groupBuyIcon.png')
					case 2:
						return require('../../../static/images/new-business/shop/spikeIcon.png')
					case 3:
						return require('../../../static/images/new-business/shop/discountListIcon.png')
					case 4:
						return require('../../../static/images/new-business/shop/spikeIcon.png')
					case 5:
						return require('../../../static/images/new-business/shop/discountListIcon.png')
					case 8:
						return require('../../../static/images/new-business/shop/memberCenterIcon.png')
				}
			}
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
		padding: 0 13upx;
		width: 100%;

		//min-height: 60vh;
		&-box {
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;

			&.swiper {
				height: 620upx;
			}
		}

		&.product-swiper .product-list-box {
			padding-left: 0;
		}

		&-item-warp {
			margin: 0 0 20upx 0;
		}

		&-item {
			width: 348upx;
			padding: 0 7upx;
			box-sizing: content-box;
		}

		&-img {
			width: 348upx;
			height: 348upx;
			background-color: #d0d0d0;
			border-radius: 10upx 10upx 0 0;

			.img {
				width: 100%;
				height: 100%;
				object-fit: contain;
			}
		}

		&-info {
			background-color: #FFFFFF;
			//box-shadow: 0px 0px 15px 0px rgba(52, 52, 52, 0.15);
			border-radius: 0 0 10upx 10upx;
			padding: 20upx;

			label {
				font-weight: normal;
			}

			.product-name {
				font-size: 28upx;
				color: #333;
				display: block;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin-bottom: 18upx;
				line-height: 40upx;
			}

			.flex {
				display: flex;
				align-items: center;
			}

			.shop-box {
				background-color: #333333;
				border-radius: 0upx 20upx 20upx 0upx;
				line-height: 40upx;
				display: flex;
				align-items: center;
				height: 40upx;
				margin-right: 10upx;
				float: left;

				.shop-name {
					font-size: 20upx;
					color: #FFEBC4;
					padding: 0 8upx 0 12upx;
					line-height: 40upx;
					display: inline-block;
					float: left;
					max-width: 170rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.shop-logo {
					border: 2upx solid #707070;
					border-radius: 50%;
					overflow: hidden;
					float: right;

					img {
						width: 34upx;
						height: 34upx;
						display: block;
					}
				}
			}

			.buy-count {
				color: #C5AA7B;
				font-size: 20upx;
				border: 2upx solid #E4E5E6;
				line-height: 36upx;
				padding: 0 5upx;
			}

			.price-warp {
				display: flex;
				align-items: baseline;
				line-height: 56upx;

				.iconImg {
					width: 58rpx;
					height: 36rpx;
					margin-right: 10rpx;
				}

				.price {
					color: #C83732;
					font-size: 40upx;
					margin-right: 20upx;
				}

				.original-price {
					font-size: 24upx;
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
