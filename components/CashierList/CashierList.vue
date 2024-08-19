<template>
	<view class="cashier-list-content" :style="{ padding, borderRadius: radius }">
		<view v-if="show">
			<slot name="header" :payment-list="paymentList"></slot>
			<tui-radio-group :value="paymentMode" @change="handleChangePaymentMode">
				<view
					v-for="payment in paymentList" :key="payment.paymentMode" class="cashier"
					@click="handleClickPaymentMode(payment)"
				>
					<view class="cashier-item">
						<view class="icon-text">
							<image style="width: 50rpx;height: 50rpx;margin-right: 15rpx;" :src="payment.icon" mode="widthFix" />
							<text>{{ payment.label }}</text>
							<text v-if="(payment.paymentMode === '7')">
								（佣金：{{
									Number.parseFloat(Number(pricePlatformInfo.commissionPrice || 0)).toFixed(2) }}）
							</text>
							<text v-if="(payment.paymentMode === '5')">
								（余额：{{ Number.parseFloat(Number(pricePlatformInfo.rechargePrice || 0)).toFixed(2) }}）
							</text>
							<text v-if="(payment.paymentMode === '8')">
								（余额：{{ Number.parseFloat(Number(pricePlatformInfo.beeCoinPrice || 0)).toFixed(2) }}）
							</text>
							<text v-if="(payment.paymentMode === '6')">（余额：{{ priceShopInfo.current }}）</text>
							<text v-if="(payment.paymentMode === '11')">（余额：{{ voucherPay.userVoucherDeductLimit }}）</text>
							<text v-if="(paymentMode === '3') && (paymentMode === payment.paymentMode)">
								（手续费：￥{{ flowerInfo.hbServiceChargeTotal }}）
							</text>
						</view>
						<view>
							<tui-icon v-if="payment.disabled" name="circle" :size="18" color="#d4d4d4"></tui-icon>
							<tui-radio
								v-else :checked="false" :disabled="payment.disabled" :value="payment.paymentMode"
								color="#ef530e" border-color="#979797" :scale-ratio="0.8"
							>
							</tui-radio>
						</view>
					</view>
					<view v-if="paymentMode === payment.paymentMode">
						<!-- 花呗分期选择 -->
						<view v-if="paymentMode === '3'" style="padding: 4rpx 20rpx 10rpx;">
							<tui-radio-group :value="flowerInfo.hbByStagesPeriods" @change="handleChangePeriods">
								<view v-for="(flowerItem, index) in flowerInfo.hbByStagesList" :key="index">
									<view style="display: flex;align-items: center;justify-content: space-between;padding: 14rpx 0;">
										<view>
											{{ flowerItem.numberOfStages }}期（￥{{ flowerItem.price }}/期）
										</view>
										<view style="display: flex;align-items: center;font-size: 24rpx;">
											手续费：￥{{ flowerItem.serviceCharge }}/期
											<tui-radio
												style="margin-left: 15rpx;" :checked="false" :disabled="flowerItem.disabled"
												:value="flowerItem.numberOfStages" color="#c5aa7b" border-color="#999"
											>
											</tui-radio>
										</view>
									</view>
								</view>
							</tui-radio-group>
						</view>
						<!-- 代金券选择 -->
						<view v-if="paymentMode === '11'">
							<view v-if="voucherPay.voucherList && voucherPay.voucherList.length">
								<view v-show="voucherPay.voucherList.length !== 1" style="padding: 4rpx 20rpx 10rpx;">
									<tui-radio-group :value="String(voucherInfo.voucherId)" @change="handleChangeVoucher">
										<tui-label v-for="(voucherItem, index) in voucherPay.voucherList" :key="index">
											<tui-list-cell padding="14rpx 0">
												<view>
													<tui-radio
														:checked="voucherInfo.voucherId === voucherItem.platformVoucherId"
														:value="String(voucherItem.platformVoucherId)" color="#c5aa7b" border-color="#999"
													>
													</tui-radio>
													<text style="margin-left:10rpx;">
														{{ voucherItem.voucherName }}（抵扣：{{ voucherItem.paymentRatio }}：1）
													</text>
												</view>
											</tui-list-cell>
										</tui-label>
									</tui-radio-group>
								</view>
							</view>
							<view v-else style="padding-bottom: 4rpx;">
								<tui-no-data :fixed="false" style="padding-top: 10rpx;">暂无可选代金券～</tui-no-data>
							</view>
						</view>
					</view>
				</view>
			</tui-radio-group>
		</view>
	</view>
</template>

<script>
import { getOrderHuabeiConfigApi, getPricePlatformAllApi, getRechargeTotalCustomersApi, getShopCheckListDetailApi } from '../../api/anotherTFInterface'

export default {
	name: 'CashierList',
	props: {
		padding: {
			type: String,
			default: '0rpx 15rpx'
		},
		missingPriceText: {
			type: String,
			default: '缺少金额'
		},
		radius: {
			type: String,
			default: '0'
		},
		pricePay: {
			type: Number,
			default: 0
		},
		// 是否显示，用于默认某一个支付
		show: {
			type: Boolean,
			default: false
		},
		showWechatPay: {
			type: Boolean,
			default: false
		},
		showAliPay: {
			type: Boolean,
			default: false
		},
		showHuabeiPay: {
			type: Boolean,
			default: false
		},
		// 惠市宝支付。含义为商家Id或是否支持。只支持单个商家。如果必定支持惠市宝支付，则为true。不支持则为0或false。
		huiShiBaoPay: {
			type: [Boolean, String, Number],
			default: ''
		},
		showTonglianPay: {
			type: Boolean,
			default: true
		},
		// 代金券支付
		voucherPay: {
			type: Object,
			// 所有商品可使用多少代金券抵扣，用户代金券余额，是否可以使用代金券支付，不能使用代金券支付的说明
			default: () => ({ voucherTotalAll: 0, userVoucherDeductLimit: 0, voucherList: [], isCanVoucher: false, noVoucherText: '无法使用代金券支付' })
		},
		// 佣金支付
		showCommissionPay: {
			type: Boolean,
			default: false
		},
		// 平台余额支付
		showPlatformPay: {
			type: Boolean,
			default: false
		},
		// 消费金支付
		showTransactionPay: {
			type: Boolean,
			default: false
		},
		// 用户的商家充值的余额支付
		shopIdPay: { // 某商家的‘用户的商家充值的余额支付’对应的商家Id
			type: [String, Number],
			default: ''
		}
	},
	data() {
		return {
			paymentMode: '', // 支付方式 1微信 2支付宝 3花呗分期
			paymentList: [],
			// 花呗相关
			flowerInfo: {
				huabeiChargeType: 0, // 花呗手续费支付方式 1-商户支付 2-用户支付 后端接口返回
				hbByStagesPeriods: '-1', // 花呗分期期数 3 6 12
				hbByStagesList: [
					{
						rate: 0,
						price: 0,
						numberOfStages: '3',
						serviceCharge: 0,
						disabled: false
					},
					{
						rate: 0,
						price: 0,
						numberOfStages: '6',
						serviceCharge: 0,
						disabled: false
					},
					{
						rate: 0,
						price: 0,
						numberOfStages: '12',
						serviceCharge: 0,
						disabled: false
					}
				], // 花呗手续费比例列表 【{3期}，{6期}，{12期}】
				hbServiceChargeTotal: 0 // 花呗支付总手续费
			},
			// 代金券信息相关
			voucherInfo: {
				voucherId: ''
			},
			// 平台余额相关
			pricePlatformInfo: {
				rechargePrice: 0,
				commissionPrice: 0,
				beeCoinPrice: 0
			},
			// 商家的其它详情信息相关
			detailShopInfo: {
				hsbMrchId: ''
			},
			// 用户的商家充值的余额相关
			priceShopInfo: {
				current: 0
			}
		}
	},
	watch: { // 对于watch，按书写顺序执行（如果由同步代码触发）。shopIdPay->pricePay
		huiShiBaoPay: {
			handler(newValue, oldValue) {
				if (newValue && (newValue !== oldValue)) {
					uni.showLoading()
					if (!this.paymentList.find((item) => item.paymentMode === '9')) {
						this.paymentList.unshift({
							label: '惠市宝支付（支持微信/支付宝/银联）',
							paymentMode: '9',
							icon: require('../../static/images/user/pay/huishibao.png'),
							disabled: true
						})
					}
					if (newValue === true) {
						this.detailShopInfo = { hsbMrchId: '0' }
						this.paymentList.find((item) => item.paymentMode === '9').disabled = !this.pricePay || !this.detailShopInfo.hsbMrchId
						// if (this.paymentList.find((item) => item.paymentMode === '9').disabled && (this.paymentMode === '9')) this.handleSetDisable()
						this.handleSetDisable()
						this.handleNoticeFather()
						uni.hideLoading()
					} else {
						getShopCheckListDetailApi({ shopIds: this.huiShiBaoPay })
							.then((res) => {
								this.detailShopInfo = res.data.shopCheckList[0] || { hsbMrchId: '' }
								this.paymentList.find((item) => item.paymentMode === '9').disabled = !this.pricePay || !this.detailShopInfo.hsbMrchId
								// if (this.paymentList.find((item) => item.paymentMode === '9').disabled && (this.paymentMode === '9')) this.handleSetDisable() // 加上该判断则是不主动选择。但当其它默认不行的时候，会被动备用选择
								this.handleSetDisable()
								if (!this.detailShopInfo.hsbMrchId && this.paymentList.find((item) => item.paymentMode === '9')) this.paymentList.splice(this.paymentList.findIndex((item) => item.paymentMode === '9'), 1)
								this.handleNoticeFather()
								uni.hideLoading()
							})
							.catch((e) => {
								if (this.paymentMode === '9') this.handleSetDisable()
								if (this.paymentList.find((item) => item.paymentMode === '9')) this.paymentList.splice(this.paymentList.findIndex((item) => item.paymentMode === '9'), 1)
								this.handleNoticeFather()
								uni.hideLoading()
							})
					}
				} else if (!newValue) {
					if (this.paymentMode === '9') this.handleSetDisable()
					if (this.paymentList.find((item) => item.paymentMode === '9')) this.paymentList.splice(this.paymentList.findIndex((item) => item.paymentMode === '9'), 1)
					this.handleNoticeFather()
				}
			},
			immediate: false,
			deep: true
		},
		showTonglianPay: {
			handler(newValue, oldValue) {
				if (newValue) {
					if (!this.paymentList.find((item) => item.paymentMode === '4')) {
						this.paymentList.push({
							label: '通联支付（微信）',
							paymentMode: '4',
							icon: require('../../static/images/user/pay/tonglian.png'),
							disabled: true
						})
					}
					this.handleSetDisable()
					this.handleNoticeFather()
				} else {
					if (this.paymentMode === '4') this.handleSetDisable()
					if (this.paymentList.find((item) => item.paymentMode === '4')) this.paymentList.splice(this.paymentList.findIndex((item) => item.paymentMode === '4'), 1)
					this.handleNoticeFather()
				}
			},
			immediate: false,
			deep: true
		},
		voucherPay: {
			handler(newValue, oldValue) {
				if (newValue.voucherTotalAll !== oldValue.voucherTotalAll) {
					if (newValue.voucherTotalAll) {
						if (!this.paymentList.find((item) => item.paymentMode === '11')) {
							this.paymentList.push({
								label: '代金券支付',
								paymentMode: '11',
								icon: require('../../static/images/user/pay/daijinquan.png'),
								disabled: true
							})
						}
						this.paymentList.find((item) => item.paymentMode === '11').disabled = !this.pricePay || !this.voucherPay.isCanVoucher
						// if (this.paymentList.find((item) => item.paymentMode === '11').disabled && (this.paymentMode === '11')) this.handleSetDisable()
						this.handleSetDisable()
						this.handleNoticeFather()
					} else if (!newValue.voucherTotalAll) {
						if (this.paymentMode === '11') this.handleSetDisable()
						if (this.paymentList.find((item) => item.paymentMode === '11')) this.paymentList.splice(this.paymentList.findIndex((item) => item.paymentMode === '11'), 1)
						this.handleNoticeFather()
					}
				}
			},
			immediate: false,
			deep: true
		},
		showCommissionPay: {
			handler(newValue, oldValue) {
				if (newValue) {
					uni.showLoading()
					if (!this.paymentList.find((item) => item.paymentMode === '7')) {
						this.paymentList.push({
							label: '佣金支付',
							paymentMode: '7',
							icon: require('../../static/images/user/pay/yongjin.png'),
							disabled: true
						})
					}
					getPricePlatformAllApi({})
						.then((res) => {
							this.pricePlatformInfo = res.data
							this.paymentList.find((item) => item.paymentMode === '7').disabled = !this.pricePay || (this.pricePay > this.pricePlatformInfo.commissionPrice)
							if (this.paymentList.find((item) => item.paymentMode === '7').disabled && (this.paymentMode === '7')) this.handleSetDisable()
							this.handleNoticeFather()
							uni.hideLoading()
						})
						.catch((e) => {
							if (this.paymentMode === '7') this.handleSetDisable()
							if (this.paymentList.find((item) => item.paymentMode === '7')) this.paymentList.splice(this.paymentList.findIndex((item) => item.paymentMode === '7'), 1)
							this.handleNoticeFather()
							uni.hideLoading()
						})
				} else {
					if (this.paymentMode === '7') this.handleSetDisable()
					if (this.paymentList.find((item) => item.paymentMode === '7')) this.paymentList.splice(this.paymentList.findIndex((item) => item.paymentMode === '7'), 1)
					this.handleNoticeFather()
				}
			},
			immediate: false,
			deep: true
		},
		showPlatformPay: {
			handler(newValue, oldValue) {
				if (newValue) {
					uni.showLoading()
					if (!this.paymentList.find((item) => item.paymentMode === '5')) {
						this.paymentList.push({
							label: '平台余额支付',
							paymentMode: '5',
							icon: require('../../static/images/user/pay/platform-pay.png'),
							disabled: true
						})
					}
					getPricePlatformAllApi({})
						.then((res) => {
							this.pricePlatformInfo = res.data
							this.paymentList.find((item) => item.paymentMode === '5').disabled = !this.pricePay || (this.pricePay > this.pricePlatformInfo.rechargePrice)
							if (this.paymentList.find((item) => item.paymentMode === '5').disabled && (this.paymentMode === '5')) this.handleSetDisable()
							this.handleNoticeFather()
							uni.hideLoading()
						})
						.catch((e) => {
							if (this.paymentMode === '5') this.handleSetDisable()
							if (this.paymentList.find((item) => item.paymentMode === '5')) this.paymentList.splice(this.paymentList.findIndex((item) => item.paymentMode === '5'), 1)
							this.handleNoticeFather()
							uni.hideLoading()
						})
				} else {
					if (this.paymentMode === '5') this.handleSetDisable()
					if (this.paymentList.find((item) => item.paymentMode === '5')) this.paymentList.splice(this.paymentList.findIndex((item) => item.paymentMode === '5'), 1)
					this.handleNoticeFather()
				}
			},
			immediate: false,
			deep: true
		},
		showTransactionPay: {
			handler(newValue, oldValue) {
				if (newValue) {
					uni.showLoading()
					if (!this.paymentList.find((item) => item.paymentMode === '8')) {
						this.paymentList.push({
							label: '消费金支付',
							paymentMode: '8',
							icon: require('../../static/images/user/pay/jiaoyijin.png'),
							disabled: true
						})
					}
					getPricePlatformAllApi({})
						.then((res) => {
							this.pricePlatformInfo = res.data
							this.paymentList.find((item) => item.paymentMode === '8').disabled = !this.pricePay || (this.pricePay > this.pricePlatformInfo.beeCoinPrice)
							if (this.paymentList.find((item) => item.paymentMode === '8').disabled && (this.paymentMode === '8')) this.handleSetDisable()
							this.handleNoticeFather()
							uni.hideLoading()
						})
						.catch((e) => {
							if (this.paymentMode === '8') this.handleSetDisable()
							if (this.paymentList.find((item) => item.paymentMode === '8')) this.paymentList.splice(this.paymentList.findIndex((item) => item.paymentMode === '8'), 1)
							this.handleNoticeFather()
							uni.hideLoading()
						})
				} else {
					if (this.paymentMode === '8') this.handleSetDisable()
					if (this.paymentList.find((item) => item.paymentMode === '8')) this.paymentList.splice(this.paymentList.findIndex((item) => item.paymentMode === '8'), 1)
					this.handleNoticeFather()
				}
			},
			immediate: false,
			deep: true
		},
		shopIdPay: {
			handler(newValue, oldValue) {
				// console.log(2222)
				if (newValue && (newValue !== oldValue)) {
					uni.showLoading()
					if (!this.paymentList.find((item) => item.paymentMode === '6')) {
						this.paymentList.push({
							label: '商家余额支付',
							paymentMode: '6',
							icon: require('../../static/images/user/pay/shop-id-pay.png'),
							disabled: true
						})
					}
					getRechargeTotalCustomersApi({ shopId: this.shopIdPay })
						.then((res) => {
							// console.log(3333)
							this.priceShopInfo = res.data
							this.paymentList.find((item) => item.paymentMode === '6').disabled = !this.pricePay || (this.pricePay > this.priceShopInfo.current)
							if (this.paymentList.find((item) => item.paymentMode === '6').disabled && (this.paymentMode === '6')) this.handleSetDisable()
							this.handleNoticeFather()
							uni.hideLoading()
						})
						.catch((e) => {
							if (this.paymentMode === '6') this.handleSetDisable()
							if (this.paymentList.find((item) => item.paymentMode === '6')) this.paymentList.splice(this.paymentList.findIndex((item) => item.paymentMode === '6'), 1)
							this.handleNoticeFather()
							uni.hideLoading()
						})
				} else if (!newValue) {
					if (this.paymentMode === '6') this.handleSetDisable()
					if (this.paymentList.find((item) => item.paymentMode === '6')) this.paymentList.splice(this.paymentList.findIndex((item) => item.paymentMode === '6'), 1)
					this.handleNoticeFather()
				}
			},
			immediate: false,
			deep: true
		},
		pricePay: {
			handler(newValue, oldValue) {
				// console.log(1111)
				if (newValue !== oldValue) {
					if (this.paymentMode === '3') {
						this.handleHbStagesAndPrice()
					}
					if (this.huiShiBaoPay) {
						if (this.paymentList.find((item) => item.paymentMode === '9')) {
							this.paymentList.find((item) => item.paymentMode === '9').disabled = !this.pricePay || !this.detailShopInfo.hsbMrchId
							if (this.paymentList.find((item) => item.paymentMode === '9').disabled && (this.paymentMode === '9')) this.handleSetDisable()
						}
					} else if (!this.huiShiBaoPay && (this.paymentMode === '9')) {
						this.handleSetDisable()
					}
					if (this.voucherPay.voucherTotalAll) {
						this.paymentList.find((item) => item.paymentMode === '11').disabled = !this.pricePay || !this.voucherPay.isCanVoucher
						if (this.paymentList.find((item) => item.paymentMode === '11').disabled && (this.paymentMode === '11')) this.handleSetDisable()
					} else if (!this.voucherPay.voucherTotalAll && (this.paymentMode === '11')) {
						this.handleSetDisable()
					}
					if (this.showCommissionPay) {
						this.paymentList.find((item) => item.paymentMode === '7').disabled = !this.pricePay || (this.pricePay > this.pricePlatformInfo.commissionPrice)
						if (this.paymentList.find((item) => item.paymentMode === '7').disabled && (this.paymentMode === '7')) this.handleSetDisable()
					} else if (!this.showCommissionPay && (this.paymentMode === '7')) {
						this.handleSetDisable()
					}
					if (this.showPlatformPay) {
						this.paymentList.find((item) => item.paymentMode === '5').disabled = !this.pricePay || (this.pricePay > this.pricePlatformInfo.rechargePrice)
						if (this.paymentList.find((item) => item.paymentMode === '5').disabled && (this.paymentMode === '5')) this.handleSetDisable()
					} else if (!this.showPlatformPay && (this.paymentMode === '5')) {
						this.handleSetDisable()
					}
					if (this.showTransactionPay) {
						this.paymentList.find((item) => item.paymentMode === '8').disabled = !this.pricePay || (this.pricePay > this.pricePlatformInfo.beeCoinPrice)
						if (this.paymentList.find((item) => item.paymentMode === '8').disabled && (this.paymentMode === '8')) this.handleSetDisable()
					} else if (!this.showTransactionPay && (this.paymentMode === '8')) {
						this.handleSetDisable()
					}
					if (this.shopIdPay) { // pricePay（明显直接）依赖shopIdPay，所以pricePay放后面
						if (this.paymentList.find((item) => item.paymentMode === '6')) { // 因为pricePay放后面，所以上面的shopIdPay的监听的同步代码里必然会有该项。这里严谨点
							this.paymentList.find((item) => item.paymentMode === '6').disabled = !this.pricePay || (this.pricePay > this.priceShopInfo.current)
							if (this.paymentList.find((item) => item.paymentMode === '6').disabled && (this.paymentMode === '6')) this.handleSetDisable()
						}
					} else if (!this.shopIdPay && (this.paymentMode === '6')) {
						this.handleSetDisable()
					}
					this.handleNoticeFather()
				}
			},
			immediate: false,
			deep: true
		}
	},
	created() {
		this.paymentList = []
		if (this.showWechatPay) {
			this.paymentList.push({
				label: '微信支付',
				paymentMode: '1',
				icon: require('../../static/images/user/pay/wechat_pay.png'),
				disabled: true
			})
			this.handleSetDisable()
			this.handleNoticeFather()
		}
		if (this.showAliPay) {
			this.paymentList.push({
				label: '支付宝支付',
				paymentMode: '2',
				icon: require('../../static/images/user/pay/alipay.png'),
				disabled: true
			})
			this.handleSetDisable()
			this.handleNoticeFather()
		}
		if (this.showHuabeiPay) {
			this.paymentList.push({
				label: '花呗分期',
				paymentMode: '3',
				icon: require('../../static/images/user/pay/huabei.png'),
				disabled: true
			})
			// 获取花呗分期配置
			getOrderHuabeiConfigApi({})
				.then((res) => {
					this.flowerInfo.huabeiChargeType = res.data.huabeiChargeType
					if (this.flowerInfo.huabeiChargeType === 1) { // 如果后端返回的是用户支付手续费，设置费率信息
						res.data.huabeiFeeRateList.forEach((rate, index) => {
							this.flowerInfo.hbByStagesList[index].rate = rate
						})
					}
					this.handleSetDisable()
					this.handleNoticeFather()
				})
		}
		if (this.huiShiBaoPay) {
			this.paymentList.unshift({
				label: '惠市宝支付（支持微信/支付宝/银联）',
				paymentMode: '9',
				icon: require('../../static/images/user/pay/huishibao.png'),
				disabled: true
			})
			if (this.huiShiBaoPay === true) {
				this.detailShopInfo = { hsbMrchId: '0' }
				this.paymentList.find((item) => item.paymentMode === '9').disabled = !this.pricePay || !this.detailShopInfo.hsbMrchId
				this.handleSetDisable()
				this.handleNoticeFather()
			} else {
				getShopCheckListDetailApi({ shopIds: this.huiShiBaoPay })
					.then((res) => {
						this.detailShopInfo = res.data.shopCheckList[0] || { hsbMrchId: '' }
						this.paymentList.find((item) => item.paymentMode === '9').disabled = !this.pricePay || !this.detailShopInfo.hsbMrchId
						this.handleSetDisable()
						if (!this.detailShopInfo.hsbMrchId && this.paymentList.find((item) => item.paymentMode === '9')) this.paymentList.splice(this.paymentList.findIndex((item) => item.paymentMode === '9'), 1)
						this.handleNoticeFather()
					})
			}
		}
		if (this.showTonglianPay) {
			this.paymentList.push({
				label: '通联支付（微信）',
				paymentMode: '4',
				icon: require('../../static/images/user/pay/tonglian.png'),
				disabled: true
			})
			this.handleSetDisable()
			this.handleNoticeFather()
		}
		if (this.voucherPay.voucherTotalAll) {
			this.paymentList.push({
				label: '代金券支付',
				paymentMode: '11',
				icon: require('../../static/images/user/pay/daijinquan.png'),
				disabled: true
			})
			this.handleSetDisable()
			this.handleNoticeFather()
		}
		if (this.showCommissionPay || this.showPlatformPay || this.showTransactionPay) {
			if (this.showCommissionPay) {
				this.paymentList.push({
					label: '佣金支付',
					paymentMode: '7',
					icon: require('../../static/images/user/pay/yongjin.png'),
					disabled: true
				})
			}
			if (this.showPlatformPay) {
				this.paymentList.push({
					label: '平台余额支付',
					paymentMode: '5',
					icon: require('../../static/images/user/pay/platform-pay.png'),
					disabled: true
				})
			}
			if (this.showTransactionPay) {
				this.paymentList.push({
					label: '消费金支付',
					paymentMode: '8',
					icon: require('../../static/images/user/pay/jiaoyijin.png'),
					disabled: true
				})
			}
			getPricePlatformAllApi({})
				.then((res) => {
					this.pricePlatformInfo = res.data
					if (this.showCommissionPay) {
						this.paymentList.find((item) => item.paymentMode === '7').disabled = !this.pricePay || (this.pricePay > this.pricePlatformInfo.commissionPrice)
					}
					if (this.showPlatformPay) {
						this.paymentList.find((item) => item.paymentMode === '5').disabled = !this.pricePay || (this.pricePay > this.pricePlatformInfo.rechargePrice)
					}
					if (this.showTransactionPay) {
						this.paymentList.find((item) => item.paymentMode === '8').disabled = !this.pricePay || (this.pricePay > this.pricePlatformInfo.beeCoinPrice)
					}
					this.handleSetDisable()
					this.handleNoticeFather()
				})
		}
		if (this.shopIdPay) {
			this.paymentList.push({
				label: '商家余额支付',
				paymentMode: '6',
				icon: require('../../static/images/user/pay/shop-id-pay.png'),
				disabled: true
			})
			getRechargeTotalCustomersApi({ shopId: this.shopIdPay })
				.then((res) => {
					this.priceShopInfo = res.data
					this.paymentList.find((item) => item.paymentMode === '6').disabled = !this.pricePay || (this.pricePay > this.priceShopInfo.current)
					this.handleSetDisable()
					this.handleNoticeFather()
				})
		}
	},
	methods: {
		// 根据环境更改可选支付项
		// eslint-disable-next-line complexity
		handleSetDisable() {
			// this.paymentMode = ''
			// if (this.huiShiBaoPay) {
			// 	if (this.paymentList.find((item) => item.paymentMode === '9')) {
			// 		this.paymentList.find((item) => item.paymentMode === '9').disabled = !this.pricePay || !this.detailShopInfo.hsbMrchId
			// 		if (!this.paymentList.find((item) => item.paymentMode === '9').disabled) this.paymentMode = '9'
			// 	}
			// } else if (this.showTonglianPay) {
			// 	if (this.paymentList.find((item) => item.paymentMode === '4')) {
			// 		this.paymentList.find((item) => item.paymentMode === '4').disabled = false
			// 		this.paymentMode = '4'
			// 	}
			// } else if (this.voucherPay.voucherTotalAll) {
			// 	if (this.paymentList.find((item) => item.paymentMode === '11')) {
			// 		this.paymentList.find((item) => item.paymentMode === '11').disabled = !this.pricePay || !this.voucherPay.isCanVoucher
			// 		if (!this.paymentList.find((item) => item.paymentMode === '11').disabled) this.paymentMode = '11'
			// 	}
			// } else {
			// 	// #ifdef H5
			// 	// #endif
			// 	// #ifdef APP
			// 	// #endif
			// 	// #ifdef MP-WEIXIN
			// 	// this.paymentList.find((item) => item.paymentMode === '1').disabled = false
			// 	// this.paymentMode = '1'
			// 	// #endif
			// 	// #ifdef MP-ALIPAY
			// 	// this.paymentList.find((item) => item.paymentMode === '2').disabled = false
			// 	// if(this.flowerInfo.huabeiChargeType) this.paymentList.find((item) => item.paymentMode === '3').disabled = false
			// 	// this.paymentMode = '2'
			// 	// #endif
			// }

			// this.paymentMode = ''
			// if (this.voucherPay.voucherTotalAll) {
			// 	if (this.paymentList.find((item) => item.paymentMode === '11')) {
			// 		this.paymentList.find((item) => item.paymentMode === '11').disabled = !this.pricePay || !this.voucherPay.isCanVoucher
			// 		if (!this.paymentList.find((item) => item.paymentMode === '11').disabled) this.paymentMode = '11'
			// 	}
			// }
			// if (this.showTonglianPay) {
			// 	if (this.paymentList.find((item) => item.paymentMode === '4')) {
			// 		this.paymentList.find((item) => item.paymentMode === '4').disabled = false
			// 		this.paymentMode = '4'
			// 	}
			// }
			// if (this.huiShiBaoPay) {
			// 	if (this.paymentList.find((item) => item.paymentMode === '9')) {
			// 		this.paymentList.find((item) => item.paymentMode === '9').disabled = !this.pricePay || !this.detailShopInfo.hsbMrchId
			// 		if (!this.paymentList.find((item) => item.paymentMode === '9').disabled) this.paymentMode = '9'
			// 	}
			// }

			this.paymentMode = ''
			if (this.huiShiBaoPay) {
				if (this.paymentList.find((item) => item.paymentMode === '9')) {
					this.paymentList.find((item) => item.paymentMode === '9').disabled = !this.pricePay || !this.detailShopInfo.hsbMrchId
					if (!this.paymentList.find((item) => item.paymentMode === '9').disabled) this.paymentMode = '9'
				}
			}
			if (!this.paymentMode) {
				if (this.showTonglianPay) {
					if (this.paymentList.find((item) => item.paymentMode === '4')) {
						this.paymentList.find((item) => item.paymentMode === '4').disabled = false
						this.paymentMode = '4'
					}
				}
			}
			if (!this.paymentMode) {
				if (this.voucherPay.voucherTotalAll) {
					if (this.paymentList.find((item) => item.paymentMode === '11')) {
						this.paymentList.find((item) => item.paymentMode === '11').disabled = !this.pricePay || !this.voucherPay.isCanVoucher
						if (!this.paymentList.find((item) => item.paymentMode === '11').disabled) this.paymentMode = '11'
					}
				}
			}
			console.log(this.paymentMode)
		},

		// 支付方式改变事件
		handleChangePaymentMode(e) {
			console.log(e.detail.value)
			if (this.paymentList.find((item) => item.paymentMode === e.detail.value).disabled) {
				this.paymentMode = ''
			} else {
				this.paymentMode = e.detail.value
			}
			if (this.paymentMode === '3') {
				this.flowerInfo.hbByStagesPeriods = '3' // 分期支付，默认选三期
				this.handleHbStagesAndPrice()
			} else {
				this.flowerInfo.hbByStagesPeriods = '-1' // 支付宝支付，取消分期选择
				this.flowerInfo.hbByStagesList.forEach((item) => { // 3 6 12 全部禁止
					item.disabled = true
				})
			}
			if (this.paymentMode === '11') {
				if (this.voucherPay.voucherList && this.voucherPay.voucherList.length && !this.voucherInfo.voucherId) {
					this.voucherInfo.voucherId = this.voucherPay.voucherList[0].platformVoucherId
				}
				this.$emit('voucher-select', this.voucherInfo)
			} else {
				this.voucherInfo.voucherId = ''
				this.$emit('voucher-select', this.voucherInfo)
			}
			this.handleNoticeFather()
		},
		// 支付方式点击事件
		handleClickPaymentMode(payment) {
			if (payment.paymentMode === '11') {
				if (!this.pricePay) {
					uni.showToast({ title: this.missingPriceText, icon: 'none' })
				} else if (!this.voucherPay.isCanVoucher) {
					uni.showToast({ title: this.voucherPay.noVoucherText, icon: 'none' }) // 无法使用代金券支付
				}
			} else if (payment.paymentMode === '7') {
				if (!this.pricePay) {
					uni.showToast({ title: this.missingPriceText, icon: 'none' })
				} else if (this.pricePay > this.pricePlatformInfo.commissionPrice) {
					uni.showToast({ title: '该余额小于支付金额，请使用其他支付方式', icon: 'none' }) // 佣金不足
				}
			} else if (payment.paymentMode === '5') {
				if (!this.pricePay) {
					uni.showToast({ title: this.missingPriceText, icon: 'none' })
				} else if (this.pricePay > this.pricePlatformInfo.rechargePrice) {
					uni.showToast({ title: '该余额小于支付金额，请使用其他支付方式', icon: 'none' }) // 平台余额不足
				}
			} else if (payment.paymentMode === '8') {
				if (!this.pricePay) {
					uni.showToast({ title: this.missingPriceText, icon: 'none' })
				} else if (this.pricePay > this.pricePlatformInfo.beeCoinPrice) {
					uni.showToast({ title: '该余额小于支付金额，请使用其他支付方式', icon: 'none' }) // 消费金余额不足
				}
			} else if (payment.paymentMode === '9') {
				if (!this.pricePay) {
					uni.showToast({ title: this.missingPriceText, icon: 'none' })
				} else if (!this.detailShopInfo.hsbMrchId) {
					uni.showToast({ title: '该商家未开通惠市宝服务', icon: 'none' }) // 该商家未开通惠市宝服务
				}
			} else if (payment.paymentMode === '6') {
				if (!this.pricePay) {
					uni.showToast({ title: this.missingPriceText, icon: 'none' })
				} else if (this.pricePay > this.priceShopInfo.current) {
					uni.showToast({ title: '该余额小于支付金额，请使用其他支付方式', icon: 'none' }) // 商家余额不足
				}
			}
		},

		// 处理花呗期数选择
		handleChangePeriods(e) {
			if (this.flowerInfo.hbByStagesList.find((item) => item.numberOfStages === e.detail.value).disabled) return
			this.flowerInfo.hbByStagesPeriods = e.detail.value
			this.handleHbStagesAndPrice()
			this.handleNoticeFather()
		},
		// 处理花呗价格和手续费显示
		handleHbStagesAndPrice() {
			if (this.paymentMode !== '3') return
			this.flowerInfo.hbByStagesList.forEach((stages) => {
				// 根据价格填充每一期价格和手续费信息
				stages.price = ((this.pricePay * (1 + stages.rate / 100)) / Number(stages.numberOfStages)).toFixed(2) // 每一期价格
				stages.serviceCharge = ((this.pricePay * (stages.rate / 100)) / Number(stages.numberOfStages)).toFixed(2) // 每一期手续费
				// 计算总手续费
				if (Number(stages.numberOfStages) === Number(this.flowerInfo.hbByStagesPeriods)) {
					this.flowerInfo.hbServiceChargeTotal = (this.pricePay * (stages.rate / 100)).toFixed(2)
				}
				// 处理允许分期的区间，公式为总价格要大于分期数/100
				this.pricePay < Number(stages.numberOfStages) / 100 ? stages.disabled = true : stages.disabled = false
			})
		},

		// 代金券选择
		handleChangeVoucher(e) {
			this.voucherInfo.voucherId = Number(e.detail.value)
			this.$emit('voucher-select', this.voucherInfo)
			this.handleNoticeFather()
		},

		// 通知父组件
		handleNoticeFather() {
			this.$emit('change', {
				paymentMode: Number(this.paymentMode),
				huabeiPeriod: this.paymentMode === '3' ? Number(this.flowerInfo.hbByStagesPeriods) : -1
			})
		}
	}
}
</script>

<style lang="less" scoped>
.cashier-list-content {
	width: 100%;
	box-sizing: border-box;
	background: #fff;

	.cashier {
		border-bottom: 2rpx solid #d0d0d0;

		&:last-child {
			border-bottom: none
		}

		.cashier-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20rpx 0;
			box-sizing: border-box;
			position: relative;

			.icon-text {
				display: flex;
				align-items: center;
			}
		}
	}
}
</style>
