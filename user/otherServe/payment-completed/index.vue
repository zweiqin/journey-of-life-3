<template>
	<view class="payment-completed-container">
		<!-- <view style="padding: 30rpx 20rpx;color: #000000;">
			<JHeader width="50" height="50" title="商品评价"></JHeader>
			</view> -->
		<view style="display: flex;flex-direction: column;align-items: center;">
			<view style="margin-top: 20vh;">
				<BeeIcon v-if="state === 'success'" name="circle-fill" :size="66" color="#ef530e"></BeeIcon>
				<BeeIcon v-else-if="state === 'fail'" name="close-fill" :size="66" color="#979797"></BeeIcon>
			</view>

			<view style="margin-top: 5vh;font-size: 46rpx;font-weight: bold;">
				<text v-if="state === 'success'">付 款 成 功</text>
				<text v-else-if="state === 'fail'">付 款 失 败</text>
			</view>

			<view class="operation-btn" style="margin-top: 8vh;">
				<tui-button
					v-if="state === 'success'" type="warning" width="320rpx" height="98rpx"
					bold @click="handelBackOrder"
				>
					进 入 团 蜂
				</tui-button>
				<tui-button
					v-else-if="state === 'fail'" type="warning" width="320rpx" height="98rpx"
					bold @click="handelBackOrder"
				>
					回 到 订 单 页 面
				</tui-button>
			</view>
		</view>
	</view>
</template>

<script>
import { T_PAY_ORDER } from '../../../constant'

export default {
	name: 'PaymentCompleted',
	components: {},
	data() {
		return {
			state: '',
			orderType: '',
		}
	},
	onLoad(options) {
		if (uni.getStorageSync(T_PAY_ORDER)) this.orderType = uni.getStorageSync(T_PAY_ORDER).type
		uni.removeStorageSync(T_PAY_ORDER)
		console.log(options.state)
		this.state = options.state || 'success'
	},
	mounted() {
	},
	methods: {
		handelClickBack() {
			this.$switchTab('/pages/index/index')
		},
		handelBackOrder() {
			this.$switchTab(`/pages/index/index?type=${this.orderType}`)
		},
	}
}
</script>

<style lang="less" scoped>
.payment-completed-container {
	min-height: 100vh;
	width: 100%;
	padding: 0 26rpx;
	background: #f0f0f0;
	box-sizing: border-box;

	.operation-btn {
		/deep/ .tui-btn {
			border-radius: 20rpx;
		}

		/deep/ .tui-btn-warning {
			background-color: #ef530e !important;
		}
	}
}
</style>
