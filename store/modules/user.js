import {
  CHNAGE_SHOP_CAR_NUMBER,
  CHANGE_COUPON_NUMBER,
  CHANGE_COMMUNITY_ORDER_INFO,
  CHANGE_REGIONAGENT_STATUS,
  CHANGE_REGIMENTAL_COMMANDER_STATUS
} from './type';

import { getCarShopNumberApi } from '../../api/goods';
import { getApplyRegionagentStatusApi, getCouponListApi, queryApplyRegimentalCommanderStatusApi } from '../../api/user';
import { getOrderNumberApi } from '../../api/community-center';

export default {
  namespaced: true,
  state() {
    return {
      shopCarNumber: 0,
      couponNumber: 0,
      communityOrderInfo: {},
      applyRegionAgentStatus: '',
      regimentalCommanderStatus: ''
    };
  },

  mutations: {
    [CHNAGE_SHOP_CAR_NUMBER](state, shopCarNumber) {
      state.shopCarNumber = shopCarNumber;
    },

    [CHANGE_COMMUNITY_ORDER_INFO](state, communityOrderInfo) {
      state.communityOrderInfo = communityOrderInfo;
    },

    [CHANGE_COUPON_NUMBER](state, couponNumber) {
      state.couponNumber = couponNumber;
    },

    [CHANGE_REGIONAGENT_STATUS](state, status) {
      state.applyRegionAgentStatus = status;
    },

    [CHANGE_REGIMENTAL_COMMANDER_STATUS](state, status) {
      state.regimentalCommanderStatus = status;
    }
  },

  actions: {
    count({ commit }, { userId, phone }) {
      if (!userId) {
        return;
      }
      getCarShopNumberApi({
        userId
      }).then(({ data }) => {
        commit(CHNAGE_SHOP_CAR_NUMBER, data);
      });

      getCouponListApi({
        userId,
        page: 1,
        size: 10,
        status: 0
      }).then(({ data }) => {
        commit(CHANGE_COUPON_NUMBER, data.count);
      });

      getOrderNumberApi({
        userId
      }).then((res) => {
        if (res.statusCode === 20000) {
          commit(CHANGE_COMMUNITY_ORDER_INFO, res.data || {});
        }
      });

      // const res = await getApplyRegionagentStatusApi({
      //   userId: this.userId,
      // })

      getApplyRegionagentStatusApi({
        userId
      }).then((res) => {
        commit(CHANGE_REGIONAGENT_STATUS, res.data === '你还未申请过' ? '' : res.data);
      });

      queryApplyRegimentalCommanderStatusApi({
        mobile: phone
      })
        .then((res) => {
          commit(CHANGE_REGIMENTAL_COMMANDER_STATUS, res);
        })
        .catch((err) => {
          commit(CHANGE_REGIMENTAL_COMMANDER_STATUS, '');
        });
    }
  }
};
