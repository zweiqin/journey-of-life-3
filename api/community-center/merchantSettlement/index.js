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