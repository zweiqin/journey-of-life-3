<template>
	<view class="group-buy-container">
		<JHeader :dark="false" title="拼团专区" width="50" height="50"></JHeader>
		<view v-if="queryInfo.shopId && queryInfo.shopGroupWorkId" style="margin-top: 20rpx;color: #ffffff;">
			<view v-if="groupData.state === 1" style="display: flex;align-items: center;justify-content: center;">
				<text>距结束剩余：</text>
				<tui-countdown
					:size="24" :colon-size="24" colon-color="#1A66FF" color="#1A66FF"
					border-color="transparent"
					:time="Math.floor(groupData.time / 1000)"
				></tui-countdown>
			</view>
			<view v-else style="display: flex;align-items: center;justify-content: center;">
				<text>即将开始：</text>
				<tui-countdown
					:size="24" :colon-size="24" colon-color="#1A66FF" color="#1A66FF"
					border-color="transparent"
					:time="Math.floor(groupData.time / 1000)"
				></tui-countdown>
			</view>
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
				<view style="width: 260upx;height: 260upx;margin-right: 30upx;">
					<image :src="common.seamingImgUrl(item.image)"></image>
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
							<ATFActivityImage :type="item.activityType"></ATFActivityImage>
							<view class="flex-row-plus flex-items priceInfo">
								<label class="fs24">￥</label>
								<label class="fs36">{{ item.price }}</label>
							</view>
						</view>
						<view
							v-if="groupData.state === 1" class="snapUpBtn"
							@click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${item.shopId}&productId=${item.productId}&skuId=${item.skuId}`)"
						>
							<view class="btnText">去拼团</view>
							<view style="width: 82%;margin: 0 auto">
								<progress
									activeColor="#FFFFFF"
									:percent="item.total ? Math.round((parseFloat(item.limitStockNumber || item.stockNumber) / parseFloat(item.total)) * 10000) / 100 : 0"
									active stroke-width="5"
								/>
							</view>
						</view>
						<view v-else class="snapUpBtn btnStyle1">
							<view class="btnText">即将开始</view>
							<view style="width: 82%;margin: 0 auto">
								<progress
									activeColor="#FFFFFF"
									:percent="item.total ? Math.round((parseFloat(item.limitStockNumber || item.stockNumber) / parseFloat(item.total)) * 10000) / 100 : 0"
									active stroke-width="5"
								/>
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
			groupData: {},
			sortIndex: 1
		}
	},
	onLoad(options) {
		if (options.shopId && options.shopGroupWorkId) {
			this.queryInfo.shopId = options.shopId
			this.queryInfo.shopGroupWorkId = options.shopGroupWorkId
		} else {
			this.queryInfo.shopId = 0
			this.queryInfo.shopGroupWorkId = 0
		}
	},
	onShow() {
		this.getGroupBuylist()
	},
	methods: {
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
		getGroupBuylist(isLoadmore) {
			uni.showLoading()
			getIndexWorkApi(this.queryInfo).then((res) => {
				this.groupData = res.data
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
.group-buy-container {
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
		padding: 0upx 30upx 20upx 30upx;

		.listItem {
			display: flex;
			padding: 30upx;
			margin-bottom: 30upx;
			background: #FFFFFF;

			&:last-child {
				border-bottom: none;
			}

			.itemInfo {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

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
