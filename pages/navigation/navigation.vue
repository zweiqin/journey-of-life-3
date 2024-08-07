<template>
	<view class="navigation-container">
		<view>
			<tui-button
				type="warning" width="320rpx" height="98rpx" margin="120rpx auto 0"
				bold @click="handelClickBack"
			>
				回到首页
			</tui-button>
		</view>
	</view>
</template>

<script>
export default {
	name: 'Navigation',
	onLoad(options) {
		if (options.target) {
			this.target = decodeURIComponent(options.target)
			this.go(this.target)
		} else {
			this.$showToast('导航链接为空')
		}
	},

	data() {
		return {
			target: ''
		}
	},
	methods: {
		handelClickBack() {
			this.$switchTab('/pages/index/index')
		}
	}
}
</script>

<style lang="less" scoped>
.goods-list-container {
	min-height: 100vh;
	box-sizing: border-box;
}
</style>
