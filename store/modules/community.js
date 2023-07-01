import { queryDynamicDataApi } from "../../api/address";
import {
  CHANGE_HOME_PAGE_IMAGE,
  CHANGE_HOME_STORE,
  CHANGE_HOME_PAGE_IMAGE_PATH,
  CHANGE_DZ_VIP_PACKAGE,
} from "./type";
import communityShopList from "data/communityShopList";

export default {
  namespaced: true,
  state() {
    return {
      popupImage: null,
      popupImagePath: null,
      homeCommunityStore: {},
      dzVipList: [],
    };
  },

  mutations: {
    [CHANGE_HOME_PAGE_IMAGE](state, imageUrl) {
      state.popupImage = imageUrl;
    },

    [CHANGE_HOME_PAGE_IMAGE_PATH](state, url) {
      state.popupImagePath = url;
    },

    [CHANGE_HOME_STORE](state, currentAddress) {
      if (!currentAddress) {
        state.homeCommunityStore = communityShopList[0];
        return;
      }
      const findCurrentStore = communityShopList.find((item) =>
        item.town.includes(currentAddress)
      );

      state.homeCommunityStore = findCurrentStore
        ? findCurrentStore
        : communityShopList[0];
    },

    [CHANGE_DZ_VIP_PACKAGE](state, vipList) {
      state.dzVipList = vipList;
    },
  },

  actions: {
    // 获取自定义首屏弹窗图片
    async getHomePopupImage({ commit }, currentAddress) {
      const res = await queryDynamicDataApi({
        // address: "广东省佛山市顺德区龙江镇",
        address: currentAddress,
        correspondType: 4,
      });

      commit(
        CHANGE_HOME_PAGE_IMAGE,
        res.statusCode == 20000 && res.data !== "该区域暂无自定义属性"
          ? res.data[res.data.length - 1].url
          : ""
      );

      commit(
        CHANGE_HOME_PAGE_IMAGE_PATH,
        res.statusCode == 20000 && res.data !== "该区域暂无自定义属性"
          ? res.data[0].path.replace(
              "https://www.tuanfengkeji.cn/TFShop_Uni_H5/#",
              ""
            )
          : ""
      );
    },

    // 获取自定义服务
    getMyAttribute(_, currentAddress) {
      return new Promise((resolve, reject) => {
        queryDynamicDataApi({
          // address: "广东省佛山市顺德区龙江镇",
          address: currentAddress,
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

    // 获取会员套餐自定义属性
    async getVipPackageList({ commit }, currentAddress) {
      const res = await queryDynamicDataApi({
        address:
          currentAddress && JSON.stringify(currentAddress) != "[]"
            ? currentAddress
            : "",
        correspondType: 2,
      });

      if (res.statusCode === 20000 && res.data !== "该区域暂无自定义属性") {
        commit(CHANGE_DZ_VIP_PACKAGE, res.data);
      } else {
        commit(CHANGE_DZ_VIP_PACKAGE, []);
      }
    },
  },
};
