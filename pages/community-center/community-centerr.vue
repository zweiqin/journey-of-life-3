<template>
	<view class="community-center-container">
		<!-- 顶部搜索 -->
		<TopHead></TopHead>

		<!-- 主要menu区域 -->
		<view class="main-menu">
			<!-- 团蜂家具社区服务中心 -->
			<TuanImage radius="0" :height="36" :width="257" style="margin-left: 28upx"
				:src="require('../../static/images/con-center/new-home/top-banner.png')"></TuanImage>

			<!-- 五个介绍 -->
			<view class="icons-wrapper">
				<view v-for="item in bannerListIcon" :key="item.name" class="item">
					<TuanIcon :size="30" :src="item.icon"></TuanIcon>
					<text class="name">{{ item.name }}</text>
				</view>
			</view>

			<!-- 右边的小人 -->
			<view class="person-wrapper">
				<TuanImage :width="104" :height="149" :src="require('../../static/images/con-center/new-home/person.png')">
				</TuanImage>
			</view>

			<!-- 主要的menu区域 -->
			<MainMenu></MainMenu>

			<view>
				<!-- vip -->
				<view class="vip-container">
					<image class="vip-39" src="../../static/images/con-center/new-home/39.9.png" mode=""
						@click="go('/community-center/vip-center/vip-detail?type=1')" />
					<view class="right">
						<image src="../../static/images/con-center/new-home/299.png" mode=""
							@click="go('/community-center/vip-center/vip-detail?type=2')" />
						<image src="../../static/images/con-center/new-home/1399.png" mode="" @click="empty('套餐升级中')" />
					</view>
				</view>

				<!-- 社区店 -->
				<ServiceStationPane></ServiceStationPane>

				<!-- 经验分享 -->
				<ArticleList></ArticleList>
			</view>
		</view>

		<!-- 组件支持 -->
		<tui-toast ref="toast"></tui-toast>

		<PopupInformation popup-type="activity" @click="go('/community-center/vip-center/vip-detail?type=2')">
		</PopupInformation>

		<!-- #ifdef APP -->
		<CheckedVersion ref="checkedVersion"></CheckedVersion>
		<!-- #endif -->
	</view>
</template>

<script>
import TopHead from './cpns/TopHead.vue'
import MainMenu from './cpns/MainMenu.vue'
import { bannerListIcon } from './config'
import ServiceStationPane from './cpns/ServiceStationPane.vue'
import ArticleList from './cpns/Article.vue'
import PopupInformation from '../../components/popup-information/popup-information'
import { COMMUNITY_ORDER_NO } from '../../constant'

export default {
	components: { TopHead, MainMenu, ServiceStationPane, ArticleList, PopupInformation },
	data() {
		return {
			bannerListIcon: Object.freeze(bannerListIcon)
		}
	},
	onShow() {
		uni.removeStorageSync(COMMUNITY_ORDER_NO);
	},
	mounted() {
		// #ifdef APP
		this.$refs.checkedVersion.checkedVersion(true)
		// #endif
	},
}
</script>

<style lang="less" scoped>
.community-center-container {
	min-height: 100vh;
	background-color: #F8F8F8;

	.main-menu {
		position: relative;
		width: 100%;
		height: 938upx;
		background: linear-gradient(180deg, #E95D20 0%, #FF8F1F 56%, #F8F8F8);
		padding: 68upx 34upx 0;
		box-sizing: border-box;

		.icons-wrapper {
			margin-left: 34upx;
			display: flex;
			align-items: center;
			margin-top: 32upx;

			.item {
				margin-right: 40upx;

				text {
					font-size: 28upx;
					color: #fff;
				}
			}

		}

		.person-wrapper {
			position: absolute;
			top: 40upx;
			right: 8upx;
		}

		.vip-container {
			display: flex;
			height: 320upx;
			margin-top: 200upx;

			image {
				flex-shrink: 0;
			}

			.vip-39 {
				width: 340upx;
				height: 320upx;
				margin-right: 20upx;
			}

			.right {
				height: 320upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-direction: column;

				image {
					width: 320upx;
					height: 150upx;
				}
			}
		}
	}
}
</style>
