import { CHANGE_IS_IN_MINIPROGRAM, CHANGE_SYSTERM_INFO, SET_SHOW_LOADING } from "./type";
import { MINI_PROGRAM_TAG } from "../../constant";

export default {
  namespaced: true,
  state() {
    return {
      isInMiniProgram: uni.getStorageSync(MINI_PROGRAM_TAG) || false,
      systermInfo: {},
      globalLoading: {
        showLoading: false,
        showInfo: ''
      }
    };
  },

  mutations: {
    [CHANGE_IS_IN_MINIPROGRAM](state, tag) {
      if (tag) {
        uni.setStorageSync(MINI_PROGRAM_TAG, tag);
        state.isInMiniProgram = tag;
      }
    },

    [CHANGE_SYSTERM_INFO](state, system) {
      state.systermInfo = system;
      console.log(system);
    },

    [SET_SHOW_LOADING](state, obj) {
      state.globalLoading.showLoading = obj.flag
      state.globalLoading.showInfo = obj.info
    }
  },

  actions: {
    getUserSystermInfo({ commit }) {
      return new Promise((resolve, reject) => {
        uni.getSystemInfo({
          success: (systermInfo) => {
            commit(CHANGE_SYSTERM_INFO, systermInfo);
            resolve();
          },
          fail: () => {
            commit(CHANGE_SYSTERM_INFO, {});
            resolve();
          },
        });
      });
    },
  },
};
