import { AnotherTFRequest } from '../../utils'

// 登录拿 新团蜂的 token
export const getAnotherTFToken = (data) => AnotherTFRequest('/app/tmpLoginOrRegByPhone', data, 'GET')

// /classify/getClassifyProducts2 分类商品查询
export const getClassifyProducts2 = (data) => AnotherTFRequest('/classify/getClassifyProducts2', data, 'GET')

// /canvas/getCanvas  查询商品分类
export const getCanvas = (data) => AnotherTFRequest('/canvas/getCanvas', data, 'GET')

// /classify/getFirstClassify  查询店铺分类
export const getFirstClassify = (data) => AnotherTFRequest('/classify/getFirstClassify', data, 'GET')

// /product/getById  商品详情查询
export const getShopDetailsById = (data) => AnotherTFRequest('/product/getById', data, 'GET')

// /app/getSearchProducts  商品搜索查询
export const getSearchProducts = (data) => AnotherTFRequest('/app/getSearchProducts', data, 'GET')

// /LoginController/tmpLoginOrRegByPhone 手机号登录或注册(临时接口)
export const tmpLoginOrRegByPhone = (data) => AnotherTFRequest('/LoginController/tmpLoginOrRegByPhone', data, 'GET')
