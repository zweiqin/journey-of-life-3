<template>
	<view class="balance-operation">
		<JHeader title="余额" width="50" height="50"></JHeader>
		<view style="display: flex;justify-content: flex-end;">
			<tui-button
				type="black" width="220rpx" height="60rpx" margin="0"
				plain link
				@click="go('/another-tf/another-user/my-wallet/recharge-record')"
			>
				收支明细
			</tui-button>
		</view>

		<view style="display: flex;flex-direction: column;align-items: center;margin-top: 100rpx;">
			<tui-icon name="wallet" :size="130" unit="rpx" color="#3481f5" bold margin="0"></tui-icon>
			<view style="margin-top: 26rpx;font-size: 36rpx;">余额</view>
			<view style="margin-top: 26rpx;font-size: 74rpx;font-weight: bold;">
				￥{{ pricePlatformInfo.totalPrice || 0 }}
			</view>
			<view style="margin-top: 20rpx;font-size: 36rpx;">可提现余额：￥{{ pricePlatformInfo.price || 0 }}</view>
			<view class="operation-btn">
				<view style="padding-top: 100rpx;">
					<tui-button type="danger" width="280rpx" height="78rpx" margin="0" @click="isShowRechargePopup = true">
						充值
					</tui-button>
				</view>
				<view style="padding-top: 18rpx;">
					<tui-button
						type="gray" width="280rpx" height="78rpx" margin="0"
						@click="go('/another-tf/another-serve/withdraw/index')"
					>
						提现
					</tui-button>
				</view>
			</view>
		</view>

		<tui-bottom-popup
			:z-index="993" :mask-z-index="992" :show="isShowRechargePopup"
			@close="isShowRechargePopup = false"
		>
			<view style="padding: 26rpx 20rpx;">
				<view style="padding: 0 36rpx;">
					<view style="position: relative;color: #222229;text-align: center;">
						<text>余额充值</text>
						<view style="position: absolute;top: -14rpx;right: -16rpx;">
							<tui-icon
								name="close" color="#767676" size="46" unit="rpx"
								@click="isShowRechargePopup = false"
							></tui-icon>
						</view>
					</view>
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
									{{ item.amounts }}
								</view>
								<view
									style="margin-top: 20rpx;font-size: 28rpx;"
									:style="{ color: currentRechargeIndex === index ? '#222229' : '#888889' }"
								>
									代金券{{ item.voucherNum || '' }}
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
						<view style="color: #222229;">自定义金额：</view>
						<view style="border-bottom: 2upx solid #bebebe;">
							<tui-input
								v-model="customRecharge" type="number" label="￥" :label-size="48"
								label-color="#000000"
								:label-width="80" placeholder="输入自定义金额" clearable :border-bottom="false"
								padding="18rpx 2rpx 10rpx"
								placeholder-style="color: #979797;font-size: 30rpx;" @focus="handleSelectCustom"
							>
								<template #right>
									<text style="font-size: 30rpx;color: #979797;">{{ customRecharge ? customRecharge : '赠送代金券' }}</text>
								</template>
							</tui-input>
						</view>
					</view>
				</view>
				<view style="padding: 32rpx 0 38rpx;text-align: center;">
					<tui-button
						type="warning" width="680rpx" height="84rpx" margin="0 20rpx 0"
						style="display: inline-block;background: linear-gradient(287deg, #EF530E 31%, #F77A42 104%)!important;border-radius: 16rpx;box-shadow: 0px 2px 2px 0px #FA6842,0px 5px 20px 0px rgba(250, 104, 66, 0.8);"
						@click="handleShowModalRecharge"
					>
						立即充值
					</tui-button>
				</view>
			</view>
		</tui-bottom-popup>

		<tui-modal
			:show="isShowModalRecharge" custom fadein :button="[]"
			:z-index="995" :mask-z-index="994"
			@cancel="isShowModalRecharge = false"
		>
			<view style="padding: 28rpx 0;text-align: center;">
				<view>
					<image style="width: 435rpx;height: 337rpx;" src="../../../static/images/common/modal-show.png"></image>
				</view>
				<view style="margin-top: 24rpx;font-size: 40rpx;color: #333333;">
					<text>
						确定要充值 {{ rechargeForm.amounts }} 吗？
					</text>
				</view>
				<view style="margin-top: 22rpx;font-size: 36rpx;color: #687383;">
					<text>
						附赠 {{ rechargeForm.amounts }} 代金券
					</text>
				</view>
				<view>
					<tui-button
						type="warning" width="238rpx" height="108rpx" margin="32rpx 0 0"
						:size="40" shape="circle"
						style="display: inline-block;background: #ef530e!important;box-shadow: 0px 12px 20px 0px #f1ac8e;"
						@click="handleRecharge"
					>
						确定
					</tui-button>
				</view>
			</view>
		</tui-modal>

		<CashierList :price-pay="rechargeForm.amounts || 0" @change="(e) => payInfo = e" />
	</view>
</template>

<script>
import { getPricePlatformAllApi, addOrderSubmitUserRechargeApi } from '../../../api/anotherTFInterface'
import { handleDoPay } from '../../../utils/payUtil'

export default {
	name: 'BalanceOperation',
	onShow() {
		this.getPricePlatformAll()
	},

	data() {
		return {
			pricePlatformInfo: {
				totalPrice: '',
				price: '',
				rechargePrice: '',
				voucherPrice: '',
				distributorPrice: '',
				commissionPrice: ''
			},
			isShowRechargePopup: false,
			rechargeAmountsList: [
				{ amounts: 50, voucherNum: 50 },
				{ amounts: 100, voucherNum: 100 },
				{ amounts: 200, voucherNum: 200 },
				{ amounts: 1000, voucherNum: 1000 },
				{ amounts: 2000, voucherNum: 2000 }
			],
			currentRechargeIndex: 0,
			customRecharge: '',
			// 充值
			rechargeForm: {
				amounts: 50
			},
			payInfo: {},
			isShowModalRecharge: false
		}
	},

	methods: {
		// 刷新用户信息
		getPricePlatformAll() {
			getPricePlatformAllApi({})
				.then((res) => {
					this.pricePlatformInfo = res.data
				})
		},
		handleClickCurrentRecharge(item, index) {
			this.customRecharge = ''
			this.currentRechargeIndex = index
			this.rechargeForm.amounts = item.amounts
		},
		handleSelectCustom() {
			this.currentRechargeIndex = ''
			this.rechargeForm.amounts = this.customRecharge
		},
		handleShowModalRecharge() {
			if (typeof this.currentRechargeIndex === 'number') {
				if (!this.rechargeForm.amounts) return this.$showToast('缺少金额')
			} else {
				if (Number(this.customRecharge) < 50) return this.$showToast('充值金额不能少于50')
				if (Number(this.customRecharge) > 100000) return this.$showToast('单次充值金额不能大于10万')
				this.rechargeForm.amounts = this.customRecharge
			}
			this.isShowModalRecharge = true
		},

		handleRecharge() {
			uni.showLoading()
			addOrderSubmitUserRechargeApi({ ...this.rechargeForm })
				.then(async (res) => {
					await handleDoPay({ ...res.data, ...this.payInfo }, 8)
				})
				.catch(() => {
					uni.hideLoading()
				})
		}
	}
}
</script>

<style lang="less" scoped>
.balance-operation {
	min-height: 100vh;
	background-color: #f8f9fb;
	box-sizing: border-box;

	/deep/ .j-header-container {
		padding: 24rpx 0 10rpx;
		background-color: #f5f5f5;

		.title {
			font-size: 36rpx;
			color: #222229;
			font-weight: normal;
		}
	}

	.operation-btn {
		/deep/ .tui-btn {
			display: inline-block;
			border-radius: 18rpx;
		}
	}
}
</style>
