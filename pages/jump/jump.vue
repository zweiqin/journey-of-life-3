<template>
	<view class="jump-container">
		<view v-if="viewType === 'verification'">
			<JHeader tabbar="/pages/user/user" width="50" height="50" title="订单核销"></JHeader>
			<view v-if="orderInfo && orderInfo.orderId" style="margin-top: 40upx;">
				<ATFOrderInfo :data="orderInfo"></ATFOrderInfo>
			</view>
			<view style="margin-top: 50upx;">
				<tui-input v-model="code" label="核销码" placeholder="请输入核销码" disabled></tui-input>
			</view>
			<view>
				<tui-button
					margin="20upx 0 0 auto" type="green" width="260rpx" shape="circle"
					@click="handleVerification()"
				>
					确认核销
				</tui-button>
			</view>
		</view>
		<view v-else>
			<tui-skeleton :preload-data="preloadData" style="z-index: 888;"></tui-skeleton>
		</view>
	</view>
</template>

<script>
import { USER_INFO, T_NEW_BIND_TYPE, T_NEW_BIND_CODE, T_NEW_BIND_ID } from '../../constant'
import { ANOTHER_TF_SETTLE } from '../../config'
import { checkBindApi, bindLastUserApi } from '../../api/user'
import { getOrderDetailApi, updateSetHxCodeApi, bindPlatformRelationshipCodeApi, bindPlatformRelationshipShopApi, bindPlatformInfoCodeBindingApi } from '../../api/anotherTFInterface'
import { getUserId, getStorageKeyToken, jumpToOtherProject } from '../../utils'
import { Encrypt } from '../../utils/secret'

export default {
	name: 'Jump',
	components: {},
	props: {},
	data() {
		return {
			data: [],
			preloadData: [
				{
					'id': '',
					'dataset': {},
					'left': 164.84375,
					'right': 365,
					'top': 20,
					'bottom': 220,
					'width': 200.15625,
					'height': 19,
					'skeletonType': 'rect'
				}, {
					'id': '',
					'dataset': {},
					'left': 0,
					'right': 375,
					'top': 70,
					'bottom': 187,
					'width': 375,
					'height': 187,
					'skeletonType': 'fillet'
				}
			],
			type: '',
			code: '',
			otherSideUserId: '',
			userId: '',
			userInfo: {},
			// 视图显示
			viewType: '',
			// verification的情况
			orderId: '',
			orderInfo: {}
		}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */

	onLoad(options) {
		if (options.type) uni.setStorageSync(T_NEW_BIND_TYPE, options.type) || uni.setStorageSync(T_NEW_BIND_CODE, options.code || '') || uni.setStorageSync(T_NEW_BIND_ID, options.userId || '') // 有绑定id就进行存储，以防下面没登录跳到登录页
		this.userId = getUserId() || ''
		if (this.userId && !options.type && uni.getStorageSync(T_NEW_BIND_TYPE)) { // 如果原先有绑定id，例如注册/重新登陆了然后跳回来（options没携带绑定id），则是存储里的绑定id
			this.userInfo = uni.getStorageSync(USER_INFO)
			this.type = uni.getStorageSync(T_NEW_BIND_TYPE) || ''
			this.code = uni.getStorageSync(T_NEW_BIND_CODE) || ''
			this.otherSideUserId = uni.getStorageSync(T_NEW_BIND_ID) || ''
			this.handleBusiness(true)
		} else if (this.userId && options.type) { // 请求路径上面直接有绑定id参数
			this.userInfo = uni.getStorageSync(USER_INFO)
			this.type = options.type || ''
			this.code = options.code || ''
			this.otherSideUserId = options.userId || ''
			this.handleBusiness(false)
		}
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */

	onReady() { },

	/**
	 * 生命周期函数--监听页面显示
	 */

	onShow() {
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */

	onHide() { },

	/**
	 * 生命周期函数--监听页面卸载
	 */

	onUnload() { },

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */

	onPullDownRefresh() { },

	/**
	 * 页面上拉触底事件的处理函数
	 */

	onReachBottom() { },

	/**
	 * 用户点击右上角分享
	 */

	onShareAppMessage() { },
	methods: {
		// 业务逻辑
		async handleBusiness(isFromLogin) {
			console.log(isFromLogin)
			uni.removeStorageSync(T_NEW_BIND_TYPE)
			uni.removeStorageSync(T_NEW_BIND_CODE)
			uni.removeStorageSync(T_NEW_BIND_ID)
			if (this.type === 'nothing') {
				this.$switchTab('/pages/user/user')
			} else if (this.type === 'verification') {
				this.orderId = this.code.split('-')[0]
				this.code = this.code.split('-')[1]
				console.log(this.code)
				await getOrderDetailApi({
					orderId: this.orderId,
					noticeId: 0
				}).then(({ data }) => {
					this.orderInfo = data
				})
				this.viewType = 'verification'
			} else if (this.type === 'invitation') {
				setTimeout(() => { this.$switchTab('/pages/user/user') }, 1000)
			} else if (this.type === 'toAnotherTFSettle') {
				const storageKeyToken = getStorageKeyToken()
				if (storageKeyToken) {
					setTimeout(() => {
						jumpToOtherProject(`${ANOTHER_TF_SETTLE}/#/?username=${this.userInfo.nickName}&user=${Encrypt(storageKeyToken)}`)
					}, 300)
				}
			} else if (this.type === 'bindingUser') {
				bindPlatformRelationshipCodeApi({ code: this.code })
					.then((res) => { this.$showToast('绑定成功', 'success') })
					.finally((e) => { setTimeout(() => { this.$switchTab('/pages/user/user') }, 2000) })
			} else if (this.type === 'bindingFranchisee') {
				bindPlatformRelationshipShopApi({ code: this.code })
					.then((res) => { this.$showToast('绑定成功', 'success') })
					.finally((e) => { setTimeout(() => { this.$switchTab('/pages/user/user') }, 2000) })
			} else if (this.type === 'bindingShop') {
				bindPlatformInfoCodeBindingApi({ phone: this.code, type: 1 })
					.then((res) => { this.$showToast('绑定成功', 'success') })
					.finally((e) => { setTimeout(() => { this.$switchTab('/pages/user/user') }, 2000) })
			} else if (this.type === 'bindingTeamMembers') { // 这里指团长和合伙人，其它还有会员、股东
				const storageKeyToken = getStorageKeyToken()
				if (storageKeyToken) {
					setTimeout(() => {
						jumpToOtherProject(`${ANOTHER_TF_SETTLE}/#/?username=${this.userInfo.nickName}&user=${Encrypt(storageKeyToken)}&code=${this.code}`)
					}, 300)
				}
			} else if (this.type === 'bindLastUser') {
				checkBindApi({ userId: this.userId })
					.then(() => {
						this.$showToast('已存在上级绑定')
						setTimeout(() => { this.$switchTab('/pages/user/user') }, 2000)
					})
					.catch(() => {
						uni.hideToast()
						bindLastUserApi({ userId: this.userId, userCode: this.code })
							.then((res) => { this.$showToast('绑定成功', 'success') })
							.finally((e) => { setTimeout(() => { this.$switchTab('/pages/user/user') }, 2000) })
					})
			}
		},
		handleVerification() {
			updateSetHxCodeApi({ orderId: this.orderId, noticeId: 0 })
				.then((res) => { this.$showToast('核销成功', 'success') })
				.finally((e) => { setTimeout(() => { this.$switchTab('/pages/user/user') }, 2000) })
		}
	}
}
</script>

<style lang="less" scoped>
.jump-container {
	min-height: 100vh;
	padding: 46upx;
	box-sizing: border-box;
}
</style>
