import { endRequest } from "utils";

// /moduanServerProject/getNextLevelPage   // 获取下一层的服务分页列表
export const getNextLevelPage = (params) => endRequest({
    url: 'api/moduanServerProject/getNextLevelPage',
    params,
    method: 'GET'
})