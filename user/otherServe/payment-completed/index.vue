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
import { handleOrderTypeJump } from '../../../utils/payUtil'

export default {
	name: 'PaymentCompleted',
	components: {},
	data() {
		return {
			state: '',
			type: ''
		}
	},
	onLoad(options) {
		// T_PAY_ORDER的作用：在原支付页支付后，每次onShow都会判断订单信息，有则重定向到'订单跳转页'；在原支付页支付后重定向到该页面，根据订单信息判断要重定向的'订单跳转页'。
		// （除通联或惠市宝支付）其它支付在支付后会直接重定向到该页面，就不再在本地存储中保留订单信息。（但可能存在一些情况，不一定在支付后到该页面，订单信息可能就会保存在本地存储。）
		// 支付后到该页面，如果不清除订单信息，订单信息就会保存在本地存储，如果用户直接退出APP，那下次重新进入APP，再进入订单页，就会根据订单信息滑到商城或商圈的订单tab
		// 支付后到该页面，如果清除订单信息，那就要把订单信息保存在内存中，点击该页按钮时（如果不点击，而是按手机返回键，可能就会返回到商品详情页），跳转到订单页，才能根据内存中的订单信息滑到商城或商圈的订单tab
		if (uni.getStorageSync(T_PAY_ORDER)) this.type = uni.getStorageSync(T_PAY_ORDER).type
		uni.removeStorageSync(T_PAY_ORDER)
		getApp().globalData.orderTypeShow = this.type
		this.state = options.state || 'success'
	},
	mounted() {
	},
	methods: {
		handelClickBack() {
			this.$switchTab('/pages/order/order')
		},
		handelBackOrder() {
			handleOrderTypeJump({ type: this.type })
		}
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
