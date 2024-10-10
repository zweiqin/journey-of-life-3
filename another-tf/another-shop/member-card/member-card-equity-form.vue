<template>
	<view class="member-card-equity-form-container">
		<JHeader width="50" height="50" title="会员卡权益表单"></JHeader>
		<view style="padding: 0 40rpx;">
			<FieldPaneMCEF
				v-model="form.basicInfo" :fields="equityInfo" title="基础信息"
				form-border-radius="16rpx 16rpx 0 0"
			></FieldPaneMCEF>

			<view
				style="padding: 0rpx 28rpx 2rpx;background-color: #ffffff;border-radius: 0 0 16rpx 16rpx;"
			>
				<ATFUpload
					margin="0 0 30rpx" :title="uploadFields[0].label" :img-url="form.imgs[uploadFields[0].field]"
					@upload="handleSaveImg(uploadFields[0].field, $event)" @delete="handleDeleteImg(uploadFields[0].field)"
				></ATFUpload>
			</view>
		</view>

		<view
			class="operation-btn"
			style="width: 100%;position: fixed;bottom: 0;left: 0;background: #f0f0f0;padding: 30rpx;box-sizing: border-box;"
		>
			<tui-button
				type="warning" width="auto" height="86rpx" margin="10rpx 16rpx 0"
				:size="28"
				@click="submit()"
			>
				{{ form.basicInfo.equityId ? '确认编辑' : '确认创建' }}
			</tui-button>
		</view>
	</view>
</template>

<script>
import FieldPaneMCEF from './components/field-pane-mcef.vue'
import { getByIdShopMemberCardEquityApi, addShopMemberCardEquityApi, updateShopMemberCardEquityApi } from '../../../api/anotherTFInterface'

export default {
	name: 'MemberCardEquityForm',
	components: {
		FieldPaneMCEF
	},
	onLoad(options) {
		this.$store.dispatch('auth/unifiedProcessingShopAction', {
			cb: () => {
				this.form.basicInfo.cardId = options.cardId || ''
				if (options.id) {
					this.getCardEquityDetail(options.id)
				}
			}
		})
	},
	data() {
		return {
			equityInfo: [
				{
					label: 'ID：',
					field: 'equityId',
					type: 'input',
					placeholder: '请输入equityId'
				},
				{
					label: '关联会员卡：',
					field: 'cardId',
					type: 'picker'
				},
				{
					label: '权益名称：',
					field: 'equityName',
					type: 'input',
					placeholder: '请输入权益名称'
				},
				{
					label: '会员卡权益说明',
					type: 'textarea',
					field: 'equityRemark',
					placeholder: '请填写会员卡权益说明'
				}
			],
			uploadFields: [
				{
					label: '权益Icon',
					field: 'equityIcon'
				}
			],
			form: {
				basicInfo: {
					equityId: '',
					cardId: '',
					equityName: '',
					equityRemark: ''
				},
				imgs: {
					equityIcon: ''
				}
			}
		}
	},

	methods: {
		// 获取会员卡权益详情
		getCardEquityDetail(id) {
			this.form.basicInfo.equityId = id
			uni.showLoading()
			getByIdShopMemberCardEquityApi({ id })
				.then((res) => {
					uni.hideLoading()
					this.form.basicInfo.cardId = res.data.cardId || ''
					this.form.basicInfo.equityName = res.data.equityName || ''
					this.form.basicInfo.equityRemark = res.data.equityRemark || ''
					this.form.imgs.equityIcon = res.data.equityIcon || ''
				})
				.catch((e) => {
					uni.hideLoading()
				})
		},

		handleSaveImg(field, imgUrl) {
			console.log(field, imgUrl)
			if (field === 'equityIcon') {
				this.form.imgs[field] = imgUrl
			}
			this.$forceUpdate()
		},

		// 点击提交按钮
		submit() {
			const data = {
				...this.form.imgs,
				...this.form.basicInfo
			}
			console.log(data)
			if (!data.cardId) {
				this.$showToast('请选择关联会员卡')
				return
			}
			if (!data.equityName) {
				this.$showToast('缺少权益名称')
				return
			}
			if (!data.equityIcon) {
				this.$showToast('缺少权益Icon')
				return
			}
			if (!data.equityRemark) {
				this.$showToast('缺少权益说明')
				return
			}
			uni.showModal({
				title: '提示',
				content: '确认提交会员卡权益表单？',
				success: (res) => {
					if (res.confirm) {
						if (data.equityId) {
							updateShopMemberCardEquityApi(data).then((res) => {
								this.$showToast('修改会员卡权益成功')
								setTimeout(() => {
									uni.navigateBack()
								}, 2000)
							})
						} else {
							addShopMemberCardEquityApi(data).then((res) => {
								this.$showToast('添加会员卡权益成功')
								setTimeout(() => {
									uni.navigateBack()
								}, 2000)
							})
						}
					}
				}
			})
		},

		// 删除当前图片
		handleDeleteImg(field, imgUrl) {
			if (field === 'equityIcon') {
				this.form.imgs[field] = ''
			}
			this.$forceUpdate()
			console.log(this.form.imgs[field])
		}
	}
}
</script>

<style lang="less" scoped>
.member-card-equity-form-container {
	min-height: 100vh;
	padding: 0 0 180rpx;
	background-color: #f1f1f1;
	box-sizing: border-box;

	/deep/ .j-header-wrapper {
		padding: 24rpx 12rpx 10rpx;
		background-color: #ffffff;
	}

	.operation-btn {
		/deep/ .tui-btn {
			border-radius: 20rpx;
		}

		/deep/ .tui-btn-warning {
			background-color: #ef530e !important;
		}
	}
}
</style>
