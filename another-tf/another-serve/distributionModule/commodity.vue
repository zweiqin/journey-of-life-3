<template>
	<view class="commodity-container">
		<JHeader title="推广商品" width="50" height="50"></JHeader>
		<view>
			<view v-if="productList && productList.length">
				<view
					v-for="(item, index) in productList" :key="index"
					class="goodsDetails-box flex-display flex-column mar-left-30"
					@click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${queryInfo.shopId}&productId=${item.productId}&skuId=${item.skuId}`)"
				>
					<view class="goodsDetails flex-items-plus flex-row mar-top-30">
						<image class="goodsImg" :src="common.seamingImgUrl(item.image)"></image>
						<view class="mar-left-30">
							<view class="goodsName-box overflowNoDot">
								<label class="goodsName fs26 mar-left-20">{{ item.productName }}</label>
							</view>
							<view class="priceBuyNum-box mar-top-20">
								<label class="fs24 font-color-C5AA7B">¥</label>
								<label class="fs36 font-color-C5AA7B mar-left-10">{{ item.price }}</label>
								<label v-if="item.users" class="fs24 font-color-999 mar-left-20">{{ item.users }}人付款</label>
								<label v-else class="fs24 font-color-999 mar-left-20">0人付款</label>
							</view>
							<view class="fenxiang" @click.stop="fenxiang(item)">
								分享
							</view>
						</view>
					</view>
				</view>
			</view>
			<view style="padding-bottom: 45rpx;">
				<LoadingMore
					:status="!isEmpty && !productList.length
						? 'loading' : !isEmpty && productList.length && (productList.length >= productTotal) ? 'no-more' : ''"
				>
				</LoadingMore>
				<tui-no-data v-if="isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无数据</tui-no-data>
			</view>
		</view>
	</view>
</template>

<script>
import { getExtensionProductDistributorApi, getProductSharePicApi } from '../../../api/anotherTFInterface'

export default {
	name: 'Commodity',
	data() {
		return {
			distributorId: 0,
			isEmpty: false,
			productList: [],
			productTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20,
				shopId: 0
			}
		}
	},
	onLoad(options) {
		this.queryInfo.shopId = options.shopId
		this.distributorId = options.distributorId
		this.getStoreProductDataList()
	},
	methods: {
		getStoreProductDataList(isLoadmore) {
			uni.showLoading()
			getExtensionProductDistributorApi(this.queryInfo).then((res) => {
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
		},
		fenxiang(item) {
			let system
			// #ifdef APP
			system = 1
			// #endif
			// #ifdef H5
			system = 3
			// #endif
			// #ifdef MP-WEIXIN
			system = 2
			// #endif
			// #ifdef MP-ALIPAY
			system = 4
			// #endif
			uni.showLoading()
			getProductSharePicApi({
				productId: item.productId,
				shopId: item.shopId,
				skuId: item.skuId,
				terminal: system
			}).then((res) => {
				uni.hideLoading()
				// 推广商品
				uni.navigateTo({
					url: `/another-tf/another-serve/distributionModule/shareProduct?shareType=2&shopId=${item.shopId}&productId=${item.productId}&skuId=${item.skuId}&shareImg=${res.data}&salesId=${this.distributorId}`
				})
			})
				.catch((e) => {
					uni.hideLoading()
				})
		}
	},
	onReachBottom() {
		if (this.productList.length < this.productTotal) {
			++this.queryInfo.page
			this.getStoreProductDataList(true)
		}
	}
}
</script>

<style lang="less" scoped>
.commodity-container {
	min-height: 100%;
	box-sizing: border-box;
	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}

	.goodsDetails-box {
		width: 690rpx;

		.goodsDetails {
			position: relative;
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

	.fenxiang {
		height: 50rpx;
		line-height: 50rpx;
		width: 120rpx;
		color: #FFEBC4;
		text-align: center;
		position: absolute;
		background-color: #333333;
		right: 10rpx;
	}
}
</style>
