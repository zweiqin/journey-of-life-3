<template>
  <view class="community-center-container">
    <TuanAppShim bg="#fedfcd"></TuanAppShim>

    <!-- 是否有人邀请成为股东 -->
    <CheckShareholderInvite ref="checkShareholderInviteRef"></CheckShareholderInvite>
    <view class="page-header">
      <view style="padding: 0 30upx">
        <view class="top-title"></view>
        <!-- 搜索 -->
        <view v-show="scrollTop <= 300" class="search-bar">
          <view class="location">
            <TuanLocation>
              <view class="address-text">{{ $store.getters.currentCity || '定位失败' }}</view>
            </TuanLocation>
            <tui-icon name="turningdown" :size="34" unit="rpx" color="#222229" margin="0 0 0 2rpx"></tui-icon>
          </view>
          <view class="placeholder" @click="go('/community-center/search')">12大类，200+家居服务</view>
          <tui-icon name="search" :size="32" unit="rpx" color="#ef530e" margin="0"></tui-icon>
        </view>

        <view class="tip-blod-title">生活好帮手 尽在团蜂社区</view>
        <view class="image-list">
          <image :src="common.seamingImgUrl('1716517536510-p-1.png')" class="p-img" @click="go('/community-center/service-sort/index?value=288&name=家政服务')"></image>
          <image :src="common.seamingImgUrl('1716517542887-p-2.png')" class="p-img" @click="go('/community-center/service-sort/index?value=2&name=家具维保')"></image>
          <image :src="common.seamingImgUrl('1716517546905-p-3.png')" class="p-img" @click="go('/community-center/service-sort/index?value=13&name=旧房翻新')"></image>
        </view>
      </view>
    </view>

    <view style="background: linear-gradient(180deg, #ffffff 0%, #f4f4f4); padding-bottom: 30upx">
      <view style="padding: 0 22upx; width: 100%; box-sizing: border-box; margin-bottom: 24upx">
        <ServeMenus></ServeMenus>
        <!-- <VipPackage :scroll-top="scrollTop"></VipPackage> -->
        <SummerPackage @empty-login="$data._isShowTuiModel = true"></SummerPackage>

        <view style="display: flex; justify-content: space-between; align-items: stretch; margin-top: 20rpx">
          <view style="position: relative; width: 30.2%; height: 310rpx; background-color: #f6f6f6; overflow: hidden" @click="go('/community-center/service-detail/index?id=1')">
            <!-- <view style="position: absolute;top: 18rpx;left: 10rpx;">
					<view style="font-size: 32rpx;font-weight: bold;">全屋整装</view>
					<view style="margin-top: 16rpx;font-size: 24rpx;color: #333333;">让您的生活空间焕然一新 尽享舒适与品质</view>
					<image
					style="width: 200rpx;" :src="common.seamingImgUrl('1710933374752-quanwuzhengzhuang-bg.png')"
					mode="widthFix"
					/>
					</view> -->
            <image style="width: 100%; height: 100%" :src="common.seamingImgUrl('1710933374752-quanwuzhengzhuang-bg.png')" mode="scaleToFill" />
          </view>
          <view style="width: 34%">
            <view style="height: 150rpx; background-color: #f6f6f6; overflow: hidden" @click="go('/community-center/service-detail/index?id=3')">
              <!-- <view style="position: relative;height: 100%;padding: 18rpx 0 0 10rpx;box-sizing: border-box;">
						<view style="font-size: 32rpx;font-weight: bold;">阳台改造</view>
						<view style="margin-top: 6rpx;font-size: 24rpx;color: #333333;">阳台换新颜</view>
						<image
						style="position: absolute;bottom: 0;right: 0;width: 114rpx;"
						:src="common.seamingImgUrl('1710933435472-yangtaigaizao-bg.png')" mode="widthFix"
						/>
						</view> -->
              <image style="width: 100%; height: 100%" :src="common.seamingImgUrl('1710933435472-yangtaigaizao-bg.png')" mode="scaleToFill" />
            </view>
            <view style="height: 150rpx; margin-top: 10rpx; background-color: #f6f6f6; overflow: hidden" @click="go('/community-center/service-detail/index?id=4')">
              <!-- <view style="position: relative;height: 100%;padding: 18rpx 0 0 10rpx;box-sizing: border-box;">
						<view style="font-size: 32rpx;font-weight: bold;">窗帘升级</view>
						<view style="margin-top: 6rpx;font-size: 24rpx;color: #333333;">设计更时尚</view>
						<image
						style="position: absolute;bottom: 0;right: 0;width: 124rpx;"
						:src="common.seamingImgUrl('1710933544682-chuanglianshengji-bg.png')" mode="widthFix"
						/>
						</view> -->
              <image style="width: 100%; height: 100%" :src="common.seamingImgUrl('1710933544682-chuanglianshengji-bg.png')" mode="scaleToFill" />
            </view>
          </view>
          <view style="width: 34%">
            <view style="height: 150rpx; background-color: #f6f6f6; overflow: hidden" @click="go('/community-center/service-detail/index?id=2')">
              <!-- <view style="position: relative;height: 100%;padding: 18rpx 0 0 10rpx;box-sizing: border-box;">
						<view style="font-size: 32rpx;font-weight: bold;">卫生间改造</view>
						<view style="margin-top: 6rpx;font-size: 24rpx;color: #333333;">空间再释放</view>
						<image
						style="position: absolute;bottom: -20rpx;right: -10rpx;width: 132rpx;"
						:src="common.seamingImgUrl('1710933618047-weishengjiangaizao-bg.png')" mode="widthFix"
						/>
						</view> -->
              <image style="width: 100%; height: 100%" :src="common.seamingImgUrl('1710933618047-weishengjiangaizao-bg.png')" mode="scaleToFill" />
            </view>
            <view style="height: 150rpx; margin-top: 10rpx; background-color: #f6f6f6; overflow: hidden" @click="go('/community-center/service-detail/index?id=5')">
              <!-- <view style="position: relative;height: 100%;padding: 18rpx 0 0 10rpx;box-sizing: border-box;">
						<view style="font-size: 32rpx;font-weight: bold;">家具翻新</view>
						<view style="margin-top: 6rpx;font-size: 24rpx;color: #333333;">焕新如初见</view>
						<image
						style="position: absolute;bottom: -18rpx;right: 0;width: 184rpx;"
						:src="common.seamingImgUrl('1710933645837-jiajufanxin-bg.png')" mode="widthFix"
						/>
						</view> -->
              <image style="width: 100%; height: 100%" :src="common.seamingImgUrl('1710933645837-jiajufanxin-bg.png')" mode="scaleToFill" />
            </view>
          </view>
        </view>
      </view>

      <ServerPane v-for="(item, index) in servePaneList" :id="item.id" :key="index" :title="item.title" :list="item.children"></ServerPane>
    </view>

    <!-- 组件支持 -->
    <tui-toast ref="toast"></tui-toast>

    <!-- #ifdef APP -->
    <!-- 检查更新 -->
    <CheckedVersion ref="checkedVersion"></CheckedVersion>
    <!-- #endif -->

    <tui-modal :show="$data._isShowTuiModel" title="提示" content="您还未 登录，是否先去登录？" @click="_handleClickTuiModel($event, 'login', '')"></tui-modal>

    <BeeWxShare ref="beeWxShareRef" @click="handleInitShare"></BeeWxShare>

    <!-- 判断微信绑定手机号 -->
    <TuanWXLoginBindMobile ref="tuanWXLoginBindMobileRef" @close="handleResetGlobal" @success="handleBindPhoneSuccess"></TuanWXLoginBindMobile>

    <!-- 弹出关注公众号 -->
    <TuanFollowOfficialAccount ref="tuanFollowOfficialAccountRef"></TuanFollowOfficialAccount>

		<!-- go('/another-tf/another-user/temporary-recruitment-activities/activity-details') -->
    <PopupInformation v-show="popupImageUrl" ref="popupInformationRef" popup-type="activity" :img-url="popupImageUrl" @close="handleShowBindMobilePopup" @click="handleToActiveDetail">
      <view class="tip" slot="tip">参与即可获得 300 元代金券，机会难得</view>
    </PopupInformation>
    <PopupInformation
			ref="refTempPopupInformation" popup-type="temporaryRecruitmentActivities"
			:img-url="common.seamingImgUrl('1726131254304-activity-entrance-bg.png')"
			@click="go('/another-tf/another-user/temporary-recruitment-activities/activity-details')"
		></PopupInformation>

    <DragButton text="联系客服" is-dock exist-tab-bar @btnClick="go('/another-tf/another-user/chat/chat-detail?chat=serviceAssistant')"></DragButton>
  </view>
</template>

<script>
import { A_TF_MAIN } from '../../config'
import { T_SELECTED_ADDRESS, T_COMMUNITY_ORDER_NO, USER_INFO, USER_ID, ENTERPRISE_ORDERS_NO, IS_SWITCH_ORDER } from '../../constant'
import { getServiceSortApi } from '../../api/community-center'
import { getSelectLevelPlatformRelationApi } from '../../api/anotherTFInterface'
import PopupInformation from '../../components/popup-information/popup-information'
import CheckShareholderInvite from './cpns/CheckShareholderInvite.vue'
import showModal from 'mixin/showModal'
import { CHANGE_IS_IN_MINIPROGRAM } from '../../store/modules/type'
import TuanFollowOfficialAccount from './cpns/TuanFollowOfficialAccount.vue'
import SummerPackage from './cpns/SummerPackage.vue'
// import PageBar from './cpns/PageBar.vue'
import ServeMenus from './cpns/ServeMenus.vue'
// import VipPackage from './cpns/VipPackage.vue'
import ServerPane from './cpns/ServerPane.vue'
// import FourSeasonsZone from './cpns/FourSeasonsZone.vue'
// 赚小钱
import { getUpActivityListApi } from '../../api/community-center'
import { importJsSDK } from '../../utils'

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
    // VipPackage,
    // FourSeasonsZone,
    ServerPane,
    PopupInformation,
    SummerPackage,
    CheckShareholderInvite
  },
  mixins: [showModal()],
  data() {
    return {
      data: [],
      pupupLevelType: '',
      popupImageUrl: null,
      servePaneList: [],
      scrollTop: 0,
      timer: null,
      activityList: [],
      isEmptyAddress: false
    }
  },
  onShow() {
    try {
      if ((window.location.origin + window.location.pathname + window.location.hash).includes('miniProgram')) {
        this.$store.commit(`app/${CHANGE_IS_IN_MINIPROGRAM}`, true)
      }
    } catch (error) {
      console.log(error)
    }
    uni.removeStorageSync(T_COMMUNITY_ORDER_NO)
    uni.removeStorageSync(ENTERPRISE_ORDERS_NO)
    this.getActivityList()
    this.showVipPostPopup()
    this.$nextTick(() => {
      this.$refs.checkShareholderInviteRef.check()
    })
  },
  mounted() {
    this.handleInitShare()
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
		this.$refs.refTempPopupInformation && this.$refs.refTempPopupInformation.show()
  },

  methods: {
    // 获取活动订单列表
    async getActivityList() {
      try {
        let currentAddress = this.$store.getters.detailAddress
        if (!currentAddress) {
          // #ifdef APP
          const lastAddress = uni.getStorageSync(T_SELECTED_ADDRESS)
          if (lastAddress) {
            currentAddress = lastAddress.data.province + lastAddress.data.city + lastAddress.data.district + lastAddress.data.town
          }
          // #endif
          // #ifndef APP
          const { detail } = await this.$store.dispatch('location/getCurrentLocation')
          currentAddress = detail
          // #endif
        }
        const res = await getUpActivityListApi({ focus: 'up', address: currentAddress })
        if (res.statusCode === 20000) {
          const activityList = res.data.activities
          if (activityList.length) {
            this.activityList = activityList
            this.popupImageUrl = activityList[0].id == 1 ? require('../../static/images/con-center/popup-image.png') : activityList[0].cover
            this.showVipPostPopup()
          } else {
            this.activityList = []
            this.popupImageUrl = undefined
          }
        }
      } catch (error) {}
    },
    // 点击去弹窗详情
    handleToActiveDetail() {
      if (this.isLogin()) {
        // this.go('/community-center/vip-center/vip-detail?type=2')

        // 上一个版本的弹窗
        // if (this.pupupLevelType === 1) this.go('/another-tf/another-user/user-upgrade/purchase-chain-goods');
        // else if (this.pupupLevelType === 2) this.go('/another-tf/another-user/user-upgrade/user-upgrade-application');
        // else if (this.pupupLevelType === 4) this.go('/another-tf/another-user/user-upgrade/user-upgrade-application');

        // 300清洗套餐

        uni.navigateTo({ url: '/user/sever/activityCenter/activity-detail?id=' + this.activityList[0].id })
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
          title: '团蜂生活社区服务中心',
          desc: '团蜂社区服务，点击下载',
          link: `${A_TF_MAIN}/#/`,
          imageUrl: `${A_TF_MAIN}/static/images/new-user/fee.icon.png`
        },
        successCb: () => {},
        failCb: () => {}
      }
      await this.$refs.beeWxShareRef.share(data, isQuit)
    },

    // 检查当前是否绑定手机号
    checkedWXBindMobile() {
      if (this.$store.getters.popupImage) return
      if (this.isLogin()) this.$store.dispatch('auth/refrshUserInfoAction', this.handleShowBindMobilePopup)
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
      if (!userId) return (app.globalData.isShowCommunityPopup = false)
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

      if (app.globalData.isShowCommunityPopup) {
        await getSelectLevelPlatformRelationApi({})
          .then((res) => {
            this.pupupLevelType = res.data ? res.data.levelType : ''
            if (res.data && res.data.levelType === 1) (app.globalData.isShowCommunityPopup = true) && (this.popupImageUrl = require('../../static/images/new-community/home/ad1.png')) // 没购买产品
            else if (res.data && res.data.levelType === 2)
              (app.globalData.isShowCommunityPopup = true) && (this.popupImageUrl = require('../../static/images/user/activity/upgrade-regimental-commander.png')) // 已购买产品，且不是团长
            else if (res.data && res.data.levelType === 3) app.globalData.isShowCommunityPopup = false // 已是团长，但不满足团长升合伙人条件
            else if (res.data && res.data.levelType === 4)
              (app.globalData.isShowCommunityPopup = true) && (this.popupImageUrl = require('../../static/images/user/activity/upgrade-regimental-partner.png')) // 已是团长，且满足团长升合伙人条件
            else if (res.data && res.data.levelType === 5) app.globalData.isShowCommunityPopup = false // 已经是合伙人
            else if (res.data && res.data.levelType === 0) app.globalData.isShowCommunityPopup = false // 其它情况
          })
          .catch((e) => {
            app.globalData.isShowCommunityPopup = false // 报错情况
          })
      }
    },

    async showVipPostPopup() {
      // await this.isShowVipPostPopup()
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
  },

  onLoad(options) {
    this.$store.commit(`app/${CHANGE_IS_IN_MINIPROGRAM}`, !!options.miniProgram)
    importJsSDK()
    if (options.isCommunityOrder || uni.getStorageSync(IS_SWITCH_ORDER)) {
      uni.setStorageSync(IS_SWITCH_ORDER, 1)
      uni.switchTab({ url: '/pages/order/order' })
    }
    if (options.jumpType) {
      uni.redirectTo({
        url: `/pages/jump/jump?userId=&type=${options.jumpType}&code=${options.code}`
      })
    }
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

  .tip {
    font-size: 28upx;
    color: #fff;
    font-weight: 500;
    margin: 30rpx 0;
  }
}
</style>
