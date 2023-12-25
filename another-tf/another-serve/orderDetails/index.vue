<template>
	<view class="order-details-container">
		<JHeader title="订单详情" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view>
			<view class="content" style="padding-bottom:200upx;">
				<view class="order-details-status">
					<!--  待付款 -->
					<view v-if="dataList.state == 1" class="status-title-box">
						<view class="l">
							<text class="status">等待买家付款</text>
							<view style="display: flex;justify-content: center;align-items: center;color: #FFFFFF; margin-top: 20rpx;">
								<text>剩</text>
								<tui-countdown :size="24" :colon-size="24" colon-color="#ffffff" :time="remainingTime"></tui-countdown>
								<text>自动关闭</text>
							</view>
						</view>
					</view>
					<!--  待发货 -->
					<view v-else-if="dataList.state == 2" class="status-title-box">
						<view class="l">
							<text class="status">等待卖家发货</text>
							<text class="label">付款后2-5个工作日发货</text>
						</view>
					</view>
					<!--  待核销 -->
					<view v-else-if="dataList.state == 8" class="status-title-box">
						<view class="l">
							<text class="status">等待核销</text>
							<text class="label">向商家出示核销码进行核销</text>
						</view>
					</view>
					<!--  待收货 -->
					<view v-else-if="dataList.state == 3" class="status-title-box">
						<view class="l">
							<text class="status">卖家已发货</text>
						</view>
					</view>
					<!-- 已完成 -->
					<view v-else-if="dataList.state == 4" class="status-title-box">
						<view class="l">
							<text class="status">交易成功</text>
							<text class="label">感谢您的使用</text>
						</view>
					</view>
					<!--  拼团失败 -->
					<view v-else-if="dataList.state == 5 && dataList.collageId != 0" class="status-title-box">
						<view class="l">
							<text class="status">拼团失败</text>
							<text class="label">剩余时间 00:00:00</text>
						</view>
						<view class="clusterback">
						</view>
					</view>
					<!-- 交易关闭 -->
					<view v-else-if="dataList.state == 5" class="status-title-box2">
						<text class="status">交易关闭</text>
						<text class="label">您已关闭了这笔交易</text>
					</view>
					<!-- 退款成功 -->
					<view
						v-else-if="(dataList.returnType == 1 && dataList.moneyReturnList.status == 4) || (dataList.returnType == 2 && dataList.moneyReturnList.status == 6)"
						class="status-title-box2"
					>
						<text class="status">退款成功</text>
						<text class="label">该笔订单 ¥{{ dataList.paySum }} 退款，已原路退回</text>
					</view>
					<!--  待成团 -->
					<view v-else-if="dataList.state == 6" class="status-title-box">
						<view class="l">
							<text class="status">待成团</text>
							<view style="display: flex;justify-content: center;align-items: center;color: #FFFFFF; margin-top: 20rpx;">
								<text>剩余时间</text>
								<tui-countdown :size="24" :colon-size="24" colon-color="#ffffff" :time="remainingTime"></tui-countdown>
							</view>
						</view>
					</view>

				</view>
				<view class="order-details-info-box">
					<view class="address-box">
						<tui-icon name="position" :size="70" unit="upx" color="#333333" margin="0 20upx 0 0"></tui-icon>
						<view class="address-r">
							<view class="address-name-box">
								<text>{{ dataList.receiveName }}</text>
								<text class="phone">{{ dataList.receivePhone }}</text>
							</view>
							<view class="address-info">
								<text>{{ dataList.receiveAdress }} {{ dataList.address }}</text>
							</view>
						</view>
					</view>

					<!-- 核销相关 -->
					<view v-if="verificationCodeUrl" style="padding: 20upx 40upx 0;font-weight: bold;">
						<view>使用凭证</view>
						<view style="text-align: center;">
							<image style="width: 420upx;" mode="widthFix" :src="verificationCodeUrl" />
						</view>
						<view style="display: flex;justify-content: center;font-size: 30upx;">
							<view style="color: #3D3D3D;">核销码：{{ verificationCode || '--' }}</view>
							<view style="margin-left: 22upx;color: #0061C8;" @click="$copy(verificationCode)">复制</view>
						</view>
						<view style="text-align: center;">
							状态：
							<text v-if="verificationStatus == '0'">待核销-待付款</text>
							<text v-else-if="verificationStatus == '1'">待核销-已付款</text>
							<text v-else-if="verificationStatus == '2'">已核销</text>
							<text v-else-if="verificationStatus == '3'">已过期</text>
							<text v-else-if="verificationStatus == '4'">已取消</text>
							<text v-else>--</text>
						</view>
					</view>
					<view class="order-list-box">
						<view class="item">
							<view class="order-list-top">
								<view class="top-l" @click="go(`/community-center/shop/shop-detail?shopId=${dataList.shopId}`)">
									<tui-icon name="shop" :size="34" unit="upx" color="#2b2b2b" margin="0 10upx 0 0"></tui-icon>
									<text class="shop-name">{{ dataList.shopName }}</text>
									<tui-icon :size="24" color="#999999" name="arrowright" margin="0 0 0 15upx"></tui-icon>
								</view>
								<view class="toService" @click="handleFlyToService">
									<tui-icon name="people-fill" :size="60" unit="upx" color="#9aedbe" margin="0 15upx 0 0"></tui-icon>
									<text>联系客服</text>
								</view>
							</view>
							<view class="order-info-box">
								<view class="order-info">
									<view
										v-for="proItem in dataList.skus" :key="proItem.productId" class="order-info-item"
										@click="goodsItemTap(proItem.productId, proItem.skuId)"
									>
										<image :src="common.seamingImgUrl(proItem.image)" class="product-img default-img"></image>
										<view class="info-box">
											<text class="product-name">{{ proItem.productName }}</text>
											<view class="price-sku-box">
												<view class="product-sku">
													<view v-for="(vItem, vIndex) in proItem.values" :key="vIndex" class="mar-left-20">
														<text>{{ vItem }}</text>
													</view>
												</view>
												<view class="product-num">x {{ proItem.number }}</view>
											</view>
											<view class="price-sku-box">
												<!--	<view class="price-box"> -->
												<!--		<view class="product-price1">实付：<text -->
												<!--				class="fuhao">￥</text>{{proItem.price}}</view> -->
												<!--		&lt;!&ndash; <view class="product-price2">价格：<text class="fuhao">￥</text>{{proItem.price}}</view> &ndash;&gt; -->
												<!--	</view> -->
												<view
													v-if="(dataList.state === 3 || dataList.state === 4) && proItem.afterState == 0 && !proItem.returnType"
												>
													<view
														v-if="proItem.returnStatus == null || (!proItem.canApplyIntervention && proItem.returnStatus == 2)"
														class="item-applay-btn" @click.stop="applayItemTap(proItem)"
													>
														退款
													</view>
												</view>

												<view v-if="proItem.returnType == 1">
													<view
														v-if="proItem.returnStatus == 0 || proItem.returnStatus == 1 || proItem.returnStatus == 3 || proItem.returnStatus == 4"
														class="item-applay-btn" @click="goApplyTap(proItem.returnType)"
													>
														退款中
													</view>
													<view
														v-if="proItem.returnStatus == 4" class="item-applay-btn"
														@click="goApplyTap(proItem.returnType)"
													>
														已退款
													</view>
													<view
														v-if="proItem.returnStatus == 5" class="item-applay-btn"
														@click="goApplyTap(proItem.returnType)"
													>
														退款失败
													</view>
													<view
														v-if="proItem.canApplyIntervention" class="item-applay-btn"
														@click="goApplyTap(proItem.returnType)"
													>
														客服介入
													</view>
												</view>
												<view v-if="proItem.returnType == 2">
													<view
														v-if="proItem.returnStatus == 0 || proItem.returnStatus == 1 || proItem.returnStatus == 3 || proItem.returnStatus == 4"
														class="item-applay-btn" @click="goApplyTap(proItem.returnType)"
													>
														退货中
													</view>
													<view
														v-if="proItem.returnStatus == 6" class="item-applay-btn"
														@click="goApplyTap(proItem.returnType)"
													>
														已退款
													</view>
													<view
														v-if="proItem.returnStatus == 7" class="item-applay-btn"
														@click="goApplyTap(proItem.returnType)"
													>
														退款中
													</view>
													<view
														v-if="proItem.returnStatus == 5 || proItem.returnStatus == 8" class="item-applay-btn"
														@click="goApplyTap(proItem.returnType)"
													>
														退款失败
													</view>
													<view
														v-if="proItem.canApplyIntervention" class="item-applay-btn"
														@click="goApplyTap(proItem.returnType)"
													>
														客服介入
													</view>
												</view>

												<view v-if="proItem.commentStatus == 0" class="evaluate" @click="evaluateTap(pIndex)">
													立即评价
												</view>
												<view
													v-if="proItem.commentStatus == 1 && proItem.additionalComment != null" class="evaluate2"
													@click="evaluateTowTap(pIndex)"
												>
													追加评价
												</view>

											</view>
										</view>
									</view>
									<view class="delivery-way-box">
										<view class="item">
											<text class="way">商品总价</text>
											<text class="way">¥{{ dataList.orderPrice }}</text>
										</view>
										<view class="item">
											<text class="way">快递运费</text>
											<text class="way">¥{{ dataList.logisticsPrice }}</text>
										</view>
										<view class="item">
											<text class="way">平台优惠</text>
											<text class="way">-¥{{ dataList.discountPrice }}</text>
										</view>
									</view>
								</view>
								<!-- 待发货 待收货 已完成 -->
								<view
									v-if="(dataList.state == 2) || (dataList.state == 3) || (dataList.state == 4) || ((dataList.state == 8) && (dataList.paymentState === 1))"
									class="order-total-box"
								>
									<text>实付款</text>
									<text class="way-color">¥{{ dataList.price }}</text>
								</view>
								<!-- 待付款 价格是橙色 -->
								<view
									v-else-if="(dataList.state == 1) || ((dataList.state == 8) && (dataList.paymentState === 0))"
									class="order-total-box"
								>
									<text>需付款</text>
									<text class="way-color">¥{{ dataList.price }}</text>
								</view>
								<!-- 退款成功 交易关闭 -->
								<view
									v-else-if="(dataList.returnType == 1 && dataList.moneyReturnList.status == 4) || (dataList.returnType == 2 && dataList.goodsReturn.status == 6) || (dataList.state == 5)"
									class="order-total-box"
								>
									<text>需付款</text>
									<text>¥{{ dataList.price }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="order-details-information padd">
					<view class="order-title">
						<text>订单信息</text>
					</view>
					<view class="info-box">
						<!-- 都有  但是：待付款  待发货  退款成功 交易关闭  只有前两个item -->
						<view class="item">
							<text>订单编号：{{ dataList.orderFormid }}</text>
							<text class="copy-color" @click="$copy(dataList.orderFormid)">复制</text>
						</view>
						<view class="item">
							<text>创建时间：{{ dataList.createTime }}</text>
						</view>
						<!-- 待收货  有付款时间和发货时间 -->
						<view v-if="dataList.state == 3" class="item">
							<text>付款时间：{{ dataList.paymentTime }}</text>
						</view>
						<view v-if="dataList.state == 3 || dataList.state == 4" class="item">
							<text>发货时间：{{ dataList.dileveryTime }}</text>
						</view>
						<!-- 交易成功 有成交时间 -->
						<view v-if="dataList.state == 4" class="item">
							<text>成交时间：{{ dataList.receiveTime }}</text>
						</view>
					</view>
				</view>

				<view v-if="dataList.state == 3 || dataList.state == 4">
					<view class="order-details-information mt20">
						<view class="order-title-box" @click="isShowWuLiu = !isShowWuLiu">
							<view class="order-title padd-l">
								<text class="line"></text>
								<text>物流信息</text>
							</view>
							<tui-icon
								v-if="isShowWuLiu == true" :name="isShowWuLiu ? 'arrowup' : 'arrowdown'" :size="40" unit="upx"
								margin="30upx" color="#b7b7b7"
							></tui-icon>
						</view>
					</view>
					<!-- 暂无物流 -->
					<view v-if="isShowWuLiu">
						<view v-if="steps.length > 0" class="logistics">
							<tui-steps direction="column" :items="steps" spacing="180rpx" :active-steps="0"></tui-steps>
						</view>
						<view v-else class="emptyOrder-box flex-items-plus flex-column">
							<image class="emptyOrder-img" src="../../../static/images/new-business/shop/bgnull.png"></image>
							<label class="font-color-999 fs26 mar-top-30">这里空空如也～</label>
						</view>
					</view>
				</view>
			</view>

			<!-- 待付款 待发货 待收货 已完成 退款成功 -->
			<view
				class="order-details-btn" style="padding-top:30upx;"
				:style="{ 'padding-bottom': (isIphone == true ? 40 : 0) + 'rpx' }"
			>
				<text
					v-if="(dataList.state == 1) || (dataList.state == 6) || ((dataList.state === 8) && (dataList.paymentState === 0))"
					class="btn-l" @click="cancelOrder"
				>
					取消订单
				</text>
				<text
					v-if="(dataList.state == 1) || ((dataList.state === 8) && (dataList.paymentState === 0))" class="btn btn-r"
					@click="showPayTypePopup = true"
				>
					立即付款
				</text>
				<text
					v-if="(dataList.state == 2) || (dataList.state == 3) || ((dataList.state === 8) && (dataList.paymentState === 1))"
					class="btn-l" @click="applyMoneyAllTap"
				>
					申请退款
				</text>
				<text v-if="dataList.state == 3" class="btn btn-r" @click="confirmReceiptTap">确认收货</text>
				<text v-if="dataList.state == 4" class="btn" @click="handleApplyTap">申请售后</text>
				<text
					v-if="dataList.state == 6" class="btn btn-r"
					@click="goInviteSpll(dataList.collageId, dataList.orderId, dataList.skus[0].productId, dataList.skus[0].skuId, dataList.shopGroupWorkId)"
				>
					邀请拼单
				</text>
				<text v-if="dataList.state == 5 && dataList.collageId == 0" class="btn-l" @click="delOrder">删除订单</text>
				<text
					v-if="dataList.state == 5 && dataList.collageId == 0" class="btn btn-r"
					@click="againCollage(dataList.skus[0].productId, dataList.shopId, dataList.skus[0].skuId, true, dataList)"
				>
					再次购买
				</text>
				<text
					v-if="dataList.state == 5 && dataList.collageId != 0" class="btn"
					@click="againCollage(dataList.skus[0].productId, dataList.shopId, dataList.skus[0].skuId, false, dataList)"
				>
					再次开团
				</text>
			</view>
			<tui-bottom-popup :show="showPayTypePopup" @close="showPayTypePopup = false">
				<view v-if="showPayTypePopup" style="padding: 60upx 0 128upx;">
					<CashierList :total-price="dataList.orderPrice" show @change="(e) => payInfo = { ...payInfo, ...e }" />
					<tui-button
						type="warning" width="168upx" height="64upx" margin="30upx auto 0"
						shape="circle"
						@click="handleShopGoPay"
					>
						确认支付
					</tui-button>
				</view>
			</tui-bottom-popup>
		</view>
	</view>
</template>

<script>
import { handleDoPay } from '../../../utils/payUtil'
import {
	getOrderDetailApi,
	getOrderVerificationHxCodeApi,
	getCustomerServiceAppletKfApi,
	getProductDetailsByIdApi,
	getOrderDileveryShippingTraceApi,
	deleteShopOrderApi,
	cancelShopOrderApi,
	getOrderRefundApi,
	updateOrderConfirmApi
} from '../../../api/anotherTFInterface'
import { T_SKU_ITEM_DTO_LIST, T_REFUND_APPLY_ITEM, T_AFTER_SALE_APPLY_REFUND } from '../../../constant'
import { A_TF_MAIN } from '../../../config'

export default {
	name: 'OrderDetails',
	data() {
		return {
			canApplyIntervention: false,
			verificationCode: '',
			verificationCodeUrl: '',
			verificationStatus: '',
			dataList: {
				orderFormid: null,
				createTime: null,
				orderPrice: 0,
				logisticsPrice: 0,
				discountPrice: 0
			},
			orderId: 0,
			steps: [],
			isShowWuLiu: false,
			orderRefundList: [],
			item: {},
			isIphone: false,
			noticeId: 0,

			// 客服
			serviceURL: '',
			corpId: '',
			remainingTime: null, // 倒计时剩余时间

			// 支付
			showPayTypePopup: false,
			payInfo: {}
		}
	},
	onLoad(options) {
		this.isIphone = getApp().globalData.isIphone
		if (options.detail) options = this.$getJumpParam(options)
		this.orderId = parseInt(options.orderId)
		this.item = options
		if (options.noticeId) {
			this.noticeId = options.noticeId
		}
		this.getDataList(this.orderId)
		getOrderRefundApi({
			orderId: this.orderId
		}).then((res) => {
			this.orderRefundList = res.data
		})
		getOrderVerificationHxCodeApi({
			url: `${A_TF_MAIN}/#/pages/jump/jump?orderId=${this.orderId}&type=verification&code=${this.orderId}-`
		}).then((res) => {
			// if (res.errno === -1) return
			this.verificationCode = res.data.code
			this.verificationCodeUrl = res.data.hxCode
			this.verificationStatus = res.data.status
		})
	},
	methods: {
		// 去商品详情
		againCollage(productId, shopId, skuId, isStartAGroup, item) {
			if (isStartAGroup) {
				this.go(`/another-tf/another-serve/goodsDetails/index?shopId=${shopId}&productId=${productId}&skuId=${skuId}`)
			} else {
				this.handleGoBuyAgain(item) // 跳转详情
			}
		},
		async handleGoBuyAgain(item) {
			// 循环sku，获取商品详情
			const postAjax = []
			item.skus.forEach((skuItem) => {
				postAjax.push(this.queryProductDetail(skuItem))
			})
			// 并发执行
			const skuDetailList = await Promise.all(postAjax)
			const canNotBuyNameList = []
			// 判断库存
			skuDetailList.forEach((skuDetail) => {
				for (const skuDetailSkuMapKey in skuDetail.map) {
					// 判断此SKU是否存在于传进来的item
					const findSku = item.skus.find((findItem) => findItem.skuId === skuDetail.map[skuDetailSkuMapKey].skuId)
					if (findSku) {
						if (findSku.number > skuDetail.map[skuDetailSkuMapKey].stockNumber) {
							canNotBuyNameList.push(findSku.productName)
						}
					}
				}
			})
			// 如果有库存不足
			if (canNotBuyNameList.length > 0) return this.$showToast(canNotBuyNameList.join(',') + ' 库存不足')
			// 制造数据
			uni.setStorageSync(T_SKU_ITEM_DTO_LIST, [ {
				ifWork: item.ifWork,
				shopId: item.shopId,
				shopName: item.shopName,
				shopDiscountId: item.shopDiscountId,
				shopSeckillId: item.shopSeckillId,
				skus: item.skus
			} ])
			this.go('/another-tf/another-serve/orderConfirm/index?type=1')
		},
		// 获取商品详情
		async queryProductDetail(skuItem) {
			uni.showLoading({
				title: '加载中...',
				mask: true
			})
			const res = await getProductDetailsByIdApi({
				shopId: skuItem.shopId,
				productId: skuItem.productId,
				skuId: skuItem.skuId,
				terminal: 1
			})
			uni.hideLoading()
			return res.data
		},

		goInviteSpll(collageId, orderId, productId, skuId, shopGroupWorkId) {
			uni.navigateTo({
				url: '/another-tf/another-serve/inviteSpell/index?collageId=' + collageId + '&orderId=' + orderId + '&type=1' +
					'&productId=' + productId + '&skuId=' + skuId + '&shopGroupWorkId=' + shopGroupWorkId
			})
		},
		// 商品详情
		goodsItemTap(productId, skuId) {
			uni.navigateTo({
				url: '/another-tf/another-serve/goodsDetails/index?shopId=' + this.dataList.shopId + '&productId=' + productId + '&skuId=' + skuId
			})
		},
		getDataList(orderId) {
			getOrderDetailApi({
				orderId,
				noticeId: this.noticeId
			}).then((res) => {
				const data = res.data
				this.remainingTime = Math.floor(res.data.time / 1000)
				this.dataList = data
				this.dataList.receivePhone = this.dataList.receivePhone.replace(/(\d{3})\d+(\d{4})$/, '$1****$2')
				this.getShippingTrace(this.dataList.express, this.dataList.deliverFormid)
				if (this.dataList.state == 1 || this.dataList.state == 6) { }
			})
		},
		// 物流信息
		getShippingTrace(express, deliverFormid) {
			getOrderDileveryShippingTraceApi({ express, deliverFormid })
				.then((res) => {
					const traces = res.data
					const len = traces.length
					for (let i = 0; i < len; i++) {
						const item = traces[i]
						this.steps.push({
							title: item.reason,
							desc: item.time
						})
					}
					this.steps = this.steps.reverse()
				})
		},
		// 取消订单
		cancelOrder() {
			uni.showModal({
				title: '温馨提示',
				content: '您确定要取消该订单吗？',
				confirmText: '确定取消',
				cancelText: '点错了',
				success: (res) => {
					if (res.confirm) {
						uni.showLoading({
							mask: true,
							title: '取消中...'
						})
						cancelShopOrderApi({
							orderId: this.orderId
						}).then((result) => {
							uni.hideLoading()
							uni.showToast({
								title: '取消成功'
							})
							this.getDataList(this.orderId)
						})
							.catch((e) => {
								uni.hideLoading()
							})
					}
				}
			})
		},
		// 删除订单
		delOrder() {
			uni.showModal({
				title: '温馨提示',
				content: '您确定要删除该订单吗？',
				confirmText: '确定删除',
				cancelText: '点错了',
				success: (res) => {
					if (res.confirm) {
						uni.showLoading({
							mask: true,
							title: '删除中...'
						})
						deleteShopOrderApi({
							orderId: this.orderId
						}).then((result) => {
							uni.hideLoading()
							uni.showToast({
								title: '删除成功'
							})
							setTimeout(() => {
								uni.switchTab({
									url: '/pages/order/order'
								})
							}, 1500)
						})
							.catch((e) => {
								uni.hideLoading()
							})
					}
				}
			})
		},

		// 退款
		applayItemTap(proItem) {
			uni.setStorageSync(T_REFUND_APPLY_ITEM, proItem)
			uni.navigateTo({
				url: '/another-tf/another-serve/afterSaleApplyRefund/index?orderId=' + this.orderId + '&isAllSelect=' + (this.dataList.skus.length > 1) ? '0' : '1' // isAllSelect 是否为拆单售后
			})
		},
		// 去退款详情
		goApplyTap(type) {
			if (type == 1) {
				uni.navigateTo({
					url: `/another-tf/another-serve/refundDetails/index?item=${JSON.stringify(this.dataList)}`
				})
			} else if (type == 2) {
				uni.navigateTo({
					url: `/another-tf/another-serve/returnDetails/index?item=${JSON.stringify(this.dataList)}`
				})
			}
		},

		// 申请退款
		applyMoneyAllTap() {
			let isAllSelect = 1
			if (this.dataList.skus.some((item) => item.afterState)) isAllSelect = 0
			if (this.orderRefundList.length === 0) return this.$showToast('您所有商品已经申请退款，请勿重复申请')
			uni.setStorageSync(T_AFTER_SALE_APPLY_REFUND, this.orderRefundList)
			uni.navigateTo({
				url: `/another-tf/another-serve/afterSaleApplyRefund/index?orderId=${this.orderId}&isAllSelect=${isAllSelect}`
			})
		},
		confirmReceiptTap() {
			uni.showModal({
				title: '温馨提示',
				content: '确定您已经收到货物，否则会造成财产损失',
				confirmText: '确定收到',
				cancelText: '点错了',
				success: (res) => {
					if (res.confirm) {
						uni.showLoading({
							title: '确认中...'
						})
						updateOrderConfirmApi({
							orderId: this.dataList.orderId
						}).then((result) => {
							uni.hideLoading()
							uni.showToast({
								title: '确认成功'
							})
							this.getDataList(this.orderId)
						})
							.catch((e) => {
								uni.hideLoading()
							})
					}
				}
			})
		},
		// 申请售后
		handleApplyTap() {
			if (this.orderRefundList.length === 0) return this.$showToast('您所有商品已经申请退款，请勿重复申请')
			let isAllSelect = 1
			const newArr = JSON.parse(JSON.stringify(this.item))
			newArr.skus.map((item, index) => {
				if (item.afterState) {
					newArr.skus.splice(index, 1)
					isAllSelect = 0
				}
			})
			uni.navigateTo({
				url: '/another-tf/another-serve/afterSaleApply/index?item=' + JSON.stringify(newArr) + '&isAllSelect=' + isAllSelect
			})
		},

		async handleShopGoPay() {
			await handleDoPay({
				collageId: this.dataList.collageId,
				money: this.dataList.orderPrice,
				orderId: this.dataList.orderId,
				type: 2,
				...this.payInfo
			}, 1)
		},

		async handleFlyToService() { // dataList.shopId
			let corpId = null
			let serviceURL = null
			uni.showLoading({
				title: '加载中...'
			})
			try {
				const res = await getCustomerServiceAppletKfApi({ id: this.dataList.shopId })
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
.order-details-container {
	min-height: 100vh;
	background: #f7f7f7;

	.content {
		padding: 0 0 160upx 0;

		.order-details-status {
			width: 750upx;
			height: 250upx;
			background: #333333;

			.status-title-box {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				padding: 40upx 30upx 0;
				box-sizing: border-box;
				text-align: center;

				.l {
					display: flex;
					flex-direction: column;
				}
			}

			.status-title-box2 {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 40upx 30upx 0;
				box-sizing: border-box;
			}

			.status {
				font-size: 30upx;
				color: #fff;
			}

			.label {
				font-size: 24upx;
				color: #fff;
				margin-top: 14upx;
			}

		}

		.order-details-info-box {
			padding: 0 30upx;
			box-sizing: border-box;
			margin-top: -80upx;

			.address-box {
				margin-top: 20upx;
				background: #fff;
				width: 100%;
				padding: 30upx;
				box-sizing: border-box;
				display: flex;
				flex-direction: row;
				align-items: center;

				.address-r {
					flex: 1;
					display: flex;
					flex-direction: column;
					font-size: 28upx;
					color: #333;

					.address-name-box {
						font-size: 30upx;
						color: #333;

						.phone {
							font-size: 24upx;
							color: #999;
							margin-left: 20upx;
						}
					}

					.address-info {
						font-size: 28upx;
						color: #333;
						margin-top: 15upx;
					}
				}
			}

			.order-list-box {
				margin-top: 20upx;

				.item {
					margin-bottom: 20upx;
					background: #fff;

					.order-list-top {
						height: 96upx;
						padding: 0 30upx;
						box-sizing: border-box;
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: space-between;
						border-bottom: 1px solid #eee;

						.top-l {
							display: flex;
							flex-direction: row;
							align-items: center;

							.shop-name {
								font-size: 30upx;
								color: #333;
								font-weight: bold;
							}
						}

						.toService {
							line-height: 40rpx;
							padding: 0 8rpx;
							border: 1rpx solid #FAF6ED;
							cursor: pointer;
							display: flex;
							align-items: center;

							text {
								line-height: 40rpx;
							}
						}
					}

					.order-info-box {
						padding: 0 30upx;
						box-sizing: border-box;

						.order-info {
							border-bottom: 1px solid #eee;

							.order-info-item {
								display: flex;
								flex-direction: row;
								padding: 20upx 0;

								.product-img {
									width: 180upx;
									height: 180upx;
									border-radius: 10upx;
									margin-right: 30upx;
								}

								.info-box {
									flex: 1;
									display: flex;
									flex-direction: column;
									justify-content: space-between;

									.product-name {
										font-size: 26upx;
										color: #333;
										height: 68upx;
										line-height: 34upx;
										display: -webkit-box;
										overflow: hidden;
										text-overflow: ellipsis;
										word-break: break-all;
										-webkit-box-orient: vertical;
										-webkit-line-clamp: 2;
									}

									.price-sku-box {
										width: 100%;
										display: flex;
										flex-direction: row;
										align-items: center;
										justify-content: space-between;

										.product-sku {
											font-size: 24upx;
											color: #999;
											display: inline-block;
											margin-left: -20upx;
											display: flex;
											flex-direction: row;
										}

										.product-num {
											font-size: 28upx;
											color: #999;
											display: inline-block;
										}

										.price-box {
											display: flex;
											flex-direction: column;

											.product-price1 {
												font-size: 24upx;
												color: #333;
												font-weight: 400;
											}

											.product-price2 {
												font-size: 24upx;
												color: #999;
												text-decoration: line-through;
												font-weight: 400;
											}

											.fuhao {
												font-size: 28upx;
											}
										}

										.item-applay-btn {
											height: 50upx;
											display: flex;
											flex-direction: row;
											align-items: center;
											justify-content: center;
											padding: 0 30upx;
											background: rgba(255, 255, 255, 1);
											border: 1px solid rgba(187, 187, 187, 1);
											border-radius: 25upx;
											font-size: 24upx;
											font-weight: 400;
											color: rgba(51, 51, 51, 1);
										}

										.evaluate {
											height: 56upx;
											border-radius: 28upx;
											text-align: center;
											line-height: 56upx;
											font-size: 26upx;
											padding: 0 30upx;
											border: 1px solid #C5AA7B;
											color: #C5AA7B;
										}

										.evaluate2 {
											height: 56upx;
											border-radius: 28upx;
											text-align: center;
											line-height: 56upx;
											font-size: 26upx;
											padding: 0 30upx;
											border: 1px solid #BBBBBB;
											color: #333;
										}

									}
								}
							}

							.delivery-way-box {
								display: flex;
								flex-direction: column;
								margin: 30upx 0 10upx;

								.item {
									display: flex;
									flex-direction: row;
									align-items: center;
									justify-content: space-between;
									font-size: 26upx;
									color: #333;

									.way {
										color: #999;
									}
								}

							}

						}

						.order-total-box {
							padding: 30upx 0;
							display: flex;
							flex-direction: row;
							align-items: center;
							justify-content: space-between;
							font-size: 26upx;
							color: #333;

							.way-color {
								color: #333333;
								font-size: 32rpx;
							}
						}

					}
				}

			}

		}

		.order-details-information {
			background: #fff;

			&.padd {
				padding: 30upx;
				box-sizing: border-box;
			}

			&.mt20 {
				margin-top: 20upx;
			}

			.order-title {
				font-size: 30upx;
				color: #333;
				font-weight: 500;
				display: flex;
				flex-direction: row;
				align-items: center;
			}

			.info-box {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-top: 30upx;

				.item {
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;
					font-size: 24upx;
					color: #666;
					margin-bottom: 20upx;

					.copy-color {
						font-size: 24upx;
						color: #C5AA7B;
					}
				}
			}

			.order-title-box {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;

				.order-title {
					&.padd-l {
						padding-left: 30upx;
					}
				}
			}
		}

		.logistics {
			padding: 20upx 20upx;
		}

		.emptyOrder-box {
			padding: 70upx 0;

			.emptyOrder-img {
				width: 200upx;
				height: 200upx;
			}
		}

	}

	.order-details-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		min-height: 160upx;
		background: #fff;
		box-shadow: 0px 0px 10px 0px rgba(51, 51, 51, 0.1);
		box-sizing: border-box;
		display: flex;
		padding: 0 30upx;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		z-index: 10;

		.btn {
			width: 100%;
			height: 100upx;
			background: #333333;
			font-size: 28upx;
			color: #FFEBC4;
			text-align: center;
			line-height: 100upx;
			font-weight: 500upx;
		}

		.btn-l {
			width: 50%;
			height: 100upx;
			border: 2rpx solid #333333;
			font-size: 28upx;
			color: #333;
			text-align: center;
			line-height: 100upx;
			box-sizing: border-box;
			margin-right: 10rpx;
		}

		.btn-r {
			width: 50%;
			margin-left: 10rpx;
		}
	}
}
</style>
