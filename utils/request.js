import { RUAN_URL } from '../config'

const service = base_url => {
  return function (config) {
    /**
     * @param { string } url 请求地址
     * @param { any } data 请求数据
     * @param { string } method 请求方法
     * @param { boolean } loading 是否显示loading加载
     * @param { () => void } cb 额外的请求操作
     * @param { boolean } isZhult 是否是助力通接口
     * @param {Boolean} showError 是否显示错误信息
     */

    const {
      url,
      data = {},
      method = 'post',
      loading = false,
      cb,
      isZhult = false,
      showError = true
    } = config

    loading && uni.showLoading()
    return new Promise((resolve, reject) => [
      uni.request({
        url: base_url + url,
        data,
        method,
        success: res => {
          if (isZhult) {
            if (res.statusCode === 200 || res.statusCode === 20000) {
              resolve(res.data)
            } else {
              showError &&  uni.showToast({
                title: res.errMsg,
                icon: 'none',
                mask: true,
              })

              reject()
            }
          } else {
            if (res.data.errmsg == '用户未登录' || res.data.errno === 501) {
              uni.showModal({
                title: '提示',
                content: '您还未登录，请先去登录',
                showCancel: true,
                success: function (res) {
                  uni.navigateTo({ url: '/pages/auth/login/login' })
                },
              })
            } else if (res.data.errno !== 0) {
              showError && uni.showToast({
                title: res.data.errmsg,
                icon: 'none',
                mask: true,
              })
              reject(res.data.errmsg)
              return
            } else {
              resolve(res.data)
            }
          }
        },
        fail: error => {
          uni.hideLoading()
          reject(error)
        },

        complete: () => {
          loading && uni.hideLoading()
          cb && typeof cb === 'function' && cb()
        },
      }),
    ])
  }
}

export const request2 = service(RUAN_URL)
