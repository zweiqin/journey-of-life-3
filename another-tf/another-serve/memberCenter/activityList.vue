<template>
	<view class="spikeListBox">
		<JHeader :dark="false" title="会员专区" width="50" height="50" style="padding: 24rpx 0 0;"></JHeader>
		<view class="spikeBgBox">
			<view class="discountBg">
			</view>
			<view v-if="shopShowType == false" class="countdown">
				距活动结束剩余<view class="endDate">
					<span>{{ hou }}</span><i>:</i><span>{{ min }}</span><i>:</i><span>{{ sec }}</span>
				</view>
			</view>
			<view id="boxFixed" class="nav-warp">
				<view class="shop-list-nav" :class="{ 'is-fixed': isFixed }">
					<view class="nav-item-sort" @click="sortTap(1)">
						<text class="nav-title" :class="{ 'active': sortIndex == 1 }">综合</text>
					</view>
					<view class="nav-item-sort" @click="sortTap(2)">
						<text class="nav-title" :class="{ 'active': sortIndex == 2 }">价格</text>
						<view class="r">
							<view class="arrowUp" :class="{ activeUp: type == 1 }"></view>
							<view class="arrowDown" :class="{ activeDown: type == 2 }"></view>
						</view>
					</view>
					<view class="nav-item-sort" @click="sortTap(3)">
						<text class="nav-title" :class="{ 'active': sortIndex == 3 }">销量</text>
						<view class="r">
							<view class="arrowUp" :class="{ activeUp: volume == 1 }"></view>
							<view class="arrowDown" :class="{ activeDown: volume == 2 }"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="spikeList">
			<view v-for="(item, index) in discountList" :key="index" class="listItem">
				<view class="itemBox">
					<img :src="common.seamingImgUrl(item.image)">
				</view>
				<view class="itemInfo">
					<p>{{ item.productName }}</p>
					<view class="price">
						<view class="currentPrice">
							<view class="originalPrice">原价: ¥{{ item.originalPrice }}</view>
							<view class="flex-row-plus flex-items-plus">
								<ATFActivityImage :type="9"></ATFActivityImage>
								<view class="flex-row-plus flex-items priceInfo">
									<label class="fs24">￥</label>
									<label class="fs36">{{ item.price }}</label>
								</view>
							</view>
						</view>
						<view class="snapUpBtn" @click="gogoodsDetails(item.shopId, item.productId, item.skuId)">
							<view class="btnText">立即购买</view>
						</view>
					</view>
				</view>
			</view>
			<view style="padding-bottom: 45rpx;">
				<LoadingMore
					:status="!isEmpty && !discountList.length
						? 'loading' : !isEmpty && discountList.length && (discountList.length >= discountListTotal) ? 'no-more' : ''"
				>
				</LoadingMore>
				<tui-no-data v-if="isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无数据</tui-no-data>
			</view>
		</view>
	</view>
</template>

<script>
import { T_STORAGE_KEY } from '../../../constant'
import { getMemberProductsCanvasApi } from '../../../api/anotherTFInterface'
export default {
	name: 'ActivityList',
	data() {
		return {
			pageType: true,
			discountList: [],
			discountListTotal: 0,
			page: 1,
			pageSize: 10,
			isEmpty: false,
			days: '00',
			hou: '00',
			min: '00',
			sec: '00',
			shopId: 0,
			shopSeckillId: 0,
			type: '', // 价格
			volume: '', // 销量
			shopShowType: false,
			selectIndex: 0,
			sortIndex: 1,
			isFixed: false,
			boxFixedTop: 0
		}
	},
	onPageScroll(res) {
		const scrollTop = res.scrollTop // 滚动条偏移量
		const offsetTop = this.boxFixedTop // 要滚动到顶部吸附的元素的偏移量
		this.isFixed = scrollTop > offsetTop // 如果滚动到顶部了，this.isFixed就为true
	},
	onReady() {
		const query = uni.createSelectorQuery().in(this)
		query.select('#boxFixed').boundingClientRect((data) => {
			this.boxFixedTop = data.top
		})
			.exec()
	},
	onLoad(options) {
		if (options.shopId && options.shopDiscountId) {
			this.shopShowType = false
			this.shopId = options.shopId
			this.shopDiscountId = options.shopDiscountId
		} else {
			this.shopShowType = true
			this.shopId = 0
			this.shopDiscountId = 0
		}
	},
	onShow() {
		this.getMemberList()
	},
	onReachBottom() {
		if (this.discountList.length < this.discountListTotal) {
			++this.page
			this.getMemberList(true)
		}
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
			this.page = 1
			this.discountList = []
			this.sortIndex = index
			if (index == 1) {
				this.type = 0
				this.volume = 0
			} else if (index == 2) {
				this.volume = 0
				this.type = this.type != 1 ? 1 : 2
			} else if (index == 3) {
				this.type = 0
				this.volume = this.volume != 1 ? 1 : 2
			}
			this.getMemberList()
		},
		gogoodsDetails(shopId, productId, skuId) {
			uni.navigateTo({
				url: `/another-tf/another-serve/goodsDetails/index?shopId=${shopId}&productId=${productId}&skuId=${skuId}`
			})
		},
		getMemberList(isLoadmore) {
			let param = ''
			const storageKey = uni.getStorageSync(T_STORAGE_KEY) || {}
			param = {
				page: this.page,
				pageSize: this.pageSize,
				memberLevelId: storageKey.memberLevelId
			}
			if (this.type) {
				param.type = this.type
			}
			if (this.volume) {
				param.volume = this.volume
			}
			uni.showLoading()
			getMemberProductsCanvasApi({
				page: this.page,
				pageSize: this.pageSize
			})
				.then((res) => {
					this.discountListTotal = res.data.total
					if (isLoadmore) {
						this.discountList.push(...res.data.list)
					} else {
						this.discountList = res.data.list
					}
					this.isEmpty = this.discountList.length === 0
					uni.hideLoading()
				})
				.catch(() => {
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
		}
		// countDown(){
		//   let timeOut = setTimeout(() => {
		//     let hou = parseInt(this.hou+this.days*24);
		//     let min = parseInt(this.min);
		//     let sec = parseInt(this.sec);
		//
		//     let netxSec = sec - 1;
		//     let netxMin = min
		//     let netxHou = hou;
		//
		//     if (netxHou == 0 && netxMin == 0 && netxSec == -1) {
		//       clearTimeout(timeOut)
		//       this.$switchTab('/pages/index/index')
		//       uni.showToast({
		//         title:"活动结束",
		//         duration:2000,
		//         icon:'none'
		//       })
		//     } else {
		//       if (netxSec == -1) {
		//         netxSec = 59
		//         netxMin = netxMin - 1;
		//       }
		//       if (netxMin == -1) {
		//         netxMin = 59
		//         netxHou = netxHou - 1
		//       }
		//       // if (netxHou == -1) {
		//       //   netxHou = 23
		//       // }
		//
		//       this.hou = this.timeFormat(netxHou),
		//           this.min = this.timeFormat(netxMin),
		//           this.sec = this.timeFormat(netxSec),
		//           this.timeOut = timeOut
		//       this.countDown();
		//     }
		//   }, 1000)
		// },
		// timeFormat(param) { //小于10的格式化函数
		//   return param < 10 ? '0' + param : param;
		// },
	}
}
</script>

<style>
page {
	background: #333333;
}
</style>

<style lang="less" scoped>
.spikeListBox {
	.discountBg {
		width: 100%;
		height: 440rpx;
		// background: url("../../static/images/origin/memberCenterBg.png") no-repeat center center;
		background-size: contain;
		position: relative;
	}

	.selected {
		color: #FE6F52;
	}

	.shopShowTypebox {
		height: 80rpx;
		background-color: #FFFFFF;
		z-index: 9999;
	}

	.countdown {
		display: flex;
		justify-content: center;
		height: 80rpx;
		align-items: center;
		width: 100%;
		color: #CCCCCC;

		.endDate {
			display: flex;
			align-items: center;
			margin-left: 20rpx;

			span {
				min-width: 44rpx;
				padding: 0 8rpx;
				height: 52rpx;
				line-height: 52rpx;
				background: #999999;
				display: block;
				font-size: 26rpx;
				color: #FFEBC4;
				text-align: center;
			}

			i {
				font-size: 26rpx;
				color: #999999;
				font-style: normal;
				margin: 0 8rpx;
			}
		}
	}

	.spikeList {
		padding: 20rpx 30rpx 20rpx 30rpx;

		.listItem {
			display: flex;
			padding: 30rpx;
			margin-bottom: 30rpx;
			background: #FFFFFF;

			&:last-child {
				border-bottom: none;
			}

			.itemBox {
				width: 260rpx;
				height: 260rpx;
				margin-right: 30rpx;

				img {
					width: 100%;
					height: 100%;
				}
			}

			.itemInfo {
				flex: 1;

				p {
					font-size: 26rpx;
					color: #333333;
					line-height: 40rpx;
					height: 115rpx;
					margin-bottom: 20rpx;
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
					font-size: 24rpx;
					margin: 20rpx 0;
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
						margin-top: 20rpx;
						width: 140rpx;
						height: 84rpx;
						line-height: 84rpx;
						text-align: center;
						background: #333333;
						opacity: 1;
						border-radius: 10rpx;

						.btnText {
							color: #FFEBC4;
							font-weight: 400;
							font-size: 24rpx;
						}

						.uni-progress {
							border-radius: 10rpx;
						}
					}
				}
			}
		}
	}
	.filterBox {
		display: flex;
		height: 80rpx;
		align-items: center;
		width: 100%;
		background: #FFFFFF;
		left: 0;

		.item {
			flex: 0 0 33.33%;
			text-align: center;
		}
	}
}

.nav-warp {
	height: 80rpx;
}

.shop-list-nav {
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 80rpx;
	line-height: 76rpx;
	background-color: #333;

	&.is-fixed {
		position: fixed;
		top: 70rpx;
		left: 0;
		width: 100%;
		z-index: 999;
	}

	/* #ifdef MP-WEIXIN */
	&.is-fixed {
		top: 0px;
	}

	/* #endif */
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
</style>
