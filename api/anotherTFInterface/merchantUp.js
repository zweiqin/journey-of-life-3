import { AnotherTFRequest } from '../../utils'
 
// /businessRechargeCustomers/getRechargeShopAll 充值商家列表
export const getRechargeShopAll = (data) => AnotherTFRequest('/businessRechargeCustomers/getRechargeShopAll', data, 'POST')

// /businessRechargeCustomers/getByShopAll 客户充值的商家列表 历史记录商家
export const getByShopAll = (data) => AnotherTFRequest('/businessRechargeCustomers/getByShopAll', data)

// /businessRechargeOrder/rechargeSubmit 充值提交订单
export const rechargeSubmit = (data) => AnotherTFRequest('/businessRechargeOrder/rechargeSubmit', data, 'POST')

// /businessRechargeAmounts/getAll 商家充值金额列表
export const getRechargeSubmit = (data) => AnotherTFRequest('/businessRechargeAmounts/getAll', data)

// /businessRechargeCustomers/getRechargeTotal
export const getRechargeTotal = (data) => AnotherTFRequest('/businessRechargeCustomers/getRechargeTotal', data, 'POST')

// /businessRechargeCustomers/getByRecharge 客户充值记录列表
export const getByRecharge = (data) => AnotherTFRequest('/businessRechargeCustomers/getByRecharge', data, 'POST')
