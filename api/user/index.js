/*
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-18 15:06:26
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-22 17:41:27
 * @FilePath: \团蜂商城 - 副本\tuan-uniapp\api\user\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { USER_TOKEN } from '../../constant'
import {
	LTRequest,
	getUserId,
	RuanRequest,
	XZLRequest,
	shopRequest,
	huangRequest
} from '../../utils'

// 业务管理升级
export const upbussinessApi = (data) => LTRequest('/api/business/setMsgSentryStatus', data)
// 业务管理查询
export const queryMsgSentryListApi = (data) => LTRequest('/api/msgSentry/queryMsgSentryList', data)
// 业务管理新增
export const saveMsgSentryApi = (data) => LTRequest('/api/business/saveMsgSentry', data)
// addperformance:DWHTestUrl +'/api/performance/savePerformance', //业绩管理增加信息
// performanceList:DWHTestUrl +'/api/performance/getPerformanceList', //业绩管理查询
// performanceInfo:DWHTestUrl + '/api/performance/getPerformanceInfo', //业绩管理明细查询
// savePerformance:DWHTestUrl + '/api/performance/savePerformance', //业绩管理添加
export const addperformanceApi = (data) => LTRequest('/api/performance/savePerformance', data)
export const performanceListApi = (data) => LTRequest('/api/performance/getPerformanceList', data)
export const getPerformanceInfoApi = (data) => LTRequest('/api/performance/getPerformanceInfo', data)

/**
 * 获取营销画像的数据
 */

export const getMarketingPortraitDataApi = () => LTRequest(`/api/statistical/home/${getUserId()}`, null, 'get')

/**
 * @description 获取信息哨兵列表
 * @param {*} data
 */

export const getMsgSentryListApi = (data) => LTRequest('/api/msgSentry/queryMsgSentryList', data)

/**
 * 收集 -> 转化
 * @param {*} ids
 * @returns
 */

export const postConversionApi = (ids) => LTRequest(
	`/api/msgSentry/conversion/${ids.id}/${ids.userId}`,
	null,
	'get'
)

/**
 * @description 获取话术列表
 */

export const getWordsApi = (id) => LTRequest(`/api/msgSentry/queryMsgSayList/${id}`, null, 'get')

/**
 * @description 是否回访
 * @param {
 *    id: 信息哨兵id
 *    status: 下一个状态
 * } 请求数据
 */

export const changeUserStatusApi = (data) => LTRequest('/api/msgSentry/isConversion', data)

/**
 * @description 添加信息哨兵客户信息
 * @param {
 *   {
 *    "userName":"王霸",
 *    "userGender":1,
 *    "userTel":"18779579999",
 *    "userId":200
 *   }
 * } data
 */

export const addCustomerApi = (data) => LTRequest('/api/msgSentry/saveWxMsgSentry', data)

/**
 * 新增话术
 * @param {
 *   say: string 话术信息
 *   type: number 话术类型
 * } data
 * @returns
 */

export const addMyWordsApi = (data) => LTRequest('/api/msgSentry/saveMsgSay', data)

// 上传图片
export const uploadFle = (data) => RuanRequest('/storage/upload', data)

// 获取门店类型
export const getStoreTypesApi = () => RuanRequest('/storeType/list', {}, 'get')

// 提交申请门店
// 该字段决定保存或提交 （true 为提交）
export const submitApplyStoreInfo = (type, data) => RuanRequest('/userUpInfo/save?isSubmit=' + type, data)

// 获取省市区地址
export const getCitiesApi = (data) => RuanRequest('/region/list', data, 'get')
// 会员查询保存的信息
export const getUserUpInfoReadApi = (data) => RuanRequest('/userUpInfo/read', data, 'get')
// 会员查询申请记录表
export const getUserUpInfoListApi = (data) => RuanRequest('/userUpInfo/list', data, 'get')
// 升级支付（门店）
export const getLevelPaySalesmanPrepayBySybApi = (data) => RuanRequest('/levelPay/SalesmanPrepayBySyb', data)
// 会员支付h5
export const paySybForEndApi = (data) => request('/laoa-huozhu/api/hz/order/third/orderPayH5Pab', data)

// 更新用户信息
export const updateUserInfoApi = (data) => RuanRequest('/user/update', data)

// 刷新用户信息
export const refrshUserInfoApi = (data) => RuanRequest('/user/refreshUser', data, 'get')

// 查询用户足迹
export const getUserViewHistoryApi = (data) => RuanRequest('/footprint/list', data, 'get')

// 获取收藏数据
export const getUserCollectionListApi = (data) => RuanRequest('/collect/list', data, 'get')

/**
 * 推广码
 */

// 获取推广码
export const getExtensionCodeApi = (data) => shopRequest('/binding/getCode', data)

// 绑定上级
export const bindLastUserApi = (data) => shopRequest('/binding/userBinding', data)

// 校验绑定
export const checkBindApi = (data) => shopRequest('/binding/checkBinding', data, 'get')

/**
 * 名片
 */

// 新建名片
export const buildNewMyCardApi = (data) => RuanRequest('/businessCard/add', data)

// 获取名片列表
export const getNameCardList = (data) => RuanRequest('/businessCard/list', data, 'get')

// 修改明信片背景色
export const changeNameCardBgApi = (data) => RuanRequest('/businessCard/updateBgColor', data)

// 获取名片详情
export const getNameCardDetailApi = (data) => RuanRequest('/businessCard/detail', data, 'get')

// 修改名片
export const updateNameCardApi = (data) => RuanRequest('/businessCard/update', data)

// 小账本
export const getAccountBookApi = (data) => RuanRequest('/smallledger/getSmallLedger', data, 'get')

/**
 * 会员升级
 */
// 获取业务员列表
export const getBusinessResponsiblePersonListApi = (data) => RuanRequest(
	'/partnerApply/getBusinessResponsiblePersonList',
	data,
	'get'
)

// 升级(超级)合伙人
export const partnerApplyApi = (data) => shopRequest('/api/syb/orderPayH5', data, 'post', null, {
	'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
})

// 升级为门店
export const applyStoreApi = (data) => shopRequest('/partnerApply/saveAndSignin', data, 'post', null, {
	'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
})

// 查询图册
export const getUserCrmSlbumList = (data) => shopRequest('/userCrmSlbum/list', data, 'get', null, {
	'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
})

// id查询智能图册
export const getUserCrmSlbumSelectId = (data) => shopRequest('/userCrmSlbum/selectId', data, 'get', null, {
	'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
})

// 新建智能图册
export const buildUserCrmSlbumApi = (data) => shopRequest('/userCrmSlbum/create', data, 'post', null, {
	'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
})

// 删除图册
export const userCrmSlbumDeleteApi = (data) => shopRequest('/userCrmSlbum/delete', data, 'get', null, {
	'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN)
})

// 进入微店
export const enterSHopApi = (data) => huangRequest('/microshop/toShop', data, 'get')

// 获取微店数据列表
export const getMyshopGoodsListApi = (data) => huangRequest('/microshop/queryUpList', data, 'get')

// 上架商品
export const upGoodsApi = (data) => huangRequest('/microshop/up', data, 'get')

// 下架商品
export const downGoodsApi = (data) => huangRequest('/microshop/down', data, 'get')

// 申请区域代理
export const applyRegionagentApi = (data) => shopRequest('/regionagent/saveRegionAgent', data)

// 查询区域代理状态
export const getApplyRegionagentStatusApi = (data) => shopRequest('/regionagent/queryIsApproved', data, 'get')

// 查询所有可领取的优惠劵
export const getAvailableCouponListApi = (data) => shopRequest('/coupon/getUserCoupon', data, 'get')

// 领取优惠劵
export const receiveCouponApi = (data) => shopRequest('/coupon/receive', data)

// 查看自己持有
export const getCouponListApi = (data) => shopRequest('/coupon/mylist', data, 'get')
