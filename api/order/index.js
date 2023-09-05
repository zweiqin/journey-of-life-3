import { RuanRequest } from '../../utils'

/**
 *
 * @param {订单列表查询} data
 * @returns
 */

export const getOrderListApi = (data) => RuanRequest('/order/list', data, 'get')

/**
 *
 * @param {删除订单} data
 * @returns
 */

export const orderCancelApi = (data) => RuanRequest('/order/cancel', data)

/**
 *
 * @param {确认收货} data
 * @returns
 */

export const getOrderConfirmApi = (data) => RuanRequest('/order/confirm', data)

/**
 *
 * @param {订单删除} data
 * @returns
 */

export const orderDeleteApi = (data) => RuanRequest('/order/delete', data)

/**
 *
 * @param {订单申请退款} data
 * @returns
 */

export const getOrderRefundApi = (data) => RuanRequest('/order/refund', data)

export const getOrderDetailApi = (data) => RuanRequest('/order/detail', data, 'get')

/**
 * 确认收货
 */

export const receiveGoodsApi = (data) => RuanRequest('/order/confirm', data)

/**
 * 评论
 */

export const sendCommentApi = (data) => RuanRequest('/order/comment', data)

/**
 * 预支付接口
 * @param {*} data
 * @returns
 */

export const getSybOrderPayH5 = (data) => RuanRequest('/api/syb/orderPayH5', data)

/**
 * 查询是否支付成功
 * @param {*} data
 * @returns
 */

export const getSybGetIsPaySucceedApi = (data) => RuanRequest('/api/syb/getIsPaySucceed', data, 'get')

/**
 * 发布评论
 */

export const postCommentApi = (data) => RuanRequest('/dtsCommentOrder/save', data)

/**
 * 获取我的评价
 */

export const getMyCommentListApi = (data) => RuanRequest('/dtsCommentGoods/myEvaluation', data, 'GET')

/**
 * 输入评论
 */

export const sendCommentAgainApi = (data) => RuanRequest('/dtsCommentOrder/appendSave', data)
