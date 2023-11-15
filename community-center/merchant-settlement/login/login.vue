<template>
  <view class="shop-login-page">
    <view class="title-container">
      <image class="login-icon" src="../../../static/images/new-community/shop/login-icon.png"> </image>

      <view class="title-wrapper">
        <view class="main-title">商品无限好 誉从信中来</view>
        <view class="sub-item">让传统商业，抱团发展，实惠共享</view>
        <view class="sub-item">探索未来发展新模式</view>
        <view class="sub-item">本地生活商圈运营专家</view>
      </view>
    </view>

    <view class="login-btns">
      <TuanWXLogin @login="handleLoginSuccessCB" :callBackUrl="`${rootUrl}/#/community-center/merchant-settlement/login/login`">
        <button class="uni-btn">
          <image class="login-type-icon" src="../../../static/images/new-community/shop/we-icon.png"></image>
          微信登录
        </button>
      </TuanWXLogin>
      <!-- <button class="uni-btn" @click="handleShowPWDLogin">
        <image style="margin-right: 16upx" class="login-type-icon" src="../../../static/images/new-community/shop/mo-icon.png"></image>
        验证码登录
      </button> -->
    </view>

    <view class="service-agreement" @click="handleAgreeService">
      <tui-icon :color="isAgree ? '#FF380C' : ''" :size="18" name="circle-selected" style="margin-right: 10upx"></tui-icon>
      我已阅读并同意《用户服务协议》与《隐私协议》
    </view>

    <PWDLoginPopup @login="handleLogin" ref="PWDLoginPopupRef"></PWDLoginPopup>
    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { A_TF_MAIN } from '../../../config'
import PWDLoginPopup from './components/PWDLoginPopup.vue';
import { USER_INFO } from '../../../constant';

export default {
	name: 'login',
  components: { PWDLoginPopup },
  data() {
    return {
			rootUrl: A_TF_MAIN,
      isAgree: false,
      timer: null
    };
  },

  onLoad() {
    const userInfo = uni.getStorageSync(USER_INFO);
    if (userInfo) {
      this.$store.dispatch('auth/refrshUserInfo', this.handleLoginSuccessCB);
    }
  },

  methods: {
    // 点击勾选服务协议
    handleAgreeService() {
      this.isAgree = !this.isAgree;
    },

    // 点击验证码登录
    handleShowPWDLogin() {
      this.$refs.PWDLoginPopupRef.show();
    },

    handleWXLoginAfter() {
      console.log('微信登录成功');
      const _this = this;
      uni.navigateTo({
        url: '/community-center/merchant-settlement/login/choose-type',
        success: () => {
          clearTimeout(_this.timer);
          _this.timer = null;
        }
      });
    },

    // 点击登录、
    async handleLogin(loginForm, loginType) {
      const _this = this;
      switch (loginType) {
        case 'code':
          if (!this.isAgree) {
            this.ttoast({
              type: 'fail',
              title: '请先勾选用户协议'
            });
            return;
          }
          try {
            const userInfo = await this.$store.dispatch('auth/codeLoginAction', loginForm);
            this.ttoast('登录成功');
            this.handleLoginSuccessCB(userInfo);
          } catch (error) {
            this.ttoast({
              type: 'fail',
              content: '登录失败',
              title: error
            });
          }
          break;

        default:
          break;
      }
    },

    // 登录成功后续
    handleLoginSuccessCB(userInfo) {
      const { userMap } = userInfo;
      if (userMap && userMap.isMd) {
        uni.switchTab({
          url: '/pages/user/user'
        });
      } else {
        uni.navigateTo({ url: '/community-center/merchant-settlement/login/choose-type' });
      }
    }
  }
};
</script>

<style lang="less" scoped>
@keyframes login-icon {
  0% {
    opacity: 0;
    transform: translateY(-100upx);
  }

  50% {
    opacity: 0;
    transform: translateY(-50upx);
  }

  100% {
    opacity: 1;
    transform: translate3d(0upx);
  }
}

@keyframes title-wrapper {
  0% {
    opacity: 0;
    transform: translateX(-100upx);
  }

  50% {
    opacity: 0;
    transform: translateX(-50upx);
  }

  100% {
    opacity: 1;
    transform: translate3d(0upx);
  }
}

@keyframes login-wrapper {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.shop-login-page {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;

  .title-container {
    position: relative;
    height: 729upx;
    width: 100%;
    background: linear-gradient(180deg, #cae4f5 0%, #d5e6f6 9%, #c7cbf0 40%, #bfdbf3 53%, #ffffff 95%);
    // transition: all 500ms;

    .login-icon {
      position: absolute;
      width: 558upx;
      height: 385upx;
      top: 90upx;
      left: 96upx;
      right: 96upx;
      animation: login-icon 1s linear;
    }

    .title-wrapper {
      position: absolute;
      left: 60upx;
      top: 533upx;
      color: #222229;
      font-size: 28upx;
      line-height: 1.5;
      animation: title-wrapper 1.3s linear;

      .main-title {
        font-size: 42upx;
        font-weight: bold;
      }
    }
  }

  .login-btns {
    margin-top: 120upx;
    flex: 1;
    animation: login-wrapper 2.6s linear;

    .uni-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 622upx;
      height: 96upx;
      border-radius: 16upx;
      color: #fff;
      font-size: 34upx;
      font-weight: 500;
      transition: all 350ms;

      &:active {
        opacity: 0.7;
      }

      .login-type-icon {
        width: 48upx;
        height: 48upx;
        margin-right: 33upx;
      }

      &:nth-child(1) {
        background: #5ecb72;
        margin-bottom: 48upx;
      }

      &:nth-child(2) {
        background: #3982f1;
      }
    }
  }

  .service-agreement {
    position: relative;
    z-index: 30000;
    color: #222229;
    font-size: 24upx;
    display: flex;
    align-items: center;
    margin-bottom: 55upx;
  }
}
</style>
