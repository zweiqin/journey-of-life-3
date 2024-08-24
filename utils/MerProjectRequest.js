import { MER_TF_INTERFACE } from '../config'
import store from '../store'

const request = (base_url) => function (url, data = {}, method = 'GET', cb, header = {}) {
	return new Promise((resolve, reject) => {
		if (!'token') {
			header['Authorization-business'] = 'token'
			header.shopId = 'shopId'
			header['Content-Type'] = 'application/json; charset=UTF-8'
		}
		let _isShowToast = true
		if (data._isShowToast === false) (_isShowToast = false) && delete data._isShowToast
		uni.request({
			url: base_url + url,
			data,
			method,
			header,
			success: (res) => {
				// console.log('拦截器', JSON.stringify(res))
				if (res.statusCode == 200) {
					if ((res.data.code === '200') || (res.data.code === '')) {
						resolve(res.data)
					} else if ([20003, '20003', 20004, '20004', 20005, '20005'].includes(res.data.code)) { // 有res.data
						uni.showModal({
							title: '提示',
							content: '账号未登录，请重新登陆！',
							success(res) {
								if (res.confirm) {
									store.dispatch('auth/logoutAction')
									setTimeout(() => {
										uni.navigateTo({
											url: '/pages/login/login'
										})
									}, 1000)
								} else if (res.cancel) {
									// uni.navigateBack();
								}
							}
						})
						reject(res)
					} else if ([50008, 50012, 50014].includes(res.data.code)) { // 有res.data
						uni.showModal({
							title: 'Confirm logout',
							content: 'You have been logged out, you can cancel to stay on this page, or log in again',
							success(res) {
								if (res.confirm) {
									store.dispatch('auth/logoutAction')
									setTimeout(() => {
										uni.navigateTo({
											url: '/pages/login/login'
										})
									}, 1000)
								} else if (res.cancel) {
									// uni.navigateBack();
								}
							}
						})
						reject(res)
					} else { // 有res.data
						reject(res)
						if (_isShowToast) {
							// #ifndef MP
							uni.showToast({
								title: res.data.message || 'Error',
								icon: 'none'
							})
							// #endif
							// #ifdef MP
							Promise.resolve().then(() => {
								Promise.resolve().then(() => {
									uni.showToast({
										title: res.data.message || 'Error',
										icon: 'none'
									})
								})
							})
							// #endif
						}
					}
				} else { // 没有res.data
					reject(res)
					console.log('请求错误', res)
					if (_isShowToast) {
						Promise.resolve().then(() => {
							Promise.resolve().then(() => {
								uni.showToast({
									title: `请求错误：${res.errMsg}`,
									icon: 'none'
								})
							})
						})
					}
				}
			},
			fail: (e) => { // 没有e.data
				// hideLoading()
				reject(e)
				console.log('请求失败', e)
				if (_isShowToast) {
					Promise.resolve().then(() => {
						Promise.resolve().then(() => {
							uni.showToast({
								title: `请求失败：${e.errMsg}`,
								icon: 'none'
							})
						})
					})
				}
			},
			complete: () => {
				cb && typeof cb === 'function' && cb()
			}
		})
	})
}

export const MerProjectRequest = request(MER_TF_INTERFACE)
