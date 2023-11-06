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
		},
		free: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		// 点击获取定位
		handleGetUserLocation() {
			let url = `/pages/choose-location/choose-location?eventName=${this.eventName}`
			if(this.free){
				url += '&isUnLimit=true'
			}
			uni.navigateTo({
				url
			})
		}
	}
}
</script>

<style lang="less" scoped></style>
