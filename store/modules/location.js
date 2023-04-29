import { CHANGE_CURRENT_CITY, CHANGE_LOCATION_INFO } from "./type";
import { CURRENT_ADDRESS } from "../../constant";
import { getAdressDetailByLngLat } from "@/utils";

export default {
  namespaced: true,
  state() {
    return {
      locationInfo: {
        city: "佛山市",
        province: "广东省",
        adcode: "440606",
        district: "顺德区",
        towncode: "440606004000",
        streetNumber: {
          number: "1号",
          location: "113.300463,22.801715",
          direction: "东北",
          distance: "165.82",
          street: "碧水路",
        },
        country: "中国",
        township: "大良街道",
        businessAreas: [[]],
        building: { name: [], type: [] },
        neighborhood: { name: [], type: [] },
        citycode: "0757",
      },
      detailAddress: "广东省佛山市顺德区大良街道碧水路顺德市民活动中心",
      currentCity: uni.getStorageSync(CURRENT_ADDRESS) || "大良街道",
    };
  },

  mutations: {
    [CHANGE_LOCATION_INFO](state, location) {
      state.locationInfo = location.addressComponent;
      state.detailAddress = location.formatted_address;
      state.currentCity = location.addressComponent.township;

      console.log("第一步", state);
    },
    [CHANGE_CURRENT_CITY](state, chooseCity) {
      uni.setStorageSync(CURRENT_ADDRESS, chooseCity);
      state.currentCity = chooseCity;
    },
  },

  actions: {
    async getCurrentLocation({ commit }) {
      // #ifdef APP
      uni.getLocation({
        type: "gcj02",
        success: function (res) {
          getAdressDetailByLngLat(res.latitude, res.longitude)
            .then((res) => {
              if (res.status === "1") {
                commit(CHANGE_LOCATION_INFO, res.regeocode);
              }
            })
            .catch(() => {
              _this.address = "定位失败";
            });
        },
      });
      // #endif

      // #ifdef H5
      uni.getLocation({
        type: "gcj02",
        success: function (res) {
          getAdressDetailByLngLat(res.latitude, res.longitude)
            .then((res) => {
              if (res.status === "1") {
                commit(CHANGE_LOCATION_INFO, res.regeocode);
              }
            })
            .catch(() => {
              _this.address = "定位失败";
            });
        },
      });
      // #endif
    },
  },
};
