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

		<view style="padding: 12rpx 34rpx 0;">
			<view
				style="padding: 52rpx 42rpx 36rpx;border-radius: 20rpx;"
				:style="{ background: `url(${common.seamingImgUrl('1721199293161-orange-line-bg.png')}) no-repeat center top/cover` }"
			>
				<view style="text-align: left;white-space: nowrap;">
					<view
						style="display: flex;align-items: center;justify-content: space-between;flex-wrap: wrap;margin: 0 -15rpx;"
					>
						<view style="flex: 1;margin: 0 15rpx 30rpx;color: #FFFFFF;">
							<view style="font-size: 28rpx">总消费金（元）</view>
							<view style="margin-top: 20rpx;font-size: 48rpx;font-weight: bold;text-shadow: 0px 2px 2px rgba(232, 89, 0, 0.51);">
								{{ Number.parseFloat(Number(transactionInfo.beePrice)).toFixed(2) || 0 }}
							</view>
						</view>
						<view style="flex: 1;margin: 0 15rpx 30rpx;color: #FFFFFF;">
							<view style="font-size: 28rpx">可消费</view>
							<view style="margin-top: 20rpx;font-size: 48rpx;font-weight: bold;text-shadow: 0px 2px 2px rgba(232, 89, 0, 0.51);">
								{{ Number.parseFloat(Number(transactionInfo.beeConsumptionPrice)).toFixed(2) || 0 }}
							</view>
						</view>
						<view style="flex: 1;margin: 0 15rpx 30rpx;color: #FFFFFF;">
							<view style="font-size: 28rpx">可签到</view>
							<view style="margin-top: 20rpx;font-size: 48rpx;font-weight: bold;text-shadow: 0px 2px 2px rgba(232, 89, 0, 0.51);">
								{{ Number.parseFloat(Number(transactionInfo.beeSignPrice)).toFixed(2) || 0 }}
							</view>
						</view>
					<!-- <view style="flex: 1;margin: 0 15rpx 30rpx;color: #FFFFFF;" @click="isShowTransactionDialog = true">
						<view style="font-size: 28rpx">
						<text>待选择</text>
						<tui-icon name="arrowright" color="#000000" :size="30" unit="rpx" margin="0 0 0 4rpx"></tui-icon>
						</view>
						<view style="margin-top: 20rpx;font-size: 48rpx;font-weight: bold;color: #1A66FF;text-shadow: 0px 2px 2px rgba(232, 89, 0, 0.51);">
						{{ Number.parseFloat(Number(transactionInfo.beeSelectedPrice)).toFixed(2) || 0 }}
						</view>
						</view> -->
					</view>
					<view
						style="display: flex;align-items: center;justify-content: space-between;flex-wrap: wrap;"
					>
						<view style="flex: 1;margin: 0 15rpx 30rpx;color: #FFFFFF;">
							<view style="font-size: 28rpx">签到待提现</view>
							<view style="margin-top: 20rpx;font-size: 48rpx;font-weight: bold;text-shadow: 0px 2px 2px rgba(232, 89, 0, 0.51);">
								{{ Number.parseFloat(Number(transactionInfo.beeToBeWithdrawnPrice)).toFixed(2) || 0 }}
							</view>
						</view>
						<view style="flex: 1;margin: 0 15rpx 30rpx;color: #FFFFFF;">
							<view style="font-size: 28rpx">签到已提现</view>
							<view style="margin-top: 20rpx;font-size: 48rpx;font-weight: bold;text-shadow: 0px 2px 2px rgba(232, 89, 0, 0.51);">
								{{ Number.parseFloat(Number(transactionInfo.beeWithdrawnPrice)).toFixed(2) || 0 }}
							</view>
						</view>
						<view style="flex: 1;margin: 0 15rpx 30rpx;color: #FFFFFF;">
							<view style="font-size: 28rpx">签到待结算</view>
							<view style="margin-top: 20rpx;font-size: 48rpx;font-weight: bold;text-shadow: 0px 2px 2px rgba(232, 89, 0, 0.51);">
								{{ Number.parseFloat(Number(transactionInfo.beeToBeSettledPrice)).toFixed(2) || 0 }}
							</view>
						</view>
					</view>
				</view>
				<view class="middle-btn" style="display: flex;align-items: center;justify-content: space-between;margin: 0 -15rpx;">
					<tui-button
						type="white" width="100%" height="74rpx" margin="0 15rpx"
						:size="28" bold
						@click="go('/another-tf/another-serve/withdraw/index?type=2')"
					>
						<view style="display: flex;align-items: center;line-height: 1;">
							<text>去提现</text>
							<tui-icon name="arrowright" color="#eb672c" :size="30" unit="rpx" margin="0 0 0 10rpx"></tui-icon>
						</view>
					</tui-button>
					<tui-button
						v-if="transactionInfo.beeSelectedPrice"
						type="white" width="100%" height="74rpx" margin="0 15rpx"
						:size="28" bold
						@click="isShowTransactionDialog = true"
					>
						待选择（{{ Number.parseFloat(Number(transactionInfo.beeSelectedPrice)).toFixed(2) }}）
					</tui-button>
				</view>
			</view>
		</view>

		<view style="margin-top: 24rpx;padding: 0 34rpx;">
			<view style="font-size: 34rpx;font-weight: bold;">消费金明细</view>
			<view style="margin-top: 24rpx;background-color: #ffffff;border-radius: 18rpx;">
				<view v-if="transactionRecordList && transactionRecordList.length" style="padding: 12rpx 28rpx;">
					<view
						v-for="(item, index) in transactionRecordList" :key="item.id"
						style="display: flex;align-items: center;justify-content: space-between;padding: 24rpx 0;border-bottom: 2rpx solid #efefef;"
						@click="handleClickTransactionRecord(item)"
					>
						<view style="flex: 1;display: flex;align-items: center;">
							<view style="flex: 1;width: 0;margin-left: 14rpx;">
								<view
									style="font-size: 30rpx;font-weight: bold;color: #222229;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
								>
									<text>
										<text v-if="item.targetType === 1">充值</text>
										<text v-else-if="item.targetType === 2">提现</text>
										<text v-else-if="item.targetType === 3">
											<text v-if="item.actionType === 4">订单（已退款）</text>
											<text v-else>订单</text>
										</text>
										<text v-else-if="item.targetType === 4">退款</text>
										<text v-else-if="item.targetType === 5">
											<text v-if="item.actionType === 4">赠送（已退款）</text>
											<text v-else>赠送</text>
										</text>
										<text v-else>--</text>
									</text>
									<text v-if="item.number">
										-{{ item.number }}
									</text>
								</view>
								<view style="margin-top: 16rpx;font-size: 26rpx;color: #888889;">{{ item.createTime }}</view>
							</view>
						</view>
						<view style="margin-left: 12rpx;text-align: right;">
							<view style="margin-top: 6rpx;font-size: 34rpx;font-weight: bold;color: #ea5e21;">
								<text>
									{{ [1, 4].includes(item.targetType) || ([ 5 ].includes(item.targetType) && [ 4 ].includes(item.actionType)) || ([ 3 ].includes(item.targetType) && [1, 2, 3, 5].includes(item.actionType)) ? '+'
										: [ 2 ].includes(item.targetType) || ([ 5 ].includes(item.targetType) && [1, 2, 3, 5].includes(item.actionType)) || ([ 3 ].includes(item.targetType) && [ 4 ].includes(item.actionType)) ? '-'
											: '？' }}{{ Number.parseFloat(Math.abs(item.fee) || 0).toFixed(2) }}
								</text>
							</view>
						</view>
					</view>
				</view>
				<view style="padding-bottom: 45rpx;">
					<LoadingMore
						:status="!isEmpty && !transactionRecordList.length
							? 'loading' : !isEmpty && transactionRecordList.length && (transactionRecordList.length >= transactionRecordTotal) ? 'no-more' : ''"
					>
					</LoadingMore>
					<tui-no-data v-if="isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无记录~</tui-no-data>
				</view>
			</view>
		</view>

		<tui-dialog
			style="position: relative;z-index: 888;" :buttons="[{ text: '取消' }, { text: '确认选择', color: '#586c94' }]"
			:show="isShowTransactionDialog" title="消费金用途选择" @click="handleTransactionDialog"
		>
			<template #content>
				<view>
					<view style="margin: 0 0 10rpx;">待选择：{{ Number.parseFloat(Number(transactionInfo.beeSelectedPrice)).toFixed(2) || 0 }}</view>
					<view style="display: flex;justify-content: space-between;align-items: center;">
						<view style="font-size: 32rpx;color: #333333;">类型：</view>
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
					<!-- <tui-input
						v-model="transactionSelectAmount" padding="26rpx 0" label="消费金数额" type="number"
						placeholder="请输入消费金数额"
						></tui-input> -->
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
import { getBeeSelectAmountEntryRecordApi, getBeeCurrencyDistributorApi, getBeeSelectEntryRecordApi } from '../../../api/anotherTFInterface'
import { APPLY_NAME } from '../../../config'

export default {
	name: 'TransactionOperation',
	onShow() {
		this.getTransactionAll()
		this.getTransactionStatisticsRecord()
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
			isEmpty: false,
			transactionRecordTotal: 0,
			transactionRecordList: [],
			queryInfo: {
				page: 1,
				pageSize: 20,
				type: 0,
				time: 0
			},
			// 消费金选择相关
			isShowTransactionDialog: false,
			transactionType: '1'
			// transactionSelectAmount: '',
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
		getTransactionStatisticsRecord(isLoadmore) {
			uni.showLoading()
			getBeeCurrencyDistributorApi({ ...this.queryInfo })
				.then((res) => {
					this.transactionRecordTotal = res.data.total
					if (isLoadmore) {
						this.transactionRecordList.push(...res.data.list)
					} else {
						this.transactionRecordList = res.data.list
					}
					this.isEmpty = this.transactionRecordList.length === 0
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		handleClickTransactionRecord(item) {
			uni.navigateTo({
				url: '/another-tf/another-user/transaction-funds/transaction-record-detail',
				success: () => {
					setTimeout(() => {
						uni.$emit('sendTransactionRecordDetailMsg', { transactionRecordData: item })
					}, 400)
				}
			})
		},
		handleTransactionDialog(e) {
			if (e.index === 0) {
				// this.transactionSelectAmount = ''
				this.isShowTransactionDialog = false
			} else if (e.index === 1) {
				// if (!this.transactionSelectAmount) return this.$showToast('缺少消费金数额')
				if (!this.transactionType) return this.$showToast('请选择消费金用途')
				uni.showLoading()
				getBeeSelectEntryRecordApi({
					type: Number(this.transactionType)
					// amount: this.transactionSelectAmount
				})
					.then((res) => {
						uni.hideLoading()
						// this.transactionSelectAmount = ''
						this.transactionType = '1'
						this.isShowTransactionDialog = false
						this.$showToast('操作成功', 'success')
						setTimeout(() => {
							this.getTransactionAll()
						}, 2000)
					})
					.catch(() => {
						uni.hideLoading()
					})
			}
		}
	},
	onReachBottom() {
		if (this.transactionRecordList.length < this.transactionRecordTotal) {
			++this.queryInfo.page
			this.getTransactionStatisticsRecord(true)
		}
	}
}
</script>

<style lang="less" scoped>
.transaction-operation-operation {
	min-height: 100vh;
	background-color: #f1f1f1;
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
		/deep/ .tui-btn-white {
			color: #ea6024 !important;
			background: #fff3e4 !important;
		}
	}
}
</style>
