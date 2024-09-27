<template>
	<view class="shop-member-card-form-container">
		<JHeader width="50" height="50" title="商家会员卡表单"></JHeader>
		<FieldPaneSMCF v-model="form.basicInfo" :fields="cardInfo" title="基本信息"></FieldPaneSMCF>

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
				this.form.basicInfo.shopId = this.$store.state.auth.identityInfo.shopInfo.shopId
				if ([ 1 ].includes(this.$store.state.app.terminal)) {
					this.form.basicInfo.memberCardChannel = '1'
				} else if ([3, 5, 6].includes(this.$store.state.app.terminal)) {
					this.form.basicInfo.memberCardChannel = '2'
				} else if ([ 4 ].includes(this.$store.state.app.terminal)) {
					this.form.basicInfo.memberCardChannel = '3'
				} else if ([ 2 ].includes(this.$store.state.app.terminal)) {
					this.form.basicInfo.memberCardChannel = '5'
				}
				if (options.id) {
					this.getMemberCardDetail(options.id)
				}
			}
		})
	},
	data() {
		return {
			cardInfo: [
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
					label: '会员卡类型：',
					field: 'memberCardType',
					type: 'radio',
					placeholder: '会员卡类型'
				},
				{
					label: '发行张数：',
					field: 'memberCardNumber',
					type: 'input',
					placeholder: '请输入发行张数'
				},
				{
					label: '发行渠道：',
					field: 'memberCardChannel',
					type: 'radio',
					placeholder: '发行渠道'
				},
				{
					label: '会员人群级别：',
					field: 'memberCardLevel',
					type: 'radio',
					placeholder: '会员人群级别'
				},
				{
					label: '会员天数：',
					field: 'memberCardDays',
					type: 'input',
					placeholder: '请输入会员天数'
				},
				{
					label: '会员卡权益说明',
					type: 'textarea',
					field: 'cardEquityStatement',
					placeholder: '请填写会员卡权益说明'
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
				{
					label: '代理商采购价：',
					type: 'input',
					field: 'agentPurchasePrice',
					placeholder: '请输入代理商采购价'
				},
				{
					label: '推广佣金：',
					type: 'input',
					field: 'promotionPrice',
					placeholder: '请输入推广佣金'
				}
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
			uploadFields: [
				{
					label: '会员卡封面',
					field: 'cardCover'
				}
			],
			form: {
				basicInfo: {
					cardId: '',
					shopId: '',
					cardName: '',
					memberCardType: '',
					memberCardNumber: '',
					memberCardChannel: '',
					memberCardLevel: '',
					memberCardDays: '',
					cardEquityStatement: '',
					cardPrice: '',
					cardDiscountedPrice: '',
					agentPurchasePrice: '',
					promotionPrice: ''
					// startTime: '',
					// endTime: ''
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
			this.form.basicInfo.cardId = id
			uni.showLoading()
			getByIdShopMemberCardApi({ id })
				.then((res) => {
					uni.hideLoading()
					this.form.basicInfo.cardName = res.data.cardName || ''
					this.form.basicInfo.memberCardType = String(res.data.memberCardType) || ''
					this.form.basicInfo.memberCardNumber = res.data.memberCardNumber || ''
					// this.form.basicInfo.memberCardChannel = String(res.data.memberCardChannel) || ''
					this.form.basicInfo.memberCardLevel = String(res.data.memberCardLevel) || ''
					this.form.basicInfo.memberCardDays = res.data.memberCardDays || ''
					this.form.basicInfo.cardEquityStatement = res.data.cardEquityStatement || ''
					this.form.basicInfo.cardPrice = res.data.cardPrice || ''
					this.form.basicInfo.cardDiscountedPrice = res.data.cardDiscountedPrice || ''
					this.form.basicInfo.agentPurchasePrice = res.data.agentPurchasePrice || ''
					this.form.basicInfo.promotionPrice = res.data.promotionPrice || ''
					// this.form.basicInfo.startTime = res.data.startTime || ''
					// this.form.basicInfo.endTime = res.data.endTime || ''
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
				...this.form.basicInfo
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
			if (!data.memberCardType) {
				this.$showToast('缺少会员卡类型')
				return
			}
			if (!data.memberCardNumber) {
				this.$showToast('缺少发行张数')
				return
			}
			if (!data.memberCardChannel) {
				this.$showToast('缺少发行渠道')
				return
			}
			if (!data.memberCardLevel) {
				this.$showToast('缺少会员人群级别')
				return
			}
			if (!data.memberCardDays) {
				this.$showToast('缺少会员天数')
				return
			}
			if (!data.cardDiscountedPrice) {
				this.$showToast('缺少折扣价')
				return
			}
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
