import { queryDynamicDataApi } from "../../api/address";
import { CHANGE_HOME_PAGE_IMAGE } from "./type";

export default {
  namespaced: true,
  state() {
    return {
      popupImage: null,
    };
  },

  mutations: {
    [CHANGE_HOME_PAGE_IMAGE](state, imageUrl) {
      state.popupImage = imageUrl;
    },
  },

  actions: {
    // 获取自定义首屏弹窗图片
    async getHomePopupImage({ commit }, currentAddress) {
      const res = await queryDynamicDataApi({
        // address: "广东省佛山市顺德区龙江镇",
        address: currentAddress || "广东省佛山市顺德区龙江镇",
        correspondType: 4,
      });

      commit(
        CHANGE_HOME_PAGE_IMAGE,
        res.statusCode == 20000 && res.data !== "该区域暂无自定义属性"
          ? res.data[0].url
          : ""
      );
    },

    // 获取自定义服务
    getMyAttribute(_, currentAddress) {
      return new Promise((resolve, reject) => {
        queryDynamicDataApi({
          // address: "广东省佛山市顺德区龙江镇",
          address: currentAddress || "广东省佛山市顺德区大良镇",
          correspondType: 1,
        }).then((res) => {
          if (res.data.includes("该区域暂无自定义属性")) {
            resolve("");
          } else {
            resolve(res.data);
          }
        });
      });
    },
  },
};
