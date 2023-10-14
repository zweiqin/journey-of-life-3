// export { GyRequest as request, LqbRequest, RuanRequest } from "./DWHRequest";
// export { fomartNumber, removeCache, getUserId, getUserId } from "./DWHutils";
export { RuanRequest, XZLRequest, SheQuRequest, SheQu1Request, shopRequest, huangRequest, endRequest, shopRequest1 } from './DWHRequest';
export {
  fomartNumber,
  removeCache,
  getUserId,
  checkWhoami,
  useCopy,
  handleDebounce,
  getRandom,
  randomRGB,
  timestampToTime,
  throttle,
  isInWx,
  isVideoSource,
  convertToDecimal
} from './DWHutils';
export { formatTime } from './util';
export { tradeOrderNo, payFn, payOrderUtil } from './pay';
export { saveImg } from './upload';
export { getAdressDetailByLngLat, getLngLatByAddress, MapLoader, isUserEmpowerLocationPermission, getCurrentLocation } from './localtion';
export { QRCode as generateCode } from './generateQrcode';
export { request2 } from './request';
// #ifdef H5
export { getUrlCode } from './DWHutils';
// #endif
