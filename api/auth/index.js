import { RuanRequest } from "../../utils";

// 校验登录
export const whoami = () => {
  return RuanRequest;
};

// 注册
export const userRegisterApi = (data) => {
  return RuanRequest("/auth/register", data);
};

// 登录
export const userLoginApi = (data) => {
  return RuanRequest('/auth/login', data)
};
