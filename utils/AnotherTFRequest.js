import { ANOTHER_TF_INTERFACE } from '../config'
import { T_STORAGE_KEY } from '../constant'
import store from '../store'

const request = (base_url) => function (url, data = {}, method = 'GET', cb, header = {}) {
	return new Promise((resolve, reject) => {
		header['Content-Type'] = 'application/json'
		const res = uni.getStorageSync(T_STORAGE_KEY) || {}
		if (res.token) header.Authorization = res.token
		if (res.ssoUserInfo && res.ssoUserInfo.token) header['satoken-user'] = res.ssoUserInfo.token
		// showLoading()
		let _isShowToast = true
		if (data._isShowToast === false) (_isShowToast = false) && delete data._isShowToast
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
					if ((res.data.code === '200') || (res.data.code === '')) {
						resolve(res.data)
					} else if ((res.data.code === '20004') || (res.data.code === '20005') || (res.data.code == 40005)) { // 有res.data
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
					} else { // 有res.data
						reject(res) // 先执行完下面拦截器内的逻辑，再执行拦截器之外的逻辑。reject则返回res的信息，用于区分resolve的res.data的数据结构（通过(res.data).code==='200'或''）
						// 这里是根据接口报错的情况。如果为true，对于小程序环境，则替换拦截器之外的catch里进行其它的toast，对于非小程序环境则不替换。
						// 如果为false则都不替换。但针对于以下其它网络本身的reject情况，为true则都替换。所以如果外面有要展示的toast，则最好通过_isShowToast为false更全面
						if (_isShowToast) {
							// #ifndef MP
							uni.showToast({
								title: res.data.message,
								icon: 'none'
							})
							// #endif
							// #ifdef MP
							// 考虑到对于微信小程序，在拦截器之外的catch里进行hideloading也会隐藏toast。但如果要在拦截器之外的catch里进行其它的toast，则可以通过_isShowToast为false，不弹出拦截器内的该toast
							Promise.resolve().then(() => {
								Promise.resolve().then(() => {
									uni.showToast({
										title: res.data.message,
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

export const AnotherTFRequest = request(ANOTHER_TF_INTERFACE)
