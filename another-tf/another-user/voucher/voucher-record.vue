<template>
	<view class="voucher-record-container">
		<JHeader title="收支明细" width="50" height="50"></JHeader>
		<view style="padding: 20rpx 20rpx 0;">
			<view class="top-btn">
				<tui-button
					type="white" width="200rpx" height="60rpx" shape="circle"
					link margin="0"
					@click="isShowTypePopup = true"
				>
					<view style="display: flex;align-items: center;font-size: 28rpx;line-height: 1;">
						<text v-if="[ 3 ].includes(queryType)">
							全部明细
						</text>
						<text v-else-if="[ 2 ].includes(queryType)">
							支出
						</text>
						<text v-else-if="[ 1 ].includes(queryType)">
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
								<text v-if="timeDropdownIndex === 0">全部</text>
								<text v-else-if="timeDropdownIndex === 1">
									{{ String(new Date().getFullYear()) }}年{{ String(new
										Date().getMonth() + 1).padStart(2, '0') }}月{{ String(new Date().getDate()).padStart(2, '0') }}日
								</text>
								<text v-else-if="timeDropdownIndex === 2">
									{{ String(new Date(Date.now() - 24 * 60 * 60 *
										1000).getFullYear()) }}年{{ String(new Date(Date.now() - 24 * 60 * 60 * 1000).getMonth() +
										1).padStart(2, '0') }}月{{ String(new Date(Date.now() - 24 * 60 * 60 * 1000).getDate()).padStart(2,
										'0') }}日
								</text>
								<text v-else-if="timeDropdownIndex === 3">本周</text>
								<text v-else-if="timeDropdownIndex === 4">
									{{ String(new Date().getFullYear()) }}年{{ String(new
										Date().getMonth() + 1).padStart(2, '0') }}月
								</text>
								<text v-else-if="timeDropdownIndex === 5">{{ String(new Date().getFullYear()) }}年</text>
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
								style="width: fit-content;min-width: 100rpx;max-height: 28vh;overflow-y: auto;"
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
				<view v-if="[ 3 ].includes(queryType)">
					总收益￥{{ voucherAcount.zongshouyi }}
				</view>
				<view v-else-if="[ 2 ].includes(queryType)">
					总支出￥{{ voucherAcount.zongzhichu }}
				</view>
				<view v-else-if="[ 1 ].includes(queryType)">
					总充值￥{{ voucherAcount.zongchongzhi }}
				</view>
			</view>

			<view style="margin-top: 20rpx;">
				<view v-if="[3, 2].includes(queryType)">
					<view v-if="logsInfo.data.length > 0">
						<view
							v-for="(item, index) in logsInfo.data" :key="item.id"
							style="display: flex;align-items: center;justify-content: space-between;margin-bottom: 38rpx;"
							@click="handleClickVoucherRecord"
						>
							<view style="flex: 1;display: flex;align-items: center;">
								<view
									style="padding: 18rpx;font-size: 38rpx;font-weight: bold;color: #ffffff;border-radius: 50%;line-height: 1;"
									:style="{ backgroundColor: [2, 4].includes(item.type) ? '#ef530e' : '#208f57' }"
								>
									<text v-if="[2, 4].includes(item.type)">支</text>
									<text v-else>收</text>
								</view>
								<view style="margin-left: 14rpx;">
									<view style="font-size: 28rpx;font-weight: bold;color: #222229;">
										<text>
											代金券
											<text v-if="item.type === 1">充值</text>
											<text v-else-if="item.type === 2">转赠</text>
											<text v-else-if="item.type === 3">签到</text>
											<text v-else-if="item.type === 4">抵扣</text>
											<text v-else-if="item.type === 5">核销</text>
											<text v-else-if="item.type === 6">抽奖</text>
											<text v-else-if="item.type === 7">退款</text>
											<text v-else-if="item.type === 8">充值赠送</text>
											<text v-else-if="item.type === 9">下单</text>
											<text v-else>--</text>
										</text>
										<text v-if="[ 2 ].includes(queryType) && item.username">
											-{{ item.username }}
										</text>
										<text v-else-if="[ 3 ].includes(queryType) && item.userNameOne">
											-{{ item.userNameOne }}
										</text>
									</view>
									<view style="margin-top: 6rpx;font-size: 24rpx;color: #888889;">{{ item.createTime }}</view>
								</view>
							</view>
							<view style="margin-left: 12rpx;text-align: right;">
								<view style="font-size: 28rpx;font-weight: bold;color: #222229;">
									价值{{ item.number / 2 }}元
								</view>
								<view style="margin-top: 6rpx;font-size: 24rpx;color: #888889;">
									<text>代金券：</text>
									<text>
										{{ ([ 2 ].includes(queryType) && [2, 4].includes(item.type)) ||
											([ 3 ].includes(queryType) && [ 4 ].includes(item.type)) ? '-' : '+' }}
									</text>
									<text>{{ item.number }}</text>
								</view>
							</view>
						</view>
					</view>
					<view style="padding-bottom: 45rpx;">
						<LoadingMore
							:status="!logsInfo.isEmpty && !logsInfo.data.length
								? 'loading' : !logsInfo.isEmpty && logsInfo.data.length && (logsInfo.data.length >= logsInfo.listTotal) ? 'no-more' : ''"
						>
						</LoadingMore>
						<tui-no-data v-if="logsInfo.isEmpty" :fixed="false" style="margin-top: 60rpx;">暂无数据~</tui-no-data>
					</view>
				</view>
				<view v-else-if="[ 1 ].includes(queryType)">
					<view v-if="orderInfo.data.length > 0">
						<view
							v-for="(item, index) in orderInfo.data" :key="item.id"
							style="display: flex;align-items: center;justify-content: space-between;padding-top: 38rpx;"
							@click="handleClickVoucherRecord"
						>
							<view style="flex: 1;display: flex;align-items: center;">
								<view
									style="padding: 18rpx;font-size: 38rpx;font-weight: bold;color: #ffffff;background-color: #ef530e;border-radius: 50%;line-height: 1;"
								>
									收
								</view>
								<view style="margin-left: 14rpx;">
									<view style="font-size: 28rpx;font-weight: bold;color: #222229;">{{ item.typeStrName }}代金券</view>
									<view style="margin-top: 6rpx;font-size: 24rpx;color: #888889;">{{ item.createTime }}</view>
								</view>
							</view>
							<view style="text-align: right;">
								<view style="font-size: 28rpx;font-weight: bold;color: #222229;">
									￥{{ item.payGrade }}元（{{ ['未付款', '取消',
										'已付款', '未发放', '已发放', '支付失败'][item.status] }}）
								</view>
								<view style="padding-right: 10rpx;margin-top: 6rpx;font-size: 24rpx;color: #888889;">
									代金券：+{{ item.number }}
								</view>
							</view>
						</view>
					</view>
					<view style="padding-bottom: 45rpx;">
						<LoadingMore
							:status="!orderInfo.isEmpty && !orderInfo.data.length
								? 'loading' : !orderInfo.isEmpty && orderInfo.data.length && (orderInfo.data.length >= orderInfo.listTotal) ? 'no-more' : ''"
						>
						</LoadingMore>
						<tui-no-data v-if="orderInfo.isEmpty" :fixed="false" style="margin-top: 60rpx;">暂无数据~</tui-no-data>
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
									v-for="(item, index) in [{ name: '流水', value: 3 }, { name: '收入', value: 1 }, { name: '支出', value: 2 }]"
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
import { getTransferLogsVoucherShopHoldApi, getAllVoucherOrderApi, getTotalVoucherOrderApi } from '../../../api/anotherTFInterface'
export default {
	name: 'VoucherRecord',
	components: {
	},
	data() {
		return {
			voucherAcount: {
				zongchongzhi: '',
				zongzhichu: '',
				zongshouyi: ''
			},
			isShowTypePopup: false,
			timeDropdownShow: false,
			timeDropdownIndex: 0,
			queryType: 3,
			logsInfo: {
				query: {
					page: 1,
					pageSize: 20,
					type: 3,
					condition: 0
				},
				data: [],
				listTotal: 0,
				isEmpty: false
			},
			orderInfo: {
				query: {
					page: 1,
					pageSize: 20,
					type: 1,
					status: '',
					condition: 0
				},
				data: [],
				listTotal: 0, // 列表数据总数
				isEmpty: false // 列表是否为空
			},
			totalVoucherQuery: {
				type: '',
				condition: 0
			}
		}
	},
	onLoad() {
		if ([3, 2].includes(this.queryType)) {
			this.logsInfo.query.page = 1
			this.getTransferLogsVoucherList()
			this.getTotalVoucherData()
		} else if ([ 1 ].includes(this.queryType)) {
			this.orderInfo.query.page = 1
			this.getAllVoucherOrderList()
			this.getTotalVoucherData()
		}
	},
	methods: {
		getTotalVoucherData() {
			getTotalVoucherOrderApi({ ...this.totalVoucherQuery, type: this.queryType })
				.then((res) => {
					if ([ 3 ].includes(this.queryType)) {
						this.voucherAcount.zongshouyi = res.data['总收益']
					} else if ([ 2 ].includes(this.queryType)) {
						this.voucherAcount.zongshouyi = res.data['总支出']
					} else if ([ 1 ].includes(this.queryType)) {
						this.voucherAcount.zongchongzhi = res.data['总充值']
					}
				})
		},
		getTransferLogsVoucherList(isLoadmore) {
			uni.showLoading()
			getTransferLogsVoucherShopHoldApi({ ...this.logsInfo.query })
				.then((res) => {
					this.logsInfo.listTotal = res.data.total
					if (isLoadmore) {
						this.logsInfo.data.push(...res.data.records)
					} else {
						this.logsInfo.data = res.data.records
					}
					this.logsInfo.isEmpty = this.logsInfo.data.length === 0
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		getAllVoucherOrderList(isLoadmore) {
			uni.showLoading()
			getAllVoucherOrderApi({ ...this.orderInfo.query })
				.then((res) => {
					this.orderInfo.listTotal = res.data.total
					if (isLoadmore) {
						this.orderInfo.data.push(...res.data.records)
					} else {
						this.orderInfo.data = res.data.records
					}
					this.orderInfo.isEmpty = this.orderInfo.data.length === 0
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		handleSelectTypeActive(item) {
			if (this.queryType === item.value) return
			this.queryType = item.value
			if ([3, 2].includes(this.queryType)) {
				this.logsInfo.query.type = this.queryType
				this.logsInfo.query.page = 1
				this.logsInfo.data = []
				this.logsInfo.listTotal = 0
				this.logsInfo.isEmpty = false
				this.getTransferLogsVoucherList()
				this.getTotalVoucherData()
				this.isShowTypePopup = false
			} else if ([ 1 ].includes(this.queryType)) {
				this.orderInfo.query.type = this.queryType
				this.orderInfo.query.page = 1
				this.orderInfo.data = []
				this.orderInfo.listTotal = 0
				this.orderInfo.isEmpty = false
				this.getAllVoucherOrderList()
				this.getTotalVoucherData()
				this.isShowTypePopup = false
			}
		},
		handleSelectDropdown(timeDropdownIndex) {
			if (this.timeDropdownIndex === timeDropdownIndex) {
				this.timeDropdownShow = false
				return
			}
			this.timeDropdownIndex = timeDropdownIndex
			this.totalVoucherQuery.condition = timeDropdownIndex
			this.logsInfo.query.condition = this.timeDropdownIndex
			this.orderInfo.query.condition = this.timeDropdownIndex
			if ([3, 2].includes(this.queryType)) {
				this.logsInfo.query.page = 1
				this.logsInfo.data = []
				this.logsInfo.listTotal = 0
				this.logsInfo.isEmpty = false
				this.getTransferLogsVoucherList()
				this.getTotalVoucherData()
				this.timeDropdownShow = false
			} else if ([ 1 ].includes(this.queryType)) {
				this.orderInfo.query.page = 1
				this.orderInfo.data = []
				this.orderInfo.listTotal = 0
				this.orderInfo.isEmpty = false
				this.getAllVoucherOrderList()
				this.getTotalVoucherData()
				this.timeDropdownShow = false
			}
		},
		handleClickVoucherRecord(item) {
			uni.navigateTo({
				url: '/another-tf/another-user/voucher/voucher-record-detail',
				success: () => {
					setTimeout(() => {
						uni.$emit('sendVoucherRecordDetailMsg', { voucherRecordData: item, from: this.queryType })
					}, 400)
				}
			})
		}
	},
	onReachBottom() {
		if ([3, 2].includes(this.queryType)) {
			if (this.logsInfo.data.length < this.logsInfo.listTotal) {
				++this.logsInfo.query.page
				this.getTransferLogsVoucherList(true)
			}
		} else if ([ 1 ].includes(this.queryType)) {
			if (this.orderInfo.data.length < this.orderInfo.listTotal) {
				++this.orderInfo.query.page
				this.getAllVoucherOrderList(true)
			}
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
