import { RuanRequest } from "../../utils";


/**
 * 门店分类
 * @param {*} data 
 * @returns 
 */
export const getBrandTypeApi = (data) => {
    return RuanRequest("/storeType/list", data, 'get')
};
/**
 * 门店列表
 * @param {*} data 
 * @returns 
 */
export const getBrandListApi = (data) => {
    return RuanRequest("/brand/list", data, 'get')
};

/**
 * 门店详情
 * @param {*} data 
 * @returns 
 */
export const getBrandDetailApi = (data) => {
    return RuanRequest("/brand/detail", data, 'get')
};
/**
 * 门店前十商品
 * @param {*} data 
 * @returns 
 */

export const getBrandListBySelectApi = (data) => {
    return RuanRequest("/brand/listBySelect", data, 'get')
};
/**
 * 根据门店id获取当前门店下产品分类
 * @param {*} data 
 * @returns 
 */
export const getCatalogIdByBrandApi = (data) => {
    return RuanRequest("/catalog/getCatalogIdByBrand", data, 'get')
}