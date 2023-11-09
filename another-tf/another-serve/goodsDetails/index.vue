<template>
	<view class="goods-details-container" @scroll="handlePageScroll">
		<BeeBack>
			<view style="display: flex;align-items: center;justify-content: space-between;">
				<BeeIcon
					name="arrowleft" :size="34" color="#222229"
					style="width: fit-content;"
				>
				</BeeIcon>
				<text style="flex: 1;margin-left: -40upx;text-align: center;line-height: 2.5;">商品详情</text>
			</view>
		</BeeBack>
		<view style="padding-bottom: 160upx;">
			<!--  拼团滚动 -->
			<view class="news-box">
				<view class="news-bg">
					<swiper
						class="goodsImgswiper-box" :vertical="true" :circular="true" interval="8000"
						duration="2000"
						:autoplay="true"
					>
						<swiper-item v-for="(item, index) in broadCastList" :key="index">
							<view class="news-item flex-items">
								<image class="item-avatar" :src="item.headImage"></image>
								<view class="news-item-user">{{ item.name }}</view>
								<view class="news-item-info">{{ item.timeStr }}</view>
								<view v-if="item.type === 1" class="news-item-info">
									给了好评
								</view>
								<view v-if="item.type === 2" class="news-item-info">
									正在拼单
								</view>
								<view v-if="item.type === 3" class="news-item-info">
									拼单成功
								</view>
								<view v-if="item.type === 4" class="news-item-info">
									下单
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>

			<!-- 轮播图+分享+价格名称+活动倒计时+优惠券 -->
			<GoodActivityDetail
				ref="goodActivityDetail" :sku-select="selectedSku" :product-info="productData"
				:time-active-type="timeActiveType" :mark-tools="markTools" :shop-mark-tools="shopMarkTools"
				@activityEnd="handleActivityEnd" @couponClick="handleShowCoupon"
			/>

			<!-- 发货 -->
			<view v-if="productData.ifLogistics" class="express-box flex-items flex-row fs24">
				<label class="fs24 font-color-999 mar-right-20 ">发货</label>
				<tui-icon
					v-if="productData.receive && productData.receive.receiveAdress" name="gps" :size="14"
					color="#c1c1c1"
				></tui-icon>
				<label v-if="productData.receive && productData.receive.receiveAdress" class="mar-left-10 mapName mar-right-30">
					{{ productData.receive.receiveAdress }}
				</label>
				<label>快递：¥ {{ productData.logisticsPrice || 0 }}</label>
			</view>

			<!-- 选择SKU -->
			<view class="fs24 chooseSize-box flex-start" @click=" handleShowGoodsSkuSelect(6)">
				<view class="chooseSize-content flex-items flex-row flex-sp-between">
					<view class="flex-row-plus ">
						<label class="fs26 mar-left-30 font-color-999">选择</label>
						<view class="valueBox mar-left-20 flex-items">
							<view v-for="(item, index) in currentSuk" :key="index" class="mar-right-10">
								{{ item.skuText || '-' }}
							</view>
						</view>
					</view>
					<tui-icon :size="24" color="#baa174" name="arrowright"></tui-icon>
				</view>
			</view>

			<!-- 结合销售 -->
			<CombinedSales :pid="productId" :product-data="productData"></CombinedSales>
			<!-- 拼团 -->
			<view v-if="selectedSku.activityType === 1" class="borRig-line-20"></view>
			<!-- 拼单列表 -->
			<view v-if="selectedSku.activityType === 1 && topThreeCollageOrders.length > 0" class="goodsDiscount">
				<view class="questionTit mar-left-30 flex-items flex-row flex-sp-between">
					<label class="">这些人正在拼单</label>
					<view class="allMoreBox">
						<view class="allMore" @click="handleOpenGroupBookingList">
							查看全部
						</view>
						<tui-icon :size="24" color="#baa174" name="arrowright" margin="0 0 0 10upx"></tui-icon>
					</view>
				</view>
				<view v-for="(Gitem, index) in topThreeCollageOrders" :key="index" class="groupBuy">
					<view v-if="Gitem.time > 0" class="groupBuyList">
						<view class="groupBuyItem">
							<view class="leftAvatar">
								<img :src="Gitem.headImage" alt="">
								<span>{{ Gitem.name }}</span>
							</view>
							<view class="rightInfo">
								<view class="groupBuyTime" style="width: 70%;">
									<view class="needPeople flex-row-plus">还差<b>{{ Gitem.person }}人</b>拼成</view>
									<view class="endDate">剩余{{ handleGetDownTime(Gitem.time) }}</view>
								</view>
								<view class="groupBuyBtn" @click="handleGoGroupBooking(Gitem.collageId)">
									和Ta拼
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!--  评价  -->
			<GoodEvaluateAndQuestion
				ref="goodEvaluateAndQuestion" :product-info="productData"
				:comment-list="commentList"
			/>
			<!-- 店铺 -->
			<view class="inStore-box flex-items flex-row flex-sp-between">
				<view class="flex-display flex-row">
					<view>
						<image class="inStore-logo default-img" :src="productData.shopLogo" @click="handleJumpToStore"></image>
					</view>
					<view class="flex-display flex-column mar-left-20">
						<label @click="handleJumpToStore">{{ productData.shopName }}</label>
						<view class="flex-display flex-row fs24 font-color-999 mar-top-5">
							<label>商品总类：{{ productData.classifyNumber }}</label>
							<label class="mar-left-30">已售：{{ productData.number }}件</label>
						</view>
					</view>
				</view>
				<view class="inStore-but" @click="handleJumpToStore">
					<text>去逛逛</text>
					<tui-icon :size="30" color="#ffebc4" name="arrowright"></tui-icon>
				</view>
			</view>
			<!-- 详细信息 -->
			<view class="goodsDetails-box">
				<view class="goodsDetails-title">
					<view class="goodsDetails-Line"></view>
					<label class="goodsDetails-text">宝贝详情</label>
					<view class="goodsDetails-Line"></view>
				</view>
				<view class="goodsDetailsimg-box">
					<view class="">
						<rich-text :nodes="sellDescList"></rich-text>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部购买 -->
		<view class="buygoods-box">
			<view class="buygoodsBut-box flex-row-plus" :style="{ 'height': (isIphone === true ? 160 : 130) + 'rpx' }">
				<view class="btns_container">
					<view class="btns flex-column-plus flex-items" @click="handleJumpToStore">
						<tui-icon :size="24" color="#333333" name="shop"></tui-icon>
						<label class="fs22">店铺</label>
					</view>
					<!-- #ifdef MP-WEIXIN || APP-PLUS || H5 -->
					<view class="btns flex-column-plus mar-left-10 flex-items" @click="handleFlyToService">
						<tui-icon :size="24" color="#333333" name="message"></tui-icon>
						<label class="fs22">客服</label>
					</view>
					<!-- #endif -->
					<view
						class="btns flex-column-plus mar-left-10 flex-items Cart"
						@click="go('/another-tf/another-serve/shopCar/shopCar')"
					>
						<view v-if="allCartNum > 0" class="cartAllNum">
							{{ allCartNum }}
						</view>
						<tui-icon :size="24" color="#333333" name="cart"></tui-icon>
						<label class="fs22">购物车</label>
					</view>
				</view>
				<view class="btns_container">
					<view v-if="productData.shelveState === 0" class="flex-row-plus offShelf">
						商品已下架
					</view>
					<view v-else-if="selectedSku.activityType === 1" class="flex-row-plus flex-items">
						<view class="joinShopCartBut" @click=" handleShowGoodsSkuSelect(4)">
							单独购买
						</view>
						<view class="buyNowBut" @click=" handleShowGoodsSkuSelect(3)">
							我要开团
						</view>
					</view>
					<view v-else class="flex-row-plus flex-items">
						<view class="joinShopCartBut" @click=" handleShowGoodsSkuSelect(1)">
							加入购物车
						</view>
						<view class="buyNowBut" @click=" handleShowGoodsSkuSelect(2)">
							立即购买
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 回到顶部 -->
		<view class="returnTopService-box">
			<view
				class="returnTop-box flex-items-plus flex-column"
				:style="{ 'display': returnTopFlag === true ? 'flex' : 'none' }" @click="handleReturnTop"
			>
				<tui-icon :size="29" color="#c5aa7b" name="top"></tui-icon>
			</view>
		</view>
		<!-- SKU选择器 -->
		<GoodSkuSelect
			ref="skuSelect" :product-data="productData" :selected-sku="selectedSku" :collage-id="collageId"
			@postSelectSku="selectSkuPostProcessor" @getCurrentSku="handleSelectSku"
			@changeCartNum="(num) => allCartNum = num"
		/>
		<!-- 优惠券选择器 -->
		<CouponPopup
			ref="couponPopup" :mark-tools="markTools" :shop-mark-tools="shopMarkTools" :set-top="topLeft"
			:current-active="currentActive"
		></CouponPopup>
		<!-- 拼单弹框 -->
		<tui-popup :show="showGroupBuyList" :mode-class="[ 'fade' ]" class="popupDiscount" @click="showGroupBuyList = false">
			<view class="popupDiscountTit">这些人正在拼单</view>
			<view class="groupBuy">
				<view class="groupBuyList">
					<scroll-view style="height: 480upx;" scroll-y>
						<view v-for="(aitem, index) in selectedSku.collageOrders" :key="index" class="groupBuyItem1">
							<view v-if="aitem.time > 0" class="leftAvatar">
								<img :src="aitem.headImage" alt="">
								<view class="groupBuyTime">
									<view class="needPeople">
										<span>{{ aitem.name }}</span>还差<b>{{ aitem.person }}人</b>
									</view>
									<view class="endDate">剩余{{ handleGetDownTime(aitem.time) }}</view>
								</view>
							</view>
							<view v-if="aitem.time > 0" class="rightInfo">
								<view class="groupBuyBtn" @click.stop="handleGoGroupBooking(aitem.collageId)">
									和Ta拼
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</tui-popup>
	</view>
</template>

<script>
import CombinedSales from './components/combinedSales'
import CouponPopup from './components/coupon-popup'
import GoodEvaluateAndQuestion from './components/GoodEvaluateAndQuestion'
import GoodActivityDetail from './components/GoodActivityDetail'
import GoodSkuSelect from './components/GoodSkuSelect'
import { timeFormatting } from '../../../utils'
import { getProductDetailsByIdApi, bindDistributorSalesCustomerApi, getBroadCastList, getCustomerServiceAppletKfApi, addUserTrackReportDoPointerApi } from '../../../api/anotherTFInterface'
import { T_ALL_CART_NUM } from '../../../constant'

export default {
	name: 'GoodsDetails',
	components: {
		CouponPopup,
		CombinedSales,
		GoodEvaluateAndQuestion,
		GoodActivityDetail,
		GoodSkuSelect
	},
	data() {
		return {
			isIphone: '',
			returnTopFlag: false, // 回到顶部
			productId: '', // 商品ID，有可能屎缓存数据
			shopGroupWorkId: null, // 拼团数据ID
			topThreeCollageOrders: {}, // 当前商品拼单数据
			collageId: 0, // 去拼团时的拼单ID
			broadCastList: [], // 拼团滚动数据
			showGroupBuyList: false, // 是否展示拼单弹窗
			shopGroupWorkTicker: null, // 拼团倒计时定时器
			paramSkuId: null, // 秒杀商品ID
			// 商品详情
			productData: {},
			// 当前选中SKU
			selectedSku: {},
			currentSuk: [], // 选中的SKU（子组件给当前页面做数据渲染）
			buyNum: 1, // 当前选取的SKU购买数量
			storeId: '', // 店铺ID
			commentList: [], // 商品评价列表
			sellDescList: '', // 商品详情长图（富文本）
			timeActiveType: true, // 是否开启活动（非则预热）
			btnType: 1, // 拉起SKU窗口的按钮类型 1加入购物车 2立即购买 3开团 4单独购买 6选择SKU
			allCartNum: 0, // 购物车数量
			markTools: [], // 平台优惠券
			shopMarkTools: [], // 店铺优惠券
			currentActive: 0, // 优惠券选项卡类型
			topLeft: 0, // 距离顶部（返回顶部使用）
			// 埋点对象
			pointOption: {
				inTime: null,
				data: {
					eventType: 1,
					productIds: ''
				}
			}
		}
	},
	created() {
		if (this.ticker) { // 这一段是防止进入页面出去后再进来计时器重复启动
			clearInterval(this.ticker)
		}
		if (this.allCartNum > 99) {
			this.allCartNum = '...'
		}
	},
	beforeDestroy() {

	},
	onShow() {

	},
	onLoad(options) {
		// 页面滚动条归0，不然骨架屏有问题
		uni.pageScrollTo({
			scrollTop: 0,
			duration: 0
		})
		this.productData = {
			logisticsPrice: 0,
			images: ['123', '123', '123'],
			productName: '....',
			ifCollect: 1
		}
		this.selectedSku = {
			activityType: 0,
			originalPrice: 0
		}
		if (options.detail) {
			options = this.$getJumpParam(options)
		}
		let salesId = null
		this.pointOption.inTime = new Date().getTime()
		this.isIphone = getApp().globalData.isIphone
		const item = getApp().globalData.productShareItem
		if (item) {
			const item = getApp().globalData.productShareItem
			this.shopId = parseInt(item.shopId)
			this.productId = item.productId
			this.paramSkuId = item.skuId
			salesId = parseInt(item.salesId)
			getApp().globalData.productShareItem = undefined
		} else {
			this.shopId = parseInt(options.shopId)
			this.productId = options.productId
			this.paramSkuId = options.skuId
			salesId = parseInt(options.salesId)
		}
		// 判断是否是拼团
		if (options.shopGroupWorkId) {
			this.shopGroupWorkId = options.shopGroupWorkId
		}
		this.handleGetProductDetail()
		// 绑定分销关系
		salesId && this.shopId ? this.bindSalesCustomer(salesId, this.shopId) : ''
		this.allCartNum = uni.getStorageSync(T_ALL_CART_NUM)
	},
	onUnload() {
		// 判断是否要埋点
		const nowTime = new Date().getTime()
		if (nowTime - this.pointOption.inTime >= 5000) {
			// 埋点
			this.pointOption.data.productIds = this.productId
			addUserTrackReportDoPointerApi(this.pointOption.data)
		}
		// 销毁平团倒计时计时器
		if (this.shopGroupWorkTicker) {
			clearInterval(this.shopGroupWorkTicker)
			this.shopGroupWorkTicker = null
		}
	},
	mounted() {

	},
	onPageScroll(e) {
		this.returnTopFlag = e.scrollTop > 600
		this.topLeft = e.scrollTop
	},
	methods: {
		/**
		 * 页面滚动事件
		 * @param e
		 */

		handlePageScroll(e) {
			this.topLeft = e.scrollTop
		},

		/**
		 * 选取sku
		 * @param skuObj:{currentSuk:object,selectedSku:object,buyNum:number}
		 */

		handleSelectSku(skuObj) {
			console.log(skuObj)
			this.currentSuk = skuObj.currentSku
			this.selectedSku = skuObj.skuItem
			this.buyNum = skuObj.buyNum
		},

		/**
		 * 选择sku后置方法
		 * 判断有无活动等操作
		 */

		selectSkuPostProcessor() {
			const ifEnable = this.selectedSku.ifEnable
			if (this.selectedSku.activityType === 1 && ifEnable === 0) {
				this.topThreeCollageOrders = this.selectedSku.collageOrders.slice(0, 3)
			}
			if ([1, 2, 3, 4, 5].includes(this.selectedSku.activityType) && ifEnable === 0) {
				this.$refs.goodActivityDetail.handleGetCountDownNumber(this.selectedSku.endTime)
			}
			this.timeActiveType = ifEnable === 0
		},

		/**
		 * 获取拼团滚动数据
		 */

		async handleGetGroupBookingRollList() {
			const param = {
				productId: this.productId,
				shopGroupWorkId: this.shopGroupWorkId ?? undefined
			}
			const res = await getBroadCastList(param)
			this.broadCastList = res.data
		},

		/**
		 * 和他人拼单
		 * @param collageId 已存在的拼团订单ID
		 */

		handleGoGroupBooking(collageId) {
			this.showGroupBuyList = false
			this.collageId = collageId
			this.$refs.skuSelect.goodsDetailShowFlag = true
		},

		/**
		 * 设置拼团倒计时
		 */
		handleSetDownTime() { // 这个计时器是每秒减去数组中指定字段的时间
			let productHaveCollageOrder = false
			// 判断sku组合中是否存在拼单
			const skuCollects = this.productData.map
			for (const skuCollectItemKey in skuCollects) {
				const collageOrders = skuCollects[skuCollectItemKey].collageOrders
				if (collageOrders && collageOrders.length > 0) {
					productHaveCollageOrder = true
					break
				}
			}
			if (!productHaveCollageOrder) return

			this.shopGroupWorkTicker = setInterval(() => {
				for (const skuCollectItemKey in skuCollects) {
					const collageOrders = skuCollects[skuCollectItemKey].collageOrders
					if (collageOrders && collageOrders.length > 0) {
						collageOrders.forEach((collageItem) => {
							collageItem.time > 0 ? collageItem.time -= 1000 : ''
						})
					}
				}
			}, 1000)
		},

		/**
		 * 根据时间戳获取格式化时间（处理计时器）
		 * @param remainMillSecs 毫秒，还有多久结束
		 * @return {string}
		 */

		handleGetDownTime(remainMillSecs) {
			if (remainMillSecs <= 0) {
				clearInterval(this.shopGroupWorkTicker)
				this.shopGroupWorkTicker = null
				this.handleGetProductDetail()
			}
			const timeFormat = timeFormatting(remainMillSecs / 1000)
			return `${timeFormat.hour}:${timeFormat.min}:${timeFormat.sec}`
		},

		/**
		 * 跳转到店铺
		 */

		handleJumpToStore() {
			this.go(`/community-center/shop/shop-detail?shopId=${this.shopId}`)
		},

		/**
		 * 返回头部
		 */

		handleReturnTop() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 300
			})
		},

		/**
		 * 打开SKU弹窗
		 * @param type 1加入购物车 2立即购买 3开团 4单独购买 6选择SKU
		 */

		handleShowGoodsSkuSelect(type) {
			// 为type情况时，绝不可能为和他人拼单
			this.collageId = 0
			this.$refs.skuSelect.btnType = type
			this.$refs.skuSelect.goodsDetailShowFlag = true
		},

		/**
		 * 打开优惠券弹窗
		 */

		handleShowCoupon() {
			this.$refs.couponPopup.showActivity = true
		},

		/**
		 * 活动商品时间到后置方法
		 * 供GoodActivityDetail组件调用
		 */

		handleActivityEnd() {
			this.selectedSku.activityType = 0
			location.reload()
		},

		/**
		 * 获取商品详情
		 */

		async handleGetProductDetail() {
			uni.showLoading({
				title: '加载中...',
				mask: true
			})
			try {
				const postData = {
					shopId: this.shopId,
					productId: this.productId,
					skuId: this.paramSkuId,
					terminal: 1
				}
				const res = await getProductDetailsByIdApi(postData)
				// const sameSkuProduct = Object.values(res.data.map).find((item) => item.skuId === res.data.skuId) || {}
				// this.productData = { ...res.data, voucherId: sameSkuProduct.voucherId || '', voucherPrice: sameSkuProduct.voucherPrice || '' }
				this.productData = res.data
				this.markTools = res.data.markTools // 平台优惠券
				this.shopMarkTools = res.data.shopMarkTools // 店铺优惠券
				this.currentActive = this.markTools.length === 0 && this.shopMarkTools.length > 0 ? 1 : 0
				// 处理单规格商品，如果是单款式商品，需要特殊处理productData.names
				const skuCollectionList = this.productData.map
				const skuCollectionListKeys = Object.keys(skuCollectionList)
				if (skuCollectionListKeys.length === 1 && skuCollectionListKeys[0] === '单款项') {
					this.productData.names[0].values.push({
						skuValue: this.productData.names[0].skuName,
						valueCode: '单款项'
					})
				}

				// 如果sku的图像为空，设置为商品的图像
				for (const key in skuCollectionList) {
					if (!skuCollectionList[key].image) {
						skuCollectionList[key].image = this.productData.images[0]
					}
				}

				// 评价
				this.commentList = res.data.comments
				// 宝贝详情
				this.sellDescList = res.data.text.replace(
					/\<img/gi,
					'<img style="max-width:100%;height:auto" '
				)

				// 渲染商详之后，如果参数传了skuId，则选中该skuId，否则选中第一个规格
				this.$nextTick(async () => {
					if (this.paramSkuId) {
						this.$refs.skuSelect.handleSelectBySkuId(this.paramSkuId)
					} else {
						// 默认选中第0个
						for (const skuRowItem of this.productData.names) {
							this.$refs.skuSelect.handleClickSkuItem(skuRowItem.nameCode, skuRowItem.values[0].valueCode)
						}
					}
					// 如果是拼团，设置拼团id
					if (this.productData.activityType === 1) {
						this.shopGroupWorkId = this.productData.shopGroupWorkId
						await this.handleGetGroupBookingRollList()
						this.handleSetDownTime()
					}
					await this.$refs.goodEvaluateAndQuestion.handleGetProblemList()
				})
			} finally {
				uni.hideLoading()
			}
		},

		/**
		 * 绑定分销关系
		 * @param salesId 分销员ID
		 * @param storeId 店铺ID
		 */

		bindSalesCustomer(salesId, storeId) {
			// 如果已登录，静默绑定客户关系，否则跳转到登录页面
			bindDistributorSalesCustomerApi({ shopId: storeId, distributorId: salesId })
		},

		/**
		 * 打开拼团列表
		 */

		handleOpenGroupBookingList() {
			if (this.topThreeCollageOrders.length > 0) {
				this.showGroupBuyList = true
			} else {
				uni.showToast({
					title: '还没有人拼单，快去拼单吧！',
					icon: 'none'
				})
			}
		},

		/**
		 * 打开客服
		 * @return {Promise<void>}
		 */

		async handleFlyToService() {
			let corpId = null
			let serviceURL = null
			uni.showLoading({
				title: '加载中...'
			})
			try {
				const res = await getCustomerServiceAppletKfApi({ id: this.shopId })
				if (res.code === '' && res.data.corpId && res.data.url) {
					corpId = res.data.corpId
					serviceURL = res.data.url
				}
			} finally {
				uni.hideLoading()
			}
			if (!serviceURL || !corpId) {
				return uni.showToast({
					icon: 'none',
					title: '暂无客服~'
				})
			}
			// #ifdef MP-WEIXIN
			wx.openCustomerServiceChat({
				extInfo: { url: serviceURL },
				corpId
			})
			// #endif
			// #ifdef APP
			try {
				let wechatServices = null
				plus.share.getServices((res) => {
					wechatServices = res.find((wechatItem) => wechatItem.id === 'weixin')
					if (wechatServices) {
						wechatServices.openCustomerServiceChat({
							corpid: corpId,
							url: serviceURL
						}, (success) => { }, (err) => { })
					} else {
						plus.nativeUI.alert('当前环境不支持微信操作!')
					}
				}, (err) => {
					uni.showToast({ title: '获取服务失败，不支持该操作。' + JSON.stringify(err), icon: 'none' })
				})
			} catch (err) {
				uni.showToast({ title: '调用失败，不支持该操作。' + JSON.stringify(err), icon: 'none' })
			}
			// #endif
			// #ifdef H5
			// window.open(serviceURL) safari浏览器不支持window.open
			window.location.href = serviceURL
			// #endif
		}

	}
}
</script>

<style lang="less" scoped>

.goods-details-container {
	min-height: 100%;
	padding-bottom: 180upx;

	.express-box {
		height: 100rpx;
		background-color: #FFFFFF;
		padding-left: 30rpx;
		border-top: 12rpx solid #F8F8F8;

		image {
			width: 21rpx;
			height: 27rpx;
		}

		.mapName {
			position: relative;

			&:before {
				content: '';
				width: 2rpx;
				height: 30rpx;
				background: #CCCCCC;
				display: block;
				position: absolute;
				right: -16rpx;
				top: 5rpx;
			}
		}
	}

	.chooseSize-box {
		border-top: 12rpx solid #F8F8F8;
		height: 90rpx;
		background-color: #FFFFFF;
		margin: 10rpx 0;

		.chooseSize-content {
			width: 100%;
		}
	}

	.questionTit {
		height: 90rpx;
		border-bottom: 1rpx solid #EEEEEE;
		margin-right: 35rpx;
		color: #333333;
		font-size: 30rpx;

		.allMoreBox {
			display: flex;
			align-items: center;
			color: #999999;
			font-size: 24rpx;
		}
	}

	.inStore-box {
		background-color: #FFFFFF;
		margin-top: 20rpx;
		padding: 20rpx 30rpx;

		.inStore-logo {
			width: 70rpx;
			height: 70rpx;
		}

		.inStore-but {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 140rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: left;
			font-size: 24rpx;
			color: #FFEBC4;
			background: #333333;
			padding-left: 20rpx;
			position: relative;
		}
	}

	.goodsDetails-box {
		background-color: #FFFFFF;
		margin-top: 20rpx;
		padding: 20rpx 30rpx;

		.goodsDetails-title {
			display: flex;
			flex-direction: row;
			align-items: center;

			.goodsDetails-Line {
				width: 265rpx;
				border-bottom: 1rpx solid #EDEDED;
			}

			.goodsDetails-text {
				padding: 0 22rpx;
			}
		}
	}

	.buygoods-box {
		position: fixed;
		bottom: 0rpx;
		box-sizing: border-box;
		z-index: 1;

		.buygoodsBut-box {
			background-color: #FFFFFF;
			width: 750rpx;
			padding: 20rpx 32rpx;
			box-shadow: 0rpx 0rpx 10rpx 1rpx #EDEDED;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;

			.btns_container {
				display: flex;
				align-items: center;
			}

			.btns {
				width: 80rpx;
			}

			.Cart {
				position: relative;

				.cartAllNum {
					position: absolute;
					width: 30rpx;
					height: 30rpx;
					line-height: 30rpx;
					text-align: center;
					font-size: 17rpx;
					color: #FFFFFF;
					background: #C5AA7B;
					border-radius: 50%;
					opacity: 1;
					z-index: 1;
				}

				// #ifdef APP
				.cartAllNum {
					right: -6rpx;
					top: -6rpx;
				}

				// #endif
				/* #ifdef H5 */
				.cartAllNum {
					right: -10rpx;
					top: -6rpx;
				}

				/* #endif */
				/* #ifdef MP-WEIXIN */
				.cartAllNum {
					right: -3rpx;
					top: 0;
				}

				/* #endif */
			}

			.joinShopCartBut {
				width: 190rpx;
				height: 80rpx;
				background-color: #FFFFFF;
				color: #333333;
				font-size: 28rpx;
				line-height: 80rpx;
				border: 2rpx solid #333333;
				text-align: center;
				margin-left: 40rpx;
				box-sizing: border-box;
			}

			.buyNowBut {
				width: 190rpx;
				height: 80rpx;
				background: #333333;
				color: #FFEBC4;
				font-size: 28rpx;
				line-height: 80rpx;
				text-align: center;
				margin-left: 16rpx;
			}

			.offShelf {
				background: #b7b7b7;
				border-radius: 50rpx;
				width: 360rpx;
				margin-left: 50rpx;
				line-height: 80rpx;
				height: 80rpx;
				justify-content: center;
				color: #333333;
			}
		}
	}

	.returnTopService-box {
		position: fixed;
		bottom: 160rpx;
		right: 30rpx;

		.returnTop-box {
			width: 88rpx;
			height: 88rpx;
			border-radius: 50%;
			background: #FFFFFF;
			opacity: 0.8;
		}
	}

}
.news-box {
	position: fixed;
	left: 20rpx;
	top: 200rpx;
	z-index: 1;

	.news-bg {
		width: 450rpx;
		height: 70rpx;
		overflow: hidden;

		.news-item {
			background: rgba(0, 0, 0, 0.75);
			border-radius: 16rpx;
			height: 70rpx;
			color: #FFFFFF;
			font-size: 24rpx;
			padding: 0 20rpx;
			width: 450rpx;

			.item-avatar {
				width: 50rpx;
				height: 50rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}
		}
	}
}

.goodsDiscount {
	.groupBuy {
		.groupBuyList {
			.groupBuyItem {
				padding: 0 30rpx;
				height: 116rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1rpx solid #EEEEEE;

				.leftAvatar {
					display: flex;
					align-items: center;
					width: 50%;

					img {
						width: 72rpx;
						height: 72rpx;
						margin-right: 10rpx;
						border-radius: 50%;
					}
				}

				.rightInfo {
					display: flex;
					align-items: center;
					width: 50%;

					.groupBuyTime {
						.needPeople {
							font-size: 28rpx;
							color: #333333;
							margin-bottom: 10rpx;
							font-weight: 400;

							b {
								color: #C5AA7B;
								font-weight: 400;
							}
						}

						.endDate {
							color: #666666;
						}
					}

					.groupBuyBtn {
						width: 140rpx;
						height: 60rpx;
						line-height: 60rpx;
						background: #333333;
						text-align: center;
						color: #FFEBC4;
						font-size: 24rpx;
					}
				}
			}
		}
	}
}

.popupDiscount {
	padding-bottom: 70rpx;

	.popupDiscountTit {
		font-size: 36rpx;
		color: #333333;
		height: 105rpx;
		line-height: 105rpx;
		text-align: center;
		border-bottom: 1rpx solid #EEEEEE;
	}

	.groupBuy {
		padding-bottom: 80rpx;

		.groupBuyList {
			.groupBuyItem1 {
				padding: 0 30rpx;
				height: 116rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1rpx solid #EEEEEE;

				.leftAvatar {
					display: flex;
					align-items: center;

					img {
						width: 72rpx;
						height: 72rpx;
						margin-right: 10rpx;
						border-radius: 50%;
					}

					.groupBuyTime {
						margin-right: 80rpx;
						margin-bottom: 10rpx;
						width: 320rpx;

						.needPeople {
							font-size: 26rpx;
							color: #333333;

							span {
								color: #333333;
								padding-right: 10rpx;
							}

							b {
								color: #C5AA7B;
								font-weight: 400;
							}
						}

						.endDate {
							color: #333333;
							opacity: 0.7;
							font-size: 24rpx;
						}
					}
				}

				.rightInfo {
					display: flex;
					align-items: center;

					.groupBuyBtn {
						width: 140rpx;
						height: 70rpx;
						line-height: 70rpx;
						background: #333333;
						text-align: center;
						color: #FFEBC4;
						font-weight: 400;
					}
				}
			}
		}
	}
}
</style>
