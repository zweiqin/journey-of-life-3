<template>
  <view>
    <view class="payment-container tui-skeleton" v-if="payMentForm.tfUserId">
      <TuanPageHead title="扫码结算" background="#fff" class="tui-skeleton-rect">
        <block slot="left">
          <tui-icon @click="handleBack(backConfig.url)" :name="backConfig.icon" :size="backConfig.size" unit="rpx" :color="backConfig.color" margin="0"></tui-icon>
        </block>
      </TuanPageHead>

      <view class="main">
        <view class="shop-info">
          <image class="shop-avatar tui-skeleton-circular" :src="shopInfo.shopLogo || require('../../static/images/new-user/default-user-avatar.png')"></image>
          <view class="shop-name-address">
            <view class="shop-name tui-skeleton-fillet">{{ shopInfo.shopName || '社区店' }}</view>
            <view class="shop-address tui-skeleton-fillet">{{ shopInfo.shopAddress || '社区店地址' }}</view>
          </view>
        </view>

        <!-- 输入支付金额 -->
        <view class="pay-number-wrapper" style="z-index: 99999; position: relative; transition: box-shadow 300ms" :style="{ 'box-shadow': numberKeyBoardVisible ? '0 0 32rpx #ccc' : '' }">
          <view class="title tui-skeleton-fillet">输入金额（元）</view>
          <view class="input-wrapper" @click="numberKeyBoardVisible = true">
            <view class="input-false tui-skeleton-fillet" :class="{ focus: numberKeyBoardVisible, empty: !numberKeyBoardVisible && !payMentForm.amount }">
              {{ inputValue }}
            </view>
          </view>
        </view>

        <!-- 输入订单备注 -->
        <view class="remark-wrapper">
          <view class="title tui-skeleton-fillet">
            订单备注
            <text class="tip">（选填）</text>
          </view>

          <tui-textarea v-model="payMentForm.remark" isCounter :borderBottom="false" :marginTop="20" placeholder="请输入内容" padding="18rpx 0 0" :size="28"></tui-textarea>
        </view>

        <!-- 选择支付方式 -->
        <view class="pay-list">
          <PayMethods :supports="payList" ref="payMethodsRef">
            <view class="title tui-skeleton-fillet" slot="title">支付方式</view>
          </PayMethods>
        </view>
      </view>

      <view class="ben-wrapper">
        <button class="uni-btn" :class="{ disabled: !(payMentForm.amount && payMentForm.tfUserId && payMentForm.shopAccountId) }" :loading="isLoading" @click="handleConfirmPay">确认支付</button>
      </view>

      <!-- 数字键盘 -->
      <tui-bottom-popup :zIndex="1002" :maskZIndex="1001" :show="numberKeyBoardVisible" @close="numberKeyBoardVisible = false">
        <view style="background-color: #fff; height: 432rpx">
          <tui-digital-keyboard @confirm="numberKeyBoardVisible = false" @backspace="handleDelete" @click="handleInput" show buttonBackground="#f40" buttonText="确认"></tui-digital-keyboard>
        </view>
      </tui-bottom-popup>
    </view>

    <!-- toast -->
    <tui-toast ref="toast"></tui-toast>
    <!-- 骨架 -->
    <tui-skeleton v-if="skeletonShow"></tui-skeleton>
    <!-- 未登录 -->
    <TuanUnLoginPage :to="backPath" v-if="!payMentForm.tfUserId" message="您还未登录，无法支付" subMessage="" :skip="false"></TuanUnLoginPage>
  </view>
</template>

<script>
import { USER_ID, USER_INFO } from '../../constant'
import { getShopInfoApi, createPaymentCodeOrderApi, canCCBPayForCommunityStoreApi } from '../../api/community-center/index'
import PayMethods from '../../community-center/components/PayMethods/PayMethods.vue'
import { PAY_METHOD_IDS } from '../../community-center/components/PayMethods/utils'
import TuanUnLoginPage from '../../pages/order/components/TuanUnLoginPage.vue'
import communityPay from '../../mixin/communityPay'
import { ENV } from '../../config/index'

export default {
  components: { PayMethods, TuanUnLoginPage },
  mixins: [communityPay('shopId')],
  data() {
    return {
      numberKeyBoardVisible: false,
      payMentForm: {
        amount: '',
        tfUserId: '',
        shopAccountId: null,
        remark: ''
      },
      isLoading: false,
      skeletonShow: true,
      dzId: null,
      shopInfo: {
        shopName: '',
        shopLogo: '',
        shopAddress: ''
      },
      supports: [PAY_METHOD_IDS.ALLINPAY],
      backPath: '',
      userInfo: null
    }
  },

  onLoad(options) {
    this.payMentForm.shopAccountId = options.accountId
    this.getShopInfo()
    this.payVali(options.accountId)
  },

  onShow() {
    this.payMentForm.tfUserId = uni.getStorageSync(USER_ID)
    this.userInfo = uni.getStorageSync(USER_INFO)
  },

  methods: {
    // 点击返回
    handleBack(url) {
      if (url) {
        uni.switchTab({ url })
      } else {
        uni.navigateBack()
      }
    },
    // 获取门店信息
    async getShopInfo() {
      try {
        if (!this.payMentForm.shopAccountId) {
          this.ttoast({ type: 'info', title: '门店id获取失败' })
          this.skeletonShow = false
          setTimeout(() => {
            uni.switchTab({ url: '/' })
          }, 2000)
          return
        }
        const res = await getShopInfoApi({ accountId: this.payMentForm.shopAccountId })
        if (res.statusCode === 20000) {
          Object.keys(this.shopInfo).forEach((key) => {
            this.shopInfo[key] = res.data[key]
          })
          // setTimeout(() => {
          this.skeletonShow = false
          // }, 2000)
          this.backPath = '/community-center/payment/payment?accountId=' + this.payMentForm.shopAccountId
        } else {
          throw new Error(res.statusMsg)
        }
      } catch (error) {
        this.skeletonShow = false
        this.ttoast({ type: 'fail', title: '社区店信息获取失败', content: error.message })
      }
    },

    // 输入金额
    handleInput({ value }) {
      const amount = this.payMentForm.amount
      const hasDecimal = amount.includes('.')
      if (value === '.' && hasDecimal) {
        return
      }
      const decimalPart = hasDecimal ? amount.split('.')[1] : ''
      if (hasDecimal && decimalPart.length >= 2) {
        this.payMentForm.amount = amount.slice(0, -1) + value
      } else {
        this.payMentForm.amount += value
      }
    },

    // 删除
    handleDelete() {
      this.payMentForm.amount = this.payMentForm.amount.slice(0, -1)
    },

    // 点击确认
    async handleConfirmPay() {
      if (!this.payMentForm.amount) {
        return this.ttoast({
          type: 'fail',
          title: '请输入支付金额'
        })
      }

      this.isLoading = true

      try {
        const payInfo = this.$refs.payMethodsRef.getPayMethod()
        let submitData = JSON.parse(JSON.stringify(this.payMentForm))

        if (payInfo) {
          const { payMethodId } = payInfo

          if (payMethodId === PAY_METHOD_IDS.CCB) {
            submitData = {
              ...submitData,
              terminalType: '1',
              payType: '6',
              hsbSubPayType: '03',
              hsbPyRsltNtcSn: ENV === 'development' ? '3' : '4',
              hsbPgfcRetUrlAdr: 'htts://www.baidu.com',
              extPayJsonStr: JSON.stringify({ Py_Ordr_Tpcd: '04', Sub_Appid: 'wx3cef6c7325c38a45', Sub_Openid: '' }),
              payUserPhone: this.userInfo.phone
            }
          }
        }

        const res = await createPaymentCodeOrderApi(submitData)

        await this.$refs.payMethodsRef.pay(true, res.data)
      } finally {
        this.isLoading = false
      }
    }
  },

  computed: {
    inputValue() {
      if (this.numberKeyBoardVisible) {
        return this.payMentForm.amount
      } else {
        return this.payMentForm.amount || '请输入支付金额'
      }
    },

    backConfig() {
      const pageStack = getCurrentPages()
      if (pageStack.length > 1) {
        return { icon: 'arrowleft', url: '', size: 64, color: '#222229' }
      } else {
        return { icon: 'home-fill', url: '/', size: 50, color: '#ea5b1d' }
      }
    }
  }
}
</script>

<style lang="less" scoped>
@keyframes breath {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.payment-container {
  min-height: 100vh;
  background-color: #f6f6f6;
  padding-bottom: 120rpx;

  .main {
    padding: 30rpx;
    box-sizing: border-box;

    .shop-info {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .shop-avatar {
        width: 100rpx;
        height: 100rpx;
        border-radius: 20rpx;
        margin-right: 20rpx;
      }

      .shop-name-address {
        flex: 1;

        .shop-name {
          font-size: 28rpx;
          color: #000;
          font-weight: 500;
          margin-bottom: 10rpx;
        }

        .shop-address {
          width: 550rpx;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 24rpx;
          color: #3d3d3d;
        }
      }
    }

    .pay-number-wrapper {
      padding: 20rpx 30rpx;
      box-sizing: border-box;
      background-color: #fff;
      margin-top: 40rpx;
      border-radius: 20rpx;

      .title {
        font-size: 28rpx;
        color: #000;
        font-weight: bold;
      }

      .input-wrapper {
        position: relative;
        padding-left: 40rpx;
        margin: 30rpx 0;
        border-bottom: 1rpx solid #ccc;
        padding-bottom: 10rpx;
        height: 40rpx;

        .input-false {
          font-size: 30rpx;
          display: inline-flex;
          height: 40rpx;

          &.focus {
            position: relative;

            &::after {
              content: '';
              position: absolute;
              height: 100%;
              width: 1rpx;
              background-color: #f40;
              right: -8rpx;
              // top: -34rpx;
              animation: breath 700ms linear infinite;
            }
          }

          &.empty {
            color: #ccc;
          }
        }

        &::after {
          content: '￥';
          font-size: 28rpx;
          font-weight: 500;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-22rpx);
        }
      }
    }

    .remark-wrapper {
      padding: 20rpx 30rpx;
      box-sizing: border-box;
      background-color: #fff;
      margin-top: 40rpx;
      border-radius: 20rpx;

      .title {
        font-size: 28rpx;
        color: #3d3d3d;

        .tip {
          font-size: 24rpx;
          color: #ccc;
        }
      }
    }

    .pay-list {
      padding: 20rpx 30rpx;
      box-sizing: border-box;
      background-color: #fff;
      margin-top: 40rpx;
      border-radius: 20rpx;

      .title {
        font-size: 28rpx;
        color: #3d3d3d;
      }
    }
  }

  .ben-wrapper {
    position: fixed;
    width: 100%;
    height: 100rpx;
    background-color: #fff;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 30rpx;
    box-sizing: border-box;

    .uni-btn {
      width: 100%;
      height: 88rpx;
      line-height: 88rpx;
      background-color: #ea5b1d;
      color: #fff;
      font-size: 28rpx;
      letter-spacing: 0.1em;

      &.disabled {
        opacity: 0.8;
      }
    }
  }
}
</style>
