<template>
	<view class="brand-detail-container">

		<BeeBack
			:success-cb="successCb"
			style="position: sticky;top: 0;z-index: 3;padding-top: 16rpx;background-color: #ffffff;"
		>
			<view style="display: flex;align-items: center;justify-content: space-between;">
				<BeeIcon
					name="arrowleft" :size="34" color="#222229"
					style="width: fit-content;padding: 1rpx;margin-left: 30rpx;border: 1rpx solid #eeeeee;border-radius: 50%;line-height: 1;"
				>
				</BeeIcon>
				<text style="flex: 1;margin-left: -104rpx;text-align: center;font-size: 38rpx;font-weight: bold;">
					<text v-if="isSelection">商家选品</text>
					<text v-else>门店详情</text>
				</text>
			</view>
		</BeeBack>
		<view style="padding: 0 30rpx 14rpx;background-color: #ffffff;">
			<ATFBrandInfo
				ref="refATFBrandInfo"
				:is-selection="Boolean(isSelection)" :brand-detail="brandDetail"
				padding="40rpx 0 0 0" @navgation="handleNavigate"
				@refresh="getBrandDetail"
			></ATFBrandInfo>
		</view>
		<view style="padding: 0 30rpx;background-color: #ffffff;">
			<view
				style="display: flex;align-items: center;justify-content: flex-end;flex-wrap: wrap;padding: 14rpx 0;border-top: 1rpx dashed #dddddd;"
			>
				<view>
					<tui-button
						type="green" width="200rpx" height="58rpx" shape="circle"
						plain margin="0 0 0 18rpx" bold
						@click="go(`/another-tf/another-user/member-card/member-card-list?shopId=${brandDetail.shopId}`)"
					>
						购买会员卡
					</tui-button>
				</view>
				<view v-if="!initiatedSplicingId">
					<tui-button
						type="warning" width="180rpx" height="58rpx" shape="circle"
						plain margin="0 0 0 18rpx" bold
						@click="handleStartSplicing"
					>
						发起拼单
					</tui-button>
				</view>
				<view v-else style="display: flex;align-items: center;justify-content: flex-end;flex-wrap: wrap;width: 100%;">
					<view style="font-size: 36rpx;font-weight: bold;color: #007aff;">拼单进行中：</view>
					<tui-button
						type="blue" width="240rpx" height="58rpx" shape="circle"
						plain margin="6rpx 0 6rpx 18rpx" bold
						@click="handleCopySplicing"
					>
						复制拼单链接
					</tui-button>
					<tui-button
						type="blue" width="180rpx" height="58rpx" shape="circle"
						plain margin="6rpx 0 6rpx 18rpx" bold
						@click="handleShareServe()"
					>
						分享拼单
					</tui-button>
					<tui-button
						type="danger" width="180rpx" height="58rpx" shape="circle"
						plain margin="6rpx 0 6rpx 18rpx" bold
						@click="handleEndSplicing"
					>
						结束拼单
					</tui-button>
				</view>
			</view>
		</view>

		<!-- <view
			style="display: flex;justify-content: space-between;align-items: center;padding: 18rpx 30rpx;margin-top: 18rpx;background-color: #ffffff;"
			@click="handleApplyForRecruit"
			>
			<view style="display: flex;align-items: center;">
			<tui-icon name="friendadd" color="#222229" :size="22"></tui-icon>
			<text style="margin-left: 16rpx;">成为分销员</text>
			</view>
			<tui-icon name="arrowright" color="#151515" :size="26"></tui-icon>
			</view> -->

		<!-- ['商品', '四季鲜蔬', '火锅食材', '烧烤食材', '鲜果礼篮', '粮油副食']allTabList.map(i => i.classifyName) -->
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
			<view v-if="currentTab === -1">
				<CanvasPage
					v-if="componentsData && componentsData.length" :components-data="componentsData"
					:terminal="terminal" :type-id="3" :shop-id="Number(shopId)"
				>
				</CanvasPage>
				<tui-no-data
					v-else-if="componentsData && !componentsData.length" :fixed="false"
					style="padding-top: 40rpx;"
				>
					商家未装修首页
				</tui-no-data>
			</view>
			<view v-else>
				<view v-if="bannerInfoList && bannerInfoList.length" style="background: #f7f7f7;padding: 20rpx 30rpx;">
					<swiper indicator-dots="true">
						<swiper-item v-for="(item, index) in bannerInfoList" :key="index">
							<image :src="item.bannerImage" style="width: 100%;height: 280rpx;border-radius: 20rpx;">
							</image>
						</swiper-item>
					</swiper>
				</view>
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
								:shop-id="shopId" :c-item="entity" show-sales
								@add-car="(e) => $refs.refATFSpecificationScreen.open(e.shopId, e.productId, e.skuId)"
							>
							</ATFShopGoods>
						</template>
						<template #right="{ entity }">
							<ATFShopGoods
								:shop-id="shopId" :c-item="entity" show-sales
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
		</view>

		<ATFSpecificationScreen
			ref="refATFSpecificationScreen" is-splicing :splicing-id="initiatedSplicingId"
			@success="initShopCart"
		></ATFSpecificationScreen>

		<view v-if="brandDetail.shopId">
			<ATFStoreShopCart
				ref="refATFStoreShopCart" :brand-id="brandDetail.shopId"
				@update-msg="(e) => initiatedSplicingId = (e[0] && e[0].splicingId) || 0"
			></ATFStoreShopCart>
		</view>
	</view>
</template>

<script>
import { A_TF_MAIN } from '../../../config'
import CanvasPage from '../../../components/canvasShow/canvasShowPage.vue'
import { getIndexShopDetailApi, checkDistributorHasApplyApi, getShopClassifyApi, getShopProductsApi, getShopBannerApi, getCanvasApi, addShopBusinessBuyerUserApi, updateStartSplicingOrdersApi, updateEndSplicingOrdersApi } from '../../../api/anotherTFInterface'
import { navigationAddress, setMiniprogramShareConfig } from '../../../utils'

export default {
	name: 'ShopDetail',
	components: {
		CanvasPage
	},

	data() {
		return {
			successCb: () => {
				const pages = getCurrentPages()
				if (pages[pages.length - 2].route === 'pages/business-district/business-district') uni.$emit('sendStoreDetailMsg', { data: { meaning: 'refreshCurrentData' } })
			},
			shopId: null,
			isSelection: 0,
			brandDetail: {},
			allTabList: [ '商品' ],
			allTabData: [ { classifyName: '商品', classifyId: 0 } ], // [{ classifyName: '商品', classifyId: 0 }, { classifyName: '首页', classifyId: 0 }]
			currentTab: 0,
			childsCurrent: -1,
			// 首页
			componentsData: null,
			terminal: getApp().globalData.terminal,
			// 全部等其它tab
			classifyId: '',
			bannerInfoList: [],
			sortGoodsIndex: '',
			shopGoodsInfo: {
				query: {
					ifNew: 1, // 是否新品
					type: '', // 价格排序条件
					volume: '', // 销量排序条件
					page: 1, // 当前页
					pageSize: 20 // 每页记录数
				},
				data: [],
				listTotal: 0, // 列表数据总数
				isEmpty: false // 列表是否为空
			},
			initiatedSplicingId: 0
		}
	},

	onLoad(options) {
		// this.$store.commit(`app/${CHANGE_IS_IN_MINIPROGRAM}`, !!options.miniProgram)
		this.shopId = options.shopId
		this.isSelection = Number(options.isSelection) || 0
		this.getBrandDetail()
		getShopClassifyApi({
			shopId: this.shopId
		}).then((res) => {
			this.allTabData = this.allTabData.concat(res.data.filter((item) => JSON.stringify(item) !== '{}'))
			this.allTabList = this.allTabData.map((item) => item.classifyName)
		})
		getShopBannerApi({
			shopId: this.shopId
		}).then((res) => {
			this.bannerInfoList = res.data
		})
		getCanvasApi({ terminal: this.terminal, type: 3, shopId: this.shopId }).then((res) => {
			if (JSON.stringify(res.data) !== '{}') {
				this.componentsData = JSON.parse(res.data.json)
			} else {
				this.componentsData = []
			}
		})
		addShopBusinessBuyerUserApi({ shopId: this.shopId })
		this.getShopGoodsTemplate()
	},
	onShow() {
		this.initShopCart()
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
							webPath: `/another-tf/another-user/shop/shop-detail?shopId=${this.brandDetail.shopId}&isSelection=${this.isSelection}`,
							title: `团蜂本地生活--${this.brandDetail.shopName}-${this.brandDetail.shopAdress}`,
							imageUrl: this.common.seamingImgUrl(this.brandDetail.shopLogo) || this.common.seamingImgUrl('1716629235852-feed73b67bb541edb82b41a0937dbdad.png')
						}
					})
				}
				uni.hideLoading()
			} catch (error) {
				console.log(error)
				uni.hideLoading()
			}
		},
		// 导航
		handleNavigate() {
			if (!this.brandDetail.shopAdress) return this.$showToast('商家地址有误，导航失败')
			navigationAddress(`${this.brandDetail.longitude},${this.brandDetail.latitude}`)
		},
		// 判断是否已申请成为该店铺的分销员
		handleApplyForRecruit() {
			uni.showLoading()
			checkDistributorHasApplyApi({
				shopId: this.shopId
			}).then((res) => {
				uni.hideLoading()
				if (!res.data.distributorId) {
					this.go('/another-tf/another-serve/distributionModule/recruit?shopId=' + this.shopId)
				} else if (res.data.state === 1) {
					this.$showToast('您已申请成为该店铺的分销员')
				} else {
					this.$showToast('您的申请正在审核中，请稍后查看')
				}
			})
				.catch(() => {
					uni.hideLoading()
				})
		},
		// 栏目切换
		handleTabChange(e) {
			this.currentTab = e.index
			console.log(this.currentTab)
			// if (e.index === 1) return
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
		handleStartSplicing() {
			if (this.$refs.refATFStoreShopCart && this.$refs.refATFStoreShopCart.$refs.refATFShopCartList) {
				const shopCartList = this.$refs.refATFStoreShopCart.$refs.refATFShopCartList.getShopCartListData()
				if (shopCartList.reduce((total, value) => total + value.skus.length, 0)) {
					uni.showLoading()
					updateStartSplicingOrdersApi({
						shopId: this.shopId
					}).then((res) => {
						uni.hideLoading()
						this.$showToast('发起成功')
						setTimeout(() => {
							this.initShopCart()
						}, 1000)
					})
						.catch((e) => {
							uni.hideLoading()
						})
				} else {
					this.$showToast('请先添加商品到购物车')
				}
			}
		},
		handleEndSplicing() {
			uni.showLoading()
			updateEndSplicingOrdersApi({
				splicingId: this.initiatedSplicingId
			}).then((res) => {
				uni.hideLoading()
				this.$showToast('结束成功')
				setTimeout(() => {
					this.initShopCart()
				}, 1000)
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		handleCopySplicing() {
			this.$copy(`${A_TF_MAIN}/#/another-tf/another-user/shop/splicing-reception?shopId=${this.brandDetail.shopId}&splicingId=${this.initiatedSplicingId}`)
		},
		handleShareServe(isQuit) {
			if (!this.isLogin()) return
			const data = {
				data: {
					title: `拼单分享--${this.brandDetail.shopName}-${this.brandDetail.shopAdress}`,
					desc: this.brandDetail.shopBrief || '--',
					link: `${A_TF_MAIN}/#/another-tf/another-user/shop/splicing-reception?shopId=${this.brandDetail.shopId}&splicingId=${this.initiatedSplicingId}`,
					imageUrl: this.common.seamingImgUrl(this.brandDetail.shopLogo)
				},
				successCb: () => { },
				failCb: () => { }
			}
			if (this.$refs.refATFBrandInfo) this.$refs.refATFBrandInfo.$refs.beeWxShareRef.share(data, isQuit)
		}
	},
	onReachBottom() {
		if (this.currentTab !== -1) {
			if (this.shopGoodsInfo.data.length < this.shopGoodsInfo.listTotal) {
				++this.shopGoodsInfo.query.page
				this.getShopGoodsTemplate(true)
			}
		}
	}
}
</script>

<style lang="less" scoped>
.brand-detail-container {
	position: relative;
	min-height: 100vh;
	padding-bottom: 120rpx;
	background-color: #f5f4f6;
	box-sizing: border-box;

	.tui-scroll__view {
		/deep/ .tui-tabs__line {
			clip-path: inset(0% 15% 0% 15% round 4rpx 4rpx 4rpx 4rpx);
		}
	}
}
</style>
