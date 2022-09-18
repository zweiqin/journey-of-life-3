import { request, getUserId } from "../../utils";

/**
 * 获取营销画像的数据
 */
export const getMarketingPortraitDataApi = () => {
  return request(`/dts-wx-api/wx/api/statistical/home/${getUserId()}`);
};
