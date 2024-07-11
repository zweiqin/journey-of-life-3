import { Pay } from './Pay'
import { orderPayByCCBApi } from '../../../../api/community-center'
import { ENV } from '../../../../config/index'
import { getConfigStr } from '../utils'
import { T_STORAGE_KEY } from 'constant'
import { getSessionKeyAppApi } from '../../../../api/anotherTFInterface'

// docs: apifox ——>  20240626
export class CCBPay extends Pay {
  constructor(payData) {
    super()
    this.payData = payData
    this.initParams()
  }

  initParams() {
    this.payData = {
      ...this.payData,
      terminalType: '1',
      payType: '6',
      hsbSubPayType: '03',
      hsbPyRsltNtcSn: ENV === 'development' ? '3' : '4',
      hsbPgfcRetUrlAdr: 'htts://www.baidu.com',
      extPayJsonStr: { Py_Ordr_Tpcd: '04', Sub_Appid: 'wx3cef6c7325c38a45', Sub_Openid: '' }
    }
  }

  async h5Pay() {
    try {
      const res = await orderPayByCCBApi({
        ...this.payData,
        extPayJsonStr: JSON.stringify(this.payData.extPayJsonStr)
      })

      if (res.statusCode === 20000) {
        const payRes = res.data
        if (payRes && payRes.hsbPayRespParamStr && payRes.hsbPayRespParamStr.Cshdk_Url) {
          // this.jumpH5Pay({ url: payRes.hsbPayRespParamStr.Cshdk_Url })
          location.href = payRes.hsbPayRespParamStr.Cshdk_Url
        }
      } else {
        throw new Error(res.statusMsg)
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  miniProgramPay() {
    const { userId, orderNo } = this.payData
    const res = uni.getStorageSync(T_STORAGE_KEY) || {}

    if (userId && orderNo) {
      const payConfig = {
        ...this.payData,
        hsbSubPayType: '05',
        type: 'CCB',
        Authorization: res.token || '',
        satokenUser: res['satoken-user'] || '',
        currentUrl: location.href
      }

      wx.miniProgram.navigateTo({
        url: `/pages/loading/loading?${getConfigStr(payConfig)}`,
        fail: (error) => {
          if (!store.state.app.isInMiniProgram) {
            _this.h5Pay()
          }
        }
      })
    }
  }

  async appPay() {
    uni.login({
      provider: 'weixin',
      onlyAuthorize: true,
      success: async (res) => {
        try {
          console.log("有code了哦", res);
          const keys = await getSessionKeyAppApi({ code: res.code, _isShowToast: false })
          console.log("拿到了", keys);
        } catch (error) {
          console.log("报错了，凑了哦", error);
          throw new Error(error.message)
        }
      },
      fail(error) {
        throw new Error(error.message)
      }
    })
  }
}
