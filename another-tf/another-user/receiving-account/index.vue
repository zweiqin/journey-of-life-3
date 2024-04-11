<template>
	<view class="receiving-account-container">
		<JHeader title="收款账户" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view v-if="!bankMessage.cardNumber">
			<tui-no-data :fixed="false" style="margin-top: 60upx;">暂未绑定收款账户</tui-no-data>
			<view style="width: 70%;margin: 14upx auto;">
				<tui-button
					type="blue" bold shape="circle" width="100%"
					@click="go('/another-tf/another-user/receiving-account/receiving-account-form')"
				>
					立即绑定
				</tui-button>
			</view>
		</view>
		<view v-else style="padding: 45upx 0;">
			<tui-card
				:title="{ text: `账号：${bankMessage.cardNumber}` }"
			>
				<template #body>
					<view style="padding: 10upx 32upx;">
						<view>持卡人：{{ bankMessage.cardName }}</view>
					</view>
				</template>
				<template #footer>
					<view style="padding: 0 20rpx 20rpx;text-align: right;">
						<tui-button
							type="warning" width="120rpx" height="50rpx" margin="0 20upx 0"
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
			style="position: relative;z-index: 888;"
			:buttons="[{ text: '取消' }, { text: '确定', color: '#586c94' }]" :show="isShowUnbindBankDialog" title="解绑银行卡"
			@click="handleUnbindBank"
		>
			<template #content>
				<tui-input v-model="unbindForm.phone" label="手机号" type="number" placeholder="请输入手机号">
					<template #right>
						<tui-countdown-verify ref="refUnbindBankVerify" width="144upx" @send="handleSendVerify"></tui-countdown-verify>
					</template>
				</tui-input>
				<tui-input v-model="unbindForm.code" label="验证码" type="number" placeholder="请输入验证码"></tui-input>
			</template>
		</tui-dialog>
	</view>
</template>

<script>
import { getByIdBankApi, deleteBankDeleteApi, getVerifyCodeApi } from '../../../api/anotherTFInterface'
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
	onLoad() {
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
			if (e.index === 0) {} else if (e.index === 1) {
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
		},
		handleSendVerify() {
			if (!this.unbindForm.phone) {
				this.$refs.refUnbindBankVerify.reset()
				return this.$showToast('请填写手机号')
			}
			if (!/^1[3-9]\d{9}$/.test(this.unbindForm.phone)) {
				this.$refs.refUnbindBankVerify.reset()
				return this.$showToast('请输入正确的手机号')
			}
			getVerifyCodeApi({ phone: this.unbindForm.phone })
				.then((res) => {
					this.$refs.refUnbindBankVerify.success()
					this.$showToast('发送成功，请注意查看手机短信')
				})
				.catch(() => {
					this.$refs.refUnbindBankVerify.reset()
				})
		}
	}
}
</script>

<style lang="less" scoped>
.receiving-account-container {
  width: 100%;
  min-height: 100vh;
	background-color: #f5f4f9;
}
</style>
