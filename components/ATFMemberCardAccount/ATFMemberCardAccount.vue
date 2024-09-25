<template>
	<view class="member-card-account-container">
		<view>
			<view v-if="type === 'entry'">
				<view style="display: flex;align-items: center;justify-content: space-between;">
					<view style="flex: 1;display: flex;align-items: center;">
						<view
							style="padding: 18rpx;font-size: 38rpx;font-weight: bold;color: #ffffff;border-radius: 50%;line-height: 1;background-color: #ef530e;"
						>
							<text>收</text>
						</view>
						<view style="flex: 1;width: 0;margin-left: 14rpx;">
							<view
								style="font-size: 28rpx;font-weight: bold;color: #222229;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
							>
								<text v-if="data.waterType === 1">充值</text>
								<text v-else>--</text>
							</view>
							<view style="margin-top: 6rpx;font-size: 24rpx;color: #888889;">{{ data.createTime }}</view>
						</view>
					</view>
					<view style="margin-left: 12rpx;text-align: right;">
						<view style="font-size: 28rpx;font-weight: bold;color: #222229;">
							入账用户ID：{{ data.buyerUserId || '--' }}
						</view>
						<view style="margin-top: 6rpx;font-size: 24rpx;color: #888889;">
							<text>金额：+{{ data.number }}</text>
						</view>
					</view>
				</view>
				<view style="display: flex;justify-content: space-between;align-items: center;flex-wrap: wrap;">
					<view style="padding-top: 10rpx;font-size: 26rpx;">
						<text>订单编号：{{ data.entryOrderCode || '--' }}</text>
					</view>
					<view
						v-if="isShowCard && data.cardId"
						style="flex: 1;display: flex;justify-content: flex-end;padding-top: 10rpx;"
					>
						<tui-button
							type="warning" width="200rpx" height="50rpx" margin="0 0 0 20rpx"
							shape="circle"
							@click="getMemberCardInfo(data.cardId)"
						>
							关联会员卡
						</tui-button>
					</view>
				</view>
			</view>
			<view v-if="type === 'outgoing'">
				<view style="display: flex;align-items: center;justify-content: space-between;">
					<view style="flex: 1;display: flex;align-items: center;">
						<view
							style="padding: 18rpx;font-size: 38rpx;font-weight: bold;color: #ffffff;border-radius: 50%;line-height: 1;background-color: #208f57;"
						>
							<text>支</text>
						</view>
						<view style="flex: 1;width: 0;margin-left: 14rpx;">
							<view
								style="font-size: 28rpx;font-weight: bold;color: #222229;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
							>
								<text v-if="data.waterType === 1">消费</text>
								<text v-else>--</text>
							</view>
							<view style="margin-top: 6rpx;font-size: 24rpx;color: #888889;">{{ data.createTime }}</view>
						</view>
					</view>
					<view style="margin-left: 12rpx;text-align: right;">
						<view style="font-size: 28rpx;font-weight: bold;color: #222229;">
							出账用户ID：{{ data.buyerUserId || '--' }}
						</view>
						<view style="margin-top: 6rpx;font-size: 24rpx;color: #888889;">
							<text>金额：-{{ data.number }}</text>
						</view>
					</view>
				</view>
				<view style="display: flex;justify-content: space-between;align-items: center;flex-wrap: wrap;">
					<view style="padding-top: 10rpx;font-size: 26rpx;">
						<text>订单编号：{{ data.orderFormid || '--' }}</text>
					</view>
					<view style="flex: 1;display: flex;justify-content: flex-end;align-items: center;">
						<view v-if="isShowShop && data.shopId" style="padding-top: 10rpx;">
							<tui-button
								type="warning" width="180rpx" height="50rpx" margin="0 0 0 20rpx"
								shape="circle"
								@click="getBrandDetail(data.shopId)"
							>
								目标商家
							</tui-button>
						</view>
						<view v-if="isShowCard && data.cardId" style="padding-top: 10rpx;">
							<tui-button
								type="warning" width="200rpx" height="50rpx" margin="0 0 0 20rpx"
								shape="circle"
								@click="getMemberCardInfo(data.cardId)"
							>
								关联会员卡
							</tui-button>
						</view>
					</view>
				</view>
			</view>

		</view>

		<view class="member-card-account-popup">
			<tui-bottom-popup
				:z-index="997" :mask-z-index="996" :show="isShowPopup"
				@close="() => {}"
			>
				<scroll-view scroll-y style="height: 100%;">
					<view>
						<view style="display: flex;justify-content: flex-end;padding: 12rpx;border-bottom: solid 1rpx #EEEEEE;">
							<tui-icon name="close" :size="50" unit="rpx" color="#999999" @click="isShowPopup = false"></tui-icon>
						</view>
						<view v-if="popupType === 'brandPopup'" style="padding: 40rpx 30rpx 14rpx;">
							<ATFBrandInfo
								:brand-detail="brandDetail" :is-show-collect="false" :is-show-share="false"
								:is-show-navigate="false" :is-show-service="false"
							></ATFBrandInfo>
						</view>
						<view v-else-if="popupType === 'memberCardPopup'" style="padding: 40rpx 0 0;">
							<ATFMemberCardInfo
								:data="memberCardInfo"
								:is-show-shop="isCardShowShop" :is-shop-operation="false"
							></ATFMemberCardInfo>
						</view>
					</view>
				</scroll-view>
			</tui-bottom-popup>
		</view>
	</view>
</template>

<script>
import { getIndexShopDetailApi, getByIdShopMemberCardApi } from '../../api/anotherTFInterface'

export default {
	name: 'ATFMemberCardAccount',
	props: {
		data: {
			type: Object,
			required: true
		},
		type: {
			type: String,
			required: true
		},
		isShowCard: {
			type: Boolean,
			default: true
		},
		isCardShowShop: {
			type: Boolean,
			default: true
		},
		isShowShop: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			isShowPopup: false,
			popupType: '',
			brandDetail: {},
			memberCardInfo: {}
		}
	},
	methods: {
		async getBrandDetail(shopId) {
			try {
				uni.showLoading()
				const { data } = await getIndexShopDetailApi({
					shopId,
					longitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[0],
					latitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[1]
				})
				console.log(data)
				this.brandDetail = data || {}
				this.popupType = 'brandPopup'
				this.isShowPopup = true
				uni.hideLoading()
			} catch (error) {
				console.log(error)
				uni.hideLoading()
			}
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
	}
}
</script>

<style lang="less" scoped>
.member-card-account-container {
	box-sizing: border-box;

	.member-card-account-popup {
		/deep/ .tui-popup-class.tui-bottom-popup {
			height: 65vh !important;
		}
	}
}
</style>
