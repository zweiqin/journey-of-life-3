<template>
	<!-- 登录 -->
	<!-- flex-items-plus 去除了这个类名 相当于flex的两个居中操作 alignItems justifyContent -->
	<view class="container flex-column">
		<view style="padding: 30upx 20upx 0; color: #000000">
			<image src="@/static/images/detail/top-back.png" style="width: 34rpx; height: 50rpx" @click="goBack"></image>
		</view>
		<view class="PhoneAuthentication">
			<text class="textRL">绑定手机号</text>
			<text class="textTips">给您带来更方便快捷的服务</text>
		</view>
		<view class="LoginForm">
			<tui-form ref="form">
				<tui-input
					v-model="bindForm.phone" label="手机号码" padidng="0 0 28rpx 0" border-top
					placeholder="请输入手机号码"
					color="#141000"
				></tui-input>

				<tui-input
					v-model="bindForm.code" class="reset-wrapper" label="验证码" padidng="0 0 28rpx 0"
					border-top placeholder="请输入验证码"
					color="#141000"
				>
					<block slot="right">
						<button v-show="!timer" class="uni-btn get-code" @click="onGetCode">获取验证码</button>

						<view v-show="timer" class="awaiting">
							<text class="second-text">{{ awaitSecond }}s</text>
							<text>后重新获取</text>
						</view>
					</block>
				</tui-input>
			</tui-form>
			<!-- <view class="ReadingAgreement">
				<view class="Agreement">
				<view class="skip" @click="handleSkip">
				<text>暂时跳过</text>
				<tui-icon :size="24" name="toright"></tui-icon>
				</view>
				</view>
				</view> -->
		</view>
		<tui-button type="danger" width="650rpx" margin="0 auto" height="82rpx" style="margin-top: 60rpx" @click="onBind">
			立即绑定
		</tui-button>
		<tui-toast ref="toast"></tui-toast>
	</view>
</template>

<script>
import { getCodeApi, bindMobileForWXApi } from '../../api/auth'
import { throttle } from '../../utils'
import { T_NEW_BIND_TYPE } from '../../constant'

export default {
	name: 'BindPhone',
	data() {
		return {
			bindForm: {
				openId: '',
				phone: '',
				code: ''
			},
			onGetCode: '',
			onBind: '',
			timer: null,
			awaitSecond: 60,
			userId: null
		}
	},

	onLoad(options) {
		if (options.miniProgram) {
			getApp().globalData.isInMiniprogram = true
		}
		this.onGetCode = throttle(this.handleGetCode, 1000)
		this.onBind = throttle(this.handleBindMobile, 1000)
		this.bindForm.openId = options.openId
		this.userId = options.userId
	},

	computed: {
		btnStatus() {
			return this.bindForm.code && this.bindForm.phone
		}
	},

	methods: {
		// 获取验证码
		async handleGetCode() {
			if (this.bindForm.phone.length !== 11) {
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
					phone: this.bindForm.phone,
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
				this.ttoast({
					type: 'fail',
					title: '验证码发送失败',
					content: '请稍后重试'
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
					title: '请输入验证码'
				})
				return
			}

			if (!this.bindForm.phone) {
				this.ttoast({
					type: 'fail',
					title: '请输入绑定的手机号'
				})
				return
			}

			if (this.bindForm.phone.length !== 11) {
				this.ttoast({
					type: 'fail',
					title: '请输入合法的手机号码'
				})
				return
			}

			const _this = this
			try {
				await bindMobileForWXApi(this.bindForm)
				_this.ttoast('绑定成功')
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}, 2000)
				// this.$store.dispatch('auth/refrshUserInfo', () => {
				// 	_this.handleSkip()
				// })
			} catch (error) {
				this.ttoast({
					type: 'fail',
					title: '绑定失败',
					content: error
				})
			}
		},

		handleBack() {
			uni.switchTab({ url: '/' })
		},

		async handleSkip() {
			console.log('手机号绑定成功')
			try {
				if (uni.getStorageSync(T_NEW_BIND_TYPE)) {
					uni.redirectTo({
						url: '/pages/jump/jump'
					})
				} else {
					uni.switchTab({
						url: '/pages/community-center/community-centerr'
					})
				}
			} catch (error) {
				setTimeout(() => {
					uni.switchTab({
						url: '/'
					})
				}, 1000)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  background-color: #ffffff;

  .redText {
    color: #ce2601;
  }

  .register {
    margin-top: 30rpx;
    position: relative;
    text-align: right;
    padding-right: 40rpx;
  }

  .PhoneAuthentication {
    margin-top: 45rpx;
    font-family: Source Han Sans CN;
    width: 466rpx;
    height: 100rpx;
    display: flex;
    flex-direction: column;
    padding: 0px 30rpx;
    gap: 8rpx;

    .textRL {
      font-size: 44rpx;
      font-weight: 600;
      line-height: 60rpx;
      color: #222229;
    }

    .textTips {
      font-size: 24rpx;
      font-weight: 350;
      line-height: 32rpx;
      color: #888889;
    }
  }

  .LoginForm {
    margin-top: 50rpx;
    width: 750rpx;

    .iphoneNum-box {
      /* 自动布局 */
      margin: 0 auto;
      height: 114rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 32rpx;
      // border-bottom: 2rpx solid #E6E6E8;
      width: 690rpx;
      color: #222229;

      .labels {
        font-size: 32rpx;
        font-weight: normal;
        line-height: 48rpx;
      }
    }

    .ReadingAgreement {
      width: 710rpx;
      // margin: 0 auto;
      margin-top: 33rpx;
      margin-left: 60rpx;
      gap: 32rpx;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 24rpx;

      .Agreement {
        display: flex;
        align-items: center;
        margin-right: 40rpx;
      }
    }
  }

  .problem {
    margin: 0 auto;
    margin-top: 30rpx;
    width: 654rpx;
    display: flex;
    justify-content: space-between;
    font-size: 24rpx;
    font-weight: 350;
    line-height: 32rpx;
    color: #878788;
  }

  .getcode {
    position: absolute;
    right: 30rpx;
    font-size: 32rpx;
    font-weight: normal;
    line-height: 48rpx;
    text-align: right;
    color: #ce2601;
  }

  .awaitCode {
    position: absolute;
    right: 30rpx;
    font-size: 32rpx;
    font-weight: normal;
    line-height: 48rpx;
    text-align: right;
    color: #888889;
  }
}

.skip {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 24upx;
  color: rgb(153, 153, 153);
}
</style>
