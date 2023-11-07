<template>
	<view style="width: 100%;height: 100%;">
		<web-view :src="target"></web-view>
	</view>
</template>

<script>
export default {
	onLoad(options) {
		const { target } = options
		this.target = target
	},

	data() {
		return {
			target: ''
		}
	}
}
</script>

<style lang="less" scoped>
</style>
