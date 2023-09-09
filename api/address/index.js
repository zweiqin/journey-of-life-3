/*
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-23 09:58:38
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-23 16:51:23
 * @FilePath: \团蜂商城 - 副本\tuan-uniapp\api\address\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { RuanRequest, SheQu1Request } from '../../utils'

/**
 *
 * @param {地址列表} data
 * @returns
 */

export const getAddressListApi = (data) => RuanRequest('/newaddress/list', data, 'get')

/**
 *
 * @param {区域列表} data
 * @returns
 */

export const getRegionListApi = (data) => RuanRequest('/region/list', data, 'get')

// 地址新增，修改
export const getAddressSaveApi = (data) => RuanRequest('/newaddress/save', data)

export const updateAddressApi = (data) => RuanRequest('/newaddress/update', data)

// 地址详情
export const getAddressDetailApi = (data) => RuanRequest('/address/detail', data, 'get')

export const deleteAddressApi = (data) => RuanRequest('/newaddress/deleteById?id=' + data.id, data, 'DELETE')

// 根据地址动态查询对应的数据
export const queryDynamicDataApi = (data) => SheQu1Request(
	'laoa-huozhu/api/hz/order/third/queryDynamicData',
	data,
	'get'
)
