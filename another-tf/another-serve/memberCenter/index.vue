<template>
	<view class="memberCenter">
		<JHeader title="会员中心" width="50" height="50"></JHeader>
		<view
			class="memberBg"
			:style="{ 'backgroundImage': 'url(' + memberListData[activeIndex].memberLevelBackground + ')', 'padding-top': paddingTop + 'px' }"
		>
			<view class="member-top" :style="{ 'top': topHeight + 'px' }">
				<view class="memberTopInfo">
					<view class="backBox">
						<tui-icon
							name="arrowleft" :size="50" unit="rpx" color="#ffffff"
							margin="0 10rpx 0 10rpx"
							@click="back"
						></tui-icon>
					</view>
					<view class="memberTit fs30 font-color-FFF">会员中心</view>
				</view>
			</view>
			<view class="memberBox">
				<view class="posBox">
					<view class="memberBoxTop">
						<view class="memberTopPos">
							<swiper
								class="swiper pro-box" next-margin="30rpx" previous-margin="30rpx" :current="activeIndex"
								:indicator-dots="false" :autoplay="false" @change="swiperChange"
							>
								<swiper-item v-for="(item, index) in memberListData" :key="index" class="pro-item-warp">
									<view class="box">
										<view class="memberTopBg" :style="{ backgroundImage: 'url(' + item.memberLevelBackground + ')' }">
											<view class="flex-display flex-sp-between">
												<view class="nameBox">
													<view class="name fs36">{{ $store.getters.userInfo.name }}</view>
													<view class="level">
														<image :src="common.seamingImgUrl(item.memberLevelIcon)"></image>
													</view>
												</view>
												<view class="avatarBox">
													<image :src="common.seamingImgUrl($store.getters.userInfo.headImage)"></image>
												</view>
											</view>
											<view class="growing">
												<view class="growingValue flex-display flex-sp-between">
													<label class="fs24 fs-weight-400 font-color-333">
														当前会员成长值
														{{ $store.getters.userInfo.growth }}
													</label>
													<label
														v-if="nextGrowth !== 0 && nextGrowth !== item.growth"
														class="fs24 fs-weight-400 font-color-333 mar-left-20"
													>
														{{ nextGrowth }}
													</label>
												</view>
												<view v-if="$store.getters.userInfo.growth < nextGrowth" class="progressBar">
													<view style="width: 100%">
														<progress
															activeColor="#FFEBC4"
															:percent="getPercent($store.getters.userInfo.growth, nextGrowth)" active stroke-width="2"
														/>
													</view>
												</view>
												<view v-else class="currentName">
													以超越该等级
												</view>
												<!--                      <view class="flex-display flex-sp-between"> -->
												<!--                        <label class="fs24 font-color-71521B">{{$store.getters.userInfo.memberLevelName}}</label> -->
												<!--                        <label class="fs24 font-color-71521B">{{$store.getters.userInfo.nextLevelName}}</label> -->
												<!--                      </view> -->
											</view>
										</view>
									</view>
								</swiper-item>
							</swiper>
						</view>
					</view>
				</view>
			</view>
			<view class="equity">
				<view class="equityBox">
					<view class="equityTit">我的权益</view>
					<view class="equityList">
						<view v-for="item in equityList" :key="item.memberId" class="equityItem">
							<image :src="common.seamingImgUrl(item.memberIcon)"></image>
							<view class="fs26">{{ item.memberName }}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="signIn">
				<view class="signInList">
					<view class="signTit fs30 font-color-333">快速成长</view>
					<view class="signInBox">
						<view class="signItem flex-items flex-sp-between">
							<view class="itemLeft flex-items">
								<view class="leftIcon">
									<tui-icon name="bag-fill" :size="92" unit="rpx" color="#f7f0de" margin="0 30rpx 0 0"></tui-icon>
								</view>
								<view class="leftInfo">
									<label class="fs28 font-color-333">购物</label>
									<view class="fs24 font-color-999">购买商品获取相应成长值</view>
								</view>
							</view>
							<view class="rightBtn" @click="goToShopping">
								去购物
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getMemberByMemberLevelIdApi, getAllMemberLevelInfoApi, getMemberShipListApi } from '../../../api/anotherTFInterface'
export default {
	name: 'Index',
	data() {
		return {
			equityList: [],
			levelInfo: {},
			isShow: false,
			memberListData: [],
			nextGrowth: 0,
			activeIndex: 0,
			topHeight: 10,
			paddingTop: 50
		}
	},
	onLoad() {
		// #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
		const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
		this.topHeight = menuButtonInfo.top
		this.paddingTop = this.paddingTop + this.topHeight
		// #endif
		// #ifdef APP
		this.topHeight = 50
		this.paddingTop = 100
		// #endif
		// 定时器防止app一开始进入时页面混乱问题
		setTimeout(() => {
			this.getMemberShipList()
		}, 200)
		this.$store.dispatch('auth/refrshUserInfoAction', () => {
			this.getMemberByMemberLevel()
		})
		this.getMemberList()
	},
	methods: {
		// 返回上一级
		back() {
			uni.navigateBack()
		},
		swiperChange(item) {
			this.activeIndex = item.detail.current
			let num = 0
			num = this.activeIndex + 1
			if (num === this.memberListData.length) {
				this.nextGrowth = this.memberListData[this.activeIndex].growth
			} else {
				this.nextGrowth = this.memberListData[this.activeIndex + 1].growth
			}
			this.equityList = this.memberListData[this.activeIndex].membershipList
		},
		getMemberList() {
			getAllMemberLevelInfoApi({}).then((res) => {
				this.memberListData = res.data
				this.memberListData.forEach((item, index) => {
					if (item.memberLevelId === this.$store.getters.userInfo.memberLevelId) {
						this.activeIndex = index
						let num = 0
						num = this.activeIndex + 1
						if (num === this.memberListData.length) {
							this.nextGrowth = this.memberListData[this.activeIndex].growth
						} else {
							this.nextGrowth = this.memberListData[this.activeIndex + 1].growth
						}
						this.equityList = this.memberListData[this.activeIndex].membershipList
					}
				})
			})
		},
		getMemberShipList() {
			// 获取会员信息
			uni.showLoading({
				mask: true,
				title: '加载中...'
			})
			getMemberShipListApi({}).then((res) => {
				uni.hideLoading()
				this.equityList = res.data
				this.isShow = true
			})
		},
		// 去首页
		goToShopping() {
			this.$switchTab('/pages/index/index')
		},
		getPercent(num, total) {
			num = parseFloat(num)
			total = parseFloat(total)
			if (isNaN(num) || isNaN(total)) {
				return '-'
			}
			return total <= 0 ? '0%' : Math.round((num / total) * 10000) / 100.0
		},
		// 获取会员等级
		getMemberByMemberLevel() {
			getMemberByMemberLevelIdApi({ memberLevelId: this.$store.getters.userInfo.memberLevelId })
				.then((res) => {
					this.levelInfo = res.data
				})
		}
	}
}
</script>

<style lang="less" scoped>
.memberCenter {
	min-height: 800rpx;
	background-size: contain;
	box-sizing: border-box;

	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}

	.memberBg {
		background-repeat: no-repeat;
		padding-top: 50rpx;
	}

	.memberBox {
		width: 100%;
		//background: #523e3a;
		border-radius: 25rpx;
		background-size: contain;
		position: relative;
		box-sizing: border-box;

		.memberBoxTop {
			position: relative;

			.memberTopPos {
				overflow: hidden;

				.pro-box {
					height: 300rpx;
				}

				.swiper {
					.box {
						height: 300rpx;
						padding: 4rpx 10rpx;
					}
				}
			}

			.memberTopBg {
				background-size: cover;
				background-repeat: no-repeat;
				border-radius: 30rpx;
				padding: 40rpx 30rpx 30rpx 30rpx;
				box-shadow: 0 0 5rpx rgba(90, 90, 90, .5);
				height: 290rpx;

				.currentName {
					font-size: 26rpx;
					margin-top: 50rpx;
					color: #71521B;
				}
			}
		}

		.avatarBox {
			image {
				width: 110rpx;
				height: 110rpx;
				border: 5rpx solid #FFFFFF;
				border-radius: 50%;
			}
		}

		.nameBox {
			.name {
				color: #333333;
				margin-right: 30rpx;
				margin-bottom: 10rpx;
			}

			.level {
				image {
					width: 172rpx;
					height: 50rpx;
				}
			}
		}

		.growing {
			.growingValue {
				margin-top: 30rpx;
			}

			.progressBar {
				height: 20rpx;
				width: 100%;
				margin: 20rpx 0;
			}
		}
	}

	.equity {
		border-radius: 25rpx 25rpx 0 0;
		padding: 30rpx;
		background: #F8F8F8;
		margin-top: 50rpx;

		.equityBox {
			background: #FFFFFF;
			min-height: 326rpx;
			border-radius: 20rpx;
			padding: 10rpx 30rpx 30rpx 30rpx;

			.equityTit {
				font-weight: bold;
				height: 92rpx;
				line-height: 92rpx;
			}

			.equityList {
				border-top: 2rpx solid #F3F4F5;
				display: flex;
				flex-flow: wrap;
				padding-top: 30rpx;
				text-align: center;

				.equityItem {
					width: 25%;
					color: #666666;

					image {
						width: 92rpx;
						height: 92rpx;
					}
				}
			}
		}
	}

	.signIn {
		padding: 0 30rpx 30rpx 30rpx;
		background: #F8F8F8;

		.signInList {
			background: #FFFFFF;
			border-radius: 20rpx;
			padding: 0 30rpx 30rpx 30rpx;

			.signTit {
				font-weight: bold;
				height: 92rpx;
				line-height: 92rpx;
			}

			.signInBox {
				.signItem {
					border-top: 2rpx solid #F3F4F5;
					padding: 30rpx 0;
				}

				.rightBtn {
					width: 160rpx;
					height: 58rpx;
					line-height: 58rpx;
					background: #333333;
					border-radius: 10rpx;
					color: #FFEBC4;
					text-align: center;
				}
			}
		}
	}

	.member-top {
		width: 100%;
		position: fixed;
		z-index: 99;
		left: 0;

		.memberTopInfo {
			position: relative;
			width: 100%;
			height: 60rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.backBox {
			position: absolute;
			left: 10rpx;
			top: 0rpx;
		}
	}
}
</style>

<style>
page {
	background: #F8F8F8;
}

.progressBar /deep/ .uni-progress-bar {
	background-color: rgb(235, 235, 235, 0.6) !important;
	height: 5rpx !important;
	border-radius: 22rpx;
}

.progressBar /deep/ .uni-progress-bar .uni-progress-inner-bar {
	border-radius: 22rpx;
}
</style>
