<template>
  <view class="login-container">
    <image
      @click="handleBack"
      class="back-icon"
      src="../../static/images/new-auth/back.png"
      mode=""
    />

    <view class="login-main-area">
      <h1>登录</h1>

      <tui-form ref="form">
        <tui-input
          label="手机号码"
          padidng="0 0 28rpx 0"
          borderTop
          placeholder="请输入手机号码"
          color="#141000"
          v-model="loginForm.phone"
          :focus="focusMap[0]"
          @confirm="handleClickConfirmType(0)"
          :confirm-type="keybordEnterText"
        ></tui-input>

        <tui-input
          class="reset-wrapper"
          label="验证码"
          padidng="0 0 28rpx 0"
          borderTop
          placeholder="请输入验证码"
          color="#141000"
          :focus="focusMap[1]"
          @confirm="handleClickConfirmType(1)"
          :confirm-type="keybordEnterText"
          v-model="loginForm.code"
        >
          <block slot="right">
            <button v-show="!timer" @click="onGetCode" class="uni-btn get-code">
              获取验证码
            </button>

            <view v-show="timer" class="awaiting">
              <text class="second-text">{{ awaitSecond }}s</text>
              <text>后重新获取</text>
            </view>
          </block>
        </tui-input>
      </tui-form>

      <view
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <view class="service-agreement-wrapper">
          <tui-icon
            @click="agreementStatus = !agreementStatus"
            :name="agreementStatus ? 'square-selected' : 'square'"
            :color="agreementStatus ? '#FFC117' : ''"
            :size="18"
          ></tui-icon>
          <text @click="agreementStatus = !agreementStatus"
            >我已阅读并同意</text
          >
          <TuanServe>
            <text style="color: #ffc117">《团蜂用户协议》</text>
          </TuanServe>
        </view>
      </view>

      <button
        @click="onlogin"
        class="login-btn uni-btn"
        :style="{ background: btnStatus ? '#FFC117' : '' }"
      >
        登录
      </button>

      <view @click="handleRedirect" class="to-login">
        您还未有帐号？<text>立即注册</text>
      </view>

      <view class="more-login">
        <TuanWXLogin @login="handleWXLoginAfter">
          <view class="item">
            <image src="../../static/images/new-auth/wx.png" mode="" />
            <text>微信登录</text>
          </view>
        </TuanWXLogin>

        <view class="item" @click="go('/pages/login/login')">
          <image src="../../static/images/new-auth/password.png" mode="" />
          <text>密码登录</text>
        </view>
      </view>
    </view>
    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { verificationCodeRule } from './rules'
import { throttle } from '../../utils'
import { NEW_BIND_ID, USER_ID, USER_INFO } from '../../constant'
import { bindLastUserApi, checkBindApi } from '../../api/user'
import { getCodeApi } from '../../api/auth'

const tabbarList = [
  '/pages/user/user',
  '/pages/community-center/community-center',
  '/pages/index/index',
  '/pages/stuff/stuff',
]

export default {
  data() {
    return {
      timer: null,
      awaitSecond: 60,
      agreementStatus: false,
      loginForm: {
        phone: '',
        code: '',
      },
      to: null,
      onlogin: null,
      onGetCode: null,
      focusMap: {
        0: false,
        1: false,
      },

      redirect: '',
      isBind: false,
      bindId: null,
      userId: null,
    }
  },
  async onLoad(options) {
    this.onlogin = throttle(this.handlelogin, 1000)
    this.onGetCode = throttle(this.handleGetCode, 1000)

    this.redirect = options.to

    this.bindId = options.code

    if (this.redirect && this.redirect.indexOf('?') > -1) {
      this.bindId = this.redirect
    }
    if (this.bindId) {
      uni.setStorageSync(NEW_BIND_ID, this.bindId)
    }

    const userId = uni.getStorageSync(USER_ID)
    const userInfo = uni.getStorageSync(USER_INFO)

    if (uni.getStorageSync(NEW_BIND_ID) && userId && !this.bindId) {
      this.bindId = uni.getStorageSync(NEW_BIND_ID)

      try {
        await this.checkBind({ userId: userId })
      } catch (error) {
        await this.binding(userId, () => {
          uni.switchTab({
            url: '/',
          })
        })
      }
    }

    // return
    if (userId && userInfo.userId) {
      if (this.bindId) {
        await this.binding(userId, () => {
          uni.switchTab({
            url: '/',
          })
        })
      } else {
        uni.switchTab({
          url: '/',
        })
      }
    }
  },
  methods: {
    // 获取验证码
    async handleGetCode() {
      if (this.loginForm.phone.length !== 11) {
        this.ttoast({
          type: 'fail',
          title: '请输入合法的手机号码',
        })
        return
      }

      uni.showLoading({
        title: '加载中...',
      })

      try {
        await getCodeApi({
          phone: this.loginForm.phone,
          flag: 2,
        })

        this.timer = setInterval(() => {
          this.awaitSecond--

          if (this.awaitSecond === 0) {
            this.awaitSecond = 60
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      } catch (error) {
        console.log(error)
        this.ttoast({
          type: 'fail',
          title: '验证码发送失败',
          content: '请稍后重试',
        })
      } finally {
        uni.hideLoading()
      }
    },
    // 点击注册
    async handlelogin() {
      if (!this.agreementStatus) {
        this.ttoast({
          type: 'info',
          title: '请勾选服务协议',
        })
        return
      }
      const _this = this
      this.$refs.form
        .validate(this.loginForm, verificationCodeRule)
        .then(async () => {
          const res = await this.$store.dispatch('auth/codeLoginAction', {
            phone: _this.loginForm.phone,
            code: _this.loginForm.code,
          })

          if (uni.getStorageSync(NEW_BIND_ID) && !_this.bindId) {
            try {
              await _this.checkBind({ userId: res.userInfo.userId })
            } catch (error) {
              _this.bindId = uni.getStorageSync(NEW_BIND_ID)
              await _this.binding(res.userInfo.userId, () => {
                uni.switchTab({
                  url: '/',
                })
              })
            }
          }

          if (_this.bindId) {
            await _this.binding(res.userInfo.userId, () => {
              uni.switchTab({
                url: '/',
              })
            })
            return
          } else {
            if (this.redirect) {
              // console.log('进来了', this.redirect)
              if (tabbarList.includes(_this.redirect)) {
                uni.switchTab({
                  url: _this.redirect,
                })
              } else {
                uni.redirectTo({
                  url: _this.redirect,
                })
              }
            } else {
              uni.switchTab({
                url: '/pages/community-center/community-centerr',
              })
            }
          }
        })
        .catch(errors => {})
    },

    // 回退
    handleBack() {
      uni.navigateBack()
    },
    handleRedirect() {
      uni.navigateTo({
        url: '/pages/register/register',
      })
    },

    // 优化操作
    handleClickConfirmType(tag) {
      this.focusMap[tag + ''] = false
      if (this.keybordEnterText === 'done') {
        this.handlelogin()
      } else {
        tag = tag + 1 === 2 ? '0' : tag + 1 + ''
        // console.log(tag, typeof tag)
        this.focusMap[tag] = true
      }
    },

    // 绑定
    binding(userId, cb) {
      const _this = this
      return new Promise((resolve, reject) => {
        bindLastUserApi({
          userId,
          userCode: this.bindId,
        })
          .then(res => {
            _this.timer = setTimeout(() => {
              cb && typeof cb === 'function' && cb()
            }, 1000)
            resolve()
          })
          .catch(err => {
            uni.removeStorageSync(NEW_BIND_ID)
            _this.timer = setTimeout(() => {
              cb && typeof cb === 'function' && cb()
            }, 1000)
            reject()
          })
      })
    },

    // 校验绑定
    checkBind(data) {
      return new Promise((reslove, reject) => {
        checkBindApi(data)
          .then(() => {
            reslove(true)
          })
          .catch(() => {
            reject(false)
          })
      })
    },

    // 微信登陆后续
    async handleWXLoginAfter(res) {
      // #ifdef H5
      window.location.href =
        window.location.origin + window.location.pathname + window.location.hash
      // #endif
      const _this = this
      if (uni.getStorageSync(NEW_BIND_ID) && !_this.bindId) {
        try {
          await _this.checkBind({ userId: res.userInfo.userId })
        } catch (error) {
          _this.bindId = uni.getStorageSync(NEW_BIND_ID)
          await _this.binding(res.userInfo.userId, () => {
            uni.switchTab({
              url: '/',
            })
          })
        }
      }

      if (_this.bindId) {
        await _this.binding(res.userInfo.userId, () => {
          uni.switchTab({
            url: '/',
          })
        })
        return
      } else {
        if (this.redirect) {
          // console.log('进来了', this.redirect)
          if (tabbarList.includes(_this.redirect)) {
            uni.switchTab({
              url: _this.redirect,
            })
          } else {
            uni.redirectTo({
              url: _this.redirect,
            })
          }
        } else {
          uni.switchTab({
            url: '/pages/community-center/community-centerr',
          })
        }
      }
    },
  },

  computed: {
    btnStatus() {
      return this.agreementStatus && this.loginForm.code && this.loginForm.phone
    },

    keybordEnterText() {
      return this.agreementStatus && this.loginForm.phone ? 'done' : 'next'
    },
  },
}
</script>

<style lang="less" scoped>
view,
text {
  line-height: 1.5;
}
.login-container {
  width: 100vw;
  min-height: 100vh;
  background: url('../../static/images/new-auth/bg.png') no-repeat;
  background-size: cover;

  .back-icon {
    position: relative;
    top: 30upx;
    left: 20upx;
    width: 80upx;
    height: 80upx;
    z-index: 1000;
  }

  .login-main-area {
    padding: 90upx 80upx 0;

    h1 {
      color: #141000;
      font-size: 64upx;
      font-weight: 400;
      margin-bottom: 120upx;
    }

    /deep/ .tui-input__wrap {
      padding: 0 0 28upx 0 !important;
      flex-direction: column;
      align-items: flex-start;
      background: transparent !important;
      margin-bottom: 72upx !important;

      &::before {
        display: none;
      }
    }

    /deep/ .tui-input__label {
      text {
        margin-bottom: 12upx;
        font-size: 24upx !important;
        color: #b3b2ad !important;
      }
    }

    /deep/ .uni-input-wrapper {
      margin-top: 12upx;

      input {
        padding-bottom: 28upx !important;
      }
    }

    /deep/ .tui-line__left::after {
      left: 0 !important;
    }

    .reset-wrapper {
      /deep/ .tui-input__wrap {
        flex-wrap: wrap !important;
        flex-direction: row !important;
        margin-bottom: 10upx !important;

        .tui-input__label {
          flex: 0 0 100%;
        }
      }
    }

    .password-status {
      width: 48upx;
      height: 48upx;
      flex-shrink: 0;
      margin-top: 12upx;
    }

    .get-code {
      color: #ffc117;
      font-size: 28upx;
      margin-top: 24upx;
    }

    .awaiting {
      font-size: 28upx;
      color: #b3b2ad;
      margin-top: 12upx;

      .second-text {
        color: #605d52;
      }
    }
  }

  .service-agreement-wrapper {
    display: flex;
    align-items: center;
    font-size: 24upx;
    color: #605d52;

    text {
      margin-top: 1upx;
      margin-left: 6upx;
    }
  }

  .login-btn {
    width: 606upx;
    height: 96upx;
    border-radius: 100px;
    margin: 80upx 0 40upx 0;
    background-color: #ffe6a2;
    color: #fff;
    line-height: 96upx;
    font-size: 32upx;
    font-weight: 500;
    transition: all 100ms;
  }

  .to-login {
    text-align: center;
    font-size: 28upx;

    text {
      color: #fc4023;
    }
  }
}

.more-login {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 160upx;

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-left: 36upx;
    margin-right: 36upx;

    image {
      width: 88upx;
      height: 88upx;
      border-radius: 50%;
    }

    text {
      font-size: 24upx;
      color: #605d52;
    }
  }
}
</style>
