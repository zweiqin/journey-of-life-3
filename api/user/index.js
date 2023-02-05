/*
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-18 15:06:26
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-22 17:41:27
 * @FilePath: \团蜂商城 - 副本\tuan-uniapp\api\user\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { USER_TOKEN } from "../../constant";
import {
	LTRequest,
	getUserId,
	RuanRequest,
	XZLRequest
} from "../../utils";

// 业务管理升级
export const upbussinessApi = (data) => {
	return LTRequest("/api/business/setMsgSentryStatus", data);
};
// 业务管理查询
export const queryMsgSentryListApi = (data) => {
	return LTRequest("/api/msgSentry/queryMsgSentryList", data);
};
// 业务管理新增
export const saveMsgSentryApi = (data) => {
	return LTRequest("/api/business/saveMsgSentry", data);
};
// addperformance:DWHTestUrl +'/api/performance/savePerformance', //业绩管理增加信息
// performanceList:DWHTestUrl +'/api/performance/getPerformanceList', //业绩管理查询
// performanceInfo:DWHTestUrl + '/api/performance/getPerformanceInfo', //业绩管理明细查询
// savePerformance:DWHTestUrl + '/api/performance/savePerformance', //业绩管理添加
export const addperformanceApi = (data) => {
	return LTRequest("/api/performance/savePerformance", data);
};
export const performanceListApi = (data) => {
	return LTRequest("/api/performance/getPerformanceList", data);
};
export const getPerformanceInfoApi = (data) => {
	return LTRequest("/api/performance/getPerformanceInfo", data);
};

/**
 * 获取营销画像的数据
 */
export const getMarketingPortraitDataApi = () => {
	return LTRequest(`/api/statistical/home/${getUserId()}`, null, "get");
};

/**
 * @description 获取信息哨兵列表
 * @param {*} data
 */
export const getMsgSentryListApi = (data) => {
	return LTRequest("/api/msgSentry/queryMsgSentryList", data);
};

/**
 * 收集 -> 转化
 * @param {*} ids
 * @returns
 */
export const postConversionApi = (ids) => {
	return LTRequest(
		`/api/msgSentry/conversion/${ids.id}/${ids.userId}`,
		null,
		"get"
	);
};

/**
 * @description 获取话术列表
 */
export const getWordsApi = (id) => {
	return LTRequest(`/api/msgSentry/queryMsgSayList/${id}`, null, "get");
};

/**
 * @description 是否回访
 * @param {
 *    id: 信息哨兵id
 *    status: 下一个状态
 * } 请求数据
 */
export const changeUserStatusApi = (data) => {
	return LTRequest("/api/msgSentry/isConversion", data);
};

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
export const addCustomerApi = (data) => {
	return LTRequest("/api/msgSentry/saveWxMsgSentry", data);
};

/**
 * 新增话术
 * @param {
 *   say: string 话术信息
 *   type: number 话术类型
 * } data
 * @returns
 */
export const addMyWordsApi = (data) => {
	return LTRequest("/api/msgSentry/saveMsgSay", data);
};

// 上传图片
export const uploadFle = (data) => {
	return RuanRequest("/storage/upload", data);
};

// 获取门店类型
export const getStoreTypesApi = () => {
	return RuanRequest("/storeType/list", {}, "get");
};

// 提交申请门店
// 该字段决定保存或提交 （true 为提交）
export const submitApplyStoreInfo = (type, data) => {
	return RuanRequest("/userUpInfo/save?isSubmit=" + type, data);
};

// 获取省市区地址
export const getCitiesApi = (data) => {
	return RuanRequest("/region/list", data, "get");
};
//会员查询保存的信息
export const getUserUpInfoReadApi = (data) => {
	return RuanRequest("/userUpInfo/read", data, "get");
};
//会员查询申请记录表
export const getUserUpInfoListApi = (data) => {
	return RuanRequest("/userUpInfo/list", data, "get");
};
//升级支付（门店）
export const getLevelPaySalesmanPrepayBySybApi = (data) => {
	return RuanRequest("/levelPay/SalesmanPrepayBySyb", data,);
};
//会员支付h5
export const paySybForEndApi = (data) => {
	return request("/laoa-huozhu/api/hz/order/third/orderPayH5Pab", data);
};

// 更新用户信息
export const updateUserInfoApi = (data) => {
	return RuanRequest("/user/update", data);
};

// 刷新用户信息
export const refrshUserInfoApi = (data) => {
	return RuanRequest("/user/refreshUser", data, "get");
};

// 查询用户足迹
export const getUserViewHistoryApi = (data) => {
	return RuanRequest("/footprint/list", data, "get");
};

// 获取收藏数据
export const getUserCollectionListApi = (data) => {
	return RuanRequest("/collect/list", data, "get");
};

/**
 * 推广码
 */

// 获取推广码
export const getExtensionCodeApi = data => {
	return RuanRequest('/qrCode/getQrCodeByH5', data, 'get')
}

// 绑定上级
export const bindLastUserApi = data => {
	return RuanRequest('/bindUser/add', data)
}

/**
 * 名片
 */

// 新建名片
export const buildNewMyCardApi = data => {
	return RuanRequest('/businessCard/add', data)
}

// 获取名片列表
export const getNameCardList = data => {
	return RuanRequest('/businessCard/list', data, 'get')
}

// 修改明信片背景色
export const changeNameCardBgApi = data => {
	return RuanRequest('/businessCard/updateBgColor', data)
}

// 获取名片详情
export const getNameCardDetailApi = data => {
	return RuanRequest('/businessCard/detail', data, 'get')
}

// 修改名片
export const updateNameCardApi = data => {
	return RuanRequest('/businessCard/update', data)
}


// 小账本
export const getAccountBookApi = data => {
	return RuanRequest('/smallledger', data, 'get')
}


/**
 * 会员升级
 */
// 获取业务员列表
export const getBusinessResponsiblePersonListApi = (data) => {
	return RuanRequest("/partnerApply/getBusinessResponsiblePersonList", data, 'get')
}

// 升级(超级)合伙人
export const partnerApplyApi = data => {
	return RuanRequest("/api/syb/orderPayH5", data, 'post', null, {
		"X-Dts-Admin-Token": uni.getStorageSync(USER_TOKEN)
	})
}