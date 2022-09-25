/*
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-23 09:58:38
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-23 16:51:23
 * @FilePath: \团蜂商城 - 副本\tuan-uniapp\api\address\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { RuanRequest } from "../../utils";
/**
 * 
 * @param {地址列表} data 
 * @returns 
 */
 export const getAddressListApi = (data) =>{
    return RuanRequest("/address/list",data,'get')
};
/**
 * 
 * @param {区域列表} data 
 * @returns 
 */
export const getRegionListApi = (data) =>{
    return RuanRequest("/region/list",data,'get')
};

export const getAddressSaveApi = (data) =>{
    return RuanRequest("/address/save",data)
};
export const getAddressDeleteApi = (data) =>{
    return RuanRequest("/address/delete",data)
};
