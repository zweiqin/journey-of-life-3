import { newTFrequest } from '@/utils/NewTFRequest.js'

// 登录拿 新团蜂的 token
export const getNewTFUserToken = (data) => newTFrequest('/app/tmpLoginOrRegByPhone', data, 'GET')