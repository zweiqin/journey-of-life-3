import { RuanRequest } from "../../utils";

/**
 * @description 获取材料的分类列表
 * @param {
 *  id  {String} 二级分类类目,
 *  goodsType {String}  1-家具 2-材料
 * } data
 * @returns
 */
export const getStuffListApi = (data) => {
  return RuanRequest("/catalog/index", data, 'get');
};
