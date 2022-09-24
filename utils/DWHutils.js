import { whoami } from "../api/auth";
import { USER_ID } from "../constant";

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
  new Promise(async (resolve, reject) => {
    const userId = getUserId();
    const res = await whoami(userId);
    if (res.errno !== 0) {
      uni.navigateTo({
        url: "/pages/login/login",
      });
    }
  });
};

/**
 * 获取用户userid
 * @returns
 */
export const getUserId = () => {
  const userId = uni.getStorageSync(USER_ID);
  if (!userId) {
    uni.showToast({
      title: "登录已失效，请重新登录",
      duration: 2000,
      icon: "none",
    });

    uni.navigateTo({
      url: "/pages/login/login",
    });

    return;
  }
  return userId;
};

/**
 * 点击复制
 * @param {*} text
 */
export const useCopy = (text) => {
  const input = document.createElement("input");
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand("Copy");
  document.body.removeChild(input);
  uni.showToast({
    title: "单号复制成功",
  });
};

/**
 * @description 防抖函数
 * @param {*} func 
 * @param {*} wait 
 * @param {*} immediate 
 * @returns 
 */
export function handleDebounce(func, wait, immediate) {
  let timeout;

  return function () {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
  };
}
