<template>
	<view class="container">
		<JHeader title="提现" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view class="addressBack-box">
			<view style="font-size: 28upx;text-align: right;">
				可提现金额：{{ price || 0 }}元
			</view>
			<view class="consignee-box bor-line-F7F7F7">
				<input
					v-model="balance" type="number" maxlength="9" class="fs28"
					placeholder-class="consignee"
					placeholder="请输入提现金额(元)" @input="applycheck"
				/>
			</view>
			<view class="bankTag-box bor-line-F7F7F7 flex-row-plus flex-sp-between flex-items" @click="bankTagClick">
				<view class="fs28 addressTag">银行卡</view>
				<view>
					<label>{{ cardNum }}</label>
					<tui-icon name="arrowright" :size="48" unit="upx" color="#b19970" margin="0 20upx 0 0"></tui-icon>
				</view>
			</view>
			<view class="apply-box">
				<view class="apply-withdraw" @click="applyWithdraw">申请提现</view>
			</view>
		</view>
		<view v-if="withdrawHistoryList && withdrawHistoryList.length" class="withdraw-history">
			<view class="history-list">
				<view class="history-head">
					<label class="history-label fs30 font-color-333">历史记录</label>
				</view>
				<view v-for="(item, index) in withdrawHistoryList" :key="index" class="history-content">
					<view class="withdraw-detail flex-items flex-sp-between">
						<view class="detail-top">
							<view class="fs24 font-color-999 mar-top-10">流水号：{{ item.number || '--' }}</view>
							<view>
								<label class="fs24 font-color-999">银行卡号：{{ item.bankCard }}</label>
							</view>
							<view class="fs24 font-color-999 mar-top-10">{{ item.createTime }}</view>
						</view>
						<view>
							<view class="detail-bottom text-align">
								<label v-if="item.state == 0" class="fs28 font-color-333">审核中</label>
								<label v-else-if="item.state == 1" class="fs28 font-color-333">通过</label>
								<label v-else-if="item.state == 2" class="fs28 font-color-333">拒绝</label>
							</view>
							<view class="apply-balance">￥{{ item.withdrawalMoney }}</view>
						</view>
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
			balance: '',
			cardNum: '',
			bankcardId: 0,
			bankName: '',
			bankTagShowFlag: false,
			choosedValueList: [ 0 ],
			bankcardList: [],
			bankcardselectList: [ { value: '', label: '' } ],
			price: 0,
			withdrawHistoryList: []
		}
	},
	onLoad(options) {
		this.initBankcardList()
		this.getBalance()
	},
	methods: {
		getBalance() {
			getPricePlatformAllApi({}).then((res) => {
				this.price = res.data.price
				this.withdrawHistoryList = res.data.withdrawals
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
		applycheck(e) {
			// 正则表达试
			e.target.value = e.target.value.match(/^\d*(\.?\d{0,2})/g)[0] || null
			// 重新赋值给input
			this.$nextTick(() => {
				this.balance = e.target.value
			})
		},
		applyWithdraw() {
			if (this.balance === '') {
				uni.showToast({
					title: '提现金额不能为空',
					duration: 2000,
					icon: 'none'
				})
			} else if (this.balance > this.price) {
				uni.showToast({
					title: '余额不足，请重新输入申请金额',
					duration: 2000,
					icon: 'none'
				})
			} else if (parseFloat(this.balance) > 1000000) {
				uni.showToast({
					title: '提现金额不能超过1000000',
					duration: 2000,
					icon: 'none'
				})
			} else if (this.bankName == '' || this.bankName == null) {
				uni.showToast({
					title: '请选择银行卡',
					duration: 2000,
					icon: 'none'
				})
			} else {
				updateSaveDistributorWithdrawApi({
					bankName: this.bankName,
					bankCard: this.cardNum,
					withdrawalMoney: this.balance
				}).then((res) => {
					uni.showToast({
						title: '申请成功',
						duration: 2000,
						icon: 'none'
					})
					this.balance = ''
					this.getBalance()
					this.initBankcardList()
				})
			}
			// else {
			// 	let dotPos = this.balance.indexOf(".")
			// 	let length = this.balance.length
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
		},
		bankTagClick() {
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
		bankcardConfirm(e) {
			this.bankTagShowFlag = false
			this.cardNum = e.options.value
			this.bankName = e.options.text
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
		padding: 30upx 30upx;

		.consignee-box {
			padding-bottom: 36upx;
			width: 690upx;
			margin-top: 20upx;

			.consignee {
				color: #999999;
				font-size: 28upx;
			}
		}

		.apply-withdraw {
			width: 100%;
			height: 100upx;
			line-height: 100upx;
			color: #FFEBC4;
			text-align: center;
			background: #333333;
			margin: 0 auto;
			margin-top: 20rpx;
		}

		.bankTag-box {
			margin-top: 19px;
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

			.history-label {
				height: 92rpx;
				line-height: 92rpx;
			}

			.history-content {
				border-top: 2rpx solid #F3F4F5;

				.withdraw-detail {
					height: 150rpx;

					.apply-balance {
						padding: 10upx 20upx;
						font-size: 24rpx;
						background: #EEEEEE;
						display: block;
						text-align: center;
						color: #999999;
					}
				}
			}
		}
	}
}
</style>
