<template>
	<view class="community-card-container">
		<JHeader title="社区卡包" width="50" height="50"></JHeader>

		<view style="padding: 0 24rpx;background-color: #ffffff;">
			<tui-tabs
				style="width: 702rpx;padding: 0 0rpx 0 0rpx;overflow: hidden;" :slider-width="72" :padding="24"
				item-width="234rpx" selected-color="#ef530e" bold slider-bg-color="#ef530e"
				:size="32"
				:tabs="[{ name: '待使用' }, { name: '已失效' }, { name: '已使用' }]" :current-tab="currentTab" @change="handleCurrentChange"
			></tui-tabs>
		</view>
		<!-- <view v-if="currentTab === 0" style="padding: 10rpx 18rpx 0;">
			<tui-radio-group
			:value="communityCardInfo.query.isUse"
			@change="(e) => communityCardInfo.query.isUse !== e.detail.value && ((communityCardInfo.query.isUse = e.detail.value) || true) && (communityCardInfo.query.page = 1) && getCommunityCardList()"
			>
			<view style="display: flex;flex-wrap: wrap;align-items: center;">
			<text style="font-size: 30rpx;">是否使用：</text>
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
			</view> -->
		<view style="padding: 20rpx;">
			<view v-if="(currentTab === 0) || (currentTab === 2)">
				<view v-if="communityCardInfo.data && communityCardInfo.data.length">
					<view v-for="(item, index) in communityCardInfo.data" :key="index" style="margin-bottom: 20rpx;">
						<tui-collapse
							:index="index" :current="currentIndexMain" :arrow="false" hd-bg-color="#ffffff"
							@click="changeCurrentMain"
						>
							<template #title>
								<UserCommunityCard :card-data="item"></UserCommunityCard>
							</template>
							<template #content>
								<UserCommunityCard show-type="message" :card-data="item"></UserCommunityCard>
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
					<tui-no-data v-if="communityCardInfo.isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无卡包</tui-no-data>
				</view>
			</view>
			<view v-else-if="currentTab === 1">
				<view v-if="invalidCardInfo.data && invalidCardInfo.data.length">
					<view v-for="(item, index) in invalidCardInfo.data" :key="index" style="margin-bottom: 20rpx;">
						<tui-collapse
							:index="index" :current="currentIndexMain" :arrow="false" hd-bg-color="#ffffff"
							@click="changeCurrentMain"
						>
							<template #title>
								<UserCommunityCard :card-data="item"></UserCommunityCard>
							</template>
							<template #content>
								<UserCommunityCard show-type="message" :card-data="item"></UserCommunityCard>
							</template>
						</tui-collapse>
					</view>
				</view>
				<view style="padding-bottom: 45rpx;">
					<LoadingMore
						:status="!invalidCardInfo.isEmpty && !invalidCardInfo.data.length
							? 'loading' : !invalidCardInfo.isEmpty && invalidCardInfo.data.length && (invalidCardInfo.data.length >= invalidCardInfo.listTotal) ? 'no-more' : ''"
					>
					</LoadingMore>
					<tui-no-data v-if="invalidCardInfo.isEmpty" :fixed="false" style="padding-top: 60rpx;">
						暂无失效卡券
					</tui-no-data>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getAllCommunityCardHolderApi, getIsLoseAllCommunityCardHolderApi } from '../../../api/anotherTFInterface'
import UserCommunityCard from './components/UserCommunityCard.vue'

export default {
	name: 'CommunityCard',
	components: { UserCommunityCard },
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
			this.currentIndexMain = -1
			this.currentTab = e.index
			// 缓存每个tab里的数据
			if (this.currentTab === 0) {
				this.communityCardInfo.query.isUse = '0'
				this.communityCardInfo.query.page = 1
				this.communityCardInfo.data = []
				this.communityCardInfo.listTotal = 0
				this.communityCardInfo.isEmpty = false
				this.getCommunityCardList()
			} else if (this.currentTab === 1) {
				if (!this.invalidCardInfo.isEmpty && !this.invalidCardInfo.data.length) this.getInvalidCardList()
			} else if (this.currentTab === 2) {
				this.communityCardInfo.query.isUse = '1'
				this.communityCardInfo.query.page = 1
				this.communityCardInfo.data = []
				this.communityCardInfo.listTotal = 0
				this.communityCardInfo.isEmpty = false
				this.getCommunityCardList()
			}
			// 每点一个tab就重新进行对它的请求
			// if ((this.currentTab === 0) || (this.currentTab === 2)) {
			// 	this.communityCardInfo.query.page = 1
			// 	this.communityCardInfo.data = []
			// 	this.communityCardInfo.listTotal = 0
			// 	this.communityCardInfo.isEmpty = false
			// 	this.getCommunityCardList()
			// } else if (this.currentTab === 1) {
			// 	this.invalidCardInfo.query.page = 1
			// 	this.invalidCardInfo.data = []
			// 	this.invalidCardInfo.listTotal = 0
			// 	this.invalidCardInfo.isEmpty = false
			// 	this.getInvalidCardList()
			// }
		},
		getCommunityCardList(isLoadmore) {
			uni.showLoading({
				title: '加载中'
			})
			getAllCommunityCardHolderApi({ ...this.communityCardInfo.query })
				.then((res) => {
					res.data.list = res.data.list.map((i) => ({ ...i, businessFieldsArr: i.businessFields ? [ JSON.parse(i.businessFields) ] : [] }))
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
					res.data.list = res.data.list.map((i) => ({ ...i, businessFieldsArr: i.businessFields ? [ JSON.parse(i.businessFields) ] : [] }))
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
		if ((this.currentTab === 0) || (this.currentTab === 2)) {
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

	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}

	/deep/ .j-header-wrapper {
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
}
</style>
