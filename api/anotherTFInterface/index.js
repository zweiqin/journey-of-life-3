import { AnotherTFRequest } from '../../utils'

/**
 * @description 商城相关接口
 */

// 登录拿 新团蜂的 token
export const getAnotherTFTokenApi = (data) => AnotherTFRequest('/app/tmpLoginOrRegByPhone', data, 'GET')

// /classify/getClassifyProducts2 分类商品查询
export const getClassifyProducts2Api = (data) => AnotherTFRequest('/classify/getClassifyProducts2', data, 'GET')

// /canvas/getCanvas  查询商品分类
export const getCanvasApi = (data) => AnotherTFRequest('/canvas/getCanvas', data, 'GET')

// /classify/getFirstClassify  查询店铺分类
export const getFirstClassifyApi = (data) => AnotherTFRequest('/classify/getFirstClassify', data, 'GET')

// /product/getById  商品详情查询
export const getProductDetailsByIdApi = (data) => AnotherTFRequest('/product/getById', data, 'GET')

// /app/getSearchProducts  商品搜索查询
export const getSearchProductsApi = (data) => AnotherTFRequest('/app/getSearchProducts', data, 'GET')

/**
 * @description 社区商圈相关接口
 */

// 店铺首页查询，查询店铺详情
export const getIndexShopDetailApi = (data) => AnotherTFRequest('/shop/getIndex', data, 'GET')

// 查询店铺分类
export const getShopCategoryLevelApi = (data) => AnotherTFRequest('/shopCategory/getShopCategoryLevel', data, 'GET')

// 查询店铺父级分类查询子级分类
export const getShopCategorySonApi = (data) => AnotherTFRequest('/shopCategory/getShopCategorySon', data, 'GET')

// 附近商家
export const getHomeBrandListApi = (data) => AnotherTFRequest('/shop/getShopAll', data, 'POST')

// 获取邀请码
export const getUserInfoCodeApi = (data) => AnotherTFRequest('/user/getInfoCode', data, 'GET')

// 用户扫码绑定
export const bindPlatformInfoCodeBindingApi = (data) => AnotherTFRequest('/platformInfoCode/saoMaBinding', data)

// 取消收藏
export const collectCancelApi = (data) => AnotherTFRequest('/collect/cancel', data)

// 收藏商品、店铺
export const collectToCollectApi = (data) => AnotherTFRequest('/collect/collect', data)

// 验证当前客户是否为分销员
export const checkDistributorHasApplyApi = (data) => AnotherTFRequest('/distributor/check', data, 'GET')

// 申请分销员
export const addDistributorApplyApi = (data) => AnotherTFRequest('/distributor/addDistributor', data)

// 查询店铺分类
export const getShopClassifyApi = (data) => AnotherTFRequest('/shop/getShopClassify', data, 'GET')

// 根据id查询店铺
export const getShopProductsApi = (data) => AnotherTFRequest('/shop/getShopProducts', data, 'GET')

// 查询店铺banner
export const getShopBannerApi = (data) => AnotherTFRequest('/shop/getShopBanner', data, 'GET')

// 查询直播间列表
export const getCanvasSelectLiveListApi = (data) => AnotherTFRequest('/canvas/selectLiveList', data, 'GET')
export const getsubscribeLiveApi = (data) => AnotherTFRequest('/live/subscribeLive', data)

// 成为商家的客户
export const addShopBusinessBuyerUserApi = (data) => AnotherTFRequest('/shop/addBusinessBuyerUser', data)

// 小程序客服查询
export const getCustomerServiceAppletKfApi = (data) => AnotherTFRequest('/kf/getAppletKf', data, 'GET')

