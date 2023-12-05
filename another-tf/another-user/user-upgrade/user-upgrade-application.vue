<template>
	<view class="user-upgrade-application-container">
		<JHeader width="50" height="50" title="申请表单"></JHeader>
		<FieldPaneUUA v-model="form.basicInfo" :fields="applyUserUpgradeOne" title="申请信息"></FieldPaneUUA>
		<view class="buts">
			<button class="btn" @click="submit()">
				提交
			</button>
		</view>
	</view>
</template>

<script>
import FieldPaneUUA from './components/field-pane-uua.vue'
import { addPlatformRelationshipApplyApi } from '../../../api/anotherTFInterface'

export default {
	name: 'UserUpgradeApplication',
	components: {
		FieldPaneUUA
	},
	onLoad(options) {
	},
	data() {
		return {
			applyUserUpgradeOne: [
				{
					label: '会员类型：',
					field: 'levelType', // 5-区代理 4-加盟商 3-合伙人 2-团长 1-会员
					type: 'select'
				},
				{
					label: '所在区域：',
					field: 'region',
					type: 'area',
					placeholder: '请选择所在区域'
				},
				{
					label: '详细地址（门牌号）',
					type: 'textarea',
					field: 'address',
					placeholder: '请填写详细地址'
				},
				{
					label: '联系电话：',
					type: 'input',
					field: 'phone',
					placeholder: '请填写手机号码'
				},
				{
					label: '姓名：',
					field: 'name',
					type: 'input',
					placeholder: '请填写姓名'
				}
			],
			form: {
				basicInfo: {
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
			if (!data.levelType) {
				this.$showToast('请选择会员类型')
				return
			}
			if (!data.region) {
				this.$showToast('请选择所在区域')
				return
			}
			if (!data.address) {
				this.$showToast('请填写详细地址')
				return
			}
			if (
				!/^1[3456789]\d{9}$/.test(data.phone)
			) {
				this.$showToast('手机号码格式错误')
				return
			}
			if (!data.name) {
				this.$showToast('请填写姓名')
				return
			}
			uni.showModal({
				title: '提示',
				content: '确认提交会员升级申请？',
				success: (res) => {
					if (res.confirm) {
						addPlatformRelationshipApplyApi(data).then((res) => {
							this.$showToast('提交成功，请等待审核')
							setTimeout(() => {
								// uni.navigateBack()
								this.$switchTab('/pages/user/user')
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
.user-upgrade-application-container {
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

		&.withdraw {
			width: 100%;
			background: #999;
			letter-spacing: 10upx;
		}
	}
}
</style>
