<template>
  <view class="community-center-container">
    <TuanAppShim bg="#fedfcd"></TuanAppShim>
    <view class="page-header">
      <view style="padding: 0 30upx">
        <view class="top-title"></view>
        <!-- 搜索 -->
        <view class="search-bar" v-show="scrollTop <= 300">
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
          <image @click="go('/community-center/service-sort?value=1')" src="../../static/images/new-community/home/p-1.png" class="p-img"></image>
          <image @click="go('/community-center/service-sort?value=3')" src="../../static/images/new-community/home/p-2.png" class="p-img"></image>
          <image @click="go('/community-center/service-sort?value=4')" src="../../static/images/new-community/home/p-3.png" class="p-img"></image>
        </view>
      </view>
    </view>

    <view style="background: linear-gradient(180deg, #ffffff 0%, #f4f4f4); padding-bottom: 30upx">
      <view style="padding: 0 30upx; width: 100%; box-sizing: border-box; margin-bottom: 24upx">
        <ServeMenus></ServeMenus>
        <VipPackage :scrollTop="scrollTop"></VipPackage>
      </view>

      <view class="MakeSmallFortune">
        <MakeSmallFortune ref="refMakeSmallFortune"></MakeSmallFortune>
      </view>

      <!-- 四季专区 -->
      <!-- <FourSeasonsZone></FourSeasonsZone> -->

      <ServerPane :id="item.id" v-for="(item, index) in servePaneList" :key="index" :title="item.title" :list="item.children"> </ServerPane>
    </view>

    <!-- 组件支持 -->
    <tui-toast ref="toast"></tui-toast>

    <!-- #ifdef APP -->
    <!-- 检查更新 -->
    <CheckedVersion ref="checkedVersion"></CheckedVersion>
    <!-- #endif -->

    <tui-modal :show="$data._isShowTuiModel" title="提示" content="您还未登录，是否先去登录？" @click="_handleClickTuiModel($event, 'login', '')"></tui-modal>

    <BeeWxShare ref="beeWxShareRef" @click="handleInitShare"></BeeWxShare>

    <!-- 判断微信绑定手机号 -->
    <TuanWXLoginBindMobile @close="handleResetGlobal" @success="handleBindPhoneSuccess" ref="tuanWXLoginBindMobileRef"></TuanWXLoginBindMobile>

    <!-- 弹出关注公众号 -->
    <TuanFollowOfficialAccount ref="tuanFollowOfficialAccountRef"></TuanFollowOfficialAccount>

    <PopupInformation
      @close="handleShowBindMobilePopup"
      ref="popupInformationRef"
      popup-type="activity"
      :imgUrl="require('../../static/images/new-community/home/ad.png')"
      @click="handleToActiveDetail"
    >
    </PopupInformation>
  </view>
</template>

<script>
import { bannerListIcon, vipBarConfig } from './config';
import { COMMUNITY_ORDER_NO, USER_INFO, USER_ID } from '../../constant';
import { getServiceSortApi } from '../../api/community-center';
import { userIsPurchaseApi } from '../../api/user';

import PopupInformation from '../../components/popup-information/popup-information';
import showModal from 'mixin/showModal';
import { CHANGE_IS_IN_MINIPROGRAM } from '../../store/modules/type';
import TuanFollowOfficialAccount from './cpns/TuanFollowOfficialAccount.vue';
import PageBar from './cpns/PageBar.vue';
import ServeMenus from './cpns/ServeMenus.vue';
import VipPackage from './cpns/VipPackage.vue';
import ServerPane from './cpns/ServerPane.vue';
import FourSeasonsZone from './cpns/FourSeasonsZone.vue';
// 赚小钱
import MakeSmallFortune from './cpns/MakeSmallFortune.vue';
import user from 'store/modules/user';

const app = getApp();

export default {
  onReady() {
    console.log(app);
  },
  components: {
    TuanFollowOfficialAccount,
    PageBar,
    ServeMenus,
    VipPackage,
    FourSeasonsZone,
    ServerPane,
    PopupInformation,
    MakeSmallFortune
  },
  mixins: [showModal()],
  data() {
    return {
      bannerListIcon: Object.freeze(bannerListIcon),
      data: [],
      url: '',
      isShowPic: false,
      serverPrice: '',
      serverName: '',
      serverType: '',
      className: '',
      vipBarConfig: Object.freeze(vipBarConfig),
      servePaneList: [],
      scrollTop: 0,
      timer: null
    };
  },
  onShow() {
    uni.removeStorageSync(COMMUNITY_ORDER_NO);
    this.$nextTick(() => {
      // this.$refs.vipPackageRef.getDZPersonalizationConfig();
      this.$refs.refMakeSmallFortune && this.$refs.refMakeSmallFortune.getPostList();
    });

    this.showVipPostPopup();
  },
  mounted() {
    // #ifdef APP
    this.$refs.checkedVersion.checkedVersion(true);
    // #endif

    // #ifdef H5
    if (window.location.href.includes('?code')) {
      let clearWXCodeUrl = window.location.origin + window.location.pathname;
      if (getApp().globalData.isInMiniprogram) {
        clearWXCodeUrl += '/?miniProgram=1';
      }
      window.location.href = clearWXCodeUrl;
    }
    // #endif

    this.getServiceOrder();

    setTimeout(() => {
      this.checkedWXBindMobile();
    }, 1000);

    if (getApp().globalData.isShowFollowOfficialAccount) {
      this.$refs.tuanFollowOfficialAccountRef.show();
    }
  },

  methods: {
    // 点击去弹窗详情
    handleToActiveDetail() {
      if (this.isLogin()) {
        this.go('/community-center/vip-center/vip-detail?type=2');
      } else {
        this.$data._isShowTuiModel = true;
      }
    },
    // 获取服务分类
    async getServiceOrder() {
      const res = await getServiceSortApi({});
      if (res.statusCode === 20000) {
        for (const item of res.data) {
          if (this.servePaneList.length > 4) {
            break;
          }
          let list = item.children[0].children;
          if (list.length < 6 && item.children[1] && item.children[1].children.length >= 6) {
            list = item.children[1].children;
          }
          if (list.length % 3 === 0) {
            this.servePaneList.push({
              id: item.id,
              title: item.serverNameOne,
              children: list
            });
          }
        }
      }
    },

    // 初始化分享
    async handleInitShare() {
      await this.handleShareServe(true);
    },

    // 微信分享
    async handleShareServe(isQuit) {
      const data = {
        data: {
          title: '团蜂家居社区服务中心',
          desc: '一切和家居有关的问题，我们都能解决',
          link: `https://www.tuanfengkeji.cn/TFShop_Uni_H5/#/`,
          imageUrl: 'https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/8stwtn8hbay7amo0u6hb.png'
        },
        successCb: () => {},
        failCb: () => {}
      };
      await this.$refs.beeWxShareRef.share(data, isQuit);
    },

    // 检查当前是否绑定手机号
    checkedWXBindMobile() {
      if (this.$store.getters.popupImage) {
        return;
      }
      this.handleShowBindMobilePopup();
    },

    handleShowBindMobilePopup() {
      if (app.globalData.isShowedBindMobilePopu) {
        return;
      }
      const userInfo = uni.getStorageSync(USER_INFO);
      if (userInfo && userInfo.weixinOpenid && !userInfo.phone) {
        this.$refs.tuanWXLoginBindMobileRef.show();
      }
    },

    handleResetGlobal() {
      app.globalData.isShowedBindMobilePopu = true;
    },

    onRefresh() {
      const currentAddress = this.$store.getters.currentCity;

      try {
        if (currentAddress) {
          this.$store.dispatch('community/getVipPackageList', currentAddress);
        }
      } catch (error) {
        console.log('社区首页刷新报错', error);
      } finally {
        setTimeout(() => {
          uni.stopPullDownRefresh();
        }, 2000);
      }
    },

    handleBindPhoneSuccess() {
      this.$store.dispatch('auth/refrshUserInfo');
    },
    // 是否显示金管家弹窗
    async isShowVipPostPopup() {
      try {
        const userId = uni.getStorageSync(USER_ID);
        if (!userId) {
          return;
        }
        const res = await userIsPurchaseApi({
          userId,
          price: 399
        });

        if (res.statusCode === 20000) {
          if (res.data && Array.isArray(res.data) && res.data.length) {
            app.globalData.isShowCommunityPopup = true;
          }
        } else {
          app.globalData.isShowCommunityPopup = false;
        }
      } catch (error) {
        app.globalData.isShowCommunityPopup = false;
      }
    },

    async showVipPostPopup() {
      await this.isShowVipPostPopup();
      if (!app.globalData.isShowCommunityPopup) {
        this.timer = setTimeout(() => {
          if (app.globalData.communityPopupCount < 4) {
            app.globalData.communityPopupCount = app.globalData.communityPopupCount + 1;
            this.$refs.popupInformationRef && this.$refs.popupInformationRef.show();
          } else {
            clearTimeout(this.timer);
            this.timer = null;
            app.globalData.isShowCommunityPopup = false;
          }
        }, 500);
      }
    }
  },

  onLoad(options) {
    this.$store.commit(`app/${CHANGE_IS_IN_MINIPROGRAM}`, !!options.miniProgram);
    // #ifdef H5
    const script = document.createElement('script');
    script.src = 'https://res.wx.qq.com/open/js/jweixin-1.4.0.js';
    document.body.appendChild(script);

    setTimeout(() => {
      this.handleInitShare();
    }, 500);
    // #endif
    // }
  },

  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },

  onPullDownRefresh() {
    this.onRefresh();
  },

  onHide() {
    console.log('quxiao11');
    clearTimeout(this.timer);
    this.timer = null;
  }
};
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
