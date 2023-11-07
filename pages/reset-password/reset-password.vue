<template>
  <view class="register-container">
    <image
      @click="handleBack"
      class="back-icon"
      src="../../static/images/new-auth/back.png"
      mode=""
    />

    <view class="register-main-area">
      <h1>找回密码</h1>

      <tui-form ref="form">
        <tui-input
          label="手机号"
          padidng="0 0 28rpx 0"
          borderTop
          :focus="focusMap[0]"
          @confirm="handleClickConfirmType(0)"
          :confirm-type="keybordEnterText"
          placeholder="请输入重置密码的手机号"
          color="#141000"
          v-model="resetPasswordForm.mobile"
        ></tui-input>
        <tui-input
          label="新密码"
          padidng="0 0 28rpx 0"
          borderTop
          placeholder="请输入新密码"
          color="#141000"
          :focus="focusMap[1]"
          ref="newPasswordRef"
          :confirm-type="keybordEnterText"
          class="reset-wrapper"
          type="password"
          @confirm="handleClickConfirmType(1)"
          v-model="resetPasswordForm.password"
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
        <tui-input
          color="#141000"
          padidng="0 0 28rpx 0"
          label="确认密码"
          ref="confirmPasswordRef"
          :focus="focusMap[2]"
          @confirm="handleClickConfirmType(2)"
          class="reset-wrapper"
          :lineLeft="false"
          type="password"
          :confirm-type="keybordEnterText"
          placeholder="请确认密码"
          v-model="resetPasswordForm.confirmPassword"
        >
          <block slot="right">
            <image
              class="password-status"
              @click="isShowConfirmPassword = !isShowConfirmPassword"
              :src="
                isShowConfirmPassword
                  ? '../../static/images/common/view-password .png'
                  : '../../static/images/common/close-password.png'
              "
              mode=""
            />
          </block>
        </tui-input>
      </tui-form>

      <button
        @click="onResetPassword"
        class="reset-btn uni-btn"
        :style="{ background: btnStatus ? '#FFC117' : '' }"
      >
        确定修改
      </button>
    </view>
    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { resetPasswodApi } from '../../api/auth'
import resetPasswordRule from './rules'
import { throttle } from '../../utils'

export default {
  data() {
    return {
      timer: null,
      resetPasswordForm: {
        password: '',
        confirmPassword: '',
        mobile: '',
      },
      onResetPassword: null,
      isShowPassword: false,
      isShowConfirmPassword: false,
      focusMap: {
        0: false,
        1: false,
        2: false,
      },
    }
  },
  onLoad(params) {
    this.onResetPassword = throttle(this.handelResetPassword, 1000)
  },
  methods: {
    // 重置密码
    handelResetPassword() {
      // TODO: 奇奇怪怪，验证没生效

      if (
        this.resetPasswordForm.confirmPassword !==
        this.resetPasswordForm.password
      ) {
        this.ttoast({
          type: 'fail',
          title: '两次密码输入不一致',
        })

        return
      }

      if (!this.resetPasswordForm.password) {
        this.ttoast({
          type: 'fail',
          title: '请输入新密码',
        })

        return
      }

      if (
        this.resetPasswordForm.password.length < 6 ||
        this.resetPasswordForm.confirmPassword.length < 6
      ) {
        this.ttoast({
          type: 'fail',
          title: '密码最少是六位',
        })

        return
      }

      if (!this.resetPasswordForm.confirmPassword) {
        this.ttoast({
          type: 'fail',
          title: '请确认密码',
        })

        return
      }

      const _this = this
      this.$refs.form
        .validate(this.resetPasswordForm, resetPasswordRule)
        .then(async () => {
          await resetPasswodApi({
            mobile: _this.resetPasswordForm.mobile,
            password: _this.resetPasswordForm.password,
          })

          _this.ttoast('密码修改成功')

          _this.timer = setTimeout(() => {
              uni.redirectTo({
                url: '/pages/login/login',
              })
          }, 2000)
        })
        .catch(errors => {
          console.log(errors)
        })
    },

    // 回退
    handleBack() {
      uni.navigateBack()
    },

    // 优化操作
    handleClickConfirmType(tag) {
      this.focusMap[tag + ''] = false
      if (this.keybordEnterText === 'done') {
        this.handelResetPassword()
      } else {
        tag = tag + 1 === 3 ? '0' : tag + 1 + ''
        console.log(tag, typeof tag)
        this.focusMap[tag] = true
      }
    },
  },

  destroyed() {
    clearTimeout(this.timer)
    this.timer = null
  },

  computed: {
    btnStatus() {
      return (
        this.resetPasswordForm.password &&
        this.resetPasswordForm.confirmPassword &&
        this.resetPasswordForm.mobile
      )
    },

    keybordEnterText() {
      return this.resetPasswordForm.password &&
        this.resetPasswordForm.confirmPassword &&
        this.resetPasswordForm.mobile
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

    .code-wrapper {
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

  .reset-btn {
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

  .reset-wrapper {
    /deep/ .tui-input__wrap {
      flex-wrap: wrap !important;
      flex-direction: row !important;

      .tui-input__label {
        flex: 0 0 100%;
      }
    }
  }
}
</style>
