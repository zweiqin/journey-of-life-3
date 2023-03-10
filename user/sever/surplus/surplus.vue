<template>
	<view class="surplus">
		<view class="top-orange">
			<view class="top-orange-main">
				<view class="header">
					<img src="../../../static/images/icon/return-logo.png" alt="" class="return" @click="handleBack">
					<view class="bill">我的账单</view>
				</view>
				<view class="money">可用余额</view>
				<view class="number-list">
					<view class="money-logo">￥</view>
					<view class="number">9999</view>
				</view>
				<view class="square">
					<view class="left">
						<view class="recharge">
							<view class="recharge-l">
								<view class="recharge-round">
									<img src="../../../static/images/icon/czhi.png" alt="" class="recharge-logo">
								</view>
								<view class="text">充值</view>
							</view>
							<view class="recharge-r">
								<img src="../../../static/images/icon/more-logo.png" alt="" class="recharge-more">
							</view>
						</view>
					</view>
					<view class="right">
						<view class="cash">
							<view class="cash-l">
								<view class="cash-round">
									<img src="../../../static/images/icon/tixain.png" alt="" class="cash-logo">
								</view>
								<view class="text">提现</view>
							</view>
							<view class="cash-r">
								<img src="../../../static/images/icon/more-logo.png" alt="" class="cash-more">
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="white-background">
			<view class="note">
				<view class="czhi" @click="choice(0)" :class="{ active: currentTab === 0 }">充值记录</view>
				<view class="tixian" @click="choice(1)" :class="{ active: currentTab === 1 }">提现记录</view>
			</view>
			<view class="item" v-for="item in items1" :key="item.value">
				<view class="list" v-if="currentTab == 0">
					<view class="list-left">
						<view class="round">
							<img src="../../../static/images/icon/czhi.png" alt="" class="logo">
						</view>
						<view class="content">
							<view class="vx">{{ item.label }}</view>
							<view class="time">{{ item.time }}</view>
						</view>
					</view>
					<view class="list-right">{{ item.money }}</view>
				</view>
			</view>
			<view class="item" v-for="item in items2" :key="item.id">
				<view class="list" v-if="currentTab == 1">
					<view class="list-left">
						<view class="round">
							<img src="../../../static/images/icon/tixain.png" alt="" class="logo">
						</view>
						<view class="content">
							<view class="vx">{{ item.label }}</view>
							<view class="time">{{ item.time }}</view>
						</view>
					</view>
					<view class="list-right">{{ item.money }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { items1, items2 } from './config'

export default {
	name: "Surplus",
	props: {

	},
	data() {
		return {
			items1,
			items2,
			currentTab: 0,
		}
	},
	methods: {
		handleBack() {
			uni.switchTab({
				url: '/pages/user/user',
			})
		},
		choice(index) {
			this.currentTab = index
			console.log(this.currentTab)
		},
	},
	created() { }
}
</script>

<style lang="less" scoped>
.surplus {
	width: 100%;

	.top-orange {
		background: linear-gradient(165deg, #FF8C2E 8%, #FF8C2E 19%, #FFC117 92%);
		padding: 39upx 32upx 0upx 32upx;

		.top-orange-main {
			.header {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.return {
					width: 24upx;
					height: 48upx;
				}

				.bill {
					font-size: 28upx;
					color: #FFFFFF;
				}
			}

			.money {
				padding-top: 58upx;
				font-size: 28upx;
				color: rgba(255, 255, 255, 0.64);
				text-align: center;
			}

			.number-list {
				padding-bottom: 60upx;
				display: flex;
				align-items: baseline;
				justify-content: center;

				.money-logo {
					font-size: 40upx;
					font-weight: bold;
					color: #FFFFFF;
				}

				.number {
					font-size: 72upx;
					font-weight: bold;
					color: #FFFFFF;
				}
			}

			.square {
				display: flex;
				justify-content: space-between;
				padding-bottom: 80upx;

				.left {
					width: 331upx;
					height: 144upx;
					border-radius: 24upx;
					background: rgba(255, 255, 255, 0.32);
					border: 2upx solid rgba(255, 255, 255, 0.16);

					.recharge {
						margin: 40upx 32upx;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.recharge-l {
							display: flex;
							align-items: center;

							.recharge-round {
								width: 64upx;
								height: 64upx;
								background: #FFFFFF;
								border-radius: 40upx;
								display: flex;
								align-items: center;
								justify-content: center;

								.recharge-logo {
									width: 40upx;
									height: 40upx;
								}
							}

							.text {
								font-size: 32upx;
								font-weight: 500;
								color: #FFFFFF;
								padding-left: 16upx;
							}
						}

						.recharge-r {
							.recharge-more {
								width: 32upx;
								height: 32upx;
							}
						}
					}
				}

				.right {
					width: 331upx;
					height: 144upx;
					border-radius: 24upx;
					background: rgba(255, 255, 255, 0.32);
					border: 2upx solid rgba(255, 255, 255, 0.16);

					.cash {
						margin: 40upx 32upx;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.cash-l {
							display: flex;
							align-items: center;

							.cash-round {
								width: 64upx;
								height: 64upx;
								background: #FFFFFF;
								border-radius: 40upx;
								display: flex;
								align-items: center;
								justify-content: center;

								.cash-logo {
									width: 40upx;
									height: 40upx;
								}
							}

							.text {
								font-size: 32upx;
								font-weight: 500;
								color: #FFFFFF;
								padding-left: 16upx;
							}
						}

						.cash-r {
							.cash-more {
								width: 32upx;
								height: 32upx;
							}
						}
					}
				}
			}
		}
	}

	.white-background {
		position: relative;
		top: -16upx;


		.note {
			display: flex;
			background: #F6F6F5;
			border-radius: 24upx 24upx 0upx 0upx;

			.czhi {
				width: 53%;
				height: 96upx;
				border-radius: 24upx 24upx 0upx 0upx;
				background: #F6F6F5;
				// position: absolute;
				// left: 0upx;
				font-size: 28upx;
				font-weight: 500;
				color: #8F8D85;
				display: flex;
				align-items: center;
				justify-content: center;
				&.active{
					background: #FFFFFF;
					color: #141000;
				}
			}

			.tixian {
				width: 50%;
				height: 96upx;
				border-radius: 0upx 24upx 0upx 0upx;
				background: #F6F6F5;
				// position: absolute;
				// right: 0upx;
				font-size: 28upx;
				color: #8F8D85;
				display: flex;
				align-items: center;
				justify-content: center;
				&.active{
					background: #FFFFFF;
					color: #141000;
				}
			}
		}

		.item {
			padding: 0 32upx;

			.list {
				padding: 33upx 0;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 2upx solid #F1F1F0;
				.list-left {
					display: flex;

					.round {
						width: 80upx;
						height: 80upx;
						background: #FFF1E6;
						border-radius: 40upx;
						display: flex;
						align-items: center;
						justify-content: center;

						.logo {
							width: 48upx;
							height: 48upx;
						}
					}

					.content {
						padding-left: 16upx;

						.vx {
							font-size: 28upx;
							color: #141000;
						}

						.time {
							font-size: 24upx;
							color: #605D52;
						}
					}
				}

				.list-right {
					font-size: 36upx;
					font-weight: 500;
					color: #141000;
				}
			}
		}
	}
}
</style>
