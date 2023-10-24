<template>
	<view class="payment-completed-container">
		<!-- <view style="padding: 30upx 20upx;color: #000000;">
			<JHeader width="50" height="50" title="商品评价"></JHeader>
			</view> -->
		<view style="display: flex;flex-direction: column;align-items: center;">
			<view style="margin-top: 20vh;">
				<BeeIcon name="circle-fill" :size="76" color="#95ec69"></BeeIcon>
			</view>
			<view style="margin-top: 5vh;font-size: 46upx;font-weight: bold;">支付成功</view>
			<view style="margin-top: 25vh;">
				<tui-button
					type="gray-primary" width="280rpx" height="72rpx" style="color: #1ab113!important;border-radius: 4rpx;"
					bold @click="handelClickBack"
				>
					回到首页
				</tui-button>
			</view>
		</view>
	</view>
</template>

<script>
// import { } from '../../../api/user'
// import { getUserId, getBrandId } from '../../../utils'
import { T_PAY_ORDER } from '../../../constant'

export default {
	name: 'PaymentCompleted',
	components: {},
	data() {
		return {
			currentButton: 0
		}
	},
	onLoad(options) {
		uni.removeStorageSync(T_PAY_ORDER)
	},
	mounted() {
	},
	methods: {
		handelClickBack() {
			this.$switchTab('/pages/index/index')
		}
	}
}
</script>

<style lang="less" scoped>
.payment-completed-container {
	min-height: 100vh;
	width: 100%;
	padding: 0 26upx;
	background: #ffffff;
	box-sizing: border-box;

}
</style>
