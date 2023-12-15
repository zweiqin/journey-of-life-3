<template>
	<!-- 登录 -->
	<!-- flex-items-plus 去除了这个类名 相当于flex的两个居中操作 alignItems justifyContent -->
	<view class="container flex-column">
		<view style="padding: 30upx 20upx 0;color: #000000;">
			<image src="@/static/images/detail/top-back.png" style="width:34rpx;height:50rpx;" @click="goBack"></image>
		</view>
		<!-- 		<view class="register">
			注册
			</view> -->
		<view class="PhoneAuthentication">
			<text class="textRL">手机验证码登录</text>
			<text class="textTips">请先注册账号再登录</text>
		</view>
		<view class="LoginForm">
			<tui-form ref="form" :show-message="false">
				<view class="iphoneNum-box">
					<!-- <text class="labels">手机号</text> -->
					<tui-input
						v-model="loginForm.phone" label="手机号码" padidng="0 0 28rpx 0" border-top
						placeholder="请输入手机号码"
						color="#141000" :focus="focusMap[0]" :confirm-type="keybordEnterText"
						@confirm="handleClickConfirmType(0)"
					></tui-input>
					<!-- <input v-model="loginForm.phone" type="texts" placeholder="请输入手机号"> -->
				</view>
				<view class="iphoneNum-box">
					<tui-input
						v-model="loginForm.code" class="reset-wrapper" label="验证码" padidng="0 0 28rpx 0"
						border-top
						placeholder="请输入验证码" color="#141000" :focus="focusMap[1]" :confirm-type="keybordEnterText"
						@confirm="handleClickConfirmType(1)"
					>
						<block slot="right">
							<button v-show="!timer" class="uni-btn get-code" @click="onGetCode">获取验证码</button>
							<view v-show="timer" class="awaiting">
								<text class="second-text">{{ awaitSecond }}s</text>
								<text>后重新获取</text>
							</view>
						</block>
					</tui-input>
				</view>
			</tui-form>
			<view class="ReadingAgreement">
				<radio
					style="transform:scale(0.8)" color="#CE2601" :checked="agreementStatus"
					@click="agreementStatus = !agreementStatus"
				/>
				<view class="Agreement">
					我已阅读并同意<!-- <text class="redText">《用户服务协议》</text> -->
					<TuanServe @op="agreementStatus = $event">
						<text style="color: #CE2601;">《团蜂用户协议》</text>
					</TuanServe>
				</view>
			</view>
		</view>
		<tui-button
			:disabled="!agreementStatus" type="danger" width="650rpx" margin="0 auto"
			height="82rpx"
			style="margin-top: 60rpx;" @click="onlogin"
		>
			立即登录
		</tui-button>
		<view class="problem">
			<text>没有账号？<text class="redText" @click="go('/pages/login/login')">微信登录一键注册！！！</text></text>
			<text>登录错误？</text>
		</view>
		<tui-toast ref="toast"></tui-toast>

	</view>
</template>

<script>
import { sf } from '../../config'
import { verificationCodeRule } from './rules'
import { throttle } from '../../utils'
import {
	T_NEW_BIND_TYPE,
	USER_ID,
	T_STORAGE_KEY,
	NEW_BIND_ACTIVITY_ID,
	NEW_BIND_SERVICE_ID,
	NEW_BIND_SERVICE_URL,
	SF_INVITE_CODE,
	GROUP_INVITE_CODE
} from '../../constant'
import { getCodeApi } from '../../api/auth'
import { CHANGE_IS_IN_MINIPROGRAM } from '../../store/modules/type'

const tabbarList = ['/pages/user/user', '/pages/community-center/community-center', '/pages/index/index']

export default {
	name: 'LoginMessage',
	data() {
		return {
			timer: null,
			awaitSecond: 60,
			agreementStatus: false,
			loginForm: {
				phone: '',
				code: ''
			},
			to: null,
			onlogin: null,
			onGetCode: null,
			focusMap: {
				0: false,
				1: false
			},

			redirect: '',
			isBind: false,
			userId: null,
			partnerCode: null,
			partnerCode2: null
		}
	},
	onShow() {
		this.partnerCode = uni.getStorageSync(SF_INVITE_CODE) || null
		this.partnerCode2 = uni.getStorageSync(GROUP_INVITE_CODE) || null
	},
	async onLoad(options) {
		if (options.miniProgram) {
			getApp().globalData.isInMiniprogram = true
		}
		this.$store.commit(`app/${CHANGE_IS_IN_MINIPROGRAM}`, !!options.miniProgram)
		this.onlogin = throttle(this.handlelogin, 1000)
		this.onGetCode = throttle(this.handleGetCode, 1000)

		this.redirect = options.to

		const userId = uni.getStorageSync(USER_ID)
		const userInfo = uni.getStorageSync(T_STORAGE_KEY)

		if (userId && userInfo.token) {
			if (this.partnerCode) {
				await this.handlePartnerBind(userId)
				uni.switchTab({
					url: '/'
				})
			} else if (this.partnerCode2) {
				await this.handleGroupBind(userId)
				uni.switchTab({
					url: '/'
				})
			} else {
				uni.switchTab({
					url: '/'
				})
			}
		}
	},
	computed: {
		btnStatus() {
			return this.agreementStatus && this.loginForm.code && this.loginForm.phone
		},

		keybordEnterText() {
			return this.agreementStatus && this.loginForm.phone ? 'done' : 'next'
		}
	},
	methods: {
		goBack() {
			uni.navigateBack()
		},
		// 获取验证码
		async handleGetCode() {
			if (this.loginForm.phone.length !== 11) {
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
					phone: this.loginForm.phone,
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
		// 点击登录
		async handlelogin() {
			if (!this.agreementStatus) {
				this.ttoast({
					type: 'info',
					title: '请勾选服务协议'
				})
				return
			}
			const _this = this
			this.$refs.form
				.validate(this.loginForm, verificationCodeRule)
				.then(async () => {
					const res = await this.$store.dispatch('auth/codeLoginAction', {
						phone: _this.loginForm.phone,
						code: _this.loginForm.code
					})
					// debugger
					// console.log(res)
					// console.log(_this)
					// 是否是师傅邀请码
					if (_this.partnerCode) {
						//  console.log('是否是师傅邀请码')
						await _this.handlePartnerBind(res.userInfo.userId)
						uni.switchTab({
							url: '/'
						})
						return
					}

					//  是否存在团长推广码
					if (_this.partnerCode2) {
						await _this.handleGroupBind(res.userInfo.userId)
						uni.switchTab({
							url: '/'
						})
						return
					}

					if (this.redirect) {
						if (tabbarList.includes(_this.redirect)) {
							uni.switchTab({
								url: _this.redirect
							})
						} else {
							uni.redirectTo({
								url: _this.redirect
							})
						}
					} else if (uni.getStorageSync(NEW_BIND_ACTIVITY_ID)) {
						uni.redirectTo({
							url: '/user/sever/activityCenter/index'
						})
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
				.catch((errors) => {
					_this.ttoast({
						type: 'fail',
						title: errors.errorMsg,
						content: '登录失败'
					})
				})
		},

		// 回退
		handleBack() {
			uni.navigateBack()
		},
		handleRedirect() {
			uni.navigateTo({
				url: '/pages/register/register'
			})
		},

		// 优化操作
		handleClickConfirmType(tag) {
			this.focusMap[tag + ''] = false
			if (this.keybordEnterText === 'done') {
				this.handlelogin()
			} else {
				tag = tag + 1 === 2 ? '0' : tag + 1 + ''
				// console.log(tag, typeof tag)
				this.focusMap[tag] = true
			}
		},

		// 师傅绑定用户
		async handlePartnerBind(userId) {
			const _this = this
			uni.request({
				url: sf + '/api/third/partner/memberBindingSf',
				method: 'post',
				data: {
					userId,
					partnerCode: this.partnerCode
				},
				success: (res) => {
					if (!res.data.ok) {
						_this.ttoast({
							type: 'fail',
							title: res.data.msg || '扫码失败'
						})
					}
				},
				fail: () => { },
				complete: () => { }
			})
		},

		// 团长绑定用户
		handleGroupBind(userId) {
			const _this = this
			return new Promise((resolve, reject) => {
				uni.request({
					url: sf + '/api/third/tz/memberBindingSf',
					method: 'post',
					data: {
						userId,
						partnerCode: _this.partnerCode2
					},
					success: (res) => {
						const data = res.data
						if (data.ok) {
							_this.ttoast('操作成功')
						} else {
							_this.ttoast({
								type: 'fail',
								title: data.msg || '操作失败,请重试'
							})
						}

						uni.removeStorageSync(GROUP_INVITE_CODE)
					},
					fail: (fail) => {
						_this.ttoast({
							type: 'fail',
							title: '操作失败,请重试'
						})
					},
					complete: (complete) => {
						setTimeout(() => {
							resolve()
						}, 1000)
					}
				})
			})
		},

		// 微信登陆后续
		async handleWXLoginAfter(res) {
			// // #ifdef H5
			// window.location.href =
			//   window.location.origin + window.location.pathname + window.location.hash
			// // #endif
			const _this = this
			// #ifdef H5
			// 判断是否已经绑定了手机号
			if (res.userInfo.phone === '') {
				uni.navigateTo({
					url: '/pages/login/bind-phone?openId=' + res.userInfo.weixinOpenid + '&userId=' + res.userInfo.userId
				})

				return
			}

			// 是否是师傅邀请码
			if (_this.partnerCode) {
				await _this.handlePartnerBind(res.userInfo.userId)
				uni.switchTab({
					url: '/'
				})
				return
			}

			// 是否存在团长推广码
			if (_this.partnerCode2) {
				await _this.handleGroupBind(res.userInfo.userId)
				uni.switchTab({
					url: '/'
				})
				return
			}
			// #endif

			if (this.redirect) {
				// console.log('进来了', this.redirect)
				if (tabbarList.includes(_this.redirect)) {
					uni.switchTab({
						url: _this.redirect
					})
				} else {
					uni.redirectTo({
						url: _this.redirect
					})
				}
			} else if (uni.getStorageSync(NEW_BIND_ACTIVITY_ID)) {
				uni.redirectTo({
					url: '/user/sever/activityCenter/index'
				})
			} else {
				uni.switchTab({
					url: '/pages/community-center/community-centerr'
				})
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  background-color: #FFFFFF;

  .redText {
    color: #CE2601;
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
      font-size: 24rpx;

      .Agreement {
        display: flex;
        margin-left: -25rpx;
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
    color: #CE2601;
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
</style>
