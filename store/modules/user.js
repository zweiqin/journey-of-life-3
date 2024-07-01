import {
	CHNAGE_PRICE_PLATFORM_INFO,
	CHNAGE_SHOP_CAR_NUMBER,
	CHNAGE_ACTIVITY_LIST
} from './type'
import store from '../index'
import { getStorageKeyToken } from '../../utils'
import { getUserCrmListApi } from '../../api/user'
import { getPricePlatformAllApi, getCartListApi } from '../../api/anotherTFInterface'

export default {
	namespaced: true,
	state() {
		return {
			pricePlatformInfo: {},
			shopCarNumber: 0,
			activityList: []
		}
	},

	mutations: {
		[CHNAGE_PRICE_PLATFORM_INFO](state, pricePlatformInfo) {
			state.pricePlatformInfo = pricePlatformInfo
		},

		[CHNAGE_SHOP_CAR_NUMBER](state, shopCarNumber) {
			state.shopCarNumber = shopCarNumber
		},

		[CHNAGE_ACTIVITY_LIST](state, activityList) {
			state.activityList = activityList
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
			// if (store.state.location.obtainLocationCount) {
			if (store.state.location.locationInfo.streetNumber.location) {
				getUserCrmListApi({
					longitude: store.state.location.locationInfo.streetNumber.location.split(',')[0],
					latitude: store.state.location.locationInfo.streetNumber.location.split(',')[1]
				})
					.then((res) => {
						commit(CHNAGE_ACTIVITY_LIST, res.data)
					})
			}
			// }
		}
	}
}
