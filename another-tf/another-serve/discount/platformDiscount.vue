<template>
	<view class="platform-discount-container">
		<JHeader :dark="false" title="限时折扣专区" width="50" height="50"></JHeader>
		<view style="font-size: 40rpx;text-align: center;color: #ffffff;">全场{{ discountInfo.discount || '--' }}折</view>
		<view style="display: flex;align-items: center;justify-content: center;margin-top: 20rpx;color: #ffffff;">
			<text>距活动结束剩余：</text>
			<tui-countdown
				:size="24" :colon-size="24" colon-color="#1A66FF" color="#1A66FF"
				border-color="transparent"
				:time="Math.floor(discountInfo.endTime / 1000)"
			></tui-countdown>
		</view>

		<view class="shop-list-nav">
			<view class="nav-item-sort" @click="sortTap(1)">
				<text class="nav-title" :class="{ 'active': sortIndex == 1 }">综合</text>
			</view>
			<view class="nav-item-sort" @click="sortTap(2)">
				<text class="nav-title" :class="{ 'active': sortIndex == 2 }">价格</text>
				<view class="r">
					<view class="arrowUp" :class="{ activeUp: queryInfo.type == 1 }"></view>
					<view class="arrowDown" :class="{ activeDown: queryInfo.type == 2 }"></view>
				</view>
			</view>
			<view class="nav-item-sort" @click="sortTap(3)">
				<text class="nav-title" :class="{ 'active': sortIndex == 3 }">销量</text>
				<view class="r">
					<view class="arrowUp" :class="{ activeUp: queryInfo.volume == 1 }"></view>
					<view class="arrowDown" :class="{ activeDown: queryInfo.volume == 2 }"></view>
				</view>
			</view>
		</view>

		<view class="spikeList">
			<view v-for="(item, index) in discountList" :key="index" class="listItem">
				<image style="width: 260rpx;height: 260rpx;margin-right: 30rpx;" :src="common.seamingImgUrl(item.productImage)">
				</image>
				<view class="itemInfo">
					<p>{{ item.productName }}</p>
					<view v-if="item.limitNumber" class="number">限量{{ item.limitNumber }}件 / 剩余{{ item.limitStockNumber }}件</view>
					<view class="originalPrice">原价: ￥{{ item.originalPrice }}</view>
					<view class="price">
						<view class="currentPrice flex-row-plus flex-items-plus font-color-FF7800">
							<image style="width: 58rpx;height: 36rpx;" src="../../../static/images/new-business/shop/discountListIcon.png"></image>
							<view class="flex-row-plus flex-items priceInfo">
								<label class="fs24">￥</label>
								<label class="fs36">{{ item.price }}</label>
							</view>
						</view>
						<view class="snapUpBtn" @click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${item.shopId}&productId=${item.productId}&skuId=${item.skuId}`)">
							<view class="btnText">去抢购</view>
							<view style="width: 82%;margin: 0 auto">
								<progress
									activeColor="#c5aa7b"
									:percent="item.total ? Math.round((parseFloat(item.limitStockNumber || item.stockNumber) / parseFloat(item.total)) * 10000) / 100 : 0"
									active stroke-width="5"
								/>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view style="padding-bottom: 45rpx;">
				<LoadingMore
					:status="!isEmpty && !discountList.length
						? 'loading' : !isEmpty && discountList.length && (discountList.length >= discountTotal) ? 'no-more' : ''"
				>
				</LoadingMore>
				<tui-no-data v-if="isEmpty" :fixed="false" style="margin-top: 60rpx;">暂无数据</tui-no-data>
			</view>
		</view>
	</view>
</template>

<script>
import { getQueryPlatformDiscountApi, getPlatformDiscountProductListApi } from '../../../api/anotherTFInterface'

export default {
	name: 'PlatformDiscount',
	data() {
		return {
			isEmpty: false,
			discountList: [],
			discountTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20,
				type: 1, // 价格
				volume: 1, // 销量
				discountId: ''
			},
			discountInfo: {},
			sortIndex: 0
		}
	},
	onLoad(options) {
		this.queryInfo.discountId = options.discountId
		this.getDiscountList()
	},
	onShow() {
		if (this.queryInfo.discountId) {
			getQueryPlatformDiscountApi({
				discountId: this.queryInfo.discountId
			}).then((res) => {
				this.discountInfo = res.data
			})
		}
	},
	methods: {
		sortTap(index) {
			this.queryInfo.page = 1
			this.discountList = []
			if (index == 1) {
				this.queryInfo.type = 1
				this.queryInfo.volume = 1
				this.sortIndex = index
			} else if (index == 2) {
				this.queryInfo.type = this.queryInfo.type != 1 ? 1 : 2
				this.sortIndex = index
			} else if (index == 3) {
				this.queryInfo.volume = this.queryInfo.volume != 1 ? 1 : 2
				this.sortIndex = index
			}
			this.getDiscountList()
		},
		getDiscountList(isLoadmore) {
			uni.showLoading()
			getPlatformDiscountProductListApi(this.queryInfo).then((res) => {
				this.discountTotal = res.data.total
				if (isLoadmore) {
					this.discountList.push(...res.data.list)
				} else {
					this.discountList = res.data.list
				}
				this.isEmpty = this.discountList.length === 0
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		}
	},
	onReachBottom() {
		if (this.discountList.length < this.discountTotal) {
			++this.queryInfo.page
			this.getDiscountList(true)
		}
	}
}
</script>

<style lang="less" scoped>
.platform-discount-container {
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
		padding: 20rpx 30rpx 20rpx 30rpx;

		.listItem {
			display: flex;
			padding: 30rpx;
			margin-bottom: 30rpx;
			background: #FFFFFF;

			.itemInfo {
				flex: 1;

				p {
					font-size: 26rpx;
					color: #333333;
					line-height: 40rpx;
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

		.active {
			color: #C5AA7B;
		}

		.r {
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
	}
}
</style>
