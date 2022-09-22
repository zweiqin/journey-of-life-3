import { request } from "../../utils";

/**
 * @description 获取报价
 * @param {*} data
 * @returns
 */
export const getOrderOfferApi = (data) => {
  return request("/laoa-huozhu/api/hz/order/third/getOrderOffer", data);
};

// 计算超距费
export const getDistancePriceApi = (data) => {
  return request("/laoa-huozhu/api/hz/order/third/getDistancePrice", data);
};

// 创建配送安装订单
export const createOrderPabApi = (data) => {
  return request("/laoa-huozhu/api/hz/order/third/createOrderPab", data);
};

// 获取订单详情
export const getOrderDetailApi = (no) => {
  return request(
    "/laoa-huozhu/api/hz/order/third/detailsMd",
    { orderNo: no },
    "get"
  );
};

// 取消订单
export const cancelOrderApi = (data) => {
  return request("/laoa-huozhu/api/hz/order/third/cancelOrder", data);
};

// 获取商品配置
export const getGoodsConfigApi = (data) => {
  return request("/api/common/getOrderClaimSetting", data);
};

// 创建维修订单
export const createRepairOrderApi = (data) => {
  return request("/laoa-huozhu/api/hz/order/third/createOrderPabWx", data);
};

// 获取服务需求
export const getDictListApi = () => {
  return request('/laoa-huozhu/api/hz/order/third/getDictList', null, 'get')
}
