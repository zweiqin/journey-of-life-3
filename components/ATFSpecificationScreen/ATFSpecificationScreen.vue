<template>
	<view class="specification-screen-container">

		<tui-landscape
			:show="showSpecification" :position="1" :mask-closable="true" icon-left="50rpx"
			icon-right="50rpx"
			@close="showSpecification = false"
		>
			<view
				style="position: relative;width: 600upx;max-height: 75vh;padding: 46upx 46upx 0;box-sizing: border-box;overflow-y: auto;background-color: #ffffff;border-radius: 40upx;"
			>
				<view v-if="selectedSku" style="display: flex;align-items: center;">
					<image
						style="width: 180upx;height: 180upx;"
						:src="common.seamingImgUrl(selectedSku.image || (goodsDetail.images && goodsDetail.images[0]))" mode=""
					/>
					<view
						style="flex: 1;margin-left: 40upx;word-break: break-all;display: -webkit-box;overflow: hidden;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
					>
						<text style="font-size: 34upx;font-weight: bold;">{{ goodsDetail.productName }}</text>
					</view>
				</view>

				<view v-if="goodsDetail.names">
					<view v-for="nameItem in goodsDetail.names" :key="nameItem.nameCode" style="margin-top: 20upx;">
						<view v-if="nameItem.nameCode" style="font-size: 26upx;color: #a5a4a4;">{{ nameItem.skuName }}</view>
						<view style="display: flex;flex-wrap: wrap;margin-top: 10upx;font-size: 28upx;">
							<view
								v-for="tag in nameItem.values" :key="tag.valueCode"
								style="width: fit-content;padding: 6upx 28upx;margin-right: 20upx;border-radius: 20upx;" :style="{
									border: selectedAttr[nameItem.nameCode] == tag.valueCode ? '1upx solid #ffbd87' : '1upx solid #c2c2c2',
									backgroundColor: selectedAttr[nameItem.nameCode] == tag.valueCode ? '#fffce3' : 'transparent'
								}" @click="handleClickSkuItem(nameItem.nameCode, tag.valueCode)"
							>
								{{ tag.skuValue }}
							</view>
						</view>
					</view>
				</view>

				<view style="display: flex;justify-content: space-between;align-items: center;margin-top: 20upx;">
					<view>数量</view>
					<view>
						<uni-number-box v-model="number" :min="1" :max="maxNumber"></uni-number-box>
					</view>
				</view>
				<view style="position: sticky;bottom: 0;margin-top: 40upx;padding-bottom: 20upx;background-color: #ffffff;">
					<view style="padding: 12upx 46upx;margin: 0 -46upx;font-size: 28upx;color: #868686;background-color: #efefef;">
						<text>已选规格：</text>
						<text>{{ spStr }}</text>
					</view>
					<view style="display: flex;justify-content: space-between;align-items: center;margin-top: 20upx;">
						<view>
							<view v-if="selectedSku">
								<text style="font-size: 28upx;">总计</text>
								<text style="margin-left: 10upx;font-size: 38upx;color: #ff0505;">￥{{ selectedSku.price * number }}</text>
							</view>
						</view>
						<view>
							<view v-if="!showSelectBtn">
								<tui-button
									type="danger" width="240rpx" height="64rpx" margin="0 10rpx 0 0"
									style="border-radius: 14rpx;"
									@click="addShopCar"
								>
									{{ btnText || '+ 加入购物车' }}
								</tui-button>
							</view>
							<view v-else>
								<tui-button
									type="danger" width="240rpx" height="64rpx" margin="0 10rpx 0 0"
									style="border-radius: 14rpx;"
									@click="handleClickBtn"
								>
									{{ btnText }}
								</tui-button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</tui-landscape>
		<tui-toast ref="toast"></tui-toast>
	</view>
</template>

<script>
import { getProductDetailsByIdApi, addCartShoppingApi } from '../../api/anotherTFInterface'
export default {
	name: 'ATFSpecificationScreen',
	props: {
		data: {
			type: Object
		},
		maxNumber: {
			type: Number,
			default: 100
		},
		showSelectBtn: {
			type: Boolean,
			default: false
		},
		showSuccessToast: {
			type: Boolean,
			default: true
		},
		btnText: {
			type: String,
			default: ''
		}
	},

	data() {
		return {
			showSpecification: false,
			goodsDetail: {},
			selectedAttr: {},
			spStr: '请选择商品规格',
			selectedSku: { collageOrders: [] },
			currentSku: [],
			number: 1

		}
	},

	watch: {
		number() {
			this.getCurrentSkuName()
		}
	},

	methods: {
		async open(shopId, productId, skuId) {
			uni.showLoading()
			this.goodsDetail = {}
			this.spStr = '请选择商品规格'
			this.selectedSku = {}
			this.currentSku = []
			this.number = 1
			let data
			if (this.data && this.data.info) {
				data = this.data
			} else {
				const res = await getProductDetailsByIdApi({
					shopId,
					productId,
					skuId,
					terminal: 1
				})
				data = res.data
			}
			uni.hideLoading()
			this.goodsDetail = data
			console.log(data)
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
			this.$nextTick(() => {
				if (skuId) {
					this.handleSelectBySkuId(skuId)
				} else {
					// 默认选中第0个
					this.goodsDetail.names.forEach((nameItem) => {
						this.handleClickSkuItem(nameItem.nameCode, nameItem.values[0].valueCode)
					})
				}
			})
			this.showSpecification = true
		},

		handleSelectBySkuId(skuId) {
			if (!skuId) return
			Object.keys(this.goodsDetail.map).forEach((skuValueCodeItem) => {
				if (this.goodsDetail.map[skuValueCodeItem].skuId === skuId) {
					this.selectedSku = this.goodsDetail.map[skuValueCodeItem]
					this.getCurrentSkuName()
					this.goodsDetail.names.forEach((nameItem) => {
						nameItem.values.some((tag) => {
							if (this.selectedSku.valueCodes.split(',').includes(tag.valueCode)) {
								this.$set(this.selectedAttr, nameItem.nameCode, tag.valueCode)
								return true
							}
							return false
						})
					})
				}
			})
		},

		handleClickSkuItem(nameCode, valueCode) {
			this.$set(this.selectedAttr, nameCode, valueCode)
			Object.keys(this.goodsDetail.map).forEach((skuValueCodeItem) => {
				if (Object.values(this.selectedAttr).join(',') === skuValueCodeItem) {
					this.selectedSku = this.goodsDetail.map[skuValueCodeItem]
					this.getCurrentSkuName()
				}
			})
			console.log(this.selectedAttr, this.selectedSku)
		},

		// 获取选择后的文本显示
		getCurrentSkuName() {
			if (this.selectedSku.valueCodes) {
				let str = ''
				const currentSku = []
				this.goodsDetail.names.forEach((nameItem) => {
					nameItem.values.some((tag) => {
						if (this.selectedSku.valueCodes.split(',').includes(tag.valueCode)) {
							if (tag.valueCode === '单款项') {
								currentSku.push({ skuText: tag.skuValue })
							} else {
								currentSku.push({ skuText: `${tag.skuName}：${tag.skuValue}` })
							}
							str += tag.skuValue + '，'
							return true
						}
						return false
					})
				})
				this.spStr = str + this.number + '（数量）'
				return currentSku
			}
			return []
		},

		// 添加购物车
		async addShopCar() {
			if (this.isLogin()) {
				try {
					if (this.showSpecification) {
						const tempGoodsInfo = {
							selectedSku: this.selectedSku,
							currentSku: this.currentSku,
							number: this.number
						}
						if (tempGoodsInfo.number > this.selectedSku.stockNumber) {
							this.$showToast('该货品库存为' + this.selectedSku.stockNumber)
							return
						}
						if (tempGoodsInfo.selectedSku.skuId) {
							uni.showLoading()
							addCartShoppingApi({
								skuId: this.selectedSku.skuId,
								number: this.number
							})
								.then((res) => {
									uni.hideLoading()
									if (this.showSuccessToast) this.ttoast('购物车添加成功')
									this.showSpecification = false
									this.$emit('success')
								})
								.catch((e) => {
									uni.hideLoading()
								})
						} else {
							this.$showToast('商品参数出错，无法添加！')
						}
					} else {
						this.$showToast('请先开启规格弹窗显示')
					}
				} catch (error) {
					console.log(error)
				}
			} else {
				this.$showToast('未登录')
			}
		},

		// 选择
		handleClickBtn() {
			if (this.showSpecification) {
				const tempGoodsInfo = {
					selectedSku: this.selectedSku,
					currentSku: this.currentSku,
					number: this.number
				}
				if (tempGoodsInfo.number > tempGoodsInfo.selectedSku.stockNumber) {
					this.$showToast('该货品库存为' + tempGoodsInfo.selectedSku.stockNumber)
					return
				}
				if (tempGoodsInfo.selectedSku.skuId) {
					this.$emit('select', tempGoodsInfo)
					this.showSpecification = false
				} else {
					this.$showToast('商品参数出错！')
				}
			} else {
				this.$showToast('请先开启规格弹窗显示')
			}
		}

	}
}
</script>

<style lang="less" scoped>
.specification-screen-container {
}
</style>
