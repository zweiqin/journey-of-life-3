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
		<view class="loginForm">
			<tui-form ref="form" :show-message="false">
				<view class="iphoneNum-box">
					<tui-input
						v-model="loginForm.phone" label="+ 86" type="number" label-color="#ffffff"
						border-color="#EA5B1D"
						placeholder="请输入手机号码" background-color="transparent" :border-top="false" color="#ffffff"
					></tui-input>
				</view>
				<view class="iphoneNum-box">
					<tui-input
						v-model="loginForm.verificationCode" background-color="transparent" :border-top="false" border-color="#EA5B1D"
						label-color="#ffffff" placeholder="请输入验证码" color="#ffffff"
					>
						<template #right>
							<tui-countdown-verify
								ref="refLoginVerify" width="188upx" height="48upx"
								border-width="0" text="获取验证码" :size="30" color="#dddddd"
								@send="handleSendVerify"
							></tui-countdown-verify>
						</template>
					</tui-input>
				</view>
				<!-- <view class="iphoneNum-box">
					<tui-input
					v-model="loginForm.password" placeholder-class="inputs" type="password" class="reset-wrapper"
					background-color="" :border-top="false" border-color="#EA5B1D" label-color="#FFFFFF"
					placeholder="请输入密码"
					color="#fff"
					>
					</tui-input>
					</view> -->
			</tui-form>
		</view>
		<view class="loginBtnBox">
			<button class="uni-btn loginBtn" @click="handleLogin">登录</button>
		</view>
		<view class="loginFn">
			<view class="loginFnItem">
				<image class="loginIcon" src="../../static/images/icon/register.png" @click="go('/pages/login/register')"></image>
				<text class="title">注册</text>
			</view>
			<view class="loginFnItem">
				<image class="loginIcon" src="../../static/images/icon/pwd.png" @click="handlePasswordLogin"></image>
				<text class="title">密码登录</text>
			</view>
			<view class="loginFnItem">
				<image class="loginIcon" src="../../static/images/icon/wechat.png" @click="handleWXLoginAfter"></image>
				<text class="title">微信登录</text>
			</view>
		</view>
	</view>
</template>

<script>
import { A_TF_MAIN } from '../../config'
import { T_NEW_BIND_TYPE, USER_ID, T_STORAGE_KEY } from '../../constant'
import { getVerifyCodeApi } from '../../api/anotherTFInterface'
import { CHANGE_IS_IN_MINIPROGRAM } from '../../store/modules/type'
import { isInWx, getUrlCode } from '../../utils'

const tabbarList = ['/pages/user/user', '/pages/community-center/community-center', '/pages/index/index']
export default {
	name: 'Login',
	data() {
		return {
			loginType: 'verificationCode', // password,verificationCode
			loginForm: {
				phone: '',
				verificationCode: '',
				password: ''
			},
			redirect: ''
		}
	},
	onLoad(options) {
		if (options.miniProgram) {
			getApp().globalData.isInMiniprogram = true
		}
		this.$store.commit(`app/${CHANGE_IS_IN_MINIPROGRAM}`, !!options.miniProgram)
		this.redirect = options.to
	},
	onShow() {
		const userId = uni.getStorageSync(USER_ID)
		const userInfo = uni.getStorageSync(T_STORAGE_KEY)
		if (userId && userInfo.token) {
			uni.switchTab({
				url: '/'
			})
		} else if (isInWx()) {
			const code = getUrlCode().code
			if (code) this.handleWXLogin()
		}
	},
	methods: {
		// 点击登录
		handleLogin() {
			this.$refs.form
				.validate(this.loginForm, [
					{
						name: 'phone',
						rule: ['required', 'isMobile'],
						msg: ['请输入手机号', '请输入正确的手机号']
					},
					{
						name: 'code',
						rule: [ 'required' ],
						msg: [ '请输入验证码' ]
					}
					// {
					// 	name: 'password',
					// 	rule: ['required', 'isEnAndNo'],
					// 	msg: ['请输入密码', '密码为8~20位英文和数字组合']
					// }
				])
				.then(async () => {
					await this.$store.dispatch('auth/phoneLoginRegisterAction', {
						type: 2, // 1注册，2登录
						phone: this.loginForm.phone,
						verificationCode: this.loginForm.verificationCode,
						password: this.loginForm.password
					})
					if (this.redirect) {
						if (tabbarList.includes(this.redirect)) {
							uni.switchTab({
								url: this.redirect
							})
						} else {
							uni.redirectTo({
								url: this.redirect
							})
						}
					} else if (uni.getStorageSync(T_NEW_BIND_TYPE)) {
						uni.redirectTo({
							url: '/pages/jump/jump'
						})
					} else {
						uni.switchTab({
							url: '/pages/community-center/community-centerr'
						})
					}
				})
				.catch((e) => {
					this.$showToast(JSON.stringify(e))
				})
		},
		handlePasswordLogin() {
		},
		async handleWXLogin() {
			const data = await this.$store.dispatch('auth/wxLoginAction', code)
			this.handleWXLoginAfter(data)
		},
		// 获取验证码
		handleSendVerify() {
			if (!this.loginForm.phone) {
				this.$refs.refLoginVerify.reset()
				return this.$showToast('请填写手机号')
			}
			if (!/^1[3-9]\d{9}$/.test(this.loginForm.phone)) {
				this.$refs.refLoginVerify.reset()
				return this.$showToast('请输入正确的手机号')
			}
			getVerifyCodeApi({ phone: this.loginForm.phone })
				.then((res) => {
					this.$refs.refLoginVerify.success()
					this.$showToast('发送成功，请注意查看手机短信')
				})
				.catch(() => {
					this.$refs.refLoginVerify.reset()
				})
		},
		handleWXLoginAfter(res) {
			if (this.redirect) {
				window.location.replace(`${A_TF_MAIN}/#${this.redirect}`)
			} else if (uni.getStorageSync(T_NEW_BIND_TYPE)) {
				window.location.replace(`${A_TF_MAIN}/#/pages/jump/jump`)
			} else {
				window.location.replace(`${A_TF_MAIN}/#/`)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
/deep/ .tui-input__placeholder {
	color: rgba(255, 255, 255, 0.738);

	inout {
		color: #fff;
	}
}

/deep/ .tui-input__wrap::after {
	content: ' ';
	position: absolute;
	border-bottom: 4rpx solid var(--thorui-line-color, rgba(255, 255, 255, 0.741));
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	-webkit-transform-origin: 0 100%;
	transform-origin: 0 100%;
	bottom: 0;
	right: 0;
	left: 0;
	z-index: 2;
	pointer-events: none;
}

.containers {
	display: flex;
	flex-direction: column;
	position: relative;
	box-sizing: border-box;
	/* width: 100vw; */
	/* height: 100vh; */
	/* min-height: 100%; */
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
			/* -webkit-transform: skewX(15deg);
            -moz-transform: skewX(-15deg); */
		}
	}

	.appTitle {
		font-family: 思源黑体;
		font-size: 34rpx;
		font-weight: normal;
		line-height: 42rpx;
		color: rgba(255, 255, 255, 0.914);
	}

	.loginForm {
		box-sizing: border-box;
		padding: 146rpx 20rpx 10rpx 20rpx;
		/* padding-right: 40rpx; */
		/* margin-top: 186rpx; */
		width: 750rpx;
		height: 336rpx;

		.iphoneNum-box {
			box-sizing: border-box;
			padding-right: 20rpx;

			.get-code {
				font-size: 28rpx;
				color: rgba(255, 255, 255, 0.679);
			}
		}
	}

	.loginBtnBox {
		clear: both;
		width: 100%;
		height: 230rpx;
		box-sizing: border-box;
		margin-top: 100rpx;

		.loginBtn {
			margin: 0 auto;
			width: 640rpx;
			height: 80rpx;
			border-radius: 50rpx;
			background: #ffffff;
			font-family: Source Han Sans;
			font-weight: 600;
			font-size: 38rpx;
			line-height: 80rpx;
			color: #EA5B1D;
		}
	}

	.loginFn {
		width: 420rpx;
		height: 114rpx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;

		/* margin-bottom: 68rpx; */
		.loginFnItem {
			display: flex;
			align-items: center;
			flex-direction: column;

			.loginIcon {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50rpx;
			}

			.title {
				margin-top: 5rpx;
				font-size: 28rpx;
				font-weight: normal;
				line-height: 40rpx;
				color: #FFFFFF;
			}
		}
	}
}
</style>
