<template>
	<view class="trading-activities-container">
		<JHeader title="消费金专区" width="50" height="50"></JHeader>
		<view style="margin-top: 20rpx;">
			<scroll-view scroll-x>
				<view
					v-if="tradingActivityList && tradingActivityList.length"
					style="display: flex;align-items: stretch;white-space: nowrap;padding: 0 0 0 18rpx;"
				>
					<view
						v-for="(item, index) in tradingActivityList" :key="index"
						style="margin-right: 18rpx;padding: 18rpx;color: #9499a8;font-size: 28rpx;text-align: center;border-radius: 24rpx;"
						:style="{ backgroundColor: index === activeSession ? '#dddddd' : '#555555' }"
						@click="activeSession = index"
					>
						<view
							:style="{ color: [ 4 ].includes(item.state) ? '#999999' : index === activeSession ? '#C83732' : '#ffffff' }"
						>
							{{ item.currencyName || '--' }}
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
			<!-- <view
				v-if="tradingActivityList[activeSession]"
				style="margin: 20rpx 20rpx 0;padding: 20rpx;background-color: #eeeeee;border-radius: 20rpx;"
				>
				<view>
				<view
				v-if="[ 3 ].includes(tradingActivityList[activeSession].state)"
				style="display: flex;align-items: center;justify-content: center;"
				>
				<text>距离结束：</text>
				<tui-countdown
				:size="24" :colon-size="24" colon-color="#1A66FF" color="#1A66FF"
				border-color="transparent"
				days :is-colon="false"
				:time="Math.floor((Date.parse(tradingActivityList[activeSession].endTime) - Date.now()) / 1000)"
				></tui-countdown>
				</view>
				<view
				v-else-if="[0, 1, 2].includes(tradingActivityList[activeSession].state)"
				style="display: flex;align-items: center;justify-content: center;"
				>
				<text>距离开始：</text>
				<tui-countdown
				:size="24" :colon-size="24" colon-color="#1A66FF" color="#1A66FF"
				border-color="transparent"
				days :is-colon="false"
				:time="Math.floor((Date.parse(tradingActivityList[activeSession].startTime) - Date.now()) / 1000)"
				></tui-countdown>
				</view>
				</view>
				<view style="display: flex;align-items: center;margin-top: 12rpx;color: #ffffff;font-size: 30rpx;">
				<view style="padding: 6rpx 12rpx;background-color: #1b9fff;margin-right: 12rpx;border-radius: 8rpx;">
				<text v-if="tradingActivityList[activeSession].ifAdd">可叠加优惠券</text>
				<text v-else>不可叠加优惠券</text>
				</view>
				<view style="padding: 6rpx 12rpx;background-color: #1b9fff;margin-right: 12rpx;border-radius: 8rpx;">
				<text v-if="tradingActivityList[activeSession].ifLimit">限购{{ tradingActivityList[activeSession].limitNumber }}件/人</text>
				<text v-else>无限购</text>
				</view>
				<view style="padding: 6rpx 12rpx;background-color: #1b9fff;margin-right: 12rpx;border-radius: 8rpx;">
				<text v-if="tradingActivityList[activeSession].ifBond">商家需要保证金￥{{ tradingActivityList[activeSession].bondMoney }}</text>
				<text v-else>商家无需保证金</text>
				</view>
				</view>
				<view
				v-if="tradingActivityList[activeSession].content"
				style="margin-top: 12rpx;word-break: break-all;font-size: 26rpx;"
				>
				消费金赠送规则：{{ tradingActivityList[activeSession].content }}
				</view>
				<view
				v-if="tradingActivityList[activeSession].remark"
				style="margin-top: 12rpx;word-break: break-all;font-size: 26rpx;"
				>
				备注：{{ tradingActivityList[activeSession].remark }}
				</view>
				</view> -->
		</view>
		<view style="padding-bottom: 45rpx;">
			<LoadingMore
				:status="!isEmpty && !tradingActivityList.length
					? 'loading' : !isEmpty && tradingActivityList.length && (tradingActivityList.length >= tradingActivityTotal) ? 'no-more' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="isEmpty" :fixed="false" style="margin-top: 60rpx;">请期待消费金活动</tui-no-data>
		</view>

		<view
			v-if="tradingActivityList[activeSession] && tradingActivityList[activeSession].products.length"
			style="margin: 4rpx 20rpx 0;"
		>
			<view
				v-for="(item, index) in tradingActivityList[activeSession].products" :key="index"
				style="display: flex;padding: 20rpx;margin-bottom: 20rpx;background: #ffefff;border-radius: 10rpx;"
				@click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${item.shopId}&productId=${item.productId}&skuId=${item.skuId}`)"
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
								<!-- <view style="font-size: 26rpx;color: #FF7800;">活动价</view> -->
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
								v-if="[ 3 ].includes(tradingActivityList[activeSession].state)"
								style="min-width: 132rpx;padding: 12rpx 10rpx;text-align: center;background: linear-gradient(90deg, #C83732 0%, #E25C44 100%);box-shadow: 0rpx 6rpx 12rpx rgba(233, 0, 0, 0.3);border-radius: 10rpx;"
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
								v-else-if="[0, 1, 2].includes(tradingActivityList[activeSession].state)"
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
						<!-- <view
							v-if="item.discount"
							style="width: fit-content;padding: 0 8rpx;margin: 10upx 6upx 0 0;color: #C5AA7B;font-size: 26rpx;border: 2rpx solid #E4E5E6;"
							>
							直降 {{ item.discount }} 元
							</view> -->
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
import { getPlatformBeeCurrencyApi } from '../../../api/anotherTFInterface'
export default {
	name: 'TradingActivities',
	data() {
		return {
			isEmpty: false,
			tradingActivityList: [],
			tradingActivityTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20,
				ids: [ ...new Array(75).toString()
					.split(',')
					.map((i, index) => index + 105) ],
				shopSeckillId: 0
			},
			activeSession: 0
		}
	},
	onLoad(options) {
		if (options.tradingId) {
			this.queryInfo.ids = [ Number(options.tradingId) ]
		}
		this.getTradingActivitiesList()
	},
	methods: {
		getTradingActivitiesList(isLoadmore) {
			uni.showLoading()
			getPlatformBeeCurrencyApi(this.queryInfo).then((res) => {
				this.tradingActivityTotal = res.data.length
				this.tradingActivityList = res.data
				// this.tradingActivityTotal = res.data.page.total
				// if (isLoadmore) {
				// 	this.tradingActivityList.push(...res.data.page.list)
				// } else {
				// 	this.tradingActivityList = res.data.page.list
				// }
				this.isEmpty = this.tradingActivityList.length === 0
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		}
	},
	onReachBottom() {
		if (this.tradingActivityList.length < this.tradingActivityTotal) {
			++this.queryInfo.page
			this.getTradingActivitiesList(true)
		}
	}
}
</script>

<style lang="less" scoped>
.trading-activities-container {
	min-height: 100vh;
	background-color: #f8f9fb;
	box-sizing: border-box;

	/deep/ .tui-countdown-box {
		.tui-colon-pad {
			padding: 0 6rpx !important;
		}
	}

	/deep/ .j-header-wrapper {
		padding: 24rpx 0 10rpx;

		.title {
			font-size: 36rpx;
			color: #222229;
			font-weight: normal;
		}
	}
}
</style>
