import { request } from "../../utils";

/**
 * 获取首页商品列表
 * @returns 
 */
export const getIndexDataApi = () => {
  return request("/home/index", null, 'get');
};
