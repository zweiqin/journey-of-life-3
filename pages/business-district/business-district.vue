<template>
	<view class="business-district-container">
		<!-- 头部导航 -->
		<PageHead></PageHead>

		<!-- 菜单 -->
		<NavBar @view="handleToDetail"></NavBar>

		<!-- 福利 -->
		<WelfareBar></WelfareBar>

		<!-- bar -->
		<AdvertisementBar></AdvertisementBar>

		<!-- package -->
		<ActivityPackage :scroll-top="scrollTop"></ActivityPackage>

		<!-- 商家详情 -->
		<view class="brand-shop-caontainer">

			<view style="margin-top: 20upx;">
				<tui-waterfall :list-data="nearbyShopList" :type="2" :page-size="queryInfo.pageSize">
					<template #left="{ entity }">
						<view style="width: 338upx;">
							<BrandShop :brand-info="entity"></BrandShop>
						</view>
					</template>
					<template #right="{ entity }">
						<view style="width: 338upx;">
							<BrandShop :brand-info="entity"></BrandShop>
						</view>
					</template>
				</tui-waterfall>
			</view>

			<LoadingMore v-show="loadingStatus !== 'more' && !isGetAddress" :status="loadingStatus"></LoadingMore>

			<!-- <view class="no-adddres" v-show="loadingStatus !== 'more' && queryInfo.address">
				<LoadingMore :status="loadingStatus"></LoadingMore>
				<view>正在搜索您附近的商家...</view>
				</view> -->
		</view>

		<tui-toast ref="toast"></tui-toast>
	</view>
</template>

<script>
import PageHead from './components/PageHead.vue'
import NavBar from './components/NavBar.vue'
import WelfareBar from './components/WelfareBar.vue'
import AdvertisementBar from './components/AdvertisementBar.vue'
import ActivityPackage from './components/ActivityPackage.vue'
import BrandShop from './components/BrandShop.vue'

import { getNearByShopListApi } from '../../api/community-center'
import { getShopCategoryLevelApi } from '../../api/anotherTFInterface'
import { getCurrentLocation } from '../../utils'

export default {
	name: 'BusinessDistrict',
	components: { PageHead, NavBar, WelfareBar, AdvertisementBar, ActivityPackage, BrandShop },
	data() {
		return {
			isGetAddress: false,
			loadingStatus: 'more',
			nearbyTotalPages: 0,
			nearbyShopList: [],
			scrollTop: 0,
			queryInfo: {
				pageNo: 1,
				pageSize: 10,
				address: ''
			}
		}
	},
	async onShow() {
		if (this.nearbyShopList.length && (this.nearbyShopList.length <= this.queryInfo.pageSize)) { // 针对初次渲染完成前切换到其它页面导致瀑布流只有单列的问题
			const currentAddress = await getCurrentLocation()
			const res = await getNearByShopListApi({ pageNo: 1, pageSize: this.queryInfo.pageNo * this.queryInfo.pageSize, address: currentAddress + '' })
			if (res.statusCode === 20000) {
				if (res.data) {
					this.nearbyShopList = res.data.data
				}
			}
		}
	},
	onLoad() {
		this.init()
	},
	methods: {
		init() {
			uni.stopPullDownRefresh()
			this.getNearByShopList(true)
		},

		async getNearByShopList(isClear) {
			if (isClear) {
				this.queryInfo.pageNo = 1
				this.nearbyShopList = []
			}
			try {
				this.loadingStatus = 'loading'
				this.isGetAddress = true
				const currentAddress = await getCurrentLocation()
				this.isGetAddress = false
				this.queryInfo.address = currentAddress + ''
				const res = await getNearByShopListApi(this.queryInfo)
				if (res.statusCode === 20000) {
					if (res.data) {
						if (isClear) {
							this.nearbyShopList = res.data.data
						} else {
							this.nearbyShopList = [...this.nearbyShopList, ...res.data.data]
						}
						this.nearbyTotalPages = res.data.pages
					} else {
						this.nearbyShopList = []
						this.nearbyTotalPages = 0
					}
				} else {
					// this.ttoast({
					//   type: 'fail',
					//   title: '附近商家获取失败',
					//   content: res.statusMsg
					// });
				}
			} catch (error) {
				// this.ttoast({
				//   type: 'fail',
				//   title: error || '未知错误'
				// });
			} finally {
				this.loadingStatus = 'more'
			}
		},

		// 点击常看详情
		handleToDetail(item) {
			const { type } = item
			if (!type) return this.empty() // 特殊图标或图标名称对应不上就跳不了页面
			uni.navigateTo({ url: `/community-center/shop/shop-enter?type=${item.type}&id=${item.id}` })
		}
	},
	onPullDownRefresh() {
		this.init()
	},

	onPageScroll(e) {
		this.scrollTop = e.scrollTop
	},

	onReachBottom() {
		if (this.nearbyShopList.length < this.queryInfo.pageSize) {
			return
		}
		if (this.queryInfo.pageNo >= this.nearbyTotalPages) {
			return this.loadingStatus = 'no-more'
		}
		this.queryInfo.pageNo++
		this.getNearByShopList()
	}
}
</script>

<style lang="less" scoped>
.business-district-container {
	min-height: 100vh;
	background-color: #f6f6f6;
	padding: 40upx 26upx 140upx;
	box-sizing: border-box;

	.brand-shop-caontainer {
		margin-top: 24upx;

	}

	.no-adddres {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		height: 300upx;
		background-color: #fff;
		font-size: 28upx;
		color: #ccc;
	}
}
</style>
