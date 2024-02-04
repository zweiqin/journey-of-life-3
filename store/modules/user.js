import {
	CHNAGE_PRICE_PLATFORM_INFO,
	CHNAGE_SHOP_CAR_NUMBER,
	CHNAGE_LEVEL_TYPE
} from './type'
import { getStorageKeyToken } from '../../utils'
import { getPricePlatformAllApi, getCartListApi, getSelectLevelPlatformRelationApi } from '../../api/anotherTFInterface'

export default {
	namespaced: true,
	state() {
		return {
			pricePlatformInfo: {},
			shopCarNumber: 0,
			levelType: 0
		}
	},

	mutations: {
		[CHNAGE_PRICE_PLATFORM_INFO](state, pricePlatformInfo) {
			state.pricePlatformInfo = pricePlatformInfo
		},

		[CHNAGE_SHOP_CAR_NUMBER](state, shopCarNumber) {
			state.shopCarNumber = shopCarNumber
		},

		[CHNAGE_LEVEL_TYPE](state, levelType) {
			state.levelType = levelType
		}
	},

	actions: {
		getCountAction({ commit }) {
			if (!getStorageKeyToken()) return
			getPricePlatformAllApi({})
				.then((res) => {
					commit(CHNAGE_PRICE_PLATFORM_INFO, res.data)
				})
			getCartListApi({}).then((res) => {
				commit(CHNAGE_SHOP_CAR_NUMBER, res.data.reduce((total, value) => total + value.skus.reduce((t, v) => t + (v.shelveState ? v.number : 0), 0), 0))
			})
			getSelectLevelPlatformRelationApi({})
				.then((res) => {
					commit(CHNAGE_LEVEL_TYPE, res.data.levelType)
				})
		}
	}
}
