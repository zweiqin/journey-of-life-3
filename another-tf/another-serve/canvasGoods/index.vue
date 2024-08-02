<template>
	<view class="container">
		<JHeader title="商品列表" width="50" height="50" style="padding: 24rpx 0 0;"></JHeader>
		<view v-if="goodsList.length > 0" class="listBox">
			<view
				v-for="(item, index) in goodsList" :key="index" class="goodsDetails-box flex-display flex-column"
				@click="goodsDateils(item.shopId, item.productId, item.skuId)"
			>
				<view v-if="item.activityType === 0" class="goodsDetails flex-items-plus flex-row">
					<image class="goodsImg default-img" :src="item.image"></image>
					<view class="mar-left-30">
						<view class="goodsName-box overflowNoDot">
							<label class="goodsName fs26">{{ item.productName }}</label>
						</view>
						<view class="usersBox">
							<label v-if="item.users != null" class="fs24 font-color-C5AA7B">{{ item.users }}人付款</label>
							<label v-else class="fs24 font-color-C5AA7B">0人付款</label>
						</view>
						<view class="priceBuyNum-box flex-items mar-top-20">
							<view>
								<label class="fs30 font-color-C83732">¥</label>
								<label class="fs36 font-color-C83732 mar-left-10">{{ item.price }}</label>
							</view>
							<view style="margin-left: 20rpx; color: #CCCCCC;text-decoration:line-through">
								<label class="fs24">¥{{ item.originalPrice }}</label>
							</view>
						</view>
						<view class="flex-display flex-sp-between flex-row mar-top-10 flex-items shopName">
							<label class="fs22 font-color-FFEBC4">{{ item.shopName }}</label>
						</view>
					</view>
				</view>
				<view v-else class="spikeList goodsDetails">
					<view class="listItem">
						<view class="itemBox">
							<img :src="item.image" class="pic-img default-img">
						</view>
						<view class="itemInfo mar-top-30">
							<p>{{ item.productName }}</p>
							<view v-if="item.users != null" class="number">
								<view class="numText">{{ item.users }}人付款</view>
							</view>
							<view class="flex-row-plus flex-item mar-top-30">
								<ATFActivityImage :type="item.activityType"></ATFActivityImage>
								<view class="font-color-C83732 flex-row-plus">
									<b>￥</b>
									<label class="fs28">{{ item.price }}</label>
								</view>
								<view class="mar-left-30 discountsPriceLine font-color-999">¥{{ item.originalPrice }}</view>
							</view>
							<view class="flex-display flex-sp-between flex-row mar-top-10 flex-items shopName">
								<label class="fs22 font-color-FFEBC4">{{ item.shopName }}</label>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 搜索为空 -->
		<view style="padding-bottom: 45rpx;">
			<LoadingMore
				:status="!isEmpty && !goodsList.length
					? 'loading' : !isEmpty && goodsList.length && (goodsList.length >= goodsTotal) ? 'no-more' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无数据</tui-no-data>
		</view>
	</view>
</template>

<script>
import { getProducts2CanvasApi } from '../../../api/anotherTFInterface'

export default {
	name: 'CanvasGoods',
	data() {
		return {
			isEmpty: false,
			goodsList: [],
			goodsTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20,
				ids: [],
				classifyId: 0
			},
			source: 2,
			sourceType: ''
		}
	},
	onLoad(option) {
		if (option.sourceType) {
			this.sourceType = option.sourceType
			if (option.sourceType === '1') {
				this.queryInfo.ids = option.ids
			} else if (option.sourceType === '2') {
				this.queryInfo.classifyId = option.classifyId
			}
		}
		this.searchList()
	},
	methods: {
		searchList(isLoadmore) {
			var params = {
				page: this.queryInfo.page,
				pageSize: this.queryInfo.pageSize
			}
			if (this.sourceType === '1') {
				if (this.queryInfo.ids && this.queryInfo.ids.length > 0) {
					params.ids = this.queryInfo.ids
				}
			} else if (this.sourceType === '2') {
				if (this.queryInfo.classifyId) {
					params.classifyId = this.queryInfo.classifyId
				}
			}
			if (params.ids || params.classifyId) {
				uni.showLoading()
				getProducts2CanvasApi(params).then((res) => {
					this.goodsTotal = res.data.total
					if (isLoadmore) {
						this.goodsList.push(...res.data.list)
					} else {
						this.goodsList = res.data.list
					}
					this.isEmpty = this.goodsList.length === 0
					uni.hideLoading()
				})
					.catch((e) => {
						uni.hideLoading()
					})
			}
		},
		// 商品详情
		goodsDateils(shopId, productId, skuId) {
			uni.navigateTo({
				url: '/another-tf/another-serve/goodsDetails/index?shopId=' + shopId + '&productId=' + productId + '&skuId=' + skuId
			})
		}
	},
	onReachBottom() {
		if (this.goodsList.length < this.goodsTotal) {
			++this.queryInfo.page
			this.searchList(true)
		}
	}
}
</script>

<style lang="less" scoped>
input {
	padding-left: 80rpx;
}

.container {
	background-color: #f8f8f8;
	min-height: 100vh;
	box-sizing: border-box;

	.goodsDetails-box {
		background: #FFFFFF;
		margin-top: 20rpx;
		box-sizing: border-box;

		.goodsDetails {
			border-bottom: 1rpx solid #EDEDED;
			padding-top: 30rpx;
			padding-bottom: 30rpx;
			position: relative;

			.goodsName-box {
				width: 389rpx;
				height: 85rpx;
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
			// padding-bottom: 10rpx;
			border-bottom: 1rpx solid #EEEEEE;
			margin-bottom: 30rpx;

			&:last-child {
				border-bottom: none;
			}

			.itemBox {
				width: 260rpx;
				height: 260rpx;
				margin-right: 30rpx;

				img {
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
	}

	.listBox {
		padding: 0 24rpx;
		box-sizing: border-box;

		.usersBox {
			margin-top: 20rpx;

			label {
				padding: 10rpx;
				border: 2rpx solid #E4E5E6;
			}
		}
	}
}
</style>
