<template>
	<view class="finance-statistics-container">
		<JHeader title="商家服务" width="50" height="50" style="padding: 24upx 0 0;background-color: #ffffff;">
			<template #ftFn>
				<text style="padding-right: 18upx;font-size: 26upx;color: #222229;">帮助</text>
			</template>
		</JHeader>
		<view style="padding: 40upx 0 16upx;background-color: #ffffff;text-align: center;">
			<view style="display: flex;width: fit-content;margin: 0 auto;border: 2upx solid #EF530E;border-radius: 12upx;">
				<view
					style="width: 198upx;padding: 6upx 0;color: #EF530E;"
					@click="$redirectTo('/another-tf/another-user/shop-statistics/index')"
				>
					经营统计
				</view>
				<view style="width: 220upx;padding: 6upx 0;color: #ffffff;background-color: #ef530e;">财务数据</view>
			</view>
		</view>

		<view style="display: flex;justify-content: space-between;align-items: center;padding: 0 32upx;margin: 44upx 0 0;">
			<tui-tabs
				style="width: 172upx;padding: 0 0upx 0 0upx;overflow: hidden;" :slider-width="80" :slider-height="54"
				:padding="289" slider-radius="8upx" item-width="80rpx" selected-color="#ffffff"
				bold :height="54" color="#222229"
				slider-bg-color="#ef530e" background-color="transparent" :tabs="[{ name: '充值' }, { name: '订单' }]"
				:current-tab="currentTab" @change="handleCurrentChange"
			></tui-tabs>
			<view style="text-align: right;">
				<tui-button
					type="primary" width="140rpx" height="60rpx" margin="0 20upx 0 0"
					style="display: inline-block;border-radius: 30rpx;" @click="isShowRechargeDialog = true"
				>
					提现
				</tui-button>
				<tui-button
					v-if="pageType === 'order'" type="primary" width="140rpx" height="60rpx"
					margin="0 20upx 0 0"
					style="display: inline-block;border-radius: 30rpx;"
					@click="(isShowWithdrawalDetailsPopup = true) && $refs.refOrderWithdrawalDetails && $refs.refOrderWithdrawalDetails.getShopWithdrawalDetails()"
				>
					明细
				</tui-button>
				<tui-button
					v-if="pageType === 'recharge'" type="primary" width="240rpx" height="60rpx"
					margin="0 20upx 0 0"
					style="display: inline-block;border-radius: 30rpx;"
					@click="(isShowCustomBusinessPopup = true) && $refs.refRechargeCustomBusiness && $refs.refRechargeCustomBusiness.getShopRechargeCustom()"
				>
					客户充值统计
				</tui-button>
			</view>
		</view>

		<view style="margin: 36upx 32upx 0;">
			<view style="font-weight: bold;color: #222229;">
				<text v-if="pageType === 'recharge'">充值</text>
				<text v-else-if="pageType === 'order'">订单</text>
				<text>财务数据</text>
			</view>
			<view style="margin-top: 36upx;padding-bottom: 34upx;background-color: #ffffff;text-align: center;color: #222229;border-radius: 16upx;">
				<view style="display: flex;justify-content: space-around;">
					<view style="padding-top: 34upx;">
						<view style="font-size: 34upx;font-weight: bold;">
							{{ typeof financeStatisticsData.turnover === 'number' ? financeStatisticsData.turnover : '--' }}
						</view>
						<view style="margin-top: 14upx;font-size: 24upx;">累计营业额</view>
					</view>
					<view style="padding-top: 34upx;">
						<view style="font-size: 34upx;font-weight: bold;color: #E02208;">
							{{ typeof financeStatisticsData.frozenMoney === 'number' ? financeStatisticsData.frozenMoney : '--' }}
						</view>
						<!-- 冻结金额 -->
						<view style="margin-top: 14upx;font-size: 24upx;">途中金额</view>
					</view>
					<view style="padding-top: 34upx;">
						<view style="font-size: 34upx;font-weight: bold;color: #E02208;">
							{{ typeof financeStatisticsData.alreadyArrived === 'number' ? financeStatisticsData.alreadyArrived : '--' }}
						</view>
						<!-- 已提现金额 -->
						<view style="margin-top: 14upx;font-size: 24upx;">已到账</view>
					</view>
				</view>
				<view style="display: flex;justify-content: space-around;">
					<view style="padding-top: 34upx;">
						<view style="font-size: 34upx;font-weight: bold;color: #208F57;">
							{{ typeof financeStatisticsData.withdrawableMoney === 'number' ? financeStatisticsData.withdrawableMoney
								: '--' }}
						</view>
						<view style="margin-top: 14upx;font-size: 24upx;">可提现</view>
					</view>
					<view style="padding-top: 34upx;">
						<view style="font-size: 34upx;font-weight: bold;color: #1A66FF;">
							{{ typeof financeStatisticsData.withdrawableStayMoney === 'number'
								? financeStatisticsData.withdrawableStayMoney : '--' }}
						</view>
						<view style="margin-top: 14upx;font-size: 24upx;">提现中</view>
					</view>
					<view style="padding-top: 34upx;">
						<view style="font-size: 34upx;font-weight: bold;color: #E02208;">
							{{ typeof financeStatisticsData.presenterVoucher === 'number' ? financeStatisticsData.presenterVoucher : '--' }}
						</view>
						<!-- 赠送代金券 -->
						<view style="margin-top: 14upx;font-size: 24upx;">总赠送</view>
					</view>
				</view>
			</view>

			<view style="margin-top: 36upx;display: flex;justify-content: space-between;align-items: center;">
				<view style="display: flex;align-items: center;font-size: 32upx;">
					<view
						:style="{ fontWeight: queryInfo.condition === 1 ? 'bold' : 'normal', color: queryInfo.condition === 1 ? '#222229' : '#9E9E9E' }"
						@click="((queryInfo.condition = 1) && (queryInfo.time = '')) || getFinanceStatistics()"
					>
						日流水
					</view>
					<view
						style="margin-left: 32upx;"
						:style="{ fontWeight: queryInfo.condition === 2 ? 'bold' : 'normal', color: queryInfo.condition === 2 ? '#222229' : '#9E9E9E' }"
						@click="((queryInfo.condition = 2) && (queryInfo.time = '')) || getFinanceStatistics()"
					>
						月流水
					</view>
				</view>
				<view style="padding: 10upx 16upx;color: #222229;background-color: #ffffff;">
					<view @click="$refs.dateTimeFinance.show()">
						<tui-icon name="calendar" :size="14" color="#222229"></tui-icon>
						<text style="margin-left: 10upx;font-size: 26upx;">{{ queryInfo.time || '选择日期' }}</text>
					</view>
					<tui-datetime
						ref="dateTimeFinance" :type="3" radius
						:end-year="Number(new Date(Date.now()).toLocaleString().substring(0, 4))"
						@confirm="handleConfirmTime"
					></tui-datetime>
				</view>
			</view>
			<view style="padding: 32upx 28upx 0;margin-top: 24upx;background-color: #ffffff;border-radius: 16upx;">
				<view v-if="financeStatisticsData.finances && financeStatisticsData.finances.length">
					<tui-table>
						<tui-tr>
							<tui-td bold :span="8">日期</tui-td>
							<tui-td bold :span="8">收入（元）</tui-td>
							<tui-td bold :span="8">支出（元）</tui-td>
						</tui-tr>
						<tui-tr v-for="(item, index) in financeStatisticsData.finances" :key="index">
							<tui-td :span="8">{{ item.time }}</tui-td>
							<tui-td :span="8">{{ item.income }}</tui-td>
							<tui-td :span="8">{{ item.expenditure }}</tui-td>
						</tui-tr>
					</tui-table>
				</view>
				<view style="padding-bottom: 45upx;">
					<LoadingMore :status="isLoading ? 'loading' : ''"></LoadingMore>
					<view v-if="!isLoading && !financeStatisticsData.finances.length">
						<tui-no-data :fixed="false" style="padding-top: 60upx;">暂无具体数据</tui-no-data>
					</view>
				</view>
			</view>
		</view>

		<view v-if="pageType === 'order'">
			<tui-bottom-popup :show="isShowWithdrawalDetailsPopup" @close="isShowWithdrawalDetailsPopup = false">
				<view style="height: 100%;padding: 20upx;overflow-y: auto;box-sizing: border-box;">
					<OrderWithdrawalDetails ref="refOrderWithdrawalDetails"></OrderWithdrawalDetails>
				</view>
			</tui-bottom-popup>
		</view>
		<view v-else-if="pageType === 'recharge'">
			<tui-bottom-popup :show="isShowCustomBusinessPopup" @close="isShowCustomBusinessPopup = false">
				<view style="height: 100%;padding: 20upx;overflow-y: auto;box-sizing: border-box;">
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
					<tui-input v-model="rechargeNum" padding="26upx 0" label="提现金额" type="number" placeholder="请填写提现金额"></tui-input>
				</view>
			</template>
		</tui-dialog>
	</view>
</template>

<script>
import { getShopBankApi, getShopFinanceCountApi, addShopWithdrawalApi, getShopRechargeCountApi, addShopWithdrawalRechargeApi } from '../../../api/anotherTFInterface'
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
			rechargeNum: ''
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
			console.log(e.result)
			this.queryInfo.time = e.result
			this.getFinanceStatistics()
		},

		handleRechargeDialog(e) {
			console.log(e)
			if (e.index === 0) {
				this.rechargeNum = ''
				this.isShowRechargeDialog = false
			} else if (e.index === 1) {
				if (!this.rechargeNum) return this.$showToast('请填写提现金额')
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
							withdrawalMoney: this.rechargeNum
						})
							.then((res) => {
								uni.hideLoading()
								this.rechargeNum = ''
								this.isShowRechargeDialog = false
								this.$showToast('提现成功', 'success')
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
	padding-bottom: 42upx;
	background-color: #f4f4f4;

	.tui-tabs-view {
		/deep/ .tui-tabs-slider {
			margin-left: -289upx;
		}

		/deep/ .tui-tabs-title {
			font-weight: bold !important;
		}
	}

	/deep/ .j-header-container .title {
		font-size: 36upx;
		color: #222229;
	}

	/deep/ .tui-popup-class.tui-bottom-popup {
		height: 85vh !important;
	}
}
</style>
