import { endRequest } from "utils";

// /api/moduanServerProject/getServersByAddr 获取服务分页列表(根据位置)
export const getServersByAddr = (data) => endRequest({
    url: '/api/moduanServerProject/getServersByAddr',
    data,
    method: 'POST'
})

// /moduanServerProject/getNextLevelPage   // 获取下一层的服务分页列表
export const getNextLevelPage = (data) => endRequest({
    url: '/api/moduanServerProject/getNextLevelPage',
    data,
    method: 'GET'
})