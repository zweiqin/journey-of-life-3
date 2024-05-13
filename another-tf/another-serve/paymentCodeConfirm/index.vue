<template>
	<view class="payment-code-confirm-container">
		<view style="position: absolute;top:0;left: 0;">{{ viewUpdate }}</view>
		<BeeBack>
			<view style="display: flex;align-items: center;justify-content: space-between;padding: 26rpx 20rpx 10rpx;background-color: #f5f5f5;">
				<BeeIcon name="home-fill" :size="26" color="#222229" style="width: fit-content;">
				</BeeIcon>
				<text style="flex: 1;margin-left: -40upx;text-align: center;">付款页面</text>
			</view>
		</BeeBack>
		<view style="padding: 0 30rpx 218rpx;">
			<ATFOrderAddressSelect v-if="!userAddressInfo.receiveId" :data="userAddressInfo" margin="20rpx 0 0"></ATFOrderAddressSelect>

			<view style="margin-top: 20rpx;">
				<ATFShopSkus v-for="(item, sIndex) in settlement.shops" :key="item.shopId" :shop-data="item" is-show-shop-detail>
					<template #operateBody="obj">
						<view style="padding-top: 20rpx;">
							<view style="color: #222229;">输入金额（元）</view>
							<view style="border-bottom: 2upx solid #bebebe;">
								<tui-input
									type="number" label="￥" :label-size="48"
									label-color="#000000"
									:label-width="80" placeholder="输入金额" :border-bottom="false" padding="18rpx 2rpx 10rpx"
									placeholder-style="color: #979797;font-size: 30rpx;" @input="handlePriceInput($event, sIndex)"
								>
								</tui-input>
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
				:text="otherInfo.remark" placeholder="添加备注" margin="0"
				@confirm="(e) => otherInfo.remark = e.remark"
			>
			</ATFMessageFill>

			<ATFPlatformCoupon
				:show="isShowPlatformCoupon" margin="20rpx 0 0" :settlement="settlement"
				:selected-platform-coupon="selectedPlatformCoupon" :selected-shop-coupon-list="selectedShopCouponList"
				@click="handleShowPlatformCoupon" @close="isShowPlatformCoupon = false"
				@select="handlePlatformCouponItemSelect"
			>
			</ATFPlatformCoupon>
			<view style="padding: 0 20rpx;background-color: #ffffff;">
				<view style="display: flex;align-items: center;justify-content: space-between;padding: 18rpx 0;border-top: 2rpx solid #D8D8D8;">
					<text style="font-size: 30rpx;color: #999999;">
						共{{ settlement.shops.reduce((total, value, index, arr) => total + value.number, 0) }}件
					</text>
					<view>
						<text style="color: #333333;">合计：</text>
						<text style="color: #ff7911;font-weight: bold;">
							<text v-if="totalPrice">￥{{ totalPrice.toFixed(2) }}</text>
							<text v-else>￥0.00</text>
						</text>
					</view>
				</view>
			</view>

			<ATFOrderIntegral
				margin="20rpx 0 0" :integral-num="integralNum" :integral-ratio="integralRatio"
				:select-integral="selectIntegral" @change="changeIntegral"
			></ATFOrderIntegral>

			<VoucherUse
				v-if="settlement.userVoucherDeductLimit && settlement.voucherTotalAll" ref="refVoucherUse"
				:voucher-list="settlement.voucherList" :voucher-num="settlement.userVoucherDeductLimit"
				@choose="handleChooseVoucher({ settlement, e: $event, selectedPlatformCoupon, selectedShopCouponList, selectIntegral, voucherObj })"
			>
			</VoucherUse>

			<view style="margin-top: 20rpx;">
				<CashierList
					show :price-pay="totalPrice"
					:show-commission-pay="settlement.shops.every((a) => a.skus.every((b) => !b.platformCurrencyId)) && !!totalPrice"
					:show-platform-pay="settlement.shops.every((a) => a.skus.every((b) => !b.platformCurrencyId)) && !!totalPrice"
					:show-transaction-pay="settlement.shops.every((a) => a.skus.every((b) => !b.platformCurrencyId)) && !!totalPrice"
					:show-hui-shi-bao-pay="settlement.shops.every((a) => a.skus.every((b) => !b.platformCurrencyId)) && !!totalPrice"
					:shop-id-pay="settlement.shops.every((a) => a.skus.every((b) => !b.platformCurrencyId)) && totalPrice ? settlement.shops.length === 1 ? settlement.shops[0].shopId : 0 : 0"
					@change="(e) => payInfo = e"
				/>
			</view>
		</view>
		<view
			style="width: 100%;position: fixed;bottom: 0;left: 0;background: #ffffff;padding: 30rpx;box-sizing: border-box;"
		>
			<tui-button
				type="warning" width="auto" height="86rpx" margin="10rpx 16rpx 0"
				:size="28"
				:disabled="settlement.shops.some(i => i.receiveNotMatch)"
				@click="resolveSubmitOrder({ settlement, userAddressInfo, skuItemMsgList, skuItemInfo, selectedPlatformCoupon, selectIntegral, integralRatio, totalPrice, voucherObj, otherInfo, payInfo })"
			>
				付款
			</tui-button>
		</view>
	</view>
</template>

<script>
import { resolveGoodsDetailSkuSituation, resolveGoodsDetailTagsSituation, resolveGetOrderSettlement, resolveIntegralSelect, resolveCalcOrderTotal, resolveVoucherSelect, resolveSubmitOrder } from '../../../utils'
import { getProductDetailsByIdApi, getQueryDictByNameApi } from '../../../api/anotherTFInterface'
import { T_SKU_ITEM_MSG_LIST, T_SKU_ITEM_INFO, T_PAY_ORDER } from '../../../constant'

export default {
	name: 'PaymentCodeConfirm',
	data() {
		return {
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
			settlement: {
				voucherList: [],
				shops: []
			},
			fromType: 0,
			brandId: 0,
			skuItemMsgList: [],
			totalPrice: 0, // 合计
			userAddressInfo: { receiveId: '' },
			payInfo: {}, // 支付相关
			// 拼团相关
			skuItemInfo: {},
			// 店铺优惠券相关
			isShowShopCoupons: false,
			shopCouponsList: [],
			selectedShopCouponList: [], // 已选择店铺优惠券
			// 代金券相关
			voucherObj: {
				voucherTotalAll: 0,
				isVoucher: false,
				voucherId: 0
			},
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
				remark: ''
			}
		}
	},
	async onLoad(options) {
		this.fromType = options.type
		this.brandId = options.brandId || ''
		uni.showLoading()
		try {
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
		} finally {
			uni.hideLoading()
		}
	},
	onShow() {
		this.handleOnShowBefore(this.isGetDetail)
	},
	methods: {
		handleOnShowBefore(isGetDetail) {
			if (isGetDetail) {
				if (uni.getStorageSync(T_PAY_ORDER)) {
					uni.switchTab({
						url: '/pages/order/order'
					})
				} else if (typeof this.integralRatio === 'number') {
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
		handlePriceInput(value, shopIndex) {
			for (let i = 0; i < this.settlement.shops.length; i++) {
				for (let cIndex = 0; cIndex < this.settlement.shops[i].shopCoupons.length; cIndex++) {
					this.settlement.shops[i].shopCoupons[cIndex].checked = false
				}
				this.settlement.shops[i].currentCoupon = {}
				this.settlement.shops[i].totalAfterDiscount = value || 0
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
			this.voucherObj = {
				voucherTotalAll: 0,
				isVoucher: false,
				voucherId: 0
			}
			this.getOrderTotal({ settlement: this.settlement, selectedPlatformCoupon: this.selectedPlatformCoupon, integralRatio: this.integralRatio, selectIntegral: this.selectIntegral, voucherObj: this.voucherObj })
		},

		resolveSubmitOrder,
		async handleOnShow() {
			if (uni.getStorageSync(T_SKU_ITEM_MSG_LIST) || uni.getStorageSync(T_SKU_ITEM_INFO)) {
				let orderSettlementObj
				if (uni.getStorageSync(T_SKU_ITEM_MSG_LIST)) { // 1立即购买，2购物车结算
					this.skuItemMsgList = uni.getStorageSync(T_SKU_ITEM_MSG_LIST)
					orderSettlementObj = await resolveGetOrderSettlement({
						isGroup: false,
						fromType: this.fromType,
						brandId: this.brandId,
						skuItemInfo: this.skuItemInfo,
						skuItemMsgList: this.skuItemMsgList,
						isShowShopCoupons: this.isShowShopCoupons,
						selectedShopCouponList: this.selectedShopCouponList,
						selectedPlatformCoupon: this.selectedPlatformCoupon,
						voucherObj: this.voucherObj
					})
				} else if (uni.getStorageSync(T_SKU_ITEM_INFO)) { // 3拼团商品立即购买
					this.skuItemInfo = uni.getStorageSync(T_SKU_ITEM_INFO)
					orderSettlementObj = await resolveGetOrderSettlement({
						isGroup: true,
						fromType: this.fromType,
						brandId: this.brandId,
						skuItemInfo: this.skuItemInfo,
						skuItemMsgList: this.skuItemMsgList,
						isShowShopCoupons: this.isShowShopCoupons,
						selectedShopCouponList: this.selectedShopCouponList,
						selectedPlatformCoupon: this.selectedPlatformCoupon,
						voucherObj: this.voucherObj
					})
				}
				this.settlement = orderSettlementObj.settlement
				this.userAddressInfo = orderSettlementObj.userAddressInfo
				this.isShowShopCoupons = orderSettlementObj.isShowShopCoupons
				this.selectedShopCouponList = orderSettlementObj.selectedShopCouponList
				if (orderSettlementObj.isSuccess) this.getOrderTotal({ settlement: this.settlement, selectedPlatformCoupon: this.selectedPlatformCoupon, integralRatio: this.integralRatio, selectIntegral: this.selectIntegral, voucherObj: this.voucherObj })
				console.log(this.settlement)
			}
		},
		// 积分价格计算
		changeIntegral() {
			const IntegralSelectObj = resolveIntegralSelect({
				vm: this,
				selectIntegral: this.selectIntegral,
				totalPrice: this.totalPrice,
				integralNum: this.integralNum,
				integralRatio: this.integralRatio,
				voucherObj: this.voucherObj
			})
			this.selectIntegral = IntegralSelectObj.selectIntegral
			this.totalPrice = IntegralSelectObj.totalPrice
		},

		// 展示平台端优惠券
		handleShowPlatformCoupon() {
			if (this.voucherObj.voucherId) return this.$showToast('已选择代金券，无法使用其它优惠')
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
			if (platformCouponItemSelectObj.isSuccess) this.getOrderTotal({ settlement: this.settlement, selectedPlatformCoupon: this.selectedPlatformCoupon, integralRatio: this.integralRatio, selectIntegral: this.selectIntegral, voucherObj: this.voucherObj })
		},
		// 显示店铺优惠券
		handleShowShopCoupons(item, sIndex) {
			if (this.voucherObj.voucherId) return this.$showToast('已选择代金券，无法使用其它优惠')
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
			if (shopCouponItemSelectObj.isSuccess) this.getOrderTotal({ settlement: this.settlement, selectedPlatformCoupon: this.selectedPlatformCoupon, integralRatio: this.integralRatio, selectIntegral: this.selectIntegral, voucherObj: this.voucherObj })
		},

		// 选择代金券
		handleChooseVoucher(obj) {
			const voucherSelectObj = resolveVoucherSelect({
				settlement: obj.settlement,
				voucherId: obj.e.id,
				selectedPlatformCoupon: obj.selectedPlatformCoupon,
				selectedShopCouponList: obj.selectedShopCouponList,
				selectIntegral: obj.selectIntegral,
				voucherObj: obj.voucherObj
			})
			this.settlement = voucherSelectObj.settlement
			this.selectedShopCouponList = voucherSelectObj.selectedShopCouponList
			this.selectedPlatformCoupon = voucherSelectObj.selectedPlatformCoupon
			this.selectIntegral = voucherSelectObj.selectIntegral
			this.voucherObj = voucherSelectObj.voucherObj
			if (voucherSelectObj.isSuccess) this.getOrderTotal({ settlement: this.settlement, selectedPlatformCoupon: this.selectedPlatformCoupon, integralRatio: this.integralRatio, selectIntegral: this.selectIntegral, voucherObj: this.voucherObj })
			if (voucherSelectObj.isFail) this.$refs.refVoucherUse.handleReset()
		},

		getOrderTotal(obj) {
			const orderTotalObj = resolveCalcOrderTotal({
				settlement: obj.settlement,
				selectedPlatformCoupon: obj.selectedPlatformCoupon,
				integralRatio: obj.integralRatio,
				selectIntegral: obj.selectIntegral,
				voucherObj: obj.voucherObj
			})
			this.integralNum = orderTotalObj.integralNum
			this.selectIntegral = orderTotalObj.selectIntegral
			this.totalPrice = orderTotalObj.totalPrice
		}
	}
}
</script>

<style lang="less" scoped>
.payment-code-confirm-container {
	min-height: 100vh;
	background-color: #f0f0f0;
	box-sizing: border-box;
}
</style>
