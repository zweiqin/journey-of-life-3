<template>
	<view class="fan-statistics-container">
		<view style="padding: 30upx 20upx;color: #000000;">
			<JHeader width="50" height="50" title="粉丝统计"></JHeader>
		</view>
		<view
			style="width: 100%;color: #000;padding: 34upx 24upx 44upx;box-sizing: border-box;margin-top: 2upx;margin-bottom: 20upx;background-color: #ffa637;border-radius: 20upx;font-size: 28upx;"
		>
			<view style="margin-top: 20upx;">
				<view style="display: flex;justify-content: space-between;align-items: center;">
					<view
						style="width: 20%;padding: 40upx 6upx;color: #FFFFFF;text-align: center;border-radius: 24px;background: rgba(255, 255, 255, 0.32);border: 2px solid rgba(255, 255, 255, 0.16);"
					>
						<view>粉丝总数</view>
						<view style="font-size: 40upx;font-weight: bold;margin-top: 10upx;">
							{{ typeof statistics.totalFans === 'number' ? statistics.totalFans : '--' }}
						</view>
					</view>
					<view
						style="width: 20%;padding: 40upx 6upx;color: #FFFFFF;text-align: center;border-radius: 24px;background: rgba(255, 255, 255, 0.32);border: 2px solid rgba(255, 255, 255, 0.16);"
					>
						<view>商家</view>
						<view style="font-size: 40upx;font-weight: bold;margin-top: 10upx;">
							{{ typeof statistics.businessFans === 'number' ? statistics.businessFans : '--' }}
						</view>
					</view>
					<view
						style="width: 20%;padding: 40upx 6upx;color: #FFFFFF;text-align: center;border-radius: 24px;background: rgba(255, 255, 255, 0.32);border: 2px solid rgba(255, 255, 255, 0.16);"
					>
						<view>策划师数</view>
						<view style="font-size: 40upx;font-weight: bold;margin-top: 10upx;">
							{{ typeof statistics.plan === 'number' ? statistics.plan : '--' }}
						</view>
					</view>
					<view
						style="width: 20%;padding: 40upx 6upx;color: #FFFFFF;text-align: center;border-radius: 24px;background: rgba(255, 255, 255, 0.32);border: 2px solid rgba(255, 255, 255, 0.16);"
					>
						<view>普通会员</view>
						<view style="font-size: 40upx;font-weight: bold;margin-top: 10upx;">
							{{ typeof statistics.member === 'number' ? statistics.member : '--' }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<tui-tabs
			selected-color="#000000" bold slider-bg-color="#ff0000"
			:tabs="[{ name: '全部' }, { name: '商户' }, { name: '普通会员' }, { name: '营销策划师' }]" :current-tab="currentTab"
			@change="handleCurrentChange"
		></tui-tabs>
		<view style="margin: 20upx 30upx;">

			<view v-if="String(currentTab)">
				<view v-if="fanList && fanList.length">
					<view
						v-for="item in fanList" :key="item.id"
						style="display: flex;align-items: center;padding: 20upx 30upx;margin-bottom: 24upx;background-color: #fff;"
					>
						<JAvatar :src="common.seamingImgUrl(item.avatar)" size="92" radius="50%" border="5upx solid #ffffff">
						</JAvatar>
						<view style="padding-left: 40upx;">
							<view>名称：{{ item.nickname || '--' }}</view>
							<view>性别：{{ item.gender === 1 ? '男' : item.gender === 2 ? '女' : '--' }}</view>
						</view>
					</view>
				</view>
				<view v-else>
					<tui-no-data>暂无数据</tui-no-data>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
// import { getMyFansListApi, getMyFansStatisticsApi } from '../../api/user'
// import { getUserId, getBrandId } from '../../utils'

export default {
	name: 'FanStatistics',
	components: {},
	data() {
		return {
			statistics: {
				totalFans: '',
				businessFans: '',
				plan: '',
				member: ''
			},
			currentTab: 0,
			fanList: []
		}
	},
	onLoad() {
		this.getMyFansStatistics()
		this.getFanList(3)
	},
	mounted() {
	},
	methods: {
		getMyFansStatistics() {
			uni.showLoading({
				title: '加载中'
			})
			if (!getUserId()) return
			getMyFansStatisticsApi({ userId: getUserId() })
				.then(({ data }) => {
					this.statistics.totalFans = data.totalFans
					this.statistics.businessFans = data.businessFans
					this.statistics.plan = data.plan
					this.statistics.member = data.member
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		getFanList(type) {
			uni.showLoading({
				title: '加载中'
			})
			if (!getUserId()) return
			getMyFansListApi({ userId: getUserId(), type })
				.then(({ data }) => {
					this.fanList = data || []
					uni.hideLoading()
				})
				.catch(() => {
					this.fanList = []
					uni.hideLoading()
				})
		},
		handleCurrentChange(e) {
			this.currentTab = e.index
			if (this.currentTab === 0) {
				this.getFanList(3)
			} else if (this.currentTab === 1) {
				this.getFanList(0)
			} else if (this.currentTab === 2) {
				this.getFanList(1)
			} else if (this.currentTab === 3) {
				this.getFanList(2)
			}
		}
	}
}
</script>

<style lang="less" scoped>
.fan-statistics-container {
	min-height: 100vh;
	width: 100%;
	background: #f6f6f6;
}
</style>
