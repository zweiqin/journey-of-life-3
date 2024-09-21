<template>
	<view class="purchasing-goods-container">
		<JHeader title="采购商品" width="50" height="50"></JHeader>
		<view style="display: flex;justify-content: space-between;align-items: flex-end;margin: 14rpx auto;">
			<tui-button
				type="blue" bold shape="circle" width="70%"
				@click="go('/another-tf/another-shop/shop-overview/purchasing-goods-form')"
			>
				新增采购商品
			</tui-button>
			<tui-button
				type="black" plain bold shape="circle"
				width="fit-content" height="52rpx" style="padding: 0 20rpx;"
				@click="handleChangeListShow"
			>
				<text v-if="isShowAll">取消全部</text>
				<text v-else>查看全部</text>
			</tui-button>
		</view>

		<view v-if="!isShowAll">
			<view v-if="purchasingGoodsInfo.data && purchasingGoodsInfo.data.length">
				<view v-for="(item, index) in purchasingGoodsInfo.data" :key="index" style="padding-bottom: 35rpx;">
					<tui-card
						:title="{ text: `${item.createTime}` }" :tag="{ text: `ID：${item.purchasingGoodsId || '--'}` }"
						style="margin: 0;"
					>
						<template #body>
							<view style="padding: 10rpx 32rpx;">
								<view>商品名称：{{ item.goodsName || '--' }}</view>
								<view>采购产品价格：{{ item.purchasingPrice }}</view>
							</view>
						</template>
						<template #footer>
							<view style="display: flex;justify-content: flex-end;align-items: center;padding: 0 20rpx 20rpx;">
								<tui-button
									type="warning" width="120rpx" height="50rpx"
									margin="0 20rpx 0" shape="circle"
									@click="go(`/another-tf/another-shop/shop-overview/purchasing-goods-form?id=${item.purchasingGoodsId}`)"
								>
									编辑
								</tui-button>
								<tui-button
									type="danger" width="120rpx" height="50rpx"
									margin="0" shape="circle"
									@click="handlePurchasingGoodsDelete(item)"
								>
									删除
								</tui-button>
							</view>
						</template>
					</tui-card>
				</view>
			</view>
			<view style="padding-bottom: 45rpx;">
				<LoadingMore
					:status="!purchasingGoodsInfo.isEmpty && !purchasingGoodsInfo.data.length
						? 'loading' : !purchasingGoodsInfo.isEmpty && purchasingGoodsInfo.data.length && (purchasingGoodsInfo.data.length >= purchasingGoodsInfo.listTotal) ? 'no-more' : ''"
				>
				</LoadingMore>
				<tui-no-data v-if="purchasingGoodsInfo.isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无采购商品内容~</tui-no-data>
			</view>
		</view>
		<view v-else>
			<view v-if="allPurchasingGoodsList && allPurchasingGoodsList.length">
				<view v-for="(item, index) in allPurchasingGoodsList" :key="index" style="padding-bottom: 35rpx;">
					<tui-card
						:title="{ text: `${item.createTime}` }" :tag="{ text: `ID：${item.purchasingGoodsId || '--'}` }"
						style="margin: 0;"
					>
						<template #body>
							<view style="padding: 10rpx 32rpx;">
								<view>商品名称：{{ item.goodsName || '--' }}</view>
								<view>采购产品价格：{{ item.purchasingPrice }}</view>
							</view>
						</template>
						<template #footer>
							<view style="display: flex;justify-content: flex-end;align-items: center;padding: 0 20rpx 20rpx;">
								<tui-button
									type="warning" width="120rpx" height="50rpx"
									margin="0 20rpx 0" shape="circle"
									@click="go(`/another-tf/another-shop/shop-overview/purchasing-goods-form?id=${item.purchasingGoodsId}`)"
								>
									编辑
								</tui-button>
								<tui-button
									type="danger" width="120rpx" height="50rpx"
									margin="0" shape="circle"
									@click="handlePurchasingGoodsDelete(item)"
								>
									删除
								</tui-button>
							</view>
						</template>
					</tui-card>
				</view>
			</view>
			<view style="padding-bottom: 45rpx;">
				<LoadingMore :status="isLoading ? 'loading' : ''"></LoadingMore>
				<view v-if="!isLoading && !allPurchasingGoodsList.length">
					<tui-no-data :fixed="false" style="padding-top: 60rpx;">暂无采购商品内容~</tui-no-data>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getShopCostRevenuePageAllApi, getAllShopCostRevenueApi, deleteByIdShopCostRevenueApi } from '../../../api/anotherTFInterface'

export default {
	name: 'PurchasingGoods',
	data() {
		return {
			isShowAll: false,
			purchasingGoodsInfo: {
				query: {
					page: 1,
					pageSize: 10
				},
				data: [],
				listTotal: 0,
				isEmpty: false
			},
			allPurchasingGoodsList: [],
			isLoading: true
		}
	},
	onShow() {
		this.$store.dispatch('auth/unifiedProcessingShopAction', {
			cb: () => {
				this.getPurchasingGoodsPageList()
			}
		})
	},

	methods: {
		getPurchasingGoodsPageList(isLoadmore) {
			uni.showLoading({
				title: '加载中'
			})
			getShopCostRevenuePageAllApi({ ...this.purchasingGoodsInfo.query })
				.then((res) => {
					this.purchasingGoodsInfo.listTotal = res.data.total
					if (isLoadmore) {
						this.purchasingGoodsInfo.data.push(...res.data.list)
					} else {
						this.purchasingGoodsInfo.data = res.data.list
					}
					this.purchasingGoodsInfo.isEmpty = this.purchasingGoodsInfo.data.length === 0
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		getPurchasingGoodsAllList() {
			uni.showLoading()
			this.isLoading = true
			getAllShopCostRevenueApi({})
				.then((res) => {
					this.allPurchasingGoodsList = res.data
					uni.hideLoading()
					this.isLoading = false
				})
				.catch((e) => {
					uni.hideLoading()
					this.isLoading = false
				})
		},
		handleChangeListShow() {
			this.isShowAll = !this.isShowAll
			if (!this.isShowAll) {
			} else if (this.isLoading && !this.allPurchasingGoodsList.length) this.getPurchasingGoodsAllList()
		},

		handlePurchasingGoodsDelete(item) {
			uni.showModal({
				title: '提示',
				content: '确定要删除当前采购商品？',
				success: (res) => {
					if (res.confirm) {
						deleteByIdShopCostRevenueApi({
							revenueId: item.purchasingGoodsId
						}).then((res) => {
							this.$showToast('删除成功')
							setTimeout(() => {
								this.purchasingGoodsInfo.query.page = 1
								this.getPurchasingGoodsPageList()
							}, 2000)
						})
					}
				}
			})
		}
	},
	onReachBottom() {
		if (!this.isShowAll) {
			if (this.purchasingGoodsInfo.data.length < this.purchasingGoodsInfo.listTotal) {
				++this.purchasingGoodsInfo.query.page
				this.getPurchasingGoodsPageList(true)
			}
		}
	}
}
</script>

<style lang="less" scoped>
.purchasing-goods-container {
	min-height: 100vh;
	padding: 0 24rpx 0;
	box-sizing: border-box;
	background-color: #eeeeee;

	/deep/ .j-header-wrapper {
		padding: 24rpx 0 10rpx;
		background-color: #f5f5f5;
	}
}
</style>

