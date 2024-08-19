<template>
	<view class="my-wallet-container">
		<JHeader title="我的钱包" width="50" height="50"></JHeader>
		<view
			style="position: relative;padding: 8rpx 0 0;text-align: center;color: #ffffff;background: linear-gradient(90deg, #EF530E 0%, #EF530E 100%);overflow: hidden;"
		>
			<view>
				<view
					style="position: absolute;top: -30%;left: -40%;width: 600rpx;height: 620rpx;background-color: #f16527;border-radius: 50%;"
				>
				</view>
				<view
					style="position: absolute;top: -30%;left: -40%;width: 508rpx;height: 538rpx;background: linear-gradient(101deg, #FFFFFF 26%, rgba(255, 255, 255, 0.0001) 154%);border-radius: 50%;opacity: 0.1;"
				>
				</view>
			</view>
			<view style="position: relative;">
				<view style="padding: 42rpx 0 64rpx;font-size: 28rpx;">
					<view>当前总余额(元)</view>
					<view style="margin-top: 24rpx;font-size: 64rpx;">
						<text style="padding: 0 30rpx 0 80rpx;">
							{{ isShowcount ? '￥' + Number.parseFloat(Number(pricePlatformInfo.totalPrice || 0)).toFixed(2) : '*****' }}
						</text>
						<tui-icon
							:size="50" color="#ffffff" :name="isShowcount ? 'seen' : 'unseen'" unit="rpx"
							margin="0"
							@click="isShowcount = !isShowcount"
						></tui-icon>
					</view>
					<view style="margin-top: 22rpx;color: #ffffff;">
						<text>可提现总余额：{{ isShowcount ? '￥' + Number.parseFloat(Number(pricePlatformInfo.price || 0)).toFixed(2) : '*****' }}</text>
						<text
							style="margin-left: 42rpx;padding: 6rpx 12rpx;font-size: 24rpx;background-color: #F26E34;border-radius: 8rpx;"
							@click="handleMemberAccountWithdraw"
						>
							我要提现
						</text>
					</view>
				</view>
			</view>
		</view>

		<view style="margin-top: 28rpx;">
			<tui-list-view color="#373737" margin-top="2rpx" background-color="#f8f9fb" unlined="all">
				<tui-list-cell
					unlined padding="0 28rpx" :size="30"
					@click="go('/another-tf/another-user/my-wallet/balance-operation')"
				>
					<view
						style="display: flex;justify-content: space-between;align-items: center;padding: 28rpx 0;margin-top: 10rpx;"
					>
						<view style="display: flex;justify-content: space-between;align-items: center;">
							<view style="width: 48rpx;margin-right: 34rpx;">
								<tui-icon name="wallet" :size="48" unit="rpx" color="#3481f5" margin="0"></tui-icon>
							</view>
							<text>余额</text>
						</view>
						<view style="display: flex;justify-content: space-between;align-items: center;">
							<text>{{ isShowcount ? '￥' + Number.parseFloat(Number(pricePlatformInfo.rechargePrice || 0)).toFixed(2) : '*****' }}</text>
							<tui-icon name="arrowright" :size="48" unit="rpx" color="#767676" margin="0 2rpx 0 0"></tui-icon>
						</view>
					</view>
				</tui-list-cell>
				<tui-list-cell
					unlined padding="0 28rpx" :size="30"
					@click="go('/another-tf/another-user/commission-statistics/commission-operation')"
				>
					<view
						style="display: flex;justify-content: space-between;align-items: center;padding: 28rpx 0;margin-top: 10rpx;"
					>
						<view style="display: flex;justify-content: space-between;align-items: center;">
							<view style="width: 48rpx;margin-right: 34rpx;">
								<tui-icon name="member" :size="48" unit="rpx" color="#eb6a00" margin="0"></tui-icon>
							</view>
							<text>推广佣金</text>
						</view>
						<view style="display: flex;justify-content: space-between;align-items: center;">
							<text>{{ isShowcount ? '￥' + Number.parseFloat(Number(pricePlatformInfo.commissionPrice || 0)).toFixed(2) : '*****' }}</text>
							<tui-icon name="arrowright" :size="48" unit="rpx" color="#767676" margin="0 2rpx 0 0"></tui-icon>
						</view>
					</view>
				</tui-list-cell>
				<tui-list-cell unlined padding="0 28rpx" :size="30" @click="go('/another-tf/another-user/voucher/voucher-operation')">
					<view
						style="display: flex;justify-content: space-between;align-items: center;padding: 28rpx 0;margin-top: 10rpx;"
					>
						<view style="display: flex;justify-content: space-between;align-items: center;">
							<view style="width: 48rpx;margin-right: 34rpx;">
								<tui-icon name="coupon" :size="48" unit="rpx" color="#f77754" margin="0"></tui-icon>
							</view>
							<text>代金券</text>
						</view>
						<view style="display: flex;justify-content: space-between;align-items: center;">
							<text>{{ isShowcount ? '￥' + Number.parseFloat(Number(pricePlatformInfo.voucherPrice || 0)).toFixed(2) : '*****' }}</text>
							<tui-icon name="arrowright" :size="48" unit="rpx" color="#767676" margin="0 2rpx 0 0"></tui-icon>
						</view>
					</view>
				</tui-list-cell>
				<tui-list-cell
					unlined padding="0 28rpx" :size="30"
					@click="go('/another-tf/another-user/transaction-funds/transaction-operation')"
				>
					<view
						style="display: flex;justify-content: space-between;align-items: center;padding: 28rpx 0;margin-top: 10rpx;"
					>
						<view style="display: flex;justify-content: space-between;align-items: center;">
							<view style="width: 48rpx;margin-right: 34rpx;">
								<tui-icon name="wealth" :size="48" unit="rpx" color="#ec970c" margin="0"></tui-icon>
							</view>
							<text>消费金</text>
						</view>
						<view style="display: flex;justify-content: space-between;align-items: center;">
							<text>{{ isShowcount ? '￥' + Number.parseFloat(Number(transactionInfo.beePrice || 0)).toFixed(2) : '*****' }}</text>
							<tui-icon name="arrowright" :size="48" unit="rpx" color="#767676" margin="0 2rpx 0 0"></tui-icon>
						</view>
					</view>
				</tui-list-cell>
				<tui-list-cell unlined padding="0 28rpx" :size="30" @click="go('/another-tf/another-user/community-card/index')">
					<view
						style="display: flex;justify-content: space-between;align-items: center;padding: 28rpx 0;margin-top: 10rpx;"
					>
						<view style="display: flex;justify-content: space-between;align-items: center;">
							<view style="width: 48rpx;margin-right: 34rpx;">
								<tui-icon name="unreceive" :size="48" unit="rpx" color="#c60022" margin="0"></tui-icon>
							</view>
							<text>卡包</text>
						</view>
						<view>
							<tui-icon name="arrowright" :size="48" unit="rpx" color="#767676" margin="0 2rpx 0 0"></tui-icon>
						</view>
					</view>
				</tui-list-cell>
				<tui-list-cell unlined padding="0 28rpx" :size="30" @click="go('/another-tf/another-serve/bankcard/index')">
					<view
						style="display: flex;justify-content: space-between;align-items: center;padding: 28rpx 0;margin-top: 10rpx;"
					>
						<view style="display: flex;justify-content: space-between;align-items: center;">
							<view style="width: 48rpx;margin-right: 34rpx;">
								<tui-icon name="bankcard" :size="48" unit="rpx" color="#1a1a1a" margin="0"></tui-icon>
							</view>
							<text>银行卡</text>
						</view>
						<view>
							<tui-icon name="arrowright" :size="48" unit="rpx" color="#767676" margin="0 2rpx 0 0"></tui-icon>
						</view>
					</view>
				</tui-list-cell>
			</tui-list-view>
		</view>
	</view>
</template>

<script>
import { getPricePlatformAllApi, getBeeSelectAmountEntryRecordApi } from '../../../api/anotherTFInterface'

export default {
	name: 'PlatformRecharge',
	onShow() {
		this.getPricePlatformAll()
		this.getTransactionAll()
	},

	data() {
		return {
			isShowcount: true,
			pricePlatformInfo: {
				totalPrice: '', // 账户总余额
				price: '', // 账户可提现金额
				rechargePrice: '', // 账户充值余额
				voucherPrice: '', // 代金券余额
				distributorPrice: '', // 账户分销金额
				beeCoinPrice: '', // 消费金金额，可消费的消费金
				commissionPrice: '' // 推广收益,关系链分佣
			},
			transactionInfo: {
				beePrice: '',
				beeSelectedPrice: '',
				beeSignPrice: '',
				beeConsumptionPrice: '',
				beeToBeWithdrawnPrice: '',
				beeWithdrawnPrice: '',
				beeToBeSettledPrice: ''
			}
		}
	},

	methods: {
		// 刷新用户信息
		getPricePlatformAll() {
			getPricePlatformAllApi({})
				.then((res) => {
					this.pricePlatformInfo = res.data
				})
		},
		getTransactionAll() {
			getBeeSelectAmountEntryRecordApi({})
				.then((res) => {
					this.transactionInfo = res.data
				})
		},

		handleMemberAccountWithdraw() {
			// if (this.pricePlatformInfo.price <= 0) {
			// 	this.$showToast('您暂时没有余额，不能提现')
			// } else {
			this.go('/another-tf/another-serve/withdraw/index')
			// }
		}
	}
}
</script>

<style lang="less" scoped>
.my-wallet-container {
	min-height: 100vh;
	background-color: #f8f9fb;
	box-sizing: border-box;

	/deep/ .j-header-container {
		padding: 24rpx 0 10rpx;
		background-color: #f5f5f5;

		.title {
			font-size: 36rpx;
			color: #222229;
		}
	}
}
</style>
