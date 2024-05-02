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
						<text v-if="[ 0 ].includes(queryInfo.type)">
							全部明细
						</text>
						<text v-else-if="[ 1 ].includes(queryInfo.type)">
							支出
						</text>
						<text v-else-if="[ 2 ].includes(queryInfo.type)">
							收入
						</text>
						<tui-icon name="arrowdown" color="#000000" :size="28" unit="rpx" margin="0 0 0 10rpx"></tui-icon>
					</view>
				</tui-button>
			</view>

			<view style="margin-top: 18rpx;font-size: 28rpx;">
				<tui-dropdown-list
					:show="timeDropdownShow" :top="55" background-color="#474747"
					@close="timeDropdownShow = false"
				>
					<template #selectionbox>
						<view
							style="display: flex;align-items: center;color: #222229;"
							@click="timeDropdownShow = !timeDropdownShow"
						>
							<view style="margin-left: 10rpx;font-size: 26rpx;">
								<text v-if="queryInfo.time === 0">全部</text>
								<text v-else-if="queryInfo.time === 1">
									{{ String(new Date().getFullYear()) }}年{{ String(new
										Date().getMonth() + 1).padStart(2, '0') }}月{{ String(new Date().getDate()).padStart(2, '0') }}日
								</text>
								<text v-else-if="queryInfo.time === 2">
									{{ String(new Date(Date.now() - 24 * 60 * 60 *
										1000).getFullYear()) }}年{{ String(new Date(Date.now() - 24 * 60 * 60 * 1000).getMonth() +
										1).padStart(2, '0') }}月{{ String(new Date(Date.now() - 24 * 60 * 60 * 1000).getDate()).padStart(2,
										'0') }}日
								</text>
								<text v-else-if="queryInfo.time === 3">本周</text>
								<text v-else-if="queryInfo.time === 4">
									{{ String(new Date().getFullYear()) }}年{{ String(new
										Date().getMonth() + 1).padStart(2, '0') }}月
								</text>
								<text v-else-if="queryInfo.time === 5">{{ String(new Date().getFullYear()) }}年</text>
							</view>
							<view
								style="display: flex;align-items: center;justify-content: center;width: 20rpx;height: 20rpx;margin-left: 12rpx;padding: 4rpx;color: #ffffff;background-color: #000000;border-radius: 50%;"
							>
								∨
							</view>
						</view>
					</template>
					<template #dropdownbox>
						<view style="width: fit-content;box-sizing: border-box;">
							<tui-list-view
								color="#ffffff" margin-top="2rpx"
								style="width: fit-content;min-width: 140rpx;max-height: 28vh;overflow-y: auto;"
							>
								<tui-list-cell
									v-for="item in [{ name: '全部', value: 0 }, { name: '今天', value: 1 }, { name: '昨天', value: 2 }, { name: '本周', value: 3 }, { name: '本月', value: 4 }, { name: '本年', value: 5 }]"
									:key="item.value" padding="20rpx 0" color="#ffffff" background-color="transparent"
									style="width: fit-content;margin: 0 auto;border-bottom: 2rpx solid #999999;"
									@click="handleSelectDropdown(item.value)"
								>
									{{ item.name }}
								</tui-list-cell>
							</tui-list-view>
						</view>
					</template>
				</tui-dropdown-list>
			</view>

			<view style="margin-top: 12rpx;font-size: 28rpx;">
				<view v-if="[ 0 ].includes(queryInfo.type)">
					总收益￥{{ transactionAcount.quanbu }}
				</view>
				<view v-else-if="[ 1 ].includes(queryInfo.type)">
					总支出￥{{ transactionAcount.zongzhichu }}
				</view>
				<view v-else-if="[ 2 ].includes(queryInfo.type)">
					总收入￥{{ transactionAcount.zongshouru }}
				</view>
			</view>

			<view style="margin-top: 20rpx;">
				<view v-if="transactionRecordList.length > 0">
					<view
						v-for="(item, index) in transactionRecordList" :key="item.id"
						style="display: flex;align-items: center;justify-content: space-between;margin-bottom: 38rpx;"
						@click="handleClickTransactionRecord(item)"
					>
						<view style="flex: 1;display: flex;align-items: center;">
							<view
								style="padding: 18rpx;font-size: 38rpx;font-weight: bold;color: #ffffff;border-radius: 50%;line-height: 1;"
								:style="{ backgroundColor: [2, 3].includes(item.targetType) ? '#208f57' : [1, 4, 5].includes(item.targetType) ? '#ef530e' : '#d8d8d8' }"
							>
								<text v-if="[1, 4, 5].includes(item.targetType)">收</text>
								<text v-else-if="[2, 3].includes(item.targetType)">支</text>
								<text v-else>--</text>
							</view>
							<view style="margin-left: 14rpx;">
								<view style="font-size: 28rpx;font-weight: bold;color: #222229;">
									<text>
										<text v-if="item.targetType === 1">充值</text>
										<text v-else-if="item.targetType === 2">提现</text>
										<text v-else-if="item.targetType === 3">订单</text>
										<text v-else-if="item.targetType === 4">退款</text>
										<text v-else-if="item.targetType === 5">赠送</text>
										<text v-else>--</text>
									</text>
									<text v-if="item.number">
										-{{ item.number }}
									</text>
								</view>
								<view style="margin-top: 6rpx;font-size: 24rpx;color: #888889;">{{ item.createTime }}</view>
							</view>
						</view>
						<view style="margin-left: 12rpx;text-align: right;">
							<view style="font-size: 28rpx;font-weight: bold;color: #222229;">
								{{ [1, 4, 5].includes(item.targetType) ? '+' : [2, 3].includes(item.targetType) ? '-' : '？' }}{{ Number.parseFloat(Math.abs(item.fee) || 0).toFixed(2) }}元
							</view>
							<!-- <view style="margin-top: 6rpx;font-size: 24rpx;color: #888889;">
								<text>状态：</text>
								<text v-if="item.resultType === 0">未完成</text>
								<text v-else-if="item.resultType === 1">处理完成</text>
								<text v-else>--</text>
								</view> -->
							<view style="margin-top: 6rpx;font-size: 24rpx;color: #888889;">
								<text>余额：￥</text>
								<!-- <text v-if="item.disposeAccountJson">
									{{ JSON.parse(item.disposeAccountJson).beeCoinPrice || '--' }}
									</text> -->
								<text v-if="item.beeCoinPrice">
									{{ item.beeCoinPrice || '--' }}
								</text>
								<text v-else>未知</text>
							</view>
						</view>
					</view>
				</view>
				<view style="padding-bottom: 45rpx;">
					<LoadingMore
						:status="!isEmpty && !transactionRecordList.length
							? 'loading' : !isEmpty && transactionRecordList.length && (transactionRecordList.length >= transactionRecordTotal) ? 'no-more' : ''"
					>
					</LoadingMore>
					<tui-no-data v-if="isEmpty" :fixed="false" style="margin-top: 60rpx;">暂无数据~</tui-no-data>
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
									v-for="(item, index) in [{ name: '全部', value: 0 }, { name: '支出', value: 1 }, { name: '收入', value: 2 }]"
									:key="index"
									style="flex: 1;padding: 10rpx 0;margin: 18rpx 6rpx 0;font-size: 26rpx;background-color: #f4f4f4;border-radius: 16rpx;"
									:style="{
										border: queryInfo.type === item.value ? '2rpx solid #ff4b10' : '2rpx solid #fff1ec',
										color: queryInfo.type === item.value ? '#ff4b10' : '#000000'
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
import { getBeeCurrencyDistributorApi } from '../../../api/anotherTFInterface'
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
			isEmpty: false,
			transactionRecordTotal: 0,
			transactionRecordList: [],
			queryInfo: {
				page: 1,
				pageSize: 20,
				type: 0,
				time: 0
			}
		}
	},
	onLoad(options) {
		this.getTransactionStatisticsRecord()
	},
	methods: {
		getTransactionStatisticsRecord(isLoadmore) {
			uni.showLoading()
			getBeeCurrencyDistributorApi({ ...this.queryInfo })
				.then((res) => {
					this.transactionRecordTotal = res.data.total
					if (isLoadmore) {
						this.transactionRecordList.push(...res.data.list)
					} else {
						this.transactionRecordList = res.data.list
					}
					this.isEmpty = this.transactionRecordList.length === 0
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		handleSelectTypeActive(item) {
			if (this.queryInfo.type === item.value) return
			this.queryInfo.type = item.value
			this.queryInfo.page = 1
			this.transactionRecordList = []
			this.transactionRecordTotal = 0
			this.isEmpty = false
			this.getTransactionStatisticsRecord()
			this.isShowTypePopup = false
		},
		handleSelectDropdown(timeDropdownIndex) {
			if (this.queryInfo.time === timeDropdownIndex) {
				this.timeDropdownShow = false
				return
			}
			this.queryInfo.time = timeDropdownIndex
			this.queryInfo.page = 1
			this.transactionRecordList = []
			this.transactionRecordTotal = 0
			this.isEmpty = false
			this.getTransactionStatisticsRecord()
			this.timeDropdownShow = false
		},
		handleClickTransactionRecord(item) {
			uni.navigateTo({
				url: '/another-tf/another-user/transaction-funds/transaction-record-detail',
				success: () => {
					setTimeout(() => {
						uni.$emit('sendTransactionRecordDetailMsg', { transactionRecordData: item })
					}, 400)
				}
			})
		}
	},
	onReachBottom() {
		if (this.transactionRecordList.length < this.transactionRecordTotal) {
			++this.queryInfo.page
			this.getTransactionStatisticsRecord(true)
		}
	}
}
</script>

<style lang="less" scoped>
.transaction-record-container {
	min-height: 100vh;
	box-sizing: border-box;

	/deep/ .j-header-container {
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
