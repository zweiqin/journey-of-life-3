<template>
	<view class="brand-detail-container">

		<view style="padding: 16upx 30upx 28upx;background-color: #ffffff;">
			<BeeBack :success-cb="successCb">
				<view style="display: flex;align-items: center;justify-content: space-between;">
					<BeeIcon
						name="arrowleft" :size="34" color="#222229"
						style="width: fit-content;padding: 1upx;border: 1upx solid #eeeeee;border-radius: 50%;line-height: 1;"
					>
					</BeeIcon>
					<text style="flex: 1;margin-left: -40upx;;text-align: center;font-weight: bold;">门店详情</text>
				</view>
			</BeeBack>
			<BrandInfo :brand-detail="brandDetail" @navgation="handleNavigate"></BrandInfo>
		</view>

		<!-- 优惠卷栏 -->
		<view style="background: #F6F6F6;margin-top: 100upx;">
			<view class="favorable" @click="handleOpenCoupon">
				<view class="navGationBar">
					<view class="favorableItem"><span>优惠券</span><span>领</span></view>
					<view>
						<tui-icon name="arrowright" color="#151515" :size="60" unit="upx"></tui-icon>
					</view>
				</view>
			</view>
			<tui-tabs
				:class="{ 'sticky-fixed': isTabFixed }" color="#000" selected-color="#000" :size="35"
				:is-fixed="isTabFixed" slider-bg-color="#FB5D5D" bold
				:tabs="[{ name: '商品' }, { name: '团购' }, { name: '预约' }, { name: '秒杀' }, { name: '抽奖' }]"
				:current-tab="currentMenu" style="z-index: 1;" @change="handleChangeNavs"
			></tui-tabs>
		</view>

		<view class="brand-pane" :style="{ marginTop: isTabFixed ? '80upx' : '0' }">
			<view v-show="currentMenu === 0" class="goods-list" style="width: 100%">
				<!-- <StoreGoodsList
					:brand-detail="brandDetail" :overflow-y="paneOverflowY"
					@click-content="(e) => go(`/pages/store/goods-detail/goods-detail?orderType=1&goodsId=${e.id}`)"
					@add-car="(e) => $refs.refJSpecificationScreen.open(e.id)"
					></StoreGoodsList> -->
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

			<Reservation
				v-if="currentMenu === 2" :brand-detail="brandDetail"
				:is-overflow-y="paneOverflowY === 'auto' ? true : false"
			></Reservation>

			<Seckill v-if="currentMenu === 3" :brand-detail="brandDetail"></Seckill>

			<Raffle v-if="currentMenu === 4" :brand-detail="brandDetail"></Raffle>
		</view>

		<AppraisePane></AppraisePane>

		<tui-bottom-popup :show="isShowCouponListPopup" @close="isShowCouponListPopup = false">
			<view style="padding: 20upx;">
				<!-- <CouponList :brand-detail="brandDetail" :is-first-show-coupon="isFirstShowCoupon"></CouponList> -->
			</view>
		</tui-bottom-popup>

		<!-- <JSpecificationScreen
			ref="refJSpecificationScreen" order-type="1"
			@success="$refs.refStoreShopCart && $refs.refStoreShopCart.getShopList()"
			></JSpecificationScreen> -->

		<tui-toast ref="toast"></tui-toast>

		<view v-if="currentMenu === 0 && brandDetail.id && brandDetail.name">
			<StoreShopCart ref="refStoreShopCart" :brand-id="brandDetail.id" :brand-name="brandDetail.name"></StoreShopCart>
		</view>
	</view>
</template>

<script>
import StoreShopCart from './components/StoreShopCart.vue'
import BrandInfo from './components/BrandInfo'
import { getIndexShopDetailApi } from '../../api/anotherTFInterface'
import AppraisePane from './components/AppraisePane.vue'
import GrouponWrapper from './components/GrouponWrapper.vue'
import CouponList from './components/CouponList.vue'
import Reservation from './components/Reservation.vue'
import Seckill from './components/Seckill.vue'
import Raffle from './components/Raffle.vue'
import { navigationAddress } from '../../utils'

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
			shopId: null,
			brandDetail: {},
			isFirstShowCoupon: false,
			paneOverflowY: 'hidden'
		}
	},

	onLoad(options) {
		this.shopId = options.shopId
		this.getBrandDetail()
	},

	methods: {
		async getBrandDetail() {
			const { data } = await getIndexShopDetailApi({
				shopId: this.shopId,
				longitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[0],
				latitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[1]
			})
			console.log(data)
			this.brandDetail = data || {}
			this.brandDetail = {
				'shopId': 208,
				'collectId': 0,
				'ifCollect': 1,
				'shopName': '大家足专业修脚',
				'shopLogo': 'https://jufeng-shop-1317254189.cos.ap-guangzhou.myqcloud.com/1hkq40u379mr7igjiddc.jpg',
				'shopAdress': '水藤大道56号大家足',
				'coupons': [],
				'shopSeckill': [],
				'shopGroupWork': [],
				'shopDiscount': [],
				'classifyNumber': 1,
				'number': 0,
				'fansNumber': 1,
				'shopType': 2,
				'longitude': '113.0779380',
				'latitude': '22.9170740',
				'isVoucher': 0,
				'classificationId': '96',
				'voucherReturn': '60',
				'areaId': '440606103',
				'buyerUserId': 0,
				'monthlySales': 0,
				'perCapita': 0,
				'startTime': '9:00',
				'endTime': '20:00',
				'advertisement': '',
				'distance': 0,
				'trade': '营业中'
			}
			// // #ifdef H5
			// this.$nextTick(() => {
			// 	this.handleShareServe(true)
			// })
			// // #endif
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

		// 分享
		handleShareServe(isQuit) {
			if (!this.isLogin()) return
			const data = {
				data: {
					title: `巨蜂本地生活商圈 - ${this.brandDetail.name}`,
					desc: this.brandDetail.desc,
					link: `https://h5.jfcmei.com/#/pages/store/detail/detail?shopId=${this.brandDetail.id}`,
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
	}
}
</script>

<style lang="scss" scoped>
.brand-detail-container {
	position: relative;
	min-height: 100vh;
	padding-bottom: 120upx;
	background-color: #f5f4f6;
	box-sizing: border-box;

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

	.sticky-fixed {
		// position: fixed;
		top: 80rpx !important;
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
