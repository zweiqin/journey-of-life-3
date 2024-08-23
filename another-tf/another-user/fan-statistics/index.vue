<template>
	<view class="fan-statistics-container">
		<JHeader title="粉丝统计" width="50" height="50"></JHeader>
		<view style="padding: 0 28rpx;">
			<view v-if="statistics.userName" style="display: flex;align-items: center;font-size: 36rpx;">
				<view>
					<JAvatar :src="common.seamingImgUrl(statistics.headImage)" :size="60" style="margin: 0 24rpx 0 0;line-height: 1;"></JAvatar>
				</view>
				<view style="margin-right: 16rpx;">{{ statistics.userName }}</view>
				<view>【{{ statistics.phone }}】</view>
			</view>
			<view v-if="statistics.paramLists && statistics.paramLists.length" style="margin-top: 20rpx;">
				<view style="font-size: 28rpx;font-weight: bold;">粉丝列表</view>
				<view style="margin-top: 20rpx;">
					<view v-for="(item, index) in statistics.paramLists" :key="index" style="margin-bottom: 20rpx;">
						<tui-collapse :index="index" :current="currentIndexMain" hd-bg-color="#ffffff" @click="changeCurrentMain">
							<template #title>
								<tui-list-cell background-color="transparent">
									<view style="display: flex;align-items: center;">
										<view>
											<JAvatar :src="common.seamingImgUrl(item.headImage)" :size="40" style="margin: 0 24rpx 0 0;line-height: 1;"></JAvatar>
										</view>
										<view style="margin-right: 16rpx;">{{ item.userName }}</view>
										<view>【{{ item.phone }}】</view>
									</view>
								</tui-list-cell>
							</template>
							<template #content>

								<view v-if="item.paramLists && item.paramLists.length">
									<view
										v-for="(part, count) in item.paramLists" :key="count"
										style="display: flex;align-items: center;padding: 18rpx 0 18rpx 38rpx;margin-bottom: 4rpx;background-color: #ebebea;"
									>
										<view>
											<JAvatar :src="common.seamingImgUrl(part.headImage)" :size="40" style="margin: 0 24rpx 0 0;line-height: 1;"></JAvatar>
										</view>
										<view style="margin-right: 16rpx;">{{ part.userName }}</view>
										<view>【{{ part.phone }}】</view>
									</view>
								</view>
								<view v-else style="padding: 28rpx 0;text-align: center;background-color: #ebebea;">
									该粉丝暂无下级粉丝~
								</view>

							</template>
						</tui-collapse>
					</view>
				</view>
			</view>
			<view v-else style="padding-top: 48rpx;text-align: center;">
				暂无粉丝！
			</view>
		</view>
	</view>
</template>

<script>
import { getFansListApi } from '../../../api/anotherTFInterface'

export default {
	name: 'FanStatistics',
	data() {
		return {
			statistics: {
				userName: '',
				headImage: '',
				phone: '',
				paramLists: []
			},
			currentIndexMain: 0
		}
	},
	onLoad() {
		this.getMyFansStatistics()
	},
	methods: {
		getMyFansStatistics() {
			uni.showLoading({
				title: '加载中'
			})
			getFansListApi({})
				.then(({ data }) => {
					console.log(data)
					this.statistics.userName = data.userName || ''
					this.statistics.headImage = data.headImage || ''
					this.statistics.phone = data.phone || ''
					this.statistics.paramLists = data.paramLists || []
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		changeCurrentMain(e) {
			this.currentIndexMain = this.currentIndexMain == e.index ? -1 : e.index
		}
	}
}
</script>

<style lang="less" scoped>
.fan-statistics-container {
	min-height: 100vh;
	background-color: #f9f9f9;
	box-sizing: border-box;

	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}
}
</style>
