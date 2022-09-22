/*
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-18 15:06:26
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-19 16:42:09
 * @FilePath: \团蜂商城 - 副本\tuan-uniapp\api\user\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { LqbRequest } from "../../utils"

// 业务管理升级
export const upbussinessApi = (data) => {
    return LqbRequest("/demo/wx/api/business/setMsgSentryStatus", data)
}
// 业务管理查询
export const queryMsgSentryListApi  = (data) =>{
    return LqbRequest("/demo/wx/api/msgSentry/queryMsgSentryList",data)
}
// 业务管理新增
export const saveMsgSentryApi  = (data) =>{
    return LqbRequest("/demo/wx/api/business/saveMsgSentry",data)
}
// addperformance:DWHTestUrl +'/api/performance/savePerformance', //业绩管理增加信息
// performanceList:DWHTestUrl +'/api/performance/getPerformanceList', //业绩管理查询
// performanceInfo:DWHTestUrl + '/api/performance/getPerformanceInfo', //业绩管理明细查询
// savePerformance:DWHTestUrl + '/api/performance/savePerformance', //业绩管理添加
export const addperformanceApi = (data) =>{
    return LqbRequest("/demo/wx/api/performance/savePerformance",data)
}
export const performanceListApi = (data) =>{
    return LqbRequest("/demo/wx/api/performance/getPerformanceList",data)
}
export const getPerformanceInfoApi = (data) =>{
    return LqbRequest("/demo/wx/api/performance/getPerformanceInfo",data)
}

