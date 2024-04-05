<!-- 修改个人信息 -->
<template>
	<view class="container fs28" :style="{ height: screenHeight + 'px' }">
		<JHeader title="个人信息" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view class="headBox">
			<view class="personalHead-box flex-sp-between flex-display flex-items">
				<label>头像</label>
				<image
					v-if="$store.getters.userInfo.headImage" class="user-headImg"
					:src="common.seamingImgUrl($store.getters.userInfo.headImage)" @click="handleChooseImage"
				></image>
				<image v-else class="user-headImg" src="../../../static/images/new-user/default-user-avatar.png">
				</image>
			</view>
		</view>
		<view class="personalBack-box flex-items-plus flex-column">
			<!-- <view class="personalHead-box flex-sp-between flex-display flex-items">
				<label>旧系统ID</label>
				<view>{{ userId }}</view>
				</view> -->
			<view class="personalHead-box flex-sp-between flex-display flex-items">
				<label>昵称</label>
				<input v-model="name" class="nameInput" type="text" placeholder="请输入内容" @blur="changeName" />
			</view>
			<view class="personalHead-box flex-sp-between flex-display flex-items" @click="sexShow = true">
				<label>性别</label>
				<label class="font-color-999">{{ $store.getters.userInfo.sex }}</label>
			</view>
			<view class="personalHead-box1">
				<picker
					mode="date" :value="$store.getters.userInfo.birthday" start="1970-01-01"
					:disabled="!(($store.getters.userInfo.birthday === '1970-01-01') || !$store.getters.userInfo.birthday)"
					@change="handleConfirmTime"
				>
					<view class="flex-sp-between flex-display flex-items">
						<label>生日</label>
						<label class="font-color-999">{{ $store.getters.userInfo.birthday }}</label>
					</view>
				</picker>
			</view>
		</view>

		<view style="margin-top: 30upx;background-color: #ffffff;">
			<view style="display: flex;align-items: center;justify-content: space-between;padding: 28upx 38upx;">
				<view>手机号</view>
				<view v-if="$store.getters.userInfo.phone" class="font-color-C5AA7B">{{ $store.getters.userInfo.phone }}</view>
				<view v-else class="font-color-C5AA7B">
					<!-- #ifdef MP-ALIPAY -->
					<button class="verifyPhone" open-type="getAuthorize" scope="phoneNumber" @getAuthorize="onGetAuthorize">
						去验证
					</button>
					<!-- #endif -->
					<!-- #ifndef MP-ALIPAY -->
					去验证
					<!-- #endif -->
				</view>
			</view>
			<view style="display: flex;align-items: center;justify-content: space-between;padding: 28upx 38upx;">
				<view>微信账号</view>
				<view v-if="$store.getters.userInfo.wechatOpenId">已绑定</view>
				<view
					v-else-if="($store.state.app.terminal === 6) || ($store.state.app.terminal === 3) || ($store.state.app.terminal === 2)"
					@click="handleWXBind"
				>
					开始绑定
				</view>
			</view>
		</view>

		<view class="agreement">
			<view class="agreement agreement_top" @click="protocol('app_privacy_agreement')">
				<text>用户隐私协议</text>
				<tui-icon :size="60" color="#999999" name="arrowright" unit="upx" margin="0"></tui-icon>
			</view>
			<view class="agreement" @click="protocol('app_user_agreement')">
				<text>用户服务协议</text>
				<tui-icon :size="60" color="#999999" name="arrowright" unit="upx" margin="0"></tui-icon>
			</view>
		</view>

		<view style="margin-top: 30upx;background-color: #ffffff;">
			<view style="padding: 28upx 38upx;" @click="isShowResettingPasswordDialog = true">重置密码 ></view>
		</view>

		<view class="mar-top-100">
			<view class="exitLoginBut  flex-items-plus" @click="handleQuit">退出登录</view>
			<!-- #ifdef APP-PLUS -->
			<view class="cancellation" @click="cancellation">注销账号</view>
			<!-- #endif -->
		</view>

		<!-- 修改性别弹窗 -->
		<tui-select
			:list="sexList" reverse :show="sexShow" @confirm="handleConfirmSex"
			@close="sexShow = false"
		></tui-select>

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
				<tui-input v-model="resettingFormData.verificationCode" label="验证码" type="number" placeholder="请输入验证码">
					<template #right>
						<tui-countdown-verify
							ref="refResettingPasswordVerify" width="144upx"
							@send="handleSendVerifyResettingPassword"
						></tui-countdown-verify>
					</template>
				</tui-input>
			</template>
		</tui-dialog>

		<tui-dialog
			style="position: relative;z-index: 888;" :buttons="[{ text: '取消' }, { text: '确定', color: '#586c94' }]"
			:show="isShowbindWXFDialog" title="绑定微信" @click="handleBindWX"
		>
			<template #content>
				<tui-input v-model="bindWXFormData.phone" label="手机号" type="number" placeholder="请输入手机号" disabled></tui-input>
				<tui-input v-model="bindWXFormData.verificationCode" label="验证码" type="number" placeholder="请输入验证码">
					<template #right>
						<tui-countdown-verify
							ref="refBindWXVerify" width="144upx"
							@send="handleSendVerifyBindWX"
						></tui-countdown-verify>
					</template>
				</tui-input>
			</template>
		</tui-dialog>

		<tui-popup
			:duration="500" :mode-class="[ 'fade-in' ]"
			:styles="{ width: '100%', position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 999, backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '50rpx 28rpx 0', boxSizing: 'border-box' }"
			:show="showAuthPopupVisible" @click="showAuthPopupVisible = false"
		>
			<view style="display: flex;align-items: center;padding: 26upx;background-color: #ffffff;border-radius: 20upx;">
				<tui-icon name="pic-fill" :size="60" unit="rpx" color="#e95d20" margin="0 20rpx 0 0"></tui-icon>
				<view style="flex: 1;">
					<view>相机权限和相册权限使用说明：</view>
					<view style="margin-top: 12rpx;">"团蜂"想访问您的相机和相册，将根据你的上传的图片，用于设置头像、修改头像等场景</view>
				</view>
			</view>
		</tui-popup>
	</view>
</template>

<script>
import { updateWxPhoneAppApi, updateAliPhoneAppApi, getVerifyCodeApi, updateForgetPasswordUserApi } from '../../../api/anotherTFInterface'
import { getUrlCode } from '../../../utils'

export default {
	name: 'PersonalDetails',
	data() {
		return {
			showAuthPopupVisible: false,

			// userId: '',
			screenHeight: 0,
			sexShow: false,
			timeShow: false,
			name: '',
			sexList: [
				{ value: '1', text: '男' },
				{ value: '2', text: '女' }
			],
			resettingFormData: {
				phone: '',
				password: '',
				newPassword: '',
				verificationCode: ''
			},
			isShowResettingPasswordDialog: false,

			// 微信绑定
			bindWXFormData: {
				phone: '',
				wechatOpenId: '',
				headImage: '',
				wechatName: '',
				verificationCode: '',
				channelCode: '',
				terminal: 3
			},
			isShowbindWXFDialog: false
		}
	},
	onLoad() {
		this.getUserInfoData()
	},
	onShow() {
		// this.userId = uni.getStorageSync(USER_ID)
		if ((this.$store.state.app.terminal === 6) || (this.$store.state.app.terminal === 3)) {
			const code = getUrlCode().code
			if (code) this.handleWXBind()
		}
	},
	mounted() {
		// 获取手机的屏幕高度
		uni.getSystemInfo({
			success: (res) => {
				this.screenHeight = res.screenHeight
			}
		})
	},
	methods: {
		// 多商户用户协议
		protocol(type) {
			uni.navigateTo({
				url: '/another-tf/another-serve/protocol/index?type=' + type
			})
		},
		cancellation() {
			uni.showModal({
				title: '温馨提示',
				content: '是否注销此账号！',
				confirmText: '前往注销',
				success(res) {
					if (res.cancel) {
						uni.showToast({
							icon: 'none',
							title: '已取消'
						})
					} else if (res.confirm) {
						uni.navigateTo({
							url: '/another-tf/another-serve/unsubscribe/index'
						})
					}
				}
			})
		},
		// 修改昵称
		changeName() {
			const newName = this.name
			if (!newName) {
				uni.showToast({
					title: '请输入新的内容',
					icon: 'none'
				})
				return false
			}
			this.$store.dispatch('auth/updateUserInfoAction', {
				name: newName
			})
		},
		// 提交修改生日
		handleConfirmTime(e) {
			if ((this.$store.getters.userInfo.birthday == '1970-01-01') || (this.$store.getters.userInfo.birthday == '')) {
				const birthday = e.detail.value
				this.$store.dispatch('auth/updateUserInfoAction', {
					birthday
				})
			}
		},
		// 提交修改性别
		handleConfirmSex(e) {
			this.sexShow = false
			uni.showLoading()
			const sex = e.options.text
			this.$store.dispatch('auth/updateUserInfoAction', {
				sex
			})
		},
		handleChooseImage() {
			this.showAuthPopupVisible = true
			uni.chooseImage({
				count: 1,
				success: (res) => {
					uni.navigateTo({
						url: '/another-tf/another-user/cropper/index?imgUrl=' + res.tempFilePaths[0]
					})
				},
				fail: () => {
					this.ttoast('图片上传失败')
				}
			})
			// // #ifdef APP
			// const appAuthorizeSetting = uni.getAppAuthorizeSetting()
			// if (appAuthorizeSetting.albumAuthorized !== 'authorized') {
			// 	this.showAuthPopupVisible = true
			// 	uni.chooseImage({
			// 		count: 1,
			// 		success: (res) => {
			// 			uni.navigateTo({
			// 				url: '/another-tf/another-user/cropper/index?imgUrl=' + res.tempFilePaths[0]
			// 			})
			// 		},
			// 		fail: () => {
			// 			this.ttoast('图片上传失败')
			// 		}
			// 	})
			// } else {
			// 	uni.chooseImage({
			// 		count: 1,
			// 		success: (res) => {
			// 			uni.navigateTo({
			// 				url: '/another-tf/another-user/cropper/index?imgUrl=' + res.tempFilePaths[0]
			// 			})
			// 		},
			// 		fail: () => {
			// 			this.ttoast('图片上传失败')
			// 		}
			// 	})
			// }
			// // #endif
			// // #ifndef APP
			// uni.chooseImage({
			// 	count: 1,
			// 	success: (res) => {
			// 		uni.navigateTo({
			// 			url: '/another-tf/another-user/cropper/index?imgUrl=' + res.tempFilePaths[0]
			// 		})
			// 	},
			// 	fail: () => {
			// 		this.ttoast('图片上传失败')
			// 	}
			// })
			// // #endif
		},
		// 获取用户信息
		getUserInfoData() {
			this.$store.dispatch('auth/refrshUserInfoAction', () => {
				this.name = this.$store.getters.userInfo.name
			})
		},
		handleQuit() {
			this.$store.dispatch('auth/logoutAction', true)
		},
		onGetAuthorize() {
			uni.showLoading({
				mask: true,
				title: '验证中...'
			})
			my.getPhoneNumber({
				success: (res) => {
					const encryptedData = res.response
					updateAliPhoneAppApi({
						'phone': encryptedData
					}).then((res) => {
						this.$store.dispatch('auth/refrshUserInfoAction', () => {
							uni.showToast({
								title: '验证成功',
								icon: 'none'
							})
						})
						uni.hideLoading()
					})
						.catch((e) => {
							uni.hideLoading()
						})
				},
				fail: (res) => {
					uni.hideLoading()
					uni.showToast({
						title: '验证失败',
						icon: 'none'
					})
				}
			})
		},
		handleSendVerifyBindWX() {
			if (!this.bindWXFormData.phone) {
				this.$refs.refBindWXVerify.reset()
				return this.$showToast('请填写手机号')
			}
			if (!/^1[3-9]\d{9}$/.test(this.bindWXFormData.phone)) {
				this.$refs.refBindWXVerify.reset()
				return this.$showToast('请输入正确的手机号')
			}
			getVerifyCodeApi({ phone: this.bindWXFormData.phone })
				.then((res) => {
					this.$refs.refBindWXVerify.success()
					this.$showToast('发送成功，请注意查看手机短信')
				})
				.catch(() => {
					this.$refs.refBindWXVerify.reset()
				})
		},
		async handleWXBind() {
			const data = await this.$store.dispatch('auth/wxLoginAction', { isAfter: false, pageUrl: '/another-tf/another-serve/personalDetails/index' })
			this.bindWXFormData.wechatOpenId = data.wechatOpenId
			this.bindWXFormData.headImage = data.headImage
			this.bindWXFormData.wechatName = data.wechatName
			this.bindWXFormData.phone = data.phone
			this.isShowbindWXFDialog = true
		},
		handleBindWX(e) {
			if (e.index === 0) { } else if (e.index === 1) {
				if (!this.bindWXFormData.phone) return this.$showToast('请填写手机号')
				if (!this.bindWXFormData.verificationCode) return this.$showToast('请填写验证码')
				uni.showLoading({
					title: '操作中'
				})
				updateWxPhoneAppApi(this.bindWXFormData)
					.then((res) => {
						uni.hideLoading()
						this.$showToast('绑定成功')
						setTimeout(() => {
							this.$store.dispatch('auth/LoginAfterAction', { type: 'wx', data: res.data })
						}, 2000)
					})
					.catch(() => {
						uni.hideLoading()
					})
			}
			this.bindWXFormData.wechatOpenId = ''
			this.bindWXFormData.headImage = ''
			this.bindWXFormData.wechatName = ''
			this.bindWXFormData.phone = ''
			this.bindWXFormData.verificationCode = ''
			this.isShowbindWXFDialog = false
		},
		handleSendVerifyResettingPassword() {
			if (!this.resettingFormData.phone) {
				this.$refs.refResettingPasswordVerify.reset()
				return this.$showToast('请填写手机号')
			}
			if (!/^1[3-9]\d{9}$/.test(this.resettingFormData.phone)) {
				this.$refs.refResettingPasswordVerify.reset()
				return this.$showToast('请输入正确的手机号')
			}
			getVerifyCodeApi({ phone: this.resettingFormData.phone })
				.then((res) => {
					this.$refs.refResettingPasswordVerify.success()
					this.$showToast('发送成功，请注意查看手机短信')
				})
				.catch(() => {
					this.$refs.refResettingPasswordVerify.reset()
				})
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

<style lang='less' scoped>
.agreement {
	width: 710rpx;
	margin: 20rpx auto 0;
	background-color: #ffffff;
	box-sizing: border-box;

	.agreement_top {
		&::after {
			content: "";
			display: block;
			position: absolute;
			left: 32rpx;
			bottom: 0;
			width: 646rpx;
			height: 4rpx;
			background: #F5F7FA;
		}
	}

	.agreement {
		width: 100%;
		height: 108rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28rpx;
		color: #333;
		padding: 0 10rpx 0 32rpx;
		box-sizing: border-box;
		position: relative;
	}
}

.container {
	width: 100%;
	background-color: #F7F7F7;
	padding: 20rpx;

	.personalBack-box {
		width: 100%;
		background-color: #FFFFFF;

		.personalHead-box {
			width: 90%;
			border-bottom: 1upx solid #E5E5E5;
			padding-bottom: 20upx;
			margin-top: 36upx;

			.nameInput {
				text-align: right;
			}
		}

		.personalHead-box1 {
			width: 90%;
			margin-top: 36upx;
			padding-bottom: 20upx;

			.user-headImg {
				width: 120upx;
				height: 112upx;
				border-radius: 50%;
			}
		}
	}

	.exitLoginBut {
		height: 100upx;
		background: #333333;
		color: #FFEBC4;
	}

	.cancellation {
		height: 100rpx;
		margin: 24rpx auto 0;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #C5AA7B;
		font-size: 28rpx;
		background: #FFFFFF;
		border: 3rpx solid #F3F4F5;
	}

	.headBox {
		margin-bottom: 20rpx;
		background: #FFFFFF;
		padding: 25rpx 0;

		.personalHead-box {
			width: 90%;
			margin: 0 auto;
		}

		.user-headImg {
			width: 120upx;
			height: 112upx;
			border-radius: 50%;
		}
	}
}
</style>
