/*
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-17 16:22:25
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-22 10:20:39
 * @FilePath: \团蜂商城 - 副本\tuan-uniapp\api\home\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { request, shopRequest, shopRequest1 } from '../../utils';
import { getUserId, RuanRequest } from '../../utils';

/**
 * 获取首页商品列表
 * @returns
 */
export const getIndexDataApi = () => {
  return RuanRequest('/home/index', null, 'get');
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
  return RuanRequest('/catalog/index', data, 'get');
};

/**
 * @description 获取当前分类下的二级类目
 */
export const getTypeDetailList = (data) => {
  return RuanRequest('/catalog/current', data, 'get');
};

/**
 *@exports 根据id查询商品
 * @param {*} data
 * @returns
 */
export const getGoodsByIdApi = (data) => {
  return RuanRequest('/goods/list', data, 'get');
};

export const getUserCouponApi = (data) => {
  return RuanRequest('/coupon/getUserCoupon', data, 'get');
};

export const getHomeGoodsListApi = (data) => {
  return RuanRequest('/goods/homeList', data, 'get');
};

// 获取首页轮播图套餐
export const getFullHoursePackageApi = (data) => {
  return shopRequest('/goods/queryHomeSkuList', data, 'get');
};

/* -------------------------------------------------------------  全屋严选 ----------------------------------------------------------------------------- */
// 获取全屋套餐列表数据
export const getDesignCompanyListApi = (data) => {
  return shopRequest1('/wx/dtsDesignCom', data, 'get');
};

// 获取全屋套餐字典数据
export const getSysDictApi = (data) => {
  return shopRequest1('/sysDict', data, 'get');
};

// 获取公司详情
export const getDeginCompDetailApi = (brandId) => {
  return shopRequest1('/wx/dtsDesignCom/' + brandId, {}, 'get');
};

// 获取设计案例
export const getDesginCaseApi = (data) => {
  return shopRequest1('/wx/dtsDesignCase', data, 'get');
};
