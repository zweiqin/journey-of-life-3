<template>
	<view class="shop-statistics-container">
		<JHeader title="商家统计" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view style="margin-bottom: 20upx;text-align: right;">
			<tui-button
				type="primary" width="268rpx" height="60rpx" margin="0 20upx 0 0"
				style="display: inline-block;border-radius: 30rpx;" @click="go('/another-tf/another-user/shop-statistics/finance-statistics?type=recharge')"
			>
				充值财务数据 →
			</tui-button>
			<tui-button
				type="primary" width="268rpx" height="60rpx" margin="0 20upx 0 0"
				style="display: inline-block;border-radius: 30rpx;" @click="go('/another-tf/another-user/shop-statistics/finance-statistics?type=order')"
			>
				订单财务数据 →
			</tui-button>
		</view>
		<view style="padding: 0 24upx;background-color: #ffffff;">
			<tui-tabs
				style="width: 702upx;padding: 0 0upx 0 0upx;overflow: hidden;" :slider-width="175.5" :padding="24"
				item-width="175.5rpx" selected-color="#000000" bold slider-bg-color="#ff0000"
				:tabs="[{ name: '今天' }, { name: '昨天' }, { name: '最近7天' }, { name: '最近30天' }]" :current-tab="currentTab"
				@change="handleCurrentChange"
			></tui-tabs>
		</view>
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
							{{ typeof shopStatisticsData.total === 'number' ? shopStatisticsData.total : '--' }}
						</view>
					</view>
					<view
						style="width: 20%;padding: 40upx 6upx;color: #FFFFFF;text-align: center;border-radius: 24px;background: rgba(255, 255, 255, 0.32);border: 2px solid rgba(255, 255, 255, 0.16);"
					>
						<view>待处理订单 (件)</view>
						<view style="font-size: 40upx;font-weight: bold;margin-top: 10upx;">
							{{ typeof shopStatisticsData.stayOrders === 'number' ? shopStatisticsData.stayOrders : '--' }}
						</view>
					</view>
					<view
						style="width: 20%;padding: 40upx 6upx;color: #FFFFFF;text-align: center;border-radius: 24px;background: rgba(255, 255, 255, 0.32);border: 2px solid rgba(255, 255, 255, 0.16);"
					>
						<view>售后订单 (件)</view>
						<view style="font-size: 40upx;font-weight: bold;margin-top: 10upx;">
							{{ typeof shopStatisticsData.stayAfters === 'number' ? shopStatisticsData.stayAfters : '--' }}
						</view>
					</view>
					<view
						style="width: 20%;padding: 40upx 6upx;color: #FFFFFF;text-align: center;border-radius: 24px;background: rgba(255, 255, 255, 0.32);border: 2px solid rgba(255, 255, 255, 0.16);"
					>
						<view>{{ shopStatisticsData.money < 10000 ? '成交金额 (元)' : '成交金额 (万元)' }}</view>
						<view style="font-size: 40upx;font-weight: bold;margin-top: 10upx;">
							{{ typeof shopStatisticsData.money === 'number' ? shopStatisticsData.money : '--' }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view>
			<view style="text-align: center;">
				<view>用户访问趋势（单位：次数）</view>
				<view style="font-size: 28upx;">用户访问数：{{ shopStatisticsData.count }} 次</view>
			</view>
			<view
				v-if="shopStatisticsData.visitWeek.time && shopStatisticsData.visitWeek.time.length"
				style="display: flex;justify-content: flex-end;"
			>
				<tui-charts-line
					ref="refAccessTrends" tooltip scrollable :x-axis="shopStatisticsData.visitWeek.time"
					:x-axis-line="{ color: '#e3e3e3', itemGap: 135 }" :y-axis-label="{ show: true, size: 24, color: '#333333' }"
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
		</view>
		<view style="padding: 20upx;">
			<view style="text-align: center;">
				<view>订单转换漏斗</view>
				<view style="font-size: 28upx;">总转化率：{{ shopStatisticsData.rate }}%</view>
			</view>
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
						<tui-td v-for="(item, idx) in shopStatisticsData.conversion.rates" :key="idx" :span="8">{{ item }}</tui-td>
					</tui-tr>
				</tui-table>
			</view>
		</view>
		<view style="padding: 20upx;">
			<tui-list-view v-if="shopStatisticsData.hotSellProducts && shopStatisticsData.hotSellProducts.length" title="">
				<tui-list-cell v-for="(item, index) in shopStatisticsData.hotSellProducts" :key="item.id">
					<view style="display: flex;justify-content: space-between;flex-wrap: wrap;">
						<view>{{ index + 1 }}：{{ item.productName }}</view>
						<view style="flex: 1;text-align: right;white-space: nowrap;">{{ `已售 ${item.number} 件` }}</view>
					</view>
				</tui-list-cell>
			</tui-list-view>
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
			getShopStatisticsApi({
				shopId: this.$store.state.auth.identityInfo.info.shopId,
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
	background: #f6f6f6;
	.tui-tabs-view{
		/deep/ .tui-tabs-slider{
		margin-left: -24upx;
		}
	}
}
</style>
