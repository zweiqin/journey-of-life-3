<template>
	<view class="user-upgrade-application-container">
		<FieldPaneUUA v-model="form.basicInfo" :fields="applyUserUpgradeOne" :has-type="hasType" title="申请表单" @change-form="handleChangeForm"></FieldPaneUUA>
		<view
			style="position: fixed;bottom: 0;z-index: 1;display: flex;justify-content: space-between;width: 100%;padding: 18upx;background-color: #ffffff;box-sizing: border-box;"
		>
			<tui-button
				type="black" width="330upx" height="104upx" margin="20upx 0"
				plain
				style="font-weight: bold;border-radius: 10upx;" @click="handleBack"
			>
				点击选择
			</tui-button>
			<tui-button
				type="warning" width="330upx" height="104upx" margin="20upx 0"
				style="font-weight: bold;color: #F5CEA8;background: #2C2B30!important;border-radius: 10upx;"
				@click="submit"
			>
				确认升级
			</tui-button>
		</view>
	</view>
</template>

<script>
import FieldPaneUUA from './components/field-pane-uua.vue'
import { addPlatformRelationshipApplyApi, getSelectApplyPlatformRelationApi } from '../../../api/anotherTFInterface'

export default {
	name: 'UserUpgradeApplication',
	components: {
		FieldPaneUUA
	},
	onLoad(options) {
		getSelectApplyPlatformRelationApi({})
			.then((res) => {
				if (res.data && res.data.applyId) {
					this.$showToast('已存在申请，请等待审核')
					setTimeout(() => {
						uni.navigateBack()
					}, 2000)
				}
			})
		if (Number(options.type)) {
			this.form.basicInfo.levelType = Number(options.type)
			this.hasType = true
		}
	},
	data() {
		return {
			hasType: false,
			applyUserUpgradeOne: [
				{
					label: '会员类型所属区域：',
					field: 'manageArea', // 查询会员类型接口所需参数
					type: 'area',
					placeholder: '请选择会员类型所属区域'
				},
				{
					label: '会员类型：',
					field: 'levelType', // 5-区代理 4-加盟商 3-合伙人 2-团长 1-会员
					type: 'select',
					placeholder: '请选择会员类型'
				},
				{
					label: '区域',
					field: 'region',
					type: 'area',
					placeholder: '选择您的区域 ＞'
				},
				{
					label: '详细地址（门牌号）',
					type: 'textarea',
					field: 'address',
					placeholder: '请填写详细地址'
				},
				{
					label: '姓名',
					field: 'name',
					type: 'input',
					placeholder: '填写您的姓名'
				},
				{
					label: '手机号',
					type: 'input',
					field: 'phone',
					placeholder: '请填写您的手机号'
				}
			],
			form: {
				basicInfo: {
					manageArea: '',
					levelType: '',
					region: ''
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
		},
		handleBack() {
			uni.navigateBack()
		},
		handleChangeForm() {
			this.hasType = false
		}
	}
}
</script>

<style lang="less" scoped>
.user-upgrade-application-container {
	width: 100%;
	min-height: 100vh;
	// padding: 40upx 40upx 140upx 40upx;
	padding-bottom: 184upx;
	background-color: #f5f4f9;
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
