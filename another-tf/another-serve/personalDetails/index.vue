<!-- 修改个人信息 -->
<template>
	<view class="container fs28" :style="{ height: screenHeight + 'px' }">
		<JHeader title="个人信息" width="50" height="50"></JHeader>
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

		<view style="margin-top: 30rpx;background-color: #ffffff;">
			<view style="display: flex;align-items: center;justify-content: space-between;padding: 28rpx 38rpx;">
				<view>手机号</view>
				<view v-if="$store.getters.userInfo.phone" class="font-color-C5AA7B">{{ $store.getters.userInfo.phone }}</view>
				<view v-else class="font-color-C5AA7B">
					<!-- #ifdef MP-ALIPAY -->
					<button class="verifyPhone" open-type="getAuthorize" scope="phoneNumber" @getAuthorize="onGetAuthorize">
						去验证
					</button>
					<!-- #endif -->
				</view>
			</view>
			<view style="display: flex;align-items: center;justify-content: space-between;padding: 28rpx 38rpx;">
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
		<view style="margin: 20rpx auto 0;font-size: 28rpx;color: #333;background-color: #ffffff;">
			<!-- go('/another-tf/another-serve/protocol/index?type=app_privacy_agreement') -->
			<view
				style="display: flex;justify-content: space-between;align-items: center;padding: 20rpx 32rpx;"
				@click="go('/pages/service-agreement/privacy-policy')"
			>
				<text>用户隐私协议</text>
				<tui-icon :size="60" color="#999999" name="arrowright" unit="rpx" margin="0"></tui-icon>
			</view>
			<!-- go('/another-tf/another-serve/protocol/index?type=app_user_agreement') -->
			<view
				style="display: flex;justify-content: space-between;align-items: center;padding: 20rpx 32rpx;"
				@click="go('/pages/service-agreement/service-agreement')"
			>
				<text>用户服务协议</text>
				<tui-icon :size="60" color="#999999" name="arrowright" unit="rpx" margin="0"></tui-icon>
			</view>
			<view
				style="display: flex;justify-content: space-between;align-items: center;padding: 20rpx 32rpx;"
			>
				<text>系统版本</text>
				<text>v{{ SYSTEM_VERSION }}</text>
			</view>
		</view>

		<view style="margin-top: 30rpx;background-color: #ffffff;">
			<view style="padding: 28rpx 38rpx;" @click="isShowResettingPasswordDialog = true">重置登录密码 ></view>
			<view
				style="display: flex;justify-content: space-between;align-items: center;padding: 20rpx 32rpx;"
				@click="go('/another-tf/another-serve/personalDetails/payment-password-form')"
			>
				<text>支付密码 ></text>
				<text v-if="isSetPaymentPassword">已设置</text>
			</view>
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
				<ATFGraphicVerificationCode
					type="code" :phone="resettingFormData.phone"
					input-type="number" input-label="验证码"
					countdown-width="144rpx" @input="e => resettingFormData.verificationCode = e"
				></ATFGraphicVerificationCode>
			</template>
		</tui-dialog>

		<tui-dialog
			style="position: relative;z-index: 888;" :buttons="[{ text: '取消' }, { text: '确定', color: '#586c94' }]"
			:show="isShowbindWXFDialog" title="绑定微信" @click="handleBindWX"
		>
			<template #content>
				<tui-input
					v-model="bindWXFormData.phone" label="手机号" type="number" placeholder="无法自动填入手机号"
					disabled
				></tui-input>
				<ATFGraphicVerificationCode
					type="code" :phone="bindWXFormData.phone"
					input-type="number" input-label="验证码"
					countdown-width="144rpx" @input="e => bindWXFormData.verificationCode = e"
				></ATFGraphicVerificationCode>
			</template>
		</tui-dialog>

		<tui-popup
			:duration="500" :mode-class="[ 'fade-in' ]"
			:styles="{ width: '100%', position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 9999, backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '50rpx 28rpx 0', boxSizing: 'border-box' }"
			:show="showAuthPopupVisible" @click="showAuthPopupVisible = false"
		>
			<view style="display: flex;align-items: center;padding: 26rpx;background-color: #ffffff;border-radius: 20rpx;">
				<tui-icon name="pic-fill" :size="60" unit="rpx" color="#e95d20" margin="0 20rpx 0 0"></tui-icon>
				<view style="flex: 1;">
					<view>相机权限和相册权限使用说明：</view>
					<view style="margin-top: 12rpx;">"{{ APPLY_NAME }}"想访问您的相机和相册，将根据你的上传的图片，用于设置头像、修改头像等场景</view>
				</view>
			</view>
		</tui-popup>
	</view>
</template>

<script>
import { updateWxPhoneAppApi, updateAliPhoneAppApi, updateForgetPasswordUserApi, getIsPwdBuyerUserExtendApi } from '../../../api/anotherTFInterface'
import { getUrlCode } from '../../../utils'
import { SYSTEM_VERSION, APPLY_NAME } from '../../../config'

export default {
	name: 'PersonalDetails',
	data() {
		return {
			SYSTEM_VERSION,
			APPLY_NAME,
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
			isSetPaymentPassword: false,

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
		getIsPwdBuyerUserExtendApi({})
			.then((res) => {
				this.isSetPaymentPassword = res.data || false
			})
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
			// #ifdef APP
			const appAuthorizeSetting = uni.getAppAuthorizeSetting()
			if (appAuthorizeSetting.albumAuthorized !== 'authorized') {
				this.showAuthPopupVisible = true
				uni.chooseImage({
					count: 1,
					success: (res) => {
						uni.navigateTo({
							url: '/another-tf/another-user/cropper/index?imgUrl=' + res.tempFilePaths[0]
						})
					},
					fail: () => {
						this.$showToast('图片上传失败')
					}
				})
			} else {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						uni.navigateTo({
							url: '/another-tf/another-user/cropper/index?imgUrl=' + res.tempFilePaths[0]
						})
					},
					fail: () => {
						this.$showToast('图片上传失败')
					}
				})
			}
			// #endif
			// #ifndef APP
			uni.chooseImage({
				count: 1,
				success: (res) => {
					uni.navigateTo({
						url: '/another-tf/another-user/cropper/index?imgUrl=' + res.tempFilePaths[0]
					})
				},
				fail: () => {
					this.$showToast('图片上传失败')
				}
			})
			// #endif
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
		async handleWXBind() {
			const data = await this.$store.dispatch('auth/wxLoginAction', { isAfter: false, pageUrl: '/another-tf/another-serve/personalDetails/index' })
			this.bindWXFormData.wechatOpenId = data.wechatOpenId
			this.bindWXFormData.headImage = data.headImage
			this.bindWXFormData.wechatName = data.wechatName
			this.bindWXFormData.phone = data.phone || this.$store.getters.userInfo.phone
			this.isShowbindWXFDialog = true
		},
		handleBindWX(e) {
			if (e.index === 0) { } else if (e.index === 1) {
				if (!this.bindWXFormData.phone) return this.$showToast('缺少手机号')
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
.container {
	width: 100%;
	background-color: #F7F7F7;
	padding: 20rpx;
	box-sizing: border-box;
	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}
	/deep/ .tui-dialog {
		overflow: visible;
	}

	.personalBack-box {
		width: 100%;
		background-color: #FFFFFF;

		.personalHead-box {
			width: 90%;
			border-bottom: 1rpx solid #E5E5E5;
			padding-bottom: 20rpx;
			margin-top: 36rpx;

			.nameInput {
				text-align: right;
			}
		}

		.personalHead-box1 {
			width: 90%;
			margin-top: 36rpx;
			padding-bottom: 20rpx;

			.user-headImg {
				width: 120rpx;
				height: 112rpx;
				border-radius: 50%;
			}
		}
	}

	.exitLoginBut {
		height: 100rpx;
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
			width: 120rpx;
			height: 112rpx;
			border-radius: 50%;
		}
	}
}
</style>
