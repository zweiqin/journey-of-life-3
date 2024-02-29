<template>
	<view class="service-sort">
		<!--顶部-->
		<view class="head">
			<view class="search-bar">
				<!--定位-->
				<view class="location">
					<!-- #ifdef H5 -->
					<tui-icon :size="48" unit="rpx" color="#000000" name="arrowleft" margin="0" @click="handleBack"></tui-icon>
					<!-- #endif -->
					<TuanLocation>
						<text class="locale">{{
							$store.getters.currentCity || '定位失败'
						}}</text>
					</TuanLocation>
					<tui-icon :size="32" unit="rpx" color="#000000" name="turningdown" margin="0" @click="handleClick"></tui-icon>
				</view>
				<!--搜索栏-->
				<view class="search-box" @click="goToSearch">
					<view class="search">
						<tui-icon :size="30" unit="rpx" color="#000000" name="search" margin="0"></tui-icon>
					</view>
					<input confirm-type="search" type="text" class="content" placeholder="搜索社区服务，一站式解决家居问题" />
				</view>
			</view>
		</view>
		<!--中间区域-->
		<view class="body" :style="{ height: scrollHeight + 'px' }">
			<!--左边导航栏一级分类-->
			<view class="navbar" ref="nav-barRef">
				<view class="item" v-for="item in navbar" :class="{ active: item.id === currentTab }" :key="item.serverNameOne"
					@click="switchTab(item.id)">{{ item.serverNameOne }}</view>
			</view>
			<!--二三级分类-->
			<view class="main">
				<view class="mid">
					<scroll-view scroll-y="true" @scroll="scroll" :style="{ height: scrollHeight + 'px' }">
						<block v-if="sort && sort.children">
							<sort v-for="item1 in sort.children" :key="item1.id" :serverNameTwo="item1.serverNameTwo" :id="item1.id"
								:pid="item1.pid" :detailList="item1.children" :tips="tips" :scrollTop="scrollTop">
							</sort>
						</block>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getServiceSortApi } from '../api/community-center'
import { getSearchDataApi } from '../api/community-center'
import sort from '../community-center/componts'
import { getAdressDetailByLngLat } from '../utils'
import { getIsOpenServerAreaApi } from '../api/community-center'
export default {
	name: 'Service-sort',
	components: {
		sort,
	},
	// mounted() {
	//   this.getLocation();
	// },
	props: {},
	data() {
		return {
			navbar: [],
			currentTab: '',
			sort: [],
			id: '',
			serverNameOne: '',
			address: '',
			scrollHeight: 667,
			tips: '',
			addressDetail: '',
			candidates: [],
			city: '',
			searchName: '',
			scrollTop: 0,
		}
	},
	methods: {

		scroll(e) {
			console.log(e);
			this.scrollTop = e.detail.scrollTop;
			console.log('滚动距离为：', this.scrollTop);
		},

		switchTab(index) {
			this.currentTab = index
			this.sort = this.data.find(item => item.id === index)
		},

		inoutWatcher(e) {
			// this.searchName = e;
			// this.getSearchData();
		},

		goToSearch() {
			uni.navigateTo({ url: '/community-center/search' })
		},

		// handleBack() {
		//   uni.navigateBack();
		// },

		handleBack() {
			uni.switchTab({ url: '/pages/community-center/community-centerr' })
		},

		handleClick() {
			const _this = this
			if (
				this.addressDetail === '定位失败' ||
				this.addressDetail === '定位中...'
			) {
				uni.showModal({
					title: '提示',
					confirmText: '我已打开定位',
					content: '请确认您已开启了定位',
					success: function (res) {
						if (res.confirm) {
							_this.getLocation()
						}
					},
				})
			}
		},

		async a() {
			const res = await getIsOpenServerAreaApi({
				address: this.address,
			})

			this.tips = res.data
		},

		//查询社区服务分类接口
		async getServiceSort() {
			const res = await getServiceSortApi({})

			this.navbar = res.data
			console.log(res.data.flat(Infinity))
			this.sort = res.data[0]
			this.data = res.data
			this.sort = this.data.find(item => item.id === this.currentTab)
		},

		//搜索查询接口
		async getSearchData() {
			const res = await getSearchDataApi({
				searchName: this.searchName,
			})

			this.candidates = res.data.map(item => item.serverTypeName)
		},

		//根据用户地址判断该区域是否开通了站长
		async getIsOpenServerArea() {
			this.addressDetail = '定位中...'
			const _this = this
			// #ifdef H5
			uni.getLocation({
				type: 'gcj02',
				success: function (res) {
					getAdressDetailByLngLat(res.latitude, res.longitude).then(res => {
						if (res.status === '1') {
							const result = res.regeocode
							_this.addressDetail = result.addressComponent.township

							_this.address =
								result.addressComponent.province +
								result.addressComponent.city +
								result.addressComponent.district

							_this.a()
						}
					})
				},
			})
			// #endif

			// #ifdef APP
			const locationInfo = this.$store.state.location
			this.address = locationInfo.locationInfo.province + locationInfo.locationInfo.city + locationInfo.locationInfo.district
			this.addressDetail = locationInfo.locationInfo.township
			this.a()
			// #endif
		},


	},
	mounted() { },
	onShow() {
		//滚动条
		uni.getStorage({
			key: "listTop",
			success: (res) => {
				if (!isNaN(res.data)) {
					var lefts = uni.pageScrollTo({
						scrollTop: res.data,
						duration: 0
					})
				}
			}
		})
	},
	onUnload() {
		uni.setStorage({
			key: "listTop",
			data: 0
		})
	},
	onLoad(options) {
		this.currentTab = options.value * 1

		this.getServiceSort()
		this.getIsOpenServerArea()
		// this.getSearchData()
		const _this = this
		uni.getSystemInfo({
			success(res) {
				_this.scrollHeight = res.safeArea.height - 60
			},
		})

		// const _this = this;
	},
}
</script>

<style lang="less" scoped>
uni-page-body {
	overflow: hidden;
	height: auto;
}

.service-sort {
	.head {
		width: 100%;
		height: 120upx;
		line-height: 120upx;
		background: #ffffff;
		padding-left: 16upx;
		padding-right: 26upx;
		box-sizing: border-box;

		// position: fixed;
		.search-bar {
			width: 100%;
			// left: 3%;
			// top: 80upx;
			display: flex;
			align-items: center;

			.location {
				display: flex;
				align-items: center;
				// margin: 0 20upx;
				margin-right: 5px;

				.return {
					width: 48upx;
					height: 48upx;
				}

				.text {
					font-size: 32upx;
					font-weight: bold;
					color: #3d3d3d;
				}

				.show {
					width: 32upx;
					height: 32upx;
				}
			}

			.search-box {
				padding: 0upx 16upx;
				display: flex;
				flex: 1;
				align-items: center;
				width: 540upx;
				height: 74upx;
				border-radius: 100upx;
				background: #f1f2f6;

				.search {
					width: 48upx;
					height: 74upx;
					line-height: 74upx;
					display: flex;
					justify-content: center;
					align-items: center;

					.img {
						width: 30upx;
						height: 30upx;
					}
				}

				.content {
					padding-left: 14upx;
					flex: 1;
					font-size: 24upx;
					font-weight: 400;
					color: #3d3d3d;
					border-left: 2upx solid #d8d8d8;
				}
			}

			.example-body {
				background: #f1f2f6;
				border-radius: 100upx;
			}
		}
	}

	.body {
		display: flex;
		overflow: scroll;
		overflow: scroll;

		.navbar {
			// margin-top: 28upx;
			width: 22%;
			display: flex;
			flex-direction: column;
			align-items: center;
			overflow: scroll;

			&::-webkit-scrollbar {
				display: none;
			}

			.item {
				width: 130upx;
				height: 52upx;
				border-radius: 10upx;
				font-size: 28upx;
				font-weight: 500;
				color: #3d3d3d;
				text-align: center;
				line-height: 52upx;
				margin-bottom: 62upx;
				transition: all 100ms;

				&.active {
					background: linear-gradient(270deg, #e95d20 0%, #faae63 99%);
					color: #ffffff;
				}
			}
		}

		display: flex;

		.main {
			width: 78%;
			border-radius: 10upx 0upx 0upx 0upx;
			background: #f1f2f6;
			overflow: scroll;

			&::-webkit-scrollbar {
				display: none;
			}

			// position: fixed;
			// right: 0upx;
			// top: 172upx;
			.mid {
				margin: 18upx 0upx 0upx 12upx;
				border-radius: 10upx 0upx 0upx 0upx;
				background: #ffffff;
			}
		}
	}
}
</style>
