<template>
	<view class="lottery-activities-container">
		<JHeader title="抽奖活动" width="50" height="50"></JHeader>
		<view style="display: flex;justify-content: flex-end;">
			<tui-button
				type="primary" width="180rpx" height="60rpx" margin="10rpx 20rpx 0 0"
				shape="circle"
				@click="go('/another-tf/another-user/lottery-activities/lottery-record')"
			>
				中奖记录
			</tui-button>
		</view>
		<view v-if="lotteryActivityList && lotteryActivityList.length" style="padding: 20rpx 24rpx 0;">
			<view
				v-for="item in lotteryActivityList" :key="item.id"
				style="margin: 0 0 32rpx;border-radius: 20rpx;overflow: hidden;"
			>
				<view style="position: relative;">
					<view style="width: 100%;text-align: center;background-color: #ef530e;">
						<tui-lazyload-img
							width="80%" height="352rpx" mode="aspectFit" radius="20rpx 20rpx 0 0"
							background-color="#ef530e"
							:src="common.seamingImgUrl(item.images) || require('../../../static/images/new-user/fee.icon.png')"
						></tui-lazyload-img>
					</view>
					<view
						style="position: absolute;bottom: -28rpx;right: -18rpx;width: 172rpx;height: 172rpx;display: flex;align-items: center;justify-content: center;padding: 14rpx;white-space: nowrap;border: 4rpx solid #ffffff;border-radius: 50%;transform: rotate(-30deg);box-sizing: border-box;"
					>
						<view
							style="display: flex;align-items: center;justify-content: center;width: 100%;height: 100%;border: 2rpx dashed #ffffff;border-radius: 50%;"
						>
							<view
								style="padding: 14rpx 0;color: #ffffff;border-top: 2rpx solid #ffffff;border-bottom: 2rpx solid #ffffff;"
							>
								<text v-if="(Date.parse(item.startTime) - Date.now()) > 0">待开始</text>
								<text v-else-if="(Date.parse(item.endTime) - Date.now()) <= 0">已结束</text>
								<text v-else-if="(Date.parse(item.startTime) - Date.now()) <= 0">进行中</text>
							</view>
						</view>
					</view>
				</view>
				<view style="padding: 10rpx 30rpx;background-color: #ffefff;">
					<view style="font-weight: bold;">{{ item.topic }}</view>
					<view style="font-size: 28rpx;color: #8d8d8e;">
						<view style="padding-top: 14rpx;">
							<text>状态：</text>
							<text v-if="item.state === 1">上线</text>
							<text v-else-if="item.state === 2">下线</text>
							<text v-else>--</text>
						</view>
						<view style="padding-top: 6rpx;">
							<text>创建时间：</text>
							<text>{{ item.creatTime }}</text>
						</view>
						<view style="padding-top: 6rpx;">
							<view>活动时间：</view>
							<view style="display: flex;align-items: center;flex-wrap: wrap;">
								<text>{{ item.startTime }}</text>
								<text style="margin: 0 6rpx;">-</text>
								<text>{{ item.endTime }}</text>
							</view>
						</view>
					</view>
					<view style="display: flex;align-items: center;justify-content: flex-end;margin-top: 12rpx;">
						<tui-button
							type="primary" width="174rpx" height="60rpx"
							shape="circle" margin="0 10rpx 0 0"
							@click="go(`/another-tf/another-user/lottery-activities/lottery-awards?id=${item.id}`)"
						>
							抽奖奖项
						</tui-button>
						<tui-button
							v-if="item.link" type="warning" width="286rpx" height="60rpx"
							shape="circle"
							margin="0 10rpx 0 0" @click="$copy(item.link)"
						>
							复制抽奖页面链接
						</tui-button>
						<tui-button
							type="danger" width="174rpx" height="60rpx" shape="circle"
							@click="handleParticipateLottery(item)"
						>
							参加抽奖
						</tui-button>
					</view>
				</view>
			</view>
		</view>
		<view style="padding-bottom: 45rpx;">
			<LoadingMore
				:status="!isEmpty && !lotteryActivityList.length
					? 'loading' : !isEmpty && lotteryActivityList.length && (lotteryActivityList.length >= lotteryActivityTotal) ? '' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="isEmpty" :fixed="false" style="padding-top: 60rpx;">请期待组合活动</tui-no-data>
		</view>
	</view>
</template>

<script>
import { getPlatformLotteryApi, updateDoDrawIdApi } from '../../../api/anotherTFInterface'
export default {
	name: 'LotteryActivities',
	data() {
		return {
			isEmpty: false,
			lotteryActivityList: [],
			lotteryActivityTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20
			}
		}
	},
	onLoad() {
		this.getLotteryActivitiesList()
	},
	methods: {
		getLotteryActivitiesList(isLoadmore) {
			uni.showLoading()
			getPlatformLotteryApi(this.queryInfo).then((res) => {
				this.lotteryActivityTotal = res.data.page.total
				if (isLoadmore) {
					this.lotteryActivityList.push(...res.data.page.list)
				} else {
					this.lotteryActivityList = res.data.page.list
				}
				this.isEmpty = this.lotteryActivityList.length === 0
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		handleParticipateLottery(item) {
			uni.showLoading()
			updateDoDrawIdApi({ id: item.id })
				.then((res) => {
					uni.hideLoading()
					this.$showToast('参与成功')
					setTimeout(() => {
						this.queryInfo.page = 1
						this.getLotteryActivitiesList()
					}, 2000)
				})
				.catch(() => {
					uni.hideLoading()
				})
		}
	},
	onReachBottom() {
		if (this.lotteryActivityList.length < this.lotteryActivityTotal) {
			++this.queryInfo.page
			this.getLotteryActivitiesList(true)
		}
	}
}
</script>

<style lang="less" scoped>
.lottery-activities-container {
	min-height: 100vh;
	box-sizing: border-box;

	/deep/ .tui-lazyload__box {
		vertical-align: bottom;
	}

	/deep/ .j-header-wrapper {
		padding: 24rpx 0 10rpx;
		background-color: #f5f5f5;

		.title {
			font-size: 36rpx;
			color: #222229;
			font-weight: normal;
		}
	}
}
</style>
