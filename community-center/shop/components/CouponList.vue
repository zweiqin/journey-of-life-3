<template>
	<view class="coupon-list">
		<tui-tabs
			style="width: 710upx;padding: 0 0upx 0 0upx;overflow: hidden;" :slider-width="250" :padding="0"
			item-width="237rpx" selected-color="#000000" bold slider-bg-color="#ff0000"
			:tabs="[{ name: '店铺券' }, { name: '未领取' }, { name: '已领取' }]" :current-tab="currentTab"
			@change="handleChangeTab"
		></tui-tabs>
		<scroll-view
			refresher-background="#3f3d3d" scroll-y style="max-height: 85vh;min-height: 400rpx;"
			@scrolltolower="handleScrolltolower"
		>
			<view v-if="currentTab === 0">
				<view class="main">
					<view v-if="storeCouponList && storeCouponList.length">
						<view v-for="item in storeCouponList" :key="item.id" class="item">
							<view class="left" :style="{ background: '#FFA74D' }">
								<view class="money">￥<text>{{ item.discount }}</text></view>
								<view class="full">满{{ item.min }}可用</view>
							</view>
							<view class="right">
								<view class="type" :style="{ background: '#FFA74D' }">{{ item.name }}</view>
								<view class="rule">{{ item.desc }}</view>
								<view v-if="item.days" class="rule">有效天数：{{ item.days }}</view>
								<view class="list">
									<view class="time">
										<view v-if="item.startTime && item.endTime">
											<view>可使用时间范围：</view>
											<view style="display: flex;flex-wrap: wrap;">
												<view>{{ item.startTime }}至</view>
												<view>{{ item.endTime }}</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<LoadMore v-show="storeCouponList.length" :status="status"></LoadMore>
				<view v-if="storeCouponList && !storeCouponList.length && loadingStatus !== 'loading'" class="no-data">
					该店铺暂无优惠券~
				</view>
			</view>
			<view v-else-if="currentTab === 1">
				<view class="main" style="margin-top: 10upx;">
					<view style="margin-bottom: 20rpx;">
						<tui-button
							type="danger" style="margin: 0 auto;" bold shape="circle"
							width="60%" height="64rpx"
							@click="handleReceiveAll"
						>
							一键领取
						</tui-button>
					</view>
					<view v-if="receiveCouponList && receiveCouponList.length">
						<view v-for="item in receiveCouponList" :key="item.id" class="item">
							<view class="left" :style="{ background: '#FFA74D' }">
								<view class="money">￥<text>{{ item.discount }}</text></view>
								<view class="full">满{{ item.min }}可用</view>
							</view>
							<view class="right">
								<view class="type" :style="{ background: '#FFA74D' }">{{ item.name }}</view>
								<view class="rule">{{ item.desc }}</view>
								<view v-if="item.days" class="rule">有效天数：{{ item.days }}</view>
								<view class="list">
									<view class="time">
										<view v-if="item.startTime && item.endTime">
											<view>可使用时间范围：</view>
											<view style="display: flex;flex-wrap: wrap;">
												<view>{{ item.startTime }}至</view>
												<view>{{ item.endTime }}</view>
											</view>
										</view>
									</view>
									<view class="order" @click="handleReceive(item)">立即领取</view>
								</view>
							</view>
						</view>
					</view>
					<view v-else>
						<tui-no-data>暂无可领取优惠券</tui-no-data>
					</view>
				</view>
			</view>
			<view v-else-if="currentTab === 2">
				<view class="main">
					<view v-for="item in myCouponList" :key="item.id" class="item">
						<view class="left" :style="{ background: '#FFA74D' }">
							<view class="money">￥<text>{{ item.discount }}</text></view>
							<view class="full">满{{ item.min }}可用</view>
						</view>
						<view class="right">
							<view class="type" :style="{ background: '#FFA74D' }">{{ item.name }}</view>
							<view class="rule">{{ item.desc }}</view>
							<view class="list">
								<view class="time">
									<text v-if="item.startTime && item.endTime">
										{{ item.startTime }}-{{ item.endTime
										}}
									</text>
								</view>
								<!-- <view class="order">立即使用</view> -->
							</view>
						</view>
					</view>
				</view>
				<LoadMore v-show="myCouponList.length" :status="status"></LoadMore>
				<view v-if="myCouponList && !myCouponList.length && loadingStatus !== 'loading'" class="no-data">
					暂无优惠券，快去领取吧~
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import { getUserId } from '../../../utils'
import { getCouponListApi, getUserCouponReceiveApi, getUserCouponListApi, updateCollectReceiveApi, updateCollectReceiveAllApi } from '../../../api/user'
export default {
	name: 'CouponList',
	props: {
		brandDetail: {
			type: Object,
			default() {
				return {}
			}
		},
		isFirstShowCoupon: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {
			currentTab: 0,
			storeCouponQuery: {
				page: 1,
				size: 10,
				brandId: ''
			},
			storeCouponList: [],
			totalPages: 0,
			status: 'none',
			loadingStatus: 'noMore',
			myCouponQuery: {
				page: 1,
				size: 10,
				userId: getUserId(),
				brandId: ''
			},
			myCouponList: [],
			receiveCouponList: []
		}
	},
	watch: {
		isFirstShowCoupon(val) {
			if (val) {
				this.currentTab = 0
				this.getCouponList()
			}
		}
	},
	created() {
	},
	methods: {
		handleScrolltolower() {
			if (this.currentTab === 0) {
				if (this.storeCouponQuery.page >= this.totalPages) {
					this.status = 'no-more'
					return
				}
				if (this.storeCouponQuery.size > this.storeCouponList.length) {
					return
				}
				this.storeCouponQuery.page++
				this.getCouponList(true)
			} else if (this.currentTab === 2) {
				if (this.myCouponQuery.page >= this.totalPages) {
					this.status = 'no-more'
					return
				}
				if (this.myCouponQuery.size > this.myCouponList.length) {
					return
				}
				this.myCouponQuery.page++
				this.getUserCouponList(true)
			}
		},

		handleChangeTab(e) {
			this.currentTab = e.index
			if (this.currentTab === 0) {
				this.storeCouponList = []
				this.totalPages = 0
				this.storeCouponQuery.page = 1
				this.storeCouponQuery.size = 10
				this.getCouponList()
			} else if (this.currentTab === 1) {
				this.receiveCouponList = []
				this.getUserCouponReceive()
			} else if (this.currentTab === 2) {
				this.myCouponList = []
				this.totalPages = 0
				this.myCouponQuery.page = 1
				this.myCouponQuery.size = 10
				this.getUserCouponList()
			}
		},

		// 获取店铺所有优惠劵
		getCouponList(isLoadmore) {
			if (!this.brandDetail.id) return this.$showToast('缺少商家信息')
			this.status = 'loading'
			this.loadingStatus = 'loading'
			getCouponListApi({ ...this.storeCouponQuery, brandId: this.brandDetail.id })
				.then(({ data }) => {
					console.log(data)
					this.totalPages = data.totalPages
					if (isLoadmore) {
						this.storeCouponList.push(...data.data)
					} else {
						this.storeCouponList = data.data
					}
					this.status = 'none'
					this.loadingStatus = 'noMore'
				})
				.catch(() => {
					this.status = 'none'
					this.loadingStatus = 'noMore'
				})
		},
		// 获取可领取优惠券：未领取优惠券
		getUserCouponReceive() {
			if (!getUserId()) return
			uni.showLoading()
			getUserCouponReceiveApi({
				userId: getUserId(),
				brandId: 1001079
			})
				.then(({ data }) => {
					console.log(data)
					this.receiveCouponList = data.couponList
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		// 查找该店铺内已领取优惠券
		getUserCouponList(isLoadmore) {
			if (!this.brandDetail.id) return this.$showToast('缺少商家信息')
			if (!getUserId()) return
			this.status = 'loading'
			this.loadingStatus = 'loading'
			getUserCouponListApi({ ...this.myCouponQuery, brandId: this.brandDetail.id })
				.then(({ data }) => {
					console.log(data)
					this.totalPages = data.totalPages
					if (isLoadmore) {
						this.myCouponList.push(...data.data)
					} else {
						this.myCouponList = data.data
					}
					this.status = 'none'
					this.loadingStatus = 'noMore'
				})
				.catch(() => {
					this.status = 'none'
					this.loadingStatus = 'noMore'
				})
		},

		handleReceive(item) {
			updateCollectReceiveApi({
				userId: getUserId(),
				couponId: item.id
			})
				.then(({ data }) => {
					this.$showToast('领取成功', 'success')
					this.getUserCouponReceive()
				})
		},
		handleReceiveAll() {
			if (!this.brandDetail.id) return this.$showToast('缺少商家信息')
			updateCollectReceiveAllApi({
				userId: getUserId(),
				brandId: this.brandDetail.id
			})
				.then(({ data }) => {
					this.$showToast('领取成功', 'success')
					this.getUserCouponReceive()
				})
		}
	}
}
</script>

<style lang="less" scoped>
.coupon-list {
	.main {
		padding: 0upx 30upx 40upx 30upx;

		.item {
			margin-bottom: 22upx;
			box-sizing: border-box;
			width: 100%;
			// height: 226upx;
			border-radius: 10upx;
			box-shadow: 0upx 4upx 10upx 0upx rgba(0, 0, 0, 0.1);
			background: #FFFFFF;
			display: flex;

			.left {
				width: 29%;
				// padding: 28upx 18upx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-radius: 10upx 0upx 0upx 10upx;
				color: #FFFFFF;

				.money {
					font-size: 36upx;
					font-weight: 500;

					text {
						font-size: 56upx;
						font-weight: 500;
					}
				}

				.full {
					font-size: 28upx;
				}
			}

			.right {
				width: 71%;
				padding: 24upx 20upx 26upx 18upx;
				box-sizing: border-box;

				.type {

					// width: 110upx;
					width: fit-content;
					height: 40upx;
					padding: 0 20upx;
					border-radius: 100upx;
					background: #89AEFC;
					color: #FFFFFF;
					font-size: 24upx;
					font-weight: 500;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.rule {
					padding-top: 4upx;
					padding-bottom: 2upx;
					font-size: 28upx;
					color: #3D3D3D;
				}

				.list {
					padding-top: 20upx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.time {
						font-size: 20upx;
						color: #777777;
					}

					.order {
						width: 148upx;
						height: 40upx;
						border-radius: 100upx;
						background: #FF4654;
						font-size: 24upx;
						font-weight: 500;
						color: #FFFFFF;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}
			}
		}
	}

	.no-data {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 180upx;
		color: #999999;
		font-size: 36upx;
		letter-spacing: 2px;
	}

	.tui-tabs-view {
		/deep/ .tui-tabs-slider {
			margin-left: -20upx;
		}
	}
}
</style>
