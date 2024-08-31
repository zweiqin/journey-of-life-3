<script>
// app.js
import { getUserId, isH5InWebview } from './utils'
import { BASE_WS_API } from './config'
import { CHANGE_IS_IN_MINIPROGRAM } from './store/modules/type'
import { T_SELECTED_ADDRESS, USER_INFO } from './constant'
import { getInviteListApi } from './api/community-center'

export default {
  name: 'App',
  onLaunch(options) {
    this.globalData.appOptions = options
    // this.connectSocket()
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
  box-shadow: 0px 0 1rpx #ed3f14;
  border: 4rpx solid #fff;
}

.tui-toast-text {
  line-height: 1.5;
}

/* 隐藏头部 */
uni-page-head {
  display: none;
}

// #ifdef APP
// 在APP端无效的
// uni-app.uni-app--maxwidth {
// 	margin-top: 100rpx;
// }
// uni-app.uni-app--showtabbar {
// 	margin-top: 0;
// }
// uni-page-body {
// 	margin-top: 100rpx;
// }
// #endif

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
  font-size: 4rpx;
}

.fs18 {
  font-size: 18rpx;
}

.fs20 {
  font-size: 20rpx;
}

.fs22 {
  font-size: 22rpx;
}

.fs24 {
  font-size: 24rpx;
}

.fs26 {
  font-size: 26rpx;
}

.fs28 {
  font-size: 28rpx;
}

.fs30 {
  font-size: 30rpx;
}

.fs32 {
  font-size: 32rpx;
}

.fs34 {
  font-size: 34rpx;
}

.fs36 {
  font-size: 36rpx;
}

.fs38 {
  font-size: 38rpx;
}

.fs40 {
  font-size: 40rpx;
}

.fs42 {
  font-size: 42rpx;
}

.fs44 {
  font-size: 44rpx;
}

.fs46 {
  font-size: 46rpx;
}

.fs48 {
  font-size: 46rpx;
}

.fs50 {
  font-size: 50rpx;
}

.fs60 {
  font-size: 60rpx;
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
  margin-top: 5rpx;
}

.mar-top-10 {
  margin-top: 10rpx;
}

.mar-top-20 {
  margin-top: 20rpx;
}

.mar-top-30 {
  margin-top: 30rpx;
}

.mar-top-32 {
  margin-top: 32rpx;
}

.mar-top-36 {
  margin-top: 36rpx;
}

.mar-top-40 {
  margin-top: 40rpx;
}

.mar-top-50 {
  margin-top: 50rpx;
}

.mar-top-60 {
  margin-top: 60rpx;
}

.mar-top-70 {
  margin-top: 70rpx;
}

.mar-top-100 {
  margin-top: 100rpx;
}

.mar-top-percent40 {
  margin-top: 40%;
}

.mar-top-half {
  margin-top: 50%;
}

.mar-left-6 {
  margin-left: 6rpx;
}

.mar-left-5 {
  margin-left: 5rpx;
}

.mar-left-10 {
  margin-left: 10rpx;
}

.mar-left-20 {
  margin-left: 20rpx;
}

.mar-left-30 {
  margin-left: 30rpx;
}

.mar-left-35 {
  margin-left: 35rpx;
}

.mar-left-40 {
  margin-left: 40rpx;
}

.mar-left-50 {
  margin-left: 50rpx;
}

.mar-left-60 {
  margin-left: 60rpx;
}

.mar-left-70 {
  margin-left: 70rpx;
}

.mar-right-10 {
  margin-right: 10rpx;
}

.mar-right-20 {
  margin-right: 20rpx;
}

.mar-right-25 {
  margin-right: 25rpx;
}

.mar-right-30 {
  margin-right: 30rpx;
}

.mar-right-35 {
  margin-right: 35rpx;
}

.mar-right-40 {
  margin-right: 40rpx;
}

.mar-right-50 {
  margin-right: 50rpx;
}

.pad-left-10 {
  padding-left: 10rpx;
}

.pad-left-20 {
  padding-left: 20rpx;
}

.pad-left-40 {
  padding-left: 40rpx;
}

.pad-right-20 {
  padding-right: 20rpx;
}

.pad-top-20 {
  padding-top: 20rpx;
}

.pad-top-40 {
  padding-top: 40rpx;
}

.pad-bot-20 {
  padding-bottom: 20rpx;
}

.pad-topbot-20 {
  padding: 20rpx 0rpx;
}

.pad-topbot-5 {
  padding: 0rpx 5rpx;
}

.pad-topbot-10 {
  padding: 0rpx 10rpx;
}

.pad-topbot-50 {
  padding: 50rpx 0rpx;
}

.pad-bot-20 {
  padding-bottom: 20rpx;
}

.pad-bot-30 {
  padding-bottom: 30rpx;
}

.pad-bot-40 {
  padding-bottom: 40rpx;
}

.pad-bot-100 {
  padding-bottom: 100rpx;
}

.pad-bot-140 {
  padding-bottom: 140rpx;
}

.bor-rad-30 {
  border-radius: 30rpx;
}

.bor-rad-45 {
  border-radius: 45rpx;
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
  border-bottom: #c8c7cc 1rpx solid;
}

.bor-line-F7F7F7 {
  border-bottom: #f7f7f7 1rpx solid;
}

.bor-line-E5E5E5 {
  border-bottom: #e5e5e5 1rpx solid;
}

.borRig-line-E5E5E5 {
  border-right: #dddddd 2rpx solid;
}

.borRig-line-20 {
  border-bottom: #f7f7f7 20rpx solid;
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
  border-bottom: 1rpx solid #ededed;
}

.decoration {
  text-decoration: line-through;
}
</style>
