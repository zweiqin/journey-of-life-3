<template>
	<view class="member-card-info-container">
		<view v-if="data.cardId">
			<tui-card :title="{ text: `${data.cardName}` }" :tag="{ text: `ID：${data.cardId || '--'}` }">
				<template #body>
					<view style="padding: 10rpx 20rpx 0;font-size: 30rpx;">
						<view style="padding: 0 10rpx;text-align: center;">
							<image
								style="width: 100%;max-height: 350rpx;vertical-align: bottom;" mode="widthFix"
								:src="common.seamingImgUrl(data.cardCover) || require('../../static/images/new-user/logo.jpg')"
							>
							</image>
						</view>
						<view style="margin: 10rpx 0 0;">
							<!-- <view style="display: flex;justify-content: space-between;align-items: center;padding: 6rpx 0 0;">
								<view>
								会员卡名称：{{ data.cardName || '--' }}
								</view>
								<view style="font-size: 26rpx;color: #666666;">（ID：{{ data.cardId }}）</view>
								</view> -->
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
								<view v-if="data.memberCardDays">会员天数：{{ data.memberCardDays }}</view>
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
								<view style="display: flex;justify-content: space-between;align-items: center;flex-wrap: wrap;">
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
									<view v-if="isShowShop && data.shopId">
										<tui-button
											type="warning" width="180rpx" height="50rpx" margin="0 0 0 20rpx"
											shape="circle"
											@click="getBrandDetail(data.shopId)"
										>
											所属店铺
										</tui-button>
									</view>
								</view>
							</view>
						</view>
					</view>
				</template>
				<template #footer>
					<view style="display: flex;justify-content: flex-end;align-items: center;padding: 10rpx 20rpx;">
						<view v-if="isShowPurchase && (data.memberCardState === 1)">
							<tui-button
								type="blue" width="120rpx" height="50rpx" margin="0 0 0 20rpx"
								shape="circle"
								@click="$emit('purchase', data)"
							>
								购买
							</tui-button>
						</view>
						<view v-if="isShowSelect">
							<tui-button
								type="warning" width="120rpx" height="50rpx" margin="0 0 0 20rpx"
								shape="circle"
								@click="$emit('select', data)"
							>
								选择
							</tui-button>
						</view>
						<view v-if="isShopOperation" style="display: flex;align-items: center;">
							<tui-button
								type="warning" width="120rpx" height="50rpx" margin="0 0 0 20rpx"
								shape="circle"
								@click="go(`/another-tf/another-shop/member-card/shop-member-card-form?id=${data.id}`)"
							>
								编辑
							</tui-button>
							<tui-button
								v-if="data.memberCardState === 1" type="danger"
								width="120rpx" height="50rpx" margin="0 0 0 20rpx" shape="circle"
								@click="handleMemberCardOffShelf(data)"
							>
								下架
							</tui-button>
							<tui-button
								v-if="(data.memberCardState === 2) || (data.memberCardState === 3)" type="danger" width="120rpx" height="50rpx"
								margin="0 0 0 20rpx" shape="circle" @click="handleMemberCardIssue(data)"
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
			brandDetail: {}
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
		margin: 0;

		.tui-card-header {
			padding: 10rpx 20rpx;
		}
	}

	.member-card-info-popup {
		/deep/ .tui-popup-class.tui-bottom-popup {
			height: 65vh !important;
		}
	}
}
</style>
