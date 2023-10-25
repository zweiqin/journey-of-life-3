import { NEW_JFSHOP_INTERFACE } from '../config'

const request = (base_url) => function (url, data = {}, method = 'post', cb, header) {
	return new Promise((resolve, reject) => [
		uni.request({
			url: base_url + url,
			data,
			method,
			header: {
				...header,
				Authorization: uni.getStorageSync('NEW_JF_USER_INFO').token
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

export const newTFrequest = request(NEW_JFSHOP_INTERFACE)