<template>
  <view class="community-center-container">
    <TuanAppShim bg="#e95d20"></TuanAppShim>
    <PageBar :class="{ fix: scrollTop > 300 }"></PageBar>
    <!-- #ifdef H5 -->
    <view class="search-bar" v-show="scrollTop > 300" :class="{ fix: scrollTop > 300 }">
      <view class="location">
        <TuanLocation>
          <view class="address-text">{{ $store.getters.currentCity || '定位失败' }}</view>
        </TuanLocation>
        <image class="angle" src="../../static/images/new-community/home/angle.png"></image>
      </view>
      <view class="placeholder" @click="go('/community-center/search')">12大类，200+家居服务</view>
      <button class="uni-btn" @click="go('/community-center/search')">搜索</button>
    </view>
    <!-- #endif -->
    <view class="page-header" :style="{ background: isStart ? 'linear-gradient(180deg, #ef530e 8%, #fac894 23%, #f6f6f8 33%, #ffffff 123%)' : '#f6f6f8' }">
      <view class="search-bar" v-show="scrollTop <= 300">
        <view class="location">
          <TuanLocation>
            <view class="address-text">{{ $store.getters.currentCity || '定位失败' }}</view>
          </TuanLocation>
          <image class="angle" src="../../static/images/new-community/home/angle.png"></image>
        </view>
        <view class="placeholder" @click="go('/community-center/search')">12大类，200+家居服务</view>
        <button class="uni-btn" @click="go('/community-center/search')">搜索</button>
      </view>
      <ServeMenus></ServeMenus>

      <VipPackage :scrollTop="scrollTop"></VipPackage>
    </view>
    <view class="MakeSmallFortune">
        <MakeSmallFortune></MakeSmallFortune>
    </view>
    <!-- 家具维修养护一条街 -->
    <ServeShop ref="serveShopRef"></ServeShop>

    <!-- 四季专区 -->
    <!-- <FourSeasonsZone></FourSeasonsZone> -->

    <ServerPane :id="item.id" v-for="(item, index) in servePaneList" :key="index" :title="item.title" :list="item.children"> </ServerPane>

    <!-- 组件支持 -->
    <tui-toast ref="toast"></tui-toast>

    <!-- #ifdef APP -->
    <!-- 检查更新 -->
    <CheckedVersion ref="checkedVersion"></CheckedVersion>
    <!-- #endif -->

    <tui-modal :show="$data._isShowTuiModel" title="提示" content="您还未登录，是否先去登录？" @click="_handleClickTuiModel($event, 'login', '')"></tui-modal>

    <TuanWxShare ref="tuanWxShareRef" @click="handleInitShare"></TuanWxShare>

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
import { COMMUNITY_ORDER_ITEM_NO, COMMUNITY_ORDER_NO, USER_INFO } from '../../constant';
import { getServiceSortApi } from '../../api/community-center';
import PopupInformation from '../../components/popup-information/popup-information';
import showModal from 'mixin/showModal';
import { CHANGE_IS_IN_MINIPROGRAM } from '../../store/modules/type';
import PageBar from './cpns/PageBar.vue';
import ServeMenus from './cpns/ServeMenus.vue';
import VipPackage from './cpns/VipPackage.vue';
import ServeShop from './cpns/ServeShop.vue';
import ServerPane from './cpns/ServerPane.vue';
import FourSeasonsZone from './cpns/FourSeasonsZone.vue';
// 赚小钱
import MakeSmallFortune from './cpns/MakeSmallFortune.vue'

const app = getApp();

export default {
  onReady() {
    console.log(app);
  },
  components: {
    PageBar,
    ServeMenus,
    VipPackage,
    ServeShop,
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
      isStart: false,
      timer: null
    };
  },
  onShow() {
    uni.removeStorageSync(COMMUNITY_ORDER_NO);
    uni.removeStorageSync(COMMUNITY_ORDER_ITEM_NO);
    this.$nextTick(() => {
      // this.$refs.vipPackageRef.getDZPersonalizationConfig();
    });

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
      await this.$refs.tuanWxShareRef.share(data, isQuit);
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
          this.$refs.serveShopRef.getNearByShopList();
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
    }
  },

  onLoad(options) {
    setTimeout(() => {
      this.isStart = true;
    }, 1000);

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
  background-color: #f5f5f7;
  padding-bottom: 100upx;
  overflow: hidden;
  transition: all 350ms ease-in;

  .page-header {
    position: relative;
    z-index: 100;
    padding: 0 30upx 30upx;
    box-sizing: border-box;
    background: linear-gradient(180deg, #ef530e 8%, #fac894 23%, #f6f6f8 33%, #ffffff 123%);
  }

  .search-bar {
    width: 100%;
    border-radius: 100upx;
    height: 72upx;
    background-color: #fff;
    padding: 8upx 15upx;
    box-sizing: border-box;
    display: flex;
    align-items: center;

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
      padding-left: 12upx;

      &::after {
        content: '';
        height: 26upx;
        width: 1upx;
        background-color: #c0bec1;
        position: absolute;
        left: 0upx;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .location {
      display: flex;
      align-items: center;
      .address-text {
        color: #222229;
        font-size: 28upx;
      }

      .angle {
        width: 25upx;
        height: 14upx;
        margin-left: 6upx;
        margin-right: 10upx;
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
}
</style>
