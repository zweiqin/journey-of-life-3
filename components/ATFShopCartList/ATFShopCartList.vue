<template>
	<view class="cart-list-box">
		<view v-if="shopCartList && shopCartList.length">
			<view v-for="(item, index) in shopCartList" :key="item.shopId" class="itemBox">
				<view v-if="item.skus.length > 0" class="item" :style="{ maxHeight }">
					<view class="shop-box">
						<tui-icon
							v-if="item.selected === 1" name="circle-fill" :size="40" unit="rpx"
							color="#c5aa7b"
							margin="40rpx" @click="handleSelectShop(index, 0)"
						></tui-icon>
						<tui-icon
							v-else name="circle" :size="40" unit="rpx"
							color="#cccccc" margin="40rpx"
							@click="handleSelectShop(index, 1)"
						></tui-icon>
						<view class="shop-name-box" @click="isToShop && go(`/another-tf/another-user/shop/shop-detail?shopId=${item.shopId}`)">
							<tui-icon :size="24" color="#333333" name="shop"></tui-icon>
							<text class="shop-name">{{ item.shopName }}</text>
							<tui-icon
								v-if="isToShop"
								name="arrowright" :size="30" unit="rpx" color="#999999"
								margin="0 0 0 30rpx"
								class="arrow-right-img"
							></tui-icon>
						</view>
					</view>
					<view v-if="item.currentRules && item.currentRules.number" class="rulesBox flex-items">
						<ATFActivityImage :type="7" text="组合销售"></ATFActivityImage>
						<view class="fs24 font-color-C83732">
							已满足【{{ item.currentRules.price }}元任选{{ item.currentRules.number }}件】！
						</view>
					</view>
					<view v-for="(skuItem, cIndex) in shopCartList[index].skus" :key="cIndex" class="product-list-box">
						<view class="pro-item">
							<tui-icon
								v-if="skuItem.selected == 1" name="circle-fill" :size="40" unit="rpx"
								color="#c5aa7b"
								margin="40rpx" @click="handleSelectSku(index, cIndex, 0)"
							></tui-icon>
							<tui-icon
								v-else name="circle" :size="40" unit="rpx"
								color="#cccccc" margin="40rpx"
								@click="handleSelectSku(index, cIndex, 1)"
							></tui-icon>
							<view
								class="pro-r"
								@click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${item.shopId}&productId=${skuItem.productId}&skuId=${skuItem.skuId}`)"
							>
								<image :src="common.seamingImgUrl(skuItem.image)" class="pro-img default-img"></image>
								<view class="pro-r-r">
									<view class="pro-name">{{ skuItem.productName }}</view>
									<view class="sku-box">
										<text v-if="skuItem.value">{{ skuItem.value }}</text>
										<text v-else>默认规格</text>
									</view>
									<view class="pro-price-num-box">
										<view class="pro-price-box">
											<text class="fuhao">￥</text>
											<text>{{ skuItem.price }}</text>
										</view>
										<view class="pro-num-box">
											<text class="num-btn r" @click.stop="handleSubSkuNumber(index, cIndex)">
												-
											</text>
											<text class="num">{{ skuItem.number }}</text>
											<text class="num-btn l" @click.stop="handleAddSkuNumber(index, cIndex)">
												+
											</text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="padding-bottom: 45rpx;">
			<LoadingMore :status="isLoading && isFirstLoading ? 'loading' : ''"></LoadingMore>
			<view v-if="!isLoading && !shopCartList.length">
				<slot name="empty" :data="shopCartList">
					<tui-no-data :fixed="false" style="padding-top: 60rpx;">购物车空空如也~</tui-no-data>
				</slot>
			</view>
		</view>
	</view>
</template>

<script>
import { getShopCartApi, getCartListApi, getPricesCanvasApi, updateNumberCartGoodsApi, deleteCartGoodsApi } from '../../api/anotherTFInterface'

export default {
	name: 'ATFShopCartList',
	props: {
		type: {
			type: String,
			default: 'all'
		},
		shopId: {
			type: Number
		},
		isSubDelete: {
			type: Boolean,
			default: false
		},
		isToShop: {
			type: Boolean,
			default: false
		},
		maxHeight: {
			type: String,
			default: 'none'
		}
	},
	data() {
		return {
			timer: '',
			shopCartList: [], // 购物车数据
			isLoading: true, // 购物车是否为空
			isFirstLoading: true
		}
	},
	created() {
		this.getShopCartData(this.type)
	},
	methods: {
		getShopCartListData() {
			return this.shopCartList
		},
		// 获取购物车列表
		async getShopCartData(type = 'all', cb) {
			try {
				this.isLoading = true
				let res
				if (type === 'all') {
					res = await getCartListApi({})
				} else if (type === 'single') {
					res = await getShopCartApi({ shopId: this.shopId })
				}
				// const emptySkuShopArray = [] // sku为空的山沟
				res.data.forEach((shopObj, shopIndex) => {
					shopObj.priceNumber = 0
					shopObj.rules = []
					shopObj.currentRules = {}
					shopObj.ids = 0
					// 处理下架商品
					for (let i = shopObj.skus.length - 1; i >= 0; i--) {
						if (shopObj.skus[i].shelveState === 0) { // shelveState是否上架
							shopObj.skus.splice(i, 1) // 删掉下架商品 // todo 失效商品
							continue
						}
						if (shopObj.skus[i].activityType === 6 && shopObj.skus[i].selected === 1) {
							shopObj.priceNumber += shopObj.skus[i].number
						}
					}
					// 根据店铺索引获取规则
					this.getDataGroup(shopObj).then((result) => {
						shopObj.rules = result.data ? result.data[0].rules : {}
						this.handleSetGroupGood(shopIndex)
					})
					// shopObj.skus.length === 0 ? emptySkuShopArray.push(shopObj) : undefined
				})
				// emptySkuShopArray.length == res.data.length?
				this.shopCartList = res.data.filter((item) => item.skus && item.skus.length)
				this.$emit('update-msg', this.shopCartList)
			} catch (e) {
				console.log(e)
			} finally {
				// console.log(typeof cb)
				this.isLoading = false
				this.isFirstLoading = false
				cb && typeof cb === 'function' && cb()
			}
		},

		/**
		 * 获取组合定价
		 * @param item
		 * @return {Promise<unknown>}
		 */

		getDataGroup(item) {
			return new Promise((resolve, reject) => {
				if (item.ids) {
					getPricesCanvasApi({
						shopId: item.shopId,
						ids: item.ids,
						page: 1,
						pageSize: 10
					}).then((res) => {
						resolve(res)
					})
						.catch((e) => {
							reject(e)
						})
				} else {
					resolve([])
				}
			})
		},

		/**
		 * 单个SKU数量减
		 * @param shopIndex 店铺索引
		 * @param skuIndex index店铺下sku商品索引
		 */

		handleSubSkuNumber(shopIndex, skuIndex) {
			const selectSku = this.shopCartList[shopIndex].skus[skuIndex]
			if (selectSku.number <= 1) {
				if (this.isSubDelete) {
					uni.showModal({
						title: '提示',
						content: '是否将该商品移出购物车？',
						success: async (res) => {
							if (res.confirm) {
								await deleteCartGoodsApi({ ids: [ selectSku.skuId ] })
								await this.getShopCartData(this.type)
							}
						}
					})
				} else {
					return uni.showToast({ title: '亲！至少一件哦！', icon: 'none' })
				}
			} else {
				if (this.timer) clearTimeout(this.timer)
				--selectSku.number
				this.timer = setTimeout(() => {
					this.handleUpdateCart(selectSku.skuId, selectSku.number)
				}, 600)
			}
		},

		/**
		 * 单个SKU数量加
		 * @param shopIndex 店铺索引
		 * @param skuIndex index店铺下sku商品索引
		 */

		handleAddSkuNumber(shopIndex, skuIndex) {
			const selectSku = this.shopCartList[shopIndex].skus[skuIndex]
			if (selectSku.number >= selectSku.stockNumber) {
				selectSku.number = selectSku.stockNumber
				return uni.showToast({ title: '库存不足！', icon: 'none' })
			}
			if (selectSku.number < selectSku.stockNumber) {
				if (this.timer) clearTimeout(this.timer)
				++selectSku.number
				this.timer = setTimeout(() => {
					this.handleUpdateCart(selectSku.skuId, selectSku.number)
				}, 600)
			}
		},

		/**
		 * 请求服务端更新购物车数量
		 * @param skuId :需要更新的skuId
		 * @param number: 数量
		 */

		async handleUpdateCart(skuId, number) {
			try {
				uni.showLoading()
				await updateNumberCartGoodsApi({ skuId, number }) // 重新算钱和数量
				await this.getShopCartData(this.type)
				uni.hideLoading()
			} catch (e) {
				console.log(e)
				uni.hideLoading()
			}
		},

		/**
		 * 选中店铺
		 * @param shopIndex 店铺索引
		 * @param type 0否1是
		 */

		handleSelectShop(shopIndex, type) {
			const shopObj = this.shopCartList[shopIndex]
			shopObj.selected = type
			// 设置当前店铺下的所有sku
			shopObj.skus.forEach((skuObj) => {
				skuObj.selected = type
			})
			this.handleSetGroupGood(shopIndex)
			this.$emit('update-msg', this.shopCartList)
		},

		/**
		 * 商品单选
		 * @param shopIndex 店铺索引shopCartList
		 * @param skuIndex sku索引shopCartList[index].skus
		 * @param type 是否选中 0否1是
		 */

		handleSelectSku(shopIndex, skuIndex, type) {
			const shopObj = this.shopCartList[shopIndex]
			const skuObj = this.shopCartList[shopIndex].skus[skuIndex]
			skuObj.selected = type
			if (type === 1) {
				// 过滤店铺内未选择的sku
				const noSelectSkuList = shopObj.skus.filter((sku) => sku.selected === 0)
				if (noSelectSkuList.length === 0) {
					shopObj.selected = 1
				} else {
					shopObj.selected = 0
				}
			} else {
				shopObj.selected = type
			}
			// 渲染组合商品
			this.handleSetGroupGood(shopIndex)
			this.$emit('update-msg', this.shopCartList)
		},

		/**
		 * 全选
		 * @param type 是否选中 0否1是
		 */

		handleSelectAll(type) {
			this.shopCartList.forEach((shopObj, shopIndex) => {
				// 组合支付商品数量
				const goodsOfJointNumber = shopObj.skus.reduce((prev, skuObj) => {
					skuObj.selected = type
					// 如果是组合支付
					if (skuObj.selected === 1 && skuObj.activityType === 6) {
						return prev + skuObj.number
					}
				}, 0)
				shopObj.selected = type
				shopObj.priceNumber = goodsOfJointNumber
				shopObj.currentRules = {}
				// 处理选中的组合商品
				if (type === 1) this.handleSetGroupGood(shopIndex)
			})
			this.$emit('update-msg', this.shopCartList)
		},

		/**
		 * 处理组合商品(设置currentRules渲染横幅)
		 * @param shopIndex
		 */

		handleSetGroupGood(shopIndex) {
			const shopObj = this.shopCartList[shopIndex]
			shopObj.currentRules = {}
			shopObj.priceNumber = 0
			shopObj.skus.forEach((skuObj) => {
				if (skuObj.activityType === 6 && skuObj.selected === 1) {
					shopObj.priceNumber += skuObj.number
				}
			})
			const shopRules = this.shopCartList[shopIndex].rules
			for (let i = 0; i < shopRules.length; i++) {
				if (shopRules[i].number === shopObj.priceNumber) {
					shopObj.currentRules = shopRules[i]
					break
				} else if (shopRules[shopRules.length - 1].number < shopObj.priceNumber) {
					shopObj.currentRules = shopRules[shopRules.length - 1]
					break
				}
			}
		},

		/**
		 * 执行删除
		 * @return {Promise<void>}
		 */

		async handleDeleteCartSelected(cb) {
			let ids = []
			for (const shopObj of this.shopCartList) {
				ids = [...ids, ...shopObj.skus.filter((sku) => sku.selected === 1 || sku.selected === true).map((sku) => sku.skuId)]
			}
			await deleteCartGoodsApi({ ids })
			cb && typeof cb === 'function' && cb()
			await this.getShopCartData(this.type)
		}
	}
}
</script>

<style lang="scss" scoped>
.cart-list-box {
	box-sizing: border-box;

	.itemBox {
		.item {
			background: #fff;
			border-bottom: 16rpx solid #F8F9FA;
			overflow-y: auto;

			.shop-box {
				margin-top: 5rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				border-bottom: 1px solid #eee;
				position: relative;

				.shop-name-box {
					display: flex;
					flex-direction: row;
					align-items: center;

					.shop-img {
						width: 36rpx;
						height: 36rpx;
						margin-right: 10rpx;
					}

					.shop-name {
						font-size: 30rpx;
						color: #333;
						font-weight: bold;
						display: inline-block;
						margin-left: 10rpx;
					}

					.arrow-right-img {
						position: absolute;
						right: 30rpx;
					}
				}
			}

			.rulesBox {
				height: 86rpx;
				background: #F9F6F1;
				padding: 0 20rpx;

				image {
					width: 126rpx;
					height: 46rpx;
				}
			}

			.product-list-box {
				margin: 8rpx 0;

				.pro-item {
					display: flex;
					flex-direction: row;
					align-items: center;

					.pro-r {
						flex: 1;
						border-bottom: 1px solid #eee;
						display: flex;
						flex-direction: row;
						padding: 30rpx 30rpx 30rpx 0;
						box-sizing: border-box;
						overflow: hidden;

						.pro-img {
							width: 180rpx;
							height: 180rpx;
							border-radius: 10rpx;
							margin-right: 30rpx;
						}

						.pro-r-r {
							flex: 1;
							font-size: 26rpx;
							color: #333;
							overflow: hidden;
							display: flex;
							flex-direction: column;
							justify-content: space-between;

							.pro-name {
								height: 66rpx;
								line-height: 33rpx;
								display: -webkit-box;
								overflow: hidden;
								text-overflow: ellipsis;
								word-break: break-all;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 2;
							}

							.sku-box {
								width: auto;
								display: inline;
								height: 40rpx;
								border-radius: 4rpx;
								padding: 0 0 0 10rpx;
								box-sizing: border-box;
								font-size: 24rpx;
								color: #999;

								text {
									border: 2rpx solid #E4E5E6;
									padding: 2rpx 10rpx;
								}
							}

							.pro-price-num-box {
								display: flex;
								flex-direction: row;
								align-items: center;
								justify-content: space-between;

								.pro-price-box {
									font-size: 36rpx;
									color: #333333;
									font-weight: 400;

									.fuhao {
										font-size: 24rpx;
									}
								}

								.pro-num-box {
									width: 140rpx;
									height: 40rpx;
									border: 1px solid #ddd;
									border-radius: 4rpx;
									display: flex;
									flex-direction: row;
									justify-content: space-between;
									overflow: hidden;

									.num-btn {
										font-size: 34rpx;
										color: #999999;
										display: inline-block;
										width: 40rpx;
										text-align: center;
										line-height: 32rpx;
										height: 40rpx;
									}

									.num-btn.r {
										border-right: 1px solid #ddd;
									}

									.num-btn.l {
										border-left: 1px solid #ddd;
									}

									.num {
										font-size: 26rpx;
										color: #333;
									}
								}
							}
						}
					}
				}

				.pro-item:last-of-type .pro-r {
					border-bottom: none;
				}
			}
		}
	}

	.itemBox:first-child {
		.shop-box {
			border-top: 2rpx solid #eee;
		}
	}

	.itemBox:last-child {
		.item {
			border-bottom: none;
		}
	}
}
</style>
