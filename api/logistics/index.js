import { SheQu1Request } from '../../utils'

/**
 * 获取仓库列表
 */

export const getWarehouseListApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/getWuLiuInfo', data)

/**
 * 获取报价
 */

export const getOrderQuoteApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/getOrderQuote', data)

/**
 * 地址智能识别
 */

export const addressIntelligentRecogApi = (address) => SheQu1Request('laoa-huozhu/api/hz/order/third/addressAnalyze', { address })

/**
 * 提交创建订单
 */

export const createOrderApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/orderCreate', data)

/**
 * 查询订单
 */

export const expressInquiryApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/list', data)

/**
 * 获取订单详情
 */

export const getOrderDetailApi = (orderNo) => SheQu1Request(
	'laoa-huozhu/api/hz/order/third/details',
	{
		orderNo
	},
	'get'
)

/**
 * 取消订单
 * @param {Object} data
  {
    "orderId": 1913,
    "cancelRemarks": "不想要了",
    "userId": 150
  }
 */

export const cancelOrderApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/orderCancel', data)

/**
 * 编辑订单
 * @param {*} data
 * @returns
 */

export const editeOrderApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/orderEdit', data)

/**
 * 获取物流广告位分页列表
 * @param {*} data
 */

export const findAdLogisticsSpaceByPageApi = (data) => SheQu1Request(
	'laoa-huozhu/api/hz/order/third/findAdLogisticsSpaceByPage',
	data
)

/**
 * 获取物流公司详情
 * @param {*} qiyeId
 * @returns
 */

export const getLogisticsInfoApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/getLogisticsInfo', data)

/**
 * 落货点查看
 * @param {*} data
 * @returns
 */

export const getDropOffPointApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/getWarehouseList', data)

/**
 * 关注物流
 */

export const followWuliuApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/followCompany', data)

/**
 * 取关物流
 */

export const unFollowWuliuApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/unfollowCompany', data)

/**
 * 点击量
 */

export const increamentClickNumApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/clickNum', data)

/**
 * 搜索物流
 */

export const searchWuliuApi = (data) => SheQu1Request(
	'laoa-huozhu/api/hz/order/third/wxQueryStartAndEndList',
	data
)

/**
 * 获取关注列表
 */

export const getFollowListApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/getFollwCompanyList', data)

// 获取物流配置信息
export const getCategoryListApi = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/productTypeListNew', data)

// 创建订单
export const payOrder = (data) => SheQu1Request('laoa-huozhu/api/hz/order/third/orderPayTfH5', data)
