<template>
	<view style="margin-top: 24upx;">
		<view>
			<view v-for="menu in specialPane" :key="menu.name" style="margin-bottom: 24upx;">
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
				<view v-for="menu in renderMenu" :key="menu.name" class="item" @click="$emit('menu-click', menu)">
					<BeeIcon
						v-if="menu.iconUrl || menu.icon" :size="32"
						:src="menu.iconUrl ? common.seamingImgUrl(menu.iconUrl) : menu.icon"
					></BeeIcon>
					<text class="menu-name">{{ menu.name }}</text>
					<tui-badge
						v-if="menu.name === '区域代理' && $store.getters.applyRegionAgentStatus" type="danger" absolute
						:scale-ratio="0.8" translate-x="40%" top="-8rpx" right="44rpx"
					>
						{{ $store.getters.applyRegionAgentStatus }}
					</tui-badge>
					<tui-badge
						v-if="menu.name === '申请团长' && $store.getters.regimentalCommanderStatus" type="danger" absolute
						:scale-ratio="0.8" translate-x="40%" top="-8rpx" right="24rpx"
					>
						{{ $store.getters.regimentalCommanderStatus | mapStatus }}
					</tui-badge>
					<tui-badge
						v-show="menu.name === '购物车' && $store.getters.shopCarNumber" type="danger" right="50rpx" absolute
						:scale-ratio="0.8" translate-x="40%" top="-8rpx"
					>
						{{ $store.getters.shopCarNumber || 0 }}
					</tui-badge>
					<tui-badge
						v-show="menu.name === '收藏' && $store.getters.historyInfo.collection" type="danger" absolute :scale-ratio="0.8"
						translate-x="40%" top="-8rpx" right="50rpx"
					>
						{{ $store.getters.historyInfo.collection || 0 }}
					</tui-badge>
					<tui-badge
						v-show="menu.name === '足迹' && $store.getters.historyInfo.footPrint" type="danger" absolute :scale-ratio="0.8"
						translate-x="40%" top="-8rpx" right="50rpx"
					>
						{{ $store.getters.historyInfo.footPrint || 0 }}
					</tui-badge>
					<tui-badge
						v-show="menu.name === '订阅' && $store.getters.historyInfo.follow" type="danger" absolute :scale-ratio="0.8"
						translate-x="40%" top="-8rpx" right="50rpx"
					>
						{{ $store.getters.historyInfo.follow || 0 }}
					</tui-badge>
				</view>
				<view v-for="menu in specialPane.filter(item => item.name === '股东看板')" :key="menu.name" class="item" @click="$emit('menu-click', menu)">
					<BeeIcon
						v-if="menu.iconUrl || menu.icon" :size="32"
						:src="menu.iconUrl ? common.seamingImgUrl(menu.iconUrl) : menu.icon"
					></BeeIcon>
					<text class="menu-name">{{ menu.name }}</text>
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
import { mapGroupStatus } from '../data'
export default {
	name: 'Pane',
	filters: {
		mapStatus(status) {
			return mapGroupStatus(status)
		}
	},
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
			renderMenu: []
		}
	},

	computed: {
	},
	watch: {
		menuData: {
			handler(newVal) {
				newVal.forEach((item) => {
					if (item.name === '股东看板') {
						if (this.$store.getters.userInfo && this.$store.getters.userInfo.shareholderType === 1) this.specialPane.push(item)
					} else {
						this.renderMenu.push(item)
					}
				})
			},
			immediate: true,
			deep: true
		}
	},

	beforeMount() {
		// console.log(this.menuData)
	},
	created() {
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
		align-items: center;
		justify-content: flex-start;
		flex-wrap: wrap;
		width: 100%;

		.item {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			width: 25%;
			margin-top: 28upx;
			transition: 350ms all;
			border-radius: 4px;

			&:active {
				background-color: #f0f0f0;
			}

			.menu-name {
				font-size: 28rpx;
				line-height: 51rpx;
				color: #3D3D3D;
			}
		}
	}
}
</style>
