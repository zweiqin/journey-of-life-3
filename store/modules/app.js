import { CHANGE_IS_IN_MINIPROGRAM, CHANGE_SYSTERM_INFO, CHANGE_SYSTERM_TERMINAL } from './type'
import { isInWx, jumpToOtherProject } from '../../utils'
import { getCustomerServiceAppletKfApi, getCustomerServiceH5KfApi, getCustomerServicePCKfApi, getAllCustomerServiceApi } from '../../api/anotherTFInterface'

export default {
	namespaced: true,
	state() {
		return {
			isInMiniProgram: false, // 是否套壳的
			terminal: 0,
			systermInfo: {},
			platformOperationShopId: 186
		}
	},

	mutations: {
		[CHANGE_IS_IN_MINIPROGRAM](state, tag) {
			if (tag) {
				state.isInMiniProgram = tag
				state.terminal = 6
			}
		},

		[CHANGE_SYSTERM_TERMINAL](state, terminal) {
			state.terminal = terminal
		},

		[CHANGE_SYSTERM_INFO](state, system) {
			state.systermInfo = system
			console.log(system)
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
		getSystermTerminal({ state, dispatch, commit }) {
			return new Promise((resolve, reject) => {
				if (isInWx()) {
					if (state.isInMiniProgram) {
						commit(CHANGE_SYSTERM_TERMINAL, 6)
					} else {
						commit(CHANGE_SYSTERM_TERMINAL, 3)
					}
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
				resolve(state.terminal)
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
									itemList: res.data.map((item) => `${item.name}${item.state ? '（在线）' : ''}`), // （已下线）
									itemColor: '#2c3e50',
									success: (result) => {
										// uni.showToast({ title: res.data[result.tapIndex].name })
										setTimeout(() => {
											dispatch('flyToServiceAction', { shopId, openKfId: res.data[result.tapIndex].openKfId })
											// uni.navigateTo({
											// 	url: `/another-tf/another-user/chat/chat-detail?chat=serviceAssistant&kfId=${res.data[result.tapIndex].kfId}&openKfId=${res.data[result.tapIndex].openKfId}`
											// })
										}, 2000)
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

		flyToServiceAction({ state, dispatch, commit }, { shopId, openKfId }) {
			let _url = null
			if ([1, 2, 4].includes(state.terminal)) {
				_url = getCustomerServiceAppletKfApi
			} else if ([3, 6].includes(state.terminal)) {
				_url = getCustomerServiceH5KfApi
			} else if ([ 5 ].includes(state.terminal)) {
				_url = getCustomerServicePCKfApi
			}
			_url = getCustomerServiceAppletKfApi // 原本的
			let corpId = null
			let serviceURL = null
			uni.showLoading({
				title: '加载中...'
			})
			_url({ id: shopId, openKfId })
				.then((res) => {
					console.log(JSON.stringify(res))
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
					if ([ 2 ].includes(state.terminal)) {
						wx.openCustomerServiceChat({
							extInfo: { url: serviceURL },
							corpId
						})
					} else if ([ 1 ].includes(state.terminal)) {
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
					} else if ([3, 5].includes(state.terminal)) {
						// window.open(serviceURL) safari浏览器不支持window.open
						window.location.href = serviceURL
					} else if ([ 6 ].includes(state.terminal)) {
						jumpToOtherProject({ isInMiniProgram: state.isInMiniProgram, programUrl: `pages/skip/skip`, toType: 'MP', query: `?type=customerService&url=${encodeURIComponent(serviceURL)}&corpId=${corpId}`, montageTerminal: [ 6 ] })
						// 壳里套壳方案不可行，因为跳转客服需要真正的微信环境
						// uni.redirectTo({
						// 	url: `/user/view?target=${serviceURL}`
						// })
					} else {
						uni.showToast({ title: '未能获取系统信息', icon: 'none' })
					}
				})
				.catch((e) => {
					uni.hideLoading()
				})
		}
	}
}
