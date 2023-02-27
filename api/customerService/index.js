/*
 */

import { RuanRequest } from '../../utils'

// /**
//  * 购物车添加
//  * @returns
//  */
// export const getCartAddApi = (data) => {
//     return RuanRequest("/cart/add", data)
// };
/**
 *
 * @param {查客服列表} data
 * @returns
 */

export const queryCustomer = (data) => RuanRequest('/ws/queryCustomer', data, 'get')

/**
 *
 * @param {创建聊天} data
 * @returns
 */

export const createChat = (data) => RuanRequest('/ws/createChat', data, 'get')

/**
 *
 * @param {聊天列表} data
 * @returns
 */

export const queryChatList = (data) => RuanRequest('/ws/queryChatList', data, 'get')

/**
 *
 * @param {查消息} data
 * @returns
 */

export const queryChatMessage = (data) => RuanRequest('/ws/queryChatMessage', data, 'get')
export const queryChatMessageBack = (data) => RuanRequest('/ws/queryChatMessage2', data, 'get')
