<template>
	<view class="coupon-shop-list-container">
		<JHeader title="优惠券可用商品列表" width="50" height="50"></JHeader>

		<!-- 商品列表 -->
		<view>
			<view
				v-for="(item, index) in couponProductList" :key="index"
				class="goodsDetails-box flex-display flex-column mar-left-30"
				@click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${item.shopId}&productId=${item.productId}&skuId=${item.skuId}`)"
			>
				<view v-if="item.activityType === 0" class="goodsDetails flex-items-plus flex-row mar-top-30">
					<image class="goodsImg" :src="common.seamingImgUrl(item.image)"></image>
					<view class="mar-left-30">
						<view class="goodsName-box overflowNoDot">
							<label class="goodsName fs26">{{ item.productName }}</label>
						</view>
						<view class="priceBuyNum-box mar-top-20">
							<label class="fs24 font-color-C5AA7B">¥</label>
							<label class="fs36 font-color-C5AA7B mar-left-10">{{ item.price }}</label>
							<label v-if="item.users != null" class="fs24 font-color-999 mar-left-10">{{ item.users }}人付款</label>
							<label v-else class="fs24 font-color-999 mar-left-10">0人付款</label>
						</view>
						<view class="flex-display flex-sp-between flex-row mar-top-10 flex-items">
							<label class="fs22 font-color-999">{{ item.shopName }}</label>
							<tui-icon name="arrowright" :size="24" unit="rpx" color="#9f8a66" margin="0"></tui-icon>
						</view>
					</view>
				</view>
				<view v-else class="spikeList">
					<view class="listItem">
						<view class="itemBox">
							<image :src="common.seamingImgUrl(item.image)"></image>
						</view>
						<view class="itemInfo mar-top-30">
							<p>{{ item.productName }}</p>
							<view v-if="item.users != null" class="number">
								{{ item.users }}人付款 <span v-if="item.total != 0">
									，限量{{ item.total }}件
								</span>
							</view>
							<view v-else class="number">0人付款<span v-if="item.total != 0">，限量{{ item.total }}件</span></view>
							<view class="flex-row-plus flex-item mar-top-30">
								<view class="discountsPriceLine font-color-999">¥{{ item.originalPrice }}</view>
								<view class="mar-left-30 font-color-C5AA7B flex-row-plus">
									<ATFActivityImage :type="item.activityType"></ATFActivityImage>
									<b>￥</b>
									<label class="fs28">{{ item.price }}</label>
								</view>
							</view>
							<view class="flex-display flex-sp-between flex-row mar-top-10 flex-items">
								<label class="fs22 font-color-999">{{ item.shopName }}</label>
								<tui-icon name="arrowright" :size="24" unit="rpx" color="#9f8a66" margin="0"></tui-icon>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view style="padding-bottom: 45rpx;">
			<LoadingMore
				:status="!isEmpty && !couponProductList.length
					? 'loading' : !isEmpty && couponProductList.length && (couponProductList.length >= couponProductsTotal) ? 'no-more' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="isEmpty" :fixed="false" style="padding-top: 60rpx;">无可用商品</tui-no-data>
		</view>
	</view>
</template>

<script>
import { getCouponProductsApi } from '../../../api/anotherTFInterface'

export default {
	name: 'CouponShopList',
	data() {
		return {
			isEmpty: false,
			couponProductList: [],
			couponProductsTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20,
				activityId: null,
				shopCouponId: null
			}
		}
	},
	onLoad(option) {
		this.queryInfo.activityId = option.activityId
		this.queryInfo.shopCouponId = option.shopCouponId
		this.getCouponProductList()
	},
	methods: {
		getCouponProductList(isLoadmore) {
			uni.showLoading()
			getCouponProductsApi(this.queryInfo).then((res) => {
				this.couponProductsTotal = res.data.total
				if (isLoadmore) {
					this.couponProductList.push(...res.data.list)
				} else {
					this.couponProductList = res.data.list
				}
				this.isEmpty = this.couponProductList.length === 0
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		}
	},
	onReachBottom() {
		if (this.couponProductList.length < this.couponProductsTotal) {
			++this.queryInfo.page
			this.getCouponProductList(true)
		}
	}
}
</script>

<style lang="less" scoped>
input {
	padding-left: 80rpx;
}

.coupon-shop-list-container {
	min-height: 100vh;
	box-sizing: border-box;
	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}

	.goodsDetails-box {
		width: 690rpx;

		.goodsDetails {
			border-bottom: 1rpx solid #EDEDED;
			padding-bottom: 30rpx;

			.goodsName-box {
				width: 389rpx;
				height: 85rpx;
			}

			.goodsImg {
				width: 260rpx;
				height: 260rpx;
			}
		}

	}

	.spikeList {
		padding-top: 30rpx;
		border-bottom: 1rpx solid #EDEDED;

		.listItem {
			display: flex;
			border-bottom: 1rpx solid #EEEEEE;
			margin-bottom: 30rpx;

			&:last-child {
				border-bottom: none;
			}

			.itemBox {
				width: 260rpx;
				height: 260rpx;
				margin-right: 30rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.itemInfo {
				flex: 1;

				p {
					font-size: 26rpx;
					color: #333333;
					line-height: 40rpx;
					margin-bottom: 20rpx;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					line-clamp: 2;
					-webkit-box-orient: vertical;
				}

				.number {
					color: #999999;
					font-size: 26rpx;
				}
			}
		}
	}
}
</style>
