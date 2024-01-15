import { AnotherTFRequest } from '../../utils'

/**
 * @description 商城相关接口
 */

// 登录拿 新团蜂的 token
export const getAnotherTFTokenApi = (data) => AnotherTFRequest('/app/tmpLoginOrRegByPhone', data)

// 获取支付宝小程序手机号绑定
export const updateAliPhoneAppApi = (data) => AnotherTFRequest('/app/updateAliPhone', data, 'POST')

// 获取短信验证码
export const getCodeBusinessApi = (data) => AnotherTFRequest('/app/getCode', data, 'POST')

// 获取短信验证码
export const getVerifyCodeApi = (data) => AnotherTFRequest('/app/getCode', data)

// 手机号验证码登录、注册
export const updatePhoneLoginRegisterApi = (data) => AnotherTFRequest('/app/login', data, 'POST')

// 支付宝登录
export const updateAlipayLoginApi = (data) => AnotherTFRequest('/app/alipayLogin', data, 'POST')

// 微信登录
export const updateWXLoginApi = (data) => AnotherTFRequest('/app/wxLogin', data, 'POST')

// APP微信登录
export const updateWXAppLoginApi = (data) => AnotherTFRequest('/app/wxAppLogin', data, 'POST')

// 获取微信手机号绑定
export const getSessionKeyAppApi = (data) => AnotherTFRequest('/app/getSessionKey', data, 'POST')

// 获取微信手机号绑定
export const updateSetWxPhoneAppApi = (data) => AnotherTFRequest('/app/setWxPhone', data, 'POST')

// 获取微信手机号绑定
export const updateWxPhoneAppApi = (data) => AnotherTFRequest('/app/updateWxPhone', data, 'POST')

// 判断用户是否是商家
export const getIsShopByUserApi = (data) => AnotherTFRequest('/shop/getShopByUser', data)

// 账户注销
export const deleteUserInfoApi = (data) => AnotherTFRequest(`/user/delUser/${data.code}`, data, 'DELETE')

// 个人系信息查询
export const getUserInfoApi = (data) => AnotherTFRequest('/user/getUser', data)

// 个人系信息修改
export const updateUserInfoApi = (data) => AnotherTFRequest('/user/update', data, 'POST')

// 修改密码
export const updatePasswordUserApi = (data) => AnotherTFRequest('/user/updatePassword', data, 'POST')

// 用户信息查询，用户代金券查询(新)
export const getBandUserInfoApi = (data) => AnotherTFRequest('/user/getBandUser', data)

// 用户粉丝统计+列表
export const getUserListUserApi = (data) => AnotherTFRequest('/user/getUserList', data)

// 用户佣金统计+记录
export const getCommissionUserApi = (data) => AnotherTFRequest('/user/getCommission', data)

// 绑定的策划师或分公司角色信息
export const getPlatformUserUserApi = (data) => AnotherTFRequest('/user/getPlatformUser', data)

// 获取绑定的商家信息
export const getPlatformShopUserApi = (data) => AnotherTFRequest('/user/getPlatformShop', data)

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

// 提现申请
export const updateSaveDistributorWithdrawApi = (data) => AnotherTFRequest('/distributor/save', data, 'POST')

/**
 * @description 社区商圈相关接口
 */

// 画布模块
// 选择商品查询
export const getProducts2CanvasApi = (data) => AnotherTFRequest('/canvas/getProducts2', data)

// 关系链接口
// 各个等级申请
export const addPlatformRelationshipApplyApi = (data) => AnotherTFRequest('/platformRelationshipApply/apply', data, 'POST')

// 查询用户Code邀请二维码
export const getPlatformRelationshipCodeApi = (data) => AnotherTFRequest('/platformRelationshipCode/getCode', data)

// 用户绑定
export const bindPlatformRelationshipCodeApi = (data) => AnotherTFRequest('/platformRelationshipCode/bingCode', data)

// 加盟商绑定商家业务
export const bindPlatformRelationshipShopApi = (data) => AnotherTFRequest('/platformRelationship/bingShop', data)

// 查询平台关系等级管理
export const getPlatformRelationshipLevelApi = (data) => AnotherTFRequest('/platformRelationshipLevel/getAll', data)

// 每个等级统计
export const getStatisticsPlatformRelationshipApi = (data) => AnotherTFRequest('/platformRelationship/getStatistics', data)

// 查询升级产品
export const getSelectProductPlatformRelationApi = (data) => AnotherTFRequest('/platformRelationshipApply/selectProduct', data, 'POST')

// 查询用户是否存在申请
export const getSelectApplyPlatformRelationApi = (data) => AnotherTFRequest('/platformRelationshipApply/selectApply', data)

// 查询是否满足升级条件
export const getSelectLevelPlatformRelationApi = (data) => AnotherTFRequest('/platformRelationshipApply/selectLevel', data, 'POST')

// 佣金金额统计
export const getStatisticsAmountRelationshipApi = (data) => AnotherTFRequest('/platformRelationship/getStatisticsAmount', data, 'POST')

// 佣金金额记录
export const getStatisticsRecordRelationshipApi = (data) => AnotherTFRequest('/platformRelationship/getStatisticsRecord', data, 'POST')

// 加盟商统计模块
export const getFranchiseeStatisticsApi = (data) => AnotherTFRequest('/platformFranchiseeBinding/franchiseeStatistics', data, 'POST')

// （加盟商粉丝）商家列表
export const getPlatformFranchiseeShopListApi = (data) => AnotherTFRequest('/platformFranchiseeBinding/shopList', data, 'POST')

// 每个商家收益列表
export const getPlatformFranchiseeIncomeApi = (data) => AnotherTFRequest('/platformFranchiseeBinding/shopListIncome', data, 'POST')

// 加盟商统计模块2
export const getPlatformFranchiseeStatisticsApi = (data) => AnotherTFRequest('/platformFranchiseeBinding/franchiseeStatistics2', data, 'POST')

// 加盟商商家统计列表
export const getFranchiseeShopListApi = (data) => AnotherTFRequest('/platformFranchiseeBinding/franchiseeShopList', data, 'POST')

// 加盟商团长合伙人统计列表
export const getFranchiseeCommanderListApi = (data) => AnotherTFRequest('/platformFranchiseeBinding/franchiseeTZList', data, 'POST')

// 会员中心
// 会员权益查询
export const getMemberShipListApi = (data) => AnotherTFRequest('/member/getMemberShipList', data)

// 查询会员所有等级
export const getAllMemberLevelInfoApi = (data) => AnotherTFRequest('/member/getAllMemberLevelInfo', data)

// 会员图标
export const getMemberByMemberLevelIdApi = (data) => AnotherTFRequest(`/member/getMemberByMemberLevelId/${data.memberLevelId}`, data)

// 查询签到列表
export const getSelectSigninRecordListApi = (data) => AnotherTFRequest('/member/selectSigninRecordList', data)

// 查询签到明细
export const getSelectSigninHistoryApi = (data) => AnotherTFRequest('/member/selectSigninHistory', data)

// 签到
export const updateMemberSignInApi = (data) => AnotherTFRequest('/member/signIn', data, 'POST')

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
export const updateCollectCancelApi = (data) => AnotherTFRequest('/collect/cancel', data, 'POST')
// 取消收藏
export const updateCollectCancelPUTApi = (data) => AnotherTFRequest('/collect/cancel', data, 'PUT')

// 收藏商品、店铺
export const updateCollectToCollectApi = (data) => AnotherTFRequest('/collect/collect', data, 'POST')

// 批量删除收藏商品、店铺
export const deleteCollectToCollectApi = (data) => AnotherTFRequest('/collect/delete', data, 'POST')

// 收藏商品查询
export const getAllProductCollectApi = (data) => AnotherTFRequest('/collect/getAllProduct', data)

// 收藏店铺查询
export const getAllShopStoreCollectApi = (data) => AnotherTFRequest('/collect/getAllShop', data)

// 浏览足迹
// 删除足迹
export const deleteFootprintApi = (data) => AnotherTFRequest('/footprint/delete', data, 'POST')

// 我的足迹查询
export const getAllFootprintApi = (data) => AnotherTFRequest('/footprint/getAll', data)

// 消息
// 消息列表查询
export const getAllNoticeMessageApi = (data) => AnotherTFRequest('/notice/getAll', data)

// 消息详情
export const getByIdNoticeMessageDateilsApi = (data) => AnotherTFRequest('/notice/getById', data)

// 消息已读
export const updateReadNoticeApi = (data) => AnotherTFRequest('/notice/readNotice', data, 'POST')

// 删除消息
export const deleteRemoveByIdNoticeApi = (data) => AnotherTFRequest('/notice/removeById', data, 'POST')

// 全部已读
export const updateReadAllNoticeApi = (data) => AnotherTFRequest('/notice/readAll', data, 'POST')

// 购物车
// 绑定关系
export const addCartShoppingApi = (data) => AnotherTFRequest('/cart/addCart', data, 'POST')

// 分销中心
// 分销中心列表查询
export const getDistributorAllShopApi = (data) => AnotherTFRequest('/distributor/getDistributorAll', data)

// 店铺分销数据查询
export const getShopDistributorSalesMainInfoApi = (data) => AnotherTFRequest('/distributor/getShopDistributor', data)

// 累计奖励查询
export const getRewardDistributorApi = (data) => AnotherTFRequest('/distributor/getReward', data)

// 累计未结算奖励查询
export const getNotRewardDistributorApi = (data) => AnotherTFRequest('/distributor/getNotReward', data)

// 累计客户查询
export const getBuyersDistributorApi = (data) => AnotherTFRequest('/distributor/getBuyers', data)

// 累计分销员查询
export const getDistributorsDistributorApi = (data) => AnotherTFRequest('/distributor/getDistributors', data)

// 分销订单查询
export const getDistributorOrderApi = (data) => AnotherTFRequest('/distributor/getDistributorOrder', data)

// 验证当前客户是否为分销员
export const checkDistributorHasApplyApi = (data) => AnotherTFRequest('/distributor/check', data)

// 推广商品查询
export const getExtensionProductDistributorApi = (data) => AnotherTFRequest('/distributor/getExtensionProduct', data)

// 绑定关系
export const bindDistributorSalesCustomerApi = (data) => AnotherTFRequest('/distributor/bind', data, 'POST')

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

// 推广店铺
export const getSharePicShopApi = (data) => AnotherTFRequest('/shop/getSharePic', data)

// 分享
export const getProductSharePicApi = (data) => AnotherTFRequest('/product/getSharePic', data)

// 查询直播间列表
export const getCanvasSelectLiveListApi = (data) => AnotherTFRequest('/canvas/selectLiveList', data)
export const getsubscribeLiveApi = (data) => AnotherTFRequest('/live/subscribeLive', data, 'POST')

// 成为商家的客户
export const addShopBusinessBuyerUserApi = (data) => AnotherTFRequest('/shop/addBusinessBuyerUser', data, 'POST')

// 小程序客服查询
export const getCustomerServiceAppletKfApi = (data) => AnotherTFRequest('/kf/getAppletKf', data)

// 查询H5客服
export const getCustomerServiceH5KfApi = (data) => AnotherTFRequest('/kf/getH5Kf', data)

// 查询PC客服
export const getCustomerServicePCKfApi = (data) => AnotherTFRequest('/kf/getPCKf', data)

// 查询商家客服列表
export const getAllCustomerServiceApi = (data) => AnotherTFRequest('/kf/getAll', data)

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

// 获取退款金额
export const getReturnPriceRefundMoneyApi = (data) => AnotherTFRequest('/after/getReturnPrice', data, 'POST')

// 选择退款原因查询
export const getReasonSelectEnumsApi = (data) => AnotherTFRequest('/after/getReasonSelect', data)

// 申请售后
export const updateApplyReturnMoneySubmitApi = (data) => AnotherTFRequest('/after/submit', data, 'POST')

// 优惠券
// 优惠券查询
export const getCanvasCouponsApi = (data) => AnotherTFRequest('/canvas/getCoupons', data)

// 我的卡券列表查询
export const getCouponsCouponApi = (data) => AnotherTFRequest('/coupon/getCoupons', data)

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

// 积分签到
export const updateCreditSignInApi = (data) => AnotherTFRequest('/credit/signIn', data, 'POST')

// 根据月份查询签到记录
export const updateCreditSelectByMonthApi = (data) => AnotherTFRequest('/credit/selectByMonth', data, 'POST')

// 查询可以积分兑换的优惠券
export const getSelectCreditCouponListApi = (data) => AnotherTFRequest('/credit/selectCreditCouponList', data, 'POST')

// 查询积分记录
export const getSelectCreditRecordApi = (data) => AnotherTFRequest('/credit/selectCreditRecord', data, 'POST')

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

// 订单物流信息查询
export const getOrderDileveryShippingTraceApi = (data) => AnotherTFRequest('/order/getDilevery', data)

// 产品物流信息查询（半子物流信息查询）
export const getBanziDileveryOrderApi = (data) => AnotherTFRequest('/order/getBanziDilevery', data)

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

// /businessRechargeCustomers/getRechargeShopAll 充值商家列表
export const getRechargeShopAllApi = (data) => AnotherTFRequest('/businessRechargeCustomers/getRechargeShopAll', data, 'POST')

// /businessRechargeCustomers/getByShopAll 客户充值的商家列表 历史记录商家
export const getByShopAllApi = (data) => AnotherTFRequest('/businessRechargeCustomers/getByShopAll', data)

// /businessRechargeOrder/rechargeSubmit 充值提交订单
export const addRechargeSubmitApi = (data) => AnotherTFRequest('/businessRechargeOrder/rechargeSubmit', data, 'POST')

// /businessRechargeAmounts/getAll 商家充值金额列表
export const getRechargeSubmitApi = (data) => AnotherTFRequest('/businessRechargeAmounts/getAll', data)

// /businessRechargeCustomers/getRechargeTotal
export const getRechargeTotalCustomersApi = (data) => AnotherTFRequest('/businessRechargeCustomers/getRechargeTotal', data, 'POST')

// /businessRechargeCustomers/getByRecharge 客户充值记录列表
export const getByRechargeApi = (data) => AnotherTFRequest('/businessRechargeCustomers/getByRecharge', data, 'POST')

// 代金券
// 获取可用代金卷
export const getVoucherApi = (data) => AnotherTFRequest('/voucher/getVoucher', data)

// 创建购买代金卷订单 /order/submitVoucher
export const submitVoucherOrderApi = (data) => AnotherTFRequest('/order/submitVoucher', data, 'POST')

// 获取用户代金卷
export const getByUserVoucherShopHoldApi = (data) => AnotherTFRequest('/voucherShopHold/getByUserVoucher', data)

// /voucherShopHold/transfer 赠送代金卷
export const updateTransferVoucherShopHoldApi = (data) => AnotherTFRequest('/voucherShopHold/transfer', data, 'POST')

// /voucherOrder/getTotal 获取代金卷总数据
export const getTotalVoucherOrderApi = (data) => AnotherTFRequest('/voucherOrder/getTotal', data, 'POST')

// /voucherShopHold/transferLogs 获取代金卷转增数据
export const getTransferLogsVoucherShopHoldApi = (data) => AnotherTFRequest('/voucherShopHold/transferLogs', data, 'POST')

// /voucherOrder/getAll 获取代金卷充值数据
export const getAllVoucherOrderApi = (data) => AnotherTFRequest('/voucherOrder/getAll', data, 'POST')

// 用户银行卡相关接口
// 查询用户所有银行卡
export const getAllBankcardListApi = (data) => AnotherTFRequest('/bank/getAll', data)

// 删除用户银行卡
export const deleteUserBankcardApi = (data) => AnotherTFRequest('/bank/delete', data, 'POST')

// 修改银行卡
export const updateUserBankcardApi = (data) => AnotherTFRequest('/bank/update', data, 'POST')

// 添加银行卡
export const addUserBankcardApi = (data) => AnotherTFRequest('/bank/save', data, 'POST')

// 根据银行卡ID查询信息
export const getByIdUserBankcardApi = (data) => AnotherTFRequest('/bank/getById', data)

// 提现手续费计算
export const getCommissionBankApi = (data) => AnotherTFRequest('/bank/getCommission', data)

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

// 查询店铺秒杀
export const getShopSeckillIndexApi = (data) => AnotherTFRequest('/seckill/getIndex', data)

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

// 拼团专区首页数据查询
export const getIndexWorkApi = (data) => AnotherTFRequest('/work/getIndex', data)

// 限时折扣
// 专区首页数据查询
export const getIndexDiscountListApi = (data) => AnotherTFRequest('/discount/getIndex', data)

// 平台折扣
// 平台折扣查询
export const getQueryPlatformDiscountApi = (data) => AnotherTFRequest('/platform-discount/queryPlatformDiscount', data)

// 平台折扣商品查询
export const getPlatformDiscountProductListApi = (data) => AnotherTFRequest('/platform-discount/queryPlatformDiscountProductList', data, 'POST')

// 根据场次时间查询商品列表
export const getQueryProductListBySessionApi = (data) => AnotherTFRequest('/platform-seckill/queryProductListBySession', data, 'POST')

// 平台秒杀列表
export const getQueryPlatformSeckillListApi = (data) => AnotherTFRequest('/platform-seckill/queryPlatformSeckillList', data)

// 根据seckillId查询对应的秒杀商品列表
export const getPlatformSeckillsCanvasApi = (data) => AnotherTFRequest('/canvas/getPlatformSeckills', data)

// 平台秒杀查询今日场次
export const getPlatformSeckillsQuerySessionApi = (data) => AnotherTFRequest('/platform-seckill/querySession', data)

// 评价
// 点赞或取消点赞某个评论
export const updateLikeOrUnLikeCommentApi = (data) => AnotherTFRequest('/comment/like', data, 'POST')

// 查看我的评论列表
export const getAllMyCommentListApi = (data) => AnotherTFRequest('/comment/getAll', data)

// 追评接口
export const addToCommentOrderAdditionalApi = (data) => AnotherTFRequest('/order/addToComment', data, 'POST')

// 评价
export const addCommentOrderApi = (data) => AnotherTFRequest('/order/addComment', data, 'POST')

// 查询组合套餐
export const getProductSelectComposeApi = (data) => AnotherTFRequest('/product/selectCompose', data)

// 捆绑商品查询
export const getSelectProductListByPriceIdApi = (data) => AnotherTFRequest('/product/selectProductListByPriceId', data)

// 定价捆绑规则查询
export const getSelectByPriceIdApi = (data) => AnotherTFRequest('/price/selectByPriceId', data)

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

// 小账本
export const getSmallAccountBookStatisticsApi = (data = {}) => AnotherTFRequest('/platformRelationship/getStatisticsAmount', data, 'POST')

// 今日会员，累计会员
export const getFansListApi = (data) => AnotherTFRequest('/platformRelationship/getStatistics', data, 'POST')

// 获取佣金列表
export const getCommissionDeatilListApi = (data) => AnotherTFRequest('/platformRelationship/getStatisticsRecord', data, 'POST')

// 小程序支付参数
export const getPayMiniProgramQueryApi = (data) => AnotherTFRequest('/collect/getSybPaySign', data, 'POST')
