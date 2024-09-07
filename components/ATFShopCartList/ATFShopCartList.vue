<template>
	<view class="shop-cart-list-container">
		<view v-if="shopCartList && shopCartList.length">
			<view v-for="(item, index) in shopCartList" :key="item.shopId">
				<view v-if="(type === 'single') && item.splicingId">
					<view
						v-if="item.skus && item.skus.length"
						style="padding: 0 0 24rpx 0;overflow-y: auto;" :style="{ maxHeight }"
					>
						<view style="padding: 18rpx 16rpx 18rpx 32rpx;display: flex;align-items: center;border-bottom: 2rpx solid #9e9e9e;">
							<view
								style="display: flex;align-items: center;line-height: 1;margin-left: 30rpx;"
								@click="isToShop && go(`/another-tf/another-user/shop/shop-detail?shopId=${item.shopId}`)"
							>
								<tui-icon :size="24" color="#333333" name="shop"></tui-icon>
								<text
									style="margin-left: 10rpx;font-size: 30rpx;font-weight: bold;color: #333;"
								>
									{{ item.shopName }}
								</text>
								<tui-icon
									v-if="isToShop" name="arrowright" :size="32" unit="rpx"
									color="#999999"
									margin="0 0 0 16rpx"
								></tui-icon>
							</view>
						</view>
						<view
							v-if="item.currentRules && item.currentRules.number"
							style="display: flex;align-items: center;background: #F9F6F1;padding: 6rpx 16rpx 6rpx 32rpx;"
						>
							<ATFActivityImage :type="7" text="组合销售"></ATFActivityImage>
							<view style="font-size: 24rpx;color: #C83732;">
								已满足【{{ item.currentRules.price }}元任选{{ item.currentRules.number }}件】！
							</view>
						</view>
						<view style="padding: 0 26rpx 0 32rpx;">
							<view
								v-for="(section, count) in shopCartList[index].cartUserList" :key="count" style="padding: 8rpx 0;"
							>
								<view
									style="display: flex;align-items: center;margin: 0 0 4rpx 0;padding: 8rpx 0 4rpx 16rpx;font-size: 28rpx;border-bottom: 1rpx solid #fcebeb"
								>
									<tui-icon
										name="people-fill" :size="36" unit="rpx"
										color="#dc362e" margin="0"
									></tui-icon>
									<text style="margin-left: 6rpx;color: #dc362e;">{{ section.name }}</text>
									<text v-if="section.buyerUserId === $store.getters.userInfo.buyerUserId">（我）</text>
								</view>
								<view>
									<view
										v-for="(part, number) in section.cartSkuList" :key="number" style="padding: 8rpx 0;"
									>
										<view style="display: flex;align-items: center;">
											<view
												style="flex: 1;display: flex;padding: 30rpx 0;"
												@click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${item.shopId}&productId=${part.productId}&skuId=${part.skuId}`)"
											>
												<image
													:src="common.seamingImgUrl(part.image)"
													style="width: 180rpx;height: 180rpx;border-radius: 10rpx;margin: 0 30rpx;"
													class="pro-img default-img"
												></image>
												<view
													style="flex: 1;display: flex;flex-direction: column;justify-content: space-between;font-size: 26rpx;color: #333;"
												>
													<view
														style="overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
													>
														{{ part.productName }}
													</view>
													<view
														style="width: fit-content;padding: 0 0 0 10rpx;border-radius: 4rpx;font-size: 24rpx;color: #999;border: 2rpx solid #E4E5E6;padding: 2rpx 10rpx;"
													>
														<text v-if="part.value">{{ part.value }}</text>
														<text v-else>默认规格</text>
													</view>
													<view style="display: flex;align-items: center;justify-content: space-between;">
														<view style="font-size: 36rpx;color: #333333;">
															<text style="font-size: 24rpx;">￥</text>
															<text>{{ part.price }}</text>
														</view>
														<view
															v-if="section.buyerUserId === $store.getters.userInfo.buyerUserId"
															style="display: flex;justify-content: space-between;width: 140rpx;height: 40rpx;border: 1rpx solid #ddd;border-radius: 4rpx;"
														>
															<view
																style="width: 40rpx;height: 40rpx;font-size: 34rpx;color: #999999;text-align: center;line-height: 32rpx;border-right: 1rpx solid #ddd;"
																@click.stop="handleSubUserSku(index, count, number)"
															>
																-
															</view>
															<view style="font-size: 26rpx;color: #333;">{{ part.number }}</view>
															<view
																style="width: 40rpx;height: 40rpx;font-size: 34rpx;color: #999999;text-align: center;line-height: 32rpx;border-left: 1rpx solid #ddd;"
																@click.stop="handleAddUserSku(index, count, number)"
															>
																+
															</view>
														</view>
													</view>
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-else>
					<view
						v-if="item.skus && item.skus.length"
						style="padding: 0 0 24rpx 0;overflow-y: auto;" :style="{ maxHeight }"
					>
						<view style="padding: 18rpx 16rpx 18rpx 32rpx;display: flex;align-items: center;border-bottom: 1rpx solid #eee;">
							<tui-icon
								v-if="item.selected === 1" name="circle-fill" :size="40" unit="rpx"
								color="#c5aa7b" margin="0"
								@click="handleSelectShop(index, 0)"
							></tui-icon>
							<tui-icon
								v-else name="circle" :size="40" unit="rpx"
								color="#cccccc" margin="0"
								@click="handleSelectShop(index, 1)"
							></tui-icon>
							<view
								style="display: flex;align-items: center;line-height: 1;margin-left: 30rpx;"
								@click="isToShop && go(`/another-tf/another-user/shop/shop-detail?shopId=${item.shopId}`)"
							>
								<tui-icon :size="24" color="#333333" name="shop"></tui-icon>
								<text
									style="margin-left: 10rpx;font-size: 30rpx;font-weight: bold;color: #333;"
								>
									{{ item.shopName }}
								</text>
								<tui-icon
									v-if="isToShop" name="arrowright" :size="32" unit="rpx"
									color="#999999"
									margin="0 0 0 16rpx"
								></tui-icon>
							</view>
						</view>
						<view
							v-if="item.currentRules && item.currentRules.number"
							style="display: flex;align-items: center;background: #F9F6F1;padding: 6rpx 16rpx 6rpx 32rpx;"
						>
							<ATFActivityImage :type="7" text="组合销售"></ATFActivityImage>
							<view style="font-size: 24rpx;color: #C83732;">
								已满足【{{ item.currentRules.price }}元任选{{ item.currentRules.number }}件】！
							</view>
						</view>
						<view style="padding: 0 26rpx 0 32rpx;">
							<view
								v-for="(skuItem, cIndex) in shopCartList[index].skus" :key="cIndex" style="padding: 8rpx 0;"
							>
								<view style="display: flex;align-items: center;">
									<tui-icon
										v-if="skuItem.selected == 1" name="circle-fill" :size="40" unit="rpx"
										color="#c5aa7b"
										margin="0" @click="handleChooseSku(index, cIndex, 0)"
									></tui-icon>
									<tui-icon
										v-else name="circle" :size="40" unit="rpx"
										color="#cccccc" margin="0"
										@click="handleChooseSku(index, cIndex, 1)"
									></tui-icon>
									<view
										style="flex: 1;display: flex;padding: 30rpx 0;"
										@click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${item.shopId}&productId=${skuItem.productId}&skuId=${skuItem.skuId}`)"
									>
										<image
											:src="common.seamingImgUrl(skuItem.image)"
											style="width: 180rpx;height: 180rpx;border-radius: 10rpx;margin: 0 30rpx;"
											class="pro-img default-img"
										></image>
										<view
											style="flex: 1;display: flex;flex-direction: column;justify-content: space-between;font-size: 26rpx;color: #333;"
										>
											<view
												style="overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
											>
												{{ skuItem.productName }}
											</view>
											<view
												style="width: fit-content;padding: 0 0 0 10rpx;border-radius: 4rpx;font-size: 24rpx;color: #999;border: 2rpx solid #E4E5E6;padding: 2rpx 10rpx;"
											>
												<text v-if="skuItem.value">{{ skuItem.value }}</text>
												<text v-else>默认规格</text>
											</view>
											<view style="display: flex;align-items: center;justify-content: space-between;">
												<view style="font-size: 36rpx;color: #333333;">
													<text style="font-size: 24rpx;">￥</text>
													<text>{{ skuItem.price }}</text>
												</view>
												<view
													style="display: flex;justify-content: space-between;width: 140rpx;height: 40rpx;border: 1rpx solid #ddd;border-radius: 4rpx;"
												>
													<view
														style="width: 40rpx;height: 40rpx;font-size: 34rpx;color: #999999;text-align: center;line-height: 32rpx;border-right: 1rpx solid #ddd;"
														@click.stop="handleSubSkuNumber(index, cIndex)"
													>
														-
													</view>
													<view style="font-size: 26rpx;color: #333;">{{ skuItem.number }}</view>
													<view
														style="width: 40rpx;height: 40rpx;font-size: 34rpx;color: #999999;text-align: center;line-height: 32rpx;border-left: 1rpx solid #ddd;"
														@click.stop="handleAddSkuNumber(index, cIndex)"
													>
														+
													</view>
												</view>
											</view>
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
import { getShopCartApi, getCartListApi, getPricesCanvasApi, updateNumberCartGoodsApi, deleteCartGoodsApi, updateEndSplicingOrdersApi } from '../../api/anotherTFInterface'

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
		cartType: {
			type: Number,
			default: 2 // 1采购专区购物车，2普通购物车
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
			shopCartList: [], // 购物车数据，每个元素的skus必有值（已对数据处理）。但在商家购物车的情况下，只有cartUserList，且无商品则无元素
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
		// eslint-disable-next-line max-lines-per-function
		async getShopCartData(type = 'all', cb) {
			try {
				this.isLoading = true
				let res
				if (type === 'all') {
					res = await getCartListApi({})
					res.data.forEach((shopObj) => {
						shopObj.priceNumber = 0
						shopObj.rules = []
						shopObj.currentRules = {}
						shopObj.ids = 0
						// 处理下架商品
						shopObj.skus = shopObj.skus.filter((section) => !(section.shelveState === 0)) // shelveState是否上架
						shopObj.skus.forEach((section, i) => {
							if (section.activityType === 6 && section.selected === 1) {
								shopObj.priceNumber += section.number
							}
						})
					})
				} else if (type === 'single') {
					res = await getShopCartApi({ shopId: this.shopId, cartType: this.cartType })
					res.data.forEach((shopObj) => {
						shopObj.priceNumber = 0
						shopObj.rules = []
						shopObj.currentRules = {}
						shopObj.ids = 0
						if (shopObj.cartUserList && shopObj.cartUserList.length) {
							shopObj.cartUserList && shopObj.cartUserList.forEach((section) => {
								section.cartSkuList = section.cartSkuList.filter((part) => !(part.shelveState === 0))
								section.cartSkuList.forEach((part) => {
									if (part.activityType === 6 && part.selected === 1) {
										shopObj.priceNumber += part.number
									}
								})
							})
							// 处理skus数据
							const tempSkus = []
							shopObj.cartUserList && shopObj.cartUserList.map((i) => i.cartSkuList).reduce((t, v) => t.concat(v), [])
								.forEach((part) => {
									const tempSkuItem = tempSkus.find((i) => i.skuId === part.skuId)
									if (tempSkuItem) {
										tempSkuItem.number = tempSkuItem.number + part.number
										tempSkuItem.total = part.price * part.number
									} else {
										tempSkus.push(JSON.parse(JSON.stringify(part)))
									}
								})
							tempSkus.length && (shopObj.skus = tempSkus)
						}
					})
				}
				res.data.forEach((shopObj, shopIndex) => {
					if (shopObj.ids) { // 根据店铺索引获取规则。获取组合定价
						getPricesCanvasApi({
							shopId: shopObj.shopId,
							ids: shopObj.ids,
							page: 1,
							pageSize: 10
						}).then((result) => {
							shopObj.rules = result.data ? result.data[0].rules : {}
							this.handleSetGroupGood(shopIndex)
						})
					}
				})
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

		// 拼单用户SKU数量减
		handleSubUserSku(shopIndex, userIndex, skuIndex) {
			const selectSku = this.shopCartList[shopIndex].cartUserList[userIndex].cartSkuList[skuIndex]
			if (selectSku.number <= 1) {
				if (this.isSubDelete) {
					if (this.shopCartList.reduce((total, value) => total + value.skus.length, 0) <= 1) {
						uni.showModal({
							title: '提示',
							content: '是否将该商品移出购物车，并结束拼单？',
							success: async (res) => {
								if (res.confirm) {
									await deleteCartGoodsApi({ ids: [ selectSku.skuId ] })
									await updateEndSplicingOrdersApi({ splicingId: this.shopCartList[shopIndex].splicingId })
									await this.getShopCartData(this.type)
								}
							}
						})
					} else {
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
					}
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
		// 拼单用户SKU数量加
		handleAddUserSku(shopIndex, userIndex, skuIndex) {
			const selectSku = this.shopCartList[shopIndex].cartUserList[userIndex].cartSkuList[skuIndex]
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

		handleChooseSku(shopIndex, skuIndex, type) {
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
.shop-cart-list-container {
	box-sizing: border-box;
}
</style>
