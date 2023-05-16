<template>
  <view class="logoff-page">
    <image src="../../static/images/user/back.png" mode="scaleToFill" class="return" @click="handleBack" />

    <view class="warn-wrapper">
      <tui-icon name="about-fill" :size="80" color="#fb5d46"></tui-icon>
      <view class="tip-text">
        注销 {{ $store.getters.userInfo.phone }} 绑定的账号
      </view>
    </view>

    <view class="account-wrapper">
      <image class="app-icon" src="../../static/images/new-user/fee.icon.png"></image>
      <view class="info">
        <view class="app-title">团蜂家居</view>
        <view class="id"><text class="text">用户名</text>：{{ $store.getters.userInfo.nickName }} <text
            class="text">团蜂ID</text>：{{
              $store.getters.userInfo.userId }}</view>
      </view>
    </view>


    <view class="notice">
      <view class="sub-tip">注销后，您将放弃如下服务和权益：</view>

      <view class="notice-container">
        <view class="item">1<text class="index">.</text> 您将无法使用原账号登录，授权登录 </view>
        <view class="item">2<text class="index">.</text> 身份信息，如个人资料，实名认证信息等 </view>
        <view class="item">3<text class="index">.</text> 账号资产及权益，如各产品/服务的会员及权益、佣金、优惠劵等 </view>
        <view class="item">4<text class="index">.</text> 业务订单及交易记录，请确保所有交易已完结且无纠纷，账号注销后的因历史交易可能产生的资金回退等权益视为自动放弃 </view>
        <view class="item">5<text class="index">.</text> 使用各产品/服务时留存的其他信息 </view>
      </view>
    </view>

    <view class="footer">
      <view class="agreement">点击【已清除风险，确认注销】即代表已经同意<text style="color: #fe8923" @click="handleView">《用户注销协议》</text>
      </view>
      <button @click="handleLogout" class="uni-btn btn">已清除风险，确认注销</button>
    </view>

    <tui-modal @cancel="showConfirmVisible = false" :button="buttonConfig" @click="handleClickModal"
      :show="showConfirmVisible" title="提示" content="账号注销后将无法找回，无法查看订单信息以及优惠劵等所有权益"></tui-modal>

    <CancellationAgreement ref="cancellationAgreementRef"></CancellationAgreement>
  </view>
</template>

<script>
import CancellationAgreement from './components/CancellationAgreement.vue';
export default {
  components: { CancellationAgreement },
  data() {
    return {
      showConfirmVisible: false,
      buttonConfig: Object.freeze([{
        text: "暂不注销",
        type: "green",
        plain: true
      },
      {
        text: "继续注销",
        type: "gray",
        plain: true
      }])
    }
  },
  methods: {
    // 回退
    handleBack() {
      uni.navigateBack();
    },

    // 注销账号
    handleLogout() {
      this.showConfirmVisible = true
    },

    // 点击遮罩
    handleClickModal(e) {
      if (!e.index) {
        this.showConfirmVisible = false
        return
      }

      uni.navigateTo({ url: '/user/account/ver' })
      this.showConfirmVisible = false
    },

    // 查看注销协议
    handleView() {
      this.$refs.cancellationAgreementRef.show()
    }
  },
}
</script>

<style lang="less" scoped>
.logoff-page {
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

  .warn-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .tip-text {
      margin-top: 30upx;
      font-weight: 500;
      color: #000;
    }
  }

  .account-wrapper {
    width: 100%;
    padding: 30upx;
    box-sizing: border-box;
    // height: 100upx;
    background-color: #fff;
    border-radius: 20upx;
    margin: 30upx 0;
    display: flex;


    .app-icon {
      width: 80upx;
      height: 80upx;
      border-radius: 50%;
      margin-right: 20upx;
      flex-shrink: 0;
    }

    .info {
      .app-title {
        font-size: 24upx;
        color: #8f8f8f;
      }

      .id {
        margin-top: 6upx;
        color: #3d3d3d;
        font-size: 28upx;

        .text {
          color: #8f8f8f;

          &:nth-of-type(2) {
            margin-left: 10upx;
          }
        }
      }
    }
  }

  .notice {
    margin-top: 20upx;

    .sub-tip {
      font-size: 24upx;
    }

    .notice-container {
      padding: 30upx;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 20upx;
      margin-top: 20upx;

      .item {
        line-height: 1.5;
        font-size: 28upx;
        margin-bottom: 10upx;

        &:nth-of-type(:last-child) {
          margin-bottom: 0;
        }

        .index {
          position: relative;
          margin-right: 0.5em;

          &::after {
            width: 14upx;
            height: 14upx;
            content: '';
            position: absolute;
            background-color: rgba(255, 153, 0, 0.5);
            bottom: 4upx;
            left: -6upx;
            border-radius: 6upx;
          }
        }
      }
    }
  }

  .footer {
    position: fixed;
    background-color: #f6f6f6;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 10upx 24upx 30upx;
    box-sizing: border-box;

    .agreement {
      text-align: left;
      font-size: 28upx;
      color: #999;
    }

    .btn {
      background: linear-gradient(to right, #fe8923, #ff7e0e);
      padding: 20upx 0;
      font-size: 30upx;
      color: #fff;
      margin-top: 30upx;
      transition: all 350ms;

      &:active {
        opacity: 0.7;
      }
    }
  }

  /deep/ .tui-modal-btn.tui-green-outline {
    color: rgb(251, 93, 70);

    &::after {
      border-color: rgb(251, 93, 70);
    }
  }

}
</style>