<template>
	<view class="shop-member-card-form-container">
		<JHeader width="50" height="50" title="商家会员卡表单"></JHeader>
		<FieldPaneMCEF v-model="form.basicInfo" :fields="equityInfo" title="基本信息"></FieldPaneMCEF>

		<ATFUpload
			:title="uploadFields[0].label" :img-url="form.imgs[uploadFields[0].field]"
			@upload="handleSaveImg(uploadFields[0].field, $event)" @delete="handleDeleteImg(uploadFields[0].field)"
		></ATFUpload>

		<view class="buts">
			<button class="btn" @click="submit()">
				提交
			</button>
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
					label: '会员卡名称：',
					field: 'cardName',
					type: 'input',
					placeholder: '请输入会员卡名称'
				},
				{
					label: '会员卡权益说明',
					type: 'textarea',
					field: 'cardEquityStatement',
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
			uni.showModal({
				title: '提示',
				content: '确认提交会员卡权益表单？',
				success: (res) => {
					if (res.confirm) {
						if (data.cardId) {
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
.shop-member-card-form-container {
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
