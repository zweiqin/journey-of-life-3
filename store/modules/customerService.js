import { queryCustomer, createChat, queryChatList, queryChatMessage, queryChatMessageBack } from '../../api/customerService'
import { CHANGE_CUSTOMER_SERVICE_INFO, CHANGE_WS_INFO, CHANGE_WSINFO_INFO, CHANGE_CHAT_LIST } from './type'
import { getUserId } from '../../utils'
// import { USER_INFO } from '../../../constant' // uni.getStorageSync(USER_INFO)

// export const ON_EDIT = 'ON_EDIT'
// export const ON_CONFIRM = 'ON_CONFIRM'

export default {
	namespaced: true,
	state: () => ({
		customerServiceInfo: [ { letter: '我的客服', data: [] } ],
		chatListData: [],
		wsHandleInfo: '',
		wsHandle: ''
		// currentMode: ON_EDIT,
		// deleteList: []
	}),
	mutations: {
		[CHANGE_CUSTOMER_SERVICE_INFO](state, customerServiceData) {
			state.customerServiceInfo = customerServiceData
		},

		[CHANGE_CHAT_LIST](state, chatListData) {
			state.chatListData = chatListData
		},

		[CHANGE_WSINFO_INFO](state, wsHandleInfo) {
			state.wsHandleInfo = wsHandleInfo
		},

		[CHANGE_WS_INFO](state, wsHandle) {
			state.wsHandle = wsHandle
		}

		// [CHANGE_SHOP_CAR_MODE](state) {
		//   if(!state.shopCarInfo.brandCartgoods.length){
		//     uni.showToast({
		//       title: "没有要编辑的商品",
		//       icon: 'none'
		//     })
		//     return
		//   }
		//   if (state.currentMode === ON_EDIT) {
		//     state.currentMode = ON_CONFIRM
		//   } else {
		//     state.currentMode = ON_EDIT
		//   }
		// },

		// [ADD_DELETE_ITEM](state, deleteItem) {
		//   const index = state.deleteList.indexOf(deleteItem)
		//   if (index !== -1) {
		//     state.deleteList.splice(index, 1)
		//   } else {
		//     state.deleteList.push(deleteItem)
		//   }
		// },

		// [BATCH_GOODS_DELETE](state, data) {
		//   data.productIds.forEach(item => {
		//     if (data.tag) {
		//       if (!state.deleteList.includes(item)) {
		//         state.deleteList.push(item)
		//       }
		//     } else {
		//       const index = state.deleteList.indexOf(item)
		//       index !== -1 && state.deleteList.splice(index, 1)
		//     }
		//   })
		// }
	},

	actions: {
		// 获取聊天列表数据. data为true:目前代表是从我的客服页面进来调用的
		async getChatList({ dispatch, commit, rootState }, data) {
			uni.showLoading({
				title: '加载中'
			})
			const result = await queryChatList({
				userType: 'APP',
				userId: getUserId(),
				page: 1,
				limit: 9999
			})
			uni.hideLoading()
			commit(CHANGE_CHAT_LIST, result.data.items)
			if (data) {
				if (result.data.total !== 0) {
					uni.showModal({
						title: '提示',
						content: '已经与客服取得联系，是否继续与该客服进行沟通？',
						success(res) {
							if (res.confirm) {
								uni.redirectTo({
									url: `/user/chat/chat-detail?chat=${result.data.items[0].chatId}&name=${result.data.items[0].name}`
								})
							} else {
								uni.switchTab({
									url: '/pages/user/user'
								})
							}
						}
					})
				} else {
					dispatch('getCustomerServiceList')
				}
			}
		},

		// 获取客服列表数据
		async getCustomerServiceList({ commit, rootState }) {
			uni.showLoading({
				title: '加载中'
			})
			const { data } = await queryCustomer({})
			const tempInfo = {
				letter: '我的客服',
				data: data.map((item) => ({
					friendId: item.id,
					displayName: item.username,
					avatar: item.avatar
				}))
			}
			console.log(data, tempInfo)
			uni.hideLoading()
			commit(CHANGE_CUSTOMER_SERVICE_INFO, [ tempInfo ])
		},

		// 在客服列表页面（我的客服）与客服创建聊天
		async createChat({ dispatch, rootState }, data) {
			try {
				uni.showLoading()
				const res = await createChat(Object.assign(data, {
					chatId: '',
					userType: 'APP',
					userId: getUserId()
				}))
				uni.redirectTo({ url: `/user/chat/chat-detail?chat=${res.data.chatId}&name=${res.data.name}` }) // 进入聊天室（创建ws）
			} catch (error) {
				uni.showToast({
					title: '联系客服失败',
					icon: 'none'
				})
			} finally {
				uni.hideLoading()
			}
		},

		// 进入聊天页面，创建聊天，存储wsHandle
		joinCustomerServiceChat({ commit, rootState, state }, { ref, wsHandle, wsHandleInfo }) {
			// wsHandle.onopen = ref.onOpen
			// wsHandle.onmessage = ref.onMessage
			// wsHandle.onclose = ref.onError
			// wsHandle.onerror = ref.onError
			if (wsHandle) {
				commit('CHANGE_WS_INFO', wsHandle)
				wsHandle.onOpen(ref.onOpen)
				wsHandle.onMessage(ref.onMessage)
				wsHandle.onClose(ref.onClose)
				wsHandle.onError(ref.onError)
			}
			if (wsHandleInfo) {
				commit('CHANGE_WSINFO_INFO', wsHandleInfo)
				wsHandleInfo.onOpen(ref.onOpenInfo)
				wsHandleInfo.onMessage(ref.onMessageInfo)
				wsHandleInfo.onClose(ref.onCloseInfo)
				wsHandleInfo.onError(ref.onErrorInfo)
			}
		},

		// 查消息
		async queryChatMessage({ dispatch, rootState }, data) {
			try {
				uni.showLoading()
				const res = await queryChatMessage(data)
				// const res = { data: { items: [ {
				// 	'chatId': 17,
				// 	'sendUserId': 8,
				// 	'message': '{"event":"","message":{"id":1677311426451,"status":"succeed","type":"text","sendTime":1677311426451,"content":"开屎聊天","toContactId":17,"fileSize":0,"fileName":"","fromUser":{"id":8,"displayName":"Tuanfeng","avatar":"https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/zp7zbhidobolzr8z4b90.png"},"isGroup":true}}',
				// 	'userType': 'ADMIN',
				// 	'addTime': '2023-02-25 15:50:26',
				// 	'username': 'Tuanfeng',
				// 	'avatar': 'https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/zp7zbhidobolzr8z4b90.png'
				// } ] } }
				// 本测试用户是\"id\":537,\"displayName\":\"13888888888\
				return res.data.items || []
			} catch (error) {
				uni.showToast({
					title: '获取历史消息失败',
					icon: 'none'
				})
			} finally {
				uni.hideLoading()
			}
		},

		// 查消息（往后查）
		async queryChatMessageBack({ dispatch, rootState }, data) {
			try {
				uni.showLoading()
				const res = await queryChatMessageBack(data)
				return res.data.items || []
			} catch (error) {
				uni.showToast({
					title: '获取历史消息失败',
					icon: 'none'
				})
			} finally {
				uni.hideLoading()
			}
		}
	}
}
