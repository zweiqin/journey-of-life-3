<template>
  <view class="un-login-page">
    <image class="logo" src="../../../static/images/new-user/fee.icon.png"></image>
    <view class="page-title">{{ APPLY_NAME }}</view>

    <view class="tip">
      <view>{{ message }}</view>
      <view>{{ subMessage }}</view>
    </view>

    <button class="uni-btn" @click="handleLogin">立即登录</button>
    <button class="uni-btn skip" v-if="skip" @click="handleSkip">暂时跳过</button>
  </view>
</template>

<script>
import { APPLY_NAME } from '../../../config'
export default {
  props: {
    skip: { type: Boolean, default: true },
    message: { type: String, default: '为了给您提供更好的服务' },
    subMessage: { type: String, default: '我们需要您的授权哦~' },
    to: { type: String, default: '' }
  },
  data() {
    return {
      APPLY_NAME
    }
  },
  methods: {
    handleSkip() {
      uni.switchTab({ url: '/pages/community-center/community-centerr' })
    },

    handleLogin() {
      let loginPath = '/pages/login/login'
      if (this.to) {
        loginPath += '?to=' + this.to
      }
      this.go(loginPath)
    }
  }
}
</script>

<style lang="less" scoped>
.un-login-page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 1000000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .logo {
    width: 100upx;
    height: 100upx;
    border-radius: 50%;
  }

  .page-title {
    font-size: 32upx;
    color: #000;
    font-weight: 500;
    margin-top: 20upx;
    margin-bottom: 40upx;
  }

  .tip {
    font-size: 28upx;
    line-height: 1.5;
    color: #3d3d3d;

    > view {
      text-align: center;
    }
  }

  .uni-btn {
    width: 80vw;
    height: 80upx;
    color: #fff;
    background-color: #fd7b2e;
    border-radius: 8upx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28upx;
    margin-top: 100upx;
    transition: all 350ms;

    &.skip {
      background-color: #fff;
      margin-top: 20upx;
      color: #ccc;
    }

    &:active {
      opacity: 0.7;
    }
  }
}
</style>
