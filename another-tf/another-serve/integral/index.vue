<template>
	<view class="integral-container">
		<JHeader title="我的积分" width="50" height="50"></JHeader>
		<BeeWxShare ref="beeWxShareRef" @click="handleShareServe()">
			<view style="padding: 0 16rpx;text-align: right;">
				<tui-icon name="share" :size="34" unit="rpx" color="#fdbc3d" margin="0 14rpx 0 0"></tui-icon>
				<text style="color: #fdbc3d;font-weight: bold;">分享</text>
			</view>
		</BeeWxShare>

		<view class="memberBox">
			<view class="posBox">
				<view class="memberBoxTop">
					<view class="memberTopPos" :style="{ backgroundImage: 'url(' + common.seamingImgUrl(levelInfo.memberLevelBackground) + ')' }">
						<view class="memberTopBg">
							<view class="flex-items">
								<view class="avatarBox">
									<image :src="common.seamingImgUrl($store.getters.userInfo.headImage)"></image>
								</view>
								<view class="nameBox">
									<view class="name fs36">{{ $store.getters.userInfo.name }}</view>
									<view class="level">
										<image :src="common.seamingImgUrl(levelInfo.memberLevelIcon)"></image>
									</view>
								</view>
							</view>
							<view class="integralInfo flex-items flex-sp-between mar-top-20">
								<view class="itemBox">
									<view class="integraNum fs32 font-color-333 fs-weight-400">{{ $store.getters.userInfo.totalCredit }}</view>
									<view class="fs24 font-color-333 fs-weight-400">累计积分</view>
								</view>
								<view class="itemBox">
									<view class="integraNum fs32 font-color-333 fs-weight-400">
										{{ $store.getters.userInfo.totalCredit - $store.getters.userInfo.credit }}
									</view>
									<view class="fs24 font-color-333 fs-weight-400">累计消费</view>
								</view>
								<view class="itemBox">
									<view class="integraNum fs32 font-color-333 fs-weight-400">{{ $store.getters.userInfo.credit }}</view>
									<view class="fs24 font-color-333 fs-weight-400">剩余积分</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="signBox flex-items flex-sp-between mar-top-30" @click="go('/another-tf/another-serve/integral/sign')">
			<view class="flex-items flex-sp-between">
				<tui-icon name="member-fill" :size="96" unit="rpx" color="#fdbc3d" margin="0 20rpx 0 0"></tui-icon>
				<view class="signText fs28 font-color-C5AA7B">积分签到</view>
			</view>
			<tui-icon name="arrowright" :size="48" unit="rpx" color="#C5AA7B"></tui-icon>
		</view>
		<view style="display: flex;align-items: center;margin-top: 30rpx;">
			<view
				:style="{ backgroundColor: currentTab === 0 ? '#333333' : 'transparent', color: currentTab === 0 ? '#ffebc4' : '#999999' }"
				style="flex: 1;display: flex;align-items: center;justify-content: center;padding: 18rpx 0;"
				@click="handleChangeTab(0)"
			>
				<tui-icon
					name="order" :size="40" unit="rpx" :color="currentTab === 0 ? '#ffebc4' : '#999999'"
					margin="0 20rpx 0 0"
				></tui-icon>
				<text>积分明细</text>
			</view>
			<view
				:style="{ backgroundColor: currentTab === 1 ? '#333333' : 'transparent', color: currentTab === 1 ? '#ffebc4' : '#999999' }"
				style="flex: 1;display: flex;align-items: center;justify-content: center;padding: 18rpx 0;" @click="handleChangeTab(1)"
			>
				<tui-icon
					name="exchange" :size="40" unit="rpx" :color="currentTab === 1 ? '#ffebc4' : '#999999'"
					margin="0 20rpx 0 0"
				></tui-icon>
				<text>积分兑换</text>
			</view>
		</view>
		<view v-if="currentTab === 0" class="signInfo mar-top-20">
			<view v-if="integralInfo.data && integralInfo.data.length">
				<view v-for="(item, index) in integralInfo.data" :key="index" class="signItem flex-items flex-sp-between">
					<view class="leftBox flex-items">
						<tui-icon name="service-fill" :size="90" unit="rpx" color="#fabe69" margin="0 30rpx 0 0"></tui-icon>
						<view class="leftInfo">
							<label class="fs28 font-color-333">{{ item.recordContent }}</label>
							<view class="fs24 font-color-999">{{ item.createTime }}</view>
						</view>
					</view>
					<view class="rightBtn">{{ item.recordType === 1 ? '+' : '-' }}{{ item.credit }}</view>
				</view>
			</view>
			<view style="padding-bottom: 45rpx;">
				<LoadingMore
					:status="!integralInfo.isEmpty && !integralInfo.data.length
						? 'loading' : !integralInfo.isEmpty && integralInfo.data.length && (integralInfo.data.length >= integralInfo.listTotal) ? 'no-more' : ''"
				>
				</LoadingMore>
				<tui-no-data v-if="integralInfo.isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无记录~</tui-no-data>
			</view>
		</view>
		<view v-else class="signExchange mar-top-20">
			<view v-if="creditCouponInfo.data && creditCouponInfo.data.length">
				<view v-for="(item, index) in creditCouponInfo.data" :key="index" class="exchangeItem flex-items flex-sp-between">
					<view class="exchangeLeft flex-items">
						<view class="discountBox mar-right-20">
							<view v-if="item.couponType === 1" class="fs24">
								{{ item.fullMoney === 0 ? `无门槛减${item.reduceMoney}元`
									: `满${item.fullMoney}元减${item.reduceMoney}元` }}
							</view>
							<view v-else class="fs24">
								{{ item.fullMoney === 0 ? `无门槛打${item.reduceMoney}折`
									: `满${item.fullMoney}元打${item.reduceMoney}折` }}
							</view>
							<view class="fs30">{{ item.couponType === 1 ? '满减券' : '折扣券' }}</view>
						</view>
						<view class="exchangeInfo">
							<view v-if="item.couponType === 1" class="fs28 font-color-333">
								{{ item.fullMoney === 0
									? `无门槛减${item.reduceMoney}元` : `满${item.fullMoney}元减${item.reduceMoney}元` }}
							</view>
							<view v-else class="fs28 font-color-333">
								{{ item.fullMoney === 0 ? `无门槛打${item.reduceMoney}折`
									: `满${item.fullMoney}元打${item.reduceMoney}折` }}
							</view>
							<view v-if="item.stockNumber > 0" class="fs24 state">还剩{{ item.stockNumber }}个</view>
							<view v-else class="fs24 state finish">已兑完</view>
							<view class="integral fs32">{{ item.credit }}积分</view>
						</view>
					</view>
					<view class="exchangeRight">
						<view
							v-if="item.state === 0 && item.stockNumber !== 0" class="exchangeBtn fs28 font-color-FFF"
							@click="goExchangeDetail(item)"
						>
							兑换
						</view>
						<view v-if="item.stockNumber === 0" class="exchangeBtn available fs28 font-color-FFF">已兑完</view>
						<view
							v-if="item.state === 1" class="exchangeBtn available fs28 font-color-FFF"
							@click="goExchangeDetail(item)"
						>
							已兑换
						</view>
					</view>
				</view>
			</view>
			<view style="padding-bottom: 45rpx;">
				<LoadingMore
					:status="!creditCouponInfo.isEmpty && !creditCouponInfo.data.length
						? 'loading' : !creditCouponInfo.isEmpty && creditCouponInfo.data.length && (creditCouponInfo.data.length >= creditCouponInfo.listTotal) ? 'no-more' : ''"
				>
				</LoadingMore>
				<tui-no-data v-if="creditCouponInfo.isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无优惠券~</tui-no-data>
			</view>
		</view>
		<tui-modal :show="isConvertible" custom fadein>
			<view
				v-if="isConvertible"
				style="text-align: right;" @click="isConvertible = false"
			>
				<tui-icon name="close" :size="60" unit="rpx" color="#333333"></tui-icon>
			</view>
			<view>
				<view class="text-align fs34 fs-bold">
					温馨提示
				</view>
				<view class="mar-top-40 text-align">
					您的积分不够哦，请获取更多的积分!
				</view>
				<tui-button
					type="black" width="100%" height="80rpx" margin="30rpx 0 10rpx"
					@click="go('/another-tf/another-serve/integral/sign')"
				>
					去签到
				</tui-button>
			</view>
		</tui-modal>
	</view>
</template>

<script>
import { A_TF_MAIN, ENV } from '../../../config'
import { setMiniprogramShareConfig } from '../../../utils'
import { getMemberByMemberLevelIdApi, updateShareCreditApi, getSelectCreditCouponListApi, getSelectCreditRecordApi } from '../../../api/anotherTFInterface'
export default {
	name: 'Integral',
	data() {
		return {
			currentTab: 0,
			integralInfo: {
				query: {
					page: 1,
					pageSize: 10,
					session: ''
				},
				data: [],
				listTotal: 0,
				isEmpty: false
			},
			creditCouponInfo: {
				query: {
					page: 1,
					pageSize: 10,
					session: ''
				},
				data: [],
				listTotal: 0,
				isEmpty: false
			},
			levelInfo: {},
			isConvertible: false
		}
	},
	onLoad(option) {
		if (option.tabActive) this.currentTab = parseInt(option.tabActive)
		this.$store.dispatch('auth/refrshUserInfoAction', () => {
			this.getIntegralList()
			this.getMemberByMemberLevel()
		})
		if (this.$store.state.app.terminal === 6) {
			setMiniprogramShareConfig({
				data: {
					event: 'sharingPageTurn',
					webPath: `/another-tf/another-serve/integral/index`,
					title: `快来查看你的积分吧！`,
					imageUrl: this.common.seamingImgUrl('1716629235852-feed73b67bb541edb82b41a0937dbdad.png')
					// promise: new Promise((resolve) => { // 无效。会转为空对象
					// 	updateShareCreditApi({})
					// 		.then((res) => {
					// 			this.$showToast('分享-成功获得积分！')
					// 		})
					// 	resolve({
					// 		title: `快来查看你的积分吧！`,
					// 		path: `pages/index/index` + `?type=${ENV === 'development' ? 'test' : ''}&remainParams=` + encodeURIComponent(`&jumpType=sharingPageTurn&code=` + encodeURIComponent('/another-tf/another-serve/integral/index')),
					// 		imageUrl: this.common.seamingImgUrl('1716629235852-feed73b67bb541edb82b41a0937dbdad.png')
					// 	})
					// })
				}
			})
		}
		// #ifdef H5
		this.$nextTick(() => {
			this.handleShareServe(true)
		})
		// #endif
	},
	methods: {
		handleChangeTab(index) {
			this.currentTab = index
			// 缓存每个tab里的数据
			if (this.currentTab === 0) {
			} else if (this.currentTab === 1) {
				if (!this.creditCouponInfo.isEmpty && !this.creditCouponInfo.data.length) this.getCreditCouponList()
			}
			// 每点一个tab就重新进行对它的请求
			// if (this.currentTab === 0) {
			// 	this.integralInfo.query.page = 1
			// 	this.integralInfo.data = []
			// 	this.integralInfo.listTotal = 0
			// 	this.integralInfo.isEmpty = false
			// 	this.getIntegralList()
			// } else if (this.currentTab === 1) {
			// 	this.creditCouponInfo.query.page = 1
			// 	this.creditCouponInfo.data = []
			// 	this.creditCouponInfo.listTotal = 0
			// 	this.creditCouponInfo.isEmpty = false
			// 	this.getCreditCouponList()
			// }
		},
		getIntegralList(isLoadmore) {
			uni.showLoading({
				title: '加载中'
			})
			getSelectCreditRecordApi({ ...this.integralInfo.query })
				.then((res) => {
					this.integralInfo.listTotal = res.data.total
					if (isLoadmore) {
						this.integralInfo.data.push(...res.data.list)
					} else {
						this.integralInfo.data = res.data.list
					}
					this.integralInfo.isEmpty = this.integralInfo.data.length === 0
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		getCreditCouponList(isLoadmore) {
			uni.showLoading({
				title: '加载中'
			})
			getSelectCreditCouponListApi({ ...this.creditCouponInfo.query })
				.then((res) => {
					this.creditCouponInfo.listTotal = res.data.total
					if (isLoadmore) {
						this.creditCouponInfo.data.push(...res.data.list)
					} else {
						this.creditCouponInfo.data = res.data.list
					}
					this.creditCouponInfo.isEmpty = this.creditCouponInfo.data.length === 0
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},

		// 获取会员等级
		getMemberByMemberLevel() {
			getMemberByMemberLevelIdApi({ memberLevelId: this.$store.getters.userInfo.memberLevelId })
				.then((res) => {
					this.levelInfo = res.data
				})
		},
		// 跳转到兑换优惠详情
		goExchangeDetail(item) {
			if (this.$store.getters.userInfo.credit < item.credit) {
				this.isConvertible = true
			} else {
				uni.navigateTo({
					url: `/another-tf/another-serve/exchangeDetail/index?data=${JSON.stringify(item)}`
				})
			}
		},

		handleShareServe(isQuit) {
			if (!this.isLogin()) return
			const data = {
				data: {
					title: `快来查看你的积分吧！`,
					desc: '获取积分能兑换精美礼品哦~',
					link: `${A_TF_MAIN}/#/another-tf/another-serve/integral/index`,
					imageUrl: this.common.seamingImgUrl('1716629235852-feed73b67bb541edb82b41a0937dbdad.png')
				},
				successCb: () => {
					uni.showLoading({
						title: '加载中'
					})
					updateShareCreditApi({})
						.then((res) => {
							uni.hideLoading()
							this.$showToast('分享-成功获得积分！')
						})
						.catch(() => {
							uni.hideLoading()
						})
				},
				failCb: () => { }
			}
			this.$refs.beeWxShareRef.share(data, isQuit)
		}
	},
	onReachBottom() {
		if (this.currentTab === 0) {
			if (this.integralInfo.data.length < this.integralInfo.listTotal) {
				++this.integralInfo.query.page
				this.getIntegralList(true)
			}
		} else if (this.currentTab === 1) {
			if (this.creditCouponInfo.data.length < this.creditCouponInfo.listTotal) {
				++this.creditCouponInfo.query.page
				this.getCreditCouponList(true)
			}
		}
	}
}
</script>

<style lang="less" scoped>
.integral-container {
	padding: 0 20rpx;
	min-height: 100vh;
	background-color: #f8f8f8;
	box-sizing: border-box;

	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}

	.memberBox {
		min-height: 230rpx;
		margin-top: 120rpx;
		width: 100%;
		border-radius: 25rpx;
		background-size: contain;
		position: relative;
		box-sizing: border-box;

		.posBox {
			position: absolute;
			width: 100%;
			left: 0;
			top: -80rpx;
		}

		.memberBoxTop {
			position: relative;

			.memberTopPos {
				background-size: cover;
				height: 302rpx;
				border-radius: 24rpx;
				box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.05);

				.memberTopBg {
					padding: 40rpx 30rpx;

					.integralInfo {
						padding: 0 50rpx;

						.itemBox {
							text-align: center;
						}
					}
				}
			}
		}

		.avatarBox {
			margin-left: 30rpx;

			image {
				width: 110rpx;
				height: 110rpx;
				border: 5rpx solid #FFFFFF;
				border-radius: 50%;
			}
		}

		.nameBox {
			margin-left: 20rpx;

			.name {
				color: #333333;
				margin-right: 30rpx;
			}

			.level {
				image {
					width: 172rpx;
					height: 50rpx;
				}
			}
		}
	}

	.signBox {
		background: #f9f6ed;
		height: 96rpx;
		border-radius: 24rpx;
		padding: 0 20rpx;
	}

	.signInfo {
		background: #FFFFFF;
		border-radius: 16rpx;
		box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.05);
		padding: 30rpx;

		.signItem {
			border-top: 2rpx solid #F3F4F5;
			padding: 30rpx 0;
		}

		.signItem:first-child {
			border-top: none;
		}

		.rightBtn {
			width: 160rpx;
			height: 58rpx;
			line-height: 58rpx;
			background: #FFF9F6;
			border-radius: 10rpx;
			color: #C83732;
			text-align: center;
			font-weight: 300;
			font-size: 24rpx;
		}
	}

	.signExchange {
		box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.05);
		background: #FFFFFF;
		border-radius: 16rpx;
		padding: 40rpx 30rpx;

		.exchangeItem {
			padding-bottom: 20rpx;
			margin-bottom: 20rpx;
			border-bottom: 2rpx #F3F4F5 solid;

			.exchangeLeft {
				.discountBox {
					color: #FDFED6;
					width: 300rpx;
					height: 146rpx;
					background-color: #f3c148;
					background-size: contain;
					padding: 30rpx 25rpx;
				}

				.exchangeInfo {
					.state {
						text-align: center;
						background: #333333;
						color: #FFEBC4;
						font-size: 24rpx;
						margin: 8rpx 0 4rpx 0;
						padding: 8rpx 14rpx;
						border-radius: 8rpx;
					}

					.finish {
						color: #CCCCCC;
						border: 2rpx solid #CCCCCC;
						background: none;
					}

					.integral {
						color: #D72E2E;
					}
				}
			}

			.exchangeRight {
				height: 146rpx;
				display: flex;
				flex-direction: column;
				justify-content: flex-end;

				.exchangeBtn {
					width: 120rpx;
					height: 48rpx;
					line-height: 48rpx;
					text-align: center;
					background: linear-gradient(90deg, #C83732 0%, #E25C44 100%);
					box-shadow: 0 6rpx 12rpx rgba(233, 0, 0, 0.3);
					border-radius: 24rpx;
				}

				.available {
					background: linear-gradient(90deg, #C83732 0%, #E25C44 100%);
					box-shadow: 0 6rpx 12rpx rgba(233, 0, 0, 0.3);
				}
			}
		}

		.exchangeItem:last-child {
			border-bottom: none;
		}
	}
}
</style>

