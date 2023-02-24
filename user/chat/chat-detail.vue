<template>
	<view class="chat-detail">
		<!-- <view class="header-container" :class="{ fixed: scrollTop > 100 }"> -->
		<view class="header-container">
			<view class="kefu-conatiner">
				<image class="back-icon" src="../../static/images/user/back.png" mode="" @click="handleBack" />
				<image class="avatar" src="/static/logo.png" mode="" />
				<text class="kefu-name">{{ name }}</text>
			</view>
			<!-- <view class="tip">回复中...</view> -->
		</view>

		<scroll-view
			refresher-enabled refresher-background="#3f3d3d" scroll-y="true" class="scroll-Y"
			:refresher-triggered="isRefresherTriggered"
			@scrolltoupper="handleScrolltoupper" @refresherrefresh="handleRefresherrefresh"
		>
			<view v-for="item in groupMessages" :key="item.message.id" class="message-wrapper">
				<view v-if="item.event === '1'" class="message-slot">
					<view class="time-wrapper"> <text class="time">10:26</text> </view>
					<view class="kefu-wrapper">
						<view class="words">您好！有什么可以帮到您的吗？</view>
					</view>
					<view class="my-wrapper">
						<view class="words">没有，再见</view>
					</view>
				</view>
				<view v-else class="message-slot">
					<view v-if="item.message.isGroup === true">
						<view v-if="item.message.type === 'text'">
							<view class="time-wrapper">
								<text
									class="time"
								>
									{{ timestampToTime(item.message.sendTime) }}
								</text>
							</view>
							<view v-if="item.message.fromUser.id === userInfo.userId" class="my-wrapper">
								<view class="words">{{ item.message.content }}</view>
							</view>
							<view v-else class="kefu-wrapper">
								<view class="words">{{ item.message.content }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<view class="op-footer">
			<view class="send-wrapper">
				<input
					v-model="words" type="text" placeholder="请输入..." confirm-type="send"
					@confirm="handleSendMessage"
				/>
			</view>

			<!-- <image
				class="upload-img"
				src="../../static/images/user/up-img.png"
				mode=""
				@click="handleSendImg"
				/> -->
		</view>
	</view>
</template>

<script>
import {
	BASE_WS_API
} from '../../config'
import {
	getUserId,
	timestampToTime
} from '../../utils'
import {
	USER_INFO
} from '../../constant'

export default {
	data() {
		return {
			isRefresherTriggered: false,
			words: '',
			chat: '',
			name: '',
			userInfo: uni.getStorageSync(USER_INFO),
			groupMessages: []
		}
	},
	onLoad(options) {
		this.chat = options.chat
		this.name = options.name
		if (this.chat) {
			this.$store.dispatch('customerService/joinCustomerServiceChat', {
				ref: this,
				wsHandle: new WebSocket(`${BASE_WS_API}/APP/${getUserId()}?chat=${this.chat}`)
			})
		}
		// console.log(this.chat, `${BASE_WS_API}/APP/${getUserId()}?chat=${this.chat}`)
	},
	methods: {
		timestampToTime,
		onOpen() {
			const _this = this
			console.log('连接成功')
			this.$store.dispatch('customerService/queryChatMessage', {
				chatId: this.chat,
				limit: 15,
				endTime: ''
			}).then((res) => {
				this.groupMessages = res.map((item) => JSON.parse(item.message)).concat(this.groupMessages)
			})
			// if (_this.action.method === 'createGame') {
			// 	_this.send(_this.action)
			// }
		},

		onMessage(evt) {
			const _this = this
			const dataAll = JSON.parse(evt.data)
			const data = JSON.parse(dataAll.message)
			this.groupMessages.push(data)
			console.log(data)
			if (data.message.fromUser.id === this.userInfo.userId) return
		},

		onError() {
			console.log('出错了')
			const _this = this
			uni.showLoading({
				title: '断线了，正在重新连接......',
				mask: true
			})
			_this.isReconnect = true
			if (_this.action.method === 'createGame') {
				// console.log('发送')
				_this.action.method = 'rejoinGame'
				_this.init(_this.action)
			}
			if (_this.action.method === 'joinGame') {
				_this.init(_this.action)
			}
			if (_this.action.method === 'rejoinGame') {
				_this.init(_this.action)
			}
		},
		onClose() {
			console.log('关闭了')
		},

		send(sendMsg) {
			if (typeof sendMsg === 'string') {
				this.wsHandle.send(sendMsg)
			} else if (typeof sendMsg === 'object') {
				const messages = JSON.stringify(sendMsg)
				this.$store.getters.wsHandle.send(messages)
				if (messages.event === 'close') {
					// 关闭websocket连接
					this.wsHandle.close()
				}
			}
		},

		// 点击发送消息
		handleSendMessage() {
			// console.log(this, this.words)
			if (!this.words) {
				return uni.showToast({
					title: '请输入消息',
					icon: 'none',
					duration: 2000
				})
			}
			this.send({
				event: '',
				message: {
					id: Date.parse(new Date()),
					status: 'succeed',
					type: 'text',
					sendTime: Date.parse(new Date()),
					content: this.words,
					toContactId: this.chat,
					fromUser: {
						id: this.userInfo.userId,
						displayName: this.userInfo.nickName,
						avatar: this.userInfo.avatarUrl
					},
					isGroup: true
				}
			})
			this.words = ''
		},

		// 点击选择图片
		handleSendImg() {
			//  uni.chooseImage({
			//   success: (chooseImageRes) => {
			//     const tempFilePaths = chooseImageRes.tempFilePaths;
			//     uni.uploadFile({
			//       url: 'https://www.example.com/upload', //仅为示例，非真实的接口地址
			//       filePath: tempFilePaths[0],
			//       name: 'file',
			//       formData: {
			//         'user': 'test'
			//       },
			//       success: (uploadFileRes) => {
			//         console.log(uploadFileRes.data);
			//       }
			//     });
			//   }
			//  });
		},

		// 回退
		handleBack() {
			uni.navigateTo({
				url: '/user/chat/chat'
			})
		},

		handleScrolltoupper(e) {
			console.log(e, 1)
		},

		handleRefresherrefresh(e) {
			this.isRefresherTriggered = true
			console.log(e, 2)
			setTimeout(() => {
				this.isRefresherTriggered = false
			}, 2000)
		}
	}

	// onPageScroll(e) {
	// 	console.log(e, 1)
	// }
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
					width: 80upx;
					height: 80upx;
					border-radius: 50%;
					margin: 0 16upx 0 32upx;
				}

				.kefu-name {
					color: #3a3629;
					font-size: 28upx;
				}
			}

			.tip {
				text-align: center;
				line-height: 56upx;
				width: 140upx;
				height: 56upx;
				border-radius: 100upx;
				background-color: #f3f3f2;
				font-size: 24upx;
				color: #8f8d85;
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
				padding: 24upx;
				box-sizing: border-box;
				font-size: 28upx;
				line-height: 42upx;
				background: #fff;
				clear: both;
			}

			.kefu-wrapper {
				.words {
					float: left;
					border-radius: 0px 24px 24px 24px;
				}
			}

			.my-wrapper {
				.words {
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
				background-color: brown;
				background-color: #fff;
				border-radius: 100upx;
				height: 80upx;
				display: flex;
				align-items: center;
				padding: 20upx 30upx;
				box-sizing: border-box;

				input {
					width: 100%;
				}
			}

			.upload-img {
				width: 64upx;
				height: 64upx;
				border-radius: 50%;
				overflow: hidden;
				margin-left: 32upx;
				flex-shrink: 0;
				background-color: #fff;
			}
		}
	}
</style>
