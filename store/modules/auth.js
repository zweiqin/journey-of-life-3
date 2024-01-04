import { USER_INFO, USER_ID, USER_TOKEN, T_USER_TOKEN, T_STORAGE_KEY, clearAllCache } from '../../constant'
import { A_TF_MAIN } from '../../config'
import { CHNAGE_USER_INFO, CHNAGE_USER_TOKEN, CHNAGE_HISTORY_POPUP, CHNAGE_USER_IDENTITY } from './type'
import { loginApi, verificationCodeApi, wxLoginApi } from '../../api/auth'
import { refrshUserInfoApi, updateUserInfoApi } from '../../api/user'
import { getAnotherTFTokenApi, getIsShopByUserApi } from '../../api/anotherTFInterface'

export default {
	namespaced: true,
	state() {
		return {
			userInfo: uni.getStorageSync(T_STORAGE_KEY) || {}, // 新团蜂的
			userToken: uni.getStorageSync(T_USER_TOKEN) || '', // 新团蜂的
			identityInfo: {
				type: [], // 9商家，1加盟商，2代理商
				shopInfo: {}
			},
			historyPopup: []
		}
	},

	mutations: {
		[CHNAGE_USER_INFO](state, userInfo) {
			state.userInfo = userInfo
			uni.setStorageSync(T_STORAGE_KEY, userInfo)
		},

		[CHNAGE_USER_TOKEN](state, token) {
			state.userToken = token
			uni.setStorageSync(T_USER_TOKEN, token)
		},

		[CHNAGE_USER_IDENTITY](state, data) {
			if (data.type) state.identityInfo.type = data.type
			if (data.shopInfo) state.identityInfo.shopInfo = data.shopInfo
		},

		[CHNAGE_HISTORY_POPUP](state, type) {
			state.historyPopup.push(type)
		}
	},

	actions: {
		// TODO: 三种登录方式合在一起

		// 密码登录
		loginAction({ commit, dispatch }, loginData) {
			return new Promise((resolve, reject) => {
				loginApi({ ...loginData })
					.then(async ({ data }) => {
						console.log(data)
						if (data.userInfo.phone) {
							try {
								await dispatch('updateStorageKey', data.userInfo.phone)
								uni.setStorageSync(USER_ID, data.userInfo.userId)
								uni.setStorageSync(USER_TOKEN, data.token)
								uni.setStorageSync(USER_INFO, data.userInfo)
								uni.showToast({
									title: '登录成功'
								})
								resolve(data)
							} catch (err) {
								reject(err)
							}
						} else {
							uni.navigateTo({
								url: '/pages/login/bind-phone?openId=' + data.userInfo.weixinOpenid
							})
							reject()
						}
					})
					.catch((err) => {
						reject(err)
					})
			})
		},

		// 验证码登录
		codeLoginAction({ commit, dispatch }, loginData) {
			return new Promise((resolve, reject) => {
				verificationCodeApi({ ...loginData })
					.then(async ({ data }) => {
						console.log(data)
						if (data.userInfo.phone) {
							try {
								await dispatch('updateStorageKey', data.userInfo.phone)
								uni.setStorageSync(USER_ID, data.userInfo.userId)
								uni.setStorageSync(USER_TOKEN, data.token)
								uni.setStorageSync(USER_INFO, data.userInfo)
								uni.showToast({
									title: '登录成功'
								})
								resolve(data)
							} catch (err) {
								reject(err)
							}
						} else {
							uni.navigateTo({
								url: '/pages/login/bind-phone?openId=' + data.userInfo.weixinOpenid
							})
							reject()
						}
					})
					.catch((err) => {
						reject(err)
					})
			})
		},

		// 微信登陆
		wxLogin({ commit, dispatch }, code) {
			return new Promise((resolve, reject) => {
				wxLoginApi({ code })
					.then(async ({ data }) => {
						if (data.userInfo.phone) {
							try {
								await dispatch('updateStorageKey', data.userInfo.phone)
								uni.setStorageSync(USER_ID, data.userInfo.userId)
								uni.setStorageSync(USER_TOKEN, data.token)
								uni.setStorageSync(USER_INFO, data.userInfo)
								uni.showToast({
									title: '登录成功'
								})
								resolve(data)
							} catch (err) {
								reject(err)
							}
						} else {
							window.location.replace(`${A_TF_MAIN}/#/pages/login/bind-phone?openId=${data.userInfo.weixinOpenid}`)
							reject()
						}
					})
					.catch((err) => {
						reject(err)
					})
			})
		},

		logout({ commit }, isQuiet) {
			uni.removeStorageSync(USER_ID)
			uni.removeStorageSync(USER_INFO)
			uni.removeStorageSync(USER_TOKEN)
			uni.removeStorageSync(T_USER_TOKEN)
			commit(CHNAGE_USER_INFO, {})
			commit(CHNAGE_USER_TOKEN, '')
			clearAllCache()
			if (isQuiet) {
				uni.showToast({
					title: '退出成功'
				})
				setTimeout(() => {
					uni.switchTab({
						url: '/pages/community-center/community-centerr'
					})
				}, 2000)
			}
		},

		updateUserInfo({ state, dispatch }, updateData) {
			const originData = {
				nickname: state.userInfo.nickName,
				avatar: state.userInfo.avatarUrl,
				password: state.userInfo.password,
				id: uni.getStorageSync(USER_ID)
			}
			originData[updateData.key] = updateData.value
			updateUserInfoApi(originData).then(() => {
				uni.showToast({
					title: '修改成功'
				})
				dispatch('refrshUserInfo')
			})
		},

		// 刷新用户信息
		refrshUserInfo({ state, dispatch, commit }, cb) {
			if (!uni.getStorageSync(USER_ID)) return
			refrshUserInfoApi({
				userId: uni.getStorageSync(USER_ID)
			}).then(async ({ data }) => {
				uni.setStorageSync(USER_ID, data.userId)
				uni.setStorageSync(USER_INFO, data)
				await dispatch('updateStorageKey', data.phone)
				cb && typeof cb === 'function' && cb(data)
			})
		},

		// 获取新团蜂userInfo和token
		updateStorageKey({ state, dispatch, commit }, phone) {
			return new Promise((resolve, reject) => {
				const userInfo = uni.getStorageSync(USER_INFO)
				if (phone) {
					uni.showLoading({ mask: true })
					getAnotherTFTokenApi({ phone, wechatName: userInfo.name || userInfo.nickName, headImage: userInfo.avatarUrl })
						.then((res) => {
							commit(CHNAGE_USER_TOKEN, res.data.token)
							commit(CHNAGE_USER_INFO, res.data)
							if (res.data.roleId) commit(CHNAGE_USER_IDENTITY, { type: [ ...new Set([...state.identityInfo.type, res.data.roleId]) ] })
							uni.hideLoading()
							resolve(res.data)
						})
						.catch((err) => {
							uni.hideLoading()
							reject(err)
						})
					dispatch('updateIdentityInfo')
				} else {
					uni.showToast({
						title: '缺少手机号码'
					})
					reject('缺少手机号码')
				}
			})
		},

		// 获取身份（是否商家）
		updateIdentityInfo({ state, dispatch, commit }) {
			return new Promise((resolve, reject) => {
				const userInfo = uni.getStorageSync(USER_INFO)
				if (userInfo && userInfo.phone) {
					getIsShopByUserApi({ mobile: userInfo.phone })
						.then((res) => {
							if (res.data) commit(CHNAGE_USER_IDENTITY, { type: [ ...new Set([...state.identityInfo.type, 9]) ], shopInfo: res.data || {} })
							resolve(res.data)
						})
						.catch((err) => {
							uni.hideToast()
							resolve(err)
						})
				}
			})
		},

		updateHistoryPopup({ state, commit }, type) {
			if (state.historyPopup.includes(type)) return
			commit(CHNAGE_HISTORY_POPUP, type)
		}
	}
}
