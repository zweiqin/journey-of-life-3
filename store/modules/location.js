import {
	CHANGE_LOCATION_INFO,
	CHANGE_LOACTION_DETAIL_INFO
} from './type'
import { T_SELECTED_ADDRESS } from '../../constant'
import {
	getAdressDetailByLngLat,
	getLngLatByAddress
} from '@/utils'
import { updateUserLocationApi } from '../../api/address'

export default {
	namespaced: true,
	state() {
		return {
			// TODO: 默认值改掉
			locationInfo: {
				city: '佛山市',
				province: '广东省',
				adcode: '440606', // 区，三级
				district: '顺德区',
				towncode: '440606004000',
				streetNumber: {
					number: '1号',
					location: '113.300463,22.801715', // 113.06092 , 22.89223
					direction: '东北',
					distance: '165.82',
					street: '碧水路'
				},
				country: '中国',
				township: '大良街道',
				businessAreas: [ [] ],
				building: { name: [], type: [] },
				neighborhood: { name: [], type: [] },
				citycode: '0757'
			},
			detailAddress: '', // 广东省佛山市顺德区大良街道碧水路顺德市民活动中心
			currentCity: uni.getStorageSync(T_SELECTED_ADDRESS)?.data?.town || '大良街道', // 社区项目地址，只显示四级，来自：定位，地址选择或请求返回
			currentShopCity: uni.getStorageSync(T_SELECTED_ADDRESS)?.data?.town || '大良街道', // 商圈项目地址，可一二三四级，默认四级，来自：定位，地址选择
			obtainLocationCount: 0
		}
	},

	mutations: {
		[CHANGE_LOCATION_INFO](state, location) {
			state.locationInfo = location.addressComponent
			typeof state.locationInfo.province === 'object' ? state.locationInfo.province = '' : ''
			typeof state.locationInfo.city === 'object' ? state.locationInfo.city = '' : ''
			typeof state.locationInfo.district === 'object' ? state.locationInfo.district = '' : ''
			typeof state.locationInfo.adcode === 'object' ? state.locationInfo.adcode = '' : ''
			typeof state.locationInfo.township === 'object' ? state.locationInfo.township = '' : ''
			typeof state.locationInfo.towncode === 'object' ? state.locationInfo.towncode = '' : ''
			state.detailAddress = typeof location.formatted_address === 'object' ? '' : location.formatted_address
			state.currentCity = typeof location.addressComponent.township === 'object' ? '' : location.addressComponent.township
			state.currentShopCity = typeof location.addressComponent.township === 'object' ? '' : location.addressComponent.township
			state.obtainLocationCount = state.obtainLocationCount + 1
			uni.setStorageSync(T_SELECTED_ADDRESS, {
				type: 'default',
				data: {
					province: state.locationInfo.province,
					city: state.locationInfo.city,
					district: state.locationInfo.district,
					town: state.locationInfo.township,
					detailAddress: state.detailAddress
				}
			})
		},
		[CHANGE_LOACTION_DETAIL_INFO](state, { detailInfo, currentCity, currentShopCity }) { // 触发该方法来自：地址选择，上次选择或定位。
			state.locationInfo = {
				city: typeof detailInfo.city === 'object' ? '' : detailInfo.city,
				province: typeof detailInfo.province === 'object' ? '' : detailInfo.province,
				adcode: typeof detailInfo.adcode === 'object' ? '' : detailInfo.adcode,
				district: typeof detailInfo.district === 'object' ? '' : detailInfo.district,
				towncode: '',
				streetNumber: {
					number: '',
					location: detailInfo.location,
					direction: '',
					distance: '',
					street: ''
				},
				country: '中国',
				township: typeof detailInfo.township === 'object' ? '' : detailInfo.township,
				businessAreas: [ [] ],
				building: { name: [], type: [] },
				neighborhood: { name: [], type: [] },
				citycode: ''
			}
			state.detailAddress = typeof detailInfo.formatted_address === 'object' ? '' : detailInfo.formatted_address
			state.currentCity = currentCity || state.locationInfo.township
			state.currentShopCity = currentShopCity
			state.obtainLocationCount = state.obtainLocationCount + 1
		}
	},

	actions: {
		getCurrentLocation({ commit, dispatch }, onSuccess) {
			return new Promise(async (resolve, reject) => {
				try {
					uni.getLocation({
						type: 'gcj02',
						success(res) {
							getAdressDetailByLngLat(res.latitude, res.longitude)
								.then((detailInfo) => {
									try {
										if (detailInfo && detailInfo.status === '1' && detailInfo.regeocode) {
											commit(CHANGE_LOCATION_INFO, detailInfo.regeocode)
											const tempProvince = detailInfo.regeocode.addressComponent.province === 'object' ? '' : detailInfo.regeocode.addressComponent.province
											const tempCity = detailInfo.regeocode.addressComponent.city === 'object' ? '' : detailInfo.regeocode.addressComponent.city
											const tempDistrict = detailInfo.regeocode.addressComponent.district === 'object' ? '' : detailInfo.regeocode.addressComponent.district
											const tempTown = detailInfo.regeocode.addressComponent.township === 'object' ? '' : detailInfo.regeocode.addressComponent.township
											const tempDetailAddress = detailInfo.regeocode.formatted_address === 'object' ? '' : detailInfo.regeocode.formatted_address
											const finalRes = {
												detail: tempProvince + tempCity + tempDistrict + tempTown,
												province: tempProvince,
												city: tempCity,
												district: tempDistrict,
												town: tempTown,
												detailAddress: tempDetailAddress
											}
											onSuccess && typeof onSuccess === 'function' && onSuccess(finalRes)
											dispatch('updateUserLocation', detailInfo.regeocode.formatted_address)
											resolve(finalRes)
										}
									} catch (error) {
										console.log('草了啊', error)
									}
								})
								.catch((e) => {
									console.log('获取位置失败', e)
									reject(false)
								})
						},
						fail: (e) => {
							console.log('定位失败', e)
							reject(false)
						}
						// complete: (e) => {
						// 	console.log('bbbb', e)
						// }
					})
				} catch (error) {
					if (error === 'prompt') {
						uni.showToast({
							title: '为了精准为您服务，请授权访问您的位置',
							icon: 'none'
						})
					}
					reject(false)
				}
			})
		},

		async getDetailAddress({ commit, dispatch }, data) {
			const res = await getLngLatByAddress(data.city + data.district + data.town)
			if (res.status == '1') {
				const detailInfo = res.geocodes[0]
				commit(CHANGE_LOACTION_DETAIL_INFO, {
					detailInfo,
					currentCity: data.town || '',
					currentShopCity: data.town || data.district || data.city
				})
				// dispatch('community/getHomePopupImage', detailInfo.province + data.city + data.district + data.town, { root: true })
				commit('community/CHANGE_HOME_STORE', data.town, { root: true })
				dispatch('community/getVipPackageList', detailInfo.province + data.city + data.district + data.town, { root: true })
				dispatch('updateUserLocation', detailInfo.formatted_address)
			}
		},

		async updateUserLocation({ rootState }, address) {
			if (rootState.auth && rootState.auth.userInfo && rootState.auth.userInfo.phone && address && typeof address === 'string') {
				updateUserLocationApi({
					address,
					phone: rootState.auth.userInfo.phone
				})
			}
		}
	}
}
