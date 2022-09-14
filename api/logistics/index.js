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
  return request('/laoa-huozhu/api/hz/order/third/addressAnalyze', {address})
};
