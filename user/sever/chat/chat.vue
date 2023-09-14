<template>
	<view class="chat-container">
		<view class="back" @click="handleBack">
			<tui-icon name="arrowleft"></tui-icon>
		</view>

		<view v-if="chatListData.length" class="message-list">
			<view
				v-for="item in chatListData" :key="item.chatId" class="item"
				@click="go(`/user/sever/chat/chat-detail?chat=${item.toUserId}&name=${item.toUsername}&avatar=${item.toAvatarImage}`)"
			>
				<image class="avatar" :src="item.toAvatarImage" mode="" />
				<view class="chat-wrapper">
					<view class="name-time">
						<text class="name">{{ item.toUsername }}</text>
						<text class="time">
							{{ new Date(item.sendTime).toLocaleString() }}
						</text>
					</view>
					<view class="last-message">
						{{ item.contentText }}
					</view>
				</view>
			</view>
		</view>
		<view v-else class="no-data">暂无消息~</view>
	</view>
</template>

<script>
import {
	mapGetters
} from 'vuex'
export default {
	name: 'Chat',
	data() {
		return {
		}
	},
	computed: {
		...mapGetters([ 'chatListData' ])
	},
	onShow() {
		this.$store.getters.wsHandle.onMessage(this.onMessage)
		this.$store.dispatch('customerService/joinCustomerServiceChat', {
			ref: this,
			wsHandle: ''
		})
		// console.log('顺序2', '快的话可能顺序1.5会出现ws已连接调用onopen的情况', this.$root)
		this.$store.dispatch('customerService/getChatList')
	},
	beforeDestroy() {
		// console.log('chat销毁', this.$root, this.$parent.$root)
		this.$store.dispatch('customerService/joinCustomerServiceChat', {
			ref: this.$parent.$root,
			wsHandle: ''
		})
		// this.$store.getters.wsHandle.onOpen(() => {})
		// this.$store.getters.wsHandle.onMessage(() => {})
		// this.$store.getters.wsHandle.onClose(() => {})
		// this.$store.getters.wsHandle.onError(() => {})
	},
	methods: {
		handleBack() {
			uni.navigateBack()
		},

		onMessage(evt) {
			// console.log('onMessage收到消息', evt)
			const data = JSON.parse(evt.data)
			// console.log(data)
			// {
			// 	"data": {
			// 			"fromUserName": "dmag9",
			// 			"toAvatarImage": "/profile/upload/2021/10/28/088d4925-7411-4447-90d8-3239eaee68f2.gif",
			// 			"msgType": "text",
			// 			"fromUserId": 277,
			// 			"toUsername": "elzy3",
			// 			"contentText": "第三方代发",
			// 			"fromAvatarImage": "/profile/upload/2021/10/28/088d4925-7411-4447-90d8-3239eaee68f2.gif",
			// 			"exp": "",
			// 			"toUserId": "439",
			// 			"sendTime": 1688009361581
			// 	},
			// 	"fromUserId": "277",
			// 	"message": "发送消息",
			// 	"status": 13140,
			// 	"sendTime": 1688628204456
			// }
			if (data.status == 10400) {
				uni.showToast({
					title: '网络不给力，请检查网络连接',
					icon: 'none'
				}) // 弹出提示框
			} else if (data.status == 13140) {
				this.$store.dispatch('customerService/getChatList')
			}
		}

	}
}
</script>

<style lang="less" scoped>
	.chat-container {
		.back {
			padding: 20upx 0;
			padding-left: 16upx;
			border-bottom: 1upx solid #e5e5e5;
		}

		.message-list {
			padding: 32upx;
			box-sizing: border-box;

			.item {
				display: flex;
				align-items: center;
				justify-content: flex-start;
				margin-bottom: 32upx;

				.avatar {
					width: 104upx;
					height: 104upx;
					border-radius: 50%;
					flex-shrink: 0;
					margin-right: 16upx;
				}

				.chat-wrapper {
					border-bottom: 1upx solid #f1f1f0;
					padding-bottom: 20upx;
				}

				.name-time {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.name {
						color: #3a3629;
						font-size: 32upx;
						font-weight: 500;
					}

					.time {
						color: #b3b2ad;
						font-size: 28upx;
					}
				}

				.last-message {
					width: 566upx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					color: #8f8d85;
					font-size: 28upx;
					line-height: 42upx;
					margin-top: 8upx;
				}
			}
		}
	}

	.no-data {
		color: #8f8d85;
		height: 300upx;
		text-align: center;
		line-height: 300upx;
		font-size: 28upx;
		letter-spacing: 6px;
	}
</style>
