import { CHANGE_IS_IN_MINIPROGRAM, CHANGE_SYSTERM_INFO } from "./type";
import { MINI_PROGRAM_TAG } from "../../constant";

export default {
  namespaced: true,
  state() {
    return {
      isInMiniProgram: uni.getStorageSync(MINI_PROGRAM_TAG) || false,
      systermInfo: {}
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
