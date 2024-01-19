<template>
	<view class="community-center-container">
		<TuanAppShim bg="#fedfcd"></TuanAppShim>
		<view class="page-header">
			<view style="padding: 0 30upx">
				<view class="top-title"></view>
				<!-- 搜索 -->
				<view v-show="scrollTop <= 300" class="search-bar">
					<view class="location">
						<TuanLocation>
							<view class="address-text">{{ $store.getters.currentCity || '定位失败' }}</view>
						</TuanLocation>
						<image class="angle" src="../../static/images/new-community/home/arrow-down.png"></image>
					</view>
					<view class="placeholder" @click="go('/community-center/search')">12大类，200+家居服务</view>
					<image class="search-icon" src="../../static/images/new-community/home/searc-icon.png"></image>
				</view>

				<view class="tip-blod-title">生活好帮手 尽在团蜂社区</view>
				<view class="image-list">
					<image src="../../static/images/new-community/home/p-1.png" class="p-img"
						@click="go('/community-center/service-sort?value=1')"></image>
					<image src="../../static/images/new-community/home/p-2.png" class="p-img"
						@click="go('/community-center/service-sort?value=3')"></image>
					<image src="../../static/images/new-community/home/p-3.png" class="p-img"
						@click="go('/community-center/service-sort?value=4')"></image>
				</view>
			</view>
		</view>

		<view style="background: linear-gradient(180deg, #ffffff 0%, #f4f4f4); padding-bottom: 30upx">
			<view style="padding: 0 30upx; width: 100%; box-sizing: border-box; margin-bottom: 24upx">
				<ServeMenus></ServeMenus>
				<VipPackage @view499="handleToActiveDetail" :scroll-top="scrollTop"></VipPackage>
			</view>
			
			<!-- 赚小钱 -->
			<view class="MakeSmallFortune">
				<MakeSmallFortune ref="refMakeSmallFortune"></MakeSmallFortune>
			</view>

			<!-- 四季专区 -->
			<!-- <FourSeasonsZone></FourSeasonsZone> -->

			<ServerPane v-for="(item, index) in servePaneList" :id="item.id" :key="index" :title="item.title"
				:list="item.children">
			</ServerPane>
		</view>

		<!-- 组件支持 -->
		<tui-toast ref="toast"></tui-toast>

		<!-- #ifdef APP -->
		<!-- 检查更新 -->
		<CheckedVersion ref="checkedVersion"></CheckedVersion>
		<!-- #endif -->

		<tui-modal :show="$data._isShowTuiModel" title="提示" content="您还未登录，是否先去登录？"
			@click="_handleClickTuiModel($event, 'login', '')"></tui-modal>

		<BeeWxShare ref="beeWxShareRef" @click="handleInitShare"></BeeWxShare>

		<!-- 判断微信绑定手机号 -->
		<TuanWXLoginBindMobile ref="tuanWXLoginBindMobileRef" @close="handleResetGlobal" @success="handleBindPhoneSuccess">
		</TuanWXLoginBindMobile>

		<!-- 弹出关注公众号 -->
		<TuanFollowOfficialAccount ref="tuanFollowOfficialAccountRef"></TuanFollowOfficialAccount>

		<PopupInformation ref="popupInformationRef" popup-type="upgrade" :img-url="popupImageUrl"
			@close="handleShowBindMobilePopup" @click="handleToActiveDetail">
		</PopupInformation>
	</view>
</template>

<script>
import { A_TF_MAIN } from '../../config'
import { bannerListIcon } from './config'
import { T_COMMUNITY_ORDER_NO, USER_INFO, USER_ID, ENTERPRISE_ORDERS_NO } from '../../constant'
import { getServiceSortApi } from '../../api/community-center'
import { getSelectLevelPlatformRelationApi } from '../../api/anotherTFInterface'
import PopupInformation from '../../components/popup-information/popup-information'
import showModal from 'mixin/showModal'
import { CHANGE_IS_IN_MINIPROGRAM } from '../../store/modules/type'
import TuanFollowOfficialAccount from './cpns/TuanFollowOfficialAccount.vue'
// import PageBar from './cpns/PageBar.vue'
import ServeMenus from './cpns/ServeMenus.vue'
import VipPackage from './cpns/VipPackage.vue'
import ServerPane from './cpns/ServerPane.vue'
// import FourSeasonsZone from './cpns/FourSeasonsZone.vue'
// 赚小钱
import MakeSmallFortune from './cpns/MakeSmallFortune.vue'

const app = getApp()

export default {
	name: 'CommunityCenterr',
	onReady() {
		console.log(app)
	},
	components: {
		TuanFollowOfficialAccount,
		// PageBar,
		ServeMenus,
		VipPackage,
		// FourSeasonsZone,
		ServerPane,
		PopupInformation,
		MakeSmallFortune
	},
	mixins: [showModal()],
	data() {
		return {
			bannerListIcon: Object.freeze(bannerListIcon),
			data: [],
			pupupLevelType: '',
			popupImageUrl: '',
			servePaneList: [],
			scrollTop: 0,
			timer: null
		}
	},
	onShow() {
		try {
			if ((window.location.origin + window.location.pathname + window.location.hash).includes('miniProgram')) {
				this.$store.commit(`app/${CHANGE_IS_IN_MINIPROGRAM}`, true)
			}
		} catch (error) {
			console.log(error);
		}
		uni.removeStorageSync(T_COMMUNITY_ORDER_NO)
		uni.removeStorageSync(ENTERPRISE_ORDERS_NO)
		this.$nextTick(() => {
			// this.$refs.vipPackageRef.getDZPersonalizationConfig();
			this.$refs.refMakeSmallFortune && this.$refs.refMakeSmallFortune.getPostList()
		})
		this.showVipPostPopup()
	},
	mounted() {
		// #ifdef APP
		this.$refs.checkedVersion.checkedVersion(true)
		// #endif

		// #ifdef H5
		if (window.location.href.includes('?code')) {
			let clearWXCodeUrl = window.location.origin + window.location.pathname
			if (getApp().globalData.isInMiniprogram) {
				clearWXCodeUrl += '/?miniProgram=1'
			}
			window.location.href = clearWXCodeUrl
		}
		// #endif

		this.getServiceOrder()

		setTimeout(() => {
			this.checkedWXBindMobile()
		}, 1000)

		if (getApp().globalData.isShowFollowOfficialAccount) {
			this.$refs.tuanFollowOfficialAccountRef.show()
		}
	},

	methods: {
		// 点击去弹窗详情
		handleToActiveDetail() {
			if (this.isLogin()) {
				// this.go('/community-center/vip-center/vip-detail?type=2')
				if (this.pupupLevelType === 1) this.go('/another-tf/another-user/user-upgrade/purchase-chain-products')
				else if (this.pupupLevelType === 2) this.go('/another-tf/another-user/user-upgrade/user-upgrade-application')
				else if (this.pupupLevelType === 4) this.go('/another-tf/another-user/user-upgrade/user-upgrade-application')
			} else {
				this.$data._isShowTuiModel = true
			}
		},
		// 获取服务分类
		async getServiceOrder() {
			const res = await getServiceSortApi({})
			if (res.statusCode === 20000) {
				for (const item of res.data) {
					if (this.servePaneList.length > 4) {
						break
					}
					let list = item.children[0].children
					if (list.length < 6 && item.children[1] && item.children[1].children.length >= 6) {
						list = item.children[1].children
					}
					if (list.length % 3 === 0) {
						this.servePaneList.push({
							id: item.id,
							title: item.serverNameOne,
							children: list
						})
					}
				}
			}
		},

		// 初始化分享
		async handleInitShare() {
			await this.handleShareServe(true)
		},

		// 微信分享
		async handleShareServe(isQuit) {
			const data = {
				data: {
					title: '团蜂家居社区服务中心',
					desc: '一切和家居有关的问题，我们都能解决',
					link: `${A_TF_MAIN}/#/`,
					imageUrl: 'https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/8stwtn8hbay7amo0u6hb.png'
				},
				successCb: () => { },
				failCb: () => { }
			}
			await this.$refs.beeWxShareRef.share(data, isQuit)
		},

		// 检查当前是否绑定手机号
		checkedWXBindMobile() {
			if (this.$store.getters.popupImage) {
				return
			}
			this.$store.dispatch('auth/refrshUserInfoAction', this.handleShowBindMobilePopup)
		},

		// 开始绑定手机号
		handleShowBindMobilePopup(refreshUserInfo) {
			if (app.globalData.isShowedBindMobilePopu) {
				return
			}
			const userInfo = refreshUserInfo || uni.getStorageSync(USER_INFO)
			if (userInfo && userInfo.weixinOpenid && !userInfo.phone) {
				this.$refs.tuanWXLoginBindMobileRef.show()
			}
		},

		handleResetGlobal() {
			app.globalData.isShowedBindMobilePopu = true
		},

		onRefresh() {
			const currentAddress = this.$store.getters.currentCity

			try {
				if (currentAddress) {
					this.$store.dispatch('community/getVipPackageList', currentAddress)
				}
			} catch (error) {
				console.log('社区首页刷新报错', error)
			} finally {
				setTimeout(() => {
					uni.stopPullDownRefresh()
				}, 2000)
			}
		},

		handleBindPhoneSuccess() {
			this.$store.dispatch('auth/refrshUserInfoAction')
		},
		// 是否显示金管家或会员升级弹窗
		async isShowVipPostPopup() {
			const userId = uni.getStorageSync(USER_ID)
			if (!userId) return app.globalData.isShowCommunityPopup = false
			// await userIsPurchaseApi({ userId, price: 399 })
			// 	.then((res) => {
			// 		if (res.statusCode === 20000) {
			// 			if (res.data && Array.isArray(res.data) && res.data.length) {
			// 				app.globalData.isShowCommunityPopup = false
			// 			}
			// 		}
			// 	})
			// 	.catch((e) => {
			// 		app.globalData.isShowCommunityPopup = true
			// 	})

			// if (app.globalData.isShowCommunityPopup) {
			// 	await getSelectLevelPlatformRelationApi({ relationshipLevelId: 2 })
			// 		.then((res) => {
			// 			app.globalData.isShowCommunityPopup = false // 满足申请条件（已购买关系链产品或已经是团长）
			// 		})
			// 		.catch((e) => {
			// 			uni.hideToast()
			// 			app.globalData.isShowCommunityPopup = true // 没购买产品
			// 		})
			// }
			if (app.globalData.isShowCommunityPopup) {
				await getSelectLevelPlatformRelationApi({})
					.then((res) => {
						this.pupupLevelType = res.data ? res.data.levelType : ''
						if (res.data && res.data.levelType === 1) (app.globalData.isShowCommunityPopup = true) && (this.popupImageUrl = require('../../static/images/new-community/home/ad1.png')) // 没购买产品
						else if (res.data && res.data.levelType === 2) (app.globalData.isShowCommunityPopup = true) && (this.popupImageUrl = require('../../static/images/user/activity/upgrade-regimental-commander.png')) // 已购买产品，且不是团长
						else if (res.data && res.data.levelType === 3) app.globalData.isShowCommunityPopup = false // 已是团长，但不满足团长升合伙人条件
						else if (res.data && res.data.levelType === 4) (app.globalData.isShowCommunityPopup = true) && (this.popupImageUrl = require('../../static/images/user/activity/upgrade-regimental-partner.png')) // 已是团长，且满足团长升合伙人条件
						else if (res.data && res.data.levelType === 5) app.globalData.isShowCommunityPopup = false // 已经是合伙人
						else if (res.data && res.data.levelType === 0) app.globalData.isShowCommunityPopup = false // 其它情况
					})
					.catch((e) => {
						app.globalData.isShowCommunityPopup = false // 报错情况
					})
			}
		},

		async showVipPostPopup() {
			await this.isShowVipPostPopup()
			if (app.globalData.isShowCommunityPopup) {
				this.timer = setTimeout(() => {
					if (app.globalData.communityPopupCount < 4) {
						app.globalData.communityPopupCount = app.globalData.communityPopupCount + 1
						this.$refs.popupInformationRef && this.$refs.popupInformationRef.show()
					} else {
						clearTimeout(this.timer)
						this.timer = null
						app.globalData.isShowCommunityPopup = false
					}
				}, 500)
			}
		}
	},

	onLoad(options) {
		this.$store.commit(`app/${CHANGE_IS_IN_MINIPROGRAM}`, !!options.miniProgram)
		// #ifdef H5
		const script = document.createElement('script')
		script.src = 'https://res.wx.qq.com/open/js/jweixin-1.4.0.js'
		document.body.appendChild(script)
		setTimeout(() => {
			this.handleInitShare()
		}, 500)
		// #endif
		// }
	},

	onPageScroll(e) {
		this.scrollTop = e.scrollTop
	},

	onPullDownRefresh() {
		this.onRefresh()
	},

	onHide() {
		clearTimeout(this.timer)
		this.timer = null
	}
}
</script>

<style lang="less" scoped>
.fix {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 1000;
	height: 120upx;
	transition: height 350ms ease-out;
	overflow: hidden;
	background-color: #fff !important;
	box-shadow: 0 0 10px 2px #f5f5f7;
}

@keyframes search-bar {
	0% {
		transform: scale(0);
	}

	100% {
		transform: scale(0.9);
	}
}

.community-center-container {
	min-height: 100vh;
	// background-color: #f5f5f7;
	padding-bottom: 100upx;
	overflow: hidden;
	// transition: all 350ms ease-in;

	.page-header {
		position: relative;
		z-index: 100;
		background: linear-gradient(180deg, #ff9e73 -97%, #f9d0a6 -50%, rgba(255, 158, 115, 0) 42%);

		.top-title {
			position: relative;
			height: 97upx;
			width: 100%;
			// background-color: #ef530e;
			padding-top: 30upx;
			box-sizing: border-box;
			font-size: 32upx;
			color: #fff;
		}
	}

	.search-bar {
		width: 100%;
		border-radius: 100upx;
		height: 72upx;
		background-color: #fff;
		padding: 14upx 29upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		border: 1upx solid #ef530e;

		&.fix {
			position: fixed;
			top: 24upx;
			left: 0;
			right: 0;
			z-index: 1100;
			width: 690upx;
			margin: 0 auto;
			// padding: 0 30upx;
			box-sizing: border-box;
			animation: search-bar 500ms ease-out;
			box-shadow: none;
			background-color: #fff;
			border: 1upx solid #ef530e;
		}

		.placeholder {
			position: relative;
			color: #c0bec1;
			font-size: 28upx;
			flex: 1;
			color: #ef530e;
		}

		.search-icon {
			width: 32upx;
			height: 32upx;
			flex-shrink: 0;
		}

		.location {
			display: flex;
			align-items: center;

			.address-text {
				color: #222229;
				font-size: 28upx;
			}

			.angle {
				width: 36upx;
				height: 36upx;
				margin-left: 6upx;
			}
		}

		.uni-btn {
			width: 112upx;
			height: 56upx;
			border-radius: 100upx;
			background: linear-gradient(270deg, #ef530e 0%, #ee6c33 100%);
			font-size: 24upx;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.tip-blod-title {
		font-size: 34upx;
		color: #222229;
		font-weight: bold;
		margin: 34upx 0 14upx;
		text-align: center;
	}

	.image-list {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.p-img {
			position: relative;
			width: 176upx;
			height: 242upx;
			overflow: inherit !important;

			&::after {
				content: '';
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				width: 128upx;
				height: 15upx;
				opacity: 0.2;
				background: #fc634f;
				filter: blur(8px);
			}

			&:nth-child(2) {
				&::after {
					background: #1a76f2;
				}
			}

			&:nth-child(3) {
				&::after {
					background: #3cd59c;
				}
			}
		}
	}
}
</style>
