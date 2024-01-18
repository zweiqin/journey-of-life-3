<template>
	<view class="page-header-container">
		<TuanAppShim bg="#fff"></TuanAppShim>

		<view class="container">
			<view
				style="flex: 1;display: flex;align-items: center;margin-right: 26upx;background-color: #ffffff;border: 2upx solid #EF5511;border-radius: 50upx;"
			>
				<TuanLocation
					free event-name="sendChooseAddressSuccessMsg"
					style="display: flex;align-items: center;padding-left: 18upx;line-height: 1;"
				>
					<text
						style="max-width: 130upx;font-size:28upx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
					>
						{{ $store.getters.currentShopCity || '定位失败' }}
					</text>
					<BeeIcon :size="26" name="turningdown" color="#222229"></BeeIcon>
				</TuanLocation>
				<view style="width: 4upx;height: 28upx;background-color: #f6f6f8;"></view>
				<tui-input
					label="" placeholder="社区商圈" disabled clearable
					:border-bottom="false"
					padding="6upx 10upx 6upx 2upx" placeholder-style="color: #292930;font-size: 28upx;"
					background-color="transparent" style="flex: 1;margin-left: 14upx;" @click="go(`/another-tf/another-serve/search/index?searchType=shop`)"
				>
					<template #right>
						<tui-button
							type="warning" width="120rpx" height="50rpx" shape="circle"
							style="background: #ee692f!important;"
							@click="go(`/another-tf/another-serve/search/index?searchType=shop`)"
						>
							搜索
						</tui-button>
					</template>
				</tui-input>
			</view>
			<view class="more">
				<view class="bar-wrapper">
					<view class="bar-item"></view>
					<view class="bar-item"></view>
					<view class="bar-item"></view>
					<view class="bar-item"></view>
				</view>

				<text class="more-text">更多</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@keyframes rotate-bar {
	0% {
		transform: rotate(90deg) scale(1);
		opacity: 0.8;

	}

	50% {
		opacity: 1;
		transform: scale(0.9);
	}

	100% {
		transform: rotate(0deg) scale(1);
		opacity: 0.8;
	}
}

.page-header-container {
	.container {
		display: flex;
		align-items: center;

		.more {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			padding-top: 2upx;

			.bar-wrapper {
				width: 36upx;
				height: 36upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-wrap: wrap;

				.bar-item {
					width: 16upx;
					height: 16upx;
					background-color: #000;
					margin-bottom: 6upx;
					border-radius: 4upx;
					flex-shrink: 0;

					&:nth-child(2) {
						background-color: #EE6C33;
						animation: rotate-bar 1s ease-in-out infinite reverse 4s;
					}
				}
			}

			.more-text {
				font-size: 24upx;
				color: #222229;
			}
		}
	}
}
</style>
