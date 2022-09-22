/*
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-17 16:22:25
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-22 10:11:44
 * @FilePath: \团蜂商城 - 副本\tuan-uniapp\utils\DWHRequest.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BASE_URL, RUAN_URL, LQB_URL } from "../config";

export function GyRequest(url, data = {}, method = "post", cb) {
  return new Promise((resolve, reject) => [
    uni.request({
      url: BASE_URL + url,
      data,
      method,
      success: (res) => {
        resolve(res.data);
      },
      fail: (error) => {
        reject(error);
      },

      complete: () => {
        cb && typeof cb === "function" && cb();
      },
    }),
  ]);
}


export function LqbRequest(url, data = {}, method = "post", cb) {
  return new Promise((resolve, reject) => [
    uni.request({
      url: LQB_URL + url,
      data,
      method,
      success: (res) => {
        resolve(res.data);
      },
      fail: (error) => {
        reject(error);
      },

      complete: () => {
        cb && typeof cb === "function" && cb();
      },
    }),
  ]);
}

export function RuanRequest(url, data = {}, method = "post", cb) {
  return new Promise((resolve, reject) => [
    uni.request({
      url: RUAN_URL + url,
      data,
      method,
      success: (res) => {
        resolve(res.data);
      },
      fail: (error) => {
        reject(error);
      },

      complete: () => {
        cb && typeof cb === "function" && cb();
      },
    }),
  ]);
}