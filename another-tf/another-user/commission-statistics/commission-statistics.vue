<template>
	<view class="commision-page">
		<view class="back">
			<tui-icon name="arrowleft" color="#000" :size="30" @click="handleBack"></tui-icon>
		</view>

		<view class="top-pane">
			<view class="item">
				<view style="background-color: #ff8700;border-radius: 18rpx;padding: 22rpx;">
					<tui-icon name="wallet" color="#ffffff" size="42" unit="rpx" margin="0"></tui-icon>
				</view>
				<view class="text">可提现</view>
				<view class="value">￥{{ Number.parseFloat(Number(pricePlatformInfo.commissionPrice || 0)).toFixed(2) }}</view>
			</view>
		</view>

		<!-- 列表统计 -->
		<view class="list">
			<view class="list-wrapper">
				<view class="item" @click="go('/another-tf/another-user/commission-statistics/commission-record?today=2')">
					<view style="background-color: #ff8700;border-radius: 18rpx;padding: 22rpx;">
						<tui-icon name="reduce" color="#ffffff" size="42" unit="rpx" margin="0"></tui-icon>
					</view>
					<view class="text">累计佣金</view>
					<tui-icon name="arrowright" :size="48" unit="rpx" color="#767676" margin="0 2rpx 0 0"></tui-icon>
				</view>
				<view class="item" @click="go('/another-tf/another-user/commission-statistics/commission-record?today=1')">
					<view style="background-color: #b548c6;border-radius: 18rpx;padding: 22rpx;">
						<tui-icon name="wealth-fill" color="#ffffff" size="42" unit="rpx" margin="0"></tui-icon>
					</view>
					<view class="text">今日佣金</view>
					<tui-icon name="arrowright" :size="48" unit="rpx" color="#767676" margin="0 2rpx 0 0"></tui-icon>
				</view>
				<view class="item" @click="go('/another-tf/another-user/commission-statistics/commission-record?today=3')">
					<view style="background-color: #22b07d;border-radius: 18rpx;padding: 22rpx;">
						<tui-icon name="bankcard-fill" color="#ffffff" size="42" unit="rpx" margin="0"></tui-icon>
					</view>
					<view class="text">途中佣金</view>
					<tui-icon name="arrowright" :size="48" unit="rpx" color="#767676" margin="0 2rpx 0 0"></tui-icon>
				</view>

				<view class="item" @click="go('/another-tf/another-user/commission-statistics/vip-user')">
					<view style="background-color: #eaf6fc;border-radius: 18rpx;padding: 22rpx;">
						<tui-icon name="friendadd-fill" color="#32a7e2" size="42" unit="rpx" margin="0"></tui-icon>
					</view>
					<view class="text">累计会员(个)</view>
					<tui-icon name="arrowright" :size="48" unit="rpx" color="#767676" margin="0 2rpx 0 0"></tui-icon>
				</view>

				<view class="item" @click="go('/another-tf/another-user/commission-statistics/vip-user?today=1')">
					<view style="background-color: #eaf6fc;border-radius: 18rpx;padding: 22rpx;">
						<tui-icon name="member-fill" color="#b548c6" size="42" unit="rpx" margin="0"></tui-icon>
					</view>
					<view class="text">今日会员(个)</view>
					<tui-icon name="arrowright" :size="48" unit="rpx" color="#767676" margin="0 2rpx 0 0"></tui-icon>
				</view>
			</view>

			<view class="button-wrapper">
				<button
					:class="{ disabled: !pricePlatformInfo.commissionPrice }" class="uni-btn"
					@click="handleWithdrawal(pricePlatformInfo.commissionPrice)"
				>
					去提现
				</button>
			</view>
		</view>

		<tui-toast ref="toast"></tui-toast>
	</view>
</template>

<script>
import { getSmallAccountBookStatisticsApi } from '../../../api/anotherTFInterface'

export default {
	name: 'CommissionStatistics',
	data() {
		return {
			pricePlatformInfo: {
				totalPrice: '',
				price: '',
				rechargePrice: '',
				voucherPrice: '',
				distributorPrice: '',
				beeCoinPrice: '',
				commissionPrice: ''
			}
		}
	},

	onShow() {
		this.getPricePlatformAll()
	},

	methods: {
		handleBack() {
			uni.switchTab({
				url: '/pages/user/user'
			})
		},

		async getPricePlatformAll() {
			try {
				const res = await getSmallAccountBookStatisticsApi({ _isShowToast: false })
				this.pricePlatformInfo = res.data
			} catch (e) {
				if (e.data) this.ttoast({ type: 'fail', content: `${e.data.message}-${e.data.errorData}`, title: '获取佣金详情失败' })
				else this.ttoast({ type: 'fail', content: `请求：${e.errMsg}`, title: '获取佣金详情失败' })
			} finally {
				uni.stopPullDownRefresh()
			}
		},

		async getVipCommissionStatistics() {

		},

		// 点击提现
		handleWithdrawal(account) {
			// if (!account) {
			//   this.ttoast({
			//     type: 'fail',
			//     title: '佣金正在审批中'
			//   });
			//   return;
			// }

			uni.navigateTo({
				url: '/another-tf/another-serve/withdraw/index?type=1'
			})
		}
	},

	onPullDownRefresh() {
		this.getPricePlatformAll()
	}
}
</script>

<style lang="less" scoped>
.commision-page {
	position: relative;
	width: 100vw;
	min-height: 100vh;
	background-color: #f5f7fb;
	display: flex;
	align-items: center;
	flex-direction: column;

	.back {
		position: absolute;
		top: 40rpx;
		left: 40rpx;
		right: 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.uni-btn {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 28rpx;

			.img {
				width: 50rpx;
				height: 50rpx;
				margin-right: 8rpx;
			}
		}
	}

	.top-pane {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 206rpx 56rpx 56rpx 56rpx;
		box-sizing: border-box;
		width: 100vw;

		.item {
			display: flex;
			align-items: center;
			flex-direction: column;
			font-size: 26rpx;
			counter-reset: #3d3d3d;

			.text {
				margin: 16rpx 0 12rpx 0;
			}
		}
	}

	.list {
		flex: 1;
		width: 100vw;
		background-color: #fff;
		padding-bottom: 56rpx;
		border-radius: 80rpx 80rpx 0 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.list-wrapper {
			width: 100%;
			padding: 60rpx 56rpx;
			box-sizing: border-box;
		}

		.item {
			display: flex;
			align-items: center;
			margin-bottom: 46rpx;

			.text {
				flex: 1;
				margin-right: 30rpx;
				margin-left: 30rpx;
			}
		}

		.button-wrapper {
			width: 100%;

			.tip {
				text-align: center;
				margin-bottom: 20rpx;
				font-size: 24rpx;
			}

			.uni-btn {
				height: 80rpx;
				width: 702rpx;
				margin: 0 auto;
				background-color: #fe751a;
				color: #fff;
				font-size: 30rpx;
				font-weight: 500;
				display: flex;
				align-items: center;
				justify-content: center;
				transition: all 350ms;

				&.disabled {
					opacity: 0.7;
				}

				&:active {
					background-color: #ff8f44;
				}
			}
		}
	}
}

.img {
	width: 80rpx;
	height: 80rpx;
	flex-shrink: 0;
}
</style>
