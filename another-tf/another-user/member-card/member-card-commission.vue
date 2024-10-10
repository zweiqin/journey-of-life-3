<template>
	<view class="member-card-commission-container">
		<JHeader title="会员卡佣金" width="50" height="50"></JHeader>
		<view class="top-btn" style="display: flex;justify-content: flex-end;flex-wrap: wrap;padding: 0 20rpx;">
			<tui-button
				type="warning" width="180rpx" height="56rpx" margin="10rpx 0 0 10rpx"
				shape="circle" :size="28"
				@click="go('/another-tf/another-user/member-card/member-card-record')"
			>
				收支明细
			</tui-button>
			<tui-button
				type="warning" width="260rpx" height="56rpx" margin="10rpx 0 0 10rpx"
				shape="circle" :size="28"
				@click="go('/another-tf/another-user/member-card/settlement-record')"
			>
				会员卡结算记录
			</tui-button>
		</view>

		<view
			style="display: flex;justify-content: space-evenly;margin: 20rpx 30rpx 40rpx;padding: 34rpx 4rpx;background-color: #ffffff;color: #ef530e;border-radius: 16rpx;"
		>
			<view style="flex: 1;text-align: center;">
				<view style="font-weight: bold;">
					{{ typeof cardCommissionData.pendingSettlement === 'number' ? cardCommissionData.pendingSettlement : '--' }}
				</view>
				<view style="margin-top: 12rpx;font-size: 24rpx;color: #666666;">待结算</view>
			</view>
			<view style="width: 2rpx;margin: 10rpx 0;background-color: #cccccc;"></view>
			<view style="flex: 1;text-align: center;">
				<view style="font-weight: bold;">
					{{ typeof cardCommissionData.alreadySettled === 'number' ? cardCommissionData.alreadySettled : '--' }}
				</view>
				<view style="margin-top: 12rpx;font-size: 24rpx;color: #666666;">已结算</view>
			</view>
			<view style="width: 2rpx;margin: 10rpx 0;background-color: #cccccc;"></view>
			<view style="flex: 1;text-align: center;">
				<view style="font-weight: bold;">
					{{ typeof cardCommissionData.audit === 'number' ? cardCommissionData.audit : '--' }}
				</view>
				<view style="margin-top: 12rpx;font-size: 24rpx;color: #666666;">待审核</view>
			</view>
		</view>

		<view v-if="cardCommissionList && cardCommissionList.length" style="margin: 10rpx 0 0;">
			<view
				v-for="(item, index) in cardCommissionList" :key="index"
				style="display: flex;justify-content: space-between;align-items: center;margin: 0 30rpx 30rpx;padding: 32rpx;font-size: 28rpx;background-color: #ffffff;border-radius: 16rpx;"
			>
				<view style="flex: 1;width: 0;">
					<view
						style="display: flex;align-items: center;"
						@click="item.shopId && getBrandDetail(item.shopId)"
					>
						<view style="font-weight: bold;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
							{{ item.shopName || '--' }}
						</view>
						<view v-if="item.shopId" style="margin-left: 12rpx;">
							<tui-icon name="arrowright" :size="32" unit="rpx" color="#1c1b1e" margin="0"></tui-icon>
						</view>
					</view>
					<view style="margin-top: 12rpx;font-size: 24rpx;color: #666666;">
						<text>已结算：</text>
						<text>
							{{ typeof item.alreadySettled === 'number' ? item.alreadySettled : '--' }}元
						</text>
					</view>
				</view>
				<view style="text-align: right;">
					<view>
						<text>待审核：</text>
						<text style="font-weight: bold;color: #ef530e;">
							{{ typeof item.audit === 'number' ? item.audit : '--' }}元
						</text>
					</view>
					<view style="margin-top: 2rpx;display: flex;align-items: flex-end;font-size: 28rpx;">
						<text>待结算：</text>
						<text style="color: #ef530e;">
							{{ typeof item.pendingSettlement === 'number' ? item.pendingSettlement : '--' }}元
						</text>
						<tui-button
							v-if="item.shopId && item.pendingSettlement" type="warning" width="fit-content" height="40rpx"
							margin="0 0 0 10rpx" shape="circle"
							plain link :size="26" bold
							@click="handleCardApplyShop(item)"
						>
							提交
						</tui-button>
					</view>
				</view>
			</view>
		</view>
		<view style="padding-bottom: 45rpx;">
			<LoadingMore
				:status="!isEmpty && !cardCommissionList.length
					? 'loading' : !isEmpty && cardCommissionList.length && (cardCommissionList.length >= cardCommissionTotal) ? 'no-more' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无商家分组佣金统计内容~</tui-no-data>
		</view>

		<tui-bottom-popup :z-index="997" :mask-z-index="996" :show="isShowPopup" @close="isShowPopup = false">
			<scroll-view scroll-y style="height: 100%;">
				<view>
					<view style="display: flex;justify-content: flex-end;padding: 12rpx;border-bottom: solid 1rpx #EEEEEE;">
						<tui-icon name="close" :size="50" unit="rpx" color="#999999" @click="isShowPopup = false"></tui-icon>
					</view>
					<view style="padding: 40rpx 30rpx 14rpx;">
						<ATFBrandInfo
							:brand-detail="brandDetail" :is-show-collect="false" :is-show-share="false"
							:is-show-navigate="false" :is-show-service="false"
						></ATFBrandInfo>
					</view>
				</view>
			</scroll-view>
		</tui-bottom-popup>
	</view>
</template>

<script>
import { getIndexShopDetailApi, getCardStatisticsShopMemberCardApi, getGroupShopMemberCardApi, updateSettlementShopMemberCardApi } from '../../../api/anotherTFInterface'
export default {
	name: 'MemberCardCommission',
	data() {
		return {
			cardCommissionData: {
				pendingSettlement: 0, // 用户总待结算
				alreadySettled: 0, // 用户总已结算
				audit: 0 // 待审核
			},
			isEmpty: false,
			cardCommissionList: [],
			cardCommissionTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20
			},
			isShowPopup: false,
			brandDetail: {}
		}
	},
	onLoad() {
		this.getData()
	},
	methods: {
		getData() {
			uni.showLoading()
			getCardStatisticsShopMemberCardApi()
				.then((res) => {
					this.cardCommissionData = res.data
					uni.hideLoading()
				})
				.catch((e) => {
					uni.hideLoading()
				})
			this.getCardCommissionSearchList()
		},
		getCardCommissionSearchList(isLoadmore) {
			uni.showLoading()
			getGroupShopMemberCardApi(this.queryInfo).then((res) => {
				this.cardCommissionTotal = res.data.total
				if (isLoadmore) {
					this.cardCommissionList.push(...res.data.list)
				} else {
					this.cardCommissionList = res.data.list
				}
				this.isEmpty = this.cardCommissionList.length === 0
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},

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
				this.isShowPopup = true
				uni.hideLoading()
			} catch (error) {
				console.log(error)
				uni.hideLoading()
			}
		},

		handleCardApplyShop(item) {
			if (!item.shopId) {
				return this.$showToast('缺少商家信息')
			}
			uni.showModal({
				title: '提示',
				content: '确认对该商家提交结算？',
				success: (res) => {
					if (res.confirm) {
						uni.showLoading()
						updateSettlementShopMemberCardApi({
							shopId: item.shopId
						})
							.then((res) => {
								uni.hideLoading()
								this.$showToast('提交成功')
								setTimeout(() => {
									this.queryInfo.page = 1
									this.getCardCommissionSearchList()
								}, 2000)
							})
							.catch((e) => {
								uni.hideLoading()
							})
					}
				}
			})
		}
	},
	onReachBottom() {
		if (this.cardCommissionList.length < this.cardCommissionTotal) {
			++this.queryInfo.page
			this.getCardCommissionSearchList(true)
		}
	}
}
</script>

<style lang="less" scoped>
.member-card-commission-container {
	min-height: 100vh;
	background-color: #f1f1f1;
	box-sizing: border-box;

	.top-btn {
		/deep/ .tui-btn-warning {
			background-color: #ef530e !important;
		}
	}

	/deep/ .tui-popup-class.tui-bottom-popup {
		height: 85vh !important;
	}

	/deep/ .j-header-wrapper {
		padding: 24rpx 12rpx 10rpx;
		background-color: #ffffff;
	}
}
</style>
