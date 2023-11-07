import { queryCustomer, createChat, queryChatList, queryChatMessage, queryChatMessageBack, addChatMessage } from '../../api/customerService'
import { CHANGE_CUSTOMER_SERVICE_INFO, CHANGE_WS_INFO, CHANGE_WSINFO_INFO, CHANGE_CHAT_LIST, CHANGE_ON_FN } from './type'
import { getUserId } from '../../utils'

export default {
	namespaced: true,
	state: () => ({
		customerServiceInfo: [ { letter: '我的客服', data: [] } ],
		chatListData: [],
		wsHandleInfo: '',
		wsHandle: '',
		onOpen: '',
		onMessage: '',
		onClose: '',
		onError: ''
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
		},

		[CHANGE_ON_FN](state, ref) {
			ref.onOpen && (state.onOpen = ref.onOpen)
			ref.onMessage && (state.onMessage = ref.onMessage)
			ref.onClose && (state.onClose = ref.onClose)
			ref.onError && (state.onError = ref.onError)
		}
	},

	actions: {
		// 获取聊天列表数据. data为true:目前代表是从我的客服页面进来调用的
		async getChatList({ dispatch, commit, rootState }, data) {
			uni.showLoading({
				title: '加载中'
			})
			const result = await queryChatList({
				userId: getUserId()
			})
			uni.hideLoading()
			commit(CHANGE_CHAT_LIST, result.data || [])
			// if (data) {
			// 	if (rootState.customerService.chatListData.length !== 0) {
			// 		uni.showModal({
			// 			title: '提示',
			// 			content: '已经与客服取得联系，是否继续与客服进行沟通？',
			// 			success(res) {
			// 				if (res.confirm) {
			// 					uni.redirectTo({
			// 						url: `/user/sever/chat/chat-detail?chat=${rootState.customerService.chatListData[0].toUserId}&name=${rootState.customerService.chatListData[0].toUsername}&avatar=${rootState.customerService.chatListData[0].toAvatarImage}`
			// 					})
			// 				} else {
			// 					dispatch('getCustomerServiceList')
			// 				}
			// 			}
			// 		})
			// 	} else {
			// 		dispatch('getCustomerServiceList')
			// 	}
			// }
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
					friendId: item.userId,
					displayName: item.name,
					avatar: item.url
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
				// const res = await createChat(Object.assign(data, {
				// 	chatId: '',
				// 	userType: 'APP',
				// 	userId: getUserId()
				// }))
				// uni.redirectTo({ url: `/user/sever/chat/chat-detail?chat=${res.data.chatId}&name=${res.data.name}` }) // 进入聊天室（创建ws）
				uni.redirectTo({
					url: `/user/sever/chat/chat-detail?chat=${data.friendId}&name=${data.chatName}&avatar=${data.avatar}`
				})
			} catch (error) {
				uni.showToast({
					title: '联系客服失败',
					icon: 'none'
				})
			} finally {
				uni.hideLoading()
			}
		},

		// （全局触发，且针对）聊天列表页面，创建聊天，存储wsHandle。考虑在不同页面断线重连。
		joinCustomerServiceChat({ commit, rootState, state }, { ref, wsHandle, wsHandleInfo }) {
			if (ref) commit(CHANGE_ON_FN, ref)
			if (wsHandle) {
				commit('CHANGE_WS_INFO', wsHandle)
				rootState.customerService.onOpen && wsHandle.onOpen(rootState.customerService.onOpen)
				rootState.customerService.onMessage && wsHandle.onMessage(rootState.customerService.onMessage)
				rootState.customerService.onClose && wsHandle.onClose(rootState.customerService.onClose)
				rootState.customerService.onError && wsHandle.onError(rootState.customerService.onError)
				// console.log('顺序1')
			} else {
				rootState.customerService.onOpen && rootState.customerService.wsHandle.onOpen(rootState.customerService.onOpen)
				rootState.customerService.onMessage && rootState.customerService.wsHandle.onMessage(rootState.customerService.onMessage)
				rootState.customerService.onClose && rootState.customerService.wsHandle.onClose(rootState.customerService.onClose)
				rootState.customerService.onError && rootState.customerService.wsHandle.onError(rootState.customerService.onError)
			}

			// if (wsHandleInfo) {
			// 	commit('CHANGE_WSINFO_INFO', wsHandleInfo)
			// 	ref.onOpenInfo && wsHandleInfo.onOpen(ref.onOpenInfo)
			// 	ref.onMessageInfo && wsHandleInfo.onMessage(ref.onMessageInfo)
			// 	ref.onCloseInfo && wsHandleInfo.onClose(ref.onCloseInfo)
			// 	ref.onErrorInfo && wsHandleInfo.onError(ref.onErrorInfo)
			// }
		},

		// 查消息
		async queryChatMessage({ dispatch, rootState }, data) {
			try {
				uni.showLoading()
				const res = await queryChatMessage(data)
				return res.data || []
			} catch (error) {
				uni.showToast({
					title: '获取历史消息失败',
					icon: 'none'
				})
				return Promise.reject()
			} finally {
				uni.hideLoading()
			}
		},

		// 发消息对象存储
		async addChatMessage({ dispatch, rootState }, data) {
			try {
				const res = await addChatMessage(data)
			} catch (error) {
				uni.showToast({
					title: '发送消息失败',
					icon: 'none'
				})
				return Promise.reject()
			} finally {
			}
		}

		// // 查消息（往后查）
		// async queryChatMessageBack({ dispatch, rootState }, data) {
		// 	try {
		// 		uni.showLoading()
		// 		const res = await queryChatMessageBack(data)
		// 		return res.data.items || []
		// 	} catch (error) {
		// 		uni.showToast({
		// 			title: '获取历史消息失败',
		// 			icon: 'none'
		// 		})
		// 	} finally {
		// 		uni.hideLoading()
		// 	}
		// }
	}
}
