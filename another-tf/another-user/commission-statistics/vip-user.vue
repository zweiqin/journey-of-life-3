<template>
	<view class="vip-user-container">
		<JHeader title="会员列表" width="50" height="50"></JHeader>

		<view style="display: flex;padding: 0 40rpx;">
			<tui-dropdown-list
				:show="typeDropdownShow" :top="55" background-color="#474747"
				@close="typeDropdownShow = false"
			>
				<template #selectionbox>
					<view style="height: auto;color: #080808;" @click="typeDropdownShow = !typeDropdownShow">
						<text>类型∨</text>
						<text style="margin-left: 10rpx;;font-size: 26rpx;">
							<text v-if="fansDataInfo.query.today">今日会员</text>
							<text v-else>累计会员</text>
						</text>
					</view>
				</template>
				<template #dropdownbox>
					<view style="width: fit-content;box-sizing: border-box;">
						<tui-list-view
							color="#777" margin-top="2rpx"
							style="width: fit-content;min-width: 150rpx;max-height: 28vh;overflow-y: auto;"
						>
							<tui-list-cell
								padding="20rpx 0" color="#ffffff" background-color="transparent"
								style="width: fit-content;margin: 0 auto;border-bottom: 2rpx solid #cccccc;"
								@click="(typeDropdownShow = false) || (fansDataInfo.query.today = 1) && getRelationshipUserList()"
							>
								今日会员
							</tui-list-cell>
							<tui-list-cell
								padding="20rpx 0" color="#ffffff" background-color="transparent"
								style="width: fit-content;margin: 0 auto;border-bottom: 2rpx solid #cccccc;"
								@click="(typeDropdownShow = false) || (fansDataInfo.query.today = 0) || getRelationshipUserList()"
							>
								累计会员
							</tui-list-cell>
						</tui-list-view>
					</view>
				</template>
			</tui-dropdown-list>
		</view>

		<view style="margin-top: 20rpx;">
			<view v-if="fansDataInfo.data && fansDataInfo.data.length">
				<FansPane v-for="(item, index) in fansDataInfo.data" :key="index" :fans-info="item" @view="handleViewFans"></FansPane>
			</view>
			<view style="padding-bottom: 45rpx;">
				<LoadingMore
					:status="!fansDataInfo.isEmpty && !fansDataInfo.data.length
						? 'loading' : !fansDataInfo.isEmpty && fansDataInfo.data.length && (fansDataInfo.data.length >= fansDataInfo.listTotal) ? 'no-more' : ''"
				>
				</LoadingMore>
				<tui-no-data v-if="fansDataInfo.isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无数据...</tui-no-data>
			</view>
		</view>

		<!-- 查看会员列表 -->
		<tui-bottom-popup
			:z-index="1002" :mask-z-index="1001" :show="subFansListVisible"
			@close="subFansListVisible = false"
		>
			<scroll-view scroll-y style="height: 900rpx;background-color: #dfdfde;" @scrolltolower="handleScrolltolower">
				<view style="display: flex;align-items: center;justify-content: space-between;padding: 16rpx 28rpx;">
					<view>
						<text style="color: orange;">{{ subFansInfo.query.phone || '--' }}</text>
						的粉丝列表
					</view>
					<tui-icon
						:size="20" name="close" color="#ccc"
						@click="subFansListVisible = false"
					></tui-icon>
				</view>
				<view v-if="subFansInfo.data && subFansInfo.data.length">
					<FansPane v-for="(item, index) in subFansInfo.data" :key="index" :fans-info="item"></FansPane>
				</view>
				<view style="padding-bottom: 45rpx;">
					<LoadingMore
						:status="!subFansInfo.isEmpty && !subFansInfo.data.length
							? 'loading' : !subFansInfo.isEmpty && subFansInfo.data.length && (subFansInfo.data.length >= subFansInfo.listTotal) ? 'no-more' : ''"
					>
					</LoadingMore>
					<tui-no-data v-if="subFansInfo.isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无粉丝数据</tui-no-data>
				</view>
			</scroll-view>
		</tui-bottom-popup>
	</view>
</template>

<script>
import { getRelationshipTodayRdListApi } from '../../../api/anotherTFInterface'
import FansPane from './components/FansPane.vue'
export default {
	name: 'VipUser',
	components: {
		FansPane
	},
	data() {
		return {
			typeDropdownShow: false,
			fansDataInfo: {
				query: {
					page: 1,
					pageSize: 20,
					today: '', // 0-全部 1-今日
					phone: ''
				},
				data: [],
				listTotal: 0,
				isEmpty: false
			},
			subFansListVisible: false,
			subFansInfo: {
				query: {
					page: 1,
					pageSize: 20,
					today: 0,
					phone: '' // 电话
				},
				data: [],
				listTotal: 0,
				isEmpty: false
			}
		}
	},
	onLoad(options) {
		this.fansDataInfo.query.today = Number(options.today) || 0
		this.getRelationshipUserList()
	},
	methods: {
		getRelationshipUserList(isLoadmore) {
			uni.showLoading()
			getRelationshipTodayRdListApi({ ...this.fansDataInfo.query }).then((res) => {
				this.fansDataInfo.listTotal = res.data.total
				if (isLoadmore) {
					this.fansDataInfo.data.push(...res.data.list)
				} else {
					this.fansDataInfo.data = res.data.list
				}
				this.fansDataInfo.isEmpty = this.fansDataInfo.data.length === 0
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		getSubFansList(isLoadmore) {
			uni.showLoading({
				title: '加载中'
			})
			getRelationshipTodayRdListApi({ ...this.subFansInfo.query })
				.then((res) => {
					this.subFansInfo.listTotal = res.data.total
					if (isLoadmore) {
						this.subFansInfo.data.push(...res.data.list)
					} else {
						this.subFansInfo.data = res.data.list
					}
					this.subFansInfo.isEmpty = this.subFansInfo.data.length === 0
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		// 查看粉丝列表
		handleViewFans(currentFansInfo) {
			this.subFansInfo.query.phone = currentFansInfo.phone
			this.subFansInfo.query.page = 1
			this.subFansInfo.data = []
			this.subFansInfo.listTotal = 0
			this.subFansInfo.isEmpty = false
			this.getSubFansList()
			this.subFansListVisible = true
		},
		handleScrolltolower() {
			if (this.subFansInfo.data.length < this.subFansInfo.listTotal) {
				++this.subFansInfo.query.page
				this.getSubFansList(true)
			}
		}
	},
	onPullDownRefresh() {
		this.fansDataInfo.query.page = 1
		this.getRelationshipUserList()
	},
	onReachBottom() {
		if (this.fansDataInfo.data.length < this.fansDataInfo.listTotal) {
			++this.fansDataInfo.query.page
			this.getRelationshipUserList(true)
		}
	}
}
</script>

<style lang="less" scoped>
.vip-user-container {
	min-height: 100vh;
	padding: 0 0 40rpx;
	background-color: #f6f6f5;

	/deep/ .j-header-wrapper {
		padding: 18rpx 0 16rpx;
		background-color: #f5f5f5;

		.title {
			font-size: 36rpx;
			color: #222229;
			font-weight: normal;
		}
	}

	/deep/ .tui-dropdown-view {
		height: auto !important;
		width: fit-content;
		margin-left: 58rpx;
	}
}
</style>
