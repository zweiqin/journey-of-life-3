<template>
	<view class="account-book-container">
		<view class="main">
			<NewHeader
				title="活动中心" position="left" top="37%" :left="-10"
				color="#fff" padding="0 0 20upx 0upx"
				tabbar="/pages/user/user" @back="handleBack"
			>
				<!-- <block slot="right">
					<tui-icon name="share" color="#fff"></tui-icon>
					</block> -->
			</NewHeader>

			<Extension :data="extensionData"></Extension>

			<view style="width: 100%;border-top-left-radius: 20upx;border-top-right-radius: 20upx;overflow: hidden;">
				<tui-tabs
					:tabs="tabs" :current-tab="currentTab" item-width="50%"
					@change="(e) => currentTab = e.index"
				></tui-tabs>
			</view>
			<view v-if="currentTab === 0">
				<tui-list-view title="">
					<tui-list-cell v-for="item in activityList" :key="item.id">
						<view
							style="display: flex;"
							@click="handleClickActivity(item)"
						>
							<view>
								<Avatar margin="0 24upx 0 0" :src="item.picUrl" :size="40"></Avatar>
							</view>
							<view>
								<view>{{ item.campaignsName }}</view>
								<view
									style="display: flex;justify-content: space-between;flex-wrap: wrap;padding-top: 5px;font-size: 10px;color: #605D52;"
								>
									<text style="padding-right: 24upx;">开始：{{ item.startDate }}</text>
									<text>结束：{{ item.endDate }}</text>
								</view>
							</view>
						</view>
					</tui-list-cell>
				</tui-list-view>
				<LoadingMore v-show="status !== 'none'" :status="status"></LoadingMore>
			</view>
			<view v-if="currentTab === 1">

				<view v-if="activityList && activityList.length">
					<view v-for="(item, index) in activityList" :key="index" style="margin-bottom: 20upx;">
						<tui-collapse :index="index" :current="currentIndexActivity" hd-bg-color="#ffffff" @click="changeCurrentActivity">
							<template #title>
								<tui-list-cell background-color="transparent">
									<view style="display: flex;align-items: center;">
										<view>
											<Avatar margin="0 24upx 0 0" :src="item.picUrl" :size="40"></Avatar>
										</view>
										<view>
											<view>{{ item.campaignsName }}</view>
											<view
												v-if="item.campaignsType === 2" style="display: flex;justify-content: space-between;flex-wrap: wrap;padding-top: 5px;font-size: 10px;color: #605D52;"
											>
												<text style="padding-right: 24upx;">分享数：{{ serviceSharingLogs.shareCount || '0' }}</text>
												<text style="padding-right: 24upx;">购买数：{{ serviceSharingLogs.purchaseCount || '0' }}</text>
												<text>总购买数：{{ serviceSharingLogs.totalCount || '0' }}</text>
											</view>
										</view>
									</view>
								</tui-list-cell>
							</template>
							<template #content>

								<view style="margin: 0 24upx;background-color: #ebebea;">
									<view v-if="item.campaignsType === 0">
										<view v-if="bindingUserList.userDtoList && bindingUserList.userDtoList.length">
											<block v-for="(part, count) in bindingUserList.userDtoList" :key="count">
												<tui-collapse :index="count" :current="currentIndex" hd-bg-color="transparent" @click="changeCurrent">
													<template #title>
														<tui-list-cell background-color="transparent">
															<view style="display: flex;justify-content: start;align-items: center;">
																<Avatar margin="0 24upx 0 0" :src="part.avatar" :size="40"></Avatar>
																<text style="padding-left: 28upx;">{{ part.nickname || '--' }}</text>
																<text style="padding-left: 40upx;color: red;">佣金：{{ part.userDto.amount || '0' }}</text>
															</view>
														</tui-list-cell>
													</template>
													<template #content>
														<view style="margin: 0 16upx;background-color: #e1e2e0;">
															<view v-if="part.userDtoList && part.userDtoList.length">
																<tui-list-view title="">
																	<tui-list-cell v-for="section in part.userDtoList" :key="section.id" background-color="transparent">
																		<view style="display: flex;justify-content: space-between;align-items: center;padding-left: 30upx;">
																			<view style="display: flex;align-items: center;">
																				<Avatar margin="0 24upx 0 0" :src="section.avatar" :size="40"></Avatar>
																				<text style="padding-left: 40upx;">{{ section.nickname || '--' }}</text>
																			</view>
																			<text>佣金：{{ section.userDto.amount || '0' }}</text>
																		</view>
																	</tui-list-cell>
																</tui-list-view>
															</view>
															<view v-else style="padding: 16upx 0;text-align: center;">该粉丝之下暂无数据</view>
														</view>
													</template>
												</tui-collapse>
											</block>
										</view>
										<view v-else style="padding: 28upx 0;text-align: center;">
											您暂未拥有活动粉丝哟~
										</view>
									</view>
									<view v-else-if="item.campaignsType === 1">1</view>
									<view v-else-if="item.campaignsType === 2">
										<view v-if="serviceSharingLogs.userDtos && serviceSharingLogs.userDtos.length">
											<tui-list-view title="">
												<tui-list-cell v-for="part in serviceSharingLogs.userDtos" :key="part.userId" background-color="transparent">
													<view style="display: flex;align-items: center;padding-left: 16upx;">
														<Avatar margin="0 24upx 0 0" :src="part.avatar" :size="40"></Avatar>
														<view style="display: flex;flex: 1;flex-direction: column;align-items: start;width: 0;padding-left: 20upx;">
															<text style="width: 100%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{ part.userName || '--' }}</text>
															<!-- <text>分享数：{{ part.shareCount || '0' }}</text> -->
															<text style="color: red;">购买数：{{ part.purchaseCount || '0' }}</text>
														</view>
													</view>
												</tui-list-cell>
											</tui-list-view>
										</view>
										<view v-else style="padding: 28upx 0;text-align: center;">
											社区服务粉丝空空如也~
										</view>
									</view>
									<view v-else>无此统计！</view>
								</view>

							</template>
						</tui-collapse>
					</view>
				</view>
				<view v-else style="padding-top: 48upx;text-align: center;">
					暂无活动！
				</view>

			</view>
		</view>
	</view>
</template>

<script>
import Extension from './cpns/extension.vue'
import { getUserIncomeApi, getUserCrmListApi, getBindingUserApi, changeActivityUserBindingApi, getPurchaseRecordApi, getIsPurchaseApi, getServiceSharingLogsApi } from '../../../api/user'
import { NEW_BIND_ACTIVITY_ID } from '../../../constant'
import { getUserId } from '../../../utils'

export default {
	name: 'ActivityCenter',
	components: {
		Extension
	},

	data() {
		return {
			extensionData: {},
			fansData: {},
			currentTab: 0,
			tabs: [{
				name: '快乐分享'
			}, {
				name: '我的粉丝'
			}],

			activityList: [],
			queryInfo: {
				page: 1,
				size: 10
			},
			totalPages: 0,
			status: 'none',

			currentIndexActivity: 0,

			bindingUserList: {},
			currentIndex: -1,

			serviceSharingLogs: {},
			currentIndexService: -1,

			bindActivityId: null

		}
	},

	onLoad(options) {
		// this.bindActivityId = options.code
		// if (getUserId() && this.bindActivityId) {
		// 	this.binding(getUserId(), () => {
		// 		uni.switchTab({
		// 			url: '/pages/user/user'
		// 		})
		// 	})
		// }
		if (options.code) uni.setStorageSync(NEW_BIND_ACTIVITY_ID, options.code) // 有活动id就进行存储，以防下面没登录跳到登录页
		if (getUserId() && !options.code && uni.getStorageSync(NEW_BIND_ACTIVITY_ID)) { // 如果原先有活动id，例如注册/重新登陆了然后跳回来（options没携带活动id），则是存储里的活动id
			this.bindActivityId = uni.getStorageSync(NEW_BIND_ACTIVITY_ID) * 1
			// try {
			//   await this.checkBind({ userId: userId })
			// } catch (error) {
			this.binding(getUserId(), () => { })
		// }
		} else if (getUserId() && options.code) { // 请求路径上面直接有活动id参数
			this.bindActivityId = options.code * 1
			this.binding(getUserId(), () => { })
		}

		if (getUserId())getPurchaseRecordApi({ userId: getUserId(), price: 299 })
	},

	onShow() {
		getUserIncomeApi({
			userId: getUserId()
		}).then(({ data }) => {
			this.extensionData = {
				accumulated: data.accumulated,
				withdrawal: data.withdrawal,
				before: data.before
			}
		})
		this.getUserCrmList()
		if (getUserId()) {
			this.getBindingUser()
			this.getServiceSharingLogs()
		}
	},
	// 触底加载
	onReachBottom() {
		if (this.totalPages <= this.queryInfo.page) {
			return 'no-more'
		}
		if (this.activityList.length < this.queryInfo.size) {
			return 'lack'
		}
		this.queryInfo.page++
		this.getUserCrmList(true)
	},

	methods: {
		// 绑定
		binding(userId, cb) {
			const _this = this
			return new Promise((resolve, reject) => {
				changeActivityUserBindingApi({
					userId,
					userCode: this.bindActivityId
				})
					.then((res) => {
						uni.removeStorageSync(NEW_BIND_ACTIVITY_ID)
						uni.showToast({
							title: '绑定成功',
							duration: 1000
						})
						_this.timer = setTimeout(() => {
							cb && typeof cb === 'function' && cb()
						}, 1000)
						resolve()
					})
					.catch((err) => {
						uni.removeStorageSync(NEW_BIND_ACTIVITY_ID)
						_this.timer = setTimeout(() => {
							cb && typeof cb === 'function' && cb()
						}, 1000)
						reject()
					})
			})
		},
		async getUserCrmList(isLoadmore) {
			if (!isLoadmore) this.queryInfo = { page: 1, size: 6 }
			const res = await getUserCrmListApi(this.queryInfo)
			if (res.errno === 0) {
				this.totalPages = res.data.totalPages
				if (isLoadmore) {
					// this.activityList.push(...res.data.smartList.map((item) => ({
					this.activityList.push(...res.data.crmList)
				} else {
					this.activityList = [ ...res.data.crmList ]
				}
			}
			this.status = 'none'
		},

		async getBindingUser() {
			const res = await getBindingUserApi({ userId: getUserId() }) // getUserId()
			// this.bindingUserList = res.data.userDtoList||{}
			this.bindingUserList = res.data || {}
		},

		async getServiceSharingLogs() {
			const res = await getServiceSharingLogsApi({ userId: getUserId() })
			this.serviceSharingLogs = res.data || {}
		},

		handleClickActivity(item) {
			if (item.campaignsType === 0) {
				this.go(`/community-center/vip-center/vip-detail?type=2&campaignsType=${item.campaignsType}`)
			} else if (item.campaignsType === 1) {
				this.go(`/user/sever/activityCenter/activity-prod?goodsId=${item.productId}&campaignsType=${item.campaignsType}&activityId=${item.id}`)
			} else if (item.campaignsType === 2) {
				if (item.productId === 313) {
					this.go('/community-center/community-detail?id=313&serverNameThree=%E7%A9%BA%E8%B0%83%E6%B8%85%E6%B4%97%E6%9C%8D%E5%8A%A1&serverImageUrl=https%3A%2F%2Fwww.tuanfengkeji.cn%3A9527%2Fdts-admin-api%2Fadmin%2Fstorage%2Ffetch%2F5ub5gxq8btzj41dyewdk.png')
				}
			}
		},

		changeCurrent(e) {
			// 可关闭自身
			this.currentIndex = this.currentIndex == e.index ? -1 : e.index
		},

		changeCurrentActivity(e) {
			// 可关闭自身
			this.currentIndexActivity = this.currentIndexActivity == e.index ? -1 : e.index
		},

		handleBack() {
			uni.switchTab({
				url: '/pages/user/user'
			})
		}
	}
}
</script>

<style lang="less" scoped>
.account-book-container {
	position: relative;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	background-color: #f9f9f9;

	.main {
		padding: 72upx 0 0;
		box-sizing: border-box;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		z-index: 2;

		&::after {
			content: '';
			display: block;
			width: 100%;
			height: 500upx;
			top: 0;
			left: 0;
			position: absolute;
			background: url("../../../static/images/user/activity/activity-bg.png") no-repeat center/cover;
			// background-color: #e95d20;
			// border-bottom-left-radius: 400upx 40upx;
			// border-bottom-right-radius: 400upx 40upx;
			z-index: -1;
		}

		/deep/ .tui-tabs-view {
			width: 100% !important;
		}

		/deep/ .title {
			color: #fff;
		}

		/deep/ .slot-pane {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.item {
				width: 25%;
				padding: 40upx 20upx;
				color: #FFFFFF;
				text-align: center;
				border-radius: 24px;
				background: rgba(255, 255, 255, 0.32);
				border: 2px solid rgba(255, 255, 255, 0.16);

				.value {
					font-size: 40upx;
					font-weight: bold;
					margin-top: 10upx;
				}
			}
		}
	}
}
</style>
