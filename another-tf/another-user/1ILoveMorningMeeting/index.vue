<template>
	<view class="i-love-morning-meeting-container">
		i-love-morning-meeting
	</view>
</template>

<script>

export default {
	name: '1ILoveMorningMeeting',
	components: {
	},
	data() {
		return {
			isDetail: 0
		}
	},
	onLoad(options) {
	},
	methods: {
	}
}
</script>

<style lang="less" scoped>
.i-love-morning-meeting-container {
	min-height: 100vh;
	box-sizing: border-box;

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
