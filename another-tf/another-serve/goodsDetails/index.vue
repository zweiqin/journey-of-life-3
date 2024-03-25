<template>
	<view class="goods-details-container">
		<BeeBack>
			<view style="display: flex;align-items: center;justify-content: space-between;">
				<BeeIcon name="arrowleft" :size="34" color="#222229" style="width: fit-content;">
				</BeeIcon>
				<text style="flex: 1;margin-left: -40upx;text-align: center;line-height: 2.5;">商品详情</text>
			</view>
		</BeeBack>

		<view v-if="goodsDetail.productId">
			<view style="padding-bottom: 160upx;">
				<!--  拼团滚动 -->
				<view class="news-box">
					<view class="news-bg">
						<swiper vertical circular interval="8000" duration="2000" autoplay>
							<swiper-item v-for="(item, index) in broadCastList" :key="index">
								<view class="news-item flex-items">
									<image class="item-avatar" :src="common.seamingImgUrl(item.headImage)"></image>
									<view class="news-item-user">{{ item.name }}</view>
									<view>{{ item.timeStr }}</view>
									<view v-if="item.type === 1">给了好评</view>
									<view v-if="item.type === 2">正在拼单</view>
									<view v-if="item.type === 3">拼单成功</view>
									<view v-if="item.type === 4">下单</view>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>

				<!-- 轮播图+分享+价格名称+活动倒计时+优惠券 -->
				<GoodActivityDetail
					ref="goodActivityDetail" :sku-select="selectedCurrentMsg.selectedSku"
					:goods-detail="goodsDetail" @activityEnd="handleGetProductDetail"
				/>

				<view
					v-if="goodsDetail.productBrief"
					style="display: flex;align-items: center;margin-top: 10upx;padding: 10upx 20upx 10upx;font-size: 24upx;background-color: #ffffff;"
				>
					<view style="color: #999999;">卖点</view>
					<view style="flex: 1;margin-left: 20upx;">{{ goodsDetail.productBrief }}</view>
				</view>

				<!-- 发货 -->
				<view v-if="goodsDetail.ifLogistics" class="express-box flex-items flex-row fs24">
					<view class="fs24 font-color-999 mar-right-20 ">发货</view>
					<tui-icon
						v-if="goodsDetail.receive && goodsDetail.receive.receiveAdress" name="gps" :size="14"
						color="#c1c1c1"
					></tui-icon>
					<view v-if="goodsDetail.receive && goodsDetail.receive.receiveAdress" class="mar-left-10 mapName mar-right-30">
						{{ goodsDetail.receive.receiveAdress }}
					</view>
					<view>
						<text v-if="[1277, 1278, 1279, 1280, 1281, 1282, 1283, 1284, 1285, 1286].includes(goodsDetail.classifyId)">
							物流费另算
						</text>
						<text v-else>快递：¥ {{ goodsDetail.logisticsPrice || 0 }}</text>
					</view>
				</view>

				<!-- 选择SKU -->
				<view class="fs24 chooseSize-box flex-start" @click="handleShowGoodsSkuSelect(6)">
					<view class="chooseSize-content flex-items flex-row flex-sp-between">
						<view class="flex-row-plus">
							<label class="fs26 mar-left-30 font-color-999">选择</label>
							<view style="flex: 1;">
								<view v-for="(item, index) in selectedCurrentMsg.currentSku" :key="index" style="margin: 0 10upx 6upx;">
									{{ item.skuText || '-' }}
								</view>
							</view>
						</view>
						<tui-icon :size="24" color="#baa174" name="arrowright"></tui-icon>
					</view>
				</view>

				<!-- 结合销售 -->
				<CombinedSales :pid="productId" :goods-detail="goodsDetail"></CombinedSales>
				<!-- 拼单列表 -->
				<view
					v-if="(selectedCurrentMsg.selectedSku.activityType === 1) && (selectedCurrentMsg.selectedSku.ifEnable === 0) && selectedCurrentMsg.selectedSku.collageOrders.length"
					class="goodsDiscount"
				>
					<view class="questionTit mar-left-30 flex-items flex-row flex-sp-between">
						<label class="">这些人正在拼单</label>
						<view class="allMoreBox">
							<view class="allMore" @click="showGroupBuyList = true">
								查看全部
							</view>
							<tui-icon :size="24" color="#baa174" name="arrowright" margin="0 0 0 10upx"></tui-icon>
						</view>
					</view>
					<view
						v-for="(Gitem, index) in selectedCurrentMsg.selectedSku.collageOrders.slice(0, 3)" :key="index"
						class="groupBuy"
					>
						<view v-if="Gitem.time > 0" class="groupBuyList">
							<view class="groupBuyItem">
								<view class="leftAvatar">
									<image :src="common.seamingImgUrl(Gitem.headImage)" alt=""></image>
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
				<GoodEvaluateAndQuestion ref="goodEvaluateAndQuestion" :goods-detail="goodsDetail" />
				<!-- 店铺 -->
				<view
					v-if="goodsDetail.shopName && !goodsDetail.shopName.startsWith('团蜂')"
					class="inStore-box flex-items flex-row flex-sp-between"
				>
					<view class="flex-display flex-row">
						<view>
							<image
								class="inStore-logo default-img" :src="common.seamingImgUrl(goodsDetail.shopLogo)"
								@click="go(`/another-tf/another-user/shop/shop-detail?shopId=${shopId}`)"
							></image>
						</view>
						<view class="flex-display flex-column mar-left-20">
							<label @click="go(`/another-tf/another-user/shop/shop-detail?shopId=${shopId}`)">
								{{ goodsDetail.shopName }}
							</label>
							<view class="flex-display flex-row fs24 font-color-999 mar-top-5">
								<label>商品总类：{{ goodsDetail.classifyNumber }}</label>
								<label class="mar-left-30">已售：{{ goodsDetail.number }}件</label>
							</view>
						</view>
					</view>
					<view class="inStore-but" @click="go(`/another-tf/another-user/shop/shop-detail?shopId=${shopId}`)">
						<text>去逛逛</text>
						<tui-icon :size="30" color="#ffebc4" name="arrowright"></tui-icon>
					</view>
				</view>
				<!-- 详细信息 -->
				<view style="background-color: #FFFFFF;margin-top: 20rpx;padding: 20rpx 30rpx;">
					<view style="display: flex;flex-direction: row;align-items: center;margin-bottom: 10upx;">
						<view style="width: 265rpx;border-bottom: 1rpx solid #EDEDED;"></view>
						<label style="padding: 0 22rpx;white-space: nowrap;">宝贝详情</label>
						<view style="width: 265rpx;border-bottom: 1rpx solid #EDEDED;"></view>
					</view>
					<view>
						<rich-text :nodes="goodsDetail.text.replace(/\<img/gi, replaceImgText)"></rich-text>
					</view>
				</view>
			</view>
			<!-- 底部购买 -->
			<view class="buygoods-box">
				<view class="buygoodsBut-box" :style="{ 'height': (isIphone === true ? 160 : 130) + 'rpx' }">
					<view style="display: flex;align-items: center;">
						<view
							v-if="goodsDetail.shopName && !goodsDetail.shopName.startsWith('团蜂')"
							class="btns flex-column-plus flex-items"
							@click="go(`/another-tf/another-user/shop/shop-detail?shopId=${shopId}`)"
						>
							<tui-icon :size="24" color="#333333" name="shop"></tui-icon>
							<label class="fs22">店铺</label>
						</view>
						<view class="btns flex-column-plus mar-left-10 flex-items" @click="handleOpenCustomerService">
							<tui-icon :size="24" color="#333333" name="message"></tui-icon>
							<label class="fs22">客服</label>
						</view>
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
					<view style="flex: 1;">
						<view
							v-if="goodsDetail.shelveState === 0"
							style="display: flex;align-items: center;justify-content: flex-end;"
						>
							<tui-button type="gray" width="360rpx" height="80rpx" disabled shape="circle" margin="0 0 0 40rpx">
								商品已下架
							</tui-button>
						</view>
						<view
							v-else-if="selectedCurrentMsg.selectedSku.activityType === 1"
							style="display: flex;align-items: center;justify-content: flex-end;"
						>
							<tui-button
								type="gray" width="190rpx" height="80rpx" plain
								margin="0 0 0 40rpx"
								style="font-size: 28rpx;color: #333333!important;border-radius: 8upx;"
								@click="handleShowGoodsSkuSelect(4)"
							>
								单独购买
							</tui-button>
							<tui-button
								type="black" width="190rpx" height="80rpx" margin="0 0 0 16rpx"
								style="font-size: 28rpx;color: #ffebc4!important;border-radius: 8upx;"
								@click="handleShowGoodsSkuSelect(3)"
							>
								我要开团
							</tui-button>
						</view>
						<view v-else style="display: flex;align-items: center;justify-content: flex-end;">
							<tui-button
								type="gray" width="190rpx" height="80rpx" plain
								margin="0 0 0 40rpx"
								style="font-size: 28rpx;color: #333333!important;border-radius: 8upx;"
								@click="handleShowGoodsSkuSelect(1)"
							>
								加入购物车
							</tui-button>
							<tui-button
								type="black" width="190rpx" height="80rpx" margin="0 0 0 16rpx"
								style="font-size: 28rpx;color: #ffebc4!important;border-radius: 8upx;"
								@click="handleShowGoodsSkuSelect(2)"
							>
								立即购买
							</tui-button>
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
			ref="refGoodSkuSelect" :goods-detail="goodsDetail" :collage-id="collageId"
			@current-select-sku="handleSelectCurrent" @changeCartNum="(num) => allCartNum = num"
		/>
		<!-- 拼单弹框 -->
		<tui-popup :show="showGroupBuyList" :mode-class="[ 'fade' ]" class="popupDiscount" @click="showGroupBuyList = false">
			<view class="popupDiscountTit">这些人正在拼单</view>
			<view class="groupBuy">
				<view class="groupBuyList">
					<scroll-view style="height: 480upx;" scroll-y>
						<view
							v-for="(aitem, index) in selectedCurrentMsg.selectedSku.collageOrders" :key="index"
							class="groupBuyItem1"
						>
							<view v-if="aitem.time > 0" class="leftAvatar">
								<image :src="common.seamingImgUrl(aitem.headImage)" alt=""></image>
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

		<tui-bottom-popup :show="isShowCustomerServicePopup" @close="isShowCustomerServicePopup = false">
			<ATFCustomerService :shop-id="shopId" :data="customerServiceList"></ATFCustomerService>
		</tui-bottom-popup>
	</view>
</template>

<script>
import CombinedSales from './components/combinedSales'
import GoodEvaluateAndQuestion from './components/GoodEvaluateAndQuestion'
import GoodActivityDetail from './components/GoodActivityDetail'
import GoodSkuSelect from './components/GoodSkuSelect'
import { timeFormatting, resolveGoodsDetailSkuSituation } from '../../../utils'
import { getProductDetailsByIdApi, getBroadCastList, addUserTrackReportDoPointerApi, getCartListApi } from '../../../api/anotherTFInterface'

export default {
	name: 'GoodsDetails',
	components: {
		CombinedSales,
		GoodEvaluateAndQuestion,
		GoodActivityDetail,
		GoodSkuSelect
	},
	data() {
		return {
			replaceImgText: '<img style="max-width:100%;height:auto" ',
			// 埋点对象
			pointOption: {
				inTime: null,
				data: {
					eventType: 1,
					productIds: ''
				}
			},
			isIphone: getApp().globalData.isIphone,
			shopId: '',
			productId: '', // 商品ID，有可能屎缓存数据
			skuId: '', // 产品ID

			returnTopFlag: false, // 回到顶部
			collageId: 0, // 去拼团时的拼单ID
			broadCastList: [], // 拼团滚动数据
			showGroupBuyList: false, // 是否展示拼单弹窗
			shopGroupWorkTicker: null, // 拼团倒计时定时器
			// 商品详情
			goodsDetail: {
				productId: '',
				names: [],
				shelveState: 0, // 0下架
				text: '', // 宝贝详情，商品详情长图（富文本）
				markTools: [], // 平台优惠券
				shopMarkTools: [], // 店铺优惠券
				comments: [] // 商品评价列表
			},
			selectedCurrentMsg: {
				selectedSku: { // 当前选中SKU
					collageOrders: [] // 当前商品拼单数据
				},
				currentSku: [], // 选中的SKU（子组件给当前页面做数据渲染）
				number: 1
			},
			allCartNum: 0, // 购物车数量

			// 客服
			isShowCustomerServicePopup: false,
			customerServiceList: []
		}
	},
	onLoad(options) {
		this.pointOption.inTime = new Date().getTime()
		this.shopId = Number(options.shopId)
		this.productId = Number(options.productId)
		this.skuId = Number(options.skuId)
		this.handleGetProductDetail()
		getCartListApi({}).then((res) => {
			this.allCartNum = res.data.reduce((total, value) => total + value.skus.reduce((t, v) => t + (v.shelveState ? v.number : 0), 0), 0)
		})
		if (this.allCartNum > 99) this.allCartNum = '...'
	},
	onUnload() {
		// 判断是否要埋点
		if ((new Date().getTime() - this.pointOption.inTime) >= 5000) {
			this.pointOption.data.productIds = this.productId
			addUserTrackReportDoPointerApi(this.pointOption.data)
		}
		// 销毁平团倒计时计时器
		if (this.shopGroupWorkTicker) {
			clearInterval(this.shopGroupWorkTicker)
			this.shopGroupWorkTicker = null
		}
	},
	onPageScroll(e) {
		this.returnTopFlag = e.scrollTop > 600
	},
	methods: {
		// 选取sku
		handleSelectCurrent(selectedCurrentMsg) {
			// console.log(selectedCurrentMsg)
			this.selectedCurrentMsg.selectedSku = selectedCurrentMsg.selectedSku
			this.selectedCurrentMsg.currentSku = selectedCurrentMsg.currentSku
			this.selectedCurrentMsg.number = selectedCurrentMsg.number
		},

		// 和他人拼单
		handleGoGroupBooking(collageId) {
			this.showGroupBuyList = false
			this.collageId = collageId
			this.$refs.refGoodSkuSelect.isShowDetails = true
		},

		/**
		 * 设置拼团倒计时
		 */
		handleSetDownTime() { // 这个计时器是每秒减去数组中指定字段的时间
			let productHaveCollageOrder = false
			// 判断sku组合中是否存在拼单
			for (const skuValueCodeItem in this.goodsDetail.map) {
				const collageOrders = this.goodsDetail.map[skuValueCodeItem].collageOrders
				if (collageOrders && collageOrders.length > 0) {
					productHaveCollageOrder = true
					break
				}
			}
			if (!productHaveCollageOrder) return
			this.shopGroupWorkTicker = setInterval(() => {
				for (const skuValueCodeItem in this.goodsDetail.map) {
					const collageOrders = this.goodsDetail.map[skuValueCodeItem].collageOrders
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

		// 返回头部
		handleReturnTop() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 300
			})
		},

		// 打开SKU弹窗
		handleShowGoodsSkuSelect(btnType) {
			// 为type情况时，绝不可能为和他人拼单
			this.collageId = 0
			this.$refs.refGoodSkuSelect.btnType = btnType
			this.$refs.refGoodSkuSelect.isShowDetails = true
		},

		// 获取商品详情
		async handleGetProductDetail() {
			uni.showLoading({
				title: '加载中...',
				mask: true
			})
			try {
				const res = await getProductDetailsByIdApi({
					shopId: this.shopId,
					productId: this.productId,
					skuId: this.skuId,
					terminal: 1
				})
				// const sameSkuProduct = Object.values(res.data.map).find((item) => item.skuId === res.data.skuId) || {}
				// this.goodsDetail = { ...res.data, voucherId: sameSkuProduct.voucherId || '', voucherPrice: sameSkuProduct.voucherPrice || '' }
				this.goodsDetail = res.data
				// 处理单规格商品，如果是单款式商品，需要特殊处理goodsDetail.names
				const skuCollectionListKeys = Object.keys(this.goodsDetail.map)
				if ((skuCollectionListKeys.length === 1) && (skuCollectionListKeys[0] === '单款项')) {
					this.goodsDetail.names[0].values.push({
						skuValue: this.goodsDetail.names[0].skuName,
						valueCode: '单款项'
					})
				}
				// 如果sku的图像为空，设置为商品的图像
				skuCollectionListKeys.forEach((skuValueCodeItem) => {
					if (!this.goodsDetail.map[skuValueCodeItem].image) this.goodsDetail.map[skuValueCodeItem].image = this.goodsDetail.images[0]
				})
				console.log(Object.values(this.goodsDetail.map).map((i) => i.skuId))
				this.goodsDetail = await resolveGoodsDetailSkuSituation(this.goodsDetail)
				// 渲染商详之后，如果参数传了skuId，则选中该skuId，否则选中第一个规格
				this.$nextTick(async () => {
					if (this.skuId) {
						this.$refs.refGoodSkuSelect.handleSelectBySkuId(this.skuId)
					} else {
						// 默认选中第0个
						this.goodsDetail.names.forEach((nameItem) => {
							this.$refs.refGoodSkuSelect.handleClickSkuItem(nameItem.nameCode, nameItem.values[0])
						})
					}
					// 如果是拼团，设置拼团id
					if (this.goodsDetail.activityType === 1) {
						// 获取拼团滚动数据，传入拼团数据ID
						const broadCastData = await getBroadCastList({ productId: this.productId, shopGroupWorkId: this.goodsDetail.shopGroupWorkId })
						this.broadCastList = broadCastData.data
						this.handleSetDownTime()
					}
					await this.$refs.goodEvaluateAndQuestion.handleGetProblemList()
				})
			} finally {
				uni.hideLoading()
			}
		},

		// 打开客服
		async handleOpenCustomerService() {
			const res = await this.$store.dispatch('app/getCustomerServiceAction', {
				shopId: this.shopId
			})
			this.customerServiceList = res.data
			if (!this.customerServiceList.length) this.$showToast('暂无客服')
			else this.isShowCustomerServicePopup = true
		}
	}
}
</script>

<style lang="less" scoped>
.goods-details-container {
	min-height: 100vh;
	box-sizing: border-box;
	background-color: #f8f8f8;
	padding-bottom: 180upx;

	/deep/ .tui-popup-class.tui-bottom-popup {
		height: 85vh !important;
	}

	.express-box {
		height: 100rpx;
		padding-left: 30rpx;
		margin-top: 10upx;
		background-color: #FFFFFF;

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

	.buygoods-box {
		width: 100%;
		position: fixed;
		bottom: 0rpx;
		box-sizing: border-box;
		z-index: 1;

		.buygoodsBut-box {
			display: flex;
			justify-content: space-between;
			width: 100%;
			padding: 20rpx 18rpx;
			box-shadow: 0rpx 0rpx 10rpx 1rpx #EDEDED;
			background-color: #FFFFFF;
			box-sizing: border-box;

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

						image {
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

						image {
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
}
</style>
