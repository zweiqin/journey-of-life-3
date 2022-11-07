import { RuanRequest } from "../../utils";

/**
 * 获取名片列表
 * @param {*} data 
 * @returns 
 */
export const getBusinessListApi = (data) =>{
    return RuanRequest("/businessCard/list",data,'get')
};