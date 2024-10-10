<template>
	<view class="shop-member-card-form-container">
		<JHeader width="50" height="50" :title="form.basicInfo1.cardId ? '编辑会员卡' : '创建会员卡'"></JHeader>
		<view style="padding: 0 40rpx;">
			<FieldPaneSMCF
				v-model="form.basicInfo1" :fields="cardInfo1" title="基础信息"
				form-border-radius="16rpx 16rpx 0 0"
			></FieldPaneSMCF>

			<view
				style="padding: 0rpx 28rpx 2rpx;background-color: #ffffff;border-radius: 0 0 16rpx 16rpx;"
			>
				<ATFUpload
					margin="0 0 30rpx" :title="uploadFields[0].label" :img-url="form.imgs[uploadFields[0].field]"
					@upload="handleSaveImg(uploadFields[0].field, $event)" @delete="handleDeleteImg(uploadFields[0].field)"
				></ATFUpload>
			</view>

			<FieldPaneSMCF v-model="form.basicInfo2" :fields="cardInfo2" title="会员卡信息"></FieldPaneSMCF>

			<FieldPaneSMCF v-model="form.basicInfo3" :fields="cardInfo3" title="权益信息"></FieldPaneSMCF>
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
				{{ form.basicInfo1.cardId ? '确认编辑' : '确认创建' }}
			</tui-button>
		</view>
	</view>
</template>

<script>
import FieldPaneSMCF from './components/field-pane-smcf.vue'
import { getByIdShopMemberCardApi, addShopMemberCardApi, updateShopMemberCardApi } from '../../../api/anotherTFInterface'

export default {
	name: 'ShopMemberCardForm',
	components: {
		FieldPaneSMCF
	},
	onLoad(options) {
		this.$store.dispatch('auth/unifiedProcessingShopAction', {
			cb: () => {
				this.form.basicInfo1.shopId = this.$store.state.auth.identityInfo.shopInfo.shopId
				// if ([ 1 ].includes(this.$store.state.app.terminal)) {
				// 	this.form.basicInfo2.memberCardChannel = this.form.basicInfo2.originMemberCardChannel = '1'
				// } else if ([3, 5, 6].includes(this.$store.state.app.terminal)) {
				// 	this.form.basicInfo2.memberCardChannel = this.form.basicInfo2.originMemberCardChannel = '2'
				// } else if ([ 4 ].includes(this.$store.state.app.terminal)) {
				// 	this.form.basicInfo2.memberCardChannel = this.form.basicInfo2.originMemberCardChannel = '3'
				// } else if ([ 2 ].includes(this.$store.state.app.terminal)) {
				// 	this.form.basicInfo2.memberCardChannel = this.form.basicInfo2.originMemberCardChannel = '5'
				// }
				if (options.id) {
					this.getMemberCardDetail(options.id)
				}
			}
		})
	},
	data() {
		return {
			cardInfo1: [
				{
					label: 'ID：',
					field: 'cardId',
					type: 'input',
					placeholder: '请输入cardId'
				},
				{
					label: '店铺ID：',
					field: 'shopId',
					type: 'input',
					placeholder: '缺少店铺ID'
				},
				{
					label: '会员卡名称：',
					field: 'cardName',
					type: 'input',
					placeholder: '请输入会员卡名称'
				},
				{
					label: '会员人群级别：',
					field: 'memberCardLevel',
					type: 'radio',
					placeholder: '会员人群级别'
				}
			],
			cardInfo2: [
				{
					label: '会员卡类型：',
					field: 'memberCardType',
					type: 'select',
					placeholder: '会员卡类型'
				},
				{
					label: '会员卡有效天数：',
					field: 'memberCardDays',
					type: 'input',
					placeholder: '请输入会员卡有效天数'
				},
				{
					label: '原价：',
					type: 'input',
					field: 'cardPrice',
					placeholder: '请输入原价'
				},
				{
					label: '折扣价：',
					type: 'input',
					field: 'cardDiscountedPrice',
					placeholder: '请输入折扣价'
				},
				// {
				// 	label: '代理商采购价：',
				// 	type: 'input',
				// 	field: 'agentPurchasePrice',
				// 	placeholder: '请输入代理商采购价'
				// },
				{
					label: '推广佣金：',
					type: 'input',
					field: 'promotionPrice',
					placeholder: '请输入推广佣金'
				},
				{
					label: '发行张数：',
					field: 'memberCardNumber',
					type: 'input',
					placeholder: '请输入发行张数'
				}
				// {
				// 	label: '发行渠道：',
				// 	field: 'memberCardChannel',
				// 	type: 'select',
				// 	placeholder: '发行渠道'
				// },
				// {
				// 	label: '系统发行渠道：',
				// 	field: 'originMemberCardChannel',
				// 	type: 'select',
				// 	placeholder: '系统发行渠道'
				// }
				// {
				// 	label: '购买有效期开始日期：',
				// 	field: 'startTime',
				// 	type: 'time',
				// 	placeholder: '请选择购买有效期开始日期'
				// },
				// {
				// 	label: '购买有效期结束日期：',
				// 	field: 'endTime',
				// 	type: 'time',
				// 	placeholder: '请选择购买有效期结束日期'
				// }
			],
			cardInfo3: [
				{
					label: '会员卡权益说明',
					type: 'textarea',
					field: 'cardEquityStatement',
					placeholder: '请填写会员卡权益说明'
				}
			],
			uploadFields: [
				{
					label: '会员卡封面上传',
					field: 'cardCover'
				}
			],
			form: {
				basicInfo1: {
					cardId: '',
					shopId: '',
					cardName: '',
					memberCardLevel: ''
				},
				basicInfo2: {
					memberCardType: '',
					memberCardDays: '',
					cardPrice: '',
					cardDiscountedPrice: '',
					// agentPurchasePrice: '',
					promotionPrice: '',
					memberCardNumber: ''
					// memberCardChannel: '',
					// originMemberCardChannel: '',
					// startTime: '',
					// endTime: ''
				},
				basicInfo3: {
					cardEquityStatement: ''
				},
				imgs: {
					cardCover: ''
				}
			}
		}
	},

	methods: {
		// 获取商家会员卡详情
		getMemberCardDetail(id) {
			this.form.basicInfo1.cardId = id
			uni.showLoading()
			getByIdShopMemberCardApi({ id })
				.then((res) => {
					uni.hideLoading()
					this.form.basicInfo1.cardName = res.data.cardName || ''
					this.form.basicInfo1.memberCardLevel = String(res.data.memberCardLevel) || ''
					this.form.basicInfo2.memberCardType = String(res.data.memberCardType) || ''
					this.form.basicInfo2.memberCardDays = res.data.memberCardDays || ''
					this.form.basicInfo2.cardPrice = res.data.cardPrice || ''
					this.form.basicInfo2.cardDiscountedPrice = res.data.cardDiscountedPrice || ''
					// this.form.basicInfo2.agentPurchasePrice = res.data.agentPurchasePrice || ''
					this.form.basicInfo2.promotionPrice = res.data.promotionPrice || ''
					this.form.basicInfo2.memberCardNumber = res.data.memberCardNumber || ''
					// this.form.basicInfo2.memberCardChannel = String(res.data.memberCardChannel) || ''
					// this.form.basicInfo2.startTime = res.data.startTime || ''
					// this.form.basicInfo2.endTime = res.data.endTime || ''
					this.form.basicInfo3.cardEquityStatement = res.data.cardEquityStatement || ''
					this.form.imgs.cardCover = res.data.cardCover || ''
				})
				.catch((e) => {
					uni.hideLoading()
				})
		},

		handleSaveImg(field, imgUrl) {
			console.log(field, imgUrl)
			if (field === 'cardCover') {
				this.form.imgs[field] = imgUrl
			}
			this.$forceUpdate()
		},

		// 点击提交按钮
		submit() {
			const data = {
				...this.form.imgs,
				cardId: this.form.basicInfo1.cardId,
				shopId: this.form.basicInfo1.shopId,
				cardName: this.form.basicInfo1.cardName,
				memberCardLevel: this.form.basicInfo1.memberCardLevel,
				memberCardType: this.form.basicInfo2.memberCardType,
				memberCardDays: this.form.basicInfo2.memberCardDays,
				cardPrice: this.form.basicInfo2.cardPrice,
				cardDiscountedPrice: this.form.basicInfo2.cardDiscountedPrice,
				// agentPurchasePrice: this.form.basicInfo2.agentPurchasePrice,
				promotionPrice: this.form.basicInfo2.promotionPrice,
				memberCardNumber: this.form.basicInfo2.memberCardNumber,
				// memberCardChannel: this.form.basicInfo2.memberCardChannel,
				// startTime: this.form.basicInfo2.startTime,
				// endTime: this.form.basicInfo2.endTime,
				cardEquityStatement: this.form.basicInfo3.cardEquityStatement
			}
			console.log(data)
			if (!data.shopId) {
				this.$showToast('缺少商家信息')
				return
			}
			if (!data.cardName) {
				this.$showToast('缺少会员卡名称')
				return
			}
			if (!data.memberCardLevel) {
				this.$showToast('缺少会员人群级别')
				return
			}
			if (!data.memberCardType) {
				this.$showToast('缺少会员卡类型')
				return
			}
			if (!data.memberCardDays) {
				this.$showToast('缺少会员卡有效天数')
				return
			}
			if (!data.cardDiscountedPrice) {
				this.$showToast('缺少折扣价')
				return
			}
			if (!data.memberCardNumber) {
				this.$showToast('缺少发行张数')
				return
			}
			// if (!data.memberCardChannel) {
			// 	this.$showToast('缺少发行渠道')
			// 	return
			// }
			// if (!data.startTime) {
			// 	this.$showToast('缺少购买有效期开始日期')
			// 	return
			// }
			// if (!data.endTime) {
			// 	this.$showToast('缺少购买有效期结束日期')
			// 	return
			// }
			uni.showModal({
				title: '提示',
				content: '确认提交商家会员卡表单？',
				success: (res) => {
					if (res.confirm) {
						if (data.cardId) {
							updateShopMemberCardApi(data).then((res) => {
								this.$showToast('修改商家会员卡成功')
								setTimeout(() => {
									uni.navigateBack()
								}, 2000)
							})
						} else {
							addShopMemberCardApi(data).then((res) => {
								this.$showToast('添加商家会员卡成功')
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
			if (field === 'cardCover') {
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
