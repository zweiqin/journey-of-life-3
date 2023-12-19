<template>
	<view class="fan-statistics-container">
		<JHeader title="粉丝统计" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view style="padding: 0 28upx;">
			<view v-if="statistics.userName" style="display: flex;align-items: center;font-size: 36upx;">
				<view>
					<JAvatar :src="common.seamingImgUrl(statistics.headImage)" :size="60" style="margin: 0 24upx 0 0;line-height: 1;"></JAvatar>
				</view>
				<view style="margin-right: 16upx;">{{ statistics.userName }}</view>
				<view>【{{ statistics.phone }}】</view>
			</view>
			<view v-if="statistics.paramLists && statistics.paramLists.length" style="margin-top: 20upx;">
				<view style="font-size: 28upx;font-weight: bold;">粉丝列表</view>
				<view style="margin-top: 20upx;">
					<view v-for="(item, index) in statistics.paramLists" :key="index" style="margin-bottom: 20upx;">
						<tui-collapse :index="index" :current="currentIndexMain" hd-bg-color="#ffffff" @click="changeCurrentMain">
							<template #title>
								<tui-list-cell background-color="transparent">
									<view style="display: flex;align-items: center;">
										<view>
											<JAvatar :src="common.seamingImgUrl(item.headImage)" :size="40" style="margin: 0 24upx 0 0;line-height: 1;"></JAvatar>
										</view>
										<view style="margin-right: 16upx;">{{ item.userName }}</view>
										<view>【{{ item.phone }}】</view>
									</view>
								</tui-list-cell>
							</template>
							<template #content>

								<view v-if="item.paramLists && item.paramLists.length">
									<view
										v-for="(part, count) in item.paramLists" :key="count"
										style="display: flex;align-items: center;padding: 18upx 0 18upx 38upx;margin-bottom: 4upx;background-color: #ebebea;"
									>
										<view>
											<JAvatar :src="common.seamingImgUrl(part.headImage)" :size="40" style="margin: 0 24upx 0 0;line-height: 1;"></JAvatar>
										</view>
										<view style="margin-right: 16upx;">{{ part.userName }}</view>
										<view>【{{ part.phone }}】</view>
									</view>
								</view>
								<view v-else style="padding: 28upx 0;text-align: center;background-color: #ebebea;">
									该粉丝暂无下级粉丝~
								</view>

							</template>
						</tui-collapse>
					</view>
				</view>
			</view>
			<view v-else style="padding-top: 48upx;text-align: center;">
				暂无粉丝！
			</view>
		</view>
	</view>
</template>

<script>
import { getStatisticsPlatformRelationshipApi } from '../../../api/anotherTFInterface'

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
			getStatisticsPlatformRelationshipApi({})
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
}
</style>
