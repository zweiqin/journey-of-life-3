/*
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-22 17:08:19
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-23 20:28:15
 * @FilePath: \团蜂商城 - 副本\tuan-uniapp\api\collect\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-22 17:08:19
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-22 17:10:44
 * @FilePath: \团蜂商城 - 副本\tuan-uniapp\api\collect\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { RuanRequest } from "../../utils";

export const getCollectListApi = (data) =>{
    return RuanRequest("/collect/list",data,'get')
};

export const getCollectAddordeleteApi = (data) =>{
    return RuanRequest("/collect/addordelete",data)
};