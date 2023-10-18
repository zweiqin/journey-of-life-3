// 线上助力通
// export const SheQu1_URL = 'https://www.zhult.com/test-'
export const SheQu1_URL = 'https://www.zhult.com/';
// export const SheQu1_URL = "http://192.168.0.49:8781/";
// 线上团蜂
export const SheQu_URL = 'https://www.tuanfengkeji.cn:9527/dts-app-api';

// export const RUAN_URL = 'https://www.tuanfengkeji.cn:9527/dts-app-api/wx'; // 生产
// export const RUAN_URL = 'https://www.tuanfengkeji.cn:8098/dts-app-api/wx' // 测试
export const RUAN_URL = 'http://192.168.0.91:8089/demo/wx' // 本地
// export const RUAN_URL = 'http://192.168.0.108:8080/demo/'

export const DEYI_URL = 'https://bus.deyisoft.cn:11112/dts-wx-api/wx';

// 本地
export const XZL_URL = 'http://192.168.0.79:8080';

export const TEST_URL = 'http://192.168.0.52:8080/demo/wx/api/syb/orderPayH5';

export const BASE_WS_API = 'wss://www.tuanfengkeji.cn:8098/dts-app-api/ws'; // 生产
// export const BASE_WS_API = 'wss://www.tuanfengkeji.cn:8080/api/ws'; // 生产
// export const BASE_WS_API = 'wss://www.tuanfengkeji.cn:8098/dts-admin-api/webSocket'  // 测试

/**
 * 师傅的
 */
// 线上
export const sf = 'https://www.zhult.com/samrtWorker';
// 测试
// export const sf = "https://www.zhult.com/test-samrtWorker";
// 本地
// export const sf = "/sf";

let shopUrl = '';
if (process.env.NODE_ENV === 'development') {
  shopUrl = 'http://www.tuanfengkeji.cn:8098/dts-app-api';
} else {
  shopUrl = 'https://www.tuanfengkeji.cn:9527/dts-app-api';
}

export { shopUrl };
