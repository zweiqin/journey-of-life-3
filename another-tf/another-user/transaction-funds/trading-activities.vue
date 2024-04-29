<template>
	<view class="trading-activities-container">
		<JHeader :dark="false" title="交易金专区" width="50" height="50"></JHeader>
		<view style="margin-top: 20rpx;">
			<scroll-view scroll-x>
				<view
					v-if="spikeLikeList && spikeLikeList.length"
					style="display: flex;align-items: stretch;white-space: nowrap;padding: 0 0 0 18rpx;"
				>
					<view
						v-for="(item, index) in spikeLikeList" :key="index"
						style="margin-right: 18rpx;padding: 18rpx;color: #9499a8;font-size: 28rpx;text-align: center;border-radius: 24rpx;"
						:style="{ backgroundColor: index === activeSession ? '#ffffff' : '#555555' }"
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
			<view
				v-if="spikeLikeList[activeSession]"
				style="margin: 20rpx 20rpx 0;padding: 20rpx;background-color: #ffffff;border-radius: 20rpx;"
			>
				<view>
					<view
						v-if="[ 3 ].includes(spikeLikeList[activeSession].state)"
						style="display: flex;align-items: center;justify-content: center;"
					>
						<text>距离结束：</text>
						<tui-countdown
							:size="24" :colon-size="24" colon-color="#1A66FF" color="#1A66FF"
							border-color="transparent" days :is-colon="false"
							:time="Math.floor((Date.parse(spikeLikeList[activeSession].endTime) - Date.now()) / 1000)"
						></tui-countdown>
					</view>
					<view
						v-else-if="[0, 1, 2].includes(spikeLikeList[activeSession].state)"
						style="display: flex;align-items: center;justify-content: center;"
					>
						<text>距离开始：</text>
						<tui-countdown
							:size="24" :colon-size="24" colon-color="#1A66FF" color="#1A66FF"
							border-color="transparent" days :is-colon="false"
							:time="Math.floor((Date.parse(spikeLikeList[activeSession].startTime) - Date.now()) / 1000)"
						></tui-countdown>
					</view>
				</view>
				<view style="display: flex;align-items: center;margin-top: 12rpx;color: #ffffff;font-size: 30rpx;">
					<view style="padding: 6rpx 12rpx;background-color: #1b9fff;margin-right: 12rpx;border-radius: 8rpx;">
						<text v-if="spikeLikeList[activeSession].ifAdd">可叠加优惠券</text>
						<text v-else>不可叠加优惠券</text>
					</view>
					<view style="padding: 6rpx 12rpx;background-color: #1b9fff;margin-right: 12rpx;border-radius: 8rpx;">
						<text v-if="spikeLikeList[activeSession].ifLimit">限购{{ spikeLikeList[activeSession].limitNumber }}件/人</text>
						<text v-else>无限购</text>
					</view>
					<view style="padding: 6rpx 12rpx;background-color: #1b9fff;margin-right: 12rpx;border-radius: 8rpx;">
						<text v-if="spikeLikeList[activeSession].ifBond">需要保证金￥{{ spikeLikeList[activeSession].bondMoney }}</text>
						<text v-else>无需保证金</text>
					</view>
				</view>
				<view
					v-if="spikeLikeList[activeSession].remark"
					style="margin-top: 12rpx;word-break: break-all;font-size: 26rpx;"
				>
					备注：{{ spikeLikeList[activeSession].remark }}
				</view>
			</view>
		</view>
		<view style="padding-bottom: 45rpx;">
			<LoadingMore
				:status="!isEmpty && !spikeLikeList.length
					? 'loading' : !isEmpty && spikeLikeList.length && (spikeLikeList.length >= spikeLikeTotal) ? '' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="isEmpty" :fixed="false" style="margin-top: 60rpx;">暂无相关活动</tui-no-data>
		</view>

		<view
			v-if="spikeLikeList[activeSession] && spikeLikeList[activeSession].products.length"
			style="margin: 4rpx 20rpx 0;"
		>
			<view
				v-for="(item, index) in spikeLikeList[activeSession].products" :key="index"
				style="display: flex;padding: 20rpx;margin-bottom: 20rpx;background: #FFFFFF;border-radius: 10rpx;"
			>
				<image
					:src="common.seamingImgUrl(item.image)"
					style="width: 260rpx;height: 260rpx;margin-right: 30rpx;"
				/>
				<view style="flex: 1;">
					<view
						style="font-size: 28rpx;overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
					>
						{{ item.productName }}
					</view>
					<view
						style="width: fit-content;padding: 0 8rpx;margin-top: 12rpx;color: #C5AA7B;font-size: 26rpx;border: 2rpx solid #E4E5E6;"
					>
						直降 {{ item.discount }} 元 <text v-if="item.limitNumber" style="margin-left: 8rpx;">
							/ 限量{{ item.limitNumber }}件
						</text>
					</view>
					<view style="display: flex;justify-content: space-between;align-items: center;margin-top: 12rpx;">
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
								v-if="[ 3 ].includes(spikeLikeList[activeSession].state)"
								style="min-width: 132rpx;padding: 12rpx 10rpx;text-align: center;background: linear-gradient(90deg, #C83732 0%, #E25C44 100%);box-shadow: 0rpx 6rpx 12rpx rgba(233, 0, 0, 0.3);border-radius: 10rpx;"
								@click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${item.shopId}&productId=${item.productId}&skuId=${item.skuId}`)"
							>
								<view style="color: #cccccc;">去抢购</view>
								<view style="margin-top: 6rpx;border-radius: 10rpx;overflow: hidden;">
									<progress
										activeColor="#c5aa7b"
										:percent="item.total ? Math.round((parseFloat(item.limitStockNumber || item.stockNumber) / parseFloat(item.total)) * 10000) / 100 : 0"
										active stroke-width="5"
									/>
								</view>
							</view>
							<view
								v-else-if="[0, 1, 2].includes(spikeLikeList[activeSession].state)"
								style="min-width: 132rpx;padding: 12rpx 10rpx;text-align: center;background: linear-gradient(90deg, #29C790 0%, #75D98C 100%);box-shadow: 0 6rpx 12rpx rgba(52, 203, 144, 0.3);border-radius: 10rpx;"
							>
								<view style="color: #cccccc;">即将开始</view>
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
					<view style="margin-top: 12rpx;font-size: 26rpx;text-align: right;">
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
			spikeLikeList: [],
			spikeLikeTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20,
				ids: [ ...new Array(75).toString()
					.split(',')
					.map((item, index) => index + 135) ],
				shopSeckillId: 0
			},
			activeSession: 0
		}
	},
	onLoad(options) {
		if (options.tradingId) {
			this.queryInfo.ids = [ Number(options.tradingId) ]
		}
		this.getShopSeckillList()
	},
	methods: {
		getShopSeckillList(isLoadmore) {
			uni.showLoading()
			getPlatformBeeCurrencyApi(this.queryInfo).then((res) => {
				this.spikeLikeTotal = res.data.length
				this.spikeLikeList = res.data
				// this.spikeLikeTotal = res.data.page.total
				// if (isLoadmore) {
				// 	this.spikeLikeList.push(...res.data.page.list)
				// } else {
				// 	this.spikeLikeList = res.data.page.list
				// }
				this.isEmpty = this.spikeLikeList.length === 0
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		}
	},
	onReachBottom() {
		if (this.spikeLikeList.length < this.spikeLikeTotal) {
			++this.queryInfo.page
			this.getShopSeckillList(true)
		}
	}
}
</script>

<style lang="less" scoped>
.trading-activities-container {
	min-height: 100vh;
	background-color: #333333;
	box-sizing: border-box;

	/deep/ .tui-countdown-box {
		.tui-colon-pad {
			padding: 0 6rpx!important;
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
