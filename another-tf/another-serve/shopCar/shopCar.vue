<template>
	<view class="content">
		<BeeBack style="padding: 10upx 0;">
			<view style="display: flex;align-items: center;justify-content: space-between;">
				<BeeIcon name="arrowleft" :size="34" color="#222229" style="width: fit-content;">
				</BeeIcon>
				<text style="flex: 1;margin-left: -40upx;text-align: center;">购物车</text>
			</view>
		</BeeBack>
		<!-- 骨架屏 -->
		<tui-skeleton
			v-if="loading && isFirstComeIn" skeleton-bg-color="#efefef" background-color="#fff"
			:is-loading="loading && isFirstComeIn" active
		></tui-skeleton>
		<!-- 购物车 -->
		<view class="tui-skeleton">
			<view v-if="!isEmpty">
				<view class="cart-bg tui-skeleton-fillet">
					<view class="cart-num-box">
						<view>
							<text class="num-box tui-skeleton-fillet">
								共
								<text class="num">{{ settleAccountsObj.allNum }}</text>
								件宝贝
							</text>
						</view>
						<text v-if="!showManage" class="btn-box " @click="showManage = !showManage">
							管理
						</text>
						<text v-if="showManage" class="btn-box" @click="showManage = !showManage">
							完成
						</text>
					</view>
				</view>
				<view class="cart-list-box">
					<view v-for="(item, index) in dataList" :key="item.shopId" class="itemBox">
						<view v-if="item.skus.length > 0" class="item">
							<view class="shop-box">
								<tui-icon
									v-if="item.selected === 1" name="circle-fill" :size="40" unit="upx"
									color="#c5aa7b"
									margin="40upx" @click="handleSelectShop(index, 0)"
								></tui-icon>
								<tui-icon
									v-else name="circle" :size="40" unit="upx"
									color="#cccccc" margin="40upx"
									@click="handleSelectShop(index, 1)"
								></tui-icon>
								<view class="shop-name-box tui-skeleton-fillet" @click="go(`${jumpObj.store}?storeId=${item.shopId}`)">
									<tui-icon :size="24" color="#333333" name="shop"></tui-icon>
									<text class="shop-name">{{ item.shopName }}</text>
									<tui-icon
										name="arrowright" :size="30" unit="upx" color="#999999"
										margin="0 0 0 30upx"
										class="arrow-right-img"
									></tui-icon>
								</view>
							</view>
							<view v-if="item.currentRules && item.currentRules.number" class="rulesBox flex-items">
								<image class="mar-right-20" src="../../../static/images/new-business/shop/zuheIcon.png"></image>
								<view class="fs24 font-color-C83732">
									已满足【{{ item.currentRules.price }}元任选{{ item.currentRules.number }}件】！
								</view>
							</view>
							<view v-for="(skuItem, cIndex) in dataList[index].skus" :key="cIndex" class="product-list-box">
								<view class="pro-item">
									<tui-icon
										v-if="skuItem.selected == 1" name="circle-fill" :size="40" unit="upx"
										color="#c5aa7b"
										margin="40upx" @click="handleSelectSku(index, cIndex, 0)"
									></tui-icon>
									<tui-icon
										v-else name="circle" :size="40" unit="upx"
										color="#cccccc" margin="40upx"
										@click="handleSelectSku(index, cIndex, 1)"
									></tui-icon>
									<view
										class="pro-r"
										@click="go(`${jumpObj.detail}?shopId=${item.shopId}&productId=${skuItem.productId}&skuId=${skuItem.skuId}`)"
									>
										<image :src="skuItem.image" class="pro-img default-img tui-skeleton-fillet"></image>
										<view class="pro-r-r tui-skeleton-fillet">
											<view class="pro-name">{{ skuItem.productName }}</view>
											<view class="sku-box">
												<text v-if="skuItem.value">{{ skuItem.value }}</text>
												<text v-else>默认规格</text>
												<!-- <text></text> -->
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
				<view class="cart-bottom-box">
					<view class="cart-bottom">
						<view class="left">
							<tui-icon
								v-if="settleAccountsObj.isAllCheck" name="circle-fill" :size="40" unit="upx"
								color="#c5aa7b"
								margin="40upx" @click="handleSelectAll(0)"
							></tui-icon>
							<tui-icon
								v-else name="circle" :size="40" unit="upx"
								color="#cccccc" margin="40upx"
								@click="handleSelectAll(1)"
							></tui-icon>
							<text>全选</text>
						</view>
						<view v-if="!showManage" class="right">
							<view class="price-box">
								<text>合计：</text>
								<text class="price">¥{{ settleAccountsObj.checkMoney }}</text>
							</view>
							<view class="btn-confirm" @click="settlementTap">
								结算（{{ settleAccountsObj.checkNum }}）
							</view>
						</view>
						<view v-if="showManage" class="right">
							<view class="btn-delete" @click="handleOpenDelete">
								删除
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 购物车为空 -->
			<view v-if="isEmpty" class="emptyCart-box flex-items-plus flex-column">
				<image class="emptyCart-img" src="../../../static/images/new-business/shop/bgnull.png"></image>
				<label class="font-color-999 fs26 mar-top-30">你的购物车还没有宝贝哦</label>
				<label class="font-color-999 fs26 mar-top-10">快去首页选一个吧～</label>
				<view class="goToShopping" @click="$switchTab(jumpObj.shopping)">
					去购物
				</view>
			</view>

			<!-- 热门推荐 -->
			<ATFHoteRecommed class="tui-skeleton-fillet" />

			<!-- 删除确认弹窗 -->
			<DeleteModal :show-tip.sync="showDeleteModal" @confirm="handleDoDelete"></DeleteModal>
		</view>
	</view>
</template>

<script>
import DeleteModal from './components/DeleteModal'
import { T_STORAGE_KEY, T_SKU_ITEM_DTO_LIST, T_ALL_CART_NUM } from '../../../constant'
import { getSettlementOrderApi, getCartListApi, updateNumberCartGoodsApi, deleteCartGoodsApi, getPricesCanvasApi } from '../../../api/anotherTFInterface'
import lodash from 'lodash-es'
// 根据选中的购物车数据获取价格和过滤后的用于结算购物车的post数据
async function getPriceBySelect(dataList) {
	uni.showLoading()
	const addCart = []
	// 遍历店铺，获取选中的sku组装数据
	for (let i = 0; i < dataList.length; i++) {
		const shopObj = {}
		const theCurrentShop = dataList[i]
		shopObj.shopId = theCurrentShop.shopId
		shopObj.skus = []
		for (let j = 0; j < theCurrentShop.skus.length; j++) {
			const theCurrentSku = dataList[i].skus[j]
			// 如果是选中的才往当前店铺塞
			if (theCurrentSku.selected) {
				const skusObj = {}
				skusObj.ifLogistics = theCurrentSku.ifLogistics
				skusObj.number = theCurrentSku.number
				skusObj.selected = theCurrentSku.selected
				skusObj.skuId = theCurrentSku.skuId
				shopObj.skus.push(skusObj)
			}
		}
		// 过滤掉sku为空的店铺
		if (shopObj.skus.length > 0) {
			addCart.push(shopObj)
		}
	}
	try {
		const postData = {
			type: 2,
			shops: addCart,
			voucherTotalAll: 0,
			isVoucher: false,
			voucherId: 0
		}
		const res = await getSettlementOrderApi(postData)
		const money = res.data.shops.reduce((previousValue, currentValue) => previousValue + currentValue.total, 0)
		return {
			money: money.toFixed(2),
			shopList: addCart
		}
	} finally {
		uni.hideLoading()
	}
}
// 根据选中的购物车数据获取购物车数量
function getCartNumberBySelect(dataList) {
	let allNumber = 0; let checkNumber = 0; let
		isAllCheck = true
	// 遍历店铺
	for (let i = 0; i < dataList.length; i++) {
		// 当前店铺
		const shopObj = dataList[i]
		// 遍历店铺内部的商品
		for (let j = 0; j < shopObj.skus.length; j++) {
			const good = dataList[i].skus[j]
			allNumber += good.number
			if (good.selected === 1) {
				checkNumber += +good.number
			} else {
				// 如果商品没有选中，但是又勾选了全选
				if (isAllCheck) {
					isAllCheck = false
				}
			}
		}
	}
	// 更新缓存
	uni.setStorageSync(T_ALL_CART_NUM, allNumber)
	// 设置导航条
	if (allNumber > 0) {
		uni.setTabBarBadge({
			index: 3,
			text: allNumber.toString()
		})
	} else {
		uni.removeTabBarBadge({
			index: 3
		})
	}
	return {
		allNumber, checkNumber, isAllCheck
	}
}
// 默认购物车，供骨架屏使用
const defaultCartList = [
	{
		shopId: 1,
		shopName: '12312312321312312',
		selected: 0,
		skus: [
			{
				productId: 1,
				productName: '',
				image: '',
				price: 0,
				number: 0,
				selected: 0
			},
			{
				productId: 2,
				productName: '',
				image: '',
				price: 0,
				number: 0,
				selected: 0
			},
			{
				productId: 3,
				productName: '',
				image: '',
				price: 0,
				number: 0,
				selected: 0
			}
		]
	}
]
let cacheKey = ''

export default {
	name: 'ShopCar',
	components: {
		DeleteModal
	},
	data() {
		return {
			isFirstComeIn: true, // 是否是首次进入
			loading: true, // 是否在加载
			showManage: false, // 是否开启管理
			dataList: [
				{ skus: [] }
			], // 购物车数据
			showDeleteModal: false, // 是否展示删除
			isEmpty: false, // 购物车是否为空
			userInfo: {}, // 用户信息
			// 跳转对象
			jumpObj: {
				store: '/community-center/shop/shop-detail',
				detail: '/another-tf/another-serve/goodsDetails/index',
				shopping: '/pages/index/index'
			},
			// 底部结算条对象
			settleAccountsObj: {
				allNum: 0, // 所有sku数量（头部）
				checkNum: 0, // 选中sku的数量
				checkMoney: 0, // 选中sku的总价
				isAllCheck: false // 是否宣布选中
			}
		}
	},
	onShow() {
		this.isFirstComeIn = true
		this.loading = true
		this.userInfo = uni.getStorageSync(T_STORAGE_KEY)
		cacheKey = this.userInfo.buyerUserId + 'cart_info'
		this.dataList = defaultCartList
		this.isEmpty = false
		this.getDataList()
	},
	methods: {
		/**
		 * 获取购物车列表
		 */

		getDataList: lodash.debounce(async function () {
			this.isEmpty = false
			this.loading = true
			try {
				const res = await getCartListApi({})
				this.dataList = res.data
				this.settleAccountsObj.allNum = this.dataList.length
				if (this.dataList.length === 0) {
					this.isEmpty = true
					uni.setStorageSync(T_ALL_CART_NUM, 0)
					uni.removeTabBarBadge({
						index: 3
					})
				}
				// sku为空的山沟
				const emptySkuShopArray = []
				this.dataList.forEach((shopObj, shopIndex) => {
					shopObj.currentIds = []
					shopObj.priceNumber = 0
					shopObj.rules = []
					shopObj.currentRules = {}
					shopObj.ids = 0
					// 处理下架商品
					for (let i = shopObj.skus.length - 1; i >= 0; i--) {
						// shelveState是否上架
						if (shopObj.skus[i].shelveState === 0) {
							// 删掉下架商品
							// todo 失效商品
							shopObj.skus.splice(i, 1)
							continue
						}
						if (shopObj.skus[i].activityType === 6 && shopObj.skus[i].selected === 1) {
							shopObj.currentIds.push(shopObj.skus[i].priceId)
							shopObj.priceNumber += shopObj.skus[i].number
						}
					}
					for (let i = 0; i < shopObj.skus.length; i++) {
						if (shopObj.skus[i].activityType === 6) {
							shopObj.ids = shopObj.skus[i].priceId
							break
						}
					}
					// 根据店铺索引获取规则
					this.getData(shopObj).then((res) => {
						shopObj.rules = res.data ? res.data[0].rules : {}
						this.handleSetGroupGood(shopIndex)
					})
					shopObj.skus.length === 0 ? emptySkuShopArray.push(shopObj) : undefined
				})
				this.isEmpty = emptySkuShopArray.length >= this.dataList.length
				// 数据回来就直接关闭骨架屏
				this.loading = false
				this.isFirstComeIn = false
				await this.handleUpdateMoneyAndNum()
			} finally {
				uni.hideLoading()
			}
		}, 500),

		/**
		 * 获取组合定价
		 * @param item
		 * @return {Promise<unknown>}
		 */

		getData(item) {
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

		async handleSubSkuNumber(shopIndex, skuIndex) {
			const selectSku = this.dataList[shopIndex].skus[skuIndex]
			if (selectSku.number <= 1) {
				return uni.showToast({
					title: '亲！至少一件哦！',
					icon: 'none'
				})
			}
			--selectSku.number
			await this.handleUpdateCart(selectSku.skuId, selectSku.number)
			setTimeout(async () => {
				await this.getDataList()
			}, 500)
		},

		/**
		 * 单个SKU数量加
		 * @param shopIndex 店铺索引
		 * @param skuIndex index店铺下sku商品索引
		 */

		async handleAddSkuNumber(shopIndex, skuIndex) {
			const selectSku = this.dataList[shopIndex].skus[skuIndex]
			if (selectSku.number >= selectSku.stockNumber) {
				selectSku.number = selectSku.stockNumber
				return uni.showToast({
					title: '库存不足！',
					icon: 'none'
				})
			}
			if (selectSku.number < selectSku.stockNumber) {
				++selectSku.number
				await this.handleUpdateCart(selectSku.skuId, selectSku.number)
				setTimeout(async () => {
					await this.getDataList()
				}, 500)
			}
		},

		/**
		 * 更新总价和总数（底部结算栏，头部总数）
		 * @return {Promise<void>}
		 */

		async handleUpdateMoneyAndNum() {
			const { allNumber, checkNumber, isAllCheck } = getCartNumberBySelect(this.dataList)
			const { money } = await getPriceBySelect(this.dataList)
			this.settleAccountsObj.checkMoney = money
			this.settleAccountsObj.isAllCheck = isAllCheck
			this.settleAccountsObj.allNum = allNumber
			this.settleAccountsObj.checkNum = checkNumber
		},

		/**
		 * 请求服务端更新购物车数量
		 * @param skuId :需要更新的skuId
		 * @param number: 数量
		 */

		handleUpdateCart: lodash.debounce(async function (skuId, number) {
			// 重新算钱和数量
			await updateNumberCartGoodsApi({
				skuId,
				number
			})
		}, 500),

		/**
		 * 选中店铺
		 * @param shopIndex 店铺索引
		 * @param type 0否1是
		 */

		handleSelectShop(shopIndex, type) {
			const shopObj = this.dataList[shopIndex]
			const shopCarts = [ {
				shopId: shopObj.shopId,
				skus: []
			} ]
			shopObj.selected = type
			// 设置当前店铺下的所有sku
			shopObj.skus.forEach((skuObj) => {
				skuObj.selected = type
				shopCarts[0].skus.push({
					skuId: skuObj.skuId,
					selected: skuObj.selected
				})
			})
			this.handleSetGroupGood(shopIndex)
			this.handleUpdateMoneyAndNum()
		},

		/**
		 * 商品单选
		 * @param shopIndex 店铺索引dataList
		 * @param skuIndex sku索引dataList[index].skus
		 * @param type 是否选中 0否1是
		 */

		handleSelectSku(shopIndex, skuIndex, type) {
			const shopObj = this.dataList[shopIndex]
			const skuObj = this.dataList[shopIndex].skus[skuIndex]
			skuObj.selected = type
			const shopCarts = [ {
				shopId: shopObj.shopId,
				skus: [ {
					skuId: skuObj.skuId,
					selected: skuObj.selected
				} ]
			} ]
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
			this.handleUpdateMoneyAndNum()
		},

		/**
		 * 全选
		 * @param type 是否选中 0否1是
		 */

		handleSelectAll(type) {
			this.dataList.forEach((shopObj, shopIndex) => {
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
				if (type === 1) {
					this.handleSetGroupGood(shopIndex)
				}
			})
			this.handleUpdateMoneyAndNum()
		},

		/**
		 * 处理组合商品(设置currentRules渲染横幅)
		 * @param shopIndex
		 */

		handleSetGroupGood(shopIndex) {
			const shopObj = this.dataList[shopIndex]
			shopObj.currentRules = {}
			shopObj.priceNumber = 0
			shopObj.skus.forEach((skuObj) => {
				if (skuObj.activityType === 6 && skuObj.selected === 1) {
					shopObj.priceNumber += skuObj.number
				}
			})
			const shopRules = this.dataList[shopIndex].rules
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
		 * 打开删除弹窗
		 */

		handleOpenDelete() {
			if (!this.settleAccountsObj.checkNum) {
				return uni.showToast({
					title: '请先选择对应商品',
					icon: 'none'
				})
			}
			this.showDeleteModal = true
		},

		/**
		 * 执行删除
		 * @return {Promise<void>}
		 */

		async handleDoDelete() {
			let ids = []
			for (const shopObj of this.dataList) {
				ids = [...ids, ...shopObj.skus.filter((sku) => sku.selected === 1 || sku.selected === true).map((sku) => sku.skuId)]
			}
			await deleteCartGoodsApi({ ids })
			this.showDeleteModal = false
			await this.getDataList()
		},

		/**
		 * 结算购物车
		 * @return {Promise<void>}
		 */

		async settlementTap() {
			const { shopList } = await getPriceBySelect(this.dataList)
			uni.setStorageSync(T_SKU_ITEM_DTO_LIST, shopList)
			this.go('/another-tf/another-serve/orderConfirm/index?type=2')
		}
	}
}
</script>

<style lang="scss" scoped>
.content {
	box-sizing: border-box;
	padding-bottom: 120upx;

	.cart-bg {
		width: 100%;
		background-color: #fff;

		.cart-num-box {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;

			.num-box {
				padding: 30rpx 0 30rpx 30rpx;
				box-sizing: border-box;
				font-size: 30rpx;
				color: #C5CACF;
			}

			image {
				width: 286rpx;
				height: 72rpx;
			}

			.btn-box {
				font-size: 30rpx;
				color: #333333;
				padding: 30rpx;
				box-sizing: border-box;
				display: inline-block;
			}
		}

	}

	.cart-list-box {
		box-sizing: border-box;

		.itemBox {
			.item {
				background: #fff;
				border-bottom: 16rpx solid #F8F9FA;

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

	.emptyCart-box {
		margin: 100rpx 0;

		.emptyCart-img {
			width: 216rpx;
			height: 156rpx;
		}

		.goToShopping {
			width: 282rpx;
			height: 84rpx;
			line-height: 84rpx;
			text-align: center;
			background: #333333;
			margin-top: 40rpx;
			color: #FFEBC4;
			font-size: 28rpx;
		}
	}

	.cart-bottom-box {
		position: fixed;
		bottom: 0rpx;
		width: 100%;
		z-index: 99;
	}

	.cart-bottom {
		height: 120rpx;
		background: #fff;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		border-top: 1rpx solid #eee;
	}

	.left {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 28rpx;
		color: #666;
	}

	.right {
		display: flex;
		flex-direction: row;
		align-items: center;
		box-sizing: border-box;

		.price-box {
			font-size: 30rpx;
			color: #333;

			.price {
				font-size: 40rpx;
				color: #C83732;
				font-weight: bold;
			}
		}

		.btn-confirm {
			width: 232rpx;
			height: 120rpx;
			background: #333333;
			margin-left: 18rpx;
			text-align: center;
			line-height: 120rpx;
			font-size: 28rpx;
			color: #FFEBC4;
		}

		.btn-delete {
			width: 232rpx;
			height: 120rpx;
			line-height: 120rpx;
			text-align: center;
			font-size: 28rpx;
			color: #FFFFFF;
			background: #C83732;
		}
	}
}
</style>
