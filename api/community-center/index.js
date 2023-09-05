import { endRequest, request2, XZLRequest, SheQuRequest, SheQu1Request } from '../../utils'
import { USER_TOKEN } from 'constant'

/**
 * @description 获取报价
 * @param {*} data
 * @returns
 */

export const getOrderOfferApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/getOrderOffer', data)

// 计算超距费
export const getDistancePriceApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/getDistancePrice', data)

// 创建配送安装订单
export const createOrderPabApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/createOrderPab', data)

// 获取订单详情
export const getOrderDetailApi = (no) => SheQu1Request('laoa-huozhu/api/hz/order/third/detailsMd', { orderNo: no }, 'get')

// 取消订单
export const cancelOrderApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/cancelOrder', data)

// 获取商品配置
export const getGoodsConfigApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/getOrderClaimSetting', data)

// 创建维修订单
export const createRepairOrderApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/createOrderPabWx', data)

// 获取服务需求
export const getDictListApi = () => SheQu1Request('laoa-huozhu/api/hz/order/third/getDictList', null, 'get')

/**
 *
 * @param {*
 *  orderNo: 订单号
 *  userId: 用户id
 * } data
 * @returns
 */

export const payOrderForEndApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/orderPayH5Pab', data)

/**
 * @description 获取末端订单列表
 */

export const getEndOrderListApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/orderPagelist', data)

// 线上
// 查询社区服务分类
export const getServiceSortApi = (data) => SheQuRequest('/api/community/serverInfo/getServerTypeList', data)

// 查询社区服务详情
export const getServiceDetailApi = (data) => SheQuRequest('/api/community/serverInfo/getServerInfoById', data, 'get')
// 获取订单报价
export const getServicePriceApi = (data) => SheQuRequest('/api/community/serverInfo/getOrderQuote', data)

// 新建社区订单
export const getServiceOrderApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/createOrderPabWx', data)

// 订单支付
export const getServiceOrderPayApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/orderPayH5Pab', data)

// 根据用户地址判断该区域是否开通了站长
export const getIsOpenServerAreaApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/getIsOpenServerArea', data, 'get')

// 查询用户过往信息
export const getUserInfoByIdApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/getUserInfoById', data, 'get')

// 线上订单详情
export const detailsMdApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/detailsMd', data, 'get')
// 本地订单详情
// export const detailsMdApi = (data) => {
//   return XZLRequest("laoa-huozhu/api/hz/order/third/detailsMd", data, "get");
// };

// 搜索查询
export const getSearchDataApi = (data) => XZLRequest('/demo/api/community/serverInfo/getSearchData', data, 'get')

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
//   return SheQu1Request("laoa-huozhu/api/hz/order/third/createOrderPabWx",data);
// };

// //订单支付
// export const getServiceOrderPayApi = (data) =>{
//   return SheQu1Request("laoa-huozhu/api/hz/order/third/orderPayH5Pab",data);
// };

// 根据用户地址判断该区域是否开通了站长
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

export const getServeListApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/getServerProjectList', data, 'get', null, {
	'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
})

/**
 * 创建社区金管家订单
 */

export const createBeeStewardOrderApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/createOrderSq', data, 'post', null, {
	'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
})

/**
 * 订单支付
 */

export const payOrderForBeeStewadApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/orderPayH5Pab', data, 'post', null, {
	'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
})

/**
 * 订单支付APP
 */

export const payOrderForBeeStewadAPPApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/getSybPaySign', data, 'post', null, {
	'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
})

// 热门搜索
export const getHotSearchKeyApi = (data) => SheQuRequest('/api/community/serverInfo/getHotSearch', data, 'get', null, {
	'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
})

// 搜索服务
export const searchServeApi = (data) => SheQuRequest('/api/community/serverInfo/getSearchData', data, 'get', {
	'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
})

// 获取订单数量红点
export const getOrderNumberApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/getOrderReminder', data, 'get', null, {
	'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
})

// 获取订单唯一id
export const getOrderIdApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/getSubmitToken', data, 'get', null, {
	'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
})

// 获取文章列表
export const getArticleListApi = (data) => request2({
	url: '/newarticle/getSqArticleTypeList',
	data,
	method: 'GET'
})

// 获取二次报价的订单列表
export const getTwicePayOrderListApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/getUserOrderExtraList', data, 'get', null, {
	'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
})

// 追加金额订单支付
export const payAdditionalOrderApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/orderPayH5PabExtra', data, 'POST', null, {
	'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
})

// 拒绝追加金额
export const refuseAdditionalPriceApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/refuseExtra', data, 'POST', null, {
	'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
})

/**
 * 评论
 */
// 获取待评论列表
export const getCommentListApi = (data) => endRequest({
	url: '/api/third/comment/queryToBeCommentList',
	method: 'POST',
	data,
	loading: false
})

// 获取可追评订单列表
export const getCanCommentAgainListApi = (data) => endRequest({
	url: '/api/third/comment/queryAppendCommentList',
	method: 'GET',
	data,
	loading: false
})

// 获取可追评订单列表
export const getCommentedListApi = (data) => endRequest({
	url: '/api/third/comment/queryReviewedCommentList',
	method: 'GET',
	data,
	loading: false
})

// 发布评论、
export const publishCommentApi = (data) => endRequest({
	url: '/api/third/comment/saveComment',
	method: 'POST',
	data,
	loading: false
})

// 追加评论
export const appendCommentApi = (data) => endRequest({
	url: '/api/third/comment/appendComment',
	method: 'POST',
	data,
	loading: false
})

// 获取评论列表
export const getServeCommentListApi = (data) => endRequest({
	url: '/api/third/comment/queryServerInfoCommentList',
	method: 'GET',
	data,
	loading: false
})
