<template>
	<div class="content">
		<tui-bottom-popup :show="isShowDetails" @close="isShowDetails = false">
			<view class="goosDetailshow-box">
				<view class="detailImg-box flex-row-plus">
					<image class="detailImg" :src="common.seamingImgUrl(selectedSku.image)"></image>
					<view class="flex-column-plus mar-left-40">
						<view class="font-color-C5AA7B">
							<label class="fs24">¥</label>
							<label
								class="fs36 mar-left-10"
								v-text="selectedSku.activityType === 1 && btnType === 4 ? selectedSku.salePrice : selectedSku.price"
							></label>
						</view>
						<label class="fs24 font-color-999 mar-top-20">库存 {{ selectedSku.stockNumber }} 件</label>
						<label class="fs24 mar-top-20">已选</label>
					</view>
				</view>
				<view class="color-box">
					<scroll-view scroll-y style="max-height: 50vh;">
						<view v-for="(skuRowItem, skuRowIndex) in goodsDetail.names" :key="skuRowIndex">
							<label v-if="skuRowItem.nameCode" class="fs26 font-color-333">
								{{ skuRowItem.skuName }}
							</label>
							<view class="colorName-box">
								<view v-for="(skuColItem, skuColIndex) in skuRowItem.values" :key="skuColIndex" class="pad-bot-30">
									<view
										class="colorName"
										:class="{ 'colorName-on': selectedAttr[skuRowItem.nameCode] === skuColItem.valueCode }"
										@click="handleClickSkuItem(skuRowItem.nameCode, skuColItem.valueCode)"
									>
										{{ skuColItem.skuValue }}
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="goodsNumCent">
					<view class="goodsNum-box flex-row-plus flex-sp-between">
						<label class="font-color-333 fs26">数量</label>
						<view class="goodsNum">
							<view class="item subtract" @click="handleNumSub">
								-
							</view>
							<view class="item goodsNumber">
								{{ number }}
							</view>
							<view class="item add" @click="handleNumAdd">
								+
							</view>
						</view>
					</view>
				</view>

				<view v-if="btnType === 6" class="skuSelectBtn">
					<view v-if="goodsDetail.shelveState === 0" class="flex-row-plus offShelf">
						商品已下架
					</view>
					<view v-else-if="selectedSku.activityType === 1" class="flex-row-plus flex-items flex-sp-around">
						<view class="selectJoinShop selectBtn font-color-333" @click="handleBuyNow">
							单独购买
						</view>
						<view class="selectBuyNow selectBtn font-color-FFEBC4" @click="handleBuyWithGroup">
							我要开团
						</view>
					</view>
					<view v-else class="flex-row-plus flex-items flex-sp-around">
						<view class="selectJoinShop selectBtn font-color-333" @click="handleAddCart">
							加入购物车
						</view>
						<view class="selectBuyNow selectBtn font-color-FFEBC4" @click="handleBuyNow">
							立即购买
						</view>
					</view>
				</view>
				<view v-else>
					<view
						v-if="(selectedSku.activityType === 1) && collageId" class="goosDetailbut-box flex-items-plus"
						:style="{ 'padding-bottom': (isIphone === true ? 60 : 20) + 'rpx' }"
					>
						<view class="joinbuyBut" @click="handleBuyWithGroup">
							确定
						</view>
					</view>
					<view
						v-else-if="(selectedSku.activityType === 1) && (btnType === 3)" class="goosDetailbut-box flex-row-plus"
						:style="{ 'padding-bottom': (isIphone === true ? 60 : 20) + 'rpx' }"
					>
						<view class="buyNowBut" @click="handleBuyWithGroup">
							去拼团
						</view>
					</view>
					<view
						v-else class="goosDetailbut-box flex-row-plus"
						:style="{ 'padding-bottom': (isIphone === true ? 60 : 20) + 'rpx' }"
					>
						<view v-if="btnType === 1" class="buyNowBut" @click="handleAddCart">
							确认
						</view>
						<view v-else class="buyNowBut" @click="handleBuyNow">
							确认
						</view>
					</view>
				</view>
			</view>
		</tui-bottom-popup>
	</div>
</template>

<script>
import { addCartShoppingApi, addUserTrackReportDoPointerApi, getCartListApi } from '../../../../api/anotherTFInterface'
import { T_SKU_ITEM_DTO_LIST, T_SKU_ITEM_LIST } from '../../../../constant'

export default {
	name: 'GoodSkuSelect',
	props: {
		goodsDetail: {
			type: Object,
			default: () => ({})
		},
		collageId: {
			type: Number,
			default: () => 0
		}
	},
	data() {
		return {
			isIphone: getApp().globalData.isIphone,
			// 是否展示SKU弹窗
			isShowDetails: false,
			// 已经选中的valueCode key => value  names.nameCode=>values.valueCode 处理选中渲染
			selectedAttr: {},
			// 当前选中的skuMap对象（服务端数据）
			selectedSku: {},
			// 1加入购物车 2立即购买 3开团 4单独购买 6SKU选择
			btnType: 0,
			number: 1
		}
	},
	methods: {
		// 根据skuId选择SKU
		handleSelectBySkuId(skuId) {
			if (!skuId) return
			// 当前商品后端返回的所有sku的排列组合
			Object.keys(this.goodsDetail.map).forEach((allSkuValueCodeMap) => {
				if (this.goodsDetail.map[allSkuValueCodeMap].skuId === skuId) {
					this.selectedSku = this.goodsDetail.map[allSkuValueCodeMap]
					this.$emit('current-select-sku', { selectedSku: this.selectedSku, currentSku: this.getCurrentSkuName(), number: this.number })
					// 控制组件选中渲染
					this.goodsDetail.names.forEach((skuRow) => {
						skuRow.values.some((skuCol) => {
							if (this.selectedSku.valueCodes.split(',').includes(skuCol.valueCode)) {
								this.$set(this.selectedAttr, skuRow.nameCode, skuCol.valueCode)
								return true
							}
							return false
						})
					})
				}
			})
		},

		// 点击sku的一项
		handleClickSkuItem(nameCode, valueCode) {
			// 当前选中
			this.$set(this.selectedAttr, nameCode, valueCode)
			Object.keys(this.goodsDetail.map).forEach((allSkuValueCodeMap) => {
				// 当和当前选中的sku一致
				if (Object.values(this.selectedAttr).join(',') === allSkuValueCodeMap) {
					this.selectedSku = this.goodsDetail.map[allSkuValueCodeMap]
					this.$emit('current-select-sku', { selectedSku: this.selectedSku, currentSku: this.getCurrentSkuName(), number: this.number })
				}
			})
		},

		// 获取选择后的文本显示
		getCurrentSkuName() {
			if (this.selectedSku.valueCodes) {
				const currentSku = []
				this.goodsDetail.names.forEach((skuRow) => {
					skuRow.values.some((skuValue) => {
						if (this.selectedSku.valueCodes.split(',').includes(skuValue.valueCode)) {
							if (skuValue.valueCode === '单款项') {
								currentSku.push({ skuText: skuValue.skuValue })
							} else {
								currentSku.push({ skuText: `${skuValue.skuName}：${skuValue.skuValue}` })
							}
							return true
						}
						return false
					})
				})
				return currentSku
			}
			return []
		},

		// 当前SKU数量减少
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

		// 当前SKU数量加
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
			if (this.selectedSku.stockNumber < 1) {
				return uni.showToast({
					title: '库存不足',
					icon: 'none'
				})
			}
			uni.showLoading()
			try {
				await addCartShoppingApi({
					skuId: this.selectedSku.skuId,
					number: this.number
				})
				// 埋点
				addUserTrackReportDoPointerApi({
					eventType: 2,
					productIds: this.goodsDetail.productId
				})
				// 给购物车小图标赋值数量
				getCartListApi({}).then((res) => {
					this.$emit('changeCartNum', res.data.reduce((total, value) => total + value.skus.reduce((t, v) => t + (v.shelveState ? v.number : 0), 0), 0))
				})
				uni.showToast({
					title: '添加成功',
					icon: 'none'
				})
				setTimeout(() => {
					this.number = 1
					this.isShowDetails = false
				}, 2000)
			} finally {
				uni.hideLoading()
			}
		},

		/**
		 * 立即购买（下单）
		 */

		handleBuyNow() {
			if (this.selectedSku.stockNumber < 1) {
				return uni.showToast({
					title: '库存不足',
					icon: 'none'
				})
			}
			if (this.number > this.selectedSku.stockNumber && this.selectedSku.stockNumber !== 0) {
				return uni.showToast({
					title: '已超出最大数量限制',
					icon: 'none'
				})
			}
			// 组装后端数据
			const list = [ {
				ifWork: 0,
				shopId: this.goodsDetail.shopId,
				shopName: this.goodsDetail.shopName,
				shopDiscountId: this.goodsDetail.shopDiscountId || '',
				shopSeckillId: this.goodsDetail.shopSeckillId || '',
				skus: [ {
					productId: this.goodsDetail.productId,
					skuId: this.selectedSku.skuId,
					productName: this.goodsDetail.productName,
					image: this.selectedSku.image,
					price: this.selectedSku.price,
					weight: 0,
					number: this.number,
					SKU: '',
					total: this.selectedSku.price * this.number,
					ifLogistics: 1
				} ]
			} ]
			uni.setStorageSync(T_SKU_ITEM_DTO_LIST, list)
			this.number = 1
			this.isShowDetails = false
			uni.navigateTo({
				url: '/another-tf/another-serve/orderConfirm/index?type=1'
			})
		},

		/**
		 * 拼团下单
		 * @param type 1单独开团2拼团
		 */

		handleBuyWithGroup() {
			if (this.selectedSku.stockNumber < 1) return this.$showToast('库存不足')
			const data = {
				number: this.number,
				productId: this.goodsDetail.productId,
				shopId: this.goodsDetail.shopId,
				skuId: this.selectedSku.skuId,
				shopGroupWorkId: this.selectedSku.shopGroupWorkId,
				type: this.collageId ? 2 : 1,
				collageId: this.collageId
			}
			uni.removeStorageSync(T_SKU_ITEM_DTO_LIST)
			uni.setStorageSync(T_SKU_ITEM_LIST, data)
			this.isShowDetails = false
			this.number = 1
			uni.navigateTo({
				url: '/another-tf/another-serve/orderConfirm/index?type=3'
			})
		}
	}
}
</script>

<style lang="less" scoped>
.goosDetailshow-box {
	margin-bottom: -5upx;

	.detailImg-box {
		margin-top: 30upx;
		margin-left: 30upx;
		border-bottom: 1upx solid #EDEDED;
		padding-bottom: 20upx;
		width: 690upx;

		.detailImg {
			width: 180upx;
			height: 180upx;
		}
	}

	.color-box {
		padding: 30upx 30upx;
		width: 690upx;

		.colorName-box {
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			margin-top: 30upx;
			margin-left: -30upx;

			.colorName {
				background-color: #FFFFFF;
				margin-left: 30upx;
				padding: 10upx 32upx;
				font-size: 26upx;
				border: 2rpx solid #E4E5E6;
				z-index: 2;
				color: #333333;
			}

			.colorName-on {
				box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.1);
				color: #C5AA7B;
				margin-left: 30upx;
				padding: 10upx 32upx;
				font-size: 26upx;
				text-align: center;
				z-index: 1;
				border: none;
			}
		}

	}

	.goodsNumCent {
		padding: 0 30upx;

		.goodsNum-box {
			width: 100%;
			padding: 30rpx 0 180rpx 0;
			border-top: 2rpx solid #EDEDED;

			.goodsNum {
				height: 50upx;
				display: flex;
				align-items: center;

				.item {
					width: 50upx;
					height: 50upx;
					line-height: 48rpx;
					border: 1upx solid #999999;
					text-align: center;
				}

				.subtract {
					border-right: 0upx;
				}

				.goodsNumber {
					line-height: 50rpx;
				}

				.add {
					border-left: 0upx;
				}
			}
		}
	}

	.goosDetailbut-box {
		justify-content: center;

		.buyNowBut {
			width: 90%;
			height: 90upx;
			background-color: #333333;
			font-size: 28upx;
			line-height: 90upx;
			text-align: center;
			color: #FFEBC4;
		}
	}
}

.skuSelectBtn {
	padding-bottom: 30rpx;

	.selectBtn {
		width: 342rpx;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		border: 2rpx solid #333333;
		font-size: 28rpx;
		border-radius: 8rpx;
	}

	.selectBuyNow {
		background: #333333;
	}
}

.joinbuyBut {
	width: 190upx;
	height: 80upx;
	background: #333333;
	color: #FFEBC4;
	font-size: 28upx;
	line-height: 80upx;
	text-align: center;
	margin-left: 30upx;
}
</style>
