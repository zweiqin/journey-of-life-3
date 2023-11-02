<template>
	<view class="tuan-location-container" @click="handleGetUserLocation">
		<slot></slot>
	</view>
</template>

<script>
export default {
	name: 'TuanLocation',
	props: {
		eventName: {
			type: String,
			default: ''
		}
	},
	methods: {
		// 点击获取定位
		handleGetUserLocation() {
			uni.navigateTo({
				url: `/pages/choose-location/choose-location?eventName=${this.eventName}`
			})
		}
	}
}
</script>

<style lang="less" scoped></style>
