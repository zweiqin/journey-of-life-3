/*
 * 
 *    ┏┓　　　┏┓
 *  ┏┛┻━━━┛┻┓
 *  ┃　　　　　　　┃
 *  ┃　　　━　　　┃
 *  ┃　＞　　　＜　┃
 *  ┃　　　　　　　┃
 *  ┃...　⌒　...　┃
 *  ┃　　　　　　　┃
 *  ┗━┓　　　┏━┛
 *      ┃　　　┃　
 *      ┃　　　┃
 *      ┃　　　┃
 *      ┃　　　┃  神兽保佑
 *      ┃　　　┃  代码无bug　　
 *      ┃　　　┃
 *      ┃　　　┗━━━┓
 *      ┃　　　　　　　┣┓
 *      ┃　　　　　　　┏┛
 *      ┗┓┓┏━┳┓┏┛
 *        ┃┫┫　┃┫┫
 *        ┗┻┛　┗┻┛
 */


import { newTFrequest } from '@/utils/NewTFRequest.js'

// 登录拿 新团蜂的 token
export const getNewTFUserToken = (data) => newTFrequest('/app/tmpLoginOrRegByPhone', data, 'GET')

// /classify/getClassifyProducts2 分类商品查询
export const getClassifyProducts2 = (data) => newTFrequest('/classify/getClassifyProducts2', data, 'GET')

// /canvas/getCanvas  查询商品分类
export const getCanvas = (data) => newTFrequest('/canvas/getCanvas', data, 'GET')

// /classify/getFirstClassify  查询店铺分类
export const getFirstClassify = (data) => newTFrequest('/classify/getFirstClassify', data, 'GET')
 
// /product/getById  商品详情查询
export const getShopDetailsById = (data) => newTFrequest('/product/getById', data, 'GET')

// /app/getSearchProducts  商品搜索查询
export const getSearchProducts = (data) => newTFrequest('/app/getSearchProducts', data, 'GET')

// /LoginController/tmpLoginOrRegByPhone 手机号登录或注册(临时接口)
export const tmpLoginOrRegByPhone = (data) => newTFrequest('/LoginController/tmpLoginOrRegByPhone', data, 'GET')
