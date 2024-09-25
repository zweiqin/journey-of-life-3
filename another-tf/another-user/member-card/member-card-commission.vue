<template>
	<view class="member-card-commission-container">
		<JHeader title="会员卡分佣" width="50" height="50"></JHeader>
		<view style="display: flex;justify-content: flex-end;flex-wrap: wrap;">
			<tui-button
				type="blue" width="200rpx" height="60rpx" margin="10rpx 0 0 10rpx"
				shape="circle"
				@click="go('/another-tf/another-user/member-card/member-card-record')"
			>
				收支明细
			</tui-button>
			<tui-button
				type="blue" width="260rpx" height="60rpx" margin="10rpx 0 0 10rpx"
				shape="circle"
				@click="go('/another-tf/another-user/member-card/settlement-record')"
			>
				会员卡结算记录
			</tui-button>
			<tui-button
				type="blue" width="220rpx" height="60rpx" margin="10rpx 0 0 10rpx"
				shape="circle"
				@click="go('/another-tf/another-user/member-card/user-purchased')"
			>
				已购会员卡
			</tui-button>
		</view>

		<view
			style="margin: 20rpx 30rpx 40rpx;padding: 0 30rpx 34rpx;background-color: #ffffff;color: #666666;font-size: 24rpx;border-radius: 16rpx;"
		>
			<view style="display: flex;align-items: center;">
				<view style="flex:1;width: 0;padding: 34rpx 0 0 32rpx;">
					<view style="display: flex;align-items: center;">
						<view style="width: 6rpx;height: 16rpx;background-color: #3370ff;"></view>
						<view style="margin-left: 8rpx;">待结算</view>
					</view>
					<view style="margin-top: 18rpx;font-size: 42rpx;font-weight: bold;color: #191919;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
						{{ typeof cardCommissionData.pendingSettlement === 'number' ? cardCommissionData.pendingSettlement : '--' }}
					</view>
				</view>
				<view style="flex:1;width: 0;padding: 34rpx 0 0 32rpx;">
					<view style="display: flex;align-items: center;">
						<view style="width: 6rpx;height: 16rpx;background-color: #0dc53e;"></view>
						<view style="margin-left: 8rpx;">已结算</view>
					</view>
					<view style="margin-top: 18rpx;font-size: 42rpx;font-weight: bold;color: #191919;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
						{{ typeof cardCommissionData.alreadySettled === 'number' ? cardCommissionData.alreadySettled : '--' }}
					</view>
				</view>
				<view style="flex:1;width: 0;padding: 34rpx 0 0 32rpx;">
					<view style="display: flex;align-items: center;">
						<view style="width: 6rpx;height: 16rpx;background-color: #0dc53e;"></view>
						<view style="margin-left: 8rpx;">待审核</view>
					</view>
					<view style="margin-top: 18rpx;font-size: 42rpx;font-weight: bold;color: #191919;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
						{{ typeof cardCommissionData.audit === 'number' ? cardCommissionData.audit : '--' }}
					</view>
				</view>
			</view>
		</view>

		<view v-if="cardCommissionList && cardCommissionList.length" style="margin: 10rpx 0 0;">
			<view v-for="(item, index) in cardCommissionList" :key="index" style="padding: 0 20rpx 35rpx;">
				<tui-card :title="{ text: `商家：${item.shopName || '--'}` }" :tag="{ text: `ID：${item.shopId || '--'}` }">
					<template #body>
						<view style="padding: 10rpx 20rpx 0;font-size: 30rpx;">
							<view
								style="display: flex;justify-content: space-between;align-items: center;flex-wrap: wrap;padding: 6rpx 0 0;"
							>
								<view>
									<text>待结算：</text>
									<text style="font-weight: bold;color: #e02208;">
										￥{{ typeof item.pendingSettlement === 'number' ? item.pendingSettlement : '--' }}
									</text>
								</view>
								<view>
									<text>已结算：</text>
									<text style="font-weight: bold;color: #e02208;">
										￥{{ typeof item.alreadySettled === 'number' ? item.alreadySettled : '--' }}
									</text>
								</view>
							</view>
							<view style="padding: 6rpx 0 0;">
								<text>待审核：</text>
								<text style="font-weight: bold;color: #e02208;">
									￥{{ typeof item.audit === 'number' ? item.audit : '--' }}
								</text>
							</view>
						</view>
					</template>
					<template #footer>
						<view
							style="display: flex;justify-content: flex-end;align-items: center;flex-wrap: wrap;padding: 10rpx 20rpx;"
						>
							<tui-button
								v-if="item.shopId"
								type="warning" width="180rpx" height="50rpx" margin="0 0 0 20rpx"
								shape="circle"
								@click="getBrandDetail(item.shopId)"
							>
								关联店铺
							</tui-button>
							<tui-button
								v-if="item.shopId" type="warning"
								width="180rpx" height="50rpx" margin="0 0 0 20rpx" shape="circle"
								@click="handleCardApplyShop(item)"
							>
								提交结算
							</tui-button>
						</view>
					</template>
				</tui-card>
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
	background-color: #eeeeee;
	box-sizing: border-box;

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
