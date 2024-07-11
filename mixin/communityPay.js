import { PAY_METHOD_IDS, isSupportsCCB } from '../community-center/components/PayMethods/utils'

export default () => {
  return {
    data() {
      return {
        payList: [PAY_METHOD_IDS.ALLINPAY, PAY_METHOD_IDS.BALANCE]
      }
    },

    methods: {
      async payVali(orderNo) {
        if (await isSupportsCCB(orderNo)) {
          this.payList.push(PAY_METHOD_IDS.CCB)
        }
      }
    }
  }
}
