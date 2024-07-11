<template>
	<view class="serve-menus-container">
		<view class="serve-menus-wrapper">
			<view v-for="serve in communityServeMenu" :key="serve.label" class="item" @click="handleToServe(serve)">
				<image class="serve-icon" :src="serve.icon"></image>
				<view class="serve-name">{{ serve.label }}</view>
			</view>
		</view>
		
		<tui-toast ref="toast"></tui-toast>
	</view>
</template>

<script>
import { communityServeMenu } from '../config'
export default {
	data() {
		return {
			communityServeMenu: Object.freeze(communityServeMenu)
		}
	},

	methods: {
		handleToServe(item) {
			if (item.url) {
				uni.navigateTo({
					url: item.url
				})
			} else {
				this.empty()
			}
		}
	}
}
</script>

<style lang="less" scoped>
.serve-menus-container {
	box-sizing: border-box;

	.serve-menus-wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		width: 100%;
		padding: 15upx 7upx;
		margin: 24rpx -15rpx 0;
		border-radius: 20upx;
		text-align: center;

		.item {
			width: 15%;
			margin: 0 15rpx 20rpx;

			.serve-icon {
				width: 80upx;
				height: 80upx;
			}

			.serve-name {
				font-size: 24upx;
				color: #222229;
				line-height: 1.5;
				margin-top: 20upx;
			}
		}
	}
}
</style>
