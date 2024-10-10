<template>
	<view class="member-card-info-container">
		<view v-if="data.cardId">
			<tui-card :title="{ text: `` }" :tag="{ text: `` }">
				<template #body>
					<view style="font-size: 30rpx;">
						<view
							style="position: relative;text-align: center;"
							@click="cardColor = cardColor === '#f8f8f9' ? '#4e3200' : '#f8f8f9'"
						>
							<image
								style="width: 100%;min-height: 340rpx;max-height: 435rpx;vertical-align: bottom;border-radius: 10rpx;"
								mode="widthFix"
								:src="common.seamingImgUrl(data.cardCover) || require('../../static/images/new-user/logo.jpg')"
							>
							</image>

							<view
								v-if="!isShowDetails"
								style="position: absolute;top: 0;left: 0;width: 100%;padding: 20rpx 34rpx 0;text-align: left;box-sizing: border-box;"
								:style="{ color: cardColor }"
							>
								<view style="display: flex;justify-content: space-between;align-items: center;">
									<view
										style="flex: 1;font-size: 40rpx;font-weight: bold;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
									>
										{{ data.cardName || '--' }}
									</view>
									<view v-if="data.memberCardState" style="font-size: 24rpx;color: #ffffff;">
										<view
											v-if="data.memberCardState === 1"
											style="padding: 2rpx 14rpx;background-color: #0fb135;border-radius: 6rpx;"
										>
											已发行
										</view>
										<view
											v-else-if="data.memberCardState === 2"
											style="padding: 2rpx 14rpx;background-color: #d1d1d1;border-radius: 6rpx;"
										>
											未发行
										</view>
										<view
											v-else-if="data.memberCardState === 3"
											style="padding: 2rpx 14rpx;background-color: #d1d1d1;border-radius: 6rpx;"
										>
											已下架
										</view>
										<view v-else>--</view>
									</view>
								</view>
								<view style="margin: 18rpx 0 0;font-size: 28rpx;">
									<view
										style="width: fit-content;padding: 2rpx 34rpx;font-weight: bold;background-color: rgba(255, 255, 255, 0.4);border-radius: 28rpx;"
									>
										<text v-if="data.memberCardLevel === 1">消费卡</text>
										<text v-else-if="data.memberCardLevel === 2">次数卡</text>
										<text v-else>--</text>
									</view>
									<view style="margin-top: 12rpx;border-radius: 12rpx;">
										<view style="display: flex;align-items: center;padding-bottom: 18rpx;">
											<view style="min-width: 162rpx;">会员卡ID</view>
											<view style="flex: 1;margin: 0 0 0 40rpx;font-weight: bold;">{{ data.cardId }}</view>
										</view>
										<view style="display: flex;align-items: center;padding-bottom: 18rpx;">
											<view style="min-width: 162rpx;">人群级别</view>
											<view style="flex: 1;margin: 0 0 0 40rpx;font-weight: bold;">
												<text v-if="data.memberCardType === 1">全部会员</text>
												<text v-else-if="data.memberCardType === 2">团长</text>
												<text v-else-if="data.memberCardType === 3">合伙人</text>
												<text v-else>--</text>
											</view>
										</view>
										<view style="display: flex;align-items: center;padding-bottom: 18rpx;">
											<view style="min-width: 162rpx;">发行渠道：</view>
											<view style="flex: 1;margin: 0 0 0 40rpx;font-weight: bold;">
												<text v-if="data.memberCardChannel === 1">app</text>
												<text v-else-if="data.memberCardChannel === 2">H5</text>
												<text v-else-if="data.memberCardChannel === 3">支付宝小程序</text>
												<text v-else-if="data.memberCardChannel === 4">线下渠道</text>
												<text v-else-if="data.memberCardChannel === 5">微信小程序</text>
												<text v-else-if="data.memberCardChannel === 6">代理发行</text>
												<text v-else>--</text>
											</view>
										</view>
										<view style="display: flex;align-items: center;">
											<view style="min-width: 162rpx;">发放张数</view>
											<view style="flex: 1;margin: 0 0 0 40rpx;font-weight: bold;">
												{{ data.memberCardNumber || 0 }}张
											</view>
										</view>
									</view>
								</view>
							</view>

						</view>
						<view v-if="isShowDetails" style="padding: 10rpx 20rpx 0;">
							<view style="display: flex;justify-content: space-between;align-items: center;padding: 6rpx 0 0;">
								<view style="flex: 1;">
									会员卡名称：{{ data.cardName || '--' }}
								</view>
								<view style="font-size: 26rpx;color: #666666;">（ID：{{ data.cardId }}）</view>
							</view>
							<view style="display: flex;align-items: center;justify-content: space-between;padding: 6rpx 0 0;">
								<view>
									<text>类型：</text>
									<text v-if="data.memberCardLevel === 1">消费卡</text>
									<text v-else-if="data.memberCardLevel === 2">次数卡</text>
									<text v-else>--</text>
								</view>
								<view>
									<text>人群级别：</text>
									<text v-if="data.memberCardType === 1">全部会员</text>
									<text v-else-if="data.memberCardType === 2">团长</text>
									<text v-else-if="data.memberCardType === 3">合伙人</text>
									<text v-else>--</text>
								</view>
							</view>
							<view
								style="display: flex;justify-content: space-between;align-items: center;flex-wrap: wrap;padding: 6rpx 0 0;"
							>
								<view style="display: flex;align-items: center;">
									<text>折扣价：</text>
									<text style="font-weight: bold;color: #e02208;">
										￥{{ typeof data.cardDiscountedPrice === 'number' ? data.cardDiscountedPrice : '--' }}
									</text>
									<text style="font-size: 28rpx;color: #666666;">
										（原价：￥{{ typeof data.cardPrice === 'number' ? data.cardPrice : '--' }}）
									</text>
								</view>
								<view>
									<text>推广佣金：</text>
									<text style="font-weight: bold;color: #e02208;">
										￥{{ typeof data.promotionPrice === 'number' ? data.promotionPrice : '--' }}
									</text>
								</view>
							</view>
							<view style="display: flex;justify-content: space-between;padding: 6rpx 0 0;font-size: 28rpx;">
								<view>
									<text>代理商采购价：</text>
									<text style="font-weight: bold;color: #e02208;">
										￥{{ typeof data.agentPurchasePrice === 'number' ? data.agentPurchasePrice : '--' }}
									</text>
								</view>
								<view v-if="data.memberCardDays">会员卡有效天数：{{ data.memberCardDays }}</view>
							</view>

							<view
								style="margin-top: 12rpx;padding-top: 12rpx;border-top: 2rpx dashed #dddddd;font-size: 26rpx;color: #999999;"
							>
								<view v-if="data.cardEquityStatement" style="color: #666666;">
									权益说明：{{ data.cardEquityStatement }}
								</view>
								<view v-if="data.startTime" style="display: flex;justify-content: space-between;">
									<text>购买有效期开始日期：</text>
									<text>{{ data.startTime }}</text>
								</view>
								<view v-if="data.endTime" style="display: flex;justify-content: space-between;">
									<text>购买有效期结束日期：</text>
									<text>{{ data.endTime }}</text>
								</view>
								<view style="display: flex;justify-content: space-between;">
									<text>创建时间：</text>
									<text>{{ data.createTime }}</text>
								</view>
								<view style="display: flex;align-items: center;">
									<view>
										<text>发行渠道：</text>
										<text v-if="data.memberCardChannel === 1">app</text>
										<text v-else-if="data.memberCardChannel === 2">H5</text>
										<text v-else-if="data.memberCardChannel === 3">支付宝小程序</text>
										<text v-else-if="data.memberCardChannel === 4">线下渠道</text>
										<text v-else-if="data.memberCardChannel === 5">微信小程序</text>
										<text v-else-if="data.memberCardChannel === 6">代理发行</text>
										<text v-else>--</text>
									</view>
									<text v-if="data.memberCardNumber">
										（{{ data.memberCardNumber }}张）
									</text>
									<view v-if="data.memberCardState">
										（{{ { 1: '已发行', 2: '未发行', 3: '已下架' }[data.memberCardState] || '--' }}）
									</view>
								</view>
							</view>
						</view>
					</view>
				</template>
				<template #footer>
					<view
						style="width: 100%;display: flex;justify-content: space-between;align-items: center;flex-wrap: wrap;padding: 10rpx 0;"
					>
						<view v-if="isShowDetails" style="min-width: 49%;padding: 10rpx 0;">
							<tui-button
								type="warning" width="auto" height="50rpx" margin="0"
								plain link bold :size="28"
								@click="isShowDetails = false"
							>
								收起详情
							</tui-button>
						</view>
						<view v-else style="min-width: 49%;padding: 10rpx 0;">
							<tui-button
								type="warning" width="auto" height="50rpx" margin="0"
								plain link bold :size="28"
								@click="isShowDetails = true"
							>
								详情
							</tui-button>
						</view>
						<view v-if="isShowShop && data.shopId" style="min-width: 49%;padding: 10rpx 0;">
							<tui-button
								type="warning" width="auto" height="50rpx" margin="0"
								plain link bold :size="28"
								@click="getBrandDetail(data.shopId)"
							>
								所属店铺
							</tui-button>
						</view>
						<view v-if="isShowPurchase && (data.memberCardState === 1)" style="min-width: 49%;padding: 10rpx 0;">
							<tui-button
								type="warning" width="auto" height="50rpx" margin="0"
								plain link bold :size="28"
								@click="$emit('purchase', data)"
							>
								购买
							</tui-button>
						</view>
						<view v-if="isShowSelect" style="min-width: 49%;padding: 10rpx 0;">
							<tui-button
								type="warning" width="auto" height="50rpx" margin="0"
								plain link bold :size="28"
								@click="$emit('select', data)"
							>
								选择
							</tui-button>
						</view>
						<view v-if="isShopOperation" style="min-width: 49%;padding: 10rpx 0;">
							<tui-button
								type="warning" width="auto" height="50rpx" margin="0"
								plain link bold :size="28"
								@click="go(`/another-tf/another-shop/member-card/member-card-equity?cardId=${data.cardId}`)"
							>
								权益
							</tui-button>
						</view>
						<view v-if="isShopOperation" style="min-width: 49%;padding: 10rpx 0;">
							<tui-button
								type="warning" width="auto" height="50rpx" margin="0"
								plain link bold :size="28"
								@click="go(`/another-tf/another-shop/member-card/shop-member-card-form?id=${data.cardId}`)"
							>
								编辑
							</tui-button>
						</view>
						<view v-if="isShopOperation && (data.memberCardState === 1)" style="min-width: 49%;padding: 10rpx 0;">
							<tui-button
								type="warning" width="auto" height="50rpx" margin="0"
								plain link bold :size="28"
								@click="handleMemberCardOffShelf(data)"
							>
								下架
							</tui-button>
						</view>
						<view
							v-if="isShopOperation && ((data.memberCardState === 2) || (data.memberCardState === 3))"
							style="min-width: 49%;padding: 10rpx 0;"
						>
							<tui-button
								type="warning" width="auto" height="50rpx" margin="0"
								plain link bold :size="28"
								@click="handleMemberCardIssue(data)"
							>
								发行
							</tui-button>
						</view>
					</view>
				</template>
			</tui-card>

			<view v-if="isShowShop" class="member-card-info-popup">
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
		</view>
	</view>
</template>

<script>
import { getIndexShopDetailApi, updateShelfShopMemberCardApi, updateIssueShopMemberCardApi } from '../../api/anotherTFInterface'

export default {
	name: 'ATFMemberCardInfo',
	props: {
		data: {
			type: Object,
			required: true
		},
		isShowShop: {
			type: Boolean,
			default: true
		},
		isShopOperation: {
			type: Boolean,
			default: true
		},
		isShowSelect: {
			type: Boolean,
			default: false
		},
		isShowPurchase: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			isShowPopup: false,
			brandDetail: {},
			cardColor: '#f8f8f9',
			isShowDetails: false
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
				this.isShowPopup = true
				uni.hideLoading()
			} catch (error) {
				console.log(error)
				uni.hideLoading()
			}
		},
		handleMemberCardOffShelf(item) {
			if (!item.cardId) {
				return this.$showToast('缺少会员卡信息')
			}
			uni.showModal({
				title: '提示',
				content: '确认下架该会员卡？',
				success: (res) => {
					if (res.confirm) {
						uni.showLoading()
						updateShelfShopMemberCardApi({
							id: item.cardId
						})
							.then((res) => {
								uni.hideLoading()
								this.$showToast('下架成功')
								this.$emit('off-shelf')
							})
							.catch((e) => {
								uni.hideLoading()
							})
					}
				}
			})
		},
		handleMemberCardIssue(item) {
			if (!item.cardId) {
				return this.$showToast('缺少会员卡信息')
			}
			uni.showModal({
				title: '提示',
				content: '确认发行该会员卡？',
				success: (res) => {
					if (res.confirm) {
						uni.showLoading()
						updateIssueShopMemberCardApi({
							id: item.cardId
						})
							.then((res) => {
								uni.hideLoading()
								this.$showToast('发行成功')
								this.$emit('issue')
							})
							.catch((e) => {
								uni.hideLoading()
							})
					}
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
.member-card-info-container {
	box-sizing: border-box;

	/deep/ .tui-card {
		margin: 0 !important;

		.tui-card-header {
			padding: 0 !important;
		}
	}

	.member-card-info-popup {
		/deep/ .tui-popup-class.tui-bottom-popup {
			height: 65vh !important;
		}
	}
}
</style>
