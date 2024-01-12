<template>
	<view class="shop-statistics-container">
		<JHeader title="财务数据" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view>
			<view style="padding: 0 24upx;background-color: #ffffff;">
				<tui-tabs
					style="width: 702upx;padding: 0 0upx 0 0upx;overflow: hidden;" :slider-width="351" :padding="24"
					item-width="351rpx" selected-color="#000000" bold slider-bg-color="#ff0000"
					:tabs="[{ name: '日汇款' }, { name: '月汇款' }]" :current-tab="currentTab" @change="handleCurrentChange"
				></tui-tabs>
			</view>
			<view style="margin: 10upx 0;text-align: right;">
				<tui-button
					type="blue" width="220rpx" height="60rpx" margin="0 30upx 0 0"
					style="display: inline-block;border-radius: 30rpx;" @click="$refs.dateTimeFinance.show()"
				>
					选择日期
				</tui-button>
				<tui-datetime
					ref="dateTimeFinance" :type="3" radius
					:end-year="Number(new Date(Date.now()).toLocaleString().substring(0, 4))"
					@confirm="handleConfirmTime"
				></tui-datetime>
			</view>
			<view
				style="width: 100%;color: #000;padding: 14upx 24upx 44upx;box-sizing: border-box;margin-top: 2upx;margin-bottom: 20upx;background-color: #ffa637;border-radius: 20upx;font-size: 28upx;"
			>
				<view style="text-align: right;">
					<tui-button
						type="primary" width="140rpx" height="60rpx" margin="0 20upx 0 0"
						style="display: inline-block;border-radius: 30rpx;" @click="isShowRechargeDialog = true"
					>
						提现
					</tui-button>
					<tui-button
						v-if="type === 'order'" type="primary" width="140rpx" height="60rpx"
						margin="0 20upx 0 0"
						style="display: inline-block;border-radius: 30rpx;"
						@click="(isShowWithdrawalDetailsPopup = true) && $refs.refOrderWithdrawalDetails && $refs.refOrderWithdrawalDetails.getShopWithdrawalDetails()"
					>
						明细
					</tui-button>
					<tui-button
						v-if="type === 'recharge'" type="primary" width="240rpx" height="60rpx"
						margin="0 20upx 0 0"
						style="display: inline-block;border-radius: 30rpx;"
						@click="(isShowCustomBusinessPopup = true) && $refs.refRechargeCustomBusiness && $refs.refRechargeCustomBusiness.getShopRechargeCustom()"
					>
						客户充值统计
					</tui-button>
				</view>
				<view style="margin-top: 20upx;">
					<view style="display: flex;justify-content: space-evenly;flex-wrap: wrap;align-items: stretch;">
						<view
							style="display: flex;flex-direction: column;justify-content: space-between;width: 30%;margin-top: 10upx;padding: 18upx 6upx;color: #FFFFFF;text-align: center;border-radius: 24px;background: #ffc377;border: 2px solid #ffcc8d;"
						>
							<view>累计营业额（元）</view>
							<view style="font-size: 40upx;font-weight: bold;margin-top: 4upx;">
								{{ typeof financeStatisticsData.turnover === 'number' ? financeStatisticsData.turnover : '--' }}
							</view>
						</view>
						<view
							style="display: flex;flex-direction: column;justify-content: space-between;width: 30%;margin-top: 10upx;padding: 18upx 6upx;color: #FFFFFF;text-align: center;border-radius: 24px;background: #ffc377;border: 2px solid #ffcc8d;"
						>
							<view>冻结金额（元）</view>
							<view style="font-size: 40upx;font-weight: bold;margin-top: 4upx;">
								{{ typeof financeStatisticsData.frozenMoney === 'number' ? financeStatisticsData.frozenMoney : '--' }}
							</view>
						</view>
						<view
							style="display: flex;flex-direction: column;justify-content: space-between;width: 30%;margin-top: 10upx;padding: 18upx 6upx;color: #FFFFFF;text-align: center;border-radius: 24px;background: #ffc377;border: 2px solid #ffcc8d;"
						>
							<view>可提现金额（元）</view>
							<view style="font-size: 40upx;font-weight: bold;margin-top: 4upx;">
								{{ typeof financeStatisticsData.withdrawableMoney === 'number' ? financeStatisticsData.withdrawableMoney
									: '--' }}
							</view>
						</view>
						<view
							style="display: flex;flex-direction: column;justify-content: space-between;width: 30%;margin-top: 10upx;padding: 18upx 6upx;color: #FFFFFF;text-align: center;border-radius: 24px;background: #ffc377;border: 2px solid #ffcc8d;"
						>
							<view>提现中（元）</view>
							<view style="font-size: 40upx;font-weight: bold;margin-top: 4upx;">
								{{ typeof financeStatisticsData.withdrawableStayMoney === 'number'
									? financeStatisticsData.withdrawableStayMoney : '--' }}
							</view>
						</view>
						<view
							style="display: flex;flex-direction: column;justify-content: space-between;width: 30%;margin-top: 10upx;padding: 18upx 6upx;color: #FFFFFF;text-align: center;border-radius: 24px;background: #ffc377;border: 2px solid #ffcc8d;"
						>
							<view>赠送代金券</view>
							<view style="font-size: 40upx;font-weight: bold;margin-top: 4upx;">
								{{ typeof financeStatisticsData.presenterVoucher === 'number' ? financeStatisticsData.presenterVoucher
									: '--' }}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view style="padding: 20upx;">
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

		<view v-if="type === 'order'">
			<tui-bottom-popup :show="isShowWithdrawalDetailsPopup" @close="isShowWithdrawalDetailsPopup = false">
				<view style="height: 100%;padding: 20upx;overflow-y: auto;box-sizing: border-box;">
					<OrderWithdrawalDetails ref="refOrderWithdrawalDetails"></OrderWithdrawalDetails>
				</view>
			</tui-bottom-popup>
		</view>
		<view v-else-if="type === 'recharge'">
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
			type: '',
			currentTab: 1,
			financeStatisticsData: {
				turnover: '',
				frozenMoney: '',
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
		this.type = options.type || 'order'
		this.getFinanceStatistics()
	},
	methods: {
		handleCurrentChange(e) {
			this.currentTab = e.index
			this.queryInfo.condition = this.currentTab + 1
			this.queryInfo.time = ''
			this.getFinanceStatistics()
		},
		getFinanceStatistics() {
			this.isLoading = true
			let api
			if (this.type === 'order') api = getShopFinanceCountApi
			else if (this.type === 'recharge') api = getShopRechargeCountApi
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
						if (this.type === 'order') api = addShopWithdrawalApi
						else if (this.type === 'recharge') api = addShopWithdrawalRechargeApi
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
.shop-statistics-container {
	min-height: 100vh;
	width: 100%;
	background: #f6f6f6;
	box-sizing: border-box;

	.tui-tabs-view {
		/deep/ .tui-tabs-slider {
			margin-left: -24upx;
		}
	}

	/deep/ .tui-popup-class.tui-bottom-popup {
		height: 85vh !important;
	}
}
</style>
