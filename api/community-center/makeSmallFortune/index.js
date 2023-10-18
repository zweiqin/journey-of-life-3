import { endRequest, request2, XZLRequest, SheQuRequest, SheQu1Request, RuanRequest } from '@/utils';
import { USER_TOKEN } from 'constant';


export const getRedStatistics = (data) => RuanRequest('/dtsPostRedPacketInfo/redStatistics', data, 'get');

// /dtsPostCategory/selectCategory
export const selectCategory = (data) => RuanRequest('/dtsPostCategory/selectCategory', data);

// /dtsPostBbs/postList
export const getPostList = (data) => RuanRequest('/dtsPostBbs/postList', data);

// /dtsPostBbs/postDetails
export const getPostDetails = (data) => RuanRequest('/dtsPostBbs/postDetails', data);

// /dtsPostRedPacketInfo/lookPostRed
export const lookPostRed = (data) => RuanRequest('/dtsPostRedPacketInfo/lookPostRed', data);