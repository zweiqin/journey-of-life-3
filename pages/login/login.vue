<template>
	<view class="containers" style="min-height: 100vh;">
		<view class="header" style="width: 100vw;padding: 30rpx 0;">
			<tui-icon
				name="arrowleft" :size="62" unit="rpx"
				color="#ffffff"
				margin="0 30rpx" @click="$switchTab('/pages/index/index')"
			></tui-icon>
		</view>
		<view class="logoText">
			<view class="texts" style="font-weight: bold;">
				<view class="txt">欢迎来到</view>
				<view class="txt">团蜂社区</view>
			</view>
			<view style="margin-top: 48rpx;margin-left: -6rpx;color: #ffffff;">
				<text style="font-size: 34rpx;line-height: 42rpx;">年轻的社区生活元宇宙</text>
			</view>
		</view>
		<view class="login-form">
			<tui-form ref="refLoginForm" :show-message="false">
				<view>
					<tui-input
						v-model="loginQuery.phone" label="+ 86" type="number" padding="26rpx 20rpx 26rpx 0"
						placeholder-style="color: #f3c1c4;font-size: 32rpx;" label-color="#ffffff" border-color="#EA5B1D"
						placeholder="请输入手机号码" background-color="transparent" :border-top="false" color="#ffffff"
					></tui-input>
				</view>
				<view v-if="loginType === 'password'">
					<tui-input
						v-model="loginQuery.password" type="password" padding="26rpx 20rpx 26rpx 0"
						placeholder-style="color: #f3c1c4;font-size: 32rpx;" background-color="transparent" :border-top="false"
						border-color="#EA5B1D" label-color="#ffffff" placeholder="请输入密码" color="#ffffff"
					>
						<template #right>
							<text style="font-size: 30rpx;color: #dddddd;" @click="isShowResettingPasswordDialog = true">忘记密码</text>
						</template>
					</tui-input>
				</view>
				<view v-if="loginType === 'verificationCode'">
					<ATFGraphicVerificationCode
						type="code" :phone="loginQuery.phone"
						input-padding="26rpx 20rpx 26rpx 0" input-style="color: #f3c1c4;font-size: 32rpx;"
						input-border-color="#EA5B1D" input-label-color="#ffffff" input-color="#ffffff"
						countdown-width="188rpx" countdown-height="48rpx" countdown-text="获取验证码"
						:countdown-size="30" countdownborder-width="0" countdown-color="#dddddd"
						@input="e => loginQuery.verificationCode = e"
					></ATFGraphicVerificationCode>
				</view>
			</tui-form>
		</view>
		<view style="display: flex;flex-direction: column;justify-content: center;align-items: center;margin-top: 80rpx;">
			<view style="text-align: center;" class="login-btn">
				<tui-button
					type="white" width="640rpx" height="82rpx" :size="38"
					margin="40rpx 0 0" shape="circle"
					@click="handleLogin"
				>
					登录
				</tui-button>
			</view>
		</view>
		<view style="margin-top: 120rpx;display: flex;flex-direction: column;align-items: center;">
			<view style="display: flex;justify-content: space-around;white-space: nowrap;">
				<view style="display: flex;flex-direction: column;align-items: center;">
					<view style="width: fit-content;padding: 14rpx;border: 1rpx solid #ffffff;border-radius: 48rpx;">
						<tui-icon name="friendadd-fill" color="#ffffff" :size="22" @click="go('/pages/login/register')"></tui-icon>
					</view>
					<view style="margin-top: 12rpx;font-size: 26rpx;color: #ffffff;">密码注册</view>
				</view>
				<view
					v-if="!(loginType === 'password')"
					style="display: flex;flex-direction: column;align-items: center;padding-left: 48rpx;"
				>
					<view style="width: fit-content;padding: 14rpx;border: 1rpx solid #ffffff;border-radius: 48rpx;">
						<tui-icon name="pwd" color="#ffffff" :size="22" @click="loginType = 'password'"></tui-icon>
					</view>
					<view style="margin-top: 12rpx;font-size: 26rpx;color: #ffffff;">密码登录</view>
				</view>
				<view
					v-if="!(loginType === 'verificationCode')"
					style="display: flex;flex-direction: column;align-items: center;padding-left: 48rpx;"
				>
					<view style="width: fit-content;padding: 14rpx;border: 1rpx solid #ffffff;border-radius: 48rpx;">
						<tui-icon name="mobile" color="#ffffff" :size="22" @click="loginType = 'verificationCode'"></tui-icon>
					</view>
					<view style="margin-top: 12rpx;font-size: 26rpx;color: #ffffff;">短信登录</view>
				</view>
				<!-- #ifdef MP-ALIPAY -->
				<view
					v-if="!(loginType === 'verificationCode')"
					style="display: flex;flex-direction: column;align-items: center;padding-left: 48rpx;"
				>
					<view style="width: fit-content;padding: 14rpx;border: 1rpx solid #ffffff;border-radius: 48rpx;">
						<tui-icon name="mobile" color="#ffffff" :size="22" @click="handleAliPayLogin"></tui-icon>
					</view>
					<view style="margin-top: 12rpx;font-size: 26rpx;color: #ffffff;">支付宝登录</view>
				</view>
				<!-- #endif -->
				<view
					v-if="(terminal === 6) || (terminal === 3) || (terminal === 2)"
					style="display: flex;flex-direction: column;align-items: center;padding-left: 48rpx;"
				>
					<view style="width: fit-content;padding: 14rpx;border: 1rpx solid #ffffff;border-radius: 48rpx;">
						<tui-icon name="wechat" color="#ffffff" :size="22" @click="handleWXLogin"></tui-icon>
					</view>
					<view style="margin-top: 12rpx;font-size: 26rpx;color: #ffffff;">微信登录</view>
				</view>
			</view>
			<view style="margin-top: 58rpx;font-size: 22rpx;color: #ffffff;">
				<text>版本号：v{{ SYSTEM_VERSION }}</text>
			</view>
		</view>

		<tui-dialog
			style="position: relative;z-index: 888;" :buttons="[{ text: '取消' }, { text: '确定', color: '#586c94' }]"
			:show="isShowResettingPasswordDialog" title="重置密码" @click="handleResettingPassword"
		>
			<template #content>
				<tui-input v-model="resettingFormData.phone" label="手机号" type="number" placeholder="请输入手机号"></tui-input>
				<tui-input v-model="resettingFormData.password" label="密码" type="password" placeholder="请输入密码"></tui-input>
				<tui-input
					v-model="resettingFormData.newPassword" label="确认密码" type="password"
					placeholder="请再次输入密码"
				></tui-input>
				<ATFGraphicVerificationCode
					type="code" :phone="resettingFormData.phone"
					input-type="number" input-label="验证码"
					countdown-width="144rpx" @input="e => resettingFormData.verificationCode = e"
				></ATFGraphicVerificationCode>
			</template>
		</tui-dialog>
	</view>
</template>

<script>
import { mapGetters } from 'vuex'
import { T_REDIRECT_TYPE, USER_ID, T_STORAGE_KEY } from '../../constant'
import { updateForgetPasswordUserApi } from '../../api/anotherTFInterface'
import { CHANGE_IS_IN_MINIPROGRAM } from '../../store/modules/type'
import { getUrlCode } from '../../utils'
import { SYSTEM_VERSION } from '../../config'

export default {
	name: 'Login',
	data() {
		return {
			SYSTEM_VERSION,
			loginType: 'verificationCode', // password,verificationCode
			loginQuery: {
				phone: '',
				verificationCode: '',
				password: ''
			},
			resettingFormData: {
				phone: '',
				password: '',
				newPassword: '',
				verificationCode: ''
			},
			isShowResettingPasswordDialog: false
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
				url: '/pages/index/index'
			})
		} else if ((this.$store.state.app.terminal === 6) || (this.$store.state.app.terminal === 3)) {
			const code = getUrlCode().code
			if (code) this.handleWXLogin()
		}
	},
	computed: {
		...mapGetters([ 'terminal' ])
	},
	methods: {
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
					rule: ['required', 'isNotChinese'],
					msg: ['请输入密码', '密码不能包含中文']
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
		},
		handleResettingPassword(e) {
			if (e.index === 0) { } else if (e.index === 1) {
				if (!this.resettingFormData.phone) return this.$showToast('请填写手机号')
				if (!this.resettingFormData.verificationCode) return this.$showToast('请填写验证码')
				if (!this.resettingFormData.password) return this.$showToast('请设置密码！')
				if (this.resettingFormData.password !== this.resettingFormData.newPassword) return this.$showToast('密码不一致')
				uni.showLoading({
					title: '操作中'
				})
				updateForgetPasswordUserApi({ ...this.resettingFormData })
					.then(({ data }) => {
						uni.hideLoading()
						this.$showToast('重置成功')
					})
					.catch(() => {
						uni.hideLoading()
					})
			}
			this.resettingFormData.phone = ''
			this.resettingFormData.verificationCode = ''
			this.resettingFormData.password = ''
			this.resettingFormData.newPassword = ''
			this.isShowResettingPasswordDialog = false
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

	/deep/ .tui-dialog {
		overflow: visible;
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

	.login-form {
		margin-top: 20rpx;
		padding: 146rpx 48rpx 10rpx 48rpx;

		/deep/ .tui-input__wrap {
			border-bottom: 2rpx solid #ffffff;
		}
	}

	.login-btn {
		/deep/ .tui-btn {
			font-weight: bold;
			color: #ea5b1d !important;
		}
	}
}
</style>
