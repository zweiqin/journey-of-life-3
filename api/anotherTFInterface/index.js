import { AnotherTFRequest } from '@/utils/AnotherTFRequest.js'

// 登录拿 新团蜂的 token
export const getAnotherTFToken = (data) => AnotherTFRequest('/app/tmpLoginOrRegByPhone', data, 'GET')
