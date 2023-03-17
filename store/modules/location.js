import { CHANGE_CURRENT_CITY, CHANGE_LOCATION_INFO } from './type'
import { getAdressDetailByLngLat } from '@/utils'

export default {
  namespaced: true,
  state() {
    return {
      locationInfo: {},
      detailAddress: '',
      currentCity: '',
    }
  },

  mutations: {
    [CHANGE_LOCATION_INFO](state, location) {
      state.locationInfo = location.addressComponent
      state.detailAddress = location.formatted_address
      if (!state.currentCity) {
        state.currentCity = location.addressComponent.township
      }
    },
    [CHANGE_CURRENT_CITY](state, chooseCity) {
      state.currentCity = chooseCity
    },
  },

  actions: {
    async getCurrentLocation({ commit }) {
      // #ifdef APP
      uni.getLocation({
        type: 'gcj02',
        success: function (res) {
          getAdressDetailByLngLat(res.latitude, res.longitude)
            .then(res => {
              if (res.status === '1') {
                commit(CHANGE_LOCATION_INFO, res.regeocode)
              }
            })
            .catch(() => {
              _this.address = '定位失败'
            })
        },
      })
      // #endif

      // #ifdef H5
      uni.getLocation({
        type: 'gcj02',
        success: function (res) {
          getAdressDetailByLngLat(res.latitude, res.longitude)
            .then(res => {
              if (res.status === '1') {
                commit(CHANGE_LOCATION_INFO, res.regeocode)
              }
            })
            .catch(() => {
              _this.address = '定位失败'
            })
        },
      })
      // #endif
    },
  },
}
