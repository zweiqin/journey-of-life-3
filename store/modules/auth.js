import { USER_INFO, USER_ID, USER_TOKEN, T_STORAGE_KEY, clearAllCache } from '../../constant'
import { CHNAGE_USER_ID, CHNAGE_USER_INFO, CHNAGE_USER_TOKEN, CHNAGE_HISTORY_POPUP } from './type'
import { loginApi, verificationCodeApi, wxLoginApi } from '../../api/auth'
import { refrshUserInfoApi, updateUserInfoApi } from '../../api/user'
import { getAnotherTFTokenApi } from '../../api/anotherTFInterface'

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
					.then(({ data }) => {
						commit(CHNAGE_USER_ID, data.userInfo.userId)
						commit(CHNAGE_USER_INFO, data.userInfo)
						commit(CHNAGE_USER_TOKEN, data.token)
						uni.showToast({
							title: '登录成功'
						})
						console.log(data)
						dispatch('updateStorageKeyToken')
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
					.then(({ data }) => {
						commit(CHNAGE_USER_ID, data.userInfo.userId)
						commit(CHNAGE_USER_INFO, data.userInfo)
						commit(CHNAGE_USER_TOKEN, data.token)
						uni.showToast({
							title: '登录成功'
						})
						console.log(data)
						dispatch('updateStorageKeyToken')
						resolve(data)
					})
					.catch((err) => {
						reject(err)
					})
			})
		},

		// 微信登陆
		wxLogin({ commit }, code) {
			return new Promise((resolve, reject) => {
				wxLoginApi({ code })
					.then(({ data }) => {
						commit(CHNAGE_USER_ID, data.userInfo.userId)
						commit(CHNAGE_USER_INFO, data.userInfo)
						commit(CHNAGE_USER_TOKEN, data.token)
						uni.showToast({
							title: '登录成功'
						})
						resolve(data)
					})
					.catch((err) => {
						reject(err)
					})
			})
		},

		logout({ commit }, isQuiet) {
			if (!isQuiet) {
				uni.showToast({
					title: '退出成功'
				})
			}
			uni.removeStorageSync(USER_ID)
			uni.removeStorageSync(USER_INFO)
			uni.removeStorageSync(USER_TOKEN)
			commit(CHNAGE_USER_ID, '')
			commit(CHNAGE_USER_INFO, {})
			commit(CHNAGE_USER_TOKEN, '')
			setTimeout(() => {
				clearAllCache()
				uni.switchTab({
					url: '/pages/community-center/community-centerr'
				})
			}, 2000)
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

		updateHistoryPopup({ state, commit }, type) {
			if (state.historyPopup.includes(type)) return
			commit(CHNAGE_HISTORY_POPUP, type)
		},

		// 获取新团蜂token
		updateStorageKeyToken() {
			const userInfo = uni.getStorageSync(USER_INFO)
			if (userInfo && userInfo.phone) {
				getAnotherTFTokenApi({ phone: userInfo.phone })
					.then((res) => {
						uni.setStorageSync(T_STORAGE_KEY, res.data)
					})
			} else {
				uni.showToast({
					title: '缺少用户手机号码'
				})
			}
		}
	}
}
