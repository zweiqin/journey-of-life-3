// 另一个团蜂
export const T_RECEIVE_ITEM = 'T_RECEIVE_ITEM'
export const T_SKU_ITEM_MSG_LIST = 'T_SKU_ITEM_MSG_LIST'
export const T_SKU_ITEM_INFO = 'T_SKU_ITEM_INFO'
export const T_REFUND_APPLY_ITEM = 'T_REFUND_APPLY_ITEM'
export const T_AFTER_SALE_APPLY_REFUND = 'T_AFTER_SALE_APPLY_REFUND'

// 寄件
export const JI_SENDER_INFO = 'JI_SENDER_INFO'
export const JI_CONSIGNEE_INFO = 'JI_CONSIGNEE_INFO'
export const JI_REMARKS = 'JI_REMARKS'
export const JI_ORDER_GOODS_LIST = 'JI_ORDER_GOODS_LIST'
export const JI_VALUE_ADDED_SERVICES = 'JI_VALUE_ADDED_SERVICES'
export const JI_EDIT_ORDER_ID = 'JI_EDIT_ORDER_ID'
export const JI_APPONIT_WULIU_QIYE_ID = 'JI_APPONIT_WULIU_QIYE_ID'

// auth
export const USER_ID = 'USER_ID'
export const USER_TOKEN = 'USER_TOKEN'
export const USER_INFO = 'user_INFO'
export const T_STORAGE_KEY = 'T_STORAGE_KEY'
export const T_IDENTITY_INFO = 'T_IDENTITY_INFO'

// 绑定
export const T_REDIRECT_TYPE = 'T_REDIRECT_TYPE'
export const T_NEW_BIND_TYPE = 'T_NEW_BIND_TYPE'
export const T_NEW_BIND_CODE = 'T_NEW_BIND_CODE'
export const T_NEW_BIND_ID = 'T_NEW_BIND_ID'

// 曾经选择过或定位过的地址
export const T_SELECTED_ADDRESS = 'T_SELECTED_ADDRESS'

// goods
export const T_SELECT_ADDRESS = 'T_SELECT_ADDRESS'
export const T_PAY_GOODS = 'T_PAY_GOODS'
export const T_PAY_ORDER = 'T_PAY_ORDER'
export const T_COMMUNITY_ORDER_NO = 'T_COMMUNITY_ORDER_NO'

// 乱七八糟妈的
export const SF_INVITE_CODE = 'SF_INVITE_CODE'
export const ENTERPRISE_ORDERS_NO = 'ENTERPRISE_ORDERS_NO'
export const IS_SWITCH_ORDER = 'IS_SWITCH_ORDER'

export const clearAllCache = () => {
	[
		T_RECEIVE_ITEM,
		T_SKU_ITEM_MSG_LIST,
		T_SKU_ITEM_INFO,
		T_REFUND_APPLY_ITEM,
		T_AFTER_SALE_APPLY_REFUND,
		JI_SENDER_INFO,
		JI_CONSIGNEE_INFO,
		JI_REMARKS,
		JI_ORDER_GOODS_LIST,
		JI_VALUE_ADDED_SERVICES,
		JI_EDIT_ORDER_ID,
		JI_APPONIT_WULIU_QIYE_ID,
		USER_ID,
		USER_TOKEN,
		USER_INFO,
		T_IDENTITY_INFO,
		T_STORAGE_KEY,
		T_REDIRECT_TYPE,
		T_NEW_BIND_TYPE,
		T_NEW_BIND_CODE,
		T_NEW_BIND_ID,
		T_SELECTED_ADDRESS,
		T_SELECT_ADDRESS,
		T_PAY_GOODS,
		T_PAY_ORDER,
		T_COMMUNITY_ORDER_NO,
		SF_INVITE_CODE,
		IS_SWITCH_ORDER
	].forEach((item) => {
		uni.removeStorageSync(item)
	})
}
