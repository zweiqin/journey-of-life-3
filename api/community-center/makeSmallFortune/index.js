import { endRequest, request2, XZLRequest, SheQuRequest, SheQu1Request, RuanRequest } from '@/utils';
import { USER_TOKEN } from 'constant';


export const getRedStatistics = (data) => RuanRequest('/dtsPostRedPacketInfo/redStatistics', data, 'get');