<template>
	<view class="coupon-product-container">
		<JHeader title="可用商品" width="50" height="50" style="padding: 24rpx 0 0;"></JHeader>
		<view class="productList">
			<view class="couponTit flex-items">
				<tui-icon name="coupon" :size="66" unit="rpx" color="#c83732" margin=" 0 15rpx 0 0"></tui-icon>
				<text v-if="currentCoupon.discountMode === 1" class="fs24 font-color-C83732">
					以下商品使用满{{ currentCoupon.fullMoney }}元减{{ currentCoupon.reduceMoney }}元的优惠券
				</text>
				<text v-else class="fs24 font-color-C83732">
					以下商品使用满{{ currentCoupon.fullMoney }}打{{ currentCoupon.reduceMoney }}折
				</text>
			</view>
			<view class="productListBox">
				<view v-if="productList && productList.length" class="productItemBox mar-top-30">
					<view
						v-for="(item, index) in productList" :key="item.productId" class="productItem"
						@click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${item.shopId}&productId=${item.productId}&skuId=${item.skuId}`)"
					>
						<view class="productImg">
							<image :src="common.seamingImgUrl(item.image)"></image>
						</view>
						<view class="productTit fs28 font-color-333">{{ item.productName }}</view>
						<view class="productPrice font-color-C83732 fs40">￥{{ item.price }}</view>
					</view>
				</view>
				<view style="padding-bottom: 45rpx;">
					<LoadingMore
						:status="!isEmpty && !productList.length
							? 'loading' : !isEmpty && productList.length && (productList.length >= productTotal) ? 'no-more' : ''"
					>
					</LoadingMore>
					<tui-no-data v-if="isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无可用商品～</tui-no-data>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getCanvasCouponsApi, getCouponProductsApi } from '../../../api/anotherTFInterface'

export default {
	name: 'Product',
	data() {
		return {
			couponId: 0,
			isEmpty: false,
			productList: [],
			productTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20
			},
			currentCoupon: {
				fullMoney: 0,
				reduceMoney: 0
			}
		}
	},
	onLoad(options) {
		this.couponId = options.id
		this.getCouponData()
		this.getProductList()
	},
	methods: {
		getCouponData() {
			getCanvasCouponsApi({
				page: 1,
				pageSize: 1,
				ids: this.couponId
			}).then((res) => {
				if (res.data) {
					this.currentCoupon = res.data.list[0]
				}
			})
		},
		getProductList(isLoadmore) {
			uni.showLoading()
			getCouponProductsApi(this.queryInfo).then((res) => {
				this.productTotal = res.data.total
				if (isLoadmore) {
					this.productList.push(...res.data.list)
				} else {
					this.productList = res.data.list
				}
				this.isEmpty = this.productList.length === 0
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		}
	},
	onReachBottom() {
		if (this.productList.length < this.productTotal) {
			++this.queryInfo.page
			this.getProductList(true)
		}
	}
}
</script>

<style lang="less" scoped>
.coupon-product-container {
	padding: 0 20rpx;
	min-height: 100%;
	background-color: #ffffff;
	box-sizing: border-box;

	.productList {
		.couponTit {
			padding: 0 20rpx;
			height: 86rpx;
			background: #F9F6F1;
		}

		.productListBox {
			.productItemBox {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				width: 100%;

				.productItem {
					box-sizing: border-box;
					width: 49%;
					padding: 0 20rpx;
					height: 420rpx;
					margin: 0 0 20rpx 0;

					&:nth-child(2n) {
						margin-right: 0;
					}

					.productImg {
						width: 282rpx;
						height: 282rpx;

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
		}
	}
}
</style>
