<template>
	<view class="i-love-morning-meeting-container">
		<JHeader title="团蜂科技" width="50" height="50"></JHeader>
	</view>
</template>

<script>
export default {
	name: '1ILoveMorningMeeting',
	components: {
	},
	onLoad(options) {
	},
	data() {
		return {
			isCustom: false
		}
	},
	methods: {

	}
}
</script>

<style lang="less" scoped>
.i-love-morning-meeting-container {
	min-height: 100vh;
	box-sizing: border-box;

	/deep/ .j-header-container {
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
