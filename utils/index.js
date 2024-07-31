export { RuanRequest, SheQuRequest, SheQu1Request, shopRequest, endRequest, shopRequest1 } from './DWHRequest'
export { AnotherTFRequest } from './AnotherTFRequest.js'
export {
	fomartNumber,
	removeCache,
	getUserId,
	getStorageUserId,
	getStorageKeyToken,
	checkWhoami,
	useCopy,
	handleDebounce,
	getRandom,
	randomRGB,
	timestampToTime,
	timeFormatting,
	throttle,
	isInWx,
	isVideoSource,
	convertToDecimal,
	isSubarray,
	tradeOrderNo,
	jumpToOtherProject,
	isH5InWebview,
	isVideo,
	saveImg
} from './DWHutils'
export { resolveGoodsDetailSkuSituation, resolveGoodsDetailTagsSituation, resolveShowCanNotBuyMsg, resolveGetOrderSettlement, resolveIntegralSelect, resolveCalcOrderTotal, resolveShopCouponItemSelect, resolvePlatformCouponItemSelect, resolveVoucherData, resolveVoucherPaySelect, resolveSubmitOrder } from './networkInterface'
export { formatTime } from './util'
export { payFn, payShopFn } from './pay'
export { navigationAddress, getAdressDetailByLngLat, getLngLatByAddress, MapLoader, isUserEmpowerLocationPermission, getCurrentLocation } from './localtion'
export { request2 } from './request'
// #ifdef H5
export { getUrlCode } from './DWHutils'
// #endif
export * from './share'
