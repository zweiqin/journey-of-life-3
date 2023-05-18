<script>
//app.js
var http = require('./utils/http.js')
var util = require('./utils/util.js')
// import { getUserId } from "./utils";
import { whoami } from './api/auth'
import { USER_ID, USER_TOKEN } from './constant'

export default {
  onLaunach: function () {

  },
  onShow: function () {
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
    http.getCartCount()

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
    isShowCommunityPopup: false
  },
  data() {
    return {
      scene: ''
    }
  },
  methods: {
    // 更新token
    async updateToken() {
      const userId = uni.getStorageSync(USER_ID);
      // debugger
      if (userId) {
        const { data } = await whoami(userId)
        uni.setStorageSync(USER_TOKEN, data.token);
      }
    }
  },

  mounted() {
    // #ifdef H5
    this.$store.dispatch('location/getCurrentLocation', (res) => {
      this.$store.dispatch('community/getHomePopupImage', res.detail)
      this.$store.commit('community/CHANGE_HOME_STORE', res.town)
    })
    // #endif
    this.updateToken()

    // #ifdef APP
    this.$store.dispatch('community/getHomePopupImage')
    // #endif

    const launchOptions = uni.getLaunchOptionsSync()
    // console.log('a', launchOptions.scene);
    this.scene = launchOptions.scene

  },
}
</script>
<style>
@import './app.css';
@import '';

/* 隐藏头部 */
uni-page-head {
  display: none;
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
