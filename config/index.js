// 线上助力通
// export const SheQu1_URL = 'https://www.zhult.com/test-'
export const SheQu1_URL = 'https://www.zhult.com/'
// export const SheQu1_URL = "http://192.168.0.74:8781/";
// 线上团蜂
export const SheQu_URL = 'https://www.tuanfengkeji.cn:9527/dts-app-api'

export const RUAN_URL = 'https://www.tuanfengkeji.cn:9527/dts-app-api/wx' // 生产
// export const RUAN_URL = 'https://www.tuanfengkeji.cn:8098/dts-app-api/wx' // 测试
// export const RUAN_URL = 'http://192.168.0.91:8089/demo/wx' // 本地
// export const RUAN_URL = 'http://192.168.0.91:9107/demo/wx' // 新团蜂本地
// export const RUAN_URL = 'http://192.168.0.108:8080/demo/'

export const IMG_UPLOAD_URL = 'https://www.tuanfengkeji.cn:9527/dts-app-api/wx/storage/upload'

export const DEYI_URL = 'https://bus.deyisoft.cn:11112/dts-wx-api/wx'

// 本地
export const XZL_URL = 'http://192.168.0.79:8080'

export const TEST_URL = 'http://192.168.0.52:8080/demo/wx/api/syb/orderPayH5'

export const BASE_WS_API = 'wss://www.tuanfengkeji.cn:8098/dts-app-api/ws' // 生产
// export const BASE_WS_API = 'wss://www.tuanfengkeji.cn:8080/api/ws'; // 生产
// export const BASE_WS_API = 'wss://www.tuanfengkeji.cn:8098/dts-admin-api/webSocket'  // 测试

// 师傅的

export const sf = 'https://www.zhult.com/samrtWorker' // 线上
// export const sf = "https://www.zhult.com/test-samrtWorker"; // 测试
// export const sf = "/sf"; // 本地

// 团蜂H5项目地址
export const A_TF_MAIN = 'https://www.tuanfengkeji.cn/TFShop_Uni_H5'
// 新团蜂H5的接口路径
export const ANOTHER_TF_INTERFACE = 'https://nsappapi.tuanfengkeji.cn'
// export const ANOTHER_TF_INTERFACE = 'http://192.168.0.91:9107'
// 新团蜂入驻端项目地址
export const ANOTHER_TF_SETTLE = 'https://nsh51.tuanfengkeji.cn'

let shopUrl = ''
if (process.env.NODE_ENV === 'development') {
	shopUrl = 'http://www.tuanfengkeji.cn:8098/dts-app-api'
} else {
	shopUrl = 'https://www.tuanfengkeji.cn:9527/dts-app-api'
}

export { shopUrl }
