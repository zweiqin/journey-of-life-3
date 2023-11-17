<template>
	<div class="content">
		<tui-bottom-popup :show="goodsDetailShowFlag" @close="goodsDetailShowFlag = false">
			<view class="goosDetailshow-box">
				<view class="detailImg-box flex-row-plus">
					<image class="detailImg" :src="selectedSku.image"></image>
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
				<view class="color-box flex-column-plus">
					<view v-for="(skuRowItem, skuRowIndex) in productData.names" :key="skuRowIndex">
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
				</view>
				<view class="goodsNumCent">
					<view class="goodsNum-box flex-row-plus flex-sp-between" :class="{ 'bottom-line': aliAgingObj.supportHanaUta }">
						<label class="font-color-333 fs26">数量</label>
						<view class="goodsNum">
							<view class="item subtract" @click="handleNumSub">
								-
							</view>
							<view v-model="buyNum" class="item goodsNumber">
								{{ buyNum }}
							</view>
							<view class="item add" @click="handleNumAdd">
								+
							</view>
						</view>
					</view>
				</view>
				<!-- 花呗分期 -->
				<view v-if="aliAgingObj.supportHanaUta" class="huabei-box flex-column-plus">
					<label class="font-color-999 fs24">花呗分期</label>
					<scroll-view class="fenqi-box" scroll-x="true">
						<view
							class="huabei-item"
							:class="[{ 'fenqi-on': aliAgingObj.selectIndex === 0 }, { 'disabled': aliAgingObj.disableSelectList[0] }]"
							@click="handleSelectAliAging(0)"
						>
							<label class="huabei-period">分3期(含手续费)</label>
							<label class="huabei-money">￥{{ aliAgingObj.agingMoneyList[0] }}/期</label>
						</view>
						<view
							class="huabei-item"
							:class="[{ 'fenqi-on': aliAgingObj.selectIndex === 1 }, { 'disabled': aliAgingObj.disableSelectList[1] }]"
							@click="handleSelectAliAging(1)"
						>
							<label class="huabei-period">分6期(含手续费)</label>
							<label class="huabei-money">￥{{ aliAgingObj.agingMoneyList[1] }}/期</label>
						</view>
						<view
							class="huabei-item"
							:class="[{ 'fenqi-on': aliAgingObj.selectIndex === 2 }, { 'disabled': aliAgingObj.disableSelectList[2] }]"
							@click="handleSelectAliAging(2)"
						>
							<label class="huabei-period">分12期(含手续费)</label>
							<label class="huabei-money">￥{{ aliAgingObj.agingMoneyList[2] }}/期</label>
						</view>
					</scroll-view>
				</view>

				<view v-if="btnType === 6" class="skuSelectBtn">
					<view v-if="productData.shelveState === 0" class="flex-row-plus offShelf">
						商品已下架
					</view>
					<view v-else-if="selectedSku.activityType === 1" class="flex-row-plus flex-items flex-sp-around">
						<view class="selectJoinShop selectBtn font-color-333" @click="handleBuyNow">
							单独购买
						</view>
						<view class="selectBuyNow selectBtn font-color-FFEBC4" @click="handleBuyWithGroup(1)">
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
						v-if="selectedSku.activityType === 1 && collageId !== 0" class="goosDetailbut-box flex-items-plus"
						:style="{ 'padding-bottom': (isIphone === true ? 60 : 20) + 'rpx' }"
					>
						<view class="joinbuyBut" @click="handleBuyWithGroup(2)">
							确定
						</view>
					</view>
					<view
						v-else-if="selectedSku.activityType === 1 && btnType === 3" class="goosDetailbut-box flex-row-plus"
						:style="{ 'padding-bottom': (isIphone === true ? 60 : 20) + 'rpx' }"
					>
						<view class="buyNowBut" @click="handleBuyWithGroup(1)">
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
						<view v-else class="buyNowBut" @click="handleBuyNow(2)">
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
		productData: {
			type: Object,
			default: () => ({})
		},
		isIphone: {
			type: Boolean,
			default: () => false
		},
		collageId: {
			type: Number,
			default: () => 0
		}
	},
	data() {
		return {
			// 是否展示SKU弹窗
			goodsDetailShowFlag: false,
			// 已经选中的valueCode key => value  names.nameCode=>values.valueCode 处理选中渲染
			selectedAttr: {},
			// 当前选中的skuMap对象（服务端数据）
			selectedSku: {},
			// 1加入购物车 2立即购买 3开团 4单独购买 6SKU选择
			btnType: 0,
			buyNum: 1,
			// 花呗对象
			aliAgingObj: {
				supportHanaUta: false,
				selectIndex: -1,
				disableSelectList: [true, true, true],
				agingMoneyList: ['0.00', '0.00', '0.00']
			}
		}
	},
	methods: {
		// 当前SKU数量减少
		handleNumSub() {
			if (this.buyNum > 1) {
				this.buyNum = this.buyNum - 1
			} else {
				uni.showToast({
					title: '亲！至少一件哦！',
					icon: 'none'
				})
			}
		},

		// 当前SKU数量加
		handleNumAdd() {
			if (this.buyNum < this.selectedSku.stockNumber) {
				this.buyNum = this.buyNum + 1
			} else {
				uni.showToast({
					title: '库存不足！',
					icon: 'none'
				})
			}
		},

		/**
		 * 根据skuId选择SKU
		 * @param skuId SkuId
		 */

		handleSelectBySkuId(skuId) {
			if (!skuId) return
			// 当前商品后端返回的所有sku的排列组合
			const allSkuValueGroupMap = this.productData.map
			for (const allSkuValueGroupMapKey in allSkuValueGroupMap) {
				if (parseInt(allSkuValueGroupMap[allSkuValueGroupMapKey].skuId) !== parseInt(skuId)) continue
				this.selectedSku = allSkuValueGroupMap[allSkuValueGroupMapKey]
				this.echoFatherRowText(this.productData, this.selectedSku, this.buyNum)
				// 控制组件选中渲染
				const selectValueCodes = this.selectedSku.valueCodes.split(',')
				for (const skuRow of this.productData.names) {
					for (const skuCol of skuRow.values) {
						if (!selectValueCodes.includes(skuCol.valueCode)) continue
						this.$set(this.selectedAttr, skuRow.nameCode, skuCol.valueCode)
						break // 一行的sku只会有一个value
					}
				}
			}
		},

		/**
		 * 点击sku的一项
		 * @param nameCode SKU行的nameCode
		 * @param valueCode SKU列的valueCode
		 * nameCodeValueCodeClick
		 */

		handleClickSkuItem(nameCode, valueCode) {
			// 当前选中
			this.$set(this.selectedAttr, nameCode, valueCode)
			// 获取到所有的sku的values.valueCode
			const values = []
			for (const key in this.selectedAttr) {
				values.push(this.selectedAttr[key])
			}
			// 当前选中的sku的key组合
			// 后端返回的productData.map中，排列组合了所有values[].valueCode的情况，使用逗号分隔
			const nowSelectSkuValueGroupKey = values.join(',') // 相较于allSkuValueGroupMap的key
			// 后端返回的所有sku组合（values.valueCode）
			const allSkuValueGroupMap = this.productData.map
			// 遍历后端数据
			for (const allSkuValueGroupMapKey in allSkuValueGroupMap) {
				// 当和当前选中的sku一致
				if (nowSelectSkuValueGroupKey === allSkuValueGroupMapKey) {
					this.selectedSku = allSkuValueGroupMap[allSkuValueGroupMapKey]
					this.echoFatherRowText(this.productData, this.selectedSku, this.buyNum)
				}
			}
		},

		/**
		 * 回显父组件（通讯）
		 * @param productData 当前商品对象
		 * @param skuItem 当前选中的sku的后端数据
		 * @param buyNum 当前sku购买数量
		 */

		echoFatherRowText(productData, skuItem, buyNum) {
			// 获取到当前选中的sku的valueCode
			const currentSku = []
			// 取出所有的valueCode
			const nowSelectValueCodeList = skuItem.valueCodes.split(',')
			const skuRows = productData.names
			for (const skuRow of skuRows) {
				const skuValues = skuRow.values
				for (const skuValue of skuValues) {
					if (!nowSelectValueCodeList.includes(skuValue.valueCode)) continue
					const currentSkuItem = { skuText: '' }
					if (skuValue.valueCode === '单款项') {
						currentSkuItem.skuText = skuValue.skuValue
					} else {
						currentSkuItem.skuText = `${skuValue.skuName}:${skuValue.skuValue}`
					}
					currentSku.push(currentSkuItem)
					break // 只会对应一个value数据，找到就break减少循环
				}
			}
			this.$emit('getCurrentSku', {
				skuItem,
				currentSku,
				buyNum
			})
			// 选中sku之后，做一些相应的操作
			// postSelectSku依赖于getCurrentSku的数据
			this.$emit('postSelectSku')
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
				const postData = {
					skuId: this.selectedSku.skuId,
					number: this.buyNum
				}
				await addCartShoppingApi(postData)
				// 埋点
				addUserTrackReportDoPointerApi({
					eventType: 2,
					productIds: this.productId
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
					this.buyNum = 1
					this.goodsDetailShowFlag = false
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
			if (this.buyNum > this.selectedSku.stockNumber && this.selectedSku.stockNumber !== 0) {
				return uni.showToast({
					title: '已超出最大数量限制',
					icon: 'none'
				})
			}

			// 组装后端数据
			const list = [ {
				ifWork: 0,
				shopId: this.productData.shopId,
				shopName: this.productData.shopName,
				shopDiscountId: this.shopDiscountId > 0 ? this.shopDiscountId : null,
				shopSeckillId: this.shopSeckillId > 0 ? this.shopSeckillId : null,
				skus: [ {
					productId: this.productData.productId,
					skuId: this.selectedSku.skuId,
					productName: this.productData.productName,
					image: this.selectedSku.image,
					price: this.selectedSku.price,
					weight: 0,
					number: this.buyNum,
					SKU: '',
					total: this.selectedSku.price * this.buyNum,
					ifLogistics: 1
				} ]
			} ]
			uni.setStorageSync(T_SKU_ITEM_DTO_LIST, list)
			this.buyNum = 1
			this.goodsDetailShowFlag = false
			uni.navigateTo({
				url: '/another-tf/another-serve/orderConfirm/index?type=1'
			})
		},

		/**
		 * 拼团下单
		 * @param type 1单独开团2拼团
		 */

		handleBuyWithGroup(type) {
			if (this.selectedSku.stockNumber < 1) {
				return uni.showToast({
					title: '库存不足',
					icon: 'none'
				})
			}
			const data = {
				number: this.buyNum,
				productId: this.productId,
				shopId: this.shopId,
				skuId: this.selectedSku.skuId,
				shopGroupWorkId: this.selectedSku.shopGroupWorkId,
				type
			}
			if (type !== 1) {
				data.collageId = this.collageId
			}
			uni.removeStorageSync(T_SKU_ITEM_DTO_LIST)
			uni.setStorageSync(T_SKU_ITEM_LIST, data)
			this.goodsDetailShowFlag = false
			this.buyNum = 1
			uni.navigateTo({
				url: '/another-tf/another-serve/orderConfirm/index?type=1'
			})
		},

		/**
		 * 选择分期
		 * @param index 0:3期 1:6期 2:12期
		 */

		handleSelectAliAging(index) {
			const aliAgingObj = this.aliAgingObj
			if (aliAgingObj.selectIndex !== index && !aliAgingObj.disableSelectList[index]) {
				aliAgingObj.selectIndex = index
			} else {
				aliAgingObj.selectIndex = -1
			}
		},

		/**
		 * 渲染是否支持花呗
		 * @param productData 当前商品
		 * @param skuPrice:number 选中SKU的价格
		 */

		handleRenderAliAging(productData, skuPrice) {
			if (productData.ifHuabei !== 1) return
			const aliAgingObj = this.aliAgingObj
			if (skuPrice && skuPrice >= 0.03) {
				aliAgingObj.supportHanaUta = true
				aliAgingObj.disableSelectList[0] = false
				aliAgingObj.agingMoneyList[0] = parseInt((skuPrice / 3 * 100) / 100 + '').toFixed(2) + ''
			}
			if (skuPrice && skuPrice >= 0.06) {
				aliAgingObj.supportHanaUta = false
				aliAgingObj.disableSelectList[1] = false
				aliAgingObj.agingMoneyList[1] = parseInt((skuPrice / 6 * 100) / 100 + '').toFixed(2) + ''
			}
			if (skuPrice && skuPrice >= 0.12) {
				aliAgingObj.supportHanaUta = true
				aliAgingObj.disableSelectList[2] = false
				aliAgingObj.agingMoneyList[2] = parseInt((skuPrice / 12 * 100) / 100 + '').toFixed(2) + ''
			}
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

	.bottom-line {
		border-bottom: 1upx solid #EDEDED;
	}

	.huabei-box {
		padding: 30upx 30upx;
		width: 690upx;

		.fenqi-box {
			margin-top: 15upx;
			width: 120%;

			.huabei-item {
				display: inline-block;
				background: #f3f3f3;
				padding: 16upx 24upx;
				margin: 5upx 10upx;
				border-radius: 15upx;
				text-align: center;
				font-size: 7upx;

				.huabei-period {
					display: block;
				}
			}

			.fenqi-on {
				border: 1px solid #EF7F93;
				color: #EF7F93;
			}

			.disabled {
				color: #cacaca;
			}
		}
	}

	.goosDetailbut-box {
		justify-content: center;

		.joinShopCartBut {
			width: 343upx;
			height: 80upx;
			border-radius: 40upx 0 0 40upx;
			background-color: #FFC300;
			color: #FFFEFE;
			font-size: 28upx;
			line-height: 80upx;
			text-align: center;
			margin-left: 30upx;
		}

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
