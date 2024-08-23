<template>
	<view class="finance-statistics-container">
		<JHeader title="加盟商统计" width="50" height="50"></JHeader>
		<view
			style="padding: 8rpx 0 0;text-align: center;color: #ffffff;background: linear-gradient(90deg, #EF530E 0%, #EF530E 100%);overflow: hidden;"
		>
			<view
				style="display: flex;justify-content: space-evenly;margin-top: 4rpx;padding: 20rpx 0;background: linear-gradient(0deg, rgba(255, 255, 255, 0.0001) 0%, rgba(255, 255, 255, 0.15) 99%);"
			>
				<view style="flex: 1;">
					<view style="color: #f7a783;">今日收益</view>
					<view style="margin-top: 10rpx;">{{ franchiseeStatisticsData.todayIncome || 0 }}</view>
				</view>
				<view style="width: 2rpx;background-color: #f37d49;"></view>
				<view style="flex: 1;">
					<view style="color: #f7a783;">预计收益</view>
					<view style="margin-top: 10rpx;">{{ franchiseeStatisticsData.wayIncome || 0 }}</view>
				</view>
				<view style="width: 2rpx;background-color: #f37d49;"></view>
				<view style="flex: 1;">
					<view style="color: #f7a783;">累计收益</view>
					<view style="margin-top: 10rpx;">{{ franchiseeStatisticsData.accumulateIncome || 0 }}</view>
				</view>
				<view style="width: 2rpx;background-color: #f37d49;"></view>
				<view style="flex: 1;">
					<view style="color: #f7a783;">商家数</view>
					<view style="margin-top: 10rpx;">{{ franchiseeStatisticsData.shopNum || 0 }}</view>
				</view>
			</view>
			<view
				style="display: flex;justify-content: space-evenly;margin-top: 4rpx;padding: 20rpx 0;background: linear-gradient(0deg, rgba(255, 255, 255, 0.0001) 0%, rgba(255, 255, 255, 0.15) 99%);"
			>
				<view style="flex: 1;">
					<view style="color: #f7a783;">今日团长</view>
					<view style="margin-top: 10rpx;">{{ franchiseeStatisticsData.TZTodayNum || 0 }}</view>
				</view>
				<view style="width: 2rpx;background-color: #f37d49;"></view>
				<view style="flex: 1;">
					<view style="color: #f7a783;">累计团长</view>
					<view style="margin-top: 10rpx;">{{ franchiseeStatisticsData.TZAccumulateNum || 0 }}</view>
				</view>
				<view style="width: 2rpx;background-color: #f37d49;"></view>
				<view style="flex: 1;">
					<view style="color: #f7a783;">今日合伙人</view>
					<view style="margin-top: 10rpx;">{{ franchiseeStatisticsData.HHTodayNum || 0 }}</view>
				</view>
				<view style="width: 2rpx;background-color: #f37d49;"></view>
				<view style="flex: 1;">
					<view style="color: #f7a783;">累计合伙人</view>
					<view style="margin-top: 10rpx;">{{ franchiseeStatisticsData.HHAccumulateNum || 0 }}</view>
				</view>
			</view>
		</view>

		<view style="padding: 0 24rpx;background-color: #ffffff;">
			<tui-tabs
				style="width: 702rpx;padding: 0 0rpx 0 0rpx;overflow: hidden;" :slider-width="351" :padding="24"
				item-width="351rpx" selected-color="#000000" bold slider-bg-color="#ff0000"
				:tabs="[{ name: '商家' }, { name: '团长/合伙人' }]" :current-tab="currentTab" @change="handleCurrentChange"
			></tui-tabs>
		</view>
		<view style="padding: 20rpx;">
			<view v-if="currentTab === 0">
				<view style="display: flex;justify-content: flex-end;">
					<tui-dropdown-list
						:show="shopDropdownShow" :top="55" background-color="#ffffff"
						@close="shopDropdownShow = false"
					>
						<template #selectionbox>
							<view style="height: auto;color: #080808;" @click="shopDropdownShow = !shopDropdownShow">
								<text>类型∨</text>
								<text style="margin-left: 10rpx;;font-size: 26rpx;">{{ shopDropdownName || '' }}</text>
							</view>
						</template>
						<template #dropdownbox>
							<view style="width: fit-content;box-sizing: border-box;">
								<tui-list-view
									color="#777" margin-top="2rpx"
									style="width: fit-content;min-width: 150rpx;max-height: 28vh;overflow-y: auto;"
								>
									<tui-list-cell
										padding="20rpx 0"
										style="width: fit-content;margin: 0 auto;border-bottom: 2rpx solid #cccccc;"
										@click="((franchiseeShopInfo.query.type = 6) && (shopDropdownName = '今日收益') && (shopDropdownShow = false)) || getFranchiseeShopList()"
									>
										今日收益
									</tui-list-cell>
									<tui-list-cell
										padding="20rpx 0"
										style="width: fit-content;margin: 0 auto;border-bottom: 2rpx solid #cccccc;"
										@click="((franchiseeShopInfo.query.type = 7) && (shopDropdownName = '预计收益') && (shopDropdownShow = false)) || getFranchiseeShopList()"
									>
										预计收益
									</tui-list-cell>
									<tui-list-cell
										padding="20rpx 0"
										style="width: fit-content;margin: 0 auto;border-bottom: 2rpx solid #cccccc;"
										@click="((franchiseeShopInfo.query.type = 8) && (shopDropdownName = '累计收益') && (shopDropdownShow = false)) || getFranchiseeShopList()"
									>
										累计收益
									</tui-list-cell>
								</tui-list-view>
							</view>
						</template>
					</tui-dropdown-list>
				</view>
				<tui-list-view v-if="franchiseeShopInfo.data && franchiseeShopInfo.data.length" margin-top="20rpx">
					<tui-list-cell v-for="(item, index) in franchiseeShopInfo.data" :key="item.id">
						<view style="display: flex;align-items: center;">
							<JAvatar :src="common.seamingImgUrl(item.shopLogo)" :size="80" style="margin: 0 24rpx 0 0;line-height: 1;"></JAvatar>
							<view style="flex: 1;">
								<view style="display: flex;justify-content: space-between;">
									<view>{{ item.shopName }}</view>
									<view>{{ item.createTime || '--' }}</view>
								</view>
								<view style="display: flex;justify-content: space-between;">
									<view>今日：￥{{ item.todayPrice || '--' }}</view>
									<view>预计：￥{{ item.beToPrice || '--' }}</view>
									<view>总：￥{{ item.allPrice || '--' }}</view>
								</view>
							</view>
						</view>
					</tui-list-cell>
				</tui-list-view>
				<view style="padding-bottom: 45rpx;">
					<LoadingMore
						:status="!franchiseeShopInfo.isEmpty && !franchiseeShopInfo.data.length
							? 'loading' : !franchiseeShopInfo.isEmpty && franchiseeShopInfo.data.length && (franchiseeShopInfo.data.length >= franchiseeShopInfo.listTotal) ? 'no-more' : ''"
					>
					</LoadingMore>
					<tui-no-data v-if="franchiseeShopInfo.isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无提问内容</tui-no-data>
				</view>
			</view>
			<view v-else-if="currentTab === 1">
				<view style="display: flex;justify-content: flex-end;">
					<tui-dropdown-list
						:show="commanderDropdownShow" :top="55" background-color="#ffffff"
						@close="commanderDropdownShow = false"
					>
						<template #selectionbox>
							<view style="height: auto;color: #080808;" @click="commanderDropdownShow = !commanderDropdownShow">
								<text>类型∨</text>
								<text style="margin-left: 10rpx;;font-size: 26rpx;">{{ commanderDropdownName || '' }}</text>
							</view>
						</template>
						<template #dropdownbox>
							<view style="width: fit-content;box-sizing: border-box;">
								<tui-list-view
									color="#777" margin-top="2rpx"
									style="width: fit-content;min-width: 150rpx;max-height: 28vh;overflow-y: auto;"
								>
									<tui-list-cell
										padding="20rpx 0"
										style="width: fit-content;margin: 0 auto;border-bottom: 2rpx solid #cccccc;"
										@click="((franchiseeCommanderInfo.query.type = 6) && (commanderDropdownName = '今日收益') && (commanderDropdownShow = false)) || getFranchiseeCommanderList()"
									>
										今日收益
									</tui-list-cell>
									<tui-list-cell
										padding="20rpx 0"
										style="width: fit-content;margin: 0 auto;border-bottom: 2rpx solid #cccccc;"
										@click="((franchiseeCommanderInfo.query.type = 7) && (commanderDropdownName = '预计收益') && (commanderDropdownShow = false)) || getFranchiseeCommanderList()"
									>
										预计收益
									</tui-list-cell>
									<tui-list-cell
										padding="20rpx 0"
										style="width: fit-content;margin: 0 auto;border-bottom: 2rpx solid #cccccc;"
										@click="((franchiseeCommanderInfo.query.type = 8) && (commanderDropdownName = '累计收益') && (commanderDropdownShow = false)) || getFranchiseeCommanderList()"
									>
										累计收益
									</tui-list-cell>
								</tui-list-view>
							</view>
						</template>
					</tui-dropdown-list>
				</view>
				<tui-list-view v-if="franchiseeCommanderInfo.data && franchiseeCommanderInfo.data.length" margin-top="20rpx">
					<tui-list-cell v-for="(item, index) in franchiseeCommanderInfo.data" :key="item.id">
						<view style="display: flex;align-items: center;">
							<JAvatar :src="common.seamingImgUrl(item.headImage)" :size="80" style="margin: 0 24rpx 0 0;line-height: 1;"></JAvatar>
							<view style="flex: 1;">
								<view style="display: flex;justify-content: space-between;">
									<view>{{ item.name }}</view>
									<view>{{ item.createTime || '--' }}</view>
								</view>
								<view>
									会员等级：{{ item.levelName || '--' }}
								</view>
							</view>
						</view>
					</tui-list-cell>
				</tui-list-view>
				<view style="padding-bottom: 45rpx;">
					<LoadingMore
						:status="!franchiseeCommanderInfo.isEmpty && !franchiseeCommanderInfo.data.length
							? 'loading' : !franchiseeCommanderInfo.isEmpty && franchiseeCommanderInfo.data.length && (franchiseeCommanderInfo.data.length >= franchiseeCommanderInfo.listTotal) ? 'no-more' : ''"
					>
					</LoadingMore>
					<tui-no-data
						v-if="franchiseeCommanderInfo.isEmpty" :fixed="false"
						style="padding-top: 60rpx;"
					>
						暂无提问内容
					</tui-no-data>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getPlatformFranchiseeStatisticsApi, getFranchiseeShopListApi, getFranchiseeCommanderListApi } from '../../../api/anotherTFInterface'

export default {
	name: 'FranchiseeStatistics',
	components: {},
	data() {
		return {
			franchiseeStatisticsData: {
				shopNum: 0,
				TZTodayNum: 0,
				TZAccumulateNum: 0,
				HHTodayNum: 0,
				HHAccumulateNum: 0,
				todayIncome: 0,
				wayIncome: 0,
				accumulateIncome: 0
			},
			currentTab: 0,

			shopDropdownShow: false,
			shopDropdownName: '今日收益',
			franchiseeShopInfo: {
				query: {
					page: 1,
					pageSize: 10,
					type: 6
				},
				data: [],
				listTotal: 0,
				isEmpty: false
			},
			commanderDropdownShow: false,
			commanderDropdownName: '今日收益',
			franchiseeCommanderInfo: {
				query: {
					page: 1,
					pageSize: 10,
					type: 6
				},
				data: [],
				listTotal: 0,
				isEmpty: false
			}
		}
	},
	onLoad() {
		this.getShopStatistics()
		this.getFranchiseeShopList()
	},
	methods: {
		getShopStatistics() {
			uni.showLoading({
				title: '加载中'
			})
			getPlatformFranchiseeStatisticsApi({})
				.then((res) => {
					this.franchiseeStatisticsData = res.data
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		handleCurrentChange(e) {
			this.currentTab = e.index
			// 缓存每个tab里的数据
			if (this.currentTab === 0) {
			} else if (this.currentTab === 1) {
				if (!this.franchiseeCommanderInfo.isEmpty && !this.franchiseeCommanderInfo.data.length) this.getFranchiseeCommanderList()
			}
			// 每点一个tab就重新进行对它的请求
			// if (this.currentTab === 0) {
			// 	this.franchiseeShopInfo.query.page = 1
			// 	this.franchiseeShopInfo.data = []
			// 	this.franchiseeShopInfo.listTotal = 0
			// 	this.franchiseeShopInfo.isEmpty = false
			// 	this.getApplyByStoreList()
			// } else if (this.currentTab === 1) {
			// 	this.franchiseeCommanderInfo.query.page = 1
			// 	this.franchiseeCommanderInfo.data = []
			// 	this.franchiseeCommanderInfo.listTotal = 0
			// 	this.franchiseeCommanderInfo.isEmpty = false
			// 	this.getApplyByUserList()
			// }
		},
		getFranchiseeShopList(isLoadmore) {
			uni.showLoading({
				title: '加载中'
			})
			getFranchiseeShopListApi({ ...this.franchiseeShopInfo.query })
				.then((res) => {
					this.franchiseeShopInfo.listTotal = res.data.total
					if (isLoadmore) {
						this.franchiseeShopInfo.data.push(...res.data.records)
					} else {
						this.franchiseeShopInfo.data = res.data.records
					}
					this.franchiseeShopInfo.isEmpty = this.franchiseeShopInfo.data.length === 0
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		getFranchiseeCommanderList(isLoadmore) {
			uni.showLoading({
				title: '加载中'
			})
			getFranchiseeCommanderListApi({ ...this.franchiseeCommanderInfo.query })
				.then((res) => {
					this.franchiseeCommanderInfo.listTotal = res.data.total
					if (isLoadmore) {
						this.franchiseeCommanderInfo.data.push(...res.data.records)
					} else {
						this.franchiseeCommanderInfo.data = res.data.records
					}
					this.franchiseeCommanderInfo.isEmpty = this.franchiseeCommanderInfo.data.length === 0
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		}
	},
	onReachBottom() {
		if (this.currentTab === 0) {
			if (this.franchiseeShopInfo.data.length < this.franchiseeShopInfo.listTotal) {
				++this.franchiseeShopInfo.query.page
				this.getFranchiseeShopList(true)
			}
		} else if (this.currentTab === 1) {
			if (this.franchiseeCommanderInfo.data.length < this.franchiseeCommanderInfo.listTotal) {
				++this.franchiseeCommanderInfo.query.page
				this.getFranchiseeCommanderList(true)
			}
		}
	}
}
</script>

<style lang="less" scoped>
.finance-statistics-container {
	min-height: 100vh;
	width: 100%;
	background-color: #f6f6f6;

	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}

	.tui-tabs-view {
		/deep/ .tui-tabs-slider {
			margin-left: -24rpx;
		}
	}

	/deep/ .tui-dropdown-view {
		height: auto !important;
		width: fit-content;
		margin-left: 48rpx;
	}
}
</style>
