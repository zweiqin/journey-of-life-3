<template>
	<view class="brand-factory-detail-container">
		<BeeBack>
			<view
				style="display: flex;align-items: center;justify-content: space-between;padding: 20rpx 0;background-color: #ffffff;"
			>
				<tui-icon name="arrowleft" :size="74" unit="rpx" color="#222229" margin="0"></tui-icon>
				<view class="search-btn" style="flex: 1;display: flex;align-items: center;" @click.stop="() => { }">
					<view style="flex: 1;margin-left: 16rpx;">
						<tui-input
							v-model="shopGoodsInfo.query.search" placeholder="品牌工厂"
							placeholder-style="color: #adadad;font-size: 24rpx;" padding="6rpx 10rpx 6rpx 24rpx"
							background-color="#f6f6f6" @click="go(`/another-tf/another-serve/search/index`)"
						>
							<template #left>
								<tui-icon :size="34" unit="rpx" color="#adadad" name="search" margin="0 12rpx 0 0"></tui-icon>
							</template>
						</tui-input>
					</view>
					<tui-button
						type="gray" width="120rpx" height="60rpx" margin="0 0 0 20rpx"
						plain link
						@click="handleCollectToggle"
					>
						<view>
							<tui-icon
								:name="brandDetail.ifCollect ? 'like-fill' : 'like'" :size="30" unit="rpx"
								:color="brandDetail.ifCollect ? '#ef530e' : '#222229'" margin="0"
							></tui-icon>
							<text style="margin-left: 4rpx;font-size: 26rpx;color: #222229;">关注</text>
						</view>
					</tui-button>
					<BeeWxShare ref="beeWxShareRef" @click="handleShareServe()">
						<tui-icon name="share" :size="50" unit="rpx" color="#000000" margin="0 20rpx 0"></tui-icon>
					</BeeWxShare>
				</view>
			</view>
		</BeeBack>

		<view style="background-color: #ffffff;">
			<view v-if="brandDetail.shopLogo || brandDetail.advertisement" style="margin-top: 2rpx;">
				<swiper indicator-dots autoplay :interval="3000" circular :duration="1000" style="height: 375rpx;">
					<template v-if="brandDetail.shopLogo">
						<swiper-item>
							<tui-lazyload-img
								mode="scaleToFill" width="100%" height="100%"
								:src="common.seamingImgUrl(brandDetail.shopLogo)"
							></tui-lazyload-img>
						</swiper-item>
					</template>
					<template v-if="brandDetail.advertisement">
						<swiper-item v-for="(item, index) in brandDetail.advertisement.split(',')" :key="index">
							<tui-lazyload-img
								mode="scaleToFill" width="100%" height="100%"
								:src="common.seamingImgUrl(item)"
							></tui-lazyload-img>
						</swiper-item>
					</template>
				</swiper>
			</view>
			<view style="padding: 36rpx 54rpx 66rpx 32rpx;">
				<view style="display: flex;align-items: center;justify-content: space-between;">
					<text style="font-size: 36rpx;font-weight: bold;">{{ brandDetail.shopName || '--' }}</text>
					<image style="width: 30rpx;" src="../../../static/images/icon/v-icon.png" mode="widthFix" />
				</view>
				<view style="display: flex;align-items: center;margin-top: 32rpx;color: #888889;font-size: 26rpx;">
					<view style="padding: 4rpx;margin-right: 12rpx;border: 2rpx solid #ef530e;border-radius: 50%;line-height: 1;">
						<tui-icon :size="30" unit="rpx" color="#ef530e" name="service-fill" margin="0"></tui-icon>
					</view>
					<view>{{ brandDetail.annualLimit ? `经营${brandDetail.annualLimit}年` : '经典老店' }}</view>
					<view
						v-if="brandDetail.label"
						style="flex: 1;margin-left: 20rpx;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
					>
						{{ brandDetail.label }}
					</view>
				</view>
				<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 14rpx;">
					<view style="display: flex;align-items: center;">
						<view
							style="padding: 4rpx 10rpx;background-color: #0f0847;font-size: 26rpx;font-weight: bold;color: #ffffff;border-radius: 8rpx;"
						>
							金牌制造榜
						</view>
						<image
							style="width: 90rpx;margin-left: 10rpx;" src="../../../static/images/icon/fangxingou.png"
							mode="widthFix"
						/>
						<view style="margin-left: 10rpx;color: #888889;font-size: 26rpx;">
							· 延期必赔 品质保障 资金安全
						</view>
					</view>
					<tui-icon :size="36" unit="rpx" color="#a0a0a1" name="arrowright" margin="0"></tui-icon>
				</view>
				<view
					style="display: flex;align-items: center;margin-top: 16rpx;color: #000000;font-size: 26rpx;"
					@click="handleNavigate"
				>
					<view style="padding: 4rpx;margin-right: 12rpx;border: 2rpx solid #000000;border-radius: 50%;line-height: 1;">
						<tui-icon :size="30" unit="rpx" color="#000000" name="position" margin="0"></tui-icon>
					</view>
					<text
						v-if="brandDetail.shopAdress"
						style="flex: 1;width: 0;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;margin: 0 0 0 10rpx;color: #222229;"
					>
						{{ brandDetail.shopAdress || '' }}
					</text>
				</view>
			</view>
		</view>

		<view style="background-color: #ffffff;">
			<tui-tab
				:tabs="['产品', '视频', '公司简介']" :current="currentWrapper" scroll background-color="transparent"
				:size="32"
				bold bottom="6rpx" color="#222229" selected-color="#EF570F"
				slider-bg-color="#EF570F" slider-height="2px"
				@change="handleWrapperChange"
			></tui-tab>

			<view style="padding: 4rpx 0 100rpx;margin-top: 10rpx;">
				<view v-if="currentWrapper === -1" style="padding: 0 24rpx;">
				</view>
				<view v-else-if="currentWrapper === 1">
					<view v-if="brandDetail.videos">
						<view style="padding: 0 24rpx;">
							<view
								v-for="(item, index) in brandDetail.videos.split(',')" :key="index"
								style="margin-bottom: 38rpx;text-align: center;"
							>
								<video
									style="width: 100%; height: 300rpx;border-radius: 10rpx;"
									:src="common.seamingImgUrl(item)"
								></video>
								<text style="margin-top: 10rpx;font-size: 26rpx;">视频{{ index + 1 }}</text>
							</view>
						</view>
						<view
							style="padding: 40rpx 0 50rpx;font-size: 24rpx;color: #9E9E9E;text-align: center;background-color: #ffffff;"
						>
							~~到底啦~~
						</view>
					</view>
					<view v-else style="padding-bottom: 45rpx;">
						<tui-no-data :fixed="false" style="padding-top: 60rpx;">这里空空如也～</tui-no-data>
					</view>
				</view>
				<view v-else-if="currentWrapper === 2">
					<view v-if="brandDetail.shopBrief">
						<view style="padding: 0 24rpx;">
							<view v-if="brandDetail.advertisement" style="margin-bottom: 20rpx;">
								<swiper indicator-dots autoplay :interval="3000" circular :duration="1000" style="height: 550rpx;">
									<swiper-item v-for="(item, index) in brandDetail.advertisement.split(',')" :key="index">
										<tui-lazyload-img
											mode="scaleToFill" width="100%" height="100%" radius="20rpx"
											:src="common.seamingImgUrl(item)"
										></tui-lazyload-img>
									</swiper-item>
								</swiper>
							</view>
							<view
								style="padding-bottom: 86rpx;font-size: 30rpx;color: #222229;word-break: break-all;line-height: 1.8;"
							>
								{{ brandDetail.shopBrief }}
							</view>
						</view>
						<view
							style="padding: 40rpx 0 50rpx;font-size: 24rpx;color: #9E9E9E;text-align: center;background-color: #ffffff;"
						>
							~~到底啦~~
						</view>
					</view>
					<view v-else style="padding-bottom: 45rpx;">
						<tui-no-data :fixed="false" style="padding-top: 60rpx;">这里空空如也～</tui-no-data>
					</view>
				</view>
				<view v-else>
					<view
						v-if="allTabList && allTabList.length"
						style="margin-top: 4rpx;padding: 0rpx 20rpx;display: flex;align-items: center;overflow-x: auto;white-space: nowrap;"
					>
						<view
							v-for="(item, index) in allTabList" :key="index"
							style="padding: 8rpx 24rpx;margin-right: 16rpx;font-size: 26rpx;border-radius: 8rpx;background-color: #dbdbdb;"
							:style="{ color: index == currentTab ? '#000000' : '#767676', fontWeight: index == currentTab ? 'bold' : 'normal' }"
							@click="handleTabChange({ index })"
						>
							{{ item }}
						</view>
					</view>
					<!-- <view
						v-if="allTabData[currentTab].classify && allTabData[currentTab].classify.length"
						style="margin-top: 4rpx;padding: 0rpx 20rpx;display: flex;align-items: center;overflow-x: auto;white-space: nowrap;"
						>
						<view
						v-for="(item, index) in allTabData[currentTab].classify" :key="index"
						style="padding: 8rpx 24rpx;margin-right: 16rpx;font-size: 26rpx;border-radius: 8rpx;background-color: #dbdbdb;"
						:style="{ color: index == childsCurrent ? '#000000' : '#767676', fontWeight: index == childsCurrent ? 'bold' : 'normal' }"
						@click="handleSelectChild(item, index)"
						>
						{{ item.classifyName }}
						</view>
						</view> -->
					<view style="padding: 0 24rpx;">
						<view v-if="shopGoodsInfo.data && shopGoodsInfo.data.length" style="width: 100%;">
							<tui-waterfall :list-data="shopGoodsInfo.data" :type="2">
								<template #left="{ entity }">
									<BrandGoods
										:shop-id="shopId" :c-item="entity" pic-padding="0 32rpx" show-sales
										:show-icon="false"
										price-color="#E02208"
									>
									</BrandGoods>
								</template>
								<template #right="{ entity }">
									<BrandGoods
										:shop-id="shopId" :c-item="entity" pic-padding="0 32rpx" show-sales
										:show-icon="false"
										price-color="#E02208"
									>
									</BrandGoods>
								</template>
							</tui-waterfall>
						</view>
						<view style="padding-bottom: 45rpx;">
							<LoadingMore
								:status="!shopGoodsInfo.isEmpty && !shopGoodsInfo.data.length
									? 'loading' : !shopGoodsInfo.isEmpty && shopGoodsInfo.data.length && (shopGoodsInfo.data.length >= shopGoodsInfo.listTotal) ? 'no-more' : ''"
							>
							</LoadingMore>
							<tui-no-data v-if="shopGoodsInfo.isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无数据</tui-no-data>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view
			style="position: fixed;bottom: 0;z-index: 999;width: 100%;padding: 20rpx 24rpx;background-color: #ffffff;box-sizing: border-box;"
		>
			<view style="display: flex;align-items: center;justify-content: space-between;">
				<view style="display: flex;align-items: center;">
					<tui-lazyload-img
						mode="scaleToFill" width="92rpx" height="92rpx" radius="50%"
						:src="common.seamingImgUrl(brandDetail.shopLogo || brandDetail.advertisement.split(',').find(i => i) || '')"
					></tui-lazyload-img>
					<view style="margin-left: 20rpx;">{{ brandDetail.shopName || '--' }}</view>
				</view>
				<view class="bottom-btn">
					<BeeMakePhone ref="refBeeMakePhone" :phone="brandDetail.chargePersonPhone">
						<tui-button
							type="warning" width="274rpx" height="88rpx" shape="circle"
							@click="$refs.refBeeMakePhone.handleMackPhone()"
						>
							<view style="display: flex;align-items: center;">
								<view style="padding: 8rpx;background-color: #ffffff;line-height: 1;border-radius: 50%;">
									<tui-icon name="voipphone" :size="30" unit="rpx" color="#ef530e" margin="0"></tui-icon>
								</view>
								<text style="margin-left: 10rpx;font-size: 32rpx;font-weight: bold;color: #ffffff;">联系商家</text>
							</view>
						</tui-button>
					</BeeMakePhone>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
import { A_TF_MAIN } from '../../../config'
import { getFactoryDetailApi, getShopClassifyApi, getShopProductsApi, updateCollectToCollectApi, updateCollectCancelApi } from '../../../api/anotherTFInterface'
import { navigationAddress, setMiniprogramShareConfig } from '../../../utils'
import BrandGoods from './components/BrandGoods.vue'

export default {
	name: 'Deatil',
	components: {
		BrandGoods
	},

	data() {
		return {
			shopId: null,
			brandDetail: {
				advertisement: '',
				ifCollect: 0,
				shopName: '',
				shopLogo: '',
				annualLimit: '',
				label: '',
				shopAdress: '',
				shopBrief: '',
				videos: '',
				chargePersonPhone: ''
			},
			currentWrapper: 0,
			allTabList: [ '全部' ],
			allTabData: [ { classifyName: '全部', classifyId: 0 } ], // [{ classifyName: '产品', classifyId: 0 }, { classifyName: '首页', classifyId: 0 }]
			currentTab: 0,
			childsCurrent: -1,
			classifyId: '',
			shopGoodsInfo: {
				query: {
					search: '',
					page: 1,
					pageSize: 20
				},
				data: [],
				listTotal: 0, // 列表数据总数
				isEmpty: false // 列表是否为空
			}
		}
	},
	onLoad(options) {
		this.shopId = options.shopId
		this.getBrandDetail()
		getShopClassifyApi({
			shopId: this.shopId
		}).then((res) => {
			this.allTabData = this.allTabData.concat(res.data.filter((item) => JSON.stringify(item) !== '{}'))
			this.allTabList = this.allTabData.map((item) => item.classifyName)
		})
		this.getShopGoodsTemplate()
	},

	watch: {
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
		async getBrandDetail() {
			try {
				uni.showLoading()
				const { data } = await getFactoryDetailApi({
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
							webPath: `/another-tf/another-user/brand-factory/detail?shopId=${this.brandDetail.shopId}`,
							title: `团蜂品牌工厂--${this.brandDetail.shopName}-${this.brandDetail.shopAdress}`,
							imageUrl: this.common.seamingImgUrl(this.brandDetail.shopLogo) || this.common.seamingImgUrl(this.brandDetail.advertisement) || this.common.seamingImgUrl('1716629235852-feed73b67bb541edb82b41a0937dbdad.png')
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
		handleWrapperChange(e) {
			this.currentWrapper = e.index
		},
		handleTabChange(e) {
			this.currentTab = e.index
			// if (e.index === 1) return
			this.shopGoodsInfo.data = []
			this.shopGoodsInfo.query.page = 1
			// if (this.allTabData[e.index].classify && this.allTabData[e.index].classify.length) {
			// 	this.childsCurrent = 0
			// 	this.classifyId = this.allTabData[e.index].classify[0].classifyId
			// } else
			if (e.index === 0) {
				this.classifyId = ''
			} else {
				this.classifyId = this.allTabData[e.index].classifyId
			}
			this.getShopGoodsTemplate()
		},
		handleSelectChild(item, index) {
			this.childsCurrent = index
			this.classifyId = item.classifyId
			this.getShopGoodsTemplate()
		},
		getShopGoodsTemplate(isLoadmore) {
			uni.showLoading()
			getShopProductsApi({
				...this.shopGoodsInfo.query,
				shopId: this.shopId,
				groupId: this.classifyId
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

		handleShareServe(isQuit) {
			if (!this.isLogin()) return
			const data = {
				data: {
					title: `团蜂品牌工厂 - ${this.brandDetail.shopName}`,
					desc: this.brandDetail.shopBrief || '--',
					link: `${A_TF_MAIN}/#/another-tf/another-user/brand-factory/detail?shopId=${this.brandDetail.shopId}`,
					imageUrl: this.common.seamingImgUrl(this.brandDetail.shopLogo)
				},
				successCb: () => { },
				failCb: () => { }
			}
			this.$refs.beeWxShareRef.share(data, isQuit)
		},
		handleCollectToggle() {
			uni.showLoading()
			if (this.brandDetail.ifCollect == 0) {
				updateCollectToCollectApi({
					shopId: parseInt(this.brandDetail.shopId)
				})
					.then(() => {
						uni.hideLoading()
						this.$showToast('收藏成功')
						this.getBrandDetail()
					})
					.catch(() => {
						uni.hideLoading()
					})
			} else {
				updateCollectCancelApi({
					ids: [ this.brandDetail.collectId ]
				})
					.then(() => {
						uni.hideLoading()
						this.$showToast('取消收藏成功')
						this.getBrandDetail()
					})
					.catch(() => {
						uni.hideLoading()
					})
			}
		}
	},
	onReachBottom() {
		if ((this.currentWrapper !== -1) && (this.currentWrapper !== 1) && (this.currentWrapper !== 2)) {
			if (this.shopGoodsInfo.data.length < this.shopGoodsInfo.listTotal) {
				++this.shopGoodsInfo.query.page
				this.getShopGoodsTemplate(true)
			}
		}
	}
}
</script>

<style lang="less" scoped>
.brand-factory-detail-container {
	min-height: 100vh;
	background-color: #eff3f6;
	box-sizing: border-box;

	.search-btn {
		/deep/ .tui-btn {
			background: #f6f6f6 !important;
		}

		/deep/ .tui-input__wrap {
			border-radius: 8rpx;
		}
	}

	.bottom-btn {
		/deep/ .tui-btn {
			background: #ef530e !important;
		}
	}
}
</style>
