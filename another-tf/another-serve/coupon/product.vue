<template>
	<view class="couponProduct">
		<global-loading />

		<view class="productList">
			<view class="couponTit flex-items">
				<!-- <image src="../../static/images/origin/counponTitIcon.png"></image> -->
				<text v-if="currentCoupon.discountMode === 1" class="fs24 font-color-C83732">
					以下商品使用满{{ currentCoupon.fullMoney
					}}元减{{ currentCoupon.reduceMoney }}元的优惠券
				</text>
				<text v-else class="fs24 font-color-C83732">
					以下商品使用满{{ currentCoupon.fullMoney }}打{{ currentCoupon.reduceMoney
					}}折
				</text>
			</view>
			<view class="productListBox">
				<view v-if="!ifEmpty" class="productItemBox mar-top-30">
					<view
						v-for="(item, index) in productList" :key="item.productId" class="productItem"
						@click="goodsDateils(item.shopId, item.productId, item.skuId)"
					>
						<view class="productImg">
							<image :src="item.image"></image>
						</view>
						<view class="productTit fs28 font-color-333">{{ item.productName }}</view>
						<view class="productPrice font-color-C83732 fs40">￥{{ item.price }}</view>
					</view>
				</view>
				<view v-if="ifEmpty" class="emptyOrder-box flex-items-plus flex-column">
					<label class="font-color-999 fs26 mar-top-30">暂无可用商品～</label>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
// import NET from '../../utils/request'
// import API from '../../config/api'

export default {
	name: 'ProductLIst',
	data() {
		return {
			productList: [],
			page: 1,
			pageSize: 10,
			loadingType: 0,
			currentCoupon: {
				fullMoney: 0,
				reduceMoney: 0
			},
			cid: 0,
			ifEmpty: false
		}
	},
	onReachBottom() {
		if (this.loadingType == 1) {
			uni.stopPullDownRefresh()
		} else {
			this.page = this.page + 1
			this.getProductList()
		}
	},
	onLoad(options) {
		if (options.id) {
			this.cid = options.id
			this.getCoupon()
			this.getProductList()
		}
	},
	methods: {
		getCoupon() {
			NET.request(API.getCoupons, {
				page: 1,
				pageSize: 1,
				ids: this.cid
			}, 'GET').then((res) => {
				if (res.data) {
					this.currentCoupon = res.data.list[0]
				}
			})
				.catch((res) => {

				})
		},
		getProductList() {
			// uni.showLoading({
			//   title: '加载中...',
			// })
			NET.request(API.getCouponProducts, {
				activityId: this.cid,
				page: this.page,
				pageSize: this.pageSize
			}, 'GET').then((res) => {
				uni.hideLoading()
				if (res.data.list.length === 0) {
					this.loadingType = 1
				} else {
					this.productList = this.productList.concat(res.data.list)
				}
				if (this.productList.length === 0) {
					this.ifEmpty = true
				}
			})
				.catch((res) => {
					// uni.hideLoading()
				})
		},
		// 商品详情
		goodsDateils(shopId, productId, skuId) {
			uni.navigateTo({
				url: '/pages_category_page1/goodsModule/goodsDetails?shopId=' + shopId + '&productId=' + productId + '&skuId=' + skuId
			})
		}
	}
}
</script>

<style lang="scss" scoped>
page {
	background: #FFFFFF;
}

.couponProduct {
	padding: 0 20rpx;

	.productList {
		.couponTit {
			padding: 0 20rpx;
			height: 86rpx;
			background: #F9F6F1;

			image {
				width: 66rpx;
				height: 46rpx;
				margin-right: 15rpx;
			}
		}
	}
}

.productListBox {
	.productItemBox {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		width: 100%;

		.productItem {
			padding: 0 20rpx;
			height: 420rpx;
			flex: 1;
			margin: 0 20rpx 20rpx 0;
			width: calc((100% - 20rpx) / 2);
			min-width: calc((100% - 20rpx) / 2);
			max-width: calc((100% - 20rpx) / 2);

			&:nth-child(2n) {
				margin-right: 0;
			}

			.productImg {
				width: 325rpx;
				height: 325rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.productTit {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.productPrice {
				margin-top: 15rpx;
			}
		}
	}

	.emptyOrder-box {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;

		.emptyOrder-img {
			width: 325rpx;
			height: 325rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>
