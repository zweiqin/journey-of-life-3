import { clearAllCache } from 'constant'
import { RUAN_URL, DEYI_URL, XZL_URL, SheQu_URL, SheQu1_URL, sf, shopUrl } from '../config'
import store from '../store'

const request = (base_url) => function (url, data = {}, method = 'post', cb, header) {
	return new Promise((resolve, reject) => [
		uni.request({
			url: base_url + url,
			data,
			method,
			header: {
				...header,
				token: uni.getStorageSync('USER_TOKEN')
			},
			success: (res) => {
				resolve(res.data)
			},
			fail: (error) => {
				reject(error)
			},

			complete: () => {
				cb && typeof cb === 'function' && cb()
			}
		})
	])
}

const service = (base_url, hideLoading) => function (url, data = {}, method = 'post', cb, header) {
	uni.showLoading()
	return new Promise((resolve, reject) => [
		uni.request({
			url: base_url + url,
			data,
			header,
			method,
			success: (res) => {
				if (res.data.errno === 780) {
					uni.showToast({
						title: '系统内部错误',
						icon: 'none',
						mask: true
					})
					reject(res.data.errmsg)
					return
				}

				if (res.data.errmsg.includes('当前token已失效')) {
					uni.showToast({
						title: '登录失效，请重新登陆',
						icon: 'none',
						mask: true
					})
					clearAllCache()
					store.dispatch('auth/logout', true)

					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/login/login'
						})
					}, 1000)

					return
				}

				if (res.data.errno !== 0) {
					uni.showToast({
						title: res.data.errmsg,
						icon: 'none',
						mask: true
					})
					reject(res.data.errmsg)
					return
				} else if (res.data.errmsg == '用户未登录') {
					uni.showModal({
						title: '提示',
						content: '您还未登录，请先去登录',
						showCancel: true,
						success(res) {
							uni.navigateTo({ url: '/pages/login/login' })
						}
					})
				} else {
					resolve(res.data)
				}

				uni.hideLoading()
			},
			fail: (error) => {
				uni.hideLoading()
				reject(error)
			},

			complete: () => {
				cb && typeof cb === 'function' && cb()
			}
		})
	])
}

const endService = (base_url) => function (config) {
	const { url, data = {}, method = 'post', cb, header, loading } = config
	loading && uni.showLoading()
	return new Promise((resolve, reject) => [
		uni.request({
			url: base_url + url,
			data,
			header,
			method,
			success: (res) => {
				const data = res.data
				if (data.code == '20000' || data.code == '0') {
					resolve(data.data)
				} else {
					reject(data.msg)
				}
				loading && uni.hideLoading()
			},
			fail: (error) => {
				loading && uni.hideLoading()
				reject(error)
			},

			complete: () => {
				cb && typeof cb === 'function' && cb()
			}
		})
	])
}

export const XZLRequest = request(XZL_URL)
export const DEYIRequest = request(DEYI_URL)
export const SheQuRequest = request(SheQu_URL)
export const SheQu1Request = request(SheQu1_URL)

export const RuanRequest = request(RUAN_URL)
export const shopRequest = service(RUAN_URL)
export const shopRequest1 = service(shopUrl)
export const huangRequest = service(RUAN_URL)

export const endRequest = endService(sf)
