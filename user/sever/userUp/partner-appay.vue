<template>
  <view class="partner-apply-container">
    <NewHeader
      @back="handleBack"
      title="合伙人申请"
      top="61%"
      position="left"
      backgroundColor="#fff"
      padding="30upx 80upx 20upx 30upx"
    >
    </NewHeader>

    <view class="main-area">
      <ApplyType v-model="currentApplyType"></ApplyType>

      <ApplyForm
        @chooseCity="handlChooseCity"
        v-model="partnerForm"
        :type="currentApplyType"
      ></ApplyForm>

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
import { partnerApplyApi } from '../../../api/user'
import { getUserId, tradeOrderNo, payFn } from '../../../utils'

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
      selectCode: null,
    }
  },

  methods: {
    handlePay() {
      if (!this.selectCode) {
        uni.showToast({
          title: '请选择区域',
          icon: 'none',
        })
        return
      }

      if (!this.partnerForm.personLiable) {
        uni.showToast({
          title: '请选择业务责任人',
          icon: 'none',
        })
        return
      }

      const data = {
        orderNo: tradeOrderNo(),
        userId: getUserId(),
        payType: 5,
        isPartner: this.currentApplyType === 'partner' ? 1 : 2,
        partnerApplyInfo: {
          userId: getUserId(),
          applicationType: this.currentApplyType === 'partner' ? 6 : 7,
          referrerName: this.partnerForm.personLiable,
          // referrerName: '17633721125',
          regionCode: this.selectCode * 1,
        },
      }

      if (this.currentApplyType === 'sup-partner') {
        if (this.partnerForm.username.length < 6) {
          uni.showToast({
            title: '帐号不能少于6位',
            icon: 'none',
          })

          return
        }

        if (this.partnerForm.password.length < 6) {
          uni.showToast({
            title: '密码不能少于6位',
            icon: 'none',
          })

          return
        }

        data.partnerApplyInfo.username = this.partnerForm.username
        data.partnerApplyInfo.password = this.partnerForm.password
      }

      uni.showLoading({
        title: '加载中',
        mask: false,
      })

      try {
        partnerApplyApi(data).then(res => {
          if(res.errno !== 0){
            uni.showToast({
              title: res.errmsg,
              icon: 'none'
            })

            return
          }

          console.log(res);

          payFn(res.data)
        })
      } catch (error) {
        console.log(error);
        uni.hideLoading();
        uni.showToast({
          title: error,
          icon: 'none'
        })
      }
    },

    handlChooseCity(cityData) {
      this.selectCode = cityData['county'].code
    },

    handleBack() {
      uni.navigateTo({ url: '/user/sever/userUp/index' })
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
