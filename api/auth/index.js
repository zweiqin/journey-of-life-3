import { shopRequest } from "../../utils";


// 校验登录
export const whoami = (id) => {
  return shopRequest("/auth/checkLogin", {
    userId: id,
  });
};

// 注册
export const userRegisterApi = (data) => {
  return shopRequest("/auth/register", data);
};

// 登录
export const userLoginApi = (data) => {
  return shopRequest("/auth/login", data);
};

// 退出登录
export const layoutApi = (id) => {
  return shopRequest("/auth/checkLogin", { userId: id });
};

// 重置密码
export const resetPasswodApi = (data) => {
  return shopRequest("/auth/reset", data);
};

// 获取公共号配置
export const getConfigApi = data => {
  return shopRequest("/qrCode/getSignature", data, 'get')
}