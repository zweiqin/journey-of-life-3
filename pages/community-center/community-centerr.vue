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
		</view>

		<!-- vip -->
		<view class="vip-container">
			<view class="left" @click="go('/community-center/vip-center/vip-detail?type=1')">
				<image class="vip-39" src="../../static/images/con-center/39.png" mode="" />
				<!-- <image src="../../static/images/con-center/p.png" mode="" class="p" /> -->
				<!-- <image src="../../static/images/con-center/hezi.png" mode="" class="hezi" /> -->
				<view class="money">￥{{ serverType == 2 ? serverPrice : 39.9 }}</view>
				<view class="name">{{ serverType == 2 ? serverName : '清洁套餐' }}</view>
				<image src="../../static/images/con-center/arrow.png" mode="" class="arrow" />
			</view>
			<view class="right">
				<view class="vip-299" @click="go('/community-center/vip-center/vip-detail?type=2')">
					<image src="../../static/images/con-center/299.png" mode="" />
					<view class="money">￥{{ serverType == 1 ? serverPrice : 299 }}</view>
					<view class="name">{{ serverType == 1 ? serverName : '全年金管家套餐' }}</view>
					<image src="../../static/images/con-center/starflash.png" mode="" class="animate__animated animate__fadeIn" />
				</view>
				<view class="vip-1399" mode="" @click="empty('套餐升级中')">
					<image src="../../static/images/con-center/1399.png" />
					<view class="money">￥{{ 1399 }}</view>
					<view class="name">{{ '全年清洁套餐' }}</view>
				</view>
			</view>
		</view>

		<!-- 社区店 -->
		<ServiceStationPane></ServiceStationPane>

		<!-- #ifdef H5 -->
		<!-- 经验分享 -->
		<ArticleList></ArticleList>
		<!-- #endif -->


		<!-- 组件支持 -->
		<tui-toast ref="toast"></tui-toast>


		<PopupInformation popup-type="activity" :imgUrl="url" v-if="isShowPic"
			@click="go('/community-center/vip-center/vip-detail?type=2')">
		</PopupInformation>

		<!-- #ifdef APP -->
		<CheckedVersion ref="checkedVersion"></CheckedVersion>
		<!-- #endif -->
	</view>
</template>

<script>
import { getAdressDetailByLngLat } from '../../utils/DWHutils'
import { queryDynamicDataApi } from '../../api/address'
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
			bannerListIcon: Object.freeze(bannerListIcon),
			data: [],
			url: '',
			isShowPic: false,
			serverPrice: '',
			serverName: '',
			serverType: '',
		}
	},
	methods: {

		//获取当前定位
		async getIsOpenServerArea() {
			const _this = this
			uni.getLocation({
				type: 'gcj02',
				success: function (res) {
					getAdressDetailByLngLat(res.latitude, res.longitude).then(res => {
						if (res.status === '1') {
							const result = res.regeocode
							// _this.addressDetail = result.addressComponent.township

							_this.address =
								result.addressComponent.province +
								result.addressComponent.city +
								result.addressComponent.district +
								result.addressComponent.township
							console.log('address', _this.address);

							if (_this.address) {
								_this.queryDynamicData()
								_this.queryDynamicMemberData()
							}
						}
					})
				},
			})
		},


		//根据地址动态查询首页海报弹窗套餐
		async queryDynamicData() {
			const res = await queryDynamicDataApi({
				address: this.address,
				correspondType: 4
			})
			console.log('res', res);

			this.data = res.data
			console.log('弹窗套餐', this.data);

			this.url = this.data[0].url
			console.log('弹窗图片', this.url);

			if (res.statusCode === 20000) {
				console.log('statusCode', res.statusCode);
				this.isShowPic = true
			}

		},

		//根据地址动态查询会员套餐
		async queryDynamicMemberData() {
			const res = await queryDynamicDataApi({
				address: this.address,
				correspondType: 2
			})
			this.memberData = res.data
			console.log('会员套餐', this.memberData);

			this.serverType = this.memberData[0].serverType
			console.log('serverType', this.serverType);

			this.serverPrice = this.memberData[0].serverPrice
			this.serverName = this.memberData[0].serverName


		},

	},
	onShow() {
		uni.removeStorageSync(COMMUNITY_ORDER_NO);

	},
	mounted() {
		// #ifdef APP
		this.$refs.checkedVersion.checkedVersion(true)
		// #endif

		// #ifdef H5
		if (window.location.href.includes('?code')) {
			window.location.href =
				window.location.origin + window.location.pathname
		}
		// #endif
	},
	onLoad(options) {

		this.getIsOpenServerArea()



	}

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


	}

	.vip-container {
		display: flex;
		justify-content: center;
		height: 320upx;
		margin-top: 300upx;

		image {
			flex-shrink: 0;
		}

		.left {
			position: relative;

			.vip-39 {
				width: 340upx;
				height: 320upx;
				margin-right: 20upx;
			}

			.p {
				width: 204upx;
				height: 158upx;
				position: absolute;
				top: 132upx;
				left: 114upx;
			}

			.hezi {
				width: 350upx;
				height: 320upx;
				position: absolute;
				top: 0upx;
				left: -10upx;
			}


			.money {
				font-size: 48upx;
				font-weight: 900;
				line-height: 72upx;
				color: #FFFFFF;
				position: absolute;
				top: 40upx;
				left: 24upx;
			}

			.name {
				font-size: 32upx;
				color: #FFFFFF;
				position: absolute;
				top: 116upx;
				left: 30upx;
			}

			.arrow {
				width: 48upx;
				height: 48upx;
				position: absolute;
				bottom: 40upx;
				left: 30upx;
			}

		}

		.right {
			height: 320upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-direction: column;

			.vip-299 {
				position: relative;
				width: 320upx;
				height: 150upx;

				image {
					width: 320upx;
					height: 150upx;
				}

				.money {
					font-size: 36upx;
					font-weight: bold;
					line-height: 54upx;
					color: #FD4D00;
					position: absolute;
					top: 26upx;
					left: 30upx;
				}

				.name {
					font-size: 28upx;
					line-height: 42upx;
					color: #000000;
					position: absolute;
					bottom: 26upx;
					left: 30upx;
				}

				.animate__animated.animate__fadeIn {
					width: 50upx;
					height: 52upx;
					position: absolute;
					top: 22upx;
					left: 140upx;
					animation-iteration-count: infinite;
					animation-duration: 500ms;
				}
			}

			.vip-1399 {
				position: relative;
				width: 320upx;
				height: 150upx;

				image {
					width: 320upx;
					height: 150upx;
				}

				.money {
					font-size: 36upx;
					font-weight: bold;
					line-height: 54upx;
					color: #2DBDE5;
					position: absolute;
					top: 26upx;
					left: 30upx;
				}

				.name {
					font-size: 28upx;
					line-height: 42upx;
					color: #000000;
					position: absolute;
					bottom: 26upx;
					left: 30upx;
				}
			}


		}
	}
}
</style>
