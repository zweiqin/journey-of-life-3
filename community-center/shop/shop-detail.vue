<template>
	<view v-if="brandDetail" class="brand-detail-container">
		<view
			class="navgation_top" :style="{ backgroundColor: 'rgba(255, 255, 255, ' + navOpacity + ')' }"
			:class="isNavGaFixed ? 'isFixed' : 'isAbsolute'"
		>
			<view class="imgbg">
				<BeeBack :success-cb="successCb">
					<BeeIcon name="arrowleft" :size="24" color="#fff"></BeeIcon>
				</BeeBack>
			</view>
			<view class="fnButton">
				<view class="imgbg" @click="handleFollowBrand">
					<BeeIcon v-if="brandDetail.is" :size="26" :src="require('../../static/brand/detail/collection.png')">
					</BeeIcon>
					<BeeIcon v-else :size="18" :src="require('../../static/brand/detail/aixin.png')"></BeeIcon>
				</view>
				<view class="imgbg">
					<BeeWxShare ref="beeWxShareRef" @click="handleShareServe">
						<BeeIcon :src="require('../../static/brand/detail/share.png')" :size="22"></BeeIcon>
					</BeeWxShare>
				</view>
				<view class="imgbg" @click="go(`/user/sever/shop-car?isBack=1&orderType=1`)">
					<BeeIcon :src="require('../../static/brand/detail/spCar.png')" :size="18"></BeeIcon>
				</view>
			</view>
		</view>
		<!-- 轮播图 -->
		<swiper
			v-if="brandDetail.bgUrl && JSON.parse(brandDetail.bgUrl).length" class="swiper" :indicator-dots="true"
			:autoplay="true" :interval="3000" :duration="1000"
		>
			<swiper-item v-for="(img, index) in JSON.parse(brandDetail.bgUrl)" :key="index">
				<tui-lazyload-img
					mode="scaleToFill" width="100vw" height="400rpx" class="bannerItem"
					:src="common.seamingImgUrl(img)"
				></tui-lazyload-img>
			</swiper-item>
		</swiper>
		<view class="main">
			<!-- 商家信息栏 -->
			<view style="margin-top: -26upx;border-radius: 30upx 30upx 0 0;overflow: hidden;">
				<BrandInfo :brand-detail="brandDetail" @follow="handleFollowBrand" @navgation="handleNavigate"></BrandInfo>
			</view>
			<!-- 优惠卷栏 -->
			<view style="background: #F6F6F6;">
				<view class="favorable" @click="handleOpenCoupon">
					<view class="navGationBar">
						<view class="favorableItem"><span>优惠券</span><span>领</span></view>
						<view>
							<tui-icon name="arrowright" color="#151515" size="60" unit="upx"></tui-icon>
						</view>
					</view>
				</view>
				<tui-tabs
					:class="{ 'sticky-fixed': isTabFixed }" color="#000" selected-color="#000"
					size="35" :is-fixed="isTabFixed"
					slider-bg-color="#FB5D5D" bold
					:tabs="[{ name: '商品' }, { name: '团购' }, { name: '预约' }, { name: '秒杀' }, { name: '抽奖' }]"
					:current-tab="currentMenu" style="z-index: 1;" @change="handleChangeNavs"
				></tui-tabs>
			</view>
		</view>

		<view class="brand-pane" :style="{ marginTop: isTabFixed ? '80upx' : '0' }">
			<view v-show="currentMenu === 0" class="goods-list" style="width: 100%">
				<StoreGoodsList
					:brand-detail="brandDetail" :overflow-y="paneOverflowY"
					@click-content="(e) => go(`/pages/store/goods-detail/goods-detail?orderType=1&goodsId=${e.id}`)"
					@add-car="(e) => $refs.refJSpecificationScreen.open(e.id)"
				></StoreGoodsList>
				<!-- <view v-if="brandDetail.goodsVoList && brandDetail.goodsVoList.length">
					<tui-waterfall :list-data="brandDetail.goodsVoList" :type="2">
					<template #left="{ entity }">
					<BrandGoods :goods-data="entity" @add=""></BrandGoods>
					</template>
					<template #right="{ entity }">
					<BrandGoods :goods-data="entity" @add=""></BrandGoods>
					</template>
					</tui-waterfall>
					</view> -->
			</view>

			<GrouponWrapper v-if="currentMenu === 1" :brand-detail="brandDetail"></GrouponWrapper>

			<Reservation v-if="currentMenu === 2" :brand-detail="brandDetail" :is-overflow-y="paneOverflowY === 'auto' ? true : false"></Reservation>

			<Seckill v-if="currentMenu === 3" :brand-detail="brandDetail"></Seckill>

			<Raffle v-if="currentMenu === 4" :brand-detail="brandDetail"></Raffle>
		</view>

		<AppraisePane></AppraisePane>

		<tui-bottom-popup :show="isShowCouponListPopup" @close="isShowCouponListPopup = false">
			<view style="padding: 20upx;">
				<CouponList :brand-detail="brandDetail" :is-first-show-coupon="isFirstShowCoupon"></CouponList>
			</view>
		</tui-bottom-popup>

		<JSpecificationScreen
			ref="refJSpecificationScreen" order-type="1"
			@success="$refs.refStoreShopCart && $refs.refStoreShopCart.getShopList()"
		></JSpecificationScreen>

		<tui-toast ref="toast"></tui-toast>

		<view v-if="currentMenu === 0 && brandDetail.id && brandDetail.name">
			<StoreShopCart ref="refStoreShopCart" :brand-id="brandDetail.id" :brand-name="brandDetail.name"></StoreShopCart>
		</view>
	</view>
</template>

<script>
import StoreShopCart from './components/StoreShopCart.vue'
import BrandInfo from './components/BrandInfo'
import { getBrandDetailApi } from '../../api/brand'
import { collectionApi } from '../../api/goods'
import AppraisePane from './components/AppraisePane.vue'
import GrouponWrapper from './components/GrouponWrapper.vue'
import CouponList from './components/CouponList.vue'
import Reservation from './components/Reservation.vue'
import Seckill from './components/Seckill.vue'
import Raffle from './components/Raffle.vue'
import { getUserId, navigationAddress } from '../../utils'

export default {
	name: 'Detail',
	components: {
		BrandInfo,
		StoreShopCart,
		AppraisePane,
		GrouponWrapper,
		CouponList,
		Reservation,
		Seckill,
		Raffle
	},

	data() {
		return {
			successCb: () => {
				const pages = getCurrentPages()
				if (pages[pages.length - 2].route === 'pages/store/store') uni.$emit('sendStoreDetailMsg', { data: { meaning: 'refreshCurrentData' } })
			},
			yuanH: uni.upx2px(816), // 用于tabNav判定初始位置的值。455-47
			isNavGaFixed: false, // 是否定位顶部导航栏
			isTabFixed: false, // tab切换栏是否固定定位
			navOpacity: 0, // 控制导航栏透明度
			isShowCouponListPopup: false,

			currentMenu: 0,
			brandId: null,
			brandDetail: {},
			isFirstShowCoupon: false,
			paneOverflowY: 'hidden'
		}
	},

	onLoad(options) {
		this.brandId = options.brandId
		this.getBrandDetail()
	},

	methods: {
		async getBrandDetail() {
			const { data } = await getBrandDetailApi({
				id: this.brandId,
				longitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[0],
				latitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[1],
				userId: getUserId()
			})
			this.brandDetail = data || {}
			// #ifdef H5
			this.$nextTick(() => {
				this.handleShareServe(true)
			})
			// #endif
		},

		// 打开优惠券
		handleOpenCoupon() {
			if (!this.isFirstShowCoupon) this.isFirstShowCoupon = true
			this.isShowCouponListPopup = true
		},

		// 切换 nav
		handleChangeNavs(e) {
			this.currentMenu = e.index
		},

		// 收藏商家
		async handleFollowBrand() {
			const { data } = await collectionApi({
				userId: getUserId(),
				// brandId: this.brandDetail.id,
				// is: !this.brandDetail.is,
				valueId: this.brandDetail.id,
				type: 2
			})
			this.ttoast(`${this.brandDetail.is ? '取消收藏' : '收藏'}成功`)
			this.brandDetail.is = !this.brandDetail.is
			console.log(data)
		},

		// 分享
		handleShareServe(isQuit) {
			if (!this.isLogin()) return
			const data = {
				data: {
					title: `巨蜂本地生活商圈 - ${this.brandDetail.name}`,
					desc: this.brandDetail.desc,
					link: `https://h5.jfcmei.com/#/pages/store/detail/detail?brandId=${this.brandDetail.id}`,
					imageUrl: this.common.seamingImgUrl(this.brandDetail.picUrl)
				},
				successCb: () => { },
				failCb: () => { }
			}
			this.$refs.beeWxShareRef.share(data, isQuit)
		},

		// 导航
		handleNavigate() {
			if (!this.brandDetail.address) {
				uni.showToast({
					title: '商家地址有误，导航失败',
					icon: 'none'
				})
				return
			}
			navigationAddress(`${this.brandDetail.longitude},${this.brandDetail.latitude}`)
		}
	},
	onPageScroll(e) {
		if (e.scrollTop >= 34) {
			this.navOpacity = e.scrollTop / 200
			this.isNavGaFixed = true
		} else {
			this.navOpacity = 0
			this.isNavGaFixed = false
		}
		if (e.scrollTop < this.yuanH) {
			this.isTabFixed = false
			this.paneOverflowY = 'hidden'
		} else {
			this.isTabFixed = true
			this.paneOverflowY = 'auto'
		}
		// if (this.currentMenu === 0 || this.currentMenu === 2) {
		// 	uni.createSelectorQuery().in(this)
		// 		.select('.brand-pane')
		// 		.boundingClientRect((data) => {
		// 			console.log(data.top)
		// 		})
		// 		.exec()
		// }
	}
}
</script>

<style lang="scss" scoped>
.brand-detail-container {
	position: relative;
	width: 100vw;
	min-height: 100vh;
	padding-bottom: 120upx;

	.isFixed {
		position: fixed;
		top: 0;
		left: 0;
	}

	.isAbsolute {
		position: absolute;
		top: 70rpx;
	}

	.sticky-fixed {
		// position: fixed;
		top: 80rpx !important;
	}

	.navgation_top {
		box-sizing: border-box;
		// margin-top: 72rpx;
		padding: 15rpx 40rpx;
		width: 100vw;
		z-index: 3;
		display: flex;
		justify-content: space-between;

		image {
			width: 38rpx;
			height: 38rpx;
		}

		.imgbg {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 66rpx;
			height: 66rpx;
			border-radius: 50%;
			background: rgba(0, 0, 0, 0.61);
		}

		.fnButton {
			display: flex;

			.imgbg {
				margin-left: 10rpx;
			}
		}
	}

	.swiper {
		z-index: 2;
		width: 100vw;
		height: 400rpx;

		.bannerItem {
			width: 100vw;
			height: 400rpx;
		}
	}

	.main {
		clear: both;
		position: relative;

		.favorable {
			box-sizing: border-box;
			padding: 0rpx 18rpx;
			margin-bottom: 25rpx;
			width: 100vw;
			background-color: white;
			border-radius: 10rpx;

			.navGationBar {
				display: flex;
				justify-content: space-between;
				align-items: center;
				box-sizing: border-box;
				// background-color: white;
				position: relative;
				width: 100%;
				min-height: 74rpx;
				padding: 8rpx 36rpx 14rpx 24upx;
			}

			.favorableItem {
				margin-right: 30rpx;
				border-radius: 5rpx;
				display: inline-block;
				background-color: #FF5353;
				font-size: 24rpx;
				font-weight: normal;
				color: #FFFFFF;

				>span {
					font-size: 28rpx;
					box-sizing: border-box;
				}

				>span:nth-of-type(1) {
					padding: 5rpx 10rpx;
					border-right: 1px dashed white;
				}

				>span:nth-of-type(2) {
					padding: 5rpx 8rpx;
				}
			}
		}
	}

	/deep/ .tui-popup-class.tui-bottom-popup {
		height: 85vh !important;
	}

	.brand-pane {
		background-color: #fff;
		padding: 4upx 20upx 0 20upx;
		box-sizing: border-box;

		.goods-list {
			margin-top: 20upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
		}
	}
}

</style>
