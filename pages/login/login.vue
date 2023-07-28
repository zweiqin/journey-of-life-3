<template>
  <view class="login-container">
    <image class="back-icon" src="../../static/images/new-auth/back.png" mode="" @click="handleBack" />

    <view class="login-main-area">
      <h1>登录</h1>

      <tui-form ref="form">
        <tui-input
          v-model="loginForm.phone"
          label="手机号码"
          padidng="0 0 28rpx 0"
          border-top
          placeholder="请输入手机号码"
          color="#141000"
          :focus="focusMap[0]"
          :confirm-type="keybordEnterText"
          @confirm="handleClickConfirmType(0)"
        ></tui-input>
        <tui-input
          v-model="loginForm.password"
          color="#141000"
          padidng="0 0 28rpx 0"
          label="密码"
          :focus="focusMap[1]"
          :confirm-type="keybordEnterText"
          class="reset-wrapper"
          :line-left="false"
          :type="isShowPassword ? 'text' : 'password'"
          placeholder="请输入密码"
          @confirm="handleClickConfirmType(1)"
        >
          <block slot="right">
            <image
              class="password-status"
              :src="isShowPassword ? '../../static/images/common/view-password .png' : '../../static/images/common/close-password.png'"
              mode=""
              @click="isShowPassword = !isShowPassword"
            />
          </block>
        </tui-input>
      </tui-form>

      <view style="display: flex; justify-content: space-between; align-items: center">
        <view class="service-agreement-wrapper">
          <tui-icon
            :name="agreementStatus ? 'square-selected' : 'square'"
            :color="agreementStatus ? '#FFC117' : ''"
            :size="18"
            @click="agreementStatus = !agreementStatus"
          ></tui-icon>
          <text @click="agreementStatus = !agreementStatus"> 我已阅读并同意 </text>
          <TuanServe @op="agreementStatus = $event">
            <text style="color: #ffc117">《团蜂用户协议》</text>
          </TuanServe>
        </view>

        <navigator class="forget-assword" url="/pages/reset-password/reset-password" hover-class="none"> 忘记密码 </navigator>
      </view>

      <button class="login-btn uni-btn" :style="{ background: btnStatus ? '#FFC117' : '' }" @click="onlogin">登录</button>

      <view class="to-login" @click="handleRedirect"> 您还未有帐号？<text>立即注册</text> </view>

      <view class="more-login">
        <!-- #ifdef H5 -->
        <TuanWXLogin @login="handleWXLoginAfter">
          <view class="item">
            <image src="../../static/images/new-auth/wx.png" mode="" />
            <text>微信登录</text>
          </view>
        </TuanWXLogin>
        <!-- #endif -->

        <view class="item" @click="go('/pages/login/login-message')">
          <image src="../../static/images/new-auth/message.png" mode="" />
          <text>短信登录</text>
        </view>
      </view>
    </view>
    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { sf } from '../../config';
import loginRule from './rules';
import { throttle } from '../../utils';
import {
  NEW_BIND_ID,
  USER_ID,
  USER_INFO,
  NEW_BIND_ACTIVITY_ID,
  NEW_BIND_SERVICE_ID,
  NEW_BIND_SERVICE_URL,
  SF_INVITE_CODE,
  GROUP_INVITE_CODE
} from '../../constant';
import { bindLastUserApi, checkBindApi } from '../../api/user';
import { CHANGE_IS_IN_MINIPROGRAM } from '../../store/modules/type';

const tabbarList = ['/pages/user/user', '/pages/community-center/community-center', '/pages/index/index'];

export default {
  name: 'Login',
  data() {
    return {
      timer: null,
      agreementStatus: false,
      loginForm: {
        phone: '',
        password: ''
      },
      to: null,
      onlogin: null,
      isShowPassword: false,
      focusMap: {
        0: false,
        1: false
      },

      redirect: '',
      isBind: false,
      bindId: null,
      userId: null,
      partnerCode: '',
      partnerCode2: ''
    };
  },
  async onLoad(options) {
    if (options.miniProgram) {
      getApp().globalData.isInMiniprogram = true;
    }
    this.$store.commit(`app/${CHANGE_IS_IN_MINIPROGRAM}`, !!options.miniProgram);
    this.onlogin = throttle(this.handlelogin, 1000);
    this.redirect = options.to;

    this.bindId = options.code;
    this.partnerCode = options.partnerCode;
    this.partnerCode2 = options.partnerCode2;
    if (this.partnerCode) {
      getApp().globalData.isShowFollowOfficialAccount = true;
      // console.log('你没得');
    }

    if (this.partnerCode) {
      uni.setStorageSync(SF_INVITE_CODE, options.partnerCode);
    }

    if (this.partnerCode2) {
      uni.setStorageSync(GROUP_INVITE_CODE, options.partnerCode2);
    }

    if (this.redirect && this.redirect.indexOf('?') > -1) {
      this.bindId = this.redirect;
    }
    if (this.bindId) {
      uni.setStorageSync(NEW_BIND_ID, this.bindId);
    }

    const userId = uni.getStorageSync(USER_ID);
    const userInfo = uni.getStorageSync(USER_INFO);

    // #ifdef H5
    if (uni.getStorageSync(NEW_BIND_ID) && userId && !this.bindId) {
      this.bindId = uni.getStorageSync(NEW_BIND_ID);

      try {
        await this.checkBind({
          userId
        });
      } catch (error) {
        await this.binding(userId, () => {
          uni.switchTab({
            url: '/'
          });
        });
      }
    }
    // #endif

    // return

    if (userId && userInfo.userId) {
      if (this.bindId) {
        await this.binding(userId, () => {
          uni.switchTab({
            url: '/'
          });
        });
      } else if (this.partnerCode) {
        await this.handlePartnerBind(userId);
        uni.switchTab({
          url: '/'
        });
      } else if (this.partnerCode2) {
        await this.handleGroupBind(userId);
        uni.switchTab({
          url: '/'
        });
      } else {
        uni.switchTab({
          url: '/'
        });
      }
    }
  },

  onShow() {
    this.partnerCode = uni.getStorageSync(SF_INVITE_CODE) || null;
    this.partnerCode2 = uni.getStorageSync(GROUP_INVITE_CODE) || null;
  },

  computed: {
    btnStatus() {
      return this.agreementStatus && this.loginForm.password && this.loginForm.phone;
    },

    keybordEnterText() {
      return this.agreementStatus && this.loginForm.password && this.loginForm.phone ? 'done' : 'next';
    }
  },
  methods: {
    // 登录
    async handlelogin() {
      if (!this.agreementStatus) {
        this.ttoast({
          type: 'info',
          title: '请勾选服务协议'
        });
        return;
      }
      const _this = this;
      this.$refs.form
        .validate(this.loginForm, loginRule)
        .then(async () => {
          const res = await this.$store.dispatch('auth/loginAction', {
            username: _this.loginForm.phone,
            password: _this.loginForm.password
          });

          // 是否是师傅邀请码
          if (_this.partnerCode) {
            await _this.handlePartnerBind(res.userInfo.userId);
            uni.switchTab({
              url: '/'
            });
            return;
          }

          // 是否存在团长推广码
          if (_this.partnerCode2) {
            await _this.handleGroupBind(res.userInfo.userId);
            uni.switchTab({
              url: '/'
            });
            return;
          }

          // #ifdef H5
          if (uni.getStorageSync(NEW_BIND_ID) && !_this.bindId) {
            try {
              await _this.checkBind({
                userId: res.userInfo.userId
              });
            } catch (error) {
              _this.bindId = uni.getStorageSync(NEW_BIND_ID);
              await _this.binding(res.userInfo.userId, () => {
                uni.switchTab({
                  url: '/'
                });
              });
            }
          }
          // #endif

          // #ifdef H5
          if (_this.bindId) {
            await _this.binding(res.userInfo.userId, () => {
              uni.switchTab({
                url: '/'
              });
            });
          } else {
            // #endif
            if (this.redirect) {
              // console.log('进来了', this.redirect)
              if (tabbarList.includes(_this.redirect)) {
                uni.switchTab({
                  url: _this.redirect
                });
              } else {
                uni.redirectTo({
                  url: _this.redirect
                });
              }
            } else if (uni.getStorageSync(NEW_BIND_ACTIVITY_ID)) {
              uni.redirectTo({
                url: '/user/sever/activityCenter/index'
              });
            } else if (uni.getStorageSync(NEW_BIND_SERVICE_ID)) {
              uni.redirectTo({
                url: uni.getStorageSync(NEW_BIND_SERVICE_URL)
              });
            } else {
              uni.switchTab({
                url: '/pages/community-center/community-centerr'
              });
            }

            // #ifdef H5
          }
          // #endif
        })
        .catch((errors) => {});
    },

    // 回退
    handleBack() {
      uni.navigateBack();
    },
    handleRedirect() {
      uni.navigateTo({
        url: '/pages/register/register'
      });
    },

    // 优化操作
    handleClickConfirmType(tag) {
      this.focusMap[tag + ''] = false;
      if (this.keybordEnterText === 'done') {
        this.handlelogin();
      } else {
        tag = tag + 1 === 2 ? '0' : tag + 1 + '';
        // console.log(tag, typeof tag)
        this.focusMap[tag] = true;
      }
    },

    // 绑定
    binding(userId, cb) {
      const _this = this;
      return new Promise((resolve, reject) => {
        bindLastUserApi({
          userId,
          userCode: this.bindId
        })
          .then((res) => {
            _this.timer = setTimeout(() => {
              cb && typeof cb === 'function' && cb();
            }, 1000);
            resolve();
          })
          .catch((err) => {
            uni.removeStorageSync(NEW_BIND_ID);
            _this.timer = setTimeout(() => {
              cb && typeof cb === 'function' && cb();
            }, 1000);
            reject();
          });
      });
    },

    // 校验绑定
    checkBind(data) {
      return new Promise((reslove, reject) => {
        checkBindApi(data)
          .then(() => {
            reslove(true);
          })
          .catch(() => {
            reject(false);
          });
      });
    },

    // 师傅绑定用户
    async handlePartnerBind(userId) {
      const _this = this;
      uni.request({
        url: sf + '/api/third/partner/memberBindingSf',
        method: 'post',
        data: {
          userId: userId,
          partnerCode: this.partnerCode
        },
        success: (res) => {
          if (!res.data.ok) {
            _this.ttoast({
              type: 'fail',
              title: res.data.msg || '扫码失败'
            });
          }
        },
        fail: () => {},
        complete: () => {}
      });
    },

    // 团长绑定用户
    handleGroupBind(userId) {
      const _this = this;
      return new Promise((resolve, reject) => {
        uni.request({
          url: sf + '/api/third/tz/memberBindingSf',
          method: 'post',
          data: {
            userId: userId,
            partnerCode: _this.partnerCode2
          },
          success: (res) => {
            const data = res.data;
            if (data.ok) {
              _this.ttoast('操作成功');
            } else {
              _this.ttoast({
                type: 'fail',
                title: data.msg || '操作失败,请重试'
              });
            }

            uni.removeStorageSync(GROUP_INVITE_CODE);
          },
          fail: (fail) => {
            _this.ttoast({
              type: 'fail',
              title: '操作失败,请重试'
            });
          },
          complete: (complete) => {
            setTimeout(() => {
              resolve();
            }, 1000);
          }
        });
      });
    },

    // 微信登陆后续
    async handleWXLoginAfter(res) {
      const _this = this;

      // #ifdef H5
      // 判断是否已经绑定了手机号
      if (res.userInfo.phone === '') {
        uni.navigateTo({
          url: '/pages/login/bind-phone?openId=' + res.userInfo.weixinOpenid
        });

        return;
      }

      // 是否是师傅邀请码
      if (_this.partnerCode) {
        await _this.handlePartnerBind(res.userInfo.userId);
        uni.switchTab({
          url: '/'
        });
        return;
      }

      // 是否存在团长推广码
      if (_this.partnerCode2) {
        await _this.handleGroupBind(res.userInfo.userId);
        uni.switchTab({
          url: '/'
        });
        return;
      }

      if (uni.getStorageSync(NEW_BIND_ID) && !_this.bindId) {
        try {
          await _this.checkBind({
            userId: res.userInfo.userId
          });
        } catch (error) {
          _this.bindId = uni.getStorageSync(NEW_BIND_ID);
          await _this.binding(res.userInfo.userId, () => {
            uni.switchTab({
              url: '/'
            });
          });
        }
      }
      if (_this.bindId) {
        await _this.binding(res.userInfo.userId, () => {
          uni.switchTab({
            url: '/'
          });
        });
      } else if (this.redirect) {
        // console.log('进来了', this.redirect)
        if (tabbarList.includes(_this.redirect)) {
          uni.switchTab({
            url: _this.redirect
          });
        } else {
          uni.redirectTo({
            url: _this.redirect
          });
        }
      } else {
        uni.switchTab({
          url: '/pages/community-center/community-centerr'
        });
      }
      // #endif
    }
  }
};
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

  .forget-assword {
    font-size: 24upx;
    color: #8f8d85;
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
