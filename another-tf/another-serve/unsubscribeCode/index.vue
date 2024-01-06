<template>
	<!-- 登录 -->
	<view class="container">
		<JHeader title="注销账户手机认证" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view class="iphoneNum-box flex-row-plus flex-items">
			<view style="margin-right: 30rpx">
				<tui-icon :size="50" color="#cccccc" name="mobile" unit="upx" margin="0"></tui-icon>
			</view>
			<view>
				<input
					v-model="userInfo.phone" maxlength="11" placeholder-class="iphoneNum-input" type="number"
					disabled
					placeholder="请输入您的手机号"
				/>
			</view>
		</view>
		<view class="flex-row-plus mar-top-20 flex-center">
			<view class="code-box">
				<view style="margin-right: 30rpx">
					<tui-icon :size="50" color="#cccccc" name="shield" unit="upx" margin="0"></tui-icon>
				</view>
				<view>
					<input v-model="code" maxlength="6" placeholder-class="codeNum-input" placeholder="请输入验证码" />
				</view>
			</view>
			<view :class="disabled === true ? 'on' : ''" :disabled="disabled" class="getcode" @click="codede">
				{{ text }}
			</view>
		</view>
		<view class="mar-top-60">
			<view class="registerBut mar-top-100" @click="unsubscribe">立即注销</view>
		</view>
	</view>
</template>

<script>
import { T_STORAGE_KEY } from '../../../constant'
import { getCodeBusinessApi, deleteUserInfoApi } from '../../../api/anotherTFInterface'
export default {
	name: 'UnsubscribeCode',
	data() {
		return {
			code: '',
			userInfo: {
				phone: ''
			},
			disabled: false,
			text: '获取验证码'
		}
	},
	onLoad() {
		this.userInfo = uni.getStorageSync(T_STORAGE_KEY)
	},
	methods: {

		// 获取验证码
		codede() {
			this.getVerify()
		},
		getVerify() {
			getCodeBusinessApi({
				phone: this.userInfo.phone
			}).then((res) => {
				this.sendCode()
			})
		},
		// 账户注销
		unsubscribe() {
			deleteUserInfoApi({ code: this.code })
				.then((res) => {
					this.$store.dispatch('auth/logoutAction', true)
				})
		},
		sendCode() {
			if (this.disabled) return
			this.disabled = true
			let n = 60
			this.text = n + 's后重新发送'
			const run = setInterval(() => {
				n = n - 1
				if (n < 0) {
					clearInterval(run)
				}
				this.text = n + 's后重新发送'
				if (this.text < 0 + 's后重新发送') {
					this.disabled = false
					this.text = '重新获取'
				}
			}, 1000)
		}
	}
}
</script>

<style lang="less" scoped>
.container {
	background-color: #FFFFFF;
	min-height: 100vh;

	.iphoneNum-box {
		margin: 100upx auto 0;
		border-bottom: 1rpx solid #DDDDDD;
		height: 100rpx;
		width: 600rpx;

		.iphoneNum-input {
			color: #999999;
			font-size: 28rpx;
			font-weight: 400;
		}
	}

	.code-box {
		border-bottom: 1rpx solid #DDDDDD;
		height: 100rpx;
		width: 360rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		.codeNum-input {
			color: #999999;
			font-size: 28rpx;
			font-weight: 400;
		}
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
		margin: 30upx auto 0;
	}
}
</style>
