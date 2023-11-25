<template>
	<view class="shop-statistics-container">
		<JHeader title="财务数据" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view style="padding: 0 24upx;background-color: #ffffff;">
			<tui-tabs
				style="width: 702upx;padding: 0 0upx 0 0upx;overflow: hidden;" :slider-width="351" :padding="24"
				item-width="351rpx" selected-color="#000000" bold slider-bg-color="#ff0000"
				:tabs="[{ name: '日汇款' }, { name: '月汇款' }]" :current-tab="currentTab"
				@change="handleCurrentChange"
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
				ref="dateTimeFinance" :type="3" radius :end-year="Number(new Date(Date.now()).toLocaleString().substring(0, 4))"
				@confirm="handleConfirmTime"
			></tui-datetime>
		</view>
		<view
			style="width: 100%;color: #000;padding: 34upx 24upx 44upx;box-sizing: border-box;margin-top: 2upx;margin-bottom: 20upx;background-color: #ffa637;border-radius: 20upx;font-size: 28upx;"
		>
			<view style="margin-top: 20upx;">
				<view style="display: flex;justify-content: space-between;align-items: center;">
					<view
						style="width: 20%;padding: 40upx 6upx;color: #FFFFFF;text-align: center;border-radius: 24px;background: rgba(255, 255, 255, 0.32);border: 2px solid rgba(255, 255, 255, 0.16);"
					>
						<view>累计营业额（元）</view>
						<view style="font-size: 40upx;font-weight: bold;margin-top: 10upx;">
							{{ typeof financeStatisticsData.turnover === 'number' ? financeStatisticsData.turnover : '--' }}
						</view>
					</view>
					<view
						style="width: 20%;padding: 40upx 6upx;color: #FFFFFF;text-align: center;border-radius: 24px;background: rgba(255, 255, 255, 0.32);border: 2px solid rgba(255, 255, 255, 0.16);"
					>
						<view>冻结金额（元）</view>
						<view style="font-size: 40upx;font-weight: bold;margin-top: 10upx;">
							{{ typeof financeStatisticsData.frozenMoney === 'number' ? financeStatisticsData.frozenMoney : '--' }}
						</view>
					</view>
					<view
						style="width: 20%;padding: 40upx 6upx;color: #FFFFFF;text-align: center;border-radius: 24px;background: rgba(255, 255, 255, 0.32);border: 2px solid rgba(255, 255, 255, 0.16);"
					>
						<view>可提现金额（元）</view>
						<view style="font-size: 40upx;font-weight: bold;margin-top: 10upx;">
							{{ typeof financeStatisticsData.withdrawableMoney === 'number' ? financeStatisticsData.withdrawableMoney : '--' }}
						</view>
					</view>
					<view
						style="width: 20%;padding: 40upx 6upx;color: #FFFFFF;text-align: center;border-radius: 24px;background: rgba(255, 255, 255, 0.32);border: 2px solid rgba(255, 255, 255, 0.16);"
					>
						<view>提现中（元）</view>
						<view style="font-size: 40upx;font-weight: bold;margin-top: 10upx;">
							{{ typeof financeStatisticsData.withdrawableStayMoney === 'number' ? financeStatisticsData.withdrawableStayMoney : '--' }}
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
</template>

<script>
import { getShopFinanceCountApi } from '../../../api/anotherTFInterface'

export default {
	name: 'FinanceStatistics',
	components: {},
	data() {
		return {
			currentTab: 1,
			financeStatisticsData: {
				turnover: '',
				frozenMoney: '',
				withdrawableMoney: '',
				withdrawableStayMoney: '',
				finances: []
			},
			queryInfo: {
				condition: 2,
				time: ''
			},
			isLoading: true
		}
	},
	onLoad() {
		this.getFinanceStatistics()
	},
	methods: {
		handleCurrentChange(e) {
			this.currentTab = e.index
			this.queryInfo.condition = this.currentTab + 1
			this.getFinanceStatistics()
		},
		getFinanceStatistics() {
			this.isLoading = true
			getShopFinanceCountApi({ ...this.queryInfo })
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
		}
	}
}
</script>

<style lang="less" scoped>
.shop-statistics-container {
	min-height: 100vh;
	width: 100%;
	background: #f6f6f6;
	.tui-tabs-view{
		/deep/ .tui-tabs-slider{
		margin-left: -24upx;
		}
	}
}
</style>
