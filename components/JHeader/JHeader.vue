<template>
	<view class="j-header-container">
		<TuanAppShim bg="transparent"></TuanAppShim>
		<view class="j-header-wrapper">
			<JBack v-bind="$attrs" :dark="dark"></JBack>
			<view
				class="title" :style="{
					color: !dark ? '#fff' : ''
				}"
			>
				{{ title }}
			</view>
			<view class="footerFn">
				<slot name="ftFn"></slot>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'JHeader',
	props: {
		dark: {
			type: Boolean,
			default: true
		},
		title: {
			type: String,
			required: true
		}
	}
}
</script>

<style lang="less" scoped>
.j-header-container {
	box-sizing: border-box;

	.j-header-wrapper {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;

		.title {
			font-size: 32rpx;
			color: #3d3d3d;
			font-weight: bold;
			// margin-top: -8rpx;
			flex: 1;
			text-align: center;
			margin-left: -50rpx;
		}

		.footerFn {
			position: absolute;
			right: 0rpx;
		}
	}

}
</style>
