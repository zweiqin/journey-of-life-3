import { request } from "../../utils";
import { XZLRequest, RuanRequest ,SheQuRequest,SheQuRequest1} from "../../utils";
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
  return request("/laoa-huozhu/api/hz/order/third/getOrderClaimSetting", data);
};

// 创建维修订单
export const createRepairOrderApi = (data) => {
  return request("/laoa-huozhu/api/hz/order/third/createOrderPabWx", data);
};

// 获取服务需求
export const getDictListApi = () => {
  return request("/laoa-huozhu/api/hz/order/third/getDictList", null, "get");
};



/**
 *
 * @param {*
 *  orderNo: 订单号
 *  userId: 用户id
 * } data
 * @returns
 */
export const payOrderForEndApi = (data) => {
  return request("/laoa-huozhu/api/hz/order/third/orderPayH5Pab", data);
};

/**
 * @description 获取末端订单列表
 */
export const getEndOrderListApi = (data) => {
  return request("/laoa-huozhu/api/hz/order/third/orderPagelist", data);
};








//线上
//查询社区服务分类
export const getServiceSortApi = (data) => {
  return SheQuRequest("/api/community/serverInfo/getServerTypeList", data);
};

//查询社区服务详情
export const getServiceDetailApi = (data) => {
  return SheQuRequest("/api/community/serverInfo/getServerInfoById", data, "get");
};
//获取订单报价
export const getServicePriceApi = (data) =>{
  return SheQuRequest("/api/community/serverInfo/getOrderQuote",data);
};


//新建社区订单
export const getServiceOrderApi = (data) =>{
  return SheQuRequest1("/laoa-huozhu/api/hz/order/third/createOrderPabWx",data);
};

//订单支付
export const getServiceOrderPayApi = (data) =>{
  return SheQuRequest1("/laoa-huozhu/api/hz/order/third/orderPayH5Pab",data);
};

//根据用户地址判断该区域是否开通了站长
export const getIsOpenServerAreaApi = (data) => {
  return SheQuRequest1("/laoa-huozhu/api/hz/order/third/getIsOpenServerArea", data, "get");
};

//查询用户过往信息
export const getUserInfoByIdApi = (data) => {
  return SheQuRequest1("/laoa-huozhu/api/hz/order/third/getUserInfoById", data, "get");
};

//线上订单详情
export const detailsMdApi = (data) => {
  return SheQuRequest1("/laoa-huozhu/api/hz/order/third/detailsMd", data, "get");
};
//本地订单详情
// export const detailsMdApi = (data) => {
//   return XZLRequest("/laoa-huozhu/api/hz/order/third/detailsMd", data, "get");
// };

//搜索查询
export const getSearchDataApi = (data) => {
  return XZLRequest("/demo/api/community/serverInfo/getSearchData", data, "get");
};



// 本地
// 查询社区服务分类
// export const getServiceSortApi = (data) => {
//   return XZLRequest("/community/serverInfo/getServerTypeList", data);
// };

// //查询社区服务详情
// export const getServiceDetailApi = (data) => {
//   return XZLRequest("/community/serverInfo/getServerInfoById", data, "get");
// };
// //获取订单报价
// export const getServicePriceApi = (data) =>{
//   return XZLRequest("/community/serverInfo/getOrderQuote",data);
// };


// //新建社区订单
// export const getServiceOrderApi = (data) =>{
//   return SheQuRequest1("/laoa-huozhu/api/hz/order/third/createOrderPabWx",data);
// };

// //订单支付
// export const getServiceOrderPayApi = (data) =>{
//   return SheQuRequest1("/laoa-huozhu/api/hz/order/third/orderPayH5Pab",data);
// };

//根据用户地址判断该区域是否开通了站长
// export const getIsOpenServerAreaApi = (data) => {
//   return XZLRequest("/laoa-huozhu/api/hz/order/third/getIsOpenServerArea", data, "get");
// };

// //查询用户过往信息
// export const getUserInfoByIdApi = (data) => {
//   return XZLRequest("/laoa-huozhu/api/hz/order/third/getUserInfoById", data, "get");
// };
