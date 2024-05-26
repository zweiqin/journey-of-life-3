<template>
	<view class="cashier-list-content" :style="{ padding, borderRadius: radius }">
		<view v-if="show">
			<slot name="header" :payment-list="paymentList"></slot>
			<tui-radio-group v-model="paymentMode" @change="handleChangePaymentMode">
				<view v-for="payment in paymentList" :key="payment.paymentMode" class="cashier" @click="handleClickPaymentMode(payment)">
					<view class="cashier-item">
						<view class="icon-text">
							<image class="pay-type-img-inner" :src="payment.icon" mode="widthFix" />
							<text>{{ payment.label }}</text>
							<text v-if="(payment.paymentMode === '7')">（佣金：{{ pricePlatformInfo.commissionPrice }}）</text>
							<text v-if="(payment.paymentMode === '5')">（余额：{{ pricePlatformInfo.rechargePrice }}）</text>
							<text v-if="(payment.paymentMode === '8')">（余额：{{ pricePlatformInfo.beeCoinPrice }}）</text>
							<text v-if="(payment.paymentMode === '6')">（余额：{{ priceShopInfo.current }}）</text>
							<text v-if="(paymentMode === '3') && (paymentMode === payment.paymentMode)">
								（手续费：￥{{ flowerObj.hbServiceChargeTotal }}）
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
					<!-- 花呗分期 -->
					<view v-if="(paymentMode === '3') && (paymentMode === payment.paymentMode)" class="ali-hb-content">
						<tui-radio-group v-model="flowerObj.hbByStagesPeriods" @change="handleChangePeriods">
							<view v-for="(flowerItem, index) in flowerObj.hbByStagesList" :key="index" class="cashier">
								<view class="cashier-item">
									<view class="icon-text">
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
				</view>
			</tui-radio-group>
		</view>
	</view>
</template>

<script>
import { getOrderHuabeiConfigApi, getPricePlatformAllApi, getRechargeTotalCustomersApi } from '../../api/anotherTFInterface'

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
		showTonglianPay: {
			type: Boolean,
			default: true
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
		// // 惠市宝支付
		// showHuiShiBaoPay: {
		// 	type: Boolean,
		// 	default: false
		// },
		// 用户的商家充值的余额支付
		shopIdPay: { // 某商家的‘用户的商家充值的余额支付’对应的商家Id
			type: [String, Number],
			default: ''
		}
	},
	data() {
		return {
			showHuiShiBaoPay: false,
			paymentMode: '', // 支付方式 1微信 2支付宝 3花呗分期
			paymentList: [],
			// 花呗相关
			flowerObj: {
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
			// 平台余额相关
			pricePlatformInfo: {
				rechargePrice: 0,
				commissionPrice: 0,
				beeCoinPrice: 0
			},
			// 用户的商家充值的余额相关
			priceShopInfo: {
				current: 0
			}
		}
	},
	watch: { // 对于watch，按书写顺序执行（如果由同步代码触发）。shopIdPay->pricePay
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
		showHuiShiBaoPay: {
			handler(newValue, oldValue) {
				if (newValue) {
					if (!this.paymentList.find((item) => item.paymentMode === '9')) {
						this.paymentList.push({
							label: '惠市宝支付',
							paymentMode: '9',
							icon: require('../../static/images/user/pay/huishibao.png'),
							disabled: true
						})
					}
					this.paymentList.find((item) => item.paymentMode === '9').disabled = !this.pricePay
					if (this.paymentList.find((item) => item.paymentMode === '9').disabled && (this.paymentMode === '9')) this.handleSetDisable()
					this.handleNoticeFather()
				} else {
					if (this.paymentMode === '9') this.handleSetDisable()
					if (this.paymentList.find((item) => item.paymentMode === '9')) this.paymentList.splice(this.paymentList.findIndex((item) => item.paymentMode === '9'), 1)
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
					if (this.showHuiShiBaoPay) {
						this.paymentList.find((item) => item.paymentMode === '9').disabled = !this.pricePay
						if (this.paymentList.find((item) => item.paymentMode === '9').disabled && (this.paymentMode === '9')) this.handleSetDisable()
					} else if (!this.showHuiShiBaoPay && (this.paymentMode === '9')) {
						this.handleSetDisable()
					}
					if (this.shopIdPay) { // pricePay（明显直接）依赖shopIdPay，所以pricePay放后面
						if (this.paymentList.find((item) => item.paymentMode === '6')) {
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
					this.flowerObj.huabeiChargeType = res.data.huabeiChargeType
					if (this.flowerObj.huabeiChargeType === 1) { // 如果后端返回的是用户支付手续费，设置费率信息
						res.data.huabeiFeeRateList.forEach((rate, index) => {
							this.flowerObj.hbByStagesList[index].rate = rate
						})
					}
					this.handleSetDisable()
					this.handleNoticeFather()
				})
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
		if (this.showHuiShiBaoPay) {
			this.paymentList.push({
				label: '惠市宝支付',
				paymentMode: '9',
				icon: require('../../static/images/user/pay/huishibao.png'),
				disabled: true
			})
			this.paymentList.find((item) => item.paymentMode === '9').disabled = !this.pricePay
			this.handleSetDisable()
			this.handleNoticeFather()
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
		handleSetDisable() {
			// #ifdef H5
			if (this.showTonglianPay) {
				this.paymentList.find((item) => item.paymentMode === '4').disabled = false
				this.paymentMode = '4'
			} else {
				this.paymentList.find((item) => item.paymentMode === '4').disabled = true
				this.paymentMode = ''
			}
			// #endif
			// #ifdef APP
			if (this.showTonglianPay) {
				this.paymentList.find((item) => item.paymentMode === '4').disabled = false
				this.paymentMode = '4'
			} else {
				this.paymentList.find((item) => item.paymentMode === '4').disabled = true
				this.paymentMode = ''
			}
			// #endif
			// #ifdef MP-WEIXIN
			if (this.showTonglianPay) {
				this.paymentList.find((item) => item.paymentMode === '4').disabled = false
				this.paymentMode = '4'
			} else {
				// this.paymentList.find((item) => item.paymentMode === '1').disabled = false
				this.paymentList.find((item) => item.paymentMode === '4').disabled = true
				this.paymentMode = '' // 1
			}
			// #endif
			// #ifdef MP-ALIPAY
			if (this.showTonglianPay) {
				this.paymentList.find((item) => item.paymentMode === '4').disabled = false
				this.paymentMode = '4'
			} else {
				// this.paymentList.find((item) => item.paymentMode === '2').disabled = false
				// if(this.flowerObj.huabeiChargeType) this.paymentList.find((item) => item.paymentMode === '3').disabled = false
				this.paymentList.find((item) => item.paymentMode === '4').disabled = true
				this.paymentMode = '' // 2
			}
			// #endif
		},

		// 支付方式改变事件
		handleChangePaymentMode(e) {
			console.log(e.detail.value)
			if (this.paymentList.find((item) => item.paymentMode === e.detail.value).disabled) {
				this.paymentMode = ''
			} else {
				this.paymentMode = e.detail.value
			}
			if (this.paymentMode !== '3') {
				// 支付宝支付，取消分期选择
				this.flowerObj.hbByStagesPeriods = '-1'
				// 3 6 12 全部禁止
				this.flowerObj.hbByStagesList.forEach((item) => {
					item.disabled = true
				})
			} else {
				// 分期支付，默认选三期
				this.flowerObj.hbByStagesPeriods = '3'
			}
			this.handleHbStagesAndPrice()
			this.handleNoticeFather()
		},
		// 支付方式点击事件
		handleClickPaymentMode(payment) {
			if (payment.paymentMode === '7') {
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
			} else if (payment.paymentMode === '6') {
				if (!this.pricePay) {
					uni.showToast({ title: this.missingPriceText, icon: 'none' })
				} else if (this.pricePay > this.priceShopInfo.current) {
					uni.showToast({ title: '该余额小于支付金额，请使用其他支付方式', icon: 'none' }) // 商家余额不足
				}
			}
		},

		/**
		 * 处理花呗期数选择
		 * @param periods 期数
		 * @param disabled
		 */

		handleChangePeriods(e) {
			if (this.flowerObj.hbByStagesList.find((item) => item.numberOfStages === e.detail.value).disabled) return
			this.flowerObj.hbByStagesPeriods = e.detail.value
			this.handleHbStagesAndPrice()
			this.handleNoticeFather()
		},

		// 处理花呗价格和手续费显示
		handleHbStagesAndPrice() {
			if (this.paymentMode !== '3') return
			this.flowerObj.hbByStagesList.forEach((stages) => {
				// 根据价格填充每一期价格和手续费信息
				stages.price = ((this.pricePay * (1 + stages.rate / 100)) / Number(stages.numberOfStages)).toFixed(2) // 每一期价格
				stages.serviceCharge = ((this.pricePay * (stages.rate / 100)) / Number(stages.numberOfStages)).toFixed(2) // 每一期手续费
				// 计算总手续费
				if (Number(stages.numberOfStages) === Number(this.flowerObj.hbByStagesPeriods)) {
					this.flowerObj.hbServiceChargeTotal = (this.pricePay * (stages.rate / 100)).toFixed(2)
				}
				// 处理允许分期的区间，公式为总价格要大于分期数/100
				this.pricePay < Number(stages.numberOfStages) / 100 ? stages.disabled = true : stages.disabled = false
			})
		},

		// 通知父组件
		handleNoticeFather() {
			this.$emit('change', {
				paymentMode: Number(this.paymentMode),
				huabeiPeriod: this.paymentMode === '3' ? Number(this.flowerObj.hbByStagesPeriods) : -1
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
				justify-content: center;

				image {
					width: 50rpx;
					height: 50rpx;
					margin-right: 15rpx;
				}
			}
		}

		.ali-hb-content {
			padding: 10rpx 20px;
			box-sizing: border-box;
			border-top: 2rpx solid #d0d0d0;
		}
	}
}
</style>
