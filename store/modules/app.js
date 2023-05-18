import { CHANGE_IS_IN_MINIPROGRAM } from "./type";
import { MINI_PROGRAM_TAG } from "../../constant";

export default {
  namespaced: true,
  state() {
    return {
      isInMiniProgram: uni.getStorageSync(MINI_PROGRAM_TAG) || false,
    };
  },

  mutations: {
    [CHANGE_IS_IN_MINIPROGRAM](state, tag) {
      uni.setStorageSync(MINI_PROGRAM_TAG, tag);
      state.isInMiniProgram = tag;
    },
  },
};
