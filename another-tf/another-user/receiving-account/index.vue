<template>
	<view class="receiving-account-container">
		<JHeader title="收款账户" width="50" height="50"></JHeader>
		<view v-if="!bankMessage.cardNumber">
			<tui-no-data :fixed="false" style="padding-top: 60rpx;">暂未绑定收款账户</tui-no-data>
			<view style="width: 70%;margin: 14rpx auto;">
				<tui-button
					type="blue" bold shape="circle" width="100%"
					@click="go('/another-tf/another-user/receiving-account/receiving-account-form')"
				>
					立即绑定
				</tui-button>
			</view>
		</view>
		<view v-else style="padding: 45rpx 0;">
			<tui-card :title="{ text: `账号：${bankMessage.cardNumber}` }">
				<template #body>
					<view style="padding: 10rpx 32rpx;">
						<view>持卡人：{{ bankMessage.cardName }}</view>
					</view>
				</template>
				<template #footer>
					<view style="padding: 0 20rpx 20rpx;text-align: right;">
						<tui-button
							type="warning" width="120rpx" height="50rpx" margin="0 20rpx 0"
							style="border-radius: 50rpx;display: inline-block;"
							@click="go('/another-tf/another-user/receiving-account/receiving-account-form?isEdit=1')"
						>
							编辑
						</tui-button>
						<tui-button
							type="danger" width="120rpx" height="50rpx" style="border-radius: 50rpx;display: inline-block;"
							@click="isShowUnbindBankDialog = true"
						>
							解绑
						</tui-button>
					</view>
				</template>
			</tui-card>
		</view>

		<tui-dialog
			style="position: relative;z-index: 888;" :buttons="[{ text: '取消' }, { text: '确定', color: '#586c94' }]"
			:show="isShowUnbindBankDialog" title="解绑银行卡" @click="handleUnbindBank"
		>
			<template #content>
				<tui-input v-model="unbindForm.phone" label="手机号" type="number" placeholder="请输入手机号"></tui-input>
				<ATFGraphicVerificationCode
					type="code" :phone="unbindForm.phone" input-type="number" input-label="验证码"
					countdown-width="144rpx" @input="e => unbindForm.code = e"
				></ATFGraphicVerificationCode>
			</template>
		</tui-dialog>
	</view>
</template>

<script>
import { getByIdBankApi, deleteBankDeleteApi } from '../../../api/anotherTFInterface'
export default {
	name: 'ReceivingAccount',
	components: {
	},
	data() {
		return {
			bankMessage: {
				cardNumber: '',
				cardName: ''
			},
			unbindForm: {
				phone: '',
				code: ''
			},
			isShowUnbindBankDialog: false
		}
	},
	onShow() {
		this.getBankMessage()
	},

	methods: {
		getBankMessage() {
			uni.showLoading({
				title: '加载中'
			})
			getByIdBankApi({})
				.then((res) => {
					this.bankMessage = res.data || {}
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		handleUnbindBank(e) {
			if (e.index === 0) { } else if (e.index === 1) {
				if (!this.unbindForm.phone) return this.$showToast('请填写手机号')
				if (!this.unbindForm.code) return this.$showToast('请填写验证码')
				uni.showLoading({
					title: '操作中'
				})
				deleteBankDeleteApi({ ...this.unbindForm })
					.then(({ data }) => {
						uni.hideLoading()
						this.$showToast('解绑成功')
						this.getBankMessage()
					})
					.catch(() => {
						uni.hideLoading()
					})
			}
			this.unbindForm.phone = ''
			this.unbindForm.code = ''
			this.isShowUnbindBankDialog = false
		}
	}
}
</script>

<style lang="less" scoped>
.receiving-account-container {
	width: 100%;
	min-height: 100vh;
	background-color: #f5f4f9;

	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}

	/deep/ .tui-dialog {
		overflow: visible;
	}
}
</style>
