import { clearAllCache } from 'constant'
import { ANOTHER_TF_INTERFACE } from '../config'
import { T_STORAGE_KEY } from '../constant'
import store from '../store'

const request = (base_url) => function (url, data = {}, method = 'GET', cb, header = {}) {
	return new Promise((resolve, reject) => {
		header['Content-Type'] = 'application/json'
		const res = uni.getStorageSync(T_STORAGE_KEY) || {}
		const token = res.token
		if (token) {
			header.Authorization = token
		}
		// showLoading()
		uni.request({
			url: base_url + url,
			data,
			method,
			header,
			success: (res) => {
				// console.log('拦截器', JSON.stringify(res))
				// console.log('拦截器', res)
				// hideLoading()
				if (res.statusCode == 200) {
					if (res.data.code === '200' || res.data.code === '') {
						resolve(res.data)
					} else if (res.data.code === '20004' || res.data.code === '20005') {
						uni.showToast({
							title: '鉴权失败，请重新登陆',
							icon: 'none',
							mask: true
						})
						uni.removeStorageSync(T_STORAGE_KEY)
						clearAllCache()
						store.dispatch('auth/logout', true)
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/login/login'
							})
						}, 1000)
						reject(res.data)
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
						reject(res.data.message)
					}
				} else {
					reject(res)
				}
			},
			fail: (res) => {
				// hideLoading()
				reject(res)
			},
			complete: () => {
				cb && typeof cb === 'function' && cb()
			}
		})
	})
}

export const AnotherTFRequest = request(ANOTHER_TF_INTERFACE)