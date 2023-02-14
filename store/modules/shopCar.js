import { getCartIndexApi, getCartUpdateApi, getCartCheckedApi, getCartDeleteApi } from '../../api/cart'
import { CHANGE_SHOP_CAR_INFO, CHANGE_SHOP_CAR_MODE, ADD_DELETE_ITEM, BATCH_GOODS_DELETE } from './type'

export const ON_EDIT = "ON_EDIT"
export const ON_CONFIRM = "ON_CONFIRM"

export default {
  namespaced: true,
  state: () => {
    return {
      shopCarInfo: {},
      currentMode: ON_EDIT,
      deleteList: []
    }
  },
  mutations: {
    [CHANGE_SHOP_CAR_INFO](state, shopCarData) {
      state.shopCarInfo = shopCarData
    },

    [CHANGE_SHOP_CAR_MODE](state) {
      if(!state.shopCarInfo.brandCartgoods.length){
        uni.showToast({
          title: "没有要编辑的商品",
          icon: 'none'
        })
        return
      }
      if (state.currentMode === ON_EDIT) {
        state.currentMode = ON_CONFIRM
      } else {
        state.currentMode = ON_EDIT
      }
    },

    [ADD_DELETE_ITEM](state, deleteItem) {
      const index = state.deleteList.indexOf(deleteItem)
      if (index !== -1) {
        state.deleteList.splice(index, 1)
      } else {
        state.deleteList.push(deleteItem)
      }
    },

    [BATCH_GOODS_DELETE](state, data) {
      data.productIds.forEach(item => {
        if (data.tag) {
          if (!state.deleteList.includes(item)) {
            state.deleteList.push(item)
          }
        } else {
          const index = state.deleteList.indexOf(item)
          index !== -1 && state.deleteList.splice(index, 1)
        }
      })
    }
  },

  actions: {
    // 获取购物车数据
    async getShopCarList({ commit, rootState }) {
      uni.showLoading({
        title: '加载中'
      })

      const { data } = await getCartIndexApi({
        userId: rootState.auth.userId
      })

      uni.hideLoading()
      commit(CHANGE_SHOP_CAR_INFO, data)
    },

    // 修改购物车数量
    async changeGoodsNumber({ dispatch, rootState }, data) {
      try {
        uni.showLoading()
        await getCartUpdateApi({
          userId: rootState.auth.userId,
          goodsId: data.goodsInfo.goodsId,
          productId: data.goodsInfo.productId,
          number: data.number,
          id: data.goodsInfo.id
        })
        dispatch('getShopCarList')
      } catch (error) {
        uni.showToast({
          title: '修改失败',
          icon: 'none'
        })
      } finally {
        uni.hideLoading()
      }
    },

    // 切换商品的选中状态
    async changeGoodsStatus({ dispatch, rootState }, statusInfo) {
      uni.showLoading()
      await getCartCheckedApi({
        userId: rootState.auth.userId,
        ...statusInfo
      })
      uni.hideLoading()
      dispatch('getShopCarList')
    },

    // 删除商品
    async deleteSelectedGoods({ commit, state, rootState }) {
      uni.showLoading()
      try {
        const { data } = await getCartDeleteApi({
          userId: rootState.auth.userId,
          productIds: state.deleteList
        })

        commit(CHANGE_SHOP_CAR_INFO, data)
        if (data.brandCartgoods.length === 0) {
          state.currentMode = ON_EDIT
        }
      } finally {
        uni.hideLoading()
      }

    }
  }
}