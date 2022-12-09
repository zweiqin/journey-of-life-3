import { RuanRequest } from "../../utils";

// 校验登录
export const whoami = (id) => {
  return RuanRequest("/auth/checkLogin", {
    userId: id,
  });
};

// 注册
export const userRegisterApi = (data) => {
  return RuanRequest("/auth/register", data);
};

// 登录
export const userLoginApi = (data) => {
  return RuanRequest("/auth/login", data);
};

// 退出登录
export const layoutApi = (id) => {
  return RuanRequest("/auth/checkLogin", { userId: id });
};

// 重置密码
export const resetPasswodApi = (data) => {
  return RuanRequest("/auth/reset", data);
};

// 获取公共号配置
export const getConfigApi = data => {
  return RuanRequest("/qrCode/getSignature", data, 'get')
}