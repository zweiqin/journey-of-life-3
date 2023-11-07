import { CHANGE_IS_IN_MINIPROGRAM, CHANGE_SYSTERM_INFO } from "./type";

export default {
  namespaced: true,
  state() {
    return {
      isInMiniProgram: false,
      systermInfo: {}
    };
  },

  mutations: {
    [CHANGE_IS_IN_MINIPROGRAM](state, tag) {
      if (tag) {
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
