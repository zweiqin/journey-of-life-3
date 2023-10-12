<!--
 * @Author: aliyun0758874076 2300202994@qq.com
 * @Date: 2023-10-12 09:11:06
 * @LastEditors: aliyun0758874076 2300202994@qq.com
 * @LastEditTime: 2023-10-12 10:51:54
 * @FilePath: \tuan\pages\login\login.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="container">
    <view style="padding: 68upx 0 0 56upx; color: #ffffff">
      <view style="font-weight: bold; font-style: oblique">
        <view style="font-size: 58upx">欢迎来到</view>
        <view style="font-size: 62upx">团蜂社区</view>
      </view>
      <view style="margin-top: 12upx; font-size: 30upx">
        <text class="shabizhongweiqing">数字化营销的领跑者</text>
      </view>
    </view>
    <view
      style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 80upx;
      "
    >
      <view style="text-align: center">
        <image
          style="width: 118upx; height: 98upx; margin-top: 140rpx"
          src="../../static/images/icon/we-chat.png"
          mode=""
        />
        <TuanWXLogin :agreementStatus="agreementStatus" @login="handleWXLoginAfter">
          <view class="CaoNiMaZhongWeiQing">
            微信一键登录
          </view>
          <!-- <view class="item">
            <image src="../../static/images/new-auth/wx.png" mode="" />
            <text>微信登录</text>
          </view> -->
        </TuanWXLogin>

      </view>
    </view>
    <view class="otherLoginButton">
      <view class="orderButtonItem">
        <!-- <view
          style="display: flex; flex-direction: column; align-items: center"
        >
          <view class="DiaoNiMaZhongWeiQing">
            <image
              class="iconImg"
              src="../../static/images/icon/zhuce.png"
            ></image>
          </view>
          <view style="margin-top: 12upx; font-size: 26upx; color: #ffffff"
            >注册</view
          >
        </view> -->
        <view
          style="display: flex; flex-direction: column; align-items: center"
		  @click="go('/pages/login/pwdLogin')"
        >
          <view class="DiaoNiMaZhongWeiQing">
            <image
              class="iconImg"
              src="../../static/images/icon/mima.png"
            ></image>
          </view>
          <view style="margin-top: 12upx; font-size: 26upx; color: #ffffff"
            >密码登录</view
          >
        </view>
        <view
          style="display: flex; flex-direction: column; align-items: center"
		  @click="go('/pages/login/login-message')"
        >
          <view class="DiaoNiMaZhongWeiQing">
            <image
              class="iconImg"
              src="../../static/images/icon/duanxindenglu.png"
            ></image>
          </view>
          <view style="margin-top: 12upx; font-size: 26upx; color: #ffffff"
            >短信登录</view
          >
        </view>
      </view>
    </view>
    <view class="agreementBox">
      <checkbox :checked='agreementStatus' @click="fuckYouZWQ" />
      <text style="margin-left: 2rpx; width: 370rpx" class="colorText">
          <view class="Agreements">
            我已阅读并同意<!-- <text class="redText">《用户服务协议》</text> -->
            <TuanServe @op="agreementStatus = $event">
              <text style="color: #FFF;">《团蜂用户协议》</text>
            </TuanServe>
          </view>
        </text>
    </view>
  </view>
</template>

<script>
import { sf } from "../../config";
import loginRule from "./rules";
import { throttle } from "../../utils";
import {
  NEW_BIND_ID,
  USER_ID,
  USER_INFO,
  NEW_BIND_ACTIVITY_ID,
  NEW_BIND_SERVICE_ID,
  NEW_BIND_SERVICE_URL,
  SF_INVITE_CODE,
  GROUP_INVITE_CODE,
} from "../../constant";
import { bindLastUserApi, checkBindApi } from "../../api/user";
import { CHANGE_IS_IN_MINIPROGRAM } from "../../store/modules/type";
const tabbarList = [
  "/pages/user/user",
  "/pages/community-center/community-center",
  "/pages/index/index",
];

export default {
  data() {
    return {
      timer: null,
      agreementStatus: false, // 智障uniapp 设计的这么傻逼，竟然不能用布尔值控制是否选中
      loginForm: {
        phone: "",
        password: "",
      },
      to: null,
      onlogin: null,
      isShowPassword: false,
      focusMap: {
        0: false,
        1: false,
      },
      redirect: "",
      isBind: false,
      bindId: null,
      userId: null,
      partnerCode: "",
      partnerCode2: "",
    };
  },
  methods: {
	fuckYouZWQ(value) {
      this.agreementStatus = !this.agreementStatus;
    },
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
      } else if (uni.getStorageSync(NEW_BIND_ACTIVITY_ID)) {
        uni.redirectTo({
          url: '/user/sever/activityCenter/index'
        })
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
.colorText {
  margin-top: 2rpx;
  font-size: 24rpx;
  font-weight: 50;
  line-height: 36rpx;
  text-align: center;
  color: #fff;
}
.container {
  background-color: #ea5b1d;
  min-height: 100vh;
}
.ShaBiZhongWeiQing {
  font-size: 32rpx;
  font-weight: normal;
  line-height: 42rpx;
  color: #ffffff;
}
.CaoNiMaZhongWeiQing {
  margin-top: 40rpx;
  width: 600rpx;
  height: 80rpx;
  background-color: #fff;
  border-radius: 50rpx;
  font-size: 38rpx;
  font-weight: 600;
  line-height: 80rpx;
  font-feature-settings: "kern" on;
  color: #ea5b1d !important;
}
.DiaoNiMaZhongWeiQing {
  box-sizing: border-box;
  padding: 10rpx;
  width: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #fff;
}
.DaShaBiZhongWeiQing {
  width: 34rpx;
  height: 34rpx;
  background-color: #fff;
  display: flex;
}
.otherLoginButton {
  // margin-top: 555rpx;
  position: fixed;
  bottom: 120rpx;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .orderButtonItem {
    display: flex;
    justify-content: space-around;
    white-space: nowrap;
    & > view:not(:first-child) {
      padding-left: 48upx;
    }
  }
}
.agreementBox {
  width: 100vw;
  position: fixed;
  // transform: translateX(-50%);
  bottom: 46rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.iconImg {
  width: 40rpx;
  height: 40rpx;
}
/deep/ .uni-checkbox-input-checked {
  background-color: #ffffff !important;
}
/deep/ .uni-checkbox-input-checked::before {
  color: #0648fe !important;
}
.Agreements {
  display: flex;
}
</style>
