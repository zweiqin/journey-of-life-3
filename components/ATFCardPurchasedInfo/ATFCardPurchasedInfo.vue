<template>
	<view class="purchased-info-container">
		<tui-card :title="{ text: `购买用户：${data.purchaseName}` }" :tag="{ text: `ID：${data.cardOrderId || '--'}` }">
			<template #body>
				<view style="padding: 0 20rpx;">
					<view style="font-size: 30rpx;">
						<!-- <view style="display: flex;justify-content: space-between;align-items: center;padding: 10rpx 0 0;">
							<view style="color: #666666;">
							会员卡订单ID：{{ data.cardOrderId }}
							</view>
							<view
							style="flex: 1;width: 0;margin-left: 14rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
							>
							购买用户：{{ data.purchaseName || '--' }}
							</view>
							</view> -->
						<view>
							<view v-if="isShowWriteOff && data.cardNum" style="display: flex;align-items: center;padding: 10rpx 0 0;">
								<view>
									核销码：{{ data.cardNum }}
								</view>
								<tui-button
									type="warning" width="120rpx" height="50rpx"
									margin="0 0 0 20rpx"
									shape="circle" @click="$copy(data.cardNum)"
								>
									复制
								</tui-button>
								<tui-button
									type="warning" width="200rpx" height="50rpx" margin="0 0 0 20rpx"
									shape="circle"
									@click="getCode"
								>
									核销二维码
								</tui-button>
							</view>
							<view style="display: flex;align-items: center;padding: 10rpx 0 0;">
								<view>商家：{{ data.shopName || '--' }}</view>
								<tui-button
									v-if="data.shopId" type="warning" width="120rpx" height="50rpx"
									margin="0 20rpx 0"
									shape="circle" @click="getBrandDetail(data.shopId)"
								>
									详情
								</tui-button>
							</view>
						</view>
					</view>

					<view
						v-if="data.cardId || data.cardAmount || data.cardNum"
						style="margin-top: 12rpx;padding-top: 12rpx;border-top: 2rpx solid #dddddd;"
					>
						<view style="display: flex;justify-content: space-between;align-items: center;flex-wrap: wrap;">
							<view style="display: flex;align-items: center;">
								<view style="font-weight: bold;">
									<text>关联会员卡</text>
									<text v-if="data.status === 2">（已禁用）</text>
								</view>
								<tui-button
									v-if="data.cardId" type="warning" width="120rpx" height="50rpx"
									margin="0 20rpx 0"
									shape="circle" @click="getMemberCardInfo(data.cardId)"
								>
									详情
								</tui-button>
							</view>
							<view style="display: flex;align-items: center;">
								<text>余额：</text>
								<text style="font-weight: bold;color: #e02208;">
									￥{{ typeof data.cardAmount === 'number' ? data.cardAmount : '--' }}
								</text>
							</view>
						</view>
						<view style="padding: 6rpx 0 0;font-size: 28rpx;">
							<view style="display: flex;justify-content: space-between;align-items: center;flex-wrap: wrap;">
								<view>名称：{{ data.cardName || '--' }}</view>
								<view>
									<text v-if="data.memberCardType === 1">消费卡</text>
									<text v-else-if="data.memberCardType === 2">次数卡</text>
									<text v-else>--</text>
								</view>
							</view>
							<view style="display: flex;justify-content: space-between;align-items: center;">
								<view style="display: flex;align-items: center;">
									<text>售价：</text>
									<text style="font-weight: bold;color: #e02208;">
										￥{{ typeof data.cardDiscountedPrice === 'number' ? data.cardDiscountedPrice : '--' }}
									</text>
								</view>
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
							</view>
							<view v-if="data.startTime" style="display: flex;justify-content: space-between;">
								<text>有效期开始日期：</text>
								<text>{{ data.startTime }}</text>
							</view>
							<view v-if="data.endTime" style="display: flex;justify-content: space-between;">
								<text>有效期结束日期：</text>
								<text>{{ data.endTime }}</text>
							</view>
							<view style="display: flex;justify-content: space-between;align-items: center;padding: 6rpx 0 0;">
								<view>推广用户数据：{{ data.cardPromoter }}</view>
								<view
									v-if="(data.cardEntryList && data.cardEntryList.length) || (data.cardOutgoingList && data.cardOutgoingList.length)"
									style="flex: 1;display: flex;justify-content: flex-end;"
								>
									<tui-button
										type="warning" width="200rpx" height="50rpx" margin="0 0 0 20rpx"
										shape="circle"
										@click="(popupType = 'accountPopup') && (isShowPopup = true)"
									>
										入账和出账
									</tui-button>
								</view>
							</view>
						</view>
					</view>

					<view
						v-if="data.buyerUserId || data.name || data.phone"
						style="margin-top: 12rpx;padding-top: 12rpx;border-top: 2rpx solid #dddddd;"
					>
						<view style="display: flex;align-items: center;">
							<view style="font-weight: bold;">关联用户</view>
							<tui-button
								v-if="data.buyerUserId" type="warning" width="120rpx" height="50rpx"
								margin="0 20rpx 0"
								shape="circle" @click="getUserInfo(data.buyerUserId)"
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
									:src="common.seamingImgUrl(data.headImage) || require('../../static/images/new-user/default-user-avatar.png')"
								>
								</image>
								<text style="margin-left: 34rpx;font-size: 34rpx;">
									{{ data.name || '--' }}
								</text>
							</view>
							<view v-if="data.phone" style="flex: 1;display: flex;justify-content: flex-end;">
								<BeeMakePhone :phone="data.phone">
									<view style="display: flex;align-items: center;">
										<tui-icon name="voipphone" :size="34" unit="rpx" color="#e02208" margin="0"></tui-icon>
										<text style="color: #e02208;">{{ data.phone }}</text>
									</view>
								</BeeMakePhone>
							</view>
						</view>
					</view>
					<view
						v-if="data.promoterUserId || data.promotionName || data.promotionPhone || data.promotionCommission"
						style="margin-top: 12rpx;padding-top: 12rpx;border-top: 2rpx solid #dddddd;"
					>
						<view style="display: flex;justify-content: space-between;align-items: center;">
							<view style="display: flex;align-items: center;">
								<view style="font-weight: bold;">推广用户</view>
								<tui-button
									v-if="data.promoterUserId" type="warning" width="120rpx" height="50rpx"
									margin="0 20rpx 0"
									shape="circle" @click="getUserInfo(data.promoterUserId)"
								>
									详情
								</tui-button>
							</view>
							<view style="display: flex;align-items: center;">
								<text>佣金：</text>
								<text style="font-weight: bold;color: #e02208;">
									￥{{ typeof data.promotionCommission === 'number' ? data.promotionCommission : '--' }}
								</text>
							</view>
						</view>
						<view
							style="display: flex;justify-content: space-between;align-items: center;flex-wrap: wrap;padding: 6rpx 0 0;"
						>
							<view style="flex: 1;display: flex;align-items: center;">
								<image
									style="width: 80rpx;height: 80rpx;border-radius: 50%;" mode="aspectFit"
									:src="common.seamingImgUrl(data.promotionHeadImage) || require('../../static/images/new-user/default-user-avatar.png')"
								>
								</image>
								<text style="margin-left: 34rpx;font-size: 34rpx;">
									{{ data.promotionName || '--' }}
								</text>
							</view>
							<view v-if="data.promotionPhone" style="flex: 1;display: flex;justify-content: flex-end;">
								<BeeMakePhone :phone="data.promotionPhone">
									<view style="display: flex;align-items: center;">
										<tui-icon name="voipphone" :size="34" unit="rpx" color="#e02208" margin="0"></tui-icon>
										<text style="color: #e02208;">{{ data.promotionPhone }}</text>
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
							<text>{{ data.createTime }}</text>
						</view>
						<view v-if="data.jsonRemark">备注：{{ data.createTime }}</view>
					</view>
				</view>
			</template>
			<template #footer>
				<view style="display: flex;justify-content: flex-end;align-items: center;padding: 10rpx 20rpx;">
					<tui-button
						v-if="detailType"
						type="blue" width="120rpx" height="50rpx" margin="0 0 0 20rpx"
						shape="circle"
						@click="go(`/another-tf/another-user/member-card/user-purchased-detail?id=${data.cardOrderId}&type=${detailType}`)"
					>
						详情
					</tui-button>
				</view>
			</template>
		</tui-card>

		<tui-bottom-popup
			:z-index="997" :mask-z-index="996" :show="isShowPopup"
			@close="() => {}"
		>
			<scroll-view scroll-y style="height: 100%;">
				<view>
					<view style="display: flex;justify-content: flex-end;padding: 12rpx;border-bottom: solid 1rpx #EEEEEE;">
						<tui-icon name="close" :size="50" unit="rpx" color="#999999" @click="(isShowPopup = false) || (popupType = '')"></tui-icon>
					</view>
					<view v-if="popupType === 'userPopup'" style="padding: 40rpx 0 0;">
						<ATFUserDetailInfo :data="userInfo"></ATFUserDetailInfo>
					</view>
					<view v-else-if="popupType === 'brandPopup'" style="padding: 40rpx 30rpx 14rpx;">
						<ATFBrandInfo
							:brand-detail="brandDetail" :is-show-collect="false" :is-show-share="false"
							:is-show-navigate="false" :is-show-service="false"
						></ATFBrandInfo>
					</view>
					<view v-else-if="popupType === 'memberCardPopup'" style="padding: 40rpx 0 0;">
						<ATFMemberCardInfo :data="memberCardInfo" :is-show-shop="false" :is-shop-operation="false">
						</ATFMemberCardInfo>
					</view>
					<view v-else-if="popupType === 'accountPopup'" style="padding: 10rpx 20rpx 0;">
						<tui-tabs
							style="width: 710rpx;padding: 0 0rpx 0 0rpx;overflow: hidden;" :slider-width="355" :padding="20"
							item-width="355rpx" selected-color="#333333" bold slider-bg-color="#cccccc"
							background-color="transparent"
							:tabs="[{ name: '入账' }, { name: '出账' }]" :current-tab="activeModeTab"
							@change="(e) => (activeModeTab = e.index)"
						></tui-tabs>
						<view style="margin-top: 20rpx;">
							<view v-if="activeModeTab === 0">
								<view v-if="data.cardEntryList && data.cardEntryList.length">
									<view v-for="(item, index) in data.cardEntryList" :key="index" style="padding-bottom: 20rpx;">
										<ATFMemberCardAccount :data="item" type="entry" :is-show-card="false" :is-show-shop="false">
										</ATFMemberCardAccount>
									</view>
								</view>
								<view v-else style="padding-bottom: 45rpx;">
									<tui-no-data :fixed="false" style="padding-top: 60rpx;">暂无入账内容~</tui-no-data>
								</view>
							</view>
							<view v-else-if="activeModeTab === 1">
								<view v-if="data.cardOutgoingList && data.cardOutgoingList.length">
									<view v-for="(item, index) in data.cardOutgoingList" :key="index" style="padding-bottom: 20rpx;">
										<ATFMemberCardAccount :data="item" type="outgoing" :is-show-card="false" :is-show-shop="false">
										</ATFMemberCardAccount>
									</view>
								</view>
								<view v-else style="padding-bottom: 45rpx;">
									<tui-no-data :fixed="false" style="padding-top: 60rpx;">暂无出账内容~</tui-no-data>
								</view>
							</view>
						</view>
					</view>
					<view v-else-if="popupType === 'memberCardWriteOff'" style="padding: 40rpx 0 0;">
						<view style="padding: 28rpx 0;margin: 0 100rpx;background-color: #ef530e;text-align: center;">
							<view style="font-size: 34rpx;font-weight: bold;color: #ffffff;">会员卡订单核销二维码</view>
							<view
								style="position: relative;width: 420rpx;height: 420rpx;margin: 42rpx auto 0;background-color: #ffffff;border-radius: 10rpx;overflow: hidden;box-sizing: border-box;"
							>
								<view style="position: absolute;left: 0;top: 0;width: 100%;height: 100%;box-sizing: border-box;">
									<view style="display: flex;align-items: center;justify-content: center;width: 100%;height: 100%;">
										<image
											:src="codePicUrl" style="width: 98%;height: 98%;" mode="widthFix"
										/>
									</view>
								</view>
							</view>
						</view>
						<!-- 生成二维码 -->
						<view>
							<uqrcode
								ref="uqrcode" class="generate-code-container" canvas-id="qrcode" :value="qrcodeUrl + createCode"
								@complete="handleCompleteCode"
							></uqrcode>
						</view>
					</view>
				</view>
			</scroll-view>
		</tui-bottom-popup>
	</view>
</template>

<script>
import { A_TF_MAIN } from '../../config'
import { getBandUserInfoApi, getIndexShopDetailApi, getByIdShopMemberCardApi } from '../../api/anotherTFInterface'

export default {
	name: 'ATFCardPurchasedInfo',
	props: {
		data: {
			type: Object,
			required: true
		},
		isShowWriteOff: {
			type: Boolean,
			default: true
		},
		detailType: {
			type: String,
			default: 'user'
		}
	},
	data() {
		return {
			isShowPopup: false,
			popupType: '',
			userInfo: { buyerUserId: '' },
			brandDetail: {},
			memberCardInfo: {},
			activeModeTab: 0,
			// 生成二维码
			createCode: '',
			qrcodeUrl: '',
			codePicUrl: ''
		}
	},
	methods: {
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
		},

		getCode() {
			uni.showLoading({
				title: '生成中...'
			})
			this.createCode = this.data.cardNum || ''
			this.qrcodeUrl = `${A_TF_MAIN}/#/pages/jump/jump?userId=${this.$store.getters.userInfo.buyerUserId}&type=memberCardWriteOff&code=${this.data.cardOrderId || ''}~${this.data.memberCardType || ''}~`
			this.popupType = 'memberCardWriteOff'
			this.isShowPopup = true
		},
		// 完成
		handleCompleteCode(e) {
			if (e.success) {
				this.$refs.uqrcode.toTempFilePath({
					success: (res) => {
						console.log(res)
						this.codePicUrl = res.tempFilePath
						uni.hideLoading()
					}
				})
			}
		}
	}
}
</script>

<style lang="less" scoped>
.purchased-info-container {
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

	.tui-tabs-view {
		/deep/ .tui-tabs-slider {
			margin-left: -20rpx;
		}
	}

	.generate-code-container {
		position: absolute;
		top: -10000rpx;
	}
}
</style>
