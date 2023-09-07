import { endRequest, request, request2 } from '../../utils';
import { XZLRequest, RuanRequest, SheQuRequest, SheQuRequest1 } from '../../utils';
import { USER_TOKEN } from 'constant';

/**
 * @description 获取报价
 * @param {*} data
 * @returns
 */
export const getOrderOfferApi = (data) => {
  return request('laoa-huozhu/api/hz/order/third/getOrderOffer', data);
};

// 计算超距费
export const getDistancePriceApi = (data) => {
  return request('laoa-huozhu/api/hz/order/third/getDistancePrice', data);
};

// 创建配送安装订单
export const createOrderPabApi = (data) => {
  return request('laoa-huozhu/api/hz/order/third/createOrderPab', data);
};

// 获取订单详情
export const getOrderDetailApi = (no) => {
  return request('laoa-huozhu/api/hz/order/third/detailsMd', { orderNo: no }, 'get');
};

// 取消订单
export const cancelOrderApi = (data) => {
  return request('laoa-huozhu/api/hz/order/third/cancelOrder', data);
};

// 获取商品配置
export const getGoodsConfigApi = (data) => {
  return request('laoa-huozhu/api/hz/order/third/getOrderClaimSetting', data);
};

// 创建维修订单
export const createRepairOrderApi = (data) => {
  return request('laoa-huozhu/api/hz/order/third/createOrderPabWx', data);
};

// 获取服务需求
export const getDictListApi = () => {
  return request('laoa-huozhu/api/hz/order/third/getDictList', null, 'get');
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
  return request('laoa-huozhu/api/hz/order/third/orderPayH5Pab', data);
};

/**
 * @description 获取末端订单列表
 */
export const getEndOrderListApi = (data) => {
  return request('laoa-huozhu/api/hz/order/third/orderPagelist', data);
};

//线上
//查询社区服务分类
export const getServiceSortApi = (data) => {
  return SheQuRequest('/api/community/serverInfo/getServerTypeList', data);
};

//查询社区服务详情
export const getServiceDetailApi = (data) => {
  return SheQuRequest('/api/community/serverInfo/getServerInfoById', data, 'get');
};
//获取订单报价
export const getServicePriceApi = (data) => {
  return SheQuRequest('/api/community/serverInfo/getOrderQuote', data);
};

//新建社区订单
export const getServiceOrderApi = (data) => {
  return SheQuRequest1('laoa-huozhu/api/hz/order/third/createOrderPabWx', data);
};

//订单支付
export const getServiceOrderPayApi = (data) => {
  return SheQuRequest1('laoa-huozhu/api/hz/order/third/orderPayH5Pab', data);
};

//根据用户地址判断该区域是否开通了站长
export const getIsOpenServerAreaApi = (data) => {
  return SheQuRequest1('laoa-huozhu/api/hz/order/third/getIsOpenServerArea', data, 'get');
};

//查询用户过往信息
export const getUserInfoByIdApi = (data) => {
  return SheQuRequest1('laoa-huozhu/api/hz/order/third/getUserInfoById', data, 'get');
};

//线上订单详情
export const detailsMdApi = (data) => {
  return SheQuRequest1('laoa-huozhu/api/hz/order/third/detailsMd', data, 'get');
};
//本地订单详情
// export const detailsMdApi = (data) => {
//   return XZLRequest("laoa-huozhu/api/hz/order/third/detailsMd", data, "get");
// };

//搜索查询
export const getSearchDataApi = (data) => {
  return XZLRequest('/demo/api/community/serverInfo/getSearchData', data, 'get');
};

// 新的订单详情
export const getCommOrderDeatilApi = (data) => {
  return SheQuRequest1('laoa-huozhu/api/hz/order/third/getMdOrderInfoByNo', data, 'get');
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
//   return SheQuRequest1("laoa-huozhu/api/hz/order/third/createOrderPabWx",data);
// };

// //订单支付
// export const getServiceOrderPayApi = (data) =>{
//   return SheQuRequest1("laoa-huozhu/api/hz/order/third/orderPayH5Pab",data);
// };

//根据用户地址判断该区域是否开通了站长
// export const getIsOpenServerAreaApi = (data) => {
//   return XZLRequest("laoa-huozhu/api/hz/order/third/getIsOpenServerArea", data, "get");
// };

// //查询用户过往信息
// export const getUserInfoByIdApi = (data) => {
//   return XZLRequest("laoa-huozhu/api/hz/order/third/getUserInfoById", data, "get");
// };

/**
 * 社区服务列表
 */
export const getServeListApi = (data) => {
  return SheQuRequest1('laoa-huozhu/api/hz/order/third/getServerProjectList', data, 'get', null, {
    'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
  });
};

/**
 * 创建社区金管家订单
 */
export const createBeeStewardOrderApi = (data) => {
  return SheQuRequest1('laoa-huozhu/api/hz/order/third/createOrderSq', data, 'post', null, {
    'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
  });
};

/**
 * 订单支付
 */
export const payOrderForBeeStewadApi = (data) => {
  return SheQuRequest1('laoa-huozhu/api/hz/order/third/orderPayH5Pab', data, 'post', null, {
    'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
  });
};

/**
 * 订单支付APP
 */
export const payOrderForBeeStewadAPPApi = (data) => {
  return SheQuRequest1('laoa-huozhu/api/hz/order/third/getSybPaySign', data, 'post', null, {
    'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
  });
};

// 热门搜索
export const getHotSearchKeyApi = (data) => {
  return SheQuRequest('/api/community/serverInfo/getHotSearch', data, 'get', null, {
    'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
  });
};

// 搜索服务
export const searchServeApi = (data) => {
  return SheQuRequest('/api/community/serverInfo/getSearchData', data, 'get', {
    'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
  });
};

// 获取订单数量红点
export const getOrderNumberApi = (data) => {
  return SheQuRequest1('laoa-huozhu/api/hz/order/third/getOrderReminder', data, 'get', null, {
    'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
  });
};

// 获取订单唯一id
export const getOrderIdApi = (data) => {
  return SheQuRequest1('laoa-huozhu/api/hz/order/third/getSubmitToken', data, 'get', null, {
    'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
  });
};

// 获取文章列表
export const getArticleListApi = (data) => {
  return request2({
    url: '/newarticle/getSqArticleTypeList',
    data,
    method: 'GET'
  });
};

// 获取二次报价的订单列表
export const getTwicePayOrderListApi = (data) => {
  return SheQuRequest1('laoa-huozhu/api/hz/order/third/getUserOrderExtraList', data, 'get', null, {
    'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
  });
};

// 追加金额订单支付
export const payAdditionalOrderApi = (data) => {
  return SheQuRequest1('laoa-huozhu/api/hz/order/third/orderPayH5PabExtra', data, 'POST', null, {
    'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
  });
};

// 拒绝追加金额
export const refuseAdditionalPriceApi = (data) => {
  return SheQuRequest1('laoa-huozhu/api/hz/order/third/refuseExtra', data, 'POST', null, {
    'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
  });
};

/**
 * 评论
 */
// 获取待评论列表
export const getCommentListApi = (data) => {
  return endRequest({
    url: '/api/third/comment/queryToBeCommentList',
    method: 'POST',
    data,
    loading: false
  });
};

// 获取可追评订单列表
export const getCanCommentAgainListApi = (data) => {
  return endRequest({
    url: '/api/third/comment/queryAppendCommentList',
    method: 'GET',
    data,
    loading: false
  });
};

// 获取可追评订单列表
export const getCommentedListApi = (data) => {
  return endRequest({
    url: '/api/third/comment/queryReviewedCommentList',
    method: 'GET',
    data,
    loading: false
  });
};

// 发布评论、
export const publishCommentApi = (data) => {
  return endRequest({
    url: '/api/third/comment/saveComment',
    method: 'POST',
    data,
    loading: false
  });
};

// 追加评论
export const appendCommentApi = (data) => {
  return endRequest({
    url: '/api/third/comment/appendComment',
    method: 'POST',
    data,
    loading: false
  });
};

// 获取评论列表
export const getServeCommentListApi = (data) => {
  return endRequest({
    url: '/api/third/comment/queryServerInfoCommentList',
    method: 'GET',
    data,
    loading: false
  });
};

// 获取首页附近商家列表
export const getNearByShopListApi = (data) => {
  return SheQuRequest1('laoa-huozhu/api/hz/order/third/queryModuanShopList', data);
};

// 获取门店详情
export const getShopDetailApi = (data) => {
  return SheQuRequest1('laoa-huozhu/api/hz/order/third/queryModuanShopInfoById', data, 'GET');
};

// 收藏、取消门店
export const followShopApi = (data) => {
  return SheQuRequest1('laoa-huozhu/api/hz/order/third/followOrCancelShop', data);
};

// 获取商品分类
export const getShopGoodsCategoryListApi = (data) => {
  return SheQuRequest1('laoa-huozhu/api/hz/order/third/findShopGoodsTypeList', data, 'GET');
};

// 获取门店商品列表
export const getShopGoodsListApi = (data) => {
  return SheQuRequest1('laoa-huozhu/api/hz/order/third/findShopGoodsList', data);
};

// 获取1附近商家门店商品详情
export const getShopGoodsDetailApi = (data) => {
  return SheQuRequest1('laoa-huozhu/api/hz/order/third/findShopGoodsInfo', data, 'GET');
};
