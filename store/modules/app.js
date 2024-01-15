import { CHANGE_IS_IN_MINIPROGRAM, CHANGE_SYSTERM_INFO, CHANGE_SYSTERM_TERMINAL } from './type'
import { isInWx } from '../../utils'
import { getCustomerServiceAppletKfApi, getCustomerServiceH5KfApi, getCustomerServicePCKfApi, getAllCustomerServiceApi } from '../../api/anotherTFInterface'

export default {
	namespaced: true,
	state() {
		return {
			isInMiniProgram: false, // 是否套壳的
			systermInfo: {},
			terminal: 0,
			platformOperationShopId: 186
		}
	},

	mutations: {
		[CHANGE_IS_IN_MINIPROGRAM](state, tag) {
			if (tag) {
				state.isInMiniProgram = tag
			}
		},

		[CHANGE_SYSTERM_INFO](state, system) {
			state.systermInfo = system
			console.log(system)
		},

		[CHANGE_SYSTERM_TERMINAL](state, terminal) {
			state.terminal = terminal
		}
	},

	actions: {
		getUserSystermInfo({ commit }) {
			return new Promise((resolve, reject) => {
				uni.getSystemInfo({
					success: (systermInfo) => {
						commit(CHANGE_SYSTERM_INFO, systermInfo)
						resolve()
					},
					fail: () => {
						commit(CHANGE_SYSTERM_INFO, {})
						resolve()
					}
				})
			})
		},
		getSystermTerminal({ commit }) {
			return new Promise((resolve, reject) => {
				if (isInWx()) {
					commit(CHANGE_SYSTERM_TERMINAL, 3)
				} else {
					// #ifdef H5
					commit(CHANGE_SYSTERM_TERMINAL, 5) // H5包含pc和移动端浏览器和微信浏览器的可能
					// #endif
					// #ifdef APP
					commit(CHANGE_SYSTERM_TERMINAL, 1)
					// #endif
					// #ifdef MP-WEIXIN
					commit(CHANGE_SYSTERM_TERMINAL, 2)
					// #endif
					// #ifdef MP-ALIPAY
					commit(CHANGE_SYSTERM_TERMINAL, 4)
					// #endif
				}
			})
		},

		getCustomerServiceAction({ state, dispatch, commit }, { isToService, shopId }) {
			return new Promise((resolve, reject) => {
				uni.showLoading()
				getAllCustomerServiceApi({ shopId })
					.then((res) => {
						uni.hideLoading()
						if (isToService) {
							if (res.data.length) {
								uni.showActionSheet({
									title: '* 请选择客服 *',
									itemList: res.data.map((item) => `${item.name}（${item.state ? '在线' : '已下线'}）`),
									itemColor: '#2c3e50',
									success: (res) => {
										dispatch('flyToServiceAction', { shopId, customerId: res.data[res.tapIndex].kfId })
									}
								})
							} else {
								uni.showToast({
									icon: 'none',
									title: '暂无客服~'
								})
							}
						}
						resolve(res)
					})
					.catch((err) => {
						uni.hideLoading()
						reject(err)
					})
			})
		},

		flyToServiceAction({ state, dispatch, commit }, { shopId, customerId }) {
			let _url = null
			if ([1, 2, 4].includes(state.terminal)) {
				_url = getCustomerServiceAppletKfApi
			} else if ([ 3 ].includes(state.terminal)) {
				_url = getCustomerServiceH5KfApi
			} else if ([ 5 ].includes(state.terminal)) {
				_url = getCustomerServicePCKfApi
			}
			let corpId = null
			let serviceURL = null
			uni.showLoading({
				title: '加载中...'
			})
			_url({ id: shopId, customerId })
				.then((res) => {
					if (res.code === '' && res.data.corpId && res.data.url) {
						corpId = res.data.corpId
						serviceURL = res.data.url
					}
					uni.hideLoading()
					if (!serviceURL || !corpId) {
						return uni.showToast({
							icon: 'none',
							title: '暂无客服~'
						})
					}
					// #ifdef MP-WEIXIN
					wx.openCustomerServiceChat({
						extInfo: { url: serviceURL },
						corpId
					})
					// #endif
					// #ifdef APP
					try {
						let wechatServices = null
						plus.share.getServices((res) => {
							wechatServices = res.find((wechatItem) => wechatItem.id === 'weixin')
							if (wechatServices) {
								wechatServices.openCustomerServiceChat({
									corpid: corpId,
									url: serviceURL
								}, (success) => { }, (err) => { })
							} else {
								plus.nativeUI.alert('当前环境不支持微信操作!')
							}
						}, (err) => {
							uni.showToast({ title: '获取服务失败，不支持该操作。' + JSON.stringify(err), icon: 'none' })
						})
					} catch (err) {
						uni.showToast({ title: '调用失败，不支持该操作。' + JSON.stringify(err), icon: 'none' })
					}
					// #endif
					// #ifdef H5
					// window.open(serviceURL) safari浏览器不支持window.open
					window.location.href = serviceURL
					// #endif
				})
				.catch((e) => {
					uni.hideLoading()
				})
		}
	}
}
