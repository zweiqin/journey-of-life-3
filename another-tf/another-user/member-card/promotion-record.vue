<template>
	<view class="promotion-record-container">
		<JHeader title="会员卡推广记录" width="50" height="50"></JHeader>
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

		<view style="padding: 18rpx 20rpx 0;">
			<view class="search-btn" style="display: flex;align-items: center;padding: 0 0 12rpx;">
				<text style="font-size: 30rpx;">用户手机号</text>
				<view style="flex: 1;margin-left: 16rpx;">
					<tui-input
						v-model="queryInfo.phone" placeholder="根据用户手机号搜索" is-fillet padding="6rpx 10rpx 6rpx 26rpx"
						background-color="transparent"
					>
						<template #right>
							<tui-button
								type="warning" width="120rpx" height="50rpx" shape="circle"
								@click="(queryInfo.page = 1) && getCardPromotionRecordSearchList()"
							>
								搜索
							</tui-button>
						</template>
					</tui-input>
				</view>
			</view>
			<tui-radio-group
				:value="queryInfo.status"
				@change="(e) => (queryInfo.status !== e.detail.value) && ((queryInfo.status = e.detail.value) || true) && (queryInfo.page = 1) && getCardPromotionRecordSearchList()"
			>
				<view style="display: flex;flex-wrap: wrap;align-items: center;">
					<text style="font-size: 30rpx;">结算状态：</text>
					<tui-label
						v-for="(item, index) in [{ name: '全部', value: '' }, { name: '已结算', value: '1' }, { name: '待结算', value: '2' }]"
						:key="index"
					>
						<view style="display: flex;align-items: center;padding: 6rpx 10rpx;font-size: 28rpx;">
							<tui-radio
								:checked="queryInfo.status === item.value" :value="item.value"
								color="#07c160" border-color="#999" :scale-ratio="0.8"
							>
							</tui-radio>
							<text>{{ item.name }}</text>
						</view>
					</tui-label>
				</view>
			</tui-radio-group>
		</view>

		<view v-if="cardPromotionList && cardPromotionList.length" style="margin: 10rpx 0 0;">
			<view v-for="(item, index) in cardPromotionList" :key="index" style="padding: 0 20rpx 35rpx;">
				<tui-card :title="{ text: `订单：${item.refOrderCode || '--'}` }" :tag="{ text: `ID：${item.promoterId || '--'}` }">
					<template #body>
						<view style="padding: 10rpx 20rpx 0;">
							<view style="font-size: 30rpx;">
								<view style="display: flex;justify-content: space-between;align-items: center;flex-wrap: wrap;">
									<view>
										<text>结算状态：</text>
										<text v-if="item.status === 1">已结算</text>
										<text v-else-if="item.status === 2">待结算</text>
										<text v-else>--</text>
									</view>
									<view style="flex: 1;display: flex;justify-content: flex-end;align-items: center;margin: 0 0 0 14rpx;">
										<view style="white-space: nowrap;">商家：{{ item.shopName || '--' }}</view>
									</view>
								</view>
								<view
									style="display: flex;justify-content: space-between;align-items: center;flex-wrap: wrap;padding: 6rpx 0 0;"
								>
									<view>
										<text>售价：</text>
										<text style="font-weight: bold;color: #e02208;">
											￥{{ typeof item.cardDiscountedPrice === 'number' ? item.cardDiscountedPrice : '--' }}
										</text>
									</view>
									<view>
										<text>获得佣金：</text>
										<text style="font-weight: bold;color: #e02208;">
											￥{{ typeof item.commissionPrice === 'number' ? item.commissionPrice : '--' }}
										</text>
									</view>
								</view>
							</view>

							<view
								v-if="item.cardId || item.cardName"
								style="margin-top: 12rpx;padding-top: 12rpx;border-top: 2rpx solid #dddddd;"
							>
								<view style="display: flex;align-items: center;">
									<view style="font-weight: bold;">关联会员卡</view>
									<tui-button
										v-if="item.cardId" type="warning" width="120rpx" height="50rpx"
										margin="0 20rpx 0"
										shape="circle" @click="getMemberCardInfo(item.cardId)"
									>
										详情
									</tui-button>
								</view>
								<view style="padding: 6rpx 0 0;font-size: 28rpx;">
									<view style="display: flex;justify-content: space-between;align-items: center;flex-wrap: wrap;">
										<view>名称：{{ item.cardName || '--' }}</view>
										<view>
											<text v-if="item.memberCardType === 1">消费卡</text>
											<text v-else-if="item.memberCardType === 2">次数卡</text>
											<text v-else>--</text>
										</view>
									</view>
									<view>
										<text>发行渠道：</text>
										<text v-if="item.memberCardChannel === 1">app</text>
										<text v-else-if="item.memberCardChannel === 2">H5</text>
										<text v-else-if="item.memberCardChannel === 3">支付宝小程序</text>
										<text v-else-if="item.memberCardChannel === 4">线下渠道</text>
										<text v-else-if="item.memberCardChannel === 5">微信小程序</text>
										<text v-else-if="item.memberCardChannel === 6">代理发行</text>
										<text v-else>--</text>
									</view>
								</view>
							</view>

							<view
								v-if="item.buyerUserId || item.name || item.phone2"
								style="margin-top: 12rpx;padding-top: 12rpx;border-top: 2rpx solid #dddddd;"
							>
								<view style="display: flex;align-items: center;">
									<view style="font-weight: bold;">关联用户</view>
									<tui-button
										v-if="item.buyerUserId" type="warning" width="120rpx" height="50rpx"
										margin="0 20rpx 0"
										shape="circle" @click="getUserInfo(item.buyerUserId)"
									>
										详情
									</tui-button>
								</view>
								<view
									style="display: flex;justify-content: space-between;align-items: center;flex-wrap: wrap;padding: 6rpx 0 0;"
								>
									<view style="flex: 1;display: flex;align-items: center;">
										<image
											style="width: 80rpx;height: 80rpx;border-radius: 50%;" mode="aspectFit"
											:src="common.seamingImgUrl(item.headImage2) || require('../../../static/images/new-user/default-user-avatar.png')"
										>
										</image>
										<text style="margin-left: 34rpx;font-size: 34rpx;">
											{{ item.name || '--' }}
										</text>
									</view>
									<view v-if="item.phon2e" style="flex: 1;display: flex;justify-content: flex-end;">
										<BeeMakePhone :phone="item.phone2">
											<view style="display: flex;align-items: center;">
												<tui-icon name="voipphone" :size="34" unit="rpx" color="#e02208" margin="0"></tui-icon>
												<text style="color: #e02208;">{{ item.phone2 }}</text>
											</view>
										</BeeMakePhone>
									</view>
								</view>
							</view>
							<view
								v-if="item.promotionName || item.phone"
								style="margin-top: 12rpx;padding-top: 12rpx;border-top: 2rpx solid #dddddd;"
							>
								<view style="font-weight: bold;">推广用户</view>
								<view
									style="display: flex;justify-content: space-between;align-items: center;flex-wrap: wrap;padding: 6rpx 0 0;"
								>
									<view style="flex: 1;display: flex;align-items: center;">
										<image
											style="width: 80rpx;height: 80rpx;border-radius: 50%;" mode="aspectFit"
											:src="common.seamingImgUrl(item.headImage) || require('../../../static/images/new-user/default-user-avatar.png')"
										>
										</image>
										<text style="margin-left: 34rpx;font-size: 34rpx;">
											{{ item.promotionName || '--' }}
										</text>
									</view>
									<view v-if="item.phone" style="flex: 1;display: flex;justify-content: flex-end;">
										<BeeMakePhone :phone="item.phone">
											<view style="display: flex;align-items: center;">
												<tui-icon name="voipphone" :size="34" unit="rpx" color="#e02208" margin="0"></tui-icon>
												<text style="color: #e02208;">{{ item.phone }}</text>
											</view>
										</BeeMakePhone>
									</view>
								</view>
							</view>

							<view
								style="margin-top: 12rpx;padding-top: 12rpx;border-top: 2rpx solid #dddddd;font-size: 26rpx;color: #999999;"
							>
								<view style="display: flex;justify-content: space-between;">
									<text>创建时间：</text>
									<text>{{ item.createTime }}</text>
								</view>
								<view v-if="item.jsonRemark">备注：{{ item.createTime }}</view>
							</view>
						</view>
					</template>
					<template #footer>
						<view
							style="display: flex;justify-content: flex-end;align-items: center;flex-wrap: wrap;padding: 10rpx 20rpx;"
						>
							<tui-button
								v-if="item.cardUserId" type="warning" width="220rpx" height="50rpx"
								margin="0 0 10rpx 20rpx"
								shape="circle" @click="getUserInfo(item.cardUserId)"
							>
								会员卡获得者
							</tui-button>
						</view>
					</template>
				</tui-card>
			</view>
		</view>
		<view style="padding-bottom: 45rpx;">
			<LoadingMore
				:status="!isEmpty && !cardPromotionList.length
					? 'loading' : !isEmpty && cardPromotionList.length && (cardPromotionList.length >= cardPromotionTotal) ? 'no-more' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无该商家的推广记录内容~</tui-no-data>
		</view>

		<tui-bottom-popup :z-index="997" :mask-z-index="996" :show="isShowPopup" @close="() => { }">
			<scroll-view scroll-y style="height: 100%;">
				<view>
					<view style="display: flex;justify-content: flex-end;padding: 12rpx;border-bottom: solid 1rpx #EEEEEE;">
						<tui-icon name="close" :size="50" unit="rpx" color="#999999" @click="isShowPopup = false"></tui-icon>
					</view>
					<view v-if="popupType === 'userPopup'" style="padding: 40rpx 0 0;">
						<ATFUserDetailInfo :data="userInfo"></ATFUserDetailInfo>
					</view>
					<view v-else-if="popupType === 'memberCardPopup'" style="padding: 40rpx 0 0;">
						<ATFMemberCardInfo :data="memberCardInfo" :is-show-shop="false" :is-shop-operation="false">
						</ATFMemberCardInfo>
					</view>
				</view>
			</scroll-view>
		</tui-bottom-popup>
	</view>
</template>

<script>
import { navigationAddress } from '../../../utils'
import { getIndexShopDetailApi, getCardPromoterAllShopMemberCardApi, getBandUserInfoApi, getByIdShopMemberCardApi } from '../../../api/anotherTFInterface'

export default {
	name: 'PromotionRecord',
	data() {
		return {
			brandDetail: {},
			isEmpty: false,
			cardPromotionList: [],
			cardPromotionTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20,
				status: '',
				phone: '',
				shopId: ''
			},
			isShowPopup: false,
			popupType: '',
			userInfo: { buyerUserId: '' },
			memberCardInfo: {}
		}
	},
	onLoad(options) {
		this.queryInfo.shopId = options.shopId
		this.getCardPromotionRecordSearchList()
		this.getBrandDetail()
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
		getCardPromotionRecordSearchList(isLoadmore) {
			uni.showLoading()
			getCardPromoterAllShopMemberCardApi(this.queryInfo).then((res) => {
				this.cardPromotionTotal = res.data.total
				if (isLoadmore) {
					this.cardPromotionList.push(...res.data.list)
				} else {
					this.cardPromotionList = res.data.list
				}
				this.isEmpty = this.cardPromotionList.length === 0
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},

		getUserInfo(userId) {
			if (!userId) return this.$showToast('缺少用户ID')
			uni.showLoading()
			getBandUserInfoApi({ type: 1, value: userId })
				.then((res) => {
					uni.hideLoading()
					if (!res.data.buyerUserId) {
						this.userInfo = { buyerUserId: '' }
						this.$showToast('该用户不存在')
					} else {
						this.userInfo = res.data
						this.popupType = 'userPopup'
						this.isShowPopup = true
					}
				})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		getMemberCardInfo(memberCardId) {
			if (!memberCardId) return this.$showToast('缺少会员卡ID')
			uni.showLoading()
			getByIdShopMemberCardApi({ id: memberCardId })
				.then((res) => {
					uni.hideLoading()
					this.memberCardInfo = res.data
					this.popupType = 'memberCardPopup'
					this.isShowPopup = true
				})
				.catch((e) => {
					uni.hideLoading()
				})
		}
	},
	onReachBottom() {
		if (this.cardPromotionList.length < this.cardPromotionTotal) {
			++this.queryInfo.page
			this.getCardPromotionRecordSearchList(true)
		}
	}
}
</script>

<style lang="less" scoped>
.promotion-record-container {
	min-height: 100vh;
	background-color: #eeeeee;
	box-sizing: border-box;

	.search-btn {
		/deep/ .tui-input__wrap {
			border: 2rpx solid #EF5511;
			border-radius: 8rpx;
		}
	}

	/deep/ .tui-card {
		margin: 0;

		.tui-card-header {
			padding: 10rpx 20rpx;
		}
	}

	/deep/ .tui-popup-class.tui-bottom-popup {
		height: 85vh !important;
	}

	/deep/ .j-header-wrapper {
		padding: 24rpx 12rpx 10rpx;
		background-color: #f5f5f5;
	}
}
</style>
