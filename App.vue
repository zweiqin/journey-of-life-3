<script>
// app.js
import { getUserId, isH5InWebview } from './utils'
import { BASE_WS_API } from './config'
import { CHANGE_IS_IN_MINIPROGRAM } from './store/modules/type'
import { T_SELECTED_ADDRESS, USER_INFO } from './constant'
import { getPurchaseRecordApi, getPurchaseRecord2Api } from './api/user'
import { getInviteListApi } from './api/community-center'

export default {
  name: 'App',
  onLaunch(options) {
    this.globalData.appOptions = options
    // this.connectSocket()
    if (this.isLogin()) {
      getPurchaseRecordApi({ userId: getUserId(), price: 299 })
      getPurchaseRecord2Api({ userId: getUserId(), price: 399 })
      this.$store.dispatch('auth/refrshUserInfoAction')
    }
    uni.getSystemInfo({
      success: (res) => {
        if (res.safeArea.top > 20 && res.model.indexOf('iPhone') !== -1) {
          this.globalData.isIphone = true
        }
      }
    })
    if (isH5InWebview()) this.$store.commit(`app/${CHANGE_IS_IN_MINIPROGRAM}`, true)
    this.$store.dispatch('app/getSystermTerminal')
    // #ifdef H5
    this.globalData.terminal = 2
    // #endif
    // #ifdef APP || APP-NVUE
    this.globalData.terminal = 3
    // #endif
    // #ifdef MP
    this.globalData.terminal = 1
    // #endif
  },
  onShow() {
    // 判断浏览器环境
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
    // }
    // getUserId();
  },
  globalData: {
    appOptions: { path: '', query: {}, referrerInfo: {}, scene: '' },
    orderTypeShow: '',
    // 定义全局请求队列
    requestQueue: [],
    // 是否正在进行登陆
    isLanding: false,
    // 购物车商品数量
    totalCartCount: 0,
    // 是否一直显示 弹窗
    isShowCommunityPopup: true,
    // 是否已经打开过绑定手机号弹窗
    isShowedBindMobilePopu: false,
    // 用户是否授权获取当前位置
    isHasLocationPermission: true,
    // 是否显示关注公众号
    isShowFollowOfficialAccount: false,
    // 压屏窗弹出次数
    communityPopupCount: 0,
    // 判断设备是否为 iPhone
    isIphone: false,
    // 画布设备 1 小程序，2 H5，3 App 4 电脑
    terminal: '',
    // 是否显示邀请提醒
    isCloseInviteAlert: false
  },
  data() {
    return {
      scene: ''
    }
  },

  mounted() {
    this.setUserLocation()

    this.$store.dispatch('app/getUserSystermInfo')

    // // #ifdef APP
    // this.$store.dispatch("community/getHomePopupImage");
    // // #endif

    const launchOptions = uni.getLaunchOptionsSync()
    this.scene = launchOptions.scene
    this.getInviteList()
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
        })
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
      this.timer && clearTimeout(this.timer)
      if (this.isLogin()) {
        this.timer = setTimeout(() => {
          this.$store.dispatch('customerService/joinCustomerServiceChat', {
            ref: '',
            wsHandle: uni.connectSocket({
              url: `${BASE_WS_API}/${getUserId()}`,
              complete: () => {}
            })
          })
        }, 2000)
      }
    },

    // 设置用户定位
    async setUserLocation() {
      // #ifdef APP
      this.useStorageLocation()
      // #endif
      // #ifndef APP
			if (!['pages/service-agreement/privacy-policy', 'pages/service-agreement/service-agreement'].includes(this.globalData.appOptions.path)) {
				try {
					this.globalData.isHasLocationPermission = true
					await this.$store.dispatch('location/getCurrentLocation', (res) => {
						// this.$store.dispatch('community/getHomePopupImage', res.detail)
						this.$store.commit('community/CHANGE_HOME_STORE', res.town)
						this.$store.dispatch('community/getVipPackageList', res.detail)
					})
				} catch (error) {
					this.globalData.isHasLocationPermission = false
					const lastAddress = uni.getStorageSync(T_SELECTED_ADDRESS)
					if (lastAddress) {
						this.$store.dispatch('location/getDetailAddress', lastAddress.data)
					} else {
						// 后端兜底1
					}
				}
			}
      setTimeout(() => {
        if (!this.$store.getters.currentCity) {
          this.useStorageLocation()
        }
      }, 2000)
      // #endif
    },

    // 使用本地数据
    useStorageLocation() {
      const lastAddress = uni.getStorageSync(T_SELECTED_ADDRESS)
      if (lastAddress) {
        this.$store.dispatch('location/getDetailAddress', lastAddress.data)
      }
    },

    async getInviteList() {
      const userInfo = uni.getStorageSync(USER_INFO)
      if (userInfo && userInfo.phone) {
        try {
          const res = await getInviteListApi({
            bizType: 2,
            inviteUserPhone: userInfo.phone, // 被邀请人手机号
            pageNo: 1,
            pageSize: 100
          })

          if (res.statusCode === 20000) {
            this.globalData.isShowInvitationNotice = !!res.data.records.length
          }
        } catch (error) {
          this.globalData.isShowInvitationNotice = false
        }
      }
    }
  }
}
</script>

<style lang="less">
@import './app.css';

.tui-badge.tui-danger.tui-badge-scale {
  box-shadow: 0px 0 1upx #ed3f14;
  border: 4upx solid #fff;
}

.tui-toast-text {
  line-height: 1.5;
}

/* 隐藏头部 */
uni-page-head {
  display: none;
}

uni-page-wrapper {
  height: 100%;
}

/* 轮播图指示点 */
uni-swiper .uni-swiper-dots-horizontal {
  bottom: 20px !important;
}

/* uni-page-body {
  overflow: scroll;
} */

.uni-page-refresh--pulling,
.uni-page-refresh--reached {
  z-index: 1019000;
}

// 自定义骨架屏
.ske-loading {
  .child-loading {
    animation: loading 2s linear 0s infinite alternate;
  }
}

uni-rich-text img {
  max-width: 100% !important;
}

// 图片占位图
.pic-img {
  width: 100%;
  height: 100%;
}

.default-img {
  background: url('./static/images/common/default.png') no-repeat center;
  background-size: 100% 100%;
}

.line1 {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.wid {
  width: 100%;
}

.fs4 {
  font-size: 4upx;
}

.fs18 {
  font-size: 18upx;
}

.fs20 {
  font-size: 20upx;
}

.fs22 {
  font-size: 22upx;
}

.fs24 {
  font-size: 24upx;
}

.fs26 {
  font-size: 26upx;
}

.fs28 {
  font-size: 28upx;
}

.fs30 {
  font-size: 30upx;
}

.fs32 {
  font-size: 32upx;
}

.fs34 {
  font-size: 34upx;
}

.fs36 {
  font-size: 36upx;
}

.fs38 {
  font-size: 38upx;
}

.fs40 {
  font-size: 40upx;
}

.fs42 {
  font-size: 42upx;
}

.fs44 {
  font-size: 44upx;
}

.fs46 {
  font-size: 46upx;
}

.fs48 {
  font-size: 46upx;
}

.fs50 {
  font-size: 50upx;
}

.fs60 {
  font-size: 60upx;
}

.fs-bold {
  font-weight: bold;
}

.fs-weight-300 {
  font-weight: 300;
}

.fs-weight-200 {
  font-weight: 200;
}

.fs-weight-400 {
  font-weight: 400;
}

.flex-display {
  display: flex;
}

.flex-center {
  display: flex;
  justify-content: center;
}

.flex-items {
  display: flex;
  align-items: center;
}

.flex-items-plus {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-start {
  display: flex;
  justify-content: flex-start;
}

.flex-end {
  display: flex;
  justify-content: flex-end;
}

.flex-end-plus {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.flex-column {
  flex-direction: column;
}

.flex-column-plus {
  display: flex;
  flex-direction: column;
}

.flex-row {
  flex-direction: row;
}

.flex-row-plus {
  display: flex;
  flex-direction: row;
}

.flex-sp-around {
  justify-content: space-around;
}

.flex-sp-between {
  justify-content: space-between;
}

.text-align {
  text-align: center;
}

.flex-wrap-1 {
  display: flex;
  flex-wrap: wrap;
}

.flex-nowrap-1 {
  display: flex;
  flex-wrap: nowrap;
}

.align-end {
  display: flex;
  align-items: flex-end;
}

.align-sp-between {
  align-content: space-between;
}

.mar-top-5 {
  margin-top: 5upx;
}

.mar-top-10 {
  margin-top: 10upx;
}

.mar-top-20 {
  margin-top: 20upx;
}

.mar-top-30 {
  margin-top: 30upx;
}

.mar-top-32 {
  margin-top: 32upx;
}

.mar-top-36 {
  margin-top: 36upx;
}

.mar-top-40 {
  margin-top: 40upx;
}

.mar-top-50 {
  margin-top: 50upx;
}

.mar-top-60 {
  margin-top: 60upx;
}

.mar-top-70 {
  margin-top: 70upx;
}

.mar-top-100 {
  margin-top: 100upx;
}

.mar-top-percent40 {
  margin-top: 40%;
}

.mar-top-half {
  margin-top: 50%;
}

.mar-left-6 {
  margin-left: 6upx;
}

.mar-left-5 {
  margin-left: 5upx;
}

.mar-left-10 {
  margin-left: 10upx;
}

.mar-left-20 {
  margin-left: 20upx;
}

.mar-left-30 {
  margin-left: 30upx;
}

.mar-left-35 {
  margin-left: 35upx;
}

.mar-left-40 {
  margin-left: 40upx;
}

.mar-left-50 {
  margin-left: 50upx;
}

.mar-left-60 {
  margin-left: 60upx;
}

.mar-left-70 {
  margin-left: 70upx;
}

.mar-right-10 {
  margin-right: 10upx;
}

.mar-right-20 {
  margin-right: 20upx;
}

.mar-right-25 {
  margin-right: 25upx;
}

.mar-right-30 {
  margin-right: 30upx;
}

.mar-right-35 {
  margin-right: 35upx;
}

.mar-right-40 {
  margin-right: 40upx;
}

.mar-right-50 {
  margin-right: 50upx;
}

.pad-left-10 {
  padding-left: 10upx;
}

.pad-left-20 {
  padding-left: 20upx;
}

.pad-left-40 {
  padding-left: 40upx;
}

.pad-right-20 {
  padding-right: 20upx;
}

.pad-top-20 {
  padding-top: 20upx;
}

.pad-top-40 {
  padding-top: 40upx;
}

.pad-bot-20 {
  padding-bottom: 20upx;
}

.pad-topbot-20 {
  padding: 20upx 0upx;
}

.pad-topbot-5 {
  padding: 0upx 5upx;
}

.pad-topbot-10 {
  padding: 0upx 10upx;
}

.pad-topbot-50 {
  padding: 50upx 0upx;
}

.pad-bot-20 {
  padding-bottom: 20upx;
}

.pad-bot-30 {
  padding-bottom: 30upx;
}

.pad-bot-40 {
  padding-bottom: 40upx;
}

.pad-bot-100 {
  padding-bottom: 100upx;
}

.pad-bot-140 {
  padding-bottom: 140upx;
}

.bor-rad-30 {
  border-radius: 30upx;
}

.bor-rad-45 {
  border-radius: 45upx;
}

.bor-rad-half {
  border-radius: 50%;
}

.backColor {
  background-color: #009688;
}

.backColorFFF {
  background-color: #ffffff;
}

.pos-abs {
  position: absolute;
}

.bor-bot-line {
  border-bottom: #c8c7cc 1upx solid;
}

.bor-line-F7F7F7 {
  border-bottom: #f7f7f7 1upx solid;
}

.bor-line-E5E5E5 {
  border-bottom: #e5e5e5 1upx solid;
}

.borRig-line-E5E5E5 {
  border-right: #dddddd 2upx solid;
}

.borRig-line-20 {
  border-bottom: #f7f7f7 20upx solid;
}

.font-color-red {
  color: red;
}

.font-color-FFF {
  color: #ffffff;
}

.font-color-8A734A {
  color: #8a734a;
}

.font-color-71521B {
  color: #71521b;
}

.font-color-222 {
  color: #222222;
}

.font-color-333 {
  color: #333333;
}

.font-color-666 {
  color: #666666;
}

.font-color-999 {
  color: #999999;
}

.font-color-656 {
  color: #656565;
}

.font-color-DDD {
  color: #dddddd;
}

.font-color-CCC {
  color: #cccccc;
}

.font-color-FFEBC4 {
  color: #ffebc4;
}

.font-color-1CC363 {
  color: #1cc363;
}

.font-color-47A7EE {
  color: #47a7ee;
}

.font-color-C5AA7B {
  color: #c5aa7b;
}

.font-color-FF7700 {
  color: #ff7700;
}

.font-color-FF7911 {
  color: #ff7911;
}

.font-color-80 {
  color: #808080;
}

.font-color-DD {
  color: #dd524d;
}

.font-color-C83732 {
  color: #c83732;
}

.font-color-3F {
  color: #3f536e;
}

.font-color-009 {
  color: #009688;
}

.font-weight-500 {
  font-weight: 500;
}

.font-weight-bold {
  font-weight: bold;
}

.overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.overflowNoDot {
  display: block;
  overflow: hidden;
}

.discountsPriceLine {
  text-decoration: line-through;
}

.border-bottom-Line {
  border-bottom: 1upx solid #ededed;
}

.decoration {
  text-decoration: line-through;
}
</style>
