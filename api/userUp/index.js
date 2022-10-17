import { DEYIRequest } from "../../utils";


/**
 * 会员申请信息提交/保存
 * @param {*} data 
 * @returns 
 */
export const userUpInfoSaveApi = (data) => {
    return DEYIRequest("/userUpInfo/save", data);
  };