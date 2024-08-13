<template>
	<view class="receiving-account-form-container">
		<JHeader width="50" height="50" title="收款账户表单"></JHeader>
		<FieldPaneRA v-model="form.basicInfo" :fields="applyOne" title="账户信息"></FieldPaneRA>
		<view class="buts">
			<button class="btn" @click="submit()">
				提交
			</button>
		</view>
	</view>
</template>

<script>
import FieldPaneRA from './components/field-pane-ra.vue'
import { getByIdBankApi, updateBankUpdateApi, addBankSaveApi } from '../../../api/anotherTFInterface'

export default {
	name: 'ReceivingAccountForm',
	components: {
		FieldPaneRA
	},
	onLoad(options) {
		if (Number(options.isEdit)) {
			this.getBankMessage()
		}
	},
	data() {
		return {
			applyOne: [
				{
					label: '持卡人姓名：',
					field: 'cardName',
					type: 'input',
					placeholder: '请填写持卡人姓名'
				},
				{
					label: '卡号：',
					field: 'cardNumber',
					type: 'input',
					placeholder: '请填写卡号'
				},
				{
					label: '银行：',
					field: 'bank',
					type: 'select'
				},
				{
					label: '注册手机号：',
					field: 'phone',
					type: 'input',
					placeholder: '请填写注册手机号'
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
					cardName: '',
					cardNumber: '',
					bank: '',
					phone: '',
					code: ''
				}
			}
		}
	},

	methods: {
		// 获取收款账户信息
		async getBankMessage() {
			uni.showLoading()
			const res = await getByIdBankApi({})
			uni.hideLoading()
			if (res.data) {
				this.form.basicInfo.cardName = res.data.cardName || ''
				this.form.basicInfo.cardNumber = res.data.cardNumber || ''
				this.form.basicInfo.bank = res.data.bank || ''
				this.form.basicInfo.phone = res.data.phone || ''
			}
		},

		// 点击提交按钮
		submit() {
			const data = {
				...this.form.basicInfo
			}
			console.log(data)
			if (!data.cardName) {
				this.$showToast('缺少持卡人姓名')
				return
			}
			if (!data.cardNumber) {
				this.$showToast('缺少卡号')
				return
			}
			if (!(/^([1-9]{1})(\d{15}|\d{16}|\d{17}|\d{18}|\d{19}|\d{20})$/).test(data.cardNumber)) {
				this.$showToast('卡号格式错误')
				return
			}
			if (!data.bank) {
				this.$showToast('缺少银行信息')
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
				content: '确认提交收款账户表单？',
				success: (res) => {
					if (res.confirm) {
						if (data.id) {
							updateBankUpdateApi(data).then((res) => {
								this.$showToast('提交成功')
								setTimeout(() => {
									uni.navigateBack()
								}, 2000)
							})
						} else {
							addBankSaveApi(data).then((res) => {
								this.$showToast('提交成功')
								setTimeout(() => {
									uni.navigateBack()
								}, 2000)
							})
						}
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
