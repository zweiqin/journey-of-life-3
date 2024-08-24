<template>
	<view class="bee-back-container" @click="handleBack">
		<TuanAppShim bg="transparent"></TuanAppShim>
		<slot></slot>
	</view>
</template>

<script>

export default {
	name: 'BeeBack',
	props: {
		url: {
			type: String,
			default: ''
		},
		tab: {
			type: String,
			default: ''
		},
		redirect: {
			type: String,
			default: ''
		},
		successCb: {
			type: Function,
			default: () => {}
		}
	},
	methods: {
		handleBack() {
			if (this.tab) {
				this.$switchTab(this.url)
			} else if (this.redirect) {
				uni.redirectTo({
					url: this.url
				})
			} else if (this.url) {
				uni.navigateTo({
					url: this.url
				})
			}

			const pages = getCurrentPages()
			const pagesLength = pages.length
			let backLevel = 1
			if (pages.length === 1) {
				this.$switchTab('/pages/index/index')
			} else {
				const lastUrl = pages[pagesLength - 1].route + this.getParams(pages[pagesLength - 1].options)
				for (
					let index = pages.length - 1;
					index > 0 && index < pages.length;
					index--
				) {
					if (pages[index].route + this.getParams(pages[index].options) === lastUrl) {
						backLevel += 1
					} else {
						break
					}
				}
				uni.navigateBack({
					delta: backLevel - 1,
					success: this.successCb
				})
			}
		},

		getParams(options) {
			return JSON.stringify(options)
		}
	}
}
</script>

<style lang="less" scoped>
.bee-back-container {
	box-sizing: border-box;
}
</style>
