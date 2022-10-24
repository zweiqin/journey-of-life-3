import { DEYIRequest,RuanRequest } from "../../utils";


/**
 * 会员申请信息提交/保存
 * @param {*} data 
 * @returns 
 */
export const userUpInfoSaveApi = (data) => {
    return DEYIRequest("/userUpInfo/save", data);
  };
/**
 * 会员升级列表查询
 * @param {*} data 
 * @returns 
 */
  export const userUpRecordListApi = (data) => {
    return RuanRequest("/upRecord/list", data, "get");
  };