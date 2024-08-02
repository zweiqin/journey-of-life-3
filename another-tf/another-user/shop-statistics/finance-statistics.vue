<template>
	<view class="finance-statistics-container">
		<JHeader title="商家服务" width="50" height="50" style="padding: 24rpx 0 0;background-color: #ffffff;">
			<!-- <template #ftFn>
				<text style="padding-right: 18rpx;font-size: 26rpx;color: #222229;">帮助</text>
				</template> -->
		</JHeader>
		<view style="padding: 40rpx 0 16rpx;background-color: #ffffff;text-align: center;">
			<view style="display: flex;width: fit-content;margin: 0 auto;border: 2rpx solid #EF530E;border-radius: 12rpx;">
				<view
					style="width: 198rpx;padding: 6rpx 0;color: #EF530E;"
					@click="$redirectTo('/another-tf/another-user/shop-statistics/index')"
				>
					经营统计
				</view>
				<view style="width: 220rpx;padding: 6rpx 0;color: #ffffff;background-color: #ef530e;">财务数据</view>
			</view>
		</view>

		<view style="display: flex;justify-content: space-between;align-items: center;padding: 0 32rpx;margin: 44rpx 0 0;">
			<tui-tabs
				style="width: 172rpx;padding: 0 0rpx 0 0rpx;overflow: hidden;" :slider-width="80" :slider-height="54"
				:padding="289" slider-radius="8rpx" item-width="80rpx" selected-color="#ffffff"
				bold :height="54"
				color="#222229" slider-bg-color="#ef530e" background-color="transparent"
				:tabs="[{ name: '充值' }, { name: '订单' }]" :current-tab="currentTab" @change="handleCurrentChange"
			></tui-tabs>
			<view style="text-align: right;">
				<tui-button
					type="primary" width="140rpx" height="60rpx" margin="0 20rpx 0 0"
					style="display: inline-block;border-radius: 30rpx;" @click="isShowRechargeDialog = true"
				>
					提现
				</tui-button>
				<tui-button
					v-if="pageType === 'order'" type="primary" width="140rpx" height="60rpx"
					margin="0 20rpx 0 0"
					style="display: inline-block;border-radius: 30rpx;"
					@click="(isShowWithdrawalDetailsPopup = true) && $refs.refOrderWithdrawalDetails && $refs.refOrderWithdrawalDetails.getShopWithdrawalDetails()"
				>
					明细
				</tui-button>
				<tui-button
					v-if="pageType === 'recharge'" type="primary" width="240rpx" height="60rpx"
					margin="0 20rpx 0 0"
					style="display: inline-block;border-radius: 30rpx;"
					@click="(isShowCustomBusinessPopup = true) && $refs.refRechargeCustomBusiness && $refs.refRechargeCustomBusiness.getShopRechargeCustom()"
				>
					客户充值统计
				</tui-button>
			</view>
		</view>

		<view style="margin: 36rpx 32rpx 0;">
			<view style="font-weight: bold;color: #222229;">
				<text v-if="pageType === 'recharge'">充值</text>
				<text v-else-if="pageType === 'order'">订单</text>
				<text>财务数据</text>
			</view>
			<view
				style="margin-top: 36rpx;padding-bottom: 34rpx;background-color: #ffffff;text-align: center;color: #222229;border-radius: 16rpx;"
			>
				<view style="display: flex;justify-content: space-around;">
					<view style="padding-top: 34rpx; flex:1;">
						<view style="font-size: 34rpx;font-weight: bold;">
							{{ typeof financeStatisticsData.turnover === 'number' ? financeStatisticsData.turnover : '--' }}
						</view>
						<view style="margin-top: 14rpx;font-size: 24rpx;">累计营业额</view>
					</view>
					<view style="padding-top: 34rpx; flex:1;">
						<view style="font-size: 34rpx;font-weight: bold;color: #E02208;">
							{{ typeof financeStatisticsData.frozenMoney === 'number' ? financeStatisticsData.frozenMoney : '--' }}
						</view>
						<!-- 冻结金额 -->
						<view style="margin-top: 14rpx;font-size: 24rpx;">途中金额</view>
					</view>
					<view style="padding-top: 34rpx; flex:1;">
						<view style="font-size: 34rpx;font-weight: bold;color: #E02208;">
							{{ typeof financeStatisticsData.alreadyArrived === 'number' ? financeStatisticsData.alreadyArrived : '--' }}
						</view>
						<!-- 已提现金额 -->
						<view style="margin-top: 14rpx;font-size: 24rpx;">已到账</view>
					</view>
				</view>
				<view style="display: flex;justify-content: space-around;">
					<view style="padding-top: 34rpx; flex:1;">
						<view style="font-size: 34rpx;font-weight: bold;color: #208F57;">
							{{ typeof financeStatisticsData.withdrawableMoney === 'number' ? financeStatisticsData.withdrawableMoney
								: '--' }}
						</view>
						<view style="margin-top: 14rpx;font-size: 24rpx;">可提现</view>
					</view>
					<view style="padding-top: 34rpx; flex:1;">
						<view style="font-size: 34rpx;font-weight: bold;color: #1A66FF;">
							{{ typeof financeStatisticsData.withdrawableStayMoney === 'number'
								? financeStatisticsData.withdrawableStayMoney : '--' }}
						</view>
						<view style="margin-top: 14rpx;font-size: 24rpx;">提现中</view>
					</view>
					<view style="padding-top: 34rpx; flex:1;">
						<view style="font-size: 34rpx;font-weight: bold;color: #E02208;">
							{{ typeof financeStatisticsData.presenterVoucher === 'number' ? financeStatisticsData.presenterVoucher
								: '--'
							}}
						</view>
						<!-- 赠送代金券 -->
						<view style="margin-top: 14rpx;font-size: 24rpx;">总赠送</view>
					</view>
				</view>
				<view style="display: flex;justify-content: space-around;">
					<view style="padding-top: 34rpx; flex:1;">
						<view style="font-size: 34rpx;font-weight: bold;color: #208F57;">
							{{ typeof financeStatisticsData.beeWithdrawal === 'number' ? financeStatisticsData.beeWithdrawal
								: '--' }}
						</view>
						<view style="margin-top: 14rpx;font-size: 24rpx;">可提现消费金</view>
					</view>
					<view style="padding-top: 34rpx; flex:1;">
						<view style="font-size: 34rpx;font-weight: bold;color: #1A66FF;">
							{{ typeof financeStatisticsData.beeFreeze === 'number'
								? financeStatisticsData.beeFreeze : '--' }}
						</view>
						<view style="margin-top: 14rpx;font-size: 24rpx;">待到账消费金</view>
					</view>
					<view style="padding-top: 34rpx; flex:1;">
						<view style="font-size: 34rpx;font-weight: bold;color: #E02208;">
							{{ typeof financeStatisticsData.beeTurnover === 'number' ? financeStatisticsData.beeTurnover : '--' }}
						</view>
						<view style="margin-top: 14rpx;font-size: 24rpx;">营业额消费金</view>
					</view>
				</view>
				<view style="display: flex;justify-content: space-around;">
					<view style="padding-top: 34rpx; flex:1;">
						<view style="font-size: 34rpx;font-weight: bold;color: #208F57;">
							{{ typeof financeStatisticsData.beeCoinRatio === 'number' ? financeStatisticsData.beeCoinRatio
								: '--' }}
						</view>
						<view style="margin-top: 14rpx;font-size: 24rpx;">消费金提现比例</view>
					</view>
					<view style="padding-top: 34rpx;flex:1;">
						<view style="font-size: 34rpx;font-weight: bold;color: #1A66FF;"> </view>
						<view style="margin-top: 14rpx;font-size: 24rpx;"> </view>
					</view>
					<view style="padding-top: 34rpx;flex:1;">
						<view style="font-size: 34rpx;font-weight: bold;color: #E02208;"> </view>
						<view style="margin-top: 14rpx;font-size: 24rpx;"> </view>
					</view>
				</view>
			</view>

			<view style="margin-top: 36rpx;display: flex;justify-content: space-between;align-items: center;">
				<view style="display: flex;align-items: center;font-size: 32rpx;">
					<view
						:style="{ fontWeight: queryInfo.condition === 1 ? 'bold' : 'normal', color: queryInfo.condition === 1 ? '#222229' : '#9E9E9E' }"
						@click="((queryInfo.condition = 1) && (queryInfo.time = '')) || getFinanceStatistics()"
					>
						日流水
					</view>
					<view
						style="margin-left: 32rpx;"
						:style="{ fontWeight: queryInfo.condition === 2 ? 'bold' : 'normal', color: queryInfo.condition === 2 ? '#222229' : '#9E9E9E' }"
						@click="((queryInfo.condition = 2) && (queryInfo.time = '')) || getFinanceStatistics()"
					>
						月流水
					</view>
				</view>
				<view style="padding: 10rpx 16rpx;color: #222229;background-color: #ffffff;">
					<view @click="$refs.dateTimeFinance.show()">
						<tui-icon name="calendar" :size="14" color="#222229"></tui-icon>
						<text style="margin-left: 10rpx;font-size: 26rpx;">{{ queryInfo.time || '选择日期' }}</text>
					</view>
					<tui-datetime
						ref="dateTimeFinance" :type="3" radius :end-year="new Date().getFullYear()"
						@confirm="handleConfirmTime"
					></tui-datetime>
				</view>
			</view>
			<view style="padding: 32rpx 28rpx 0;margin-top: 24rpx;background-color: #ffffff;border-radius: 16rpx;">
				<view v-if="financeStatisticsData.finances && financeStatisticsData.finances.length">
					<tui-table>
						<tui-tr>
							<tui-td bold :span="12">日期</tui-td>
							<tui-td bold :span="8">收入（元）</tui-td>
							<tui-td bold :span="8">支出（元）</tui-td>
							<tui-td bold :span="8">操作</tui-td>
						</tui-tr>
						<tui-tr v-for="(item, index) in financeStatisticsData.finances" :key="index">
							<tui-td :span="12">{{ item.time }}</tui-td>
							<tui-td :span="8">{{ item.income }}</tui-td>
							<tui-td :span="8">{{ item.expenditure }}</tui-td>
							<tui-td :span="8">
								<tui-button
									type="warning" width="100rpx" height="50rpx" margin="0 20rpx 0 0"
									shape="circle"
									@click="handleToAssociatedOrder(item)"
								>
									订单
								</tui-button>
							</tui-td>
						</tui-tr>
					</tui-table>
				</view>
				<view style="padding-bottom: 45rpx;">
					<LoadingMore :status="isLoading ? 'loading' : ''"></LoadingMore>
					<view v-if="!isLoading && !financeStatisticsData.finances.length">
						<tui-no-data :fixed="false" style="padding-top: 60rpx;">暂无具体数据</tui-no-data>
					</view>
				</view>
			</view>
		</view>

		<view v-if="pageType === 'order'">
			<tui-bottom-popup :show="isShowWithdrawalDetailsPopup" @close="isShowWithdrawalDetailsPopup = false">
				<view style="height: 100%;padding: 20rpx;overflow-y: auto;box-sizing: border-box;">
					<OrderWithdrawalDetails ref="refOrderWithdrawalDetails"></OrderWithdrawalDetails>
				</view>
			</tui-bottom-popup>
		</view>
		<view v-else-if="pageType === 'recharge'">
			<tui-bottom-popup :show="isShowCustomBusinessPopup" @close="isShowCustomBusinessPopup = false">
				<view style="height: 100%;padding: 20rpx;overflow-y: auto;box-sizing: border-box;">
					<RechargeCustomBusiness ref="refRechargeCustomBusiness"></RechargeCustomBusiness>
				</view>
			</tui-bottom-popup>
		</view>

		<!-- 提现相关dialog -->
		<tui-dialog
			style="position: relative;z-index: 888;" :buttons="[{ text: '取消' }, { text: '确认提现', color: '#586c94' }]"
			:show="isShowRechargeDialog" title="订单财务提现" @click="handleRechargeDialog"
		>
			<template #content>
				<view>
					<view style="display: flex;justify-content: space-between;align-items: center;">
						<view style="font-size: 32rpx;color: #333333;">提现类型：</view>
						<view style="flex: 1;">
							<tui-radio-group
								:value="withdrawalType"
								@change="handleChangeType"
							>
								<view style="display: flex;flex-wrap: wrap;align-items: center;">
									<tui-label
										v-for="(item, index) in [{ name: '正常支付订单', value: '1' }, { name: '消费金', value: '2' }]"
										:key="index"
									>
										<tui-list-cell padding="16rpx">
											<view>
												<tui-radio :checked="false" :value="item.value" color="#07c160" border-color="#999">
												</tui-radio>
												<text>{{ item.name }}</text>
											</view>
										</tui-list-cell>
									</tui-label>
								</view>
							</tui-radio-group>
						</view>
					</view>
					<tui-input
						v-model="rechargeNum" padding="26rpx 0" label="提现金额" type="number"
						placeholder="缺少提现金额"
						disabled
					></tui-input>
				</view>
			</template>
		</tui-dialog>

		<tui-bottom-popup :show="isShowOrderPopup" @close="isShowOrderPopup = false">
			<view style="height: 100%;padding: 20rpx;background-color: #f5f5f7;overflow-y: auto;box-sizing: border-box;">
				<scroll-view scroll-y style="height: 100%;">
					<view v-if="orderList && orderList.length">
						<ATFBusinessOrder
							v-for="(orderItem, orderIndex) in orderList" :key="orderIndex" :data="orderItem"
							is-show-other
						></ATFBusinessOrder>
					</view>
					<view style="padding-bottom: 45rpx;">
						<LoadingMore
							:status="!isEmpty && !orderList.length
								? 'loading' : !isEmpty && orderList.length && (orderList.length >= orderTotal) ? 'no-more' : ''"
						>
						</LoadingMore>
						<tui-no-data v-if="isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无数据</tui-no-data>
					</view>
				</scroll-view>
			</view>
		</tui-bottom-popup>
	</view>
</template>

<script>
import { getShopBankApi, getShopFinanceCountApi, addShopWithdrawalApi, getShopRechargeCountApi, addShopWithdrawalRechargeApi, getAllOrderListApi } from '../../../api/anotherTFInterface'
import OrderWithdrawalDetails from './components/OrderWithdrawalDetails.vue'
import RechargeCustomBusiness from './components/RechargeCustomBusiness.vue'

export default {
	name: 'FinanceStatistics',
	components: { OrderWithdrawalDetails, RechargeCustomBusiness },
	data() {
		return {
			pageType: '',
			currentTab: 1,
			financeStatisticsData: {
				turnover: '',
				frozenMoney: '',
				alreadyArrived: '',
				withdrawableMoney: '',
				withdrawableStayMoney: '',
				presenterVoucher: '',
				beeWithdrawal: '',
				beeFreeze: '',
				beeTurnover: '',
				beeCoinRatio: '',
				finances: []
			},
			queryInfo: {
				condition: 2,
				time: ''
			},
			isLoading: true,
			// 下拉弹框
			isShowWithdrawalDetailsPopup: false,
			isShowCustomBusinessPopup: false,
			// 提现相关
			isShowRechargeDialog: false,
			rechargeNum: '',
			withdrawalType: '1',

			// 订单列表
			isShowOrderPopup: false,
			isEmpty: false,
			orderList: [],
			orderTotal: 0
		}
	},
	onLoad(options) {
		this.pageType = options.type || 'order'
		this.getFinanceStatistics()
	},
	methods: {
		handleCurrentChange(e) {
			this.currentTab = e.index
			if (this.currentTab === 0) this.pageType = 'recharge'
			else if (this.currentTab === 1) this.pageType = 'order'
			this.queryInfo.condition = 2
			this.queryInfo.time = ''
			this.getFinanceStatistics()
		},
		getFinanceStatistics() {
			this.isLoading = true
			let api
			if (this.pageType === 'order') api = getShopFinanceCountApi
			else if (this.pageType === 'recharge') api = getShopRechargeCountApi
			api({ ...this.queryInfo })
				.then((res) => {
					this.financeStatisticsData = res.data
					this.isLoading = false
				})
				.catch(() => {
					this.isLoading = false
				})
		},
		handleConfirmTime(e) {
			this.queryInfo.time = e.result
			this.getFinanceStatistics()
		},
		handleToAssociatedOrder(item) {
			if (!item.orderFormids || !item.orderFormids.length) return this.$showToast('该流水暂无关联订单')
			uni.showLoading()
			getAllOrderListApi({ orderFormids: item.orderFormids, page: 1, pageSize: 9999, orderType: 1, state: '' })
				.then((res) => {
					this.orderTotal = res.data.total
					this.orderList = res.data.list
					this.isEmpty = this.orderList.length === 0
					uni.hideLoading()
					this.isShowOrderPopup = true
				})
				.catch(() => {
					uni.hideLoading()
				})
		},

		handleChangeType(e) {
			this.withdrawalType = e.detail.value
			if (this.withdrawalType === '1') {
				this.rechargeNum = this.financeStatisticsData.withdrawableMoney || ''
			} else if (this.withdrawalType === '2') {
				this.rechargeNum = this.financeStatisticsData.beeWithdrawal || ''
			}
		},
		handleRechargeDialog(e) {
			if (e.index === 0) {
				this.rechargeNum = ''
				this.isShowRechargeDialog = false
			} else if (e.index === 1) {
				if (!this.rechargeNum) return this.$showToast('缺少提现金额')
				if (!this.withdrawalType) return this.$showToast('请选择提现类型')
				uni.showLoading()
				getShopBankApi({})
					.then((result) => {
						let api
						if (this.pageType === 'order') api = addShopWithdrawalApi
						else if (this.pageType === 'recharge') api = addShopWithdrawalRechargeApi
						api({
							shopName: result.data.shopName,
							shopCode: result.data.shopCode,
							bankName: result.data.bankName,
							bankCard: result.data.bankCard,
							withdrawalMoney: this.rechargeNum,
							withdrawalType: Number(this.withdrawalType)
						})
							.then((res) => {
								uni.hideLoading()
								this.rechargeNum = ''
								this.withdrawalType = '1'
								this.isShowRechargeDialog = false
								this.$showToast('提现成功', 'success')
								this.getFinanceStatistics()
							})
							.catch(() => {
								uni.hideLoading()
							})
					})
					.catch(() => {
						uni.hideLoading()
					})
			}
		}
	}
}
</script>

<style lang="less" scoped>
.finance-statistics-container {
	min-height: 100vh;
	width: 100%;
	box-sizing: border-box;
	padding-bottom: 42rpx;
	background-color: #f4f4f4;

	.tui-tabs-view {
		/deep/ .tui-tabs-slider {
			margin-left: -289rpx;
		}

		/deep/ .tui-tabs-title {
			font-weight: bold !important;
		}
	}

	/deep/ .j-header-container {
		padding: 24rpx 0 0;
		background-color: #ffffff;

		.title {
			font-size: 36rpx;
			color: #222229;
		}
	}

	/deep/ .tui-popup-class.tui-bottom-popup {
		height: 85vh !important;
	}
}
</style>
