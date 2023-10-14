import { endRequest, request2, XZLRequest, SheQuRequest, SheQu1Request } from '@/utils';
import { USER_TOKEN } from 'constant';

// 商家入驻信息认证
export const shopCreateAccount = (data) => {
    return endRequest({
      url: '/api/third/shop/createAccount',
      data,
      method: 'POST'
    });
  };

//   /api/third/shop/getAccountInfo  获取认证资料
export const getAccountInfo = (data) => {
    return endRequest({
      url: '/api/third/shop/getAccountInfo',
      data,
      method: 'GET'
    });
  };

//   /api/third/shop/shopAuth 门店认证
export const shopAuth = (data) => {
    return endRequest({
      url: '/api/third/shop/shopAuth',
      data,
      method: 'POST'
    });
  };

//   /api/third/shop/getShopInfo   获取门店信息
export const getShopInfo = (data) => {
    return endRequest({
      url: '/api/third/shop/getShopInfo',
      data,
      method: 'GET'
    });
  };