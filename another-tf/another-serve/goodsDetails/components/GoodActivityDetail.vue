<template>
	<view class="good-activity-detail-container">
		<!-- 商品详情 -->
		<swiper
			style="width: 750rpx;height: 750rpx;" :indicator-dots="false" autoplay
			@change="(e) => swiperCurrent = e.detail.current"
		>
			<swiper-item v-for="(imgItem, index) in goodsDetail.images" :key="index">
				<image
					v-if="!isVideoSource(imgItem)" mode="aspectFit" class="default-img"
					style="width: 750rpx;height: 750rpx;"
					:src="common.seamingImgUrl(imgItem)"
				></image>
				<video v-else style="width: 750rpx; height: 750rpx;" :src="common.seamingImgUrl(imgItem)"></video>
			</swiper-item>
		</swiper>
		<view
			style="position: absolute;top: 680rpx;right: 40rpx;z-index: 99;padding: 4rpx 28rpx;font-size: 28rpx;color: #ffffff;background: rgba(0, 0, 0, 0.2);border-radius: 28rpx;"
		>
			{{ swiperCurrent + 1 }}/{{ goodsDetail.images.length }}
		</view>

		<!-- 分享 -->
		<view
			style="position: absolute;top: 50rpx;right: 0;z-index: 99;display: flex;justify-content: center;align-items: center;padding: 10rpx 34rpx;background-color: #FFFFFF;border-radius: 30rpx 0 0 30rpx;"
			@click="shareObj.actionShow = true"
		>
			<tui-icon :size="18" color="#141414" name="share-fill"></tui-icon>
			<view style="margin-left: 6rpx;font-size: 24rpx;">分享</view>
		</view>

		<view style="margin: 22rpx 28rpx 0;padding: 0 0 34rpx;background-color: #FFFFFF;border-radius: 16rpx;overflow: hidden;">
			<view>
				<view
					v-if="skuSelect.activityType === 0"
					style="display: flex;justify-content: space-between;align-items: center;padding: 30rpx 24rpx 16rpx;"
				>
					<view style="display: flex;align-items: flex-end;">
						<view style="font-size: 30rpx;color: #EA5C1E;">￥</view>
						<view style="margin-left: 2rpx;font-size: 46rpx;font-weight: bold;color: #EA5C1E;">{{ skuSelect.price || 0 }}</view>
						<view style="display: flex;flex-direction: column;margin-left: 20rpx;">
							<view
								v-if="skuSelect.price !== skuSelect.originalPrice"
								style="margin-left: 2rpx;font-size: 28rpx;color: #A0A0A0;text-decoration: line-through;"
							>
								￥ {{ skuSelect.originalPrice || 0 }}
							</view>
						</view>
					</view>
					<view style="font-size: 24rpx;color: #A0A0A0;">{{ goodsDetail.users || 0 }}人付款</view>
				</view>
				<view
					v-else-if="[1, 2, 3, 4, 5, 8, 9, 10, 11].includes(skuSelect.activityType)"
					style="display: flex;justify-content: space-between;align-items: center;padding: 22rpx 24rpx 16rpx;background: linear-gradient(280deg, #FA5858 0%, #E51D1D 100%);"
				>
					<view style="display: flex;flex-direction: column;">
						<view style="display: flex;align-items: center;margin-bottom: 4rpx;">
							<view style="font-size: 30rpx;color: #ffffff;">￥</view>
							<view style="margin-left: 4rpx;font-size: 42rpx;color: #ffffff;">{{ skuSelect.price || 0 }}</view>
							<view
								style="margin-left: 6rpx;font-size: 30rpx;color: #f7acac;text-decoration: line-through;"
							>
								￥{{ skuSelect.originalPrice || 0 }}
							</view>
						</view>
						<ATFActivityImage
							:type="skuSelect.activityType" :show-icon="[1, 2, 3, 4, 5, 8, 9, 10].includes(skuSelect.activityType)"
							background-color="transparent" color="#ffffff" icon-color="#ffffff"
							:text="[ 11 ].includes(skuSelect.activityType) ? goodsDetail.activityName : ''"
							:font-size="[ 11 ].includes(skuSelect.activityType) ? '30rpx' : '34rpx'"
							:icon-size="32" bold italic
						></ATFActivityImage>
					</view>
					<view v-if="[1, 2, 3, 4, 5, 10, 11].includes(skuSelect.activityType)">
						<view v-if="(skuSelect.ifEnable === 0)" style="text-align: right;">
							<view style="padding-bottom: 18rpx;font-size: 26rpx;color: #ffffff;">距离结束剩余</view>
							<tui-countdown
								:width="36" :height="36" :size="26" :colon-size="26"
								colon-color="#ffffff"
								color="#ffffff" border-color="transparent" background-color="#3f2323" days
								:is-colon="false"
								:time="Math.floor((Date.parse(skuSelect.endTime) - Date.now()) / 1000)"
								@end="handleEndActivity"
							></tui-countdown>
						</view>
						<view v-else style="margin-right: 20rpx;font-size: 28rpx;">
							即将开始：{{ skuSelect.startTime }}
						</view>
					</view>
					<view v-else-if="[ 8 ].includes(skuSelect.activityType)">{{ goodsDetail.sceneName }}</view>
				</view>
			</view>
			<view style="padding: 0 24rpx;">
				<view style="display: flex;justify-content: space-between;align-items: center;padding: 10rpx 12rpx 0;">
					<view
						style="flex: 1;width: 0;font-weight: bold;overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
					>
						{{ goodsDetail.productName }}
					</view>
					<view
						v-if="goodsDetail.shopId && goodsDetail.shopName && !goodsDetail.shopName.startsWith('团蜂')"
						style="margin: 0 0 0 15rpx;display: flex;flex-direction: column;justify-content: center;align-items: center;"
						@click="go(`/another-tf/another-user/shop/shop-detail?shopId=${goodsDetail.shopId}`)"
					>
						<tui-icon :size="24" color="#333333" name="shop"></tui-icon>
						<view style="font-size: 22rpx;">店铺</view>
					</view>
				</view>
				<view
					v-if="goodsDetail.productBrief"
					style="display: flex;align-items: center;padding-top: 10rpx;font-size: 24rpx;"
				>
					<view style="color: #3D3D3D;">卖点</view>
					<view style="flex: 1;margin-left: 20rpx;color: #EA5C1E;">{{ goodsDetail.productBrief }}</view>
				</view>
				<view style="padding-top: 10rpx;">
					<view
						v-if="skuSelect.beeCoin"
						style="padding: 14rpx 20rpx;margin: 10rpx 6rpx 0 0;background-color: #ffeee6;font-size: 26rpx;font-weight: bold;color: #EA5C1E;border-radius: 8rpx;"
					>
						赠送 {{ skuSelect.beeCoin }} 消费金
					</view>
					<view
						v-if="skuSelect.voucherId && skuSelect.voucherPrice"
						style="padding: 14rpx 20rpx;margin: 10rpx 6rpx 0 0;background-color: #ffeee6;font-size: 26rpx;font-weight: bold;color: #EA5C1E;border-radius: 8rpx;"
					>
						可使用{{ skuSelect.voucherPrice }}代金券抵扣
					</view>
					<view
						v-if="skuSelect.presenterVoucher"
						style="padding: 14rpx 20rpx;margin: 10rpx 6rpx 0 0;background-color: #ffeee6;font-size: 26rpx;font-weight: bold;color: #EA5C1E;border-radius: 8rpx;"
					>
						赠送 {{ skuSelect.price
							? `${(Number.parseFloat(skuSelect.presenterVoucher / skuSelect.price).toFixed(3) * 1000) / 10}%`
							: skuSelect.presenterVoucher }} 代金券
					</view>
				</view>
				<view
					v-if="goodsDetail.markTools.length || goodsDetail.shopMarkTools.length"
					style="display: flex;justify-content: space-between;align-items: center;margin-top: 10rpx;padding: 8rpx 0 0;border-top: 2rpx solid #EDEDED;"
					@click="$refs.refCouponPopup && ($refs.refCouponPopup.showActivity = true)"
				>
					<view style="font-size: 28rpx;color: #999999;">优惠</view>
					<view style="display: flex;justify-content: space-between;align-items: center;margin-left: 30rpx;">
						<view style="font-size: 22rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
							{{ goodsDetail.couponSplicing }}
						</view>
						<view style="display: flex;align-items: center;">
							<view style="font-size: 28rpx;color: #C5AA7B;">领券</view>
							<tui-icon :size="20" color="#baa174" name="arrowright" margin="0 0 0 10rpx"></tui-icon>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!--  分享弹出  -->
		<tui-actionsheet
			:show="shareObj.actionShow" :item-list="shareObj.actionList.map(i => ({ ...i, color: '#000000' }))"
			@click="handleShareSelect" @cancel="shareObj.actionShow = false"
		>
		</tui-actionsheet>

		<ShareSpell ref="refShareSpell" :url="shareObj.url" :img="shareObj.image" :title="shareObj.title"></ShareSpell>

		<!-- 优惠券选择器 -->
		<CouponPopup
			ref="refCouponPopup" :platform-mark-tools="goodsDetail.markTools"
			:shop-mark-tools="goodsDetail.shopMarkTools" :shop-id="goodsDetail.shopId"
		></CouponPopup>
	</view>
</template>

<script>
import CouponPopup from './CouponPopup'
import { isVideoSource } from '../../../../utils'
import { getProductSharePicApi } from '../../../../api/anotherTFInterface'

export default {
	name: 'GoodActivityDetail',
	components: {
		CouponPopup
	},
	props: {
		// 商品信息
		goodsDetail: {
			type: Object,
			default: () => ({})
		},
		// 当前选中的sku
		skuSelect: {
			type: Object,
			default: () => ({})
		}
	},
	data() {
		return {
			// 分享
			shareObj: {
				url: '',
				image: '',
				title: '好友分享了一个很棒的商品',
				actionList: [
					{ text: '生成分享海报' },
					{ text: '邀请好友' }
				],
				actionShow: false
			},
			swiperCurrent: 0
		}
	},
	methods: {
		isVideoSource,

		handleEndActivity() {
			uni.showToast({
				title: '活动结束',
				duration: 2000,
				icon: 'none'
			})
			this.$emit('activityEnd')
		},

		/**
		 * 海报分享
		 */

		sharePoster() {
			let system
			// #ifdef APP
			system = 1
			// #endif
			// #ifdef H5
			system = 3
			// #endif
			// #ifdef MP-WEIXIN
			system = 2
			// #endif
			// #ifdef MP-ALIPAY
			system = 4
			// #endif
			uni.showLoading()
			getProductSharePicApi({
				productId: this.goodsDetail.productId,
				shopId: this.goodsDetail.shopId,
				skuId: this.skuSelect.skuId,
				terminal: system
			}).then((res) => {
				uni.hideLoading()
				// 推广商品
				uni.navigateTo({
					url: `/another-tf/another-serve/shareProduct/index?shareType=2&shopId=${this.goodsDetail.shopId}&productId=${this.goodsDetail.productId}&skuId=${this.skuSelect.skuId}&shareImg=${res.data}`
				})
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		handleShareSelect(e) {
			if (e.index === 0) {
				this.sharePoster()
			} else {
				this.shareObj.url = `/another-tf/another-serve/goodsDetails/index?shopId=${this.goodsDetail.shopId}&productId=${this.goodsDetail.productId}&skuId=${this.skuSelect.skuId}`
				this.shareObj.image = this.goodsDetail.images[0]
				this.shareObj.title = `【shop】好友分享了一个好物给您！${this.goodsDetail.productName}-￥${this.goodsDetail.price}`
				this.$refs.refShareSpell.shareShow = true
			}
		}
	}
}
</script>

<style lang="less" scoped>
.good-activity-detail-container {
	position: relative;
	box-sizing: border-box;

	/deep/ .tui-countdown-box {
		.tui-colon-pad {
			padding: 0 6rpx !important;
		}
	}

	/deep/ .tui-actionsheet {
		z-index: 996;
	}

	/deep/ .tui-actionsheet-mask {
		z-index: 995;
	}
}
</style>
