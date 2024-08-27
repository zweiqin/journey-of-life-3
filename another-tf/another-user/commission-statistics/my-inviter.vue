<template>
	<view class="my-inviter-container">
		<JHeader title="我的邀请人" width="50" height="50"></JHeader>
		<view style="margin: 26rpx 28rpx;border-radius: 20rpx;background-color: #ffffff;">
			<view style="padding: 34rpx 30rpx 36rpx;">
				<view style="display: flex;align-items: center;margin-bottom: 32rpx;">
					<image
						style="width: 102rpx;height: 102rpx;border-radius: 50%;" mode="widthFix"
						:src="common.seamingImgUrl(inviterInfo.xxx)"
					/>
					<view style="margin-left: 30rpx;">{{ inviterInfo.xxx || '--' }}</view>
				</view>
				<view style="font-size: 28rpx;">
					<view style="display: flex;align-items: center;margin-bottom: 32rpx;">
						<view style="width: 148rpx;color: #999999;">用户ID</view>
						<view>{{ inviterInfo.xxx }}</view>
					</view>
					<view style="display: flex;align-items: center;margin-bottom: 6rpx;">
						<view style="width: 148rpx;color: #999999;">手机号</view>
						<view>{{ inviterInfo.xxx || '--' }}</view>
					</view>
				</view>
			</view>
			<view
				v-if="inviterInfo.xxx"
				style="padding: 26rpx 0 28rpx;border-top: 2rpx solid #f1f1f1;"
			>
				<BeeMakePhone :phone="inviterInfo.xxx">
					<view style="text-align: center;font-size: 30rpx;color: #ea5c1e;font-weight: bold;">
						拨打电话
					</view>
				</BeeMakePhone>
			</view>
		</view>
	</view>
</template>

<script>
// import { xxx } from '../../../api/anotherTFInterface'
export default {
	name: 'MyInviter',
	data() {
		return {
			inviterInfo: {
				xxx: 'xxx'
			}
		}
	},

	onLoad() {
		this.getInviterData()
	},

	methods: {
		getInviterData() {
			uni.showLoading()
			xxx({})
				.then((res) => {
					this.inviterInfo = res.data
					uni.hideLoading()
				})
				.catch((e) => {
					uni.hideLoading()
				})
		}
	}
}
</script>

<style lang="less" scoped>
.my-inviter-container {
	min-height: 100vh;
	background-color: #f1f1f1;
	box-sizing: border-box;

	/deep/ .j-header-wrapper {
		padding: 24rpx 0 10rpx;
		background-color: #ffffff;
	}
}
</style>
