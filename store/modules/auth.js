import { USER_INFO, USER_ID, USER_TOKEN } from '../../constant'
import { CHNAGE_USER_ID, CHNAGE_USER_INFO, CHNAGE_USER_TOKEN } from './type'
import { userLoginApi, updateUserInfo } from '../../api/auth'
import { refrshUserInfoApi, updateUserInfoApi } from '../../api/user'

export default {
  namespaced: true,
  state() {
    return {
      userId: uni.getStorageSync(USER_ID),
      userInfo: uni.getStorageSync(USER_INFO),
      userToken: uni.getStorageSync(USER_TOKEN)
    }
  },

  mutations: {
    [CHNAGE_USER_ID](state, userId) {
      state.userId = userId
      uni.setStorageSync(USER_ID, userId);
    },

    [CHNAGE_USER_INFO](state, userInfo) {
      state.userInfo = userInfo
      uni.setStorageSync(USER_INFO, userInfo);
    },

    [CHNAGE_USER_TOKEN](state, token) {
      state.userToken = token
      uni.setStorageSync(USER_TOKEN, token);
    }
  },

  actions: {
    loginAction({ commit }, loginData) {
      return new Promise((resolve, reject) => {
        userLoginApi({ ...loginData }).then(({ data }) => {
          commit(CHNAGE_USER_ID, data.userInfo.userId)
          commit(CHNAGE_USER_INFO, data.userInfo)
          commit(CHNAGE_USER_TOKEN, data.token)
          uni.showToast({
            title: '登录成功'
          })
          console.log(data);
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },

    logout() {
      uni.clearStorageSync()
      uni.showToast({
        title: '退出成功',
        duration: 500,
        mask: true
      })
      setTimeout(() => {
        uni.switchTab({
          url: '/pages/index/index'
        })
      }, 2000)
    },


    updateUserInfo({ state, dispatch }, updateData) {
      const originData = {
        nickname: state.userInfo.nickName,
        avatar: state.userInfo.avatarUrl,
        password: state.userInfo.password,
        id: state.userId,
      };

      originData[updateData['key']] = updateData['value']

      updateUserInfoApi(originData).then(() => {
        uni.showToast({
          title: '修改成功'
        })

        dispatch('refrshUserInfo')
      })
    },


    refrshUserInfo({ state, commit }) {
      refrshUserInfoApi({
        userId: state.userId
      }).then(({ data }) => {
        commit(CHNAGE_USER_INFO, data)
        commit(CHNAGE_USER_ID, data.userId)
      })
    }

  }
}