<template>
	<view class="user-purchased-container">
		<BeeBack>
			<view
				style="display: flex;align-items: center;justify-content: space-between;padding: 20rpx 20rpx 16rpx;background-color: #ffffff;"
			>
				<BeeIcon name="arrowleft" :size="26" color="#222229" style="width: fit-content;">
				</BeeIcon>
				<text v-if="showType === 'user'" style="flex: 1;margin-left: -40rpx;text-align: center;">已购会员卡</text>
				<text v-else style="flex: 1;margin-left: -40rpx;text-align: center;">用户购买会员卡列表</text>
			</view>
		</BeeBack>

		<view v-if="showType === 'user'" style="padding: 18rpx 20rpx 0;">
			<view class="search-btn" style="display: flex;align-items: center;padding: 0 0 12rpx;">
				<text style="font-size: 30rpx;">商家名称</text>
				<view style="flex: 1;margin-left: 16rpx;">
					<tui-input
						v-model="queryInfo.shopName" placeholder="根据商家名称搜索" is-fillet padding="6rpx 10rpx 6rpx 26rpx"
						background-color="transparent"
					>
						<template #right>
							<tui-button
								type="warning" width="120rpx" height="50rpx" shape="circle"
								@click="(queryInfo.page = 1) && getCardUserPurchasedSearchList()"
							>
								搜索
							</tui-button>
						</template>
					</tui-input>
				</view>
			</view>
			<view class="search-btn" style="display: flex;align-items: center;padding: 0 0 12rpx;">
				<text style="font-size: 30rpx;">推广用户手机号</text>
				<view style="flex: 1;margin-left: 16rpx;">
					<tui-input
						v-model="queryInfo.phone" placeholder="根据推广用户手机号搜索" is-fillet padding="6rpx 10rpx 6rpx 26rpx"
						background-color="transparent"
					>
						<template #right>
							<tui-button
								type="warning" width="120rpx" height="50rpx" shape="circle"
								@click="(queryInfo.page = 1) && getCardUserPurchasedSearchList()"
							>
								搜索
							</tui-button>
						</template>
					</tui-input>
				</view>
			</view>
		</view>
		<view v-else-if="showType === 'shop'" style="padding: 18rpx 20rpx 0;">
			<view class="search-btn" style="display: flex;align-items: center;padding: 0 0 12rpx;">
				<text style="font-size: 30rpx;">用户电话</text>
				<view style="flex: 1;margin-left: 16rpx;">
					<tui-input
						v-model="queryInfo.phone" placeholder="根据用户电话搜索" is-fillet padding="6rpx 10rpx 6rpx 26rpx"
						background-color="transparent"
					>
						<template #right>
							<tui-button
								type="warning" width="120rpx" height="50rpx" shape="circle"
								@click="(queryInfo.page = 1) && getCardUserPurchasedSearchList()"
							>
								搜索
							</tui-button>
						</template>
					</tui-input>
				</view>
			</view>
			<tui-radio-group
				:value="queryInfo.status"
				@change="(e) => (queryInfo.status !== e.detail.value) && ((queryInfo.status = e.detail.value) || true) && (queryInfo.page = 1) && getCardUserPurchasedSearchList()"
			>
				<view style="display: flex;flex-wrap: wrap;align-items: center;">
					<text style="font-size: 30rpx;">会员卡状态：</text>
					<tui-label
						v-for="(item, index) in [{ name: '全部', value: '' }, { name: '开启', value: '1' }, { name: '禁用', value: '2' }]"
						:key="index"
					>
						<view style="display: flex;align-items: center;padding: 6rpx 10rpx;font-size: 28rpx;">
							<tui-radio
								:checked="queryInfo.status === item.value" :value="item.value"
								color="#ef530e" border-color="#ef5511" :scale-ratio="0.8"
							>
							</tui-radio>
							<text style="padding: 0 0 0 4rpx;">{{ item.name }}</text>
						</view>
					</tui-label>
				</view>
			</tui-radio-group>
		</view>

		<view v-if="cardPurchasedList && cardPurchasedList.length" style="margin: 10rpx 0 0;">
			<view v-for="(item, index) in cardPurchasedList" :key="index" style="padding: 0 20rpx 35rpx;">
				<ATFCardPurchasedInfo
					:data="item" :is-show-write-off="showType === 'user'" :detail-type="showType"
					is-show-purchase @purchase="handleCardPurchase"
				></ATFCardPurchasedInfo>
			</view>
		</view>
		<view style="padding-bottom: 45rpx;">
			<LoadingMore
				:status="!isEmpty && !cardPurchasedList.length
					? 'loading' : !isEmpty && cardPurchasedList.length && (cardPurchasedList.length >= cardPurchasedTotal) ? 'no-more' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无会员卡订单内容~</tui-no-data>
		</view>

		<tui-dialog
			style="position: relative;z-index: 888;" :buttons="[{ text: '取消' }, { text: '确定', color: '#586c94' }]"
			:show="isShowCardPurchaseDialog" title="会员卡充值" @click="handleCardPurchaseDialog"
		>
			<template #content>
				<view>
					<tui-input
						v-model="cardPurchaseForm.payFee" padding="26rpx 0" label="充值金额"
						type="number" placeholder="请输入充值金额"
					></tui-input>
					<tui-input
						v-model="cardPurchaseForm.jsonRemark" padding="26rpx 0" label="备注" placeholder="请填写备注"
					></tui-input>
				</view>
			</template>
		</tui-dialog>

		<view class="user-purchased-popup">
			<tui-bottom-popup :show="isShowPayTypePopup" @close="isShowPayTypePopup = false">
				<view v-if="isShowPayTypePopup" style="padding: 60rpx 0 128rpx;">
					<CashierList
						ref="refCashierList" :price-pay="cardPurchaseForm.payFee" show
						:pay-type-shops="[ shopId ]"
						:hui-shi-bao-pay="cardPurchaseForm.payFee ? [ shopId ] : false"
						show-tonglian-pay
						:show-commission-pay="!!cardPurchaseForm.payFee"
						:show-platform-pay="!!cardPurchaseForm.payFee"
						:show-transaction-pay="!!cardPurchaseForm.payFee"
						:shop-id-pay="cardPurchaseForm.payFee ? shopId : 0"
						:is-password-fail="isPasswordFail" @change="(e) => payInfo = e"
						@password-input="(e) => (payInfo.pwd = e.pwd) && handlePaymentPassword()"
					/>
					<tui-button
						type="warning" width="168rpx" height="64rpx" margin="30rpx auto 0"
						shape="circle"
						@click="handlePaymentPassword"
					>
						确认支付
					</tui-button>
				</view>
			</tui-bottom-popup>
		</view>
	</view>
</template>

<script>
import { getPageAllShopMemberCardUserApi, getPageCardUserAllShopMemberCardApi, submitShopMemberCardOrderApi } from '../../../api/anotherTFInterface'
import { T_PAY_ORDER } from '../../../constant'
import { handleOrderTypeJump, paymentTypeEnum, handleDoPay } from '../../../utils/payUtil'

export default {
	name: 'UserPurchased',
	components: {
	},
	data() {
		return {
			showType: '',
			isEmpty: false,
			cardPurchasedList: [],
			cardPurchasedTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20,
				shopName: '',
				phone: '',
				status: ''
			},
			// 充值会员卡
			shopId: '',
			cardPurchaseForm: {
				cardId: '',
				payFee: '',
				promoterUserId: '',
				jsonRemark: ''
			},
			isShowCardPurchaseDialog: false,
			isShowPayTypePopup: false,
			payInfo: {},
			isPasswordFail: false,
			submitResult: {}
		}
	},
	onLoad(options) {
		const pages = getCurrentPages()
		if (pages.length > 1) uni.removeStorageSync(T_PAY_ORDER)
		this.showType = options.type || 'user'
	},
	onShow() {
		const pages = getCurrentPages()
		if (uni.getStorageSync(T_PAY_ORDER) && (pages.length === 1)) {
			handleOrderTypeJump({ type: uni.getStorageSync(T_PAY_ORDER).type })
			return
		} else if (uni.getStorageSync(T_PAY_ORDER) && ((this.payInfo.paymentMode === 9) || (this.payInfo.paymentMode === 4))) {
			handleOrderTypeJump({ type: uni.getStorageSync(T_PAY_ORDER).type })
			return
		}
		if (this.showType === 'user') {
			// if (uni.getStorageSync(T_PAY_ORDER) && [ 'memberCard' ].includes(uni.getStorageSync(T_PAY_ORDER).type)) {
			// 	this.handleChangeOrderMode(uni.getStorageSync(T_PAY_ORDER).type)
			// } else if ([ 'memberCard' ].includes(getApp().globalData.orderTypeShow)) {
			// 	this.handleChangeOrderMode(getApp().globalData.orderTypeShow)
			// }
			uni.removeStorageSync(T_PAY_ORDER)
			getApp().globalData.orderTypeShow = ''
			this.getCardUserPurchasedSearchList()
		} else if (this.showType === 'shop') {
			this.$store.dispatch('auth/unifiedProcessingShopAction', {
				cb: () => {
					this.getCardUserPurchasedSearchList()
				}
			})
		}
	},
	methods: {
		getCardUserPurchasedSearchList(isLoadmore) {
			uni.showLoading()
			let _url
			if (this.showType === 'user') {
				_url = getPageAllShopMemberCardUserApi
			} else if (this.showType === 'shop') {
				_url = getPageCardUserAllShopMemberCardApi
			}
			_url(this.queryInfo).then((res) => {
				this.cardPurchasedTotal = res.data.total
				if (isLoadmore) {
					this.cardPurchasedList.push(...res.data.list)
				} else {
					this.cardPurchasedList = res.data.list
				}
				this.isEmpty = this.cardPurchasedList.length === 0
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},

		handleCardPurchase(e) {
			this.shopId = e.shopId
			this.cardPurchaseForm.cardId = e.cardId
			this.cardPurchaseForm.payFee = ''
			this.cardPurchaseForm.jsonRemark = ''
			this.isShowCardPurchaseDialog = true
		},
		handleCardPurchaseDialog(e) {
			if (e.index === 0) { } else if (e.index === 1) {
				if (!this.cardPurchaseForm.cardId) return this.$showToast('缺少会员卡信息')
				if (!this.cardPurchaseForm.payFee) return this.$showToast('请输入充值金额')
				this.isShowPayTypePopup = true
			}
			this.isShowCardPurchaseDialog = false
		},

		async handlePaymentPassword() {
			if (this.isPasswordFail && this.payInfo.pwd) {
				await handleDoPay({ ...this.submitResult, ...this.payInfo }, 11, paymentTypeEnum[11], {
					passwordFailFn: (submitResult) => {
						this.payInfo.pwd = ''
						this.$refs.refCashierList && (this.$refs.refCashierList.isShowPasswordDialog = true)
					}
				})
			} else if ((this.payInfo.paymentMode !== 9) && (this.payInfo.paymentMode !== 4) && !this.payInfo.pwd) {
				if (this.isPasswordFail) this.$refs.refCashierList && (this.$refs.refCashierList.isShowPasswordDialog = true)
				else this.$refs.refCashierList && this.$refs.refCashierList.handleInputPaymentPassword()
			} else if (!this.isPasswordFail) {
				uni.showLoading()
				submitShopMemberCardOrderApi({ ...this.cardPurchaseForm })
					.then(async (res) => {
						uni.hideLoading()
						await handleDoPay({ ...res.data, orderSn: res.data.refOrderCode, ...this.payInfo }, 11, paymentTypeEnum[11], {
							passwordFailFn: (submitResult) => {
								this.submitResult = submitResult
								this.isPasswordFail = true
								this.payInfo.pwd = ''
								this.$refs.refCashierList && (this.$refs.refCashierList.isShowPasswordDialog = true)
							}
						})
					})
					.catch(() => {
						uni.hideLoading()
					})
			}
		}
	},
	onReachBottom() {
		if (this.cardPurchasedList.length < this.cardPurchasedTotal) {
			++this.queryInfo.page
			this.getCardUserPurchasedSearchList(true)
		}
	}
}
</script>

<style lang="less" scoped>
.user-purchased-container {
	min-height: 100vh;
	background-color: #f1f1f1;
	box-sizing: border-box;

	.search-btn {
		/deep/ .tui-input__wrap {
			border: 2rpx solid #EF5511;
			border-radius: 8rpx;
		}
	}

	.user-purchased-popup {
		/deep/ .tui-bottom-popup {
			overflow: visible;
			.tui-dialog {
				top: auto;
				bottom: 32vh;
			}
		}
	}
}
</style>
