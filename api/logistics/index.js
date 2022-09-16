import { request } from "../../utils";

/**
 * 获取仓库列表
 */
export const getWarehouseListApi = (data) => {
  return request("/laoa-huozhu/api/hz/order/third/getWuLiuInfo", data);
};

/**
 * 获取报价
 */
export const getOrderQuoteApi = (data) => {
  return request("/laoa-huozhu/api/hz/order/third/getOrderQuote", data);
};

/**
 * 地址智能识别
 */
export const addressIntelligentRecogApi = (address) => {
  return request("/laoa-huozhu/api/hz/order/third/addressAnalyze", { address });
};

/**
 * 提交创建订单
 */
export const createOrderApi = (data) => {
  return request("/laoa-huozhu/api/hz/order/third/orderCreate", data);
};

/**
 * 查询订单
 */
export const expressInquiryApi = (data) => {
  return request("/laoa-huozhu/api/hz/order/third/list", data);
};

/**
 * 获取订单详情
 */
export const getOrderDetailApi = (orderNo) => {
  return request(
    "/laoa-huozhu/api/hz/order/third/details",
    {
      orderNo,
    },
    "get"
  );
};

/**
 * 取消订单
 * @param {Object} data 
  {
    "orderId": 1913,
    "cancelRemarks": "不想要了",
    "userId": 150
  }
 */
export const cancelOrderApi = (data) => {
  return request("/laoa-huozhu/api/hz/order/third/orderCancel", data);
};

/**
 * 编辑订单
 * @param {*} data
 * @returns
 */
export const editeOrderApi = (data) => {
  return request("/laoa-huozhu/api/hz/order/third/orderEdit", data);
};
