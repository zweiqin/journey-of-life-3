/*
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-23 17:34:37
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-25 09:05:54
 * @FilePath: \团蜂商城 - 副本\tuan-uniapp\api\order\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { RuanRequest } from "../../utils";
/**
 * 
 * @param {订单列表查询} data 
 * @returns 
 */
export const getOrderListApi = (data) => {
    return RuanRequest("/order/list", data, 'get')
};
/**
 * 
 * @param {删除订单} data 
 * @returns 
 */
export const getOrderCancelApi = (data) => {
    return RuanRequest("/order/cancel", data)
};
/**
 * 
 * @param {确认收货} data 
 * @returns 
 */
export const getOrderConfirmApi = (data) => {
    return RuanRequest("/order/confirm", data)
};
/**
 * 
 * @param {订单删除} data 
 * @returns 
 */
export const getOrderDeleteApi = (data) => {
    return RuanRequest("/order/delete", data)
};
/**
 * 
 * @param {订单申请退款} data 
 * @returns 
 */
export const getOrderRefundApi = (data) => {
    return RuanRequest("/order/refund", data)
};




