<template>
  <view class="confirm-order">
    <TuanAppShim bg="#ffff"></TuanAppShim>
    <JHeader title="确认订单" width="50" height="50"></JHeader>

    <view class="main">
      <view class="service-list">
        <view class="text">安装服务</view>
        <view class="name">{{ this.name1 }}</view>
      </view>
      <view class="order-list">
        <view class="text">订单编号</view>
        <view class="name">{{ this.orderNo }}</view>
      </view>
      <view class="install-list">
        <view class="text">安装费用</view>

        <view class="price-list1" v-if="pricingType == 1">
          <view class="logo">￥</view>
          <view class="number">{{ this.oughtPrice }}</view>
          <view class="point"></view>
        </view>
        <view class="price-list2" v-if="pricingType == 2">
          <!-- <view class="logo">￥</view>
          <view class="number">{{ this.oughtPrice }}</view>
          <view class="point">.00</view> -->
          <view class="text">人工报价</view>
        </view>
      </view>
      <view class="name-list">
        <view class="text">收款方</view>
        <view class="name">团蜂社区</view>
      </view>
      <view class="pay-list" v-if="pricingType == 1">
        <PayMethods :currentSelectPayMethodId="currentSelectPayMethodId" :orderNo="orderNo" ref="payMethodsRef" :supports="payList" @setLoading="handleSetLoading"></PayMethods>
      </view>
    </view>

    <view class="foot1" v-if="pricingType == 1">
      <view class="pay">
        <view class="logo">￥</view>
        <view class="number">{{ this.oughtPrice }}</view>
        <view class="point"></view>
      </view>
      <view class="on-pay" :loading="isLoading" @click="payThrottleFn">确定支付</view>
    </view>

    <view class="foot2" v-if="pricingType == 2">
      <view class="on-pay" @click="handleToOrderStatus">确认订单</view>
    </view>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { T_COMMUNITY_ORDER_NO } from '../constant'
import { throttle } from '../utils'
import PayMethods from './components/PayMethods/PayMethods.vue'

import communityPay from '../mixin/communityPay'

export default {
  name: 'Confirm-order',
  mixins: [communityPay()],
  components: { PayMethods },
  data() {
    return {
      orderType: 1,
      paymentMethod: 1,
      deliveryType: 4,
      oughtPrice: '',
      consigneeName: '',
      consigneeMobile: '',
      consigneeAddress: '',
      consigneeAddressDetail: '',
      content: '',
      installDate: '',
      data: '',
      dataUrl: '',
      pricingType: '',
      imgList: [],
      payThrottleFn: () => {},
      isLoading: false
    }
  },
  onShow() {
    if (uni.getStorageSync(T_COMMUNITY_ORDER_NO)) {
      this.handleBack()
    }
  },
  methods: {
    handleBack() {
      uni.switchTab({
        url: '/pages/order/order'
      })
    },

    handleToOrderStatus() {
      uni.navigateTo({
        url: `/community-center/order-status?orderNo=${this.orderNo}`
      })
    },

    handleSetLoading(status) {
      this.isLoading = status
    },

    //订单支付
    async getServiceOrderPay() {
      uni.setStorageSync(T_COMMUNITY_ORDER_NO, this.orderNo)
      this.$refs.payMethodsRef.pay()
      return

      // if (this.$store.state.app.isInMiniProgram) {
      //   try {
      //     const payAppesult = await payOrderForBeeStewadAPPApi({
      //       userId: getUserId(),
      //       orderNo: this.orderNo
      //     })

      //     if (payAppesult.statusCode === 20000) {
      //       let query = ''
      //       for (const key in payAppesult.data) {
      //         query += key + '=' + payAppesult.data[key] + '&'
      //       }
      //       wx.miniProgram.navigateTo({
      //         url: '/pages/loading/loading?' + query + 'orderNo=' + this.orderNo + '&userId=' + getUserId(),
      //         fail: async () => {
      //           if (!this.$store.state.app.isInMiniProgram) {
      //             let res = await getServiceOrderPayApi({
      //               orderNo: this.orderNo,
      //               userId: getUserId()
      //             })

      //             res = JSON.parse(res.data)
      //             const form = document.createElement('form')
      //             form.setAttribute('action', res.url)
      //             form.setAttribute('method', 'POST')

      //             const data1 = JSON.parse(res.data)
      //             let input
      //             for (const key in data1) {
      //               input = document.createElement('input')
      //               input.name = key
      //               input.value = data1[key]
      //               form.appendChild(input)
      //             }

      //             document.body.appendChild(form)
      //             form.submit()
      //             document.body.removeChild(form)
      //           } else {
      //             _this.ttoast({
      //               type: 'fail',
      //               title: error
      //             })

      //             setTimeout(() => {
      //               uni.switchTab({
      //                 url: '/pages/order/order'
      //               })
      //             }, 3000)
      //           }
      //         }
      //       })
      //     }
      //   } catch (error) {
      //     console.log(error)
      //   }
      // } else {
      //   // #ifdef H5
      //   let res = await getServiceOrderPayApi({
      //     orderNo: this.orderNo,
      //     userId: getUserId()
      //   })

      //   res = JSON.parse(res.data)

      //   const form = document.createElement('form')
      //   form.setAttribute('action', res.url)
      //   form.setAttribute('method', 'POST')

      //   const data1 = JSON.parse(res.data)
      //   let input
      //   for (const key in data1) {
      //     input = document.createElement('input')
      //     input.name = key
      //     input.value = data1[key]
      //     form.appendChild(input)
      //   }

      //   document.body.appendChild(form)
      //   form.submit()
      //   document.body.removeChild(form)
      //   // #endif

      //   // #ifdef APP
      //   const payAppesult = await payOrderForBeeStewadAPPApi({
      //     userId: getUserId(),
      //     orderNo: this.orderNo
      //   })

      //   if (payAppesult.statusCode === 20000) {
      //     let query = ''
      //     for (const key in payAppesult.data) {
      //       query += key + '=' + payAppesult.data[key] + '&'
      //     }

      //     plus.share.getServices(
      //       function (res) {
      //         let sweixin = null
      //         for (let i in res) {
      //           if (res[i].id == 'weixin') {
      //             sweixin = res[i]
      //           }
      //         }
      //         console.log(sweixin)
      //         if (sweixin) {
      //           sweixin.launchMiniProgram({
      //             id: 'gh_e64a1a89a0ad',
      //             type: 0,
      //             path: 'pages/orderDetail/orderDetail?' + query
      //           })
      //         }
      //       },
      //       function (e) {
      //         console.log('获取分享服务列表失败：' + e.message)
      //       }
      //     )
      //   }
      //   // #endif
      // }
    },

    async setPayMethod() {
      if (isSupportsCCB(this.orderNo)) {
      }
    }
  },
  onLoad(options) {
    this.payThrottleFn = throttle(this.getServiceOrderPay, 1000)
    this.name1 = options.name1
    this.oughtPrice = options.oughtPrice
    this.content = options.content
    this.consigneeName = options.consigneeName
    this.consigneeMobile = options.consigneeMobile
    this.consigneeAddress = options.consigneeAddress
    this.consigneeAddressDetail = options.consigneeAddressDetail
    this.installDate = options.installDate
    this.pricingType = options.pricingType
    this.orderNo = options.data
    this.payVali(this.orderNo)
  }
}
</script>

<style lang="less" scoped>
.confirm-order {
  /deep/ .j-header-wrapper {
    padding: 40upx 34upx 36upx 26upx;
    .title {
      font-size: 36upx;
      font-weight: bold;
      color: #3d3d3d;
    }
  }

  .main {
    padding: 56upx 34upx 0upx 34upx;

    .service-list {
      display: flex;
      width: 100%;

      .text {
        font-size: 32upx;
        font-weight: 500;
        color: #999999;
        flex: 1;
      }

      .name {
        font-size: 32upx;
        color: rgba(0, 0, 0, 0.85);
      }
    }

    .order-list {
      display: flex;
      width: 100%;
      padding-top: 70upx;

      .text {
        font-size: 32upx;
        font-weight: 500;
        color: #999999;
        flex: 1;
      }

      .name {
        font-size: 32upx;
        color: rgba(0, 0, 0, 0.85);
      }
    }

    .install-list {
      display: flex;
      width: 100%;
      padding-top: 70upx;

      .text {
        font-size: 32upx;
        font-weight: 500;
        color: #999999;
        flex: 1;
      }

      .price-list1 {
        display: flex;
        font-size: 32upx;
        color: rgba(0, 0, 0, 0.85);

        .logo {
        }

        .number {
        }

        .point {
        }
      }

      .price-list2 {
        .text {
          font-size: 32upx;
          color: rgba(0, 0, 0, 0.85);
        }
      }
    }

    .pay-list {
      display: flex;
      width: 100%;
      padding-top: 70upx;

      .text {
        font-size: 32upx;
        font-weight: 500;
        color: #999999;
        flex: 1;
      }

      .name {
        font-size: 32upx;
        color: rgba(0, 0, 0, 0.85);
      }
    }

    .name-list {
      display: flex;
      width: 100%;
      padding-top: 70upx;

      .text {
        font-size: 32upx;
        font-weight: 500;
        color: #999999;
        flex: 1;
      }

      .name {
        font-size: 32upx;
        color: rgba(0, 0, 0, 0.85);
      }
    }
  }

  .foot1 {
    position: fixed;
    left: 0;
    bottom: 0;
    background: #ffffff;
    width: 100%;
    height: 168upx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 26upx 20upx;
    box-sizing: border-box;
    border-top: 4upx solid #f1f2f6;

    .pay {
      // margin-top: 290upx;
      display: flex;
      justify-content: center;
      font-size: 48upx;
      font-weight: 500;
      color: #fa5151;

      .logo {
      }

      .number {
      }

      .point {
      }
    }

    .on-pay {
      // margin: 86upx auto;
      width: 310upx;
      height: 80upx;
      border-radius: 100upx;
      background: linear-gradient(90deg, #00b578 0%, #079a9a 100%);
      font-size: 32upx;
      font-weight: bold;
      color: #ffffff;
      text-align: center;
      line-height: 80upx;
    }
  }

  .foot2 {
    position: fixed;
    left: 0;
    bottom: 0;
    background: #ffffff;
    width: 100%;
    height: 168upx;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 26upx 20upx;
    box-sizing: border-box;
    border-top: 4upx solid #f1f2f6;

    .on-pay {
      // margin: 86upx auto;
      width: 310upx;
      height: 80upx;
      border-radius: 100upx;
      background: linear-gradient(90deg, #00b578 0%, #079a9a 100%);
      font-size: 32upx;
      font-weight: bold;
      color: #ffffff;
      text-align: center;
      line-height: 70upx;
    }
  }
}
</style>
