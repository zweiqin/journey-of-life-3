<template>
	<view class="commission-statistics-container">
		<JHeader title="我的账本" width="50" height="50"></JHeader>
		<view style="background-color: #f1f1f1;padding: 32rpx 34rpx 0;">
			<view
				style="display: flex;justify-content: space-between;align-items: center;padding: 40rpx 42rpx 76rpx;background-color: #ffe9d7;"
				:style="{ background: `url(${common.seamingImgUrl('1721199293161-orange-line-bg.png')}) no-repeat center top/cover` }"
			>
				<view style="color: #FFFFFF;">
					<view style="font-size: 28rpx">可提现（元）</view>
					<view style="margin-top: 20rpx;font-size: 48rpx;font-weight: bold;text-shadow: 0px 2px 2px rgba(232, 89, 0, 0.51);">￥{{ Number.parseFloat(Number(pricePlatformInfo.commissionPrice || 0)).toFixed(2) }}</view>
				</view>
				<view class="middle-btn">
					<tui-button
						type="white" width="168rpx" height="62rpx" margin="0 0 0 20rpx"
						shape="circle" :size="28"
						@click="handleWithdrawal(pricePlatformInfo.commissionPrice)"
					>
						<view style="display: flex;align-items: center;line-height: 1;">
							<text>去提现</text>
							<tui-icon name="arrowright" color="#eb672c" :size="30" unit="rpx" margin="0 0 0 10rpx"></tui-icon>
						</view>
					</tui-button>
				</view>
			</view>
		</view>

		<!-- 列表统计 -->
		<view style="margin-top: -46rpx;background-color: #f1f1f1;">
			<view style="padding: 0 44rpx;background-color: #fcfcfc;border-radius: 26rpx 26rpx 0 0;overflow: hidden;">
				<view
					style="position: relative;height: 56rpx;border-radius: 0 0 20rpx 20rpx;overflow: hidden;background-color: #ffe9d6;box-shadow: 0px -4px 8px 6px #ffe9d6;"
				>
					<view
						style="position: absolute;top: 0;left: 50%;width: 32rpx;height: 14rpx;margin-left: -16rpx;background-color: #fc841a;clip-path: polygon(0 0, 100% 0, 50% 100%);"
					>
					</view>
				</view>
				<view style="margin: 30rpx -20rpx 0 0;">
					<view
						style="display: flex;justify-content: space-between;align-items: center;padding: 34rpx 0;"
						@click="go('/another-tf/another-user/commission-statistics/commission-record?type=1')"
					>
						<view style="display: flex;align-items: center;">
							<image
								:src="common.seamingImgUrl('1721203463844-yongjinruzhang.png')"
								style="width: 36rpx;height: 36rpx;margin-right: 18rpx;" mode="widthFix"
							/>
							<view>佣金入账</view>
						</view>
						<tui-icon name="arrowright" :size="48" unit="rpx" color="#000000" margin="0 2rpx 0 0"></tui-icon>
					</view>
					<view
						style="display: flex;justify-content: space-between;align-items: center;padding: 34rpx 0;"
						@click="go('/another-tf/another-user/commission-statistics/commission-record?type=2')"
					>
						<view style="display: flex;align-items: center;">
							<image
								:src="common.seamingImgUrl('1721203471792-yongjinchuzhang.png')"
								style="width: 36rpx;height: 36rpx;margin-right: 18rpx;" mode="widthFix"
							/>
							<view>佣金出账</view>
						</view>
						<tui-icon name="arrowright" :size="48" unit="rpx" color="#000000" margin="0 2rpx 0 0"></tui-icon>
					</view>

					<view
						style="display: flex;justify-content: space-between;align-items: center;padding: 34rpx 0;"
						@click="go('/another-tf/another-user/commission-statistics/vip-user')"
					>
						<view style="display: flex;align-items: center;">
							<image
								:src="common.seamingImgUrl('1721203481796-leijihuiyuan.png')"
								style="width: 36rpx;height: 36rpx;margin-right: 18rpx;" mode="widthFix"
							/>
							<view>累计会员</view>
						</view>
						<view style="display: flex;align-items: center;">
							<text style="color: #656565;line-height: 1;">
								{{ fansDataInfo.fans }}个
							</text>
							<tui-icon name="arrowright" :size="48" unit="rpx" color="#000000" margin="0 2rpx 0 16rpx"></tui-icon>
						</view>
					</view>

					<view
						style="display: flex;justify-content: space-between;align-items: center;padding: 34rpx 0;"
						@click="go('/another-tf/another-user/commission-statistics/vip-user?today=1')"
					>
						<view style="display: flex;align-items: center;">
							<image
								:src="common.seamingImgUrl('1721203486190-jinrihuiyuan.png')"
								style="width: 36rpx;height: 36rpx;margin-right: 18rpx;" mode="widthFix"
							/>
							<view>今日会员</view>
						</view>
						<view style="display: flex;align-items: center;">
							<text style="color: #656565;line-height: 1;">
								{{ fansDataInfo.todayFans }}个
							</text>
							<tui-icon name="arrowright" :size="48" unit="rpx" color="#000000" margin="0 2rpx 0 16rpx"></tui-icon>
						</view>
					</view>
				</view>
			</view>
		</view>

		<tui-toast ref="toast"></tui-toast>
	</view>
</template>

<script>
import { getPricePlatformAllApi, getFansListApi } from '../../../api/anotherTFInterface'

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
			},
			fansDataInfo: {
				fans: 0, // 当前粉丝数
				todayFans: 0 // 今日粉丝
			}
		}
	},

	onShow() {
		this.getPricePlatformAll()
		this.getCommissionStatistics()
	},

	methods: {
		async getPricePlatformAll() {
			try {
				const res = await getPricePlatformAllApi({ _isShowToast: false })
				this.pricePlatformInfo = res.data
			} catch (e) {
				if (e.data) this.ttoast({ type: 'fail', content: `${e.data.message}-${e.data.errorData}`, title: '获取佣金详情失败' })
				else this.ttoast({ type: 'fail', content: `请求：${e.errMsg}`, title: '获取佣金详情失败' })
			} finally {
				uni.stopPullDownRefresh()
			}
		},

		getCommissionStatistics() {
			uni.showLoading()
			getFansListApi({ today: 0 }).then((res) => {
				this.fansDataInfo = res.data
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
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
.commission-statistics-container {
	min-height: 100vh;
	background-color: #fcfcfc;
	box-sizing: border-box;

	/deep/ .j-header-container {
		padding: 18rpx 0 16rpx;
		background-color: #ffffff;

		.title {
			font-size: 34rpx;
			color: #222229;
		}
	}

	.middle-btn {
		/deep/ .tui-btn {
			color: #ea6024 !important;
			background: #fff3e4 !important;
		}
	}
}
</style>
