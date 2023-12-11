import { USER_INFO, USER_ID, USER_TOKEN, T_STORAGE_KEY, clearAllCache } from '../../constant'
import { CHNAGE_USER_ID, CHNAGE_USER_INFO, CHNAGE_USER_TOKEN, CHNAGE_HISTORY_POPUP, CHNAGE_USER_IDENTITY } from './type'
import { loginApi, verificationCodeApi, wxLoginApi } from '../../api/auth'
import { refrshUserInfoApi, updateUserInfoApi } from '../../api/user'
import { getAnotherTFTokenApi, getIsShopByUserApi } from '../../api/anotherTFInterface'

export default {
	namespaced: true,
	state() {
		return {
			userId: uni.getStorageSync(USER_ID),
			userInfo: uni.getStorageSync(USER_INFO),
			userToken: uni.getStorageSync(USER_TOKEN),
			historyInfo: {
				collection: 0,
				footPrint: 0,
				follow: 0
			},
			IdentityInfo: {
				type: 0,
				info: {}
			},
			historyPopup: []
		}
	},

	mutations: {
		[CHNAGE_USER_ID](state, userId) {
			state.userId = userId
			uni.setStorageSync(USER_ID, userId)
		},

		[CHNAGE_USER_INFO](state, userInfo) {
			state.userInfo = userInfo
			state.historyInfo.collection = userInfo.collectCount || 0
			state.historyInfo.footprintCount = userInfo.footprintCount || 0
			state.historyInfo.follow = userInfo.rssCount || 0
			uni.setStorageSync(USER_INFO, userInfo)
		},

		[CHNAGE_USER_TOKEN](state, token) {
			state.userToken = token
			uni.setStorageSync(USER_TOKEN, token)
		},

		[CHNAGE_USER_IDENTITY](state, data) {
			state.IdentityInfo = data
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
						commit(CHNAGE_USER_ID, data.userInfo.userId)
						commit(CHNAGE_USER_INFO, data.userInfo)
						commit(CHNAGE_USER_TOKEN, data.token)
						uni.showToast({
							title: '登录成功'
						})
						console.log(data)
						await dispatch('updateStorageKeyToken')
						resolve(data)
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
						commit(CHNAGE_USER_ID, data.userInfo.userId)
						commit(CHNAGE_USER_INFO, data.userInfo)
						commit(CHNAGE_USER_TOKEN, data.token)
						uni.showToast({
							title: '登录成功'
						})
						console.log(data)
						await dispatch('updateStorageKeyToken')
						resolve(data)
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
						commit(CHNAGE_USER_ID, data.userInfo.userId)
						commit(CHNAGE_USER_INFO, data.userInfo)
						commit(CHNAGE_USER_TOKEN, data.token)
						uni.showToast({
							title: '登录成功'
						})
						await dispatch('updateStorageKeyToken')
						resolve(data)
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
			commit(CHNAGE_USER_ID, '')
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
				id: state.userId
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
			if (!state.userId) {
				return
			}
			refrshUserInfoApi({
				userId: state.userId
			}).then(({ data }) => {
				commit(CHNAGE_USER_INFO, data)
				commit(CHNAGE_USER_ID, data.userId)
				cb && typeof cb === 'function' && cb(data)
				dispatch('updateStorageKeyToken')
			})
		},

		// 获取新团蜂token
		updateStorageKeyToken({ state, dispatch, commit }, phone) {
			return new Promise((resolve, reject) => {
				const userInfo = uni.getStorageSync(USER_INFO)
				if (userInfo && userInfo.phone) {
					uni.showLoading({ mask: true })
					getAnotherTFTokenApi({ phone: phone ? phone : userInfo.phone })
						.then((res) => {
							uni.setStorageSync(T_STORAGE_KEY, res.data)
							uni.hideLoading()
							resolve(res.data)
						})
						.catch((err) => {
							uni.hideLoading()
							resolve(err)
						})
					dispatch('updateIdentityInfo')
				} else {
					uni.showToast({
						title: '缺少用户手机号码'
					})
					resolve('缺少用户手机号码')
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
							if (res.data) commit(CHNAGE_USER_IDENTITY, { type: 1, info: res.data || {} })
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
