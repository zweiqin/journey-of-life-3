<template>
	<view class="spike-list-container">
		<JHeader :dark="false" title="秒杀专区" width="50" height="50"></JHeader>
		<view v-if="queryInfo.shopId">
			<view v-if="spikeLikeData.state === 1" style="display: flex;align-items: center;justify-content: center;">
				<text>距离结束：</text>
				<tui-countdown
					:size="24" :colon-size="24" colon-color="#1A66FF" color="#1A66FF"
					border-color="transparent"
					:time="Math.floor(spikeLikeData.time / 1000)"
				></tui-countdown>
			</view>
			<view v-else style="display: flex;align-items: center;justify-content: center;">
				<text>距离开始：</text>
				<tui-countdown
					:size="24" :colon-size="24" colon-color="#1A66FF" color="#1A66FF"
					border-color="transparent"
					:time="Math.floor(spikeLikeData.enableTime / 1000)"
				></tui-countdown>
			</view>
		</view>
		<view v-else style="color: #ffffff;">
			<scroll-view class="tabs-nav" scroll-x="true">
				<view class="ul">
					<view
						v-for="(item, index) in seckillSessionData" :key="index" class="li"
						:class="{ active: index === activeSession }" @click="handleChangeSeckillTab(index)"
					>
						<view class="timeItem">
							<view class="date" :class="{ endCls: Date.now() > Date.parse(item.split('|')[1]) }">
								{{ item.split('|')[0] }}
							</view>
							<view v-if="Date.now() >= Date.parse(item.split('|')[1])" class="state">已结束</view>
							<view v-if="Date.now() >= Date.parse(item.split('|')[0])" class="state">抢购中</view>
							<view v-if="Date.now() < Date.parse(item.split('|')[0])" class="state">即将开始</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="spikeList">
			<view v-if="spikeLikeList && spikeLikeList.length">
				<view v-for="(item, index) in spikeLikeList" :key="index" class="listItem">
					<image
						:src="common.seamingImgUrl(item.productImage) || common.seamingImgUrl(item.image)"
						class="itemBox default-img"
					/>
					<view class="itemInfo">
						<view
							style="font-size: 28rpx;overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
						>
							{{ item.productName }}
						</view>
						<view v-if="queryInfo.shopId" class="number">直降 {{ item.discount }} 元 / 剩余{{ item.stockNumber }}件</view>
						<view v-else class="number">直降 {{ item.discount }} 元 / 剩余{{ item.stockNumber }}件</view>
						<view class="originalPrice">原价: ¥{{ item.originalPrice }}</view>
						<view class="price">
							<view class="currentPrice flex-items font-color-FF7800">
								<ATFActivityImage :type="item.activityType"></ATFActivityImage>
								<view class="flex-row-plus flex-items priceInfo">
									<label class="fs24">￥</label>
									<label class="fs36">{{ item.price }}</label>
								</view>
							</view>
							<view
								v-if="spikeLikeData.state === 1 || (platformSeckillList[activeSession] && platformSeckillList[activeSession].state === 3)"
								class="snapUpBtn"
								@click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${item.shopId}&productId=${item.productId}&skuId=${item.skuId}`)"
							>
								<view class="btnText">去抢购</view>
								<view class="progressBox">
									<progress
										activeColor="#c5aa7b"
										:percent="item.total ? Math.round((parseFloat(item.saleNumber || item.stockNumber) / parseFloat(item.total)) * 10000) / 100 : 0"
										active stroke-width="5"
									/>
								</view>
							</view>
							<view
								v-if="spikeLikeData.state === 0 || (platformSeckillList[activeSession] && platformSeckillList[activeSession].state === 2)"
								class="snapUpBtn"
								:class="{ btnStyle1: spikeLikeData.state === 0 || (platformSeckillList[activeSession] && platformSeckillList[activeSession].state === 2) }"
							>
								<view class="btnText">即将开始</view>
								<view class="progressBox">
									<progress
										activeColor="#c5aa7b"
										:percent="item.total ? Math.round((parseFloat(item.saleNumber || item.stockNumber) / parseFloat(item.total)) * 10000) / 100 : 0"
										active stroke-width="5"
									/>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view style="padding-bottom: 45rpx;">
				<LoadingMore
					:status="!isEmpty && !spikeLikeList.length
						? 'loading' : !isEmpty && spikeLikeList.length && (spikeLikeList.length >= spikeLikeTotal) ? 'no-more' : ''"
				>
				</LoadingMore>
				<tui-no-data v-if="isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无数据</tui-no-data>
			</view>
		</view>
	</view>
</template>

<script>
import { getQueryProductListBySessionApi, getQueryPlatformSeckillListApi, getPlatformSeckillsCanvasApi, getPlatformSeckillsQuerySessionApi, getShopSeckillIndexApi } from '../../../api/anotherTFInterface'

export default {
	name: 'SpikeList',
	data() {
		return {
			isEmpty: false,
			spikeLikeList: [],
			spikeLikeTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20,
				shopId: 0,
				shopSeckillId: 0
			},
			// 店铺秒杀活动
			spikeLikeData: {},
			// 平台秒杀活动
			activeSession: 0,
			seckillSessionData: [],
			platformSeckillList: []
		}
	},
	onLoad(options) {
		if (options.shopId) { //  && options.shopSeckillId
			this.queryInfo.shopId = Number(options.shopId)
			this.queryInfo.shopSeckillId = Number(options.shopSeckillId)
		}
	},
	onShow() {
		this.spikeLikeList = []
		if (this.queryInfo.shopId) {
			this.queryInfo.page = 1
			this.queryInfo.pageSize = 10
			this.getShopSeckillList()
		} else {
			this.activeSession = 0
			this.seckillSessionData = []
			getPlatformSeckillsQuerySessionApi({})
				.then((res) => {
					this.seckillSessionData = res.data
				})
			getQueryPlatformSeckillListApi({}).then((res) => {
				this.platformSeckillList = res.data
				this.getPlatformSeckillsData()
			})
		}
	},
	methods: {
		handleChangeSeckillTab(index) {
			if (this.activeSession === index) return
			this.activeSession = index
			this.spikeLikeList = []
			this.getPlatformSeckillsData()
		},
		// 平台首页根据seckillId查询对应的秒杀商品列表
		getPlatformSeckillsData() {
			uni.showLoading()
			getPlatformSeckillsCanvasApi({ seckillId: this.platformSeckillList[this.activeSession].seckillId })
				.then((res) => {
					uni.hideLoading()
					if (res.data[this.activeSession] && res.data[this.activeSession].products && res.data[this.activeSession].products.length) this.spikeLikeList = res.data[this.activeSession].products
					this.isEmpty = this.spikeLikeList.length === 0
				})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		// 获取店铺更多秒杀
		getShopSeckillList(isLoadmore) {
			uni.showLoading()
			getShopSeckillIndexApi(this.queryInfo).then((res) => {
				this.spikeLikeData = res.data
				this.spikeLikeTotal = res.data.page.total
				if (isLoadmore) {
					this.spikeLikeList.push(...res.data.page.list)
				} else {
					this.spikeLikeList = res.data.page.list
				}
				this.isEmpty = this.spikeLikeList.length === 0
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		}
		// // 获取首页更多秒杀
		// getSpikeLike() {
		// 	uni.showLoading()
		// 	getQueryProductListBySessionApi({
		// 		page: this.queryInfo.page,
		// 		pageSize: this.queryInfo.pageSize,
		// 		session: this.seckillSessionData[this.activeSession].substring(0, 16)
		// 	}).then(res => {
		// 		uni.hideLoading()
		// 		this.spikeLikeData = res.data
		// 		if (res.data.list.length === 0) {
		// 			this.page = this.page
		// 		} else {
		// 			this.spikeLikeList = this.spikeLikeList.concat(res.data.list)
		// 		}
		// 	})
		// },
	},
	onReachBottom() {
		if (this.queryInfo.shopId) {
			if (this.spikeLikeList.length < this.spikeLikeTotal) {
				++this.queryInfo.page
				this.getShopSeckillList(true)
			}
		}
	}
}
</script>

<style lang="less" scoped>
.spike-list-container {
	padding: 0 20rpx;
	min-height: 100vh;
	background-color: #333333;
	box-sizing: border-box;

	/deep/ .j-header-container {
		padding: 24rpx 0 10rpx;

		.title {
			font-size: 36rpx;
			font-weight: normal;
		}
	}

	.spikeList {
		margin-top: 20rpx;

		.listItem {
			display: flex;
			padding: 20rpx;
			margin-bottom: 20rpx;
			background: #FFFFFF;

			.itemBox {
				width: 260rpx;
				height: 260rpx;
				margin-right: 30rpx;
			}

			.itemInfo {
				flex: 1;

				.number {
					color: #C5AA7B;
					font-size: 26rpx;
					height: 40rpx;
					background: #FFFFFF;
					border: 2rpx solid #E4E5E6;
					font-weight: 400;
					display: inline;
					padding: 0 5rpx;
				}

				.originalPrice {
					font-size: 24rpx;
					margin-top: 20rpx;
					text-decoration: line-through;
					color: #CCCCCC;
				}

				.price {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.priceInfo {
						font-size: 40rpx;
						color: #C83732;
					}

					.snapUpBtn {
						width: 160rpx;
						height: 84rpx;
						text-align: center;
						background: linear-gradient(90deg, #C83732 0%, #E25C44 100%);
						box-shadow: 0rpx 6rpx 12rpx rgba(233, 0, 0, 0.3);
						border-radius: 10rpx;

						.progressBox {
							width: 82%;
							margin: 0 auto;
							border-radius: 10rpx;
							overflow: hidden
						}

						.btnText {
							color: #FFFFFF;
							font-weight: 400;
							opacity: 0.5;
							margin: 10rpx 0;
						}
					}

					.btnStyle1 {
						background: linear-gradient(90deg, #29C790 0%, #75D98C 100%);
						box-shadow: 0 6rpx 12rpx rgba(52, 203, 144, 0.3);
					}
				}
			}
		}
	}

	.tabs-nav {
		margin-top: 20rpx;

		.ul {
			white-space: nowrap;

			.li {
				display: inline-block;
				margin-left: 60rpx;
				font-size: 32rpx;
				color: #9499a8;
				position: relative;
				padding-bottom: 18rpx;

				.timeItem {
					text-align: center;

					.date {
						font-size: 24rpx;
						color: #FFFFFF;
						width: 150rpx;
						white-space: normal;
					}

					.state {
						font-size: 24rpx;
						color: #999999;
						display: inline-block;
					}

					.endCls {
						color: #999999;
					}
				}
			}

			.active {
				.timeItem {
					.date {
						color: #C83732;
						width: 150rpx;
						white-space: normal;
					}

					.state {
						display: inline-block;
						padding: 0 10rpx;
						color: #FFFFFF;
						background: #C83732;
					}
				}
			}
		}
	}
}
</style>
