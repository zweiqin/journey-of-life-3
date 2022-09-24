import { getUserId, RuanRequest } from "../../utils";

/**
 * 获取首页商品列表
 * @returns
 */
export const getIndexDataApi = () => {
  return RuanRequest("/home/index", null, "get");
};

/**
 * @description 获取分类
 * @param {
 *  id  {String} 二级分类类目,
 *  goodsType {String}  1-家具 2-材料
 * } data
 * @returns
 */
export const getGoodsTypesApi = (data) => {
  return RuanRequest("/catalog/index", data, "get");
};

/**
 * @description 获取当前分类下的二级类目
 */
export const getTypeDetailList = (data) => {
  return RuanRequest("/catalog/current", data, "get");
};

/**
 *@exports 根据id查询商品
 * @param {*} data
 * @returns
 */
export const getGoodsById = (data) => {
  return RuanRequest("/goods/list", data, "get");
};


export const getUserCouponApi = (data) => {
  return RuanRequest('/coupon/getUserCoupon', data, 'get')
}