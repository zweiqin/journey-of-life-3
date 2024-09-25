<template>
	<view class="settlement-record-container">
		<JHeader title="会员卡结算记录列表" width="50" height="50"></JHeader>
		<view v-if="cardSettlementList && cardSettlementList.length" style="margin: 10rpx 0 0;">
			<view v-for="(item, index) in cardSettlementList" :key="index" style="padding: 0 20rpx 35rpx;">
				<tui-card
					:title="{ text: `${item.applyOrderCode || '--'}` }"
					:tag="{ text: `ID：${item.applySettlementId || '--'}` }"
				>
					<template #body>
						<view style="padding: 10rpx 20rpx 0;font-size: 30rpx;">
							<view>
								<!-- <view>店铺ID：{{ item.shopId || '--' }}</view> -->
								<view style="display: flex;justify-content: space-between;align-items: center;flex-wrap: wrap;">
									<view style="display: flex;align-items: center;">
										<text>结算金额：</text>
										<text style="font-weight: bold;color: #e02208;">
											￥{{ typeof item.applyPrice === 'number' ? item.applyPrice : '--' }}
										</text>
										<text style="font-size: 30rpx;">
											（{{ { 1: '待审核', 2: '已结算', 3: '退回结算' }[item.status] || '--' }}）
										</text>
									</view>
									<view v-if="item.settlementCodeId">
										校验码ID：{{ item.settlementCodeId }}
									</view>
								</view>
								<view
									v-if="item.settlementCode"
									style="display: flex;justify-content: flex-end;align-items: center;padding: 10rpx 0 0;"
								>
									<view>
										校验码：{{ item.settlementCode }}
									</view>
									<tui-button
										v-if="item.settlementCode" type="warning" width="120rpx" height="50rpx"
										margin="0 0 0 20rpx"
										shape="circle" @click="$copy(item.settlementCode)"
									>
										复制
									</tui-button>
								</view>
							</view>
							<view
								style="margin-top: 12rpx;padding-top: 12rpx;border-top: 2rpx dashed #dddddd;font-size: 26rpx;color: #999999;"
							>
								<view style="display: flex;justify-content: space-between;">
									<text>申请时间：</text>
									<text>{{ item.applyTime || '--' }}</text>
								</view>
								<view v-if="item.settlementTime" style="display: flex;justify-content: space-between;">
									<text>结算时间：</text>
									<text>{{ item.settlementTime }}</text>
								</view>
							</view>
						</view>
					</template>
					<template #footer>
						<view style="display: flex;justify-content: flex-end;align-items: center;padding: 10rpx 20rpx;">
							<tui-button
								v-if="item.shopId"
								type="warning" width="180rpx" height="50rpx" margin="0 0 0 20rpx"
								shape="circle"
								@click="getBrandDetail(item.shopId)"
							>
								关联店铺
							</tui-button>
							<tui-button
								v-if="item.cardId"
								type="warning" width="200rpx" height="50rpx" margin="0 0 0 20rpx"
								shape="circle"
								@click="getMemberCardInfo(item.cardId)"
							>
								关联会员卡
							</tui-button>
						</view>
					</template>
				</tui-card>
			</view>
		</view>
		<view style="padding-bottom: 45rpx;">
			<LoadingMore
				:status="!isEmpty && !cardSettlementList.length
					? 'loading' : !isEmpty && cardSettlementList.length && (cardSettlementList.length >= cardSettlementTotal) ? 'no-more' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无会员卡权益内容~</tui-no-data>
		</view>

		<tui-bottom-popup :z-index="997" :mask-z-index="996" :show="isShowPopup" @close="() => { }">
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
						<ATFMemberCardInfo :data="memberCardInfo" :is-show-shop="false" :is-shop-operation="false">
						</ATFMemberCardInfo>
					</view>
				</view>
			</scroll-view>
		</tui-bottom-popup>
	</view>
</template>

<script>
import { getBuyerSettlementShopMemberCardApi, getIndexShopDetailApi, getByIdShopMemberCardApi } from '../../../api/anotherTFInterface'
export default {
	name: 'SettlementRecord',
	components: {
	},
	data() {
		return {
			isEmpty: false,
			cardSettlementList: [],
			cardSettlementTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20
			},
			isShowPopup: false,
			popupType: '',
			brandDetail: {},
			memberCardInfo: {}
		}
	},
	onLoad() {
		this.getCardSettlementSearchList()
	},
	methods: {
		getCardSettlementSearchList(isLoadmore) {
			uni.showLoading()
			getBuyerSettlementShopMemberCardApi(this.queryInfo).then((res) => {
				this.cardSettlementTotal = res.data.total
				if (isLoadmore) {
					this.cardSettlementList.push(...res.data.list)
				} else {
					this.cardSettlementList = res.data.list
				}
				this.isEmpty = this.cardSettlementList.length === 0
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
	},
	onReachBottom() {
		if (this.cardSettlementList.length < this.cardSettlementTotal) {
			++this.queryInfo.page
			this.getCardSettlementSearchList(true)
		}
	}
}
</script>

<style lang="less" scoped>
.settlement-record-container {
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
