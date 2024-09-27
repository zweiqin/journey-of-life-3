<template>
	<view class="member-card-list-container">
		<BeeBack>
			<view
				style="display: flex;align-items: center;justify-content: space-between;padding: 20rpx 20rpx 16rpx;background-color: #f5f5f5;"
			>
				<BeeIcon name="arrowleft" :size="26" color="#222229" style="width: fit-content;">
				</BeeIcon>
				<text style="flex: 1;margin-left: -40rpx;text-align: center;">会员卡购买</text>
			</view>
		</BeeBack>
		<view style="display: flex;justify-content: flex-end;align-items: center;flex-wrap: wrap;padding: 0 20rpx;">
			<tui-button
				type="blue" width="200rpx" height="60rpx" margin="10rpx 0 0 20rpx"
				shape="circle"
				@click="go(`/another-tf/another-user/member-card/promotion-record?shopId=${queryInfo.shopId}`)"
			>
				推广记录
			</tui-button>
			<view v-if="$store.getters.userInfo.buyerUserId" style="display: flex;align-items: center;">
				<tui-button
					type="blue" width="240rpx" height="60rpx" margin="10rpx 0 0 20rpx"
					shape="circle"
					@click="handleCopyPromotion"
				>
					复制推广链接
				</tui-button>
				<view style="margin: 10rpx 0 0 20rpx;padding: 6rpx 0;border: 2rpx solid #007aff;border-radius: 32rpx;">
					<BeeWxShare ref="beeWxShareRef" @click="handleShareServe()">
						<view style="padding: 0 16rpx;text-align: right;">
							<tui-icon name="share" :size="34" unit="rpx" color="#007aff" margin="0 14rpx 0 0"></tui-icon>
							<text style="color: #007aff;font-weight: bold;">分享</text>
						</view>
					</BeeWxShare>
				</view>
			</view>
		</view>

		<view style="padding: 20rpx 30rpx 18rpx;">
			<view style="display: flex;align-items: stretch;">
				<image
					style="width: 96rpx;height: 96rpx;margin-right: 24rpx;border-radius: 50%"
					:src="common.seamingImgUrl(brandDetail.shopLogo)"
				>
				</image>
				<view style="flex: 1;display: flex;flex-direction: column;justify-content: flex-start;width: 0;">
					<text style="font-size: 30rpx;color: #333;font-weight: bold;">{{ brandDetail.shopName }}</text>
					<view style="font-size: 24rpx;color: #969699;">
						<view style="margin-top: 16rpx;">
							<text style="color: #969699;">店铺评分：</text>
							<text style="color: #303030;">{{ brandDetail.score }}</text>
							<text style="margin-left: 42rpx;color: #969699;">月售：</text>
							<text style="color: #303030;">{{ brandDetail.monthlySales }}</text>
						</view>
					</view>
				</view>
			</view>
			<view style="margin-top: 12rpx;display: flex;align-items: center;font-size: 24rpx;">
				<tui-icon name="gps" :size="14" color="#222229"></tui-icon>
				<text v-if="!$store.getters.obtainLocationCount" style="margin-left: 4rpx;">
					定位中
				</text>
				<text v-else style="margin-left: 4rpx;">{{ brandDetail.distance || 0 }}Km</text>
				<text
					style="margin-left: 30rpx;flex: 1;width: 0;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
				>
					{{ brandDetail.shopAdress || '--' }}
				</text>
				<text style="margin-left: 64rpx;font-weight: bold;color: #EF530E;" @click.stop="handleNavigate">
					导航
				</text>
			</view>
		</view>

		<view v-if="cardPurchaseForm.promoterUserId" style="padding: 10rpx 20rpx 0;">
			来源推广用户ID：{{ cardPurchaseForm.promoterUserId }}
		</view>
		<view v-else style="display: flex;align-items: center;padding: 10rpx 20rpx 0;">
			<view>
				推广用户：{{ promoterCustom || '无' }}
			</view>
			<tui-button
				v-if="promoterCustom"
				type="warning" width="180rpx" height="50rpx" margin="0 0 0 20rpx"
				shape="circle"
				@click="isShowPromoterCustomDialog = true"
			>
				重新设置
			</tui-button>
			<tui-button
				v-else
				type="warning" width="120rpx" height="50rpx"
				margin="0 0 0 20rpx"
				shape="circle" @click="isShowPromoterCustomDialog = true"
			>
				设置
			</tui-button>
		</view>

		<view style="padding: 18rpx 20rpx 0;">
			<view class="search-btn" style="display: flex;align-items: center;padding: 0 0 12rpx;">
				<text style="font-size: 30rpx;">会员卡名称</text>
				<view style="flex: 1;margin-left: 16rpx;">
					<tui-input
						v-model="queryInfo.cardName" placeholder="根据会员卡名称搜索" is-fillet padding="6rpx 10rpx 6rpx 26rpx"
						background-color="transparent"
					>
						<template #right>
							<tui-button
								type="warning" width="120rpx" height="50rpx" shape="circle"
								@click="(queryInfo.page = 1) && getMemberCardSearchList()"
							>
								搜索
							</tui-button>
						</template>
					</tui-input>
				</view>
			</view>
			<tui-radio-group
				:value="queryInfo.memberCardType"
				@change="(e) => (queryInfo.memberCardType !== e.detail.value) && ((queryInfo.memberCardType = e.detail.value) || true) && (queryInfo.page = 1) && getMemberCardSearchList()"
			>
				<view style="display: flex;flex-wrap: wrap;align-items: center;">
					<text style="font-size: 30rpx;">类型：</text>
					<tui-label
						v-for="(item, index) in [{ name: '全部', value: '' }, { name: '消费卡', value: '1' }, { name: '次数卡', value: '2' }]"
						:key="index"
					>
						<view style="display: flex;align-items: center;padding: 6rpx 10rpx;font-size: 28rpx;">
							<tui-radio
								:checked="queryInfo.memberCardType === item.value" :value="item.value"
								color="#07c160" border-color="#999" :scale-ratio="0.8"
							>
							</tui-radio>
							<text>{{ item.name }}</text>
						</view>
					</tui-label>
				</view>
			</tui-radio-group>
			<tui-radio-group
				:value="queryInfo.memberCardState"
				@change="(e) => (queryInfo.memberCardState !== e.detail.value) && ((queryInfo.memberCardState = e.detail.value) || true) && (queryInfo.page = 1) && getMemberCardSearchList()"
			>
				<view style="display: flex;flex-wrap: wrap;align-items: center;">
					<text style="font-size: 30rpx;">状态：</text>
					<tui-label
						v-for="(item, index) in [{ name: '全部', value: '' }, { name: '已发行', value: '1' }, { name: '未发行', value: '2' }, { name: '已下架', value: '3' }]"
						:key="index"
					>
						<view style="display: flex;align-items: center;padding: 6rpx 10rpx;font-size: 28rpx;">
							<tui-radio
								:checked="queryInfo.memberCardState === item.value" :value="item.value"
								color="#07c160" border-color="#999" :scale-ratio="0.8"
							>
							</tui-radio>
							<text>{{ item.name }}</text>
						</view>
					</tui-label>
				</view>
			</tui-radio-group>
		</view>

		<view v-if="memberCardList && memberCardList.length" style="margin: 10rpx 0 0;">
			<view v-for="(item, index) in memberCardList" :key="index" style="padding: 0 20rpx 35rpx;">
				<ATFMemberCardInfo
					:data="item" :is-show-shop="false" :is-shop-operation="false" is-show-purchase
					@purchase="handleCardPurchase"
				></ATFMemberCardInfo>
			</view>
		</view>
		<view style="padding-bottom: 45rpx;">
			<LoadingMore
				:status="!isEmpty && !memberCardList.length
					? 'loading' : !isEmpty && memberCardList.length && (memberCardList.length >= memberCardTotal) ? 'no-more' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无商家会员卡内容~</tui-no-data>
		</view>

		<tui-dialog
			style="position: relative;z-index: 888;" :buttons="[{ text: '清除' }, { text: '确定', color: '#586c94' }]"
			:show="isShowPromoterCustomDialog" title="订单核销" @click="handlePromoterCustomDialog"
		>
			<template #content>
				<view>
					<tui-input v-model="promoterCustom" padding="26rpx 0" label="推广用户ID" placeholder="请填写推广用户ID"></tui-input>
				</view>
			</template>
		</tui-dialog>

		<ATFMessageFill
			ref="refATFMessageFill" :show="false"
			:message-z-index="997" :message-mask-z-index="996"
			@confirm="(e) => ((cardPurchaseForm.jsonRemark = e.remark) || true) && (isShowPayTypePopup = true)"
		></ATFMessageFill>

		<view class="member-card-list-popup">
			<tui-bottom-popup :show="isShowPayTypePopup" @close="isShowPayTypePopup = false">
				<view v-if="isShowPayTypePopup" style="padding: 60rpx 0 128rpx;">
					<CashierList
						ref="refCashierList" :price-pay="cardPurchaseForm.payFee" show
						:pay-type-shops="[ queryInfo.shopId ]"
						:hui-shi-bao-pay="cardPurchaseForm.payFee ? [ queryInfo.shopId ] : false"
						show-tonglian-pay
						:show-commission-pay="!!cardPurchaseForm.payFee"
						:show-platform-pay="!!cardPurchaseForm.payFee"
						:show-transaction-pay="!!cardPurchaseForm.payFee"
						:shop-id-pay="cardPurchaseForm.payFee ? queryInfo.shopId : 0"
						@change="(e) => payInfo = e"
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
import { A_TF_MAIN } from '../../../config'
import { getIndexShopDetailApi, getPageAllShopMemberCardApi, submitShopMemberCardOrderApi } from '../../../api/anotherTFInterface'
import { navigationAddress, setMiniprogramShareConfig } from '../../../utils'
import { T_PAY_ORDER } from '../../../constant'
import { handleOrderTypeJump, paymentModeEnum, handleDoPay } from '../../../utils/payUtil'

export default {
	name: 'MemberCardList',
	data() {
		return {
			brandDetail: {},
			isEmpty: false,
			memberCardList: [],
			memberCardTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20,
				shopId: '',
				cardName: '',
				memberCardType: '',
				memberCardState: ''
			},
			// 推广用户设置
			isShowPromoterCustomDialog: false,
			promoterCustom: '',
			// 购买会员卡
			cardPurchaseForm: {
				cardId: '',
				payFee: '',
				promoterUserId: '',
				jsonRemark: ''
			},
			isShowPayTypePopup: false,
			payInfo: {}
		}
	},
	onLoad(options) {
		// 如果在已登录情况下，直接进入该页面，则可能会跳转到'订单跳转页'。（但如果真的已登录的话，分享组件应该很快会重置该页面分享链接，但可能也会出错）
		const pages = getCurrentPages()
		if (pages.length > 1) uni.removeStorageSync(T_PAY_ORDER)
		this.queryInfo.shopId = options.shopId
		this.cardPurchaseForm.promoterUserId = options.promoterUserId || ''
		if (!this.queryInfo.shopId) {
			this.$showToast('缺少商家信息')
		} else {
			this.getBrandDetail()
			this.getMemberCardSearchList()
		}
		if (this.isLogin()) {
			if (this.$store.state.app.terminal === 6) {
				setMiniprogramShareConfig({
					data: {
						event: 'sharingPageTurn',
						webPath: `/pages/jump/jump?type=memberCardPromotion&code=${this.queryInfo.shopId}~${this.$store.getters.userInfo.buyerUserId}`,
						title: `会员卡购买--来自${this.$store.getters.userInfo.name || this.$store.getters.userInfo.wechatName || '无名氏'}分享`,
						imageUrl: this.common.seamingImgUrl('1716629235852-feed73b67bb541edb82b41a0937dbdad.png')
					}
				})
			}
			// #ifdef H5
			this.$nextTick(() => {
				this.handleShareServe(true)
			})
			// #endif
		}
	},
	onShow() {
		if (uni.getStorageSync(T_PAY_ORDER)) {
			handleOrderTypeJump({ type: uni.getStorageSync(T_PAY_ORDER).type })
		}
	},
	methods: {
		async getBrandDetail() {
			try {
				uni.showLoading()
				const { data } = await getIndexShopDetailApi({
					shopId: this.queryInfo.shopId,
					longitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[0],
					latitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[1]
				})
				console.log(data)
				this.brandDetail = data || {}
				uni.hideLoading()
			} catch (error) {
				console.log(error)
				uni.hideLoading()
			}
		},
		handleNavigate() {
			if (!this.brandDetail.shopAdress) return this.$showToast('商家地址有误，导航失败')
			navigationAddress(`${this.brandDetail.longitude},${this.brandDetail.latitude}`)
		},
		getMemberCardSearchList(isLoadmore) {
			uni.showLoading()
			getPageAllShopMemberCardApi(this.queryInfo).then((res) => {
				this.memberCardTotal = res.data.total
				if (isLoadmore) {
					this.memberCardList.push(...res.data.list)
				} else {
					this.memberCardList = res.data.list
				}
				this.isEmpty = this.memberCardList.length === 0
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		handleCopyPromotion() {
			this.$copy(`${A_TF_MAIN}/#/pages/jump/jump?type=memberCardPromotion&code=${this.queryInfo.shopId}~${this.$store.getters.userInfo.buyerUserId}`)
		},
		handleShareServe(isQuit) {
			if (!this.isLogin()) return
			const data = {
				data: {
					title: `会员卡购买`,
					desc: `来自${this.$store.getters.userInfo.name || this.$store.getters.userInfo.wechatName || '无名氏'}分享`,
					link: `${A_TF_MAIN}/#/pages/jump/jump?type=memberCardPromotion&code=${this.queryInfo.shopId}~${this.$store.getters.userInfo.buyerUserId}`,
					imageUrl: this.common.seamingImgUrl('1716629235852-feed73b67bb541edb82b41a0937dbdad.png')
				},
				successCb: () => { },
				failCb: () => { }
			}
			this.$refs.beeWxShareRef.share(data, isQuit)
		},
		handlePromoterCustomDialog(e) {
			if (e.index === 0) {
				this.promoterCustom = ''
			} else if (e.index === 1) {
			}
			this.isShowPromoterCustomDialog = false
		},

		handleCardPurchase(e) {
			this.cardPurchaseForm.cardId = e.cardId
			this.cardPurchaseForm.payFee = e.cardDiscountedPrice || 0
			this.cardPurchaseForm.jsonRemark = ''
			this.$refs.refATFMessageFill.isShowPopup = true
		},

		handlePaymentPassword() {
			if ((this.payInfo.paymentMode !== 9) && (this.payInfo.paymentMode !== 4) && !this.payInfo.pwd) {
				this.$refs.refCashierList && this.$refs.refCashierList.handleInputPaymentPassword()
			} else {
				uni.showLoading()
				submitShopMemberCardOrderApi({ ...this.cardPurchaseForm, promoterUserId: this.cardPurchaseForm.promoterUserId || this.promoterCustom })
					.then(async (res) => {
						await handleDoPay({ ...res.data, ...this.payInfo }, 11, paymentModeEnum[11], { fn: () => (this.payInfo.pwd = '') })
						uni.hideLoading()
						this.isShowPayTypePopup = false
					})
					.catch(() => {
						uni.hideLoading()
					})
			}
		}
	},
	onReachBottom() {
		if (this.memberCardList.length < this.memberCardTotal) {
			++this.queryInfo.page
			this.getMemberCardSearchList(true)
		}
	}
}
</script>

<style lang="less" scoped>
.member-card-list-container {
	min-height: 100vh;
	background-color: #eeeeee;
	box-sizing: border-box;

	.search-btn {
		/deep/ .tui-input__wrap {
			border: 2rpx solid #EF5511;
			border-radius: 8rpx;
		}
	}

	.member-card-list-popup {
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
