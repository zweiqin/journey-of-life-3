import { ANOTHER_TF_INTERFACE } from '../config'
import { T_STORAGE_KEY } from '../constant'

const request = (base_url) => function (url, data = {}, method = 'post', cb, header) {
	return new Promise((resolve, reject) => [
		uni.request({
			url: base_url + url,
			data,
			method,
			header: {
				...header,
				Authorization: uni.getStorageSync(T_STORAGE_KEY).token
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

export const AnotherTFRequest = request(ANOTHER_TF_INTERFACE)
