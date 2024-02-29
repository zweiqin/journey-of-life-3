<template>
	<view class="chat-detail">
		<!-- <view class="header-container" :class="{ fixed: scrollTop > 100 }"> -->
		<view class="header-container">
			<view class="kefu-conatiner">
				<image class="back-icon" src="../../../static/images/store/chevron-states.png" mode="" @click="handleBack" />
				<!-- <image class="avatar" src="/static/logo.png" mode="" /> -->
				<image class="avatar" :src="common.seamingImgUrl(avatar)" mode="" />
				<text class="kefu-name">{{ name }}</text>
			</view>
		</view>

		<scroll-view
			refresher-enabled refresher-background="#3f3d3d" scroll-y="true" class="scroll-Y"
			:refresher-triggered="isRefresherTriggered" scroll-with-animation :scroll-top="scrollTop"
			@scrolltoupper="handleScrolltoupper" @refresherrefresh="handleRefresherrefresh"
		>
			<view id="scroll-view-chat" @click="isShowBubblePopup = false">
				<view v-for="item in groupMessages" :key="item.message.id" class="message-wrapper">
					<view class="message-slot">
						<view v-if="item.message.isGroup === false">
							<view class="time-wrapper">
								<text class="time">
									{{ timestampToTime(item.message.sendTime) }}
								</text>
							</view>
							<view v-if="item.message.type === 'servicePersonnel'">
								<view v-if="item.message.fromUser.id === userInfo.buyerUserId" class="my-wrapper">
									<view class="words">待定</view>
								</view>
								<view v-else class="kefu-wrapper">
									<view class="words">
										<view>{{ item.message.content.content }}</view>
										<view
											v-if="item.message.content.customerServiceList && item.message.content.customerServiceList.length"
										>
											<view style="padding: 20upx;color: #2d73de;text-align: center;border-bottom: 4upx solid #2d73de;">
												客服列表
											</view>
											<view>
												<view
													v-for="(part, count) in item.message.content.customerServiceList" :key="count"
													style="padding: 8upx;color: #4d89ff;" @click="handleClickService(part)"
												>
													{{ `${count + 1}、${part.name}` }}
												</view>
											</view>
										</view>
										<view v-else style="padding-bottom: 45upx;">
											<tui-no-data :fixed="false" style="padding-top: 60upx;">暂无客服~</tui-no-data>
										</view>
									</view>
								</view>
							</view>

							<view v-if="item.message.type === 'serviceQuestion'">
								<view v-if="item.message.fromUser.id === userInfo.buyerUserId" class="my-wrapper">
									<view class="words">{{ item.message.content }}</view>
								</view>
								<view v-else class="kefu-wrapper">
									<view class="words">
										<view>{{ item.message.content.content }}</view>
										<view v-if="item.message.content.questionList && item.message.content.questionList.length">
											<view style="padding: 20upx;color: #2d73de;text-align: center;border-bottom: 4upx solid #2d73de;">
												热门问题
											</view>
											<view>
												<view
													v-for="(part, count) in item.message.content.questionList" :key="count"
													style="padding: 8upx;color: #4d89ff;" @click="handleClickQuestion(part)"
												>
													{{ `${count + 1}、${part.content}` }}
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>

							<view v-if="item.message.type === 'serviceAnswer'">
								<view v-if="item.message.fromUser.id === userInfo.buyerUserId" class="my-wrapper">
									<view class="words">待定</view>
								</view>
								<view v-else class="kefu-wrapper">
									<view class="words">
										<view v-if="item.message.content && item.message.content.length">
											<view v-for="(section, num) in item.message.content" :key="num" style="margin-bottom: 10upx;">
												<view>{{ section.content || '无答案内容' }}</view>
												<view v-if="section.link" style="margin-top: 20upx;">
													<text>关联链接：{{ section.link }}</text>
													<text style="margin-left: 28upx;color: #ef5613;" @click="$copy(section.link)">复制</text>
												</view>
												<view v-if="section.picUrl" style="margin-top: 20upx;text-align: center;">
													<TuanImage
														:width="192" :height="192" radius="10upx"
														:src="common.seamingImgUrl(section.picture)"
													></TuanImage>
												</view>
												<view v-if="section.problemList && section.problemList.length" style="margin-top: 18upx;">
													<view>您可以直接点击以下问题直接咨询</view>
													<view>
														<view
															v-for="(part, count) in section.problemList" :key="count"
															style="display: flex;justify-content: space-between;align-items: center;padding: 4upx;border-top: 2upx solid #f0efef;"
															@click="handleClickQuestion(part)"
														>
															<view>{{ `${count + 1}、${part.content}` }}</view>
															<view>
																<tui-icon name="arrowright" :size="18" color="#cccccc"></tui-icon>
															</view>
														</view>
													</view>
												</view>
											</view>
										</view>
										<view v-else style="padding-bottom: 45upx;">
											<tui-no-data :fixed="false" style="padding-top: 60upx;">无答案内容~</tui-no-data>
										</view>
									</view>
								</view>
							</view>

							<view v-if="item.message.type === 'serviceReply'">
								<view v-if="item.message.fromUser.id === userInfo.buyerUserId" class="my-wrapper">
									<view class="words">待定</view>
								</view>
								<view v-else class="kefu-wrapper">
									<view class="words">
										<view v-if="item.message.content && item.message.content.length">
											<view>您是不是想问（可以点击以下问题咨询）：</view>
											<view style="margin-top: 16upx;">
												<view
													v-for="(part, count) in item.message.content" :key="part.id"
													style="display: flex;justify-content: space-between;align-items: center;padding: 4upx;border-top: 2upx solid #f0efef;"
													@click="handleClickQuestion(part)"
												>
													<view>{{ `${count + 1}、${part.name}` }}</view>
													<view>
														<tui-icon name="arrowright" :size="18" color="#cccccc"></tui-icon>
													</view>
												</view>
											</view>
										</view>
										<view v-else>我还在学习中，可以换个方式和我讲讲吗？</view>
									</view>
								</view>
							</view>

							<view v-if="item.message.type === 'text'">
								<view v-if="item.message.fromUser.id === userInfo.buyerUserId" class="my-wrapper">
									<view class="words">{{ item.message.content }}</view>
								</view>
								<view v-else class="kefu-wrapper">
									<view class="words">{{ item.message.content }}</view>
								</view>
							</view>

							<view v-else-if="item.message.type === 'image'">
								<view v-if="item.message.fromUser.id === userInfo.buyerUserId" class="my-wrapper">
									<view class="image">
										<image
											style="width: 350upx;" class="img" :src="common.seamingImgUrl(item.message.content)"
											mode="widthFix" @click="preview(common.seamingImgUrl(item.message.content))"
										/>
									</view>
								</view>
								<view v-else class="kefu-wrapper">
									<view class="image">
										<image
											style="width: 350upx;" class="img" :src="common.seamingImgUrl(item.message.content)"
											mode="widthFix" @click="preview(common.seamingImgUrl(item.message.content))"
										/>
									</view>
								</view>
							</view>

							<view v-else-if="item.message.type === 'order'">
								<view v-if="item.message.fromUser.id === userInfo.buyerUserId" class="my-wrapper">
									<view class="order">
										<tui-card :title="{ text: '订单' }" :tag="{ text: item.message.content.orderSn }" full border>
											<template #body>
												<view style="padding: 6px 10px;">订单状态：{{ item.message.content.orderStatusText }}</view>
												<view style="padding: 6px 10px;">商品总费用：{{ item.message.content.goodsPrice }}</view>
												<view style="padding: 6px 10px;">实付费用：{{ item.message.content.actualPrice }}</view>
												<view style="padding: 6px 10px;">收货人手机号：{{ item.message.content.mobile }}</view>
											</template>
										</tui-card>
									</view>
								</view>
								<view v-else class="kefu-wrapper">
									<view class="order">
										<tui-card :title="{ text: '订单' }" :tag="{ text: item.message.content.orderSn }" full border>
											<template #body>
												<view style="padding: 6px 10px;">订单状态：{{ item.message.content.orderStatusText }}</view>
												<view style="padding: 6px 10px;">商品总费用：{{ item.message.content.goodsPrice }}</view>
												<view style="padding: 6px 10px;">实付费用：{{ item.message.content.actualPrice }}</view>
												<view style="padding: 6px 10px;">收货人手机号：{{ item.message.content.mobile }}</view>
											</template>
										</tui-card>
									</view>
								</view>
							</view>

							<view v-else-if="item.message.type === 'goods'">
								<view v-if="item.message.fromUser.id === userInfo.buyerUserId" class="my-wrapper">
									<view class="goods">
										<tui-card :title="{ text: '商品' }" :tag="{ text: item.message.content.goodsSn }" full border>
											<template #body>
												<view style="padding: 6px 10px;">商品名称：{{ item.message.content.goodsName }}</view>
											</template>
										</tui-card>
									</view>
								</view>
								<view v-else class="kefu-wrapper">
									<view class="goods">
										<tui-card :title="{ text: '商品' }" :tag="{ text: item.message.content.goodsSn }" full border>
											<template #body>
												<view style="padding: 6px 10px;">商品名称：{{ item.message.content.goodsName }}</view>
											</template>
										</tui-card>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<view class="op-footer">
			<view class="send-wrapper">
				<tui-input
					v-model="words" placeholder="请输入..." type="text" confirm-type="发送"
					padding="0" style="width: 100%;"
					@confirm="handleSendMessage"
				>
					<template #right>
						<tui-button type="warning" width="120rpx" height="50rpx" shape="circle" @click="handleSendMessage">
							发送
						</tui-button>
					</template>
				</tui-input>
			</view>
			<tui-button
				v-if="!Number(chat)" type="warning" width="116rpx" height="46rpx"
				shape="circle" margin="0 8rpx" plain
				@click="handleOpenCustomerService"
			>
				转人工
			</tui-button>
			<view v-if="Number(chat)" style="position: relative;">
				<tui-bubble-popup
					ref="refBubblePopup" :show="isShowBubblePopup" :mask="false" position="absolute"
					direction="bottom" width="180rpx" right="0" top="0rpx"
					translate-y="-110%" triangle-right="18rpx"
					triangle-bottom="-22rpx"
				>
					<view v-if="Number(chat)" style="padding: 16upx 10upx;" @click="handleSendImg">发送图片</view>
					<view v-if="Number(chat)" style="padding: 16upx 10upx;" @click="handlePopup('Order')">发送订单</view>
					<view v-if="Number(chat)" style="padding: 16upx 10upx;" @click="handlePopup('Goods')">发送商品</view>
					<!-- <view
						v-if="!Number(chat)" style="padding: 16upx 10upx;"
						@click="handleOpenCustomerService"
						>
						转人工
						</view> -->
				</tui-bubble-popup>
				<tui-icon
					name="add-fill" :size="54" unit="rpx" color="#e95d20"
					margin="0"
					@click="isShowBubblePopup = !isShowBubblePopup"
				></tui-icon>
			</view>
		</view>
		<tui-bottom-popup :show="isShowOrderPopup" @close="handleClosePopup('Order')">
			<OrderList v-if="isShowOrderPopup" @send="handleSend"></OrderList>
		</tui-bottom-popup>
		<tui-bottom-popup :show="isShowGoodsPopup" @close="handleClosePopup('Goods')">
			<GoodsList v-if="isShowGoodsPopup" @send="handleSend"></GoodsList>
		</tui-bottom-popup>
		<tui-bottom-popup :show="isShowPersonPopup" @close="handleClosePopup('Person')">
			<PersonList v-if="isShowPersonPopup" @send="handleSend"></PersonList>
		</tui-bottom-popup>
		<tui-toast ref="toast"></tui-toast>

		<tui-bottom-popup :show="isShowCustomerServicePopup" @close="isShowCustomerServicePopup = false">
			<ATFCustomerService shop-id="" :data="customerServiceList"></ATFCustomerService>
		</tui-bottom-popup>
	</view>
</template>

<script>
import OrderList from './components/order-list.vue'
import GoodsList from './components/goods-list.vue'
import PersonList from './components/person-list.vue'
import {
	getStorageUserId,
	timestampToTime
} from '../../../utils'
import {
	T_STORAGE_KEY
} from '../../../constant'
import { ANOTHER_TF_UPLOAD } from '../../../config'
import { getCustomerProblemByIdApi } from '../../../api/anotherTFInterface'

export default {
	name: 'ChatDetail',
	components: { OrderList, GoodsList, PersonList },
	data() {
		return {
			isRefresherTriggered: false,
			words: '',
			chat: '',
			name: '',
			avatar: '',
			userInfo: uni.getStorageSync(T_STORAGE_KEY),
			groupMessages: [],
			scrollTop: '',
			isShowBubblePopup: false,
			isShowOrderPopup: false,
			isShowGoodsPopup: false,

			// 客服助手
			isShowPersonPopup: false,

			// 客服
			isShowCustomerServicePopup: false,
			customerServiceList: []
		}
	},
	async onLoad(options) {
		if (options.chat === 'serviceAssistant') {
			this.chat = options.chat
			this.name = '客服助手'
			this.avatar = require('../../../static/images/icon/kefu.png')
			const res = await this.$store.dispatch('app/getCustomerServiceAction', {
				shopId: ''
			})
			const tempDate = Date.now()
			this.groupMessages = [ {
				event: '',
				message: {
					id: tempDate,
					status: 'succeed',
					type: 'servicePersonnel',
					sendTime: tempDate,
					content: {
						content: '您好，很高兴为您服务，我是智能客服助手。请选择智能客服：',
						customerServiceList: res.data || []
					},
					toContactId: getStorageUserId(),
					fileSize: 0,
					fileName: '',
					fromUser: {
						id: 0,
						displayName: '客服',
						avatar: '/static/logo.png'
					},
					isGroup: false
				}
			} ]
			this.scrollToBottom()
		} else {
			this.initWSChat({ chat: options.chat, name: options.name, avatar: options.avatar })
		}
	},
	beforeDestroy() {
		this.$store.dispatch('customerService/joinCustomerServiceChat', {
			ref: this.$parent.$root,
			wsHandle: ''
		})
		// this.$store.getters.wsHandle.close()
		// this.$store.getters.wsHandleInfo.close()
	},
	methods: {
		timestampToTime,
		initWSChat(options) {
			this.chat = options.chat
			this.name = options.name
			this.avatar = options.avatar
			this.$store.dispatch('customerService/queryChatMessage', {
				foUserId: getStorageUserId(),
				toUserId: this.chat
			}).then((res) => {
				console.log(res)
				const tempDate = Date.now()
				this.groupMessages = res.map((item) => ({
					event: '',
					message: {
						id: item.sendTime,
						status: 'succeed',
						type: item.msgType,
						sendTime: item.sendTime,
						content: item.contentText,
						toContactId: item.toUserId,
						fileSize: 0,
						fileName: '',
						fromUser: {
							id: item.fromUserId,
							displayName: item.fromUserName,
							avatar: item.fromAvatarImage
						},
						isGroup: false
					}
				})).concat(this.groupMessages)
					.concat([ {
						event: '',
						message: {
							id: tempDate,
							status: 'succeed',
							type: 'text',
							sendTime: tempDate,
							content: '您好，请问有什么能够帮到您？',
							toContactId: getStorageUserId(),
							fileSize: 0,
							fileName: '',
							fromUser: {
								id: this.chat,
								displayName: '客服',
								avatar: '/static/logo.png'
							},
							isGroup: false
						}
					} ])
				this.scrollToBottom()
				this.$store.dispatch('customerService/joinCustomerServiceChat', {
					ref: this,
					wsHandle: ''
				})
			})
		},
		// onOpenInfo() {
		// 	console.log('onOpenInfo连接成功')
		// },
		onMessage(evt) {
			const data = JSON.parse(evt.data)
			console.log(data)
			if (data.status == 10400) {
				uni.showToast({
					title: '网络不给力，请检查网络连接',
					icon: 'none'
				}) // 弹出提示框
			} else if (data.status == 13140) {
				// if (data.message.fromUser.id === this.userInfo.buyerUserId) return
				const tempData = {
					event: '',
					message: {
						id: data.data.sendTime,
						status: 'succeed',
						type: data.data.msgType,
						sendTime: data.data.sendTime,
						content: data.data.contentText,
						toContactId: Number(data.data.toUserId),
						fileSize: 0,
						fileName: '',
						fromUser: {
							id: Number(data.data.fromUserId),
							displayName: data.data.fromUserName,
							avatar: data.data.fromAvatarImage
						},
						isGroup: false
					}
				}
				this.groupMessages.push(tempData)
				console.log(data)
				this.scrollToBottom()
			}
		},
		// onErrorInfo(errMsg) {
		// 	console.log('onErrorInfo出错了')
		// 	// uni.showLoading({
		// 	// 	title: '断线了，正在重新连接......',
		// 	// 	mask: true
		// 	// })
		// 	uni.showToast({
		// 		title: 'ErrorInfo出错了' + errMsg,
		// 		icon: 'none',
		// 		duration: 2000
		// 	})
		// },
		// onCloseInfo() {
		// 	console.log('onCloseInfo关闭了')
		// 	setTimeout(() => {
		// 		this.$store.dispatch('customerService/xxx', {
		// 			ref: this,
		// 			wsHandleInfo: uni.connectSocket({
		// 				url: `${BASE_WS_API}/APP/${getStorageUserId()}`,
		// 				complete: () => { }
		// 			})
		// 		})
		// 	}, 2000)
		// },

		onOpen() {
			console.log('onOpen连接成功')
		},

		handleClickService(item) {
			uni.showLoading()
			getCustomerProblemByIdApi({ kfId: item.kfId })
				.then((res) => {
					uni.hideLoading()
					const tempDate = Date.now()
					this.groupMessages = this.groupMessages.concat([ {
						event: '',
						message: {
							id: tempDate,
							status: 'succeed',
							type: 'serviceQuestion',
							sendTime: tempDate,
							content: {
								content: '您可以通过下方问题列表、输入框旁的按钮、以及在输入框内输入关键词快速获得帮助。',
								questionList: res.data || []
							},
							toContactId: getStorageUserId(),
							fileSize: 0,
							fileName: '',
							fromUser: {
								id: 0,
								displayName: '客服',
								avatar: '/static/logo.png'
							},
							isGroup: false
						}
					} ])
					this.scrollToBottom()
				})
				.catch((e) => {
					uni.hideLoading()
				})
		},

		handleClickQuestion(obj) {
			const tempDate = Date.now()
			this.groupMessages = this.groupMessages.concat([{
				event: '',
				message: {
					id: tempDate,
					status: 'succeed',
					type: 'serviceQuestion',
					sendTime: tempDate,
					content: `【问题】${obj.content}`,
					toContactId: 0,
					fileSize: 0,
					fileName: '',
					fromUser: {
						id: this.userInfo.buyerUserId,
						displayName: this.userInfo.name,
						avatar: this.userInfo.headImage
					},
					isGroup: false
				}
			}, {
				event: '',
				message: {
					id: tempDate,
					status: 'succeed',
					type: 'serviceAnswer',
					sendTime: tempDate + 1,
					content: obj.problemList,
					toContactId: getStorageUserId(),
					fileSize: 0,
					fileName: '',
					fromUser: {
						id: 0,
						displayName: '客服',
						avatar: '/static/logo.png'
					},
					isGroup: false
				}
			}])
			this.scrollToBottom()
		},

		send(sendMsg) {
			if (typeof sendMsg === 'string') {
				// send(sendMsg)
			} else if (typeof sendMsg === 'object') {
				this.$store.getters.wsHandle.send({
					data: JSON.stringify(sendMsg),
					success: () => {
						const tempData = {
							event: '',
							message: {
								id: sendMsg.data.sendTime,
								status: 'succeed',
								type: sendMsg.data.msgType,
								sendTime: sendMsg.data.sendTime,
								content: sendMsg.data.contentText,
								toContactId: sendMsg.data.toUserId,
								fileSize: 0,
								fileName: '',
								fromUser: {
									id: sendMsg.data.fromUserId,
									displayName: sendMsg.data.fromUserName,
									avatar: sendMsg.data.fromAvatarImage
								},
								isGroup: false
							}
						}
						this.groupMessages.push(tempData)
						this.scrollToBottom()
					}
				})
			}
		},

		// 点击发送消息
		handleSendMessage() {
			if (!this.words) {
				return uni.showToast({
					title: '请输入消息',
					icon: 'none',
					duration: 2000
				})
			}
			const tempDateAssistant = Date.now()
			if (this.chat === 'serviceAssistant') {
				this.groupMessages = this.groupMessages.concat([ {
					event: '',
					message: {
						id: tempDateAssistant,
						status: 'succeed',
						type: 'serviceQuestion',
						sendTime: tempDateAssistant,
						content: this.words,
						toContactId: 0,
						fileSize: 0,
						fileName: '',
						fromUser: {
							id: this.userInfo.buyerUserId,
							displayName: this.userInfo.name,
							avatar: this.userInfo.headImage
						},
						isGroup: false
					}
				} ])
				uni.showLoading({
					title: '请稍等~'
				})
				uni.hideLoading()
				const tempDateReply = Date.now() + 1
				this.groupMessages = this.groupMessages.concat([ {
					event: '',
					message: {
						id: tempDateReply,
						status: 'succeed',
						type: 'serviceReply',
						sendTime: tempDateReply + 1,
						content: [],
						toContactId: getStorageUserId(),
						fileSize: 0,
						fileName: '',
						fromUser: {
							id: 0,
							displayName: '客服',
							avatar: '/static/logo.png'
						},
						isGroup: false
					}
				} ])
				this.scrollToBottom()
				this.words = ''
			} else {
				// this.send({
				// 	event: '',
				// 	message: {
				// 		id: tempDate,
				// 		status: 'succeed',
				// 		type: 'text',
				// 		sendTime: tempDate,
				// 		content: this.words,
				// 		toContactId: this.chat,
				// 		fileSize: 0,
				// 		fileName: '',
				// 		fromUser: {
				// 			id: this.userInfo.buyerUserId,
				// 			displayName: this.userInfo.name,
				// 			avatar: this.userInfo.headImage
				// 		},
				// 		isGroup: true
				// 	}
				// })
				this.$store.dispatch('customerService/addChatMessage', {
					userId: this.userInfo.buyerUserId,
					messageDetails: {
						contentText: this.words,
						fromAvatarImage: this.userInfo.headImage,
						fromUserName: this.userInfo.name,
						fromUserId: this.userInfo.buyerUserId,
						sendTime: tempDateAssistant,
						toUserId: this.chat,
						toUsername: '',
						toAvatarImage: '',
						msgType: 'text',
						exp: ''
					}
				}).then((res) => {
					this.send({
						status: 13140,
						message: '发送消息',
						data: {
							contentText: this.words,
							fromAvatarImage: this.userInfo.headImage,
							fromUserName: this.userInfo.name,
							fromUserId: this.userInfo.buyerUserId,
							sendTime: tempDateAssistant,
							toUserId: this.chat,
							toUsername: '',
							toAvatarImage: '',
							msgType: 'text',
							exp: ''
						}
					})
					this.words = ''
				})
			}
		},

		// 点击选择图片
		handleSendImg() {
			uni.chooseImage({
				count: 1,
				success: (chooseImageRes) => {
					uni.showLoading({
						title: '图片上传中...'
					})
					uni.uploadFile({
						url: ANOTHER_TF_UPLOAD, // 仅为示例，非真实的接口地址
						filePath: chooseImageRes.tempFilePaths[0].path,
						name: 'file',
						success: (uploadFileRes) => {
							console.log(uploadFileRes, uploadFileRes.data)
							const messageUrl = JSON.parse(uploadFileRes.data).data.url
							const tempDate = Date.now()
							// this.send({
							// 	event: '',
							// 	message: {
							// 		id: tempDate,
							// 		status: 'succeed',
							// 		type: 'image',
							// 		sendTime: tempDate,
							// 		content: messageUrl,
							// 		toContactId: this.chat,
							// 		fileSize: 0,
							// 		fileName: '',
							// 		fromUser: {
							// 			id: this.userInfo.buyerUserId,
							// 			displayName: this.userInfo.name,
							// 			avatar: this.userInfo.headImage
							// 		},
							// 		isGroup: true
							// 	}
							// })
							this.$store.dispatch('customerService/addChatMessage', {
								userId: this.userInfo.buyerUserId,
								messageDetails: {
									contentText: messageUrl,
									fromAvatarImage: this.userInfo.headImage,
									fromUserName: this.userInfo.name,
									fromUserId: this.userInfo.buyerUserId,
									sendTime: tempDate,
									toUserId: this.chat,
									toUsername: '',
									toAvatarImage: '',
									msgType: 'image',
									exp: ''
								}
							}).then((res) => {
								this.send({
									status: 13140,
									message: '发送消息',
									data: {
										contentText: messageUrl,
										fromAvatarImage: this.userInfo.headImage,
										fromUserName: this.userInfo.name,
										fromUserId: this.userInfo.buyerUserId,
										sendTime: tempDate,
										toUserId: this.chat,
										toUsername: '',
										toAvatarImage: '',
										msgType: 'image',
										exp: ''
									}
								})
								uni.showToast({
									title: '图片上传成功'
								})
								uni.hideLoading()
							})
						},
						fail: () => {
							uni.hideLoading()
							this.ttoast('图片上传失败')
						},
						complete: () => {
							uni.hideLoading()
						}
					})
				}
			})
		},
		handlePopup(meaning) {
			this.isShowBubblePopup = false
			if (meaning === 'Order') {
				this.isShowOrderPopup = true
			} else if (meaning === 'Goods') {
				this.isShowGoodsPopup = true
			} else if (meaning === 'Person') {
				this.isShowPersonPopup = true
			}
		},
		handleClosePopup(meaning) {
			if (meaning === 'Order') {
				this.isShowOrderPopup = false
			} else if (meaning === 'Goods') {
				this.isShowGoodsPopup = false
			} else if (meaning === 'Person') {
				this.isShowPersonPopup = false
			}
		},
		handleSend(obj) {
			this.isShowGoodsPopup = false
			this.isShowOrderPopup = false
			this.isShowPersonPopup = false
			if (obj.meaning === 'person') {
				this.initWSChat({ chat: obj.msg.friendId, name: obj.msg.displayName, avatar: obj.msg.avatar })
			} else {
				const tempDate = Date.now()
				this.$store.dispatch('customerService/addChatMessage', {
					userId: this.userInfo.buyerUserId,
					messageDetails: {
						contentText: obj.msg,
						fromAvatarImage: this.userInfo.headImage,
						fromUserName: this.userInfo.name,
						fromUserId: this.userInfo.buyerUserId,
						sendTime: tempDate,
						toUserId: this.chat,
						toUsername: '',
						toAvatarImage: '',
						msgType: obj.meaning,
						exp: ''
					}
				}).then((res) => {
					// this.send({
					// 	event: '',
					// 	message: {
					// 		id: tempDate,
					// 		status: 'succeed',
					// 		type: obj.meaning,
					// 		sendTime: tempDate,
					// 		content: obj.msg,
					// 		toContactId: this.chat,
					// 		fileSize: 0,
					// 		fileName: '',
					// 		fromUser: {
					// 			id: this.userInfo.buyerUserId,
					// 			displayName: this.userInfo.name,
					// 			avatar: this.userInfo.headImage
					// 		},
					// 		isGroup: true
					// 	}
					// })
					this.send({
						status: 13140,
						message: '发送消息',
						data: {
							contentText: obj.msg,
							fromAvatarImage: this.userInfo.headImage,
							fromUserName: this.userInfo.name,
							fromUserId: this.userInfo.buyerUserId,
							sendTime: tempDate,
							toUserId: this.chat,
							toUsername: '',
							toAvatarImage: '',
							msgType: obj.meaning,
							exp: ''
						}
					})
					uni.showToast({
						title: '发送成功'
					})
					uni.hideLoading()
				})
			}
		},

		// 回退
		handleBack() {
			uni.navigateBack()
		},

		handleScrolltoupper(e) {
			console.log(e, 1)
		},

		handleRefresherrefresh(e) {
			// this.isRefresherTriggered = true
			// // console.log(e, timestampToTime(this.groupMessages[0].message.sendTime))
			// this.$store.dispatch('customerService/queryChatMessageBack', {
			// 	chatId: this.chat,
			// 	limit: 10,
			// 	endTime: timestampToTime(this.groupMessages[0].message.sendTime)
			// 	// order: 'desc'
			// }).then((res) => {
			// 	// console.log(res)
			// 	if (res.length === 0) uni.showToast({ title: '没有更多消息了', icon: 'none' })
			// 	this.groupMessages = res.map((item) => JSON.parse(item.message)).concat(this.groupMessages)
			// 	this.isRefresherTriggered = false
			// })
		},
		// onPageScroll(e) {
		// 	console.log(e, 1)
		// },

		scrollToBottom() {
			this.$nextTick(() => {
				uni.createSelectorQuery().in(this)
					.select('#scroll-view-chat')
					.boundingClientRect((res) => {
						const top = res.height
						if (top > 0) {
							this.scrollTop = top
						}
					})
					.exec()
			})
		},

		// 预览图
		preview(index) {
			// console.log(index)
			const imgsArray = []
			imgsArray[0] = index
			uni.previewImage({
				urls: imgsArray,
				current: 0
			})
		},

		// 打开客服
		async handleOpenCustomerService() {
			const res = await this.$store.dispatch('app/getCustomerServiceAction', {
				shopId: ''
			})
			this.customerServiceList = res.data
			if (!this.customerServiceList.length) this.$showToast('暂无客服')
			else this.isShowCustomerServicePopup = true
		}
	}
}
</script>

<style lang="less" scoped>
.chat-detail {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100vh;
	background-color: #f6f6f5;

	.scroll-Y {
		flex: 1;
		height: 0;
		padding-bottom: 144upx;
	}

	.header-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 120upx;
		background-color: #fff;
		border-radius: 0 0 48upx 48upx;
		padding: 32upx;
		box-sizing: border-box;

		// &.fixed {
		// 	position: fixed;
		// 	top: 0;
		// 	left: 0;
		// 	right: 0;
		// }

		.kefu-conatiner {
			display: flex;
			align-items: center;
			justify-content: flex-start;

			.back-icon {
				width: 24upx;
				height: 48upx;
			}

			.avatar {
				width: 60upx;
				height: 60upx;
				border-radius: 50%;
				margin: 0 16upx 0 32upx;
			}

			.kefu-name {
				color: #3a3629;
				font-size: 28upx;
			}
		}
	}

	.message-wrapper {
		padding: 32upx;
		box-sizing: border-box;
	}

	.message-slot {
		overflow: hidden;

		.time-wrapper {
			text-align: center;
			margin: 20upx 0;

			.time {
				margin: 0 auto;
				display: inline-block;
				padding: 7upx 24upx;
				line-height: 42upx;
				background-color: #fff;
				border-radius: 100px;
				color: #8f8d85;
			}
		}

		.words {
			// max-width: 750upx;
			padding: 24upx;
			box-sizing: border-box;
			font-size: 28upx;
			line-height: 42upx;
			word-break: break-all;
			background: #fff;
			clear: both;
		}

		.kefu-wrapper {
			.words {
				margin-right: 48upx;
				float: left;
				border-radius: 0px 24px 24px 24px;
			}

			.image {
				float: left;
				border-radius: 0px 24px 24px 24px;
			}

			.goods {
				float: left;
				border-radius: 0px 24px 24px 24px;
			}

			.order {
				float: left;
				border-radius: 0px 24px 24px 24px;
			}
		}

		.my-wrapper {
			margin-left: 48upx;

			.words {
				float: right;
				background-color: #fff1ca;
				border-radius: 24px 0 24px 24px;
			}

			.image {
				float: right;
				background-color: #fff1ca;
				border-radius: 24px 0 24px 24px;
			}

			.order {
				float: right;
				background-color: #fff1ca;
				border-radius: 24px 0 24px 24px;
			}

			.goods {
				float: right;
				background-color: #fff1ca;
				border-radius: 24px 0 24px 24px;
			}
		}
	}

	.op-footer {
		position: fixed;
		bottom: 0;
		padding: 32upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;

		.send-wrapper {
			flex: 1;
			background-color: #fff;
			border-radius: 100upx;
			height: 80upx;
			display: flex;
			align-items: center;
			padding: 10upx 30upx;
			box-sizing: border-box;

		}
	}

	/deep/ .tui-popup-class.tui-bottom-popup {
		height: 85vh !important;
	}
}
</style>
