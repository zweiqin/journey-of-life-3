import { PAY_METHOD_IDS, isSupportsCCB, PAY_METHOD_TYPE } from '../community-center/components/PayMethods/utils'

/**
 * @param { string[] } payMenths 要动态显示的支付方法
 * @param {'orderNo' | 'shopId'} validType
 */
export default (validType = PAY_METHOD_TYPE.ORDER_NO, payMenths = ['ccb']) => {
  return {
    data() {
      return {
        payList: [PAY_METHOD_IDS.ALLINPAY, PAY_METHOD_IDS.BALANCE],
        currentSelectPayMethodId: PAY_METHOD_IDS.ALLINPAY
      }
    },

    methods: {
      async payVali(params) {
        if (payMenths.includes('ccb') && (await isSupportsCCB(params, validType))) {
          this.payList.push(PAY_METHOD_IDS.CCB)
          this.currentSelectPayMethodId = PAY_METHOD_IDS.CCB
        }
        if (validType === PAY_METHOD_TYPE.SHOP_ID) {
          this.payList = this.payList.filter((item) => item !== PAY_METHOD_IDS.BALANCE)
        }
      }
    }
  }
}
