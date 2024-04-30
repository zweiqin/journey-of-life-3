<template>
	<view class="good-activity-detail-container">
		<!-- 商品详情 -->
		<swiper class="goodsImgswiper-box " indicator-dots autoplay>
			<swiper-item v-for="(imgItem, index) in goodsDetail.images" :key="index">
				<image
					v-if="!isVideoSource(imgItem)" mode="aspectFit" class="goodsImg default-img"
					:src="common.seamingImgUrl(imgItem)"
				></image>
				<video v-else style="width: 750upx; height: 750upx;" :src="common.seamingImgUrl(imgItem)"></video>
			</swiper-item>
		</swiper>
		<!-- 分享 -->
		<view class="share-box flex-items-plus" @click="shareObj.actionShow = true">
			<tui-icon :size="18" color="#141414" name="share-fill"></tui-icon>
			<label class="fs24 mar-left-5">分享</label>
		</view>
		<view class="goodgDes-box">
			<view>
				<view v-if="skuSelect.activityType === 0" class="flex-items flex-sp-between">
					<view class="flex-items">
						<label class="fs36 font-color-C83732">￥</label>
						<label class="fs36 fs-bold font-color-C83732 mar-left-10">{{ skuSelect.price || 0 }}</label>
						<view class="flex-column-plus mar-left-20">
							<label
								v-if="skuSelect.price !== skuSelect.originalPrice"
								class="fs24 font-color-999 discountsPriceLine mar-left-20"
							>
								￥ {{ skuSelect.originalPrice || 0 }}
							</label>
						</view>
					</view>
					<label class="fs24 font-color-999">{{ goodsDetail.users || 0 }}人付款</label>
				</view>
				<view v-else-if="[1, 2, 3, 4, 5, 8, 9, 10].includes(skuSelect.activityType)" style="background-color: #333333;">
					<view class="flex-items flex-row flex-sp-between">
						<view class="flex-column-plus">
							<ATFActivityImage
								:type="skuSelect.activityType" show-icon background-color="transparent"
								font-size="40rpx" bold italic :icon-size="28"
							></ATFActivityImage>
							<view class="flex-row-plus flex-items mar-top-10">
								<label class="fs30 font-color-FFF">￥</label>
								<label class="fs42 mar-left-5 font-color-FFF">{{ skuSelect.price || 0 }}</label>
								<label class="fs28 mar-left-10 discountsPriceLine font-color-999">
									￥{{ skuSelect.originalPrice || 0 }}
								</label>
							</view>
						</view>
						<view v-if="[1, 2, 3, 4, 5, 10].includes(skuSelect.activityType)">
							<view v-if="(skuSelect.ifEnable === 0)" style="text-align: center;">
								<view style="padding-bottom: 10rpx;font-size: 28rpx;color: #cccccc;">距离结束剩余</view>
								<tui-countdown
									:width="42" :height="42" :size="30" :colon-size="30"
									colon-color="#999999"
									color="#FFEBC4" border-color="transparent" background-color="#525252" days
									:is-colon="false"
									:time="Math.floor((Date.parse(skuSelect.endTime) - Date.now()) / 1000)"
									@end="handleEndActivity"
								></tui-countdown>
							</view>
							<view v-else>
								<label class="fs28 mar-right-20">即将开始：{{ skuSelect.startTime }}</label>
							</view>
						</view>
						<view v-else-if="[ 8 ].includes(skuSelect.activityType)">{{ goodsDetail.sceneName }}</view>
					</view>
				</view>
			</view>
			<view style="display: flex;align-items: center;flex-wrap: wrap;margin-top: 10rpx;">
				<view
					v-if="skuSelect.beeCoin"
					style="width: fit-content;padding: 6upx 12upx;margin: 10upx 6upx 0 0;background-color: #f0f0f0;font-size: 28upx;color: #fa5151;border-radius: 22upx;"
				>
					赠送 {{ skuSelect.beeCoin }} 交易金
				</view>
				<view
					v-if="skuSelect.voucherId && skuSelect.voucherPrice"
					style="width: fit-content;padding: 6upx 12upx;margin: 10upx 6upx 0 0;background-color: #f0f0f0;font-size: 28upx;color: #fa5151;border-radius: 22upx;"
				>
					可使用{{ skuSelect.voucherPrice }}代金券抵扣
				</view>
				<view
					v-if="skuSelect.presenterVoucher"
					style="width: fit-content;padding: 6upx 12upx;margin: 10upx 6upx 0 0;background-color: #f0f0f0;font-size: 28upx;color: #fa5151;border-radius: 22upx;"
				>
					赠送 {{ skuSelect.price
						? `${(Number.parseFloat(skuSelect.presenterVoucher / skuSelect.price).toFixed(3) * 1000) / 10}%`
						: skuSelect.presenterVoucher }} 代金券
				</view>
			</view>
			<view class="nameContainer">
				<view
					style="flex: 1;width: 0;overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
				>
					{{ goodsDetail.productName }}
				</view>
				<view class="collectBox " @click="handleCollect">
					<tui-icon v-if="goodsDetail.ifCollect === 1" :size="24" color="#c5aa7b" name="star-fill"></tui-icon>
					<tui-icon v-else :size="24" color="#333333" name="star"></tui-icon>
					<label class="fs22">收藏</label>
				</view>
			</view>
			<view
				v-if="goodsDetail.markTools.length > 0 || goodsDetail.shopMarkTools.length > 0"
				class="activity-box mar-top-10" @click="$refs.refCouponPopup && ($refs.refCouponPopup.showActivity = true)"
			>
				<label class="fs24 font-color-999">优惠</label>
				<view class="activity-content mar-left-30 flex-items flex-sp-between flex-row">
					<view class="fs20 overflow" style="width: 500rpx;">
						{{ goodsDetail.couponSplicing }}
					</view>
					<view class="flex-items">
						<label class="fs24 font-color-C5AA7B">领券</label>
						<tui-icon :size="24" color="#baa174" name="arrowright" margin="0 0 0 10upx"></tui-icon>
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

		<ShareSpell
			ref="shareSpell" :url="shareObj.url" :img="shareObj.image" :title="shareObj.title"
			@shareCancel="shareCancel"
		>
		</ShareSpell>

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
import { getProductSharePicApi, updateCollectCancelPUTApi, updateCollectToCollectApi } from '../../../../api/anotherTFInterface'

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
			}
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
		 * 收藏
		 */

		handleCollect() {
			if (this.goodsDetail.ifCollect === 0) {
				updateCollectToCollectApi({
					productId: parseInt(this.goodsDetail.productId)
				}).then((res) => {
					this.goodsDetail.ifCollect = 1
					uni.showToast({
						title: '收藏成功',
						icon: 'success'
					})
				})
			} else {
				updateCollectCancelPUTApi({
					ids: [ this.goodsDetail.productId ]
				}).then((res) => {
					this.goodsDetail.ifCollect = 0
					uni.showToast({
						title: '取消收藏成功',
						icon: 'success'
					})
				})
			}
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
		shareCancel() {
			this.$refs.shareSpell.shareShow = false
		},
		handleShareSelect(e) {
			if (e.index === 0) {
				this.sharePoster()
			} else {
				this.shareObj.url = '/another-tf/another-serve/goodsDetails/index?shopId=' + this.goodsDetail.shopId + '&productId=' + this.goodsDetail.productId + '&skuId=' + this.skuSelect.skuId
				this.shareObj.image = this.goodsDetail.images[0]
				this.shareObj.title = `【shop】好友分享了一个好物给您！${this.goodsDetail.productName} ￥${this.goodsDetail.price} `
				this.$refs.shareSpell.shareShow = true
			}
		}
	}
}
</script>

<style lang="less" scoped>
.good-activity-detail-container {
	box-sizing: border-box;

	/deep/ .tui-countdown-box {
		.tui-colon-pad {
			padding: 0 6rpx !important;
		}
	}

	.goodsImgswiper-box {
		width: 750upx;
		height: 750upx;

		.goodsImg {
			width: 750upx;
			height: 750upx;
		}
	}

	.share-box {
		width: 200upx;
		height: 60upx;
		background-color: #FFFFFF;
		border-radius: 30upx 0 0 30upx;
		position: absolute;
		top: 110upx;
		right: 0;
		z-index: 99;
	}

	.goodgDes-box {
		background-color: #FFFFFF;
		padding: 30upx 25upx 25upx;

		.nameContainer {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10rpx 12rpx 0;

			.collectBox {
				width: 80rpx;
				margin: 0 0 0 15rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
		}

		.activity-box {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: flex-end;
			border-top: 1upx solid #EDEDED;

			.activity-content {
				width: 614upx;
				padding-top: 20upx;
			}
		}
	}
}
</style>
