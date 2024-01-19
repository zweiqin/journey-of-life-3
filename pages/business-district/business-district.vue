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
		<ActivityPackage></ActivityPackage>

		<!-- 商家列表 -->
		<view>
			<!-- <view style="padding-top: 20upx;">
				<tui-waterfall :list-data="$data._list" :type="2" :page-size="queryParam.pageSize">
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
				</view> -->
			<view>
				<ATFCommonShop
					v-for="shop in $data._list" :key="shop.shop_id" :shop-info="shop" margin="22upx 0"
					radius="20upx"
					pic-width="222upx" pic-height="222upx" show-sign
				></ATFCommonShop>
			</view>
			<view style="padding-bottom: 45upx;">
				<LoadingMore
					:status="!$data._isEmpty && !$data._list.length
						? 'loading' : !$data._isEmpty && $data._list.length && ($data._list.length >= $data._listTotal) ? 'no-more' : ''"
				>
				</LoadingMore>
				<tui-no-data v-if="$data._isEmpty" :fixed="false" style="margin-top: 60upx;">暂无数据</tui-no-data>
			</view>
		</view>

		<tui-toast ref="toast"></tui-toast>

		<DragButton
			text="联系客服" is-dock exist-tab-bar
			@btnClick="$store.dispatch('app/getCustomerServiceAction', { isToService: true })"
		>
		</DragButton>
	</view>
</template>

<script>
import { mapGetters } from 'vuex'
import loadData from '../../mixin/loadData'

import PageHead from './components/PageHead.vue'
import NavBar from './components/NavBar.vue'
import WelfareBar from './components/WelfareBar.vue'
import AdvertisementBar from './components/AdvertisementBar.vue'
import ActivityPackage from './components/ActivityPackage.vue'
// import BrandShop from './components/BrandShop.vue'
import { getHomeBrandListApi } from '../../api/anotherTFInterface'
import { getAdressDetailByLngLat } from '../../utils'

export default {
	name: 'BusinessDistrict',
	components: {
		PageHead,
		NavBar,
		WelfareBar,
		AdvertisementBar,
		ActivityPackage,
		// BrandShop,
	},
	data() {
		return {
			isPositioning: true,
			queryParam: {
				search: '',
				classifyId: ''
			}
		}
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
	async onShow() {
		// if (this.$data._list.length && (this.$data._list.length <= this.queryParam.pageSize)) { // 针对初次渲染完成前切换到其它页面导致瀑布流只有单列的问题
		// 	const currentAddress = await getCurrentLocation()
		// 	const res = await getHomeBrandListApi({ pageNo: 1, pageSize: this.queryParam.pageNo * this.queryParam.pageSize, address: currentAddress + '' })
		// 	if (res.statusCode === 20000) {
		// 		if (res.data) {
		// 			this.$data._list = res.data.data
		// 		}
		// 	}
		// }
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
			this.getBrandList()
		})
	},
	computed: {
		...mapGetters([ 'obtainLocationCount' ])
	},
	watch: {
		obtainLocationCount(val, oldVal) {
			const pages = getCurrentPages()
			if (pages[pages.length - 1].route === 'pages/business-district/business-district') this.getBrandList()
		}
	},
	methods: {
		getBrandList() {
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
									this.$data._query = { ...this.$data._query, ...this.queryParam, ...queryLocation, areaId: typeof res.regeocode.addressComponent.adcode === 'object' ? '' : res.regeocode.addressComponent.adcode }
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
					areaId: this.$store.state.location.locationInfo.adcode,
					longitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[0],
					latitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[1]
				// areaId: 440606,
				// longitude: 113.293719,
				// latitude: 22.803751
				}
				this._loadData(null, () => this.isPositioning = false)
			}
		},

		// 点击常看详情
		handleToDetail(item) {
			const { type } = item
			if (!type) return this.empty() // 特殊图标或图标名称对应不上就跳不了页面
			uni.navigateTo({ url: `/another-tf/another-user/shop/shop-enter?type=${item.type}&id=${item.id}` })
		}
	},
	onPullDownRefresh() {
		this.$data._query.page = 1
		this.$data._list = []
		this.$data._listTotal = 0
		this.$data._isEmpty = false
		this._loadData()
		uni.stopPullDownRefresh()
	}

}
</script>

<style lang="less" scoped>
.business-district-container {
	min-height: 100vh;
	background-color: #f6f6f6;
	padding: 40upx 26upx 140upx;
	box-sizing: border-box;

}
</style>
