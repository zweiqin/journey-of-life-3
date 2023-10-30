// 寄件
export const jiSenderInfo = 'JI_SENDER_INFO'
export const jiconsigneeInfo = 'JI_CONSIGNEE_INFO'
export const jiRemarks = 'JI_REMARKS'
export const jiOrderGoodsList = 'JI_ORDER_GOODS_LIST'
export const VALUE_ADDED_SERVICES = 'VALUE_ADDED_SERVICES'
export const JI_EDIT_ORDER_ID = 'JI_EDIT_ORDER_ID'
export const APPONIT_WULIU_QIYE_ID = 'APPONIT_WULIU_QIYE_ID'

// auth
export const USER_ID = 'USER_ID'
export const USER_TOKEN = 'USER_TOKEN'
export const user_INFO = 'user_INFO'
export const USER_INFO = 'user_INFO'
export const LOGIN_FORM = 'LOGIN_FORM'
export const T_STORAGE_KEY = 'T_STORAGE_KEY'

// 绑定
export const T_NEW_BIND_TYPE = 'T_NEW_BIND_TYPE'
export const T_NEW_BIND_CODE = 'T_NEW_BIND_CODE'
export const T_NEW_BIND_ID = 'T_NEW_BIND_ID'

// home page
export const STYLE_LIST = 'STYLE_LIST'

// user center
export const WORDS_LIST = 'WORDS_LIST'
export const SELECT_WORDS = 'SELECT_WORDS'

// goods
export const PAY_GOODS = 'PAY_GOODS'
export const PAY_SHOP_GOODS = 'PAY_SHOP_GOODS'
export const SELECT_ADDRESS = 'SELECT_ADDRESS'
export const STORE_TYPES = 'STORE_TYPES'
export const CAR_GOODS_DETAIL = 'CAR_GOODS_DETAIL'
export const CAR_GOODS_DETAIL_ALL = 'CAR_GOODS_DETAIL_ALL'
export const T_PAY_ORDER = 'T_PAY_ORDER'
export const J_SELECT_ADDRESS = 'J_SELECT_ADDRESS'

// Event Name
export const CHANGE_GOODS_CHECKED_EVENT = 'CHANGE_GOODS_CHECKED_EVENT'
export const ADD_DELETE_GOODS_EVENT = 'ADD_DELETE_GOODS_EVENT'
export const CHANGE_DELETE_LIST_EVENT = 'CHANGE_DELETE_LIST_EVENT'

export const NEW_BIND_ID = 'NEW_BIND_ID'
export const NEW_BIND_ACTIVITY_ID = 'NEW_BIND_ACTIVITY_ID'
export const NEW_BIND_SERVICE_ID = 'NEW_BIND_SERVICE_ID'
export const NEW_BIND_SERVICE_URL = 'NEW_BIND_SERVICE_URL'
export const IN_TIMES = 'IN_TIMES'

export const T_CURRENT_ADDRESS = 'T_CURRENT_ADDRESS'

export const COMMUNITY_ORDER_NO = 'COMMUNITY_ORDER_NO'
export const COMMUNITY_ORDER_ITEM_NO = 'COMMUNITY_ORDER_ITEM_NO'

// 乱七八糟妈的
export const SF_INVITE_CODE = 'SF_INVITE_CODE'
export const GROUP_INVITE_CODE = 'GROUP_INVITE_CODE'
export const B_SERVE_ORDER_NO = 'B_SERVE_ORDER_NO'
export const B_SHOP_ORDER_NO = 'B_SHOP_ORDER_NO'

export const MINI_PROGRAM_TAG = 'MINI_PROGRAM_TAG'
export const USER_SELECT_ADDRESS = 'USER_SELECT_ADDRESS'

export const IMG_UPLOAD_URL = 'https://www.tuanfengkeji.cn:9527/dts-app-api/wx/storage/upload'
export const VIDEO_TYPE = ['.avi', '.wmv', '.mpg', '.mpeg', '.mov', '.rm', '.ram', '.swf', '.flv', '.mp4']

export const clearAllCache = () => {
	[
		COMMUNITY_ORDER_NO,
		COMMUNITY_ORDER_ITEM_NO,
		jiSenderInfo,
		jiconsigneeInfo,
		jiRemarks,
		jiOrderGoodsList,
		VALUE_ADDED_SERVICES,
		JI_EDIT_ORDER_ID,
		APPONIT_WULIU_QIYE_ID,
		USER_ID,
		USER_TOKEN,
		user_INFO,
		USER_INFO,
		LOGIN_FORM,
		T_STORAGE_KEY,
		STYLE_LIST,
		WORDS_LIST,
		SELECT_WORDS,
		PAY_GOODS,
		SELECT_ADDRESS,
		CAR_GOODS_DETAIL,
		CAR_GOODS_DETAIL_ALL,
		T_PAY_ORDER,
		J_SELECT_ADDRESS,
		CHANGE_GOODS_CHECKED_EVENT,
		ADD_DELETE_GOODS_EVENT,
		CHANGE_DELETE_LIST_EVENT,
		NEW_BIND_ID,
		NEW_BIND_ACTIVITY_ID,
		NEW_BIND_SERVICE_ID,
		NEW_BIND_SERVICE_URL,
		IN_TIMES,
		T_CURRENT_ADDRESS,
		SF_INVITE_CODE,
		MINI_PROGRAM_TAG,
		USER_SELECT_ADDRESS,
		GROUP_INVITE_CODE
	].forEach((item) => {
		uni.removeStorageSync(item)
	})
}
