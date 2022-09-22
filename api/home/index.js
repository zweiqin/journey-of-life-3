/*
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-17 16:22:25
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-22 10:20:39
 * @FilePath: \团蜂商城 - 副本\tuan-uniapp\api\home\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { request } from "../../utils";

/**
 * 获取首页商品列表
 * @returns 
 */
export const getIndexDataApi = () => {
  return request("/home/index", null, 'get');
};
