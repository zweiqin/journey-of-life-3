<template>
	<view class="splicing-reception-container">
		<BeeBack>
			<view
				style="display: flex;align-items: center;justify-content: space-between;padding: 20rpx 20rpx 16rpx;background-color: #f5f5f5;"
			>
				<BeeIcon name="home-fill" :size="26" color="#222229" style="width: fit-content;">
				</BeeIcon>
				<text style="flex: 1;margin-left: -40rpx;text-align: center;">拼单接收</text>
			</view>
		</BeeBack>
		<view
			style="padding: 18rpx 20rpx;margin: 20rpx 20rpx 0;background-color: #ffffff;border-radius: 20rpx;"
			@click="go(`/another-tf/another-user/shop/shop-detail?shopId=${shopId}`)"
		>
			<view style="display: flex;align-items: stretch;">
				<image
					style="width: 96rpx;height: 96rpx;margin-right: 24rpx;border-radius: 50%"
					:src="common.seamingImgUrl(brandDetail.shopLogo)"
				>
				</image>
				<view style="flex: 1;display: flex;flex-direction: column;justify-content: flex-start;width: 0;">
					<text style="font-size: 30rpx;color: #333;font-weight: bold;">{{ brandDetail.shopName }}</text>
					<view style="font-size: 24rpx;color: #969699;">
						<view style="margin-top: 16rpx;">
							<text style="color: #969699;">店铺评分：</text>
							<text style="color: #303030;">{{ brandDetail.score }}</text>
							<text style="margin-left: 42rpx;color: #969699;">月售：</text>
							<text style="color: #303030;">{{ brandDetail.monthlySales }}</text>
						</view>
					</view>
				</view>
			</view>
			<view style="margin-top: 12rpx;display: flex;align-items: center;font-size: 24rpx;">
				<tui-icon name="gps" :size="14" color="#222229"></tui-icon>
				<text v-if="!$store.getters.obtainLocationCount" style="margin-left: 4rpx;">
					定位中
				</text>
				<text v-else style="margin-left: 4rpx;">{{ brandDetail.distance || 0 }}Km</text>
				<text
					style="margin-left: 30rpx;flex: 1;width: 0;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
				>
					{{ brandDetail.shopAdress || '--' }}
				</text>
				<text style="margin-left: 64rpx;font-weight: bold;color: #EF530E;" @click.stop="handleNavigate">
					导航
				</text>
			</view>
		</view>

		<tui-tab
			:tabs="allTabList" :current="currentTab" scroll background-color="transparent"
			:size="32" bold
			bottom="6rpx" color="#222229" selected-color="#222229" slider-bg-color="#ef530e"
			slider-height="4px"
			@change="handleTabChange"
		></tui-tab>

		<view
			v-if="allTabData[currentTab].classify && allTabData[currentTab].classify.length"
			style="margin-top: 4rpx;padding: 0rpx 20rpx;display: flex;align-items: center;overflow-x: auto;white-space: nowrap;"
		>
			<view
				v-for="(item, index) in allTabData[currentTab].classify" :key="index"
				style="padding: 12rpx 10rpx;margin-right: 10rpx;font-size: 30rpx;border-radius: 8rpx;"
				:style="{ color: index == childsCurrent ? '#ffffff' : '#8c8b8d', backgroundColor: index == childsCurrent ? '#ff8000' : '#fefeff' }"
				@click="handleSelectChild(item, index)"
			>
				{{ item.classifyName }}
			</view>
		</view>

		<view style="background-color: #fff;padding: 4rpx 20rpx 0 20rpx;margin-top: 10rpx;">
			<view
				style="display: flex;align-items: center;justify-content: space-around;padding: 10rpx 0;font-size: 26rpx;"
			>
				<view
					:style="{ color: shopGoodsInfo.query.ifNew === 1 ? '#ff7911' : shopGoodsInfo.query.ifNew === 0 ? '#8dbcbd' : '#000000' }"
					@click="handleGoodsSortTap(1)"
				>
					<text>新品</text>
				</view>
				<view
					:style="{ color: sortGoodsIndex === 2 ? '#ff7911' : '#000000' }"
					@click="handleGoodsSortTap(2)"
				>
					<text>价格</text>
					<tui-icon
						v-if="[1, 2].includes(shopGoodsInfo.query.type)"
						:name="shopGoodsInfo.query.type === 1 ? 'turningup' : shopGoodsInfo.query.type === 2 ? 'turningdown' : ''"
						color="#666666" :size="16"
					></tui-icon>
				</view>
				<view
					:style="{ color: sortGoodsIndex === 3 ? '#ff7911' : '#000000' }"
					@click="handleGoodsSortTap(3)"
				>
					<text>销量</text>
					<tui-icon
						v-if="[1, 2].includes(shopGoodsInfo.query.volume)"
						:name="shopGoodsInfo.query.volume === 1 ? 'turningup' : shopGoodsInfo.query.volume === 2 ? 'turningdown' : ''"
						color="#666666" :size="16"
					></tui-icon>
				</view>
			</view>
			<view v-if="shopGoodsInfo.data && shopGoodsInfo.data.length" style="width: 100%;">
				<tui-waterfall :list-data="shopGoodsInfo.data" :type="2">
					<template #left="{ entity }">
						<ATFShopGoods
							:shop-id="shopId" :c-item="entity" show-sales :is-to-detail="false"
							@add-car="(e) => $refs.refATFSpecificationScreen.open(e.shopId, e.productId, e.skuId)"
						>
						</ATFShopGoods>
					</template>
					<template #right="{ entity }">
						<ATFShopGoods
							:shop-id="shopId" :c-item="entity" show-sales :is-to-detail="false"
							@add-car="(e) => $refs.refATFSpecificationScreen.open(e.shopId, e.productId, e.skuId)"
						>
						</ATFShopGoods>
					</template>
				</tui-waterfall>
			</view>
			<view style="padding-bottom: 45rpx;">
				<LoadingMore
					:status="!shopGoodsInfo.isEmpty && !shopGoodsInfo.data.length
						? 'loading' : !shopGoodsInfo.isEmpty && shopGoodsInfo.data.length && (shopGoodsInfo.data.length >= shopGoodsInfo.listTotal) ? 'no-more' : ''"
				>
				</LoadingMore>
				<tui-no-data
					v-if="shopGoodsInfo.isEmpty" :fixed="false"
					style="padding-top: 60rpx;"
				>
					暂无数据
				</tui-no-data>
			</view>
		</view>

		<BeeWxShare ref="beeWxShareRef" @click="handleShareServe()"></BeeWxShare>

		<ATFSpecificationScreen
			ref="refATFSpecificationScreen" is-splicing :splicing-id="receivedSplicingId"
			btn-text="加入拼单" @success="initShopCart"
		></ATFSpecificationScreen>

		<view v-if="brandDetail.shopId && receivedSplicingId">
			<ATFStoreShopCart ref="refATFStoreShopCart" :brand-id="brandDetail.shopId"></ATFStoreShopCart>
		</view>

	</view>
</template>

<script>
import { A_TF_MAIN } from '../../../config'
import { mapGetters } from 'vuex'
import { updateInvitedSplicingOrdersApi, getIndexShopDetailApi, getShopProductsApi, getShopClassifyApi } from '../../../api/anotherTFInterface'
import { navigationAddress, setMiniprogramShareConfig } from '../../../utils'

export default {
	name: 'SplicingReception',
	data() {
		return {
			receivedSplicingId: 0,
			shopId: '',
			brandDetail: {},
			allTabList: [ '商品' ],
			allTabData: [ { classifyName: '商品', classifyId: 0 } ],
			currentTab: 0,
			childsCurrent: -1,
			classifyId: '',
			sortGoodsIndex: '',
			shopGoodsInfo: {
				query: {
					ifNew: 1,
					type: '',
					volume: '',
					page: 1,
					pageSize: 20
				},
				data: [],
				listTotal: 0,
				isEmpty: false
			}
		}
	},
	onLoad(options) {
		this.receivedSplicingId = Number(options.splicingId) || 0
		this.shopId = options.shopId || ''
		updateInvitedSplicingOrdersApi({
			splicingId: this.receivedSplicingId
		}).then((result) => {
			this.getBrandDetail()
			getShopClassifyApi({
				shopId: this.shopId
			}).then((res) => {
				this.allTabData = this.allTabData.concat(res.data.filter((item) => JSON.stringify(item) !== '{}'))
				this.allTabList = this.allTabData.map((item) => item.classifyName)
			})
			this.getShopGoodsTemplate()
		})
	},
	onShow() {
		this.initShopCart()
	},
	computed: {
		...mapGetters([ 'obtainLocationCount' ])
	},
	watch: {
		obtainLocationCount(val, oldVal) {
			const pages = getCurrentPages()
			if (pages[pages.length - 1].route === 'another-tf/another-user/shop/splicing-reception') this.getBrandDetail()
		},
		brandDetail: {
			handler(newV, oldV) {
				if (newV.shopId && (newV.shopId !== oldV.shopId)) {
					this.shopId = newV.shopId
					// #ifdef H5
					this.$nextTick(() => {
						this.handleShareServe(true)
					})
					// #endif
				}
			},
			immediate: true,
			deep: true
		}
	},
	methods: {
		initShopCart() {
			if (this.brandDetail.shopId && this.$refs.refATFStoreShopCart && this.$refs.refATFStoreShopCart.$refs.refATFShopCartList) {
				this.$refs.refATFStoreShopCart.$refs.refATFShopCartList.getShopCartData('single')
			}
		},
		async getBrandDetail() {
			try {
				uni.showLoading()
				const { data } = await getIndexShopDetailApi({
					shopId: this.shopId,
					longitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[0],
					latitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[1]
				})
				console.log(data)
				this.brandDetail = data || {}
				if (this.$store.state.app.terminal === 6) {
					setMiniprogramShareConfig({
						data: {
							event: 'sharingPageTurn',
							webPath: `/another-tf/another-user/shop/splicing-reception?shopId=${this.shopId}&splicingId=${this.receivedSplicingId}`,
							title: `拼单分享--${this.brandDetail.shopName}-${this.brandDetail.shopAdress}`,
							imageUrl: this.common.seamingImgUrl(this.brandDetail.shopLogo)
						}
					})
				}
				uni.hideLoading()
			} catch (error) {
				console.log(error)
				uni.hideLoading()
			}
		},
		handleNavigate() {
			if (!this.brandDetail.shopAdress) return this.$showToast('商家地址有误，导航失败')
			navigationAddress(`${this.brandDetail.longitude},${this.brandDetail.latitude}`)
		},
		handleTabChange(e) {
			this.currentTab = e.index
			console.log(this.currentTab)
			this.shopGoodsInfo.query.page = 1
			this.shopGoodsInfo.data = []
			this.shopGoodsInfo.listTotal = 0
			this.shopGoodsInfo.isEmpty = false
			if (this.allTabData[e.index].classify && this.allTabData[e.index].classify.length) {
				this.childsCurrent = 0
				this.classifyId = this.allTabData[e.index].classify[0].classifyId
			} else if (e.index === 0) {
				this.classifyId = ''
			} else {
				this.classifyId = this.allTabData[e.index].classifyId
			}
			this.getShopGoodsTemplate()
		},
		handleSelectChild(item, index) {
			this.childsCurrent = index
			this.classifyId = item.classifyId
			this.shopGoodsInfo.query.page = 1
			this.shopGoodsInfo.data = []
			this.shopGoodsInfo.listTotal = 0
			this.shopGoodsInfo.isEmpty = false
			this.getShopGoodsTemplate()
		},
		getShopGoodsTemplate(isLoadmore) {
			uni.showLoading()
			getShopProductsApi({
				...this.shopGoodsInfo.query,
				shopId: this.shopId,
				groupId: this.classifyId,
				counterType: 2
			}).then((res) => {
				this.shopGoodsInfo.listTotal = res.data.page.total
				if (isLoadmore) {
					this.shopGoodsInfo.data.push(...res.data.page.list)
				} else {
					this.shopGoodsInfo.data = res.data.page.list
				}
				this.shopGoodsInfo.isEmpty = this.shopGoodsInfo.data.length === 0
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		handleGoodsSortTap(index) {
			this.shopGoodsInfo.query.page = 1
			this.shopGoodsInfo.data = []
			this.shopGoodsInfo.listTotal = 0
			this.shopGoodsInfo.isEmpty = false
			this.sortGoodsIndex = index
			if (index === 1) {
				this.shopGoodsInfo.query.ifNew = this.shopGoodsInfo.query.ifNew ? 0 : 1
				this.shopGoodsInfo.query.type = ''
				this.shopGoodsInfo.query.volume = ''
			} else if (index === 2) {
				this.shopGoodsInfo.query.ifNew = ''
				this.shopGoodsInfo.query.type = this.shopGoodsInfo.query.type === 1 ? 2 : 1
				this.shopGoodsInfo.query.volume = ''
			} else if (index === 3) {
				this.shopGoodsInfo.query.ifNew = ''
				this.shopGoodsInfo.query.type = ''
				this.shopGoodsInfo.query.volume = this.shopGoodsInfo.query.volume === 1 ? 2 : 1
			}
			this.getShopGoodsTemplate()
		},
		handleShareServe(isQuit) {
			if (!this.isLogin()) return
			const data = {
				data: {
					title: `拼单分享--${this.brandDetail.shopName}-${this.brandDetail.shopAdress}`,
					desc: this.brandDetail.shopBrief,
					link: `${A_TF_MAIN}/#/another-tf/another-user/shop/splicing-reception?shopId=${this.shopId}&splicingId=${this.receivedSplicingId}`,
					imageUrl: this.common.seamingImgUrl(this.brandDetail.shopLogo)
				},
				successCb: () => { },
				failCb: () => { }
			}
			this.$refs.beeWxShareRef.share(data, isQuit)
		}
	},
	onReachBottom() {
		if (this.shopGoodsInfo.data.length < this.shopGoodsInfo.listTotal) {
			++this.shopGoodsInfo.query.page
			this.getShopGoodsTemplate(true)
		}
	}
}
</script>

<style lang="less" scoped>
.splicing-reception-container {
	min-height: 100vh;
	box-sizing: border-box;

	.tui-scroll__view {
		/deep/ .tui-tabs__line {
			clip-path: inset(0% 15% 0% 15% round 4rpx 4rpx 4rpx 4rpx);
		}
	}
}
</style>
