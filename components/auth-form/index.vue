<template>
  <view class="login-page">
    <view class="header">
      <image
        @click="back"
        class="back"
        src="../../static/images/store/chevron-states.png"
        alt=""
      />
      <view class="title" v-if="title">{{ title }}</view>
      <view class="title" @click="toRoute">{{ routeText }}</view>
    </view>
    <view class="main">
      <image
        class="title-img"
        src="../../static/images/common/login-log.png"
        alt=""
        v-if="type !== 'reset'"
      />

      <view class="sub-title" v-if="type !== 'reset'">在这里开启新的彼岸</view>
      <view class="auth-form">
        <view class="form-item">
          <view class="name">手机号码</view>
          <input
            :adjust-position="false"
            v-model="form.mobile"
            class="input"
            type="text"
          />
        </view>
        <!-- <view class="form-item" v-if="type !== 'login'">
          <view class="name">短信验证</view>
          <input v-model="form.code" class="input" type="text" />
          <view class="get-qr" @click="getQr">{{
            isSendCode ? count : "获取验证码"
          }}</view>
        </view> -->
        <view class="form-item">
          <view class="name">输入密码</view>
          <input
            :adjust-position="false"
            v-model="form.password"
            class="input"
            :type="inputType"
          />
          <image
            @click="isView = !isView"
            class="icon"
            src="../../static/images/common/views.png"
            alt=""
          />
        </view>
      </view>
      <view class="forget-ps" v-if="type === 'login'"
        ><text @click="reset">忘记密码</text></view
      >

      <button
        @click="submit"
        class="login-btn"
        :style="{ 'margin-top': btnTop + 'px' }"
      >
        {{ btnText }}
      </button>
      <view class="text-btn" @click="register" v-if="type === 'login'"
        >注册账号</view
      >
    </view>

    <!-- <tui-icon
      @click="go('/pages/login-wx/login')"
      name="wechat"
      color="#2fdb72"
    ></tui-icon> -->

    <!--  <checkbox-group class="argument-container" @change="handleChange">
      <checkbox value="gou" :checked="isChecked" />
      <view class="argument" @click="handleToViewArgument"
        >《团蜂服务平台协议》</view
      >
    </checkbox-group> -->
  </view>
</template>

<script>
import { LOGIN_FORM } from '../../constant'
export default {
  props: {
    type: {
      type: String,
      default: 'login',
    },

    btnTop: {
      type: Number,
      default: 113,
    },

    btnText: {
      type: String,
      default: '登录',
    },

    title: String,
    routeText: String,
    route: String,
    to: String,
  },

  data() {
    return {
      form: {
        mobile: '',
        code: '',
        password: '',
      },

      timer: null,
      count: 60,
      isSendCode: false,
      isView: false,
      isChecked: false,
    }
  },

  methods: {
    submit() {
      // if (!this.isChecked) {
      //   uni.showToast({
      //     title: '请勾选平台协议',
      //     icon: 'none',
      //   })

      //   uni.setStorageSync(LOGIN_FORM, this.form)

      //   return
      // }
      this.$emit('submit', { ...this.form })
    },

    register() {
      uni.navigateTo({
        url: '/pages/register/register?to=' + this.to,
      })
    },

    reset() {
      uni.navigateTo({
        url: '/pages/reset-password/reset-password?to=' + this.to,
      })
    },

    back() {
      uni.navigateBack()
    },

    toRoute() {
      if (!this.route) {
        return
      }
      uni.navigateTo({
        url: this.route,
      })
    },

    // 点击获取验证码
    getQr() {
      if (this.isSendCode) {
        uni.showToast({
          title: '验证码已发送，请耐心等待',
          icon: 'none',
        })

        return
      }

      if (!this.form.mobile.trim()) {
        uni.showToast({
          title: '请输入电话号码',
          icon: 'none',
        })

        return
      }

      // if (this.form.mobile !== 11) {
      //   uni.showToast({
      //     title: "请输入11位电话号码",
      //     icon: "none",
      //   });

      //   return;
      // }

      this.timer = setInterval(() => {
        this.isSendCode = true

        if (this.count === 0) {
          clearInterval(this.timer)
          this.timer = null
          this.isSendCode = false
          return
        }
        this.count--
      }, 1000)
    },

    // 勾选状态
    handleChange(e) {
      this.isChecked = e.detail.value[0] === 'gou'
    },

    handleToViewArgument() {
      uni.setStorageSync(LOGIN_FORM, this.form)
      uni.navigateTo({
        url: '/pages/service-agreement/service-agreement',
      })
    },
  },

  computed: {
    inputType() {
      return this.isView ? 'text' : 'password'
    },
  },

  mounted() {
    const loginForm = uni.getStorageSync(LOGIN_FORM)
    if (loginForm) {
      Object.assign(this.form, loginForm)
    }
  },
}
</script>

<style lang="less" scoped>
.login-page {
  width: 100%;
  height: 100vh;
  padding: 180upx 66upx 0;
  box-sizing: border-box;
  background: url('../../static/images/common/login-bg.png') no-repeat;
  background-size: cover;

  .header {
    position: fixed;
    top: 98upx;
    left: 40upx;
    right: 40upx;
    display: flex;
    justify-content: space-between;

    .back {
      width: 48upx;
      height: 48upx;
    }

    .title {
      color: #3d3d3d;
      font-size: 28upx;
    }
  }

  .title-img {
    width: 464upx;
    height: 40upx;
  }

  .sub-title {
    color: #999999;
    font-size: 24upx;
    letter-spacing: 4upx;
    margin: 6upx 0 90upx 0;
  }

  .forget-ps {
    text-align: right;
    color: #3d3d3d;
    font-size: 20upx;
    line-height: 2.5;
  }

  .login-btn {
    width: 90%;
    height: 74upx;
    line-height: 74upx;
    margin: 0 auto;
    color: #fff;
    font-size: 36upx;
    background: linear-gradient(90deg, #ff8f1f 0%, rgba(255, 81, 0, 0.83) 100%);
    border-radius: 40upx;
  }

  .text-btn {
    margin-top: 40upx;
    text-align: center;
    font-size: 36upx;
    color: #999999;
  }
}
.auth-form {
  .form-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24upx 0;
    border-bottom: 1upx solid #d8d8d8;

    .name {
      color: #999999;
      font-size: 28upx;
    }

    .input {
      flex: 1;
      height: 100%;
      border: none;
      outline: none;
      padding: 0 30upx;
    }

    .get-qr {
      color: #ff8f1f;
      font-size: 24upx;
    }

    .icon {
      width: 28upx;
      height: 22upx;
      font-size: 28upx;
    }
  }
}

.argument-container {
  display: flex;
  align-items: center;
  justify-content: center;
  // position: absolute;
  // bottom: 30upx;
  // left: 50%;
  // transform: translateX(-50%);
  margin-top: 200upx;
}

.argument {
  font-size: 28upx;
  color: #ff8f1f;
}

/deep/ uni-checkbox:not([disabled]) .uni-checkbox-input:hover {
  border-color: #ff8f1f;
}

/deep/ uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
  background-color: #ff8f1f;
}
</style>
