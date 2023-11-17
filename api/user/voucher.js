import { AnotherTFRequest } from '../../utils'  // 默认get方法

// 获取可用代金卷
export const getVoucher = (data) => AnotherTFRequest('/voucher/getVoucher', data)

// 创建购买代金卷订单 /order/submitVoucher
export const submitVoucher = (data) => AnotherTFRequest('/order/submitVoucher', data, 'POST')

// 获取用户代金卷
export const getByUserVoucher = (data) => AnotherTFRequest('/voucherShopHold/getByUserVoucher', data)

// /voucherShopHold/transfer 赠送代金卷
export const giftVoucher = (data) => AnotherTFRequest('/voucherShopHold/transfer', data, 'POST')
