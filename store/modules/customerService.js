import { queryCustomer, createChat, queryChatList, queryChatMessage } from '../../api/customerService'
import { CHANGE_CUSTOMER_SERVICE_INFO, CHANGE_WS_INFO, CHANGE_CHAT_LIST } from './type'
import { getUserId } from '../../utils'
// import { USER_INFO } from '../../../constant' // uni.getStorageSync(USER_INFO)

// export const ON_EDIT = 'ON_EDIT'
// export const ON_CONFIRM = 'ON_CONFIRM'

export default {
	namespaced: true,
	state: () => ({
		customerServiceInfo: [ { letter: '我的客服', data: [] } ],
		chatListData: [],
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
			const res = await queryChatList({
				userType: 'APP',
				userId: getUserId(),
				page: 1,
				limit: 9999
			})
			uni.hideLoading()
			commit(CHANGE_CHAT_LIST, res.data.items)
			if (data) {
				if (res.data.total !== 0) {
					uni.showModal({
						title: '提示',
						content: '已经与客服取得联系，是否继续与该客服进行沟通？',
						success(res) {
							if (res.confirm) {
								uni.redirectTo({
									url: '/user/chat/chat'
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
		joinCustomerServiceChat({ commit, rootState, state }, { ref, wsHandle }) {
			commit('CHANGE_WS_INFO', wsHandle)
			wsHandle.onopen = ref.onOpen
			wsHandle.onmessage = ref.onMessage
			wsHandle.onclose = ref.onError
			wsHandle.onerror = ref.onError
		},

		// 查消息
		async queryChatMessage({ dispatch, rootState }, data) {
			try {
				uni.showLoading()
				// const res1 = await queryChatMessage(data)
				// const res = { data: { items: [ {
				// 	chatId: 1,
				// 	sendUserId: 10,
				// 	message: '{"event":"","message":{"id":1677241842000,"status":"succeed","type":"text","sendTime":1677241842000,"content":"酒伴我","toContactId":"1","fromUser":{"id":632,"displayName":"13888888888","avatar":"https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/cefvyfkp64k4d19ofb3m.png"},"isGroup":true}}',
				// 	addTime: '2023-02-19 16:11:26'
				// } ] } }
				const res = []
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
