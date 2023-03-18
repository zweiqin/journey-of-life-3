import { USER_TOKEN } from 'constant'
import { RuanRequest } from '../../utils'

/**
 * 门店分类
 * @param {*} data
 * @returns
 */
export const getBrandTypeApi = data => {
  return RuanRequest('/storeType/list', data, 'get')
}
/**
 * 门店列表
 * @param {*} data
 * @returns
 */
export const getBrandListApi = data => {
  return RuanRequest('/brand/list', data, 'get')
}

/**
 * 门店详情
 * @param {*} data
 * @returns
 */
export const getBrandDetailApi = data => {
  return RuanRequest('/brand/detail', data, 'get')
}
/**
 * 门店前十商品
 * @param {*} data
 * @returns
 */

export const getBrandListBySelectApi = data => {
  return RuanRequest('/brand/listBySelect', data, 'get')
}
/**
 * 根据门店id获取当前门店下产品分类
 * @param {*} data
 * @returns
 */
export const getCatalogIdByBrandApi = data => {
  return RuanRequest('/catalog/getCatalogIdByBrand', data, 'get')
}
/**
 * 门店风格
 * @param {*} data
 * @returns
 */

export const getBrandStyleListApi = data => {
  return RuanRequest('/brandStyle/list', data, 'get')
}

/**
 * 获取材料城接口
 */
export const getStuffBrandListApi = data => {
  return RuanRequest(
    '/newaterialcity/getNewMaterialCityList',
    data,
    'post',
    null,
    {
      'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN),
    }
  )
}

/**
 * 获取材料分类
 */
export const getMaterialBrandStyleListApi = data => {
  return RuanRequest(
    '/materialBrandStyle/getMaterialBrandStyleList',
    data,
    'post',
    null,
    {
      'X-Dts-Admin-Token': uni.getStorageSync(USER_TOKEN),
    }
  )
}
