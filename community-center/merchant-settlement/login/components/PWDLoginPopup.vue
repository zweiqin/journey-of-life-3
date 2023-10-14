<template>
  <tui-bottom-popup :zIndex="1002" :maskZIndex="1001" :show="pwdLoginPopupVisible" @close="pwdLoginPopupVisible = false">
    <view class="pwd-login-popup-container">
      <view class="form-item">
        <view class="form-label-wrapper">
          <image class="form-label-icon" src="../../../../static/images/new-community/shop/mobile.png"></image>
          <view class="label">手机号</view>
        </view>
        <view class="input-wrapper">
          <input type="number" v-model="loginForm.phone" class="input" placeholder="请输入电话号码" />
        </view>
      </view>

      <view class="form-item" style="margin-top: 48upx">
        <view class="form-label-wrapper">
          <image class="form-label-icon" src="../../../../static/images/new-community/shop/code.png"></image>
          <view class="label">验证码</view>
        </view>
        <view class="input-wrapper">
          <input v-model="loginForm.code" type="number" class="input" placeholder="请输入验证码" />
          <button class="uni-btn" v-if="count === 60" @click="handleSendCode">获取验证码</button>
          <button class="uni-btn" v-else>{{ count }}s后重新获取</button>
        </view>
      </view>

      <button class="uni-btn login-btn" @click="handleLogin">立即登录</button>

      <tui-toast ref="toast"></tui-toast>
    </view>
  </tui-bottom-popup>
</template>

<script>
import { getCodeApi } from '../../../../api/auth';

export default {
  data() {
    return {
      pwdLoginPopupVisible: false,
      codeTimer: null,
      isLoading: false,
      count: 60,
      loginForm: {
        phone: '',
        code: ''
      }
    };
  },

  methods: {
    show() {
      this.pwdLoginPopupVisible = true;
    },

    // 点击登录
    async handleLogin() {
      if (!this.loginForm.phone) {
        this.ttoast({
          type: 'info',
          title: '请输入手机号码'
        });
        return;
      }

      if (!this.loginForm.code) {
        this.ttoast({
          type: 'info',
          title: '请输入验证码'
        });
        return;
      }

      this.$emit('login', { ...this.loginForm }, 'code');
    },

    // 发送验证码
    async handleSendCode() {
      if (this.codeTimer) return;
      if (!this.loginForm.phone) {
        this.ttoast({
          type: 'fail',
          title: '请输入手机号码'
        });

        return;
      }

      try {
        uni.showLoading();
        await getCodeApi({
          phone: this.loginForm.phone,
          flag: 2
        });

        this.codeTimer = setInterval(() => {
          uni.hideLoading();
          if (this.count <= 1) {
            this.count = 60;
            clearInterval(this.codeTimer);
            this.codeTimer = null;
            return;
          }
          this.count--;
        }, 1000);
      } catch (error) {
        this.ttoast({
          type: 'fail',
          title: '验证码发送失败',
          content: error
        });
      } finally {
        uni.hideLoading();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.pwd-login-popup-container {
  width: 100%;
  height: 953upx;
  background-color: #fff;
  border-radius: 50upx 50upx 0 0;
  padding: 56upx 64upx 0;

  .form-item {
    .form-label-wrapper {
      display: flex;
      align-items: center;
      font-size: 32upx;
      color: #222229;
      font-weight: 500;

      .form-label-icon {
        width: 32upx;
        height: 32upx;
        margin-right: 8upx;
        flex-shrink: 0;
      }
    }

    .input-wrapper {
      display: flex;
      align-items: center;
      width: 622upx;
      height: 73upx;
      background-color: #f2f7ff;
      margin-top: 31upx;
      padding: 16upx 40upx;
      border-radius: 16upx;
      box-sizing: border-box;
      font-size: 28upx;

      .input {
        font-size: 28upx;
        flex: 1;
      }

      .uni-btn {
        font-size: 32upx;
        color: #3982f1;
        margin-left: 34upx;
        padding-left: 34upx;
        border-left: 1upx solid #c4c6cf;
        border-radius: 0;
      }
    }
  }

  .login-btn {
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 622upx;
    height: 96upx;
    background-color: #3982f1;
    margin-top: 172upx;
    color: #fff;
    font-weight: 500;
  }
}
</style>
