<template>
    <view class="containers" style="min-height: 100vh;">
		<view class="header" style="width: 100vw;height: 122rpx">
        	<image class="backFn" @click="goBack" src="@/static/images/common/back.png"></image>
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
					<!-- <text class="labels">手机号</text> -->
					<tui-input placeholder-class="inputs" :adjustPosition="false"
						v-model="loginForm.phone" label="+ 86" labelColor="#FFFFFF" borderColor="#EA5B1D"
						placeholder="请输入手机号码" backgroundColor="" :borderTop="false"
						color="#fff" :confirm-type="keybordEnterText"
						@confirm="handleClickConfirmType(0)"
					></tui-input>
					<!-- <input v-model="loginForm.phone" type="texts" placeholder="请输入手机号"> -->
				</view>
				<view class="iphoneNum-box">
					<tui-input placeholder-class="inputs" :adjustPosition="false"
						v-model="loginForm.code" class="reset-wrapper"
						backgroundColor="" :borderTop="false" borderColor="#EA5B1D"  labelColor="#FFFFFF"
						placeholder="请输入验证码" color="#fff" :confirm-type="keybordEnterText"
						@confirm="handleClickConfirmType(1)"
					>
						<block slot="right">
							<button v-show="!timer" class="uni-btn get-code" @click="handleGetCode">获取验证码</button>
							<view v-show="timer" class="awaiting">
								<text class="second-text" style="color: rgba(255, 255, 255, 0.679);">{{ awaitSecond }}s</text>
								<text style="color: rgba(255, 255, 255, 0.679);">后重新获取</text>
							</view>
						</block>
					</tui-input>
				</view>
            </tui-form>
        </view>
		<view class="loginBtnBox">
        	<button class="uni-btn loginBtn" @click="onlogin">登录</button>
		</view>
        <view class="loginFn">
            <view class="loginFnItem">
                <image class="loginIcon" @click="go('/pages/login/register')" src="@/static/images/icon/register.png"></image>
                <text class="title">注册</text>
            </view>
            <view class="loginFnItem">
                <image class="loginIcon" @click="gotoPwdLogin" src="@/static/images/icon/pwd.png"></image>
                <text class="title">密码登录</text>
            </view>
			<TuanWXLogin @login="handleWXLoginAfter">
				<view class="loginFnItem">
					<image class="loginIcon" src="@/static/images/icon/wechat.png"></image>
					<text class="title">微信登录</text>
				</view>
			</TuanWXLogin>
        </view>
        <!-- <tui-toast ref="toast"></tui-toast> -->
    </view>
</template>

<script>
import { sf, A_TF_MAIN } from '../../config'
import { msgLoginRules } from './rules'
// import { sf } from '../../config'
// import { verificationCodeRule } from './rules'
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
    name: 'login',
    data() {
        return {
            timer: false,
            isOverPwd: false,
            agreementStatus: false,
            awaitSecond: 60,
            onlogin: null,
            loginForm: {
                phone: '',
                code: ''
            },
            focusMap: [false,false],
			partnerCode: '',
			partnerCode2: '',
			redirect: ''
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
		// console.log(this.redirect);
		// debugger
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
        keybordEnterText() {
			return 'done'
		}
    },
    methods: {
        goBack() {
            uni.navigateBack();
        },
        gotoPwdLogin() {
            uni.navigateTo({
                 url: '/pages/login/pwdLogin'
            })
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
			// if (!this.agreementStatus) {
			// 	this.ttoast({
			// 		type: 'info',
			// 		title: '请勾选服务协议'
			// 	})
			// 	return
			// }
			const _this = this
			this.$refs.form
				.validate(this.loginForm, msgLoginRules)
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
		async handleWXLoginAfter(res) {
			const _this = this
			// #ifdef H5
			// 判断是否已经绑定了手机号
			// if (!res.userInfo.phone) {
			// 	window.location.replace(`${A_TF_MAIN}/#/pages/login/bind-phone?openId=${res.userInfo.weixinOpenid}`)
			// 	return
			// }
			// 是否是师傅邀请码
			if (_this.partnerCode) {
				await _this.handlePartnerBind(res.userInfo.userId)
				window.location.replace(`${A_TF_MAIN}/#/`)
				return
			}
			// 是否存在团长推广码
			if (_this.partnerCode2) {
				await _this.handleGroupBind(res.userInfo.userId)
				window.location.replace(`${A_TF_MAIN}/#/`)
				return
			}
			if (this.redirect) {
				window.location.replace(`${A_TF_MAIN}/#${this.redirect}`)
			} else if (uni.getStorageSync(NEW_BIND_ACTIVITY_ID)) {
				window.location.replace(`${A_TF_MAIN}/#/user/sever/activityCenter/index`)
			} else if (uni.getStorageSync(T_NEW_BIND_TYPE)) {
				window.location.replace(`${A_TF_MAIN}/#/pages/jump/jump`)
			} else {
				window.location.replace(`${A_TF_MAIN}/#/`)
			}
			// #endif
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
            -webkit-box-reflect: below 2px -webkit-linear-gradient(top,rgba(250, 250, 250, 0),rgba(250, 250, 250, 0) 70%,rgba(255, 255, 255, 0.644));
            box-reflect: below 0px linear-gradient(top,rgba(250,250,250,0),rgba(250,250,250,.05) 70%,rgba(250,250,250,0.3));
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