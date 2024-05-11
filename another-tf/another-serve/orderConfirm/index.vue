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
				<view class="address-box" @click="go(`/another-tf/another-serve/address/index?isSelect=1`)">
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
							<view v-for="skuItem in item.skus" :key="skuItem.productId" class="order-info-item">
								<image :src="common.seamingImgUrl(skuItem.image)" class="product-img"></image>
								<view>
									<text class="product-name">{{ skuItem.productName }}</text>
									<view class="product-sku">
										<view v-for="(vItem, index) in skuItem.values">
											<label class="mar-left-20">{{ vItem }}</label>
										</view>
									</view>
									<view class="price-sku-box flex-display flex-sp-between">
										<view class="product-price">
											<text class="fuhao">￥</text>
											{{ skuItem.price }}
										</view>
										<view class="product-num">x {{ skuItem.number }}</view>
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
											<text v-if="item.distribution.distributionPrice" style="white-space: nowrap;">
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
						<view v-if="item.shopCoupons.length" class="discount-item1" @click="handleShowShopCoupons(item, sIndex)">
							<view class="discount-label">店铺优惠</view>
							<view class="discount-info-box flex-items">
								<view v-if="item.currentCoupon && (item.currentCoupon.couponType === 1)" class="discount-info2">
									-￥{{ item.currentCoupon.reduceMoney }}
								</view>
								<view v-if="item.currentCoupon && (item.currentCoupon.couponType === 2)" class="discount-info2">
									{{ item.currentCoupon.reduceMoney }}折券
								</view>
								<tui-icon name="arrowright" :size="30" unit="rpx" color="#999999" margin="0 0 0 20rpx"></tui-icon>
							</view>
						</view>
						<view class="order-total-box">
							<text class="total-num">共{{ item.number }}件</text>
							<text class="total-num ml10">总计</text>
							<text v-if="item.totalAfterDiscount" class="total-price ml10">
								¥{{
									(parseFloat(item.totalAfterDiscount) + parseFloat(item.distribution.distributionPrice || 0)).toFixed(2)
								}}
							</text>
							<text v-else class="total-price ml10">¥0.00</text>
						</view>
					</view>
				</view>
			</view>
			<view class="discount-item" @click="handleShowDiscount">
				<view class="discount-label">平台优惠</view>
				<view class="discount-info-box flex-items">
					<view v-if="selectedPlatformCoupon && selectedPlatformCoupon.couponId" class="discount-info2">
						<text v-if="selectedPlatformCoupon.couponType === 2">{{ selectedPlatformCoupon.reduceMoney }}折</text>
						<text v-else> -￥{{ (parseInt((selectedPlatformCoupon.reduceMoney || 0) * 100) / 100).toFixed(2) }}</text>
					</view>
					<view v-else-if="!settlement.coupons || !settlement.coupons.length" class="discount-label">无</view>
					<view v-else class="discount-label">不使用</view>
					<tui-icon name="arrowright" :size="30" unit="rpx" color="#999999" margin="0 0 0 20rpx"></tui-icon>
				</view>
			</view>
			<!-- 积分支付 -->
			<view v-if="integralNum" class="integralPayBox">
				<view class="integralBg">
					<view class="integralTit fs26">可用 {{ integralNum }} 积分抵扣 {{ (integralNum * integralRatio).toFixed(2) }} 元</view>
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
				@choose="handleChooseVoucher({ settlement, e: $event, selectedPlatformCoupon, selectedShopCouponList, selectIntegral, voucherObj })"
			></VoucherUse>

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
				<text class="num-box">共{{ settlement.shops.reduce((total, value, index, arr) => total + value.number, 0) }}件</text>
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
			<!-- 是否在商家配置范围内地址 -->
			<button v-if="settlement.shops.some(i => i.receiveNotMatch)" class="btn unActive" type="default" :disabled="false">
				提交订单
			</button>
			<button
				v-else class="btn active"
				@click="resolveSubmitOrder({ settlement, userAddressInfo, skuItemMsgList, skuItemInfo, selectedPlatformCoupon, selectIntegral, integralRatio, totalPrice, voucherObj, payInfo })"
			>
				提交订单
			</button>
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
										v-for="(cItem, couponIndex) in settlement.coupons" :key="couponIndex"
										style="width: 48%;padding: 20rpx;margin-bottom: 30rpx;background-color: #eeeeee;border-radius: 100rpx;color: #C5AA7B;text-align: center;box-sizing: border-box;"
										@click="handlePlatformCouponItemTap({ settlement, couponIndex, isShowDiscount, selectedPlatformCoupon, selectedShopCouponList })"
									>
										<view style="font-size: 40rpx;padding-top: 30rpx;">
											<text v-if="cItem.couponType === 1">￥{{ cItem.reduceMoney }}</text>
											<text v-else>{{ cItem.reduceMoney }}折券</text>
										</view>
										<view style="font-size:22rpx;margin-top: 20rpx;color: #999999;">
											{{ cItem.startTime && cItem.startTime.split(' ')[0].split('-').join('.')
											}}-{{ cItem.endTime && cItem.endTime.split(' ')[0].split('-').join('.') }}
										</view>
										<view style="margin-top: 10rpx;font-size: 24rpx;color: #999999;">
											满{{ cItem.fullMoney }}元可用
										</view>
										<tui-icon
											v-if="cItem.checked" name="circle-fill" :size="40" unit="rpx"
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
		<tui-bottom-popup class="activity-con" :show="isShowShopCoupons" @close="isShowShopCoupons = false">
			<view class="activity-box">
				<view style="display: flex;justify-content: flex-end;padding: 12rpx;border-bottom: solid 1rpx #EEEEEE;">
					<tui-icon name="close" :size="50" unit="rpx" color="#999999" @click="isShowShopCoupons = false"></tui-icon>
				</view>
				<view class="activity-coupon-box">
					<scroll-view scroll-y style="height: 900rpx;">
						<view class="content-box">
							<view v-if="shopCouponsList && shopCouponsList.length">
								<view style="font-size: 28rpx;color: #333333;">可用优惠券列表</view>
								<view style="display: flex;flex-wrap: wrap;justify-content: space-between;margin-top: 10rpx;">
									<view
										v-for="(cItem, couponIndex) in shopCouponsList" :key="cItem.id"
										style="width: 48%;padding: 20rpx;margin-bottom: 30rpx;background-color: #eeeeee;border-radius: 100rpx;color: #C5AA7B;text-align: center;box-sizing: border-box;"
										@click="handleShopCouponItemTap({ settlement, shopIndex, couponIndex, isShowShopCoupons, selectedShopCouponList, selectedPlatformCoupon })"
									>
										<view style="font-size: 40rpx;padding-top: 30rpx;">
											<text v-if="cItem.couponType === 1">￥{{ cItem.reduceMoney }}</text>
											<text v-else>{{ cItem.reduceMoney }}折券</text>
										</view>
										<view style="font-size:22rpx;margin-top: 10rpx;color: #999999;">
											{{ cItem.startTime && cItem.startTime.split(' ')[0].split('-').join('.')
											}}-{{ cItem.endTime && cItem.endTime.split(' ')[0].split('-').join('.') }}
										</view>
										<view style="margin-top: 10rpx;font-size: 24rpx;color: #999999;">
											满{{ cItem.fullMoney }}元可用
										</view>
										<tui-icon
											v-if="cItem.checked" name="circle-fill" :size="40" unit="rpx"
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
import { resolveGetOrderSettlement, resolveIntegralSelect, resolveCalcOrderTotal, resolveShopCouponItemSelect, resolvePlatformCouponItemSelect, resolveVoucherSelect, resolveSubmitOrder } from '../../../utils'
import { getQueryDictByNameApi } from '../../../api/anotherTFInterface'
import { T_SKU_ITEM_MSG_LIST, T_SKU_ITEM_INFO, T_PAY_ORDER } from '../../../constant'

export default {
	name: 'OrderConfirm',
	data() {
		return {
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
			isShowDiscount: false,
			shopIndex: 0, // 选中的店铺使用店铺优惠券
			selectedPlatformCoupon: { couponId: '' }, // { couponId: 0, ifAdd: 1, reduceMoney: 0, couponType, useMoney }
			// 积分相关
			selectIntegral: true,
			integralNum: 0,
			integralRatio: '' // 积分兑换比例。总积分可减多少元=integralNum*integralRatio
		}
	},
	onLoad(options) {
		this.fromType = options.type
		this.brandId = options.brandId || ''
	},
	onShow() {
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
	},
	methods: {
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
		handleShowDiscount() {
			if (this.voucherObj.voucherId) return this.$showToast('已选择代金券，无法使用其它优惠')
			if (this.settlement.coupons && this.settlement.coupons.length) {
				if (this.selectedShopCouponList.length) this.$showToast('不可叠加已选择的店铺券')
				this.isShowDiscount = true
			} else {
				this.$showToast('暂无可用优惠券')
			}
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
		// 点击店铺优惠券
		handleShopCouponItemTap(obj) {
			const shopCouponItemSelectObj = resolveShopCouponItemSelect({
				settlement: obj.settlement,
				shopIndex: obj.shopIndex,
				couponIndex: obj.couponIndex,
				isShowShopCoupons: obj.isShowShopCoupons,
				selectedShopCouponList: obj.selectedShopCouponList,
				selectedPlatformCoupon: obj.selectedPlatformCoupon
			})
			this.settlement = shopCouponItemSelectObj.settlement
			this.isShowShopCoupons = shopCouponItemSelectObj.isShowShopCoupons
			this.selectedShopCouponList = shopCouponItemSelectObj.selectedShopCouponList
			if (shopCouponItemSelectObj.isSuccess) this.getOrderTotal({ settlement: this.settlement, selectedPlatformCoupon: this.selectedPlatformCoupon, integralRatio: this.integralRatio, selectIntegral: this.selectIntegral, voucherObj: this.voucherObj })
		},
		// 平台优惠券选择
		handlePlatformCouponItemTap(obj) {
			const platformCouponItemSelectObj = resolvePlatformCouponItemSelect({
				settlement: obj.settlement,
				couponIndex: obj.couponIndex,
				isShowDiscount: obj.isShowDiscount,
				selectedPlatformCoupon: obj.selectedPlatformCoupon,
				selectedShopCouponList: obj.selectedShopCouponList
			})
			this.settlement = platformCouponItemSelectObj.settlement
			this.isShowDiscount = platformCouponItemSelectObj.isShowDiscount
			if (platformCouponItemSelectObj.isSuccess) this.getOrderTotal({ settlement: this.settlement, selectedPlatformCoupon: this.selectedPlatformCoupon, integralRatio: this.integralRatio, selectIntegral: this.selectIntegral, voucherObj: this.voucherObj })
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
