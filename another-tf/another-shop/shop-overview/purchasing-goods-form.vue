<template>
	<view class="purchasing-goods-form-container">
		<JHeader width="50" height="50" title="采购商品表单"></JHeader>
		<FieldPanePGF v-model="form.basicInfo" :fields="purchasingGoodsInfo" title="基本信息"></FieldPanePGF>

		<view class="buts">
			<button class="btn" @click="submit()">
				提交
			</button>
		</view>
	</view>
</template>

<script>
import FieldPanePGF from './components/field-pane-pgf.vue'
import { addShopCostRevenueApi, getByIdShopCostRevenueApi, updateShopCostRevenueApi } from '../../../api/anotherTFInterface'

export default {
	name: 'PurchasingGoodsForm',
	components: {
		FieldPanePGF
	},
	onLoad(options) {
		this.$store.dispatch('auth/unifiedProcessingShopAction', {
			cb: () => {
				this.form.basicInfo.shopId = this.$store.state.auth.identityInfo.shopInfo.shopId
				if (options.id) {
					this.getPurchasingGoodsDetail(options.id)
				}
			}
		})
	},
	data() {
		return {
			purchasingGoodsInfo: [
				{
					label: 'ID：',
					field: 'purchasingGoodsId',
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
					label: '商品名称',
					field: 'goodsName',
					type: 'input',
					placeholder: '请输入商品名称'
				},
				{
					label: '采购商品价格：',
					field: 'purchasingPrice',
					type: 'input',
					placeholder: '请填写采购商品价格'
				}
			],
			form: {
				basicInfo: {
					purchasingGoodsId: '',
					shopId: '',
					goodsName: '',
					purchasingPrice: ''
				}
			}
		}
	},

	methods: {
		// 获取采购商品详情
		async getPurchasingGoodsDetail(id) {
			this.form.basicInfo.purchasingGoodsId = id
			uni.showLoading()
			getByIdShopCostRevenueApi({ id })
				.then((res) => {
					this.form.basicInfo.shopId = (res.data && res.data.shopId) || ''
					this.form.basicInfo.goodsName = (res.data && res.data.goodsName) || ''
					this.form.basicInfo.purchasingPrice = res.data && res.data.purchasingPrice
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
			if (!data.goodsName) {
				this.$showToast('缺少商品名称')
				return
			}
			if (!data.purchasingPrice) {
				this.$showToast('请填写采购商品价格')
				return
			}
			uni.showModal({
				title: '提示',
				content: '确认提交采购商品表单？',
				success: (res) => {
					if (res.confirm) {
						if (data.id) {
							updateShopCostRevenueApi(data).then((res) => {
								this.$showToast('修改采购商品成功')
								setTimeout(() => {
									uni.navigateBack()
								}, 2000)
							})
						} else {
							addShopCostRevenueApi(data).then((res) => {
								this.$showToast('添加采购商品成功')
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
.purchasing-goods-form-container {
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
