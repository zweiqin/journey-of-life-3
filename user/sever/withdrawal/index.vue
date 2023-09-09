<template>
	<view class="recharge-page">
		<JBack dark width="50" height="50"></JBack>
		<view style="text-align: right;">
			<tui-button
				width="150rpx" height="54rpx" :size="28" type="black"
				bold shape="circle" plain style="display: inline-block;"
				@click="go('/user/sever/withdrawal/withdrawal-record')"
			>
				提现记录
			</tui-button>
		</view>
		<view>
			<tui-list-view title="" color="#777" margin-top="20rpx">
				<tui-list-cell arrow @click="getBankCardList">
					提现方式&nbsp;&nbsp;&nbsp;&nbsp;{{ tempwithdrawBankName }}
				</tui-list-cell>
			</tui-list-view>
		</view>
		<view class="main">
			<view class="recharge-wrapper">
				<view style="font-size: 36upx;font-weight: bold;color: #FF0000;">
					余额：￥{{ userInfo.account || 0 }}
				</view>
				<!-- <view class="title">提现金额</view> -->
				<view style="margin: 50upx 0 120upx;">
					<tui-input
						v-model="withdrawalForm.name" padding="26rpx 6rpx" label="收款人姓名：" placeholder="请输入收款人姓名"
						clearable border-color="#cccccc" style="border-bottom: 2upx solid #cccccc;"
					></tui-input>
				</view>

				<view style="text-align: center;">
					<tui-button
						width="580rpx" height="96rpx" :size="38" type="green"
						shape="circle" style="display: inline-block;"
						@click="handleRecharge"
					>
						全部提现
					</tui-button>
				</view>
			</view>
		</view>
		<tui-select
			:list="bankCardList" reverse :show="isShowBankCardSelect" @confirm="handleSelectBankCard"
			@close="isShowBankCardSelect = false"
		></tui-select>
	</view>
</template>

<script>
import { getBankCardListUserApi, withdrawalBalanceApi, refrshUserInfoApi } from '../../../api/user'
import { getUserId } from '../../../utils'
import { USER_INFO } from '../../../constant'

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
			isShowBankCardSelect: false
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

		handleRecharge() {
			if (!this.withdrawalForm.accountBankId) return this.$showToast('请选择提现方式')
			if (!this.withdrawalForm.name) return this.$showToast('请输入收款人姓名')
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
	}
}
</script>

<style lang="less" scoped>
.recharge-page {
	padding: 48upx;
	box-sizing: border-box;

	.main {
		padding: 32upx;
		box-sizing: border-box;
		margin-top: 40px;
	}
}
</style>
