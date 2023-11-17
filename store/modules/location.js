import {
	CHANGE_LOCATION_INFO,
	CHANGE_LOACTION_DETAIL_INFO,
	CHANGE_NEARBY_LOCATION
} from './type'
import { T_SELECTED_ADDRESS } from '../../constant'
import {
	getAdressDetailByLngLat,
	getLngLatByAddress
} from '@/utils'

export default {
	namespaced: true,
	state() {
		return {
			// TODO: 默认值改掉
			locationInfo: {
				city: '佛山市',
				province: '广东省',
				adcode: '440606',
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
			currentCity: uni.getStorageSync(T_SELECTED_ADDRESS)?.data?.town || '大良街道',
			obtainLocationCount: 0,
			shopAndbusinessLocation: {
				shopAndbusinessDetailAddressText: '', // 用户选择的地址
				shopAndbusinessDetailAddressObj: {
					longitude: '',
					latitude: '',
					adcode: ''
				}
			}
		}
	},

	mutations: {
		[CHANGE_LOCATION_INFO](state, location) {
			state.locationInfo = location.addressComponent
			typeof state.locationInfo.province === 'object' ? state.locationInfo.province = '' : ''
			typeof state.locationInfo.city === 'object' ? state.locationInfo.city = '' : ''
			typeof state.locationInfo.district === 'object' ? state.locationInfo.district = '' : ''
			typeof state.locationInfo.township === 'object' ? state.locationInfo.township = '' : ''
			typeof state.locationInfo.adcode === 'object' ? state.locationInfo.adcode = '' : ''
			state.detailAddress = typeof location.formatted_address === 'object' ? '' : location.formatted_address
			state.currentCity = typeof location.addressComponent.township === 'object' ? '' : location.addressComponent.township
			state.obtainLocationCount = state.obtainLocationCount + 1
			uni.setStorageSync(T_SELECTED_ADDRESS, {
				type: 'default',
				data: {
					city: state.locationInfo.city,
					distinguish: state.locationInfo.district,
					town: state.locationInfo.township
				}
			})
		},
		[CHANGE_LOACTION_DETAIL_INFO](state, { detailInfo, currentCity }) {
			state.detailAddress = typeof detailInfo.formatted_address === 'object' ? '' : detailInfo.formatted_address
			state.currentCity = currentCity
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
			state.obtainLocationCount = state.obtainLocationCount + 1
		},
		[CHANGE_NEARBY_LOCATION](state, locationData) {
			const { currentLocation, detailLocation } = locationData
			state.shopAndbusinessLocation.shopAndbusinessDetailAddressText = currentLocation
			state.shopAndbusinessLocation.shopAndbusinessDetailAddressObj.adcode = detailLocation.adcode
			state.shopAndbusinessLocation.shopAndbusinessDetailAddressObj.longitude = detailLocation.location.split(',')[0]
			state.shopAndbusinessLocation.shopAndbusinessDetailAddressObj.latitude = detailLocation.location.split(',')[1]
		}
	},

	actions: {
		getCurrentLocation({ commit, dispatch }, onSuccess) {
			return new Promise(async (resolve, reject) => {
				try {
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

					uni.getLocation({
						type: 'gcj02',
						// altitude: true,
						// geocode: false,
						// highAccuracyExpireTime: 4000,
						// timeout: 5,
						// cacheTimeout: 4000,
						// accuracy: 'high',
						// isHighAccuracy: true,
						success(res) {
							// console.log(res)
							getAdressDetailByLngLat(res.latitude, res.longitude)
								.then((res) => {
									// console.log(res);
									if (res.status === '1') {
										commit(CHANGE_LOCATION_INFO, res.regeocode)
										res.regeocode && res.regeocode.addressComponent && dispatch('getDetailAddressForShopAndBusiness', {
											currentShopAndBusinessLocation: res.regeocode.addressComponent.city,
											areaText: res.regeocode.addressComponent.city
										})
										const addressDetail = res.regeocode
										onSuccess &&
											typeof onSuccess === 'function' &&
											onSuccess({
												detail:
													addressDetail.addressComponent.province +
													addressDetail.addressComponent.city +
													addressDetail.addressComponent.district +
													addressDetail.addressComponent.township,
												town: addressDetail.addressComponent.township
											})
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
			const res = await getLngLatByAddress(data.city + data.distinguish + data.town)
			if (res.status == '1') {
				const detailInfo = res.geocodes[0]

				commit(CHANGE_LOACTION_DETAIL_INFO, {
					detailInfo,
					currentCity: data.town || data.distinguish || data.city
				})

				commit(CHANGE_NEARBY_LOCATION, {
					detailLocation: res.geocodes[0],
					currentLocation: data.town
				})

				dispatch('community/getHomePopupImage', detailInfo.province + data.city + data.distinguish + data.town, { root: true })
				commit('community/CHANGE_HOME_STORE', data.town, { root: true })
				dispatch('community/getVipPackageList', detailInfo.province + data.city + data.distinguish + data.town, { root: true })
			}
		},

		async getDetailAddressForShopAndBusiness({ commit }, areaObject) {
			const { areaText, currentShopAndBusinessLocation } = areaObject
			const res = await getLngLatByAddress(areaText)
			if (res.status == '1') {
				commit(CHANGE_NEARBY_LOCATION, {
					detailLocation: res.geocodes[0],
					currentLocation: currentShopAndBusinessLocation
				})
			}
		}
	}
}
