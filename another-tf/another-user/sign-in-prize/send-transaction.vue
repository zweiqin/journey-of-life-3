<template>
	<view class="send-transaction-container">
		<view
			:style="{ background: `url(${common.seamingImgUrl('1721703584058-blue-white-bg-color.png')}) no-repeat center top/contain` }"
		>
			<JHeader :dark="false" title="消费金提现额度签到" width="50" height="50"></JHeader>

			<view style="position: relative;padding: 30rpx 26rpx 0;">
				<view style="position: absolute;top: 2%;right: 3%;width: 360rpx;">
					<image style="width: 100%" :src="common.seamingImgUrl('1722998438111-gold-money.png')" mode="widthFix" />
				</view>
				<view style="color: #ffffff;">
					<view style="display: flex;align-items: center;text-shadow: 0px 1px 0px #048CFB;">
						<view>
							<view>可签到消费金（元）</view>
							<view style="font-size: 54rpx;font-weight: bold;">
								{{ Number.parseFloat(Number(transactionInfo.beeSignPrice)).toFixed(2) || 0 }}
							</view>
						</view>
						<view style="margin-left: 20rpx;">
							<view>可提现消费金（元）</view>
							<view style="font-size: 54rpx;font-weight: bold;">
								{{ Number.parseFloat(Number(transactionInfo.beeToBeWithdrawnPrice)).toFixed(2) || 0 }}
							</view>
						</view>
					</view>
					<view
						style="width: fit-content;margin: 24rpx 0 0;padding: 6rpx 30rpx;font-size: 28rpx;background: rgba(255, 255, 255, 0.2);border-radius: 32rpx;"
						@click="go('/another-tf/another-user/transaction-funds/transaction-operation')"
					>
						<text>去提现</text>
						<tui-icon name="arrowright" color="#ffffff" :size="26" unit="rpx" margin="0 0 0 8rpx"></tui-icon>
					</view>
				</view>
				<view
					style="margin-top: 28rpx;padding: 30rpx 24rpx 40rpx;background: linear-gradient(180deg, #FFF8CE -17%, #CEECFF -7%, #FFFFFF 22%);border-radius: 20rpx;"
				>
					<view>
						<text style="font-weight: bold;">已累计签到</text>
						<text style="margin-left: 8rpx;color: #1E7AEA;">{{ recordList.length }}天</text>
					</view>
					<view style="margin-top: 58rpx;">
						<view style="display: flex;align-items: center;text-align: center;">
							<view
								v-for="(item, index) in recordList" :key="item.termId"
								style="flex: 1;margin: 0 6rpx;padding: 8rpx;color: #ffffff;background: linear-gradient(151deg, #69D0FF 0%, #31A9FF 100%), #F2F1EF;border-radius: 84rpx;"
							>
								<view
									style="display: inline-block;width: fit-content;padding: 8rpx;background: linear-gradient(180deg, #ffe96f 0%, #ff9c07 100%);border-radius: 50%;box-shadow: 0px 4px 8px 0px #0073FF;overflow: hidden;"
								>
									<view
										style="width: fit-content;padding: 8rpx;background: linear-gradient(180deg, #feb606 0%, #ff9301 100%);border-radius: 50%;line-height: 1;"
									>
										<tui-icon name="check" color="#ffffff" :size="32" unit="rpx" margin="0"></tui-icon>
									</view>
								</view>
								<view style="padding: 14rpx 0;">{{ transactionDayList[index] || item.beeAmount || 0 }}</view>
							</view>
							<view
								v-for="index in (7 - recordList.length)" :key="index"
								style="flex: 1;margin: 0 6rpx;padding: 8rpx;color: #9FACB9;background: #EFF6FD;border-radius: 84rpx;"
							>
								<view
									style="display: inline-block;width: fit-content;padding: 8rpx;background: linear-gradient(180deg, #ffe96f 0%, #ff9c07 100%);border-radius: 50%;overflow: hidden;"
								>
									<view
										style="width: fit-content;padding: 8rpx;background: linear-gradient(180deg, #feb606 0%, #ff9301 100%);border-radius: 50%;line-height: 1;"
									>
										<tui-icon name="star-fill" color="#ffffff" :size="32" unit="rpx" margin="0"></tui-icon>
									</view>
								</view>
								<view style="padding: 14rpx 0;">{{ transactionDayList[recordList.length - 1 + index] || '？' }}</view>
							</view>
						</view>
						<view v-if="stepsList && stepsList.length" style="margin-top: 30rpx;">
							<tui-steps
								:items="stepsList" spacing="120rpx" :active-steps="activeSteps" active-color="#1e7aea"
								deactive-color="#eff6fd" background-color="#ff938d"
							></tui-steps>
						</view>
					</view>
					<view class="middle-btn" style="padding: 30rpx 0 2rpx;">
						<tui-button
							v-if="currentDay === (recordList[recordList.length - 1] && recordList[recordList.length - 1].createTime.slice(0, 10))"
							type="gray" width="440rpx" height="82rpx" margin="0 auto 32rpx"
							shape="circle" :size="32" bold disabled
						>
							今日已签到，明日再来
						</tui-button>
						<image
							v-else style="display: block;width: 488rpx;margin: 0 auto;"
							:src="common.seamingImgUrl('1722998431059-b-go-sign.png')" mode="widthFix"
							@click="handleSignIn"
						/>
						<!-- <tui-button
							v-else type="warning" width="440rpx" height="82rpx"
							margin="0 auto" shape="circle" :size="32"
							bold @click="handleSignIn"
							>
							签到领代金券
							</tui-button> -->
					</view>
					<view
						style="display: flex;align-items: center;justify-content: center;font-size: 26rpx;color: #1e7aea;"
						@click="go('/another-tf/another-user/transaction-funds/transaction-operation')"
					>
						<text>进入消费金账户</text>
						<tui-icon name="arrowright" color="#1e7aea" :size="26" unit="rpx" margin="0 0 0 8rpx"></tui-icon>
					</view>
				</view>
				<view style="margin-top: 24rpx;">
					<view style="font-size: 34rpx;font-weight: bold;">签到明细</view>
					<view style="margin-top: 24rpx;background-color: #ffffff;border-radius: 18rpx;">
						<view v-if="signTransactionList && signTransactionList.length" style="padding: 12rpx 28rpx;">
							<view
								v-for="(item, index) in signTransactionList" :key="item.id"
								style="display: flex;align-items: center;justify-content: space-between;padding: 24rpx 0;border-bottom: 2rpx solid #efefef;"
							>
								<view style="flex: 1;display: flex;align-items: center;">
									<view style="flex: 1;width: 0;margin-left: 14rpx;">
										<view
											style="font-size: 30rpx;font-weight: bold;color: #222229;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
										>
											<text>签到</text>
										</view>
										<view style="margin-top: 16rpx;font-size: 26rpx;color: #888889;">{{ item.createTime }}</view>
									</view>
								</view>
								<view style="margin-left: 12rpx;text-align: right;">
									<view style="margin-top: 6rpx;font-size: 34rpx;font-weight: bold;color: #EA5C1E;">
										<text>+{{ item.beeAmount || 0 }}</text>
									</view>
								</view>
							</view>
						</view>
						<view style="padding-bottom: 45rpx;">
							<LoadingMore
								:status="!isEmpty && !signTransactionList.length
									? 'loading' : !isEmpty && signTransactionList.length && (signTransactionList.length >= signTransactionTotal) ? 'no-more' : ''"
							>
							</LoadingMore>
							<tui-no-data v-if="isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无签到记录~</tui-no-data>
						</view>
					</view>
				</view>
			</view>
		</view>
		<tui-landscape
			:show="isShowSignFrame" :position="1" mask mask-closable
			:close-icon="false" :icon-size="28" icon-color="#FFFFFF"
			@close="isShowSignFrame = false"
		>
			<view style="position: relative;" @click="isShowSignFrame = false">
				<view style="position: absolute;z-index: 1;top: 228rpx;left: 0;width: 100%;text-align: center;">
					<view style="display: flex;align-items: center;justify-content: center;color: #1e7aea;">
						<view style="margin-right: 12rpx;font-size: 44rpx;font-weight: bold;">已增加</view>
						<view>消费金额度</view>
					</view>
					<view style="display: flex;align-items: center;justify-content: center;margin-top: 28rpx;">
						<view style="color: #999794;">明天签到可继续</view>
						<view style="margin: 0 6rpx;color: #1e7aea;">获得</view>
						<view style="color: #999794;">提现额度</view>
					</view>
				</view>
				<image
					:src="common.seamingImgUrl('1721703590990-sign-success-frame.png')" mode="widthFix"
					style="width: 500rpx;max-height: 75vh;"
				/>
			</view>
		</tui-landscape>
	</view>
</template>

<script>
import { getCurrencyDayListApi, getCurrencySigninRecordListApi, updateCurrencySignInApi, getBeeSelectAmountEntryRecordApi, getCurrencySigninHistoryApi } from '../../../api/anotherTFInterface'

export default {
	name: 'SendTransaction',
	data() {
		return {
			transactionInfo: {
				beePrice: '',
				beeSelectedPrice: '',
				beeSignPrice: '',
				beeConsumptionPrice: '',
				beeToBeWithdrawnPrice: '',
				beeWithdrawnPrice: '',
				beeToBeSettledPrice: ''
			},
			transactionDayList: [],
			stepsList: [],
			activeSteps: -1,
			isShowSignFrame: false,
			currentDay: `${String(new Date().getFullYear())}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`,
			recordList: [],
			isEmpty: false,
			signTransactionList: [],
			signTransactionTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20
			}
		}
	},
	onLoad() {
		getCurrencyDayListApi({})
			.then((res) => {
				this.transactionDayList = res.data || []
			})
		this.getSignInRecord()
		this.getSignInHistory()
	},
	onShow() {
		this.getTransactionAll()
	},
	methods: {
		getTransactionAll() {
			getBeeSelectAmountEntryRecordApi({})
				.then((res) => {
					this.transactionInfo = res.data
				})
		},
		getSignInRecord() {
			uni.showLoading({
				mask: true,
				title: '加载中...'
			})
			getCurrencySigninRecordListApi({})
				.then((res) => {
					uni.hideLoading()
					this.recordList = res.data
					this.stepsList = new Array(7).toString()
						.split(',')
						.map((i, index) => {
							if (index < this.recordList.length) {
								return { title: `${index + 1}天` }
							}
							return { title: `${index + 1}天`, name: 'about-fill', size: '0', activeIcon: 'about-fill' }
						})
					this.activeSteps = this.recordList.length - 1
				})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		handleSignIn() {
			if (!this.transactionInfo.beeSignPrice) return this.$showToast('缺少可签到消费金，无法签到')
			if (((this.recordList[this.recordList.length - 1] || {}).createTime || '').slice(0, 10) !== this.currentDay) {
				uni.showLoading({
					mask: true,
					title: '请稍等...'
				})
				updateCurrencySignInApi({})
					.then((res) => {
						uni.hideLoading()
						// this.$showToast('签到成功！')
						this.isShowSignFrame = true
						this.getSignInRecord()
						this.getSignInHistory()
					})
					.catch((e) => {
						uni.hideLoading()
					})
			}
		},
		getSignInHistory(isLoadmore) {
			uni.showLoading()
			getCurrencySigninHistoryApi(this.queryInfo).then((res) => {
				this.signTransactionTotal = res.data.total
				if (isLoadmore) {
					this.signTransactionList.push(...res.data.list)
				} else {
					this.signTransactionList = res.data.list
				}
				this.isEmpty = this.signTransactionList.length === 0
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		}
	},
	onReachBottom() {
		if (this.signTransactionList.length < this.signTransactionTotal) {
			++this.queryInfo.page
			this.getSignInHistory(true)
		}
	}
}
</script>

<style lang="less" scoped>
.send-transaction-container {
	min-height: 100vh;
	padding: 0 0 72rpx;
	background-color: #f6f6f6;
	box-sizing: border-box;

	/deep/ .j-header-container {
		padding: 24rpx 10rpx 10rpx;

		.title {
			font-size: 34rpx;
			color: #222229;
			font-weight: normal;
		}
	}

	.middle-btn {
		/deep/ .tui-btn-warning {
			color: #FFFFFF !important;
			background: linear-gradient(180deg, #62c9ff 0%, #2d9bff 100%) !important;
			text-shadow: 0px 1px 0px #048CFB;
		}

		/deep/ .tui-btn-gray {
			color: #FFFFFF !important;
			background: linear-gradient(180deg, #dfdfdf 0%, #cbcbcb 100%) !important;
			text-shadow: 0px 1px 0px #8E8E8E;
		}
	}

	/deep/ .tui-steps-box {
		.tui-step-item-ico {
			.tui-step-ico {
				width: 16rpx !important;
				height: 16rpx !important;
			}

			.tui-icon {
				color: transparent !important;
			}

			.tui-step-custom {
				width: 0;
			}
		}

		.tui-step-item-title {
			color: #bdbdbd !important;
		}
	}

	/deep/ .tui-landscape__box {
		.tui-landscape__inner {
			top: 34%;
		}
	}
}
</style>
