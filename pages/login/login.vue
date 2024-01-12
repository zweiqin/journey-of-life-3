<template>
	<view class="containers" style="min-height: 100vh;">
		<view class="header" style="width: 100vw;height: 122rpx">
			<image class="backFn" src="../../static/images/common/back.png" @click="$switchTab('/pages/index/index')"></image>
		</view>
		<view class="logoText">
			<view class="texts" style="font-weight: bold;">
				<view class="txt">欢迎来到</view>
				<view class="txt">团蜂社区</view>
			</view>
			<view class="" style="margin-top: 48rpx;margin-left: -6rpx;">
				<text class="appTitle">年轻的社区生活元宇宙</text>
			</view>
		</view>
		<view class="login-form">
			<tui-form ref="refLoginForm" :show-message="false">
				<view>
					<tui-input
						v-model="loginQuery.phone" label="+ 86" type="number" padding="26upx 20upx 26upx 0"
						placeholder-style="color: #f3c1c4;font-size: 32upx;" label-color="#ffffff" border-color="#EA5B1D"
						placeholder="请输入手机号码" background-color="transparent" :border-top="false" color="#ffffff"
						style="border-bottom: 2upx solid #ffffff;"
					></tui-input>
				</view>
				<view v-if="loginType === 'password'">
					<tui-input
						v-model="loginQuery.password" type="password" padding="26upx 20upx 26upx 0"
						placeholder-style="color: #f3c1c4;font-size: 32upx;" background-color="transparent" :border-top="false"
						border-color="#EA5B1D" label-color="#ffffff" placeholder="请输入密码" color="#ffffff"
						style="border-bottom: 2upx solid #ffffff;"
					>
					</tui-input>
				</view>
				<view v-if="loginType === 'verificationCode'">
					<tui-input
						v-model="loginQuery.verificationCode" padding="26upx 20upx 26upx 0"
						placeholder-style="color: #f3c1c4;font-size: 32upx;" background-color="transparent" :border-top="false"
						border-color="#EA5B1D" label-color="#ffffff" placeholder="请输入验证码" color="#ffffff"
						style="border-bottom: 2upx solid #ffffff;"
					>
						<template #right>
							<tui-countdown-verify
								v-if="loginType === 'verificationCode'" ref="refLoginVerify" width="188upx" height="48upx"
								border-width="0" text="获取验证码"
								:size="30" color="#dddddd" @send="handleSendVerify"
							></tui-countdown-verify>
						</template>
					</tui-input>
				</view>
			</tui-form>
		</view>
		<view style="display: flex;flex-direction: column;justify-content: center;align-items: center;margin-top: 80upx;">
			<view style="text-align: center;">
				<tui-button
					type="white" width="640rpx" height="82rpx" :size="38"
					margin="40upx 0 0" shape="circle"
					style="font-weight: bold;color: #ea5b1d!important;" @click="handleLogin"
				>
					登录
				</tui-button>
			</view>
		</view>
		<view style="margin-top: 120upx;display: flex;flex-direction: column;align-items: center;">
			<view style="display: flex;justify-content: space-around;white-space: nowrap;">
				<view style="display: flex;flex-direction: column;align-items: center;">
					<view style="width: fit-content;padding: 14upx;border: 1upx solid #ffffff;border-radius: 48upx;">
						<tui-icon name="friendadd-fill" color="#ffffff" :size="22" @click="go('/pages/login/register')"></tui-icon>
					</view>
					<view style="margin-top: 12upx;font-size: 26upx;color: #ffffff;">密码注册</view>
				</view>
				<view
					v-if="!(loginType === 'password')"
					style="display: flex;flex-direction: column;align-items: center;padding-left: 48upx;"
				>
					<view style="width: fit-content;padding: 14upx;border: 1upx solid #ffffff;border-radius: 48upx;">
						<tui-icon name="pwd" color="#ffffff" :size="22" @click="loginType = 'password'"></tui-icon>
					</view>
					<view style="margin-top: 12upx;font-size: 26upx;color: #ffffff;">密码登录</view>
				</view>
				<view
					v-if="!(loginType === 'verificationCode')"
					style="display: flex;flex-direction: column;align-items: center;padding-left: 48upx;"
				>
					<view style="width: fit-content;padding: 14upx;border: 1upx solid #ffffff;border-radius: 48upx;">
						<tui-icon name="mobile" color="#ffffff" :size="22" @click="loginType = 'verificationCode'"></tui-icon>
					</view>
					<view style="margin-top: 12upx;font-size: 26upx;color: #ffffff;">短信登录</view>
				</view>
				<!-- #ifdef MP-ALIPAY -->
				<view
					v-if="!(loginType === 'verificationCode')"
					style="display: flex;flex-direction: column;align-items: center;padding-left: 48upx;"
				>
					<view style="width: fit-content;padding: 14upx;border: 1upx solid #ffffff;border-radius: 48upx;">
						<tui-icon name="mobile" color="#ffffff" :size="22" @click="handleAliPayLogin"></tui-icon>
					</view>
					<view style="margin-top: 12upx;font-size: 26upx;color: #ffffff;">支付宝登录</view>
				</view>
				<!-- #endif -->
				<view
					v-if="($store.state.app.terminal === 3) || ($store.state.app.terminal === 2)"
					style="display: flex;flex-direction: column;align-items: center;padding-left: 48upx;"
				>
					<view style="width: fit-content;padding: 14upx;border: 1upx solid #ffffff;border-radius: 48upx;">
						<tui-icon name="wechat" color="#ffffff" :size="22" @click="handleWXLogin"></tui-icon>
					</view>
					<view style="margin-top: 12upx;font-size: 26upx;color: #ffffff;">微信登录</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { T_REDIRECT_TYPE, USER_ID, T_STORAGE_KEY } from '../../constant'
import { getVerifyCodeApi } from '../../api/anotherTFInterface'
import { CHANGE_IS_IN_MINIPROGRAM } from '../../store/modules/type'
import { getUrlCode } from '../../utils'

export default {
	name: 'Login',
	data() {
		return {
			loginType: 'verificationCode', // password,verificationCode
			loginQuery: {
				phone: '',
				verificationCode: '',
				password: ''
			}
		}
	},
	onLoad(options) {
		if (options.to) uni.setStorageSync(T_REDIRECT_TYPE, options.to)
		if (options.miniProgram) {
			this.$store.commit(`app/${CHANGE_IS_IN_MINIPROGRAM}`, !!options.miniProgram)
		}
	},
	onShow() {
		const userId = uni.getStorageSync(USER_ID)
		const userInfo = uni.getStorageSync(T_STORAGE_KEY)
		if (userId && userInfo && userInfo.token) {
			uni.switchTab({
				url: '/'
			})
		} else if (this.$store.state.app.terminal === 3) {
			const code = getUrlCode().code
			if (code) this.handleWXLogin()
		}
	},
	methods: {
		// 获取验证码
		handleSendVerify() {
			if (!this.loginQuery.phone) {
				this.$refs.refLoginVerify.reset()
				return this.$showToast('请填写手机号')
			}
			if (!/^1[3-9]\d{9}$/.test(this.loginQuery.phone)) {
				this.$refs.refLoginVerify.reset()
				return this.$showToast('请输入正确的手机号')
			}
			getVerifyCodeApi({ phone: this.loginQuery.phone })
				.then((res) => {
					this.$refs.refLoginVerify.success()
					this.$showToast('发送成功，请注意查看手机短信')
				})
				.catch(() => {
					this.$refs.refLoginVerify.reset()
				})
		},
		// 点击登录
		handleLogin() {
			const validateRules = [ {
				name: 'phone',
				rule: ['required', 'isMobile'],
				msg: ['请输入手机号', '请输入正确的手机号']
			} ]
			let loginFilterQuery
			if (this.loginType === 'verificationCode') {
				validateRules.push({
					name: 'verificationCode',
					rule: ['required', 'isNum'],
					msg: [ '请输入验证码' ]
				})
				loginFilterQuery = {
					phone: this.loginQuery.phone,
					verificationCode: this.loginQuery.verificationCode
				}
			} else if (this.loginType === 'password') {
				validateRules.push({
					name: 'password',
					rule: ['required', 'isEnAndNo'],
					msg: ['请输入密码', '密码为8~20位英文和数字组合']
				})
				loginFilterQuery = {
					phone: this.loginQuery.phone,
					password: this.loginQuery.password
				}
			}
			this.$refs.refLoginForm
				.validate(this.loginQuery, validateRules)
				.then(() => {
					this.$store.dispatch('auth/phoneLoginRegisterAction', {
						isAfter: true,
						loginData: {
							type: 2, // 1注册，2登录
							...loginFilterQuery
						}
					})
				})
				.catch((e) => {
					this.$showToast(JSON.stringify(e.errorMsg))
				})
		},
		async handleAliPayLogin() {
			await this.$store.dispatch('auth/aliPayLoginAction', { isAfter: true })
		},
		async handleWXLogin() {
			await this.$store.dispatch('auth/wxLoginAction', { isAfter: true })
		}
	}
}
</script>

<style lang="less" scoped>
.containers {
	display: flex;
	flex-direction: column;
	position: relative;
	box-sizing: border-box;
	padding-bottom: 66rpx;
	background-color: #EA5B1D;

	.backFn {
		padding: 30rpx 30rpx;
		width: 62rpx;
		height: 62rpx;
	}

	.logoText {
		width: 100vw;
		height: 280rpx;
		box-sizing: border-box;
		padding: 30rpx 0 0 56rpx;
		color: #ffffff;
		clear: both;

		.texts {

			/* font-style: oblique; */
			.txt {
				transform: skewX(-6deg);
			}

			line-height: 80rpx;
			font-size: 74rpx;
			letter-spacing: 6rpx;
			-webkit-box-reflect: below 2px -webkit-linear-gradient(top, rgba(250, 250, 250, 0), rgba(250, 250, 250, 0) 70%, rgba(255, 255, 255, 0.644));
			box-reflect: below 0px linear-gradient(top, rgba(250, 250, 250, 0), rgba(250, 250, 250, .05) 70%, rgba(250, 250, 250, 0.3));
		}
	}

	.appTitle {
		font-family: 思源黑体;
		font-size: 34rpx;
		font-weight: normal;
		line-height: 42rpx;
		color: rgba(255, 255, 255, 0.914);
	}

	.login-form {
		margin-top: 20upx;
		padding: 146rpx 48rpx 10rpx 48rpx;
	}
}
</style>
