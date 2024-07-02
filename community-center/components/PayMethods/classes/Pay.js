import { payOrderForBeeStewadAPPApi } from '../../../../api/community-center'
import { createPayForm } from '../utils'

export class Pay {
  h5Pay() {
    throw new Error('h5Pay must be implemented by subclass')
  }
  appPay() {
    throw new Error('appPay must be implemented by subclass')
  }
  miniProgramPay() {
    throw new Error('miniProgramPay must be implemented by subclass')
  }
  // 通联支付app，小程序获取支付参数
  async getAppAndMiniprogramConfig(payData) {
    try {
      const res = await payOrderForBeeStewadAPPApi(payData)
      if (res.statusCode === 20000) {
        return res.data
      } else {
        throw new Error(res.statusMsg)
      }
    } catch (error) {
      throw new Error(`Failed to get config: ${error.message}`)
    }
  }

  // h5的跳转支付
  jumpH5Pay(payData) {
    try {
      createPayForm(payData)
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
