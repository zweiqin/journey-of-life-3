<template>
	<view class="combination-activities-container">
		<JHeader title="活动中心" width="50" height="50"></JHeader>
		<view style="padding: 18rpx;">
			<!-- <view>
				<tui-checkbox-group
				:value="queryInfo.stateList"
				@change="(e) => (JSON.stringify(queryInfo.stateList) !== JSON.stringify(e.detail.value)) && (queryInfo.stateList = e.detail.value) && (queryInfo.page = 1) && getCombinationActivitiesList()"
				>
				<view style="display: flex;flex-wrap: wrap;align-items: center;">
				<view style="font-size: 34rpx;font-weight: bold;color: #333333;">活动状态筛选：</view>
				<tui-label
				v-for="(item, index) in [{ name: '报名未开始', value: '0' }, { name: '报名进行中', value: '1' }, { name: '活动待开始', value: '2' }, { name: '活动进行中', value: '3' }, { name: '活动已结束', value: '4' }]"
				:key="index"
				>
				<tui-list-cell padding="6rpx 16rpx">
				<view>
				<tui-checkbox
				:checked="queryInfo.stateList.includes(item.value)" :value="item.value" color="#07c160"
				border-color="#999"
				>
				</tui-checkbox>
				<text>{{ item.name }}</text>
				</view>
				</tui-list-cell>
				</tui-label>
				</view>
				</tui-checkbox-group>
				</view> -->
			<view style="display: flex;justify-content: space-between;flex-wrap: wrap;align-items: center;">
				<view style="font-size: 30rpx;">选择活动类型：</view>
				<tui-dropdown-list
					:show="typeDropdownShow" :top="55" background-color="#ffffff"
					@close="typeDropdownShow = false"
				>
					<template #selectionbox>
						<view
							style="height: auto;padding: 10rpx 16rpx;color: #222229;background-color: #ffffff;"
							@click="typeDropdownShow = !typeDropdownShow"
						>
							<text style="font-size: 26rpx;">{{ typeDropdownName || '' }}</text>
							<tui-icon name="arrowdown" :size="14" color="#222229" margin="0 0 0 14rpx"></tui-icon>
						</view>
					</template>
					<template #dropdownbox>
						<view style="width: fit-content;box-sizing: border-box;">
							<tui-list-view
								color="#777" margin-top="2rpx"
								style="width: fit-content;min-width: 180rpx;max-height: 28vh;overflow-y: auto;"
							>
								<tui-list-cell
									v-for="item in dropdownList"
									:key="item.name" padding="20rpx 0"
									style="width: fit-content;margin: 0 auto;border-bottom: 2rpx solid #999999;"
									@click="((queryInfo.ids = item.value) && (typeDropdownName = item.name) && (queryInfo.page = 1) && (typeDropdownShow = false)) || getCombinationActivitiesList()"
								>
									{{ item.name }}
								</tui-list-cell>
							</tui-list-view>
						</view>
					</template>
				</tui-dropdown-list>
			</view>
		</view>

		<view v-if="combinationActivityList && combinationActivityList.length" style="padding: 0 24rpx;">
			<view
				v-for="item in combinationActivityList" :key="item.id" style="margin: 0 0 32rpx;border-radius: 20rpx;overflow: hidden;"
			>
				<view style="position: relative;line-height: 1;">
					<view
						v-if="item.composeId && dropdownList.find((i) => i.value[0] === item.composeId)"
						style="position: absolute;top: 0;left: 0;z-index: 1;padding: 16rpx 44rpx;font-size: 28rpx;text-align: center;background-color: #ffffff;border-radius: 20rpx 0 20rpx 0;"
					>
						<text>{{ dropdownList.find((i) => i.value[0] === item.composeId).name }}</text>
					</view>
					<tui-lazyload-img
						width="100%" height="352rpx" mode="aspectFit" radius="20rpx 20rpx 0 0"
						background-color="#ef530e" src="../../../static/images/new-user/fee.icon.png"
					></tui-lazyload-img>
					<view
						style="position: absolute;bottom: -28rpx;right: -18rpx;width: 172rpx;height: 172rpx;display: flex;align-items: center;justify-content: center;padding: 14rpx;white-space: nowrap;border: 4rpx solid #ffffff;border-radius: 50%;transform: rotate(-30deg);box-sizing: border-box;"
					>
						<view
							style="display: flex;align-items: center;justify-content: center;width: 100%;height: 100%;border: 2rpx dashed #ffffff;border-radius: 50%;"
						>
							<view
								style="padding: 14rpx 0;color: #ffffff;border-top: 2rpx solid #ffffff;border-bottom: 2rpx solid #ffffff;"
							>
								<text v-if="[ 4 ].includes(item.state)">已结束</text>
								<text v-else-if="[ 3 ].includes(item.state)">进行中</text>
								<text v-else-if="[0, 1, 2].includes(item.state)">待开始</text>
							</view>
						</view>
					</view>
				</view>
				<view style="padding: 10rpx 40rpx;background-color: #ffffff;">
					<view style="font-weight: bold;">{{ item.composeName }}</view>
					<!-- <view
						style="margin: 20rpx 20rpx 0;padding: 20rpx;background-color: #eeeeee;border-radius: 20rpx;"
						>
						<view>
						<view
						v-if="[ 3 ].includes(item.state)"
						style="display: flex;align-items: center;justify-content: center;"
						>
						<text>距离结束：</text>
						<tui-countdown
						:size="24" :colon-size="24" colon-color="#1A66FF" color="#1A66FF"
						border-color="transparent"
						days :is-colon="false"
						:time="Math.floor((Date.parse(item.endTime) - Date.now()) / 1000)"
						></tui-countdown>
						</view>
						<view
						v-else-if="[0, 1, 2].includes(item.state)"
						style="display: flex;align-items: center;justify-content: center;"
						>
						<text>距离开始：</text>
						<tui-countdown
						:size="24" :colon-size="24" colon-color="#1A66FF" color="#1A66FF"
						border-color="transparent"
						days :is-colon="false"
						:time="Math.floor((Date.parse(item.startTime) - Date.now()) / 1000)"
						></tui-countdown>
						</view>
						</view>
						<view style="display: flex;align-items: center;margin-top: 12rpx;color: #ffffff;font-size: 30rpx;">
						<view style="padding: 6rpx 12rpx;background-color: #1b9fff;margin-right: 12rpx;border-radius: 8rpx;">
						<text v-if="item.ifAdd">可叠加优惠券</text>
						<text v-else>不可叠加优惠券</text>
						</view>
						<view style="padding: 6rpx 12rpx;background-color: #1b9fff;margin-right: 12rpx;border-radius: 8rpx;">
						<text v-if="item.ifLimit">
						限购{{
						item.limitNumber }}件/人
						</text>
						<text v-else>无限购</text>
						</view>
						<view style="padding: 6rpx 12rpx;background-color: #1b9fff;margin-right: 12rpx;border-radius: 8rpx;">
						<text v-if="item.ifBond">商家需要保证金￥{{ item.bondMoney }}</text>
						<text v-else>商家无需保证金</text>
						</view>
						</view>
						<view
						v-if="item.content"
						style="margin-top: 12rpx;word-break: break-all;font-size: 26rpx;"
						>
						赠送规则：{{ item.content }}
						</view>
						<view
						v-if="item.remark"
						style="margin-top: 12rpx;word-break: break-all;font-size: 26rpx;"
						>
						备注：{{ item.remark }}
						</view>
						</view> -->
					<view style="margin-top: 28rpx;font-size: 28rpx;color: #8d8d8e;">
						<view>
							<view>报名时间：</view>
							<view style="display: flex;align-items: center;flex-wrap: wrap;">
								<text>{{ item.signStartTime }}-</text>
								<text>{{ item.signEndTime }}</text>
							</view>
						</view>
						<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 8rpx;">
							<view>
								<view>活动时间：</view>
								<view style="display: flex;align-items: center;flex-wrap: wrap;">
									<text>{{ item.startTime }}-</text>
									<text>{{ item.endTime }}</text>
								</view>
							</view>
							<view
								class="middle-btn"
								style="display: flex;align-items: center;justify-content: flex-end;margin-left: 6rpx;"
							>
								<tui-button
									type="danger" width="174rpx" height="60rpx" shape="circle"
									@click="go(`/another-tf/another-user/combination-activities/combination-activity-products?combinationId=${item.composeId}`)"
								>
									参加活动
								</tui-button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="padding-bottom: 45rpx;">
			<LoadingMore
				:status="!isEmpty && !combinationActivityList.length
					? 'loading' : !isEmpty && combinationActivityList.length && (combinationActivityList.length >= combinationActivityTotal) ? '' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="isEmpty" :fixed="false" style="margin-top: 60rpx;">请期待组合活动</tui-no-data>
		</view>
	</view>
</template>

<script>
import { getPlatformComposeCanvasApi } from '../../../api/anotherTFInterface'
export default {
	name: 'CombinationActivities',
	data() {
		return {
			dropdownList: [{ name: '全部', value: [] }, { name: '商圈活动', value: [ 26 ] }, { name: '商城活动', value: [ 27 ] }, { name: '团长升级活动', value: [ 32 ] }, { name: '社区活动', value: [ 29 ] }],
			typeDropdownShow: false,
			typeDropdownName: '全部',
			isEmpty: false,
			combinationActivityList: [],
			combinationActivityTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20,
				ids: [], // 不传查全部
				shopId: '',
				stateList: ['0', '1', '2', '3', '4']
			}
		}
	},
	onLoad(options) {
		if (options.shopId) this.queryInfo.shopId = Number(options.shopId)
		if (options.combinationId) {
			this.queryInfo.ids = [ Number(options.combinationId) ]
		}
		if (options.type) {
			if (options.type === 'upgrade') {
				this.queryInfo.ids = [ 32 ]
			} else if (options.type === 'shoppingMall') {
				this.queryInfo.ids = [ 27 ]
			} else if (options.type === 'businessDistrict') {
				this.queryInfo.ids = [ 26 ]
			} else if (options.type === 'community') {
				this.queryInfo.ids = [ 29 ]
			}
			this.typeDropdownName = (this.dropdownList.find((i) => i.value[0] === this.queryInfo.ids[0]) || { name: '错误' }).name
		}
		this.getCombinationActivitiesList()
	},
	methods: {
		getCombinationActivitiesList(isLoadmore) {
			console.log(this.queryInfo)
			uni.showLoading()
			getPlatformComposeCanvasApi(this.queryInfo).then((res) => {
				this.combinationActivityTotal = res.data.length
				this.combinationActivityList = res.data
				// this.combinationActivityTotal = res.data.page.total
				// if (isLoadmore) {
				// 	this.combinationActivityList.push(...res.data.page.list)
				// } else {
				// 	this.combinationActivityList = res.data.page.list
				// }
				this.isEmpty = this.combinationActivityList.length === 0
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		}
	},
	onReachBottom() {
		if (this.combinationActivityList.length < this.combinationActivityTotal) {
			++this.queryInfo.page
			this.getCombinationActivitiesList(true)
		}
	}
}
</script>

<style lang="less" scoped>
.combination-activities-container {
	min-height: 100vh;
	background-color: #f4f4f4;
	box-sizing: border-box;

	/deep/ .tui-countdown-box {
		.tui-colon-pad {
			padding: 0 6rpx !important;
		}
	}

	/deep/ .tui-dropdown-view {
		height: auto !important;
		width: fit-content;
		margin-left: -48rpx;
	}

	.middle-btn {
		/deep/ .tui-btn {
			color: #ff380c;
			background: #feeeee !important;
		}
	}

	/deep/ .j-header-container {
		padding: 24rpx 0 10rpx;
		background-color: #ffffff;

		.title {
			font-size: 36rpx;
			color: #222229;
			font-weight: normal;
		}
	}
}
</style>
