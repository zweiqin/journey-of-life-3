<template>
  <view class="register-container">
    <image
      @click="handleBack"
      class="back-icon"
      src="../../static/images/new-auth/back.png"
      mode=""
    />

    <view class="register-main-area">
      <h1>注册</h1>

      <tui-form ref="form">
        <tui-input
          label="手机号码"
          padidng="0 0 28rpx 0"
          borderTop
          placeholder="请输入手机号码"
          color="#141000"
          v-model="registerForm.phone"
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
          v-model="registerForm.code"
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
        <tui-input
          color="#141000"
          padidng="0 0 28rpx 0"
          label="密码"
          :focus="focusMap[2]"
          @confirm="handleClickConfirmType(2)"
          :confirm-type="keybordEnterText"
          class="reset-wrapper"
          :lineLeft="false"
          :type="isShowPassword ? 'text' : 'password'"
          placeholder="请输入密码"
          v-model="registerForm.password"
        >
          <block slot="right">
            <image
              class="password-status"
              @click="isShowPassword = !isShowPassword"
              :src="
                isShowPassword
                  ? '../../static/images/common/view-password .png'
                  : '../../static/images/common/close-password.png'
              "
              mode=""
            />
          </block>
        </tui-input>
      </tui-form>

      <view class="service-agreement-wrapper">
        <tui-icon
          @click="agreementStatus = !agreementStatus"
          :name="agreementStatus ? 'square-selected' : 'square'"
          :color="agreementStatus ? '#FFC117' : ''"
          :size="18"
        ></tui-icon>
        <text @click="agreementStatus = !agreementStatus">我已阅读并同意</text>
        <TuanServe>
          <text style="color: #ffc117">《团蜂用户协议》</text>
        </TuanServe>
      </view>

      <button
        @click="onRegister"
        class="register-btn uni-btn"
        :style="{ background: btnStatus ? '#FFC117' : '' }"
      >
        注册
      </button>

      <view @click="handleRedirect" class="to-login">
        已有帐号，<text>立即登录</text>
      </view>
    </view>
    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { getCodeApi, registerApi } from '../../api/auth'
import registerRule from './rules'
import { throttle } from '../../utils'

export default {
  data() {
    return {
      timer: null,
      awaitSecond: 60,
      agreementStatus: false,
      registerForm: {
        phone: '',
        password: '',
        code: '',
      },
      to: null,
      onGetCode: null,
      onRegister: null,
      isShowPassword: false,
      focusMap: {
        0: false,
        1: false,
        2: false,
      },
    }
  },
  onLoad(params) {
    this.to = params.to == 'undefined' ? '' : params.to
    this.onGetCode = throttle(this.handleGetCode, 1000)
    this.onRegister = throttle(this.handleRegister, 1000)
  },
  methods: {
    // 获取验证码
    async handleGetCode() {
      if (this.registerForm.phone.length !== 11) {
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
          phone: this.registerForm.phone,
          flag: 1,
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
    async handleRegister() {
      if (!this.agreementStatus) {
        this.ttoast({
          type: 'info',
          title: '请勾选服务协议',
        })
        return
      }
      const _this = this
      this.$refs.form
        .validate(this.registerForm, registerRule)
        .then(async () => {
          await registerApi(_this.registerForm)
          this.ttoast('注册成功')

          setTimeout(() => {
            if (_this.to) {
              uni.redirectTo({
                url: '/pages/login/login?code=' + _this.to,
              })
            } else {
              uni.redirectTo({
                url: '/pages/login/login',
              })
            }
          }, 1000)
        })
        .catch(errors => {})
    },

    // 回退
    handleBack() {
      uni.navigateBack()
    },

    // 重定向到登录页
    handleRedirect() {
      uni.redirectTo({
        url: '/pages/login/login',
      })
    },

    // 优化操作
    handleClickConfirmType(tag) {
      this.focusMap[tag + ''] = false
      if (this.keybordEnterText === 'done') {
        this.handleRegister()
      } else {
        tag = tag + 1 === 3 ? '0' : tag + 1 + ''
        console.log(tag, typeof tag)
        this.focusMap[tag] = true
      }
    },
  },

  computed: {
    btnStatus() {
      return (
        this.agreementStatus &&
        this.registerForm.password &&
        this.registerForm.code &&
        this.registerForm.phone
      )
    },

    keybordEnterText() {
      return this.agreementStatus &&
        this.registerForm.password &&
        this.registerForm.code &&
        this.registerForm.phone
        ? 'done'
        : 'next'
    },
  },
}
</script>

<style lang="less" scoped>
view,
text {
  line-height: 1.5;
}
.register-container {
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

  .register-main-area {
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

  .register-btn {
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
      color: #ffc117;
    }
  }
}
</style>
