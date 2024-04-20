<template>
	<view class="make-phone-container">
		<view @click="handleMackPhone">
			<slot></slot>
		</view>
		<tui-popup
			:duration="500" :mode-class="[ 'fade-in' ]"
			:styles="{ width: '100%', position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 9999, backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '50rpx 28rpx 0', boxSizing: 'border-box' }"
			:show="showAuthPopupVisible" @click="showAuthPopupVisible = false"
		>
			<view style="display: flex;align-items: center;padding: 26upx;background-color: #ffffff;border-radius: 20upx;">
				<tui-icon name="voipphone" :size="60" unit="rpx" color="#e95d20" margin="0 20rpx 0 0"></tui-icon>
				<view style="flex: 1;">
					<view>拨打电话权限使用说明：</view>
					<view style="margin-top: 12rpx;">"团蜂"想访问您的拨打电话权限，用于向商家、普通用户拨打电话等场景</view>
				</view>
			</view>
		</tui-popup>
	</view>
</template>

<script>
import permision from '../../uni_modules/js_sdk/wa-permission/permission.js'

export default {
	name: 'BeeMakePhone',
	props: {
		phone: {
			type: [Number, String]
		}
	},
	data() {
		return {
			showAuthPopupVisible: false
		}
	},

	methods: {
		async handleMackPhone() {
			if (!this.phone) {
				uni.showToast({
					title: '暂无联系方式',
					duration: 2000,
					icon: 'none'
				})
				return
			}
			// #ifdef APP
			const systemInfo = uni.getSystemInfoSync()
			if (systemInfo.platform.toLocaleLowerCase() == 'android') {
				this.showAuthPopupVisible = true
				const result = await permision.requestAndroidPermission('android.permission.CALL_PHONE')
				if (result == 1) { // 已获得授权
					this.showAuthPopupVisible = false
					uni.makePhoneCall({
						phoneNumber: this.phone,
						fail: () => {
							this.$showToast('操作失败')
						}
					})
				} else if ((result == 0) || (result == -1)) { // 未获得授权/被永久拒绝权限
					this.showAuthPopupVisible = false
					uni.showToast({ title: '请先授权', icon: 'none' })
				}
			} else {
				this.showAuthPopupVisible = true
				uni.makePhoneCall({
					phoneNumber: this.phone,
					fail: () => {
						this.$showToast('操作失败')
					}
				})
			}
			// #endif
			// #ifndef APP
			uni.makePhoneCall({
				phoneNumber: this.phone,
				fail: () => {
					this.$showToast('操作失败')
				}
			})
			// #endif
		}
	}
}
</script>
