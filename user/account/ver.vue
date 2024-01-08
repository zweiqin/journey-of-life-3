<template>
  <view class="ver-page">
    <image src="../../static/images/user/back.png" mode="scaleToFill" class="return" @click="handleBack" />

    <view class="wrapper">
      <view class="tip">我们已经向 {{ $store.getters.userInfo.phone.slice(0, 3)
      }}****{{ $store.getters.userInfo.phone.slice(7) }}发送了验证码，请填写该验证码</view>
      <tui-code-input cursorColor="#fe8012" activeColor="#fe8012" padding="0" :gap="80" :length="6"
        @complete="handleComplateCode"></tui-code-input>
      <view class="no-code">
        没收到验证码？<button class="uni-btn" @click="handleSendCode">{{ count === 60 ? '点击重新发送' : count }}</button>
      </view>
    </view>
    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { getCodeApi, destoryAccountApi } from '../../api/auth'
export default {
  data() {
    return {
      isSendCode: false,
      timer: null,
      count: 60
    }
  },
  onLoad() {
    this.sendCode()
  },

  methods: {
    // 发送验证码
    async sendCode() {
      const userInfo = this.$store.getters.userInfo
      if (!userInfo || !userInfo.phone || !userInfo.userId) {
        this.ttoast({
          type: 'info',
          title: '请先登录'
        })

        setTimeout(() => {
          uni.switchTab({ url: '/pages/user/user' })
        }, 2000);
        return
      }
      uni.showLoading()
      try {
        await getCodeApi({
          flag: 1,
          phone: this.$store.getters.userInfo.phone
        })
      } finally {
        uni.hideLoading();
      }
    },

    // 再次发送验证码
    handleSendCode() {
      if (this.timer) {
        this.ttoast({
          type: 'info',
          title: "验证码获取频繁"
        })
        return
      }

      this.sendCode()

      this.timer = setInterval(() => {
        this.count--
        if (this.count === 1) {
          this.count = 60
          clearInterval(this.timer)
          this.timer = null
        }
      }, 1000)
    },


    // 完成验证码的输入
    async handleComplateCode(e) {
      const code = e.detail.value
      uni.showLoading();

      try {
        await destoryAccountApi({
          userId: this.$store.getters.userInfo.userId,
          code,
          phone: this.$store.getters.userInfo.phone
        })

        this.ttoast("注销成功")
        this.$store.dispatch('auth/logoutAction', true)
      } finally {
        uni.hideLoading()
      }
    },

    // 返回
    handleBack() {
      uni.switchTab({
        url: '/pages/user/user'
      })
    }
  },
}
</script>

<style lang="less" scoped>
.ver-page {
  min-height: 100vh;
  width: 100%;
  background-color: #f6f6f6;
  padding: 24upx;
  box-sizing: border-box;

  .return {
    width: 24upx;
    height: 48upx;

    // padding: 36upx 0 56upx 40upx;
  }

  .wrapper {
    width: 100%;
    padding: 30upx;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 20upx;
    margin-top: 30upx;

    /deep/ .tui-code__input {
      padding: 0 !important;
    }

    .tip {
      margin-bottom: 30upx;
      font-size: 28upx;
      line-height: 1.5;
      color: #3d33d3d;
    }
  }

  .no-code {
    margin: 60upx 0 20upx 0;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 24upx;

    .uni-btn {
      text-align: right;
      font-size: 24upx;
      color: #fe8012;
      border-radius: 0;
    }
  }
}
</style>