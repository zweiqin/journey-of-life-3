// #ifdef H5
import { getConfigApi } from '../api/auth'
import { USER_TOKEN } from '../constant'
import wxShare from './wxshare'
// #endif

/**
 * @typedef {Object} MessageOptions 消息配置
 * @property {String} title 分享的标题
 * @property {String} path 分享的路径
 * @property {String} imageUrl 分享的图片
 * @property {Promise} promise 同onShareAppMessage的promise
 *
 * @description 配置小程序分享
 * @param {MessageOptions} data 分享的配置信息
 */
export const setMiniprogramShareConfig = (data) => {
  let path = data.path
  path = `pages/index/index?url=${encodeURI(path.replace("?", '[params]'))}`
  wx.miniProgram.postMessage({
    data: { ...data, path }
  })
}

export default async ({ data, failCb, successCb }, type = 'WXSceneSession') => {
  // #ifdef H5
  const currentUrl = window.location.href.replace('#', 'ericToken')
  const { data: wxConfigData } = await getConfigApi({
    url: currentUrl,
    token: uni.getStorageSync(USER_TOKEN)
  })
  wxShare.wxRegister(
    wxConfigData,
    {
      title: data.title,
      desc: data.desc,
      imgUrl: data.imageUrl,
      link: data.link
    },
    successCb
  )
  // #endif

  // #ifdef APP
  uni.share({
    provider: 'weixin',
    scene: type,
    type: 0,
    href: data.link,
    title: data.title,
    summary: data.desc,
    imageUrl: data.imageUrl,
    success: function (res) {
      successCb && typeof successCb === 'function' && successCb(res)
    },
    fail: function (err) {
      failCb && typeof failCb === 'function' && failCb(err)
    }
  })
  // #endif
}
