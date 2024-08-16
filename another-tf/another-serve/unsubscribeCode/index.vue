<template>
	<view class="unsubscribe-code-container">
		<JHeader title="注销账户手机认证" width="50" height="50" style="padding: 24rpx 0 0;"></JHeader>
		<view style="padding: 20rpx 30rpx;">
			<view class="iphoneNum-box flex-row-plus flex-items">
				<view style="margin-right: 30rpx">
					<tui-icon :size="50" color="#cccccc" name="mobile" unit="rpx" margin="0"></tui-icon>
				</view>
				<view>
					<input
						v-model="userInfo.phone" maxlength="11" placeholder-class="iphoneNum-input" type="number"
						disabled
						placeholder="请输入您的手机号"
					/>
				</view>
			</view>
			<view class="code-box mar-top-20">
				<tui-icon :size="50" color="#cccccc" name="shield" unit="rpx" margin="0 30rpx 0 0"></tui-icon>
				<ATFGraphicVerificationCode
					type="code" :phone="userInfo.phone"
					input-padding="26rpx 20rpx 26rpx 0" input-label-color="#ffffff"
					countdown-width="188rpx" countdown-height="48rpx" countdown-text="获取验证码"
					:countdown-size="30" countdownborder-width="0" countdown-color="#dddddd"
					@input="e => code = e"
				></ATFGraphicVerificationCode>
			</view>
			<view class="mar-top-60">
				<view class="registerBut mar-top-100" @click="unsubscribe">立即注销</view>
			</view>
		</view>
	</view>
</template>

<script>
import { T_STORAGE_KEY } from '../../../constant'
import { deleteUserInfoApi } from '../../../api/anotherTFInterface'
export default {
	name: 'UnsubscribeCode',
	data() {
		return {
			code: '',
			userInfo: {
				phone: ''
			},
			disabled: false
		}
	},
	onLoad() {
		this.userInfo = uni.getStorageSync(T_STORAGE_KEY)
	},
	methods: {
		// 账户注销
		unsubscribe() {
			deleteUserInfoApi({ code: this.code })
				.then((res) => {
					this.$store.dispatch('auth/logoutAction', true)
				})
		}
	}
}
</script>

<style lang="less" scoped>
.unsubscribe-code-container {
	background-color: #FFFFFF;
	min-height: 100vh;
	box-sizing: border-box;

	.iphoneNum-box {
		padding: 100rpx 0 20rpx;
		border-bottom: 1rpx solid #DDDDDD;

		.iphoneNum-input {
			color: #999999;
			font-size: 28rpx;
		}
	}

	.code-box {
		border-bottom: 1rpx solid #DDDDDD;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.getcode {
		background-color: #C5AA7B;
		height: 100rpx;
		width: 230rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-left: 20rpx;
		color: #FFFFFF;
	}

	.registerBut {
		background: #333333;
		color: #FFEBC4;
		height: 100rpx;
		width: 600rpx;
		text-align: center;
		line-height: 100rpx;
		margin: 30rpx auto 0;
	}
}
</style>
