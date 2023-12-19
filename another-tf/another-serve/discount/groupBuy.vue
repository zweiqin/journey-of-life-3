<template>
	<view class="groupBuy">
		<JHeader :dark="false" title="拼团专区" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>

		<view class="groupBuyBg">
			拼团专区
		</view>
		<view v-if="shopShowType == false" class="countdown">
			<label v-if="groupDataListState === 1">距结束剩余</label>
			<label v-else>即将开始</label>
			<view class="endDate"><span>{{ hou }}</span><i>:</i><span>{{ min }}</span><i>:</i><span>{{ sec }}</span></view>
		</view>
		<view class="shop-list-nav">
			<view class="nav-item-sort" @click="sortTap(1)">
				<text class="nav-title" :class="{ 'active': sortIndex == 1 }">
					综合
				</text>
			</view>
			<view class="nav-item-sort" @click="sortTap(2)">
				<text class="nav-title" :class="{ 'active': sortIndex == 2 }">
					价格
				</text>
				<view class="r">
					<view class="arrowUp" :class="{ activeUp: queryInfo.type == 1 }"></view>
					<view class="arrowDown" :class="{ activeDown: queryInfo.type == 2 }"></view>
				</view>
			</view>
			<view class="nav-item-sort" @click="sortTap(3)">
				<text class="nav-title" :class="{ 'active': sortIndex == 3 }">
					销量
				</text>
				<view class="r">
					<view class="arrowUp" :class="{ activeUp: queryInfo.volume == 1 }"></view>
					<view class="arrowDown" :class="{ activeDown: queryInfo.volume == 2 }"></view>
				</view>
			</view>
		</view>
		<view class="spikeList mar-top-20">
			<view v-for="(item, index) in groupBuyList" :key="index" class="listItem">
				<view class="itemBox">
					<img :src="common.seamingImgUrl(item.image)">
				</view>
				<view class="itemInfo">
					<view class="title">
						<p>{{ item.productName }}</p>
						<view class="tag-box">
							<view v-if="item.person > 0" class="number group-buy-number">
								{{ item.person }}人团
							</view>

							<view v-if="item.limitNumber" class="number">
								限量{{ item.limitNumber }}件 / 剩余{{ item.limitStockNumber }}件
							</view>
						</view>
					</view>
					<view class="originalPrice">原价: ¥{{ item.originalPrice }}</view>
					<view class="price">
						<view class="currentPrice flex-row-plus flex-items-plus font-color-FF7800">
							<view class="iconBox">
								<image src="../../../static/images/new-business/shop/groupBuyIcon.png"></image>
							</view>
							<view class="flex-row-plus flex-items priceInfo">
								<label class="fs24">￥</label>
								<label class="fs36">{{ item.price }}</label>
							</view>
						</view>
						<view
							v-if="groupDataListState === 1" class="snapUpBtn"
							@click="gogoodsDetails(item.shopId, item.productId, item.skuId)"
						>
							<view class="btnText">去拼团</view>
							<view style="width: 82%;margin: 0 auto">
								<progress activeColor="#FFFFFF" :percent="getPercent(5, 10)" active stroke-width="5" />
							</view>
						</view>
						<view v-else class="snapUpBtn btnStyle1">
							<view class="btnText">即将开始</view>
							<view style="width: 82%;margin: 0 auto">
								<progress activeColor="#FFFFFF" :percent="getPercent(5, 10)" active stroke-width="5" />
							</view>
						</view>
					</view>
				</view>
			</view>
			<view style="padding-bottom: 45upx;">
				<LoadingMore
					:status="!isEmpty && !groupBuyList.length
						? 'loading' : !isEmpty && groupBuyList.length && (groupBuyList.length >= groupBuyTotal) ? 'no-more' : ''"
				>
				</LoadingMore>
				<tui-no-data v-if="isEmpty" :fixed="false" style="margin-top: 60upx;">暂无数据</tui-no-data>
			</view>
		</view>
	</view>
</template>

<script>
import { getIndexWorkApi } from '../../../api/anotherTFInterface'

export default {
	name: 'GroupBuy',
	data() {
		return {
			isEmpty: false,
			groupBuyList: [],
			groupBuyTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20,
				shopId: 0,
				type: 0, // 价格
				volume: 0, // 销量
				shopGroupWorkId: 0
			},
			groupDataListState: {},
			hou: '00',
			min: '00',
			sec: '00',
			shopShowType: false,
			sortIndex: 1
		}
	},
	onLoad(options) {
		if (options.shopId && options.shopGroupWorkId) {
			this.shopShowType = false
			this.queryInfo.shopId = options.shopId
			this.queryInfo.shopGroupWorkId = options.shopGroupWorkId
		} else {
			this.shopShowType = true
			this.queryInfo.shopId = 0
			this.queryInfo.shopGroupWorkId = 0
		}
	},
	onShow() {
		this.getGroupBuylist()
	},
	methods: {
		getPercent(num, total) {
			num = parseFloat(num)
			total = parseFloat(total)
			if (isNaN(num) || isNaN(total)) {
				return '-'
			}
			return total <= 0 ? '0%' : Math.round((num / total) * 10000) / 100.0
		},
		sortTap(index) {
			this.queryInfo.page = 1
			this.groupBuyList = []
			this.sortIndex = index
			if (index == 1) {
				this.queryInfo.type = 0
				this.queryInfo.volume = 0
			} else if (index == 2) {
				this.queryInfo.volume = 0
				if (this.queryInfo.type === 0) {
					this.queryInfo.type = 1
				} else {
					this.queryInfo.type = this.queryInfo.type != 1 ? 1 : 2
				}
			} else if (index == 3) {
				this.queryInfo.type = 0
				if (this.queryInfo.volume === 0) {
					this.queryInfo.volume = 1
				} else {
					this.queryInfo.volume = this.queryInfo.volume != 1 ? 1 : 2
				}
			}
			this.getGroupBuylist()
		},
		gogoodsDetails(shopId, productId, skuId) {
			uni.navigateTo({
				url: '/another-tf/another-serve/goodsDetails/index?shopId=' + shopId + '&productId=' + productId + '&skuId=' + skuId
			})
		},
		getGroupBuylist(isLoadmore) {
			uni.showLoading()
			getIndexWorkApi(this.queryInfo).then((res) => {
				this.groupDataListState = res.data.state
				if (this.shopShowType == false) {
					this.dateformat(res.data.time)
					this.countDown()
				}
				this.groupBuyTotal = res.data.page.total
				if (isLoadmore) {
					this.groupBuyList.push(...res.data.page.list)
				} else {
					this.groupBuyList = res.data.page.list
				}
				this.isEmpty = this.groupBuyList.length === 0
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		// 时分秒换算
		dateformat(micro_second) {
			// 总秒数
			const second = Math.floor(micro_second / 1000)
			// 天数
			const day = Math.floor(second / 3600 / 24)
			// 小时
			const hr = Math.floor(second / 3600 % 24)
			// 分钟
			const min = Math.floor(second / 60 % 60)
			// 秒
			const sec = Math.floor(second % 60)
			this.hou = hr + day * 24
			this.min = min
			this.sec = sec
		},
		countDown() {
			const timeOut = setTimeout(() => {
				const hou = parseInt(this.hou)
				const min = parseInt(this.min)
				const sec = parseInt(this.sec)
				let netxSec = sec - 1
				let netxMin = min
				let netxHou = hou
				if (netxHou == 0 && netxMin == 0 && netxSec == -1) {
					clearTimeout(timeOut)
					this.$switchTab('/pages/index/index')
					uni.showToast({
						title: '活动结束',
						duration: 2000,
						icon: 'none'
					})
				} else {
					if (netxSec == -1) {
						netxSec = 59
						netxMin = netxMin - 1
					}
					if (netxMin == -1) {
						netxMin = 59
						netxHou = netxHou - 1
					}
					// if (netxHou == -1) {
					//   netxHou = 23
					// }
					this.hou = this.timeFormat(netxHou),
					this.min = this.timeFormat(netxMin),
					this.sec = this.timeFormat(netxSec),
					this.timeOut = timeOut
					this.countDown()
				}
			}, 1000)
		},
		timeFormat(param) { // 小于10的格式化函数
			return param < 10 ? '0' + param : param
		}
	},
	onReachBottom() {
		if (this.groupBuyList.length < this.groupBuyTotal) {
			++this.queryInfo.page
			this.getGroupBuylist(true)
		}
	}
}
</script>

<style lang="less" scoped>
.groupBuy {
	min-height: 100vh;
	background: #333333;
	box-sizing: border-box;

	.groupBuyBg {
		margin: 50rpx auto;
		font-size: 40upx;
		font-weight: bold;
		text-align: center;
		color: #ffffff;
	}

	.countdown {
		display: flex;
		justify-content: center;
		height: 80upx;
		align-items: center;
		width: 100%;
		color: #CCCCCC;

		.endDate {
			display: flex;
			align-items: center;
			margin-left: 20upx;

			span {
				min-width: 44rpx;
				padding: 0 8rpx;
				height: 52upx;
				line-height: 52upx;
				background: #999999;
				display: block;
				font-size: 26upx;
				color: #FFEBC4;
				text-align: center;
			}

			i {
				font-size: 26upx;
				color: #999999;
				font-style: normal;
				margin: 0 8upx;
			}
		}
	}

	.spikeList {
		padding: 0upx 30upx 20upx 30upx;

		.listItem {
			display: flex;
			padding: 30upx;
			margin-bottom: 30upx;
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
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.iconBox {
					image {
						width: 58rpx;
						height: 36rpx;
					}
				}

				p {
					font-size: 26upx;
					color: #333333;
					line-height: 40upx;
					margin-bottom: 20upx;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					line-clamp: 2;
					-webkit-box-orient: vertical;
				}

				.title {
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
}

.shop-list-nav {
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 80rpx;
	line-height: 76rpx;
}

.active {
	color: #C5AA7B;
}

.nav-item-sort {
	flex: 1;
	font-size: 24rpx;
	color: #999999;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	height: 80rpx;
	line-height: 80rpx;
}

.nav-item-sort .r {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-left: 5rpx;

	.arrowDown {
		width: 0;
		height: 0;
		border-width: 10rpx;
		border-style: solid;
		border-color: #CCCCCC transparent transparent transparent;
		margin-top: 2rpx;
	}

	.arrowUp {
		margin-bottom: 2rpx;
		width: 0;
		height: 0;
		border-width: 10rpx;
		border-style: solid;
		border-color: transparent transparent #CCCCCC transparent;
	}

	.activeDown {
		border-color: #C5AA7B transparent transparent transparent;
	}

	.activeUp {
		border-color: transparent transparent #C5AA7B transparent;
	}
}

.tag-box {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-wrap: wrap;

	.number {
		display: inline-block;
		padding: 6rpx 16rpx;
		border-radius: 4rpx;
		border: 1rpx solid #E3928F;
		color: #E3928F;
		font-size: 14rpx;
	}

	.group-buy-number {
		background-color: #E3928F;
		border: none;
		color: #fff;
	}
}
</style>
