<template>
	<view class="voucher-recharge-container" :style="{ margin }">
		<view class="operation-btn">
			<tui-button
				v-if="$store.state.auth.identityInfo.type.includes(8) || $store.state.auth.identityInfo.type.includes(9) || $store.state.auth.identityInfo.type.includes(13) || $store.state.auth.identityInfo.type.includes(14) || $store.state.auth.identityInfo.type.includes(15)"
				type="warning" :size="36" width="280rpx" height="78rpx"
				margin="0 auto" @click="isShowPopup = true"
			>
				充值
			</tui-button>
		</view>

		<tui-bottom-popup :z-index="993" :mask-z-index="992" :show="isShowPopup" @close="isShowPopup = false">
			<view style="padding: 26rpx 20rpx;">
				<view style="position: relative;padding: 0 36rpx;color: #222229;text-align: center;">
					<text>代金券充值</text>
					<view style="position: absolute;top: -14rpx;right: -16rpx;">
						<tui-icon name="close" color="#767676" size="46" unit="rpx" @click="isShowPopup = false"></tui-icon>
					</view>
				</view>
				<view
					v-if="$store.state.auth.identityInfo.type.includes(8) || $store.state.auth.identityInfo.type.includes(9)"
					style="padding: 0 36rpx;"
				>
					<view style="display: flex;justify-content: space-between;align-items: center;padding: 8rpx 0;">
						<text style="font-size: 28rpx;">请选择充值账户</text>
						<view style="flex: 1;">
							<tui-radio-group
								:value="rechargeForm.orderType"
								@change="(e) => rechargeForm.orderType = e.detail.value"
							>
								<view style="display: flex;flex-wrap: wrap;align-items: center;">
									<tui-label
										v-for="(item, index) in [{ name: '用户', value: '1' }, { name: '商家', value: '2' }]"
										:key="index"
									>
										<tui-list-cell padding="6rpx 16rpx">
											<view>
												<tui-radio
													:checked="rechargeForm.orderType === item.value" :value="item.value"
													color="#07c160" border-color="#999"
												>
												</tui-radio>
												<text>{{ item.name }}</text>
											</view>
										</tui-list-cell>
									</tui-label>
								</view>
							</tui-radio-group>
						</view>
					</view>
				</view>
				<view style="padding: 0 36rpx;">
					<view
						style="display: flex;align-items: center;flex-wrap: wrap;margin: 0 -12rpx;padding: 12rpx 0 0;text-align: center;"
					>
						<view
							v-for="(item, index) in rechargeAmountsList" :key="index"
							style="position: relative;width: 192rpx;margin: 16rpx 12rpx 0;padding: 48rpx 0;background-color: #f4f4f4;border-radius: 20rpx;"
							:style="{ border: currentRechargeIndex === index ? '2rpx solid #ef520e' : '2rpx solid #f4f4f4' }"
							@click="handleClickCurrentRecharge(item, index)"
						>
							<view>
								<view
									style="font-size: 42rpx;font-weight: bold;"
									:style="{ color: currentRechargeIndex === index ? '#ef520e' : '#222229' }"
								>
									{{ item.number }}
								</view>
								<view
									v-if="purchaseRatio" style="margin-top: 20rpx;font-size: 28rpx;"
									:style="{ color: currentRechargeIndex === index ? '#222229' : '#888889' }"
								>
									售价{{ item.number / purchaseRatio || '' }}
								</view>
							</view>
							<view
								v-if="currentRechargeIndex === index"
								style="position: absolute;right: 0;bottom: 0;padding: 2rpx;border-radius: 60% 0 14rpx;background-color: #ef520e;overflow: hidden;"
							>
								<tui-icon name="check" color="#FFFFFF" size="34" unit="rpx"></tui-icon>
							</view>
						</view>
					</view>
					<view style="margin-top: 20rpx;">
						<view style="color: #222229;">自定义代金券：</view>
						<view style="border-bottom: 2rpx solid #bebebe;">
							<tui-input
								v-model="customRecharge" type="number" label="券" :label-size="48"
								label-color="#000000"
								:label-width="80" placeholder="输入自定义代金券" :border-bottom="false" padding="18rpx 2rpx 10rpx"
								placeholder-style="color: #979797;font-size: 30rpx;" @focus="handleSelectRechargeCustom"
							>
								<template #right>
									<text v-if="purchaseRatio" style="font-size: 30rpx;color: #979797;">
										售价{{ customRecharge / purchaseRatio || '' }}
									</text>
								</template>
							</tui-input>
						</view>
					</view>
					<view style="padding: 32rpx 0 38rpx;text-align: center;">
						<tui-button
							type="warning" width="100%" height="84rpx" margin="0"
							style="display: inline-block;background: linear-gradient(287deg, #EF530E 31%, #F77A42 104%)!important;border-radius: 16rpx;box-shadow: 0px 2px 2px 0px #FA6842,0px 5px 20px 0px rgba(250, 104, 66, 0.8);"
							@click="handleShowModal"
						>
							立即充值
						</tui-button>
					</view>
				</view>
			</view>
		</tui-bottom-popup>

		<tui-modal
			:show="isShowVoucherModal" custom fadein :button="[]"
			:z-index="995" :mask-z-index="994"
			@cancel="isShowVoucherModal = false"
		>
			<view style="padding: 28rpx 0;text-align: center;">
				<view>
					<image style="width: 435rpx;height: 337rpx;" src="../../../../static/images/common/modal-show.png"></image>
				</view>
				<view style="margin-top: 24rpx;font-size: 40rpx;color: #333333;">
					<text>
						确定要充值 {{ rechargeForm.number }} 代金券吗？
					</text>
				</view>
				<view style="margin-top: 22rpx;font-size: 36rpx;color: #687383;">
					<text>
						共需支付 {{ rechargeForm.number / 2 }} 元
					</text>
				</view>
				<view>
					<tui-button
						type="warning" width="238rpx" height="108rpx" margin="32rpx 0 0"
						:size="40" shape="circle"
						style="display: inline-block;background: #ef530e!important;box-shadow: 0px 12px 20px 0px #f1ac8e;"
						@click="showPayTypePopup = true"
					>
						确定
					</tui-button>
				</view>
			</view>
		</tui-modal>

		<tui-bottom-popup :show="showPayTypePopup" @close="showPayTypePopup = false">
			<view v-if="showPayTypePopup" style="padding: 60rpx 0 128rpx;">
				<CashierList
					:price-pay="rechargeForm.number / 2" show pay-type-shops :hui-shi-bao-pay="!!rechargeForm.number"
					show-tonglian-pay :show-commission-pay="!!rechargeForm.number" :show-platform-pay="!!rechargeForm.number"
					@change="(e) => payInfo = e"
				/>
				<tui-button
					type="warning" width="168rpx" height="64rpx" margin="30rpx auto 0"
					shape="circle"
					@click="handleRecharge"
				>
					确认支付
				</tui-button>
			</view>
		</tui-bottom-popup>
	</view>
</template>

<script>
import { submitBuyerVoucherOrderApi } from '../../../../api/anotherTFInterface'
import { handleDoPay } from '../../../../utils/payUtil'

export default {
	name: 'VoucherRecharge',
	props: {
		margin: {
			type: String,
			default: '0'
		},
		platformVoucherId: {
			type: [Number, String],
			default: ''
		},
		purchaseRatio: {
			type: [Number, String],
			default: ''
		}
	},
	data() {
		return {
			isShowPopup: false,
			isShowVoucherModal: false,
			// 充值
			rechargeAmountsList: [
				{ number: 50 },
				{ number: 100 },
				{ number: 200 },
				{ number: 1000 },
				{ number: 2000 }
			],
			currentRechargeIndex: 0,
			customRecharge: '',
			rechargeForm: {
				voucherId: '',
				number: 50,
				payGrade: '',
				orderType: '1'
			},
			showPayTypePopup: false,
			payInfo: {}
		}
	},

	methods: {
		handleClickCurrentRecharge(item, index) {
			this.customRecharge = ''
			this.currentRechargeIndex = index
			this.rechargeForm.number = item.number
		},
		handleSelectRechargeCustom() {
			this.currentRechargeIndex = ''
			this.rechargeForm.number = this.customRecharge
		},
		handleShowModal() {
			if (this.platformVoucherId) {
				this.rechargeForm.voucherId = this.platformVoucherId
			} else {
				return this.$showToast('缺少代金券种类')
			}
			if (!this.rechargeForm.orderType) return this.$showToast('缺少充值账户')
			if (typeof this.currentRechargeIndex === 'number') {
				if (!this.rechargeForm.number) return this.$showToast('缺少代金券数量')
			} else {
				if (Number(this.customRecharge) < 1) return this.$showToast('充值代金券数量不能少于1')
				this.rechargeForm.number = this.customRecharge
			}
			this.isShowVoucherModal = true
		},

		handleRecharge() {
			uni.showLoading()
			this.rechargeForm.payGrade = this.rechargeForm.number / this.purchaseRatio
			submitBuyerVoucherOrderApi({ ...this.rechargeForm })
				.then(async (res) => {
					await handleDoPay({ ...res.data, ...this.payInfo }, 4, '')
					uni.hideLoading()
					this.isShowVoucherModal = false
					this.isShowPopup = false
				})
				.catch(() => {
					uni.hideLoading()
				})
		}
	}
}
</script>

<style lang="less" scoped>
.voucher-recharge-container {
	box-sizing: border-box;

	.operation-btn {
		/deep/ .tui-btn {
			display: inline-block;
			border-radius: 10rpx;
		}

		/deep/ .tui-btn-warning {
			background-color: #ef530e !important;
		}
	}
}
</style>
