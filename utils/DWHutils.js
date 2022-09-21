import { USER_ID } from "../constant";
import { whoami } from "../api/auth";

/**
 * @description 解决小数计算精度问题（en，你应该使用big.js）
 * @param {Number, String} data 数字
 * @param {Number} accuracy 保留几位小数
 * @returns
 */
export const fomartNumber = (data, accuracy = 2) => {
  let temp = data + "";
  if (temp.includes(".")) {
    return (data * 1).toFixed(accuracy);
  }
  return data;
};

/**
 * @description 批量清除缓存
 * @param {String[]} cacheArr 要清除的缓存string数组
 */
export const removeCache = (cacheArr) => {
  if (!Array.isArray(cacheArr)) {
    return;
  }

  for (const item of cacheArr) {
    uni.removeStorageSync(item);
  }
};

/**
 * 检测登录是否有效
 */
export const checkWhoami = () => {
  new Promise((resolve, reject) => {
    // const userId =
  });
};

/**
 * 获取用户userid
 * @returns
 */
export const getUserId = () => {
  return 200;
};
