/*
 *                                                     __----~~~~~~~~~~~------___
 *                                    .  .   ~~//====......          __--~ ~~
 *                    -.            \_|//     |||\\  ~~~~~~::::... /~
 *                 ___-==_       _-~o~  \/    |||  \\            _/~~-
 *         __---~~~.==~||\=_    -_--~/_-~|-   |\\   \\        _/~
 *     _-~~     .=~    |  \\-_    '-~7  /-   /  ||    \      /
 *   .~       .~       |   \\ -_    /  /-   /   ||      \   /
 *  /  ____  /         |     \\ ~-_/  /|- _/   .||       \ /
 *  |~~    ~~|--~~~~--_ \     ~==-/   | \~--===~~        .\
 *           '         ~-|      /|    |-~\~~       __--~~
 *                       |-~~-_/ |    |   ~\_   _-~            /\
 *                            /  \     \__   \/~                \__
 *                        _--~ _/ | .-~~____--~-/                  ~~==.
 *                       ((->/~   '.|||' -_|    ~~-/ ,              . _||
 *                                  -_     ~\      ~~---l__i__i__i--~~_/
 *                                  _-~-__   ~)  \--______________--~~
 *                                //.-~~~-~_--~- |-------~~~~~~~~
 *                                       //.-~~~--\
 *                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 *                               神兽保佑            永无BUG
 */

// 文章红包 / 赚小钱 接口
import { RuanRequest } from '@/utils'

export const getRedStatistics = (data) => RuanRequest('/dtsPostRedPacketInfo/redStatistics', data, 'get')

// /dtsPostCategory/selectCategory
export const selectCategory = (data) => RuanRequest('/dtsPostCategory/selectCategory', data)

// 发布文章
export const addPublishArticleApi = (data) => RuanRequest('/dtsPostBbs/publishArticle', data)

// /dtsPostBbs/postList
export const getPostList = (data) => RuanRequest('/dtsPostBbs/postList', data)

// /dtsPostBbs/postDetails
export const getPostDetails = (data) => RuanRequest('/dtsPostBbs/postDetails', data)

// /dtsPostRedPacketInfo/lookPostRed
export const lookPostRed = (data) => RuanRequest('/dtsPostRedPacketInfo/lookPostRed', data)

// /dtsPostBbs/postDetailsEdit
export const postDetailsEdit = (data) => RuanRequest('/dtsPostBbs/postDetailsEdit', data)

// /dtsPostRedPacketRecord/dataStatistics 用户数据统计
export const dataStatistics = (data) => RuanRequest('/dtsPostRedPacketRecord/dataStatistics', data, 'GET')

// /dtsPostRedPacketInfo/redStatistics  我的红包数据转化统计
export const redStatistics = (data) => RuanRequest('/dtsPostRedPacketInfo/redStatistics', data, 'GET')

// /dtsPostBbs/postDetailsDelete 删除
export const postDetailsDelete = (data) => RuanRequest('/dtsPostBbs/postDetailsDelete', data, 'GET')

// /dtsPostBbs/isShop
export const userIsShop = (data) => RuanRequest('/dtsPostBbs/isShop', data, 'GET')