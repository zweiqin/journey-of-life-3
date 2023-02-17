<template>
  <view class="code-container">
    <view class="main-area">
      <view class="back" @click="handleBack">
        <tui-icon name="arrowleft" color="#fff" :size="30"></tui-icon>
      </view>
      <view class="text-code">
        <image
          class="logo"
          src="../../../static/images/user/code/logo.png"
          mode=""
        />

        <view class="copy-code">
          <view class="code-wrapper">
            {{ userInfo.invitationCode || '邀请码获取失败' }}
          </view>
          <button
            v-if="userInfo.invitationCode"
            class="uni-btn"
            @click="handleCopyCode"
          >
            复制邀请码
          </button>
        </view>
      </view>

      <view class="qr-code-wrapper">
        <image v-if="qrcode" class="qr-code-img" :src="qrcode" mode="" />
        <view class="tip"> 面对面扫码邀请，或分享扫码邀请 </view>

        <button class="uni-btn" @click="handleFillCode">填写邀请码</button>
      </view>
    </view>

    <Share :code="qrcode" class="share-pane"></Share>
    <FillCode v-model="fillCodeVisible"></FillCode>
  </view>
</template>

<script>
import Share from './cpns/share.vue'
import FillCode from './cpns/FillCode.vue'
import { USER_INFO } from '../../../constant'
import { getExtensionCodeApi } from '../../../api/user'
import { getUserId } from '../../../utils'
export default {
  components: {
    Share,
    FillCode,
  },

  data() {
    return {
      userInfo: uni.getStorageSync(USER_INFO) || {},
      qrcode: '',
      fillCodeVisible: false,
    }
  },

  onLoad() {
    this.getCode()
  },

  methods: {
    handleBack() {
      uni.switchTab({
        url: '/pages/user/user',
      })
    },

    // 点击复制邀请码
    handleCopyCode() {
      uni.setClipboardData({
        data: this.userInfo.invitationCode,
        success: () => {
          uni.showToast({
            title: '邀请码复制成功',
            duration: 2000,
          })
        },
      })
    },

    // 获取推广码
    getCode() {
      getExtensionCodeApi({
        url:
          'https://www.tuanfengkeji.cn/TFShop_Uni_H5/#/pages/login/login?bindId=' +
          getUserId(),
      }).then(res => {
        console.log(res)
        this.qrcode = 'data:image/jpeg;base64,' + res.data
      })
    },

    //
    handleFillCode() {
      this.fillCodeVisible = true
    },
  },
}
</script>

<style lang="scss" scoped>
.code-container {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background: url('../../../static/images/user/code/code-bg.png') no-repeat;
  background-size: cover;

  .wrapper {
    height: 100%;
    text-align: center;
    overflow: scroll;
    margin-bottom: 160upx;
    // background-color: #fff;
  }

  .main-area {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    width: 622upx;
    height: 1126upx;
    margin: 0 auto;
    // background: url('../../../static/images/user/code/mian-bg.png') no-repeat;
    // background-size: cover;
    margin-top: 154upx;
    background-color: #fff;
    border-radius: 30upx;

    &::after {
      top: 430upx;
      position: absolute;
      content: '';
      width: 574upx;
      height: 0;
      border-bottom: 1upx dotted #d8d8d8;
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
