import { ANOTHER_TF_INTERFACE } from '@/config'
// 导入api接口模块

// 获取当前环境变量 true => 生产环境 false => 开发环境
// const BASEURL = process.env.VUE_APP_DOMAIN_PREFIX
const BASEURL = process.env.NODE_ENV === 'production' ? ANOTHER_TF_INTERFACE : 'http://192.168.0.91:9007'
// const BASEURL = (process.env.NODE_ENV === 'production') ? 'http://127.0.0.1:9007' : 'http://127.0.0.1:9007'

export const api = {
  //购物车
  ShoppingaddCart: '/cart/addCart', //  加入购物车
  ShoppingCart: '/cart/getCart', //  购物车列表
  UpdateNumberCart: '/cart/updateNumber', //  修改购物车商品数量
  DeleteCart: '/cart/delete', //  删除购物车商品
  SelectedCart: '/cart/selected', //  选中商品
  UpdateSkuCart: '/cart/updateSku', //  购物车更换商品规格

  // 订单相关接口
  Settlement: '/order/getSettlement', //  结算查询

}
export default api
