<template>
  <view class="tuan-wx-login-container" @click="handleWXLogin">
    <slot></slot>
    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
// #ifdef H5
import { getUrlCode } from '../../utils';
// #endif
export default {
  props: {
    agreementStatus: {
      type: Boolean,
      default: false
    },
    callBackUrl: {
      type: String,
      default: 'https://www.tuanfengkeji.cn/TFShop_Uni_H5/#/pages/login/login'
    }
  },
  methods: {
    async handleWXLogin() {
      // if (!this.agreementStatus) {
      //   this.ttoast({
      //     type: 'info',
      //     title: '请勾选服务协议'
      //   });
      //   return;
      // }
      // #ifdef H5
      const _this = this;
      const appid = 'wxb19ccb829623be12';
      const local = this.$store.state.app.isInMiniProgram ? `${this.callBackUrl}?miniProgram=1` : `${this.callBackUrl}`;
      const code = getUrlCode().code;

      // console.log('获取code', code)
      // alert('获取code', code)

      if (code == null || code === '') {
        window.location.href =
          'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + encodeURIComponent(local) + '&response_type=code&scope=snsapi_userinfo#wechat_redirect';
      } else {
        const data = await this.$store.dispatch('auth/wxLogin', code);
        this.$emit('login', data);
      }
      // #endif
    }
  },

  mounted() {
    // #ifdef H5
    const code = getUrlCode().code;
    if (code) {
      this.handleWXLogin();
    }
    // #endif
  }
};
</script>

<style lang="less" scoped></style>
