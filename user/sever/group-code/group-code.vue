<template>
  <view class="code-container">
    <view class="main-area">
      <view class="back" @click="handleBack">
        <tui-icon name="arrowleft" color="#fff" :size="30"></tui-icon>
      </view>
      <view class="text-code">
        <image class="logo" src="../../../static/images/user/code/logo.png" mode="" />

        <view class="copy-code">
          <view class="code-wrapper">
            {{ tuanCode || '邀请码获取失败' }}
          </view>
          <button v-if="tuanCode" class="uni-btn" @click="handleCopyCode(tuanCode)">复制推广码</button>
        </view>
      </view>

      <view class="qr-code-wrapper">
        <image :style="{ backgroundColor: tuanCode ? '#fff' : '' }" v-if="qrcode" class="qr-code-img" :src="qrcode" mode="" />
        <view v-else class="qr-code-img" />
        <view class="tip"> 面对面扫码邀请 </view>
        <button v-if="tuanCode" class="uni-btn" @click="handleCopyCode(codeUrl)">复制链接</button>
      </view>
    </view>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { A_TF_MAIN } from '../../../config'
import { USER_INFO } from '../../../constant';
import { getGroupCodeApi } from '../../../api/user';
export default {
  data() {
    return {
      userInfo: null,
      qrcode: '',
      tuanCode: null
    };
  },

  onLoad() {
    const userInfo = uni.getStorageSync(USER_INFO);
    if (userInfo) {
      this.userInfo = userInfo;
      this.getCode();
    }
  },

  methods: {
    handleBack() {
      uni.switchTab({
        url: '/pages/user/user'
      });
    },

    // 点击复制邀请码
    handleCopyCode(data) {
      uni.setClipboardData({
        data: data,
        success: () => {
          uni.showToast({
            title: '复制成功',
            duration: 2000
          });
        }
      });
    },

    // 获取推广码
    async getCode() {
      try {
        const res = await getGroupCodeApi({
          mobile: this.userInfo.phone
        });

        this.qrcode = 'data:image/jpeg;base64,' + res.url;
        this.tuanCode = res.partnerCode;
        this.codeUrl = `${A_TF_MAIN}/#/pages/jump/jump?userId=&type=bindPartnerGroup&code=${this.tuanCode}`;
      } catch (error) {
        this.ttoast({
          type: 'fail',
          title: '推广码获取失败',
          content: error
        });
      }
    },

    //
    handleFillCode() {
      this.fillCodeVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.code-container {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  padding-bottom: 60upx;
  overflow: auto;
  background: url('../../../static/images/user/code/code-bg.png') no-repeat;
  background-size: cover;

  &::after {
    position: absolute;
    content: '';
    width: 20upx;
    height: 40upx;
    border-radius: 0 100px 100px 0;
    background-color: #ffcb05;
    top: 564upx;
    left: 62upx;
  }

  &::before {
    position: absolute;
    content: '';
    width: 20upx;
    height: 40upx;
    border-radius: 100px 0 0 100px;
    background-color: #ffcb05;
    top: 564upx;
    right: 62upx;
    z-index: 10;
  }

  .main-area {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    width: 622upx;
    height: 1160upx;
    margin: 0 auto;
    margin-top: 154upx;
    background-color: #fff;
    border-radius: 30upx;

    &::after {
      top: 430upx;
      position: absolute;
      content: '';
      width: 574upx;
      height: 1px;
      background-image: linear-gradient(to right, #ccc 0%, #ccc 50%, transparent 50%);
      background-size: 8px 1px;
      background-repeat: repeat-x;
    }

    .text-code {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: column;

      .logo {
        height: 245upx;
        width: 162upx;
        margin-top: -72upx;
        margin-bottom: 40upx;
      }

      .copy-code {
        width: 462upx;
        height: 88upx;
        background-color: #f6f6f5;
        border-radius: 24upx;

        .code-wrapper {
          text-align: center;
          line-height: 88upx;
          font-size: 38upx;
          font-weight: bold;
        }

        .uni-btn {
          color: #ffcb05;
          font-size: 26upx;
          font-weight: 400;
          margin-top: 32upx;
        }
      }
    }

    .qr-code-wrapper {
      display: flex;
      align-items: center;
      flex-direction: column;
      padding-bottom: 80upx;

      .qr-code-img {
        width: 320upx;
        height: 320upx;
        padding: 14upx;
        border: 2upx solid #f1f1f0;
        border-radius: 24upx;
        background-color: #ffbe0f;
      }

      .tip {
        font-size: 26upx;
        color: #9e9e9e;
        object-fit: cover;
        margin-top: 32upx;
      }

      .uni-btn {
        width: 462upx;
        height: 88upx;
        background-color: #ffcb05;
        border-radius: 100px;
        line-height: 88upx;
        font-size: 28upx;
        font-weight: bold;
        margin-top: 80upx;
      }
    }
  }

  .back {
    position: absolute;
    top: -116upx;
    left: -40upx;
  }

  .share-pane {
    margin-bottom: 80upx;
  }
}
</style>
