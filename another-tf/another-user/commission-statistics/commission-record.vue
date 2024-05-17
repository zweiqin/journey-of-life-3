<template>
	<view class="voucher-record-container">
		<JHeader title="收支明细" width="50" height="50"></JHeader>
		<view style="padding: 20rpx 20rpx 0;">
			<!-- <view class="top-btn">
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
				</view> -->

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
								<text v-if="queryInfo.today === 1">今日佣金</text>
								<text v-else-if="queryInfo.today === 2">累计佣金</text>
								<text v-else-if="queryInfo.today === 3">途中佣金</text>
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
									v-for="item in [{ name: '今日佣金', value: 1 }, { name: '累计佣金', value: 2 }, { name: '途中佣金', value: 3 }]"
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
					总收益￥{{ commissionAcount.quanbu }}
				</view>
				<view v-else-if="[ 1 ].includes(queryInfo.type)">
					总支出￥{{ commissionAcount.zongzhichu }}
				</view>
				<view v-else-if="[ 2 ].includes(queryInfo.type)">
					总收入￥{{ commissionAcount.zongshouru }}
				</view>
			</view>

			<view style="margin-top: 20rpx;">
				<view v-if="commissionRecordList.length > 0">
					<view
						v-for="(item, index) in commissionRecordList" :key="item.id"
						style="display: flex;align-items: center;justify-content: space-between;margin-bottom: 38rpx;"
						@click="handleClickCommissionRecord(item)"
					>
						<view style="flex: 1;display: flex;align-items: center;">
							<view
								style="padding: 18rpx;font-size: 38rpx;font-weight: bold;color: #ffffff;border-radius: 50%;line-height: 1;"
								:style="{ backgroundColor: [5, 7, 6].includes(item.type) ? '#208f57' : [1, 2, 3, 4].includes(item.type) ? '#ef530e' : '#d8d8d8' }"
							>
								<text v-if="[5, 7, 6].includes(item.type)">支</text>
								<text v-else-if="[1, 2, 3, 4].includes(item.type)">收</text>
								<text v-else>--</text>
							</view>
							<view style="margin-left: 14rpx;">
								<view style="font-size: 28rpx;font-weight: bold;color: #222229;">
									<text v-if="item.userNameOne">
										{{ item.userNameOne }}-
									</text>
									<text>
										<text v-if="item.type === 1">关系链</text>
										<text v-else-if="item.type === 2">商城</text>
										<text v-else-if="item.type === 3">本地</text>
										<text v-else-if="item.type === 4">服务</text>
										<text v-else-if="item.type === 5">支付</text>
										<text v-else-if="item.type === 6">退款</text>
										<text v-else-if="item.type === 7">提现</text>
										<text v-else>--</text>
									</text>
								</view>
								<view style="margin-top: 6rpx;font-size: 24rpx;color: #888889;">{{ item.createTime }}</view>
							</view>
						</view>
						<view style="margin-left: 12rpx;text-align: right;">
							<view style="font-size: 28rpx;font-weight: bold;color: #222229;">
								{{ [5, 7, 6].includes(item.type) ? '-' : [1, 2, 3, 4].includes(item.type) ? '+' : '？' }}{{ Number.parseFloat(Number(item.amount || 0)).toFixed(2) }}元
							</view>
							<view style="margin-top: 6rpx;font-size: 24rpx;color: #888889;">
								<text>订单总额：</text>
								<text>{{ Number.parseFloat(Number(item.totalAmount || 0)).toFixed(2) }}</text>
							</view>
						</view>
					</view>
				</view>
				<view style="padding-bottom: 45rpx;">
					<LoadingMore
						:status="!isEmpty && !commissionRecordList.length
							? 'loading' : !isEmpty && commissionRecordList.length && (commissionRecordList.length >= commissionRecordTotal) ? 'no-more' : ''"
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
import { getCommissionDeatilListApi } from '../../../api/anotherTFInterface'
export default {
	name: 'CommissionRecord',
	components: {
	},
	data() {
		return {
			commissionAcount: {
				zongshouru: '',
				zongzhichu: '',
				quanbu: ''
			},
			isShowTypePopup: false,
			timeDropdownShow: false,
			isEmpty: false,
			commissionRecordTotal: 0,
			commissionRecordList: [],
			queryInfo: {
				page: 1,
				pageSize: 20,
				type: 0,
				today: 2
			}
		}
	},
	onLoad(options) {
		this.queryInfo.today = Number(options.today) || 2
		this.getCommissionStatisticsRecord()
	},
	methods: {
		getCommissionStatisticsRecord(isLoadmore) {
			uni.showLoading()
			getCommissionDeatilListApi({ ...this.queryInfo })
				.then((res) => {
					this.commissionRecordTotal = res.data.total
					if (isLoadmore) {
						this.commissionRecordList.push(...res.data.list)
					} else {
						this.commissionRecordList = res.data.list
					}
					this.isEmpty = this.commissionRecordList.length === 0
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
			this.commissionRecordList = []
			this.commissionRecordTotal = 0
			this.isEmpty = false
			this.getCommissionStatisticsRecord()
			this.isShowTypePopup = false
		},
		handleSelectDropdown(timeDropdownIndex) {
			if (this.queryInfo.today === timeDropdownIndex) {
				this.timeDropdownShow = false
				return
			}
			this.queryInfo.today = timeDropdownIndex
			this.queryInfo.page = 1
			this.commissionRecordList = []
			this.commissionRecordTotal = 0
			this.isEmpty = false
			this.getCommissionStatisticsRecord()
			this.timeDropdownShow = false
		},
		handleClickCommissionRecord(item) {
			uni.navigateTo({
				url: '/another-tf/another-user/commission-statistics/commission-record-detail',
				success: () => {
					setTimeout(() => {
						uni.$emit('sendCommissionRecordDetailMsg', { commissionRecordData: item })
					}, 400)
				}
			})
		}
	},
	onReachBottom() {
		if (this.commissionRecordList.length < this.commissionRecordTotal) {
			++this.queryInfo.page
			this.getCommissionStatisticsRecord(true)
		}
	}
}
</script>

<style lang="less" scoped>
.voucher-record-container {
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
