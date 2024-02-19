<template>
	<view class="container">
		<JHeader title="提现" width="50" height="50" style="padding: 24rpx 0 0;"></JHeader>
		<view class="addressBack-box">
			<view class="bankTag-box bor-line-F7F7F7 flex-row-plus flex-sp-between flex-items" @click="handleBankTagClick">
				<view class="fs28 addressTag">银行卡</view>
				<view>
					<label>{{ bankCardNum }}</label>
					<tui-icon name="arrowright" :size="48" unit="rpx" color="#b19970" margin="0 20rpx 0 0"></tui-icon>
				</view>
			</view>
			<view style="margin-top: 20rpx;font-size: 28rpx;">
				可提现金额：{{ price || 0 }}元
			</view>
			<view class="consignee-box bor-line-F7F7F7">
				<input
					v-model="withdrawalAmount" type="number" maxlength="9" class="fs28"
					placeholder-class="consignee"
					placeholder="请输入提现金额(元)" @input="applycheck"
				/>
			</view>
			<view style="color: red;margin-top: 10rpx;">{{ errMsg }}</view>
			<view v-if="!errMsg" style="margin-top: 10rpx;text-align: right;">
				手续费：{{ typeof withdrawCharge === 'number' ? withdrawCharge : '--' }} 元
			</view>
			<view class="apply-box">
				<view class="apply-withdraw" @click="applyWithdraw">申请提现</view>
			</view>
		</view>
		<view v-if="withdrawHistoryList && withdrawHistoryList.length" class="withdraw-history">
			<view class="history-list">
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
							<view style="padding: 10rpx 20rpx;background: #EEEEEE;color: #696868;">提现￥{{ item.withdrawalMoney }}</view>
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
		<!-- 弹窗 -->
		<tui-select
			:list="bankcardselectList" reverse :show="bankTagShowFlag" @confirm="bankcardConfirm"
			@close="bankTagShowFlag = false"
		></tui-select>
	</view>
</template>

<script>
import { getPricePlatformAllApi, getAllBankcardListApi, updateSaveDistributorWithdrawApi, getCommissionBankApi } from '../../../api/anotherTFInterface'
import { handleDebounce } from '../../../utils'
export default {
	name: 'Withdraw',
	filters: {
		parseMoney(money) {
			return parseFloat(money / 100).toFixed(2)
		},
		parseStatus(status) {
			if (status == 0) {
				return '审核中'
			} else if (status == 1) {
				return '已通过'
			}
			return '已拒绝'
		}
	},
	data() {
		return {
			// 银行卡数据
			bankcardList: [],
			bankcardselectList: [ { value: '', label: '' } ],
			bankCardNum: '',
			bankName: '',
			bankTagShowFlag: false,
			// 提现数据
			price: 0,
			withdrawHistoryList: [],
			withdrawalAmount: '',
			errMsg: '',
			// 手续费
			withdrawCharge: '',
			handleDebounce: ''
		}
	},
	onLoad(options) {
		this.handleDebounce = handleDebounce(this.getCommission, 500)
		this.initBankcardList()
		this.getBalance()
	},

	watch: {
		withdrawalAmount(value) {
			if ((value + '').includes('.') && (value + '').split('.')[1].length > 2) {
				this.errMsg = '提现金额错误'
			} else if (value === '') {
				this.errMsg = '提现金额不能为空'
			} else if (value === 0) {
				this.errMsg = '提现金额不能等于零'
			} else if (value < 1) {
				this.errMsg = '提现金额不能小于1元'
			} else if (value > this.price) {
				this.errMsg = '余额不足，请重新输入申请金额'
			} else if (parseFloat(value) > 1000000) {
				this.errMsg = '提现金额不能超过1000000'
			} else {
				this.errMsg = ''
				this.handleDebounce()
			}
		}
	},
	methods: {
		getCommission() {
			getCommissionBankApi({ amount: this.withdrawalAmount })
				.then((res) => {
					this.withdrawCharge = res.data.cost
				})
		},
		getBalance() {
			getPricePlatformAllApi({}).then((res) => {
				this.price = res.data.price
				this.withdrawHistoryList = res.data.withdrawals
			})
		},
		applycheck(e) {
			// 正则表达试
			e.target.value = e.target.value.match(/^\d*(\.?\d{0,2})/g)[0] || null
			// 重新赋值给input
			this.$nextTick(() => {
				this.withdrawalAmount = e.target.value
			})
		},
		initBankcardList() {
			this.bankcardselectList = []
			getAllBankcardListApi({
				page: 1,
				pageSize: 100
			}).then((res) => {
				this.bankcardList = res.data
				for (let i = 0; i < this.bankcardList.total; i++) {
					this.bankcardselectList.push({ value: this.bankcardList.list[i].bankCard, text: this.bankcardList.list[i].bankName })
				}
			})
		},
		bankcardConfirm(e) {
			this.bankTagShowFlag = false
			this.bankCardNum = e.options.value
			this.bankName = e.options.text
		},
		handleBankTagClick() {
			if (this.bankcardList.total > 0) {
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
			if (this.errMsg || !this.withdrawalAmount) {
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
				uni.showLoading()
				updateSaveDistributorWithdrawApi({
					bankName: this.bankName,
					bankCard: this.bankCardNum,
					withdrawalMoney: this.withdrawalAmount
				}).then((res) => {
					uni.hideLoading()
					uni.showToast({
						title: '申请成功',
						duration: 2000,
						icon: 'none'
					})
					this.withdrawalAmount = ''
					this.$nextTick(() => {
						this.errMsg = ''
					})
					this.getBalance()
					this.initBankcardList()
				})
					.catch((e) => {
						uni.hideLoading()
					})
			}
			// else {
			// 	let dotPos = this.withdrawalAmount.indexOf(".")
			// 	let length = this.withdrawalAmount.length
			// 	console.log(dotPos,222)
			// 	console.log(length,333)
			// 	if (length - dotPos > 3) {
			// 		uni.showToast({
			// 			title: "提现金额只能精确到小数点后两位",
			// 			duration: 2000,
			// 			icon: 'none'
			// 		})
			// 		return
			// 	}
			// }
		}
	}
}
</script>

<style lang="less" scoped>
.container {
	min-height: 100vh;
	padding: 20rpx;
	background-color: #F8F8F8;

	.addressBack-box {
		background-color: #FFFFFF;
		padding: 30rpx 30rpx;

		.consignee-box {
			padding-bottom: 36rpx;
			width: 690rpx;
			margin-top: 20rpx;

			.consignee {
				color: #999999;
				font-size: 28rpx;
			}
		}

		.apply-withdraw {
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			color: #FFEBC4;
			text-align: center;
			background: #333333;
			margin: 0 auto;
			margin-top: 20rpx;
		}

		.bankTag-box {
			padding-bottom: 19px;

			.addressTag {
				color: #999999
			}
		}
	}

	.withdraw-history {
		margin-top: 14rpx;

		.history-list {
			background: white;
			padding: 30rpx;

		}
	}
}
</style>
