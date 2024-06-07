<template>
	<view class="business-district-container">
		<!-- 头部导航 -->
		<view style="position: relative;z-index: 999;">
			<view
				style="position: relative;z-index: 997;padding: 42rpx 26rpx 0;margin: 0 -26rpx 0;"
				:style="{ backgroundColor: filterOpened ? '#ffffff' : 'transparent' }"
			>
				<PageHead
					:is-input="filterOpened" @input="(e) => queryParam.search = e"
					@search="(e) => ((queryParam.search = e) && $refs.refStorePrimaryFilterBox.handleCloseDropdown()) || getBrandList()"
				>
				</PageHead>
			</view>

			<!-- 菜单 -->
			<NavBar ref="refNavBar" @view="handleToDetail"></NavBar>

			<!-- bar -->
			<AdvertisementBar></AdvertisementBar>

			<!-- package -->
			<!-- <ActivityPackage></ActivityPackage> -->

			<!-- 首要标签筛选框 -->
			<view style="padding: 12rpx 52rpx;margin: 24rpx -26rpx 0;background-color: #ffffff;">
				<StorePrimaryFilterBox
					ref="refStorePrimaryFilterBox" :parent-classify-id="queryParam.classifyId" is-bold-icon
					is-first-class dropdown-padding="6rpx 36rpx 0"
					:translatey="(systermInfo.statusBarHeight || 0) + 108" @select="handleSelectPrimaryFilter"
					@open="filterOpened = true" @close="filterOpened = false"
				></StorePrimaryFilterBox>
			</view>
		</view>

		<!-- 商家列表 -->
		<view style="margin-top: 16rpx;">
			<!-- <view style="padding-top: 20rpx;">
				<tui-waterfall :list-data="$data._list" :type="2" :page-size="queryParam.pageSize">
				<template #left="{ entity }">
				<view style="width: 338rpx;">
				<BrandShop :brand-info="entity"></BrandShop>
				</view>
				</template>
				<template #right="{ entity }">
				<view style="width: 338rpx;">
				<BrandShop :brand-info="entity"></BrandShop>
				</view>
				</template>
				</tui-waterfall>
				</view> -->
			<view v-if="$data._list && $data._list.length">
				<ATFCommonShop
					v-for="shop in $data._list" :key="shop.shopId" :shop-info="shop" margin="22rpx 0"
					radius="20rpx"
					pic-width="222rpx" pic-height="222rpx" show-sign
				></ATFCommonShop>
			</view>
			<view style="padding-bottom: 45rpx;">
				<LoadingMore
					:status="!$data._isEmpty && !$data._list.length
						? 'loading' : !$data._isEmpty && $data._list.length && ($data._list.length >= $data._listTotal) ? 'no-more' : ''"
				>
				</LoadingMore>
				<tui-no-data v-if="$data._isEmpty" :fixed="false" style="margin-top: 60rpx;">暂无数据</tui-no-data>
			</view>
		</view>

		<tui-toast ref="toast"></tui-toast>

		<DragButton
			:z-index="999" text="联系客服" is-dock exist-tab-bar
			@btnClick="go('/another-tf/another-user/chat/chat-detail?chat=serviceAssistant')"
		>
		</DragButton>
	</view>
</template>

<script>
import { mapGetters } from 'vuex'
import loadData from '../../mixin/loadData'

import PageHead from './components/PageHead.vue'
import NavBar from './components/NavBar.vue'
import AdvertisementBar from './components/AdvertisementBar.vue'
import ActivityPackage from './components/ActivityPackage.vue'
import StorePrimaryFilterBox from '../../another-tf/another-user/shop/components/StorePrimaryFilterBox.vue'
// import BrandShop from './components/BrandShop.vue'
import { getHomeBrandListApi } from '../../api/anotherTFInterface'
import { getAdressDetailByLngLat } from '../../utils'

export default {
	name: 'BusinessDistrict',
	components: {
		PageHead,
		NavBar,
		AdvertisementBar,
		ActivityPackage,
		StorePrimaryFilterBox
		// BrandShop,
	},
	mixins: [
		loadData({
			api: getHomeBrandListApi,
			mapKey: {
				list: 'list',
				listTotal: 'total',
				pageSize: 'pageSize'
			},
			callingcb: true,
			dataFn(data) {
				const ignoreBrandList = [ 'xxx' ]
				return data.filter((item) => !ignoreBrandList.includes(item.name))
			}
		})
	],
	data() {
		return {
			isPositioning: true,
			queryParam: {
				search: '',
				classifyId: '',
				distance: '9999999999',
				type: '',
				volume: ''
			},
			filterOpened: false,
			currentClassifyId: ''
		}
	},
	async onShow() {
		// if (this.$data._list.length && (this.$data._list.length <= this.queryParam.pageSize)) { // 针对初次渲染完成前切换到其它页面导致瀑布流只有单列的问题
		// 	const currentAddress = await getCurrentLocation() // 注意APP端的隐私合规检测问题
		// 	const res = await getHomeBrandListApi({ pageNo: 1, pageSize: this.queryParam.pageNo * this.queryParam.pageSize, address: currentAddress + '' })
		// 	if (res.statusCode === 20000) {
		// 		if (res.data) {
		// 			this.$data._list = res.data.data
		// 		}
		// 	}
		// }
		this.$nextTick(() => {
			this.$refs.refNavBar && this.$refs.refNavBar.handleGetShopCategory()
		})
	},
	onLoad() {
		this.getBrandList()
		uni.$on('sendStoreDetailMsg', (data) => {
			if (data.data.meaning === 'refreshCurrentData') {
				if (!this.isPositioning) {
					// uni.showLoading()
					getHomeBrandListApi({
						page: 1,
						pageSize: this.$data._query.page * this.$data._query.pageSize,
						...this.queryParam,
						classifyId: this.currentClassifyId || this.queryParam.classifyId,
						areaId: this.$store.state.location.locationInfo.adcode,
						longitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[0],
						latitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[1]
					})
						.then(({ data }) => {
							console.log(data)
							this.$data._list = data.list || []
							// uni.hideLoading()
						})
						.catch(() => {
							// uni.hideLoading()
						})
				}
			}
		})
		uni.$on('sendChooseAddressSuccessMsg', (data) => {
			this.$data._query.page = 1
			this.getBrandList()
		})
	},
	computed: {
		...mapGetters(['obtainLocationCount', 'systermInfo'])
	},
	watch: {
		obtainLocationCount(val, oldVal) {
			const pages = getCurrentPages()
			if (pages[pages.length - 1].route === 'pages/business-district/business-district') (this.$data._query.page = 1) && this.getBrandList()
		}
	},
	methods: {
		getBrandList() {
			// #ifdef H5
			if (!this.$store.getters.obtainLocationCount) {
				const tempTime = Date.now()
				const queryLocation = { longitude: '', latitude: '' }
				uni.getLocation({
					type: 'gcj02',
					highAccuracyExpireTime: 1000,
					success: (result) => {
						queryLocation.longitude = result.longitude
						queryLocation.latitude = result.latitude
						console.log(result)
						getAdressDetailByLngLat(queryLocation.latitude, queryLocation.longitude)
							.then((res) => {
								if (res.status === '1') {
									this.$data._query = {
										...this.$data._query,
										...this.queryParam,
										classifyId: this.currentClassifyId || this.queryParam.classifyId,
										areaId: typeof res.regeocode.addressComponent.adcode === 'object' ? '' : res.regeocode.addressComponent.adcode,
										...queryLocation
									}
									if ((Date.now() - tempTime) >= 1000) {
										this._loadData(null, () => this.isPositioning = true)
									} else {
										this._loadData(null, () => this.isPositioning = false)
									}
								} else {
									this.$showToast('查询失败')
								}
							})
							.catch(() => {
								this.$showToast('查询失败')
							})
					},
					fail: () => {
						this.$data._query = {
							...this.$data._query,
							...this.queryParam,
							classifyId: this.currentClassifyId || this.queryParam.classifyId,
							areaId: this.$store.state.location.locationInfo.adcode,
							longitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[0],
							latitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[1]
						}
						this._loadData()
					}
				})
			} else {
				this.$data._query = {
					...this.$data._query,
					...this.queryParam,
					classifyId: this.currentClassifyId || this.queryParam.classifyId,
					areaId: this.$store.state.location.locationInfo.adcode,
					longitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[0],
					latitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[1]
				// areaId: 440606,
				// longitude: 113.293719,
				// latitude: 22.803751
				}
				this._loadData(null, () => this.isPositioning = false)
			}
			// #endif

			// #ifdef APP
			this.$data._query = {
				...this.$data._query,
				...this.queryParam,
				classifyId: this.currentClassifyId || this.queryParam.classifyId,
				areaId: this.$store.state.location.locationInfo.adcode,
				longitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[0],
				latitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[1]
			}
			this._loadData(null, () => this.isPositioning = false)
			// #endif
		},

		handleSelectPrimaryFilter(e) {
			console.log(e)
			this.currentClassifyId = e.currentClassifyId || ''
			this.queryParam.distance = e.distance * 1000 || '9999999999'
			this.queryParam.type = e.type || ''
			this.queryParam.volume = e.volume || ''
			this.$data._query.page = 1
			this.getBrandList()
		},

		// 点击常看详情
		handleToDetail(item) {
			if (!item.type) return this.empty() // 特殊图标或图标名称对应不上就跳不了页面
			uni.navigateTo({ url: `/another-tf/another-user/shop/shop-enter?type=${item.type || ''}&id=${item.id || ''}` })
		}
	},
	onPullDownRefresh() {
		this.$data._query.page = 1
		this.$data._list = []
		this.$data._listTotal = 0
		this.$data._isEmpty = false
		this.getBrandList()
		uni.stopPullDownRefresh()
	}

}
</script>

<style lang="less" scoped>
.business-district-container {
	min-height: 100vh;
	background-color: #f6f6f6;
	padding: 0 26rpx 140rpx;
	box-sizing: border-box;

}
</style>
