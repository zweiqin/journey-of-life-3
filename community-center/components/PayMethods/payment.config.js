import { AllinPay, CCBPay } from './classes'
import { orderPayH5PabUseBlanceApi } from '../../../api/community-center'
import { PAY_METHOD_IDS } from './utils'
import store from '../../../store'

/**
 * 支付方法
 */
export const h5AppMiniprogramPayUtil = async (Pay, payData, { isCustorm, payConfig } = {}) => {
  const p = new Pay(payData)
  // #ifdef APP
  await p.appPay()
  // #endif

  // #ifdef H5
  if (store.state.app.isInMiniProgram) {
    await p.miniProgramPay()
  } else {
    await p.h5Pay(isCustorm, payConfig)
  }
  // #endif
}

export const paymentMethods = (ctx) => ({
  // 余额支付
  [PAY_METHOD_IDS.BALANCE]: async (payData) => {
    const res = await orderPayH5PabUseBlanceApi(payData)
    ctx.handleRes(res, () => {
      ctx.ttoast('支付成功')
      setTimeout(() => {
        uni.switchTab({ url: '/pages/order/order' })
      }, 2000)
    })
  },

  // 通联支付
  [PAY_METHOD_IDS.ALLINPAY]: async (payData, payConfig) => {
    await h5AppMiniprogramPayUtil(AllinPay, payData, payConfig)
  },

  // 惠市宝支付
  [PAY_METHOD_IDS.CCB]: async (payData, payConfig) => {
    await h5AppMiniprogramPayUtil(CCBPay, payData, payConfig)
  }
})
