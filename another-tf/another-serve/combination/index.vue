<template>
	<view class="combination-container">
		<JHeader :dark="false" title="组合优惠" width="50" height="50" style="padding: 24rpx 0 0;"></JHeader>
		<view class="topInfo">
			<view class="topBg">
				<swiper circular autoplay vertical :duration="2000">
					<swiper-item v-for="(item, index) in ruleList" :key="index">
						<view>{{ item.price }}元任选{{ item.number }}件</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view style="padding: 0 20rpx;">
			<view
				v-if="productList && productList.length"
				style="display: flex;align-items: center;flex-wrap: wrap;margin: 0 -15rpx;"
			>
				<view
					v-for="(item, index) in productList" :key="index"
					style="width: 340rpx;margin: 0 15rpx 30rpx;background: #FFFFFF;"
					@click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${item.shopId}&productId=${item.productId}&skuId=${item.skuId}`)"
				>
					<image :src="common.seamingImgUrl(item.image)" style="width: 340rpx;height: 310rpx;" mode="aspectFit"></image>
					<view style="padding: 20rpx;">
						<view
							style="color: #333333;font-size: 28rpx;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;margin-bottom: 15rpx;"
						>
							{{ item.productName }}
						</view>
						<view
							style="color: #C5AA7B;font-size: 20rpx;font-weight: 400;border: 2rpx solid #E4E5E6;display: inline;padding: 5rpx 10rpx;"
						>
							{{ item.number }}人付款
						</view>
						<view style="display: flex;align-items: center;justify-content: space-between;">
							<view style="font-size: 40rpx;color: #C83732;">￥{{ item.price }}</view>
							<view @click.stop="handleShowGoodsSkuSelect(item)">
								<tui-icon v-if="item.selected === 0" name="cart" :size="54" unit="rpx" color="#cccccc"></tui-icon>
								<tui-icon v-else name="cart-fill" :size="54" unit="rpx" color="#333333"></tui-icon>
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

		<!-- 商品详情 -->
		<tui-bottom-popup :show="isShowDetails" @close="isShowDetails = false">
			<view class="goosDetailshow-box">
				<view class="detailImg-box flex-row-plus">
					<image class="detailImg default-img" :src="common.seamingImgUrl(selectedSku.image)"></image>
					<view class="flex-column-plus mar-left-40">
						<view class="font-color-C5AA7B">
							<label class="fs24">¥</label>
							<label
								class="fs36 mar-left-10"
								v-text="selectedSku.price"
							></label>
						</view>
						<label class="fs24 font-color-999 mar-top-20">库存 {{ selectedSku.stockNumber }} 件</label>
						<label class="fs24 mar-top-20">已选</label>
					</view>
				</view>

				<view style="flex: 1;height: 0;overflow: hidden;padding: 30rpx;font-size: 26rpx;">
					<scroll-view scroll-y style="height: 100%;max-height: 50vh;">
						<view v-for="nameItem in goodsDetail.names" :key="nameItem.nameCode" style="padding-bottom: 30rpx;">
							<view v-if="nameItem.nameCode" style="color: #333333;">
								{{ nameItem.skuName }}
							</view>
							<view style="display: flex;flex-wrap: wrap;align-items: center;margin: 0 -15rpx;">
								<view
									v-for="tag in nameItem.values" :key="tag.valueCode"
									style="background-color: #FFFFFF;margin: 24rpx 15rpx 0;padding: 10rpx 32rpx;" :style="{
										boxShadow: selectedAttr[nameItem.nameCode] === tag.valueCode ? '0 0 20rpx rgba(0, 0, 0, 0.1)' : 'none',
										color: selectedAttr[nameItem.nameCode] === tag.valueCode ? '#C5AA7B' : tag.ifEnable ? '#cccccc' : '#333333',
										border: selectedAttr[nameItem.nameCode] === tag.valueCode ? '2rpx solid #ffffff' : '2rpx solid #E4E5E6'
									}" @click="handleClickSkuItem(nameItem.nameCode, tag)"
								>
									{{ tag.skuValue }}
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="goodsNum-box flex-row-plus flex-sp-between">
					<label class="font-color-999 fs24">数量</label>
					<view class="goodsNum">
						<text class="subtract" @click="handleNumSub()">-</text>
						<text class="goodsNumber">{{ number }}</text>
						<text class="add" @click.stop="handleNumAdd()">+</text>
					</view>
				</view>

				<view style="padding: 0 18rpx 30rpx;">
					<view style="display: flex;align-items: center;justify-content: space-around;">
						<tui-button
							type="gray" width="190rpx" height="80rpx" plain
							margin="0" :disabled="!selectedSku.stockNumber"
							style="font-size: 28rpx;color: #333333!important;border-radius: 8rpx;" @click="isShowDetails = false"
						>
							取消
						</tui-button>
						<tui-button
							type="black" width="190rpx" height="80rpx" margin="0"
							:disabled="!selectedSku.stockNumber"
							style="font-size: 28rpx;color: #ffebc4!important;border-radius: 8rpx;" @click="handleAddCart"
						>
							确定
						</tui-button>
					</view>
				</view>
			</view>
		</tui-bottom-popup>
	</view>
</template>

<script>
import { resolveGoodsDetailSkuSituation, resolveGoodsDetailTagsSituation, getShopCartApi } from '../../../utils'
import { getSelectByPriceIdApi, getSelectProductListByPriceIdApi, getProductDetailsByIdApi, addCartShoppingApi } from '../../../api/anotherTFInterface'

export default {
	name: 'Combination',
	data() {
		return {
			ruleList: [],
			isEmpty: false,
			productList: [],
			productTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20,
				priceId: null
			},
			isShowDetails: false, // 规格选择
			goodsDetail: {
				names: []
			},
			number: 1,
			selectedSku: {
				image: '',
				price: '',
				originalPrice: '',
				stockNumber: 0
			},
			selectedAttr: {}
		}
	},
	onLoad(option) {
		this.queryInfo.priceId = option.priceId
		// 获取定价
		getSelectByPriceIdApi({
			priceId: this.queryInfo.priceId
		}).then((res) => {
			this.ruleList = res.data
		})
		this.getSelectProductListByPriceId()
	},
	methods: {
		getSelectProductListByPriceId(isLoadmore) {
			uni.showLoading()
			getSelectProductListByPriceIdApi(this.queryInfo).then((res) => {
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

		async handleShowGoodsSkuSelect(productItem) {
			this.goodsDetail = { names: [] }
			this.selectedAttr = {}
			uni.showLoading()
			try {
				const res = await getProductDetailsByIdApi({
					shopId: productItem.shopId,
					productId: productItem.productId,
					skuId: productItem.skuId,
					terminal: 1
				})
				this.goodsDetail = res.data
				const skuCollectionListKeys = Object.keys(this.goodsDetail.map)
				if ((skuCollectionListKeys.length === 1) && (skuCollectionListKeys[0] === '单款项')) {
					this.goodsDetail.names[0].values.push({
						skuValue: this.goodsDetail.names[0].skuName,
						valueCode: '单款项'
					})
				}
				skuCollectionListKeys.forEach((skuValueCodeItem) => {
					if (!this.goodsDetail.map[skuValueCodeItem].image) this.goodsDetail.map[skuValueCodeItem].image = this.goodsDetail.images[0]
				})
				this.goodsDetail = await resolveGoodsDetailSkuSituation(this.goodsDetail)
				this.$nextTick(() => {
					if (productItem.skuId) {
						this.handleSelectBySkuId(productItem.skuId)
					} else {
						this.goodsDetail.names.forEach((nameItem) => {
							this.handleClickSkuItem(nameItem.nameCode, nameItem.values[0])
						})
					}
					this.isShowDetails = true
				})
			} finally {
				uni.hideLoading()
			}
		},
		handleSelectBySkuId(skuId) {
			if (!skuId) return
			Object.keys(this.goodsDetail.map).forEach((skuValueCodeItem) => {
				if (this.goodsDetail.map[skuValueCodeItem].skuId === skuId) {
					this.goodsDetail.names.forEach((nameItem) => {
						nameItem.values.some((tag) => {
							if (this.goodsDetail.map[skuValueCodeItem].valueCodes.split(',').includes(tag.valueCode)) {
								this.handleClickSkuItem(nameItem.nameCode, tag)
								return true
							}
							return false
						})
					})
				}
			})
		},
		handleClickSkuItem(nameCode, tagItem) {
			if (tagItem.ifEnable) return
			const { goodsDetail, selectedAttr } = resolveGoodsDetailTagsSituation(this.goodsDetail, this.selectedAttr, nameCode, tagItem)
			this.selectedAttr = selectedAttr
			this.goodsDetail = goodsDetail
			this.selectedSku = Object.values(this.goodsDetail.map).find((skuItem) => skuItem.valueCodes.split(',').every((nameCodeItem) => Object.values(this.selectedAttr).includes(nameCodeItem))) || {}
		},

		handleNumSub() {
			if (this.number > 1) {
				this.number = this.number - 1
			} else {
				uni.showToast({
					title: '亲！至少一件哦！',
					icon: 'none'
				})
			}
		},
		handleNumAdd() {
			if (this.number < this.selectedSku.stockNumber) {
				this.number = this.number + 1
			} else {
				uni.showToast({
					title: '库存不足！',
					icon: 'none'
				})
			}
		},

		// 加入购物车
		async handleAddCart() {
			if (!this.selectedSku.skuId) return this.$showToast('请选择商品')
			if (this.selectedSku.ifEnable) return this.$showToast('该商品不可售')
			if (this.selectedSku.stockNumber < 1) return this.$showToast('该商品库存不足')
			if (this.selectedSku.stockNumber && (this.number > this.selectedSku.stockNumber)) return this.$showToast('已超出最大数量限制')
			uni.showLoading()
			let splicingId
			await getShopCartApi({ shopId: this.goodsDetail.shopId }).then((res) => {
				splicingId = (res.data[0] && res.data[0].splicingId) || 0
			})
			try {
				await addCartShoppingApi({
					skuId: this.selectedSku.skuId,
					number: this.number,
					splicingId
				})
				uni.showToast({
					title: '添加成功',
					icon: 'none'
				})
				setTimeout(() => {
					this.number = 1
					this.isShowDetails = false
					uni.showModal({
						title: '温馨提示',
						content: '商品已成功加入购物车？',
						confirmText: '去结算',
						cancelText: '继续添加',
						success: (res) => {
							if (res.confirm) {
								this.go('/another-tf/another-serve/shopCar/shopCar')
							} else if (res.cancel) {
							}
						}
					})
				}, 2000)
			} finally {
				uni.hideLoading()
			}
		}
	},
	onReachBottom() {
		if (this.productList.length < this.productTotal) {
			++this.queryInfo.page
			this.getSelectProductListByPriceId(true)
		}
	}
}
</script>

<style lang="less" scoped>
.combination-container {
	background-color: #333333;
	min-height: 100vh;
	box-sizing: border-box;

	/deep/ .tui-popup-class.tui-bottom-popup {
		height: 85vh !important;
	}

	.topInfo {
		margin: 40rpx 0;

		.topBg {
			margin: 30rpx auto;
			width: 670rpx;
			height: 86rpx;
			line-height: 86rpx;
			text-align: center;
			background-color: #d5bd90;
			overflow: hidden;
		}
	}
}

.goosDetailshow-box {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 0 0 44rpx;
	height: 100%;
	overflow-y: auto;
	box-sizing: border-box;

	.detailImg-box {
		margin-top: 30rpx;
		margin-left: 30rpx;
		border-bottom: 2rpx solid #EDEDED;
		padding-bottom: 20rpx;

		.detailImg {
			width: 180rpx;
			height: 180rpx;
		}
	}

	.goodsNum-box {
		padding: 30rpx 30rpx;
		padding-bottom: 200rpx;

		.goodsNum {
			height: 50rpx;

			text {
				display: inline-block;
				width: 50rpx;
				height: 50rpx;
				border: 1rpx solid #999999;
				text-align: center;
				line-height: 50rpx;
			}

			.subtract {
				border-right: 0rpx;
			}

			.add {
				border-left: 0rpx;
			}
		}
	}
}
</style>
