<template>
	<view class="balance-page">
		<JHeader title="" width="50" height="50" style="padding: 48upx 48upx 0;"></JHeader>
		<view style="padding: 0 48upx">
			<view style="text-align: right;">
				<tui-button
					width="150rpx" height="54rpx" :size="28" type="black"
					bold shape="circle" plain
					style="display: inline-block;" @click="go('/user/sever/withdrawal/withdrawal-record')"
				>
					提现记录
				</tui-button>
			</view>
			<view>
				<tui-list-view color="#777" margin-top="20rpx">
					<tui-list-cell arrow @click="getBankCardList">
						提现方式&nbsp;&nbsp;&nbsp;&nbsp;{{ tempwithdrawBankName }}
					</tui-list-cell>
				</tui-list-view>
			</view>
			<view style="margin-top: 20px;padding: 32upx;">
				<view style="font-size: 36upx;font-weight: bold;color: #FF0000;">
					余额：￥{{ userInfo.account || 0 }}
				</view>
				<view style="padding: 50upx 0 60upx;">
					<tui-input
						v-model="withdrawalForm.name" padding="26rpx 6rpx" label="收款人姓名：" placeholder="请输入收款人姓名"
						clearable
						border-color="#cccccc" style="border-bottom: 2upx solid #cccccc;"
					></tui-input>
				</view>
				<view style="text-align: center;">
					<tui-button
						width="580rpx" height="96rpx" :size="38" type="green"
						shape="circle" style="display: inline-block;"
						@click="handleWithdrawal"
					>
						全部提现
					</tui-button>
				</view>
			</view>
		</view>

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

		<CashierList :price-pay="rechargeForm.amounts || 0" @change="(e) => payInfo = e" />
		<tui-select
			:list="bankCardList" reverse :show="isShowBankCardSelect" @confirm="handleSelectBankCard"
			@close="isShowBankCardSelect = false"
		></tui-select>
		<tui-modal :show="showModal" title="提示" content="您还未实名认证，请先去认证" @click="handleOpmodal"></tui-modal>
	</view>
</template>

<script>
import { getBankCardListUserApi, withdrawalBalanceApi, refrshUserInfoApi, getIdentityAuthenticationInfoApi, getByAllBuyerUserRechargeLogApi } from '../../../api/user'
import { addOrderSubmitUserRechargeApi } from '../../../api/anotherTFInterface'
import { getUserId } from '../../../utils'
import { USER_INFO } from '../../../constant'
import { handleDoPay } from '../../../utils/payUtil'

export default {
	name: 'Withdrawal',
	onLoad() {
		this.userInfo = uni.getStorageSync(USER_INFO)
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

		getBankCardList() {
			uni.showLoading({
				title: '加载中'
			})
			if (!getUserId()) return
			if (!this.userInfo.phone) return this.$showToast('获取用户手机号失败')
			getBankCardListUserApi({ mobile: this.userInfo.phone })
				.then((data) => {
					console.log(data)
					if (!data || (data.length === 0)) {
						this.$showToast('请先添加银行卡')
						setTimeout(() => {
							this.go('/user/sever/bank-card/bank-card-form')
						}, 2000)
					} else {
						this.bankCardList = data.map((item) => ({
							...item,
							value: item.id,
							text: `${item.bankName}（${item.cardNo.slice(-4) || '--'}）【${item.openCardBank || '--'}】`
						}))
						this.isShowBankCardSelect = true
					}
					uni.hideLoading()
				})
				.catch((e) => {
					uni.hideLoading()
				})
		},

		handleSelectBankCard(e) {
			this.isShowBankCardSelect = false
			this.withdrawalForm.accountBankId = e.options.value
			this.tempwithdrawBankName = e.options.text
		},

		handleOpmodal(e) {
			if (e.index) {
				uni.navigateTo({
					url: '/user/commission-statistics/identity-authentication'
				})
			}
			this.showModal = false
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
.balance-page {
	box-sizing: border-box;
}
</style>
