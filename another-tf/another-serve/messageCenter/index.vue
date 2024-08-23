<template>
	<view class="message-center-container">
		<JHeader title="消息中心" width="50" height="50"></JHeader>
		<view v-if="messageList && messageList.length">
			<view class="flex-items flex-sp-between fs26 topTitBox">
				<view>
					未读消息{{ $store.getters.userInfo.notRead }}条
				</view>
				<view v-if="$store.getters.userInfo.notRead != 0" class="allRead" @click="handleReadAllMessage">
					全部已读
				</view>
			</view>
			<tui-swipe-action
				v-for="(item, index) in messageList" :key="item.noticeId"
				:params="{ index, noticeId: item.noticeId }" :open="item.show" :actions="options" :closable="false"
				class="swipe-list-item" @click="productClick"
			>
				<template #content>
					<view class="messageItem" @click="goToMesDetail(item.noticeId, item.only, item.jump)">
						<view class="messageBox">
							<view class="messageType">
								<view v-if="item.noticeType == 1" class="messageTypeL">
									<view class="iconBox">
										<tui-icon name="notice" :size="50" unit="rpx" color="#ffffff"></tui-icon>
										<view v-if="item.ifRead === 0" class="redBox"></view>
									</view>
									<span>订单消息</span>
								</view>
								<view v-else class="messageTypeL">
									<view class="iconBox">
										<tui-icon name="notice" :size="50" unit="rpx" color="#ffffff"></tui-icon>
									</view>
									<span>系统公告</span>
								</view>
								<view class="messageTypeR">{{ item.createTime }}</view>
							</view>
							<view v-if="item.htmlData">
								<rich-text class="messageInfo" :nodes="item.htmlData"></rich-text>
							</view>
						</view>
					</view>
				</template>
			</tui-swipe-action>
		</view>
		<view style="padding-bottom: 45rpx;">
			<LoadingMore
				:status="!isEmpty && !messageList.length
					? 'loading' : !isEmpty && messageList.length && (messageList.length >= messageTotal) ? 'no-more' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无消息</tui-no-data>
		</view>
	</view>
</template>

<script>
import { getAllNoticeMessageApi, deleteRemoveByIdNoticeApi, updateReadAllNoticeApi, updateReadNoticeApi } from '../../../api/anotherTFInterface'
import parse from 'mini-html-parser2'

export default {
	name: 'MessageCenter',
	data() {
		return {
			options: [ {
				name: '删除',
				color: '#fff',
				fontsize: 32,
				width: 80,
				background: '#F15C48'
			} ],
			isEmpty: false,
			messageList: [],
			messageTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20
			}
		}
	},
	onShow() {
		this.queryInfo.page = 1
		this.getAllMessage()
		this.getUserInfo()
	},
	methods: {
		getUserInfo() {
			this.$store.dispatch('auth/refrshUserInfoAction')
		},
		formatRichText(html) {
			let newContent = html.replace(/<img[^>]*>/gi, function (match, capture) {
				match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '')
				match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '')
				match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '')
				return match
			})
			newContent = newContent.replace(/style="[^"]+"/gi, function (match, capture) {
				match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(
					/width:[^;]+;/gi,
					'max-width:100%;'
				)
				return match
			})
			newContent = newContent.replace(/<br[^>]*\/>/gi, '')
			newContent = newContent.replace(
				/\<img/gi,
				'<img style="max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"'
			)
			return newContent
		},
		getAllMessage(isLoadmore) {
			uni.showLoading()

			getAllNoticeMessageApi(this.queryInfo).then((res) => {
				this.messageTotal = res.data.total
				res.data.list = res.data.list.map((item) => {
					let newContent = item.noticeContent.replace(/<img[^>]*>/gi, function (match, capture) {
						match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '')
						match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '')
						match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '')
						return match
					})
					newContent = newContent.replace(/style="[^"]+"/gi, function (match, capture) {
						match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(
							/width:[^;]+;/gi,
							'max-width:100%;'
						)
						return match
					})
					newContent = newContent.replace(/<br[^>]*\/>/gi, '')
					newContent = newContent.replace(
						/\<img/gi,
						'<img style="max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"'
					)
					parse(newContent, (err, htmlData) => {
						item.htmlData = htmlData
					})
					return item
				})
				if (isLoadmore) {
					this.messageList.push(...res.data.list)
				} else {
					this.messageList = res.data.list
				}
				this.isEmpty = this.messageList.length === 0
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		// 删除消息
		productClick(e) {
			uni.showLoading()
			deleteRemoveByIdNoticeApi({
				noticeId: e.item.noticeId
			})
				.then((res) => {
					uni.hideLoading()
					this.queryInfo.page = 1
					this.getAllMessage()
					this.getUserInfo()
				})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		handleReadAllMessage() {
			updateReadAllNoticeApi({}).then((res) => {
				uni.showToast({
					title: '全部已读',
					icon: 'none'
				})
				this.queryInfo.page = 1
				this.getAllMessage()
				this.getUserInfo()
			})
		},
		goToMesDetail(noticeId, only, jump) {
			updateReadNoticeApi({ noticeId })
				.then((res) => {
					if (jump == 2) {
						uni.navigateTo({
							url: `/another-tf/another-serve/orderDetails/index?orderId=${only}&noticeId=${noticeId}`
						})
					} else {
						uni.navigateTo({
							url: '/another-tf/another-serve/messageDetail/index?noticeId=' + noticeId
						})
					}
				})
		}
	},
	onReachBottom() {
		if (this.messageList.length < this.messageTotal) {
			++this.queryInfo.page
			this.getAllMessage(true)
		}
	}
}
</script>

<style lang="less" scoped>
.message-center-container {
	min-height: 100vh;
	background: #ffffff;
	box-sizing: border-box;

	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}

	.topTitBox {
		height: 100rpx;
		padding: 0 20rpx;
		background: #f7f7f7;

		.allRead {
			width: 144rpx;
			height: 56rpx;
			line-height: 56rpx;
			text-align: center;
			color: #333333;
			background: #FFFFFF;
		}
	}

	.swipe-list-item {
		margin-bottom: 20rpx !important;
	}

	.messageItem {
		width: 100%;
		background: #FFFFFF;
		border-bottom: 2rpx solid #F8F8F8;

		.messageBox {
			.messageType {
				padding: 30rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.iconBox {
					border-radius: 50%;
					background: #C5AA7B;
					width: 60rpx;
					height: 60rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-right: 20rpx;
					position: relative;

					.redBox {
						width: 20rpx;
						height: 20rpx;
						background-color: red;
						border-radius: 50%;
						position: absolute;
						right: 0rpx;
						top: 0rpx;
					}
				}

				.messageTypeL {
					display: flex;
					align-items: center;

					span {
						font-size: 32rpx;
						color: #333333;
					}
				}

				.messageTypeR {
					color: #CCCCCC;
					font-size: 24rpx;
				}
			}

			.messageInfo {
				width: 670rpx;
				display: block;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin: 20rpx 40rpx 20rpx;

				img {
					width: 100%;
					margin-bottom: 25rpx;
				}

				p {
					padding: 0 40rpx;
					color: #999999;
					font-size: 28rpx;
				}
			}
		}
	}
}
</style>
