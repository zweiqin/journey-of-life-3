<template>
	<view v-if="selectComposeData && selectComposeData.length > 0" class="group-list">
		<view class="group-warp">
			<view class="title">
				<view style="display: flex;align-items: center;">
					<tui-icon :size="30" color="#fc7901" name="notice-fill" unit="rpx" margin="0 10rpx 0 0"></tui-icon>
					<text style="color: #d0b88c;font-size: 36rpx;font-style: italic;font-weight: bold;">组合销售</text>
				</view>
				<view class="price-text">
					组合价：¥{{ composePrice }}
				</view>
			</view>
			<view>
				<scroll-view class="tabs-nav" scroll-x="true">
					<view class="ul">
						<view
							v-for="(item, index) in selectComposeData" :key="index" class="li" :class="tabIndex === index && 'on'"
							@click="tabChange(index)"
						>
							{{ item.composeName }}
						</view>
					</view>
				</scroll-view>
				<view
					v-for="(item, index) in selectComposeData" :key="index" class="tabs-item"
					:class="tabIndex === index && 'on'"
				>
					<swiper
						class="pro-box" :indicator-dots="false" autoplay
						:display-multiple-items="item.composeProductInfoList.length < 3 ? item.composeProductInfoList.length : 3"
						:disable-touch="item.composeProductInfoList.length <= 3" @change="(e) => swiperCurrent = e.detail.current"
					>
						<swiper-item
							v-for="(composeProItem, composeProIndex) in item.composeProductInfoList" :key="composeProIndex"
						>
							<view class="pro-item-inner">
								<view class="pro-item">
									<view class="pro-item-img">
										<image class="img" :src="common.seamingImgUrl(composeProItem.productImage)"></image>
									</view>
									<view class="pro-item-info">
										<h3 class="name">
											{{ composeProItem.productName }}
										</h3>
										<view class="sku" @click.stop="handleShowGoodsSkuSelect(composeProItem)">
											<view class="text">{{ composeProItem.skuItem.skuName }}</view>
											<tui-icon :size="22" color="#b7b7b7" name="arrowdown"></tui-icon>
										</view>
									</view>
								</view>
							</view>
						</swiper-item>
					</swiper>
					<view v-if="item.composeProductInfoList.length > 3" class="swiper-dots">
						<text
							v-for="(dot, index) in item.composeProductInfoList.length - 2" :key="index" class="dot"
							:class="{ 'dot-active': swiperCurrent === index }"
						></text>
					</view>
				</view>
				<view class="btn-buy" @click="doBuy">立即购买</view>
			</view>
		</view>
		<!-- 商品详情 -->
		<tui-bottom-popup :show="isShowDetails" @close="isShowDetails = false">
			<view class="goosDetailshow-box">
				<view class="detailImg-box flex-row-plus">
					<image class="detailImg" :src="common.seamingImgUrl(selectedSku.image)"></image>
					<view class="flex-column-plus mar-left-40">
						<view class="font-color-C5AA7B">
							<label class="fs24">¥</label>
							<label class="fs36 mar-left-10" v-text="getPrice(selectedSku)"></label>
						</view>
						<label class="fs24 font-color-999 mar-top-20">库存 {{ selectedSku.stockNumber }} 件</label>
						<label class="fs24 mar-top-20">已选</label>
					</view>
				</view>

				<view style="flex: 1;height: 0;overflow: hidden;padding: 30rpx;font-size: 26rpx;">
					<scroll-view scroll-y style="height: 100%;max-height: 50vh;">
						<view v-for="nameItem in commodityDetail.names" :key="nameItem.nameCode" style="padding-bottom: 30rpx;">
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

				<view style="display: flex;align-items: center;justify-content: center;">
					<tui-button
						type="black" width="590rpx" height="80rpx" margin="0 0 0 16rpx"
						:disabled="!selectedSku.stockNumber" style="font-size: 28rpx;color: #ffebc4!important;border-radius: 8rpx;"
						@click="handleConfirmSelect"
					>
						确认
					</tui-button>
				</view>
			</view>
		</tui-bottom-popup>
	</view>
</template>

<script>
import { T_SKU_ITEM_MSG_LIST } from '../../../../constant'
import { resolveGoodsDetailSkuSituation, resolveGoodsDetailTagsSituation } from '../../../../utils'
import { getProductDetailsByIdApi, getProductSelectComposeApi } from '../../../../api/anotherTFInterface'

export default {
	name: 'CombinedSales',
	props: {
		productId: {
			type: Number,
			default: 0
		},
		shopId: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			selectComposeData: [],
			tabIndex: 0,
			swiperCurrent: 0,
			isShowDetails: false,
			composePrice: 0,
			commodityDetail: {
				names: []
			},
			selectedSku: {
				image: '',
				stockNumber: ''
			},
			selectedAttr: {}
		}
	},
	mounted() {
		this.getSelectCompose()
	},
	methods: {
		// 切换套餐
		tabChange(index) {
			this.tabIndex = index
			this.calculatePrice()
		},
		// 获取组合销售数据
		getSelectCompose() {
			getProductSelectComposeApi({
				productId: this.productId
			}).then((res) => {
				this.selectComposeData = res.data
				for (let i = 0; i < this.selectComposeData.length; i++) {
					const proList = this.selectComposeData[i].composeProductInfoList
					for (let j = 0; j < proList.length; j++) {
						proList[j].skuItem = proList[j].composeSkuInfoList[0] // { skuId: 0, price: 0, skuName: "" }
					}
				}
				this.calculatePrice()
			})
		},

		// 更换商品样式
		async handleShowGoodsSkuSelect(composeProItem) {
			this.commodityDetail = { names: [] }
			this.selectedAttr = {}
			uni.showLoading()
			try {
				const res = await getProductDetailsByIdApi({
					shopId: this.shopId,
					productId: composeProItem.productId,
					skuId: composeProItem.skuItem.skuId,
					terminal: 1
				})
				this.commodityDetail = res.data
				const skuCollectionListKeys = Object.keys(this.commodityDetail.map)
				if ((skuCollectionListKeys.length === 1) && (skuCollectionListKeys[0] === '单款项')) {
					this.commodityDetail.names[0].values.push({
						skuValue: this.commodityDetail.names[0].skuName,
						valueCode: '单款项'
					})
				}
				skuCollectionListKeys.forEach((skuValueCodeItem) => {
					if (!this.commodityDetail.map[skuValueCodeItem].image) this.commodityDetail.map[skuValueCodeItem].image = this.commodityDetail.images[0]
				})
				this.commodityDetail = await resolveGoodsDetailSkuSituation(this.commodityDetail)
				this.$nextTick(() => {
					if (composeProItem.skuItem.skuId) {
						this.handleSelectBySkuId(composeProItem.skuItem.skuId)
					} else {
						this.commodityDetail.names.forEach((nameItem) => {
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
			Object.keys(this.commodityDetail.map).forEach((skuValueCodeItem) => {
				if (this.commodityDetail.map[skuValueCodeItem].skuId === skuId) {
					this.commodityDetail.names.forEach((nameItem) => {
						nameItem.values.some((tag) => {
							if (this.commodityDetail.map[skuValueCodeItem].valueCodes.split(',').includes(tag.valueCode)) {
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
			const { goodsDetail: commodityDetail, selectedAttr } = resolveGoodsDetailTagsSituation(this.commodityDetail, this.selectedAttr, nameCode, tagItem)
			this.selectedAttr = selectedAttr
			this.commodityDetail = commodityDetail
			this.selectedSku = Object.values(this.commodityDetail.map).find((skuItem) => skuItem.valueCodes.split(',').every((nameCodeItem) => Object.values(this.selectedAttr).includes(nameCodeItem))) || {}
		},

		// 提交更换商品规格
		handleConfirmSelect() {
			if (!this.selectedSku.skuId) return this.$showToast('请选择商品')
			if (this.selectedSku.ifEnable) return this.$showToast('该商品不可售')
			if (this.selectedSku.stockNumber < 1) return this.$showToast('该商品库存不足')
			this.selectComposeData[this.tabIndex].composeProductInfoList.some((composeProItem) => {
				if (composeProItem.productId === this.commodityDetail.productId) {
					composeProItem.composeSkuInfoList.some((composeSkuItem) => {
						if (composeSkuItem.skuId === this.selectedSku.skuId) {
							composeProItem.skuItem = { ...composeSkuItem, activityType: this.selectedSku.activityType, originalPrice: this.selectedSku.originalPrice, price: this.selectedSku.price, stockNumber: this.selectedSku.stockNumber }
							return true
						}
						return false
					})
					return true
				}
				return false
			})
			this.calculatePrice()
			this.isShowDetails = false
		},
		// 计算组合价
		calculatePrice() {
			if (!this.selectComposeData.length) return
			const proList = this.selectComposeData[this.tabIndex].composeProductInfoList
			const composeType = this.selectComposeData[this.tabIndex].composeType
			const promote = this.selectComposeData[this.tabIndex].promote
			let total = 0
			for (let i = 0; i < proList.length; i++) {
				total += this.getPrice(proList[i].skuItem)
			}
			switch (composeType) {
				case 1:
					this.composePrice = promote.toFixed(2)
					break
				case 2:
					this.composePrice = (total - promote).toFixed(2)
					break
				case 3:
					this.composePrice = parseFloat(total * promote / 10).toFixed(2)
					break
			}
		},
		// 根据活动显示不同价格
		getPrice(item) {
			if (item.activityType) {
				if (item.activityType === 6 || item.activityType === 7) return item.price
				return item.originalPrice
			}
			return item.price
		},
		// 立即购买
		doBuy() {
			const addCart = []
			const shopObj = {}
			shopObj.shopId = this.shopId
			shopObj.composeId = this.selectComposeData[this.tabIndex].composeId
			shopObj.skus = []
			const proList = this.selectComposeData[this.tabIndex].composeProductInfoList
			const len2 = proList.length
			for (let j = 0; j < len2; j++) {
				const skusObj = {}
				skusObj.number = 1
				skusObj.skuId = proList[j].skuItem.skuId
				shopObj.skus.push(skusObj)
			}
			addCart.push(shopObj)
			uni.setStorageSync(T_SKU_ITEM_MSG_LIST, addCart)
			uni.navigateTo({
				url: '/another-tf/another-serve/paymentOrderConfirm/index?type=1'
			})
		}
	}
}
</script>

<style lang="less" scoped>
.group-list {
	padding: 10rpx 20rpx 60rpx;
	border-top: 12rpx solid #F8F8F8;

	.group-warp {
		padding: 32rpx 12rpx 20rpx;
		background: #333333;
		box-shadow: 0 20rpx 30rpx rgba(0, 0, 0, 0.3);
		opacity: 1;
		border-radius: 20rpx;
	}

	.title {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.price-text {
			padding: 0 34rpx;
			margin-right: 10rpx;
			height: 50rpx;
			background: linear-gradient(90deg, #C83732 0%, #E25C44 100%);
			box-shadow: 0 6rpx 12rpx rgba(233, 0, 0, 0.3);
			border-radius: 26rpx;
			font-size: 24rpx;
			color: #fff;
			text-align: center;
			line-height: 50rpx;
			margin-left: 20rpx;
		}
	}

	.tabs-nav {
		padding: 0 10rpx;
		margin-bottom: 20rpx;

		.ul {
			display: flex;

			.li {
				text-align: center;
				font-size: 26rpx;
				color: #999;
				position: relative;
				padding: 12px 40px;
				word-break: keep-all;

				&:first-child {
					margin-left: 0;
				}

				&.on {
					color: #FFEBC4;

					&:after {
						content: '';
						width: 100%;
						height: 2rpx;
						background: #FFEBC4;
						position: absolute;
						left: 0;
						bottom: 0;
					}
				}
			}
		}
	}

	.tabs-item {
		display: none;

		&.on {
			display: block;
		}
	}

	.pro-box {
		height: 298rpx;
		padding: 0 2rpx 20rpx;

		.pro-item-inner {
			height: 100%;
			display: flex;
			justify-content: center;
		}

		.pro-item {
			width: 219rpx;
			height: 100%;
			background: #FFFFFF;
			padding: 10rpx;

			.pro-item-img {
				width: 100%;
				height: 160rpx;

				.img {
					width: 100%;
					height: 100%;
					object-fit: contain;
				}
			}

			.pro-item-info {
				.name {
					font-size: 24rpx;
					color: #333333;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					text-align: center;
					font-weight: normal;
					margin: 8rpx 0;
				}

				.sku {
					display: flex;
					align-items: center;
					justify-content: space-between;
					border: 2rpx solid #E4E5E6;

					.text {
						flex: 1;
						font-size: 24rpx;
						color: #999;
						padding: 0 8rpx;
						overflow: hidden;
						word-break: break-all;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}
				}
			}
		}
	}

	.swiper-dots {
		display: flex;
		justify-content: center;

		.dot {
			display: block;
			width: 24rpx;
			height: 4rpx;
			background: #FFFFFF;
			opacity: 0.5;
			border-radius: 2rpx;
			margin: 0 20rpx;

			&.dot-active {
				opacity: 1;
			}
		}
	}
}

.btn-buy {
	width: 688rpx;
	height: 84rpx;
	background: linear-gradient(88deg, #C5AA7B 0%, #FFEBC4 100%);
	font-size: 28rpx;
	color: #333;
	line-height: 84rpx;
	margin: 30rpx auto 0;
	text-align: center;
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
		border-radius: 10rpx;
		border-bottom: 1rpx solid #EDEDED;
		padding-bottom: 20rpx;
		width: 690rpx;

		.detailImg {
			width: 180rpx;
			height: 180rpx;
		}
	}
}
</style>
