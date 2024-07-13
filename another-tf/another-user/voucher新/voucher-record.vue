<template>
	<view class="voucher-record-container">
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
							兑换代金券入账记录
						</text>
						<text v-else-if="[ 2 ].includes(queryType)">
							兑换代金券出账记录
						</text>
						<text v-if="[ 3 ].includes(queryType)">
							充值代金券入账记录
						</text>
						<text v-else-if="[ 4 ].includes(queryType)">
							充值代金券出账记录
						</text>
						<text v-else-if="[ 5 ].includes(queryType)">
							充值代金券订单
						</text>
						<tui-icon name="arrowdown" color="#000000" :size="28" unit="rpx" margin="0 0 0 10rpx"></tui-icon>
					</view>
				</tui-button>
			</view>

			<view style="padding: 18rpx 0 0;font-size: 28rpx;">
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
								<!-- , { name: '今天', value: 1 }, { name: '昨天', value: 2 }, { name: '本周', value: 3 }, { name: '本月', value: 4 }, { name: '本年', value: 5 } -->
								<tui-list-cell
									v-for="item in [ { name: '全部', value: 0 } ]"
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

			<view v-if="[ 5 ].includes(queryType)" style="padding: 18rpx 0 0;">
				<tui-radio-group
					:value="orderInfo.query.status"
					@change="(e) => orderInfo.query.status !== e.detail.value && ((orderInfo.query.status = e.detail.value) || true) && (orderInfo.query.page = 1) && getAllVoucherOrderList()"
				>
					<view style="display: flex;flex-wrap: wrap;align-items: center;">
						<text style="font-size: 30rpx;">选择状态：</text>
						<tui-label
							v-for="(item, index) in [{ name: '全部', value: '' }, { name: '未付款', value: '0' }, { name: '取消', value: '1' }, { name: '已付款', value: '2' }, { name: '支付失败', value: '3' }]"
							:key="index"
						>
							<view style="display: flex;align-items: center;padding: 6rpx 10rpx;font-size: 28rpx;">
								<tui-radio
									:checked="orderInfo.query.status === item.value" :value="item.value"
									color="#07c160" border-color="#999" :scale-ratio="0.8"
								>
								</tui-radio>
								<text>{{ item.name }}</text>
							</view>
						</tui-label>
					</view>
				</tui-radio-group>
			</view>

			<!-- <view style="margin-top: 12rpx;font-size: 28rpx;">
				<view v-if="[ 1 ].includes(queryType)">
				兑换代金券总入账￥{{ voucherAcount.zongruzhang }}
				</view>
				<view v-else-if="[ 2 ].includes(queryType)">
				兑换代金券总出账￥{{ voucherAcount.zongchuzhang }}
				</view>
				<view v-else-if="[ 5 ].includes(queryType)">
				总充值￥{{ voucherAcount.zongchongzhi }}
				</view>
				</view> -->

			<view style="margin-top: 20rpx;">
				<view v-if="[ 1 ].includes(queryType)">
					<view v-if="exchangeAccountingInfo.data.length > 0">
						<view
							v-for="(item, index) in exchangeAccountingInfo.data" :key="item.id"
							style="display: flex;align-items: center;justify-content: space-between;margin-bottom: 38rpx;"
							@click="handleClickVoucherRecord(item)"
						>
							<view style="flex: 1;display: flex;align-items: center;">
								<view
									style="padding: 18rpx;font-size: 38rpx;font-weight: bold;color: #ffffff;border-radius: 50%;line-height: 1;background-color: #ef530e;"
								>
									<text>收</text>
								</view>
								<view style="flex: 1;width: 0;margin-left: 14rpx;">
									<view style="font-size: 28rpx;font-weight: bold;color: #222229;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
										<text>
											代金券
											<text v-if="item.waterType === 1">充值</text>
											<text v-else-if="item.waterType === 2">转入</text>
											<text v-else-if="item.waterType === 3">签到</text>
											<text v-else-if="item.waterType === 4">抽奖</text>
											<text v-else-if="item.waterType === 5">充值赠送</text>
											<text v-else-if="item.waterType === 6">商城下单</text>
											<text v-else-if="item.waterType === 7">商圈下单</text>
											<text v-else-if="item.waterType === 8">社区下单</text>
											<text v-else-if="item.waterType === 9">活动</text>
											<text v-else-if="item.waterType === 10">退款</text>
											<text v-else>--</text>
										</text>
										<text>
											-
											<text v-if="item.sourceType === 1">平台</text>
											<text v-else-if="item.sourceType === 2">商家</text>
											<text v-else-if="item.sourceType === 3">用户</text>
											<text v-else-if="item.sourceType === 4">社区</text>
											<text v-else>--</text>
										</text>
									</view>
									<view style="margin-top: 6rpx;font-size: 24rpx;color: #888889;">{{ item.createTime }}</view>
								</view>
							</view>
							<view style="margin-left: 12rpx;text-align: right;">
								<view style="font-size: 28rpx;font-weight: bold;color: #222229;">
									来源：{{ item.sourceName || '--' }}
								</view>
								<view style="margin-top: 6rpx;font-size: 24rpx;color: #888889;">
									<text>代金券：+{{ item.number }}</text>
								</view>
							</view>
						</view>
					</view>
					<view style="padding-bottom: 45rpx;">
						<LoadingMore
							:status="!exchangeAccountingInfo.isEmpty && !exchangeAccountingInfo.data.length
								? 'loading' : !exchangeAccountingInfo.isEmpty && exchangeAccountingInfo.data.length && (exchangeAccountingInfo.data.length >= exchangeAccountingInfo.listTotal) ? 'no-more' : ''"
						>
						</LoadingMore>
						<tui-no-data v-if="exchangeAccountingInfo.isEmpty" :fixed="false" style="margin-top: 60rpx;">暂无数据~</tui-no-data>
					</view>
				</view>
				<view v-else-if="[ 2 ].includes(queryType)">
					<view v-if="exchangeOutgoingInfo.data.length > 0">
						<view
							v-for="(item, index) in exchangeOutgoingInfo.data" :key="item.id"
							style="display: flex;align-items: center;justify-content: space-between;margin-bottom: 38rpx;"
							@click="handleClickVoucherRecord(item)"
						>
							<view style="flex: 1;display: flex;align-items: center;">
								<view
									style="padding: 18rpx;font-size: 38rpx;font-weight: bold;color: #ffffff;border-radius: 50%;line-height: 1;background-color: #208f57;"
								>
									<text>支</text>
								</view>
								<view style="flex: 1;width: 0;margin-left: 14rpx;">
									<view style="font-size: 28rpx;font-weight: bold;color: #222229;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
										<text>
											代金券
											<text v-if="item.waterType === 1">商城兑换</text>
											<text v-else-if="item.waterType === 2">商圈兑换</text>
											<text v-else-if="item.waterType === 3">社区兑换</text>
											<text v-else-if="item.waterType === 4">转出</text>
											<text v-else-if="item.waterType === 5">专区兑换</text>
											<text v-else>--</text>
										</text>
										<text v-if="item.orderFormid">
											-{{ item.orderFormid }}
										</text>
									</view>
									<view style="margin-top: 6rpx;font-size: 24rpx;color: #888889;">{{ item.createTime }}</view>
								</view>
							</view>
							<view style="margin-left: 12rpx;text-align: right;">
								<view style="font-size: 28rpx;font-weight: bold;color: #222229;">
									目标：{{ item.destinationName || '--' }}
								</view>
								<view style="margin-top: 6rpx;font-size: 24rpx;color: #888889;">
									<text>代金券：-{{ item.number }}</text>
								</view>
							</view>
						</view>
					</view>
					<view style="padding-bottom: 45rpx;">
						<LoadingMore
							:status="!exchangeOutgoingInfo.isEmpty && !exchangeOutgoingInfo.data.length
								? 'loading' : !exchangeOutgoingInfo.isEmpty && exchangeOutgoingInfo.data.length && (exchangeOutgoingInfo.data.length >= exchangeOutgoingInfo.listTotal) ? 'no-more' : ''"
						>
						</LoadingMore>
						<tui-no-data v-if="exchangeOutgoingInfo.isEmpty" :fixed="false" style="margin-top: 60rpx;">暂无数据~</tui-no-data>
					</view>
				</view>
				<view v-else-if="[ 3 ].includes(queryType)">
					<view v-if="rechargeAccountingInfo.data.length > 0">
						<view
							v-for="(item, index) in rechargeAccountingInfo.data" :key="item.id"
							style="display: flex;align-items: center;justify-content: space-between;margin-bottom: 38rpx;"
							@click="handleClickVoucherRecord(item)"
						>
							<view style="flex: 1;display: flex;align-items: center;">
								<view
									style="padding: 18rpx;font-size: 38rpx;font-weight: bold;color: #ffffff;border-radius: 50%;line-height: 1;background-color: #ef530e;"
								>
									<text>收</text>
								</view>
								<view style="flex: 1;width: 0;margin-left: 14rpx;">
									<view style="font-size: 28rpx;font-weight: bold;color: #222229;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
										<text>
											代金券
											<text v-if="item.waterType === 1">充值</text>
											<text v-else-if="item.waterType === 2">退款</text>
											<text v-else>--</text>
										</text>
										<text>
											-
											<text v-if="item.sourceType === 1">平台</text>
											<text v-else-if="item.sourceType === 2">商家</text>
											<text v-else-if="item.sourceType === 3">用户</text>
											<text v-else-if="item.sourceType === 4">社区</text>
											<text v-else-if="item.sourceType === 5">旧数据同步</text>
											<text v-else>--</text>
										</text>
									</view>
									<view style="margin-top: 6rpx;font-size: 24rpx;color: #888889;">{{ item.createTime }}</view>
								</view>
							</view>
							<view style="margin-left: 12rpx;text-align: right;">
								<view style="font-size: 28rpx;font-weight: bold;color: #222229;">
									来源：{{ item.sourceName || '--' }}
								</view>
								<view style="margin-top: 6rpx;font-size: 24rpx;color: #888889;">
									<text>代金券：+{{ item.number }}</text>
								</view>
							</view>
						</view>
					</view>
					<view style="padding-bottom: 45rpx;">
						<LoadingMore
							:status="!rechargeAccountingInfo.isEmpty && !rechargeAccountingInfo.data.length
								? 'loading' : !rechargeAccountingInfo.isEmpty && rechargeAccountingInfo.data.length && (rechargeAccountingInfo.data.length >= rechargeAccountingInfo.listTotal) ? 'no-more' : ''"
						>
						</LoadingMore>
						<tui-no-data v-if="rechargeAccountingInfo.isEmpty" :fixed="false" style="margin-top: 60rpx;">暂无数据~</tui-no-data>
					</view>
				</view>
				<view v-else-if="[ 4 ].includes(queryType)">
					<view v-if="rechargeOutgoingInfo.data.length > 0">
						<view
							v-for="(item, index) in rechargeOutgoingInfo.data" :key="item.id"
							style="display: flex;align-items: center;justify-content: space-between;margin-bottom: 38rpx;"
							@click="handleClickVoucherRecord(item)"
						>
							<view style="flex: 1;display: flex;align-items: center;">
								<view
									style="padding: 18rpx;font-size: 38rpx;font-weight: bold;color: #ffffff;border-radius: 50%;line-height: 1;background-color: #208f57;"
								>
									<text>支</text>
								</view>
								<view style="flex: 1;width: 0;margin-left: 14rpx;">
									<view style="font-size: 28rpx;font-weight: bold;color: #222229;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
										<text>
											代金券
											<text v-if="item.waterType === 1">账户转出</text>
											<text v-else-if="item.waterType === 2">专区兑换</text>
											<text v-else>--</text>
										</text>
										<text v-if="item.orderFormid">
											-{{ item.orderFormid }}
										</text>
									</view>
									<view style="margin-top: 6rpx;font-size: 24rpx;color: #888889;">{{ item.createTime }}</view>
								</view>
							</view>
							<view style="margin-left: 12rpx;text-align: right;">
								<view style="font-size: 28rpx;font-weight: bold;color: #222229;">
									目标：{{ item.destinationName || '--' }}
								</view>
								<view style="margin-top: 6rpx;font-size: 24rpx;color: #888889;">
									<text>代金券：-{{ item.number }}</text>
								</view>
							</view>
						</view>
					</view>
					<view style="padding-bottom: 45rpx;">
						<LoadingMore
							:status="!rechargeOutgoingInfo.isEmpty && !rechargeOutgoingInfo.data.length
								? 'loading' : !rechargeOutgoingInfo.isEmpty && rechargeOutgoingInfo.data.length && (rechargeOutgoingInfo.data.length >= rechargeOutgoingInfo.listTotal) ? 'no-more' : ''"
						>
						</LoadingMore>
						<tui-no-data v-if="rechargeOutgoingInfo.isEmpty" :fixed="false" style="margin-top: 60rpx;">暂无数据~</tui-no-data>
					</view>
				</view>
				<view v-else-if="[ 5 ].includes(queryType)">
					<view v-if="orderInfo.data.length > 0">
						<view
							v-for="(item, index) in orderInfo.data" :key="item.id"
							style="display: flex;align-items: center;justify-content: space-between;margin-bottom: 38rpx;"
							@click="handleClickVoucherRecord(item)"
						>
							<view style="flex: 1;display: flex;align-items: center;">
								<view
									style="padding: 18rpx;font-size: 38rpx;font-weight: bold;color: #ffffff;border-radius: 50%;line-height: 1;background-color: #ef530e;"
								>
									<text>收</text>
								</view>
								<view style="flex: 1;width: 0;margin-left: 14rpx;">
									<view style="font-size: 28rpx;font-weight: bold;color: #222229;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
										<text>
											编号{{ item.orderFormid }}
										</text>
									</view>
									<view style="margin-top: 6rpx;font-size: 24rpx;color: #888889;">{{ item.createTime }}</view>
								</view>
							</view>
							<view style="margin-left: 12rpx;text-align: right;">
								<view style="font-size: 28rpx;font-weight: bold;color: #222229;">
									消费{{ item.payGrade }}元（{{ ['未付款', '取消', '已付款', '支付失败'][item.status] }}）
								</view>
								<view style="margin-top: 6rpx;font-size: 24rpx;color: #888889;">
									<text>代金券：+{{ item.number }}</text>
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
									v-for="(item, index) in [{ name: '兑换代金券入账记录', value: 1 }, { name: '兑换代金券出账记录', value: 2 }, { name: '充值代金券入账记录', value: 1 }, { name: '充值代金券出账记录', value: 2 }, { name: '充值代金券订单', value: 5 }]"
									:key="index"
									style="padding: 10rpx 34rpx;margin: 18rpx 6rpx 0;font-size: 26rpx;background-color: #f4f4f4;border-radius: 16rpx;"
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
import { getBuyerVoucherEntryRecordApi, getBuyerVoucherOutgoingRecordApi, getAllBuyerVoucherOrderApi, getAllEntryRecordApi, getAllOutgoingRecordApi } from '../../../api/anotherTFInterface'
export default {
	name: 'VoucherRecord',
	components: {
	},
	data() {
		return {
			voucherAcount: {
				zongruzhang: '',
				zongchuzhang: '',
				zongchongzhi: ''
			},
			isShowTypePopup: false,
			timeDropdownShow: false,
			timeDropdownIndex: 0,
			queryType: 1,
			exchangeAccountingInfo: {
				query: {
					page: 1,
					pageSize: 20
				},
				data: [],
				listTotal: 0,
				isEmpty: false
			},
			exchangeOutgoingInfo: {
				query: {
					page: 1,
					pageSize: 20
				},
				data: [],
				listTotal: 0,
				isEmpty: false
			},
			rechargeAccountingInfo: {
				query: {
					page: 1,
					pageSize: 20
				},
				data: [],
				listTotal: 0,
				isEmpty: false
			},
			rechargeOutgoingInfo: {
				query: {
					page: 1,
					pageSize: 20
				},
				data: [],
				listTotal: 0,
				isEmpty: false
			},
			orderInfo: {
				query: {
					page: 1,
					pageSize: 20,
					status: ''
				},
				data: [],
				listTotal: 0,
				isEmpty: false
			}
		}
	},
	onLoad() {
		if ([ 1 ].includes(this.queryType)) {
			this.exchangeAccountingInfo.query.page = 1
			this.getExchangeAccountingLogsList()
		} else if ([ 2 ].includes(this.queryType)) {
			this.exchangeOutgoingInfo.query.page = 1
			this.getExchangeOutgoingLogsList()
		} else if ([ 3 ].includes(this.queryType)) {
			this.rechargeAccountingInfo.query.page = 1
			this.getRechargeAccountingLogsList()
		} else if ([ 4 ].includes(this.queryType)) {
			this.rechargeOutgoingInfo.query.page = 1
			this.getRechargeOutgoingLogsList()
		} else if ([ 5 ].includes(this.queryType)) {
			this.orderInfo.query.page = 1
			this.getAllVoucherOrderList()
		}
	},
	methods: {
		getExchangeAccountingLogsList(isLoadmore) {
			uni.showLoading()
			getBuyerVoucherEntryRecordApi({ ...this.exchangeAccountingInfo.query })
				.then((res) => {
					this.exchangeAccountingInfo.listTotal = res.data.total
					if (isLoadmore) {
						this.exchangeAccountingInfo.data.push(...res.data.list)
					} else {
						this.exchangeAccountingInfo.data = res.data.list
					}
					this.exchangeAccountingInfo.isEmpty = this.exchangeAccountingInfo.data.length === 0
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		getExchangeOutgoingLogsList(isLoadmore) {
			uni.showLoading()
			getBuyerVoucherOutgoingRecordApi({ ...this.exchangeOutgoingInfo.query })
				.then((res) => {
					this.exchangeOutgoingInfo.listTotal = res.data.total
					if (isLoadmore) {
						this.exchangeOutgoingInfo.data.push(...res.data.list)
					} else {
						this.exchangeOutgoingInfo.data = res.data.list
					}
					this.exchangeOutgoingInfo.isEmpty = this.exchangeOutgoingInfo.data.length === 0
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		getRechargeAccountingLogsList(isLoadmore) {
			uni.showLoading()
			getBuyerVoucherOutgoingRecordApi({ ...this.rechargeAccountingInfo.query })
				.then((res) => {
					this.rechargeAccountingInfo.listTotal = res.data.total
					if (isLoadmore) {
						this.rechargeAccountingInfo.data.push(...res.data.list)
					} else {
						this.rechargeAccountingInfo.data = res.data.list
					}
					this.rechargeAccountingInfo.isEmpty = this.rechargeAccountingInfo.data.length === 0
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		getRechargeOutgoingLogsList(isLoadmore) {
			uni.showLoading()
			getBuyerVoucherOutgoingRecordApi({ ...this.rechargeOutgoingInfo.query })
				.then((res) => {
					this.rechargeOutgoingInfo.listTotal = res.data.total
					if (isLoadmore) {
						this.rechargeOutgoingInfo.data.push(...res.data.list)
					} else {
						this.rechargeOutgoingInfo.data = res.data.list
					}
					this.rechargeOutgoingInfo.isEmpty = this.rechargeOutgoingInfo.data.length === 0
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		getAllVoucherOrderList(isLoadmore) {
			uni.showLoading()
			getAllBuyerVoucherOrderApi({ ...this.orderInfo.query })
				.then((res) => {
					this.orderInfo.listTotal = res.data.total
					if (isLoadmore) {
						this.orderInfo.data.push(...res.data.list)
					} else {
						this.orderInfo.data = res.data.list
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
			if ([ 1 ].includes(this.queryType)) {
				this.exchangeAccountingInfo.query.page = 1
				this.exchangeAccountingInfo.data = []
				this.exchangeAccountingInfo.listTotal = 0
				this.exchangeAccountingInfo.isEmpty = false
				this.getExchangeAccountingLogsList()
				this.isShowTypePopup = false
			} else if ([ 2 ].includes(this.queryType)) {
				this.exchangeOutgoingInfo.query.page = 1
				this.exchangeOutgoingInfo.data = []
				this.exchangeOutgoingInfo.listTotal = 0
				this.exchangeOutgoingInfo.isEmpty = false
				this.getExchangeOutgoingLogsList()
				this.isShowTypePopup = false
			} else if ([ 3 ].includes(this.queryType)) {
				this.rechargeAccountingInfo.query.page = 1
				this.rechargeAccountingInfo.data = []
				this.rechargeAccountingInfo.listTotal = 0
				this.rechargeAccountingInfo.isEmpty = false
				this.getRechargeAccountingLogsList()
				this.isShowTypePopup = false
			} else if ([ 4 ].includes(this.queryType)) {
				this.rechargeOutgoingInfo.query.page = 1
				this.rechargeOutgoingInfo.data = []
				this.rechargeOutgoingInfo.listTotal = 0
				this.rechargeOutgoingInfo.isEmpty = false
				this.getRechargeOutgoingLogsList()
				this.isShowTypePopup = false
			} else if ([ 5 ].includes(this.queryType)) {
				this.orderInfo.query.page = 1
				this.orderInfo.data = []
				this.orderInfo.listTotal = 0
				this.orderInfo.isEmpty = false
				this.getAllVoucherOrderList()
				this.isShowTypePopup = false
			}
		},
		handleSelectDropdown(timeDropdownIndex) {
			if (this.timeDropdownIndex === timeDropdownIndex) {
				this.timeDropdownShow = false
				return
			}
			this.timeDropdownIndex = timeDropdownIndex
			if ([ 1 ].includes(this.queryType)) {
				this.exchangeAccountingInfo.query.page = 1
				this.exchangeAccountingInfo.data = []
				this.exchangeAccountingInfo.listTotal = 0
				this.exchangeAccountingInfo.isEmpty = false
				this.getExchangeAccountingLogsList()
				this.timeDropdownShow = false
			} else if ([ 2 ].includes(this.queryType)) {
				this.exchangeOutgoingInfo.query.page = 1
				this.exchangeOutgoingInfo.data = []
				this.exchangeOutgoingInfo.listTotal = 0
				this.exchangeOutgoingInfo.isEmpty = false
				this.getExchangeOutgoingLogsList()
				this.timeDropdownShow = false
			} else if ([ 3 ].includes(this.queryType)) {
				this.rechargeAccountingInfo.query.page = 1
				this.rechargeAccountingInfo.data = []
				this.rechargeAccountingInfo.listTotal = 0
				this.rechargeAccountingInfo.isEmpty = false
				this.getRechargeAccountingLogsList()
				this.timeDropdownShow = false
			} else if ([ 4 ].includes(this.queryType)) {
				this.rechargeOutgoingInfo.query.page = 1
				this.rechargeOutgoingInfo.data = []
				this.rechargeOutgoingInfo.listTotal = 0
				this.rechargeOutgoingInfo.isEmpty = false
				this.getRechargeOutgoingLogsList()
				this.timeDropdownShow = false
			} else if ([ 5 ].includes(this.queryType)) {
				this.orderInfo.query.page = 1
				this.orderInfo.data = []
				this.orderInfo.listTotal = 0
				this.orderInfo.isEmpty = false
				this.getAllVoucherOrderList()
				this.timeDropdownShow = false
			}
		},
		handleClickVoucherRecord(item) {
			uni.navigateTo({
				url: '/another-tf/another-user/voucher/voucher-record-detail',
				success: () => {
					setTimeout(() => {
						uni.$emit('sendVoucherRecordDetailMsg', { voucherRecordData: item, fromOrigin: this.queryType })
					}, 400)
				}
			})
		}
	},
	onReachBottom() {
		if ([ 1 ].includes(this.queryType)) {
			if (this.exchangeAccountingInfo.data.length < this.exchangeAccountingInfo.listTotal) {
				++this.exchangeAccountingInfo.query.page
				this.getExchangeAccountingLogsList(true)
			}
		} else if ([ 2 ].includes(this.queryType)) {
			if (this.exchangeOutgoingInfo.data.length < this.exchangeOutgoingInfo.listTotal) {
				++this.exchangeOutgoingInfo.query.page
				this.getExchangeOutgoingLogsList(true)
			}
		} else if ([ 3 ].includes(this.queryType)) {
			if (this.rechargeAccountingInfo.data.length < this.rechargeAccountingInfo.listTotal) {
				++this.rechargeAccountingInfo.query.page
				this.getExchangeOutgoingLogsList(true)
			}
		} else if ([ 4 ].includes(this.queryType)) {
			if (this.rechargeOutgoingInfo.data.length < this.rechargeOutgoingInfo.listTotal) {
				++this.rechargeOutgoingInfo.query.page
				this.getExchangeOutgoingLogsList(true)
			}
		} else if ([ 5 ].includes(this.queryType)) {
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
