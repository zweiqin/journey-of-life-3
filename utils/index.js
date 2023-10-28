// export { GyRequest as request, LqbRequest, RuanRequest } from "./DWHRequest";
// export { fomartNumber, removeCache, getUserId, getUserId } from "./DWHutils";
export { RuanRequest, XZLRequest, SheQuRequest, SheQu1Request, shopRequest, huangRequest, endRequest, shopRequest1 } from './DWHRequest'
export { AnotherTFRequest } from './AnotherTFRequest.js'
export {
	fomartNumber,
	removeCache,
	getUserId,
	getStorageKeyToken,
	checkWhoami,
	useCopy,
	handleDebounce,
	getRandom,
	randomRGB,
	timestampToTime,
	throttle,
	isInWx,
	isVideoSource,
	convertToDecimal,
	isSubarray,
	tradeOrderNo,
	jumpToOtherProject
} from './DWHutils'
export { formatTime } from './util'
export { payFn, payShopFn } from './pay'
export { saveImg } from './upload'
export { navigationAddress, getAdressDetailByLngLat, getLngLatByAddress, MapLoader, isUserEmpowerLocationPermission, getCurrentLocation } from './localtion'
export { QRCode as generateCode } from './generateQrcode'
export { request2 } from './request'
// #ifdef H5
export { getUrlCode } from './DWHutils'
// #endif
