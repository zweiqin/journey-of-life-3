<template>
	<view class="transaction-record-container">
		<JHeader title="收支明细" width="50" height="50"></JHeader>
		<view style="padding: 20rpx 20rpx 0;">
			<view class="top-btn">
				<tui-button
					type="white" width="200rpx" height="60rpx" shape="circle"
					link margin="0"
					@click="isShowTypePopup = true"
				>
					<view style="display: flex;align-items: center;font-size: 28rpx;line-height: 1;">
						<!-- <text v-if="[ 0 ].includes(queryType)">
							全部明细
							</text> -->
						<text v-if="[ 1 ].includes(queryType)">
							支出
						</text>
						<text v-else-if="[ 2 ].includes(queryType)">
							收入
						</text>
						<tui-icon name="arrowdown" color="#000000" :size="28" unit="rpx" margin="0 0 0 10rpx"></tui-icon>
					</view>
				</tui-button>
			</view>

			<!-- <view style="margin-top: 12rpx;font-size: 28rpx;">
				<view v-if="[ 0 ].includes(queryType)">
				总收益￥{{ transactionAcount.quanbu }}
				</view>
				<view v-else-if="[ 1 ].includes(queryType)">
				总支出￥{{ transactionAcount.zongzhichu }}
				</view>
				<view v-else-if="[ 2 ].includes(queryType)">
				总收入￥{{ transactionAcount.zongshouru }}
				</view>
				</view> -->

			<view style="margin-top: 20rpx;">
				<view v-if="[ 1 ].includes(queryType)">
					<view v-if="transactionOutgoingInfo.data.length > 0">
						<view
							v-for="(item, index) in transactionOutgoingInfo.data" :key="item.id"
							style="display: flex;align-items: center;justify-content: space-between;margin-bottom: 38rpx;"
							@click="handleClickTransactionRecord(item)"
						>
							<view style="flex: 1;display: flex;align-items: center;">
								<view
									style="padding: 18rpx;font-size: 38rpx;font-weight: bold;color: #ffffff;border-radius: 50%;line-height: 1;background-color: #208f57;"
								>
									收
								</view>
								<view style="margin-left: 14rpx;">
									<view style="font-size: 28rpx;font-weight: bold;color: #222229;">
										<text>
											<text v-if="item.waterType === 1">商城消费</text>
											<text v-else-if="item.waterType === 2">商圈消费</text>
											<text v-else-if="item.waterType === 3">社区消费</text>
											<text v-else-if="item.waterType === 4">转出消费</text>
											<text v-else-if="item.waterType === 5">退款退回（获得）</text>
											<text v-else>--</text>
										</text>
									</view>
									<view style="margin-top: 6rpx;font-size: 24rpx;color: #888889;">{{ item.createTime }}</view>
								</view>
							</view>
							<view style="margin-left: 12rpx;text-align: right;">
								<view style="font-size: 28rpx;font-weight: bold;color: #222229;">
									出账：-{{ Number.parseFloat(Number(item.number || 0)).toFixed(2) }}
								</view>
								<view style="margin-top: 6rpx;font-size: 24rpx;color: #888889;">
									<text>订单：{{ item.orderFormid || '--' }}</text>
								</view>
							</view>
						</view>
					</view>
					<view style="padding-bottom: 45rpx;">
						<LoadingMore
							:status="!transactionOutgoingInfo.isEmpty && !transactionOutgoingInfo.data.length
								? 'loading' : !transactionOutgoingInfo.isEmpty && transactionOutgoingInfo.data.length && (transactionOutgoingInfo.data.length >= transactionOutgoingInfo.listTotal) ? 'no-more' : ''"
						>
						</LoadingMore>
						<tui-no-data v-if="transactionOutgoingInfo.isEmpty" :fixed="false" style="margin-top: 60rpx;">暂无数据~</tui-no-data>
					</view>
				</view>
				<view v-else-if="[ 2 ].includes(queryType)">
					<view v-if="transactionAccountingInfo.data.length > 0">
						<view
							v-for="(item, index) in transactionAccountingInfo.data" :key="item.id"
							style="display: flex;align-items: center;justify-content: space-between;margin-bottom: 38rpx;"
							@click="handleClickTransactionRecord(item)"
						>
							<view style="flex: 1;display: flex;align-items: center;">
								<view
									style="padding: 18rpx;font-size: 38rpx;font-weight: bold;color: #ffffff;border-radius: 50%;line-height: 1;background-color: #ef530e;"
								>
									收
								</view>
								<view style="margin-left: 14rpx;">
									<view style="font-size: 28rpx;font-weight: bold;color: #222229;">
										<text>
											<text v-if="item.waterType === -1">退款退回（消费）</text>
											<text v-else-if="item.waterType === 1">升级活动</text>
											<text v-else-if="item.waterType === 2">分佣活动</text>
											<text v-else-if="item.waterType === 3">社区活动</text>
											<text v-else-if="item.waterType === 4">赠券活动</text>
											<text v-else-if="item.waterType === 5">赠金活动</text>
											<text v-else-if="item.waterType === 6">商圈订单</text>
											<text v-else-if="item.waterType === 7">爆品家具</text>
											<text v-else-if="item.waterType === 8">社区订单</text>
											<text v-else-if="item.waterType === 9">用户代金券转增</text>
											<text v-else-if="item.waterType === 10">商家代金券转赠</text>
											<text v-else-if="item.waterType === 11">同城联盟卡</text>
											<text v-else>--</text>
										</text>
										<text>
											-
											<text v-if="item.sourceType === 1">平台</text>
											<text v-else-if="item.sourceType === 2">商圈</text>
											<text v-else-if="item.sourceType === 3">商城</text>
											<text v-else-if="item.sourceType === 4">社区</text>
											<text v-else-if="item.sourceType === 5">用户</text>
											<text v-else>--</text>
										</text>
									</view>
									<view style="margin-top: 6rpx;font-size: 24rpx;color: #888889;">{{ item.createTime }}</view>
								</view>
							</view>
							<view style="margin-left: 12rpx;text-align: right;">
								<view style="font-size: 28rpx;font-weight: bold;color: #222229;">
									入账：+{{ Number.parseFloat(Number(item.number || 0)).toFixed(2) }}
								</view>
								<view style="margin-top: 6rpx;font-size: 24rpx;color: #888889;">
									<text>订单：{{ item.orderFormid || '--' }}</text>
								</view>
							</view>
						</view>
					</view>
					<view style="padding-bottom: 45rpx;">
						<LoadingMore
							:status="!transactionAccountingInfo.isEmpty && !transactionAccountingInfo.data.length
								? 'loading' : !transactionAccountingInfo.isEmpty && transactionAccountingInfo.data.length && (transactionAccountingInfo.data.length >= transactionAccountingInfo.listTotal) ? 'no-more' : ''"
						>
						</LoadingMore>
						<tui-no-data v-if="transactionAccountingInfo.isEmpty" :fixed="false" style="margin-top: 60rpx;">暂无数据~</tui-no-data>
					</view>
				</view>
			</view>
		</view>

		<tui-bottom-popup :show="isShowTypePopup" @close="isShowTypePopup = false">
			<view style="padding: 26rpx 20rpx;">
				<view style="padding: 0 36rpx;">
					<view style="position: relative;color: #222229;text-align: center;">
						<text>选择筛选项</text>
						<view style="position: absolute;top: -14rpx;right: -16rpx;">
							<tui-icon name="close" color="#767676" size="46" unit="rpx" @click="isShowTypePopup = false"></tui-icon>
						</view>
					</view>
					<view style="padding: 0 0 202rpx;">
						<view style="padding-top: 40rpx;">
							<view style="font-size: 28rpx;">收支类型</view>
							<view style="display: flex;align-items: center;flex-wrap: wrap;margin-top: 10rpx;text-align: center;">
								<!-- { name: '全部', value: 0 },  -->
								<view
									v-for="(item, index) in [{ name: '支出', value: 1 }, { name: '收入', value: 2 }]"
									:key="index"
									style="flex: 1;padding: 10rpx 0;margin: 18rpx 6rpx 0;font-size: 26rpx;background-color: #f4f4f4;border-radius: 16rpx;"
									:style="{
										border: queryType === item.value ? '2rpx solid #ff4b10' : '2rpx solid #fff1ec',
										color: queryType === item.value ? '#ff4b10' : '#000000'
									}" @click="handleSelectTypeActive(item)"
								>
									{{ item.name }}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</tui-bottom-popup>
	</view>
</template>

<script>
import { getBeeCurrencyDistributorApi, getBeeCurrencyUpApi } from '../../../api/anotherTFInterface'
export default {
	name: 'TransactionRecord',
	components: {
	},
	data() {
		return {
			transactionAcount: {
				zongshouru: '',
				zongzhichu: '',
				quanbu: ''
			},
			isShowTypePopup: false,
			timeDropdownShow: false,
			queryType: 2,
			transactionOutgoingInfo: {
				query: {
					page: 1,
					pageSize: 20
				},
				data: [],
				listTotal: 0,
				isEmpty: false
			},
			transactionAccountingInfo: {
				query: {
					page: 1,
					pageSize: 20
				},
				data: [],
				listTotal: 0,
				isEmpty: false
			}
		}
	},
	onLoad(options) {
		if ([ 1 ].includes(this.queryType)) {
			this.transactionOutgoingInfo.query.page = 1
			this.getTransactionOutgoingRecord()
		} else if ([ 2 ].includes(this.queryType)) {
			this.transactionAccountingInfo.query.page = 1
			this.getTransactionAccountingRecord()
		}
	},
	methods: {
		getTransactionOutgoingRecord(isLoadmore) {
			uni.showLoading()
			getBeeCurrencyUpApi({ ...this.transactionOutgoingInfo.query })
				.then((res) => {
					this.transactionOutgoingInfo.listTotal = res.data.total
					if (isLoadmore) {
						this.transactionOutgoingInfo.data.push(...res.data.list)
					} else {
						this.transactionOutgoingInfo.data = res.data.list
					}
					this.transactionOutgoingInfo.isEmpty = this.transactionOutgoingInfo.data.length === 0
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		getTransactionAccountingRecord(isLoadmore) {
			uni.showLoading()
			getBeeCurrencyDistributorApi({ ...this.transactionAccountingInfo.query })
				.then((res) => {
					this.transactionAccountingInfo.listTotal = res.data.total
					if (isLoadmore) {
						this.transactionAccountingInfo.data.push(...res.data.list)
					} else {
						this.transactionAccountingInfo.data = res.data.list
					}
					this.transactionAccountingInfo.isEmpty = this.transactionAccountingInfo.data.length === 0
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		handleSelectTypeActive(item) {
			if (this.queryType === item.value) return
			this.queryType = item.value
			if ([ 1 ].includes(this.queryType)) {
				this.transactionOutgoingInfo.query.page = 1
				this.transactionOutgoingInfo.data = []
				this.transactionOutgoingInfo.listTotal = 0
				this.transactionOutgoingInfo.isEmpty = false
				this.getTransactionOutgoingRecord()
				this.isShowTypePopup = false
			} else if ([ 2 ].includes(this.queryType)) {
				this.transactionAccountingInfo.query.page = 1
				this.transactionAccountingInfo.data = []
				this.transactionAccountingInfo.listTotal = 0
				this.transactionAccountingInfo.isEmpty = false
				this.getTransactionAccountingRecord()
				this.isShowTypePopup = false
			}
		},
		handleClickTransactionRecord(item) {
			uni.navigateTo({
				url: '/another-tf/another-user/transaction-funds/transaction-record-detail',
				success: () => {
					setTimeout(() => {
						uni.$emit('sendTransactionRecordDetailMsg', { transactionRecordData: item, fromOrigin: this.queryType })
					}, 400)
				}
			})
		}
	},
	onReachBottom() {
		if ([ 1 ].includes(this.queryType)) {
			if (this.transactionOutgoingInfo.data.length < this.transactionOutgoingInfo.listTotal) {
				++this.transactionOutgoingInfo.query.page
				this.getTransactionOutgoingRecord(true)
			}
		} else if ([ 2 ].includes(this.queryType)) {
			if (this.transactionAccountingInfo.data.length < this.transactionAccountingInfo.listTotal) {
				++this.transactionAccountingInfo.query.page
				this.getTransactionAccountingRecord(true)
			}
		}
	}
}
</script>

<style lang="less" scoped>
.transaction-record-container {
	min-height: 100vh;
	box-sizing: border-box;

	/deep/ .j-header-wrapper {
		padding: 18rpx 0 16rpx;
		background-color: #f5f5f5;

		.title {
			font-size: 36rpx;
			color: #222229;
			font-weight: normal;
		}
	}

	.top-btn {
		/deep/ .tui-btn {
			background: #d8d8d8 !important;
		}
	}

	/deep/ .tui-dropdown-view {
		height: auto !important;
		width: fit-content;
		margin-left: 2rpx;
	}
}
</style>
