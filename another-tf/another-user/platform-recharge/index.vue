<template>
	<view class="platform-recharge">
		<JHeader title="平台充值" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>

		<view style="margin: 20upx 0 0;padding: 0 48upx;border-top: 4upx dotted #767676">
			<view style="padding: 120upx 32upx 60upx">
				<tui-input
					v-model="rechargeForm.amounts" padding="26rpx 6rpx" label="充值金额：" placeholder="请输入充值金额"
					clearable type="number"
					border-color="#cccccc" style="border-bottom: 2upx solid #cccccc;"
				></tui-input>
			</view>

			<view style="text-align: center;">
				<tui-button
					width="580rpx" height="96rpx" :size="38" type="green"
					shape="circle" style="display: inline-block;"
					@click="handleRecharge"
				>
					充值
				</tui-button>
			</view>
		</view>

		<CashierList :total-price="rechargeForm.amounts" @change="(e) => payInfo = e" />
	</view>
</template>

<script>
import { addOrderSubmitUserRechargeApi } from '../../../api/anotherTFInterface'
import { handleDoPay } from '../../../utils/payUtil'

export default {
	name: 'PlatformRecharge',
	onLoad() {
		this.refrshUserInfo()
	},

	data() {
		return {
			userInfo: {},
			withdrawalForm: {
				accountBankId: '',
				name: ''
			},
			tempwithdrawBankName: '请选择提现方式',
			bankCardList: [],
			isShowBankCardSelect: false,
			showModal: false,
			// 充值
			rechargeForm: {
				amounts: ''
			},
			payInfo: {}
		}
	},

	methods: {
		// 刷新用户信息
		refrshUserInfo(cb) {
			refrshUserInfoApi({
				userId: this.userInfo.userId
			}).then(({ data }) => {
				uni.setStorageSync(USER_INFO, data)
				this.userInfo = data
				this.$forceUpdate()
			})
		},

		handleSelectBankCard(e) {
			this.isShowBankCardSelect = false
			this.withdrawalForm.accountBankId = e.options.value
			this.tempwithdrawBankName = e.options.text
		},

		handleWithdrawal() {
			if (!this.withdrawalForm.accountBankId) return this.$showToast('请选择提现方式')
			if (!this.withdrawalForm.name) return this.$showToast('请输入收款人姓名')
			getIdentityAuthenticationInfoApi({
				mobile: this.userInfo.phone
			}).then((res) => {
				if (!res) {
					this.showModal = true
				} else {
					withdrawalBalanceApi({
						...this.withdrawalForm,
						userId: getUserId()
					}).then(({ data }) => {
						this.$showToast('操作成功')
						this.refrshUserInfo()
						setTimeout(() => {
							uni.navigateBack()
						}, 2000)
					})
				}
			})
		},

		handleRecharge() {
			if (!this.rechargeForm.amounts) return this.$showToast('请输入充值金额')
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
.platform-recharge {
	box-sizing: border-box;
}
</style>
