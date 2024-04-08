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
						<view class="fs24 font-color-999 mar-top-20">库存 {{ selectedSku.stockNumber }} 件</view>
						<view style="display: flex;align-items: center;flex-wrap: wrap;">
							<view
								v-if="selectedSku.voucherId"
								style="width: fit-content;margin-top: 10upx;margin-right: 12upx;padding: 6upx 12upx;background-color: #f0f0f0;font-size: 28upx;color: #fa5151;border-radius: 22upx;"
							>
								可使用{{ selectedSku.voucherPrice }}代金券抵扣
							</view>
							<view
								v-if="selectedSku.presenterVoucher"
								style="width: fit-content;margin-top: 10upx;padding: 6upx 12upx;background-color: #f0f0f0;font-size: 28upx;color: #fa5151;border-radius: 22upx;"
							>
								赠送 {{ selectedSku.price
									? `${(Number.parseFloat(selectedSku.presenterVoucher / selectedSku.price).toFixed(3) * 1000) / 10}%`
									: selectedSku.presenterVoucher }} 代金券
							</view>
						</view>
					</view>
				</view>

				<view style="flex: 1;height: 0;overflow: hidden;padding: 30upx;font-size: 26rpx;">
					<scroll-view scroll-y style="height: 100%;max-height: 50vh;">
						<view v-for="nameItem in goodsDetail.names" :key="nameItem.nameCode" style="padding-bottom: 30rpx;">
							<view v-if="nameItem.nameCode" style="color: #333333;">
								{{ nameItem.skuName }}
							</view>
							<view style="display: flex;flex-wrap: wrap;align-items: center;margin: 0 -15rpx;">
								<view
									v-for="tag in nameItem.values" :key="tag.valueCode"
									style="background-color: #FFFFFF;margin: 24rpx 15upx 0;padding: 10upx 32upx;" :style="{
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

				<view v-if="btnType === 6" style="padding: 0 18rpx 30rpx;">
					<view v-if="goodsDetail.shelveState === 0" style="display: flex;align-items: center;justify-content: center;">
						<tui-button type="gray" width="360rpx" height="80rpx" disabled shape="circle" margin="0">
							商品已下架
						</tui-button>
					</view>
					<view
						v-else-if="selectedSku.activityType === 1"
						style="display: flex;align-items: center;justify-content: space-around;"
					>
						<tui-button
							type="gray" width="190rpx" height="80rpx" plain
							margin="0" :disabled="!selectedSku.stockNumber"
							style="font-size: 28rpx;color: #333333!important;border-radius: 8upx;" @click="handleBuyNow"
						>
							单独购买
						</tui-button>
						<tui-button
							type="black" width="190rpx" height="80rpx" margin="0"
							:disabled="!selectedSku.stockNumber"
							style="font-size: 28rpx;color: #ffebc4!important;border-radius: 8upx;" @click="handleBuyWithGroup"
						>
							我要开团
						</tui-button>
					</view>
					<view v-else style="display: flex;align-items: center;justify-content: space-around;">
						<tui-button
							type="gray" width="190rpx" height="80rpx" plain
							margin="0" :disabled="!selectedSku.stockNumber"
							style="font-size: 28rpx;color: #333333!important;border-radius: 8upx;" @click="handleAddCart"
						>
							加入购物车
						</tui-button>
						<tui-button
							type="black" width="190rpx" height="80rpx" margin="0"
							:disabled="!selectedSku.stockNumber"
							style="font-size: 28rpx;color: #ffebc4!important;border-radius: 8upx;" @click="handleBuyNow"
						>
							立即购买
						</tui-button>
					</view>
				</view>
				<view v-else>
					<view
						v-if="(selectedSku.activityType === 1) && collageId"
						style="display: flex;align-items: center;justify-content: center;"
						:style="{ 'padding-bottom': (isIphone === true ? 60 : 20) + 'rpx' }"
					>
						<tui-button
							type="black" width="590rpx" height="80rpx" margin="0 0 0 16rpx"
							:disabled="!selectedSku.stockNumber"
							style="font-size: 28rpx;color: #ffebc4!important;border-radius: 8upx;" @click="handleBuyWithGroup"
						>
							确定
						</tui-button>
					</view>
					<view
						v-else-if="(selectedSku.activityType === 1) && (btnType === 3)"
						style="display: flex;align-items: center;justify-content: center;"
						:style="{ 'padding-bottom': (isIphone === true ? 60 : 20) + 'rpx' }"
					>
						<tui-button
							type="black" width="590rpx" height="80rpx" margin="0 0 0 16rpx"
							:disabled="!selectedSku.stockNumber"
							style="font-size: 28rpx;color: #ffebc4!important;border-radius: 8upx;" @click="handleBuyWithGroup"
						>
							去拼团
						</tui-button>
					</view>
					<view
						v-else style="display: flex;align-items: center;justify-content: center;"
						:style="{ 'padding-bottom': (isIphone === true ? 60 : 20) + 'rpx' }"
					>
						<tui-button
							v-if="btnType === 1" type="black" width="590rpx" height="80rpx"
							margin="0 0 0 16rpx"
							:disabled="!selectedSku.stockNumber"
							style="font-size: 28rpx;color: #ffebc4!important;border-radius: 8upx;" @click="handleAddCart"
						>
							确认
						</tui-button>
						<tui-button
							v-else type="black" width="590rpx" height="80rpx"
							margin="0 0 0 16rpx"
							:disabled="!selectedSku.stockNumber"
							style="font-size: 28rpx;color: #ffebc4!important;border-radius: 8upx;" @click="handleBuyNow"
						>
							确认
						</tui-button>
					</view>
				</view>
			</view>
		</tui-bottom-popup>
	</div>
</template>

<script>
import { resolveGoodsDetailTagsSituation } from '../../../../utils'
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
			selectedSku: {
				image: '',
				activityType: 0,
				salePrice: 0,
				price: 0,
				stockNumber: 0,
				voucherId: 0,
				voucherPrice: 0,
				presenterVoucher: 0
			},
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
			Object.keys(this.goodsDetail.map).forEach((skuValueCodeItem) => {
				if (this.goodsDetail.map[skuValueCodeItem].skuId === skuId) {
					// 控制组件选中渲染
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

		// 点击sku的一项
		handleClickSkuItem(nameCode, tagItem) {
			if (tagItem.ifEnable) return
			const { goodsDetail, selectedAttr } = resolveGoodsDetailTagsSituation(this.goodsDetail, this.selectedAttr, nameCode, tagItem)
			this.selectedAttr = selectedAttr
			this.$emit('change-goods-detail', goodsDetail)
			this.selectedSku = Object.values(this.goodsDetail.map).find((skuItem) => skuItem.valueCodes.split(',').every((nameCodeItem) => Object.values(this.selectedAttr).includes(nameCodeItem))) || {}
			if (this.selectedSku.skuId) this.$emit('current-select-sku', { selectedSku: this.selectedSku, currentSku: this.getCurrentSkuName(), number: this.number })
		},

		// 获取选择后的文本显示
		getCurrentSkuName() {
			if (this.selectedSku.valueCodes) {
				const currentSku = []
				this.goodsDetail.names.forEach((nameItem) => {
					nameItem.values.some((tag) => {
						if (this.selectedSku.valueCodes.split(',').includes(tag.valueCode)) {
							if (tag.valueCode === '单款项') {
								currentSku.push({ skuText: tag.skuValue })
							} else {
								currentSku.push({ skuText: `${tag.skuName}：${tag.skuValue}` })
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
			if (!this.selectedSku.skuId) return this.$showToast('请选择商品')
			if (this.selectedSku.ifEnable) return this.$showToast('该商品不可售')
			if (this.selectedSku.stockNumber < 1) return this.$showToast('该商品库存不足')
			if (this.selectedSku.stockNumber && (this.number > this.selectedSku.stockNumber)) return this.$showToast('已超出最大数量限制')
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
			if (!this.selectedSku.skuId) return this.$showToast('请选择商品')
			if (this.selectedSku.ifEnable) return this.$showToast('该商品不可售')
			if (this.selectedSku.stockNumber < 1) return this.$showToast('该商品库存不足')
			if (this.selectedSku.stockNumber && (this.number > this.selectedSku.stockNumber)) return this.$showToast('已超出最大数量限制')
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
			if (!this.selectedSku.skuId) return this.$showToast('请选择商品')
			if (this.selectedSku.ifEnable) return this.$showToast('该商品不可售')
			if (this.selectedSku.stockNumber < 1) return this.$showToast('该商品库存不足')
			if (this.selectedSku.stockNumber && (this.number > this.selectedSku.stockNumber)) return this.$showToast('已超出最大数量限制')
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
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 0 0 44rpx;
	height: 100%;
	overflow-y: auto;
	box-sizing: border-box;

	.detailImg-box {
		padding-top: 30upx;
		padding-left: 30upx;
		border-bottom: 1upx solid #EDEDED;
		padding-bottom: 20upx;
		width: 690upx;

		.detailImg {
			width: 180upx;
			height: 180upx;
		}
	}

	.goodsNumCent {
		padding: 0 30upx;

		.goodsNum-box {
			width: 100%;
			padding: 30rpx 0 60rpx;
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
}
</style>
