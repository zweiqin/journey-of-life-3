<template>
	<view class="commission-record-container">
		<JHeader title="收支明细" width="50" height="50"></JHeader>
		<view style="padding: 20rpx 20rpx 0;">
			<view class="top-btn">
				<tui-button
					type="white" width="fit-content" height="60rpx" shape="circle"
					link margin="0"
					@click="isShowTypePopup = true"
				>
					<view style="display: flex;align-items: center;padding: 0 20rpx;font-size: 28rpx;line-height: 1;">
						<text v-if="[ 1 ].includes(queryType)">
							入账记录
						</text>
						<text v-else-if="[ 2 ].includes(queryType)">
							出账记录
						</text>
						<tui-icon name="arrowdown" color="#000000" :size="28" unit="rpx" margin="0 0 0 10rpx"></tui-icon>
					</view>
				</tui-button>
			</view>

			<view style="margin-top: 20rpx;">
				<view v-if="[ 1 ].includes(queryType)">
					<view v-if="accountingInfo.data.length > 0">
						<view
							v-for="(item, index) in accountingInfo.data" :key="item.id"
							style="display: flex;align-items: center;justify-content: space-between;margin-bottom: 38rpx;"
							@click="handleClickCommissionRecord(item)"
						>
							<view style="flex: 1;display: flex;align-items: center;">
								<view
									style="padding: 18rpx;font-size: 38rpx;font-weight: bold;color: #ffffff;border-radius: 50%;line-height: 1;background-color: #ef530e;"
								>
									<text>收</text>
								</view>
								<view style="flex: 1;width: 0;margin-left: 14rpx;">
									<view style="font-size: 28rpx;font-weight: bold;color: #222229;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
										<text v-if="item.orderFormid">{{ item.orderFormid }}</text>
									</view>
									<view style="margin-top: 6rpx;font-size: 24rpx;color: #888889;">{{ item.createTime }}</view>
								</view>
							</view>
							<view style="margin-left: 12rpx;text-align: right;">
								<view style="font-size: 28rpx;font-weight: bold;color: #222229;">
									+{{ Number.parseFloat(Number(item.commissionNumber || 0)).toFixed(2) }}元
								</view>
								<view style="margin-top: 6rpx;font-size: 24rpx;color: #888889;">
									<text>
										类型：
										<text v-if="item.waterType === 1">升级角色</text>
										<text v-else-if="item.waterType === 2">分佣</text>
										<text v-else-if="item.waterType === 3">社区服务</text>
										<text v-else-if="item.waterType === 4">代金券</text>
										<text v-else-if="item.waterType === 5">消费金</text>
										<text v-else-if="item.waterType === 6">商圈订单</text>
										<text v-else-if="item.waterType === 7">爆品家具</text>
										<text v-else-if="item.waterType === 8">社区订单</text>
										<!-- <text v-else-if="item.waterType === -1">商城购买</text> -->
										<text v-else>--</text>
									</text>
								</view>
							</view>
						</view>
					</view>
					<view style="padding-bottom: 45rpx;">
						<LoadingMore
							:status="!accountingInfo.isEmpty && !accountingInfo.data.length
								? 'loading' : !accountingInfo.isEmpty && accountingInfo.data.length && (accountingInfo.data.length >= accountingInfo.listTotal) ? 'no-more' : ''"
						>
						</LoadingMore>
						<tui-no-data v-if="accountingInfo.isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无数据~</tui-no-data>
					</view>
				</view>
				<view v-else-if="[ 2 ].includes(queryType)">
					<view v-if="outgoingInfo.data.length > 0">
						<view
							v-for="(item, index) in outgoingInfo.data" :key="item.id"
							style="display: flex;align-items: center;justify-content: space-between;margin-bottom: 38rpx;"
							@click="handleClickCommissionRecord(item)"
						>
							<view style="flex: 1;display: flex;align-items: center;">
								<view
									style="padding: 18rpx;font-size: 38rpx;font-weight: bold;color: #ffffff;border-radius: 50%;line-height: 1;background-color: #208f57;"
								>
									<text>支</text>
								</view>
								<view style="flex: 1;width: 0;margin-left: 14rpx;">
									<view style="font-size: 28rpx;font-weight: bold;color: #222229;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
										<text v-if="item.orderFormid">{{ item.orderFormid }}</text>
									</view>
									<view style="margin-top: 6rpx;font-size: 24rpx;color: #888889;">{{ item.createTime }}</view>
								</view>
							</view>
							<view style="margin-left: 12rpx;text-align: right;">
								<view style="font-size: 28rpx;font-weight: bold;color: #222229;">
									-{{ Number.parseFloat(Number(item.commissionNumber || 0)).toFixed(2) }}元
								</view>
								<view style="margin-top: 6rpx;font-size: 24rpx;color: #888889;">
									<text>
										类型：
										<text v-if="item.waterType === 1">商城购买</text>
										<text v-else-if="item.waterType === 2">商圈购买</text>
										<text v-else-if="item.waterType === 3">社区购买</text>
										<text v-else-if="item.waterType === 4">提现</text>
										<text v-else>--</text>
									</text>
								</view>
							</view>
						</view>
					</view>
					<view style="padding-bottom: 45rpx;">
						<LoadingMore
							:status="!outgoingInfo.isEmpty && !outgoingInfo.data.length
								? 'loading' : !outgoingInfo.isEmpty && outgoingInfo.data.length && (outgoingInfo.data.length >= outgoingInfo.listTotal) ? 'no-more' : ''"
						>
						</LoadingMore>
						<tui-no-data v-if="outgoingInfo.isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无数据~</tui-no-data>
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
								<view
									v-for="(item, index) in [{ name: '入账记录', value: 1 }, { name: '出账记录', value: 2 }]"
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
import { getAllCommissionEntryRecordApi, getAllCommissionOutgoingRecordApi } from '../../../api/anotherTFInterface'
export default {
	name: 'CommissionRecord',
	components: {
	},
	data() {
		return {
			isShowTypePopup: false,
			queryType: 1,
			accountingInfo: {
				query: {
					page: 1,
					pageSize: 20
				},
				data: [],
				listTotal: 0,
				isEmpty: false
			},
			outgoingInfo: {
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
		this.queryType = Number(options.type) || 1
		if ([ 1 ].includes(this.queryType)) {
			this.accountingInfo.query.page = 1
			this.getAccountingLogsList()
		} else if ([ 2 ].includes(this.queryType)) {
			this.outgoingInfo.query.page = 1
			this.getOutgoingLogsList()
		}
	},
	methods: {
		getAccountingLogsList(isLoadmore) {
			uni.showLoading()
			getAllCommissionEntryRecordApi({ ...this.accountingInfo.query })
				.then((res) => {
					this.accountingInfo.listTotal = res.data.total
					if (isLoadmore) {
						this.accountingInfo.data.push(...res.data.list)
					} else {
						this.accountingInfo.data = res.data.list
					}
					this.accountingInfo.isEmpty = this.accountingInfo.data.length === 0
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		getOutgoingLogsList(isLoadmore) {
			uni.showLoading()
			getAllCommissionOutgoingRecordApi({ ...this.outgoingInfo.query })
				.then((res) => {
					this.outgoingInfo.listTotal = res.data.total
					if (isLoadmore) {
						this.outgoingInfo.data.push(...res.data.list)
					} else {
						this.outgoingInfo.data = res.data.list
					}
					this.outgoingInfo.isEmpty = this.outgoingInfo.data.length === 0
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
				this.accountingInfo.query.page = 1
				this.accountingInfo.data = []
				this.accountingInfo.listTotal = 0
				this.accountingInfo.isEmpty = false
				this.getAccountingLogsList()
				this.isShowTypePopup = false
			} else if ([ 2 ].includes(this.queryType)) {
				this.outgoingInfo.query.page = 1
				this.outgoingInfo.data = []
				this.outgoingInfo.listTotal = 0
				this.outgoingInfo.isEmpty = false
				this.getOutgoingLogsList()
				this.isShowTypePopup = false
			}
		},
		handleClickCommissionRecord(item) {
			uni.navigateTo({
				url: '/another-tf/another-user/commission-statistics/commission-record-detail',
				success: () => {
					setTimeout(() => {
						uni.$emit('sendCommissionRecordDetailMsg', { commissionRecordData: item, fromOrigin: this.queryType })
					}, 400)
				}
			})
		}
	},
	onReachBottom() {
		if ([ 1 ].includes(this.queryType)) {
			if (this.accountingInfo.data.length < this.accountingInfo.listTotal) {
				++this.accountingInfo.query.page
				this.getAccountingLogsList(true)
			}
		} else if ([ 2 ].includes(this.queryType)) {
			if (this.outgoingInfo.data.length < this.outgoingInfo.listTotal) {
				++this.outgoingInfo.query.page
				this.getOutgoingLogsList(true)
			}
		}
	}
}
</script>

<style lang="less" scoped>
.commission-record-container {
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
}
</style>
