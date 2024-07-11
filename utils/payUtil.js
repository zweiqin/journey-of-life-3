import { ANOTHER_TF_INTERFACE } from '../config'
import { T_PAY_ORDER, T_STORAGE_KEY } from '../constant'
import { gotoOrderAppPayApi, gotoOrderH5PayApi, getSessionKeyAppApi, gotoOrderPayApi, payOrderSuccessApi, getPayMiniProgramQueryApi } from '../api/anotherTFInterface'
import store from '../store'
import { getUserId, isInWx, jumpToOtherProject } from './index'

// #ifdef H5
const jweixin = require('jweixin-module')

/**
 * 普通H5处理
 * @param payInfo 结算返回的支付信息
 */

async function payH5InEquipment(payInfo) {
	try {
		const res = await gotoOrderH5PayApi(payInfo)
		location.replace(res.data.mwebUrl)
	} catch (e) {
		uni.showToast({ title: '支付失败', icon: 'none' })
		setTimeout(() => {
			if ([1, 2].includes(payInfo.purchaseMode)) {
				uni.switchTab({ url: '/pages/order/order' })
			} else if ([3, 4, 5].includes(payInfo.purchaseMode)) {
				uni.redirectTo({ url: '/user/otherServe/payment-completed/index?state=fail' })
			}
		}, 2000)
	} finally {
		uni.hideLoading()
	}
}

/**
 * 微信内H5处理
 * @param payInfo 结算返回的支付信息
 * @param orderId 订单ID
 */

async function payH5InWechat(payInfo) {
	const res = await gotoOrderPayApi(payInfo)
	jweixin.config({
		debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		appId: res.data.appId, // 必填，公众号的唯一标识
		timestamp: res.data.timeStamp, // 必填，生成签名的时间戳
		nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
		signature: res.data.paySign, // 必填，签名，见附录1
		jsApiList: [ 'chooseWXPay' ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	})
	if ([1, 2].includes(payInfo.purchaseMode)) {
		jweixin.ready(function () {
			jweixin.checkJsApi({
				jsApiList: [ 'chooseWXPay' ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
				success(res) {},
				fail(res) {}
			})
			jweixin.chooseWXPay({
				timestamp: res.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
				nonceStr: res.data.nonceStr, // 支付签名随机串，不长于 32 位
				package: res.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
				signType: res.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
				paySign: res.data.paySign, // 支付签名
				success(res) {
					// 支付成功后的回调函数
					uni.showToast({ icon: 'none', title: '支付成功' })
					setTimeout(() => { uni.redirectTo({ url: '/another-tf/another-serve/paySuccessful/index?orderId=' + payInfo.orderId }) }, 2000)
				},
				cancel(r) {
					uni.showToast({ icon: 'none', title: '用户取消支付' })
					setTimeout(() => { uni.switchTab({ url: '/pages/order/order' }) }, 2000)
				},
				fail(res) {
					uni.showToast({ icon: 'none', title: '微信内支付错误' })
					setTimeout(() => { uni.switchTab({ url: '/pages/order/order' }) }, 2000)
				}
			})
		})
		jweixin.error(function (res) {
			uni.showToast({ icon: 'none', title: '微信内支付加载失败', duration: 3000 })
			setTimeout(() => { uni.switchTab({ url: '/pages/order/order' }) }, 2000)
		})
	} else if ([3, 4, 5].includes(payInfo.purchaseMode)) {
		jweixin.ready(function () {
			jweixin.checkJsApi({
				jsApiList: [ 'chooseWXPay' ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
				success(res) {},
				fail(res) {}
			})
			jweixin.chooseWXPay({
				timestamp: res.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
				nonceStr: res.data.nonceStr, // 支付签名随机串，不长于 32 位
				package: res.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
				signType: res.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
				paySign: res.data.paySign, // 支付签名
				success(res) {
					// 支付成功后的回调函数
					uni.showToast({ icon: 'none', title: '支付成功' })
					setTimeout(() => { uni.redirectTo({ url: '/user/otherServe/payment-completed/index' }) }, 2000)
				},
				cancel(r) {
					uni.showToast({ icon: 'none', title: '用户取消支付' })
					setTimeout(() => { uni.redirectTo({ url: '/user/otherServe/payment-completed/index?state=fail' }) }, 2000)
				},
				fail(res) {
					uni.showToast({ icon: 'none', title: '微信内支付错误' })
					setTimeout(() => { uni.redirectTo({ url: '/user/otherServe/payment-completed/index?state=fail' }) }, 2000)
				}
			})
		})
		jweixin.error(function (res) {
			uni.showToast({ icon: 'none', title: '微信内支付加载失败', duration: 3000 })
			setTimeout(() => { uni.redirectTo({ url: '/user/otherServe/payment-completed/index?state=fail' }) }, 2000)
		})
	}
}
// #endif

/**
 * 支付宝小程序拉起支付
 * @param payInfo 结算返回的支付信息
 * @return {Promise<void>}
 */

async function zhiAliPay(payInfo) {
	if ([1, 2].includes(payInfo.purchaseMode)) {
		try {
			const res = await gotoOrderPayApi(payInfo)
			uni.requestPayment({
				provider: 'alipay',
				orderInfo: res.data.tradeNo,
				success(payRes) {
					if (payRes.resultCode == '6001') {
						uni.showToast({ icon: 'none', title: '取消支付' })
						setTimeout(() => { uni.switchTab({ url: '/pages/order/order' }) }, 2000)
					} else if (payRes.resultCode == '9000') {
						uni.showToast({ icon: 'none', title: '支付成功' })
						setTimeout(() => { uni.redirectTo({ url: '/another-tf/another-serve/paySuccessful/index?orderId=' + payInfo.orderId }) }, 2000)
					}
				},
				fail(err) {
					uni.showToast({ icon: 'none', title: '支付取消' })
					setTimeout(() => { uni.switchTab({ url: '/pages/order/order' }) }, 2000)
				}
			})
		} catch (e) {
			uni.showToast({ title: '支付宝支付异常', icon: 'none' })
			setTimeout(() => { uni.switchTab({ url: '/pages/order/order' }) }, 2000)
		} finally {
			uni.hideLoading()
		}
	} else if ([3, 4, 5].includes(payInfo.purchaseMode)) {
		try {
			const res = await gotoOrderPayApi(payInfo)
			uni.requestPayment({
				provider: 'alipay',
				orderInfo: res.data.tradeNo,
				success(payRes) {
					if (payRes.resultCode == '6001') {
						uni.showToast({ icon: 'none', title: '取消支付' })
						setTimeout(() => { uni.redirectTo({ url: '/user/otherServe/payment-completed/index?state=fail' }) }, 2000)
					} else if (payRes.resultCode == '9000') {
						uni.showToast({ icon: 'none', title: '支付成功' })
						setTimeout(() => { uni.redirectTo({ url: '/user/otherServe/payment-completed/index' }) }, 2000)
					}
				},
				fail(err) {
					uni.showToast({ icon: 'none', title: '支付取消' })
					setTimeout(() => { uni.redirectTo({ url: '/user/otherServe/payment-completed/index?state=fail' }) }, 2000)
				}
			})
		} catch (e) {
			uni.showToast({ title: '支付宝支付异常', icon: 'none' })
			setTimeout(() => { uni.redirectTo({ url: '/user/otherServe/payment-completed/index?state=fail' }) }, 2000)
		} finally {
			uni.hideLoading()
		}
	}
}

/**
 * 微信小程序拉起支付
 * @param payInfo
 * @return {Promise<void>}
 */

async function mpWechatPay(payInfo) {
	if ([1, 2].includes(payInfo.purchaseMode)) {
		try {
			const res = await gotoOrderPayApi(payInfo)
			uni.requestPayment({
				provider: 'wxpay',
				timeStamp: res.data.timeStamp,
				nonceStr: res.data.nonceStr,
				package: res.data.package,
				signType: res.data.signType,
				paySign: res.data.paySign,
				success: async (payRes) => {
					// 拼团微信支付成功回调
					if (payInfo.collageId) await payOrderSuccessApi({ orderId: payInfo.orderId, collageId: payInfo.collageId })
					uni.showToast({ icon: 'none', title: '支付成功' })
					setTimeout(() => { uni.redirectTo({ url: '/another-tf/another-serve/paySuccessful/index?orderId=' + payInfo.orderId }) }, 2000)
				},
				fail(err) {
					uni.showToast({ icon: 'none', title: '用户取消支付' })
					setTimeout(() => { uni.switchTab({ url: '/pages/order/order' }) }, 2000)
				}
			})
		} catch (e) {
			uni.showToast({ title: '微信支付拉起失败', icon: 'none' })
			setTimeout(() => { uni.switchTab({ url: '/pages/order/order' }) }, 2000)
		}
	} else if ([3, 4, 5].includes(payInfo.purchaseMode)) {
		try {
			const res = await gotoOrderPayApi(payInfo)
			uni.requestPayment({
				provider: 'wxpay',
				timeStamp: res.data.timeStamp,
				nonceStr: res.data.nonceStr,
				package: res.data.package,
				signType: res.data.signType,
				paySign: res.data.paySign,
				success: async (payRes) => {
					// 拼团微信支付成功回调
					if (payInfo.collageId) await payOrderSuccessApi({ orderId: payInfo.orderId, collageId: payInfo.collageId })
					uni.showToast({ icon: 'none', title: '支付成功' })
					setTimeout(() => { uni.redirectTo({ url: '/user/otherServe/payment-completed/index' }) }, 2000)
				},
				fail(err) {
					uni.showToast({ icon: 'none', title: '用户取消支付' })
					setTimeout(() => { uni.redirectTo({ url: '/user/otherServe/payment-completed/index?state=fail' }) }, 2000)
				}
			})
		} catch (e) {
			uni.showToast({ title: '微信支付拉起失败', icon: 'none' })
			setTimeout(() => { uni.redirectTo({ url: '/user/otherServe/payment-completed/index?state=fail' }) }, 2000)
		}
	}
}

/**
 * App拉起微信支付
 * @param payInfo
 * @return {Promise<void>}
 */

async function appWechatPay(payInfo) {
	if ([1, 2].includes(payInfo.purchaseMode)) {
		try {
			const res = await gotoOrderAppPayApi(payInfo)
			const obj = {
				appid: res.data.appId,
				noncestr: res.data.nonceStr,
				package: 'Sign=WXPay',
				prepayid: res.data.prepayId,
				timestamp: res.data.timeStamp,
				sign: res.data.paySign,
				partnerid: res.data.partnerId
			}
			uni.requestPayment({
				provider: 'wxpay',
				orderInfo: obj,
				success(payRes) {
					uni.showToast({ icon: 'none', title: '支付成功' })
					setTimeout(() => { uni.redirectTo({ url: '/another-tf/another-serve/paySuccessful/index?orderId=' + payInfo.orderId }) }, 2000)
				},
				fail(err) {
					uni.showToast({ icon: 'none', title: '用户取消支付' })
					setTimeout(() => { uni.switchTab({ url: '/pages/order/order' }) }, 2000)
				}
			})
		} catch (e) {
			uni.showToast({ title: 'APP拉起微信支付失败', icon: 'none' })
			setTimeout(() => { uni.switchTab({ url: '/pages/order/order' }) }, 2000)
		} finally {
			uni.hideLoading()
		}
	} else if ([3, 4, 5].includes(payInfo.purchaseMode)) {
		try {
			const res = await gotoOrderAppPayApi(payInfo)
			const obj = {
				appid: res.data.appId,
				noncestr: res.data.nonceStr,
				package: 'Sign=WXPay',
				prepayid: res.data.prepayId,
				timestamp: res.data.timeStamp,
				sign: res.data.paySign,
				partnerid: res.data.partnerId
			}
			uni.requestPayment({
				provider: 'wxpay',
				orderInfo: obj,
				success(payRes) {
					uni.showToast({ icon: 'none', title: '支付成功' })
					setTimeout(() => { uni.redirectTo({ url: '/user/otherServe/payment-completed/index' }) }, 2000)
				},
				fail(err) {
					uni.showToast({ icon: 'none', title: '用户取消支付' })
					uni.redirectTo({ url: '/user/otherServe/payment-completed/index?state=fail' })
				}
			})
		} catch (e) {
			uni.showToast({ title: 'APP拉起微信支付失败', icon: 'none' })
			setTimeout(() => { uni.redirectTo({ url: '/user/otherServe/payment-completed/index?state=fail' }) }, 2000)
		} finally {
			uni.hideLoading()
		}
	}
}

/**
 * 银行卡支付处理
 * @param data 结算返回的支付信息
 */

async function bankCardPay(data, payType, type, otherArgs) {
	try {
		let res
		if ([1, 2].includes(payType)) {
		} else if (payType === 3) {
			// res = await payGotoH5SettlePayApi({ ...data, purchaseMode: payType })
			// uni.redirectTo({ url: '/user/otherServe/payment-completed/index' })
		} else if (payType === 4) {
			// res = await payGotoH5VoucherApi({ ...data, purchaseMode: payType })
			// uni.redirectTo({ url: '/user/otherServe/payment-completed/index' })
		}
	} catch (e) {
		uni.showToast({ title: '银行卡支付失败', icon: 'none' })
		setTimeout(() => {
			if ([1, 2].includes(payType)) {
			} else if ([3, 4, 5].includes(payType)) {
				uni.redirectTo({ url: '/user/otherServe/payment-completed/index?state=fail' })
			}
		}, 2000)
	} finally {
		uni.hideLoading()
	}
}

/**
 * 通联支付H5处理
 * @param data 结算返回的支付信息
 */

async function h5TonglianPay(data, payType, type, otherArgs) {
	if (isInWx()) {
		await gotoOrderH5PayApi({
			...data,
			purchaseMode: payType,
			...otherArgs
		}).then((res) => {
			console.log(JSON.stringify(res.data))
			if (type) {
				uni.removeStorageSync(T_PAY_ORDER)
				uni.setStorageSync(T_PAY_ORDER, {
					type,
					TL_ORDER_NO: data.orderSn
				})
			}
			if (!res.data.package) { // 零元支付情况
				uni.redirectTo({ url: '/user/otherServe/payment-completed/index' })
			} else {
				const payData = JSON.parse(res.data.package)
				const form = document.createElement('form')
				form.setAttribute('action', res.data.mwebUrl)
				form.setAttribute('method', 'POST')
				let input
				for (const key in payData) {
					input = document.createElement('input')
					input.name = key
					input.value = payData[key]
					form.appendChild(input)
				}
				document.body.appendChild(form)
				form.submit()
				document.body.removeChild(form)
			}
		})
			.catch((e) => {
				console.log(e)
				uni.showToast({ title: '支付失败', icon: 'none' })
				setTimeout(() => {
					if ([1, 2].includes(payType)) {
						uni.switchTab({ url: '/pages/order/order' })
					} else if ([3, 4, 5].includes(payType)) {
						uni.redirectTo({ url: '/user/otherServe/payment-completed/index?state=fail' })
					}
				}, 2000)
			})
			.finally((e) => {
				uni.hideLoading()
			})
	} else {
		await getPayMiniProgramQueryApi({
			orderNo: data.orderSn,
			purchaseMode: payType,
			paymentMode: data.paymentMode,
			...otherArgs
		}).then((res) => {
			console.log(JSON.stringify(res.data))
			if (res.code == 200) {
				if (type) {
					uni.removeStorageSync(T_PAY_ORDER)
					uni.setStorageSync(T_PAY_ORDER, {
						type,
						TL_ORDER_NO: data.orderSn
					})
				}
				if (res.data.isZeroOrder === '1') { // 零元支付情况
					uni.redirectTo({ url: '/user/otherServe/payment-completed/index' })
				} else {
					delete res.data.isZeroOrder
					let query = ''
					for (const key in res.data) {
						query += key + '=' + res.data[key] + '&'
					}
					location.href = `weixin://dl/business/?appid=wx3cef6c7325c38a45&path=pages/loading/loading&query=${query}orderNo=${data.orderSn}&userId=${getUserId()}`
				}
			}
		})
			.finally((e) => {
				uni.hideLoading()
			})
	}
}

/**
 * 通联支付webview套壳处理
 * @param data 结算返回的支付信息
 */

async function wvTonglianPay(data, payType, type, otherArgs) {
	await getPayMiniProgramQueryApi({
		orderNo: data.orderSn,
		purchaseMode: payType,
		paymentMode: data.paymentMode,
		...otherArgs
	}).then((res) => {
		console.log(JSON.stringify(res.data))
		if (res.code == 200) {
			if (type) {
				uni.removeStorageSync(T_PAY_ORDER)
				uni.setStorageSync(T_PAY_ORDER, {
					type,
					TL_ORDER_NO: data.orderSn
				})
			}
			if (res.data.isZeroOrder === '1') { // 零元支付情况
				uni.redirectTo({ url: '/user/otherServe/payment-completed/index' })
			} else {
				delete res.data.isZeroOrder
				let query = ''
				for (const key in res.data) {
					query += key + '=' + res.data[key] + '&'
				}
				wx.miniProgram.navigateTo({
					url: '/pages/loading/loading?' + query + 'orderNo=' + data.orderSn + '&userId=' + getUserId(),
					fail: () => {
						uni.switchTab({
							url: '/pages/order/order'
						})
					}
				})
			}
		}
	})
		.finally((e) => {
			uni.hideLoading()
		})
}

/**
 * 通联支付APP处理
 * @param data 结算返回的支付信息
 */

async function appTonglianPay(data, payType, type, otherArgs) {
	await getPayMiniProgramQueryApi({
		orderNo: data.orderSn,
		purchaseMode: payType,
		paymentMode: data.paymentMode,
		...otherArgs
	}).then((res) => {
		if (res.code == 200) {
			if (type) {
				uni.removeStorageSync(T_PAY_ORDER)
				uni.setStorageSync(T_PAY_ORDER, {
					type,
					TL_ORDER_NO: data.orderSn
				})
			}
			if (res.data.isZeroOrder === '1') { // 零元支付情况
				uni.redirectTo({ url: '/user/otherServe/payment-completed/index' })
			} else {
				delete res.data.isZeroOrder
				let query = ''
				for (const key in res.data) {
					query += key + '=' + res.data[key] + '&'
				}
				plus.share.getServices(function (result) {
					let sweixin = null
					for (const i in result) {
						if (result[i].id == 'weixin') {
							sweixin = result[i]
						}
					}
					if (sweixin) {
						sweixin.launchMiniProgram({
							id: 'gh_e64a1a89a0ad', // 微信小程序的原始ID（"g_"开头的字符串）
							type: 0,
							path: 'pages/orderDetail/orderDetail?' + query
						})
					} else {
						uni.showToast({ title: '请先安装微信', icon: 'none' })
					}
				}, function (e) {
					uni.showToast({ title: '获取分享服务列表失败', icon: 'none' })
					console.log('获取分享服务列表失败：' + e.message)
				})
			}
		}
	})
		.finally((e) => {
			uni.hideLoading()
		})
}

/**
 * 惠市宝支付H5处理
 * @param data 结算返回的支付信息
 */

async function h5HuiShiBaoPay(data, payType, type, otherArgs) {
	await gotoOrderH5PayApi({
		...data,
		purchaseMode: payType,
		...otherArgs
	}).then((res) => {
		console.log(JSON.stringify(res.data))
		if (type) {
			uni.removeStorageSync(T_PAY_ORDER)
			uni.setStorageSync(T_PAY_ORDER, {
				type,
				TL_ORDER_NO: data.orderSn
			})
		}
		if (!res.data.Cshdk_Url) {
			uni.redirectTo({ url: '/user/otherServe/payment-completed/index?state=fail' })
		} else {
			const payData = res.data
			const form = document.createElement('form')
			form.setAttribute('action', res.data.Cshdk_Url)
			form.setAttribute('method', 'POST')
			let input
			for (const key in payData) {
				input = document.createElement('input')
				input.name = key
				input.value = payData[key]
				form.appendChild(input)
			}
			document.body.appendChild(form)
			form.submit()
			document.body.removeChild(form)
		}
	})
		.catch((e) => {
			console.log(e)
			uni.showToast({ title: '支付失败', icon: 'none' })
			setTimeout(() => {
				if ([1, 2].includes(payType)) {
					uni.switchTab({ url: '/pages/order/order' })
				} else if ([3, 4, 5].includes(payType)) {
					uni.redirectTo({ url: '/user/otherServe/payment-completed/index?state=fail' })
				}
			}, 2000)
		})
		.finally((e) => {
			uni.hideLoading()
		})
}

/**
 * 惠市宝支付webview套壳处理
 * @param data 结算返回的支付信息
 */

async function wvHuiShiBaoPay(data, payType, type, otherArgs) {
	// 方式一：
	if (typeof otherArgs.isSuccess === 'number') { // isSuccess、payType、orderId、collageId
		if (otherArgs.isSuccess) {
			if ([1, 2, 3, 4, 5].includes(payType)) {
				if (data.collageId) await payOrderSuccessApi({ orderId: data.orderId, collageId: data.collageId })
				uni.redirectTo({ url: '/user/otherServe/payment-completed/index' })
			}
		} else if ([1, 2, 3, 4, 5].includes(payType)) {
			uni.redirectTo({ url: '/user/otherServe/payment-completed/index?state=fail' })
		}
	} else {
		if (type) {
			uni.removeStorageSync(T_PAY_ORDER)
			uni.setStorageSync(T_PAY_ORDER, {
				type,
				TL_ORDER_NO: data.orderSn
			})
		}
		// 尝试一
		// uni.postMessage({
		// 	data: {
		// 		event: 'wvHuiShiBaoPay',
		// 		data,
		// 		payType,
		// 		type,
		// 		otherArgs,
		// 		jumpType: `wvHuiShiBaoPayTurn`
		// 	}
		// })
		// 尝试二
		// var popup = window.open(...popup)
		// popup.postMessage(
		// 	"The user is 'bob' and the password is 'secret'",
		// 	'https://www.tuanfengkeji.cn'
		// )
		// popup.postMessage('hello there!', 'https://test.tuanfengkeji.cn')
		// function receiveMessage(event) {
		// 	if (event.origin !== 'https://test.tuanfengkeji.cn') return
		// }
		// window.addEventListener('message', receiveMessage, false)
		// 尝试三
		// parent.postMessage('aaaaa', '*')
		// 尝试四
		const res = uni.getStorageSync(T_STORAGE_KEY) || {}
		if (res.token) res.Authorization = res.token
		if (res.ssoUserInfo && res.ssoUserInfo.token) res['satoken-user'] = res.ssoUserInfo.token
		jumpToOtherProject({
			isInMiniProgram: store.state.app.isInMiniProgram,
			id: 'gh_c5b32d0f9bc9',
			appId: 'wx3cef6c7325c38a45',
			url: `pages/skip/skip`,
			programUrl: `pages/skip/skip`,
			toType: 'MP',
			query: `?type=wvHuiShiBaoPay&data=${encodeURIComponent(JSON.stringify({ data, payType, type, otherArgs, jumpType: `wvHuiShiBaoPayTurn`, Authorization: res.Authorization || '', satokenUser: res['satoken-user'] || '', baseUrl: ANOTHER_TF_INTERFACE }))}`,
			montageTerminal: [6, 5, 1, 2, 4]
		})
		uni.hideLoading()
	}
	// 方式二：
	// // , otherArgs = { stage: 'one' }
	// if (otherArgs.satge === 'one') {
	// 	delete otherArgs.satge
	// 	uni.postMessage({
	// 		data: {
	// 			event: 'wvHuiShiBaoPay',
	// 			data,
	// 			payType,
	// 			type,
	// 			otherArgs: { ...otherArgs, stage: 'two' },
	// 			jumpType: `wvHuiShiBaoPayTurn`
	// 		}
	// 	})
	// } else if (otherArgs.satge === 'two') {
	// 	// 考虑到跳转webview的该链接还需要让网页的isInMiniProgram重新赋值（或者在链接上的传参非常多），比较麻烦且可能会产生其它问题
	// 	delete otherArgs.satge
	// 	const code = otherArgs.code
	// 	const result = await getSessionKeyAppApi({ code })
	// 	await gotoOrderH5PayApi({
	// 		...data,
	// 		purchaseMode: payType,
	// 		hsbSubPayType: '05',
	// 		extJsonStr: JSON.stringify({
	// 			'Sub_Appid': 'wx3cef6c7325c38a45', // 小程序appId
	// 			'Sub_Openid': result.data.wechatOpenId // 微信用户openId
	// 		}),
	// 		...otherArgs
	// 	}).then((res) => {
	// 		console.log(JSON.stringify(res.data))
	// 		if (type) {
	// 			uni.removeStorageSync(T_PAY_ORDER)
	// 			uni.setStorageSync(T_PAY_ORDER, {
	// 				type,
	// 				TL_ORDER_NO: data.orderSn
	// 			})
	// 		}
	// 		if (!res.data.Cshdk_Url) {
	// 			uni.redirectTo({ url: '/user/otherServe/payment-completed/index?state=fail' })
	// 		} else {
	// 			uni.postMessage({
	// 				data: {
	// 					event: 'wvHuiShiBaoPay',
	// 					data,
	// 					payType,
	// 					type,
	// 					otherArgs: { ...otherArgs, stage: 'three' },
	// 					jumpType: `wvHuiShiBaoPayBack`
	// 				}
	// 			})
	// 		}
	// 	})
	// 		.catch((e) => {
	// 			console.log(e)
	// 			uni.showToast({ title: '支付失败', icon: 'none' })
	// 			setTimeout(() => {
	// 				if ([1, 2].includes(payType)) {
	// 					uni.switchTab({ url: '/pages/order/order' })
	// 				} else if ([3, 4, 5].includes(payType)) {
	// 					uni.redirectTo({ url: '/user/otherServe/payment-completed/index?state=fail' })
	// 				}
	// 			}, 2000)
	// 		})
	// 		.finally((e) => {
	// 			uni.hideLoading()
	// 		})
	// } else if (otherArgs.satge === 'three') {
	// 	delete otherArgs.satge
	// 	if ([1, 2].includes(payType)) {
	// 		if (otherArgs.isSuccess) {
	// 			if (data.collageId) await payOrderSuccessApi({ orderId: data.orderId, collageId: data.collageId })
	// 			uni.showToast({ icon: 'none', title: '支付成功' })
	// 			setTimeout(() => { uni.redirectTo({ url: '/another-tf/another-serve/paySuccessful/index?orderId=' + data.orderId }) }, 2000)
	// 		} else {
	// 			uni.showToast({ icon: 'none', title: '用户取消支付' })
	// 			setTimeout(() => { uni.switchTab({ url: '/pages/order/order' }) }, 2000)
	// 		}
	// 	} else if ([3, 4, 5].includes(payType)) {
	// 		if (otherArgs.isSuccess) {
	// 			if (data.collageId) await payOrderSuccessApi({ orderId: data.orderId, collageId: data.collageId })
	// 			uni.showToast({ icon: 'none', title: '支付成功' })
	// 			setTimeout(() => { uni.redirectTo({ url: '/user/otherServe/payment-completed/index' }) }, 2000)
	// 		} else {
	// 			uni.showToast({ icon: 'none', title: '用户取消支付' })
	// 			setTimeout(() => { uni.redirectTo({ url: '/user/otherServe/payment-completed/index?state=fail' }) }, 2000)
	// 		}
	// 	}
	// }
}

/**
 * 惠市宝支付微信小程序处理
 * @param data 结算返回的支付信息
 */

function mpHuiShiBaoPay(data, payType, type, otherArgs) {
	return new Promise((resolve, reject) => {
		const failOperation = (failText = '支付失败') => {
			uni.showToast({ title: failText, icon: 'none' })
			setTimeout(() => {
				if ([1, 2].includes(payType)) {
					uni.switchTab({ url: '/pages/order/order' })
				} else if ([3, 4, 5].includes(payType)) {
					uni.redirectTo({ url: '/user/otherServe/payment-completed/index?state=fail' })
				}
			}, 2000)
		}
		uni.login({
			provider: 'weixin',
			success: (res) => {
				getSessionKeyAppApi({ code: res.code, _isShowToast: false })
					.then(async (res1) => {
						console.log("妈卖批", res1);
						await gotoOrderH5PayApi({
							...data,
							purchaseMode: payType,
							...otherArgs,
							hsbSubPayType: '05',
							extJsonStr: JSON.stringify({
								'Sub_Appid': 'wx3cef6c7325c38a45', // 小程序appId
								'Sub_Openid': res1.data.wechatOpenId // 微信用户openId
							}),
							_isShowToast: false
						}).then((res2) => {
							if (type) {
								uni.removeStorageSync(T_PAY_ORDER)
								uni.setStorageSync(T_PAY_ORDER, {
									type,
									TL_ORDER_NO: data.orderSn
								})
							}
							if (res2.data.Rtn_Par_Data) {
								const paymentObj = JSON.parse(res2.data.Rtn_Par_Data)
								uni.requestPayment({
									provider: 'wxpay',
									timeStamp: paymentObj.timeStamp,
									nonceStr: paymentObj.nonceStr,
									package: paymentObj.package,
									signType: paymentObj.signType,
									paySign: paymentObj.paySign,
									success: async (res3) => {
										if (data.collageId) await payOrderSuccessApi({ orderId: data.orderId, collageId: data.collageId }) // 拼团微信支付成功回调
										uni.showToast({ icon: 'none', title: '支付成功' })
										setTimeout(() => { uni.redirectTo({ url: '/user/otherServe/payment-completed/index' }) }, 2000)
										resolve('支付成功')
									},
									fail(e) {
										console.log(e)
										failOperation('支付失败！' + e)
										reject('支付失败！' + e)
									}
								})
							} else {
								uni.hideLoading()
								failOperation('缺少支付信息')
								reject('缺少支付信息')
							}
						})
							.catch((e) => {
								uni.hideLoading()
								if (e.data) failOperation(`${e.data.message}-${e.data.errorData}`)
								else failOperation(`请求：${e.errMsg}`)
								reject(e)
							})
					})
					.catch((e) => {
						uni.hideLoading()
						if (e.data) failOperation(`${e.data.message}-${e.data.errorData}`)
						else failOperation(`请求：${e.errMsg}`)
						reject(e)
					})
			},
			fail: () => {
				uni.hideLoading()
				failOperation('鉴权失败！')
				reject('鉴权失败！')
			}
		})
	})
}

/**
 * 处理支付
 * @param submitResult 结算结果
 */

// eslint-disable-next-line complexity
export async function handleDoPay(submitResult, purchaseMode, type = 'DEFAULT', otherArgs = {}) {
	uni.showLoading({
		mask: true,
		title: '支付中...'
	})
	console.log(JSON.stringify(submitResult))
	if (purchaseMode) { // 1-商城 2-本地 3-入驻 4-代金券 5-地图红包
		const submitInfo = { ...submitResult, purchaseMode }
		if (submitInfo.paymentMode === 999) {
			await bankCardPay(submitResult, purchaseMode, type, otherArgs)
		} else if ([ 1 ].includes(submitInfo.paymentMode)) { // 微信支付
			if (isInWx()) {
				if (store.state.app.isInMiniProgram) {
					await payH5InWechat(submitInfo)
				} else {
					await payH5InWechat(submitInfo)
				}
			} else {
				// #ifdef H5
				await payH5InEquipment(submitInfo)
				// #endif
				// #ifdef APP
				await appWechatPay(submitInfo)
				// #endif
				// #ifdef MP-WEIXIN
				await mpWechatPay(submitInfo)
				// #endif
				// #ifdef MP-ALIPAY
				uni.hideLoading()
				uni.showToast({ title: '暂不支持在支付宝小程序使用微信支付', icon: 'none' })
				// #endif
			}
		} else if ([2, 3].includes(submitInfo.paymentMode)) { // 支付宝
			if (isInWx()) {
				if (store.state.app.isInMiniProgram) {
					uni.hideLoading()
					uni.showToast({ title: '暂不支持在此端使用支付宝支付', icon: 'none' })
				} else {
					uni.hideLoading()
					uni.showToast({ title: '暂不支持在此端使用支付宝支付', icon: 'none' })
				}
			} else {
				// #ifdef H5
				uni.hideLoading()
				uni.showToast({ title: '暂不支持在此端使用支付宝支付', icon: 'none' })
				// #endif
				// #ifdef APP
				uni.hideLoading()
				uni.showToast({ title: '暂不支持在此端使用支付宝支付', icon: 'none' })
				// #endif
				// #ifdef MP-WEIXIN
				uni.hideLoading()
				uni.showToast({ title: '暂不支持在此端使用支付宝支付', icon: 'none' })
				// #endif
				// #ifdef MP-ALIPAY
				await zhiAliPay(submitInfo)
				throw new Error('支付宝相关支付暂时只支持支付宝小程序')
				// #endif
			}
		} else if ([ 4 ].includes(submitInfo.paymentMode)) { // 通联支付
			if (isInWx()) {
				if (store.state.app.isInMiniProgram) {
					await wvTonglianPay(submitResult, purchaseMode, type, otherArgs)
				} else {
					await h5TonglianPay(submitResult, purchaseMode, type, otherArgs)
				}
			} else {
				// #ifdef H5
				await h5TonglianPay(submitResult, purchaseMode, type, otherArgs)
				// #endif
				// #ifdef APP
				await appTonglianPay(submitResult, purchaseMode, type, otherArgs)
				// #endif
				// #ifdef MP-WEIXIN
				uni.hideLoading()
				uni.showToast({ title: '暂不支持在微信小程序使用通联支付', icon: 'none' })
				// #endif
				// #ifdef MP-ALIPAY
				uni.hideLoading()
				uni.showToast({ title: '暂不支持在支付宝小程序使用通联支付', icon: 'none' })
				// #endif
			}
		} else if ([5, 6, 7, 8].includes(submitInfo.paymentMode)) { // 佣金支付、平台余额支付、商家余额支付、消费金支付
			if (isInWx()) {
				if (store.state.app.isInMiniProgram) {
					await h5TonglianPay(submitResult, purchaseMode, type, otherArgs)
				} else {
					await h5TonglianPay(submitResult, purchaseMode, type, otherArgs)
				}
			} else {
				// #ifdef H5
				await h5TonglianPay(submitResult, purchaseMode, type, otherArgs)
				// #endif
				// #ifdef APP
				await h5TonglianPay(submitResult, purchaseMode, type, otherArgs)
				// #endif
				// #ifdef MP-WEIXIN
				await h5TonglianPay(submitResult, purchaseMode, type, otherArgs)
				// #endif
				// #ifdef MP-ALIPAY
				await h5TonglianPay(submitResult, purchaseMode, type, otherArgs)
				// #endif
			}
		} else if ([ 9 ].includes(submitInfo.paymentMode)) { // 惠市宝支付
			if (isInWx()) {
				if (store.state.app.isInMiniProgram) {
					await wvHuiShiBaoPay(submitResult, purchaseMode, type, otherArgs)
				} else {
					await h5HuiShiBaoPay(submitResult, purchaseMode, type, otherArgs)
				}
			} else {
				// #ifdef H5
				await h5HuiShiBaoPay(submitResult, purchaseMode, type, otherArgs)
				// await wvHuiShiBaoPay(submitResult, purchaseMode, type, otherArgs)
				// #endif
				// #ifdef APP
				await wvHuiShiBaoPay(submitResult, purchaseMode, type, otherArgs)
				// #endif
				// #ifdef MP-WEIXIN
				await mpHuiShiBaoPay(submitResult, purchaseMode, type, otherArgs)
				// #endif
				// #ifdef MP-ALIPAY
				uni.hideLoading()
				uni.showToast({ title: '暂不支持在支付宝小程序使用惠市宝支付', icon: 'none' })
				// #endif
			}
		}
	}
}
