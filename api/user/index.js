/*
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-18 15:06:26
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-22 17:41:27
 * @FilePath: \团蜂商城 - 副本\tuan-uniapp\api\user\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { USER_TOKEN } from '../../constant'
import { getUserId, RuanRequest, shopRequest, huangRequest, SheQu1Request, request2, endRequest } from '../../utils'

// 业务管理升级
export const upbussinessApi = (data) => RuanRequest('/api/business/setMsgSentryStatus', data)
// 业务管理查询
export const queryMsgSentryListApi = (data) => RuanRequest('/api/msgSentry/queryMsgSentryList', data)
// 业务管理新增
export const saveMsgSentryApi = (data) => RuanRequest('/api/business/saveMsgSentry', data)
// addperformance:DWHTestUrl +'/api/performance/savePerformance', //业绩管理增加信息
// performanceList:DWHTestUrl +'/api/performance/getPerformanceList', //业绩管理查询
// performanceInfo:DWHTestUrl + '/api/performance/getPerformanceInfo', //业绩管理明细查询
// savePerformance:DWHTestUrl + '/api/performance/savePerformance', //业绩管理添加
export const addperformanceApi = (data) => RuanRequest('/api/performance/savePerformance', data)
export const performanceListApi = (data) => RuanRequest('/api/performance/getPerformanceList', data)
export const getPerformanceInfoApi = (data) => RuanRequest('/api/performance/getPerformanceInfo', data)

/**
 * 获取营销画像的数据
 */

export const getMarketingPortraitDataApi = () => RuanRequest(`/api/statistical/home/${getUserId()}`, null, 'get')

/**
 * @description 获取信息哨兵列表
 * @param {*} data
 */

export const getMsgSentryListApi = (data) => RuanRequest('/api/msgSentry/queryMsgSentryList', data)

/**
 * 收集 -> 转化
 * @param {*} ids
 * @returns
 */

export const postConversionApi = (ids) => RuanRequest(`/api/msgSentry/conversion/${ids.id}/${ids.userId}`, null, 'get')

/**
 * @description 获取话术列表
 */

export const getWordsApi = (id) => RuanRequest(`/api/msgSentry/queryMsgSayList/${id}`, null, 'get')

/**
 * @description 是否回访
 * @param {
 *    id: 信息哨兵id
 *    status: 下一个状态
 * } 请求数据
 */

export const changeUserStatusApi = (data) => RuanRequest('/api/msgSentry/isConversion', data)

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

export const addCustomerApi = (data) => RuanRequest('/api/msgSentry/saveWxMsgSentry', data)

/**
 * 新增话术
 * @param {
 *   say: string 话术信息
 *   type: number 话术类型
 * } data
 * @returns
 */

export const addMyWordsApi = (data) => RuanRequest('/api/msgSentry/saveMsgSay', data)

// 上传图片
export const uploadFle = (data) => RuanRequest('/storage/upload', data)

// 获取门店类型
export const getStoreTypesApi = () => RuanRequest('/storeType/list', {}, 'get')

// 提交申请门店
// 该字段决定保存或提交 （true 为提交）
export const submitApplyStoreInfo = (type, data) => RuanRequest('/userUpInfo/save?isSubmit=' + type, data)

// 获取省市区地址
export const getCitiesApi = (data) => RuanRequest('/region/list', data, 'get')
// 获取省市区地址
export const getAreaRegionApi = (data) => RuanRequest('/dtsArea/region', data, 'get')
// 会员查询保存的信息
export const getUserUpInfoReadApi = (data) => RuanRequest('/userUpInfo/read', data, 'get')
// 会员查询申请记录表
export const getUserUpInfoListApi = (data) => RuanRequest('/userUpInfo/list', data, 'get')
// 升级支付（门店）
export const getLevelPaySalesmanPrepayBySybApi = (data) => RuanRequest('/levelPay/SalesmanPrepayBySyb', data)
// 会员支付h5
export const paySybForEndApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/orderPayH5Pab', data)

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
export const getBusinessResponsiblePersonListApi = (data) => RuanRequest('/partnerApply/getBusinessResponsiblePersonList', data, 'get')

/**
 * 活动中心
 */
// 获取活动中心佣金收益
export const getUserIncomeApi = (data) => RuanRequest('/dtsUserActivityCommissionRecord/commissionRevenues', data, 'get')

// // 活动列表查询
// export const getUserCrmListApi = (data) => RuanRequest(
// 	'/userCrm/list',
// 	data,
// 	'get'
// )

// 用户经纬度查询是否在区域在的话返回该活动
export const getUserCrmListApi = (data) => shopRequest('/userCrm/region', data, 'get')

// 粉丝查询
export const getBindingUserApi = (data) => RuanRequest('/userBindingUser/bindingUser', data, 'get')

// 分享按钮判断用户是否购买399会员成为家庭小卫士
export const getPurchaseRecordApi = (data) => RuanRequest('/userCrm/purchaseRecord', data, 'get')

// 分享按钮判断用户是否购买399会员成为家庭小卫士2
export const getPurchaseRecord2Api = (data) => RuanRequest('/userCrm/purchaseRecord2', data, 'get')

// 分享按钮判断用户是否购买爆款商品
export const getIsPurchaseApi = (data) => RuanRequest('/userCrm/isPurchase', data, 'get')

// 生成并返回用户的活动邀请码
export const getCreateCodeApi = (data) => RuanRequest('/infoCode/createCode', data, 'get')

// 活动码绑定
export const changeActivityUserBindingApi = (data) => shopRequest('/userBindingUser/userBindingUser', data)

// 服务记录邀请绑定接口
// export const changeServiceUserBindingApi = (data) => shopRequest('/dtsUserSharingLogs/saveLog', data)
export const changeServiceUserBindingApi = (data) => shopRequest('/dtsUserSharingLogs/saveLog', data, 'get')

// 查询我的(服务记录)分享数购买数接口
export const getServiceSharingLogsApi = (data) => RuanRequest('/dtsUserSharingLogs/selectId', data, 'get')

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

// 申请团长
export const applyRegimentalCommander = (data) => endRequest({
	url: '/api/third/tz/applyForCommander',
	data,
	hrader: {
		'TK-token': uni.getStorageSync(USER_TOKEN)
	}
})

// 查询团长审核状态
export const queryApplyRegimentalCommanderStatusApi = (data) => endRequest({
	url: '/api/third/tz/findUserIsTz',
	method: 'get',
	data,
	hrader: {
		'TK-token': uni.getStorageSync(USER_TOKEN)
	}
})

// 获取佣金统计
export const getCommissionDatatApi = (data) => endRequest({
	url: '/api/third/tz/getCommissionStatistics',
	method: 'GET',
	data
})

// 获取佣金详情
export const getCommissionDeatilApi = (data) => endRequest({
	url: '/api/third/tz/getCommissionList',
	method: 'GET',
	data
})

// 获取推广码
export const getGroupCodeApi = (data) => endRequest({
	url: '/api/third/tz/getPartnerCode',
	method: 'GET',
	data
})

// 获取会员列表
export const getCommanderVipUserListApi = (data) => endRequest({
	url: '/api/third/tz/getByMenmberIdList',
	method: 'GET',
	data
})

// 获取团长银行卡列表
export const getCommanderBankCardListApi = (data) => endRequest({
	url: '/api/third/tz/getBankCardList',
	data,
	method: 'GET'
})

// 新增团长银行卡
export const addCommannderBankCardApi = (data) => endRequest({
	url: '/api/third/tz/saveBankCard',
	data,
	method: 'POST'
})

// 修改银行卡信息
export const editCommanderBnakCardApi = (data) => endRequest({
	url: '/api/third/tz/updateBankCard',
	data,
	method: 'POST'
})

// 团长点击提现
export const commanderWithdrawApi = (data) => endRequest({
	url: '/api/third/tz/applyExtraCommission',
	data,
	method: 'POST'
})

// 查询用户的银行卡列表
export const getBankCardListUserApi = (data) => endRequest({
	url: '/api/third/tz/getBankCardListUser',
	data,
	method: 'GET'
})

// 银行卡信息新增
export const saveBankCardUserApi = (data) => endRequest({
	url: '/api/third/tz/saveBankCardUser',
	data,
	method: 'POST'
})

// 银行卡信息修改
export const updateBankCardUserApi = (data) => endRequest({
	url: '/api/third/tz/updateBankCardUser',
	data,
	method: 'POST'
})

// 银行卡信息详情
export const getBankCardDetailUserApi = (data) => endRequest({
	url: '/api/third/tz/getBankCardDetailUser',
	data,
	method: 'GET'
})

// 查询提现记录
export const getWithdrawRecordListUserApi = (data) => endRequest({
	url: '/api/third/tz/getWithdrawRecordListUser',
	data,
	method: 'POST'
})

// 团蜂用户提现余额
export const withdrawalBalanceApi = (data) => shopRequest('/dtsWithdrawalLogs/withdrawalBalance', data, 'get')

// 活动中心提现到余额
export const updateWithdrawalApi = (data) => shopRequest('/dtsWithdrawalLogs/withdrawal', data)

// 提现记录
export const getWithdrawalLogsApi = (data) => shopRequest('/dtsWithdrawalLogs/withdrawalLogs', data, 'get')

// 查询区域代理状态
export const getApplyRegionagentStatusApi = (data) => shopRequest('/regionagent/queryIsApproved', data, 'get')

// 查询所有可领取的优惠劵
export const getAvailableCouponListApi = (data) => shopRequest('/coupon/getUserCoupon', data, 'get')

// 领取优惠劵
export const receiveCouponApi = (data) => shopRequest('/coupon/receive', data)

// 查看自己持有
export const getCouponListApi = (data) => shopRequest('/coupon/mylist', data, 'get')

// 查询用户是否购买过家庭小卫士套餐
export const userIsPurchaseApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/userIsPurchase', data)

// 获取家庭小卫士套餐列表
export const getSetMealListApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/getSetMealList', data)

// 获取会员套餐列表
export const getServerProjectListApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/getServerProjectList', data, 'get')

// 预约服务
export const reservationServiceApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/reservationService', data)

// 获取股东统计数据
export const getShareHolderDataApi = (data) => request2({
	url: '/user/getShareholderCount',
	data,
	method: 'get',
	loading: true
})

/**
 * 客服分类和建议
 */

// 查询客服问题分类
export const getCustomerCategoryApi = (data) => RuanRequest('/dtsCustomerCategory/customerCategory', data, 'get')

// 根据分类ID查询问题答案
export const getCustomerSelectAnswerApi = (data) => RuanRequest('/dtsCustomerAnswer/selectAnswerOne', data, 'get')

// 根据分类ID查询问题答案以及相关问题
export const getCustomerAnswerSelectApi = (data) => RuanRequest('/dtsCustomerAnswer/selectAnswer', data, 'get')

// 有用无用次数统计
export const getCustomerAnswerStatisticsApi = (data) => RuanRequest('/dtsCustomerAnswer/statistics', data, 'get')

// 用户建议类型
export const getCustomerSelectReasonApi = (data) => RuanRequest('/dtsOrderRefundsReason/selectReason', data, 'get')

// 查询客服热门问题分类
export const getCustomerPopularApi = (data) => RuanRequest('/dtsCustomerCategory/customerPopular', data, 'get')

// 用户发送消息的客服接口
export const getcustomerSendingApi = (data) => RuanRequest('/dtsCustomerCategory/customerSending', data, 'get')
