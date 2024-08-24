import { MerProjectRequest } from '../../utils'

/**
 * @description 商家端接口
 */

// 点餐
// 创建点餐订单
export const createShopLaOrdersApi = (data) => MerProjectRequest('/shopLaOrders/create', data, 'POST')

// 下单
export const submitShopLaOrdersApi = (data) => MerProjectRequest('/shopLaOrders/submit', data, 'POST')

// 菜品添加
export const dishAddShopLaOrdersDishApi = (data) => MerProjectRequest('/shopLaOrdersDish/dishAdd', data, 'POST')

// 菜品+1
export const dishIncShopLaOrdersDishApi = (data) => MerProjectRequest('/shopLaOrdersDish/dishInc', data)

// 菜品-1
export const dishDecShopLaOrdersDishApi = (data) => MerProjectRequest('/shopLaOrdersDish/dishDec', data)

// 菜品清空
export const toEmptyShopLaOrdersDishApi = (data) => MerProjectRequest('/shopLaOrdersDish/toEmpty', data)
