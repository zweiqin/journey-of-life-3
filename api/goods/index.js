import { getUserId, RuanRequest, shopRequest } from '../../utils';

/**
 * @description 查询商品详情
 * @param {*} id 商品id
 */

export const getGoodsDetailApi = (id, userId) => RuanRequest('/goods/detail', { id, userId }, 'get');

/**
 * @description 收藏操作
 * @param {
 *    userId: Number,
 *    type: Number 如果是0则是商品收藏，如果是1则是专题收藏
 *    valueId: Number 类型为0：商品id，类型为1：专题id
 * } data
 */

export const collectionApi = (data) => RuanRequest('/collect/addordelete', data);

/**
 * @description 大家都在看
 * @param {*} categoryId
 * @returns
 */

export const everyLookApi = (categoryId) => RuanRequest('/goods/related', { id: categoryId }, 'get');

/**
 * @description 获取购物车数据
 * @returns
 */

export const getShopCarApi = () =>
  RuanRequest(
    '/cart/index',
    {
      userId: getUserId()
    },
    'get'
  );

/**
 * @description 添加购物车
 * @param {
 *  "userId": 219,
 *  "goodsId": 1,
 *  "productId": 1,
 *  "number": 1
 * } data
 * @returns
 */

export const addShopCarApi = (data) => RuanRequest('/cart/add', data);

/**
 * @description 获取购物车数量
 * @returns
 */

export const getCarShopNumberApi = () => RuanRequest('/cart/goodscount', { userId: getUserId() }, 'get');

// 提交订单
export const submitOrderApi = (data) => RuanRequest('/order/submit', data);

// 快速添加购物车
export const firstAddCar = (data) => RuanRequest('/cart/fastadd', data);

// H5支付
export const payOrderGoodsApi = (data) => shopRequest('/api/syb/orderPayH5', data);

// APP支付
export const payOrderGoodsAPPApi = (data) => shopRequest('/api/syb/getSybPaySign', data);

export const commonPayConfig = {
  h5Api: payOrderGoodsApi,
  otherPlatformApi: payOrderGoodsAPPApi
};

// 获取门店下各类目的商品销量排行榜
export const goodsMaxSaleGoodsApi = (data) => RuanRequest('/goods/maxSaleGoods', data, 'get');
// 获取当前门店的商品
export const goodsListApi = (data) => shopRequest('/goods/list', data, 'get');

// 查询材质列表
export const getGoodsTextureListApi = (data) => shopRequest('/goods/goodsTextureList', data, 'get');

// 查询风格列表
export const getStyleListApi = (data) => shopRequest('/goods/goodsStyleList', data, 'get');

// 查询产地列表
export const getProductPlaceList = (data) => shopRequest('/goods/productPlaceList', data, 'get');

// 获取搜索历史
export const getUserSearchHistoryApi = (data) => shopRequest('/search/index', data, 'get');

// 清除
export const clearSearchSearchHistoryApi = (data) => shopRequest('/search/clearhistory', data);

// 查看会员价
export const watchVipPriceApi = (data) => shopRequest('/goods/getGoodsVipPrice', data, 'get');

// 查询当前可用优惠劵
export const getCanUseCouponListApi = (data) => shopRequest('/coupon/selectlist', data, 'get');

// 查询商品的评价
export const getGoodsCommentListApi = (data) => shopRequest('/dtsCommentGoods/selectGoodsPj', data, 'get');

// 获取代金券类型
export const getVoucherTypeListApi = (data) => shopRequest('/voucher/getVoucher', data, 'get');

// 代金券预付款
export const payVoucherPreApi = (data) => shopRequest('/voucherRecord/prepayBySyb', data);

// 获取代金券充值列表
export const getVoucherRechargeHistoryListApi = (data) => shopRequest('/voucher/getVoucherOrder', data, 'get');

// 代金券转赠
export const voucherTransferApi = (data) => shopRequest('/voucher/circula', data, 'post');

// 代金券转赠记录
export const voucherTransferHistoryApi = (data) => shopRequest('/voucher/getVoucherCircula', data, 'get');
