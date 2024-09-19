<template>
	<view class="lunation-line-container">
		<JHeader title="设置盈亏线" width="50" height="50"></JHeader>
		<view v-if="showTypeFlag === 1">
			<view style="padding: 30rpx;">
				<view style="margin-bottom: 32rpx;">
					<view style="display: flex;justify-content: space-between;align-items: center;">
						<view style="font-weight: bold;">采购商品设置</view>
						<view style="display: flex;align-items: center;">
							<tui-button
								type="warning" plain width="152rpx" height="44rpx"
								link :size="24"
								@click="go('/another-tf/another-user/shop-overview/purchasing-goods')"
							>
								全部采购商品
							</tui-button>
							<tui-button
								type="warning" plain width="152rpx" height="44rpx"
								link :size="24" margin="0 0 0 10rpx"
								@click="handleSubmitPurchasingGoods"
							>
								新增采购商品
							</tui-button>
						</view>
					</view>
					<view
						style="padding: 32rpx;font-size: 28rpx;background-color: #ffffff;border-radius: 18rpx;margin-top: 16rpx;"
					>
						<view style="margin-bottom: 42rpx;">
							<view>店铺ID：</view>
							<view style="border-bottom: 1rpx solid #e7e7e7;">
								<tui-input
									v-model="purchasingGoodsFormData.shopId" placeholder="缺少店铺ID"
									placeholder-style="color: #999999;font-size: 28rpx;" :border-bottom="false" padding="18rpx 2rpx 20rpx"
									disabled
								></tui-input>
							</view>
						</view>
						<view style="margin-bottom: 42rpx;">
							<view>商品名称：</view>
							<view style="border-bottom: 1rpx solid #e7e7e7;">
								<tui-input
									v-model="purchasingGoodsFormData.goodsName" placeholder="请输入"
									placeholder-style="color: #999999;font-size: 28rpx;" :border-bottom="false"
									padding="18rpx 2rpx 20rpx"
								></tui-input>
							</view>
						</view>
						<view>
							<view>采购商品价格：</view>
							<view>
								<tui-input
									v-model="purchasingGoodsFormData.purchasingPrice" type="number"
									placeholder="请输入" placeholder-style="color: #999999;font-size: 28rpx;"
									:border-bottom="false" padding="18rpx 2rpx 20rpx"
								></tui-input>
							</view>
						</view>
					</view>
				</view>
				<view style="margin-bottom: 32rpx;">
					<view style="font-weight: bold;">全部采购商品</view>
					<view
						style="padding: 32rpx;font-size: 28rpx;background-color: #ffffff;border-radius: 18rpx;margin-top: 16rpx;"
					>
						<view v-if="allPurchasingGoodsList && allPurchasingGoodsList.length">
							<view v-for="(item, index) in allPurchasingGoodsList" :key="index" style="padding-bottom: 35rpx;">
								<tui-card
									:title="{ text: `${item.createTime}` }"
									:tag="{ text: `ID：${item.purchasingGoodsId || '--'}` }" style="margin: 0;"
								>
									<template #body>
										<view style="padding: 10rpx 32rpx;">
											<view>商品名称：{{ item.goodsName || '--' }}</view>
											<view>采购产品价格：{{ item.purchasingPrice }}</view>
										</view>
									</template>
								</tui-card>
							</view>
						</view>
						<view style="padding-bottom: 45rpx;">
							<LoadingMore :status="isLoadingPurchasingGoods ? 'loading' : ''"></LoadingMore>
							<view v-if="!isLoadingPurchasingGoods && !allPurchasingGoodsList.length">
								<tui-no-data :fixed="false" style="padding-top: 60rpx;">暂无采购商品内容~</tui-no-data>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view
				class="operation-btn"
				style="position: fixed;bottom: 0;z-index: 1;width: 100%;padding: 14rpx 32rpx 22rpx;background-color: #ffffff;box-sizing: border-box;"
			>
				<tui-button type="warning" width="100%" height="92rpx" margin="0" @click="handleChangeListShow(2)">
					下一步
				</tui-button>
			</view>
		</view>
		<view v-else-if="showTypeFlag === 2">
			<view style="padding: 30rpx;">
				<view style="margin-bottom: 32rpx;">
					<view style="display: flex;justify-content: space-between;align-items: center;">
						<view style="font-weight: bold;">字段设置</view>
						<view style="display: flex;align-items: center;">
							<tui-button
								type="warning" plain width="152rpx" height="44rpx"
								link :size="24"
								@click="go('/another-tf/another-user/shop-overview/character-configuration')"
							>
								全部字段配置
							</tui-button>
							<tui-button
								type="warning" plain width="112rpx" height="44rpx"
								link :size="24" margin="0 0 0 10rpx"
								@click="handleSubmitCharacter"
							>
								新增字段
							</tui-button>
						</view>
					</view>
					<view
						style="padding: 32rpx;font-size: 28rpx;background-color: #ffffff;border-radius: 18rpx;margin-top: 16rpx;"
					>
						<view style="margin-bottom: 42rpx;">
							<view>店铺ID：</view>
							<view style="border-bottom: 1rpx solid #e7e7e7;">
								<tui-input
									v-model="characterFormData.shopId" placeholder="缺少店铺ID"
									placeholder-style="color: #999999;font-size: 28rpx;" :border-bottom="false" padding="18rpx 2rpx 20rpx"
									disabled
								></tui-input>
							</view>
						</view>
						<view style="margin-bottom: 42rpx;">
							<view>字段名称：</view>
							<view style="border-bottom: 1rpx solid #e7e7e7;">
								<tui-input
									v-model="characterFormData.fieldName" placeholder="请输入"
									placeholder-style="color: #999999;font-size: 28rpx;" :border-bottom="false"
									padding="18rpx 2rpx 20rpx"
								></tui-input>
							</view>
						</view>
						<view>
							<view>支出费用：</view>
							<view>
								<tui-input
									v-model="characterFormData.fieldPrice" type="number"
									placeholder="请输入" placeholder-style="color: #999999;font-size: 28rpx;"
									:border-bottom="false" padding="18rpx 2rpx 20rpx"
								></tui-input>
							</view>
						</view>
					</view>
				</view>
				<view style="margin-bottom: 32rpx;">
					<view style="font-weight: bold;">全部字段配置</view>
					<view
						style="padding: 32rpx;font-size: 28rpx;background-color: #ffffff;border-radius: 18rpx;margin-top: 16rpx;"
					>
						<view v-if="allCharacterList && allCharacterList.length">
							<view v-for="(item, index) in allCharacterList" :key="index" style="padding-bottom: 35rpx;">
								<tui-card :title="{ text: `${item.fieldName}` }" :tag="{ text: `ID：${item.id || '--'}` }" style="margin: 0;">
									<template #body>
										<view style="padding: 10rpx 32rpx;">
											<view>支出费用：{{ item.fieldPrice }}</view>
											<view>创建时间：{{ item.createTime }}</view>
										</view>
									</template>
								</tui-card>
							</view>
						</view>
						<view style="padding-bottom: 45rpx;">
							<LoadingMore :status="isLoadingCharacter ? 'loading' : ''"></LoadingMore>
							<view v-if="!isLoadingCharacter && !allCharacterList.length">
								<tui-no-data :fixed="false" style="padding-top: 60rpx;">暂无字段内容~</tui-no-data>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view
				class="operation-btn"
				style="position: fixed;bottom: 0;z-index: 1;width: 100%;padding: 14rpx 32rpx 22rpx;display: flex;justify-content: space-between;background-color: #ffffff;box-sizing: border-box;"
			>
				<tui-button type="white" width="49%" height="92rpx" margin="0" @click="handleChangeListShow(1)">
					上一步
				</tui-button>
				<tui-button type="warning" width="49%" height="92rpx" margin="0" @click="$switchTab('/pages/user/user')">
					返回个人中心
				</tui-button>
			</view>
		</view>
	</view>
</template>

<script>
import { getAllShopCostRevenueApi, addShopCostRevenueApi, getAllShopCostFieldApi, addShopCostFieldApi } from '../../../api/anotherTFInterface'
export default {
	name: 'LunationLine',
	data() {
		return {
			showTypeFlag: 1,
			purchasingGoodsFormData: {
				purchasingGoodsId: '',
				shopId: '',
				goodsName: '',
				purchasingPrice: ''
			},
			allPurchasingGoodsList: [],
			isLoadingPurchasingGoods: true,
			characterFormData: {
				id: '',
				shopId: '',
				fieldName: '',
				fieldPrice: ''
			},
			allCharacterList: [],
			isLoadingCharacter: true
		}
	},
	onLoad() {
		this.$store.dispatch('auth/unifiedProcessingShopAction', {
			cb: () => {
				this.purchasingGoodsFormData.shopId = this.$store.state.auth.identityInfo.shopInfo.shopId
				this.characterFormData.shopId = this.$store.state.auth.identityInfo.shopInfo.shopId
			}
		})
		this.getPurchasingGoodsAllList()
	},
	methods: {
		handleChangeListShow(e) {
			this.showTypeFlag = e
			if (this.showTypeFlag === 1) {
			} else if (this.showTypeFlag === 2) {
				if (this.isLoadingCharacter && !this.allCharacterList.length) this.getCharacterAllList()
			}
		},

		getPurchasingGoodsAllList() {
			uni.showLoading()
			this.isLoadingPurchasingGoods = true
			getAllShopCostRevenueApi({})
				.then((res) => {
					this.allPurchasingGoodsList = res.data
					uni.hideLoading()
					this.isLoadingPurchasingGoods = false
				})
				.catch((e) => {
					uni.hideLoading()
					this.isLoadingPurchasingGoods = false
				})
		},
		handleSubmitPurchasingGoods() {
			if (!this.purchasingGoodsFormData.shopId) {
				this.$showToast('缺少商家信息')
				return
			}
			if (!this.purchasingGoodsFormData.goodsName) {
				this.$showToast('缺少商品名称')
				return
			}
			if (typeof this.purchasingGoodsFormData.purchasingPrice !== 'number') {
				this.$showToast('请填写采购商品价格')
				return
			}
			uni.showModal({
				title: '提示',
				content: '确认提交采购商品表单？',
				success: (res) => {
					if (res.confirm) {
						addShopCostRevenueApi(this.purchasingGoodsFormData).then((res) => {
							this.purchasingGoodsFormData.goodsName = ''
							this.purchasingGoodsFormData.purchasingPrice = ''
							this.$showToast('添加采购商品成功')
							setTimeout(() => {
								this.getPurchasingGoodsAllList()
							}, 2000)
						})
					}
				}
			})
		},

		getCharacterAllList() {
			uni.showLoading()
			this.isLoadingCharacter = true
			getAllShopCostFieldApi({})
				.then((res) => {
					this.allCharacterList = res.data
					uni.hideLoading()
					this.isLoadingCharacter = false
				})
				.catch((e) => {
					uni.hideLoading()
					this.isLoadingCharacter = false
				})
		},
		handleSubmitCharacter() {
			if (!this.characterFormData.shopId) {
				this.$showToast('缺少商家信息')
				return
			}
			if (!this.characterFormData.fieldName) {
				this.$showToast('缺少字段名称')
				return
			}
			if (typeof this.characterFormData.fieldPrice !== 'number') {
				this.$showToast('请填写支出费用')
				return
			}
			uni.showModal({
				title: '提示',
				content: '确认提交字段表单？',
				success: (res) => {
					if (res.confirm) {
						addShopCostFieldApi(this.characterFormData).then((res) => {
							this.characterFormData.fieldName = ''
							this.characterFormData.fieldPrice = ''
							this.$showToast('添加字段成功')
							setTimeout(() => {
								this.getPurchasingGoodsAllList()
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
.lunation-line-container {
	position: relative;
	min-height: 100vh;
	background-color: #f1f1f1;
	box-sizing: border-box;

	/deep/ .j-header-wrapper {
		padding: 24rpx 12rpx 10rpx;
		background-color: #ffffff;
	}

	.operation-btn {
		/deep/ .tui-btn {
			display: inline-block;
			border-radius: 20rpx;
		}

		/deep/ .tui-btn-warning {
			background-color: #ef530e !important;
		}

		/deep/ .tui-btn-white {
			&::after {
				border-radius: 30rpx;
			}
		}
	}
}
</style>
