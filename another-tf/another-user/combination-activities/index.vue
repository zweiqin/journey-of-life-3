<template>
	<view class="combination-activities-container">
		<JHeader title="组合活动专区" width="50" height="50"></JHeader>
		<view style="padding: 18rpx;">
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
									:checked="queryInfo.stateList.includes(item.value)" :value="item.value"
									color="#07c160" border-color="#999"
								>
								</tui-checkbox>
								<text>{{ item.name }}</text>
							</view>
						</tui-list-cell>
					</tui-label>
				</view>
			</tui-checkbox-group>
		</view>

		<view style="margin-top: 20rpx;">
			<scroll-view scroll-x>
				<view
					v-if="combinationActivityList && combinationActivityList.length"
					style="display: flex;align-items: stretch;white-space: nowrap;padding: 0 0 0 18rpx;"
				>
					<view
						v-for="(item, index) in combinationActivityList" :key="index"
						style="margin-right: 18rpx;padding: 18rpx;color: #9499a8;font-size: 28rpx;text-align: center;border-radius: 24rpx;"
						:style="{ backgroundColor: index === activeSession ? '#dddddd' : '#555555' }"
						@click="activeSession = index"
					>
						<view
							:style="{ color: [ 4 ].includes(item.state) ? '#999999' : index === activeSession ? '#C83732' : '#ffffff' }"
						>
							{{ item.composeName || '--' }}
						</view>
						<view :style="{ color: index === activeSession ? '#000000' : '#ffffff' }">
							<view v-if="[ 4 ].includes(item.state)">已结束</view>
							<view v-else-if="[ 3 ].includes(item.state)">抢购中</view>
							<view v-else-if="[0, 1, 2].includes(item.state)">即将开始</view>
						</view>
						<view
							v-if="[0, 1, 2].includes(item.state)"
							:style="{ color: index === activeSession ? '#000000' : '#ffffff' }"
						>
							{{ item.startTime || '--' }}
						</view>
					</view>
				</view>
			</scroll-view>
			<view
				v-if="combinationActivityList[activeSession]"
				style="margin: 20rpx 20rpx 0;padding: 20rpx;background-color: #eeeeee;border-radius: 20rpx;"
			>
				<view>
					<view
						v-if="[ 3 ].includes(combinationActivityList[activeSession].state)"
						style="display: flex;align-items: center;justify-content: center;"
					>
						<text>距离结束：</text>
						<tui-countdown
							:size="24" :colon-size="24" colon-color="#1A66FF" color="#1A66FF"
							border-color="transparent"
							days :is-colon="false"
							:time="Math.floor((Date.parse(combinationActivityList[activeSession].endTime) - Date.now()) / 1000)"
						></tui-countdown>
					</view>
					<view
						v-else-if="[0, 1, 2].includes(combinationActivityList[activeSession].state)"
						style="display: flex;align-items: center;justify-content: center;"
					>
						<text>距离开始：</text>
						<tui-countdown
							:size="24" :colon-size="24" colon-color="#1A66FF" color="#1A66FF"
							border-color="transparent"
							days :is-colon="false"
							:time="Math.floor((Date.parse(combinationActivityList[activeSession].startTime) - Date.now()) / 1000)"
						></tui-countdown>
					</view>
				</view>
				<view style="display: flex;align-items: center;margin-top: 12rpx;color: #ffffff;font-size: 30rpx;">
					<view style="padding: 6rpx 12rpx;background-color: #1b9fff;margin-right: 12rpx;border-radius: 8rpx;">
						<text v-if="combinationActivityList[activeSession].ifAdd">可叠加优惠券</text>
						<text v-else>不可叠加优惠券</text>
					</view>
					<view style="padding: 6rpx 12rpx;background-color: #1b9fff;margin-right: 12rpx;border-radius: 8rpx;">
						<text v-if="combinationActivityList[activeSession].ifLimit">限购{{ combinationActivityList[activeSession].limitNumber }}件/人</text>
						<text v-else>无限购</text>
					</view>
					<!-- <view style="padding: 6rpx 12rpx;background-color: #1b9fff;margin-right: 12rpx;border-radius: 8rpx;">
						<text v-if="combinationActivityList[activeSession].ifBond">商家需要保证金￥{{ combinationActivityList[activeSession].bondMoney }}</text>
						<text v-else>商家无需保证金</text>
						</view> -->
				</view>
				<view
					v-if="combinationActivityList[activeSession].content"
					style="margin-top: 12rpx;word-break: break-all;font-size: 26rpx;"
				>
					赠送规则：{{ combinationActivityList[activeSession].content }}
				</view>
				<view
					v-if="combinationActivityList[activeSession].remark"
					style="margin-top: 12rpx;word-break: break-all;font-size: 26rpx;"
				>
					备注：{{ combinationActivityList[activeSession].remark }}
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

		<view
			v-if="combinationActivityList[activeSession] && combinationActivityList[activeSession].products.length"
			style="margin: 4rpx 20rpx 0;"
		>
			<view
				v-for="(item, index) in combinationActivityList[activeSession].products" :key="index"
				style="display: flex;padding: 20rpx;margin-bottom: 20rpx;background: #ffefff;border-radius: 10rpx;"
			>
				<image :src="common.seamingImgUrl(item.image)" style="width: 260rpx;height: 260rpx;margin-right: 30rpx;" />
				<view style="flex: 1;">
					<view
						style="font-size: 28rpx;overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
					>
						{{ item.productName }}
					</view>
					<view style="display: flex;justify-content: space-between;align-items: center;margin-top: 10rpx;">
						<view>
							<view style="display: flex;align-items: flex-end;">
								<view style="font-size: 26rpx;color: #FF7800;">活动价</view>
								<view style="display: flex;align-items: flex-end;color: #C83732;">
									<view style="font-size: 24rpx;">￥</view>
									<view style="font-size: 36rpx;">{{ item.price }}</view>
								</view>
							</view>
							<text style="margin-top: 20rpx;font-size: 24rpx;text-decoration: line-through;color: #cccccc;">
								原价: ￥{{ item.originalPrice }}
							</text>
						</view>
						<view>
							<view
								v-if="[ 3 ].includes(combinationActivityList[activeSession].state)"
								style="min-width: 132rpx;padding: 12rpx 10rpx;text-align: center;background: linear-gradient(90deg, #C83732 0%, #E25C44 100%);box-shadow: 0rpx 6rpx 12rpx rgba(233, 0, 0, 0.3);border-radius: 10rpx;"
								@click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${item.shopId}&productId=${item.productId}&skuId=${item.skuId}`)"
							>
								<view style="color: #333333;">去抢购</view>
								<view style="margin-top: 6rpx;border-radius: 10rpx;overflow: hidden;">
									<progress
										activeColor="#c5aa7b"
										:percent="item.total ? Math.round((parseFloat(item.limitStockNumber || item.stockNumber) / parseFloat(item.total)) * 10000) / 100 : 0"
										active stroke-width="5"
									/>
								</view>
							</view>
							<view
								v-else-if="[0, 1, 2].includes(combinationActivityList[activeSession].state)"
								style="min-width: 132rpx;padding: 12rpx 10rpx;text-align: center;background: linear-gradient(90deg, #29C790 0%, #75D98C 100%);box-shadow: 0 6rpx 12rpx rgba(52, 203, 144, 0.3);border-radius: 10rpx;"
							>
								<view style="color: #666666;">即将开始</view>
								<view style="margin-top: 6rpx;border-radius: 10rpx;overflow: hidden;">
									<progress
										activeColor="#c5aa7b"
										:percent="item.total ? Math.round((parseFloat(item.limitStockNumber || item.stockNumber) / parseFloat(item.total)) * 10000) / 100 : 0"
										active stroke-width="5"
									/>
								</view>
							</view>
						</view>
					</view>
					<view style="display: flex;align-items: center;flex-wrap: wrap;margin-top: 10rpx;">
						<view
							v-if="item.discount"
							style="width: fit-content;padding: 0 8rpx;margin: 10upx 6upx 0 0;color: #C5AA7B;font-size: 26rpx;border: 2rpx solid #E4E5E6;"
						>
							直降 {{ item.discount }} 元
						</view>
						<view
							v-if="item.limitNumber"
							style="width: fit-content;padding: 0 8rpx;margin: 10upx 6upx 0 0;color: #C5AA7B;font-size: 26rpx;border: 2rpx solid #E4E5E6;"
						>
							限量{{ item.limitNumber }}件
						</view>
						<view
							v-if="item.beeCoin"
							style="width: fit-content;padding: 6upx 12upx;margin: 10upx 6upx 0 0;background-color: #f0f0f0;font-size: 28upx;color: #fa5151;border-radius: 22upx;"
						>
							赠送 {{ item.beeCoin }} 消费金
						</view>
					</view>
					<view style="margin-top: 10rpx;font-size: 26rpx;text-align: right;">
						<text v-if="item.workUsers" style="margin-right: 10rpx;">已拼{{ item.workUsers }}人</text>
						<text>剩余{{ item.limitStockNumber || item.stockNumber }}件</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getPlatformComposeCanvasApi } from '../../../api/anotherTFInterface'
export default {
	name: 'CombinationActivities',
	data() {
		return {
			isEmpty: false,
			combinationActivityList: [],
			combinationActivityTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20,
				// ids: [], // 不传查全部
				shopId: '',
				stateList: ['0', '1', '2', '3', '4']
			},
			activeSession: 0
		}
	},
	onLoad(options) {
		if (options.shopId) this.queryInfo.shopId = Number(options.shopId)
		if (options.combinationId) {
			this.queryInfo.ids = [ Number(options.combinationId) ]
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
	background-color: #f8f9fb;
	box-sizing: border-box;

	/deep/ .tui-countdown-box {
		.tui-colon-pad {
			padding: 0 6rpx !important;
		}
	}

	/deep/ .j-header-container {
		padding: 24rpx 0 10rpx;

		.title {
			font-size: 36rpx;
			color: #222229;
			font-weight: normal;
		}
	}
}
</style>
