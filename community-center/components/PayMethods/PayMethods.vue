<template>
  <view class="pay-methods-conntainer">
    <slot name="title">
      <view class="title">请选择支付方式</view>
    </slot>

    <view class="methods-list">
      <view
        class="item tui-skeleton-fillet"
        :class="{ active: currentSelectPayMethodId === item.payMethodId }"
        v-for="item in payList"
        :key="item.payMethodId"
        @click="handleChangePayMethod(item.payMethodId)"
      >
        <view class="pay-name">
          <image class="pay-icon" :src="item.icon"></image>
          <view class="name">{{ item.name }}</view>
        </view>
        <tui-icon :name="currentSelectPayMethodId === item.payMethodId ? 'circle-fill' : 'circle'" :color="currentSelectPayMethodId === item.payMethodId ? '#e95d20' : ''" :size="18"></tui-icon>
      </view>
    </view>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { getUserId } from '../../../utils'
import { PAY_METHOD_IDS } from './utils'
import { paymentMethods } from './payment.config.js'

export default {
  props: {
    orderNo: { type: String },
    supports: {
      type: Array,
      default: () => [PAY_METHOD_IDS.ALLINPAY, PAY_METHOD_IDS.BALANCE]
    },
    currentSelectPayMethodId: {
      type: Number,
      default: PAY_METHOD_IDS.ALLINPAY
    }
  },
  data() {
    return {
      payMethodsList: [
        { name: '通联支付(微信)', icon: require('../../../static/images/user/pay/tonglian.png'), payMethodId: PAY_METHOD_IDS.ALLINPAY },
        { name: '惠市宝支付(支持微信/支付宝/银联)', icon: require('../../../static/images/user/pay/huishibao.png'), payMethodId: PAY_METHOD_IDS.CCB },
        { name: '余额', icon: require('../../../static/images/user/pay/platform-pay.png'), payMethodId: PAY_METHOD_IDS.BALANCE }
      ],
      payLoading: false
    }
  },

  methods: {
    handleChangePayMethod(payMethodId) {
      this.currentSelectPayMethodId = payMethodId
    },

    async pay(isCustorm, payConfig) {
      if (this.payLoading) {
        return this.ttoast({ type: 'info', title: '支付中...' })
      }
      const payData = { orderNo: this.orderNo, userId: getUserId() }

      try {
        if (!payData.orderNo && !isCustorm) {
          throw new Error('支付订单号为空')
        }
        this.setPayLoading(true)
        await (
          paymentMethods(this)[this.currentSelectPayMethodId] ||
          (() => {
            throw new Error('未知的支付方式')
          })
        )(payData, {
          isCustorm,
          payConfig
        })
      } catch (error) {
        console.log(error)
        this.ttoast({ type: 'fail', title: '支付失败', content: error.message })
      } finally {
        this.setPayLoading(false)
      }
    },

    handleRes(res, successCb) {
      if (typeof res !== 'object') {
        throw new Error('支付失败')
      }
      if (res.statusCode === 20000) {
        typeof successCb === 'function' && successCb()
      } else {
        throw new Error(res.statusMsg)
      }
    },

    setPayLoading(status) {
      this.payLoading = status
      this.$emit('setLoading', status)
    },

    getPayMethod() {
      return this.payMethodsList.find((item) => item.payMethodId === this.currentSelectPayMethodId)
    }
  },

  computed: {
    payList() {
      return this.payMethodsList.filter((item) => this.supports.includes(item.payMethodId))
    }
  }
}
</script>

<style lang="less" scoped>
.pay-methods-conntainer {
  width: 100%;

  .methods-list {
    margin-top: 30rpx;
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: all 350ms;
      height: 80rpx;
      padding: 0 20rpx;

      &.active {
        font-weight: 500;
        color: #000;
      }

      &:active {
        background-color: #f6f6f6;
      }

      .pay-name {
        display: flex;
        align-items: center;

        .pay-icon {
          width: 40rpx;
          height: 40rpx;
          margin-right: 10rpx;
        }

        .name {
          font-size: 28rpx;
          color: #3d3d3d;
        }
      }
    }
  }
}
</style>
