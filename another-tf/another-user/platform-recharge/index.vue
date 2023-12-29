<template>
	<view class="platform-recharge">
		<JHeader title="平台充值" width="50" height="50" style="padding: 24upx 0 10upx;background-color: #f5f5f5;">
			<template #ftFn>
				<text
					style="margin-right: 40upx;font-size: 30upx;font-weight: bold;color: #000000;"
					@click="handleMemberAccountWithdraw"
				>
					提现
				</text>
			</template>
		</JHeader>
		<view
			style="position: relative;padding: 8upx 0 0;text-align: center;color: #ffffff;background: linear-gradient(90deg, #EF530E 0%, #EF530E 100%);overflow: hidden;"
		>
			<view>
				<view
					style="position: absolute;top: -30%;left: -40%;width: 600upx;height: 620upx;background-color: #f16527;border-radius: 50%;"
				>
				</view>
				<view
					style="position: absolute;top: -30%;left: -40%;width: 508upx;height: 538upx;background: linear-gradient(101deg, #FFFFFF 26%, rgba(255, 255, 255, 0.0001) 154%);border-radius: 50%;opacity: 0.1;"
				>
				</view>
			</view>
			<view style="position: relative;">
				<view style="font-size: 28upx;">
					<view>当前总余额(元)</view>
					<view style="margin-top: 24upx;font-size: 64upx;">{{ pricePlatformInfo.totalPrice || 0 }}</view>
					<view style="margin-top: 22upx;color: #f6a07a;">可提现金额：{{ pricePlatformInfo.price || 0 }}元</view>
				</view>
				<view
					style="display: flex;justify-content: space-evenly;margin-top: 76upx;padding: 20upx 0;background: linear-gradient(0deg, rgba(255, 255, 255, 0.0001) 0%, rgba(255, 255, 255, 0.15) 99%);"
				>
					<view>
						<view style="color: #f7a783;">充值余额</view>
						<view style="margin-top: 10upx;">{{ pricePlatformInfo.rechargePrice || 0 }}</view>
					</view>
					<view style="width: 2upx;background-color: #f37d49;"></view>
					<view>
						<view style="color: #f7a783;">代金券余额</view>
						<view style="margin-top: 10upx;">{{ pricePlatformInfo.voucherPrice || 0 }}</view>
					</view>
					<view style="width: 2upx;background-color: #f37d49;"></view>
					<view>
						<view style="color: #f7a783;">商家分佣</view>
						<view style="margin-top: 10upx;">{{ pricePlatformInfo.distributorPrice || 0 }}</view>
					</view>
					<view style="width: 2upx;background-color: #f37d49;"></view>
					<view>
						<view style="color: #f7a783;">推广收益</view>
						<view style="margin-top: 10upx;">{{ pricePlatformInfo.commissionPrice || 0 }}</view>
					</view>
				</view>
			</view>
		</view>

		<view style="margin-top: 28upx;">
			<view style="padding: 0 36upx;">
				<view style="display: flex;justify-content: space-between;align-items: center;">
					<text style="color: #222229;">余额充值</text>
					<tui-button
						type="warning" width="220rpx" height="60rpx" margin="0"
						style="display: inline-block;border-radius: 30rpx;"
						@click="go('/another-tf/another-user/platform-recharge/recharge-record')"
					>
						充值流水 →
					</tui-button>
				</view>
				<view
					style="display: flex;justify-content: space-between;align-items: center;flex-wrap: wrap;padding: 12upx 0 0;text-align: center;"
				>
					<view
						v-for="(item, index) in rechargeAmountsList" :key="index"
						style="position: relative;width: 31%;margin: 16upx 0 0;padding: 48upx 0;background-color: #f4f4f4;border-radius: 20upx;"
						:style="{ border: currentRechargeIndex === index ? '2upx solid #ef520e' : '2upx solid #f4f4f4' }"
						@click="handleClickCurrentRecharge(item, index)"
					>
						<view v-if="item.type === 'custom'">
							<view style="font-size: 42upx;font-weight: bold;color: #222229;">{{ item.amounts || '输入' }}</view>
							<view style="margin-top: 20upx;font-size: 28upx;color: #888889;">{{ item.voucherNum || '自定义金额' }}</view>
						</view>
						<view v-else>
							<view style="font-size: 42upx;font-weight: bold;color: #222229;">{{ item.amounts }}</view>
							<view style="margin-top: 20upx;font-size: 28upx;color: #888889;">代金券{{ item.voucherNum || '' }}</view>
						</view>
						<view
							v-if="currentRechargeIndex === index"
							style="position: absolute;right: 0;bottom: 0;padding: 2upx;border-radius: 60% 0 0;background-color: #ef520e;"
						>
							<tui-icon name="check" color="#FFFFFF" size="34" unit="upx"></tui-icon>
						</view>
					</view>
				</view>
			</view>
			<view style="padding: 120upx 0 38upx;text-align: center;">
				<tui-button
					type="warning" width="680rpx" height="84upx" margin="0 20upx 0"
					style="display: inline-block;background: linear-gradient(287deg, #EF530E 31%, #F77A42 104%)!important;border-radius: 16upx;box-shadow: 0px 2px 2px 0px #FA6842,0px 5px 20px 0px rgba(250, 104, 66, 0.8);"
					@click="rechargeForm.amounts && (isShowModalRecharge = true)"
				>
					￥{{ rechargeForm.amounts || '--' }} 立即充值
				</tui-button>
			</view>
		</view>

		<!-- 输入充值金额dialog -->
		<tui-dialog
			style="position: relative;z-index: 888;" :buttons="[{ text: '取消' }, { text: '确定', color: '#586c94' }]"
			:show="isShowRechargeCustomDialog" title="自定义充值金额" @click="handleClickRechargeCustomDialog"
		>
			<template #content>
				<tui-input v-model="rechargeAmountsList[5].amounts" label="充值金额" type="number" placeholder="请输入充值金额">
					<template #right>
						<text>元</text>
					</template>
				</tui-input>
			</template>
		</tui-dialog>

		<tui-modal :show="isShowModalRecharge" custom fadein :button="[]" :z-index="995" :mask-z-index="994" @cancel="isShowModalRecharge = false">
			<view style="padding: 28upx 0;text-align: center;">
				<view>
					<image style="width: 435upx;height: 337upx;" src="../../../static/images/common/modal-show.png"></image>
				</view>
				<view style="margin-top: 24upx;font-size: 40upx;color: #333333;">
					<text>确定要充值 {{ rechargeAmountsList[currentRechargeIndex].amounts }} 代金券吗？</text>
				</view>
				<view style="margin-top: 22upx;font-size: 36upx;color: #687383;">
					<text>附赠 {{ rechargeAmountsList[currentRechargeIndex].voucherNum }} 代金券</text>
				</view>
				<view>
					<tui-button
						type="warning" width="238rpx" height="108rpx" margin="32upx 0 0"
						:size="40" shape="circle"
						style="display: inline-block;background: #ef530e!important;box-shadow: 0px 12px 20px 0px #f1ac8e;" @click="handleRecharge"
					>
						确定
					</tui-button>
				</view>
			</view>
		</tui-modal>

		<CashierList :price-pay="rechargeForm.amounts || 0" show @change="(e) => payInfo = e" />
	</view>
</template>

<script>
import { getPricePlatformAllApi, addOrderSubmitUserRechargeApi } from '../../../api/anotherTFInterface'
import { handleDoPay } from '../../../utils/payUtil'

export default {
	name: 'PlatformRecharge',
	onLoad() {
		this.handleClickCurrentRecharge(this.rechargeAmountsList[0], 0)
	},
	onShow() {
		this.getPricePlatformAll()
	},

	data() {
		return {
			pricePlatformInfo: {
				totalPrice: '', // 账户总余额
				price: '', // 账户可提现金额
				rechargePrice: '', // 账户充值余额
				voucherPrice: '', // 代金券余额
				distributorPrice: '', // 账户分销金额
				commissionPrice: '' // 推广收益,关系链分佣
			},
			rechargeAmountsList: [
				{ amounts: 1000, voucherNum: 1000 },
				{ amounts: 1500, voucherNum: 1500 },
				{ amounts: 2000, voucherNum: 2000 },
				{ amounts: 3000, voucherNum: 3000 },
				{ amounts: 5000, voucherNum: 5000 },
				{ amounts: '', voucherNum: 0, type: 'custom' }
			],
			currentRechargeIndex: '',
			isShowRechargeCustomDialog: false,
			// 充值
			rechargeForm: {
				amounts: ''
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
			if (item.type === 'custom') {
				this.isShowRechargeCustomDialog = true
			} else {
				this.currentRechargeIndex = index
				this.rechargeForm.amounts = item.amounts
			}
		},

		handleClickRechargeCustomDialog(e) {
			if (e.index === 0) {
				this.rechargeAmountsList[5].amounts = ''
			} else if (e.index === 1) {
				if (!this.rechargeAmountsList[5].amounts) return this.$showToast('充值金额不能为空')
				if (this.rechargeAmountsList[5].amounts < 1000) return this.$showToast('充值金额不能少于1000')
				if (this.rechargeAmountsList[5].amounts > 100000) return this.$showToast('单次充值金额不能大于10万')
				this.rechargeForm.amounts = this.rechargeAmountsList[5].amounts
				this.rechargeAmountsList[5].voucherNum = `代金券${this.rechargeAmountsList[5].amounts}`
				this.currentRechargeIndex = 5
			}
			this.isShowRechargeCustomDialog = false
		},

		handleRecharge() {
			if (!this.rechargeForm.amounts) return this.$showToast('缺少金额')
			uni.showLoading()
			addOrderSubmitUserRechargeApi({ ...this.rechargeForm })
				.then(async (res) => {
					await handleDoPay({ ...res.data, ...this.payInfo }, 8)
				})
				.catch(() => {
					uni.hideLoading()
				})
		},

		handleMemberAccountWithdraw() {
			// if (this.pricePlatformInfo.price <= 0) {
			// 	this.$showToast('您暂时没有余额，不能提现')
			// } else {
			this.go('/another-tf/another-serve/withdraw/index')
			// }
		}
	}
}
</script>

<style lang="less" scoped>
.platform-recharge {
	box-sizing: border-box;
}
</style>
