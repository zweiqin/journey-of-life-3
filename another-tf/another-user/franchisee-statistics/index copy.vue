<template>
	<view class="finance-statistics-container">
		<JHeader title="加盟商统计" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view
			style="padding: 8upx 0 0;text-align: center;color: #ffffff;background: linear-gradient(90deg, #EF530E 0%, #EF530E 100%);overflow: hidden;"
		>
			<view style="font-size: 28upx;">
				<view>累计收益</view>
				<view style="margin-top: 24upx;font-size: 64upx;">{{ franchiseeStatisticsData.accumulateIncome || 0 }}</view>
				<view style="margin-top: 22upx;color: #f6a07a;">待提现：{{ franchiseeStatisticsData.withdrawalIncome || 0 }}元</view>
			</view>
			<view
				style="display: flex;justify-content: space-evenly;margin-top: 76upx;padding: 20upx 0;background: linear-gradient(0deg, rgba(255, 255, 255, 0.0001) 0%, rgba(255, 255, 255, 0.15) 99%);"
			>
				<view>
					<view style="color: #f7a783;">今日商家数</view>
					<view style="margin-top: 10upx;">{{ franchiseeStatisticsData.shopTodayNum || 0 }}</view>
				</view>
				<view style="width: 2upx;background-color: #f37d49;"></view>
				<view>
					<view style="color: #f7a783;">累计商家数</view>
					<view style="margin-top: 10upx;">{{ franchiseeStatisticsData.shopAllNum || 0 }}</view>
				</view>
				<view style="width: 2upx;background-color: #f37d49;"></view>
				<view>
					<view style="color: #f7a783;">今日收益</view>
					<view style="margin-top: 10upx;">{{ franchiseeStatisticsData.todayIncome || 0 }}</view>
				</view>
				<view style="width: 2upx;background-color: #f37d49;"></view>
				<view>
					<view style="color: #f7a783;">预计收益</view>
					<view style="margin-top: 10upx;">{{ franchiseeStatisticsData.wayIncome || 0 }}</view>
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
					<view style="display: flex;justify-content: space-between;">
						<view>{{ item.shopName }}</view>
						<view>累计：￥{{ item.accumulateIncome || '--' }}</view>
					</view>
					<view style="display: flex;justify-content: space-between;">
						<view>今日：￥{{ item.todayIncome || '--' }}</view>
						<view>预计：￥{{ item.wayIncome || '--' }}</view>
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
			this.getFranchiseeShopIncomeList()
		},
		getShopStatistics() {
			uni.showLoading({
				title: '加载中'
			})
			getFranchiseeStatisticsApi({})
				.then((res) => {
					this.franchiseeStatisticsData = res.data
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		getFranchiseeShopIncomeList(isLoadmore) {
			uni.showLoading()
			getPlatformFranchiseeIncomeApi({ ...this.queryInfo, type: this.currentTab + 1 }).then((res) => {
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
	background-color: #f6f6f6;
	.tui-tabs-view{
		/deep/ .tui-tabs-slider{
		margin-left: -24upx;
		}
	}
}
</style>
