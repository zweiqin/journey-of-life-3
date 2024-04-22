<template>
	<view class="container">
		<JHeader title="提现" width="50" height="50" style="padding: 24rpx 0 0;"></JHeader>
		<view style="padding: 10rpx 0 0;">
			<view
				style="display: flex;align-items: center;justify-content: space-between;padding: 10rpx 30rpx;background-color: #ffffff;"
				@click="handleBankTagClick"
			>
				<view style="font-size: 28rpx;">银行卡</view>
				<view style="display: flex;align-items: center;">
					<view>{{ bankCardNum }}</view>
					<tui-icon name="arrowright" :size="48" unit="rpx" color="#b19970" margin="0 10rpx 0 0"></tui-icon>
				</view>
			</view>
			<view
				style="display: flex;align-items: center;justify-content: space-between;padding: 10rpx 30rpx;background-color: #ffffff;"
				@click="withdrawalTypeShowFlag = true"
			>
				<view style="font-size: 28rpx;">提现类型</view>
				<view style="display: flex;align-items: center;">
					<view>{{ (withdrawalTypeList.find(i => i.value === withdrawalType) || { text: '出错了' }).text }}</view>
					<tui-icon name="arrowright" :size="48" unit="rpx" color="#b19970" margin="0 10rpx 0 0"></tui-icon>
				</view>
			</view>
			<view style="padding: 20rpx 20rpx 0;">
				<view style="margin-top: 20rpx;font-size: 28rpx;">
					可提现金额：{{ withdrawalPrice || 0 }}元（取整后 {{ withdrawalMoney }} 元）
				</view>
				<!-- <view style="margin-top: 12rpx;border-bottom: 2rpx solid #cccccc;">
					<input
					v-model="withdrawalMoney" type="number" maxlength="9"
					placeholder="请输入提现金额(元)" @input="applycheck"
					/>
					</view> -->
				<view style="color: #dc362e;margin-top: 6rpx;">{{ errMsg }}</view>
				<view v-if="!errMsg" style="margin-top: 10rpx;text-align: right;">
					手续费：{{ typeof withdrawCharge === 'number' ? withdrawCharge : '--' }} 元
				</view>
				<view class="operation-btn">
					<tui-button type="brown" width="520rpx" height="88rpx" margin="10rpx auto 0" @click="applyWithdraw">
						提现<text v-if="withdrawalMoney" style="padding: 0 0 0 8rpx;">{{ withdrawalMoney }}元</text>
					</tui-button>
				</view>
			</view>
		</view>
		<view v-if="withdrawHistoryList && withdrawHistoryList.length" style="margin-top: 14rpx;">
			<view style="background-color: #ffffff;padding: 30rpx;">
				<view style="padding: 0 0 18rpx;" class="fs30 font-color-333">历史记录</view>
				<view
					v-for="(item, index) in withdrawHistoryList" :key="index"
					style="padding: 8rpx 0;font-size: 24rpx;border-top: 2rpx solid #F3F4F5;"
				>
					<view class="flex-items flex-sp-between">
						<view style="color: #999999;">
							<view>流水号：{{ item.orderSn || '--' }}</view>
							<view>手续费：￥{{ item.cost }}</view>
							<view>银行卡号：{{ item.bankCard }}</view>
							<view>{{ item.createTime }}</view>
						</view>
						<view>
							<view style="padding: 10rpx 20rpx;background: #EEEEEE;color: #696868;">
								提现￥{{ item.withdrawalMoney }}
							</view>
							<view style="font-size: 28rpx;color: #201f1f;text-align: center;">到账￥{{ item.actualReceipt }}</view>
							<view class="text-align fs28 font-color-333">
								<text v-if="item.state == 0">审核中</text>
								<text v-else-if="item.state == 1">通过</text>
								<text v-else-if="item.state == 2">拒绝</text>
								<text v-else-if="item.state == 3">打款成功</text>
								<text v-else-if="item.state == 4">打款失败</text>
								<text v-else>--</text>
							</view>
						</view>
					</view>
					<view>
						<view style="text-align: right;">申请时间：{{ item.applyTime }}</view>
						<view v-if="item.state == 2">拒绝原因：{{ item.rejectReason }}</view>
					</view>
				</view>
			</view>
		</view>

		<tui-select
			:list="bankcardselectList" reverse :show="bankTagShowFlag" @confirm="handleBankcardConfirm"
			@close="bankTagShowFlag = false"
		></tui-select>
		<tui-select
			:list="withdrawalTypeList" reverse :show="withdrawalTypeShowFlag"
			@confirm="(e) => (withdrawalTypeShowFlag = false) || (withdrawalType = e.options.value)"
			@close="withdrawalTypeShowFlag = false"
		></tui-select>
	</view>
</template>

<script>
import { getPricePlatformAllApi, getAllBankcardListApi, updateSaveDistributorWithdrawApi, getCommissionBankApi, getSmallAccountBookStatisticsApi } from '../../../api/anotherTFInterface'

export default {
	name: 'Withdraw',
	data() {
		return {
			// 银行卡数据
			bankcardselectList: [],
			bankCardNum: '',
			bankTagShowFlag: false,
			// 提现数据
			withdrawalPrice: 0,
			withdrawHistoryList: [],
			withdrawalMoney: '',
			errMsg: '',
			withdrawalTypeList: [ { value: '1', text: '佣金', checked: false } ],
			withdrawalType: '',
			withdrawalTypeShowFlag: false,
			// 手续费
			withdrawalTimer: '',
			withdrawCharge: ''
		}
	},
	onLoad(options) {
		this.withdrawalType = options.type || '1'
		if (this.withdrawalType) (this.withdrawalTypeList.find((i) => i.value === this.withdrawalType) || {}).checked = true
		getAllBankcardListApi({
			page: 1,
			pageSize: 9999
		}).then((res) => {
			this.bankcardselectList = res.data.list.map((item) => ({
				value: item.bankCard,
				text: `${item.bankName}（${item.bankCard.slice(-4)}）`,
				bankName: item.bankName
			}))
		})
		this.getWithdrawalData()
	},

	watch: {
		withdrawalMoney(value) {
			if ((value + '').includes('.') && (value + '').split('.')[1].length > 2) {
				this.errMsg = '提现金额错误'
			} else if (value === '') {
				this.errMsg = '提现金额不能为空'
			} else if (value <= 1) {
				this.errMsg = '提现金额要大于1元'
			} else if (value > this.withdrawalPrice) {
				this.errMsg = '余额不足，请重新输入申请金额'
			} else if (parseFloat(value) > 1000000) {
				this.errMsg = '提现金额不能超过1000000'
			} else {
				this.errMsg = ''
				if (this.withdrawalTimer) clearTimeout(this.withdrawalTimer)
				this.withdrawalTimer = setTimeout(() => {
					this.getCommission()
				}, 600)
			}
		}
	},
	methods: {
		getCommission() {
			getCommissionBankApi({ amount: this.withdrawalMoney || 0 })
				.then((res) => {
					this.withdrawCharge = res.data.cost
				})
		},
		getWithdrawalData() {
			if (this.withdrawalType === '1') {
				getPricePlatformAllApi({}).then((res) => {
					this.withdrawHistoryList = res.data.withdrawals
				})
				getSmallAccountBookStatisticsApi({})
					.then((res) => {
						this.withdrawalPrice = res.data.totalAmount
						this.withdrawalMoney = Math.floor(this.withdrawalPrice)
					})
			} else {
				getPricePlatformAllApi({}).then((res) => {
					this.withdrawalPrice = res.data.price
					this.withdrawHistoryList = res.data.withdrawals
					this.withdrawalMoney = Math.floor(this.withdrawalPrice)
				})
			}
		},
		applycheck(e) {
			this.$nextTick(() => {
				this.withdrawalMoney = e.target.value.match(/^\d*(\.?\d{0,2})/g)[0] || ''
			})
		},
		handleBankcardConfirm(e) {
			this.bankTagShowFlag = false
			this.bankCardNum = e.options.value
		},
		handleBankTagClick() {
			if (this.bankcardselectList.length) {
				this.bankTagShowFlag = true
			} else {
				uni.showToast({
					title: '你还没有添加银行卡～',
					duration: 2000,
					icon: 'none'
				})
				setTimeout(() => {
					this.go('/another-tf/another-serve/bankcard/addBankcard')
				}, 2000)
			}
		},
		applyWithdraw() {
			if (this.errMsg || !this.withdrawalMoney) {
				uni.showToast({
					title: '提现金额有误',
					duration: 2000,
					icon: 'none'
				})
			} else if (!this.withdrawCharge) {
				uni.showToast({
					title: '手续费错误',
					duration: 2000,
					icon: 'none'
				})
			} else if (!this.bankCardNum) {
				uni.showToast({
					title: '请选择银行卡',
					duration: 2000,
					icon: 'none'
				})
			} else {
				uni.showModal({
					title: '提示',
					content: '确认申请提现？',
					success: (res) => {
						if (res.confirm) {
							uni.showLoading()
							updateSaveDistributorWithdrawApi({
								bankName: this.bankcardselectList.find((i) => i.value === this.bankCardNum).bankName,
								bankCard: this.bankCardNum,
								withdrawalMoney: this.withdrawalMoney,
								withdrawalType: Number(this.withdrawalType)
							}).then((res) => {
								uni.hideLoading()
								uni.showToast({
									title: '申请成功',
									duration: 2000,
									icon: 'none'
								})
								this.withdrawalMoney = ''
								this.$nextTick(() => {
									this.errMsg = ''
								})
								this.getWithdrawalData()
							})
								.catch((e) => {
									uni.hideLoading()
								})
						}
					}
				})
			}
		}
	}
}
</script>

<style lang="less" scoped>
.container {
	min-height: 100vh;
	padding: 20rpx;
	background-color: #F8F8F8;

	.operation-btn {
		/deep/ .tui-btn {
			border-radius: 18rpx;
		}
	}
}
</style>
