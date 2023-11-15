<template>
	<view class="cashier-list-content">
		<view v-if="show">
			<tui-radio-group v-model="paymentMode" @change="handleChangePaymentMode">
				<view v-for="payment in paymentList" :key="payment.id" class="cashier">
					<view class="cashier-item">
						<view class="icon-text">
							<image class="pay-type-img-inner" :src="payment.icon" mode="widthFix" />
							{{ payment.label }}
							<span v-if="(paymentMode === '3') && (paymentMode === payment.paymentMode)">
								（手续费：￥{{ flowerObj.hbServiceChargeTotal }}）
							</span>
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
import { getOrderHuabeiConfigApi } from '../../api/anotherTFInterface'

export default {
	name: 'CashierList',
	props: {
		totalPrice: {
			type: Number,
			default: () => 0
		},
		// 是否显示，用于默认某一个支付
		show: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			paymentMode: '', // 支付方式 1微信 2支付宝 3花呗分期
			paymentList: [
				{
					id: 1,
					label: '微信支付',
					paymentMode: '1',
					icon: require('../../static/images/user/pay/wechat_pay.png'),
					disabled: false
				},
				{
					id: 2,
					label: '支付宝支付',
					paymentMode: '2',
					icon: require('../../static/images/user/pay/alipay.png'),
					disabled: false
				},
				{
					id: 3,
					label: '花呗分期',
					paymentMode: '3',
					icon: require('../../static/images/user/pay/huabei.png'),
					disabled: false
				},
				{
					id: 4,
					label: '通联支付',
					paymentMode: '4',
					icon: require('../../static/images/user/pay/tonglian.png'),
					disabled: false
				}
			],
			// 花呗相关
			flowerObj: {
				hbChargeType: 1, // 花呗手续费支付方式 1-商户支付 2-用户支付 后端接口返回
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
			}
		}
	},
	async mounted() {
		await this.getTheFlowerConfig()
		this.handleSetDisable()
		this.handleNoticeFather()
	},
	methods: {
		/**
		 * 根据环境更改可选支付项
		 */

		handleSetDisable() {
			// #ifdef MP-WEIXIN
			// this.paymentList[0].disabled = false
			// this.paymentList[1].disabled = true
			// this.paymentList[2].disabled = true
			this.paymentList[0].disabled = false
			this.paymentMode = '4' // 1
			// #endif
			// #ifdef MP-ALIPAY
			// this.paymentList[0].disabled = true
			// this.paymentList[1].disabled = false
			// this.paymentList[2].disabled = false
			this.paymentList[0].disabled = false
			this.paymentMode = '4' // 2
			// #endif
			// #ifdef APP || H5
			// this.paymentList[0].disabled = false
			// this.paymentList[1].disabled = true
			// this.paymentList[2].disabled = true
			this.paymentList[0].disabled = false
			this.paymentMode = '4' // 1
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
			if (['1', '2', '4'].includes(this.paymentMode)) {
				// 支付宝支付，取消分期选择
				flowerObj.hbByStagesPeriods = '-1'
				// 3 6 12 全部禁止
				flowerObj.hbByStagesList.map((item) => {
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
		 * 获取花呗分期配置
		 */

		async getTheFlowerConfig() {
			const { data } = await getOrderHuabeiConfigApi({})
			const { flowerObj } = this
			flowerObj.hbChargeType = data.huabeiChargeType
			// 如果后端返回的是用户支付手续费，设置费率信息
			if (data.huabeiChargeType === 1) {
				data.huabeiFeeRateList.forEach((rate, index) => {
					flowerObj.hbByStagesList[index].rate = rate
				})
			}
		},

		/**
		 * 处理花呗期数选择
		 * @param periods 期数
		 * @param disabled
		 */

		handleChangePeriods(e) {
			if (this.flowerObj.hbByStagesList.find((item) => item.numberOfStages === e.detail.value).disabled) return
			const { flowerObj } = this
			flowerObj.hbByStagesPeriods = e.detail.value
			this.handleHbStagesAndPrice()
			this.handleNoticeFather()
		},

		/**
		 * 处理花呗价格和手续费显示
		 */

		handleHbStagesAndPrice() {
			// const { flowerObj, totalPrice } = this
			const flowerObj = this.flowerObj
			const totalPrice = this.totalPrice || 0
			// console.log(this.flowerObj.hbByStagesList)
			if (this.paymentMode !== '3') return
			flowerObj.hbByStagesList.forEach((stages) => {
				// 根据价格填充每一期价格和手续费信息
				stages.price = ((totalPrice * (1 + stages.rate / 100)) / Number(stages.numberOfStages)).toFixed(2) // 每一期价格
				stages.serviceCharge = ((totalPrice * (stages.rate / 100)) / Number(stages.numberOfStages)).toFixed(2) // 每一期手续费
				// 计算总手续费
				if (Number(stages.numberOfStages) === Number(flowerObj.hbByStagesPeriods)) {
					flowerObj.hbServiceChargeTotal = (totalPrice * (stages.rate / 100)).toFixed(2)
				}
				// 处理允许分期的区间，公式为总价格要大于分期数/100
				this.totalPrice < Number(stages.numberOfStages) / 100 ? stages.disabled = true : stages.disabled = false
			})
		},

		/**
		 * 通知父组件
		 */

		handleNoticeFather() {
			const { paymentMode, flowerObj } = this
			const params = {
				paymentMode: Number(paymentMode),
				huabeiPeriod: Number(flowerObj.hbByStagesPeriods)
			}
			this.$emit('change', params)
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
