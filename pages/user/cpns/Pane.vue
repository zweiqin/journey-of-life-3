<template>
	<view style="margin-top: 24upx;">
		<view>
			<view v-for="menu in specialPane" :key="menu.name" style="margin-bottom: 24upx;">
				<view v-if="menu.name === '联系客服'">
					<DragButton
						text="客服在线" :icon-src="menu.iconUrl ? common.seamingImgUrl(menu.iconUrl) : menu.icon" is-dock
						exist-tab-bar @btnClick="$emit('menu-click', menu)"
					/>
				</view>
			</view>
		</view>

		<view style="margin: 24upx -12upx 0;display: flex;justify-content: center;flex-wrap: wrap;">
			<view v-for="menu in specialPane" :key="menu.name" @click="$emit('menu-click', menu)">
				<view
					v-if="menu.name === '我的账本'"
					style="display: flex;justify-content: space-between;align-items: center;width: 330upx;margin: 0 12upx 22upx;padding: 32upx 32upx;background-color: #ffffff;border-radius: 10upx;box-sizing: border-box;"
				>
					<view>
						<view style="margin-bottom: 6upx;font-size: 32upx;font-weight: bold;color: #222229;">{{ menu.name }}</view>
						<view style="font-size: 22upx;color: #888889;">分享收益随时看</view>
					</view>
					<image
						style="width: 92upx;height: 92upx;"
						:src="menu.iconUrl ? common.seamingImgUrl(menu.iconUrl) : menu.icon" mode="widthFix"
					></image>
				</view>
				<view
					v-else-if="menu.name === '我的推广'"
					style="display: flex;justify-content: space-between;align-items: center;width: 330upx;margin: 0 12upx 22upx;padding: 32upx 32upx;background-color: #ffffff;border-radius: 10upx;box-sizing: border-box;"
				>
					<view>
						<view style="margin-bottom: 6upx;font-size: 32upx;font-weight: bold;color: #222229;">{{ menu.name }}</view>
						<view style="font-size: 22upx;color: #888889;">分享一起赚钱</view>
					</view>
					<image
						style="width: 92upx;height: 92upx;"
						:src="menu.iconUrl ? common.seamingImgUrl(menu.iconUrl) : menu.icon" mode="widthFix"
					></image>
				</view>
			</view>
		</view>

		<view class="pane-wrapper">
			<view class="title-wrapper">
				<view class="left">
					<view class="title">{{ title }}</view>
					<slot name="title"></slot>
				</view>
				<view class="right">
					<slot name="right"></slot>
				</view>
			</view>

			<view class="row-wrapper">
				<view v-for="menu in renderMenu" :key="menu.name" class="item-wrapper" @click="$emit('menu-click', menu)">
					<view v-if="menu.name === '电子名片'" style="width: 100%;height: 100%;">
						<view v-if="$store.state.app.terminal === 3" style="position: relative;width: 100%;height: 100%;">
							<wx-open-launch-weapp
								id="launch-btn" appid="wxb446588ba0dbb9d7" username="gh_5668ad6e5290"
								path="pages/index/index" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;"
							>
								<script type="text/wxtag-template">
									<style>
									.item { display: flex; align-items: center; justify-content: center; flex-direction: column;padding-top: 17.4859%; }
									.menu-name { margin-top: 4.7695925%; font-size: 90%; color: #2A2B23; }
									</style>
									<view style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;">
									<view class="item">
									<image
									src="{{ menu.iconUrl ? common.seamingImgUrl(menu.iconUrl) : menu.icon }}"
									style="width: 36.283582%;height: 36.283582%;"
									mode="scaleToFill"
									/>
									<text class="menu-name">电子名片</text>
									</view>
									</view>
								</script>
								<!-- src="https://www.tuanfengkeji.cn/TFShop_Uni_H5/static/images/xxx/xxx/xxx.png" -->
								<!-- margin-top: 0.013333vw; font-size: 0.037333vw; width: 0.074667vw; -->
								<!-- <template>
									<view class="item">
									<BeeIcon
									v-if="menu.iconUrl || menu.icon" :size="28"
									:src="menu.iconUrl ? common.seamingImgUrl(menu.iconUrl) : menu.icon"
									></BeeIcon>
									<text class="menu-name">{{ menu.name }}</text>
									</view>
									</template> -->
							</wx-open-launch-weapp>
						</view>
						<view v-else>
							<view class="item">
								<BeeIcon
									v-if="menu.iconUrl || menu.icon" :size="28"
									:src="menu.iconUrl ? common.seamingImgUrl(menu.iconUrl) : menu.icon"
								></BeeIcon>
								<text class="menu-name">{{ menu.name }}</text>
							</view>
						</view>
					</view>
					<view v-else class="item">
						<BeeIcon
							v-if="menu.iconUrl || menu.icon" :size="28"
							:src="menu.iconUrl ? common.seamingImgUrl(menu.iconUrl) : menu.icon"
						></BeeIcon>
						<text class="menu-name">{{ menu.name }}</text>
						<tui-badge
							v-if="(menu.name === '购物车') && $store.getters.shopCarNumber" type="danger" right="36rpx" absolute
							:scale-ratio="0.8" translate-x="40%" top="4rpx"
						>
							{{ $store.getters.shopCarNumber > 10 ? '10+' : $store.getters.shopCarNumber }}
						</tui-badge>
						<tui-badge
							v-else-if="(menu.name === '活动中心') && $store.getters.activityList && $store.getters.activityList.length"
							type="danger" absolute :scale-ratio="0.9" translate-x="-40%"
							top="4rpx"
						>
							<view style="padding: 2rpx;">
								{{ $store.getters.activityList.length }}
							</view>
						</tui-badge>
					</view>
				</view>
				<view
					v-for="menu in specialPane.filter(item => item.name === '股东看板')" :key="menu.name" class="item-wrapper"
					@click="$emit('menu-click', menu)"
				>
					<view class="item">
						<BeeIcon
							v-if="menu.iconUrl || menu.icon" :size="28"
							:src="menu.iconUrl ? common.seamingImgUrl(menu.iconUrl) : menu.icon"
						></BeeIcon>
						<text class="menu-name">{{ menu.name }}</text>
					</view>
				</view>
			</view>

			<view style="display: flex;flex-wrap: wrap;">
				<view v-for="menu in specialPane" :key="menu.name" @click="$emit('menu-click', menu)">
				</view>
			</view>

		</view>
	</view>
</template>

<script>
import { jumpToOtherProject } from '../../../utils'
export default {
	name: 'Pane',
	props: {
		title: {
			type: String,
			required: true
		},

		menuData: {
			type: Array
		}

		// permissionData: {
		// 	type: Array
		// },
	},
	data() {
		return {
			specialPane: [],
			renderMenu: [],
			hasElectronicCardConfig: false
		}
	},

	computed: {
	},
	watch: {
		'menuData': {
			handler(newVal) {
				this.handleRenderView(newVal, this.$store.state.auth.identityInfo.type)
			},
			immediate: true,
			deep: true
		},
		'$store.state.auth.identityInfo.type': {
			handler(newVal) {
				this.handleRenderView(this.menuData, newVal)
			},
			immediate: true,
			deep: true
		}
	},
	methods: {
		handleRenderView(menuData, roleInfoArr) {
			if (!menuData) return this.renderMenu = this.specialPane = []
			const haveSpecialData = []
			const renderMenuArr = []
			menuData.forEach((item) => {
				if (item.name === '我的账本' || item.name === '我的推广') {
					haveSpecialData.push(item)
				} else if (item.showRole) {
					if (item.showRole.includes('shop') && roleInfoArr.includes(9)) renderMenuArr.push(item)
					if (item.showRole.includes('merchantStaff') && roleInfoArr.includes(8)) renderMenuArr.push(item)
					if (item.showRole.includes('franchisee') && roleInfoArr.includes(1)) renderMenuArr.push(item)
					if (item.showRole.includes('regimentalcommander') && (roleInfoArr.includes(13) || roleInfoArr.includes(14))) renderMenuArr.push(item)
					if (item.showRole.includes('copartner') && roleInfoArr.includes(15)) renderMenuArr.push(item)
				} else {
					if (item.name === '电子名片') {
						if ((this.$store.state.app.terminal === 3) && !this.hasElectronicCardConfig) {
							jumpToOtherProject({ toType: 'MP' })
							this.hasElectronicCardConfig = true
						}
					}
					renderMenuArr.push(item)
				}
				this.specialPane = haveSpecialData
				this.renderMenu = renderMenuArr
			})
		}
	}
}
</script>

<style lang="less" scoped>
.pane-wrapper {
	padding: 30upx 24upx 40upx;
	width: 100%;
	box-sizing: border-box;
	background-color: #ffffff;
	border-radius: 24rpx;

	.title-wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 24upx;
		border-bottom: 1upx solid #f1f1f0;

		.left {
			display: flex;
			align-items: center;

			.title {
				font-size: 28rpx;
				// font-weight: bold;
				color: #141000;
			}
		}
	}

	.row-wrapper {
		display: flex;
		align-items: stretch;
		justify-content: flex-start;
		flex-wrap: wrap;
		width: 100%;

		.item-wrapper {
			position: relative;
			width: 25%;
			border-radius: 4rpx;

			.item {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				padding-top: 28rpx;

				.menu-name {
					margin-top: 10rpx;
					font-size: 28rpx;
					color: #2A2B23;
				}
			}
		}

	}
}
</style>
