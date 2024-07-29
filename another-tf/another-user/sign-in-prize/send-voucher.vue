<template>
	<view class="send-voucher-container">
		<view
			:style="{ background: `url(${common.seamingImgUrl('1721380294717-orange-white-bg-color.png')}) no-repeat center top/contain` }"
		>
			<JHeader :dark="false" title="签到送代金券" width="50" height="50"></JHeader>
			<VoucherChoose v-show="false" padding="20rpx 0 0" @change="(e) => (voucherChooseInfo = e) && getVoucherData()">
			</VoucherChoose>

			<view style="position: relative;padding: 30rpx 26rpx 0;">
				<view style="position: absolute;top: 2%;right: 3%;width: 252rpx;">
					<image style="width: 100%" :src="common.seamingImgUrl('1721380308499-calendar-image.png')" mode="widthFix" />
				</view>
				<view style="color: #ffffff;">
					<view style="text-shadow: 0px 1px 0px #FB6D04;">当前兑换代金券</view>
					<view style="display: flex;align-items: flex-end;margin-top: 32rpx;">
						<view style="font-size: 54rpx;font-weight: bold;text-shadow: 0px 1px 0px #FB6D04;">
							{{ typeof voucherAcount.duihuanRechargeTotal === 'number'
								? Number.parseFloat(Number(voucherAcount.duihuanRechargeTotal)).toFixed(2)
								: '--' }}
						</view>
						<view
							style="margin-left: 20rpx;padding: 6rpx 16rpx;background: rgba(255, 255, 255, 0.2);border-radius: 32rpx;"
						>
							<text v-if="currentDay === ((recordList[recordList.length - 1] || {}).createTime || '').slice(0, 10)">
								今日已签到
							</text>
							<text v-else>
								今日未签到
							</text>
						</view>
					</view>
				</view>
				<view
					style="margin-top: 28rpx;padding: 30rpx 24rpx;background: linear-gradient(180deg, #FFE9CE 0%, #FFFFFF 22%);border-radius: 20rpx;"
				>
					<view>
						<text style="font-weight: bold;">已累计签到</text>
						<text style="margin-left: 8rpx;color: #EA5C1E;">{{ recordList.length }}天</text>
					</view>
					<view style="margin-top: 58rpx;">
						<view style="display: flex;align-items: center;text-align: center;">
							<view
								v-for="(item, index) in recordList" :key="item.signinId"
								style="flex: 1;margin: 0 6rpx;padding: 8rpx;color: #ffffff;background: linear-gradient(151deg, #FFBC69 0%, #FFA331 100%), #F2F1EF;border-radius: 84rpx;"
							>
								<view
									style="display: inline-block;width: fit-content;padding: 8rpx;background: linear-gradient(180deg, #ffe96f 0%, #ff9c07 100%);border-radius: 50%;box-shadow: 0px 4px 8px 0px #FF7300;overflow: hidden;"
								>
									<view
										style="width: fit-content;padding: 8rpx;background: linear-gradient(180deg, #feb606 0%, #ff9301 100%);border-radius: 50%;line-height: 1;"
									>
										<tui-icon name="check" color="#ffffff" :size="32" unit="rpx" margin="0"></tui-icon>
									</view>
								</view>
								<view style="padding: 14rpx 0;">1</view>
							</view>
							<view
								v-for="index in (7 - recordList.length)" :key="index"
								style="flex: 1;margin: 0 6rpx;padding: 8rpx;color: #ffaf38;background: #FFEEC5;border-radius: 84rpx;"
							>
								<view
									style="display: inline-block;width: fit-content;padding: 8rpx;background: linear-gradient(180deg, #ffe96f 0%, #ff9c07 100%);border-radius: 50%;box-shadow: 0px 4px 8px 0px #FF7300;overflow: hidden;"
								>
									<view
										style="width: fit-content;padding: 8rpx;background: linear-gradient(180deg, #feb606 0%, #ff9301 100%);border-radius: 50%;line-height: 1;"
									>
										<tui-icon name="star-fill" color="#ffffff" :size="32" unit="rpx" margin="0"></tui-icon>
									</view>
								</view>
								<view style="padding: 14rpx 0;">1</view>
							</view>
						</view>
						<view v-if="stepsList && stepsList.length" style="margin-top: 30rpx;">
							<tui-steps
								:items="stepsList" spacing="120rpx" :active-steps="activeSteps" active-color="#ff9415"
								deactive-color="#ffebd2" background-color="#ff938d"
							></tui-steps>
						</view>
					</view>
					<view class="middle-btn" style="margin-top: 30rpx;">
						<tui-button
							v-if="currentDay === ((recordList[recordList.length - 1] || {}).createTime || '').slice(0, 10)"
							type="gray" width="440rpx" height="82rpx" margin="0 auto"
							shape="circle" :size="32" bold disabled
						>
							今日已签到，明日再来
						</tui-button>
						<tui-button
							v-else type="warning" width="440rpx" height="82rpx"
							margin="0 auto" shape="circle" :size="32"
							bold @click="handleSignIn"
						>
							签到领代金券
						</tui-button>
					</view>
				</view>
				<view style="margin-top: 30rpx;">
					<image
						style="width: 100%;" :src="common.seamingImgUrl('1721380304898-duihuanzhuanqu.png')" mode="widthFix"
						@click="go('/pages/index/voucher-zone')"
					/>
				</view>
				<view style="margin-top: 24rpx;">
					<view style="font-size: 34rpx;font-weight: bold;">兑换代金券入账记录</view>
					<view style="margin-top: 24rpx;background-color: #ffffff;border-radius: 18rpx;">
						<view v-if="exchangeAccountingList && exchangeAccountingList.length" style="padding: 12rpx 28rpx;">
							<view
								v-for="(item, index) in exchangeAccountingList" :key="item.id"
								style="display: flex;align-items: center;justify-content: space-between;padding: 24rpx 0;border-bottom: 2rpx solid #efefef;"
								@click="handleClickVoucherRecord(item)"
							>
								<view style="flex: 1;display: flex;align-items: center;">
									<view style="flex: 1;width: 0;margin-left: 14rpx;">
										<view
											style="font-size: 30rpx;font-weight: bold;color: #222229;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
										>
											<text>
												代金券
												<text v-if="item.waterType === 1">充值</text>
												<text v-else-if="item.waterType === 2">转入</text>
												<text v-else-if="item.waterType === 3">签到</text>
												<text v-else-if="item.waterType === 4">抽奖</text>
												<text v-else-if="item.waterType === 5">充值赠送</text>
												<text v-else-if="item.waterType === 6">商城下单</text>
												<text v-else-if="item.waterType === 7">商圈下单</text>
												<text v-else-if="item.waterType === 8">社区下单</text>
												<text v-else-if="item.waterType === 9">活动</text>
												<text v-else-if="item.waterType === 10">退款</text>
												<text v-else>--</text>
											</text>
											<text>
												-
												<text v-if="item.sourceType === 1">平台</text>
												<text v-else-if="item.sourceType === 2">商家</text>
												<text v-else-if="item.sourceType === 3">用户</text>
												<text v-else-if="item.sourceType === 4">社区</text>
												<text v-else>--</text>
											</text>
										</view>
										<view style="margin-top: 16rpx;font-size: 26rpx;color: #888889;">{{ item.createTime }}</view>
									</view>
								</view>
								<view style="margin-left: 12rpx;text-align: right;">
									<view style="margin-top: 6rpx;font-size: 34rpx;font-weight: bold;color: #ea5f23;">
										<text>+{{ item.number }}</text>
									</view>
								</view>
							</view>
						</view>
						<view style="padding-bottom: 45rpx;">
							<LoadingMore
								:status="!isEmpty && !exchangeAccountingList.length
									? 'loading' : !isEmpty && exchangeAccountingList.length && (exchangeAccountingList.length >= exchangeAccountingTotal) ? 'no-more' : ''"
							>
							</LoadingMore>
							<tui-no-data v-if="isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无数据</tui-no-data>
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
					<view style="display: flex;align-items: center;justify-content: center;color: #e60e0e;">
						<view style="margin-right: 12rpx;font-size: 44rpx;font-weight: bold;">已发放</view>
						<view>代金券</view>
					</view>
					<view style="display: flex;align-items: center;justify-content: center;margin-top: 28rpx;">
						<view style="color: #999794;">明天签到可继续</view>
						<view style="margin: 0 6rpx;color: #e60e0e;">获得</view>
						<view style="color: #999794;">代金券</view>
					</view>
				</view>
				<image
					:src="common.seamingImgUrl('1721611410057-sign-success-bg.png')" mode="widthFix"
					style="width: 500rpx;max-height: 75vh;"
				/>
			</view>
		</tui-landscape>
	</view>
</template>

<script>
import VoucherChoose from '../voucher/components/VoucherChoose.vue'
import { getCurrencySigninRecordListApi, updateMemberSignInApi, getBuyerTotalVoucherEntryRecordApi, getBuyerVoucherEntryRecordApi } from '../../../api/anotherTFInterface'

export default {
	name: 'SendVoucher',
	components: { VoucherChoose },
	data() {
		return {
			voucherChooseInfo: {
				platformVoucherId: '',
				purchaseRatio: ''
			},
			voucherAcount: {
				chongzhiRechargeTotal: 0,
				duihuanRechargeTotal: 0
			},
			stepsList: [
				// { title: '1天' },
				// { title: '2天', name: 'about-fill', size: '0', activeIcon: 'about-fill' }
			],
			activeSteps: -1,
			isShowSignFrame: false,
			currentDay: `${String(new Date().getFullYear())}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`,
			recordList: [],
			isEmpty: false,
			exchangeAccountingList: [],
			exchangeAccountingTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20
			}
		}
	},
	onLoad() {
		this.getSignInRecord()
		this.getExchangeAccountingLogsList()
	},
	onShow() {
		if (this.voucherChooseInfo.platformVoucherId) {
			this.getVoucherData()
		} else {
			this.voucherAcount = { chongzhiRechargeTotal: 0, duihuanRechargeTotal: 0 }
		}
	},
	methods: {
		getVoucherData() {
			uni.showLoading()
			getBuyerTotalVoucherEntryRecordApi({})
				.then((res) => {
					this.voucherAcount.duihuanRechargeTotal = Number(res.data.rechargeTotal)
					uni.hideLoading()
				})
				.catch((e) => {
					uni.hideLoading()
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
			if (((this.recordList[this.recordList.length - 1] || {}).createTime || '').slice(0, 10) !== this.currentDay) {
				uni.showLoading({
					mask: true,
					title: '请稍等...'
				})
				updateMemberSignInApi({})
					.then((res) => {
						uni.hideLoading()
						// this.$showToast('签到成功！')
						this.isShowSignFrame = true
						this.getSignInRecord()
						this.getExchangeAccountingLogsList()
					})
					.catch((e) => {
						uni.hideLoading()
					})
			}
		},
		getExchangeAccountingLogsList(isLoadmore) {
			uni.showLoading()
			getBuyerVoucherEntryRecordApi(this.queryInfo).then((res) => {
				this.exchangeAccountingTotal = res.data.total
				if (isLoadmore) {
					this.exchangeAccountingList.push(...res.data.list)
				} else {
					this.exchangeAccountingList = res.data.list
				}
				this.isEmpty = this.exchangeAccountingList.length === 0
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		handleClickVoucherRecord(item) {
			uni.navigateTo({
				url: '/another-tf/another-user/voucher/voucher-record-detail',
				success: () => {
					setTimeout(() => {
						uni.$emit('sendVoucherRecordDetailMsg', { voucherRecordData: item, fromOrigin: 1 })
					}, 400)
				}
			})
		}
	},
	onReachBottom() {
		if (this.exchangeAccountingList.length < this.exchangeAccountingTotal) {
			++this.queryInfo.page
			this.getExchangeAccountingLogsList(true)
		}
	}
}
</script>

<style lang="less" scoped>
.send-voucher-container {
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
			background: linear-gradient(180deg, #FFA93F 0%, #FF842D 100%) !important;
			text-shadow: 0px 1px 0px #FB6D04;
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
