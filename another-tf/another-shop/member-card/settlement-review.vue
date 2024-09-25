<template>
	<view class="settlement-review-container">
		<JHeader title="会员卡结算审核列表" width="50" height="50"></JHeader>

		<view v-if="cardApplyList && cardApplyList.length" style="margin: 10rpx 0 0;">
			<view v-for="(item, index) in cardApplyList" :key="index" style="padding: 0 20rpx 35rpx;">
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
						<view
							style="display: flex;justify-content: flex-end;align-items: center;flex-wrap: wrap;padding: 10rpx 20rpx;"
						>
							<tui-button
								v-if="item.cardId" type="warning" width="200rpx" height="50rpx"
								margin="0 0 10rpx 20rpx"
								shape="circle" @click="getMemberCardInfo(item.cardId)"
							>
								关联会员卡
							</tui-button>
							<tui-button
								v-if="item.buyerUserId" type="warning" width="180rpx" height="50rpx"
								margin="0 0 10rpx 20rpx"
								shape="circle" @click="getUserInfo(item.buyerUserId)"
							>
								申请用户
							</tui-button>
							<tui-button
								v-if="item.applySettlementId && ((item.status === 1) || (item.status === 3))" type="warning"
								width="180rpx" height="50rpx" margin="0 0 10rpx 20rpx" shape="circle"
								@click="(cardApplyForm.applySettlementId = item.applySettlementId) && (isShowCardApplyDialog = true)"
							>
								同意结算
							</tui-button>
						</view>
					</template>
				</tui-card>
			</view>
		</view>
		<view style="padding-bottom: 45rpx;">
			<LoadingMore
				:status="!isEmpty && !cardApplyList.length
					? 'loading' : !isEmpty && cardApplyList.length && (cardApplyList.length >= cardApplyTotal) ? 'no-more' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="isEmpty" :fixed="false" style="padding-top: 60rpx;">暂无会员卡权益内容~</tui-no-data>
		</view>

		<view style="position: relative;z-index: 888;">
			<tui-dialog
				:buttons="[{ text: '取消' }, { text: '确认同意', color: '#586c94' }]" :show="isShowCardApplyDialog"
				title="会员卡结算审核" @click="handleCardApplyDialog"
			>
				<template #content>
					<view>
						<tui-input
							v-model="cardApplyForm.settlementCode" padding="26rpx 0" label="检验码"
							placeholder="请填写检验码"
						></tui-input>
					</view>
				</template>
			</tui-dialog>
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
import { getShopMemberCardApplySettlementApi, updateAgreeShopMemberCardApplyApi, getBandUserInfoApi, getByIdShopMemberCardApi } from '../../../api/anotherTFInterface'
export default {
	name: 'SettlementReview',
	data() {
		return {
			isEmpty: false,
			cardApplyList: [],
			cardApplyTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20
			},
			isShowCardApplyDialog: false,
			cardApplyForm: {
				settlementCode: '',
				applySettlementId: ''
			},
			isShowPopup: false,
			popupType: '',
			userInfo: { buyerUserId: '' },
			memberCardInfo: {}
		}
	},
	onLoad() {
		this.getCardApplySearchList()
	},
	methods: {
		getCardApplySearchList(isLoadmore) {
			uni.showLoading()
			getShopMemberCardApplySettlementApi(this.queryInfo).then((res) => {
				this.cardApplyTotal = res.data.total
				if (isLoadmore) {
					this.cardApplyList.push(...res.data.list)
				} else {
					this.cardApplyList = res.data.list
				}
				this.isEmpty = this.cardApplyList.length === 0
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
		},

		async handleCardApplyDialog(e) {
			console.log(e)
			if (e.index === 0) {
			} else if (e.index === 1) {
				if (!this.cardApplyForm.settlementCode) return this.$showToast('请填写检验码')
				await updateAgreeShopMemberCardApplyApi(this.cardApplyForm)
					.then((res) => {
						this.$showToast('操作成功', 'success')
						setTimeout(() => {
							this.queryInfo.page = 1
							this.getCardApplySearchList()
						}, 2000)
					})
			}
			this.cardApplyForm.settlementCode = ''
			this.cardApplyForm.applySettlementId = ''
			this.isShowCardApplyDialog = false
		}
	},
	onReachBottom() {
		if (this.cardApplyList.length < this.cardApplyTotal) {
			++this.queryInfo.page
			this.getCardApplySearchList(true)
		}
	}
}
</script>

<style lang="less" scoped>
.settlement-review-container {
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
