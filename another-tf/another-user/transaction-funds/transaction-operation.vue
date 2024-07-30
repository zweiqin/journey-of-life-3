<template>
	<view class="transaction-operation-operation">
		<JHeader title="消费金账户" width="50" height="50"></JHeader>
		<view style="display: flex;justify-content: space-between;align-items: center;">
			<tui-button type="gray" width="240rpx" height="66rpx" margin="0" plain link @click="isShowExplainPopup = true">
				<view style="display: flex;justify-content: center;align-items: center;">
					<tui-icon name="explain" :size="34" unit="rpx" color="#020202" margin="0"></tui-icon>
					<text style="margin-left: 4rpx;font-size: 34rpx;color: #020202;">消费金说明</text>
				</view>
			</tui-button>
			<tui-button
				type="black" width="220rpx" height="60rpx" margin="0"
				plain link :size="34"
				@click="go('/another-tf/another-user/transaction-funds/transaction-record')"
			>
				收支明细
			</tui-button>
		</view>

		<view style="display: flex;flex-direction: column;align-items: center;margin-top: 100rpx;">
			<view style="padding: 10rpx;background-color: #388ceb;border-radius: 50%;">
				<view style="padding: 26rpx;background-color: #ffffff;border-radius: 50%;">
					<view style="padding: 10rpx;background-color: #e78e00;border-radius: 10rpx;transform: rotateZ(45deg);">
						<view style="width: 16rpx;height: 16rpx;background-color: #ffffff;box-sizing: border-box;"></view>
					</view>
				</view>
			</view>
			<view style="margin-top: 56rpx;font-size: 36rpx;">总消费金</view>
			<view style="margin-top: 26rpx;font-size: 74rpx;font-weight: bold;">
				￥{{ Number.parseFloat(Number(transactionInfo.beePrice)).toFixed(2) || 0 }}
			</view>
			<view style="width: 100%;text-align: center;">
				<view style="display: flex;justify-content: space-around;padding-top: 26rpx;">
					<view style="flex: 1;">
						<view style="font-size: 36rpx;font-weight: bold;">
							{{ Number.parseFloat(Number(transactionInfo.beeConsumptionPrice)).toFixed(2) || 0 }}
						</view>
						<view style="margin-top: 10rpx;font-size: 30rpx;">可消费</view>
					</view>
					<view style="flex: 1;">
						<view style="font-size: 36rpx;font-weight: bold;">
							{{ Number.parseFloat(Number(transactionInfo.beeSignPrice)).toFixed(2) || 0 }}
						</view>
						<view style="margin-top: 10rpx;font-size: 30rpx;">可签到</view>
					</view>
					<view style="flex: 1;" @click="isShowTransactionDialog = true">
						<view style="font-size: 36rpx;font-weight: bold;color: #1A66FF;">
							{{ Number.parseFloat(Number(transactionInfo.beeSelectedPrice)).toFixed(2) || 0 }}
						</view>
						<view style="margin-top: 10rpx;font-size: 30rpx;">
							<text>待选择</text>
							<tui-icon name="arrowright" color="#000000" :size="30" unit="rpx" margin="0 0 0 4rpx"></tui-icon>
						</view>
					</view>
				</view>
				<view style="display: flex;justify-content: space-around;padding-top: 26rpx;">
					<view style="flex: 1;">
						<view style="font-size: 36rpx;font-weight: bold;">
							{{ Number.parseFloat(Number(transactionInfo.beeToBeWithdrawnPrice)).toFixed(2) || 0 }}
						</view>
						<view style="margin-top: 10rpx;font-size: 30rpx;">签到待提现</view>
					</view>
					<view style="flex: 1;">
						<view style="font-size: 36rpx;font-weight: bold;">
							{{ Number.parseFloat(Number(transactionInfo.beeWithdrawnPrice)).toFixed(2) || 0 }}
						</view>
						<view style="margin-top: 10rpx;font-size: 30rpx;">签到已提现</view>
					</view>
					<view style="flex: 1;">
						<view style="font-size: 36rpx;font-weight: bold;">
							{{ Number.parseFloat(Number(transactionInfo.beeToBeSettledPrice)).toFixed(2) || 0 }}
						</view>
						<view style="margin-top: 10rpx;font-size: 30rpx;">签到待结算</view>
					</view>
				</view>
			</view>
			<view>
				<view style="padding-top: 100rpx;">
					<tui-button
						type="gray" width="280rpx" height="78rpx" margin="0"
						@click="go('/another-tf/another-serve/withdraw/index?type=2')"
					>
						提现
					</tui-button>
				</view>
			</view>
		</view>
		<view
			class="operation-btn"
			style="position: fixed;bottom: 0;z-index: 1;width: 100%;padding: 40rpx 24rpx;text-align: center;box-sizing: border-box;"
		>
			<tui-button type="gray" width="180rpx" height="60rpx" margin="0" plain link @click="isShowExplainPopup = true">
				<view style="display: flex;justify-content: center;align-items: center;">
					<text style="margin-right: 4rpx;font-size: 26rpx;color: #777777;">权益说明</text>
					<tui-icon name="explain" :size="30" unit="rpx" color="#777777" margin="0"></tui-icon>
				</view>
			</tui-button>
		</view>

		<tui-dialog
			style="position: relative;z-index: 888;" :buttons="[{ text: '取消' }, { text: '确认提现', color: '#586c94' }]"
			:show="isShowTransactionDialog" title="订单财务提现" @click="handleTransactionDialog"
		>
			<template #content>
				<view>
					<view style="display: flex;justify-content: space-between;align-items: center;">
						<view style="font-size: 32rpx;color: #333333;">提现类型：</view>
						<view style="flex: 1;">
							<tui-radio-group
								:value="transactionType"
								@change="(e) => transactionType = e.detail.value"
							>
								<view style="display: flex;flex-wrap: wrap;align-items: center;">
									<tui-label
										v-for="(item, index) in [{ name: '消费', value: '1' }, { name: '签到', value: '2' }]"
										:key="index"
									>
										<tui-list-cell padding="16rpx">
											<view>
												<tui-radio :checked="false" :value="item.value" color="#07c160" border-color="#999">
												</tui-radio>
												<text>{{ item.name }}</text>
											</view>
										</tui-list-cell>
									</tui-label>
								</view>
							</tui-radio-group>
						</view>
					</view>
					<tui-input
						v-model="transactionSelectAmount" padding="26rpx 0" label="消费金数额" type="number"
						placeholder="请输入消费金数额"
					></tui-input>
				</view>
			</template>
		</tui-dialog>

		<tui-bottom-popup :z-index="993" :mask-z-index="992" :show="isShowExplainPopup" @close="isShowExplainPopup = false">
			<view style="padding: 26rpx 40rpx;">
				<view style="text-align: center;">消费金说明</view>
				<view style="margin-top: 34rpx;font-size: 30rpx;">
					<view>1、如何获得消费金</view>
					<view>用用户在{{ APPLY_NAME }}平台的商城购买特定活动商品，根据消费金额获得一定比例的消费金（根据活动商品显示为准）；</view>
					<view>2、使用规则</view>
					<view>（1）消费金仅可在{{ APPLY_NAME }}平台的【商圈】商家使用，用户可使用消费金进行支付抵扣商品费用（仅限又“支持消费金”标签的商家才可使用）；</view>
					<view>（2）用户可通过“{{ APPLY_NAME }}APP/小程序/H5-我的-我的钱包-消费金”的消费金页面查询消费金的数量和使用记录；</view>
					<view>（3）已使用的消费金不支持撤销或退回；</view>
					<view>（4）若用户暂停/注销账号，或用户存在违规行为的，则平台将取消该用户账号内的消费金权益。</view>
					<view>3、使用消费金支付规则说明</view>
					<view>（1）使用消费金支付仅可在{{ APPLY_NAME }}平台支付方式下使用，不支持微信支付、外卡支付、余额支付、代金券支付、推广佣金支付。</view>
					<view>（2）仅限有“支持消费金”标签的商家才可使用。</view>
					<view>（3）若用户进行退款，在退款成功后，消费金会返回用户，退款记录可在“{{ APPLY_NAME }}APP/小程序/H5-我的-我的钱包-蜜蜂币”，点击【收入明细】查看。</view>
				</view>
				<view style="margin-top: 28rpx;">
					<tui-button type="warning" width="180rpx" height="64rpx" margin="0 auto" @click="isShowExplainPopup = false">
						好的
					</tui-button>
				</view>
			</view>
		</tui-bottom-popup>

	</view>
</template>

<script>
import { getBeeSelectAmountEntryRecordApi, getBeeSelectEntryRecordApi } from '../../../api/anotherTFInterface'
import { APPLY_NAME } from '../../../config'

export default {
	name: 'TransactionOperation',
	onShow() {
		this.getTransactionAll()
	},

	data() {
		return {
			APPLY_NAME,
			transactionInfo: {
				beePrice: '', // 总消费金
				beeSelectedPrice: '', // 待选择的消费金
				beeSignPrice: '', // 可签到的消费金
				beeConsumptionPrice: '', // 可消费的消费金
				beeToBeWithdrawnPrice: '', // 签到待提现消费金
				beeWithdrawnPrice: '', // 签到已提现消费金
				beeToBeSettledPrice: '' // 签到待结算消费金
			},
			isShowExplainPopup: false,
			// 消费金选择相关
			isShowTransactionDialog: false,
			transactionType: '1',
			transactionSelectAmount: ''
		}
	},

	methods: {
		// 刷新用户信息
		getTransactionAll() {
			getBeeSelectAmountEntryRecordApi({})
				.then((res) => {
					this.transactionInfo = res.data
				})
		},
		handleTransactionDialog(e) {
			if (e.index === 0) {
				this.transactionSelectAmount = ''
				this.isShowTransactionDialog = false
			} else if (e.index === 1) {
				if (!this.transactionSelectAmount) return this.$showToast('缺少消费金数额')
				if (!this.transactionType) return this.$showToast('请选择消费金用途')
				uni.showLoading()
				getBeeSelectEntryRecordApi({
					type: Number(this.transactionType),
					amount: this.transactionSelectAmount
				})
					.then((res) => {
						uni.hideLoading()
						this.transactionSelectAmount = ''
						this.transactionType = '1'
						this.isShowTransactionDialog = false
						this.$showToast('操作成功', 'success')
					})
					.catch(() => {
						uni.hideLoading()
					})
			}
		}
	}
}
</script>

<style lang="less" scoped>
.transaction-operation-operation {
	min-height: 100vh;
	background-color: #f8f9fb;
	box-sizing: border-box;

	/deep/ .j-header-container {
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
		}
	}
}
</style>
