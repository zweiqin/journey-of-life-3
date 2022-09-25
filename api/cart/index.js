/*
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-22 09:39:58
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-23 09:58:54
 * @FilePath: \团蜂商城 - 副本\tuan-uniapp\api\cate\cataAdd.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { RuanRequest } from "../../utils";

/**
 * 购物车添加
 * @returns  
 */
export const getCartAddApi = (data) =>{
    return RuanRequest("/cart/add",data)
};
/**
 * 
 * @param {获取购物车信息} data 
 * @returns 
 */
export const getCartIndexApi = (data) =>{
    return RuanRequest("/cart/index",data,'get')
}
/**
 * 
 * @param {获取购物车商品数量} data 
 * @returns 
 */
export const getCartGoodscountApi = (data) =>{
    return RuanRequest("/cart/goodscount",data,'get')
}
/**
 * 
 * @param {获取购物车商品勾选状态} data 
 * @returns 
 */
export const getCartCheckedApi = (data) =>{
    return RuanRequest("/cart/checked",data)
};
/**
 * 
 * @param {修改购物车商品数量} data 
 * @returns 
 */
export const getCartUpdateApi = (data) =>{
    return RuanRequest("/cart/update",data)
};
/**
 * 
 * @param {商品信息删除} data 
 * @returns 
 */
export const getCartDeleteApi = (data) =>{
    return RuanRequest("/cart/delete",data)
};
/**
 * 
 * @param {购物车结算} data 
 * @returns 
 */
export const getCartCheckoutApi = (data) =>{
    return RuanRequest("/cart/checkout",data,'get')
}