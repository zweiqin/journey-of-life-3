import { whoami } from '../api/auth'
import { USER_ID, USER_TOKEN } from '../constant'
import { jsonp } from 'vue-jsonp'

/**
 * @description 解决小数计算精度问题（en，你应该使用big.js）
 * @param {Number, String} data 数字
 * @param {Number} accuracy 保留几位小数
 * @returns
 */

export const fomartNumber = (data, accuracy = 2) => {
	const temp = data + ''
	if (temp.includes('.')) {
		return (data * 1).toFixed(accuracy)
	}
	return data
}

/**
 * @description 批量清除缓存
 * @param {String[]} cacheArr 要清除的缓存string数组
 */

export const removeCache = (cacheArr) => {
	if (!Array.isArray(cacheArr)) {
		return
	}

	for (const item of cacheArr) {
		uni.removeStorageSync(item)
	}
}

/**
 * 检测登录是否有效
 */

export const checkWhoami = () => {
	new Promise(async (resolve, reject) => {
		const userId = getUserId()
		const res = await whoami(userId)
		if (res.errno !== 0) {
			uni.navigateTo({
				url: '/pages/login/login'
			})
		}
	})
}

/**
 * 获取用户userid
 * @returns
 */

export const getUserId = () => {
	const userId = uni.getStorageSync(USER_ID)
	if (!userId) {
		// uni.showToast({
		//   title: "登录已失效，请重新登录",
		//   duration: 2000,
		//   icon: "none",
		// });

		// uni.navigateTo({
		//   url: "/pages/login/login",
		// });
		uni.showModal({
			title: '提示',
			content: '您还未登录，是否去登录？',
			success(res) {
				if (res.confirm) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				} else if (res.cancel) {
					// uni.navigateBack();
				}
			}
		})
		return
	}
	return userId
}

/**
 * 点击复制
 * @param {*} text
 */

export const useCopy = (text) => {
	const input = document.createElement('input')
	input.value = text
	document.body.appendChild(input)
	input.select()
	document.execCommand('Copy')
	document.body.removeChild(input)
	uni.showToast({
		title: '单号复制成功'
	})
}

/**
 * @description 防抖函数
 * @param {*} func
 * @param {*} wait
 * @param {*} immediate
 * @returns
 */

export function handleDebounce(func, wait, immediate) {
	let timeout

	return function () {
		const context = this
		const args = arguments

		if (timeout) clearTimeout(timeout)
		if (immediate) {
			var callNow = !timeout
			timeout = setTimeout(() => {
				timeout = null
			}, wait)
			if (callNow) func.apply(context, args)
		} else {
			timeout = setTimeout(function () {
				func.apply(context, args)
			}, wait)
		}
	}
}

export const getAdressDetailByLngLat = (lat, lng) => new Promise((resolve, reject) => {
	// #ifdef H5
	jsonp('https://restapi.amap.com/v3/geocode/regeo', {
		key: 'fcd4b7ee70f357abeffaef7b43d364b3',
		location: `${lng},${lat}`
	})
		.then((res) => {
			resolve(res)
		})
		.catch((err) => {
			reject(err)
		})
	// #endif
})

export function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min) + min)
}

export const randomRGB = () => {
	const r = Math.floor(Math.random() * 255)
	const g = Math.floor(Math.random() * 255)
	const b = Math.floor(Math.random() * 255)
	return `rgb(${r}, ${g}, ${b})`
}

export const timestampToTime = (timestamp) => {
	// 时间戳为10位需*1000，时间戳为13位不需乘1000
	// var date = new Date(timestamp * 1000);
	var date = new Date(timestamp)
	var Y = date.getFullYear() + '-'
	var M =
      (date.getMonth() + 1 < 10
      	? '0' + (date.getMonth() + 1)
      	: date.getMonth() + 1) + '-'
	var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
	var h = date.getHours() + ':'
	var m = date.getMinutes() + ':'
	var s = date.getSeconds()
	return Y + M + D + h + m + s
	// console.log(timestampToTime(1670145353)); //2022-12-04 17:15:53
}
