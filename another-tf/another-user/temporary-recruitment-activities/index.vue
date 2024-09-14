<template>
	<view class="temporary-recruitment-activities-container">
		<view v-if="!isShowEntrance">
			<BeeBack>
				<view
					style="display: flex;align-items: center;justify-content: space-between;padding: 20rpx 20rpx 16rpx;background-color: #f5f5f5;"
				>
					<BeeIcon name="home-fill" :size="26" color="#222229" style="width: fit-content;">
					</BeeIcon>
					<text style="flex: 1;margin-left: -40rpx;text-align: center;">活动入口</text>
				</view>
			</BeeBack>
			<view style="padding-bottom: 45rpx;">
				<LoadingMore :status="isLoading ? 'loading' : ''"></LoadingMore>
				<view v-if="!isLoading && !isShowEntrance">
					<tui-no-data :fixed="false" style="padding-top: 60rpx;">
						<text style="color: #ffffff;">您已参加该活动～</text>
					</tui-no-data>
				</view>
			</view>
		</view>
		<view v-else>
			<tui-landscape
				show :position="1" mask mask-closable
				:close-icon="false"
				:z-index="997" :mask-z-index="996" @close="handleCloseLandscape"
			>
				<view style="position: relative;">
					<view
						style="position: absolute;z-index: 1;top: 24rpx;right: 44rpx;width: 52rpx;height: 56rpx;" @click.stop="handleCloseLandscape"
					></view>
					<view
						@click="go('/another-tf/another-user/temporary-recruitment-activities/activity-details')"
					>
						<image
							:src="common.seamingImgUrl('1726131254304-activity-entrance-bg.png')" mode="widthFix"
							style="width: 580rpx;max-height: 75vh;"
						/>
					</view>
				</view>
			</tui-landscape>
		</view>
	</view>
</template>

<script>
import { xxx1 } from '../../../api/anotherTFInterface'
import { getStorageUserId } from '../../../utils'
export default {
	name: 'TemporaryRecruitmentActivities',
	data() {
		return {
			userId: '',
			isShowEntrance: false,
			isLoading: true
		}
	},
	onLoad(options) {
		this.userId = getStorageUserId() || ''
		uni.showLoading()
		this.isLoading = true
		// xxx1({})
		// 	.then((res) => {
		if ('res.data') this.isShowEntrance = true
		uni.hideLoading()
		this.isLoading = false
		// })
		// .catch((e) => {
		// 	this.isShowEntrance = true
		// 	uni.hideLoading()
		// 	this.isLoading = false
		// })
	},
	methods: {
		handleCloseLandscape() {
			this.$switchTab('/pages/user/user')
		}
	}
}
</script>

<style lang="less" scoped>
.temporary-recruitment-activities-container {
	width: 100%;
	min-height: 100vh;
	background-color: #666666;
	box-sizing: border-box;

	/deep/ .tui-landscape__box {
		.tui-landscape__inner {
			top: 38%;
		}
	}
}
</style>
