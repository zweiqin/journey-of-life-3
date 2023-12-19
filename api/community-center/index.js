import { endRequest, request2, SheQuRequest, SheQu1Request } from '../../utils';
import { USER_TOKEN } from 'constant';

/**
 * @description 获取报价
 * @param {*} data
 * @returns
 */

export const getOrderOfferApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/getOrderOffer', data);

// 计算超距费
export const getDistancePriceApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/getDistancePrice', data);

// 创建配送安装订单
export const createOrderPabApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/createOrderPab', data);

// 获取订单详情
export const getOrderDetailApi = (no) => SheQu1Request('laoa-huozhu/api/hz/order/third/detailsMd', { orderNo: no }, 'get');

// 取消订单
export const cancelOrderApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/cancelOrder', data);

// 获取商品配置
export const getGoodsConfigApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/getOrderClaimSetting', data);

// 创建维修订单
export const createRepairOrderApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/createOrderPabWx', data);

// 获取服务需求
export const getDictListApi = () => SheQu1Request('laoa-huozhu/api/hz/order/third/getDictList', null, 'get');

/**
 *
 * @param {*
 *  orderNo: 订单号
 *  userId: 用户id
 * } data
 * @returns
 */

export const payOrderForEndApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/orderPayH5Pab', data);

/**
 * @description 获取末端订单列表
 */

export const getEndOrderListApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/orderPagelist', data);

// 线上
// 查询社区服务分类
export const getServiceSortApi = (data) => SheQuRequest('/api/community/serverInfo/getServerTypeList', data);

// 查询社区服务详情
export const getServiceDetailApi = (data) => SheQuRequest('/api/community/serverInfo/getServerInfoById', data, 'get');
// 获取订单报价
export const getServicePriceApi = (data) => SheQuRequest('/api/community/serverInfo/getOrderQuote', data);

// 新建社区订单
export const getServiceOrderApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/createOrderPabWx', data);

// 订单支付
export const getServiceOrderPayApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/orderPayH5Pab', data);

// 根据用户地址判断该区域是否开通了站长
export const getIsOpenServerAreaApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/getIsOpenServerArea', data, 'get');

// 查询用户过往信息
export const getUserInfoByIdApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/getUserInfoById', data, 'get');

// 线上订单详情
export const detailsMdApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/detailsMd', data, 'get');

// 搜索查询
export const getSearchDataApi = (data) => SheQu1Request('/demo/api/community/serverInfo/getSearchData', data, 'get');

// 新的订单详情
export const getCommOrderDeatilApi = (data) => {
  return SheQu1Request('laoa-huozhu/api/hz/order/third/getMdOrderInfoByNo', data, 'get');
};

/**
 * 社区服务列表
 */

export const getServeListApi = (data) =>
  SheQu1Request('laoa-huozhu/api/hz/order/third/getServerProjectList', data, 'get', null, {
    'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
  });

/**
 * 创建社区家庭小卫士订单
 */

export const createBeeStewardOrderApi = (data) =>
  SheQu1Request('laoa-huozhu/api/hz/order/third/createOrderSq', data, 'post', null, {
    'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
  });

/**
 * 订单支付
 */

export const payOrderForBeeStewadApi = (data) =>
  SheQu1Request('laoa-huozhu/api/hz/order/third/orderPayH5Pab', data, 'post', null, {
    'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
  });

/**
 * 订单支付APP
 */

export const payOrderForBeeStewadAPPApi = (data) =>
  SheQu1Request('laoa-huozhu/api/hz/order/third/getSybPaySign', data, 'post', null, {
    'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
  });

// 热门搜索
export const getHotSearchKeyApi = (data) =>
  SheQuRequest('/api/community/serverInfo/getHotSearch', data, 'get', null, {
    'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
  });

// 搜索服务
export const searchServeApi = (data) =>
  SheQuRequest('/api/community/serverInfo/getSearchData', data, 'get', {
    'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
  });

// 获取订单数量红点
export const getOrderNumberApi = (data) =>
  SheQu1Request('laoa-huozhu/api/hz/order/third/getOrderReminder', data, 'get', null, {
    'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
  });

// 获取订单唯一id
export const getOrderIdApi = (data) =>
  SheQu1Request('laoa-huozhu/api/hz/order/third/getSubmitToken', data, 'get', null, {
    'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
  });

// 获取文章列表
export const getArticleListApi = (data) =>
  request2({
    url: '/newarticle/getSqArticleTypeList',
    data,
    method: 'GET'
  });

// 获取二次报价的订单列表
export const getTwicePayOrderListApi = (data) =>
  SheQu1Request('laoa-huozhu/api/hz/order/third/getUserOrderExtraList', data, 'get', null, {
    'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
  });

// 追加金额订单支付
export const payAdditionalOrderApi = (data) =>
  SheQu1Request('laoa-huozhu/api/hz/order/third/orderPayH5PabExtra', data, 'POST', null, {
    'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
  });

// 拒绝追加金额
export const refuseAdditionalPriceApi = (data) =>
  SheQu1Request('laoa-huozhu/api/hz/order/third/refuseExtra', data, 'POST', null, {
    'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
  });

/**
 * 评论
 */
// 获取待评论列表
export const getCommentListApi = (data) =>
  endRequest({
    url: '/api/third/comment/queryToBeCommentList',
    method: 'POST',
    data,
    loading: false
  });

// 获取可追评订单列表
export const getCanCommentAgainListApi = (data) =>
  endRequest({
    url: '/api/third/comment/queryAppendCommentList',
    method: 'GET',
    data,
    loading: false
  });

// 获取可追评订单列表
export const getCommentedListApi = (data) =>
  endRequest({
    url: '/api/third/comment/queryReviewedCommentList',
    method: 'GET',
    data,
    loading: false
  });

// 发布评论、
export const publishCommentApi = (data) =>
  endRequest({
    url: '/api/third/comment/saveComment',
    method: 'POST',
    data,
    loading: false
  });

// 追加评论
export const appendCommentApi = (data) =>
  endRequest({
    url: '/api/third/comment/appendComment',
    method: 'POST',
    data,
    loading: false
  });

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
  return SheQu1Request('laoa-huozhu/api/hz/order/third/queryModuanShopList', data);
};

// 获取一级标签
export const getFirstLevelShopLabelListApi = (data) => {
  return SheQu1Request('laoa-huozhu/api/hz/order/third/getFirstLevelShopLabelList', data, 'GET');
};

// 根据一级找二级标签
export const getSecondLevelShopLabelListApi = (data) => {
  return SheQu1Request('laoa-huozhu/api/hz/order/third/getSecondLevelShopLabelList', data, 'GET');
};

// 获取门店详情
export const getShopDetailApi = (data) => {
  return SheQu1Request('laoa-huozhu/api/hz/order/third/queryModuanShopInfoById', data, 'GET');
};

// 收藏、取消门店
export const followShopApi = (data) => {
  return SheQu1Request('laoa-huozhu/api/hz/order/third/followOrCancelShop', data);
};

// 获取商品分类
export const getShopGoodsCategoryListApi = (data) => {
  return SheQu1Request('laoa-huozhu/api/hz/order/third/findShopGoodsTypeList', data, 'GET');
};

// 获取门店商品列表
export const getShopGoodsListApi = (data) => {
  return SheQu1Request('laoa-huozhu/api/hz/order/third/findShopGoodsList', data);
};

// 获取1附近商家门店商品详情
export const getShopGoodsDetailApi = (data) => {
  return SheQu1Request('laoa-huozhu/api/hz/order/third/findShopGoodsInfo', data, 'GET');
};

// 判断用户是否企业认证
export const isAuthHuozhuApi = data => {
  return SheQu1Request('laoa-huozhu/api/hz/companyOrder/third/isCertification', data, 'GET')
}

// 企业认证
export const bAuthApi = (data) => {
  return SheQu1Request('laoa-huozhu/api/hz/companyOrder/third/enterpriseCertification', data, 'POST')
}

// 获取已认证公司列表

export const getAuthedCompanyListApi = data => {
  return SheQu1Request('laoa-huozhu/api/hz/common/third/getComListByComName', data, 'GET')
}

// 获取该地区的服务项目
export const getBuServeListApi = data => {
  return SheQu1Request('laoa-huozhu/api/hz/companyOrder/third/getServersByAddr', data, 'GET')
}

// 获取企业信息
export const getBAuthInfoApi = data => {
  return SheQu1Request('laoa-huozhu/api/hz/companyOrder/third/enterpriseInfo', data, 'GET')
}

// 获取企业下单订单报价
export const getOrderQuotationApi = data => {
  return SheQu1Request('laoa-huozhu/api/hz/companyOrder/third/calcPrice', data, 'POST')
}

// 获取网点地址列表
export const getShopSiteListApi = data => {
  return SheQu1Request('laoa-huozhu/api/hz/companyOrder/third/getShopsByAddr', data, 'GET')
}

// 余额支付
export const orderPayH5PabUseBlanceApi = data => {
  return SheQu1Request('laoa-huozhu/api/hz/order/third/orderPayH5PabUseBlance', data, 'POST')
}

// 获取商圈商品报价
export const getQuotationApi = (data) => {
  return endRequest({
    url: '/api/third/shopOrder/getQuotation',
    method: 'POST',
    data
  });
};

// 商圈商品购买
export const payGoodsApi = (data) => {
  return endRequest({
    url: '/api/third/shopOrder/submitOrder',
    method: 'POST',
    data
  });
};

// 获取商圈订单
export const getBusinessOrderListApi = (data) => {
  return endRequest({
    url: '/api/third/shopOrder/getOrderList',
    method: 'POST',
    data
  });
};

// 取消商圈订单
export const cancelBOrderApi = (data) => {
  return endRequest({
    url: '/api/third/shopOrder/cancelOrder',
    data,
    method: 'POST'
  });
};

// 删除商圈订单
export const deleteBOrderApi = (data) => {
  return endRequest({
    url: '/api/third/shopOrder/deleteOrder?orderId=' + data,
    method: 'DELETE',
    loading: true
  });
};

// 获取订单详情
export const getBOrderInfoApi = (data) => {
  return endRequest({
    url: '/api/third/shopOrder/getOrderDetail',
    data,
    method: 'GET'
  });
};

// 商圈订单支付
export const payBOrderH5 = (data) => {
  return endRequest({
    url: '/api/third/shopOrder/payOrder',
    data,
    method: 'POST'
  });
};

// app / 小程序支付
export const payOtherPlatformApi = (data) => {
  return endRequest({
    url: '/api/third/shopOrder/getSybPaySign',
    data,
    method: 'POST'
  });
};

export const payApiConfig = {
  otherPlatformApi: payOtherPlatformApi,
  h5Api: payBOrderH5
};

// 获取行业标签
export const getShopStyleListApi = (data) => {
  return endRequest({
    url: '/api/third/shop/getFirstTag',
    data,
    method: 'GET'
  });
};

// 获取师傅技能
export const getSFSkillsListApi = (data) => {
  return endRequest({
    url: '/api/third/shop/getServerTypeList',
    data,
    method: 'GET'
  });
};

//  操作门店业务
export const saveStoreBusinessApi = (data) => {
  return endRequest({
    url: '/api/third/shop/operateShop',
    data,
    method: 'POST'
  });
};

// ocr识别图片上传
export const OCRRecognitionApi = data => {
  return endRequest({
    url: '/api/third/ocr/baiduBusinessLicense',
    data,
    method: 'POST'
  })
}


// 银行卡识别
export const bankCardAnalysisApi = data => {
  return endRequest({
    url: "/api/third/ocr/bankCardOcr",
    data,
    method: "POST"
  })
}