<template>
	<!-- 提交订单 -->
	<view class="payment-order-confirm-container">
		<JHeader title="购买宝贝" width="50" height="50"></JHeader>
		<view style="padding: 0 30rpx 218rpx;">
			<view style="text-align: right;">
				<tui-button
					type="danger" plain width="180rpx" height="54rpx"
					style="display: inline-block;" shape="circle"
					@click="handleShare"
				>
					一键分享
				</tui-button>
			</view>
			<!-- v-if="settlement.shopType !== 2" -->
			<ATFOrderAddressSelect
				v-if="settlement.shops.some((a) => a.skus.some((b) => b.exchangeCounterType !== 1)) && (settlement.shopType !== 2)"
				:data="userAddressInfo" padding="20rpx 0 0"
			></ATFOrderAddressSelect>

			<view style="padding-top: 20rpx;">
				<ATFShopSkus v-for="(item, sIndex) in settlement.shops" :key="item.shopId" :shop-data="item" is-show-skus>
					<template #operateBody="obj">
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
				:text="otherInfo.remark" placeholder="添加备注" margin="20rpx 0 0"
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

			<ATFOrderIntegral
				margin="20rpx 0 0" :integral-num="integralNum" :integral-ratio="integralRatio"
				:select-integral="selectIntegral" @change="changeIntegral"
			></ATFOrderIntegral>

			<ATFCommunityAssociation
				v-if="settlement.shops.length && settlement.shops.every((a) => a.skus.every((b) => (b.exchangeCounterType !== 1) && (b.procureCounterType !== 1)))"
				padding="20rpx 0 0" :community-address-info="userAddressInfo"
				:shop-data="{ shopType: settlement.shopType, orderShops: settlement.shops.map(i => i.shopId) }"
				@change="(e) => otherInfo = { ...otherInfo, ...e }"
			></ATFCommunityAssociation>

			<view style="margin-top: 20rpx;">
				<CashierList
					v-if="settlement.shops.length"
					ref="refCashierList" show :price-pay="totalPrice"
					:pay-type-shops="settlement.shops.length ? settlement.shops.map(i => i.shopId) : false"
					:hui-shi-bao-pay="settlement.shops.every((a) => a.skus.every((b) => !b.platformCurrencyId && (b.exchangeCounterType !== 1) && (b.procureCounterType !== 1))) && totalPrice && (settlement.shops.length === 1) ? [ settlement.shops[0].shopId ] : false"
					:show-tonglian-pay="settlement.shops.every((a) => a.skus.every((b) => (b.exchangeCounterType !== 1) && (b.procureCounterType !== 1)))"
					:voucher-list="settlement.voucherList"
					:voucher-pay="{ voucherTotalAll: settlement.shops.some((a) => a.skus.some((b) => b.procureCounterType === 1)) ? 0 : settlement.voucherTotalAll, userVoucherDeductLimit: settlement.userVoucherDeductLimit, isCanVoucher: voucherObj.isCanVoucher, noVoucherText: voucherObj.noVoucherText }"
					:voucher-shop-pay="{ voucherTotalAll: settlement.shops.some((a) => a.skus.some((b) => b.procureCounterType !== 1)) ? 0 : settlement.voucherTotalAll, shopVoucherDeductLimit: settlement.shopVoucherDeductLimit, isCanVoucher: voucherShopObj.isCanVoucher, noVoucherText: voucherShopObj.noVoucherText }"
					:show-commission-pay="settlement.shops.every((a) => a.skus.every((b) => !b.platformCurrencyId && (b.exchangeCounterType !== 1) && (b.procureCounterType !== 1))) && !!totalPrice"
					:show-platform-pay="settlement.shops.every((a) => a.skus.every((b) => !b.platformCurrencyId && (b.exchangeCounterType !== 1) && (b.procureCounterType !== 1))) && !!totalPrice"
					:show-transaction-pay="settlement.shops.every((a) => a.skus.every((b) => !b.platformCurrencyId && (b.exchangeCounterType !== 1) && (b.procureCounterType !== 1))) && !!totalPrice"
					:shop-id-pay="settlement.shops.every((a) => a.skus.every((b) => !b.platformCurrencyId && (b.exchangeCounterType !== 1) && (b.procureCounterType !== 1))) && totalPrice ? settlement.shops.length === 1 ? settlement.shops[0].shopId : 0 : 0"
					:is-password-fail="isPasswordFail" @change="handlePaymentSelect"
					@voucher-select="(e) => otherInfo.voucherId = e.voucherId"
					@password-input="(e) => (payInfo.pwd = e.pwd) && handlePaymentPassword()"
				/>
			</view>
			<view style="margin-top: 20rpx;font-size: 24rpx;color: #999;">
				<view>交易流程：</view>
				<view style="margin-top: 20rpx;">
					<view>1、填写收货信息并完成支付</view>
					<view>2、双方根据物品的交易方式进行交易</view>
					<view>3、拿到物品，交易结束</view>
				</view>
				<!-- 实付款不含邮费，涉及邮寄双方协定好费用，提醒发起人修改价格再完成支付； -->
				<view style="margin-top: 20rpx;">
					注：应国家邮政总局的要求，即日起涉及到个人快递包裹必须收件人实名制，否则将影响到收寄配送。请避免使用「先生，男士，小姐，女士，昵称」等模糊称谓。
				</view>
			</view>
		</view>
		<view
			style="width: 100%;position: fixed;bottom: 0;left: 0;background: #ffffff;padding: 30rpx;box-sizing: border-box;"
		>
			<view style="display: flex;align-items: center;justify-content: space-between;">
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
			<!-- 是否在商家配置范围内地址 -->
			<tui-button
				type="black" width="auto" height="86rpx" margin="10rpx 16rpx 0"
				:size="28"
				:disabled="settlement.shops.some(i => i.receiveNotMatch)"
				@click="handlePaymentPassword"
			>
				提交订单
			</tui-button>
		</view>

		<!-- 分享订单商品海报 -->
		<OrderPoster ref="refOrderPoster"></OrderPoster>
	</view>
</template>

<script>
import { resolveGetOrderSettlement, resolveIntegralSelect, resolveCalcOrderTotal, resolveVoucherData, resolveVoucherPaySelect, resolveSubmitOrder } from '../../../utils'
import { getQueryDictByNameApi } from '../../../api/anotherTFInterface'
import { T_SKU_ITEM_MSG_LIST, T_SKU_ITEM_INFO, T_PAY_ORDER } from '../../../constant'
import { handleOrderTypeJump, paymentTypeEnum, handleDoPay } from '../../../utils/payUtil'

export default {
	name: 'PaymentCodeConfirm',
	data() {
		return {
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
			// 是否兑换专区商品
			isExchangeCounter: false,
			// 是否采购专区商品
			isProcureCounter: false,
			// 其它信息
			otherInfo: {
				remark: '',
				// 是否可以结算
				isCanPay: false,
				// 加盟商和社区店分佣情况
				benefitinFranchiseesPhone: '',
				communityPhone: '',
				commissionSharingRatio: [],
				// 选择代金券支付后选择的代金券Id
				voucherId: ''
			}
		}
	},
	onLoad(options) {
		// 涉及支付的页面分类：
		// ①涉及支付密码的页面：
		// - 要创建订单的页面：使用通联或惠市宝支付后需要订单跳转的页面（订单结算页，付款码结算页，会员卡列表页），使用通联或惠市宝支付后不需要订单跳转的页面（商家充值页，代金券充值页）。
		// - 不用创建订单的页面：会员卡订单页，订单列表页，订单详情页。（情况：在H5环境使用通联和惠市宝支付，套壳小程序和APP环境使用通联和惠市宝支付，使用其它支付后密码错误再使用通联和惠市宝支付）
		// ②不涉及支付密码的页面：余额充值页。
		const pages = getCurrentPages()
		if (pages.length > 1) uni.removeStorageSync(T_PAY_ORDER)
		this.fromType = options.type
		this.brandId = options.brandId || ''
		this.isExchangeCounter = Boolean(Number(options.isExchange) || 0)
		this.isProcureCounter = Boolean(Number(options.isProcure) || 0)
	},
	onShow() {
		const pages = getCurrentPages()
		if (uni.getStorageSync(T_PAY_ORDER) && (pages.length === 1)) {
			// 在H5环境（小程序和APP环境在首次加载时必然会清除，且只有一次首次加载），在onLoad首次加载时：如果是由其它页面跳转到该支付页面，就会清除订单信息，就不会重定向到'订单跳转页'；如果是通联和惠市宝支付成功后用户按手机返回键，就会重定向。
			handleOrderTypeJump({ type: uni.getStorageSync(T_PAY_ORDER).type })
		} else if (uni.getStorageSync(T_PAY_ORDER) && ((this.payInfo.paymentMode === 9) || (this.payInfo.paymentMode === 4))) {
			// 考虑在套壳小程序和APP环境，跳转到其它小程序支付的情况，通联和惠市宝支付成功后用户按手机返回键回到该页面（本地存储中会保留订单信息）
			handleOrderTypeJump({ type: uni.getStorageSync(T_PAY_ORDER).type })
		} else if (typeof this.integralRatio === 'number') {
			this.handleOnShow()
		} else {
			getQueryDictByNameApi({ name: 'credit_exchange_rate' })
				.then((res) => {
					this.integralRatio = parseFloat(res.data.dictDescribe) || 0
					this.handleOnShow()
				})
		}
	},
	methods: {
		async handleOnShow() {
			if (uni.getStorageSync(T_SKU_ITEM_MSG_LIST) || uni.getStorageSync(T_SKU_ITEM_INFO)) {
				let orderSettlementObj
				if (uni.getStorageSync(T_SKU_ITEM_MSG_LIST)) { // 1立即购买，2购物车结算
					this.skuItemMsgList = uni.getStorageSync(T_SKU_ITEM_MSG_LIST)
					orderSettlementObj = await resolveGetOrderSettlement({
						isExchangeCounter: this.isExchangeCounter,
						isProcureCounter: this.isProcureCounter,
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
						isExchangeCounter: this.isExchangeCounter,
						isProcureCounter: this.isProcureCounter,
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
				if (orderSettlementObj.isSuccess) {
					const voucherDataObj = resolveVoucherData({ settlement: this.settlement, voucherObj: this.voucherObj, voucherShopObj: this.voucherShopObj })
					this.voucherObj = voucherDataObj.voucherObj
					this.voucherShopObj = voucherDataObj.voucherShopObj
					this.getOrderTotal({ settlement: this.settlement, selectedPlatformCoupon: this.selectedPlatformCoupon, integralRatio: this.integralRatio, selectIntegral: this.selectIntegral })
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
			this.payInfo = e
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
				await handleDoPay({ ...this.submitResult, ...this.payInfo, type: 1 }, this.settlement.shopType, paymentTypeEnum[this.settlement.shopType], {
					passwordFailFn: (submitResult) => {
						this.payInfo.pwd = ''
						this.$refs.refCashierList && (this.$refs.refCashierList.isShowPasswordDialog = true)
					}
				})
			} else if ((this.payInfo.paymentMode !== 9) && (this.payInfo.paymentMode !== 4) && !this.payInfo.pwd) {
				if (this.isPasswordFail) this.$refs.refCashierList && (this.$refs.refCashierList.isShowPasswordDialog = true) // 应该不会发生，因为密码错误后会重新弹出密码输入框，如果此时关闭框则会进行订单跳转，而不是（关闭框再点击提交后）进入该判断。但此处仍考虑该情况。
				else this.$refs.refCashierList && this.$refs.refCashierList.handleInputPaymentPassword()
			} else if (!this.isPasswordFail) {
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
					passwordFailFn: (submitResult) => {
						this.submitResult = submitResult
						this.isPasswordFail = true
						this.payInfo.pwd = ''
						this.$refs.refCashierList && (this.$refs.refCashierList.isShowPasswordDialog = true)
					}
				})
			}
		},

		handleShare() {
			if (this.settlement.shops && this.settlement.shops.length) {
				const nickName = this.$store.getters.userInfo.name
				this.$refs.refOrderPoster.show({
					headerTitle: nickName ? nickName + '的订单商品' : '订单商品',
					brandList: this.settlement.shops.map((brand) => ({
						brandName: brand.shopName,
						goodsList: brand.skus.map((item) => ({
							picUrl: item.image,
							goodsName: item.productName,
							specifications: item.value,
							price: item.price
						}))
					}))
				})
			} else {
				return this.$showToast('缺少商品数据')
			}
		}
	}
}
</script>

<style lang="less" scoped>
.payment-order-confirm-container {
	min-height: 100vh;
	background-color: #F7F7F7;
	box-sizing: border-box;
	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}
}
</style>
