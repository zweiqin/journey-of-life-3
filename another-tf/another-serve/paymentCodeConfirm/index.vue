<template>
	<view class="payment-code-confirm-container">
		<view style="position: absolute;top:0;left: 0;">{{ viewUpdate }}</view>
		<BeeBack>
			<view
				style="display: flex;align-items: center;justify-content: space-between;padding: 26rpx 20rpx 10rpx;background-color: #f5f5f5;"
			>
				<BeeIcon name="home-fill" :size="26" color="#222229" style="width: fit-content;">
				</BeeIcon>
				<text style="flex: 1;margin-left: -40rpx;text-align: center;">付款页面</text>
			</view>
		</BeeBack>
		<view style="padding: 0 30rpx 218rpx;">
			<ATFOrderAddressSelect
				v-if="!otherInfo.orderId && settlement.shops && settlement.shops.length && !userAddressInfo.receiveId && (settlement.shopType !== 2)"
				:data="userAddressInfo" padding="20rpx 0 0"
			></ATFOrderAddressSelect>

			<view style="padding-top: 20rpx;">
				<ATFShopSkus
					v-for="(item, sIndex) in settlement.shops" :key="item.shopId" :shop-data="item"
					detail-radius="20rpx 20rpx 0 0" is-show-shop-detail
					@get-detail="(e) => (brandDetailValue = { ...brandDetailValue, [item.shopId]: e })"
				>
					<template #operateBody="obj">
						<view style="padding-top: 20rpx;">
							<view v-if="otherInfo.orderId">
								<view style="color: #222229;font-weight: bold;">固定付款（元）</view>
								<view>
									<tui-input
										v-model="priceInputValue[obj.shopItem.shopId]" padding="18rpx 2rpx 10rpx" label="￥"
										:label-size="42" label-color="#000000" :label-width="40" placeholder="固定金额"
										:border-bottom="false"
										type="text" disabled
									>
									</tui-input>
								</view>
							</view>
							<view v-else>
								<view style="color: #222229;font-weight: bold;">输入金额（元）</view>
								<!-- disabled @click，type="number" @input="handlePriceInput()" -->
								<view style="border-bottom: 2rpx solid #D8D8D8;">
									<tui-input
										v-model="priceInputValue[obj.shopItem.shopId]" padding="18rpx 2rpx 10rpx" label="￥"
										:label-size="52" label-color="#000000" :label-width="60" placeholder="输入金额"
										:border-bottom="false"
										placeholder-style="color: #979797;font-size: 30rpx;" type="text" disabled
										@click="(isShowDigitalKeyboard = true) && (shopPriceIndex = sIndex)"
									>
									</tui-input>
								</view>
							</view>
						</view>
						<ATFShopCoupons
							v-if="obj.shopItem.shopCoupons.length" :show="isShowShopCoupons" margin="20rpx 0 0"
							:settlement="settlement" :s-index="sIndex" :shop-index="shopIndex" :shop-coupons-list="shopCouponsList"
							:selected-shop-coupon-list="selectedShopCouponList" :selected-platform-coupon="selectedPlatformCoupon"
							@click="handleShowShopCoupons(obj.shopItem, sIndex)" @close="isShowShopCoupons = false"
							@select="handleShopCouponItemSelect"
						></ATFShopCoupons>
					</template>
				</ATFShopSkus>
			</view>
			<ATFMessageFill
				:text="otherInfo.remark" placeholder="添加备注" margin="0" radius="0 0 24rpx 24rpx"
				@confirm="(e) => otherInfo.remark = e.remark"
			>
			</ATFMessageFill>

			<ATFPlatformCoupon
				:show="isShowPlatformCoupon" margin="20rpx 0 0" padding-in="28rpx 20rpx 10rpx"
				radius="24rpx 24rpx 0 0" :settlement="settlement" :selected-platform-coupon="selectedPlatformCoupon"
				:selected-shop-coupon-list="selectedShopCouponList" @click="handleShowPlatformCoupon"
				@close="isShowPlatformCoupon = false" @select="handlePlatformCouponItemSelect"
			>
			</ATFPlatformCoupon>
			<view style="padding: 0 20rpx 18rpx;background-color: #ffffff;border-radius: 0 0 24rpx 24rpx;">
				<view
					style="display: flex;align-items: center;justify-content: space-between;padding: 18rpx 0 0;font-weight: bold;border-top: 2rpx solid #D8D8D8;"
				>
					<text style="color: #333333;">总计：</text>
					<text style="color: #ff7911;">
						<text v-if="totalPrice">￥{{ totalPrice.toFixed(2) }}</text>
						<text v-else>￥0.00</text>
					</text>
				</view>
				<view v-if="payInfo.paymentMode === 11" style="display: flex;justify-content: flex-end;">
					<view
						style="width: fit-content;margin: 18rpx 0 0;padding: 4rpx 12rpx;font-size: 26rpx;color: #ffffff;background-color: #ef530e;border-radius: 14rpx;"
					>
						代金券支付可抵扣￥{{ settlement.voucherTotalAll }}
					</view>
				</view>
				<view
					v-if="Object.values(priceInputValue).some(i => Number(i) > 0) && Object.values(brandDetailValue).some(i => Number(i.voucherReturn) > 0)"
					style="display: flex;justify-content: flex-end;"
				>
					<view
						style="width: fit-content;margin: 18rpx 0 0;padding: 4rpx 12rpx;font-size: 26rpx;color: #ed5c1b;background-color: #d8d8d8;border-radius: 14rpx;"
					>
						赠送{{ Number.parseFloat(Object.keys(priceInputValue).reduce((total, value, index, arr) => total +
							(Number(priceInputValue[value]) * ((brandDetailValue[value] && brandDetailValue[value].voucherReturn / 100) ||
								0)), 0)).toFixed(2) * 1 }}代金券
					</view>
				</view>
			</view>

			<ATFOrderIntegral
				margin="20rpx 0 0" :integral-num="integralNum" :integral-ratio="integralRatio"
				:select-integral="selectIntegral" @change="changeIntegral"
			></ATFOrderIntegral>

			<ATFCommunityAssociation
				padding="20rpx 0 0" :community-address-info="userAddressInfo"
				:shop-data="{ shopType: settlement.shopType, orderShops: settlement.shops.map(i => i.shopId) }"
				@change="(e) => otherInfo = { ...otherInfo, ...e }"
			></ATFCommunityAssociation>

			<view style="margin-top: 20rpx;">
				<CashierList
					v-if="settlement.shops.length" ref="refCashierList"
					padding="8rpx 26rpx 6rpx" radius="24rpx" show :price-pay="totalPrice"
					:unnecessary-prices="[ '9' ]" missing-price-text="请输入金额"
					:pay-type-shops="settlement.shops.length ? settlement.shops.map(i => i.shopId) : false"
					:hui-shi-bao-pay="settlement.shops.every((a) => a.skus.every((b) => !b.platformCurrencyId)) && (settlement.shops.length === 1) ? [ settlement.shops[0].shopId ] : false"
					show-tonglian-pay
					:voucher-list="settlement.voucherList"
					:voucher-pay="{ voucherTotalAll: settlement.shops.some((a) => a.skus.some((b) => b.procureCounterType === 1)) ? 0 : settlement.voucherTotalAll, userVoucherDeductLimit: settlement.userVoucherDeductLimit, isCanVoucher: voucherObj.isCanVoucher, noVoucherText: voucherObj.noVoucherText }"
					:voucher-shop-pay="{ voucherTotalAll: settlement.shops.some((a) => a.skus.some((b) => b.procureCounterType !== 1)) ? 0 : settlement.voucherTotalAll, shopVoucherDeductLimit: settlement.shopVoucherDeductLimit, isCanVoucher: voucherShopObj.isCanVoucher, noVoucherText: voucherShopObj.noVoucherText }"
					:show-commission-pay="settlement.shops.every((a) => a.skus.every((b) => !b.platformCurrencyId))"
					:show-platform-pay="settlement.shops.every((a) => a.skus.every((b) => !b.platformCurrencyId))"
					:show-transaction-pay="settlement.shops.every((a) => a.skus.every((b) => !b.platformCurrencyId))"
					:shop-id-pay="settlement.shops.every((a) => a.skus.every((b) => !b.platformCurrencyId)) ? settlement.shops.length === 1 ? settlement.shops[0].shopId : 0 : 0"
					:is-password-fail="isPasswordFail" @change="handlePaymentSelect"
					@password-input="(e) => (payInfo.pwd = e.pwd) && handlePaymentPassword()"
				>
					<template #header="obj">
						<view v-if="obj.paymentList && (obj.paymentList.length > 1)" style="padding-top: 20rpx;">
							<view style="padding: 0 0 8rpx;font-size: 30rpx;font-weight: bold;">请选择支付方式：</view>
						</view>
					</template>
				</CashierList>
			</view>
		</view>
		<view
			class="operation-btn"
			style="width: 100%;position: fixed;bottom: 0;left: 0;background: #f0f0f0;padding: 30rpx;box-sizing: border-box;"
		>
			<tui-button
				type="warning" width="auto" height="86rpx" margin="10rpx 16rpx 0"
				:size="28"
				:disabled="settlement.shops.some(i => i.receiveNotMatch)"
				@click="handlePaymentPassword"
			>
				付款
			</tui-button>
		</view>
		<view>
			<view
				v-if="isShowDigitalKeyboard"
				style="position: absolute;top: 0;bottom: 0;z-index: 2;width: 100vw;height: 100vh;background: linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(255, 255, 255, 0.01) 15%, rgba(255, 255, 255, 0.01) 25%, rgba(0, 0, 0, 0.6) 100%);"
				@click="handleConfirmKeyboard"
			>
			</view>
			<tui-digital-keyboard
				:show="isShowDigitalKeyboard" button-background="#07c160" @confirm="handleConfirmKeyboard"
				@click="(e) => priceInputValue[settlement.shops[shopPriceIndex].shopId] = `${priceInputValue[settlement.shops[shopPriceIndex].shopId]}${e.value}`"
				@backspace="priceInputValue[settlement.shops[shopPriceIndex].shopId] = String(priceInputValue[settlement.shops[shopPriceIndex].shopId]).substring(0, String(priceInputValue[settlement.shops[shopPriceIndex].shopId]).length - 1)"
			></tui-digital-keyboard>
		</view>
	</view>
</template>

<script>
import { resolveGoodsDetailSkuSituation, resolveGoodsDetailTagsSituation, resolveGetOrderSettlement, resolveIntegralSelect, resolveCalcOrderTotal, resolveVoucherData, resolveVoucherPaySelect, resolveSubmitOrder } from '../../../utils'
import { getShopIdCodeRelationshipCodeApi, bindPlatformRelationshipCodeApi, getShopIsNotDeactivateApi, getOrderDetailApi, getProductDetailsByIdApi, getQueryDictByNameApi } from '../../../api/anotherTFInterface'
import { T_SKU_ITEM_MSG_LIST, T_SKU_ITEM_INFO, T_PAY_ORDER } from '../../../constant'
import { handleOrderTypeJump, paymentTypeEnum, handleDoPay } from '../../../utils/payUtil'

export default {
	name: 'PaymentCodeConfirm',
	data() {
		return {
			// 店铺详情相关
			brandDetailValue: [], // [{ voucherReturn: 0 }]
			// 商品详情相关
			viewUpdate: '',
			goodsDetail: {
				names: []
			},
			selectedSku: {
				image: '',
				price: '',
				originalPrice: '',
				stockNumber: 0
			},
			number: 1,
			selectedAttr: {},
			isGetDetail: false,
			// 订单相关
			isShowDigitalKeyboard: false,
			shopPriceIndex: 0,
			priceInputValue: {},
			settlement: {
				shopType: '',
				userVoucherDeductLimit: 0,
				shopVoucherDeductLimit: 0,
				voucherTotalAll: 0,
				voucherList: [],
				coupons: [],
				shops: []
			},
			fromType: 0,
			brandId: 0,
			skuItemMsgList: [],
			totalPrice: 0, // 合计
			userAddressInfo: { receiveId: '' },
			payInfo: { paymentMode: '', huabeiPeriod: -1, pwd: '' }, // 支付相关
			isPasswordFail: false,
			submitResult: {},
			// 拼团相关
			skuItemInfo: {},
			// 店铺优惠券相关
			isShowShopCoupons: false,
			shopCouponsList: [],
			selectedShopCouponList: [], // 已选择店铺优惠券
			// 代金券相关
			voucherObj: { isCanVoucher: false, noVoucherText: '无法使用代金券支付' },
			voucherShopObj: { isCanVoucher: false, noVoucherText: '无法使用商家代金券支付' },
			// 平台优惠券相关
			isShowPlatformCoupon: false,
			shopIndex: 0, // 选中的店铺使用店铺优惠券
			selectedPlatformCoupon: { couponId: '' }, // { couponId: 0, ifAdd: 1, reduceMoney: 0, couponType, useMoney }
			// 积分相关
			selectIntegral: true,
			integralNum: 0,
			integralRatio: '', // 积分兑换比例。总积分可减多少元=integralNum*integralRatio
			// 其它信息
			otherInfo: {
				remark: '',
				// 是否可以结算
				isCanPay: false,
				// 核销情况
				orderId: '',
				collageId: '',
				// 加盟商和社区店分佣情况
				benefitinFranchiseesPhone: '',
				communityPhone: '',
				commissionSharingRatio: []
			}
		}
	},
	async onLoad(options) {
		const pages = getCurrentPages()
		if (pages.length > 1) uni.removeStorageSync(T_PAY_ORDER)
		if (options.orderId) {
			this.otherInfo.orderId = Number(options.orderId) || ''
			this.otherInfo.collageId = Number(options.collageId) || ''
			getOrderDetailApi({
				orderId: this.otherInfo.orderId,
				noticeId: 0
			}).then(({ data }) => {
				if ([ 8 ].includes(data.state)) {
					this.otherInfo.isCanPay = true
					this.settlement = {
						'receive': { 'receiveId': '0' },
						'shops': [ {
							'shopId': data.shopId,
							'skus': data.skus.map((item) => ({
								'shopId': item.shopId,
								'productId': item.productId,
								'skuId': item.skuId,
								'productName': item.productName,
								'values': item.values,
								'image': item.image,
								'number': item.number,
								'price': 0,
								'priceId': 0,
								'buyerShopCouponId': 0,
								'buyerCouponId': null
							})), // 结算组装 ifLogistics: 0, selected: 1, platformCurrencyId: 0, platformComposeId: 0, platformSeckillId: 0, platformDiscountId: 0, shopSeckillId: 0, shopDiscountId: 0, sceneId: 0, useMember: false, composeId: 0, useCredit: 0, useCreditAmount: 0,
							'distribution': { 'logisticsId': 0, 'distributionName': '全国包邮', 'distributionPrice': 0 },
							'number': 1,
							'total': Number(options.money),
							'shopCoupons': [],
							'priceAfterDiscount': 0,
							'receiveNotMatch': false,
							'voucherTotal': 0,
							'totalAfterDiscount': Number(options.money),
							'currentCoupon': {}
						} ],
						'userTotalCredit': 0,
						'skuCreditMap': {},
						'orderCreditThreshold': 0,
						'creditDeductLimit': 0,
						'userVoucherDeductLimit': 0,
						'voucherList': [],
						'voucherTotalAll': 0,
						'shopType': data.orderType
					}
					const priceInputValue = {}
					this.settlement.shops.forEach((item) => {
						priceInputValue[item.shopId] = item.totalAfterDiscount || ''
					})
					this.priceInputValue = priceInputValue
					this.handlePriceInput()
				} else {
					this.$showToast('该订单无法付款')
				}
			})
		} else {
			this.fromType = options.type || ''
			this.brandId = options.brandId || ''
			getShopIdCodeRelationshipCodeApi({ shopId: Number(options.shopId) })
				.then((result) => {
					bindPlatformRelationshipCodeApi({ code: result.data.invitationCode })
						.then((res) => {
							this.$showToast('绑定成功', 'success')
						})
				})
			uni.showLoading()
			try {
				// const result = await getShopIsNotDeactivateApi({ shopId: options.shopId })
				if (!'result.data') {
					this.$showToast('商家已停用')
				} else {
					this.selectedAttr = {}
					const res = await getProductDetailsByIdApi({
						shopId: Number(options.shopId),
						productId: Number(options.productId),
						skuId: Number(options.skuId),
						terminal: 1
					})
					this.goodsDetail = res.data
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
					this.goodsDetail = await resolveGoodsDetailSkuSituation(this.goodsDetail)
					this.$nextTick(() => {
						if (Number(options.skuId)) {
							this.handleSelectBySkuId(Number(options.skuId))
						} else {
							this.goodsDetail.names.forEach((nameItem) => {
								this.handleClickSkuItem(nameItem.nameCode, nameItem.values[0])
							})
						}
						const list = [ {
							ifWork: 0,
							shopId: this.goodsDetail.shopId,
							shopName: this.goodsDetail.shopName,
							shopDiscountId: this.goodsDetail.shopDiscountId || '',
							shopSeckillId: this.goodsDetail.shopSeckillId || '',
							skus: [ {
								productId: this.goodsDetail.productId,
								skuId: this.selectedSku.skuId,
								productName: this.goodsDetail.productName,
								image: this.selectedSku.image,
								price: this.selectedSku.price,
								weight: 0,
								number: this.number,
								SKU: '',
								total: this.selectedSku.price * this.number,
								ifLogistics: 1
							} ]
						} ]
						uni.setStorageSync(T_SKU_ITEM_MSG_LIST, list)
						this.isGetDetail = true
						this.handleOnShowBefore(this.isGetDetail)
					})
					this.viewUpdate = ' '
				}
			} finally {
				uni.hideLoading()
			}
		}
	},
	onShow() {
		this.handleOnShowBefore(this.isGetDetail)
	},
	methods: {
		handleOnShowBefore(isGetDetail) {
			const pages = getCurrentPages()
			if (uni.getStorageSync(T_PAY_ORDER) && (pages.length === 1)) {
				handleOrderTypeJump({ type: uni.getStorageSync(T_PAY_ORDER).type })
				return
			} else if (uni.getStorageSync(T_PAY_ORDER) && ((this.payInfo.paymentMode === 9) || (this.payInfo.paymentMode === 4))) {
				handleOrderTypeJump({ type: uni.getStorageSync(T_PAY_ORDER).type })
				return
			}
			if (isGetDetail) {
				if (typeof this.integralRatio === 'number') {
					this.handleOnShow()
				} else {
					getQueryDictByNameApi({ name: 'credit_exchange_rate' })
						.then((res) => {
							this.integralRatio = parseFloat(res.data.dictDescribe) || 0
							this.handleOnShow()
						})
				}
			}
		},
		handleSelectBySkuId(skuId) {
			if (!skuId) return
			Object.keys(this.goodsDetail.map).forEach((skuValueCodeItem) => {
				if (this.goodsDetail.map[skuValueCodeItem].skuId === skuId) {
					this.goodsDetail.names.forEach((nameItem) => {
						nameItem.values.some((tag) => {
							if (this.goodsDetail.map[skuValueCodeItem].valueCodes.split(',').includes(tag.valueCode)) {
								this.handleClickSkuItem(nameItem.nameCode, tag)
								return true
							}
							return false
						})
					})
				}
			})
		},
		handleClickSkuItem(nameCode, tagItem) {
			if (tagItem.ifEnable) return
			const { goodsDetail, selectedAttr } = resolveGoodsDetailTagsSituation(this.goodsDetail, this.selectedAttr, nameCode, tagItem)
			this.selectedAttr = selectedAttr
			this.goodsDetail = goodsDetail
			this.selectedSku = Object.values(this.goodsDetail.map).find((skuItem) => skuItem.valueCodes.split(',').every((nameCodeItem) => Object.values(this.selectedAttr).includes(nameCodeItem))) || {}
		},
		handlePriceInput() {
			for (let i = 0; i < this.settlement.shops.length; i++) {
				for (let cIndex = 0; cIndex < this.settlement.shops[i].shopCoupons.length; cIndex++) {
					this.settlement.shops[i].shopCoupons[cIndex].checked = false
				}
				this.settlement.shops[i].currentCoupon = {}
				this.settlement.shops[i].totalAfterDiscount = this.priceInputValue[this.settlement.shops[i].shopId]
			}
			this.selectedShopCouponList = []
			this.settlement.coupons && this.settlement.coupons.forEach((item) => {
				item.checked = false
			})
			this.selectedPlatformCoupon = { couponId: '' }
			this.settlement.shops.forEach((shopItem) => {
				if (shopItem.skus) {
					shopItem.skus.forEach((skuItem) => {
						skuItem.buyerCouponId = null
					})
				}
			})
			this.selectIntegral = false
			const voucherDataObj = resolveVoucherData({ settlement: this.settlement, voucherObj: this.voucherObj, voucherShopObj: this.voucherShopObj })
			this.voucherObj = voucherDataObj.voucherObj
			this.voucherShopObj = voucherDataObj.voucherShopObj
			this.getOrderTotal({ settlement: this.settlement, selectedPlatformCoupon: this.selectedPlatformCoupon, integralRatio: this.integralRatio, selectIntegral: this.selectIntegral })
		},
		handleConfirmKeyboard(value, shopIndex) {
			if (this.priceInputValue[this.settlement.shops[this.shopPriceIndex].shopId] === '0') {
				this.priceInputValue[this.settlement.shops[this.shopPriceIndex].shopId] = 0
			} else {
				this.priceInputValue[this.settlement.shops[this.shopPriceIndex].shopId] = Number(this.priceInputValue[this.settlement.shops[this.shopPriceIndex].shopId]) || ''
			}
			this.isShowDigitalKeyboard = false
			this.handlePriceInput()
		},

		async handleOnShow() {
			if (uni.getStorageSync(T_SKU_ITEM_MSG_LIST) || uni.getStorageSync(T_SKU_ITEM_INFO)) {
				let orderSettlementObj
				if (uni.getStorageSync(T_SKU_ITEM_MSG_LIST)) { // 1立即购买，2购物车结算
					this.skuItemMsgList = uni.getStorageSync(T_SKU_ITEM_MSG_LIST)
					orderSettlementObj = await resolveGetOrderSettlement({
						isProductPay: this.goodsDetail.productPay === 1,
						isGroup: false,
						fromType: this.fromType,
						brandId: this.brandId,
						skuItemInfo: this.skuItemInfo,
						skuItemMsgList: this.skuItemMsgList,
						isShowShopCoupons: this.isShowShopCoupons,
						selectedShopCouponList: this.selectedShopCouponList,
						selectedPlatformCoupon: this.selectedPlatformCoupon
					})
				} else if (uni.getStorageSync(T_SKU_ITEM_INFO)) { // 3拼团商品立即购买
					this.skuItemInfo = uni.getStorageSync(T_SKU_ITEM_INFO)
					orderSettlementObj = await resolveGetOrderSettlement({
						isProductPay: this.goodsDetail.productPay === 1,
						isGroup: true,
						fromType: this.fromType,
						brandId: this.brandId,
						skuItemInfo: this.skuItemInfo,
						skuItemMsgList: this.skuItemMsgList,
						isShowShopCoupons: this.isShowShopCoupons,
						selectedShopCouponList: this.selectedShopCouponList,
						selectedPlatformCoupon: this.selectedPlatformCoupon
					})
				}
				this.otherInfo.isCanPay = true
				this.settlement = orderSettlementObj.settlement
				this.userAddressInfo = orderSettlementObj.userAddressInfo
				this.isShowShopCoupons = orderSettlementObj.isShowShopCoupons
				this.selectedShopCouponList = orderSettlementObj.selectedShopCouponList
				const priceInputValue = {}
				if (orderSettlementObj.isSuccess) {
					this.settlement.shops.forEach((item) => {
						priceInputValue[item.shopId] = this.priceInputValue[item.shopId] || ''
					})
					this.priceInputValue = priceInputValue
					this.handlePriceInput()
				}
				console.log(this.settlement)
			}
		},
		// 积分价格计算
		changeIntegral() {
			const IntegralSelectObj = resolveIntegralSelect({
				vm: this,
				settlement: this.settlement,
				selectIntegral: this.selectIntegral,
				totalPrice: this.totalPrice,
				integralNum: this.integralNum,
				integralRatio: this.integralRatio,
				payInfo: this.payInfo
			})
			this.selectIntegral = IntegralSelectObj.selectIntegral
			this.totalPrice = IntegralSelectObj.totalPrice
		},

		// 展示平台端优惠券
		handleShowPlatformCoupon() {
			if (this.payInfo.paymentMode === 11) return this.$showToast('已选择代金券支付，无法使用其它优惠')
			if (this.settlement.coupons && this.settlement.coupons.length) {
				if (this.selectedShopCouponList.length) this.$showToast('不可叠加已选择的店铺券')
				this.isShowPlatformCoupon = true
			} else {
				this.$showToast('暂无可用优惠券')
			}
		},
		handlePlatformCouponItemSelect(platformCouponItemSelectObj) {
			this.settlement = platformCouponItemSelectObj.settlement
			this.isShowPlatformCoupon = platformCouponItemSelectObj.isShowPlatformCoupon
			this.selectedPlatformCoupon = platformCouponItemSelectObj.selectedPlatformCoupon
			if (platformCouponItemSelectObj.isSuccess) this.getOrderTotal({ settlement: this.settlement, selectedPlatformCoupon: this.selectedPlatformCoupon, integralRatio: this.integralRatio, selectIntegral: this.selectIntegral })
		},
		// 显示店铺优惠券
		handleShowShopCoupons(item, sIndex) {
			if (this.payInfo.paymentMode === 11) return this.$showToast('已选择代金券支付，无法使用其它优惠')
			if (item.shopCoupons.length) {
				this.shopIndex = sIndex
				this.shopCouponsList = item.shopCoupons
				this.isShowShopCoupons = true
			} else {
				this.$showToast('暂无可用优惠券')
			}
		},
		handleShopCouponItemSelect(shopCouponItemSelectObj) {
			this.settlement = shopCouponItemSelectObj.settlement
			this.isShowShopCoupons = shopCouponItemSelectObj.isShowShopCoupons
			this.selectedShopCouponList = shopCouponItemSelectObj.selectedShopCouponList
			if (shopCouponItemSelectObj.isSuccess) this.getOrderTotal({ settlement: this.settlement, selectedPlatformCoupon: this.selectedPlatformCoupon, integralRatio: this.integralRatio, selectIntegral: this.selectIntegral })
		},

		// 选择支付
		handlePaymentSelect(e) {
			// this.payInfo = e // 该方式结合在视图层展示payInfo信息会出现死循环
			this.payInfo.paymentMode = e.paymentMode
			this.payInfo.huabeiPeriod = e.huabeiPeriod
			if ((this.payInfo.paymentMode === 11) || (this.payInfo.paymentMode === 12)) {
				const voucherPaySelectObj = resolveVoucherPaySelect({
					settlement: this.settlement,
					selectedPlatformCoupon: this.selectedPlatformCoupon,
					selectedShopCouponList: this.selectedShopCouponList,
					selectIntegral: this.selectIntegral
				})
				this.settlement = voucherPaySelectObj.settlement
				this.selectedShopCouponList = voucherPaySelectObj.selectedShopCouponList
				this.selectedPlatformCoupon = voucherPaySelectObj.selectedPlatformCoupon
				this.selectIntegral = voucherPaySelectObj.selectIntegral
				this.getOrderTotal({ settlement: this.settlement, selectedPlatformCoupon: this.selectedPlatformCoupon, integralRatio: this.integralRatio, selectIntegral: this.selectIntegral })
			}
		},

		getOrderTotal(obj) {
			const orderTotalObj = resolveCalcOrderTotal({
				settlement: obj.settlement,
				selectedPlatformCoupon: obj.selectedPlatformCoupon,
				integralRatio: obj.integralRatio,
				selectIntegral: obj.selectIntegral
			})
			this.integralNum = orderTotalObj.integralNum
			this.selectIntegral = orderTotalObj.selectIntegral
			this.totalPrice = orderTotalObj.totalPrice
		},

		async handlePaymentPassword() {
			if (this.isPasswordFail && this.payInfo.pwd) {
				if (this.otherInfo.orderId) {
					await handleDoPay({ collageId: this.otherInfo.collageId, money: this.totalPrice, orderId: this.otherInfo.orderId, ...this.payInfo, type: 2 }, this.settlement.shopType, paymentTypeEnum[this.settlement.shopType], {
						passwordFailFn: (submitResult) => {
							this.payInfo.pwd = ''
							this.$refs.refCashierList && (this.$refs.refCashierList.isShowPasswordDialog = true)
						}
					})
				} else {
					await handleDoPay({ ...this.submitResult, ...this.payInfo, type: 1 }, this.settlement.shopType, paymentTypeEnum[this.settlement.shopType], {
						passwordFailFn: (submitResult) => {
							this.payInfo.pwd = ''
							this.$refs.refCashierList && (this.$refs.refCashierList.isShowPasswordDialog = true)
						}
					})
				}
			} else if ((this.payInfo.paymentMode !== 9) && (this.payInfo.paymentMode !== 4) && !this.payInfo.pwd) {
				if (this.isPasswordFail) this.$refs.refCashierList && (this.$refs.refCashierList.isShowPasswordDialog = true)
				else this.$refs.refCashierList && this.$refs.refCashierList.handleInputPaymentPassword()
			} else if (!this.isPasswordFail) {
				if (this.otherInfo.orderId && this.otherInfo.isCanPay) {
					await handleDoPay({ collageId: this.otherInfo.collageId, money: this.totalPrice, orderId: this.otherInfo.orderId, ...this.payInfo, type: 2 }, this.settlement.shopType, paymentTypeEnum[this.settlement.shopType], {
						passwordFailFn: (submitResult) => {
							this.isPasswordFail = true
							this.payInfo.pwd = ''
							this.$refs.refCashierList && (this.$refs.refCashierList.isShowPasswordDialog = true)
						}
					})
				} else {
					resolveSubmitOrder({
						settlement: this.settlement,
						userAddressInfo: this.userAddressInfo,
						skuItemMsgList: this.skuItemMsgList,
						skuItemInfo: this.skuItemInfo,
						selectedPlatformCoupon: this.selectedPlatformCoupon,
						selectIntegral: this.selectIntegral,
						integralRatio: this.integralRatio,
						totalPrice: this.totalPrice,
						otherInfo: this.otherInfo,
						payInfo: this.payInfo,
						hasPrice: true,
						shamPriceText: '请输入金额',
						passwordFailFn: (submitResult) => {
							this.submitResult = submitResult
							this.isPasswordFail = true
							this.payInfo.pwd = ''
							this.$refs.refCashierList && (this.$refs.refCashierList.isShowPasswordDialog = true)
						}
					})
				}
			}
		}
	}
}
</script>

<style lang="less" scoped>
.payment-code-confirm-container {
	position: relative;
	min-height: 100vh;
	background-color: #f0f0f0;
	box-sizing: border-box;

	.operation-btn {
		/deep/ .tui-btn {
			border-radius: 20rpx;
		}

		/deep/ .tui-btn-warning {
			background-color: #ef530e !important;
		}
	}
}
</style>
