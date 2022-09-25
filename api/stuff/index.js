import { RuanRequest } from "../../utils";

/**
 * @description 获取材料的分类列表
 * @param {
 *  id  {String} 二级分类类目,
 *  goodsType {String}  1-家具 2-材料
 * } data
 * @returns
 */
export const getStuffListApi = (data) => {
  return RuanRequest("/catalog/index", data, "get");
};

// 获取行业详情列表
export const getIndustryInformationListApi = (data) => {
  return RuanRequest("/richText/list", data, "get");
};

// 获取行业详情列表详情
export const getIndustryInformationDetalApi = (acticleId) => {
  return RuanRequest("/richText/detail", { id: acticleId }, "get");
};

// 供应列表
export const getSupplyListApi = (data) => {
  return RuanRequest("/tradeLeads/supplyList", data, "get");
};

// 采购列表
export const getPcTodayListApi = (data) => {
  return RuanRequest("/tradeLeads/PcToday", data, "get");
};
