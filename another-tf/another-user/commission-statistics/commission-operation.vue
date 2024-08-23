<template>
	<view class="commission-operation">
		<JHeader title="推广佣金" width="50" height="50"></JHeader>
		<view style="display: flex;justify-content: flex-end;">
			<tui-button
				type="black" width="220rpx" height="60rpx" margin="0"
				plain link
				@click="go('/another-tf/another-user/commission-statistics/commission-record')"
			>
				收支明细
			</tui-button>
		</view>

		<view style="display: flex;flex-direction: column;align-items: center;margin-top: 100rpx;">
			<tui-icon name="wealth-fill" :size="130" unit="rpx" color="#eb6a00" margin="0"></tui-icon>
			<!-- <view style="margin-top: 26rpx;font-size: 36rpx;">推广佣金</view>
				<view style="margin-top: 26rpx;font-size: 74rpx;font-weight: bold;">
				￥{{ Number.parseFloat(Number(pricePlatformInfo.remainAmount)).toFixed(2) || 0 }}
				</view> -->
			<view style="margin-top: 26rpx;font-size: 36rpx;">可提现佣金</view>
			<view style="margin-top: 26rpx;font-size: 74rpx;font-weight: bold;">
				￥{{ Number.parseFloat(Number(pricePlatformInfo.commissionPrice)).toFixed(2) || 0 }}
			</view>
			<!-- <view style="margin-top: 20rpx;font-size: 36rpx;">
				待到账：￥
				{{ Number.parseFloat(Number(pricePlatformInfo.inTheAccount)).toFixed(2) || 0 }}
				</view> -->
			<view class="operation-btn">
				<view style="padding-top: 100rpx;">
					<tui-button
						type="gray" width="280rpx" height="78rpx" margin="0"
						@click="go('/another-tf/another-serve/withdraw/index?type=1')"
					>
						提现
					</tui-button>
				</view>
				<view style="padding-top: 18rpx;">
					<tui-button
						type="primary" width="280rpx" height="78rpx" margin="0"
						@click="go('/another-tf/another-user/commission-statistics/vip-user')"
					>
						我的会员
					</tui-button>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
import { getPricePlatformAllApi } from '../../../api/anotherTFInterface'

export default {
	name: 'CommissionOperation',
	onShow() {
		this.getPricePlatformAll()
	},

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

	methods: {
		getPricePlatformAll() {
			uni.showLoading()
			getPricePlatformAllApi({})
				.then((res) => {
					uni.hideLoading()
					this.pricePlatformInfo = res.data
				})
				.catch(() => {
					uni.hideLoading()
				})
		}
	}
}
</script>

<style lang="less" scoped>
.commission-operation {
	min-height: 100vh;
	background-color: #f8f9fb;
	box-sizing: border-box;

	/deep/ .j-header-wrapper {
		padding: 24rpx 0 10rpx;
		background-color: #f5f5f5;

		.title {
			font-size: 36rpx;
			color: #222229;
			font-weight: normal;
		}
	}

	.operation-btn {
		/deep/ .tui-btn {
			display: inline-block;
			border-radius: 18rpx;
		}
	}
}
</style>
