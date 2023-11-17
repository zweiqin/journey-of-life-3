import { AnotherTFRequest } from '../../utils'  // 默认get方法

// 获取可用代金卷
export const getVoucher = (data) => AnotherTFRequest('/voucher/getVoucher', data)

// 创建购买代金卷订单 /order/submitVoucher
export const submitVoucher = (data) => AnotherTFRequest('/order/submitVoucher', data, 'POST')

// 获取用户代金卷
export const getByUserVoucher = (data) => AnotherTFRequest('/voucherShopHold/getByUserVoucher', data)

// /voucherShopHold/transfer 赠送代金卷
export const giftVoucher = (data) => AnotherTFRequest('/voucherShopHold/transfer', data, 'POST')

// /voucherOrder/getTotal 获取代金卷总数据
export const getTotal = (data) => AnotherTFRequest('/voucherOrder/getTotal', data, 'POST')

// /voucherShopHold/transferLogs 获取代金卷转增数据
export const transferLogs = (data) => AnotherTFRequest('/voucherShopHold/transferLogs', data, 'POST')

// /voucherOrder/getAll 获取代金卷充值数据
export const getAll = (data) => AnotherTFRequest('/voucherOrder/getAll', data, 'POST')