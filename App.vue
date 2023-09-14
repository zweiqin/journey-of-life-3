<script>
// app.js
var http = require('./utils/http.js');
var util = require('./utils/util.js');
import { getUserId } from './utils';
import { BASE_WS_API } from './config';
import { whoami } from './api/auth';
import { USER_ID, USER_TOKEN, TUAN_ORDER_SN, USER_SELECT_ADDRESS } from './constant';

export default {
  onLaunch() {
    this.connectSocket();
  },
  onShow() {
    // 判断浏览器环境
    // var ua = navigator.userAgent.toLowerCase();
    // if (ua.search(/MicroMessenger/i) > -1 && !uni.getStorageSync("appType")) {
    // }
    // const state = util.getUrlKey('state')
    // const code = util.getUrlKey('code')
    // if ((state == 'needCode' || state == 'unNeedCode') && code) {
    // 	let path = window.location.href
    // 	if (path.indexOf('code=') > 0 && path.indexOf('&state=unNeedCode') > -1) {
    // 		http.mpLogin(null, code)
    // 		path = path.substring(0, path.indexOf('code=') - 1)
    // 		history.replaceState({}, '', path)
    // 	}
    http.getCartCount();

    // }

    // getUserId();
  },
  globalData: {
    // 定义全局请求队列
    requestQueue: [],
    // 是否正在进行登陆
    isLanding: false,
    // 购物车商品数量
    totalCartCount: 0,
    // 是否一直显示 弹窗
    isShowCommunityPopup: false,
    // 是否处于小程序环境
    isInMiniprogram: false,
    // 是否已经打开过绑定手机号弹窗
    isShowedBindMobilePopu: false,
    // 用户是否授权获取当前位置
    isHasLocationPermission: true,
    // 是否显示关注公众号
    isShowFollowOfficialAccount: false,
    // 压屏窗弹出次数
    communityPopupCount: 0
  },
  data() {
    return {
      scene: ''
    };
  },

  mounted() {
    this.setUserLocation();
    this.updateToken();

    this.$store.dispatch('app/getUserSystermInfo');

    // // #ifdef APP
    // this.$store.dispatch("community/getHomePopupImage");
    // // #endif

    const launchOptions = uni.getLaunchOptionsSync();
    this.scene = launchOptions.scene;
  },
  methods: {
    connectSocket() {
      if (this.isLogin()) {
        this.$store.dispatch('customerService/joinCustomerServiceChat', {
          ref: this,
          wsHandle: uni.connectSocket({
            url: `${BASE_WS_API}/${getUserId()}`,
            complete: () => {}
          })
        });
      }
    },
    onOpen() {
      // console.log('onOpen连接成功');
    },
    onMessage(evt) {
      // console.log('onMessage收到消息', evt);
      // const data = JSON.parse(evt.data)
      // console.log(data)
      // if (data.status == 10400) {
      // 	uni.showToast({
      // 		title: '网络不给力，请检查网络连接',
      // 		icon: 'none'
      // 	}) // 弹出提示框
      // } else if (data.status == 13140) {
      // 	this.$store.dispatch('customerService/getChatList')
      // }
    },
    onError(errMsg) {
      // console.log('onError出错了');
      // uni.showLoading({
      // 	title: '断线了，正在重新连接......',
      // 	mask: true
      // })
      // uni.showToast({
      // 	title: 'Error出错了' + errMsg,
      // 	icon: 'none',
      // 	duration: 2000
      // })
    },
    onClose() {
      // console.log('onClose关闭了');
      this.timer && clearTimeout(this.timer);
      if (this.isLogin()) {
        this.timer = setTimeout(() => {
          this.$store.dispatch('customerService/joinCustomerServiceChat', {
            ref: '',
            wsHandle: uni.connectSocket({
              url: `${BASE_WS_API}/${getUserId()}`,
              complete: () => {}
            })
          });
        }, 2000);
      }
    },

    // 更新token
    async updateToken() {
      const userId = uni.getStorageSync(USER_ID);
      // debugger
      if (userId) {
        const { data } = await whoami(userId);
        uni.setStorageSync(USER_TOKEN, data.token);
      }
    },

    // 设置用户定位
    async setUserLocation() {
      // // #ifdef APP
      // this.useStorageLocation();
      // // #endif

      try {
        //  #ifdef H5
        this.globalData.isHasLocationPermission = true;
        // #endif
        await this.$store.dispatch('location/getCurrentLocation', (res) => {
          this.$store.dispatch('community/getHomePopupImage', res.detail);
          this.$store.commit('community/CHANGE_HOME_STORE', res.town);
          this.$store.dispatch('community/getVipPackageList', res.detail);
        });
      } catch (error) {
        this.globalData.isHasLocationPermission = false;
        const lastAddress = uni.getStorageSync(USER_SELECT_ADDRESS);
        if (lastAddress) {
          this.$store.dispatch('location/getDetailAddress', lastAddress.data);
        } else {
          // 后端兜底1
        }
      }

      setTimeout(() => {
        if (this.$store.getters.currentCity === '定位失败') {
          this.useStorageLocation();
        }
      }, 2000);
    },

    // 使用本地数据
    useStorageLocation() {
      const lastAddress = uni.getStorageSync(USER_SELECT_ADDRESS);
      if (lastAddress) {
        this.$store.dispatch('location/getDetailAddress', lastAddress.data);
      }
    }
  }
};
</script>

<style>
@import './app.css';
@import '';

/* 隐藏头部 */
uni-page-head {
  display: none;
}

.uni-page-refresh--pulling, .uni-page-refresh--reached {
  z-index: 1019000;
}

/* uni-page-body {
  overflow: scroll;
} */

uni-page-wrapper {
  height: 100%;
}

/* 轮播图指示点 */
uni-swiper .uni-swiper-dots-horizontal {
  bottom: 20px !important;
}
</style>
