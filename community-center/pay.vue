<template>
  <view class="pay-page">
    <TuanAppShim bg="#e95d20"></TuanAppShim>
    <Header bgc="#e95d20" title="订单支付" tabbar="/pages/order/order"></Header>
    <view class="item">
      <span class="label">需支付:</span>
      <span class="value money">￥{{ payMoney }}</span>
    </view>
    <view class="item">
      <span class="label">订单号:</span>
      <span class="value" @click="copyOrderNo">{{ orderNo }}</span>
    </view>

    <view class="pay-list-wrapper">
      <PayMethods :currentSelectPayMethodId="currentSelectPayMethodId" :orderNo="orderNo" :supports="payList" ref="payMethodsRef" @setLoading="handleSetLoading"></PayMethods>
    </view>

    <Button type="error" @click="handlePay" :loading="isLoading">支付</Button>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import Button from './components/button.vue'
import { payOrderForEndApi, payOrderForBeeStewadAPPApi, orderPayH5PabUseBlanceApi } from '../api/community-center'
import { getUserId, useCopy } from '../utils'
import Header from './components/header.vue'
import communityPay from '../mixin/communityPay'
import PayMethods from './components/PayMethods/PayMethods.vue'

export default {
  components: { Button, Header, PayMethods },
  mixins: [communityPay()],
  data() {
    return {
      orderNo: '',
      payMoney: '',
      status: false,
      payType: undefined,
      isLoading: false
    }
  },

  methods: {
    async handlePay() {
      this.$refs.payMethodsRef.pay()
      return
      const _this = this
      try {
        this.isLoading = true
        if (this.payType == 1) {
          const res = await orderPayH5PabUseBlanceApi({
            userId: getUserId(),
            orderNo: this.orderNo
          })

          if (res.statusCode === 20000) {
            this.ttoast('支付成功')
            setTimeout(() => {
              uni.switchTab({
                url: '/pages/order/order'
              })
            }, 2000)
          } else {
            this.ttoast({
              type: 'fail',
              title: res.statusMsg
            })
          }
        } else {
          if (this.$store.state.app.isInMiniProgram) {
            const payAppesult = await payOrderForBeeStewadAPPApi({
              userId: getUserId(),
              orderNo: this.orderNo
            })

            if (payAppesult.statusCode === 20000) {
              let query = ''
              for (const key in payAppesult.data) {
                query += key + '=' + payAppesult.data[key] + '&'
              }

              wx.miniProgram.navigateTo({
                url: '/pages/loading/loading?' + query + 'orderNo=' + this.orderNo + '&userId=' + getUserId(),
                fail: (error) => {
                  if (!this.$store.state.app.isInMiniProgram) {
                    payOrderForEndApi({
                      orderNo: this.orderNo,
                      userId: getUserId()
                    }).then((res) => {
                      res = JSON.parse(res.data)
                      const form = document.createElement('form')
                      form.setAttribute('action', res.url)
                      form.setAttribute('method', 'POST')

                      const data = JSON.parse(res.data)
                      let input
                      for (const key in data) {
                        input = document.createElement('input')
                        input.name = key
                        input.value = data[key]
                        form.appendChild(input)
                      }

                      document.body.appendChild(form)
                      form.submit()
                      document.body.removeChild(form)
                    })
                  } else {
                    _this.ttoast({
                      type: 'fail',
                      title: error
                    })

                    setTimeout(() => {
                      uni.switchTab({
                        url: '/pages/order/order'
                      })
                    }, 3000)
                  }
                }
              })
            }
          } else {
            // #ifdef H5
            payOrderForEndApi({
              orderNo: this.orderNo,
              userId: getUserId()
            }).then((res) => {
              res = JSON.parse(res.data)
              const form = document.createElement('form')
              form.setAttribute('action', res.url)
              form.setAttribute('method', 'POST')

              const data = JSON.parse(res.data)
              let input
              for (const key in data) {
                input = document.createElement('input')
                input.name = key
                input.value = data[key]
                form.appendChild(input)
              }

              document.body.appendChild(form)
              form.submit()
              document.body.removeChild(form)
            })
            // #endif

            // #ifdef APP
            const payAppesult = await payOrderForBeeStewadAPPApi({
              userId: getUserId(),
              orderNo: this.orderNo
            })

            if (payAppesult.statusCode === 20000) {
              let query = ''
              for (const key in payAppesult.data) {
                query += key + '=' + payAppesult.data[key] + '&'
              }

              plus.share.getServices(
                function (res) {
                  let sweixin = null
                  for (let i in res) {
                    if (res[i].id == 'weixin') {
                      sweixin = res[i]
                    }
                  }
                  console.log(sweixin)
                  if (sweixin) {
                    sweixin.launchMiniProgram({
                      id: 'gh_e64a1a89a0ad',
                      type: 0,
                      path: 'pages/orderDetail/orderDetail?' + query
                    })
                  }
                },
                function (e) {
                  console.log('获取分享服务列表失败：' + e.message)
                }
              )
            }
            // #endif
          }
        }
      } catch (error) {
        _this.ttoast({
          type: 'fail',
          title: error
        })

        setTimeout(() => {
          uni.switchTab({
            url: '/pages/order/order'
          })
        }, 3000)
      } finally {
        this.isLoading = false
      }
    },

    // 拷贝
    copyOrderNo() {
      useCopy(this.orderNo)
    },

    handleChangePayMethod(payMethod) {
      this.payType = payMethod
    },

    handleSetLoading(status) {
      this.isLoading = status
    }
  },

  onLoad(option) {
    this.orderNo = option.orderNo
    this.payMoney = option.price
    this.payType = option.payType || undefined
    this.payVali(this.orderNo)
  }
}
</script>

<style lang="less" scoped>
.pay-page {
  overflow: hidden;

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20upx 40upx;
    font-size: 36upx;
    background-color: #fff;
    margin: 20upx 0;

    .money {
      font-weight: bold;
      color: #ec6401;
    }
  }

  .pay-list-wrapper {
    padding: 20upx 40upx;
    background-color: #fff;

    .title {
      font-size: 28rpx;
      color: #ccc;
    }

    .list {
      background-color: #f6f6f6;
      border-radius: 10rpx;
      margin-top: 10rpx;
      .pay-item {
        height: 90rpx;
        line-height: 90rpx;
        padding-left: 20rpx;
      }
    }
  }
}
</style>
