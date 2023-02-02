<template>
  <view class="partner-apply-container">
    <NewHeader
      @click="handleBack"
      title="合伙人申请"
      top="61%"
      position="left"
      backgroundColor="#fff"
      padding="30upx 80upx 20upx 30upx"
    >
    </NewHeader>

    <view class="main-area">
      <ApplyType v-model="currentApplyType"></ApplyType>

      <ApplyForm v-model="partnerForm" :type="currentApplyType"></ApplyForm>

      <EquityList></EquityList>
    </view>

    <FixedFooter :height="206">
      <button class="uni-btn" @click="handlePay">
        <text class="pay-text">立即支付</text>
        <text class="cost-text">
          ￥<text>{{ currentApplyType === 'partner' ? 1000 : 5000 }}</text
          >/年
        </text>
      </button>
      <view class="tip">放心开通，不会自动续费</view>
    </FixedFooter>
  </view>
</template>

<script>
import ApplyType from './cpns/apply-type.vue'
import ApplyForm from './cpns/apply-form.vue'
import EquityList from './cpns/equity-list.vue'
export default {
  components: {
    ApplyType,
    ApplyForm,
    EquityList,
  },
  data() {
    return {
      partnerForm: {
        area: '',
        personLiable: '',
        username: '',
        password: '',
      },
      currentApplyType: 'partner',
    }
  },

  methods: {
    handlePay() {
      console.log(this.partnerForm)
    },

    handleBack() {
      uni.navigateBack()
    },
  },

  onLoad(params) {
    this.currentApplyType = params.type || 'partner'
  },
}
</script>

<style lang="less" scoped>
.partner-apply-container {
  background-color: #f6f6f6;
  width: 100vw;
  min-height: 100vh;
  padding-bottom: 206upx;

  .main-area {
    width: 100%;
    padding: 24upx;
    box-sizing: border-box;
  }

  .vip-container {
    width: 100%;
    padding: 28upx;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 20upx;
    margin: 20upx 0;

    /deep/ .pane-title {
      color: #2e3252;
      font-size: 32upx;
      font-weight: bold;
    }
  }

  /deep/ .fixed-footer-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .tip {
      font-size: 24upx;
      color: #777;
      margin-top: 6upx;
    }

    .uni-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 90%;
      height: 102upx;
      border-radius: 100px;
      background: linear-gradient(270deg, #fd8b1f 0%, #ea6020 100%);

      .pay-text {
        font-size: 32upx;
        font-weight: bold;
        color: #fff;
      }

      .cost-text {
        font-size: 24upx;
        font-weight: 400;
        color: #fff;
        margin-left: 30upx;

        text {
          color: #fff;
          font-size: 48upx;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
