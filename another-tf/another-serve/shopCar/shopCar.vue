<template>
	<view class="content">
		<!-- 骨架屏 -->
		<tui-skeleton el-color="#efefef" bg-color="#fff" :loading="loading && isFirstComeIn" :animation="true"></tui-skeleton>
		<global-loading />
		<!-- 购物车 -->
		<view class="tui-skeleton">
			<view v-if="!isEmpty">
				<tui-sticky bg-color="#fff">
					<view class="cart-bg  tui-skeleton-fillet">
						<view class="cart-num-box">
							<image class="  tui-skeleton-fillet" src="../../../static/images/new-user/fee.icon.png"></image>
							<text v-if="!showManage" class="btn-box " @click="showManage = !showManage">
								管理
							</text>
							<text v-if="showManage" class="btn-box" @click="showManage = !showManage">
								完成
							</text>
						</view>
						<view>
							<text class="num-box tui-skeleton-fillet">
								共
								<text class="num">{{ settleAccountsObj.allNum }}</text>
								件宝贝
							</text>
						</view>
					</view>
				</tui-sticky>
				<view class="cart-list-box">
					<view v-for="(item, index) in dataList" :key="item.shopId" class="itemBox">
						<view v-if="item.skus.length > 0" class="item">
							<view class="shop-box">
								<image v-if="item.selected === 1" mode="aspectFill  tui-skeleton-fillet"
									src="../../../static/images/new-business/shopCar/selectActive.png" class="cart-select-img"
									@click.stop="handleSelectShop(index, 0)"></image>
								<image v-else mode="aspectFill  tui-skeleton-fillet"
									src="../../../static/images/new-business/shopCar/selectEmpty.png" class="cart-select-img"
									@click.stop="handleSelectShop(index, 1)"></image>
								<view class="shop-name-box  tui-skeleton-fillet"
									@click="go(`${jumpObj.store}?storeId=${item.shopId}`)">
									<image src="../../../static/images/new-business/shopCar/orderStoreIcon.png" class="shop-img"></image>
									<text class="shop-name">{{ item.shopName }}</text>
									<image src="../../../static/images/new-business/shopCar/arrowRight.png" class="arrow-right-img"></image>
								</view>
							</view>
							<view v-if="item.currentRules && item.currentRules.number" class="rulesBox flex-items">
								<image class="mar-right-20" src="../../../static/images/new-business/shopCar/zuheIcon.png"></image>
								<view class="fs24 font-color-C83732">
									已满足【{{ item.currentRules.price }}元任选{{ item.currentRules.number }}件】！
								</view>
							</view>
							<view v-for="(skuItem, cIndex) in dataList[index].skus" class="product-list-box ">
								<view class="pro-item"
									@click="go(`${jumpObj.detail}?shopId=${item.shopId}&productId=${skuItem.productId}&skuId=${skuItem.skuId}`)">
									<image v-if="skuItem.selected == 1" mode="aspectFill  tui-skeleton-fillet"
										src="../../../static/images/new-business/shopCar/selectActive.png" class="cart-select-img"
										@click.stop="handleSelectSku(index, cIndex, 0)"></image>
									<image v-else mode="aspectFill  tui-skeleton-fillet"
										src="../../../static/images/new-business/shopCar/selectEmpty.png" class="cart-select-img"
										@click.stop="handleSelectSku(index, cIndex, 1)"></image>
									<view class="pro-r">
										<image :src="skuItem.image" class="pro-img default-img  tui-skeleton-fillet"></image>
										<view class="pro-r-r  tui-skeleton-fillet">
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

				<!-- #ifdef H5 -->
				<view class="cart-bottom-box-h5">
					<!-- #endif -->
					<!-- #ifndef H5 -->
					<view class="cart-bottom-box-app">
						<!-- #endif -->
						<view class="cart-bottom">
							<view class="left">
								<image v-if="settleAccountsObj.isAllCheck" mode="aspectFill"
									src="../../../static/images/new-business/shopCar/selectActive.png" class="cart-select-img"
									@click="handleSelectAll(0)"></image>
								<image v-else mode="aspectFill" src="../../../static/images/new-business/shopCar/selectEmpty.png"
									class="cart-select-img" @click="handleSelectAll(1)"></image>
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
			</view>
			<!-- 购物车为空 -->
			<view v-if="isEmpty" class="emptyCart-box flex-items-plus flex-column">
				<image class="emptyCart-img" src="../../../static/images/new-business/shopCar/cartEmpty.png"></image>
				<label class="font-color-999 fs26 mar-top-30">你的购物车还没有宝贝哦</label>
				<label class="font-color-999 fs26 mar-top-10">快去首页选一个吧～</label>
				<view class="goToShopping" @click="$switchTab(jumpObj.shopping)">
					去购物
				</view>
			</view>

			<!-- 热门推荐 -->
			<!-- <HotTemplate class="tui-skeleton-fillet" /> -->

			<view style="width: 100%;height: 120rpx;background-color:#fff;"></view>

			<!-- 删除确认弹窗 -->
			<DeleteModal :show-tip.sync="showDeleteModal" @confirm="handleDoDelete"></DeleteModal>
		</view>
	</view>
</template>

<script>
// import HotTemplate from '../../../components/hoteRecommed/index.vue'
import DeleteModal from './components/DeleteModal'
import api from '../../../components/canvasShow/config/api'
import { T_STORAGE_KEY, T_SKU_ITEM_DTO_LIST } from '../../../constant'
import { defaultCartList, getCartNumberBySelect, getPriceBySelect } from './cartUtils'
import lodash from 'lodash'
let cacheKey = ''
const { request2 } = require('../../../utils/request')
const API = require('./api')
export default {
	name: 'Cart',
	components: {
		// HotTemplate,
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
				// const res = await request2(API.ShoppingCart, {}, 'GET')

				const res = await request2({
					url: API.api.ShoppingCart,
					data: {},
					method: 'GET'
				})
				this.dataList = res.data
				this.settleAccountsObj.allNum = this.dataList.length
				if (this.dataList.length === 0) {
					this.isEmpty = true
					uni.setStorageSync('allCartNum', 0)
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
				this.handleRenderCart()
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
					request2(api.getPrices, {
						shopId: item.shopId,
						ids: item.ids,
						page: 1,
						pageSize: 10
					}, 'GET').then((res) => {
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
			const { allNumber, checkNumber, isAllCheck } = await getCartNumberBySelect(this.dataList)
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
			await request2(API.UpdateNumberCart, {
				skuId,
				number
			}, 'POST')
		}, 500),

		/**
		 * 选中店铺
		 * @param shopIndex 店铺索引
		 * @param type 0否1是
		 */

		handleSelectShop(shopIndex, type) {
			const shopObj = this.dataList[shopIndex]
			const shopCarts = [{
				shopId: shopObj.shopId,
				skus: []
			}]
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
			this.handleUpdateSelected(shopCarts)
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
			const shopCarts = [{
				shopId: shopObj.shopId,
				skus: [{
					skuId: skuObj.skuId,
					selected: skuObj.selected
				}]
			}]
			if (type === 1) {
				// 过滤店铺内未选择的sku
				const noSelectSkuList = shopObj.skus.filter((sku) => sku.selected === 0)
				if (noSelectSkuList.length >= 0) {
					shopObj.selected = 0
				} else {
					shopObj.selected = 1
				}
			} else {
				shopObj.selected = type
			}
			// 渲染组合商品
			this.handleSetGroupGood(shopIndex)
			this.handleUpdateSelected(shopCarts)
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
			this.handleUpdateSelected([])
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
		 * 更新缓存sku勾选和价格、数量显示
		 * @param shopCarts:{shopId:number,skus:{skuId:number,select:number}}[] 只有一个对象（店铺）全选传空数组
		 */

		handleUpdateSelected(shopCarts) {
			this.handleSetCache(shopCarts)
			this.handleUpdateMoneyAndNum()
		},

		/**
		 * 设置购物车本地缓存（先存入本地缓存，再调用handleRenderCart根据本地缓存渲染）
		 * @param shopCarts:{shopId:number,skus:{skuId:number,select:number}}[] 只有一个对象（店铺）全选传空数组
		 */

		handleSetCache(shopCarts) {
			let cartInfo = uni.getStorageSync(cacheKey)
			if (cartInfo === '') {
				// 全选
				if (shopCarts.length <= 0) {
					// 全选直接缓存整个列表
					uni.setStorageSync(cacheKey, JSON.stringify(this.dataList))
					// 渲染视图
					this.handleRenderCart()
					return
				}
				// 无购物车信息
				cartInfo = shopCarts
				uni.setStorageSync(cacheKey, JSON.stringify(cartInfo))
			} else {
				cartInfo = JSON.parse(cartInfo)
				// 全选
				if (shopCarts.length <= 0) {
					// 全选直接缓存整个列表
					uni.setStorageSync(cacheKey, JSON.stringify(this.dataList))
					// 渲染视图
					this.handleRenderCart()
					return
				}
				// 看了代码逻辑结构，一次只会传一个商铺过来，大胆取0
				const shopItem = shopCarts[0]
				const cacheHaveInfo = cartInfo.findIndex((item) => item.shopId === shopItem.shopId)
				if (cacheHaveInfo < 0) {
					// 如果缓存中不存在当前商店信息，写入缓存
					cartInfo.push(shopItem)
				} else {
					// 获取到缓存项
					const cacheShopItem = cartInfo[cacheHaveInfo]
					// 判断传入的sku大小，sku length为1就是点单项，sku length>1就是点击了整个店铺
					if (shopItem.skus.length > 1) {
						// 点击整个店铺，直接赋值
						cartInfo[cacheHaveInfo] = shopItem
					} else {
						// 点击单项sku，获取到sku // 数据结构只会传入一项
						const shopItemSkuItem = shopItem.skus[0]
						// 在缓存中寻找
						const cacheShopItemSkuItemIndex = cacheShopItem.skus.findIndex((item) => item.skuId === shopItemSkuItem.skuId)
						cacheShopItemSkuItemIndex >= 0 ? cacheShopItem.skus[cacheShopItemSkuItemIndex] = shopItemSkuItem : cacheShopItem.skus.push(shopItemSkuItem)
					}
				}
				// 逻辑处理完毕更新缓存
				uni.setStorageSync(cacheKey, JSON.stringify(cartInfo))
				// 渲染视图
				this.handleRenderCart()
			}
		},

		/**
		 * 根据本地缓存渲染购物车勾选
		 * @constructor
		 */

		handleRenderCart() {
			// 取消所有勾选
			this.dataList.forEach((shop) => {
				shop.selected = 0
				shop.skus.forEach((sku) => {
					sku.selected = 0
				})
			})
			// 校验缓存中的数据是否存在于购物车中
			this.handleCheckCacheAndUpdate()
			// 缓存内购物车信息
			let cartInfo = uni.getStorageSync(cacheKey)
			if (cartInfo === '') return
			cartInfo = JSON.parse(cartInfo)

			// 遍历购物车信息，寻找缓存比对
			this.dataList.forEach((nowCartShopItem) => {
				let shopSelect = 1
				const cacheCartShopItem = cartInfo.find((item) => item.shopId === nowCartShopItem.shopId)
				if (cacheCartShopItem) {
					// 如果缓存中有当前店铺，遍历当前购物车sku
					nowCartShopItem.skus.forEach((nowCartSkuItem) => {
						const cacheCartSkuItem = cacheCartShopItem.skus.find((item) => item.skuId === nowCartSkuItem.skuId)
						if (cacheCartSkuItem) {
							// 如果有一个未选中当前店铺就不能全选
							!cacheCartSkuItem.selected ? shopSelect = 0 : ''
							nowCartSkuItem.selected = cacheCartSkuItem.selected
						} else {
							shopSelect = 0
						}
					})
				} else {
					shopSelect = 0
				}
				nowCartShopItem.selected = shopSelect
			})
		},

		/**
		 * 比较缓存内数据和后端数据是否一致,并且更新缓存
		 * @constructor
		 */

		handleCheckCacheAndUpdate() {
			// 缓存内购物车信息
			let cartInfo = uni.getStorageSync(cacheKey)
			if (cartInfo === '') return
			cartInfo = JSON.parse(cartInfo)
			// 校验缓存中的数据是否存在于购物车中
			cartInfo.forEach((cacheCartShopItem, cacheCartShopIndex) => {
				const nowCartShopItem = this.dataList.find((item) => item.shopId === cacheCartShopItem.shopId)
				if (!nowCartShopItem) {
					cartInfo.splice(cacheCartShopIndex, 1)
				} else {
					// 存在就校验缓存中的sku在不在后端返回的列表内
					cacheCartShopItem.skus.forEach((cacheCartSkuItem, cacheCartSkuIndex) => {
						const nowCartSkuItem = nowCartShopItem.skus.find((item) => item.skuId === cacheCartSkuItem.skuId)
						if (!nowCartSkuItem) {
							cacheCartShopItem.skus.splice(cacheCartSkuIndex, 1)
						}
					})
				}
			})
			uni.setStorageSync(cacheKey, JSON.stringify(cartInfo))
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
			await request2(API.DeleteCart, { ids }, 'POST')
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

<style
    lang="scss"
    scoped
>
.content {
	//overflow: hidden;
	//opacity: 0;

	.cart-bg {
		width: 100%;
		height: 180rpx;
		background-color: #fff;

		.cart-num-box {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;

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

		.num-box {
			padding: 30rpx 0 30rpx 30rpx;
			box-sizing: border-box;
			font-size: 30rpx;
			color: #C5CACF;
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

					.cart-select-img {
						width: 40rpx;
						height: 40rpx;
						margin: 30rpx;
						box-sizing: border-box;
					}

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
							width: 30rpx;
							height: 30rpx;
							box-sizing: border-box;
							margin-left: 30rpx;
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

						.cart-select-img {
							width: 40rpx;
							height: 40rpx;
							margin: 30rpx;
							box-sizing: border-box;
						}

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

	.cart-bottom-box-h5 {
		position: fixed;
		bottom: 80rpx;
		width: 100%;
		z-index: 99;
	}

	.cart-bottom-box-app {
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

		.cart-select-img {
			width: 40rpx;
			height: 40rpx;
			margin: 30rpx;
			box-sizing: border-box;
		}
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