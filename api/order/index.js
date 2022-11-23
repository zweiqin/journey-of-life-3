import { RuanRequest, XZLRequest } from "../../utils";
/**
 *
 * @param {订单列表查询} data
 * @returns
 */
export const getOrderListApi = (data) => {
  return RuanRequest("/order/list", data, "get");
};
/**
 *
 * @param {删除订单} data
 * @returns
 */
export const orderCancelApi = (data) => {
  return RuanRequest("/order/cancel", data);
};
/**
 *
 * @param {确认收货} data
 * @returns
 */
export const getOrderConfirmApi = (data) => {
  return RuanRequest("/order/confirm", data);
};
/**
 *
 * @param {订单删除} data
 * @returns
 */
export const orderDeleteApi = (data) => {
  return RuanRequest("/order/delete", data);
};
/**
 *
 * @param {订单申请退款} data
 * @returns
 */
export const getOrderRefundApi = (data) => {
  return RuanRequest("/order/refund", data);
};

export const getOrderDetailApi = (data) => {
  return RuanRequest("/order/detail", data, "get");
};


/**
 * 确认收货
 */
export const receiveGoodsApi = (data) => {
  return RuanRequest("/order/confirm", data)
}

/**
 * 评论
 */
export const sendCommentApi = data => {
  return RuanRequest("/order/comment", data)
}
/**
 * 预支付接口
 * @param {*} data 
 * @returns 
 */

export const getSybOrderPayH5 = data => {
  return XZLRequest("/wx/api/syb/orderPayH5", data)
}
/**
 * 查询是否支付成功
 * @param {*} data 
 * @returns 
 */
export const getSybGetIsPaySucceedApi = data =>{
  return XZLRequest("/wx/api/syb/getIsPaySucceed",data,'get')
}