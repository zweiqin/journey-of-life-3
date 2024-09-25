<template>
	<view>
		<TuanAppShim bg="#fff"></TuanAppShim>
		<view v-if="$store.getters.userInfo.buyerUserId" class="my-order-container">
			<OrderHeader
				ref="orderHeaderRef" :current-status="currentStatus" :menus="navMenus" :current-mode="currentOrderMode"
				@change-status="handleChangeStatus" @change-mode="handleChangeOrderMode($event, true)" @search="handleSearchCommunityOrderList"
			>
			</OrderHeader>

			<view class="order-list" :class="{ ani: !isLoading }">
				<SubNavs
					v-show="isShowSubNav && ['comment', 'append'].includes(isShowSubNav)" :active-value="currentSubValue"
					:navs="subNavs" @change-sub="handleChangeSubNavs"
				></SubNavs>

				<view v-show="currentOrderMode === 'community'">
					<!-- 社区普通订单 -->
					<view v-show="!isShowSubNav" class="community-common-order-list">
						<CommunityOrderPane
							v-for="item in communityOrderList" :key="item.id" :order-info="item"
							@cancel="(orderInfo) => $refs.cancelOrderRef.show(orderInfo)"
						></CommunityOrderPane>
					</view>
					<!-- 社区二次追加订单 -->
					<view v-show="isShowSubNav && [ 'append' ].includes(isShowSubNav)" class="community-append-order-list">
						<AdditionalAmountOrder
							v-for="order in appendOrderList" :key="order.id" :order-data="order"
							@refresh="getAppendOrder"
						></AdditionalAmountOrder>
					</view>
					<!-- 社区评论订单 -->
					<view v-show="isShowSubNav && [ 'comment' ].includes(isShowSubNav)" class="community-comment-order-list">
						<block v-if="[0, 1].includes(currentSubValue)">
							<CommentTypeV1
								v-for="order in currentSubValue === 0 ? commentOrder.commentOrderList : commentOrder.commentedOrderList"
								:key="order.orderNo" :is-append="currentSubValue === 1" :item-data="order" @comment="handleComment"
							>
							</CommentTypeV1>
						</block>
						<block v-if="currentSubValue === 2">
							<CommentTypeV2 v-for="order in commentOrder.commentAppendOrderList" :key="order.orderNo" :item-data="order">
							</CommentTypeV2>
						</block>
					</view>
					<NoData v-show="noDataVisible" :is-seach="!!communityQueryInfo.orderNo" @clear="clearSearch()"></NoData>
					<Loading v-show="isLoading" style="z-index: 1;"></Loading>
					<LoadingMore v-show="loadingStatus !== 'more'" style="margin-top: 20rpx" :status="loadingStatus">
					</LoadingMore>
				</view>
				<!--  商城 -->
				<view v-show="currentOrderMode === 'shoppingMall'">
					<ATFBusinessOrder
						v-for="(orderItem, orderIndex) in shoppingOrderList" :key="orderIndex" :data="orderItem"
						show-operate is-to-detail @refresh="getOrderList()" @pay-order="(e) => payObj = e"
					></ATFBusinessOrder>
					<view style="padding-bottom: 45rpx;">
						<LoadingMore
							:status="!shoppingIsEmpty && !shoppingOrderList.length
								? 'loading' : !shoppingIsEmpty && shoppingOrderList.length && (shoppingOrderList.length >= shoppingListTotal) ? 'no-more' : ''"
						>
						</LoadingMore>
						<tui-no-data v-if="shoppingIsEmpty" :fixed="false" style="padding-top: 60rpx;">暂无数据</tui-no-data>
					</view>
				</view>

				<!--  商圈 -->
				<view v-show="currentOrderMode === 'businessDistrict'">
					<ATFBusinessOrder
						v-for="(orderItem, orderIndex) in businessOrderList" :key="orderIndex" :data="orderItem"
						show-operate is-to-detail @refresh="getOrderList()" @pay-order="(e) => payObj = e"
					></ATFBusinessOrder>
					<view style="padding-bottom: 45rpx;">
						<LoadingMore
							:status="!businessIsEmpty && !businessOrderList.length
								? 'loading' : !businessIsEmpty && businessOrderList.length && (businessOrderList.length >= businessListTotal) ? 'no-more' : ''"
						>
						</LoadingMore>
						<tui-no-data v-if="businessIsEmpty" :fixed="false" style="padding-top: 60rpx;">暂无数据</tui-no-data>
					</view>
				</view>

			</view>

			<!-- 取消社区订单 -->
			<CancelOrder ref="cancelOrderRef" @success="getOrderList()"></CancelOrder>
		</view>

		<!-- 未登录时 -->
		<TuanUnLoginPage v-else></TuanUnLoginPage>

		<!-- 商圈支付 -->
		<tui-bottom-popup :show="payObj.showPayPopup" @close="payObj.showPayPopup = false">
			<view v-if="payObj.showPayPopup" style="padding: 60rpx 0 128rpx;">
				<CashierList
					ref="refCashierList" :price-pay="payObj.pricePay" show
					:pay-type-shops="[ payObj.shopId ]"
					:hui-shi-bao-pay="payObj.skus.every((b) => !b.platformCurrencyId) && payObj.pricePay ? [ payObj.shopId ] : false"
					show-tonglian-pay
					:show-commission-pay="payObj.skus.every((b) => !b.platformCurrencyId) && !!payObj.pricePay"
					:show-platform-pay="payObj.skus.every((b) => !b.platformCurrencyId) && !!payObj.pricePay"
					:show-transaction-pay="payObj.skus.every((b) => !b.platformCurrencyId) && !!payObj.pricePay"
					:shop-id-pay="payObj.skus.every((b) => !b.platformCurrencyId) && payObj.pricePay ? payObj.shopId : 0"
					@change="(e) => payObj.payInfo = { ...payObj.payInfo, ...e }"
					@password-input="(e) => (payObj.payInfo.pwd = e.pwd) && handlePaymentPassword()"
				/>
				<tui-button
					type="warning" width="168rpx" height="64rpx" margin="30rpx auto 0"
					shape="circle"
					@click="handlePaymentPassword"
				>
					确认支付
				</tui-button>
			</view>
		</tui-bottom-popup>

		<!-- toast -->
		<tui-toast ref="toast"></tui-toast>

		<DragButton
			text="联系客服" is-dock exist-tab-bar
			@btnClick="go('/another-tf/another-user/chat/chat-detail?chat=serviceAssistant')"
		>
		</DragButton>
	</view>
</template>

<script>
import { communityOrderStatusList, communityAppendOrderNavs, communityCommentOrder, businessSubNavs, shoppingSubNavs } from './config'
import { getEndOrderListApi, getTwicePayOrderListApi } from '../../api/community-center'
import { getAllOrderListApi, updateOrderTryConfirmForBanziApi } from '../../api/anotherTFInterface'
import { USER_ID, T_PAY_ORDER, T_COMMUNITY_ORDER_NO, ENTERPRISE_ORDERS_NO, IS_SWITCH_ORDER } from '../../constant'
import TuanUnLoginPage from './components/TuanUnLoginPage.vue'
import OrderHeader from './components/OrderHeader.vue'
import CommunityOrderPane from './components/CommunityOrderPane.vue'
import CancelOrder from './components/CancelOrder.vue'
import Loading from './components/Loading.vue'
import NoData from './components/NoData.vue'
import SubNavs from './components/SubNavs.vue'
import AdditionalAmountOrder from '../../community-center/components/AdditionalAmountOrder.vue'
import CommentTypeV1 from '../../community-center/comment-order/components/CommentTypeV1.vue'
import CommentTypeV2 from '../../community-center/comment-order/components/CommentTypeV2.vue'
import { paymentModeEnum, handleDoPay } from '../../utils/payUtil'
import { importJsSDK } from '../../utils'

export default {
	name: 'Order',
	components: {
		TuanUnLoginPage,
		OrderHeader,
		CommunityOrderPane,
		NoData,
		Loading,
		CancelOrder,
		SubNavs,
		AdditionalAmountOrder,
		CommentTypeV1,
		CommentTypeV2
	},

	data() {
		return {
			currentOrderMode: 'community',
			navMenus: communityOrderStatusList,
			currentStatus: -1,
			currentSubValue: 0,
			userId: null,
			communityCommentOrder: Object.freeze(communityCommentOrder),
			isLoading: false, // 是否加载中
			loadingStatus: 'loading', // 加载状态
			isShowSubNav: null,
			// 社区订单
			communityQueryInfo: {
				pageNo: 1,
				pageSize: 20,
				status: undefined,
				orderNo: ''
			},
			totalCommunityPages: 0,
			communityOrderList: [],
			// 二次追加订单
			awaitPayOrderList: [], // 待支付
			payedOrderList: [], // 已支付
			refusedOrderList: [], // 已拒绝
			// 评论订单
			commentOrder: {
				commentOrderList: [], // 待评论订单
				commentAppendOrderList: [], // 可追加订单
				commentedOrderList: [] // 已评论订单
			},
			currentNavInfo: {
				label: '全部',
				value: -1
			},

			// 商城订单
			shoppingQueryInfo: {
				page: 1,
				pageSize: 10,
				orderType: 1,
				procureType: 2
			},
			shoppingOrderList: [],
			shoppingListTotal: 0,
			shoppingIsEmpty: false,
			// 商圈订单
			businessQueryInfo: {
				page: 1,
				pageSize: 10,
				orderType: 2,
				procureType: 2
			},
			businessOrderList: [],
			businessListTotal: 0,
			businessIsEmpty: false,

			// 支付相关
			payObj: {
				showPayPopup: false,
				pricePay: 0,
				shopId: '',
				skus: [],
				orderType: '',
				payInfo: {}
			}
		}
	},

	computed: {
		subNavs() {
			if (this.isShowSubNav) return this.isShowSubNav === 'append' ? communityAppendOrderNavs : this.isShowSubNav === 'comment' ? this.communityCommentOrder : ''
			return []
		},
		appendOrderList() {
			if (!this.isShowSubNav) return []
			if (this.isShowSubNav === 'append') {
				if (this.currentSubValue === 0) {
					return this.awaitPayOrderList
				} else if (this.currentSubValue === 1) {
					return this.payedOrderList
				} else if (this.currentSubValue === 2) {
					return this.refusedOrderList
				}
			}
			return []
		},
		noDataVisible() {
			if (this.isLoading) return false
			if (this.currentOrderMode === 'community') {
				if (!this.isShowSubNav) {
					return !this.communityOrderList.length
				}
				if (this.isShowSubNav) {
					if (this.isShowSubNav === 'append') {
						return !this.appendOrderList.length
					} else if (this.isShowSubNav === 'comment') {
						if (this.currentSubValue === 0) {
							return !this.commentOrder.commentOrderList.length
						} else if (this.currentSubValue === 1) {
							return !this.commentOrder.commentedOrderList.length
						}
						return !this.commentOrder.commentAppendOrderList.length
					}
				}
			} else {
				return true
			}
		}
	},

	onLoad(options) {
		importJsSDK()
		uni.removeStorageSync(IS_SWITCH_ORDER)
	},

	onShow() {
		this.userId = uni.getStorageSync(USER_ID) || ''
		if (uni.getStorageSync(T_PAY_ORDER) && ['community', 'shoppingMall', 'businessDistrict'].includes(uni.getStorageSync(T_PAY_ORDER).type)) {
			this.handleChangeOrderMode(uni.getStorageSync(T_PAY_ORDER).type)
		} else if (['community', 'shoppingMall', 'businessDistrict'].includes(getApp().globalData.orderTypeShow)) {
			this.handleChangeOrderMode(getApp().globalData.orderTypeShow)
		}
		uni.removeStorageSync(T_PAY_ORDER)
		getApp().globalData.orderTypeShow = ''
		uni.removeStorageSync(T_COMMUNITY_ORDER_NO)
		uni.removeStorageSync(ENTERPRISE_ORDERS_NO)
		this.$nextTick(() => {
			this.getOrderList()
		})
	},

	methods: {
		handleChangeOrderMode(mode, isGetData = false) {
			if (mode === this.currentOrderMode) return
			switch (mode) {
				case 'community':
					this.navMenus = communityOrderStatusList
					break
				case 'shoppingMall':
					this.navMenus = shoppingSubNavs
					break
				case 'businessDistrict':
					this.navMenus = businessSubNavs
					break
				default:
					break
			}
			this.$nextTick(() => {
				this.currentOrderMode = mode
				if (this.currentOrderMode === 'community') {
					this.currentStatus = -1
					this.communityQueryInfo.status = undefined
				} else if (this.currentOrderMode === 'shoppingMall') {
					this.currentStatus = 0
				} else if (this.currentOrderMode === 'businessDistrict') {
					this.currentStatus = 0
				}
				this.isShowSubNav = null
				isGetData && this.getOrderList()
			})
		},

		// 清空搜索
		clearSearch() {
			this.communityQueryInfo.orderNo = ''
			this.$refs.orderHeaderRef && this.$refs.orderHeaderRef.clearSearch()
		},
		// 点击搜索
		handleSearchCommunityOrderList(searchValue) {
			if (this.currentOrderMode === 'community') {
				this.currentStatus = -1
				this.communityQueryInfo.orderNo = searchValue || undefined
				this.isShowSubNav = null
				this.communityQueryInfo.status = undefined
				this.getOrderList()
			} else {
				this.ttoast({
					type: 'fial',
					title: '只能搜索社区订单'
				})
			}
		},

		// 切换状态
		handleChangeStatus(navInfo) {
			if (!navInfo) return
			this.currentNavInfo = navInfo
			this.currentStatus = navInfo.value
			if (this.currentOrderMode === 'community') {
				this.isShowSubNav = null
				if (navInfo.value === -1) {
					this.communityQueryInfo.status = undefined
				} else if (navInfo.value === -2) {
					this.isShowSubNav = 'append'
					this.getAppendOrder(true)
					return
				} else if (navInfo.value === -3) {
					this.isShowSubNav = 'comment'
					this.currentSubValue = 0
					this.getCommentOrderList(this.communityCommentOrder[0])
					return
				} else {
					this.communityQueryInfo.status = navInfo.value
				}
			} else if (this.currentOrderMode === 'shoppingMall') {
			} else if (this.currentOrderMode === 'businessDistrict') {
			}
			this.getOrderList()
		},

		// 切换sub
		handleChangeSubNavs(info) {
			this.currentSubValue = info.value
			if (this.isShowSubNav === 'comment') {
				this.getCommentOrderList(info)
			}
		},

		// 发起请求获取列表数据
		// eslint-disable-next-line complexity
		async getOrderList(isLoadmore) {
			if (this.currentOrderMode === 'community') {
				if (!isLoadmore) {
					this.communityOrderList = []
					this.communityQueryInfo.pageNo = 1
				}
				try {
					this.isLoading = true
					this.loadingStatus = 'loading'
					const res = await getEndOrderListApi({
						...this.communityQueryInfo,
						userId: this.userId
					})
					if (res.statusCode === 20000) {
						this.communityOrderList.push(...res.data)
						this.totalCommunityPages = res.pages
					} else {
						this.ttoast({
							type: 'fail',
							title: res.statusMsg || '订单列表获取失败'
						})
					}
				} catch (error) {
					this.ttoast({
						type: 'fail',
						title: '订单列表获取失败',
						content: error
					})
				} finally {
					this.isLoading = false
					uni.stopPullDownRefresh()
					this.loadingStatus = 'more'
				}
			} else if (this.currentOrderMode === 'shoppingMall') {
				if (!isLoadmore) this.shoppingQueryInfo.page = 1
				uni.showLoading()
				getAllOrderListApi({ ...this.shoppingQueryInfo, state: this.currentStatus || '' })
					.then((res) => {
						const pendingOrderList = res.data.list.filter((item) => item.skus.some((section) => section.banziSkuId) && [ 3 ].includes(item.state))
						if (pendingOrderList && pendingOrderList.length) {
							uni.hideLoading()
							uni.showLoading({
								title: '处理中...'
							})
							Promise.all(pendingOrderList.map((item) => updateOrderTryConfirmForBanziApi({ subOrderSn: item.orderFormid })))
								.then((res) => {
									uni.hideLoading()
									uni.showLoading({
										title: '请求中...'
									})
									getAllOrderListApi({ ...this.shoppingQueryInfo, state: this.currentStatus || '' })
										.then((result) => {
											this.shoppingListTotal = result.data.total
											if (isLoadmore) {
												this.shoppingOrderList.push(...result.data.list)
											} else {
												this.shoppingOrderList = result.data.list
											}
											this.shoppingIsEmpty = this.shoppingOrderList.length === 0
											uni.hideLoading()
										})
										.catch(() => {
											uni.hideLoading()
										})
								})
								.catch(() => {
									uni.hideLoading()
								})
						} else {
							this.shoppingListTotal = res.data.total
							if (isLoadmore) {
								this.shoppingOrderList.push(...res.data.list)
							} else {
								this.shoppingOrderList = res.data.list
							}
							this.shoppingIsEmpty = this.shoppingOrderList.length === 0
							uni.hideLoading()
						}
					})
					.catch(() => {
						uni.hideLoading()
					})
			} else if (this.currentOrderMode === 'businessDistrict') {
				if (!isLoadmore) this.businessQueryInfo.page = 1
				uni.showLoading()
				getAllOrderListApi({ ...this.businessQueryInfo, state: this.currentStatus || '' })
					.then((res) => {
						this.businessListTotal = res.data.total
						if (isLoadmore) {
							this.businessOrderList.push(...res.data.list)
						} else {
							this.businessOrderList = res.data.list
						}
						this.businessIsEmpty = this.businessOrderList.length === 0
						uni.hideLoading()
					})
					.catch(() => {
						uni.hideLoading()
					})
			}
		},

		// 获取二次追加的订单
		async getAppendOrder() {
			this.awaitPayOrderList = []
			this.payedOrderList = []
			this.refusedOrderList = []
			const _this = this
			try {
				this.isLoading = true
				this.loadingStatus = 'loading'
				const res = await getTwicePayOrderListApi({
					userId: this.userId
				})
				if (res.statusCode === 20000) {
					const orderList = res.data
					if (orderList && orderList.length) {
						orderList.forEach((item) => {
							if (item.status === 0) {
								_this.awaitPayOrderList.push(item)
							} else if (item.status === 1) {
								_this.payedOrderList.push(item)
							} else if (item.status === 2) {
								this.refusedOrderList.push(item)
							}
						})
					}
				} else {
					this.ttoast({
						type: 'fail',
						title: res.statusMsg || '二次追加订单获取失败'
					})
				}
			} catch (error) {
				this.ttoast({
					type: 'fail',
					title: '二次追加订单获取失败',
					content: error
				})
			} finally {
				this.isLoading = false
				uni.stopPullDownRefresh()
				this.loadingStatus = 'more'
			}
		},

		// 获取评论订单数据
		async getCommentOrderList(queryInfo) {
			try {
				this.isLoading = true
				this.loadingStatus = 'loading'
				const { api, list } = queryInfo
				if (api && list) {
					const orderList = await api({
						userId: this.userId
					})

					this.commentOrder[list] = orderList || []
				}
			} catch (error) {
				this.ttoast({
					type: 'fail',
					title: '评论订单获取失败',
					content: error
				})
			} finally {
				this.isLoading = false
				uni.stopPullDownRefresh()
				this.loadingStatus = 'more'
			}
		},

		// 去评论
		handleComment({ itemData, isAppend }) {
			if (isAppend) {
				uni.navigateTo({
					url:
						'/community-center/comment-order/append-comment?orderNo=' +
						itemData.orderNo +
						'&serveName=' +
						itemData.serverName +
						'&url=' +
						itemData.serverUrl +
						'&commentId=' +
						itemData.id
				})
			} else {
				uni.navigateTo({
					url: '/community-center/comment-order/rate?orderNo=' + itemData.orderNo + '&serveName=' + itemData.serverName + '&url=' + itemData.serverUrl
				})
			}
		},

		canReachBottomLoad() {
			if (this.currentOrderMode === 'community') {
				return ![-3, -2].includes(this.currentStatus)
			} else if (this.currentOrderMode === 'shoppingMall') {
				return true
			} else if (this.currentOrderMode === 'businessDistrict') {
				return true
			}
		},

		async handlePaymentPassword() {
			if ((this.payObj.payInfo.paymentMode !== 9) && (this.payObj.payInfo.paymentMode !== 4) && !this.payObj.payInfo.pwd) {
				this.$refs.refCashierList && this.$refs.refCashierList.handleInputPaymentPassword()
			} else {
				await handleDoPay(this.payObj.payInfo, this.payObj.orderType, paymentModeEnum[this.payObj.orderType], { fn: () => (this.payObj.payInfo.pwd = '') })
				this.payObj = {
					showPayPopup: false,
					pricePay: 0,
					shopId: '',
					skus: [],
					payInfo: {}
				}
			}
		}
	},

	onPullDownRefresh() {
		if (!this.userId) return uni.stopPullDownRefresh()
		this.communityQueryInfo.pageNo = 1
		this.awaitPayOrderList = []
		this.payedOrderList = []
		this.refusedOrderList = []
		this.commentOrder.commentOrderList = []
		this.commentOrder.commentAppendOrderList = []
		this.commentOrder.commentedOrderList = []
		this.getOrderList()
	},

	onReachBottom() {
		if (this.canReachBottomLoad()) {
			if (this.currentOrderMode === 'community') {
				if (this.communityOrderList.length < this.communityQueryInfo.pageSize) {
					return
				}
				if (this.communityQueryInfo.pageNo >= this.totalCommunityPages) {
					this.loadingStatus = 'no-more'
					return
				}
				this.communityQueryInfo.pageNo++
				this.getOrderList(true)
			} else if (this.currentOrderMode === 'shoppingMall') {
				if (this.shoppingOrderList.length < this.shoppingListTotal) {
					++this.shoppingQueryInfo.page
					this.getOrderList(true)
				}
			} else if (this.currentOrderMode === 'businessDistrict') {
				if (this.businessOrderList.length < this.businessListTotal) {
					++this.businessQueryInfo.page
					this.getOrderList(true)
				}
			}
		}
	}
}
</script>

<style lang="less" scoped>
/deep/ .tui-lazyload__img {
	width: 140rpx !important;
	height: 140rpx !important;
	background-color: #ccc;
}

/deep/ .tui-bottom-popup {
	overflow: visible;
	.tui-dialog {
		top: auto;
		bottom: 32vh;
	}
}

@keyframes fade {
	0% {
		opacity: 0.4;
		transform: translateX(-100vw);
	}

	100% {
		opacity: 1;
		transform: translateX(0);
	}
}

.my-order-container {
	width: 100vw;
	background-color: #f5f5f7;

	.order-list {
		min-height: 100vh;
		background-color: #f5f5f7;
		position: relative;
		padding: 220rpx 30rpx 124rpx;
		box-sizing: border-box;

		&.ani {
			animation: fade 350ms ease-in-out;
		}
	}
}
</style>
