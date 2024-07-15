<template>
	<view class="combination-activity-products-container">
		<JHeader
			:title="(combinationActivityList[0] && combinationActivityList[0].composeName) || '组合活动商品'" width="50"
			height="50"
		></JHeader>
		<view
			v-if="combinationActivityList[0] && combinationActivityList[0].products.length"
			style="margin: 48rpx 20rpx 0;"
		>
			<view
				v-for="(item, index) in combinationActivityList[0].products" :key="index"
				style="display: flex;padding: 20rpx;margin-bottom: 20rpx;background: #ffffff;border-radius: 20rpx;"
				@click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${item.shopId}&productId=${item.productId}&skuId=${item.skuId}`)"
			>
				<image
					:src="common.seamingImgUrl(item.image) || require('../../../static/images/new-user/fee.icon.png')"
					style="width: 180rpx;height: 180rpx;margin-right: 30rpx;border-radius: 10rpx;"
				/>
				<view style="flex: 1;">
					<view
						style="font-size: 28rpx;overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
					>
						{{ item.productName }}
					</view>
					<view style="display: flex;align-items: center;flex-wrap: wrap;margin-top: 10rpx;">
						<view
							v-if="item.discount"
							style="width: fit-content;padding: 0 8rpx;margin: 10rpx 6rpx 0 0;color: #C5AA7B;font-size: 26rpx;border: 2rpx solid #E4E5E6;"
						>
							直降 {{ item.discount }} 元
						</view>
						<view
							v-if="item.limitNumber"
							style="width: fit-content;padding: 0 8rpx;margin: 10rpx 6rpx 0 0;color: #C5AA7B;font-size: 26rpx;border: 2rpx solid #E4E5E6;"
						>
							限量{{ item.limitNumber }}件
						</view>
						<view
							v-if="item.beeCoin"
							style="width: fit-content;padding: 6rpx 12rpx;margin: 10rpx 6rpx 0 0;background-color: #f0f0f0;font-size: 28rpx;color: #fa5151;border-radius: 22rpx;"
						>
							赠送 {{ item.beeCoin }} 消费金
						</view>
					</view>
					<view style="margin-top: 14rpx;font-size: 26rpx;color: #929293;">
						<text v-if="item.workUsers" style="margin-right: 10rpx;">已拼{{ item.workUsers }}人</text>
						<text>剩余{{ item.limitStockNumber || item.stockNumber }}件</text>
					</view>
					<view style="display: flex;justify-content: space-between;align-items: center;margin-top: 16rpx;">
						<view style="display: flex;justify-content: space-between;align-items: center;">
							<view style="display: flex;align-items: flex-end;color: #ef530e;">
								<view style="font-size: 28rpx;">￥</view>
								<view style="font-size: 34rpx;">{{ item.price }}</view>
							</view>
							<text style="margin-left: 20rpx;font-size: 24rpx;text-decoration: line-through;color: #cccccc;">
								原价: ￥{{ item.originalPrice }}
							</text>
						</view>
						<view class="middle-btn">
							<tui-button
								v-if="[ 3 ].includes(combinationActivityList[0].state)" type="danger" width="144rpx"
								height="60rpx" shape="circle" :size="30"
							>
								去抢购
							</tui-button>
							<tui-button
								v-else-if="[0, 1, 2].includes(combinationActivityList[0].state)" type="danger" width="174rpx"
								height="60rpx" shape="circle" :size="30" disabled
							>
								即将开始
							</tui-button>
							<!-- <view style="margin-top: 6rpx;border-radius: 10rpx;overflow: hidden;">
								<progress
								activeColor="#c5aa7b"
								:percent="item.total ? Math.round((parseFloat(item.limitStockNumber || item.stockNumber) / parseFloat(item.total)) * 10000) / 100 : 0"
								active stroke-width="5"
								/>
								</view> -->
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else style="padding-bottom: 45rpx;">
			<tui-no-data :fixed="false" style="padding-top: 60rpx;">暂无活动商品～</tui-no-data>
		</view>
	</view>
</template>

<script>
import { mapGetters } from 'vuex'
import { getPlatformComposeCanvasApi } from '../../../api/anotherTFInterface'
export default {
	name: 'CombinationActivityProducts',
	data() {
		return {
			activityName: '',
			typeDropdownShow: false,
			typeDropdownName: '全部',
			isEmpty: false,
			combinationActivityList: [],
			combinationActivityTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20,
				ids: [],
				shopId: '',
				stateList: ['0', '1', '2', '3', '4'],
				address: [this.$store.state.location.locationInfo.province, this.$store.state.location.locationInfo.city, this.$store.state.location.locationInfo.district, this.$store.state.location.locationInfo.township].filter((i) => i).join('-')
			}
		}
	},
	onLoad(options) {
		if (options.combinationId) {
			this.queryInfo.ids = [ Number(options.combinationId) ]
		}
		this.getCombinationActivitiesList()
	},
	computed: {
		...mapGetters([ 'obtainLocationCount' ])
	},
	watch: {
		obtainLocationCount(val, oldVal) {
			const pages = getCurrentPages()
			if (pages[pages.length - 1].route === 'another-tf/another-user/combination-activities/combination-activity-products') this.getCombinationActivitiesList()
		}
	},
	methods: {
		getCombinationActivitiesList(isLoadmore) {
			console.log(this.queryInfo)
			uni.showLoading()
			getPlatformComposeCanvasApi({
				...this.queryInfo,
				address: [this.$store.state.location.locationInfo.province, this.$store.state.location.locationInfo.city, this.$store.state.location.locationInfo.district, this.$store.state.location.locationInfo.township].filter((i) => i).join('-')
			}).then((res) => {
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
.combination-activity-products-container {
	min-height: 100vh;
	background-color: #f4f4f4;
	box-sizing: border-box;

	.middle-btn {
		/deep/ .tui-btn {
			background: #ef530e !important;
		}
	}

	/deep/ .j-header-container {
		padding: 24rpx 0 10rpx;
		background-color: #ffffff;

		.title {
			font-size: 32rpx;
			color: #222229;
			font-weight: normal;
		}
	}
}
</style>
