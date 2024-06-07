<template>
	<view class="shop-statistics-container">
		<JHeader title="商家服务" width="50" height="50">
			<!-- <template #ftFn>
				<text style="padding-right: 18rpx;font-size: 26rpx;color: #222229;">帮助</text>
				</template> -->
		</JHeader>
		<view style="padding: 40rpx 0 16rpx;background-color: #ffffff;text-align: center;">
			<view style="display: flex;width: fit-content;margin: 0 auto;border: 2rpx solid #EF530E;border-radius: 12rpx;">
				<view style="width: 220rpx;padding: 6rpx 0;color: #ffffff;background-color: #ef530e;">经营统计</view>
				<view
					style="width: 198rpx;padding: 6rpx 0;color: #EF530E;"
					@click="$redirectTo('/another-tf/another-user/shop-statistics/finance-statistics?type=order')"
				>
					<!-- order -->
					财务数据
				</view>
			</view>
		</view>

		<view style="display: flex;justify-content: space-between;align-items: center;padding: 0 32rpx;margin: 44rpx 0 0;">
			<tui-tabs
				style="width: 144rpx;padding: 0 0rpx 0 0rpx;overflow: hidden;" :slider-width="60" :slider-height="54"
				:padding="303" slider-radius="8rpx" item-width="66rpx" selected-color="#ffffff"
				bold :height="54" color="#222229"
				slider-bg-color="#ef530e" background-color="transparent" :tabs="[{ name: '今' }, { name: '昨' }]"
				:current-tab="currentTab" @change="handleCurrentChange"
			></tui-tabs>
			<view>
				<tui-dropdown-list
					:show="timeDropdownShow" :top="55" background-color="#ffffff"
					@close="timeDropdownShow = false"
				>
					<template #selectionbox>
						<view
							style="height: auto;padding: 10rpx 16rpx;color: #222229;background-color: #ffffff;"
							@click="timeDropdownShow = !timeDropdownShow"
						>
							<tui-icon name="calendar" :size="14" color="#222229"></tui-icon>
							<text style="margin-left: 10rpx;font-size: 26rpx;">{{ timeDropdownName || '' }}</text>
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
									@click="((currentTab = 2) && (queryInfo.condition = currentTab + 1) && (timeDropdownName = '最近7天') && (timeDropdownShow = false)) || getShopStatistics()"
								>
									最近7天
								</tui-list-cell>
								<tui-list-cell
									padding="20rpx 0"
									style="width: fit-content;margin: 0 auto;border-bottom: 2rpx solid #cccccc;"
									@click="((currentTab = 3) && (queryInfo.condition = currentTab + 1) && (timeDropdownName = '最近30天') && (timeDropdownShow = false)) || getShopStatistics()"
								>
									最近30天
								</tui-list-cell>
							</tui-list-view>
						</view>
					</template>
				</tui-dropdown-list>
			</view>
		</view>

		<view style="margin: 24rpx 32rpx 0;">
			<view style="font-weight: bold;color: #222229;">
				<text v-if="queryInfo.condition == 1">今日</text>
				<text v-else-if="queryInfo.condition == 2">昨日</text>
				<text v-else-if="queryInfo.condition == 3">最近7天</text>
				<text v-else-if="queryInfo.condition == 4">最近30天</text>
				<text>数据概况</text>
			</view>
			<view
				style="display: flex;justify-content: space-evenly;margin-top: 36rpx;padding: 34rpx 0;text-align: center;color: #222229;background-color: #ffffff;border-radius: 16rpx;"
			>
				<view>
					<view style="font-size: 34rpx;font-weight: bold;">
						{{ typeof shopStatisticsData.total === 'number' ? shopStatisticsData.total : '--' }}
					</view>
					<view style="margin-top: 14rpx;font-size: 24rpx;">访问次数</view>
				</view>
				<view>
					<view style="font-size: 34rpx;font-weight: bold;color: #1A66FF;">
						{{ typeof shopStatisticsData.stayOrders === 'number'
							? shopStatisticsData.stayOrders : '--' }}
					</view>
					<view style="margin-top: 14rpx;font-size: 24rpx;">待处理订单</view>
				</view>
				<view>
					<view style="font-size: 34rpx;font-weight: bold;color: #208F57;">
						{{ typeof shopStatisticsData.stayAfters === 'number'
							? shopStatisticsData.stayAfters : '--' }}
					</view>
					<view style="margin-top: 14rpx;font-size: 24rpx;">售后订单</view>
				</view>
				<view>
					<view style="font-size: 34rpx;font-weight: bold;color: #E02208;">
						{{ typeof shopStatisticsData.money === 'number'
							? shopStatisticsData.money : '--' }}
					</view>
					<view style="margin-top: 14rpx;font-size: 24rpx;">成交金额</view>
				</view>
			</view>
		</view>

		<view style="margin: 36rpx 32rpx 0;">
			<view style="display: flex;align-items: center;font-size: 32rpx;">
				<view
					:style="{ fontWeight: chartType === 0 ? 'bold' : 'normal', color: chartType === 0 ? '#222229' : '#9E9E9E' }"
					@click="chartType = 0"
				>
					用户访问趋势
				</view>
				<view
					style="margin-left: 32rpx;"
					:style="{ fontWeight: chartType === 1 ? 'bold' : 'normal', color: chartType === 1 ? '#222229' : '#9E9E9E' }"
					@click="chartType = 1"
				>
					订单统计
				</view>
			</view>
			<view style="padding: 32rpx 28rpx;margin-top: 24rpx;background-color: #ffffff;border-radius: 16rpx;">
				<view v-show="chartType === 0">
					<view
						v-if="shopStatisticsData.visitWeek.time && shopStatisticsData.visitWeek.time.length"
						style="display: flex;justify-content: flex-end;"
					>
						<tui-charts-line
							ref="refAccessTrends" tooltip scrollable :x-axis="shopStatisticsData.visitWeek.time"
							:width="554" :x-axis-line="{ color: '#e3e3e3', itemGap: 135 }"
							:y-axis-label="{ show: true, size: 24, color: '#333333' }"
							:max="Math.max(...shopStatisticsData.visitWeek.total) || 1"
							:split-number="(Math.max(...shopStatisticsData.visitWeek.total) / 8) || 1"
						></tui-charts-line>
					</view>
					<!-- <view
						v-if="shopStatisticsData.visitWeek.time && shopStatisticsData.visitWeek.time.length && Math.max(...shopStatisticsData.visitWeek.total)"
						style="width: 100%;overflow-x: auto;"
						>
						<tui-charts-line
						ref="refAccessTrends" tooltip scrollable :x-axis="shopStatisticsData.visitWeek.time"
						:x-axis-line="{ color: '#e3e3e3', itemGap: 135 }" :y-axis-label="{ show: true, size: 24, color: '#333333' }"
						:max="Math.max(...shopStatisticsData.visitWeek.total) || 1"
						:split-number="(Math.max(...shopStatisticsData.visitWeek.total) / 8) || 1"
						></tui-charts-line>
						</view> -->
					<view style="font-size: 28rpx;text-align: center;">用户访问数：{{ shopStatisticsData.count }} 次</view>
				</view>
				<view v-show="chartType === 1">
					<view v-if="shopStatisticsData.conversion.names.length">
						<tui-table>
							<tui-tr>
								<tui-td bold :span="8"></tui-td>
								<tui-td v-for="(item, index) in shopStatisticsData.conversion.names" :key="index" bold :span="8">
									{{ item }}
								</tui-td>
							</tui-tr>
							<tui-tr>
								<tui-td bold :span="8">转化率（%）</tui-td>
								<tui-td v-for="(item, idx) in shopStatisticsData.conversion.rates" :key="idx" :span="8">
									{{ item
									}}
								</tui-td>
							</tui-tr>
						</tui-table>
					</view>
					<view style="margin-top: 36rpx;font-size: 28rpx;text-align: center;">总转化率：{{ shopStatisticsData.rate }}%</view>
				</view>
			</view>
		</view>

		<view style="padding: 32rpx;margin: 24rpx 32rpx 0;background-color: #ffffff;border-radius: 16rpx;">
			<view style="display: flex;align-items: center;justify-content: space-between;color: #222229;">
				<view style="font-weight: bold;">热卖商品</view>
				<view style="font-size: 24rpx;">
					<text v-if="queryInfo.condition == 1">今日</text>
					<text v-else-if="queryInfo.condition == 2">昨日</text>
					<text v-else-if="queryInfo.condition == 3">最近7天</text>
					<text v-else-if="queryInfo.condition == 4">最近30天</text>
				</view>
			</view>
			<tui-list-view
				v-if="shopStatisticsData.hotSellProducts && shopStatisticsData.hotSellProducts.length"
				unlined="all" margin-top="30rpx"
			>
				<tui-list-cell
					v-for="(item, index) in shopStatisticsData.hotSellProducts" :key="item.id" unlined
					padding="20rpx 0"
				>
					<view style="display: flex;justify-content: space-between;">
						<view
							style="flex: 1;width: 0;margin-right: 16rpx;overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
						>
							{{ index + 1 }}：{{ item.productName }}
						</view>
						<view style="text-align: right;white-space: nowrap;">{{ `已售 ${item.number} 件` }}</view>
					</view>
				</tui-list-cell>
			</tui-list-view>
			<view v-else style="padding-bottom: 45rpx;">
				<tui-no-data :fixed="false" style="padding-top: 60rpx;">暂无数据～</tui-no-data>
			</view>
		</view>
	</view>
</template>

<script>
import { getShopStatisticsApi } from '../../../api/anotherTFInterface'

export default {
	name: 'ShopStatistics',
	components: {},
	data() {
		return {
			currentTab: 3,
			timeDropdownShow: false,
			timeDropdownName: '最近30天',
			chartType: 0,
			shopStatisticsData: {
				total: '',
				stayOrders: '',
				stayAfters: '',
				money: '',
				visitWeek: { time: [], total: [] },
				count: '',
				conversion: {
					names: [],
					rates: []
				},
				rate: '',
				hotSellProducts: []
			},
			queryInfo: {
				condition: 4
			}
		}
	},
	onLoad() {
		this.getShopStatistics()
	},
	watch: {
		'$store.state.auth.identityInfo.shopInfo.shopId'(val, oldVal) {
			this.getShopStatistics()
		}
	},
	methods: {
		handleCurrentChange(e) {
			this.currentTab = e.index
			this.queryInfo.condition = this.currentTab + 1
			if (this.queryInfo.condition === 1) this.timeDropdownName = '今日'
			else if (this.queryInfo.condition === 2) this.timeDropdownName = '昨日'
			this.getShopStatistics()
		},
		getShopStatistics() {
			if (!this.$store.state.auth.identityInfo.shopInfo.shopId) return
			uni.showLoading({
				title: '加载中'
			})
			getShopStatisticsApi({
				shopId: this.$store.state.auth.identityInfo.shopInfo.shopId,
				...this.queryInfo
			})
				.then((res) => {
					this.shopStatisticsData = res.data
					uni.hideLoading()
					this.$nextTick(() => {
						this.$refs.refAccessTrends && this.$refs.refAccessTrends.draw([ { name: '次数', color: '#5677fc', source: this.shopStatisticsData.visitWeek.total } ])
					})
				})
				.catch(() => {
					uni.hideLoading()
				})
		}
	}
}
</script>

<style lang="less" scoped>
.shop-statistics-container {
	min-height: 100vh;
	width: 100%;
	padding-bottom: 42rpx;
	background-color: #f4f4f4;

	.tui-tabs-view {
		/deep/ .tui-tabs-slider {
			margin-left: -303rpx;
		}

		/deep/ .tui-tabs-title {
			font-weight: bold !important;
		}
	}

	/deep/ .tui-dropdown-view {
		height: auto !important;
		width: fit-content;
		margin-left: 2rpx;
	}

	/deep/ .j-header-container {
		padding: 24rpx 0 0;
		background-color: #ffffff;

		.title {
			font-size: 36rpx;
			color: #222229;
		}
	}
}
</style>
