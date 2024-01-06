<template>
	<view class="container">
		<image class="backIcon" src="@/static/images/icon/goback.png" @click="goBack"></image>
		<view class="titleBox">
			<p class="bigTitle">填写注册信息</p>
			<p class="tips">请仔细填写以下信息，以免后期登陆异常</p>
		</view>
		<view class="formBox">
			<tui-form ref="form" :show-message="false">
				<view class="formItem">
					<tui-input
						v-model="formData.username" placeholder-class="inputs" label="" border-color="#EA5B1D"
						placeholder="请输入用户名" background-color="" :border-top="false" color="#222229"
						:clearable="true" size="34"
						@confirm="handleClickConfirmType(0)"
					></tui-input>
				</view>
				<view class="formItem">
					<tui-input
						v-model="formData.mobile" placeholder-class="inputs" label="" border-color="#EA5B1D"
						placeholder="请输入电话号码" background-color="" :border-top="false" color="#222229"
						:clearable="true" size="34"
						@confirm="handleClickConfirmType(0)"
					></tui-input>
				</view>
				<view class="formItem">
					<tui-input
						v-model="formData.code" placeholder-class="inputs" class="reset-wrapper" background-color=""
						:border-top="false" border-color="#EA5B1D" label-color="#FFFFFF" placeholder="请输入验证码"
						color="#222229"
						@confirm="handleClickConfirmType(1)"
					>
						<block slot="right">
							<button v-show="!timer" class="uni-btn get-code" @click="handleGetCode">获取验证码</button>
							<view v-show="timer" class="awaiting" style="color: #EF530E;">
								<text class="second-text">{{ awaitSecond }}s</text>
								<text>后重新获取</text>
							</view>
						</block>
					</tui-input>
				</view>
				<view class="formItem">
					<tui-input
						v-model="formData.password" placeholder-class="inputs" type="password" label=""
						border-color="#EA5B1D" placeholder="请输入密码" background-color="" :border-top="false"
						color="#222229"
						:clearable="true" size="34" @confirm="handleClickConfirmType(0)"
					></tui-input>
				</view>
				<view class="formItem">
					<tui-input
						v-model="formData.confirmPassword" placeholder-class="inputs" type="password" label=""
						border-color="#EA5B1D" placeholder="请再次确认密码" background-color="" :border-top="false"
						color="#222229"
						:clearable="true" size="34" @confirm="handleClickConfirmType(0)"
					></tui-input>
				</view>
			</tui-form>
			<view class="tips">密码长度8-16位,必须同时含有字母和数字</view>
		</view>
		<button class="loginBtn" :class="{ disbleds }" @click="addAcount">确定</button>
		<view class="agreement">
			登录即代表你已阅读并同意<text class="agreementDetails">《用户服务协议》</text>
		</view>
		<tui-toast ref="toast"></tui-toast>
		<tui-modal :show="isOk" custom :fade-in="true" :button="[]" @cancel="isOk = false">
			<view style="padding: 28upx 0;text-align: center;">
				<image style="width: 240rpx;height: 144rpx;" src="@/static/images/icon/acount.png"></image>
				<view class="text">注册完成</view>
				<view class="text2">您已完成注册，请前往登录</view>
				<button
					style="width: 484rpx;height: 80rpx;border-radius: 8rpx;background: #EF530E;color: #fff;line-height: 80rpx;margin-top: 80rpx;"
					@click="go('/pages/login/login')"
				>
					立即登录
				</button>
			</view>
		</tui-modal>
	</view>
</template>

<script>
import { userRegisterApi, resetPasswodApi, getCodeApi } from '@/api/auth'
export default {
	name: 'Register',
	data() {
		return {
			isOverPwd: false,
			timer: false,
			awaitSecond: 60,
			formData: {
				username: '',
				password: '',
				confirmPassword: '',
				mobile: '',
				code: ''
			},
			isOk: false
		}
	},
	computed: {
		disbleds: {
			get() {
				return this.formData.password && this.formData.confirmPassword && this.formData.mobile && this.formData.code
			},
			set(value) {
				console.log(value)
				// return value
			}
		}
	},
	methods: {
		goBack() {
			uni.navigateBack()
		},
		handleClickConfirmType(index) {
			console.log(index)
		},
		// 获取验证码
		async handleGetCode() {
			if (this.formData.mobile.length !== 11) {
				this.ttoast({
					type: 'fail',
					title: '请输入合法的手机号码'
				})
				return
			}

			uni.showLoading({
				title: '加载中...'
			})

			try {
				await getCodeApi({
					phone: this.formData.mobile,
					flag: 2
				})

				this.timer = setInterval(() => {
					this.awaitSecond--

					if (this.awaitSecond === 0) {
						this.awaitSecond = 60
						clearInterval(this.timer)
						this.timer = null
					}
				}, 1000)
			} catch (error) {
				console.log(error)
				this.ttoast({
					type: 'fail',
					title: '验证码发送失败',
					content: '请稍后重试'
				})
			} finally {
				uni.hideLoading()
			}
		},
		addAcount() {
			if (!this.disbleds) {
				console.log(this.disbleds)
				return
			}
			this.$refs.form.validate(this.formData, [
				{
					name: 'mobile',
					rule: ['required', 'isMobile'],
					msg: ['请输入手机号', '请输入正确的手机号']
				},
				{
					name: 'code',
					rule: [ 'required' ],
					msg: [ '请输入验证码' ]
				},
				{
					name: 'password',
					rule: ['required', 'isEnAndNo'],
					msg: ['请输入密码', '密码为8~20位英文和数字组合']
				},
				{
					name: 'confirmPassword',
					rule: ['required', 'isSame:password'],
					msg: ['请再次确认密码', '两次密码不一致']
				}
			])
				.then((res) => {
					userRegisterApi({
						mobile: this.formData.mobile,
						password: this.formData.password
					}).then((res) => {
						this.isOk = true
						console.log(res)
					})
						.catch((err) => {
							console.log(err)
						})
				})
				.catch((errors) => {
					uni.showToast({
						title: errors.errorMsg,
						icon: 'none'
					})
				})
		}
	}
}
</script>

<style lang="scss" scoped>
.text {
	margin-top: 46rpx;
	font-family: 思源黑体;
	font-size: 36rpx;
	font-weight: normal;
	line-height: 52rpx;
	text-align: center;
	color: #222229;
}

.text2 {
	margin-top: 18rpx;
	font-family: 思源黑体;
	font-size: 28fpx;
	font-weight: 350;
	line-height: 40fpx;
	text-align: center;
	color: #888889;
}

.disbleds {
	background-color: #EF530E !important;
}

.get-code {
	font-family: Source Han Sans;
	font-size: 30rpx;
	font-weight: normal;
	line-height: 40rpx;
	text-align: right;
	letter-spacing: 0px;
	color: #EF530E;
}

.container {
	position: relative;
	width: 100vw;
	min-height: 100vh;

	/* background-color: #888889; */
	.backIcon {
		width: 40rpx;
		height: 40rpx;
		padding: 24rpx 30rpx;
	}

	.titleBox {
		width: 100vw;
		box-sizing: border-box;
		padding: 64rpx;

		.bigTitle {
			font-family: Source Han Sans;
			font-size: 64rpx;
			font-weight: normal;
			line-height: 90rpx;
			color: #303030;
		}

		.tips {
			font-family: Source Han Sans;
			font-size: 28rpx;
			font-weight: normal;
			line-height: 40rpx;
			color: #303030;
		}
	}

	.formBox {
		width: 100vw;
		box-sizing: border-box;
		padding: 0rpx 40rpx;

		.formItem {
			height: 120rpx;
		}

		.tips {
			margin-left: 26rpx;
			font-family: Source Han Sans;
			font-size: 24rpx;
			font-weight: normal;
			line-height: 32rpx;
			color: #646466;
		}
	}

	.loginBtn {
		margin-top: 64rpx;
		width: 622rpx;
		height: 96rpx;
		border-radius: 16rpx;
		background: #C6C7CB;
		color: #FFFFFF;
		font-size: 32rpx;
	}

	.agreement {
		position: absolute;
		bottom: 48rpx;
		left: 50%;
		transform: translateX(-50%);
		white-space: nowrap;
		font-family: 思源黑体;
		font-size: 28rx;
		font-weight: 350;
		line-height: 36rpx;
		text-align: center;
		letter-spacing: 0rpx;
		/* 登录即代表你已阅读并同意 */
		color: #888889;

		.agreementDetails {
			color: #222229;
		}
	}
}
</style>
