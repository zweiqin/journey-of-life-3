<template>
	<view class="finance-statistics-container">
		<JHeader title="加盟商统计" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view
			style="width: 100%;color: #000;padding: 34upx 24upx 44upx;box-sizing: border-box;margin-top: 2upx;margin-bottom: 20upx;background-color: #ffa637;border-radius: 20upx;font-size: 28upx;"
		>
			<view style="margin-top: 20upx;">
				<view style="display: flex;justify-content: space-between;align-items: center;">
					<view
						style="width: 20%;padding: 40upx 6upx;color: #FFFFFF;text-align: center;border-radius: 24px;background: rgba(255, 255, 255, 0.32);border: 2px solid rgba(255, 255, 255, 0.16);"
					>
						<view>店铺访问次数 (次)</view>
						<view style="font-size: 40upx;font-weight: bold;margin-top: 10upx;">
							{{ typeof franchiseeStatisticsData.total === 'number' ? franchiseeStatisticsData.total : '--' }}
						</view>
					</view>
					<view
						style="width: 20%;padding: 40upx 6upx;color: #FFFFFF;text-align: center;border-radius: 24px;background: rgba(255, 255, 255, 0.32);border: 2px solid rgba(255, 255, 255, 0.16);"
					>
						<view>待处理订单 (件)</view>
						<view style="font-size: 40upx;font-weight: bold;margin-top: 10upx;">
							{{ typeof franchiseeStatisticsData.stayOrders === 'number' ? franchiseeStatisticsData.stayOrders : '--' }}
						</view>
					</view>
					<view
						style="width: 20%;padding: 40upx 6upx;color: #FFFFFF;text-align: center;border-radius: 24px;background: rgba(255, 255, 255, 0.32);border: 2px solid rgba(255, 255, 255, 0.16);"
					>
						<view>售后订单 (件)</view>
						<view style="font-size: 40upx;font-weight: bold;margin-top: 10upx;">
							{{ typeof franchiseeStatisticsData.stayAfters === 'number' ? franchiseeStatisticsData.stayAfters : '--' }}
						</view>
					</view>
					<view
						style="width: 20%;padding: 40upx 6upx;color: #FFFFFF;text-align: center;border-radius: 24px;background: rgba(255, 255, 255, 0.32);border: 2px solid rgba(255, 255, 255, 0.16);"
					>
						<view>{{ franchiseeStatisticsData.money < 10000 ? '成交金额 (元)' : '成交金额 (万元)' }}</view>
						<view style="font-size: 40upx;font-weight: bold;margin-top: 10upx;">
							{{ typeof franchiseeStatisticsData.money === 'number' ? franchiseeStatisticsData.money : '--' }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="padding: 0 24upx;background-color: #ffffff;">
			<tui-tabs
				style="width: 702upx;padding: 0 0upx 0 0upx;overflow: hidden;" :slider-width="351" :padding="24"
				item-width="351rpx" selected-color="#000000" bold slider-bg-color="#ff0000"
				:tabs="[{ name: '今天' }, { name: '全部' }]" :current-tab="currentTab"
				@change="handleCurrentChange"
			></tui-tabs>
		</view>
		<view style="padding: 20upx;">
			<tui-list-view v-if="shopIncomeList && shopIncomeList.length" title="">
				<tui-list-cell v-for="(item, index) in shopIncomeList" :key="item.id">
					<view style="display: flex;justify-content: space-between;flex-wrap: wrap;">
						<view>{{ index + 1 }}：{{ item.productName }}</view>
						<view style="flex: 1;text-align: right;white-space: nowrap;">{{ `已售 ${item.number} 件` }}</view>
					</view>
				</tui-list-cell>
			</tui-list-view>
			<view style="padding-bottom: 45upx;">
				<LoadingMore
					:status="!isEmpty && !shopIncomeList.length
						? 'loading' : !isEmpty && shopIncomeList.length && (shopIncomeList.length >= shopIncomeTotal) ? 'no-more' : ''"
				>
				</LoadingMore>
				<tui-no-data v-if="isEmpty" :fixed="false" style="margin-top: 60upx;">暂无粉丝~</tui-no-data>
			</view>
		</view>
	</view>
</template>

<script>
import { getFranchiseeStatisticsApi, getPlatformFranchiseeIncomeApi } from '../../../api/anotherTFInterface'

export default {
	name: 'FranchiseeStatistics',
	components: {},
	data() {
		return {
			franchiseeStatisticsData: {
				page: 0,
				pageSize: 0,
				shopTodayNum: 0,
				shopAllNum: 0,
				todayIncome: 0,
				wayIncome: 0,
				withdrawalIncome: 0,
				accumulateIncome: 0
			},
			currentTab: 1,
			isEmpty: false,
			shopIncomeList: [],
			shopIncomeTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20
			}
		}
	},
	onLoad() {
		this.getShopStatistics()
		this.getFranchiseeShopIncomeList()
	},
	methods: {
		handleCurrentChange(e) {
			this.currentTab = e.index
			this.queryInfo.condition = this.currentTab + 1
			this.getShopStatistics()
		},
		getShopStatistics() {
			uni.showLoading({
				title: '加载中'
			})
			getFranchiseeStatisticsApi({})
				.then((res) => {
					this.franchiseeStatisticsData = res.data
					uni.hideLoading()
					this.$nextTick(() => {
						this.$refs.refAccessTrends && this.$refs.refAccessTrends.draw([ { name: '次数', color: '#5677fc', source: this.franchiseeStatisticsData.visitWeek.total } ])
					})
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		getFranchiseeShopIncomeList(isLoadmore) {
			uni.showLoading()
			getPlatformFranchiseeIncomeApi(this.queryInfo).then((res) => {
				this.shopIncomeTotal = res.data.total
				if (isLoadmore) {
					this.shopIncomeList.push(...res.data.list)
				} else {
					this.shopIncomeList = res.data.list
				}
				this.isEmpty = this.shopIncomeList.length === 0
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		}
	},
	onReachBottom() {
		if (this.shopIncomeList.length < this.shopIncomeTotal) {
			++this.queryInfo.page
			this.getFranchiseeShopIncomeList(true)
		}
	}
}
</script>

<style lang="less" scoped>
.finance-statistics-container {
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
