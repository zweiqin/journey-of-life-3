<template>
	<view class="containers">
		<view class="header" style="width: 100vw;height: 122rpx">
			<image class="backFn" src="@/static/images/common/back.png" @click="goBack"></image>
		</view>
		<view class="logoText">
			<view class="texts" style="font-weight: bold;">
				<view class="txt">欢迎来到</view>
				<view class="txt">团蜂社区</view>
			</view>
			<view class="animate__animated animate__slideInLeft" style="margin-top: 48rpx;margin-left: -6rpx;">
				<text class="appTitle">年轻的社区生活元宇宙</text>
			</view>
		</view>
		<view class="loginForm">
			<tui-form ref="form" :show-message="false">
				<view class="iphoneNum-box">
					<tui-input
						v-model="loginForm.phone" placeholder-class="inputs" label="+ 86" label-color="#FFFFFF"
						border-color="#EA5B1D" placeholder="请输入手机号码" background-color="" :border-top="false"
						color="#fff"
						:focus="focusMap[0]" :confirm-type="keybordEnterText" @confirm="handleClickConfirmType(0)"
					></tui-input>
				</view>
				<view class="iphoneNum-box">
					<tui-input
						v-model="loginForm.password" placeholder-class="inputs" type="password" class="reset-wrapper"
						background-color="" :border-top="false" border-color="#EA5B1D" label-color="#FFFFFF"
						placeholder="请输入密码"
						color="#fff" :focus="focusMap[1]" :confirm-type="keybordEnterText" @confirm="handleClickConfirmType(1)"
					>
					</tui-input>
				</view>
			</tui-form>
		</view>
		<view class="loginBtnBox">
			<button class="uni-btn loginBtn" @click="onlogin">登录</button>
		</view>
		<view class="loginFn">
			<view class="loginFnItem">
				<image class="loginIcon" src="@/static/images/icon/register.png" @click="go('/pages/login/register')"></image>
				<text class="title">注册</text>
			</view>
			<view class="loginFnItem">
				<image class="loginIcon" src="@/static/images/icon/pwd.png" @click="gotoPhoneLogin"></image>
				<text class="title">手机登录</text>
			</view>
			<TuanWXLogin @login="handleWXLoginAfter">
				<view class="loginFnItem">
					<image class="loginIcon" src="@/static/images/icon/wechat.png"></image>
					<text class="title">微信登录</text>
				</view>
			</TuanWXLogin>
		</view>
		<tui-toast ref="toast"></tui-toast>
	</view>
</template>

<script>
import { A_TF_MAIN } from '../../config'
import { throttle } from '../../utils'
import { T_NEW_BIND_TYPE, USER_ID, T_STORAGE_KEY } from '../../constant'
import { CHANGE_IS_IN_MINIPROGRAM } from '../../store/modules/type'
export default {
	name: 'PwdLogin',
	data() {
		return {
			timer: false,
			isOverPwd: false,
			agreementStatus: false,
			awaitSecond: 60,
			onlogin: null,
			loginForm: {
				phone: '',
				password: ''
			},
			focusMap: [false, false]
		}
	},
	async onLoad(options) {
		if (options.miniProgram) {
			getApp().globalData.isInMiniprogram = true
		}
		this.$store.commit(`app/${CHANGE_IS_IN_MINIPROGRAM}`, !!options.miniProgram)
		this.onlogin = throttle(this.handlelogin, 1000)

		const userId = uni.getStorageSync(USER_ID)
		const userInfo = uni.getStorageSync(T_STORAGE_KEY)

		if (userId && userInfo.token) {
			uni.switchTab({
				url: '/'
			})
		}
	},
	computed: {
		keybordEnterText() {
			return this.agreementStatus && this.loginForm.phone ? 'done' : 'next'
		}
	},
	methods: {
		goBack() {
			uni.navigateBack()
		},
		gotoPhoneLogin() {
			uni.navigateTo({
				url: '/pages/login/login'
			})
		},
		// 优化操作
		handleClickConfirmType(tag) {
			this.focusMap[tag] = false
			if (this.keybordEnterText === 'done') {
				this.handlelogin()
			} else {
				tag = tag + 1 === 2 ? 0 : tag + 1
				// console.log(tag, typeof tag)
				this.focusMap[tag] = true
			}
		},
		async handlelogin() {
			// if (!this.agreementStatus) {
			// 	this.ttoast({
			// 		type: 'info',
			// 		title: '请勾选服务协议'
			// 	})
			// 	return
			// }
			const _this = this
			this.$refs.form
				.validate(this.loginForm, [
					{
						name: 'username',
						rule: ['required', 'isMobile'],
						msg: ['请输入手机号', '请输入正确的手机号']
					},
					{
						name: 'password',
						rule: ['required', 'isEnAndNo'],
						msg: ['请输入密码', '密码为8~20位英文和数字组合']
					}
				])
				.then(async () => {
					await this.$store.dispatch('auth/phoneLoginRegisterAction', {
						username: _this.loginForm.phone,
						password: _this.loginForm.password
					})

					if (uni.getStorageSync(T_NEW_BIND_TYPE)) {
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
					_this.ttoast({
						type: 'fail',
						title: e,
						content: '登录失败'
					})
				})
		},
		handleWXLoginAfter(res) {
			if (uni.getStorageSync(T_NEW_BIND_TYPE)) {
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
	padding-bottom: 66rpx;
	width: 100vw;
	min-height: 100vh;
	background-color: #EA5B1D;

	.backFn {
		display: block;
		padding: 30rpx 30rpx;
		width: 62rpx;
		height: 62rpx;
	}

	.logoText {
		padding: 30rpx 0 0 56rpx;
		color: #ffffff;

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
		padding: 0 20rpx;
		padding-right: 40rpx;
		margin-top: 146rpx;
		width: 750rpx;

		.iphoneNum-box {
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
