<template>
	<view class="live-list-page">
		<JHeader title="直播推荐" width="50" height="50"></JHeader>
		<view class="live-list">
			<LiveBox v-for="item in roomList" :key="item.roomid" class="live-item" :live-data="item" />
		</view>
		<view style="padding-bottom: 45rpx;">
			<LoadingMore
				:status="!isEmpty && !roomList.length
					? 'loading' : !isEmpty && roomList.length && (roomList.length >= roomTotal) ? 'no-more' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无直播~</tui-no-data>
		</view>
	</view>
</template>

<script>
import { getCanvasSelectLiveListApi } from '../../../api/anotherTFInterface'

import LiveBox from './components/liveBox.vue'
export default {
	name: 'LivePage',
	components: {
		LiveBox
	},
	data() {
		return {
			queryInfo: {
				page: 1,
				pageSize: 10
			},
			roomList: [],
			isEmpty: false,
			roomTotal: 0
		}
	},
	onLoad() {
		this.getLiveRooms()
	},
	methods: {
		// 获取直播间列表
		getLiveRooms(isLoadmore) {
			uni.showLoading()
			getCanvasSelectLiveListApi(this.queryInfo).then((res) => {
				this.roomTotal = res.data.total
				if (isLoadmore) {
					this.roomList.push(...res.data.list)
				} else {
					this.roomList = res.data.list
				}
				this.isEmpty = this.roomList.length === 0
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		}
	},
	onReachBottom() {
		if (this.roomList.length < this.roomTotal) {
			++this.queryInfo.page
			this.getLiveRooms(true)
		}
	}
}
</script>

<style lang="less" scoped>
.live-list-page {
	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}
	.live-list {
		width: 100%;
		display: flex;
		flex-wrap: wrap;

		.live-item {
			width: 48%;
			height: 460rpx;
			margin: 1%;
			border-radius: 8rpx;
			overflow: hidden;
		}
	}
}
</style>
