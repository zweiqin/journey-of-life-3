<template>
	<view class="application-record-container">
		<view style="padding: 30upx 20upx;color: #000000;">
			<JHeader width="50" height="50" title="余额提现记录"></JHeader>
		</view>
		<view v-if="withdrawalRecordList && withdrawalRecordList.length">
			<view v-for="(item, index) in withdrawalRecordList" :key="index" class="" style="padding-bottom: 45upx;">
				<tui-card
					:title="{ text: `用户ID：${item.userId}` }"
					:tag="{ text: `${String(new Date(item.createTime).getFullYear())}/${String(new Date(item.createTime).getMonth() + 1).padStart(2, '0')}/${String(new Date(item.createTime).getDate()).padStart(2, '0')}` }"
				>
					<template #body>
						<view style="padding: 20upx 30upx;">
							<!-- <view>
								<text>类型：</text>
								<text v-if="item.type === 0">活动中心</text>
								<text v-else>--</text>
								</view>
								<view>提现金额：{{ item.amount || '--' }}</view> -->
							<view style="display: flex;justify-content: space-between;">
								<view>ID：{{ item.id }}</view>
								<view>提现单号：{{ item.orderNo }}</view>
							</view>
							<view style="display: flex;justify-content: space-between;">
								<view>
									提现金额：<text style="color: #ee442f;">
										{{ typeof item.amount === 'number' ? `￥${item.amount}` : '--'
										}}
									</text>
								</view>
								<view>
									实际到账金额：<text style="color: #ee442f;">
										{{ typeof item.realAmount === 'number' ? `￥${item.realAmount}`
											: '--' }}
									</text>
								</view>
							</view>
							<view style="display: flex;justify-content: space-between;">
								<view>
									手续费：<text style="color: #ee442f;">{{ typeof item.fee === 'number' ? `￥${item.fee}` : '--' }}</text>
								</view>
								<view>
									第三方手续费：<text style="color: #ee442f;">
										{{ typeof item.outFee === 'number' ? `￥${item.outFee}` : '--' }}
									</text>
								</view>
							</view>
							<view>
								订单状态：
								<text v-if="item.sourceType === 1">待审核</text>
								<text v-else-if="item.sourceType === 2">开始审核</text>
								<text v-else-if="item.sourceType === 3">审核通过</text>
								<text v-else-if="item.sourceType === 4">打款中</text>
								<text v-else-if="item.sourceType === 5">打款成功</text>
								<text v-else-if="item.sourceType === 6">打款成功</text>
								<text v-else-if="item.sourceType === 7">打款失败</text>
								<text v-else>--</text>
							</view>
							<view>第三方错误码：{{ item.errorCode || '--' }}</view>
							<view>第三方流水号：{{ item.outTradeNo || '--' }}</view>
							<view>水单：{{ item.bankReceipt || '--' }}</view>

							<view style="margin-top: 12upx;font-size: 30upx;">
								<view>开户银行名称：{{ item.bankName }}</view>
								<view style="display: flex;justify-content: space-between;">
									<view>银行卡号：{{ item.receiverAccount }}</view>
									<view>ID：{{ item.accountBankId }}</view>
								</view>
								<view>收款持卡人姓名：{{ item.receiverName }}</view>
								<view>
									银行卡提现渠道：
									<text v-if="item.bankChannel === 1">手动打款</text>
									<text v-else-if="item.bankChannel === 2">通联</text>
									<text v-else>--</text>
								</view>
								<view>
									提现类型：
									<text v-if="item.type === 1">余额</text>
									<text v-else-if="item.type === 2">佣金</text>
									<text v-else-if="item.type === 3">活动</text>
									<text v-else>--</text>
								</view>
							</view>

							<view style="margin-top: 12upx;font-size: 28upx;">
								<view>审核时间：{{ item.auditTime || '--' }}</view>
								<view>到账时间：{{ item.arrivaTime || '--' }}</view>
							</view>
							<view style="margin-top: 12upx;font-size: 28upx;">备注：{{ item.remarks || '--' }}</view>
						</view>
					</template>
				</tui-card>
			</view>
		</view>
		<view v-else>
			<tui-no-data>暂无数据</tui-no-data>
		</view>
		<LoadingMore v-show="status !== 'none'" :status="status"></LoadingMore>
	</view>
</template>

<script>
import { getWithdrawRecordListUserApi } from '../../../api/user'
import { USER_INFO } from '../../../constant'

export default {
	name: 'WithdrawalRecord',
	data() {
		return {
			userInfo: {},
			query: {
				pageNo: 1,
				pageSize: 10
			},
			totalPages: 0,
			status: 'none',
			withdrawalRecordList: []
		}
	},
	onLoad(options) {
		this.userInfo = uni.getStorageSync(USER_INFO)
		this.getWithdrawRecordList()
	},

	methods: {
		getWithdrawRecordList(isLoadmore) {
			if (!this.userInfo.phone) return this.$showToast('获取用户手机号失败')
			uni.showLoading({
				title: '加载中'
			})
			this.status = 'loading'
			getWithdrawRecordListUserApi({ ...this.query, mobile: this.userInfo.phone })
				.then((data) => {
					this.totalPages = data.pages
					if (isLoadmore) {
						this.withdrawalRecordList.push(...data.items)
					} else {
						this.withdrawalRecordList = data.items
					}
					uni.hideLoading()
					this.status = 'none'
				})
				.catch(() => {
					uni.hideLoading()
					this.status = 'none'
				})
		}
	},

	onReachBottom() {
		if (this.query.pageNo >= this.totalPages) {
			this.status = 'no-more'
			return
		}
		if (this.query.pageSize > this.withdrawalRecordList.length) {
			this.status = 'none'
			return
		}
		this.query.pageNo++
		this.getWithdrawRecordList(true)
	}
}
</script>

<style lang="less" scoped>
.application-record-container {
	position: relative;
	box-sizing: border-box;
	height: 100vh;
	background-color: #eeeeee;
	overflow-y: auto;
}
</style>
