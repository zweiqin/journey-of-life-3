<template>
	<view class="activity-details-container">
		<BeeBack>
			<view
				style="display: flex;align-items: center;justify-content: space-between;padding: 20rpx 20rpx 16rpx;background-color: #a8100d;"
			>
				<BeeIcon name="arrowleft" :size="26" color="#ffffff" style="width: fit-content;">
				</BeeIcon>
				<text style="flex: 1;margin-left: 10rpx;color: #ffffff;font-size: 28rpx;">返回</text>
			</view>
		</BeeBack>
		<view style="padding: 10rpx 0 0;">
			<image
				style="width: 100%;vertical-align: bottom;" mode="widthFix"
				:src="common.seamingImgUrl('1726131257843-activity-details-bg.png')"
			/>
		</view>
		<view v-if="!isLoading" style="text-align: center;background-color: #da3323;padding-bottom: 80rpx;">
			<image
				v-if="isShowReceive" style="width: 94%;" mode="widthFix"
				:src="common.seamingImgUrl('1726131262961-querenlingqu-bg.png')"
				@click="handleReceive"
			/>
			<image
				v-else style="width: 94%;" mode="widthFix"
				:src="common.seamingImgUrl('1726131265676-yilingqu-bg.png')"
			/>
		</view>
	</view>
</template>

<script>
import { xxx1, xxx2 } from '../../../api/anotherTFInterface'
import { getStorageUserId } from '../../../utils'

export default {
	name: 'ActivityDetails',
	components: {
	},
	data() {
		return {
			userId: '',
			isShowReceive: false,
			isLoading: true
		}
	},
	onLoad(options) {
		this.userId = getStorageUserId() || ''
		this.initData()
	},
	methods: {
		initData() {
			uni.showLoading()
			// this.isLoading = true
			// xxx1({})
			// 	.then((res) => {
			if ('res.data') this.isShowReceive = true
			uni.hideLoading()
			this.isLoading = false
			// })
			// .catch((e) => {
			// 	uni.hideLoading()
			// 	this.isLoading = false
			// })
		},
		handleReceive() {
			uni.showLoading()
			// xxx2({}).then((res) => {
			uni.hideLoading()
			this.$showToast('参加成功！')
			this.isShowReceive = false
			// setTimeout(() => {
			// 	this.initData()
			// }, 1000)
			// })
			// 	.catch((e) => {
			// 		uni.hideLoading()
			// 	})
		}
	}
}
</script>

<style lang="less" scoped>
.activity-details-container {
	min-height: 100vh;
	background-color: #a8100d;
	box-sizing: border-box;
}
</style>
