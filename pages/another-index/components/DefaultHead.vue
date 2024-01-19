<template>
	<view class="default_head_content">
		<!--  小程序不支持style写computed形式  -->
		<view
			v-if="needSetStatusBarHeight" class="status_bar_fit" :style="{
				'height': `${statusBarHeight}px`,
				'background-color': `${backgroundColor}`
			}"
		></view>
	</view>
</template>

<script>
export default {
	name: 'DefaultHead',
	props: {
		needSetStatusBarHeight: {
			type: Boolean,
			default: () => true
		},
		backgroundColor: {
			type: String,
			default: () => '#fff'
		}
	},
	emits: [ 'getInfoData' ],
	data() {
		return {
			// 系统信息
			systemInfo: {},
			// 小程序胶囊信息
			menuButtonInfo: {
				width: 0,
				height: 0,
				top: 0,
				left: 0,
				bottom: 0,
				right: 0
			},
			// 手机状态栏高度
			statusBarHeight: 0
		}
	},
	mounted() {
		this.handleGetSystemInfo()
		// #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
		this.handleGetMenuButtonInfo()
		// #endif
		this.$emit('getInfoData', {
			systemInfo: this.systemInfo,
			menuButtonInfo: this.menuButtonInfo
		})
	},
	methods: {
		handleGetSystemInfo() {
			this.systemInfo = uni.getSystemInfoSync()
			this.statusBarHeight = this.systemInfo.statusBarHeight
		},

		handleGetMenuButtonInfo() {
			this.menuButtonInfo = uni.getMenuButtonBoundingClientRect()
		}
	}
}
</script>

<style
    lang="scss"
    scoped
>
.default_head_content {
	width: 100%;
	background: #fff;

	.status_bar_fit {
		width: 100%;
	}
}
</style>
