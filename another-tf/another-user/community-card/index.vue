<template>
	<view class="community-card-container">
		<JHeader title="社区卡包" width="50" height="50" style="padding: 24rpx 0 0;"></JHeader>

		<view style="padding: 0 24rpx;background-color: #ffffff;">
			<tui-tabs
				style="width: 702rpx;padding: 0 0rpx 0 0rpx;overflow: hidden;" :slider-width="72" :padding="24"
				item-width="351rpx" selected-color="#ef530e" bold slider-bg-color="#ef530e"
				:size="32"
				:tabs="[{ name: '待使用' }, { name: '已失效' }]" :current-tab="currentTab" @change="handleCurrentChange"
			></tui-tabs>
		</view>
		<view v-if="currentTab === 0" style="padding: 10rpx 18rpx 0;">
			<tui-radio-group
				:value="communityCardInfo.query.isUse"
				@change="(e) => communityCardInfo.query.isUse !== e.detail.value && ((communityCardInfo.query.isUse = e.detail.value) || true) && (communityCardInfo.query.page = 1) && getCommunityCardList()"
			>
				<view style="display: flex;flex-wrap: wrap;align-items: center;">
					<!-- <text style="font-size: 30rpx;">是否使用：</text> -->
					<tui-label v-for="(item, index) in [{ name: '待使用', value: '0' }, { name: '已使用', value: '1' }]" :key="index">
						<view style="display: flex;align-items: center;padding: 6rpx 10rpx;font-size: 28rpx;">
							<tui-radio
								:checked="communityCardInfo.query.isUse === item.value" :value="item.value" color="#07c160"
								border-color="#999" :scale-ratio="0.8"
							>
							</tui-radio>
							<text>{{ item.name }}</text>
						</view>
					</tui-label>
				</view>
			</tui-radio-group>
		</view>
		<view style="padding: 20rpx;">
			<view v-if="currentTab === 0">
				<view v-if="communityCardInfo.data && communityCardInfo.data.length">
					<view v-for="(item, index) in communityCardInfo.data" :key="index" style="margin-bottom: 20rpx;">
						<tui-collapse
							:index="index" :current="currentIndexMain" :arrow="false" hd-bg-color="#ffffff"
							@click="changeCurrentMain"
						>
							<template #title>
								<tui-list-view>
									<tui-list-cell background-color="transparent" padding="20rpx 18rpx 20rpx 32rpx">
										<view v-if="item.businessFieldsArr && item.businessFieldsArr.length">
											<view
												v-for="(section, count) in item.businessFieldsArr" :key="section.id"
												style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 4rpx;padding: 16rpx;background-color: #f55243;border-radius: 16rpx;"
											>
												<view style="display: flex;justify-content: space-between;align-items: stretch;">
													<view
														style="position: relative;width: 110rpx;margin-left: -34rpx;padding: 40rpx;text-align: center;font-weight: bold;color: #C82209;background: linear-gradient(90deg, #FFDB9D 0%, #FFC157 99%);border-radius: 18rpx 0 0 18rpx;"
													>
														<view
															style="position: absolute;top: 50%;left: 0;transform: translateY(-50%);width: 28rpx;height: 28rpx;background-color: #fdfdfd;clip-path: ellipse(50% 50% at 0% 50%)"
														>
														</view>
														<view style="margin-left: -14rpx;">
															<text style="font-size: 28rpx;">￥</text>
															<text style="font-size: 48rpx;">{{ section.serverPrice || '--' }}</text>
														</view>
													</view>
													<view style="width: 40rpx;margin-left: -20rpx;background-color: #ffc157;border-radius: 50%;"></view>
												</view>
												<view style="flex: 1;width: 0;margin-left: 30rpx;color: #FFEDD2;">
													<view style="font-size: 32rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
														{{ section.serverInfoName || '--' }}
													</view>
													<view
														v-if="section.serverIntroduction"
														style="margin-top: 10rpx;font-size: 28rpx;overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
													>
														{{ section.serverIntroduction || '--' }}
													</view>
												</view>
												<view class="middle-btn">
													<tui-button
														type="white" width="108rpx" height="52rpx" margin="0 0 0 20rpx"
														:size="26"
														@click="go(`/community-center/community-detail?id=${section.id}&serverNameThree=${section.serverInfoName}&serverImageUrl=${section.serverImageUrl}&cardId=${item.cardId}`)"
													>
														去使用
													</tui-button>
												</view>
											</view>
											<view style="display: flex;justify-content: space-between;margin-top: 10rpx;font-size: 26rpx;color: #b1b1b1;">
												<view>有效天数：{{ item.cardEffectiveTime || '--' }}</view>
												<view v-if="!item.isLose">已失效</view>
											</view>
										</view>
										<view v-else style="padding-top: 18rpx;text-align: center;">
											该卡包暂无服务！
										</view>
									</tui-list-cell>
								</tui-list-view>
							</template>
							<template #content>
								<view style="padding: 26rpx 22rpx;font-size: 30rpx;background-color: #ffe7c2;border-radius: 28rpx;">
									<view style="display: flex;justify-content: space-between;align-items: center;">
										<!-- <view>ID：{{ item.cardId }}</view> -->
										<view style="font-size: 34rpx;font-weight: bold;">
											<text v-if="item.isUse === 0">未使用</text>
											<text v-else-if="item.isUse === 1">已使用</text>
											<text v-else>--</text>
										</view>
										<view>关联配置ID：{{ item.activityId || '--' }}</view>
									</view>
									<view style="margin-top: 10rpx;">
										<view>
											卡券使用范围：
											<text v-if="item.cardRange === 1">指定</text>
											<text v-else-if="item.cardRange === 2">全部</text>
											<text v-else>--</text>
										</view>
										<view v-if="(item.cardRange === 1) && item.cardJson" style="word-break: break-all;">
											指定区域（行政编码）：{{
												item.cardJson || '--' }}
										</view>
									</view>
									<view v-if="item.businessFields" style="margin-top: 10rpx;color: #68686b;">
										获取时间：{{ item.createTime || '--' }}
									</view>
								</view>
							</template>
						</tui-collapse>
					</view>
				</view>
				<view style="padding-bottom: 45rpx;">
					<LoadingMore
						:status="!communityCardInfo.isEmpty && !communityCardInfo.data.length
							? 'loading' : !communityCardInfo.isEmpty && communityCardInfo.data.length && (communityCardInfo.data.length >= communityCardInfo.listTotal) ? 'no-more' : ''"
					>
					</LoadingMore>
					<tui-no-data v-if="communityCardInfo.isEmpty" :fixed="false" style="margin-top: 60rpx;">暂无卡包</tui-no-data>
				</view>
			</view>
			<view v-else-if="currentTab === 1">
				<tui-list-view v-if="invalidCardInfo.data && invalidCardInfo.data.length" margin-top="10rpx">
					<tui-list-cell
						v-for="(item, index) in invalidCardInfo.data" :key="item.cardId" background-color="transparent"
						padding="0 0 32rpx" :color="item.isLose ? '#333333' : '#888888'"
					>
						<view style="padding: 26rpx 22rpx;background-color: #ffe7c2;border-radius: 28rpx;">
							<view style="display: flex;justify-content: space-between;align-items: center;">
								<!-- <view>ID：{{ item.cardId }}</view> -->
								<view style="font-size: 34rpx;font-weight: bold;">
									<text v-if="item.isUse === 0">未使用</text>
									<text v-else-if="item.isUse === 1">已使用</text>
									<text v-else>--</text>
								</view>
								<view>关联配置ID：{{ item.activityId || '--' }}</view>
							</view>
							<view v-if="item.businessFieldsArr && item.businessFieldsArr.length" style="margin-top: 10rpx;">
								<view style="padding: 0 14rpx;font-size: 32rpx;font-weight: bold;">● 绑定服务列表：</view>
								<view
									v-for="(section, count) in item.businessFieldsArr" :key="section.id"
									style="display: flex;justify-content: space-between;align-items: center;margin-top: 4rpx;padding: 16rpx;background-color: #ffffff;border-radius: 16rpx;"
								>
									<view style="flex: 1;">
										<view>
											社区业务内容：{{ section.serverInfoName || '--' }}（{{ section.id || '--' }}）
										</view>
										<view v-if="section.serverIntroduction">
											介绍：{{ section.serverInfoName || '--' }}
										</view>
									</view>
									<view style="margin: 0 0 0 20rpx;text-align: center;">
										<view style="font-weight: bold;color: #e00d32;">￥{{ section.serverPrice || '--' }}</view>
										<view>
											<tui-button
												v-if="item.isLose" type="warning" width="148rpx" height="52rpx"
												margin="10rpx 0 0"
												shape="circle"
												@click="go(`/community-center/community-detail?id=${section.id}&serverNameThree=${section.serverInfoName}&serverImageUrl=${section.serverImageUrl}&cardId=${item.cardId}`)"
											>
												去下单
											</tui-button>
										</view>
									</view>
								</view>
							</view>
							<view style="margin-top: 10rpx;">
								<view>
									卡券使用范围：
									<text v-if="item.cardRange === 1">指定</text>
									<text v-else-if="item.cardRange === 2">全部</text>
									<text v-else>--</text>
								</view>
								<view v-if="(item.cardRange === 1) && item.cardJson" style="word-break: break-all;">
									指定区域（行政编码）：{{
										item.cardJson || '--' }}
								</view>
							</view>
							<view style="display: flex;justify-content: space-between;margin-top: 10rpx;">
								<view>有效天数：{{ item.cardEffectiveTime || '--' }}</view>
								<view v-if="!item.isLose">已失效</view>
							</view>
							<view v-if="item.businessFields" style="margin-top: 10rpx;color: #68686b;">
								获取时间：{{ item.createTime || '--' }}
							</view>
						</view>
					</tui-list-cell>
				</tui-list-view>
				<view style="padding-bottom: 45rpx;">
					<LoadingMore
						:status="!invalidCardInfo.isEmpty && !invalidCardInfo.data.length
							? 'loading' : !invalidCardInfo.isEmpty && invalidCardInfo.data.length && (invalidCardInfo.data.length >= invalidCardInfo.listTotal) ? 'no-more' : ''"
					>
					</LoadingMore>
					<tui-no-data v-if="invalidCardInfo.isEmpty" :fixed="false" style="margin-top: 60rpx;">
						暂无失效卡券
					</tui-no-data>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getAllCommunityCardHolderApi, getIsLoseAllCommunityCardHolderApi } from '../../../api/anotherTFInterface'

export default {
	name: 'CommunityCard',
	components: {},
	data() {
		return {
			currentTab: 0,

			communityCardInfo: {
				query: {
					page: 1,
					pageSize: 10,
					isUse: '0'
				},
				data: [],
				listTotal: 0,
				isEmpty: false
			},
			currentIndexMain: -1,
			invalidCardInfo: {
				query: {
					page: 1,
					pageSize: 10
				},
				data: [],
				listTotal: 0,
				isEmpty: false
			}
		}
	},
	onLoad() {
		this.getCommunityCardList()
	},
	methods: {
		handleCurrentChange(e) {
			this.currentTab = e.index
			// 缓存每个tab里的数据
			if (this.currentTab === 0) {
			} else if (this.currentTab === 1) {
				if (!this.invalidCardInfo.isEmpty && !this.invalidCardInfo.data.length) this.getInvalidCardList()
			}
			// 每点一个tab就重新进行对它的请求
			// if (this.currentTab === 0) {
			// 	this.communityCardInfo.query.page = 1
			// 	this.communityCardInfo.data = []
			// 	this.communityCardInfo.listTotal = 0
			// 	this.communityCardInfo.isEmpty = false
			// 	this.getApplyByStoreList()
			// } else if (this.currentTab === 1) {
			// 	this.invalidCardInfo.query.page = 1
			// 	this.invalidCardInfo.data = []
			// 	this.invalidCardInfo.listTotal = 0
			// 	this.invalidCardInfo.isEmpty = false
			// 	this.getApplyByUserList()
			// }
		},
		getCommunityCardList(isLoadmore) {
			uni.showLoading({
				title: '加载中'
			})
			getAllCommunityCardHolderApi({ ...this.communityCardInfo.query })
				.then((res) => {
					res.data.list = res.data.list.map((i) => ({ ...i, businessFieldsArr: i.businessFields ? JSON.parse(i.businessFields) : [] }))
					this.communityCardInfo.listTotal = res.data.total
					if (isLoadmore) {
						this.communityCardInfo.data.push(...res.data.list)
					} else {
						this.communityCardInfo.data = res.data.list
					}
					this.communityCardInfo.isEmpty = this.communityCardInfo.data.length === 0
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		getInvalidCardList(isLoadmore) {
			uni.showLoading({
				title: '加载中'
			})
			getIsLoseAllCommunityCardHolderApi({ ...this.invalidCardInfo.query })
				.then((res) => {
					res.data.list = res.data.list.map((i) => ({ ...i, businessFieldsArr: i.businessFields ? JSON.parse(i.businessFields) : [] }))
					this.invalidCardInfo.listTotal = res.data.total
					if (isLoadmore) {
						this.invalidCardInfo.data.push(...res.data.list)
					} else {
						this.invalidCardInfo.data = res.data.list
					}
					this.invalidCardInfo.isEmpty = this.invalidCardInfo.data.length === 0
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		changeCurrentMain(e) {
			this.currentIndexMain = this.currentIndexMain == e.index ? -1 : e.index
		}
	},
	onReachBottom() {
		if (this.currentTab === 0) {
			if (this.communityCardInfo.data.length < this.communityCardInfo.listTotal) {
				++this.communityCardInfo.query.page
				this.getCommunityCardList(true)
			}
		} else if (this.currentTab === 1) {
			if (this.invalidCardInfo.data.length < this.invalidCardInfo.listTotal) {
				++this.invalidCardInfo.query.page
				this.getInvalidCardList(true)
			}
		}
	}
}
</script>

<style lang="less" scoped>
.community-card-container {
	min-height: 100vh;
	width: 100%;
	background-color: #f1f1f1;

	/deep/ .j-header-container {
		background-color: #ffffff;

		.title {
			font-size: 34rpx;
			color: #222229;
			font-weight: normal;
		}
	}

	.tui-tabs-view {
		/deep/ .tui-tabs-slider {
			margin-left: -24rpx;
		}
	}

	.tui-collapse {
		/deep/ .tui-collapse-head {
			border-radius: 28rpx;
		}
	}

	.middle-btn {
		/deep/ .tui-btn {
			color: #D12727 !important;
			background: #ffedd2 !important;
			border-radius: 10rpx;
		}
	}
}
</style>
