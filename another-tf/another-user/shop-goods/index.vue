<template>
	<view class="shop-goods-container">
		<JHeader title="商家商品列表" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view class="flex-items-plus flex-row search">
			<view class="searchBg">
				<view class="searchImg-box flex-items-plus">
					<tui-icon style="position: absolute;left: 0;" name="search" :size="50" unit="upx" color="#d1d1d1"></tui-icon>
					<input
						v-model="queryInfo.search" class="search-box" maxlength="20" placeholder-class="searchboxPlace"
						placeholder="请输入您想要的宝贝"
					/>
				</view>
				<label class="mar-left-40 fs28" @click="queryInfo.search && (queryInfo.page = 1) && getShopGoodsTemplate()">
					搜索
				</label>
			</view>
		</view>
		<view style="display: flex;align-items: center;justify-content: space-around;padding: 10upx 0;font-size: 26upx;">
			<view :style="{ color: queryInfo.ifNew === 1 ? '#ff7911' : queryInfo.ifNew === 0 ? '#8dbcbd' : '#000000' }" @click="handleGoodsSortTap(1)">
				<text>新品</text>
			</view>
			<view :style="{ color: sortGoodsIndex === 2 ? '#ff7911' : '#000000' }" @click="handleGoodsSortTap(2)">
				<text>价格</text>
				<tui-icon
					v-if="[1, 2].includes(queryInfo.type)"
					:name="queryInfo.type === 1 ? 'turningup' : queryInfo.type === 2 ? 'turningdown' : ''"
					color="#666666" :size="16"
				></tui-icon>
			</view>
			<view :style="{ color: sortGoodsIndex === 3 ? '#ff7911' : '#000000' }" @click="handleGoodsSortTap(3)">
				<text>销量</text>
				<tui-icon
					v-if="[1, 2].includes(queryInfo.volume)"
					:name="queryInfo.volume === 1 ? 'turningup' : queryInfo.volume === 2 ? 'turningdown' : ''"
					color="#666666" :size="16"
				></tui-icon>
			</view>
		</view>
		<!-- 商品列表 -->
		<view v-if="goodsList && goodsList.length" class="listBox">
			<view
				v-for="(item, index) in goodsList" :key="index" class="goodsDetails-box flex-display flex-column"
				@click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${item.shopId}&productId=${item.productId}&skuId=${item.skuId}`)"
			>
				<view class="spikeList goodsDetails">
					<view class="listItem">
						<view class="itemBox">
							<image :src="common.seamingImgUrl(item.image)" class="pic-img default-img"></image>
						</view>
						<view class="itemInfo">
							<p>{{ item.productName }}</p>
							<view v-if="item.number != null" class="number">
								<view class="numText">已售{{ item.number }}件</view>
								<view v-if="item.total && item.activityType" class="numText">
									限量{{ item.total }}件
								</view>
							</view>
							<view class="flex-row-plus flex-item mar-top-30">
								<ATFActivityImage :type="item.activityType"></ATFActivityImage>
								<view class="font-color-C83732 flex-row-plus">
									<b>￥</b>
									<label class="fs28">{{ item.price }}</label>
								</view>
								<view
									v-if="item.originalPrice && item.originalPrice > item.price"
									class="mar-left-30 discountsPriceLine font-color-999"
								>
									¥{{ item.originalPrice }}
								</view>
							</view>
							<view style="display: flex;align-items: center;flex-wrap: wrap;">
								<view
									v-if="item.voucherId && item.voucherPrice"
									style="width: fit-content;padding: 6upx 12upx;margin: 10upx 6upx 0 0;background-color: #f0f0f0;font-size: 28upx;color: #fa5151;border-radius: 22upx;"
								>
									可使用{{ item.voucherPrice }}代金券抵扣
								</view>
								<view
									v-if="item.presenterVoucher"
									style="width: fit-content;padding: 6upx 12upx;margin: 10upx 6upx 0 0;background-color: #f0f0f0;font-size: 28upx;color: #fa5151;border-radius: 22upx;"
								>
									赠送 {{ item.price
										? `${(Number.parseFloat(item.presenterVoucher / item.price).toFixed(3) * 1000) / 10}%`
										: item.presenterVoucher }} 代金券
								</view>
							</view>
							<!-- <view class="flex-display flex-sp-between flex-row mar-top-20 flex-items shopName">
								<label class="fs22 font-color-FFEBC4">{{ item.shopName }}</label>
								</view> -->
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="padding-bottom: 45upx;">
			<LoadingMore
				:status="!isEmpty && !goodsList.length
					? 'loading' : !isEmpty && goodsList.length && (goodsList.length >= goodsTotal) ? 'no-more' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="isEmpty" :fixed="false" style="margin-top: 60upx;">暂无数据</tui-no-data>
		</view>
	</view>
</template>

<script>
import { getShopProductsApi } from '../../../api/anotherTFInterface'

export default {
	name: 'ShopGoods',
	data() {
		return {
			sortGoodsIndex: 1,
			isEmpty: false,
			goodsList: [],
			goodsTotal: 0,
			queryInfo: {
				shopId: '',
				groupId: '',
				search: '',
				ifNew: 1,
				type: 1,
				volume: 0,
				page: 1,
				pageSize: 20
			}
		}
	},
	onLoad(option) {
		if (option.shopId) {
			this.queryInfo.shopId = option.shopId
		}
		if (option.groupId) {
			this.queryInfo.groupId = option.groupId
		}
		this.getShopGoodsTemplate()
	},

	methods: {
		handleGoodsSortTap(index) {
			this.queryInfo.page = 1
			this.goodsList = []
			this.sortGoodsIndex = index
			if (index === 1) {
				this.queryInfo.ifNew = this.queryInfo.ifNew ? 0 : 1
				this.queryInfo.type = ''
				this.queryInfo.volume = ''
			} else if (index === 2) {
				this.queryInfo.ifNew = ''
				this.queryInfo.type = this.queryInfo.type === 1 ? 2 : 1
				this.queryInfo.volume = ''
			} else if (index === 3) {
				this.queryInfo.ifNew = ''
				this.queryInfo.type = ''
				this.queryInfo.volume = this.queryInfo.volume === 1 ? 2 : 1
			}
			this.getShopGoodsTemplate()
		},
		getShopGoodsTemplate(isLoadmore) {
			uni.showLoading()
			getShopProductsApi(this.queryInfo)
				.then((res) => {
					this.goodsTotal = res.data.page.total
					if (isLoadmore) {
						this.goodsList.push(...res.data.page.list)
					} else {
						this.goodsList = res.data.page.list
					}
					this.isEmpty = this.goodsList.length === 0
					uni.hideLoading()
				})
				.catch((e) => {
					uni.hideLoading()
				})
		}
	},
	onReachBottom() {
		if (this.goodsList.length < this.goodsTotal) {
			++this.queryInfo.page
			this.getShopGoodsTemplate(true)
		}
	}
}
</script>

<style lang="less" scoped>
input {
	padding-left: 80upx;
}

.shop-goods-container {
	position: relative;
	min-height: 100%;
	background-color: #f8f8f8;
	box-sizing: border-box;

	.search {
		padding: 20rpx;
		padding-top: 20rpx;
		background: #FFFFFF;
		border-top: 2rpx solid #F3F4F5;
		position: relative;
		z-index: 2;
	}

	.searchImg-box {
		position: relative;
	}

	.searchBg {
		width: 100%;
		display: flex;
		background-color: #F7F7F7;
		align-items: center;
		height: 78rpx;
		justify-content: space-between;
		padding: 0 20rpx;

		label {
			font-weight: 400;
			color: #333333;
		}
	}

	.search-box {
		width: 400upx;
		height: 66upx;
	}

	.searchboxPlace {
		font-size: 26upx;
		color: #A9A9A9;
		padding-right: 30upx;
	}

	.goodsDetails-box {
		background: #FFFFFF;
		margin-top: 20rpx;

		.spikeList {
			border-bottom: 1upx solid #EDEDED;
			padding-top: 30rpx;
			padding-bottom: 30upx;
			position: relative;

			.listItem {
				display: flex;
				border-bottom: 1upx solid #EEEEEE;
				padding-left: 30rpx;

				&:last-child {
					border-bottom: none;
				}

				.itemBox {
					width: 220upx;
					height: 220upx;
					margin-right: 30upx;

					img {
						width: 100%;
						height: 100%;
					}
				}

				.itemInfo {
					flex: 1;

					p {
						font-size: 26upx;
						color: #333333;
						line-height: 40upx;
						margin-bottom: 30upx;
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
						font-size: 26upx;
						display: flex;
						align-items: center;

						.numText {
							padding: 0 10rpx;
							height: 40rpx;
							line-height: 40rpx;
							border: 2rpx solid #E4E5E6;
							color: #C5AA7B;
							font-size: 20rpx;
							margin-right: 10rpx;
						}
					}
				}
			}

			.shopName {
				position: absolute;
				left: 0;
				top: 0;
				height: 50rpx;
				background: #333333;
				opacity: 1;
				border-radius: 0 20rpx 20rpx 0;
				padding: 10rpx 15rpx;
			}
		}
	}

	.listBox {
		padding: 0 24rpx;
	}
}
</style>
