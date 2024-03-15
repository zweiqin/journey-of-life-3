<template>
	<view class="serve-menus-container">
		<view class="serve-menus-wrapper">
			<!-- TODO: 加图标动画 -->
			<view v-for="serve in communityServeMenu" :key="serve.label" class="item" @click="handleToServe(serve)">
				<image class="serve-icon" :src="serve.icon"></image>
				<view class="serve-name">{{ serve.label }}</view>
			</view>
		</view>
		<view style="display: flex;justify-content: space-between;align-items: stretch;">
			<view
				style="position: relative;width: 30.2%;height: 310rpx;background-color: #f6f6f6;overflow: hidden;"
				@click="go('/community-center/service-sort/index?value=13&name=墙面地面')"
			>
				<view style="position: absolute;top: 18rpx;left: 10rpx;">
					<view style="font-size: 32rpx;font-weight: bold;">全屋整装</view>
					<view style="margin-top: 16rpx;font-size: 24rpx;color: #333333;">让您的生活空间焕然一新 尽享舒适与品质</view>
					<image
						style="width: 200rpx;" src="../../../static/images/new-community/home/quanwuzhengzhuang.png"
						mode="widthFix"
					/>
				</view>
			</view>
			<view style="width: 34%;">
				<view
					style="height: 150rpx;background-color: #f6f6f6;overflow: hidden;"
					@click="go('/community-center/service-sort/index?value=8&name=门窗维保')"
				>
					<view style="position: relative;height: 100%;padding: 18rpx 0 0 10rpx;box-sizing: border-box;">
						<view style="font-size: 32rpx;font-weight: bold;">阳台改造</view>
						<view style="margin-top: 6rpx;font-size: 24rpx;color: #333333;">阳台换新颜</view>
						<image
							style="position: absolute;bottom: 0;right: 0;width: 114rpx;"
							src="../../../static/images/new-community/home/yangtaigaizao.png" mode="widthFix"
						/>
					</view>
				</view>
				<view
					style="height: 150rpx;margin-top: 10rpx;background-color: #f6f6f6;overflow: hidden;"
					@click="go('/community-center/service-sort/index?value=289&name=窗帘衣架')"
				>
					<view style="position: relative;height: 100%;padding: 18rpx 0 0 10rpx;box-sizing: border-box;">
						<view style="font-size: 32rpx;font-weight: bold;">窗帘升级</view>
						<view style="margin-top: 6rpx;font-size: 24rpx;color: #333333;">设计更时尚</view>
						<image
							style="position: absolute;bottom: 0;right: 0;width: 124rpx;"
							src="../../../static/images/new-community/home/chuanglianshengji.png" mode="widthFix"
						/>
					</view>
				</view>
			</view>
			<view style="width: 34%;">
				<view
					style="height: 150rpx;background-color: #f6f6f6;overflow: hidden;"
					@click="go('/community-center/service-sort/index?value=9&name=防水补漏')"
				>
					<view style="position: relative;height: 100%;padding: 18rpx 0 0 10rpx;box-sizing: border-box;">
						<view style="font-size: 32rpx;font-weight: bold;">卫生间改造</view>
						<view style="margin-top: 6rpx;font-size: 24rpx;color: #333333;">空间再释放</view>
						<image
							style="position: absolute;bottom: -20rpx;right: -10rpx;width: 132rpx;"
							src="../../../static/images/new-community/home/weishengjiangaizao.png" mode="widthFix"
						/>
					</view>
				</view>
				<view
					style="height: 150rpx;margin-top: 10rpx;background-color: #f6f6f6;overflow: hidden;"
					@click="go('/community-center/service-sort/index?value=2&name=家具维保')"
				>
					<view style="position: relative;height: 100%;padding: 18rpx 0 0 10rpx;box-sizing: border-box;">
						<view style="font-size: 32rpx;font-weight: bold;">家具翻新</view>
						<view style="margin-top: 6rpx;font-size: 24rpx;color: #333333;">焕新如初见</view>
						<image
							style="position: absolute;bottom: -18rpx;right: 0;width: 184rpx;"
							src="../../../static/images/new-community/home/jiajufanxin.png" mode="widthFix"
						/>
					</view>
				</view>
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
		width: 100%;
		padding: 15upx 7upx;
		box-sizing: border-box;
		// background-color: #fff;
		margin-top: 24upx;
		border-radius: 20upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;

		.item {
			margin-right: 30upx;
			margin-bottom: 20upx;

			&:nth-child(5n) {
				margin-right: 0;
			}

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
