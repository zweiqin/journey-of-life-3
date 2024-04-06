<template>
	<view class="spikeListBox">
		<JHeader :dark="false" title="秒杀专区" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view v-if="!queryInfo.shopSeckillId">
			<view class="spikeBg">
				秒杀专区
			</view>
			<view class="tabs-nav-warp spikeNav">
				<scroll-view class="tabs-nav" scroll-x="true">
					<view class="ul">
						<view
							v-for="(item, index) in querySessionData" :key="index" class="li" :class="{ active: index === active }"
							@click="changeTit(index, item)"
						>
							<view class="timeItem">
								<view class="date" :class="{ endCls: currentTime > item.endTime }">{{ item.startTime }}</view>
								<view v-if="currentTime > item.timestamp" class="state fs24">抢购中</view>
								<view v-if="currentTime < item.timestamp" class="state">即将开始</view>
								<view v-if="currentTime > item.endTime" class="state">已结束</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view v-else class="shopStopTime">
			<view v-if="spikeLikeData.state === 1" class="TimeBigBox">
				<label>距离结束：</label>
				<view class="flex-row-plus fs34 flex-items-plus mar-top-10">
					<view class="countdown-box flex-items-plus">{{ hou }}</view>
					<view class="font-color-999">:</view>
					<view class="countdown-box flex-items-plus">{{ min }}</view>
					<view class="font-color-999">:</view>
					<view class="countdown-box flex-items-plus">{{ sec }}</view>
				</view>
			</view>
			<view v-else class="TimeBigBox">
				<label>距离开始：</label>
				<view class="flex-row-plus fs34 flex-items-plus mar-top-10">
					<view class="countdown-box flex-items-plus">{{ hou }}</view>
					<view class="font-color-999">:</view>
					<view class="countdown-box flex-items-plus">{{ min }}</view>
					<view class="font-color-999">:</view>
					<view class="countdown-box flex-items-plus">{{ sec }}</view>
				</view>
			</view>
		</view>
		<view class="spikeList mar-top-20">
			<view v-if="spikeLikeList && spikeLikeList.length">
				<view v-for="(item, index) in spikeLikeList" :key="index" class="listItem">
					<view class="itemBox">
						<img :src="common.seamingImgUrl(item.productImage) || common.seamingImgUrl(item.image)" class="pic-img default-img">
					</view>
					<view class="itemInfo">
						<p>{{ item.productName }}</p>
						<view v-if="queryInfo.shopId" class="number">限量件 {{ item.discount }} / 剩余{{ item.stockNumber }}件</view>
						<view v-else class="number">限量件 {{ item.discount }} / 剩余{{ item.stockNumber }}件</view>
						<view class="originalPrice">原价: ¥{{ item.originalPrice }}</view>
						<view class="price">
							<view class="currentPrice flex-items font-color-FF7800">
								<view class="iconBox flex-items">
									<image src="../../../static/images/new-business/shop/spikeIcon.png"></image>
								</view>
								<view class="flex-row-plus flex-items priceInfo">
									<label class="fs24">￥</label>
									<label class="fs36">{{ item.price }}</label>
								</view>
							</view>
							<view
								v-if="spikeLikeData.state === 1 || (platformSeckillList[platformIndex] && platformSeckillList[platformIndex].state === 3)"
								class="snapUpBtn" @click="gogoodsDetails(item.shopId, item.productId, item.skuId)"
							>
								<view class="btnText">去抢购</view>
								<view class="progressBox">
									<progress
										activeColor="#FFFFFF" :percent="getPercent(item.saleNumber || item.stockNumber, item.total)"
										active stroke-width="5"
									/>
								</view>
							</view>
							<view
								v-if="spikeLikeData.state === 0 || (platformSeckillList[platformIndex] && platformSeckillList[platformIndex].state === 2)"
								class="snapUpBtn"
								:class="{ btnStyle1: spikeLikeData.state === 0 || (platformSeckillList[platformIndex] && platformSeckillList[platformIndex].state === 2) }"
							>
								<view class="btnText">即将开始</view>
								<view class="progressBox">
									<progress
										activeColor="#FFFFFF" :percent="getPercent(item.saleNumber || item.stockNumber, item.total)"
										active stroke-width="5"
									/>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view style="padding-bottom: 45upx;">
				<LoadingMore
					:status="!isEmpty && !spikeLikeList.length
						? 'loading' : !isEmpty && spikeLikeList.length && (spikeLikeList.length >= spikeLikeTotal) ? 'no-more' : ''"
				>
				</LoadingMore>
				<tui-no-data v-if="isEmpty" :fixed="false" style="margin-top: 60upx;">暂无数据</tui-no-data>
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
			spikeLikeData: {},
			hou: '00',
			min: '00',
			sec: '00',
			selectIndex: 0,
			size: 10,
			querySessionData: [],
			session: '',
			currentTime: '',
			active: 0,
			platformSeckillId: 0,
			platformSeckillList: [],
			ticker: null // 定时器
		}
	},
	onLoad(options) {
		this.currentTime = new Date().getTime()
		if (options.shopId && options.shopSeckillId) {
			this.queryInfo.shopId = options.shopId
			this.queryInfo.shopSeckillId = options.shopSeckillId
		} else {
			this.queryInfo.shopId = 0
			this.queryInfo.shopSeckillId = 0
		}
	},
	onShow() {
		this.queryInfo.page = 1,
		this.queryInfo.pageSize = 10,
		this.querySessionData = []
		this.spikeLikeList = []
		if (!this.queryInfo.shopId) {
			this.getQuerySession()
			this.getQueryPlatformSeckillData()
		} else {
			this.getShopSeckillList()
		}
	},
	beforeDestroy() {
		// 销毁前清楚定时器
		clearInterval(this.ticker)
	},
	methods: {
		changeTit(index, item) {
			if (this.active === index) {
				return false
			}
			this.active = index
			this.queryInfo.page = 1
			this.queryInfo.pageSize = 10
			this.session = item.time.substring(0, 16)
			this.spikeLikeList = []
			this.platformSeckillId = this.platformSeckillList[index].seckillId
			this.getPlatformSeckillsData(index)
		},
		// 查询秒杀列表
		getQueryPlatformSeckillData() {
			getQueryPlatformSeckillListApi({}).then((res) => {
				this.platformSeckillList = res.data
				this.platformSeckillId = res.data[0].seckillId
				this.getPlatformSeckillsData(0)
			})
		},
		// 平台首页根据seckillId查询对应的秒杀商品列表
		getPlatformSeckillsData(index) {
			uni.showLoading()
			getPlatformSeckillsCanvasApi({ seckillId: this.platformSeckillId })
				.then((res) => {
					uni.hideLoading()
					if (res.data[0].products === 0) {
					} else {
						this.spikeLikeList = res.data[index].products
					}
				})
				.catch((e) => {
					uni.hideLoading()
				})
		},

		// 平台秒杀头部时间
		getQuerySession() {
			getPlatformSeckillsQuerySessionApi({}).then((res) => {
				const arr = res.data
				arr.forEach((item) => {
					const obj = {}
					obj.time = item
					const date = new Date(this.getCaption(item, 0).replace(/-/g, '/'))
					const endDate = new Date(this.getCaption(item, 1).replace(/-/g, '/'))
					obj.timestamp = date.getTime()
					obj.endTime = endDate.getTime()
					obj.startTime = item.substring(5, 16)
					this.querySessionData.push(obj)
				})
				this.session = this.querySessionData[0].time.substring(0, 16)
			})
		},
		// 时间处理
		getCaption(obj, state) {
			var index = obj.lastIndexOf('\|')
			if (state == 0) {
				obj = obj.substring(0, index)
			} else {
				obj = obj.substring(index + 1, obj.length)
			}
			return obj
		},
		// 跳转商品详情页
		gogoodsDetails(shopId, productId, skuId) {
			uni.navigateTo({
				url: '/another-tf/another-serve/goodsDetails/index?shopId=' + shopId + '&productId=' + productId + '&skuId=' + skuId
			})
		},
		// 按钮进度条
		getPercent(num, total) {
			num = parseFloat(num)
			total = parseFloat(total)
			if (isNaN(num) || isNaN(total)) {
				return '-'
			}
			return total <= 0 ? '0%' : Math.round((num / total) * 10000) / 100.0
		},
		// // 获取首页更多秒杀
		// getSpikeLike() {
		// 	uni.showLoading({
		// 		mask: true,
		// 		title: '数据加载中...',
		// 	})
		// 	let param = {
		// 		page: this.queryInfo.page,
		// 		pageSize: this.queryInfo.pageSize,
		// 		session: this.session
		// 	}
		// 	getQueryProductListBySessionApi(param).then(res => {
		// 		uni.hideLoading()
		// 		this.spikeLikeData = res.data
		// 		if (res.data.list.length === 0) {
		// 			this.page = this.page
		// 		} else {
		// 			this.spikeLikeList = this.spikeLikeList.concat(res.data.list)
		// 		}
		// 	})
		// },
		// 获取店铺更多秒杀
		getShopSeckillList(isLoadmore) {
			uni.showLoading()
			getShopSeckillIndexApi(this.queryInfo).then((res) => {
				this.spikeLikeData = res.data
				if (this.ticker) { // 这一段是防止进入页面出去后再进来计时器重复启动
					clearInterval(this.ticker)
				}
				this.ticker = setInterval(() => {
					if (this.spikeLikeData.time > 0) {
						this.shopCountDown(this.spikeLikeData.time)
						this.spikeLikeData.time -= 1000
					}
					if (this.spikeLikeData.enableTime > 0) {
						this.shopCountDown(this.spikeLikeData.enableTime)
						this.spikeLikeData.enableTime -= 1000
					}
				}, 1000)
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
		},
		// 处理店铺秒杀倒计时
		shopCountDown(timeAll) {
			const msec = timeAll
			let hou = parseInt(msec / 3600000)
			let min = parseInt((msec % 3600000) / 60000)
			let sec = parseInt(((msec % 3600000) % 60000) / 1000)
			if (hou < 10) {
				hou = '0' + hou
			}
			if (min < 10) {
				min = '0' + min
			}
			if (sec < 10) {
				sec = '0' + sec
			}
			this.hou = hou
			this.min = min
			this.sec = sec
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
.spikeListBox {
	padding: 20rpx;
	min-height: 100vh;
	background-color: #333333;
	box-sizing: border-box;

	.shopStopTime {
		text-align: center;
		color: #FFFFFF;

		.TimeBigBox {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.countdown-box {
			padding: 0 8rpx;
			height: 48rpx;
			color: #FFFFFF;
			background: linear-gradient(90deg, #C83732 0%, #E25C44 100%);
			margin: 10rpx;
		}
	}

	.spikeBg {
		margin: 50rpx auto;
		font-size: 40upx;
		font-weight: bold;
		text-align: center;
		color: #ffffff;
	}

	.spikeList {
		.listItem {
			display: flex;
			padding: 20upx;
			margin-bottom: 20upx;
			background: #FFFFFF;

			&:last-child {
				border-bottom: none;
			}

			.itemBox {
				width: 260upx;
				height: 260upx;
				margin-right: 30upx;

				img {
					width: 100%;
					height: 100%;
				}
			}

			.itemInfo {
				flex: 1;

				.iconBox {
					image {
						width: 58rpx;
						height: 36rpx;
					}
				}

				p {
					font-size: 26upx;
					color: #333333;
					line-height: 35upx;
					height: 70rpx;
					margin-bottom: 20upx;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					line-clamp: 2;
					-webkit-box-orient: vertical;
				}

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
					font-size: 24upx;
					margin-top: 20upx;
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
						width: 160upx;
						height: 84upx;
						text-align: center;
						background: linear-gradient(90deg, #C83732 0%, #E25C44 100%);
						box-shadow: 0rpx 6rpx 12rpx rgba(233, 0, 0, 0.3);
						opacity: 1;
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

						.uni-progress {
							border-radius: 10rpx;
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
