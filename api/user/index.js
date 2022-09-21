import { LTRequest, getUserId } from "../../utils";

/**
 * 获取营销画像的数据
 */
export const getMarketingPortraitDataApi = () => {
  return LTRequest(`/demo/wx/api/statistical/home/${getUserId()}`, null, 'get');
};

/**
 * @description 获取信息哨兵列表
 * @param {*} data
 */
export const getMsgSentryListApi = (data) => {
  return LTRequest("/demo/wx/api/msgSentry/queryMsgSentryList", data);
};

/**
 * 收集 -> 转化
 * @param {*} ids
 * @returns
 */
export const postConversionApi = (ids) => {
  return LTRequest(
    `/demo/wx/api/msgSentry/conversion/${ids.id}/${ids.userId}`,
    null,
    "get"
  );
};

/**
 * @description 获取话术列表
 */
export const getWordsApi = (id) => {
  return LTRequest(`/demo/wx/api/msgSentry/queryMsgSayList/${id}`, null, "get");
};

/**
 * @description 是否回访
 * @param {
 *    id: 信息哨兵id
 *    status: 下一个状态
 * } 请求数据
 */
export const changeUserStatusApi = (data) => {
  return LTRequest("/demo/wx/api/msgSentry/isConversion", data);
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
  return LTRequest("/demo/wx/api/msgSentry/saveWxMsgSentry", data);
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
  return LTRequest('/demo/wx/api/msgSentry/saveMsgSay', data)
}