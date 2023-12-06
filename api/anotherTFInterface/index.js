import { AnotherTFRequest } from '../../utils'

/**
 * @description 商城相关接口
 */

// 登录拿 新团蜂的 token
export const getAnotherTFTokenApi = (data) => AnotherTFRequest('/app/tmpLoginOrRegByPhone', data)

// 判断用户是否是商家
export const getIsShopByUserApi = (data) => AnotherTFRequest('/shop/getShopByUser', data)

// 查询地址一级分类
export const getCityManageAreaTreeClassApi = (data) => AnotherTFRequest('/cityManageArea/getTreeClass', data)

// 查询地址一级分类
export const getCityManageAreaTreeOneApi = (data) => AnotherTFRequest('/cityManageArea/getTreeOne', data)

// /classify/getClassifyProducts2 分类商品查询2
export const getClassifyProducts2Api = (data) => AnotherTFRequest('/classify/getClassifyProducts2', data)

// getClaasifyProducts 分类商品查询
export const getClaasifyProductsApi = (data) => AnotherTFRequest('/classify/getClaasifyProducts', data)

// /canvas/getCanvas  查询商品分类
export const getCanvasApi = (data) => AnotherTFRequest('/canvas/getCanvas', data)

// /canvas/getPrices  商家定价捆绑
export const getPricesCanvasApi = (data) => AnotherTFRequest('/canvas/getPrices', data)

// 查询会员商品数据
export const getMemberProductsCanvasApi = (data) => AnotherTFRequest('/canvas/getMemberProducts', data)

// /classify/getFirstClassify  查询店铺分类
export const getFirstClassifyApi = (data) => AnotherTFRequest('/classify/getFirstClassify', data)

// /product/getById  商品详情查询
export const getProductDetailsByIdApi = (data) => AnotherTFRequest('/product/getById', data)

// 查询商品sku详情
export const getProductsSkuApi = (data) => AnotherTFRequest('/product/getProducts', data)

// 优惠券商品列表查询
export const getCouponProductsApi = (data) => AnotherTFRequest('/coupon/getCouponProducts', data)

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

// 支付有礼
export const getOrderPoliteApi = (data) => AnotherTFRequest('/order/getOrderPolite', data)

// 账户信息查询
export const getPricePlatformAllApi = (data) => AnotherTFRequest('/distributor/getDistributor', data)

// 平台余额充值提交订单
export const addOrderSubmitUserRechargeApi = (data) => AnotherTFRequest('/order/submitUserRecharge', data, 'POST')

// 用户平台充值流水记录
export const getByAllBuyerUserRechargeLogApi = (data) => AnotherTFRequest('/buyerUserRechargeLog/getByAll', data, 'POST')

/**
 * @description 社区商圈相关接口
 */

// 关系链接口
// 各个等级申请
export const addPlatformRelationshipApplyApi = (data) => AnotherTFRequest('/platformRelationshipApply/apply', data, 'POST')

// 查询用户Code邀请二维码
export const getPlatformRelationshipCodeApi = (data) => AnotherTFRequest('/platformRelationshipCode/getCode', data)

// 用户绑定
export const bindPlatformRelationshipCodeApi = (data) => AnotherTFRequest('/platformRelationshipCode/bingCode', data)

// 查询平台关系等级管理
export const getPlatformRelationshipLevelApi = (data) => AnotherTFRequest('/platformRelationshipLevel/getAll', data)

// 每个等级统计
export const getStatisticsPlatformRelationshipApi = (data) => AnotherTFRequest('/platformRelationship/getStatistics', data)

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

// 消息
// 消息详情
export const getByIdNoticeMessageDateilsApi = (data) => AnotherTFRequest('/notice/getById', data)

// 消息已读
export const updateReadNoticeApi = (data) => AnotherTFRequest('/notice/readNotice', data, 'POST')

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

// 获取二维码和小程序码
export const getShareWorkApi = (data) => AnotherTFRequest('/work/getShare', data)

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
// 优惠券查询
export const getCanvasCouponsApi = (data) => AnotherTFRequest('/canvas/getCoupons', data)

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

// 首页广告
// 获取首页广告
export const getSelectByConditionAdvertApi = (data) => AnotherTFRequest('/advert/selectByCondition', data, 'POST')

// 关闭首页广告
export const updateCloseAdvertApi = (data) => AnotherTFRequest('/advert/closeAdvert', data, 'POST')

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

// 商家订单管理查询
export const getShopOrderAllApi = (data) => AnotherTFRequest('/shop/getShopOrderAll', data, 'POST')

// 商家统计
export const getShopStatisticsApi = (data) => AnotherTFRequest('/shop/getShopStatistics', data, 'POST')

// 查询绑定银行卡
export const getShopBankApi = (data) => AnotherTFRequest('/shop/getBank', data, 'POST')

// 商家财务统计
export const getShopFinanceCountApi = (data) => AnotherTFRequest('/shop/getFinanceCount', data, 'POST')

// 提现申请
export const addShopWithdrawalApi = (data) => AnotherTFRequest('/shop/withdrawal', data, 'POST')

// 提现明细查询
export const getShopWithdrawalDetailsApi = (data) => AnotherTFRequest('/shop/getWithdrawalDetails', data, 'POST')

// 商家充值财务统计
export const getShopRechargeCountApi = (data) => AnotherTFRequest('/shop/getRechargeCount', data, 'POST')

// 充值提现申请
export const addShopWithdrawalRechargeApi = (data) => AnotherTFRequest('/shop/withdrawalRecharge', data, 'POST')

// 商家的客户充值列表
export const getbBusinessByRechargeCustomApi = (data) => AnotherTFRequest('/businessRechargeCustomers/getByRechargeCustom', data, 'POST')

// 收款账户。商家银行卡
// 绑定账户
export const addBankSaveApi = (data) => AnotherTFRequest('/shopBank/save', data, 'POST')

// 更换账户
export const updateBankUpdateApi = (data) => AnotherTFRequest('/shopBank/update', data, 'POST')

// 解绑账户
export const deleteBankDeleteApi = (data) => AnotherTFRequest('/shopBank/delete', data, 'POST')

// 收款账户信息查询
export const getByIdBankApi = (data) => AnotherTFRequest('/shopBank/getById', data, 'POST')

// 字典下拉数据查询
export const getSelectDictApi = (data) => AnotherTFRequest('/dict/getSelect', data, 'POST')

// 获取短信验证码
export const getCodeBusinessApi = (data) => AnotherTFRequest('/app/getCode', data, 'POST')

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

// 问答详情查询
export const getProblemDetailApi = (data) => AnotherTFRequest('/seckill/getProblemDetail', data)

// 回答
export const addAnswerProblemApi = (data) => AnotherTFRequest('/seckill/addAnswer', data, 'POST')

// 提问
export const addProblemAnswerApi = (data) => AnotherTFRequest('/seckill/addProblem', data, 'POST')

// 我的问答
// 批量删除提问
export const deleteProblemAnswerApi = (data) => AnotherTFRequest('/seckill/deleteProblem', data, 'POST')

// 批量删除回答
export const deleteAnswerProblemApi = (data) => AnotherTFRequest('/seckill/deleteAnswer', data, 'POST')

// 我的提问
export const getProblemSeckillApi = (data) => AnotherTFRequest('/seckill/getProblem', data)

// 我的回答
export const getAnswerSeckillApi = (data) => AnotherTFRequest('/seckill/getAnswer', data)

// 拼团专区
// 拼团单结算查询
export const getGroupSettlementWorkApi = (data) => AnotherTFRequest('/work/getSettlement', data, 'POST')

// 邀请好友拼单查询
export const getInviteWorkApi = (data) => AnotherTFRequest('/work/getInvite', data, 'POST')

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
export const getFactoryDetailApi = (data) => AnotherTFRequest('/shop/getIndex2', data)

// 获取品牌工厂的分类
export const getFactoryClassApi = (data) => AnotherTFRequest('/shopCategoryMall/getShopCategoryLevel', data)

// 获取品牌工厂下级分类
export const getFactoryNextClassApi = (data) => AnotherTFRequest('/shopCategoryMall/getShopCategorySon', data)
// 查询热搜词
// 获取搜索栏的热门搜索
export const getSelectHotSearchApi = (data) => AnotherTFRequest('/app/selectHotSearch', data)
