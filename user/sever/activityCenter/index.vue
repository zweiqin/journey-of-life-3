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
							@click="go(`/user/sever/activityCenter/activity-prod?goodsId=${item.productId}&campaignsType=${item.campaignsType}&activityId=${item.id}`)"
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
				<view v-if="bindingUserList.userDtoList">
					<block v-for="(item, index) in bindingUserList.userDtoList" :key="index">
						<tui-collapse :index="index" :current="currentIndex" @click="changeCurrent">
							<template #title>
								<tui-list-cell>
									<view style="display: flex;justify-content: start;align-items: center;">
										<Avatar margin="0 24upx 0 0" :src="item.avatar" :size="40"></Avatar>
										<text style="padding-left: 28upx;">{{ item.nickname || '--' }}</text>
										<text style="padding-left: 40upx;color: red;">佣金：{{ item.userDto.amount || '0' }}</text>
									</view>
								</tui-list-cell>
							</template>
							<template #content>
								<view v-if="item.userDtoList && item.userDtoList.length">
									<tui-list-view title="">
										<tui-list-cell v-for="section in item.userDtoList" :key="section.id">
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
								<view v-else style="padding-top: 28upx;;text-align: center;">该粉丝之下暂无数据</view>
							</template>
						</tui-collapse>
					</block>
				</view>
				<view v-else style="padding-top: 48upx;;text-align: center;">
					您暂未拥有活动粉丝哟~
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import Extension from './cpns/extension.vue'
import { getUserIncomeApi, getUserCrmListApi, getBindingUserApi, changeActivityUserBindingApi, getPurchaseRecordApi, getIsPurchaseApi } from '../../../api/user'
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

			bindingUserList: [],
			index: 0,
			currentIndex: -1,

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
			this.bindActivityId = uni.getStorageSync(NEW_BIND_ACTIVITY_ID)
			// try {
			//   await this.checkBind({ userId: userId })
			// } catch (error) {
			this.binding(getUserId(), () => { })
		// }
		} else if (getUserId() && options.code) { // 请求路径上面直接有活动id参数
			this.bindActivityId = options.code
			this.binding(getUserId(), () => { })
		}

		getPurchaseRecordApi({ userId: getUserId(), price: 299 })
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
		this.getBindingUser()
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
			// this.bindingUserList = res.data.userDtoList||[]
			this.bindingUserList = res.data
		},

		changeCurrent(e) {
			// 可关闭自身
			this.currentIndex = this.currentIndex == e.index ? -1 : e.index
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
