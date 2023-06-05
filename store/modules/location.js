import {
  CHANGE_CURRENT_CITY,
  CHANGE_LOCATION_INFO,
  CHANGE_LOACTION_DETAIL_INFO,
} from "./type";
import { CURRENT_ADDRESS } from "../../constant";
import {
  getAdressDetailByLngLat,
  getLngLatByAddress,
  MapLoader,
} from "@/utils";
import { isUserEmpowerLocationPermission } from "utils";

export default {
  namespaced: true,
  state() {
    return {
      // TODO: 默认值改掉
      locationInfo: {
        city: "",
        province: "",
        adcode: "",
        district: "",
        towncode: "",
        streetNumber: {
          number: "",
          location: "",
          direction: "",
          distance: "",
          street: "",
        },
        country: "",
        township: "",
        businessAreas: [[]],
        building: { name: [], type: [] },
        neighborhood: { name: [], type: [] },
        citycode: "0757",
      },
      detailAddress: "",
      currentCity: uni.getStorageSync(CURRENT_ADDRESS) || "定位失败",
    };
  },

  mutations: {
    [CHANGE_LOCATION_INFO](state, location) {
      state.locationInfo = location.addressComponent;
      state.detailAddress = location.formatted_address;
      state.currentCity = location.addressComponent.township;
      uni.setStorageSync(CURRENT_ADDRESS, location.addressComponent.township);
    },
    [CHANGE_CURRENT_CITY](state, chooseCity) {
      uni.setStorageSync(CURRENT_ADDRESS, chooseCity);
      state.currentCity = chooseCity;
    },
    [CHANGE_LOACTION_DETAIL_INFO](state, { detailInfo, currentCity }) {
      state.detailAddress = detailInfo.formatted_address;
      state.currentCity = currentCity;
      state.locationInfo = {
        city: detailInfo.city,
        province: detailInfo.province,
        adcode: "",
        district: detailInfo.district,
        towncode: "",
        streetNumber: {
          number: "",
          location: detailInfo.location,
          direction: "",
          distance: "",
          street: "",
        },
        country: "中国",
        township: detailInfo.currentCity,
        businessAreas: [[]],
        building: { name: [], type: [] },
        neighborhood: { name: [], type: [] },
        citycode: "",
      };
    },
  },

  actions: {
    async getCurrentLocation({ commit }, onSuccess) {
      // #ifdef APP
      uni.getLocation({
        type: "gcj02",
        altitude: true,
        geocode: false,
        timeout: 5,
        cacheTimeout: 4000,
        accuracy: "high",
        isHighAccuracy: true,
        success(res) {
          getAdressDetailByLngLat(res.latitude, res.longitude)
            .then((res) => {
              if (res.status === "1") {
                commit(CHANGE_LOCATION_INFO, res.regeocode);
              }
            })
            .catch(() => {});
        },
      });
      // #endif

      // #ifdef H5
      // MapLoader(
      //   (res) => {
      //     getAdressDetailByLngLat(res.latitude, res.longitude)
      //       .then((res) => {
      //         if (res.status === "1") {
      //           commit(CHANGE_LOCATION_INFO, res.regeocode);
      //           const addressDetail = res.regeocode;
      //           onSuccess &&
      //             typeof onSuccess === "function" &&
      //             onSuccess(
      //               addressDetail.addressComponent.province +
      //                 addressDetail.addressComponent.city +
      //                 addressDetail.addressComponent.district +
      //                 addressDetail.addressComponent.township
      //             );
      //         }
      //       })
      //       .catch(() => {
      //         // _this.address = '定位失败'
      //       });
      //   },
      //   () => {
      //     uni.getLocation({
      //       type: "gcj02",
      //       success(res) {
      //         getAdressDetailByLngLat(res.latitude, res.longitude)
      //           .then((res) => {
      //             if (res.status === "1") {
      //               commit(CHANGE_LOCATION_INFO, res.regeocode);
      //               const addressDetail = res.regeocode;
      //               onSuccess &&
      //                 typeof onSuccess === "function" &&
      //                 onSuccess(
      //                   addressDetail.addressComponent.province +
      //                     addressDetail.addressComponent.city +
      //                     addressDetail.addressComponent.district +
      //                     addressDetail.addressComponent.township
      //                 );
      //             }
      //           })
      //           .catch(() => {
      //             // _this.address = '定位失败'
      //           });
      //       },
      //     });
      //   }
      // );

      return new Promise(async (resolve, reject) => {
        try {
          await isUserEmpowerLocationPermission();
          uni.getLocation({
            type: "gcj02",
            fail(e) {
              console.log("定位失败", e);
            },
            success(res) {
              getAdressDetailByLngLat(res.latitude, res.longitude)
                .then((res) => {
                  if (res.status === "1") {
                    commit(CHANGE_LOCATION_INFO, res.regeocode);
                    const addressDetail = res.regeocode;
                    onSuccess &&
                      typeof onSuccess === "function" &&
                      onSuccess({
                        detail:
                          addressDetail.addressComponent.province +
                          addressDetail.addressComponent.city +
                          addressDetail.addressComponent.district +
                          addressDetail.addressComponent.township,
                        town: addressDetail.addressComponent.township,
                      });
                  }

                  resolve(true);
                })
                .catch((e) => {
                  console.log("你啊", e);
                });
            },
          });
        } catch (error) {
          if (error === "prompt") {
            uni.showToast({
              title: "为了精准为您服务，请授权访问您的位置",
              icon: "none",
            });
          }

          reject(false);
        }
      });

      // #endif
    },

    async getDetailAddress({ commit, dispatch }, data) {
      const res = await getLngLatByAddress(
        data.city + data.distinguish + data.town
      );
      if (res.status == "1") {
        const detailInfo = res.geocodes[0];
        commit(CHANGE_LOACTION_DETAIL_INFO, {
          detailInfo,
          currentCity:
            data.level === 4
              ? data.town
              : data.level === 3
              ? data.distinguish
              : data.city,
        });

        dispatch(
          "community/getHomePopupImage",
          detailInfo.province + data.city + data.distinguish + data.town,
          // null,
          { root: true }
        );

        commit("community/CHANGE_HOME_STORE", data.town, { root: true });
        dispatch(
          "community/getVipPackageList",
          detailInfo.province + data.city + data.distinguish + data.town,
          {
            root: true,
          }
        );
      }
    },
  },
};
