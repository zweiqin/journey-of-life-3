// 寄件
export const jiSenderInfo = "JI_SENDER_INFO";
export const jiconsigneeInfo = "JI_CONSIGNEE_INFO";
export const jiRemarks = "JI_REMARKS";
export const jiOrderGoodsList = "JI_ORDER_GOODS_LIST";
export const VALUE_ADDED_SERVICES = "VALUE_ADDED_SERVICES";
export const JI_EDIT_ORDER_ID = "JI_EDIT_ORDER_ID";
export const APPONIT_WULIU_QIYE_ID = "APPONIT_WULIU_QIYE_ID";

// auth
export const USER_ID = "USER_ID";
export const USER_TOKEN = "USER_TOKEN";
export const user_INFO = "user_INFO";
export const USER_INFO = "user_INFO";
export const LOGIN_FORM = "LOGIN_FORM";

// home page
export const STYLE_LIST = "STYLE_LIST";

// user center
export const WORDS_LIST = "WORDS_LIST";
export const SELECT_WORDS = "SELECT_WORDS";

// goods
export const PAY_GOODS = "PAY_GOODS";
export const SELECT_ADDRESS = "SELECT_ADDRESS";
export const STORE_TYPES = "STORE_TYPES";
export const CAR_GOODS_DETAIL = "CAR_GOODS_DETAIL";
export const CAR_GOODS_DETAIL_ALL = "CAR_GOODS_DETAIL_ALL";
export const PAY_ORDER = "PAY_ORDER";
export const J_SELECT_ADDRESS = "J_SELECT_ADDRESS";
export const TUAN_ORDER_SN = "TUAN_ORDER_SN";
export const PAY_SHORT_ORDER_NO = "PAY_SHORT_ORDER_NO";

// Event Name
export const CHANGE_GOODS_CHECKED_EVENT = "CHANGE_GOODS_CHECKED_EVENT";
export const ADD_DELETE_GOODS_EVENT = "ADD_DELETE_GOODS_EVENT";
export const CHANGE_DELETE_LIST_EVENT = "CHANGE_DELETE_LIST_EVENT";

export const NEW_BIND_ID = "NEW_BIND_ID";
export const NEW_BIND_ACTIVITY_ID = "NEW_BIND_ACTIVITY_ID";
export const NEW_BIND_SERVICE_ID = "NEW_BIND_SERVICE_ID";
export const NEW_BIND_SERVICE_URL = "NEW_BIND_SERVICE_URL";
export const IN_TIMES = "IN_TIMES";

export const CURRENT_ADDRESS = "CURRENT_ADDRESS";

export const COMMUNITY_ORDER_NO = "COMMUNITY_ORDER_NO";
export const COMMUNITY_ORDER_ITEM_NO = "COMMUNITY_ORDER_ITEM_NO";

// 乱七八糟妈的
export const SF_INVITE_CODE = "SF_INVITE_CODE";

export const MINI_PROGRAM_TAG = "MINI_PROGRAM_TAG";
export const USER_SELECT_ADDRESS = "USER_SELECT_ADDRESS";

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
    STYLE_LIST,
    WORDS_LIST,
    SELECT_WORDS,
    PAY_GOODS,
    SELECT_ADDRESS,
    TUAN_ORDER_SN,
    CAR_GOODS_DETAIL,
    CAR_GOODS_DETAIL_ALL,
    PAY_ORDER,
    J_SELECT_ADDRESS,
    TUAN_ORDER_SN,
    PAY_SHORT_ORDER_NO,
    CHANGE_GOODS_CHECKED_EVENT,
    ADD_DELETE_GOODS_EVENT,
    CHANGE_DELETE_LIST_EVENT,
    NEW_BIND_ID,
    NEW_BIND_ACTIVITY_ID,
    NEW_BIND_SERVICE_ID,
    NEW_BIND_SERVICE_URL,
    IN_TIMES,
    CURRENT_ADDRESS,
    SF_INVITE_CODE,
    MINI_PROGRAM_TAG,
    USER_SELECT_ADDRESS,
  ].forEach((item) => {
    uni.removeStorageSync(item);
  });
};
