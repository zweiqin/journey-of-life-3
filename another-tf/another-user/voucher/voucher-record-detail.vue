<template>
	<view class="voucher-record-detail-container">
		<JHeader title="订单核销码" width="50" height="50" style="padding: 24upx 0 18upx;background-color: #ffffff;"></JHeader>
		<view style="padding: 90upx 28upx 0;" class="write-off-bg">
			<view style="text-align: center;color: #ffffff;">
				<view style="font-size: 38upx;font-weight: bold;">
					<text v-if="verificationStatus == '0'">待核销-待付款</text>
					<text v-else-if="verificationStatus == '1'">待核销-已付款</text>
					<text v-else-if="verificationStatus == '2'">已核销</text>
					<text v-else-if="verificationStatus == '3'">已过期</text>
					<text v-else-if="verificationStatus == '4'">已取消</text>
					<text v-else>--</text>
				</view>
				<view style="margin: 30upx 0 58upx;font-size: 28upx;">{{ dataList.createTime || '--' }}</view>
			</view>
			<view style="position: relative;min-height: 40vh;background-color: #ffffff;border-radius: 28upx;">
				<view>
					<!-- <view
						style="position: absolute;top: 160upx;left: 0;width: 0upx;height: 0upx;border: 17upx solid #ef5613;border-left-color: transparent;border-radius: 0% 50% 50% 0%;box-sizing: content-box;"
						>
						</view> -->
					<view
						style="position: absolute;top: 160upx;left: 0;width: 34upx;height: 34upx;background-color: #ef5613;clip-path: ellipse(50% 50% at 10% 50%)"
					>
					</view>
					<view
						style="position: absolute;top: 160upx;right: 0;width: 34upx;height: 34upx;background-color: #ef5613;clip-path: ellipse(50% 50% at 90% 50%)"
					>
					</view>
				</view>
				<view v-if="verificationCodeUrl" style="padding: 82upx 40upx 0;font-weight: bold;">
					<view style="display: flex;justify-content: center;padding-bottom: 34upx;font-size: 32upx;">
						<view style="color: #222229;">核销码：{{ verificationCode || '--' }}</view>
						<view style="margin-left: 28upx;color: #ef5613;" @click="$copy(verificationCode)">复制</view>
					</view>
					<view style="text-align: center;">
						<image
							style="width: 420upx;border: 2upx solid #222229;border-radius: 28upx;" mode="widthFix"
							:src="verificationCodeUrl"
						/>
					</view>
					<view style="padding: 32upx 0 42upx;font-size: 28upx;text-align: center;">
						<view style="color: #222229;">向商家出示核销码进行核销</view>
						<view style="margin-top: 32upx;color: #888889;">长按保存二维码</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>

export default {
	name: 'VoucherRecordDetail',
	components: {
	},
	data() {
		return {
		}
	},
	onLoad() {
	},
	methods: {
	}
}
</script>

<style lang="less" scoped>
.voucher-record-detail-container {
	min-height: 100vh;
	box-sizing: border-box;

	/deep/ .j-header-container {
		padding: 18rpx 0 16rpx;
		background-color: #f5f5f5;

		.title {
			font-size: 36rpx;
			color: #222229;
			font-weight: normal;
		}
	}
}
</style>
