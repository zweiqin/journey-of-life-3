import { endRequest, request2, XZLRequest, SheQuRequest, SheQu1Request, RuanRequest } from '@/utils'
import { USER_TOKEN } from 'constant'

export const getRedStatistics = (data) => RuanRequest('/dtsPostRedPacketInfo/redStatistics', data, 'get')

// /dtsPostCategory/selectCategory
export const selectCategory = (data) => RuanRequest('/dtsPostCategory/selectCategory', data)

// 发布文章
export const addPublishArticleApi = (data) => RuanRequest('/dtsPostBbs/publishArticle', data)
