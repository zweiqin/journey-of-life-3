<template>
	<view class="goods-details-container">
		<view style="position: absolute;top:0;left: 0;">{{ viewUpdate }}</view>
		<BeeBack>
			<view style="padding: 12rpx 0;background-color: #ffffff;">
				<BeeIcon name="arrowleft" :size="30" color="#222229" style="width: fit-content;">
				</BeeIcon>
			</view>
		</BeeBack>

		<view>
			<view>
				<view v-if="goodsDetail.productId">
					<!--  拼团滚动 -->
					<view
						v-if="broadCastList && broadCastList.length"
						style="position: fixed;left: 20rpx;top: 200rpx;z-index: 1;width: 450rpx;overflow: hidden;"
					>
						<swiper vertical circular interval="8000" duration="2000" autoplay>
							<swiper-item v-for="(item, index) in broadCastList" :key="index">
								<view
									style="display: flex;align-items: center;padding: 6rpx 20rpx;color: #FFFFFF;font-size: 24rpx;background: rgba(0, 0, 0, 0.75);border-radius: 36rpx;"
								>
									<image
										style="width: 50rpx;height: 50rpx;border-radius: 50%;margin-right: 20rpx;"
										:src="common.seamingImgUrl(item.headImage)" mode="aspectFit"
									></image>
									<view>{{ item.name }}</view>
									<view>{{ item.timeStr }}</view>
									<view v-if="item.type === 1">给了好评</view>
									<view v-if="item.type === 2">正在拼单</view>
									<view v-if="item.type === 3">拼单成功</view>
									<view v-if="item.type === 4">下单</view>
								</view>
							</swiper-item>
						</swiper>
					</view>

					<!-- 轮播图+分享+价格名称+活动倒计时+优惠券 -->
					<GoodActivityDetail
						ref="goodActivityDetail" :sku-select="selectedCurrentMsg.selectedSku"
						:goods-detail="goodsDetail" @activityEnd="handleGetProductDetail"
					/>

					<!-- 发货 -->
					<view
						v-if="goodsDetail.ifLogistics"
						style="display: flex;align-items: center;margin: 26rpx 28rpx 0;padding: 18rpx 20rpx;font-size: 24rpx;background-color: #ffffff;border-radius: 16rpx;"
					>
						<view style="margin-right: 20rpx;color: #999999;">发货</view>
						<tui-icon
							v-if="goodsDetail.receive && goodsDetail.receive.receiveAdress" name="gps" :size="14"
							color="#c1c1c1" margin="0 0 0 10rpx"
						></tui-icon>
						<view
							v-if="goodsDetail.receive && goodsDetail.receive.receiveAdress"
							style="margin-right: 30rpx;padding-right: 10rpx;color: #999999;border-right: 2rpx solid #CCCCCC;"
						>
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
					<view
						style="display: flex;justify-content: space-between;align-items: center;margin: 26rpx 28rpx 0;padding: 26rpx 20rpx;font-size: 24rpx;background-color: #ffffff;border-radius: 16rpx;"
						@click="handleShowGoodsSkuSelect(6)"
					>
						<view style="font-size: 26rpx;color: #999999;">选择</view>
						<view style="flex: 1;display: flex;align-items: center;flex-wrap: wrap;margin-left: 30rpx;font-size: 28rpx;color: #888888;">
							<view
								v-for="(item, index) in selectedCurrentMsg.currentSku" :key="index"
								style="margin: 2rpx 6rpx;padding: 8rpx 26rpx;border: 2rpx solid #cccccc;border-radius: 16rpx;"
							>
								{{ item.skuText || '-' }}
							</view>
						</view>
					</view>

					<!-- 结合销售 -->
					<view style="margin: 26rpx 28rpx 0;">
						<CombinedSales :shop-id="shopId" :product-id="productId"></CombinedSales>
					</view>
					<!-- 拼单列表 -->
					<view
						v-if="(selectedCurrentMsg.selectedSku.activityType === 1) && (selectedCurrentMsg.selectedSku.ifEnable === 0) && selectedCurrentMsg.selectedSku.collageOrders && selectedCurrentMsg.selectedSku.collageOrders.length"
						style="margin: 26rpx 28rpx 0;padding: 26rpx 20rpx;background-color: #ffffff;border-radius: 16rpx;"
					>
						<view
							style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 18rpx;color: #333333;font-size: 30rpx;"
						>
							<view>这些人正在拼单</view>
							<view style="display: flex;align-items: center;color: #999999;font-size: 24rpx;">
								<view class="allMore" @click="showGroupBuyList = true">
									查看全部
								</view>
								<tui-icon :size="24" color="#baa174" name="arrowright" margin="0 0 0 10rpx"></tui-icon>
							</view>
						</view>
						<view style="border-top: 2rpx solid #EEEEEE;">
							<view
								v-for="(Gitem, index) in selectedCurrentMsg.selectedSku.collageOrders.slice(0, 3)"
								:key="index"
							>
								<view
									v-if="Gitem.time > 0"
									style="display: flex;align-items: center;justify-content: space-between;flex-wrap: wrap;border-bottom: 1rpx solid #EEEEEE;"
								>
									<view style="display: flex;align-items: center;padding: 10rpx 0;">
										<image
											style="width: 72rpx;height: 72rpx;margin-right: 10rpx;border-radius: 50%;"
											:src="common.seamingImgUrl(Gitem.headImage)"
										></image>
										<text>{{ Gitem.name }}</text>
									</view>
									<view
										style="flex: 1;display: flex;justify-content: flex-end;align-items: center;margin-left: 12rpx;padding: 10rpx 0;white-space: nowrap;"
									>
										<view>
											<view style="margin-bottom: 10rpx;font-size: 28rpx;color: #333333;text-align: right;">
												还差<text style="color: #C5AA7B;">{{ Gitem.person }}人</text>拼成
											</view>
											<view style="display: flex;align-items: center;">
												<view style="color: #666666;font-size: 26rpx;">
													剩余
												</view>
												<tui-countdown
													:width="42" :height="36" :size="30" :colon-size="30"
													colon-color="#333333"
													color="#333333" border-color="transparent"
													:time="Math.floor((Gitem.time - Date.now()) / 1000)"
													@end="handleGetProductDetail"
												></tui-countdown>
											</view>
										</view>
										<tui-button
											type="black" width="140rpx" height="60rpx" margin="0 0 0 14rpx"
											:size="24" @click="handleGoGroupBooking(Gitem.collageId)"
										>
											和Ta拼
										</tui-button>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>

				<!--  评价  -->
				<view style="margin: 26rpx 28rpx 0;">
					<GoodEvaluateAndQuestion :goods-detail="goodsDetail" @success="handleGetProductDetail" />
				</view>

				<view v-if="goodsDetail.productId" style="margin: 26rpx 0 0;">
					<!-- 店铺 -->
					<view
						v-if="goodsDetail.shopName && !goodsDetail.shopName.startsWith('团蜂')"
						style="display: flex;justify-content: space-between;align-items: center;margin: 0 28rpx 26rpx;padding: 32rpx 20rpx;background-color: #FFFFFF;border-radius: 16rpx;"
					>
						<view
							style="display: flex;align-items: center;"
							@click="go(`/another-tf/another-user/shop/shop-detail?shopId=${shopId}`)"
						>
							<image
								style="width: 70rpx;height: 70rpx;"
								class="default-img" :src="common.seamingImgUrl(goodsDetail.shopLogo)"
							></image>
							<view style="flex: 1;margin-left: 20rpx;">
								<view>{{ goodsDetail.shopName }}</view>
								<view style="display: flex;align-items: center;margin-top: 6rpx;color: #999999;font-size: 24rpx;">
									<view>商品总类：{{ goodsDetail.classifyNumber }}</view>
									<view style="margin-left: 20rpx;">已售：{{ goodsDetail.number }}件</view>
								</view>
							</view>
						</view>
						<tui-button
							type="black" width="fit-content" height="60rpx" margin="0 0 0 10rpx"
							@click="go(`/another-tf/another-user/shop/shop-detail?shopId=${shopId}`)"
						>
							<view style="display: flex;align-items: center;padding: 0 20rpx;font-size: 28rpx;line-height: 1;">
								<text>去逛逛</text>
								<tui-icon name="arrowright" color="#ffebc4" :size="28" unit="rpx" margin="0 0 0 10rpx"></tui-icon>
							</view>
						</tui-button>
					</view>
					<!-- 详细信息 -->
					<view style="background-color: #FFFFFF;padding: 18rpx 20rpx;">
						<view style="display: flex;flex-direction: row;align-items: center;margin-bottom: 10rpx;">
							<view style="width: 265rpx;border-bottom: 1rpx solid #EDEDED;"></view>
							<view style="padding: 0 22rpx;white-space: nowrap;">宝贝详情</view>
							<view style="width: 265rpx;border-bottom: 1rpx solid #EDEDED;"></view>
						</view>
						<view>
							<rich-text :nodes="goodsDetail.text.replace(/\<img/gi, replaceImgText)"></rich-text>
						</view>
					</view>
				</view>
			</view>
			<!-- 底部购买 -->
			<view v-if="goodsDetail.productId" class="buygoods-box" :style="{ 'height': (isIphone === true ? 160 : 130) + 'rpx' }">
				<view class="buygoodsBut-box">
					<view style="flex: 1;display: flex;justify-content: space-between;align-items: center;padding: 0 24rpx;">
						<view style="flex: 1;display: flex;">
							<view
								v-if="!isExchange"
								style="display: flex;flex-direction: column;justify-content: center;align-items: center;"
								@click="handleOpenCustomerService"
							>
								<tui-icon :size="26" color="#333333" name="message"></tui-icon>
								<view style="margin-top: 4rpx;font-size: 22rpx;">客服</view>
							</view>
						</view>
						<view style="flex: 1;display: flex;justify-content: center;">
							<view
								v-if="!isExchange" class="Cart"
								style="display: flex;flex-direction: column;justify-content: center;align-items: center;"
								@click="go('/another-tf/another-serve/shopCar/shopCar')"
							>
								<view v-if="allCartNum > 0" class="cartAllNum">
									{{ allCartNum }}
								</view>
								<tui-icon :size="26" color="#333333" name="cart"></tui-icon>
								<view style="margin-top: 4rpx;font-size: 22rpx;">购物车</view>
							</view>
						</view>
						<view style="flex: 1;display: flex;justify-content: flex-end;">
							<view
								style="display: flex;flex-direction: column;justify-content: center;align-items: center;"
								@click="handleCollect"
							>
								<tui-icon v-if="goodsDetail.ifCollect === 1" :size="26" color="#ff570d" name="star-fill"></tui-icon>
								<tui-icon v-else :size="26" color="#292D32" name="star"></tui-icon>
								<view v-if="goodsDetail.ifCollect === 1" style="margin-top: 4rpx;font-size: 22rpx;">已收藏</view>
								<view v-else style="margin-top: 4rpx;font-size: 22rpx;">收藏</view>
							</view>
						</view>
					</view>
					<view>
						<view
							v-if="goodsDetail.shelveState === 0"
							style="display: flex;align-items: center;justify-content: flex-end;"
						>
							<tui-button type="gray" width="360rpx" height="80rpx" disabled shape="circle" margin="0 0 0 16rpx">
								商品已下架
							</tui-button>
						</view>
						<view
							v-else-if="selectedCurrentMsg.selectedSku.activityType === 1"
							style="display: flex;align-items: center;justify-content: flex-end;"
						>
							<tui-button
								type="gray" width="190rpx" height="80rpx" plain
								margin="0 0 0 16rpx"
								style="font-size: 28rpx;color: #333333!important;border-radius: 8rpx;"
								@click="handleShowGoodsSkuSelect(4)"
							>
								单独购买
							</tui-button>
							<tui-button
								type="black" width="190rpx" height="80rpx" margin="0 0 0 16rpx"
								style="font-size: 28rpx;color: #ffebc4!important;border-radius: 8rpx;"
								@click="handleShowGoodsSkuSelect(3)"
							>
								我要开团
							</tui-button>
						</view>
						<view
							v-else
							class="bottom-btn"
							style="display: flex;align-items: center;justify-content: flex-end;"
						>
							<tui-button
								v-if="!isExchange" type="gray" width="190rpx" height="80rpx"
								margin="0 0 0 16rpx"
								@click="handleShowGoodsSkuSelect(1)"
							>
								加入购物车
							</tui-button>
							<tui-button
								type="black" width="190rpx" height="80rpx" margin="0"
								@click="handleShowGoodsSkuSelect(2)"
							>
								立即购买
							</tui-button>
						</view>
					</view>
				</view>
			</view>
		</view>

		<BeeWxShare ref="beeWxShareRef" @click="handleShareServe()"></BeeWxShare>

		<!-- 回到顶部 -->
		<view style="position: fixed;bottom: 160rpx;right: 30rpx;">
			<view
				style="padding: 18rpx;border-radius: 50%;background: #FFFFFF;opacity: 0.8;"
				:style="{ 'display': returnTopFlag === true ? 'flex' : 'none' }" @click="handleReturnTop"
			>
				<tui-icon :size="30" color="#c5aa7b" name="top"></tui-icon>
			</view>
		</view>
		<!-- SKU选择器 -->
		<GoodSkuSelect
			ref="refGoodSkuSelect" :goods-detail="goodsDetail" :collage-id="collageId" :sku-id="skuId"
			:is-exchange="Boolean(isExchange)" :splicing-id="splicingId"
			@current-select-sku="handleSelectCurrent" @changeCartNum="(num) => allCartNum = num"
			@change-goods-detail="(obj) => goodsDetail = obj"
		/>
		<!-- 拼单弹框 -->
		<tui-popup
			:show="showGroupBuyList" :mode-class="[ 'fade' ]"
			:styles="{ width: '100%', position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 9999, backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '50rpx 28rpx 0', boxSizing: 'border-box' }"
			@click="showGroupBuyList = false"
		>
			<view style="background-color: #ffffff;">
				<view
					style="padding: 20rpx 0;font-size: 36rpx;color: #333333;text-align: center;border-bottom: 1rpx solid #EEEEEE;"
				>
					这些人正在拼单
				</view>
				<scroll-view style="max-height: 880rpx;" scroll-y>
					<view style="padding: 0 20rpx;border-top: 2rpx solid #EEEEEE;">
						<view
							v-for="(aitem, index) in selectedCurrentMsg.selectedSku.collageOrders" :key="index"
						>
							<view
								v-if="aitem.time > 0"
								style="display: flex;align-items: center;justify-content: space-between;flex-wrap: wrap;border-bottom: 1rpx solid #EEEEEE;"
							>
								<view style="display: flex;align-items: center;padding: 10rpx 0;">
									<image
										style="width: 72rpx;height: 72rpx;margin-right: 10rpx;border-radius: 50%;"
										:src="common.seamingImgUrl(aitem.headImage)"
									></image>
									<text>{{ aitem.name || '--' }}</text>
								</view>
								<view
									style="flex: 1;display: flex;justify-content: flex-end;align-items: center;margin-left: 12rpx;padding: 10rpx 0;white-space: nowrap;"
								>
									<view>
										<view style="margin-bottom: 10rpx;font-size: 28rpx;color: #333333;text-align: right;">
											<text style="color: #333333;padding-right: 10rpx;">{{ aitem.name }}</text>
											还差<text style="color: #C5AA7B;">{{ aitem.person }}人</text>
										</view>
										<view style="display: flex;align-items: center;">
											<view style="color: #666666;font-size: 26rpx;">
												剩余
											</view>
											<tui-countdown
												:width="42" :height="36" :size="30" :colon-size="30"
												colon-color="#333333"
												color="#333333" border-color="transparent"
												:time="Math.floor((aitem.time - Date.now()) / 1000)"
												@end="handleGetProductDetail"
											></tui-countdown>
										</view>
									</view>
									<tui-button
										v-if="aitem.time > 0"
										type="black" width="140rpx" height="60rpx" margin="0 0 0 14rpx"
										:size="24" @click="handleGoGroupBooking(aitem.collageId)"
									>
										和Ta拼
									</tui-button>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</tui-popup>

		<tui-bottom-popup :show="isShowCustomerServicePopup" @close="isShowCustomerServicePopup = false">
			<ATFCustomerService :shop-id="shopId" :data="customerServiceList"></ATFCustomerService>
		</tui-bottom-popup>
	</view>
</template>

<script>
import { A_TF_MAIN } from '../../../config'
import CombinedSales from './components/combinedSales'
import GoodEvaluateAndQuestion from './components/GoodEvaluateAndQuestion'
import GoodActivityDetail from './components/GoodActivityDetail'
import GoodSkuSelect from './components/GoodSkuSelect'
import { resolveGoodsDetailSkuSituation, setMiniprogramShareConfig } from '../../../utils'
import { getBuyerSelectionDetailsApi, getProductDetailsByIdApi, getBroadCastList, addUserTrackReportDoPointerApi, updateCollectCancelPUTApi, updateCollectToCollectApi, getCartListApi, getShopCartApi } from '../../../api/anotherTFInterface'

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
			viewUpdate: '',
			replaceImgText: '<img style="max-width:100%;height:auto" ',
			isIphone: getApp().globalData.isIphone,
			shopId: '',
			productId: '', // 商品ID，有可能是缓存数据
			skuId: '', // 产品ID
			isSelection: 0, // 是否选品
			isExchange: 0, // 是否兑换专区商品
			returnTopFlag: false, // 回到顶部
			// 埋点对象
			pointOption: {
				inTime: null,
				data: {
					eventType: 1,
					productIds: ''
				}
			},
			// 拼团
			collageId: 0, // 去拼团时的拼单ID
			broadCastList: [], // 拼团滚动数据
			showGroupBuyList: false, // 是否展示拼单弹窗
			// 拼单
			splicingId: 0,
			// 商品详情
			goodsDetail: {
				receive: {},
				shopId: '',
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
					image: '',
					activityType: 0,
					salePrice: 0,
					price: 0,
					stockNumber: 0,
					voucherId: 0,
					voucherPrice: 0,
					presenterVoucher: 0,
					beeCoin: 0,
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
	watch: {
		goodsDetail: {
			handler(newV, oldV) {
				if (newV.productId && (newV.productId !== oldV.productId)) {
					this.productId = newV.productId
					// #ifdef H5
					this.$nextTick(() => {
						this.handleShareServe(true)
					})
					// #endif
				}
			},
			immediate: true,
			deep: true
		}
	},
	onLoad(options) {
		this.pointOption.inTime = new Date().getTime()
		this.shopId = Number(options.shopId)
		this.productId = Number(options.productId)
		this.skuId = Number(options.skuId)
		this.isSelection = Number(options.isSelection) || 0
		this.isExchange = Number(options.isExchange) || 0
		this.handleGetProductDetail()
		getCartListApi({}).then((res) => {
			this.allCartNum = res.data.reduce((total, value) => total + value.skus.reduce((t, v) => t + (v.shelveState ? v.number : 0), 0), 0)
		})
		if (this.allCartNum > 99) this.allCartNum = '...'
		getShopCartApi({ shopId: this.shopId }).then((res) => {
			this.splicingId = (res.data[0] && res.data[0].splicingId) || 0
		})
		uni.$on('sendAddressSuccessMsg', (data) => {
			this.handleGetProductDetail()
		})
	},
	onUnload() {
		uni.$off('sendAddressSuccessMsg')
		// 判断是否要埋点
		if ((new Date().getTime() - this.pointOption.inTime) >= 5000) {
			this.pointOption.data.productIds = this.productId
			addUserTrackReportDoPointerApi(this.pointOption.data)
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

		// 返回头部
		handleReturnTop() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 300
			})
		},

		// 打开SKU弹窗
		handleShowGoodsSkuSelect(btnType) {
			if (this.goodsDetail.receive && this.goodsDetail.receive.receiveId) {
				// 为type情况时，绝不可能为和他人拼单
				this.collageId = 0
				this.$refs.refGoodSkuSelect.btnType = btnType
				this.$refs.refGoodSkuSelect.isShowDetails = true
			} else if (this.isExchange) {
				this.collageId = 0
				this.$refs.refGoodSkuSelect.btnType = btnType
				this.$refs.refGoodSkuSelect.isShowDetails = true
			} else {
				uni.showModal({
					title: '温馨提示',
					content: '系统检测到您未填写收货地址，部分功能将会受限，是否现在去填写？',
					confirmText: '现在填写',
					cancelText: '暂不填写',
					success: (res) => {
						if (res.confirm) {
							uni.navigateTo({
								url: '/another-tf/another-serve/addAddress/index?eventName=sendAddressSuccessMsg'
							})
						} else if (res.cancel) {
							this.collageId = 0
							this.$refs.refGoodSkuSelect.btnType = btnType
							this.$refs.refGoodSkuSelect.isShowDetails = true
						}
					}
				})
			}
		},

		// 获取商品详情
		async handleGetProductDetail() {
			uni.showLoading({
				title: '加载中...',
				mask: true
			})
			try {
				let _url
				if (this.isSelection) {
					_url = getBuyerSelectionDetailsApi
				} else {
					_url = getProductDetailsByIdApi
				}
				const res = await _url({
					shopId: this.shopId,
					productId: this.productId,
					skuId: this.skuId,
					terminal: 1
				})
				// const sameSkuProduct = Object.values(res.data.map).find((item) => item.skuId === res.data.skuId) || {}
				// this.goodsDetail = { ...res.data, voucherId: sameSkuProduct.voucherId || '', voucherPrice: sameSkuProduct.voucherPrice || '' }
				this.goodsDetail = res.data
				if (this.$store.state.app.terminal === 6) {
					setMiniprogramShareConfig({
						data: {
							event: 'sharingPageTurn',
							webPath: `/another-tf/another-serve/goodsDetails/index?shopId=${this.goodsDetail.shopId}&productId=${this.goodsDetail.productId}&skuId=${this.goodsDetail.skuId}&isSelection=${this.isSelection}`,
							title: `商品详情 - ${this.goodsDetail.productName}`,
							imageUrl: this.common.seamingImgUrl(this.goodsDetail.images[0])
						}
					})
				}
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
					}
				})
				this.viewUpdate = ' ' // 在APP端，有时候网络请求慢，造成等到执行nextTick之前就已经把页面渲染好，导致nextTick回调函数不能触发，无法执行默认选中商品的逻辑。所以这里改变视图层里的数据来强制更新视图。
			} finally {
				uni.hideLoading()
			}
		},

		handleShareServe(isQuit) {
			if (!this.isLogin()) return
			const data = {
				data: {
					title: `商品详情 - ${this.goodsDetail.productName}`,
					desc: this.goodsDetail.productBrief || '--',
					link: `${A_TF_MAIN}/#/another-tf/another-serve/goodsDetails/index?shopId=${this.goodsDetail.shopId}&productId=${this.goodsDetail.productId}&skuId=${this.goodsDetail.skuId}&isSelection=${this.isSelection}`,
					imageUrl: this.common.seamingImgUrl(this.goodsDetail.images[0])
				},
				successCb: () => { },
				failCb: () => { }
			}
			this.$refs.beeWxShareRef.share(data, isQuit)
		},

		// 收藏
		handleCollect() {
			if (this.goodsDetail.ifCollect === 0) {
				updateCollectToCollectApi({
					productId: parseInt(this.goodsDetail.productId)
				}).then((res) => {
					this.goodsDetail.ifCollect = 1
					uni.showToast({
						title: '收藏成功',
						icon: 'success'
					})
				})
			} else {
				updateCollectCancelPUTApi({
					ids: [ this.goodsDetail.productId ]
				}).then((res) => {
					this.goodsDetail.ifCollect = 0
					uni.showToast({
						title: '取消收藏成功',
						icon: 'success'
					})
				})
			}
		},

		// 打开客服
		async handleOpenCustomerService() {
			const res = await this.$store.dispatch('app/getCustomerServiceAction', {
				shopId: '' // this.shopId
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
	background-color: #f1f1f1;
	padding-bottom: 180rpx;

	/deep/ .tui-popup-class.tui-bottom-popup {
		height: 85vh !important;
	}

	.bottom-btn {
		/deep/ .tui-btn-gray {
			background: linear-gradient(113deg, #FFCD43 0%, #FF8026 100%) !important;
			border-radius: 16rpx 0 0 16rpx;
		}
		/deep/ .tui-btn-black {
			background: linear-gradient(113deg, #FF2E0E 1%, #FB670B 100%) !important;
			border-radius: 0 16rpx 16rpx 0;
		}
	}

	.buygoods-box {
		width: 100%;
		position: fixed;
		bottom: 0rpx;
		z-index: 1;
		background-color: #FFFFFF;
		box-sizing: border-box;

		.buygoodsBut-box {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 18rpx;
			box-shadow: 0rpx 0rpx 10rpx 1rpx #EDEDED;

			.Cart {
				position: relative;

				.cartAllNum {
					position: absolute;
					width: 30rpx;
					height: 30rpx;
					line-height: 30rpx;
					text-align: center;
					font-size: 18rpx;
					color: #FFFFFF;
					background: #C5AA7B;
					border-radius: 50%;
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
}
</style>
