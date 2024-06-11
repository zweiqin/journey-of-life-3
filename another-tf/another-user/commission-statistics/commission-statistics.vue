<template>
	<view class="commision-page">
		<view class="back">
			<tui-icon name="arrowleft" color="#000" :size="30" @click="handleBack"></tui-icon>
		</view>

		<!-- 上面三个统计 -->
		<view class="top-pane">
			<view class="item" @click="go('/another-tf/another-user/commission-statistics/commission-record?today=1')">
				<view style="background-color: #b548c6;border-radius: 18rpx;padding: 22rpx;">
					<tui-icon name="wealth-fill" color="#ffffff" size="42" unit="rpx" margin="0"></tui-icon>
				</view>
				<view class="text">今日佣金</view>
				<view class="value">￥{{ Number.parseFloat(Number(commissionData.todaySum || 0)).toFixed(2) }}</view>
			</view>

			<view class="item" @click="go('/another-tf/another-user/commission-statistics/commission-record?today=2')">
				<view style="background-color: #ff8700;border-radius: 18rpx;padding: 22rpx;">
					<tui-icon name="wallet" color="#ffffff" size="42" unit="rpx" margin="0"></tui-icon>
				</view>
				<!-- <view class="text">累计佣金</view>
					<view class="value">￥{{ commissionData.remainAmount || 0 }}</view> -->
				<view class="text">可提现</view>
				<view class="value">￥{{ Number.parseFloat(Number(commissionData.totalAmount || 0)).toFixed(2) }}</view>
			</view>
			<view class="item" @click="go('/another-tf/another-user/commission-statistics/commission-record?today=3')">
				<view style="background-color: #22b07d;border-radius: 18rpx;padding: 22rpx;">
					<tui-icon name="bankcard-fill" color="#ffffff" size="42" unit="rpx" margin="0"></tui-icon>
				</view>
				<view class="text">途中佣金</view>
				<view class="value">￥{{ Number.parseFloat(Number(commissionData.inTheAccount || 0)).toFixed(2) }}</view>
			</view>
		</view>

		<!-- 列表统计 -->
		<view class="list">
			<view class="list-wrapper">
				<view class="item" @click="go('/another-tf/another-user/commission-statistics/vip-user')">
					<view style="background-color: #eaf6fc;border-radius: 18rpx;padding: 22rpx;">
						<tui-icon name="friendadd-fill" color="#32a7e2" size="42" unit="rpx" margin="0"></tui-icon>
					</view>
					<view class="text">累计会员(个)</view>
					<view class="value">{{ commissionData.fans || 0 }}</view>
				</view>

				<view class="item" @click="go('/another-tf/another-user/commission-statistics/vip-user?today=1')">
					<view style="background-color: #eaf6fc;border-radius: 18rpx;padding: 22rpx;">
						<tui-icon name="member-fill" color="#b548c6" size="42" unit="rpx" margin="0"></tui-icon>
					</view>
					<view class="text">今日会员(个)</view>
					<view class="value">{{ commissionData.todayFans || 0 }}</view>
				</view>

				<!-- <view class="item">
					<view style="background-color: #eaf6fc;border-radius: 18rpx;padding: 22rpx;">
					<tui-icon name="up" color="#f6c859" size="42" unit="rpx" margin="0"></tui-icon>
					</view>
					<view class="text">可提现(元)</view>
					<view class="value">{{ commissionData.totalAmount || 0 }}</view>
					</view>

					<view class="item">
					<view style="background-color: #eaf6fc;border-radius: 18rpx;padding: 22rpx;">
					<tui-icon name="circle-fill" color="#22b07d" size="42" unit="rpx" margin="0"></tui-icon>
					</view>
					<view class="text">已提现(元)</view>
					<view class="value">{{ commissionData.withdrawAmount || 0 }}</view>
					</view> -->
			</view>

			<view class="button-wrapper">
				<!-- <view class="tip">可提现 ￥{{ commissionData.totalAmount || 0 }}</view> -->
				<button
					:class="{ disabled: !commissionData.totalAmount || commissionData.totalAmount == 0 }" class="uni-btn"
					@click="handleWithdrawal(commissionData.totalAmount)"
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
			commissionData: {}
		}
	},

	onShow() {
		this.getCommissionData()
	},

	methods: {
		handleBack() {
			uni.switchTab({
				url: '/pages/user/user'
			})
		},

		async getCommissionData() {
			try {
				const res = await getSmallAccountBookStatisticsApi({ _isShowToast: false })
				this.commissionData = res.data
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
		this.getCommissionData()
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
		top: 40upx;
		left: 40upx;
		right: 40upx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.uni-btn {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 28upx;

			.img {
				width: 50upx;
				height: 50upx;
				margin-right: 8upx;
			}
		}
	}

	.top-pane {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 206upx 56upx 56upx 56upx;
		box-sizing: border-box;
		width: 100vw;

		.item {
			display: flex;
			align-items: center;
			flex-direction: column;
			font-size: 26upx;
			counter-reset: #3d3d3d;

			.text {
				margin: 16upx 0 12upx 0;
			}

			.value {
				font-weight: 500;
			}
		}
	}

	.list {
		flex: 1;
		width: 100vw;
		background-color: #fff;
		padding-bottom: 56upx;
		border-radius: 80upx 80upx 0 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.list-wrapper {
			width: 100%;
			padding: 60upx 56upx;
			box-sizing: border-box;
		}

		.item {
			display: flex;
			align-items: center;
			margin-bottom: 46upx;

			.text {
				flex: 1;

				margin-right: 30upx;
				margin-left: 30upx;
			}
		}

		.button-wrapper {
			width: 100%;

			.tip {
				text-align: center;
				margin-bottom: 20upx;
				font-size: 24upx;
			}

			.uni-btn {
				height: 80upx;
				width: 702upx;
				margin: 0 auto;
				background-color: #fe751a;
				color: #fff;
				font-size: 30upx;
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
	width: 80upx;
	height: 80upx;
	flex-shrink: 0;
}
</style>
