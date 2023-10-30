// 画布配置
// import Cookies from 'js-cookie'
import { T_STORAGE_KEY } from '../../../constant'

const config = {
	// terminal: 4, // 画布设备 1 小程序，2 H5，3 App 4 电脑
	typeId: 0, // 页面类型 0 C端 1 平台画布，2 自定义页面，3 商家店铺装修
	getToken() {
		return uni.getStorageSync(T_STORAGE_KEY).token
	}
}

export default config
