<template>
	<view class="header_content">
		<!-- 头部 -->
		<view id="header_box" class="header_box">
			<DefaultHead @getInfoData="handleGetSystemInfoData" />
			<!-- 和胶囊齐平nav条 -->
			<view
				:style="{
					'padding-top': `${headerObj.menuPadding}px`,
					'transform': `translateY(-${headerObj.menuButtonTogetherNavInfo.transformTop}px)`
				}" class="logo_row"
			>
				<!-- logo -->
				<!-- <view class="logo_box">
					<image src="../../../../static/images/logo/jf-name.png" />
					</view> -->
				<!-- 右侧搜索 -->
				<template>
					<!-- #ifndef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ -->
					<!-- <view class="search_box" @click="handleSearch">
						<image src="../../../../static/images/origin/search.png" />
						</view> -->
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ -->
					<!-- <view
						class="search_box" :style="{
						'position': 'absolute',
						'left': `${headerObj.systemInfo.menuButtonInfo.left}px`,
						'transform': `translateX(-110%)`
						}" @click="handleSearch"
						>
						<image src="../../../../static/images/origin/search.png" />
						</view> -->
					<!-- #endif -->
					<view style="display: flex;justify-content: center;align-items: center;width: 100%;padding: 10upx 22.5upx 0 22.5upx;">
						<TuanLocation
							free style="display: flex;align-items: center;padding-left: 18upx;line-height: 1;"
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
							placeholder="商城" disabled clearable
							:border-bottom="false"
							padding="6upx 10upx 6upx 2upx" placeholder-style="color: #292930;font-size: 28upx;"
							background-color="transparent" style="flex: 1;margin-left: 14upx;" @click="go(`/another-tf/another-serve/search/index`)"
						>
							<template #right>
								<tui-button
									type="warning" width="120rpx" height="50rpx" shape="circle"
									style="background: #ee692f!important;"
									@click="go(`/another-tf/another-serve/search/index`)"
								>
									搜索
								</tui-button>
							</template>
						</tui-input>
					</view>
				</template>
			</view>
			<!-- 其他内容 -->
			<!-- <slot /> -->
		</view>

		<!-- 空盒子撑高 -->
		<view class="empty_box" :style="{ height: headerObj.height + 'px' }" />
	</view>
</template>

<script>
import DefaultHead from './DefaultHead'

export default {
	name: 'FixedHead',
	components: {
		DefaultHead
	},
	data() {
		return {
			// 头部对象
			headerObj: {
				height: 0, // 容器总体高度
				systemInfo: {}, // 系统此乃西
				menuPadding: 0, // 胶囊距离statusBar的高度（胶囊top - statusBarHeight）
				// 胶囊配置信息
				menuButtonTogetherNavInfo: {
					height: 36,  // 跟胶囊齐平的nav高度（和CSS的nav高度一致）
					transformTop: 0 // nav要相对于menuPadding以后向上位移高度
				}
			}
		}
	},
	methods: {
		// 查询产品
		handleSearch() {
			uni.navigateTo({
				url: `/another-tf/another-serve/search/index`
			})
		},

		/**
		 * 获取系统信息
		 * 由DefaultHead回调
		 */

		handleGetSystemInfoData(data) {
			this.headerObj.systemInfo = data
			// #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
			this.headerObj.menuPadding = data.menuButtonInfo.top - data.systemInfo.statusBarHeight
			const { menuButtonTogetherNavInfo } = this.headerObj
			// 如果胶囊高度小于齐平的nav高度
			const menuButtonHeight = data.menuButtonInfo.height
			const menuButtonTogetherNavHeight = menuButtonTogetherNavInfo.height
			if (menuButtonHeight < menuButtonTogetherNavHeight) {
				// 胶囊始终在nav高度中心位置
				menuButtonTogetherNavInfo.transformTop = (menuButtonTogetherNavHeight - menuButtonHeight) / 2
			}
			// #endif
			this.$nextTick(() => {
				const query = uni.createSelectorQuery().in(this)
				// 处理撑高逻辑
				query.select('#header_box').boundingClientRect((boxData) => {
					this.headerObj.height = boxData.height
					if (boxData.height < data.menuButtonInfo.bottom) {
						this.headerObj.height = data.menuButtonInfo.bottom + 10
					}
				})
					.exec()
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.header_content {
	position: relative;

	/* // 头部 */
	.header_box {
		width: 100%;
		height: auto;
		position: fixed;
		background-color: #fff;
		z-index: 9999;

		image {
			width: 100%;
			height: 100%;
			display: inline-block;
		}

		.logo_row {
			position: relative;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;

			.logo_box {
				width: 286rpx;
				height: 72rpx;
			}

			.search_box {
				width: 60rpx;
				height: 60rpx;
			}
		}
	}

	.empty_box {
		width: 100%;
		position: relative;
	}
}
</style>
