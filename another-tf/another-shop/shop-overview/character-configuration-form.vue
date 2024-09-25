<template>
	<view class="character-configuration-form-container">
		<JHeader width="50" height="50" title="字段表单"></JHeader>
		<FieldPaneCCF v-model="form.basicInfo" :fields="characterInfo" title="基本信息"></FieldPaneCCF>

		<view class="buts">
			<button class="btn" @click="submit()">
				提交
			</button>
		</view>
	</view>
</template>

<script>
import FieldPaneCCF from './components/field-pane-ccf.vue'
import { addShopCostFieldApi, getByIdShopCostFieldApi, updateShopCostFieldApi } from '../../../api/anotherTFInterface'

export default {
	name: 'CharacterConfigurationForm',
	components: {
		FieldPaneCCF
	},
	onLoad(options) {
		this.$store.dispatch('auth/unifiedProcessingShopAction', {
			cb: () => {
				this.form.basicInfo.shopId = this.$store.state.auth.identityInfo.shopInfo.shopId
				if (options.id) {
					this.getCharacterDetail(options.id)
				}
			}
		})
	},
	data() {
		return {
			characterInfo: [
				{
					label: 'ID：',
					field: 'id',
					type: 'input',
					placeholder: '请输入ID'
				},
				{
					label: '店铺ID：',
					field: 'shopId',
					type: 'input',
					placeholder: '缺少店铺ID'
				},
				{
					label: '字段名称',
					field: 'fieldName',
					type: 'input',
					placeholder: '请输入字段名称'
				},
				{
					label: '支出费用：',
					field: 'fieldPrice',
					type: 'input',
					placeholder: '请填写支出费用'
				}
			],
			form: {
				basicInfo: {
					id: '',
					shopId: '',
					fieldName: '',
					fieldPrice: ''
				}
			}
		}
	},

	methods: {
		// 获取字段详情
		async getCharacterDetail(id) {
			this.form.basicInfo.id = id
			uni.showLoading()
			getByIdShopCostFieldApi({ id })
				.then((res) => {
					this.form.basicInfo.shopId = (res.data && res.data.shopId) || ''
					this.form.basicInfo.fieldName = (res.data && res.data.fieldName) || ''
					this.form.basicInfo.fieldPrice = res.data && res.data.fieldPrice
					uni.hideLoading()
				})
				.catch((e) => {
					uni.hideLoading()
				})
		},

		// 点击提交按钮
		submit() {
			const data = {
				...this.form.basicInfo
			}
			console.log(data)
			if (!data.shopId) {
				this.$showToast('缺少商家信息')
				return
			}
			if (!data.fieldName) {
				this.$showToast('缺少字段名称')
				return
			}
			if (!data.fieldPrice) {
				this.$showToast('请填写支出费用')
				return
			}
			uni.showModal({
				title: '提示',
				content: '确认提交字段表单？',
				success: (res) => {
					if (res.confirm) {
						if (data.id) {
							updateShopCostFieldApi(data).then((res) => {
								this.$showToast('修改字段成功')
								setTimeout(() => {
									uni.navigateBack()
								}, 2000)
							})
						} else {
							addShopCostFieldApi(data).then((res) => {
								this.$showToast('添加字段成功')
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
.character-configuration-form-container {
	padding: 40rpx 40rpx 140rpx 40rpx;
	box-sizing: border-box;

	.buts {
		position: fixed;
		bottom: -1px;
		z-index: 2;
		padding: 20rpx 40rpx;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		width: 100%;
		box-sizing: border-box;
		margin-top: 272rpx;
	}

	.btn {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 72rpx;
		width: 306rpx;
		font-size: 32rpx;
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
