import {
  CHNAGE_SHOP_CAR_NUMBER,
  CHANGE_COUPON_NUMBER,
  CHANGE_COMMUNITY_ORDER_INFO,
} from './type'

import { getCarShopNumberApi } from '../../api/goods'
import { getCouponListApi } from '../../api/user'
import { getOrderNumberApi } from '../../api/community-center'

export default {
  namespaced: true,
  state() {
    return {
      shopCarNumber: 0,
      couponNumber: 0,
      communityOrderInfo: {},
    }
  },

  mutations: {
    [CHNAGE_SHOP_CAR_NUMBER](state, shopCarNumber) {
      state.shopCarNumber = shopCarNumber
    },

    [CHANGE_COMMUNITY_ORDER_INFO](state, communityOrderInfo) {
      state.communityOrderInfo = communityOrderInfo
    },

    [CHANGE_COUPON_NUMBER](state, couponNumber) {
      state.couponNumber = couponNumber
    },
  },

  actions: {
    count({ commit }, userId) {
      if (!userId) {
        return
      }
      getCarShopNumberApi({
        userId,
      }).then(({ data }) => {
        commit(CHNAGE_SHOP_CAR_NUMBER, data)
      })

      getCouponListApi({
        userId,
        page: 1,
        size: 10,
        status: 0,
      }).then(({ data }) => {
        commit(CHANGE_COUPON_NUMBER, data.count)
      })

      getOrderNumberApi({
        userId,
      }).then(res => {
        if (res.statusCode === 20000) {
          commit(CHANGE_COMMUNITY_ORDER_INFO, res.data || {})
        }
      })
    },
  },
}
