import { RuanRequest } from "../../utils";

/**
 * 获取首页商品列表
 * @returns
 */
export const getIndexDataApi = () => {
  return RuanRequest("/home/index", null, "get");
};
