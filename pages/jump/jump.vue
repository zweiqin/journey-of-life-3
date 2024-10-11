<template>
	<view class="jump-container">
		<view v-if="viewType === 'verification'" style="padding: 44rpx;">
			<JHeader tabbar="/pages/user/user" width="50" height="50" title="订单核销"></JHeader>
			<view v-if="orderInfo && orderInfo.orderId" style="margin-top: 40rpx;">
				<ATFOrderInfo :data="orderInfo"></ATFOrderInfo>
			</view>
			<view style="margin-top: 50rpx;">
				<tui-input v-model="code" label="核销码" placeholder="缺少核销码" disabled></tui-input>
			</view>
			<view style="display: flex;justify-content: flex-end;align-items: center;margin: 20rpx 0 0;">
				<view style="flex: 1;">
					<tui-button
						v-if="orderInfo.orderId && [ 8 ].includes(orderInfo.state)"
						margin="0 auto" type="warning" width="260rpx" shape="circle"
						@click="go(`/another-tf/another-user/collection-code/collection-payment-code?collageId=${orderInfo.collageId}&money=${orderInfo.price}&orderId=${orderInfo.orderId}`)"
					>
						商家收款
					</tui-button>
				</view>
				<view style="flex: 1;">
					<tui-button
						v-if="isOrderVerification" margin="0 auto" type="green" width="260rpx"
						plain link
					>
						已自动核销
					</tui-button>
					<view v-else>
						<tui-button
							v-if="[8, 11].includes(orderInfo.state)" margin="0 auto" type="green" width="260rpx"
							plain link
						>
							等待付款
						</tui-button>
						<tui-button
							v-else-if="[ 9 ].includes(orderInfo.state)"
							margin="0 auto" type="green" width="260rpx" shape="circle"
							@click="handleVerification()"
						>
							确认核销
						</tui-button>
						<tui-button
							v-else-if="[ 10 ].includes(orderInfo.state)" margin="0 auto" type="green" width="260rpx"
							plain link
						>
							已核销
						</tui-button>
					</view>
				</view>
			</view>
		</view>
		<view v-else-if="viewType === 'memberCardWriteOff'" style="padding: 24rpx;">
			<JHeader tabbar="/pages/user/user" width="50" height="50" title="会员卡核销"></JHeader>
			<view v-if="memberCardWriteOffForm.cardPurchasedInfo && memberCardWriteOffForm.cardPurchasedInfo.cardOrderId" style="margin-top: 40rpx;">
				<ATFCardPurchasedInfo
					:data="memberCardWriteOffForm.cardPurchasedInfo" :is-show-write-off="false" detail-type=""
				></ATFCardPurchasedInfo>
			</view>
			<view style="margin-top: 50rpx;">
				<view style="display: flex;align-items: center;padding: 26rpx 30rpx;">
					<view>会员卡类型</view>
					<view style="margin-left: 12rpx;">
						<text v-if="memberCardWriteOffForm.type === '1'">消费卡</text>
						<text v-else-if="memberCardWriteOffForm.type === '2'">次数卡</text>
						<text v-else>--</text>
					</view>
				</view>
				<tui-input
					v-model="memberCardWriteOffForm.code" label="核销码" placeholder="缺少核销码"
					:border-bottom="false" disabled
				></tui-input>
				<view>
					<tui-input
						v-if="memberCardWriteOffForm.type === '1'"
						v-model="memberCardWriteOffForm.price" type="number" label="会员卡消费金额" placeholder="请输入会员卡消费金额"
					></tui-input>
					<tui-input
						v-else-if="memberCardWriteOffForm.type === '2'"
						v-model="memberCardWriteOffForm.price" type="number" label="会员卡消费次数" placeholder="请输入会员卡消费次数"
					></tui-input>
				</view>
			</view>
			<view style="display: flex;justify-content: flex-end;align-items: center;margin: 20rpx 0 0;">
				<tui-button
					margin="0" type="green" width="260rpx" shape="circle"
					@click="handleMemberCardWriteOff()"
				>
					确认核销
				</tui-button>
			</view>
		</view>
		<view v-else-if="viewType === 'collection'" style="min-height: 100vh;background-color: #f0f0f0;" class="type-collection">
			<view>
				<view
					style="display: flex;align-items: center;justify-content: space-between;padding: 26rpx 20rpx 10rpx;background-color: #f5f5f5;"
				>
					<BeeIcon name="home-fill" :size="26" color="#222229" style="width: fit-content;">
					</BeeIcon>
					<text style="flex: 1;margin-left: -40upx;text-align: center;">付款页面</text>
				</view>
				<view style="padding: 0 30rpx;">
					<view style="margin-top: 20rpx;">
						<ATFShopSkus
							v-if="code"
							:shop-data="{ shopId: code.split('~')[0].split('=')[1] }"
							detail-radius="20rpx 20rpx 0 0" is-show-shop-detail
						>
						</ATFShopSkus>
					</view>
				</view>
				<image style="width: 100%;" :src="common.seamingImgUrl('1715937397802-付款页面（初始页面）（1）.png')" mode="widthFix" />
			</view>
			<tui-modal show custom :button="[]" width="74%" :mask-closable="false">
				<view>
					<view style="text-align: center;">提示</view>
					<view style="margin-top: 40rpx;font-size: 30rpx;color: #767676;">您未登录团蜂平台，请先登录！</view>
					<view class="operation-btn" style="margin-top: 34rpx;text-align: center;">
						<tui-button
							type="warning" :size="30" width="222rpx" height="90rpx"
							margin="0 auto"
							@click="$redirectTo('/pages/login/login')"
						>
							去登录
						</tui-button>
					</view>
				</view>
			</tui-modal>
		</view>
		<view v-else-if="viewType === 'chooseIdentity'" style="min-height: 100vh;background-color: #f0f0f0; padding: 30rpx; box-sizing: border-box;" class="bind-b">
			<view class="wrapper">
				<view class="choose-title"> <tui-icon :size="18" margin="0 10rpx 0 0" name="people-fill" color="rgb(233, 93, 32)"></tui-icon> 请选择您的身份</view>
				<view class="list">
					<view :class="{ active: currentIdentity === 1 }" class="item" @click="currentIdentity = 1">社区门店 <tui-icon v-if="currentIdentity === 1" :size="18" name="circle-fill" color="rgb(233, 93, 32)"></tui-icon></view>
					<view :class="{ active: currentIdentity === 2 }" class="item" @click="currentIdentity = 2">商家 <tui-icon v-if="currentIdentity === 2" :size="18" name="circle-fill" color="rgb(233, 93, 32)"></tui-icon></view>
					<view :class="{ active: currentIdentity === 3 }" class="item" @click="currentIdentity = 3">本地商圈 <tui-icon v-if="currentIdentity === 3" :size="18" name="circle-fill" color="rgb(233, 93, 32)"></tui-icon></view>
				</view>
				<button class="uni-btn bind-btn" :loading="chooseIdentityLoading" @click="handleBBindFranchisees">确认</button>
			</view>
		</view>
		<view v-else style="padding: 46rpx;">
			<tui-skeleton :preload-data="preloadData" style="z-index: 888;"></tui-skeleton>
		</view>
	</view>
</template>

<script>
import { T_STORAGE_KEY, T_NEW_BIND_TYPE, T_NEW_BIND_CODE, T_NEW_BIND_ID, SF_INVITE_CODE } from '../../constant'
import { ANOTHER_TF_SETTLE } from '../../config'
import { checkBindApi, bindLastUserApi, bindFranchiseesApi, bindServiceUserBindingApi, bindPartnerInviteApi, bindPartnerGroupApi, bindchangeActivityUserApi, bindBFranchiseesApi } from '../../api/user'
import {
	bindDistributorSalesCustomerApi,
	getOrderDetailApi,
	updateSetHxCodeApi,
	updateChkPaidAndWriteApi,
	bindPlatformRelationshipCodeApi,
	bindPlatformRelationshipShopApi,
	bindPlatformInfoCodeBindingApi,
	addDrawParticipateLotteryApi,
	getPageCardUserIdShopMemberCardApi,
	updateVerificationShopMemberCardApi
} from '../../api/anotherTFInterface'
import { getStorageUserId, getStorageKeyToken, jumpToOtherProject } from '../../utils'
import { Encrypt } from '../../utils/secret'
import { handleDoPay } from '../../utils/payUtil'

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
			orderInfo: {
				orderId: '',
				collageId: '',
				price: ''
			},
			isOrderVerification: false,
			verificationTicker: null,
			// bBindFranchisees的情况
			currentIdentity: 1,
			chooseIdentityLoading: false,
			// memberCardWriteOff的情况
			memberCardWriteOffForm: {
				cardOrderId: '',
				cardPurchasedInfo: {
					cardOrderId: ''
				},
				code: '',
				price: '',
				type: ''
			}
		}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */

	// eslint-disable-next-line complexity
	onLoad(options) {
		if (options.type) uni.setStorageSync(T_NEW_BIND_TYPE, options.type) || uni.setStorageSync(T_NEW_BIND_CODE, options.code || '') || uni.setStorageSync(T_NEW_BIND_ID, options.userId || '') // 有绑定id就进行存储，以防下面没登录跳到登录页
		if (((options.type || uni.getStorageSync(T_NEW_BIND_TYPE)) === 'collection') && !getStorageKeyToken({ isShowModal: false, isRedirect: true })) {
			this.viewType = 'collection'
			this.code = options.code || uni.getStorageSync(T_NEW_BIND_CODE) || ''
			return
		} else if ((options.type || uni.getStorageSync(T_NEW_BIND_TYPE)) === 'sharingPageTurn') {
			this.code = options.code || uni.getStorageSync(T_NEW_BIND_CODE) || ''
			uni.removeStorageSync(T_NEW_BIND_TYPE)
			uni.removeStorageSync(T_NEW_BIND_CODE)
			uni.removeStorageSync(T_NEW_BIND_ID)
			setTimeout(() => { uni.redirectTo({ url: decodeURIComponent(this.code) }) }, 300)
			return
		} else if (!getStorageKeyToken({ isRedirect: true })) {
			return
		}
		this.userId = getStorageUserId() || ''
		if (this.userId && !options.type && uni.getStorageSync(T_NEW_BIND_TYPE)) { // 如果原先有绑定id，例如注册/重新登陆了然后跳回来（options没携带绑定id），则是存储里的绑定id
			this.userInfo = uni.getStorageSync(T_STORAGE_KEY)
			this.type = uni.getStorageSync(T_NEW_BIND_TYPE) || ''
			this.code = uni.getStorageSync(T_NEW_BIND_CODE) || ''
			this.otherSideUserId = uni.getStorageSync(T_NEW_BIND_ID) || ''
			this.handleBusiness(true)
		} else if (this.userId && options.type) { // 请求路径上面直接有绑定id参数
			this.userInfo = uni.getStorageSync(T_STORAGE_KEY)
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

	onUnload() {
		if (this.type === 'nothing') {
		} else if (this.type === 'verification') {
			if (this.verificationTicker) {
				clearInterval(this.verificationTicker)
				this.verificationTicker = null
			}
		}
	},

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
		// eslint-disable-next-line complexity
		async handleBusiness(isFromLogin) {
			// console.log(isFromLogin)
			console.log(this.code)
			uni.removeStorageSync(T_NEW_BIND_TYPE)
			uni.removeStorageSync(T_NEW_BIND_CODE)
			uni.removeStorageSync(T_NEW_BIND_ID)
			if (this.type === 'nothing') {
				this.$switchTab('/pages/user/user')
			} else if (this.type === 'participateLottery') {
				addDrawParticipateLotteryApi({ name: decodeURIComponent(this.code.split('~')[0]), url: decodeURIComponent(this.code.split('~')[1]) })
					.then((res) => { this.$showToast('参与成功') })
					.finally((e) => { setTimeout(() => { this.$switchTab('/pages/user/user') }, 2000) })
			} else if (this.type === 'bindingSalesCustomer') { // 绑定分销关系，salesId分销员ID
				const shareType = Number(this.code.split('~')[0])
				const shopId = this.code.split('~')[1]
				const productId = this.code.split('~')[2]
				const skuId = this.code.split('~')[3]
				const salesId = Number(this.code.split('~')[4])
				if (salesId) {
					bindDistributorSalesCustomerApi({ shopId, distributorId: salesId })
						.then((res) => {
							this.$showToast('绑定成功', 'success')
							setTimeout(() => {
								if (shareType === 1) {
									uni.redirectTo({ url: `/another-tf/another-user/shop/shop-detail?shopId=${shopId}` })
								} else if (shareType === 2) {
									uni.redirectTo({ url: `/another-tf/another-serve/goodsDetails/index?shopId=${shopId}&productId=${productId}&skuId=${skuId}` })
								}
							}, 2000)
						})
						.catch((e) => {
							setTimeout(() => { this.$switchTab('/pages/user/user') }, 2000)
						})
				} else {
					setTimeout(() => {
						if (shareType === 1) {
							uni.redirectTo({ url: `/another-tf/another-user/shop/shop-detail?shopId=${shopId}` })
						} else if (shareType === 2) {
							uni.redirectTo({ url: `/another-tf/another-serve/goodsDetails/index?shopId=${shopId}&productId=${productId}&skuId=${skuId}` })
						}
					}, 300)
				}
			} else if (this.type === 'verification') {
				this.orderId = this.code.split('~')[0]
				console.log(this.code.split('~')[1])
				this.viewType = 'verification'
				getOrderDetailApi({
					orderId: this.orderId,
					noticeId: 0
				}).then(({ data }) => {
					this.orderInfo = data
					if ([ 8 ].includes(data.state)) {
						this.verificationTicker = setInterval(() => {
							updateChkPaidAndWriteApi({ orderId: this.orderId })
								.then((res) => {
									if (res.json) {
										if (JSON.parse(res.json).paid) {
											clearInterval(this.verificationTicker)
											this.verificationTicker = null
											this.$showToast('自动核销成功', 'success')
											this.isOrderVerification = true
										}
									}
								})
						}, 3000)
					}
				})
			} else if (this.type === 'invitation') {
				setTimeout(() => { this.$switchTab('/pages/user/user') }, 1000)
			} else if (this.type === 'toAnotherTFSettle') {
				const storageKeyToken = getStorageKeyToken({ isRedirect: true })
				if (storageKeyToken) {
					setTimeout(() => {
						jumpToOtherProject({ isInMiniProgram: this.$store.state.app.isInMiniProgram, url: `${ANOTHER_TF_SETTLE}/#/?username=${this.userInfo.name}&user=${encodeURIComponent(Encrypt(storageKeyToken))}`, programUrl: `pages/skip/skip`, toType: 'H5', query: `?type=merchantSettlement&username=${this.userInfo.name}&user=${encodeURIComponent(Encrypt(storageKeyToken))}`, montageTerminal: [ 6 ] })
					}, 300)
				}
			} else if (this.type === 'downloadApp') { // 为了不用登录，则直接跳/pages/download/download
				setTimeout(() => { uni.redirectTo({ url: '/pages/download/download' }) }, 300)
			} else if (this.type === 'bindingUser') {
				bindPlatformRelationshipCodeApi({ code: this.code })
					.then((res) => { this.$showToast('绑定成功', 'success') })
					.finally((e) => { setTimeout(() => { this.$switchTab('/pages/user/user') }, 2000) })
			} else if (this.type === 'bindingFranchisee') {
				bindPlatformRelationshipShopApi({ code: this.code })
					.then((res) => { this.$showToast('绑定成功', 'success') })
					.finally((e) => { setTimeout(() => { this.$switchTab('/pages/user/user') }, 2000) })
			} else if (this.type === 'bindingShop') {
				const shopId = this.code.split('~')[0]
				// const phone = this.code.split('~')[1]
				// bindPlatformInfoCodeBindingApi({ phone, type: 1 })
				// 	.then((res) => { this.$showToast('绑定成功', 'success') })
				// 	.finally((e) => { setTimeout(() => { this.$switchTab('/pages/user/user') }, 2000) })
				setTimeout(() => { uni.redirectTo({ url: `/another-tf/another-user/shop/shop-detail?shopId=${shopId}` }) }, 300)
			} else if (this.type === 'bindingTeamMembers') { // 这里指团长和合伙人，其它还有会员、股东
				const storageKeyToken = getStorageKeyToken({ isRedirect: true })
				if (storageKeyToken) {
					setTimeout(() => {
						jumpToOtherProject({ isInMiniProgram: this.$store.state.app.isInMiniProgram, url: `${ANOTHER_TF_SETTLE}/#/?username=${this.userInfo.name}&user=${encodeURIComponent(Encrypt(storageKeyToken))}&code=${this.code}`, programUrl: `pages/skip/skip`, toType: 'H5', query: `?type=merchantSettlement&username=${this.userInfo.name}&user=${encodeURIComponent(Encrypt(storageKeyToken))}`, montageTerminal: [ 6 ] })
					}, 300)
				}
			} else if (this.type === 'collection') { // 收款方付款结算
				// http://localhost:8988/TFShop_Uni_H5/#/pages/jump/jump?type=collection&code=shopId=186~productId=12850~skuId=334097~terminal=1
				const shopIdStr = this.code.split('~')[0]
				const productIdStr = this.code.split('~')[1]
				const skuIdStr = this.code.split('~')[2]
				// setTimeout(() => { uni.redirectTo({ url: `/another-tf/another-serve/paymentCodeConfirm/index?type=1&${shopIdStr}&${productIdStr}&${skuIdStr}` }) }, 300)
				// 用于在收款码结算页判断页面栈的页面数量，从而当使用通联或惠市宝支付后按返回键返回后，进而判断需不需要清除存储订单信息或跳转到订单列表页
				setTimeout(() => { uni.redirectTo({ url: `/pages/navigation/navigation?target=${encodeURIComponent('/another-tf/another-serve/paymentCodeConfirm/index?type=1&' + shopIdStr + '&' + productIdStr + '&' + skuIdStr)}` }) }, 300)
			} else if (this.type === 'tempCollection') { // 临时收款码结算
				const orderIdStr = this.code.split('~')[0]
				const moneyStr = this.code.split('~')[1]
				const collageIdStr = this.code.split('~')[2]
				setTimeout(() => { uni.redirectTo({ url: `/pages/navigation/navigation?target=${encodeURIComponent('/another-tf/another-serve/paymentCodeConfirm/index?type=1&' + orderIdStr + '&' + moneyStr + '&' + collageIdStr)}` }) }, 300)
			} else if (this.type === 'wvHuiShiBaoPayTurn') { // 惠市宝在小程序套壳环境的支付结果回传
				await handleDoPay({
					collageId: Number(this.code.split('~')[3]),
					money: '', // Number(this.code.split('~')[7])
					orderId: Number(this.code.split('~')[2]),
					paymentMode: Number(this.code.split('~')[6]),
					orderSn: Number(this.code.split('~')[4]),
					type: '' // this.code.split('~')[8]
				}, Number(this.code.split('~')[1]), this.code.split('~')[5], { isSuccess: Number(this.code.split('~')[0]) })
			} else if (this.type === 'bindLastUser') { // 旧系统
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
			} else if (this.type === 'bindCommunityService') { // 旧系统
				const serverTypeId = this.code.split('~')[0]
				const title = this.code.split('~')[1]
				const serverUrl = this.code.split('~')[2]
				bindServiceUserBindingApi({ bindingUserId: this.userId, shareUserId: this.otherSideUserId })
					.then((res) => { this.$showToast('成功参与服务分享！', 'success') })
					.finally((e) => { setTimeout(() => { uni.redirectTo({ url: `/community-center/community-detail?id=${serverTypeId}&serverNameThree=${title}&serverImageUrl=${serverUrl}` }) }, 2000) })
			} else if (this.type === 'bindPartnerInvite') { // 旧系统 // 师傅邀请码，用户绑定师傅
				bindPartnerInviteApi({ userId: this.userId, partnerCode: this.code })
					.then((data) => {
						if (data.ok) {
							this.$showToast('扫码成功', 'success')
						} else {
							this.$showToast(data.msg || '扫码失败', 'error')
						}
					})
					.catch((e) => { this.$showToast('操作失败,请重试', 'error') })
					.finally((e) => {
						setTimeout(() => {
							getApp().globalData.isShowFollowOfficialAccount = true
							uni.setStorageSync(SF_INVITE_CODE, this.code)
							this.$switchTab('/pages/user/user')
						}, 2000)
					})
			} else if (this.type === 'bindPartnerGroup') { // 旧系统 // 团长码，用户绑定团长
				bindPartnerGroupApi({ userId: this.userId, partnerCode: this.code })
					.then((data) => {
						if (data.ok) {
							this.$showToast('操作成功', 'success')
						} else {
							this.$showToast('操作失败,请重试', 'error')
						}
					})
					.catch((e) => { this.$showToast('操作失败,请重试', 'error') })
					.finally((e) => { setTimeout(() => { this.$switchTab('/pages/user/user') }, 2000) })
			} else if (this.type === 'bindActivityUser') { // 旧系统 // 活动码，399活动绑定
				const campaignsType = this.code.split('-')[0] * 1
				const bindActivityId = this.code.split('-')[1]
				bindchangeActivityUserApi({ userId: this.userId, userCode: bindActivityId, type: campaignsType })
					.then((res) => { this.$showToast('绑定成功', 'success') })
					.finally((e) => { setTimeout(() => { uni.redirectTo({ url: '/user/sever/activityCenter/index' }) }, 2000) })
			} else if (this.type === 'bindFranchisees') { // 用户绑定加盟商
				bindFranchiseesApi({
					franchiseesSn: this.code,
					phone: this.$store.getters.userInfo.phone
				})
					.then((res) => {
						switch (res.statusCode * 1) {
							case 501:
								this.$showToast('您已绑定其他加盟商', 'none')
								break
							case 502:
								this.$showToast('自己不能绑定自己', 'none')
								break
							case 503:
								this.$showToast('该账号的上级已绑定到其他加盟商', 'none')
								break
							case 20000:
								this.$showToast('加盟商绑定成功', 'success')
								break
							default:
								this.$showToast('加盟商绑定失败', 'none')
						}
					})
					.finally((e) => { setTimeout(() => { uni.switchTab({ url: '/pages/user/user' }) }, 2000) })
			} else if (this.type === 'bBindFranchisees') {
				this.viewType = 'chooseIdentity'
			} else if (this.type === 'memberCardWriteOff') { // 商家对会员卡订单核销
				this.memberCardWriteOffForm.cardOrderId = this.code.split('~')[0]
				this.memberCardWriteOffForm.type = this.code.split('~')[1]
				this.memberCardWriteOffForm.code = this.code.split('~')[2]
				this.viewType = 'memberCardWriteOff'
				getPageCardUserIdShopMemberCardApi({
					cardOrderId: this.memberCardWriteOffForm.cardOrderId
				}).then(({ data }) => {
					this.memberCardWriteOffForm.cardPurchasedInfo = data
				})
			} else if (this.type === 'memberCardPromotion') { // 用户对会员卡推广分享
				const shopId = this.code.split('~')[0]
				const promoterUserId = this.code.split('~')[1]
				setTimeout(() => { uni.redirectTo({ url: `/pages/navigation/navigation?target=${encodeURIComponent('/another-tf/another-user/member-card/member-card-list?shopId=' + shopId + '&promoterUserId=' + promoterUserId)}` }) }, 300)
			}
		},
		handleVerification() {
			updateSetHxCodeApi({ orderId: this.orderId, noticeId: 0 })
				.then((res) => { this.$showToast('核销成功', 'success') })
				.finally((e) => { setTimeout(() => { this.$switchTab('/pages/user/user') }, 2000) })
		},
		// 加盟商绑定门店
		async	handleBBindFranchisees() {
			try {
				this.chooseIdentityLoading = true
				const res = await bindBFranchiseesApi({
					franchiseesSn: this.code,
					phone: this.$store.getters.userInfo.phone,
					shopType1Enum: this.currentIdentity
				})

				if (res.statusCode === 20000) {
					this.$showToast('绑定成功', 'success')
				} else {
					this.$showToast('绑定失败' + res.statusMsg, 'none')
				}
			} catch (e) {
				this.$showToast('绑定失败' + e.message, 'none')
			} finally {
				this.chooseIdentityLoading = false
				this.viewType = ''
				setTimeout(() => { uni.switchTab({ url: '/pages/user/user' }) }, 2000)
			}
		},
		handleMemberCardWriteOff() {
			if (!this.memberCardWriteOffForm.type) {
				return this.$showToast('缺少会员卡类型')
			} else if (!this.memberCardWriteOffForm.code) {
				return this.$showToast('缺少会员卡核销码')
			} else if (!this.memberCardWriteOffForm.price) {
				if (this.memberCardWriteOffForm.type === '1') {
					return this.$showToast('缺少会员卡消费金额')
				} else if (this.memberCardWriteOffForm.type === '2') {
					return this.$showToast('缺少会员卡消费次数')
				}
			}
			uni.showModal({
				title: '提示',
				content: '确认核销该会员卡？',
				success: (res) => {
					if (res.confirm) {
						uni.showLoading()
						updateVerificationShopMemberCardApi({
							code: this.memberCardWriteOffForm.code,
							price: this.memberCardWriteOffForm.price,
							type: this.memberCardWriteOffForm.type
						})
							.then((res) => {
								this.$showToast('核销成功', 'success')
								uni.hideLoading()
							})
							.catch((e) => {
								uni.hideLoading()
							})
							.finally((e) => { setTimeout(() => { this.$switchTab('/pages/user/user') }, 2000) })
					}
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
.jump-container {
	min-height: 100vh;
	box-sizing: border-box;
	.type-collection {
		.operation-btn {
			/deep/ .tui-btn {
				border-radius: 10rpx;
			}

			/deep/ .tui-btn-warning {
				background-color: #ef530e !important;
			}
		}
	}

	.bind-b{
		.wrapper{
			box-sizing: border-box;
			padding: 30rpx;
			border-radius: 10rpx;

			.choose-title{
				color: rgb(233, 93, 32);
				font-weight: 500;
				margin-bottom: 36rpx;
			}

			.list{
				.item{
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 20rpx 30rpx;
			    background-color: #fff;
			    border-radius: 20rpx;
			    margin-top: 40rpx;
			    font-size: 28rpx;
					color: #3d3d3d;
					transition: all 350ms;

			    &.active{
			    	color: #000;
						font-weight: 500;
						box-shadow: 0px 6px 12px  rgba(0, 0, 0, 0.16);
			    }
				}
			}

			.bind-btn{
        margin:  140rpx auto 0;
				background-color: #ef530e;
				height: 90rpx;
				color: #fff;
				font-size: 28rpx;
				line-height: 90rpx;
				letter-spacing: 0.2em;
				transition: all 350ms;

				&:active{
					opacity: 0.8;
				}
			}
		}
	}
}
</style>
