import { AnotherTFRequest } from '../../utils'

/**
 * @description 商城相关接口
 */

// 登录拿 新团蜂的 token
export const getAnotherTFTokenApi = (data) => AnotherTFRequest('/app/tmpLoginOrRegByPhone', data, 'GET')

// /classify/getClassifyProducts2 分类商品查询
export const getClassifyProducts2Api = (data) => AnotherTFRequest('/classify/getClassifyProducts2', data, 'GET')

// /canvas/getCanvas  查询商品分类
export const getCanvasApi = (data) => AnotherTFRequest('/canvas/getCanvas', data, 'GET')

// /classify/getFirstClassify  查询店铺分类
export const getFirstClassifyApi = (data) => AnotherTFRequest('/classify/getFirstClassify', data, 'GET')

// /product/getById  商品详情查询
export const getProductDetailsByIdApi = (data) => AnotherTFRequest('/product/getById', data, 'GET')

// /app/getSearchProducts  商品搜索查询
export const getSearchProductsApi = (data) => AnotherTFRequest('/app/getSearchProducts', data, 'GET')

/**
 * @description 社区商圈相关接口
 */

// 店铺首页查询，查询店铺详情
export const getIndexShopDetailApi = (data) => AnotherTFRequest('/shop/getIndex', data)

// 查询店铺分类
export const getShopCategoryLevelApi = (data) => AnotherTFRequest('/shopCategory/getShopCategoryLevel', data, 'GET')

// 查询店铺父级分类查询子级分类
export const getShopCategorySonApi = (data) => AnotherTFRequest('/shopCategory/getShopCategorySon', data, 'GET')

