import { getUserId, RuanRequest } from "../../utils";

/**
 * @description 查询商品详情
 * @param {*} id 商品id
 */
export const getGoodsDetailApi = (id) => {
  return RuanRequest("/goods/detail", { id: id, userId: getUserId() }, "get");
};

/**
 * @description 收藏操作
 * @param {
 *    userId: Number,
 *    type: Number 如果是0则是商品收藏，如果是1则是专题收藏
 *    valueId: Number 类型为0：商品id，类型为1：专题id
 * } data
 */
export const collectionApi = (data) => {
  return RuanRequest("/collect/addordelete", data);
};
