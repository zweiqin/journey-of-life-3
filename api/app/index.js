import { RuanRequest, SheQuRequest1, request2 } from 'utils'
import { USER_TOKEN } from '../../constant'

// 检查版本号
export const checkedVersionApi = data => {
  return RuanRequest('/log/getVersionIsNew', data, 'get')
}

// 根据 code 获取 openId
export const getOpenIdApi = data => {
  return SheQuRequest1(
    '/samrtWorker/api/wechat/message/getOpenIdByCode',
    data,
    'get',
    null,
    {
      'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN),
    }
  )
}

// 绑定openId
export const handleBindOpenIdApi = data => {
  return SheQuRequest1(
    '/samrtWorker/api/wechat/message/bindingOpenId',
    data,
    'post',
    null,
    {
      'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN),
    }
  )
}

// 查询是否绑定了电话
export const queryIsBindPhoneApi = data => {
  return SheQuRequest1(
    '/samrtWorker/api/wechat/message/getUserInfoByUserId',
    data,
    'get',
    null,
    {
      'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN),
    }
  )
}

//
export const enrollApi = data => {
  return request2({
    method: 'post',
    url: '/customerscancode/save',
    data,
  })
}
