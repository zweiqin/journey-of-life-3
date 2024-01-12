<template>
	<view class="good-activity-detail-container">
		<!-- 商品详情 -->
		<swiper class="goodsImgswiper-box " :indicator-dots="true" :autoplay="true">
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
		<view class="goodgDes-box flex-start flex-column">
			<view v-if="skuSelect.activityType === 0" class="flex-items flex-sp-between">
				<view class="flex-items">
					<label class="fs36 font-color-C83732">¥</label>
					<label class="fs36 fs-bold font-color-C83732 mar-left-10">{{ skuSelect.price || 0 }}</label>
					<view class="flex-column-plus mar-left-20">
						<label
							v-if="skuSelect.price !== skuSelect.originalPrice"
							class="fs24 font-color-999 discountsPriceLine mar-left-20"
						>
							¥ {{ skuSelect.originalPrice || 0 }}
						</label>
					</view>
				</view>
				<label class="fs24 font-color-999">{{ goodsDetail.users || 0 }}人付款</label>
			</view>
			<view v-else-if="skuSelect.activityType === 8">
				<view class="flex-row-plus flex-items-plus">
					<label class="fs30 font-color-FFF">¥</label>
					<label class="fs42 mar-left-5 font-color-FFF">{{ skuSelect.price || 0 }}</label>
					<label class="fs28 mar-left-10 discountsPriceLine font-color-CCC">
						¥
						{{ skuSelect.originalPrice || 0 }}
					</label>
				</view>
				<view class="sceneNameBox">{{ goodsDetail.sceneName }}</view>
			</view>
			<view v-else class="seckill-box">
				<view v-if="skuSelect.activityType === 9" class="flex-items flex-sp-between">
					<view class="vipImg flex-items">
						<image class="vip-icon" src="../../../../static/images/new-business/shop/vipDetail.png" mode="">
						</image>
					</view>
					<view class="flex-row-plus flex-items-plus mar-left-30 mar-top-10">
						<label class="fs30 font-color-FFF">¥</label>
						<label class="fs42 mar-left-5 font-color-FFF">{{ skuSelect.price || 0 }}</label>
						<label class="fs28 mar-left-10 discountsPriceLine font-color-999">
							¥
							{{ skuSelect.originalPrice || 0 }}
						</label>
					</view>
				</view>
				<view v-else class="flex-items flex-row flex-sp-between">
					<view class="flex-column-plus">
						<image
							v-if="[2, 4].includes(skuSelect.activityType)" class="seckill-icon"
							src="../../../../static/images/new-business/shop/seckillicon.png" mode=""
						></image>
						<image
							v-if="[3, 5].includes(skuSelect.activityType)" class="discount-icon"
							src="../../../../static/images/new-business/shop/discounticon.png" mode=""
						></image>
						<image
							v-if="skuSelect.activityType === 1" class="spell-icon"
							src="../../../../static/images/new-business/shop/spellicon.png" mode=""
						></image>
						<view class="flex-row-plus flex-items mar-top-10">
							<label class="fs30 font-color-FFF">¥</label>
							<label class="fs42 mar-left-5 font-color-FFF">{{ skuSelect.price || 0 }}</label>
							<label class="fs28 mar-left-10 discountsPriceLine font-color-999">
								¥
								{{ skuSelect.originalPrice || 0 }}
							</label>
						</view>
					</view>
					<view v-if="[1, 2, 3, 4, 5].includes(skuSelect.activityType)" class="countdown flex-column-plus">
						<view v-if="skuSelect.ifEnable === 0">
							<label class="fs28">距离结束剩余</label>
							<view class="flex-row-plus fs34 flex-items-plus mar-top-10">
								<view class="countdown-box flex-items-plus">{{ activeTimeObj.day }}</view>
								<view class="font-color-999">天</view>
								<view class="countdown-box flex-items-plus">{{ activeTimeObj.hour }}</view>
								<view class="font-color-999">:</view>
								<view class="countdown-box flex-items-plus">{{ activeTimeObj.min }}</view>
								<view class="font-color-999">:</view>
								<view class="countdown-box flex-items-plus">{{ activeTimeObj.sec }}</view>
							</view>
						</view>
						<view v-else>
							<label class="fs28 mar-right-20">即将开始：{{ skuSelect.startTime }}</label>
						</view>
					</view>
				</view>
			</view>
			<view style="display: flex;align-items: center;flex-wrap: wrap;">
				<text
					v-if="skuSelect.voucherId"
					style="padding: 6upx 12upx;background-color: #f0f0f0;font-size: 28upx;color: #fa5151;border-radius: 22upx;"
				>
					可使用{{ skuSelect.voucherPrice }}代金券抵扣
				</text>
				<text
					v-if="skuSelect.presenterVoucher"
					style="margin-left: 12upx;padding: 6upx 12upx;background-color: #f0f0f0;font-size: 28upx;color: #fa5151;border-radius: 22upx;"
				>
					赠送 {{ skuSelect.presenterVoucher }} 代金券
				</text>
			</view>
			<view class="nameContainer">
				<view class="goodsName-box overflowNoDot mar-top-30 mar-left-30">
					<label class="goodsName fs32 mar-left-20 ">{{ goodsDetail.productName }}</label>
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
			ref="refCouponPopup" :platform-mark-tools="goodsDetail.shopMarkTools"
			:shop-mark-tools="goodsDetail.shopMarkTools"
		></CouponPopup>
	</view>
</template>

<script>
import CouponPopup from './CouponPopup'
import { timeFormatting, isVideoSource } from '../../../../utils'
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
			// 活动倒计时
			timeDifference: 0,
			activeTimeObj: {
				day: '00',
				hour: '00',
				min: '00',
				sec: '00'
			},
			countdownInterval: null,
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
	watch: {
		skuSelect: {
			handler(newVal) {
				if ([1, 2, 3, 4, 5].includes(newVal.activityType) && (newVal.ifEnable === 0)) {
					this.$refs.goodActivityDetail.handleGetCountDownNumber(newVal.endTime)
				}
			},
			immediate: false,
			deep: true
		}
	},
	methods: {
		isVideoSource,

		/**
		 * 初始化活动倒计时
		 * @param endTimestamp
		 */

		handleGetCountDownNumber(endTimestamp) {
			// 与当前时间的时间差（秒）
			this.timeDifference = (new Date(endTimestamp.substring(0, 19).replace(/-/g, '/')).getTime() - new Date().getTime()) / 1000
			this.activeTimeObj = timeFormatting(this.timeDifference)
			this.handleCountDown()
		},

		/**
		 * 开始倒计时
		 */

		handleCountDown() {
			if (this.countdownInterval) {
				return
			}
			this.countdownInterval = setInterval(() => {
				if (this.timeDifference <= 0) {
					clearInterval(this.countdownInterval)
					uni.showToast({
						title: '活动结束',
						duration: 2000,
						icon: 'none'
					})
					this.$emit('activityEnd')
				} else {
					this.timeDifference--
					this.activeTimeObj = timeFormatting(this.timeDifference)
				}
			}, 1000)
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

			.goodsName-box {
				width: 677upx;
			}

			.collectBox {
				width: 80rpx;
				margin: 0 30rpx 0 15rpx;
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

	.seckill-box {
		width: 100%;
		background: url("../../../../static/images/new-business/shop/storeTop_Img.png") no-repeat left top;

		.seckill-icon {
			width: 187rpx;
			height: 41rpx;
			background-size: contain;
		}

		.vip-icon {
			width: 187rpx;
			height: 41rpx;
			background-size: contain;
		}

		.discount-icon {
			width: 187rpx;
			height: 41rpx;
			background-size: contain;
		}

		.spell-icon {
			width: 182rpx;
			height: 37rpx;
			background-size: contain;
			margin-bottom: 20rpx;
		}

		.countdown {
			text-align: center;

			label {
				text-align: center;
				color: #CCCCCC;
			}
		}

		.countdown-box {
			padding: 0 8rpx;
			height: 48rpx;
			color: #FFEBC4;
			background-color: #525252;
			margin: 10rpx;
		}
	}
}
</style>
