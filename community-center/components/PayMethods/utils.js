import { isSuppersCCBApi } from '../../../api/community-center'

export const createPayForm = ({ data, url } = {}) => {
  if (!url) {
    throw new Error('H5支付信息错误')
  }
  const form = document.createElement('form')
  form.setAttribute('action', url)
  form.setAttribute('method', 'POST')

  if (data) {
    const allinConfig = JSON.parse(data)
    let input
    for (const key in allinConfig) {
      input = document.createElement('input')
      input.name = key
      input.value = allinConfig[key]
      form.appendChild(input)
    }
  }

  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}

export const getConfigStr = (config) => {
  if (typeof config !== 'object') {
    return config
  }
  return Object.keys(config)
    .map((key) => `${key}=${typeof config[key] === 'object' ? JSON.stringify(config[key]) : config[key]}`)
    .join('&')
}

export const PAY_METHOD_IDS = {
  ALLINPAY: 1,
  CCB: 2,
  BALANCE: 3
}

export const isSupportsCCB = async (orderNo) => {
  if (!orderNo) return false
  try {
    const res = await isSuppersCCBApi(orderNo)
    return res.statusCode === 20000 && res.data && res.data.hsbMrchId
  } catch (error) {
    return false
  }
}
