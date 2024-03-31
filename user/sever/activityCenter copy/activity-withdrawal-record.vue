<template>
	<view class="application-record-container">
		<view style="padding: 30upx 20upx;color: #000000;">
			<JHeader width="50" height="50" title="活动中心提现记录"></JHeader>
		</view>
		<view v-if="withdrawalRecordList && withdrawalRecordList.length">
			<view v-for="(item, index) in withdrawalRecordList" :key="index" class="" style="padding-bottom: 45upx;">
				<tui-card
					:title="{ text: '' }"
					:tag="{ text: `${String(new Date(item.addTime).getFullYear())}/${String(new Date(item.addTime).getMonth() + 1).padStart(2, '0')}/${String(new Date(item.addTime).getDate()).padStart(2, '0')}` }"
				>
					<template #body>
						<view style="padding: 20upx 30upx;">
							<view>
								<text>类型：</text>
								<text v-if="item.type === 0">活动中心</text>
								<text v-else>--</text>
							</view>
							<view>提现金额：{{ item.amount || '--' }}</view>
						</view>
					</template>
				</tui-card>
			</view>
		</view>
		<view v-else>
			<tui-no-data>暂无数据</tui-no-data>
		</view>
	</view>
</template>

<script>
import { getWithdrawalLogsApi } from '../../../api/user'
import { getUserId } from '../../../utils'

export default {
	name: 'ActivityWithdrawalRecord',
	data() {
		return {
			withdrawalRecordList: []
		}
	},
	onLoad(options) {
		uni.showLoading({
			title: '加载中'
		})
		getWithdrawalLogsApi({ userId: getUserId(), type: 0 })
			.then((res) => {
				this.withdrawalRecordList = res.data
				uni.hideLoading()
			})
			.catch(() => {
				uni.hideLoading()
			})
	},

	methods: {
		handleBack() {
			this.$switchTab('/pages/user/user')
		}
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
