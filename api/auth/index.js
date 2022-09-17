import { request } from "../../utils";

// 校验登录
export const whoami = () => {
  return request;
};

// 注册
export const userRegisterApi = (data) => {
  return request("/auth/register", data);
};

// 登录
export const userLoginApi = (data) => {
  return request('/auth/login', data)
};
