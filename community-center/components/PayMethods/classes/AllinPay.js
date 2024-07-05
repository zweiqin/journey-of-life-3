import { Pay } from './Pay'
import { payOrderForEndApi } from '../../../../api/community-center'
import store from '../../../../store'
import { getConfigStr } from '../utils'

export class AllinPay extends Pay {
  constructor(payData) {
    super()
    this.payData = payData
  }
  // H5支付
  async h5Pay(isCustorm, payConfig) {
    if (isCustorm) {
      return this.jumpH5Pay(JSON.parse(payConfig))
    }
    const res = await payOrderForEndApi(this.payData)
    if (res.statusCode === 20000) {
      try {
        const payInfo = JSON.parse(res.data)
        this.jumpH5Pay(payInfo)
      } catch (error) {
        throw new Error(error.message)
      }
    } else {
      throw new Error('h5:' + res.statusMsg)
    }
  }
  // App支付
  async appPay() {
    try {
      const res = await this.getAppAndMiniprogramConfig(this.payData)
      const payQueryStr = getConfigStr(res)
      plus.share.getServices(
        function (res) {
          let sweixin = null
          for (const i in res) {
            if (res[i].id == 'weixin') {
              sweixin = res[i]
            }
          }
          if (sweixin) {
            sweixin.launchMiniProgram({ id: 'gh_e64a1a89a0ad', type: 0, path: 'pages/orderDetail/orderDetail?' + payQueryStr })
          }
        },
        function (e) {
          throw new Error('app:' + e.message)
        }
      )
    } catch (error) {
      throw new Error(error.message)
    }
  }

  // 小程序支付
  async miniProgramPay() {
    try {
      const _this = this
      const res = await this.getAppAndMiniprogramConfig(this.payData)
      const payQueryStr = getConfigStr(res)
      const { userId, orderNo } = this.payData
      if (userId && orderNo) {
        wx.miniProgram.navigateTo({
          url: '/pages/loading/loading?' + payQueryStr + '&orderNo=' + orderNo + '&userId=' + userId,
          fail: (error) => {
            if (!store.state.app.isInMiniProgram) {
              _this.h5Pay()
            }
          }
        })
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
