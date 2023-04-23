<template>
	<view class="login-container">
		<image class="back-icon" src="../../static/images/new-auth/back.png" mode="" @click="handleBack" />

		<view class="login-main-area">
			<h1>绑定手机号</h1>

			<tui-form ref="form">
				<tui-input label="手机号码" padidng="0 0 28rpx 0" borderTop placeholder="请输入手机号码" color="#141000"
					v-model="bindForm.phone"></tui-input>

				<tui-input class="reset-wrapper" label="验证码" padidng="0 0 28rpx 0" borderTop placeholder="请输入验证码" color="#141000"
					v-model="bindForm.code">
					<block slot="right">
						<button v-show="!timer" @click="onGetCode" class="uni-btn get-code">
							获取验证码
						</button>

						<view v-show="timer" class="awaiting">
							<text class="second-text">{{ awaitSecond }}s</text>
							<text>后重新获取</text>
						</view>
					</block>
				</tui-input>
			</tui-form>


			<button class="bind-btn uni-btn" :style="{ background: btnStatus ? '#FFC117' : '' }" @click="onBind">
				确定
			</button>
		</view>
		<tui-toast ref="toast"></tui-toast>
	</view>
</template>

<script>
import {
	getCodeApi,
	bindMobileForWXApi
} from '../../api/auth'
import { bindLastUserApi } from '../../api/user'
import {
	throttle
} from '../../utils'
import { NEW_BIND_ID } from '../../constant'

export default {
	data() {
		return {
			bindForm: {
				"openId": "",
				"phone": "",
				"code": ""
			},
			onGetCode: '',
			onBind: '',
			timer: null,
			awaitSecond: 60,
			userId: null
		}
	},

	onLoad(options) {
		this.onGetCode = throttle(this.handleGetCode, 1000)
		this.onBind = throttle(this.handleBindMobile, 1000)
		this.bindForm.openId = options.openId
		this.userId = options.userId
	},

	methods: {
		// 获取验证码
		async handleGetCode() {
			if (this.bindForm.phone.length !== 11) {
				this.ttoast({
					type: 'fail',
					title: '请输入合法的手机号码',
				})
				return
			}

			uni.showLoading({
				title: '加载中...',
			})

			try {
				await getCodeApi({
					phone: this.bindForm.phone,
					flag: 2,
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
				this.ttoast({
					type: 'fail',
					title: '验证码发送失败',
					content: '请稍后重试',
				})
			} finally {
				uni.hideLoading()
			}
		},

		// 点击绑定
		async handleBindMobile() {
			if (!this.bindForm.code) {
				this.ttoast({
					type: 'fail',
					title: '请输入验证码',
				})

				return
			}

			if (!this.bindForm.phone) {
				this.ttoast({
					type: 'fail',
					title: '请输入绑定的手机号',
				})

				return
			}

			if (this.bindForm.phone.length !== 11) {
				this.ttoast({
					type: 'fail',
					title: '请输入合法的手机号码',
				})
				return
			}


			await bindMobileForWXApi(this.bindForm)
			this.ttoast('绑定成功')

			const bindId = uni.getStorageSync(NEW_BIND_ID)
			if (bindId) {
				bindLastUserApi({
					userId: this.userId,
					bindId: bindId
				}).then(() => {
					uni.removeStorageSync(NEW_BIND_ID)
				})
			}

			setTimeout(() => {
				uni.switchTab({
					url: '/'
				})
			}, 1000)

		},

		handleBack() {
			uni.navigateBack();
		}
	},

	computed: {
		btnStatus() {
			return this.bindForm.code && this.bindForm.phone
		},
	}
}
</script>

<style lang="less" scoped>
view,
text {
	line-height: 1.5;
}

.login-container {
	width: 100vw;
	min-height: 100vh;
	background: url('../../static/images/new-auth/bg.png') no-repeat;
	background-size: cover;

	.back-icon {
		position: relative;
		top: 30upx;
		left: 20upx;
		width: 80upx;
		height: 80upx;
		z-index: 1000;
	}

	.login-main-area {
		padding: 90upx 80upx 0;

		h1 {
			color: #141000;
			font-size: 64upx;
			font-weight: 400;
			margin-bottom: 120upx;
		}

		/deep/ .tui-input__wrap {
			padding: 0 0 28upx 0 !important;
			flex-direction: column;
			align-items: flex-start;
			background: transparent !important;
			margin-bottom: 72upx !important;

			&::before {
				display: none;
			}
		}

		/deep/ .tui-input__label {
			text {
				margin-bottom: 12upx;
				font-size: 24upx !important;
				color: #b3b2ad !important;
			}
		}

		/deep/ .uni-input-wrapper {
			margin-top: 12upx;

			input {
				padding-bottom: 28upx !important;
			}
		}

		/deep/ .tui-line__left::after {
			left: 0 !important;
		}

		.reset-wrapper {
			/deep/ .tui-input__wrap {
				flex-wrap: wrap !important;
				flex-direction: row !important;
				margin-bottom: 10upx !important;

				.tui-input__label {
					flex: 0 0 100%;
				}
			}
		}

		.password-status {
			width: 48upx;
			height: 48upx;
			flex-shrink: 0;
			margin-top: 12upx;
		}
	}

	.bind-btn {
		width: 606upx;
		height: 96upx;
		border-radius: 100px;
		margin: 80upx 0 40upx 0;
		background-color: #ffe6a2;
		color: #fff;
		line-height: 96upx;
		font-size: 32upx;
		font-weight: 500;
		transition: all 100ms;
		opacity: 1;

		&:active {
			opacity: 0.3;
		}
	}

	.get-code {
		color: #ffc117;
		font-size: 28upx;
		margin-top: 24upx;
	}

	.awaiting {
		font-size: 28upx;
		color: #b3b2ad;
		margin-top: 12upx;

		.second-text {
			color: #605d52;
		}
	}
}
</style>