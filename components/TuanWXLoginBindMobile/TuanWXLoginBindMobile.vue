<template>
  <tui-bottom-popup :zIndex="1002" :maskZIndex="1001" :show="showPopupVisible" @close="handleClosePopop">
    <view class="popup-container">
      <view class="close-wrapper">
        <tui-icon name="close" @click="handleClosePopop" :size="20"></tui-icon>
      </view>

      <view class="form-wrapper">
        <view class="form-title">绑定手机号码</view>

        <view class="tip"> 为了给您一个好的体验，强烈建议您绑定手机号，以便于您可以实时了解您的订单状态以及其他服务 </view>

        <view class="form-item">
          <view class="form-label">手机号码</view>
          <input v-model="bindForm.phone" type="text" class="value" placeholder="请输入手机号码" />
        </view>

        <view class="form-item">
          <view class="form-label">验证码</view>
          <input v-model="bindForm.code" type="text" class="value" placeholder="请输入验证码" />
          <view class="code" @click="handleGetCode">{{ !awaitSecond ? '获取验证码' : awaitSecond + 's后重新发送' }}</view>
        </view>

        <button class="bind-btn uni-btn" :loading="bindLoading" @click="handleBindMobile">
          {{ bindLoading ? '加载中...' : '确定' }}
        </button>
      </view>

      <tui-toast ref="toast"></tui-toast>
    </view>
  </tui-bottom-popup>
</template>

<script>
import { USER_INFO } from 'constant';
import { getCodeApi, bindMobileForWXApi } from '../../api/auth';
export default {
  data() {
    return {
      showPopupVisible: false,
      bindForm: {
        openId: '',
        phone: '',
        code: ''
      },
      awaitSecond: 0,
      timer: null,
      bindLoading: false
    };
  },

  mounted() {
    const userInfo = uni.getStorageSync(USER_INFO);
    if (userInfo) {
      if (userInfo.weixinOpenid && !userInfo.phone) {
        this.bindForm.openId = userInfo.weixinOpenid;
      } else {
        this.handleClosePopop();
      }
    }
  },

  methods: {
    show() {
      this.showPopupVisible = true;
    },
    handleClosePopop() {
      this.$emit('close');
      this.showPopupVisible = false;
    },
    // 获取验证码
    // 获取验证码
    async handleGetCode() {
      if (this.awaitSecond !== 0) {
        this.ttoast({
          type: 'fail',
          title: '验证码已发送，请勿重新获取'
        });
        return;
      }
      if (this.bindForm.phone.length !== 11) {
        this.ttoast({
          type: 'fail',
          title: '请输入合法的手机号码'
        });
        return;
      }

      uni.showLoading({
        title: '加载中...'
      });

      try {
        await getCodeApi({
          phone: this.bindForm.phone,
          flag: 2
        });

        this.awaitSecond = 60;

        this.timer = setInterval(() => {
          this.awaitSecond--;

          if (this.awaitSecond === 0) {
            this.awaitSecond = 0;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      } catch (error) {
        this.ttoast({
          type: 'fail',
          title: '验证码发送失败',
          content: '请稍后重试'
        });
      } finally {
        uni.hideLoading();
      }
    },

    async handleBindMobile() {
      if (!this.bindForm.code) {
        this.ttoast({
          type: 'fail',
          title: '请输入验证码'
        });

        return;
      }

      if (!this.bindForm.phone) {
        this.ttoast({
          type: 'fail',
          title: '请输入绑定的手机号'
        });

        return;
      }

      if (this.bindForm.phone.length !== 11) {
        this.ttoast({
          type: 'fail',
          title: '请输入合法的手机号码'
        });
        return;
      }

      try {
        await bindMobileForWXApi(this.bindForm);
        this.ttoast('绑定成功');
        this.$emit('success');
      } catch (error) {
        this.ttoast({
          type: 'fail',
          title: '绑定失败',
          content: '请稍后重试'
        });
      } finally {
        this.bindLoading = false;

        setTimeout(() => {
          this.handleClosePopop();
        }, 2000);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.popup-container {
  padding: 17upx 19upx;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 40upx 40upx 0 0;

  .close-wrapper {
    display: flex;
    justify-content: flex-end;
  }

  .form-wrapper {
    padding: 8upx 43upx 0;
    box-sizing: border-box;

    .form-title {
      color: #141000;
      font-size: 40upx;
      font-weight: 500;
    }

    .tip {
      margin-bottom: 30upx;
      margin-top: 4upx;
      color: #ccc;
      font-size: 24upx;
      color: #e95d20;
    }

    .form-item {
      .form-label {
        color: #141000;
        font-size: 32upx;
        margin-bottom: 8upx;
      }

      .value {
        width: 100%;
        height: 72upx;
        border-radius: 100px;
        border: 1upx solid #e95d20;
        margin-bottom: 16upx;
        font-size: 24upx;
        padding: 0 38upx;
        box-sizing: border-box;
      }

      .code {
        font-size: 28upx;
        color: #e95d20;
        margin-top: 20upx;
        text-align: right;
      }
    }
  }

  .bind-btn {
    height: 80upx;
    width: 100%;
    background-color: #e95d20;
    margin-top: 48upx;
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 29upx;
    color: #fff;
    font-weight: 500;
    transition: all 350ms;
    margin-bottom: 40upx;

    &:active {
      background-color: #ff7c44;
    }
  }
}
</style>
