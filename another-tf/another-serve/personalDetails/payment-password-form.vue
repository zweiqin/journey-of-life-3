<template>
	<view class="receiving-account-form-container">
		<JHeader width="50" height="50" title="支付密码表单"></JHeader>
		<FieldPanePP v-model="form.basicInfo" :fields="applyOne" title="设置支付密码"></FieldPanePP>
		<view class="buts">
			<button class="btn" @click="submit()">
				提交
			</button>
		</view>
	</view>
</template>

<script>
import FieldPanePP from './components/field-pane-pp.vue'
import { updateSetUpPwdBuyerUserExtendApi } from '../../../api/anotherTFInterface'

export default {
	name: 'PaymentPasswordForm',
	components: {
		FieldPanePP
	},
	onLoad(options) {
		this.form.basicInfo.phone = this.$store.getters.userInfo.phone || ''
	},
	data() {
		return {
			applyOne: [
				{
					label: '支付密码：',
					field: 'pwd',
					type: 'input',
					placeholder: '请填写支付密码'
				},
				{
					label: '手机号：',
					field: 'phone',
					type: 'input',
					placeholder: '请填写手机号'
				},
				{
					label: '验证码：',
					field: 'code',
					type: 'input',
					placeholder: '请填写验证码'
				}
			],
			form: {
				basicInfo: {
					pwd: '',
					phone: '',
					code: ''
				}
			}
		}
	},

	methods: {
		// 点击提交按钮
		submit() {
			const data = {
				...this.form.basicInfo
			}
			console.log(data)
			if (!data.pwd) {
				this.$showToast('缺少支付密码')
				return
			}
			if (!data.phone) {
				this.$showToast('缺少手机号')
				return
			}
			if (!data.code) {
				this.$showToast('缺少验证码')
				return
			}
			if (!(/^1[3-9]\d{9}$/).test(data.phone)) {
				this.$showToast('手机号格式错误')
				return
			}
			uni.showModal({
				title: '提示',
				content: '确认提交支付密码表单？',
				success: (res) => {
					if (res.confirm) {
						updateSetUpPwdBuyerUserExtendApi(data).then((res) => {
							this.$showToast('提交成功')
							setTimeout(() => {
								uni.navigateBack()
							}, 2000)
						})
					}
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
.receiving-account-form-container {
	padding: 40upx 40upx 140upx 40upx;
	box-sizing: border-box;

	.buts {
		position: fixed;
		bottom: -1px;
		z-index: 2;
		padding: 20upx 40upx;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		width: 100%;
		box-sizing: border-box;
		margin-top: 272upx;
	}

	.btn {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 72upx;
		width: 306upx;
		font-size: 32upx;
		color: #fff;
		margin: 0;
		background-color: #07b9b9;
		border-radius: 100px;

		&:last-child {
			background-color: #fa5151;
		}
	}
}
</style>
