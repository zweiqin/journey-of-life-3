/*
 */

import { RuanRequest } from '../../utils'

/**
 *
 * @param {查客服列表} data
 * @returns
 */

export const queryCustomer = (data) => RuanRequest('/messageList/customerList', data, 'get')

// /**
//  *
//  * @param {创建聊天} data
//  * @returns
//  */

// export const createChat = (data) => RuanRequest('/ws/createChat', data, 'get')

/**
 *
 * @param {聊天列表} data
 * @returns
 */

export const queryChatList = (data) => RuanRequest('/messageList/getMessageList', data, 'get')

/**
 *
 * @param {查消息} data
 * @returns
 */

export const queryChatMessage = (data) => RuanRequest('/messageList/getMessageDetailsList', data, 'get')
// export const queryChatMessageBack = (data) => RuanRequest('/ws/queryChatMessage2', data, 'get')

/**
 *
 * @param {新增聊天对象} data
 * @returns
 */

export const addChatMessage = (data) => RuanRequest('/messageList/addMessage', data, 'post')
