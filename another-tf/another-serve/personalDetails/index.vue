<!-- 修改个人信息 -->
<template>
	<view class="container fs28" :style="{ height: screenHeight + 'px' }">
		<JHeader title="个人信息" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view class="headBox">
			<view class="personalHead-box flex-sp-between flex-display flex-items">
				<label>头像</label>
				<image v-if="userInfo.headImage" class="user-headImg" :src="common.seamingImgUrl(userInfo.headImage)"></image>
				<image v-else class="user-headImg" src="../../../static/images/new-user/default-user-avatar.png">
				</image>
			</view>
		</view>
		<view class="personalBack-box flex-items-plus flex-column">
			<view class="personalHead-box flex-sp-between flex-display flex-items">
				<label>旧系统ID</label>
				<view>{{ userId }}</view>
			</view>
			<view class="personalHead-box flex-sp-between flex-display flex-items">
				<label>昵称</label>
				<input v-model="name" class="nameInput" type="text" placeholder="请输入内容" @blur="changeName" />
			</view>
			<view class="personalHead-box flex-sp-between flex-display flex-items" @click="sexShowClick">
				<label>性别</label>
				<label class="font-color-999">{{ userInfo.sex }}</label>
			</view>
			<view class="personalHead-box1">
				<picker mode="date" :value="birthday" start="1970-01-01" :disabled="!((birthday === '1970-01-01') || !birthday)" @change="handleConfirmTime">
					<view class="flex-sp-between flex-display flex-items">
						<label>生日</label>
						<label class="font-color-999">{{ birthday | parsebirthday }}</label>
					</view>
				</picker>
			</view>
		</view>
		<view class="iphoneNumback-box  flex-items-plus">
			<view class="iphoneNum-box flex-row-plus flex-sp-between flex-items">
				<label style="width: 50%;">手机号</label>
				<label v-if="phone" class="font-color-C5AA7B">{{ phone }}</label>
				<label v-else class="font-color-C5AA7B">
					<!-- #ifdef MP-ALIPAY -->
					<button class="verifyPhone" open-type="getAuthorize" scope="phoneNumber" @getAuthorize="onGetAuthorize">
						去验证
					</button>
					<!-- #endif -->
					<!-- #ifndef MP-ALIPAY -->
					去验证
					<!-- #endif -->
				</label>
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
	</view>
</template>

<script>
import { updateAliPhoneAppApi, getUserInfoApi, updateUserInfoApi } from '../../../api/anotherTFInterface'
import { USER_ID } from '../../../constant'

export default {
	name: 'PersonalDetails',
	filters: {
		parsebirthday(birthday) {
			if (birthday == '') {
				return '1970-01-01'
			}
			return birthday
		}
	},
	data() {
		return {
			userId: '',
			screenHeight: 0,
			birthday: '',
			sexShow: false,
			timeShow: false,
			userInfo: {},
			phone: '',
			name: '',
			sexList: [
				{ value: '1', text: '男' },
				{ value: '2', text: '女' }
			]
		}
	},
	onLoad() {
		this.getUserInfoData()
	},
	onShow() {
		this.userId = uni.getStorageSync(USER_ID)
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
			const newName = this.name || this.phone
			if (!newName) {
				uni.showToast({
					title: '请输入新的内容',
					icon: 'none'
				})
				return false
			}
			uni.showLoading()
			updateUserInfoApi({
				name: newName
			}).then((res) => {
				uni.hideLoading()
				uni.showToast({
					title: '修改成功',
					icon: 'success'
				})
				this.getUserInfoData()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		// 提交修改生日
		handleConfirmTime(e) {
			if (this.birthday == '1970-01-01' || this.birthday == '') {
				const birthday = e.detail.value
				uni.showLoading()
				updateUserInfoApi({
					birthday
				}).then((res) => {
					uni.hideLoading()
					uni.showToast({
						title: '修改成功',
						icon: 'success'
					})
					this.getUserInfoData()
				})
					.catch((e) => {
						uni.hideLoading()
					})
			}
		},
		// 点击弹窗修改性别
		sexShowClick() {
			this.sexShow = true
		},
		// 提交修改性别
		handleConfirmSex(e) {
			this.sexShow = false
			uni.showLoading()
			const sex = e.options.text
			updateUserInfoApi({
				sex
			}).then((res) => {
				uni.hideLoading()
				uni.showToast({
					title: '修改成功',
					icon: 'success'
				})
				this.getUserInfoData()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		// 获取用户信息
		getUserInfoData() {
			getUserInfoApi({}).then((res) => {
				this.userInfo = res.data
				this.phone = res.data.phone
				this.name = res.data.name
				this.birthday = res.data.birthday
			})
		},
		handleQuit() {
			this.$store.dispatch('auth/logout', true)
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
						// uni.setStorageSync(T_STORAGE_KEY, res.data)
						this.$store.dispatch('auth/updateStorageKey', res.data.phone)
						this.phone = res.data.phone
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
		}
	}
}
</script>

<style lang='less' scoped>
.agreement {
	width: 710rpx;
	margin: 20rpx auto 0;
	background-color: #fff;

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

	.iphoneNumback-box {
		width: 100%;
		background-color: #FFFFFF;
		height: 100upx;
		margin-top: 20upx;

		.iphoneNum-box {
			width: 90%;

			.verifyPhone {
				color: #C5AA7B;
				font-size: 30upx;
				border: 0;
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
