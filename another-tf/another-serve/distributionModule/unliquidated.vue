<template>
	<view class="unliquidated-container">
		<JHeader :dark="false" title="未结算奖励" width="50" height="50"></JHeader>
		<view>
			<view class="unliquidated-topBackImg flex-items flex-column">
				<view class="totalAward-content flex-column font-color-FFF">
					<view class="flex-items-plus  mar-top-60">
						<label class="fs60 amount">￥{{ directSalesDataList.total }}</label>
					</view>
					<view class="flex-row-plus flex-sp-around fs24 mar-top-30">
						<view class="awardBox">
							<view class="fs36 font-color-FFF">{{ directSalesDataList.directPrice }}</view>
							<view class="awardTit font-color-FFF">直接奖励(元）</view>
						</view>
						<view class="awardBox">
							<view class="fs36 font-color-FFF">{{ directSalesDataList.indirectPrice }}</view>
							<view class="awardTit font-color-FFF">间接奖励(元）</view>
						</view>
					</view>
				</view>
			</view>
			<view>
				<tui-tabs
					style="width: 750rpx;padding: 0 0rpx 0 0rpx;overflow: hidden;" :slider-width="60" :padding="0"
					item-width="375rpx" selected-color="#C5AA7B" bold slider-bg-color="#999999"
					background-color="#333333" unlined
					:tabs="[{ name: '直接奖励' }, { name: '间接奖励' }]" :current-tab="awardTypeFlag" @change="awardTypeActive"
				></tui-tabs>
			</view>
			<view v-if="awardTypeFlag == 0">
				<view v-if="directSalesInfo.data && directSalesInfo.data.length">
					<view v-for="(item, index) in directSalesInfo.data" :key="index" class="flex-center">
						<view class="directAward-box font-color-656 fs26" @click="arrowTypeChange1(index)">
							<view style="display: flex;" class="directAwardInfo">
								<view style="flex: 1;" class="flex-items flex-sp-between">
									<label class="orderId-box font-color-999">订单号：{{ item.orderFormid }}</label>
									<view class="mar-right-50 font-color-999">
										佣金：<label class="font-color-C5AA7B">¥{{ item.commission }}</label>
									</view>
								</view>
								<view>
									<tui-icon
										:name="item.ifOpen ? 'arrowup' : 'arrowdown'" :size="30" unit="rpx" margin="0"
										color="#b7b7b7"
									></tui-icon>
								</view>
							</view>
							<view v-if="item.ifOpen == true">
								<view class="flex-row-plus flex-items flex-sp-between mar-top-30">
									<label class="orderId-box font-color-999">商品数：{{ item.products }}</label>
									<label class="commission-box mar-left-70 font-color-999">实付金额：¥{{ item.price }}</label>
								</view>
								<view class="flex-row-plus flex-items mar-top-30">
									<label class="orderId-box font-color-999">下单人：{{ item.customerName }}</label>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view style="padding-bottom: 45rpx;">
					<LoadingMore
						:status="!directSalesInfo.isEmpty && !directSalesInfo.data.length
							? 'loading' : !directSalesInfo.isEmpty && directSalesInfo.data.length && (directSalesInfo.data.length >= directSalesInfo.listTotal) ? 'no-more' : ''"
					>
					</LoadingMore>
					<tui-no-data v-if="directSalesInfo.isEmpty" :fixed="false" style="padding-top: 60rpx;">这里空空如也～</tui-no-data>
				</view>
			</view>
			<view v-if="awardTypeFlag == 1">
				<view v-if="secondhandSalesInfo.data && secondhandSalesInfo.data.length">
					<view v-for="(item, index) in secondhandSalesInfo.data" :key="index" class="flex-center">
						<view class="directAward-box font-color-656 fs26" @click="arrowTypeChange(index)">
							<view style="display: flex;" class="directAwardInfo">
								<view style="flex: 1;" class="flex-items flex-sp-between">
									<label class="orderId-box font-color-999">订单号：{{ item.orderFormid }}</label>
									<view class="mar-right-50 font-color-999">
										佣金：<label class="font-color-C5AA7B">¥{{ item.commission }}</label>
									</view>
								</view>
								<view>
									<tui-icon
										:name="item.ifOpen ? 'arrowup' : 'arrowdown'" :size="30" unit="rpx" margin="0"
										color="#b7b7b7"
									></tui-icon>
								</view>
							</view>
							<view v-if="item.ifOpen == true">
								<view class="flex-row-plus flex-items flex-sp-between mar-top-30">
									<label class="orderId-box font-color-999">商品数：{{ item.products }}</label>
									<label class="commission-box mar-left-70 font-color-999">实付金额：¥{{ item.price }}</label>
								</view>
								<view class="flex-row-plus flex-items mar-top-30">
									<label class="orderId-box font-color-999">下单人：{{ item.customerName }}</label>
								</view>
								<view class="flex-row-plus flex-items mar-top-30">
									<label class="orderId-box font-color-999">分销员：{{ item.distributorName }}</label>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view style="padding-bottom: 45rpx;">
					<LoadingMore
						:status="!secondhandSalesInfo.isEmpty && !secondhandSalesInfo.data.length
							? 'loading' : !secondhandSalesInfo.isEmpty && secondhandSalesInfo.data.length && (secondhandSalesInfo.data.length >= secondhandSalesInfo.listTotal) ? 'no-more' : ''"
					>
					</LoadingMore>
					<tui-no-data v-if="secondhandSalesInfo.isEmpty" :fixed="false" style="padding-top: 60rpx;">这里空空如也～</tui-no-data>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getNotRewardDistributorApi } from '../../../api/anotherTFInterface'

export default {
	name: 'Unliquidated',
	data() {
		return {
			awardTypeFlag: 0,
			directSalesDataList: {},
			secondhandSalesDataList: {},
			shopId: 0,
			distributorId: 0,

			directSalesInfo: {
				query: {
					type: 1,
					page: 1,
					pageSize: 10
				},
				data: [],
				listTotal: 0,
				isEmpty: false
			},
			secondhandSalesInfo: {
				query: {
					type: 2,
					page: 1,
					pageSize: 10
				},
				data: [],
				listTotal: 0, // 列表数据总数
				isEmpty: false // 列表是否为空
			}
		}
	},
	onLoad(options) {
		this.shopId = options.shopId
		this.distributorId = options.distributorId
		this.getDirectSalesDataList()
	},
	methods: {
		awardTypeActive(e) {
			this.awardTypeFlag = e.index
			// 缓存每个tab里的数据
			if (this.awardTypeFlag === 0) {
			} else if (this.awardTypeFlag === 1) {
				if (!this.secondhandSalesInfo.isEmpty && !this.secondhandSalesInfo.data.length) this.getSecondhandSalesDataList()
			}
			// 每点一个tab就重新进行对它的请求
			// if (this.awardTypeFlag === 0) {
			// 	this.directSalesInfo.query.page = 1
			// 	this.directSalesInfo.data = []
			// 	this.directSalesInfo.listTotal = 0
			// 	this.directSalesInfo.isEmpty = false
			// 	this.getApplyByStoreList()
			// } else if (this.awardTypeFlag === 1) {
			// 	this.secondhandSalesInfo.query.page = 1
			// 	this.secondhandSalesInfo.data = []
			// 	this.secondhandSalesInfo.listTotal = 0
			// 	this.secondhandSalesInfo.isEmpty = false
			// 	this.getApplyByUserList()
			// }
		},
		getDirectSalesDataList(isLoadmore) {
			uni.showLoading()
			getNotRewardDistributorApi({ ...this.directSalesInfo.query, shopId: this.shopId, distributorId: this.distributorId })
				.then((res) => {
					this.directSalesDataList = res.data
					this.directSalesInfo.listTotal = res.data.page.total
					if (isLoadmore) {
						this.directSalesInfo.data.push(...res.data.page.list)
					} else {
						this.directSalesInfo.data = res.data.page.list
					}
					this.directSalesInfo.isEmpty = this.directSalesInfo.data.length === 0
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		getSecondhandSalesDataList(isLoadmore) {
			uni.showLoading()
			getNotRewardDistributorApi({ ...this.secondhandSalesInfo.query, shopId: this.shopId, distributorId: this.distributorId })
				.then((res) => {
					this.secondhandSalesDataList = res.data
					this.secondhandSalesInfo.listTotal = res.data.page.total
					if (isLoadmore) {
						this.secondhandSalesInfo.data.push(...res.data.page.list)
					} else {
						this.secondhandSalesInfo.data = res.data.page.list
					}
					this.secondhandSalesInfo.isEmpty = this.secondhandSalesInfo.data.length === 0
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},

		arrowTypeChange1(arrowTypeId) {
			this.directSalesInfo.data[arrowTypeId].ifOpen = this.directSalesInfo.data[arrowTypeId].ifOpen == false
		},
		arrowTypeChange(arrowTypeId) {
			this.secondhandSalesInfo.data[arrowTypeId].ifOpen = this.secondhandSalesInfo.data[arrowTypeId].ifOpen == false
		}
	},
	onReachBottom() {
		if (this.awardTypeFlag === 0) {
			if (this.directSalesInfo.data.length < this.directSalesInfo.listTotal) {
				++this.directSalesInfo.query.page
				this.getDirectSalesDataList(true)
			}
		} else if (this.awardTypeFlag === 1) {
			if (this.secondhandSalesInfo.data.length < this.secondhandSalesInfo.listTotal) {
				++this.secondhandSalesInfo.query.page
				this.getSecondhandSalesDataList(true)
			}
		}
	}
}
</script>

<style lang="less" scoped>
.unliquidated-container {
	min-height: 100%;
	background-color: #333333;
	box-sizing: border-box;
	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}

	.unliquidated-topBackImg {
		width: 100%;
		background-color: #535353;
		margin-top: 30 rpx;
		padding-bottom: 20rpx;

		.totalAward-content {
			width: 90%;

			.awardBox {
				text-align: center;

				.awardTit {
					opacity: 0.7;
				}
			}

			.amount {
				color: #FFEBC4;
			}
		}
	}

	.directAward-box {
		width: 94%;
		border-bottom: 1 rpx solid #666666;
		padding: 30 rpx;
		display: flex;
		justify-content: flex-start;
		flex-direction: column;
		background: #FFFFFF;
		margin-top: 30 rpx;

		.orderId-box {
			display: flex;
			justify-content: flex-start;
			flex-direction: row;
		}

		.commission-box {
			width: 260 rpx;
		}
	}
}
</style>
