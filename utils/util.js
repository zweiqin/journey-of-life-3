/*
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-12 16:17:06
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-20 09:31:16
 * @FilePath: \团蜂商城 - 副本\tuan-uniapp\utils\util.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const formatTime = (date, type = "-") => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return (
    [year, month, day].map(formatNumber).join(type) +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
};

const formatNumber = (n) => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};

const formatHtml = (content) => {
  content = content.replace(
    /\<img/gi,
    '<img style="width:100% !important;height:auto !important;margin:0;display:flex;" '
  );
  content = content.replace(
    /\<td/gi,
    '<td  cellspacing="0" cellpadding="0" border="0" style="display:block;vertical-align:top;margin: 0px; padding: 0px; border: 0px;outline-width:0px;" '
  );
  content = content.replace(/width=/gi, "sss=");
  content = content.replace(/height=/gi, "sss=");
  content = content.replace(
    / \/\>/gi,
    ' style="max-width:100% !important;height:auto !important;margin:0;display:block;" />'
  );
  return content;
};

/**
 * 获取链接上的参数
 */
const getUrlKey = (name) => {
  return (
    decodeURIComponent(
      (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
        location.href
      ) || ["", ""])[1].replace(/\+/g, "%20")
    ) || null
  );
};

/**
 * 移除购物车Tabbar的数字
 */
const removeTabBadge = () => {
  let pl = "";
  // #ifdef MP-WEIXIN
  pl = "mp";
  // #endif
  uni.removeTabBarBadge({
    index: pl == "mp" ? 3 : 2,
  });
};

const debounce = (fn, delay) => {
  let timer = null;
  return function _debounce(...arg) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arg);
    }, delay);
  };
};

module.exports = {
  formatTime: formatTime,
  getUrlKey: getUrlKey,
  formatHtml: formatHtml,
  removeTabBadge: removeTabBadge,
  debounce: debounce,
};
