import { AnotherTFRequest } from '../../utils'

/**
 * @description 商城相关接口
 */

// 登录拿 新团蜂的 token
export const getAnotherTFTokenApi = (data) => AnotherTFRequest('/app/tmpLoginOrRegByPhone', data)

// /classify/getClassifyProducts2 分类商品查询2
export const getClassifyProducts2Api = (data) => AnotherTFRequest('/classify/getClassifyProducts2', data)

// getClaasifyProducts 分类商品查询
export const getClaasifyProductsApi = (data) => AnotherTFRequest('/classify/getClaasifyProducts', data)

// /canvas/getCanvas  查询商品分类
export const getCanvasApi = (data) => AnotherTFRequest('/canvas/getCanvas', data)

// /canvas/getPrices  商家定价捆绑
export const getPricesCanvasApi = (data) => AnotherTFRequest('/canvas/getPrices', data)

// /classify/getFirstClassify  查询店铺分类
export const getFirstClassifyApi = (data) => AnotherTFRequest('/classify/getFirstClassify', data)

// /product/getById  商品详情查询
export const getProductDetailsByIdApi = (data) => AnotherTFRequest('/product/getById', data)

// /app/getSearchProducts  商品搜索查询
export const getSearchProductsApi = (data) => AnotherTFRequest('/app/getSearchProducts', data)

// 查询最近的N条历史记录
export const getSearchHistoryApi = (data) => AnotherTFRequest('/app/getHistory', data)

// 清空历史搜索记录
export const deleteProductAllSearchApi = (data) => AnotherTFRequest('/product/deleteAllSearch', data, 'POST')

// 删除搜索记录
export const deleteSearchRecordApi = (data) => AnotherTFRequest('/app/deleteSearch', data, 'POST')

// 获取热门推荐
export const getRandomSortProductApi = (data) => AnotherTFRequest('/product/getRandomSortProduct', data)

// 查询用户所有收货地址
export const getAllReceiveAddressApi = (data) => AnotherTFRequest('/receive/getAll', data)

// 修改收货地址查询
export const getReceiveAddressByIdApi = (data) => AnotherTFRequest('/receive/getById', data)

// 更新收货地址
export const updateReceiveAddressApi = (data) => AnotherTFRequest('/receive/update', data, 'POST')

// 保存收货地址
export const addReceiveAddressApi = (data) => AnotherTFRequest('/receive/save', data, 'POST')

// 删除收货地址
export const deleteReceiveAddressApi = (data) => AnotherTFRequest('/receive/delete', data, 'POST')

/**
 * @description 社区商圈相关接口
 */

// 购物车
// 商家购物车查询
export const getShopCartApi = (data) => AnotherTFRequest('/cart/getShopCart', data)

// 购物车列表
export const getCartListApi = (data) => AnotherTFRequest('/cart/getCart', data)

// 修改购物车商品数量
export const updateNumberCartGoodsApi = (data) => AnotherTFRequest('/cart/updateNumber', data, 'POST')

// 删除购物车商品
export const deleteCartGoodsApi = (data) => AnotherTFRequest('/cart/delete', data, 'POST')

// 店铺首页查询，查询店铺详情
export const getIndexShopDetailApi = (data) => AnotherTFRequest('/shop/getIndex', data)

// 查询店铺分类
export const getShopCategoryLevelApi = (data) => AnotherTFRequest('/shopCategory/getShopCategoryLevel', data)

// 查询店铺父级分类查询子级分类
export const getShopCategorySonApi = (data) => AnotherTFRequest('/shopCategory/getShopCategorySon', data)

// 附近商家
export const getHomeBrandListApi = (data) => AnotherTFRequest('/shop/getShopAll', data, 'POST')

// 获取邀请码
export const getUserInfoCodeApi = (data) => AnotherTFRequest('/user/getInfoCode', data)

// 用户扫码绑定
export const bindPlatformInfoCodeBindingApi = (data) => AnotherTFRequest('/platformInfoCode/saoMaBinding', data, 'POST')

// 我的收藏
// 取消收藏
export const collectCancelApi = (data) => AnotherTFRequest('/collect/cancel', data, 'POST')
// 取消收藏
export const collectCancelPUTApi = (data) => AnotherTFRequest('/collect/cancel', data, 'PUT')

// 收藏商品、店铺
export const collectToCollectApi = (data) => AnotherTFRequest('/collect/collect', data, 'POST')

// 购物车
// 绑定关系
export const addCartShoppingApi = (data) => AnotherTFRequest('/cart/addCart', data, 'POST')

// 分销中心
// 验证当前客户是否为分销员
export const checkDistributorHasApplyApi = (data) => AnotherTFRequest('/distributor/check', data)

// 绑定关系
export const bindDistributorSalesCustomerApi = (data) => AnotherTFRequest('/distributor/bind', data, 'POST')

// 分享
export const getProductSharePicApi = (data) => AnotherTFRequest('/product/getSharePic', data)

// 拼团滚动数据
export const getBroadCastList = (data) => AnotherTFRequest('/', data)

// 申请分销员
export const addDistributorApplyApi = (data) => AnotherTFRequest('/distributor/addDistributor', data, 'POST')

// 查询店铺分类
export const getShopClassifyApi = (data) => AnotherTFRequest('/shop/getShopClassify', data)

// 根据id查询店铺
export const getShopProductsApi = (data) => AnotherTFRequest('/shop/getShopProducts', data)

// 查询店铺banner
export const getShopBannerApi = (data) => AnotherTFRequest('/shop/getShopBanner', data)

// 查询直播间列表
export const getCanvasSelectLiveListApi = (data) => AnotherTFRequest('/canvas/selectLiveList', data)
export const getsubscribeLiveApi = (data) => AnotherTFRequest('/live/subscribeLive', data, 'POST')

// 成为商家的客户
export const addShopBusinessBuyerUserApi = (data) => AnotherTFRequest('/shop/addBusinessBuyerUser', data, 'POST')

// 小程序客服查询
export const getCustomerServiceAppletKfApi = (data) => AnotherTFRequest('/kf/getAppletKf', data)

// 售后
// 售后列表查询
export const getAllFindReturnListApi = (data) => AnotherTFRequest('/after/getAll', data)

// 售后详情查询
export const getReturnDetailByIdApi = (data) => AnotherTFRequest('/after/getById', data)

// 撤销退款
export const updateCancelReturnRefundApi = (data) => AnotherTFRequest('/after/returnRefund', data, 'POST')

// 撤销退货
export const updateCancelReturnGoodsApi = (data) => AnotherTFRequest('/after/returnGoods', data, 'POST')

// 申请平台介入
export const applyAfterPlatformApi = (data) => AnotherTFRequest('/after/platform', data, 'POST')

// 删除售后记录
export const updateDeleteAfterRecordApi = (data) => AnotherTFRequest('/after/deleteAfter', data, 'POST')

// 选择快递公司查询
export const getExpressSelectShippingCompanyApi = (data) => AnotherTFRequest('/order/getExpressSelect', data)

// 填写退货物流单
export const updateSendGoodsReturnExpressApi = (data) => AnotherTFRequest('/order/returnExpress', data, 'POST')

// 优惠券
// 领取优惠券
export const updateTakeCouponReceiveApi = (data) => AnotherTFRequest('/coupon/takeCoupon', data, 'POST')

// 领取优惠券
export const updateCouponBuildParam4PlugApi = (data) => AnotherTFRequest('/coupon/buildParam4Plug', data, 'POST')

// 首页广告
// 成为商家的客户
export const addTakeBatchCouponApi = (data) => AnotherTFRequest('/coupon/takeBatchCoupon', data, 'POST')

// 积分签到
// 积分兑换优惠券
export const updateCreditExchangeCouponApi = (data) => AnotherTFRequest('/credit/exchangeCoupon', data, 'POST')

// 订单相关接口，查询订单列表
export const getAllOrderListApi = (data) => AnotherTFRequest('/order/getAll', data)

// 订单详情查询
export const getOrderDetailApi = (data) => AnotherTFRequest('/order/getById', data)

// 删除订单
export const deleteShopOrderApi = (data) => AnotherTFRequest('/order/delete', data, 'POST')

// 取消订单
export const cancelShopOrderApi = (data) => AnotherTFRequest('/order/cancel', data, 'POST')

// 物流信息查询
export const getOrderDileveryShippingTraceApi = (data) => AnotherTFRequest('/order/getDilevery', data)

// 生成用户订单的核销码
export const getOrderVerificationHxCodeApi = (data) => AnotherTFRequest('/orderVerificationCode/getHxCode', data)

// 核销订单
export const updateSetHxCodeApi = (data) => AnotherTFRequest('/order/write', data, 'POST')

// 确认收货
export const updateOrderConfirmApi = (data) => AnotherTFRequest('/order/confirm', data, 'POST')

// 申请退款
export const getOrderRefundApi = (data) => AnotherTFRequest('/order/refund', data)

// APP立即支付
export const gotoOrderAppPayApi = (data) => AnotherTFRequest('/order/gotoAppPay', data, 'POST')

// 商城订单
// 通联H5支付
export const gotoOrderH5PayApi = (data) => AnotherTFRequest('/order/gotoH5Pay', data, 'POST')

// 小程序支付
export const gotoOrderPayApi = (data) => AnotherTFRequest('/order/gotoPay', data, 'POST')

// 小程序支付成功
export const payOrderSuccessApi = (data) => AnotherTFRequest('/order/paySuccess', data, 'POST')

// 查询花呗手续费配置
export const getOrderHuabeiConfigApi = (data) => AnotherTFRequest('/order/getHuabeiConfig', data)

// 服务协议-查询分类层级
export const getQueryDictByNameApi = (data) => AnotherTFRequest('/dict/getByName', data)

// 结算查询
export const getSettlementOrderApi = (data) => AnotherTFRequest('/order/getSettlement', data, 'POST')

// 提交订单
export const updatePlaceOrderSubmitApi = (data) => AnotherTFRequest('/order/submit', data, 'POST')

// 秒杀专区
// 商品问答数据查询
export const getProblemsSeckillApi = (data) => AnotherTFRequest('/seckill/getProblems', data)

// 拼团专区
// 拼团单结算查询
export const getGroupSettlementWorkApi = (data) => AnotherTFRequest('/work/getSettlement', data, 'POST')

// 评价
// 点赞或取消点赞某个评论
export const updateLikeOrUnLikeCommentApi = (data) => AnotherTFRequest('/comment/like', data, 'POST')

// 查询组合套餐
export const getProductSelectComposeApi = (data) => AnotherTFRequest('/product/selectCompose', data)

// 提交订单
export const addUserTrackReportDoPointerApi = (data) => AnotherTFRequest('/user/trackReport', data, 'POST')

// 获取品牌工厂列表
export const getFactoryListApi = (data) => AnotherTFRequest('/shop/getShopAll2', data, 'post')

// 获取工厂详情
export const getFactoryDetailApi = data => AnotherTFRequest('/shop/getIndex2', data)

// 获取品牌工厂的分类
export const getFactoryClassApi = data => AnotherTFRequest('/shopCategoryMall/getShopCategoryLevel', data)

// 获取品牌工厂下级分类
export const getFactoryNextClassApi = data => AnotherTFRequest('/shopCategoryMall/getShopCategorySon', data)
// 查询热搜词
// 获取搜索栏的热门搜索
export const getSelectHotSearchApi = (data) => AnotherTFRequest('/app/selectHotSearch', data)
