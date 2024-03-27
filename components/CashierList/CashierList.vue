<template>
	<view class="cashier-list-content">
		<view v-if="show">
			<tui-radio-group v-model="paymentMode" @change="handleChangePaymentMode">
				<view v-for="payment in paymentList" :key="payment.paymentMode" class="cashier">
					<view class="cashier-item">
						<view class="icon-text">
							<image class="pay-type-img-inner" :src="payment.icon" mode="widthFix" />
							<text>{{ payment.label }}</text>
							<text v-if="(payment.paymentMode === '5')">（余额：{{ pricePlatformInfo.totalPrice }}）</text>
							<text v-if="(payment.paymentMode === '6')">（余额：{{ priceShopInfo.current }}）</text>
							<text v-if="(paymentMode === '3') && (paymentMode === payment.paymentMode)">
								（手续费：￥{{ flowerObj.hbServiceChargeTotal }}）
							</text>
						</view>
						<view class="radio">
							<tui-radio
								:checked="false" :disabled="payment.disabled" :value="payment.paymentMode" color="#07c160"
								border-color="#999"
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
									<view class="radio-context">
										手续费：￥{{ flowerItem.serviceCharge }}/期
										<tui-radio
											class="radio" :checked="false" :disabled="flowerItem.disabled"
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
		// 平台余额支付
		showPlatformPay: {
			type: Boolean,
			default: false
		},
		// 用户的商家充值的余额支付
		shopIdPay: {
			type: [String, Number],
			default: ''
		}
	},
	data() {
		return {
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
				totalPrice: 0 // 账户总余额
			},
			// 用户的商家充值的余额相关
			priceShopInfo: {
				current: 0
			}
		}
	},
	watch: { // 对于watch，按书写顺序执行（如果由同步代码触发）。shopIdPay->pricePay
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
							this.paymentList.find((item) => item.paymentMode === '5').disabled = !this.pricePay || (this.pricePay > this.pricePlatformInfo.totalPrice)
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
					if (this.showPlatformPay) {
						this.paymentList.find((item) => item.paymentMode === '5').disabled = !this.pricePay || (this.pricePay > this.pricePlatformInfo.totalPrice)
						if (this.paymentList.find((item) => item.paymentMode === '5').disabled && (this.paymentMode === '5')) this.handleSetDisable()
					} else if (!this.showPlatformPay && (this.paymentMode === '5')) {
						this.handleSetDisable()
					}
					if (this.shopIdPay) { // pricePay依赖shopIdPay，所以pricePay放后面
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
		}
		if (this.showAliPay) {
			this.paymentList.push({
				label: '支付宝支付',
				paymentMode: '2',
				icon: require('../../static/images/user/pay/alipay.png'),
				disabled: true
			})
		}
		if (this.showHuabeiPay) {
			this.paymentList.push({
				label: '花呗分期',
				paymentMode: '3',
				icon: require('../../static/images/user/pay/huabei.png'),
				disabled: true
			})
		}
		if (this.showTonglianPay) {
			// #ifdef H5
			this.paymentList.push({
				label: '通联支付（微信）',
				paymentMode: '4',
				icon: require('../../static/images/user/pay/tonglian.png'),
				disabled: true
			})
			// #endif
		}
		if (this.showPlatformPay) {
			this.paymentList.push({
				label: '平台余额支付',
				paymentMode: '5',
				icon: require('../../static/images/user/pay/platform-pay.png'),
				disabled: true
			})
			getPricePlatformAllApi({})
				.then((res) => {
					this.pricePlatformInfo = res.data
					this.paymentList.find((item) => item.paymentMode === '5').disabled = !this.pricePay || (this.pricePay > this.pricePlatformInfo.totalPrice)
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
				})
		}
	},
	mounted() {
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
			.catch((e) => {
				this.handleSetDisable()
				this.handleNoticeFather()
			})
	},
	methods: {
		/**
		 * 根据环境更改可选支付项
		 */

		handleSetDisable() {
			// #ifdef H5
			this.paymentList.find((item) => item.paymentMode === '4').disabled = false
			this.paymentMode = '4'
			// #endif
			// #ifdef APP
			this.paymentList.find((item) => item.paymentMode === '4').disabled = true
			this.paymentMode = ''
			// #endif
			// #ifdef MP-WEIXIN
			// this.paymentList.find((item) => item.paymentMode === '1').disabled = false
			this.paymentList.find((item) => item.paymentMode === '4').disabled = true
			this.paymentMode = '' // 1
			// #endif
			// #ifdef MP-ALIPAY
			// this.paymentList.find((item) => item.paymentMode === '2').disabled = false
			// if(this.flowerObj.huabeiChargeType) this.paymentList.find((item) => item.paymentMode === '3').disabled = false
			this.paymentList.find((item) => item.paymentMode === '4').disabled = true
			this.paymentMode = '' // 2
			// #endif
		},

		/**
		 * 支付方式改变事件
		 * @param paymentMode
		 * @param disabled
		 */

		handleChangePaymentMode(e) {
			console.log(e.detail.value)
			if (this.paymentList.find((item) => item.paymentMode === e.detail.value).disabled) return
			this.paymentMode = e.detail.value
			const { flowerObj } = this
			if (this.paymentMode !== '3') {
				// 支付宝支付，取消分期选择
				flowerObj.hbByStagesPeriods = '-1'
				// 3 6 12 全部禁止
				flowerObj.hbByStagesList.forEach((item) => {
					item.disabled = true
				})
			} else {
				// 分期支付，默认选三期
				flowerObj.hbByStagesPeriods = '3'
			}
			this.handleHbStagesAndPrice()
			this.handleNoticeFather()
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

		/**
		 * 处理花呗价格和手续费显示
		 */

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

		/**
		 * 通知父组件
		 */

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
	padding: 0rpx 15rpx;
	box-sizing: border-box;
	background: #fff;

	.u-radio-group {
		display: block !important;
	}

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

			.radio-context {
				display: flex;
				align-items: center;
				font-size: 24rpx;

				.radio {
					margin-left: 15rpx;
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
