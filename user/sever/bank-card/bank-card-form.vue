<template>
	<view class="bank-card-form-container">
		<JHeader width="50" height="50" title="银行卡表单"></JHeader>
		<FieldPaneBCF v-model="form.basicInfo" :fields="applyOne" title="银行卡信息"></FieldPaneBCF>
		<view class="buts">
			<button class="btn" @click="submit()">
				提交
			</button>
		</view>
	</view>
</template>

<script>
import FieldPaneBCF from './components/field-pane-bcf.vue'
import { saveBankCardUserApi, updateBankCardUserApi, getBankCardDetailUserApi } from '../../../api/user'

export default {
	name: 'BankCardForm',
	components: {
		FieldPaneBCF
	},
	onLoad(options) {
		if (options.id) {
			this.getBankCardDetail(options.id)
		}
	},
	data() {
		return {
			applyOne: [
				{
					label: '银行名称：',
					field: 'bankName',
					type: 'input',
					placeholder: '请填写银行名称'
				},
				{
					label: '开卡银行名称：',
					field: 'openCardBank',
					type: 'input',
					placeholder: '请填写开卡银行名称'
				},
				{
					label: '银行卡卡号：',
					field: 'cardNo',
					type: 'input',
					placeholder: '请填写银行卡卡号'
				},
				{
					label: '关联手机号：',
					field: 'mobile',
					type: 'input',
					placeholder: '请填写关联手机号'
				}
			],
			form: {
				basicInfo: {
					id: '',
					bankName: '',
					openCardBank: '',
					cardNo: '',
					mobile: ''
				}
			}
		}
	},

	methods: {
		// 获取银行卡详情
		async getBankCardDetail(id) {
			uni.showLoading()
			this.form.basicInfo.id = id
			try {
				const data = await getBankCardDetailUserApi({ id })
				uni.hideLoading()
				this.form.basicInfo.bankName = data.bankName || ''
				this.form.basicInfo.cardNo = data.cardNo || ''
				this.form.basicInfo.openCardBank = data.openCardBank || ''
				this.form.basicInfo.mobile = data.mobile || ''
			} catch (err) {
				console.log(err)
				uni.hideLoading()
			}
		},

		// 点击提交按钮
		submit() {
			const data = {
				...this.form.basicInfo
			}
			console.log(data)
			if (!data.bankName) {
				this.$showToast('缺少银行名称')
				return
			}
			if (!data.openCardBank) {
				this.$showToast('缺少开卡银行名称')
				return
			}
			if (!data.mobile) {
				this.$showToast('缺少手机号')
				return
			}
			if (!data.cardNo) {
				this.$showToast('缺少银行卡卡号')
				return
			}
			if (!(/^[1-9]\d{9,29}$/).test(data.cardNo)) {
				this.$showToast('卡号格式错误')
				return
			}
			uni.showModal({
				title: '提示',
				content: '确认提交银行卡表单？',
				success: (res) => {
					if (res.confirm) {
						if (data.id) {
							updateBankCardUserApi(data).then((data) => {
								this.$showToast('修改银行卡成功')
								setTimeout(() => {
									uni.navigateBack()
								}, 2000)
							})
						} else {
							saveBankCardUserApi(data).then((data) => {
								this.$showToast('添加银行卡成功')
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
.bank-card-form-container {
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
