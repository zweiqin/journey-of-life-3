import { AnotherTFRequest } from '../../utils'

/**
 * @description 临时接口
 */

// 参与抽奖
export const addDrawParticipateLotteryApi = (data) => AnotherTFRequest('/draw/addDraw', data, 'POST')

// 查询是否已参加活动
export const xxx1 = (data) => AnotherTFRequest('/待后端开发/查询是否未参加活动', data, 'POST')

// 参加活动
export const xxx2 = (data) => AnotherTFRequest('/待后端开发/参加活动', data, 'POST')

/**
 * @description 商城相关接口
 */

// 登录拿 新团蜂的 token
export const getAnotherTFTokenApi = (data) => AnotherTFRequest('/app/tmpLoginOrRegByPhone', data)

// 获取支付宝小程序手机号绑定
export const updateAliPhoneAppApi = (data) => AnotherTFRequest('/app/updateAliPhone', data, 'POST')

// 获取验证码
export const getVerificationImageCaptchaApi = (data) => AnotherTFRequest('/captcha/get/verification/image', data)

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

// 重置密码
export const updateForgetPasswordUserApi = (data) => AnotherTFRequest('/user/forgetPassword', data, 'POST')

// 判断用户是否设置支付密码
export const getIsPwdBuyerUserExtendApi = (data) => AnotherTFRequest('/buyerUserExtend/isPwd', data)

// 设置用户验证密码
export const updateSetUpPwdBuyerUserExtendApi = (data) => AnotherTFRequest('/buyerUserExtend/setUpPwd', data)

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

// 可售检测
export const getBanziProductCanSaleApi = (data) => AnotherTFRequest('/banziProduct/canSale', data, 'POST')

// 查询商品sku详情
export const getProductsSkuApi = (data) => AnotherTFRequest('/product/getProducts', data)

// 优惠券商品列表查询
export const getCouponProductsApi = (data) => AnotherTFRequest('/coupon/getCouponProducts', data)

// 商圈搜索
export const getBusinessSearchProductsApi = (data) => AnotherTFRequest('/app/getSearchProductsBusiness', data)

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

// 查询所有小区
export const getCityCommunitySelectApi = (data) => AnotherTFRequest('/cityCommunity/selectCommunity', data)

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

// 商家ID查询绑定用户邀请码
export const getShopIdCodeRelationshipCodeApi = (data) => AnotherTFRequest('/platformRelationshipCode/getShopIdCode', data)

// 用户绑定
export const bindPlatformRelationshipCodeApi = (data) => AnotherTFRequest('/platformRelationshipCode/bingCode', data)

// 加盟商绑定商家业务
export const bindPlatformRelationshipShopApi = (data) => AnotherTFRequest('/platformRelationship/bingShop', data)

// 查询平台关系等级管理
export const getPlatformRelationshipLevelApi = (data) => AnotherTFRequest('/platformRelationshipLevel/getAll', data)

// 查询升级产品
export const getSelectProductPlatformRelationApi = (data) => AnotherTFRequest('/platformRelationshipApply/selectProduct', data, 'POST')

// 查询用户是否存在申请
export const getSelectApplyPlatformRelationApi = (data) => AnotherTFRequest('/platformRelationshipApply/selectApply', data)

// 查询是否满足升级条件
export const getSelectLevelPlatformRelationApi = (data) => AnotherTFRequest('/platformRelationshipApply/selectLevel', data, 'POST')

// 今日会员，累计会员 // 每个等级统计
export const getFansListApi = (data) => AnotherTFRequest('/platformRelationship/getStatistics', data, 'POST')

// （废）我的账本 // 佣金金额统计
export const getSmallAccountBookStatisticsApi = (data = {}) => AnotherTFRequest('/platformRelationship/getStatisticsAmount', data, 'POST')

// （废）获取佣金列表 // 佣金金额记录
export const getCommissionDeatilListApi = (data) => AnotherTFRequest('/platformRelationship/getStatisticsRecord', data, 'POST')

// 今日会员记录
export const getRelationshipTodayRdListApi = (data) => AnotherTFRequest('/platformRelationship/getTodayRdList', data, 'POST')

// 分页查询用户佣金入账记录表
export const getAllCommissionEntryRecordApi = (data) => AnotherTFRequest('/buyerCommissionEntryRecord/getAll', data, 'POST')

// 分页查询用户佣金出账记录表
export const getAllCommissionOutgoingRecordApi = (data) => AnotherTFRequest('/buyerCommissionOutgoingRecord/getAll', data, 'POST')

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

// 消费金签到
// 查询消费金签到列表
export const getCurrencySigninRecordListApi = (data) => AnotherTFRequest('/buyerBeeSigninRecord/selectBeeSigninRecordList', data)

// 查询消费金签到明细
export const getCurrencySigninHistoryApi = (data) => AnotherTFRequest('/buyerBeeSigninRecord/selectBeeSigninHistory', data)

// 消费金签到
export const updateCurrencySignInApi = (data) => AnotherTFRequest('/buyerBeeSigninRecord/signIn', data, 'POST')

// 消费金签到每天数量
export const getCurrencyDayListApi = (data) => AnotherTFRequest('/buyerBeeSigninRecord/beeDayList', data)

// 代金券签到
// 查询代金券签到列表
export const getVoucherSigninRecordListApi = (data) => AnotherTFRequest('/buyerVoucherSigninRecord/selectVoucherSigninRecordList', data)

// 查询代金券签到明细
export const getVoucherSigninHistoryApi = (data) => AnotherTFRequest('/buyerVoucherSigninRecord/selectVoucherSigninHistory', data)

// 代金券签到
export const updateVoucherSignInApi = (data) => AnotherTFRequest('/buyerVoucherSigninRecord/signInVoucher', data, 'POST')

// 代金券签到每天数量
export const getVoucherDayListApi = (data) => AnotherTFRequest('/buyerVoucherSigninRecord/voucherDayList', data)

// 积分签到
// 分享送积分。消费方式：1购买一定金额商品2购买一定数量商品3注册新用户4分享
export const updateShareCreditApi = (data) => AnotherTFRequest('/credit/shareCredit', data, 'POST')

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

// 购物车
// 商家购物车查询
export const getShopCartApi = (data) => AnotherTFRequest('/cart/getShopCart', data)

// 购物车列表
export const getCartListApi = (data) => AnotherTFRequest('/cart/getCart', data)

// 修改购物车商品数量
export const updateNumberCartGoodsApi = (data) => AnotherTFRequest('/cart/updateNumber', data, 'POST')

// 删除购物车商品
export const deleteCartGoodsApi = (data) => AnotherTFRequest('/cart/delete', data, 'POST')

// 拼单
// 发起拼单
export const updateStartSplicingOrdersApi = (data) => AnotherTFRequest('/splicingOrders/splicingOrders', data)

// 结束拼单
export const updateEndSplicingOrdersApi = (data) => AnotherTFRequest('/splicingOrders/endSplicingOrders', data)

// 被邀请拼单者进入拼单页面调用（原购物车商品变为该拼单购物车商品）
export const updateInvitedSplicingOrdersApi = (data) => AnotherTFRequest('/splicingOrders/invitedSplicingOrders', data)

// 商家
// 店铺首页查询，查询店铺详情
export const getIndexShopDetailApi = (data) => AnotherTFRequest('/shop/getIndex', data)

// 获取商家扩展信息列表
export const getShopCheckListDetailApi = (data) => AnotherTFRequest('/check/getShopCheckList', data)

// 商家是否停用
export const getShopIsNotDeactivateApi = (data) => AnotherTFRequest('/check/getShopIsNotDeactivate', data)

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

// 查询商家分类
export const getShopOneClassifyApi = (data) => AnotherTFRequest('/shop/getShopOneClassify', data)

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

// 查询问答
export const getCustomerProblemByIdApi = (data) => AnotherTFRequest('/customerProblem/getById', data)

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

// 直接同意退款
export const updateDirectRefundApi = (data) => AnotherTFRequest('/after/agreeToRefund', data, 'POST')

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

// 卡包
// 分页查询社区卡包信息表
export const getAllCommunityCardHolderApi = (data) => AnotherTFRequest('/communityCardHolder/getAll', data, 'POST')

// 已失效卡券
export const getIsLoseAllCommunityCardHolderApi = (data) => AnotherTFRequest('/communityCardHolder/getIsLoseAll', data, 'POST')

// 社区下单成功调用（删除延迟任务）
export const updateDeleteRedisCardHolderApi = (data) => AnotherTFRequest('/communityCardHolder/deleteRedis', data, 'POST')

// 首页广告
// 成为商家的客户
export const addTakeBatchCouponApi = (data) => AnotherTFRequest('/coupon/takeBatchCoupon', data, 'POST')

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

// 检查支付完成后核销订单
export const updateChkPaidAndWriteApi = (data) => AnotherTFRequest('/order/chkPaidAndWrite', data, 'POST')

// 商家操作模块
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

// 生成商家收款码
export const getPaymentGenerateCodeApi = (data) => AnotherTFRequest('/paymentCode/generateCode', data, 'POST')

// 字段配置
// 分页查询字段数据
export const getShopCostFieldPageAllApi = (data) => AnotherTFRequest('/shopCostField/getPageAll', data, 'POST')

// 添加字段
export const addShopCostFieldApi = (data) => AnotherTFRequest('/shopCostField/save', data, 'POST')

// 修改字段
export const updateShopCostFieldApi = (data) => AnotherTFRequest('/shopCostField/update', data, 'POST')

// 删除字段
export const deleteShopCostFieldApi = (data) => AnotherTFRequest('/shopCostField/deleteById', data)

// 查询全部
export const getAllShopCostFieldApi = (data) => AnotherTFRequest('/shopCostField/getAll', data, 'POST')

// 查询字段数据
export const getByIdShopCostFieldApi = (data) => AnotherTFRequest('/shopCostField/getById', data)

// 采购商品配置
// 分页查询采购商品数据
export const getShopCostRevenuePageAllApi = (data) => AnotherTFRequest('/shopCostRevenue/getPageAll', data, 'POST')

// 添加采购商品
export const addShopCostRevenueApi = (data) => AnotherTFRequest('/shopCostRevenue/save', data, 'POST')

// 修改采购商品
export const updateShopCostRevenueApi = (data) => AnotherTFRequest('/shopCostRevenue/update', data, 'POST')

// 删除采购商品
export const deleteByIdShopCostRevenueApi = (data) => AnotherTFRequest('/shopCostRevenue/deleteById', data)

// 查询全部采购商品
export const getAllShopCostRevenueApi = (data) => AnotherTFRequest('/shopCostRevenue/getAll', data, 'POST')

// 查询字段数据
export const getByIdShopCostRevenueApi = (data) => AnotherTFRequest('/shopCostRevenue/getById', data)

// 成本配置
// 盈亏红线（当前只计算了，通联支付/惠氏宝支付，其余需要迭代）
export const getShopProfitAndLossApi = (data) => AnotherTFRequest('/shop/getProfitAndLoss', data, 'POST')

// 商家统计
// 商家财务头部统计
export const getShopFinanceCountDataApi = (data) => AnotherTFRequest('/shop/getShopFinanceCount', data)

// 时间条件统计
export const getShopTotalFinanceCountApi = (data) => AnotherTFRequest('/shop/getShopTotalFinanceCount', data, 'POST')

// 时间条件订单记录
export const getShopOrderListApi = (data) => AnotherTFRequest('/shop/getShopOrderList', data, 'POST')

// 会员统计
export const getAllShopMemberApi = (data) => AnotherTFRequest('/shop/getShopMember', data, 'POST')

// 营业数据
export const getShopBusinessDataApi = (data) => AnotherTFRequest('/shop/getBusinessData', data, 'POST')

// 会员统计列表
export const getShopMemberListApi = (data) => AnotherTFRequest('/shop/getShopMemberList', data, 'POST')

// 会员卡商家
// 商家新增会员卡
export const addShopMemberCardApi = (data) => AnotherTFRequest('/shopMemberCard/save', data, 'POST')

// 商家修改会员卡
export const updateShopMemberCardApi = (data) => AnotherTFRequest('/shopMemberCard/update', data, 'POST')

// 商家分页查询
export const getPageAllShopMemberCardApi = (data) => AnotherTFRequest('/shopMemberCard/getPageAll', data, 'POST')

// 商家查询数据
export const getByIdShopMemberCardApi = (data) => AnotherTFRequest('/shopMemberCard/getById', data)

// 商家下架会员卡
export const updateShelfShopMemberCardApi = (data) => AnotherTFRequest('/shopMemberCard/shelf', data)

// 商家会员卡发行
export const updateIssueShopMemberCardApi = (data) => AnotherTFRequest('/shopMemberCard/issue', data)

// 商家新增会员权益
export const addShopMemberCardEquityApi = (data) => AnotherTFRequest('/shopMemberCardEquity/save', data, 'POST')

// 商家修改会员权益
export const updateShopMemberCardEquityApi = (data) => AnotherTFRequest('/shopMemberCardEquity/update', data, 'POST')

// 商家分页查询
export const getPageAllShopMemberCardEquityApi = (data) => AnotherTFRequest('/shopMemberCardEquity/getPageAll', data, 'POST')

// 商家查询数据
export const getByIdShopMemberCardEquityApi = (data) => AnotherTFRequest('/shopMemberCardEquity/getById', data)

// 商家删除数据
export const deleteByIdShopMemberCardEquityApi = (data) => AnotherTFRequest('/shopMemberCardEquity/deleteById', data)

// 商家会员卡购买用户数据
export const getPageCardUserAllShopMemberCardApi = (data) => AnotherTFRequest('/shopMemberCard/getPageCardUserAll', data, 'POST')

// 商家会员卡购买用户数据详情
export const getPageCardUserIdShopMemberCardApi = (data) => AnotherTFRequest('/shopMemberCard/getPageCardUserId', data, 'POST')

// 商家结算审核列表
export const getShopMemberCardApplySettlementApi = (data) => AnotherTFRequest('/shopMemberCardApplySettlement/getShopSettlement', data, 'POST')

// 商家同意结算
export const updateAgreeShopMemberCardApplyApi = (data) => AnotherTFRequest('/shopMemberCardApplySettlement/agreeWithSettlement', data)

// 商家扫码核销会员卡
export const updateVerificationShopMemberCardApi = (data) => AnotherTFRequest('/shopMemberCardUser/scanCodeVerification', data)

// 会员卡用户
// 提交购买会员卡订单
export const submitShopMemberCardOrderApi = (data) => AnotherTFRequest('/shopMemberCardOrder/submitCardOrder', data, 'POST')

// 分页查询用户购买的会员卡
export const getPageAllShopMemberCardUserApi = (data) => AnotherTFRequest('/shopMemberCardUser/getPageAll', data, 'POST')

// 查询用户购买的会员卡详情
export const getByIdShopMemberCardUserApi = (data) => AnotherTFRequest('/shopMemberCardUser/getById', data)

// 用户的商家推广记录
export const getCardPromoterAllShopMemberCardApi = (data) => AnotherTFRequest('/shopMemberCardPromoter/getCardPromoterAll', data, 'POST')

// 用户的推广总佣金统计
export const getCardStatisticsShopMemberCardApi = (data) => AnotherTFRequest('/shopMemberCardPromoter/getCardStatistics', data, 'POST')

// 用户的推广商家分组佣金统计
export const getGroupShopMemberCardApi = (data) => AnotherTFRequest('/shopMemberCardPromoter/getCardShopStatistics', data, 'POST')

// 用户提交结算申请
export const updateSettlementShopMemberCardApi = (data) => AnotherTFRequest('/shopMemberCardApplySettlement/applySettlement', data)

// 用户结算记录
export const getBuyerSettlementShopMemberCardApi = (data) => AnotherTFRequest('/shopMemberCardApplySettlement/getBuyerSettlement', data, 'POST')

// 用户出账记录
export const getOutgoingRecordShopMemberCardApi = (data) => AnotherTFRequest('/buyerMemberCardOutgoingRecord/getUserOutgoingRecord', data, 'POST')

// 用户入账记录
export const getEntryRecordShopMemberCardApi = (data) => AnotherTFRequest('/buyerMemberCardEntryRecord/getUserEntryRecord', data, 'POST')

// 代金券
// 获取可用代金券
export const getVoucherApi = (data) => AnotherTFRequest('/voucher/getVoucher', data)

// 创建购买代金券订单 /order/submitVoucher
export const submitVoucherOrderApi = (data) => AnotherTFRequest('/order/submitVoucher', data, 'POST')

// 获取用户代金券
export const getByUserVoucherShopHoldApi = (data) => AnotherTFRequest('/voucherShopHold/getByUserVoucher', data)

// /voucherShopHold/transfer 赠送代金券
export const updateTransferVoucherShopHoldApi = (data) => AnotherTFRequest('/voucherShopHold/transfer', data, 'POST')

// /voucherOrder/getTotal 获取代金券总数据
export const getTotalVoucherOrderApi = (data) => AnotherTFRequest('/voucherOrder/getTotal', data, 'POST')

// /voucherShopHold/transferLogs 获取代金券转赠数据
export const getTransferLogsVoucherShopHoldApi = (data) => AnotherTFRequest('/voucherShopHold/transferLogs', data, 'POST')

// /voucherOrder/getAll 获取代金券充值数据
export const getAllVoucherOrderApi = (data) => AnotherTFRequest('/voucherOrder/getAll', data, 'POST')

// 新代金券
// 分页查询平台代金券
export const getAllPlatformVoucherApi = (data) => AnotherTFRequest('/platformVoucher/getAll', data, 'POST')

// // 充值代金券统计（旧）
// export const getByUserOrderVoucherOrderApi = (data) => AnotherTFRequest('/buyerVoucherOrder/getByUserOrderVoucher', data)

// 查询用户充值金额（独立账号）
export const getByUserOrderVoucherOrderApi = (data) => AnotherTFRequest('/buyerVoucherOrderEntryRecord/getRechargeTotal', data)

// 兑换代金券统计
export const getBuyerTotalVoucherEntryRecordApi = (data) => AnotherTFRequest('/buyerVoucherEntryRecord/buyerTotal', data)

// 代金券购买提交订单
export const submitBuyerVoucherOrderApi = (data) => AnotherTFRequest('/buyerVoucherOrder/submitVoucher', data, 'POST')

// // 充值代金券转赠（旧）
// export const updateTransferVoucherOrderApi = (data) => AnotherTFRequest('/buyerVoucherOrder/transferVoucher', data, 'POST')

// // 充值代金券转赠(独立账号)
// export const updateTransferVoucherOrderApi = (data) => AnotherTFRequest('/buyerVoucherOrderEntryRecord/transferVoucher', data, 'POST')

// // 充值代金券：用户转入商家
// export const updateTransferVoucherIntoApi = (data) => AnotherTFRequest('/shopVoucherExchangeEntryRecord/transferUserVoucherInto', data, 'POST')

// // 兑换代金券：用户转入商家
// export const updateByIntoVoucherEntryRecordApi = (data) => AnotherTFRequest('/shopVoucherExchangeEntryRecord/transferVoucherInto', data, 'POST')

// // 兑换代金券转赠
// export const updateByUserVoucherEntryRecordApi = (data) => AnotherTFRequest('/buyerVoucherEntryRecord/transfer', data, 'POST')

// 兑换代金券入账记录
export const getBuyerVoucherEntryRecordApi = (data) => AnotherTFRequest('/buyerVoucherEntryRecord/entryRecord', data, 'POST')

// 兑换代金券出账记录
export const getBuyerVoucherOutgoingRecordApi = (data) => AnotherTFRequest('/buyerVoucherOutgoingRecord/outgoingRecord', data, 'POST')

// 充值代金券入账记录
export const getAllEntryRecordApi = (data) => AnotherTFRequest('/buyerVoucherOrderEntryRecord/getAll', data, 'POST')

// 充值代金券出账记录
export const getAllOutgoingRecordApi = (data) => AnotherTFRequest('/buyerVoucherOrderOutgoingRecord/getAll', data, 'POST')

// 分页查询用户充值代金券订单表
export const getAllBuyerVoucherOrderApi = (data) => AnotherTFRequest('/buyerVoucherOrder/getAll', data)

// 新版代金券
// 查询商家充值金额（独立账号）
export const getShopRechargeTotalVoucherApi = (data) => AnotherTFRequest('/shopVoucherEntryRecord/getShopExchangeTotal', data)

// 查询商家兑换金额（独立账号）
export const getShopExchangeTotalVoucherApi = (data) => AnotherTFRequest('/shopVoucherEntryRecord/getShopRechargeTotal', data)

// 充值代金券：用户转用户转账操作
export const updateOrderUserToUserTransferApi = (data) => AnotherTFRequest('/buyerVoucherOrderEntryRecord/orderUserToUserTransfer', data)

// 充值代金券：用户转商家转账操作
export const updateOrderUToShopTransferApi = (data) => AnotherTFRequest('/buyerVoucherOrderEntryRecord/orderUToShopTransfer', data)

// 兑换代金券：用户转商家转账操作
export const updateUserToShopTransferApi = (data) => AnotherTFRequest('/buyerVoucherEntryRecord/userToShopTransfer', data)

// 兑换代金券：用户转用户转账操作
export const updateUserToUserTransferApi = (data) => AnotherTFRequest('/buyerVoucherEntryRecord/userToUserTransfer', data)

// 商家充值代金券：商家转用户转账操作
export const updateOrderShopToUserTransferApi = (data) => AnotherTFRequest('/shopVoucherEntryRecord/orderShopToUserTransfer', data)

// 商家兑换代金券：商家转用户转账操作
export const updateShopToUserTransferApi = (data) => AnotherTFRequest('/shopVoucherEntryRecord/shopToUserTransfer', data)

// 商家兑换代金券入账记录
export const getShopVoucherExchangeEntryRecordApi = (data) => AnotherTFRequest('/shopVoucherExchangeEntryRecord/shopVoucherEntry', data, 'POST')

// 商家兑换代金券出账记录
export const getShopVoucherExchangeOutgoingRecordApi = (data) => AnotherTFRequest('/shopVoucherExchangeOutgoingRecord/shopVoucherOutgoing', data, 'POST')

// 商家充值代金券入账记录
export const getShopVoucherEntryRecordApi = (data) => AnotherTFRequest('/shopVoucherEntryRecord/shopVoucherInEntry', data, 'POST')

// 商家充值代金券出账记录
export const getShopVoucherOutgoingRecordApi = (data) => AnotherTFRequest('/shopVoucherOutgoingRecord/shopVoucherInOutgoing', data, 'POST')

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

// 尝试对半子订单进行确认收货
export const updateOrderTryConfirmForBanziApi = (data) => AnotherTFRequest('/order/tryConfirmForBanzi', data)

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

// 代金券抵扣
export const getVoucherApiExchange = (data) => AnotherTFRequest('/buyerVoucherEntryRecord/deductionOrder', data, 'GET')

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

// 消费金
// 选择平台端消费金活动查询
export const getPlatformBeeCurrencyApi = (data) => AnotherTFRequest('/canvas/getPlatformBeeCurrency', data)

// 记录消费金
export const updatePlatformBeeCurrencySaveBeeApi = (data) => AnotherTFRequest('/platformBeeCurrency/saveBee', data)

// 消费金收支明细（新，收？）
export const getBeeCurrencyDistributorApi = (data) => AnotherTFRequest('/distributor/getBeeCurrency', data)

// 消费金支出记录
export const getBeeCurrencyUpApi = (data) => AnotherTFRequest('/distributor/getBeeUpCurrency', data)

// 查询消费金余额
export const getBeeSelectAmountEntryRecordApi = (data) => AnotherTFRequest('/buyerBeeEntryRecord/beeSelectAmount', data, 'POST')

// 消费金选择
export const getBeeSelectEntryRecordApi = (data) => AnotherTFRequest('/buyerBeeEntryRecord/beeSelect', data, 'POST')

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

// 组合活动
// 选择平台端组合活动查询
export const getPlatformComposeCanvasApi = (data) => AnotherTFRequest('/canvas/getPlatformCompose', data)

// 记录组合活动相关
export const updateSavePlatformComposeApi = (data) => AnotherTFRequest('/platformCompose/saveCompose', data)

// 用户抽奖模块
// 抽奖活动
export const getPlatformLotteryApi = (data) => AnotherTFRequest('/lottery/getPlatformLottery', data)

// 抽奖入口
export const updateDoDrawIdApi = (data) => AnotherTFRequest('/lottery/doDrawId', data)

// 中奖记录
export const getLotteryRecordApi = (data) => AnotherTFRequest('/lotteryRecord/getRecord', data)

// c端抽奖奖项列表
export const getLotteryItemRecordApi = (data) => AnotherTFRequest('/lotteryItem/getLotteryItemRecord', data)

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

// 小程序支付参数
export const getPayMiniProgramQueryApi = (data) => AnotherTFRequest('/collect/getSybPaySign', data, 'POST')

// 商品类别
// 商品类别管理查询
export const getAllPlatformProductClassifyApi = (data) => AnotherTFRequest('/platformProductClassify/getAll', data, 'POST')

// 商品类别编辑查询
export const getByIdPlatformProductClassifyApi = (data) => AnotherTFRequest('/platformProductClassify/getById', data, 'POST')

// 添加商品类别
export const addPlatformProductClassifyApi = (data) => AnotherTFRequest('/platformProductClassify/save', data, 'POST')

// 修改商品类别
export const updatePlatformProductClassifyApi = (data) => AnotherTFRequest('/platformProductClassify/update', data, 'POST')

// 删除商品类别
export const deletePlatformProductClassifyApi = (data) => AnotherTFRequest('/platformProductClassify/delete', data, 'POST')

// （商家）选品管理 TODO
// 查询分类层级
export const getClassifyPlatformProductApi = (data) => AnotherTFRequest('/platformProduct/getClassify', data, 'POST')

// 查询品牌列表
export const getBrandListPlatformProductApi = (data) => AnotherTFRequest('/platformProduct/getBrandList', data, 'POST')

// 商品管理查询
export const getAllPlatformProductApi = (data) => AnotherTFRequest('/platformProduct/getAll', data, 'POST')

// 修改商品查询
export const getByIdPlatformProductApi = (data) => AnotherTFRequest('/platformProduct/getById', data, 'POST')

// 新增选品商品
export const addSelectionProductApi = (data) => AnotherTFRequest('/platformProduct/save', data, 'POST')

// 修改选品商品
export const updateSelectionProductApi = (data) => AnotherTFRequest('/platformProduct/update', data, 'POST')

// 删除选品商品
export const deleteSelectionProductApi = (data) => AnotherTFRequest('/platformProduct/delete', data, 'POST')

// 商品上下架
export const updateStartPlatformProductApi = (data) => AnotherTFRequest('/platformProduct/start', data, 'POST')

// （用户）选品操作
// c端选品中心
export const getBuyerSelectionLibraryApi = (data) => AnotherTFRequest('/buyerSelection/H5SelectionLibrary', data, 'POST')

// C端选择选品商品
export const getBuyerSelectionSelectApi = (data) => AnotherTFRequest('/buyerSelection/selectBuyerLibrary', data, 'POST')

// c端选品详情
export const getBuyerSelectionDetailsApi = (data) => AnotherTFRequest('/buyerSelection/h5SelectionDetails', data, 'POST')
