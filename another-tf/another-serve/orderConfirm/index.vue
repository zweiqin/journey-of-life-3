<template>
	<!-- 提交订单 -->
	<view class="order-confirm-container">
		<JHeader title="购买宝贝" width="50" height="50" style="padding: 24rpx 0 0;"></JHeader>
		<view class="content">
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
			<view>
				<view class="address-box" @click="go(`/another-tf/another-serve/address/index?type=${fromType}`)">
					<tui-icon name="position" :size="66" unit="rpx" color="#333333" margin="0 20rpx 0 0"></tui-icon>
					<!-- 有地址的 -->
					<view v-if="userAddressInfo.receiveId" class="address-r">
						<view class="address-name-box">
							<text>{{ userAddressInfo.receiveName }}</text>
							<text class="phone">{{ userAddressInfo.receivePhone }}</text>
						</view>
						<view class="address-info">
							<text>{{ userAddressInfo.receiveAdress }} {{ userAddressInfo.address }}</text>
						</view>
					</view>
					<!-- 没有地址的 -->
					<view v-else class="address-r">
						<text>你还没有收货地址哦，点击这里添加</text>
					</view>
					<tui-icon name="arrowright" :size="62" unit="rpx" color="#999999" margin="0 0 0 20rpx"></tui-icon>
				</view>
			</view>
			<view class="order-list-box">
				<view v-for="(item, sIndex) in settlement.shops" :key="item.shopId" class="item">
					<view v-if="!item.shopName.startsWith('团蜂')" class="order-list-top">
						<view class="top-l">
							<tui-icon name="shop" :size="34" unit="rpx" color="#2b2b2b" margin="0 20rpx 0 0"></tui-icon>
							<text class="shop-name">{{ item.shopName }}</text>
						</view>
					</view>
					<view class="order-info-box">
						<view>
							<view v-for="(cItem, index) in item.skus" :key="cItem.productId" class="order-info-item">
								<image :src="common.seamingImgUrl(cItem.image)" class="product-img"></image>
								<view>
									<text class="product-name">{{ cItem.productName }}</text>
									<view class="product-sku">
										<view v-for="(vItem, index) in cItem.values">
											<label class="mar-left-20">{{ vItem }}</label>
										</view>
									</view>
									<view class="price-sku-box flex-display flex-sp-between">
										<view class="product-price">
											<text class="fuhao">￥</text>
											{{ cItem.price }}
										</view>
										<view class="product-num">x {{ cItem.number }}</view>
									</view>
								</view>
							</view>
							<view v-if="item.receiveNotMatch" class="adressTips">
								当前地址不支持配送，可更换其他地址试试
							</view>
							<view class="delivery-way-box">
								<view>
									<view style="display: flex;align-items: center;justify-content: space-between;font-size: 26rpx;">
										<view class="flex-items">
											<text>配送方式</text>
										</view>
										<view>
											<text v-if="item.distribution.distributionPrice > 0" style="white-space: nowrap;">
												快递 ¥ {{ item.distribution.distributionPrice }}
											</text>
											<text v-else>快递 免邮</text>
										</view>
									</view>
									<view class="flex-item">
										<text v-for="(hItem, hIndex) in item.skuDiscountInfoMap" class="font-color-666 fs24">
											{{ hItem[0] }}
										</text>
									</view>
								</view>
							</view>
						</view>
						<view v-if="item.shopCoupons.length > 0" class="discount-item1" @click="showShopCoupons(item, sIndex)">
							<view class="discount-label">店铺优惠</view>
							<view class="discount-info-box flex-items">
								<view v-if="item.currentCoupon && item.currentCoupon.couponType === 1" class="discount-info2">
									-￥{{ item.currentCoupon.reduceMoney }}
								</view>
								<view v-if="item.currentCoupon && item.currentCoupon.couponType === 2" class="discount-info2">
									{{ item.currentCoupon.reduceMoney }}折券
								</view>
								<tui-icon name="arrowright" :size="30" unit="rpx" color="#999999" margin="0 0 0 20rpx"></tui-icon>
							</view>
						</view>
						<view class="order-total-box">
							<text class="total-num">共{{ item.number }}件</text>
							<text class="total-num ml10">总计</text>
							<text v-if="item.totalAfterDiscount > 0" class="total-price ml10">
								¥{{
									(parseFloat(item.totalAfterDiscount) + parseFloat(item.distribution.distributionPrice || 0)).toFixed(2)
								}}
							</text>
							<text v-else class="total-price ml10">¥0.00</text>
						</view>
					</view>
				</view>
			</view>
			<view class="discount-item" @click="showDiscount">
				<view class="discount-label">平台优惠</view>
				<view class="discount-info-box flex-items">
					<view v-if="promotionInfoDTO.couponId" class="discount-info2">
						<text v-if="promotionInfoDTO.couponType === 2">{{ promotionInfoDTO.reduceMoney }}折</text>
						<text v-else> -￥{{ promotionInfoDTO.reduceMoney | clip2Decimal }}</text>
					</view>
					<view v-else-if="!settlement.coupons || !settlement.coupons.length" class="discount-label">无</view>
					<view v-else class="discount-label">不使用</view>
					<tui-icon name="arrowright" :size="30" unit="rpx" color="#999999" margin="0 0 0 20rpx"></tui-icon>
				</view>
			</view>
			<!--      积分支付 -->
			<view v-if="integralNum" class="integralPayBox">
				<view class="integralBg">
					<view class="integralTit fs26">可用 {{ integralNum }} 积分抵扣 {{ integralPrice.toFixed(2) }} 元</view>
					<view class="maxIntegral">
						<checkbox-group style="width: 50rpx" @change="changeIntegral">
							<checkbox
								style="transform:scale(0.7);" class="integralCheckbox" color="#C5AA7B" value="1"
								:checked="selectIntegral"
							/>
						</checkbox-group>
					</view>
				</view>
			</view>
			<VoucherUse
				v-if="settlement.userVoucherDeductLimit && settlement.voucherTotalAll" ref="refVoucherUse"
				:voucher-list="settlement.voucherList" :voucher-num="settlement.userVoucherDeductLimit"
				@choose="handleChooseVoucher"
			></VoucherUse>

			<view style="margin-top: 20rpx;">
				<CashierList
					show :price-pay="totalPrice"
					:show-commission-pay="settlement.shops.every((a) => a.skus.every((b) => !b.platformCurrencyId)) && !!totalPrice"
					:show-platform-pay="settlement.shops.every((a) => a.skus.every((b) => !b.platformCurrencyId)) && !!totalPrice"
					:show-transaction-pay="settlement.shops.every((a) => a.skus.every((b) => !b.platformCurrencyId)) && !!totalPrice"
					:shop-id-pay="settlement.shops.every((a) => a.skus.every((b) => !b.platformCurrencyId)) && totalPrice ? shopIdPay : 0"
					@change="(e) => payInfo = e"
				/>
			</view>
			<view class="order-flow-box">
				<view class="flow-word">交易流程：</view>
				<view class="flow-word mt25">
					<text>1、填写收货信息并完成支付</text>
					<text>2、双方根据物品的交易方式进行交易</text>
					<text>3、拿到物品，交易结束</text>
				</view>
				<!--        实付款不含邮费，涉及邮寄双方协定好费用，提醒发起人修改价格再完成支付； -->
				<view class="flow-word mt50">
					注：应国家邮政总局的要求，即日起涉及到个人快递包裹必须收件人实名制，否则将影响到收寄配送。请避免使用「先生，男士，小姐，女士，昵称」等模糊称谓。
				</view>
			</view>
		</view>
		<view class="order-confirm-box" style="padding-bottom:30rpx;">
			<view class="flex-items flex-sp-between">
				<text class="num-box">共{{ totalCount }}件</text>
				<view>
					<text class="total">合计：</text>
					<text v-if="totalPrice > 0" class="price">
						¥{{ totalPrice.toFixed(2) }}
					</text>
					<text v-else class="price">
						¥0.00
					</text>
				</view>
			</view>
			<!-- active 当有地址时按钮加上active选中的样式 -->
			<button v-if="isRegionalScope" class="btn unActive" type="default" :disabled="false">
				提交订单
			</button>
			<button v-else class="btn active" @click="submitOrder">提交订单</button>
		</view>
		<!-- 活动弹框，平台优惠券 -->
		<tui-bottom-popup class="activity-con" :show="isShowDiscount" @close="isShowDiscount = false">
			<view class="activity-box" style="height: 1000rpx;">
				<view style="display: flex;justify-content: flex-end;padding: 12rpx;border-bottom: solid 1rpx #EEEEEE;">
					<tui-icon name="close" :size="50" unit="rpx" color="#999999" @click="isShowDiscount = false"></tui-icon>
				</view>
				<view class="activity-coupon-box">
					<scroll-view scroll-y style="height: 900rpx;">
						<view class="content-box">
							<view v-if="settlement.coupons && settlement.coupons.length">
								<view style="font-size: 28rpx;color: #333333;">可用优惠券列表</view>
								<view style="display: flex;flex-wrap: wrap;justify-content: space-between;margin-top: 10rpx;">
									<view
										v-for="(usableItem, index) in settlement.coupons" :key="index"
										style="width: 48%;padding: 20rpx;margin-bottom: 30rpx;background-color: #eeeeee;border-radius: 100rpx;color: #C5AA7B;text-align: center;box-sizing: border-box;"
										@click="couponItemTap(index, usableItem)"
									>
										<view style="font-size: 40rpx;padding-top: 30rpx;">
											<text v-if="usableItem.couponType === 1">￥{{ usableItem.reduceMoney }}</text>
											<text v-else>{{ usableItem.reduceMoney }}折券</text>
										</view>
										<view style="font-size:22rpx;margin-top: 20rpx;color: #999999;">
											{{ usableItem.startTime && usableItem.startTime.split(' ')[0].split('-').join('.')
											}}-{{ usableItem.endTime && usableItem.endTime.split(' ')[0].split('-').join('.') }}
										</view>
										<view style="margin-top: 10rpx;font-size: 24rpx;color: #999999;">
											满{{ usableItem.fullMoney }}元可用
										</view>
										<tui-icon
											v-if="usableItem.checked" name="circle-fill" :size="40" unit="rpx"
											color="#c5aa7b"
											margin="40rpx 0 0 0"
										></tui-icon>
										<tui-icon
											v-else name="circle" :size="40" unit="rpx"
											color="#cccccc"
											margin="40rpx 0 0 0"
										></tui-icon>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</tui-bottom-popup>
		<tui-bottom-popup class="activity-con" :show="isShopCoupons" @close="isShopCoupons = false">
			<view class="activity-box">
				<view style="display: flex;justify-content: flex-end;padding: 12rpx;border-bottom: solid 1rpx #EEEEEE;">
					<tui-icon name="close" :size="50" unit="rpx" color="#999999" @click="isShopCoupons = false"></tui-icon>
				</view>
				<view class="activity-coupon-box">
					<scroll-view scroll-y style="height: 900rpx;">
						<view class="content-box">
							<view v-if="shopCouponsLength">
								<view style="font-size: 28rpx;color: #333333;">可用优惠券列表</view>
								<view style="display: flex;flex-wrap: wrap;justify-content: space-between;margin-top: 10rpx;">
									<view
										v-for="(sItem, index) in shopCouponslist.shopCoupons" :key="sItem.id"
										style="width: 48%;padding: 20rpx;margin-bottom: 30rpx;background-color: #eeeeee;border-radius: 100rpx;color: #C5AA7B;text-align: center;box-sizing: border-box;"
										@click="shopCouponItemTap(index, sItem)"
									>
										<view style="font-size: 40rpx;padding-top: 30rpx;">
											<text v-if="sItem.couponType === 1">￥{{ sItem.reduceMoney }}</text>
											<text v-else>{{ sItem.reduceMoney }}折券</text>
										</view>
										<view style="font-size:22rpx;margin-top: 10rpx;color: #999999;">
											{{ sItem.startTime && sItem.startTime.split(' ')[0].split('-').join('.')
											}}-{{ sItem.endTime && sItem.endTime.split(' ')[0].split('-').join('.') }}
										</view>
										<view style="margin-top: 10rpx;font-size: 24rpx;color: #999999;">
											满{{ sItem.fullMoney }}元可用
										</view>
										<tui-icon
											v-if="sItem.checked" name="circle-fill" :size="40" unit="rpx"
											color="#c5aa7b"
											margin="40rpx 0 0 0"
										></tui-icon>
										<tui-icon
											v-else name="circle" :size="40" unit="rpx"
											color="#cccccc"
											margin="40rpx 0 0 0"
										></tui-icon>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</tui-bottom-popup>

		<!-- 分享订单商品海报 -->
		<OrderPoster ref="refOrderPoster"></OrderPoster>
	</view>
</template>

<script>
import { handleDoPay } from '../../../utils/payUtil'
import { getQueryDictByNameApi, getGroupSettlementWorkApi, getSettlementOrderApi, updatePlaceOrderSubmitApi, addUserTrackReportDoPointerApi, updatePlatformBeeCurrencySaveBeeApi } from '../../../api/anotherTFInterface'
import { T_RECEIVE_ITEM, T_SKU_ITEM_DTO_LIST, T_SKU_ITEM_LIST, T_PAY_ORDER } from '../../../constant'

export default {
	name: 'OrderConfirm',
	filters: {
		clip2Decimal(value) {
			if (value === undefined || value === null) {
				return '0.00'
			}
			return (parseInt(value * 100) / 100).toFixed(2)
		}
	},
	data() {
		return {
			settlement: {
				voucherList: [],
				shops: []
			},
			fromType: 0,
			brandId: 0,
			skuItemDTOList: [],
			totalPrice: 0, // 合计
			totalCount: 0,
			userAddressInfo: {},
			isRegionalScope: false, // 是否在商家配置范围内地址
			payInfo: {}, // 支付相关
			shopIdPay: '', // 某商家的‘用户的商家充值的余额支付’对应的商家Id
			oneClickSubmit: true, // 只提交订单一次
			// 拼团相关
			skuItemList: {},
			shopGroupWorkId: 0,
			sumitType: '',
			collageId: null,
			// 店铺优惠券相关
			isShopCoupons: false,
			shopCouponsLength: 0,
			shopCouponslist: [],
			selectShopCoupon: [], // 已选择店铺优惠券
			// 代金券相关
			voucherObj: {
				voucherTotalAll: 0,
				isVoucher: false,
				voucherId: 0
			},
			// 平台优惠券相关
			isShowDiscount: false,
			promotionInfoDTO: {
				couponId: 0,
				ifAdd: 1,
				reduceMoney: 0
			},
			shopIndex: 0, // 选中的店铺使用店铺优惠券
			checkedPlatformCoupon: undefined,
			// 积分相关
			selectIntegral: true,
			integralNum: 0,
			integralRatio: 0, // 积分兑换比例
			integralPrice: 0, // 总积分可减多少元
			// 埋点ID
			pointProductIds: ''
		}
	},
	onLoad(options) {
		getQueryDictByNameApi({ name: 'credit_exchange_rate' })
			.then((res) => {
				this.integralRatio = parseFloat(res.data.dictDescribe)
			})
		this.fromType = options.type
		this.brandId = options.brandId || ''
	},
	onShow() {
		if (uni.getStorageSync(T_PAY_ORDER)) {
			uni.switchTab({
				url: '/pages/order/order'
			})
		} else {
			this.handleOnShow()
		}
	},
	methods: {
		handleOnShow() {
			if (uni.getStorageSync(T_RECEIVE_ITEM)) this.userAddressInfo = uni.getStorageSync(T_RECEIVE_ITEM)
			if (uni.getStorageSync(T_SKU_ITEM_DTO_LIST)) { // 1立即购买，2购物车结算
				this.skuItemDTOList = uni.getStorageSync(T_SKU_ITEM_DTO_LIST)
				if (this.skuItemDTOList[0].shopDiscountId > 0) {
					this.sumitType = 4 // 4限时折扣活动
				} else if (this.skuItemDTOList[0].shopSeckillId > 0) {
					this.sumitType = 3 // 3秒杀活动
				}
				this.getSettlement(false)
			} else if (uni.getStorageSync(T_SKU_ITEM_LIST)) { // 3拼团商品立即购买
				this.skuItemList = uni.getStorageSync(T_SKU_ITEM_LIST)
				this.shopGroupWorkId = this.skuItemList.shopGroupWorkId
				this.sumitType = this.skuItemList.type // 1发起拼团(单独开团)，2参与拼团(拼团)
				this.collageId = this.skuItemList.collageId
				this.getSettlement(true)
			}
		},
		// 积分价格计算
		changeIntegral() {
			this.selectIntegral = !this.selectIntegral
			if (this.voucherObj.voucherId) {
				this.$nextTick(() => {
					this.selectIntegral = false
				})
				return this.$showToast('已选择代金券，无法使用其它优惠')
			}
			if (this.selectIntegral) {
				this.totalPrice = this.totalPrice - this.integralPrice
			} else {
				this.totalPrice = this.totalPrice + this.integralPrice
			}
		},
		// 获取订单信息
		getSettlement(isGroup) {
			uni.showLoading({
				title: '加载中...'
			})
			let _url = ''
			let _data = ''
			// 是否是拼团
			if (isGroup) {
				_url = getGroupSettlementWorkApi
				_data = this.skuItemList
			} else {
				_url = getSettlementOrderApi
				_data = {
					type: this.fromType,
					shopId: this.brandId,
					shops: this.skuItemDTOList,
					receiveId: this.userAddressInfo.receiveId,
					...this.voucherObj
				}
			}
			_url(_data).then((res) => {
				uni.hideLoading()
				this.settlement = res.data
				if (this.settlement.shops.length === 1) this.shopIdPay = this.settlement.shops[0].shopId
				this.settlement.shops.forEach((value) => {
					value.totalNum = value.total
					value.pricing = 0
				})
				// 如果没有地址时进入购买宝贝页面对下面的商品件数和总计进行赋值
				if (!this.settlement.receive.receiveAdress) {
					this.settlement.shops.forEach((item) => {
						this.totalCount += item.number
						this.totalPrice += item.total || item.totalNum
					})
				}
				// 初始化平台券选中状态
				this.settlement.coupons && this.settlement.coupons.forEach((item) => {
					item.checked = false
				})
				this.settlement.shops.forEach((item) => {
					item.totalAfterDiscount = item.total
				})
				// 默认选中商家的第一张优惠券
				for (let s = 0; s < this.settlement.shops.length; s++) {
					this.shopIndex = s
					const curShop = this.settlement.shops[s]
					curShop.skus.forEach((item) => {
						item.skuTotalNum = item.total
					})
					if (curShop.shopCoupons.length > 0) {
						curShop.shopCoupons.forEach((item) => {
							item.checked = false
						})
						const firstShopCoupon = curShop.shopCoupons[0]
						this.shopCouponItemTap(0, firstShopCoupon)
						// let useCoupon = this.useShopCoupon(s, 0)
						// if (useCoupon) {
						// 	firstShopCoupon.checked = true
						// 	this.selectShopCoupon.push(firstShopCoupon)
						// 	curShop['currentCoupon'] = firstShopCoupon
						// } else {
						// 	curShop.totalNum = curShop.total
						// }
					}
				}
				this.shopIndex = 0
				if (this.settlement.shopType) { // this.settlement.shopType === 1 // 1品牌商家，2商圈商家
					if (uni.getStorageSync(T_RECEIVE_ITEM)) {
						this.userAddressInfo = uni.getStorageSync(T_RECEIVE_ITEM)
						this.userAddressInfo.receivePhone = this.userAddressInfo.receivePhone.replace(/(\d{3})\d+(\d{4})$/, '$1****$2')
					} else if (res.data.receive) {
						this.userAddressInfo = res.data.receive || {}
						this.userAddressInfo.receivePhone = this.userAddressInfo.receivePhone.replace(/(\d{3})\d+(\d{4})$/, '$1****$2')
					}
				} else {
					this.userAddressInfo = { receiveId: 485 }
				}
				uni.removeStorageSync(T_RECEIVE_ITEM)
				this.settlement.shops.some((item) => { // 根据地址判断是否能下单
					if (item.receiveNotMatch) {
						this.isRegionalScope = item.receiveNotMatch
						this.$showToast('当前地址不支持配送，请参考红色字提示')
					}
					return item.receiveNotMatch
				})
				this.getTotal()
				console.log(this.settlement)
			})
				.catch((e) => {
					console.log(e)
					uni.hideLoading()
				})
		},
		// 平台优惠券选择
		couponItemTap(index, coupon) {
			if (!coupon.checked && this.selectShopCoupon.length) { // 判断商家券情况
				this.$showToast('不可与商家券叠加使用！')
				return false
			}
			// 已选中的情况下取消选中
			if (coupon.checked) {
				const promotionInfoDTO = {}
				if (coupon.couponId) {
					promotionInfoDTO.couponId = 0
					promotionInfoDTO.ifAdd = 1
					promotionInfoDTO.reduceMoney = 0
				}
				this.promotionInfoDTO = promotionInfoDTO
				coupon.checked = false
				this.isShowDiscount = false
				this.checkedPlatformCoupon = undefined
				this.settlement.shops.forEach((shopItem) => {
					if (shopItem.skus) {
						shopItem.skus.forEach((skuItem) => {
							skuItem.buyerCouponId = null
						})
					}
				})
				this.getTotal()
			} else {
				// 先把所有已选中的平台优惠券改为未选中
				this.settlement.coupons && this.settlement.coupons.forEach((item) => {
					item.checked = false
				})
				let totalPrice = 0 // 订单总价
				const shopsLen = this.settlement.shops.length // 结算页店铺数量
				let matchCouponSkuList = []
				for (let i = 0; i < shopsLen; i++) {
					let matchCouponNormalPrice = 0
					let priceCount = 0
					const curShop = this.settlement.shops[i]
					const skuLen = curShop.skus.length
					const tmpPriceSkuList = []
					for (let j = 0; j < skuLen; j++) {
						const curSku = curShop.skus[j]
						if (curSku.priceId > 0) {
							priceCount++
						}
						const ids = coupon.ids
						if (ids.indexOf(curSku.productId) > -1) {
							if (curSku.priceId > 0) {
								tmpPriceSkuList.push(curSku)
							} else {
								matchCouponSkuList.push(curSku)
								matchCouponNormalPrice = matchCouponNormalPrice + curSku.price * curSku.number
							}
						}
					}
					if (priceCount === tmpPriceSkuList.length) {
						totalPrice += curShop.priceAfterDiscount
						matchCouponSkuList = matchCouponSkuList.concat(tmpPriceSkuList)
					}
					totalPrice += matchCouponNormalPrice
				}
				if (this.settlement.shops[this.shopIndex].total < coupon.fullMoney) {
					this.$showToast('不满足优惠券使用条件！')
					return false
				}
				if (coupon.couponType === 1 && coupon.reduceMoney >= totalPrice) {
					this.$showToast('不可使用大于等于合计金额的优惠劵！')
					return false
				}
				// 如果是折扣券，需要记录，在什么基数上打折
				coupon.useMoney = totalPrice
				const promotionInfoDTO = {}
				if (coupon.couponId) {
					promotionInfoDTO.couponId = coupon.couponId
					promotionInfoDTO.ifAdd = coupon.ifAdd
					promotionInfoDTO.couponType = coupon.couponType
					promotionInfoDTO.reduceMoney = coupon.reduceMoney
				}
				this.promotionInfoDTO = promotionInfoDTO
				this.isShowDiscount = false
				this.checkedPlatformCoupon = coupon
				matchCouponSkuList.forEach((item) => {
					item.buyerCouponId = coupon.couponId
				})
				this.getTotal()
				// 选中优惠券
				coupon.checked = true
			}
		},
		// 店铺优惠券选择
		shopCouponItemTap(index, coupon) {
			// 取消选择优惠券
			if (coupon.checked) {
				coupon.checked = false
				this.settlement.shops[this.shopIndex].totalAfterDiscount = this.settlement.shops[this.shopIndex].total
				this.settlement.shops[this.shopIndex].currentCoupon = {}
				this.settlement.shops[this.shopIndex].skus.forEach((item) => {
					item.buyerShopCouponId = null
				})
				this.isShopCoupons = false
				this.selectShopCoupon = []
				this.getTotal()
				return
			}
			if (this.settlement.shops[this.shopIndex].total < coupon.fullMoney) {
				this.$showToast('不满足优惠券使用条件！')
			} else if (coupon.couponType === 1 && this.settlement.shops[this.shopIndex].total < coupon.reduceMoney) {
				this.$showToast('不可使用大于商品金额的优惠劵！')
			} else {
				// 选择优惠券
				if (this.promotionInfoDTO.couponId !== 0) return this.$showToast('此券不可与平台券叠加！')
				if ((coupon.couponType === 1) && (coupon.reduceMoney >= this.settlement.shops[this.shopIndex].total)) return this.$showToast('优惠券优惠金额不能大于等于合计金额！')
				this.isShopCoupons = false
				if (this.useShopCoupon(this.shopIndex, index)) {
					for (let i = 0; i < this.settlement.shops[this.shopIndex].shopCoupons.length; i++) {
						this.settlement.shops[this.shopIndex].shopCoupons[i].checked = false
					}
					this.selectShopCoupon = this.selectShopCoupon.filter((item) => item.id !== coupon.id)
					coupon.checked = true
					this.settlement.shops[this.shopIndex].currentCoupon = coupon
					this.settlement.shops[this.shopIndex].skus.forEach((item) => {
						if (item.buyerShopCouponId > 0 && item.buyerShopCouponId !== coupon.shopCouponId) item.buyerShopCouponId = null
					})
					this.selectShopCoupon.push(coupon)
				} else {
					this.settlement.shops[this.shopIndex].totalAfterDiscount = this.settlement.shops[this.shopIndex].total
				}
				this.getTotal()
			}
		},
		useShopCoupon(shopIndex, couponIndex) {
			const curShop = this.settlement.shops[shopIndex]
			curShop.totalAfterDiscount = 0
			let curCoupon
			if (curShop.shopCoupons && curShop.shopCoupons.length > 0) {
				curCoupon = curShop.shopCoupons[couponIndex]
			}
			if (!curCoupon) return false
			let useCoupon = false
			const matchCouponNormalSkuList = []
			const matchCouponPriceSkuList = []
			if (curCoupon.applyType !== 1) {
				const ids = curCoupon.ids
				const skuLength = curShop.skus.length
				// 符合优惠券商品列表中的普通sku价格综合
				let matchCouponNormalPrice = 0
				// 符合定价捆绑且在优惠券商品列表中的价格综合
				let matchCouponPricePrice = 0
				// 符合定价捆绑活动的sku数量
				let priceCount = 0
				for (let idx = 0; idx < skuLength; idx++) {
					const curSku = curShop.skus[idx]
					if (curSku.priceId > 0) {
						priceCount++
					}
					if (ids.indexOf(curSku.productId) > -1) {
						if (curSku.priceId > 0) {
							matchCouponPriceSkuList.push(curSku)
						} else {
							matchCouponNormalSkuList.push(curSku)
							matchCouponNormalPrice = matchCouponNormalPrice + curSku.price * curSku.number
						}
					}
				}
				// 如果定价捆绑的所有sku都符合优惠券
				if (priceCount === matchCouponPriceSkuList.length) {
					matchCouponPricePrice = curShop.priceAfterDiscount
				}
				// 符合的sku的price加起来是否满足满减的条件
				const priceFinal = matchCouponPricePrice + matchCouponNormalPrice
				if (priceFinal < curCoupon.fullMoney || (curCoupon.couponType === 1 && priceFinal <= curCoupon.reduceMoney)) return false
				// 判断是满减，还是折扣
				if (curCoupon.couponType === 1) {
					curShop.totalAfterDiscount = curShop.total - curCoupon.reduceMoney
					useCoupon = true
				} else {
					// 打折后优惠抵扣的金额
					const priceDiscount = (priceFinal * ((10 - curCoupon.reduceMoney) / 10)).toFixed(2)
					const tmpTotal = curShop.total - priceDiscount
					if (tmpTotal.toFixed(2) >= 0.01) {
						curShop.totalAfterDiscount = tmpTotal.toFixed(2)
						useCoupon = true
					}
				}
				if (useCoupon) {
					// 满足的sku设置buyerShopCouponId
					if (priceCount === matchCouponPriceSkuList.length) {
						const length1 = matchCouponPriceSkuList.length
						for (let idx = 0; idx < length1; idx++) {
							matchCouponPriceSkuList[idx].buyerShopCouponId = curCoupon.shopCouponId
						}
					}
					const length2 = matchCouponNormalSkuList.length
					for (let idx = 0; idx < length2; idx++) {
						matchCouponNormalSkuList[idx].buyerShopCouponId = curCoupon.shopCouponId
					}
				}
			} else {
				if (curCoupon.couponType === 1) {
					if (curShop.total > curCoupon.reduceMoney) {
						curShop.totalAfterDiscount = curShop.total - curCoupon.reduceMoney
						useCoupon = true
					}
				} else if (curShop.total > curCoupon.fullMoney) {
					const priceDiscount = (curShop.total * ((10 - curCoupon.reduceMoney) / 10)).toFixed(2)
					const tmpTotal = curShop.total - priceDiscount
					if (tmpTotal.toFixed(2) >= 0.01) {
						curShop.totalAfterDiscount = tmpTotal.toFixed(2)
						useCoupon = true
					}
				}
				if (useCoupon) {
					const skuLength = curShop.skus.length
					for (let idx = 0; idx < skuLength; idx++) {
						curShop.skus[idx].buyerShopCouponId = curCoupon.shopCouponId
					}
				}
			}
			return useCoupon
		},

		// 计算总价，商家券的优惠计算，在调用本方法之前已经计算好在shops[].totalAfterDiscount
		getTotal() {
			this.totalPrice = 0
			this.totalCount = 0
			this.integralPrice = 0
			this.integralNum = 0
			let shopSumPrice = 0
			const shopsLen = this.settlement.shops.length
			for (let i = 0; i < shopsLen; i++) {
				this.totalPrice += parseFloat(this.settlement.shops[i].totalAfterDiscount)
				shopSumPrice += parseFloat(this.settlement.shops[i].totalAfterDiscount)
				this.totalCount += this.settlement.shops[i].number
			}
			if (this.voucherObj.voucherId) {
				this.totalPrice = shopSumPrice - this.settlement.voucherTotalAll
			} else if (this.checkedPlatformCoupon) {
				const couponType = this.checkedPlatformCoupon.couponType
				const reduceMoney = this.checkedPlatformCoupon.reduceMoney
				if (couponType === 1 && this.totalPrice - reduceMoney > 0) { // 满减
					this.totalPrice = shopSumPrice - reduceMoney
				} else if (couponType === 2 && reduceMoney > 0) { // 折扣
					const useMoney = this.checkedPlatformCoupon.useMoney
					this.totalPrice = (shopSumPrice - useMoney) + useMoney * reduceMoney / 10
				}
			}
			// 积分支付计算
			this.calcCredit()
			// 加上每个商家的运费
			this.settlement.shops.forEach((item) => {
				this.totalPrice = this.totalPrice + (item.distribution.distributionPrice || 0)
			})
		},
		// eslint-disable-next-line complexity
		calcCredit() {
			const shopsLen = this.settlement.shops.length
			const skuRemainMap = this.calcSkuRemainMap()
			const skuCreditMap = this.settlement.skuCreditMap
			if (skuCreditMap && Object.values(skuCreditMap).length && this.integralRatio > 0) {
				// 只有订单金额达到阈值，并且用户还有剩余的积分，才能进行积分抵扣
				if (this.totalPrice >= this.settlement.orderCreditThreshold && this.settlement.userTotalCredit > 0 && this.settlement.creditDeductLimit > 0) { // orderCreditThreshold: 0, // 满多少元可以抵扣
					for (let i = 0; i < shopsLen; i++) {
						const curShop = this.settlement.shops[i]
						const skuLen = curShop.skus.length
						for (let j = 0; j < skuLen; j++) {
							const curSku = curShop.skus[j]
							const skuId = curSku.skuId
							if (skuCreditMap[skuId] > 0 && skuRemainMap[skuId] > 0 && this.settlement.userTotalCredit > 0 && (Math.round((this.totalPrice + Number.EPSILON) * 100) / 100) > 0) {
								// 抵扣之后，必须保证整个订单至少还有0.01元，可用于支付
								if ((this.settlement.creditDeductLimit - skuRemainMap[skuId]) < 0.01) skuRemainMap[skuId] -= 0.01
								// 按照比例换算成需要多少积分抵扣(取整)
								let finalSkuCredit = parseInt((skuRemainMap[skuId] / this.integralRatio).toString())
								// 优先以商家配置的商品可抵扣积分为准
								if (skuCreditMap[skuId] < finalSkuCredit) finalSkuCredit = skuCreditMap[skuId]
								// 不能超过用户剩余积分
								if (finalSkuCredit > this.settlement.userTotalCredit) finalSkuCredit = this.settlement.userTotalCredit
								// 不能超过整个订单可抵扣积分
								if (finalSkuCredit > this.settlement.creditDeductLimit) finalSkuCredit = this.settlement.creditDeductLimit
								curSku.cachedCredit = finalSkuCredit
								this.integralNum += finalSkuCredit
							}
						}
					}
				}
				// 计算抵扣价格
				this.integralNum = parseInt(this.integralNum)
				if (this.integralNum) { // 有积分抵扣
					this.integralPrice = this.integralNum * this.integralRatio
					if (this.selectIntegral) {
						this.totalPrice = this.totalPrice - this.integralPrice
					}
				}
			}
			if (!this.integralNum && this.selectIntegral) this.selectIntegral = false // 没积分抵扣
		},
		// 计算sku在整个运单价格中的剩余价值 1元的订单，打1折优惠之后，剩余价值就是0.1元
		calcSkuRemainMap() {
			const skuRemainMap = {}
			const shopsLen = this.settlement.shops.length
			const skuCreditMap = this.settlement.skuCreditMap
			for (let i = 0; i < shopsLen; i++) {
				const curShop = this.settlement.shops[i]
				const skuLen = curShop.skus.length
				let checkedShopCoupon
				curShop.shopCoupons.forEach((item) => {
					if (item.checked) checkedShopCoupon = item
				})
				for (let j = 0; j < skuLen; j++) {
					const curSku = curShop.skus[j]
					const skuId = curSku.skuId
					// 不是定价捆绑，并且有配置可抵扣的积分，才有必要计算比例
					if (!curSku.priceId > 0 && skuCreditMap[skuId] > 0) {
						let remainSkuMoney = curSku.price * curSku.number
						if (checkedShopCoupon) {
							const skuShopPercent = remainSkuMoney / curShop.total
							let curReduceMoney = 0
							if (checkedShopCoupon.couponType === 1) {
								curReduceMoney = checkedShopCoupon.reduceMoney * skuShopPercent
							} else {
								curReduceMoney = remainSkuMoney * (10 - checkedShopCoupon.reduceMoney) / 10
							}
							remainSkuMoney = remainSkuMoney - curReduceMoney
						}
						// 使用平台券
						if (this.checkedPlatformCoupon && remainSkuMoney > 0) {
							// 满减
							if (this.checkedPlatformCoupon.couponType === 1) {
								const skuTotalPercent = remainSkuMoney / this.totalPrice
								remainSkuMoney -= this.checkedPlatformCoupon.reduceMoney * skuTotalPercent
							}
							// 折扣
							else {
								remainSkuMoney = remainSkuMoney * this.checkedPlatformCoupon.reduceMoney / 10
							}
						}
						skuRemainMap[skuId] = remainSkuMoney
					}
				}
			}
			return skuRemainMap
		},

		// 展示平台端优惠券
		showDiscount() {
			if (this.voucherObj.voucherId) return this.$showToast('已选择代金券，无法使用其它优惠')
			// let shopifAdd = 1
			// if(this.settlement.shops[this.shopIndex].shopCoupons.length>0){
			// 	shopifAdd = this.settlement.shops[this.shopIndex].shopCoupons[this.shopCouIndex].ifAdd // shopCouIndex: 0, // 优惠券index
			// }
			if (this.settlement.coupons && this.settlement.coupons.length > 0) {
				for (let i = 0; i < this.selectShopCoupon.length; i++) {
					if (this.selectShopCoupon[i].ifAdd == 0) {
						this.$showToast('不可叠加已选择的店铺券')
						return false
					}
				}
				this.isShowDiscount = true
			} else {
				this.$showToast('暂无可用优惠券')
			}
		},
		// 显示店铺优惠券
		showShopCoupons(item, sIndex) {
			if (this.voucherObj.voucherId) return this.$showToast('已选择代金券，无法使用其它优惠')
			if (item.shopCoupons.length > 0) {
				this.isShopCoupons = true
				this.shopCouponslist = item
				this.shopCouponsLength = item.shopCoupons.length
				this.shopIndex = sIndex
			} else {
				this.$showToast('暂无可用优惠券')
			}
		},

		// 选择代金券
		handleChooseVoucher(e) {
			console.log(e)
			if (e.id) {
				if (this.settlement.shops.every((a) => a.skus.every((b) => !b.platformCurrencyId))) {
					if (this.settlement.voucherTotalAll) { // 所有商品可使用多少代金券抵扣
						if (this.settlement.shops.some((item) => this.settlement.userVoucherDeductLimit >= item.voucherTotal)) { // 用户代金券余额-某个店铺的所有订单商品可使用多少代金券抵扣
							// 清除店铺优惠券数据
							for (let index = 0; index < this.settlement.shops.length; index++) {
								for (let i = 0; i < this.settlement.shops[index].shopCoupons.length; i++) {
									this.settlement.shops[index].shopCoupons[i].checked = false
								}
								this.settlement.shops[index].currentCoupon = {}
								this.settlement.shops[index].totalAfterDiscount = this.settlement.shops[index].total
							}
							this.selectShopCoupon = []
							// 清除平台优惠券数据
							this.settlement.coupons && this.settlement.coupons.forEach((item) => {
								item.checked = false
							})
							this.promotionInfoDTO = { couponId: 0, ifAdd: 1, reduceMoney: 0 }
							this.checkedPlatformCoupon = undefined
							this.settlement.shops.forEach((shopItem) => {
								if (shopItem.skus) {
									shopItem.skus.forEach((skuItem) => {
										skuItem.buyerCouponId = null
									})
								}
							})
							// 取消选择积分
							this.selectIntegral = false
						} else {
							this.$showToast('代金券数量不足！')
							this.$refs.refVoucherUse.handleReset()
							return
						}
					} else {
						this.$showToast('商品不支持代金券！')
						this.$refs.refVoucherUse.handleReset()
						return
					}
				} else {
					this.$showToast('包含交易金活动商品，无法使用代金券！')
					this.$refs.refVoucherUse.handleReset()
					return
				}
			}
			this.voucherObj.voucherTotalAll = e.id === 0 ? 0 : this.settlement.voucherTotalAll
			this.voucherObj.isVoucher = e.id !== 0
			this.voucherObj.voucherId = e.id
			this.getTotal()
		},

		// 组装结算数据
		handlePackageData() {
			uni.showLoading({
				mask: true,
				title: '订单提交中...'
			})
			let couponIdinfo = 0
			if (this.promotionInfoDTO.couponId) {
				couponIdinfo = this.promotionInfoDTO.couponId
			}
			const data = {
				shopDiscountId: null,
				collageId: this.collageId,
				type: this.sumitType, // 1发起拼团，2参与拼团，3秒杀活动，4限时折扣活动
				// type: this.fromType, // 1立即购买，2购物车结算，3拼团商品立即购买
				shopGroupWorkId: null,
				receiveId: this.userAddressInfo.receiveId,
				areaId: this.userAddressInfo.areaId,
				communityId: this.userAddressInfo.communityId,
				couponId: couponIdinfo,
				price: this.totalPrice,
				remark: '',
				shops: [],
				discountPrice: 0,
				shopSeckillId: null,
				...this.voucherObj
			}
			if (this.shopGroupWorkId > 0) {
				data.shopGroupWorkId = this.shopGroupWorkId
			}
			if (this.skuItemDTOList && this.skuItemDTOList.length) {
				if (this.skuItemDTOList[0].shopDiscountId > 0) {
					data.shopDiscountId = this.skuItemDTOList[0].shopDiscountId
				} else if (this.skuItemDTOList[0].shopSeckillId > 0) {
					data.shopSeckillId = this.skuItemDTOList[0].shopSeckillId
				}
			}
			const datashopslen = this.settlement.shops.length
			for (let n = 0; n < datashopslen; n++) {
				const shopsobj = {}
				shopsobj.shopId = this.settlement.shops[n].shopId
				shopsobj.sceneId = this.settlement.shops[n].sceneId
				shopsobj.distribution = {}
				shopsobj.skus = []
				if (this.settlement.shops[n].currentCoupon) {
					shopsobj.id = this.settlement.shops[n].currentCoupon.id
				}
				data.shops.push(shopsobj)
				data.shops[n].distribution.distributionPrice = this.settlement.shops[n].distribution.distributionPrice
				data.shops[n].distribution.distributionName = this.settlement.shops[n].distribution.distributionName
				const dataskuslen = this.settlement.shops[n].skus.length
				for (let m = 0; m < dataskuslen; m++) {
					const skusobj = {}
					const curSku = this.settlement.shops[n].skus[m]
					skusobj.skuId = curSku.skuId
					skusobj.number = curSku.number
					skusobj.ifLogistics = curSku.ifLogistics
					skusobj.selected = curSku.selected
					skusobj.platformSeckillId = curSku.platformSeckillId
					skusobj.platformDiscountId = curSku.platformDiscountId
					skusobj.platformCurrencyId = curSku.platformCurrencyId
					skusobj.shopSeckillId = curSku.shopSeckillId
					skusobj.shopDiscountId = curSku.shopDiscountId
					skusobj.sceneId = curSku.sceneId
					skusobj.priceId = curSku.priceId
					skusobj.useMember = curSku.useMember
					skusobj.composeId = curSku.composeId
					// 处理埋点id
					this.pointProductIds += curSku.productId + ','
					// 积分传参
					if (this.selectIntegral && curSku.cachedCredit) {
						skusobj.useCredit = curSku.cachedCredit
						skusobj.useCreditAmount = (curSku.cachedCredit * this.integralRatio).toFixed(2)
					}
					data.shops[n].skus.push(skusobj)
				}
			}
			if (this.pointProductIds.endsWith(',')) this.pointProductIds = this.pointProductIds.slice(0, -1) // 去除最后一个,
			data.paymentMode = this.payInfo.paymentMode
			uni.hideLoading()
			return data
		},

		// 提交订单@return {Promise<void>}
		async submitOrder() {
			// 检查提交表单
			if (!this.payInfo.paymentMode) return this.$showToast('请选择支付方式')
			if (!this.oneClickSubmit) return this.$showToast('已提交，请勿重新操作！')
			if (!this.userAddressInfo.receiveId) return this.$showToast('请选择收货地址')
			this.oneClickSubmit = false
			// 处理表单
			const data = this.handlePackageData()
			uni.showLoading({
				mask: true,
				title: '结算中...'
			})
			try {
				const res = await updatePlaceOrderSubmitApi(data)
				// 下单成功处理埋点
				addUserTrackReportDoPointerApi({
					eventType: 3,
					productIds: this.pointProductIds
				})
				updatePlatformBeeCurrencySaveBeeApi({
					orderId: res.data.orderId
				})
				if (this.fromType == 2) {
					const carSkusData = data.shops
					const skusArr = []
					for (let i = 0; i < carSkusData.length; i++) {
						carSkusData[i].skus.map((item) => {
							skusArr.push(item.skuId)
						})
					}
				}
				const submitResult = res.data
				submitResult.type = 1
				submitResult.paymentMode = data.paymentMode
				if (this.payInfo.paymentMode && this.payInfo.huabeiPeriod) {
					submitResult.huabeiPeriod = this.payInfo.huabeiPeriod
				}
				await handleDoPay.call(this, submitResult, 1)
			} catch (e) {
				this.oneClickSubmit = true
				this.$showToast(`${e.message}-${e.errorData}`)
			} finally {
				uni.hideLoading()
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
.order-confirm-container {
	min-height: 100vh;
	background-color: #F7F7F7;
	box-sizing: border-box;

	.info-box {
		flex: 1;
		font-size: 24rpx;
		margin: 10rpx;
	}

	.content {
		padding: 0 30rpx 198rpx;

		.discount-label {
			font-size: 26rpx;
			color: #333;
		}

		.discount-info-box {
			display: flex;
			flex-direction: row;
		}

		.discount-info2 {
			color: #C5AA7B;
		}

		.address-box {
			margin-top: 20rpx;
			background: #fff;
			border-radius: 10rpx;
			width: 100%;
			padding: 30rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: row;
			align-items: center;

			.address-r {
				flex: 1;
				display: flex;
				flex-direction: column;
				font-size: 28rpx;
				color: #333;

				.address-name-box {
					font-size: 30rpx;
					color: #333;

					.phone {
						font-size: 24rpx;
						color: #999;
						margin-left: 20rpx;
					}
				}

				.address-info {
					font-size: 28rpx;
					color: #333;
					margin-top: 15rpx;
				}
			}
		}

		.order-list-box {
			margin-top: 20rpx;

			.item {
				background: #fff;
				border-radius: 10rpx;
				border-bottom: 2rpx solid #eeeeee;

				.order-list-top {
					padding: 20rpx 30rpx;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.top-l {
						display: flex;
						align-items: center;

						.shop-name {
							font-size: 30rpx;
							color: #333;
							font-weight: bold;
						}
					}
				}

				.order-info-box {
					padding: 0 30rpx;
					box-sizing: border-box;

					.order-info-item {
						display: flex;
						flex-direction: row;
						padding: 20rpx 0;

						.product-img {
							width: 180rpx;
							height: 180rpx;
							border-radius: 10rpx;
							margin-right: 30rpx;
						}

						.product-name {
							font-size: 26rpx;
							color: #333;
							height: 68rpx;
							line-height: 34rpx;
							display: -webkit-box;
							overflow: hidden;
							text-overflow: ellipsis;
							word-break: break-all;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
						}

						.product-sku {
							font-size: 24rpx;
							font-weight: 500;
							color: #999;
							margin-left: -20rpx;
							width: 100%;
							display: flex;
							flex-direction: row;
						}

						.price-sku-box {
							width: 100%;
							display: flex;
							flex-direction: row;
							justify-content: space-between;

							.product-price {
								font-size: 32rpx;
								color: #C83732;
								font-weight: 400;

								.fuhao {
									font-size: 28rpx;
								}
							}

							.product-num {
								font-size: 28rpx;
								color: #999;
								font-weight: 400;
							}
						}
					}

					.adressTips {
						margin-bottom: 19rpx;
						color: #D53912;
					}

					.delivery-way-box {
						display: flex;
						flex-direction: column;
						border: 2rpx solid #E4E5E6;
						padding: 20rpx;
						margin-bottom: 20rpx;
						box-sizing: content-box;
					}

					.discount-item1 {
						width: 100%;
						box-sizing: border-box;
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: space-between;
						background: white;
						padding: 20rpx;
						border: 2rpx solid #E4E5E6;
					}

					.order-total-box {
						padding: 20rpx 0;
						text-align: right;

						.total-num {
							font-size: 26rpx;
							color: #333;
						}

						.total-price {
							font-size: 46rpx;
							color: #333333;
						}

						.ml10 {
							margin-left: 10rpx;
						}
					}
				}
			}
		}

		.discount-item {
			width: 100%;
			height: 98rpx;
			box-sizing: border-box;
			margin: 20rpx 0 0;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			padding: 0 20rpx;
			background: white;
		}

		.integralPayBox {
			margin: 20rpx 0 0;

			.integralBg {
				height: 98rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background: #FFFFFF;
				padding: 0 20rpx;

				.maxIntegral /deep/ .uni-checkbox-input {
					width: 30rpx;
					height: 30rpx;
				}

				.maxIntegral /deep/ .uni-checkbox-input-checked:before {
					font-size: 30rpx;
				}

				.maxIntegral /deep/ .uni-checkbox-input-checked {
					border: 2rpx solid #C5AA7B !important;
				}
			}
		}

		.order-flow-box {
			margin-top: 20rpx;
			display: flex;
			flex-direction: column;

			.flow-word {
				font-size: 24rpx;
				color: #999;
				display: flex;
				flex-direction: column;
			}

			.mt25 {
				margin-top: 20rpx;
			}

			.mt50 {
				margin-top: 30rpx;
				margin-bottom: 20rpx;
			}
		}
	}

	.order-confirm-box {
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #fff;
		padding: 30rpx;
		box-sizing: border-box;

		.num-box {
			font-size: 30rpx;
			color: #999;
		}

		.total {
			color: #333;
		}

		.price {
			color: #ff7911;
			font-weight: bold;
		}

		.btn {
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			background: #eee;
			font-size: 28rpx;
			color: #FFEBC4;
			text-align: center;
			margin-top: 20rpx;
		}

		.btn.active {
			background: #333333;
			color: #FFEBC4;
		}

		.btn.unActive {
			background: #333333;
			color: #FFEBC4;
			opacity: 0.7;
		}
	}

	.activity-con {
		.activity-box {
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 1000rpx;

			.activity-coupon-box {
				display: flex;
				flex-direction: column;
				width: 100%;
				overflow: auto;
				flex: 1;

				.content-box {
					width: 100%;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					padding: 30rpx;
				}
			}
		}
	}
}
</style>
