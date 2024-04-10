<template>
	<view class="brand-info-container">
		<view style="display: flex;justify-content: space-between;align-items: center;font-size: 36upx;font-weight: bold;">
			<view>{{ brandDetail.shopName || '--' }}</view>
			<view style="display: flex;align-items: center;">
				<BeeIcon
					:name="brandDetail.ifCollect ? 'star-fill' : 'star'" :size="22"
					:color="brandDetail.ifCollect ? '#ff8000' : '#222229'" @click="handleCollectToggle"
				></BeeIcon>
				<BeeWxShare ref="beeWxShareRef" @click="handleShareServe()">
					<BeeIcon :size="22" color="#333333" name="share" style="margin-left: 24upx;"></BeeIcon>
				</BeeWxShare>
			</view>
		</view>

		<view style="display: flex;justify-content: space-between;align-items: center;">
			<view style="flex: 1;width: 0;margin-right: 10upx;">
				<view style="padding-top: 6upx;font-size: 24upx;">
					<tui-rate active="#e02208" :size="14" disabled :current="brandDetail.score || 0"></tui-rate>
					<text style="margin-left: 8upx;color: #e02208;font-size: 26upx;">{{ brandDetail.score || 0 }}</text>
					<text style="color: #777777;margin-left: 18upx;">销量 {{ brandDetail.monthlySales }}</text>
					<text style="color: #000000;margin-left: 16upx;">人均{{ brandDetail.perCapita || '：--' }}</text>
					<text style="color: #777777;margin-left: 20upx;">粉丝数 {{ brandDetail.fansNumber }}</text>
				</view>
				<view v-if="brandDetail.voucherReturn || brandDetail.isVoucher" class="tags">
					<view v-if="brandDetail.voucherReturn" class="tag">补贴代金券{{ brandDetail.voucherReturn || 0 }}%</view>
					<view v-if="brandDetail.isVoucher" class="tag">支持代金券</view>
				</view>
			</view>
			<!-- <view style="display: flex;flex-direction: column;align-items: center;" @click="handleOpenCustomerService">
				<tui-icon name="people-fill" :size="48" unit="rpx" color="#9aedbe"></tui-icon>
				<text style="font-size: 26upx;color: #8e8e8e;">联系商家</text>
				</view> -->
		</view>

		<view style="display: flex;align-items: center;margin-top: 10upx;">
			<BeeIcon name="clock" :size="18" color="#888889" style="width: fit-content;"></BeeIcon>
			<view style="margin-left: 18upx;font-size: 28upx;color: #222229;">营业状态</view>
			<view style="margin-left: 20upx;font-size: 28upx;color: #E02208;">{{ brandDetail.trade || '未知' }}</view>
			<view style="margin-left: 18upx;padding: 2upx 18upx;font-size: 24upx;background-color: #f5f4f6;">
				{{ brandDetail.startTime }} 至 {{ brandDetail.endTime }}
			</view>
		</view>

		<view v-if="brandDetail.shopLogo" style="margin-top: 22upx;">
			<!-- 轮播图 -->
			<swiper
				autoplay :interval="3000" circular :previous-margin="previousMargin"
				:next-margin="nextMargin"
				:duration="1000" style="height: 328upx;" @change="handleSwiperChange"
			>
				<swiper-item>
					<tui-lazyload-img
						mode="scaleToFill" width="600rpx" height="100%" radius="20upx"
						:src="common.seamingImgUrl(brandDetail.shopLogo)"
					></tui-lazyload-img>
				</swiper-item>
				<template v-if="brandDetail.advertisement">
					<swiper-item v-for="(item, index) in brandDetail.advertisement.split(',')" :key="index">
						<tui-lazyload-img
							mode="scaleToFill" width="600rpx" height="100%" radius="20upx"
							:src="common.seamingImgUrl(item)"
						></tui-lazyload-img>
					</swiper-item>
				</template>
			</swiper>
		</view>
		<!-- <scroll-view v-if="brandDetail.bgUrl" scroll-x="true">
			<view>
			<tui-lazyload-img
			v-for="(img, index) in JSON.parse(brandDetail.bgUrl)" :key="index"
			mode="scaleToFill" width="250rpx" height="210rpx"
			:radius="!index ? '20rpx 0 0 20rpx' : index === JSON.parse(brandDetail.bgUrl).length - 1 ? '0 20rpx 20rpx 0' : ''"
			:src="common.seamingImgUrl(img)"
			></tui-lazyload-img>
			</view>
			</scroll-view> -->

		<view class="address-info">
			<view class="address-detail-info">
				<view>
					<BeeIcon :size="18" color="#888889" name="gps"></BeeIcon>
				</view>
				<view class="address-text-wrapper">
					<view class="address-text">{{ brandDetail.shopAdress }}</view>
					<view style="font-weight: bold;color: #e02208;" class="address-text">
						距您{{ brandDetail.distance || 0 }}Km
					</view>
				</view>
			</view>
			<view class="op-menus">
				<BeeMakePhone :phone="brandDetail.chargePersonPhone">
					<view class="item">
						<BeeIcon :size="20" color="#e02208" name="voipphone"></BeeIcon>
						<text>电话</text>
					</view>
				</BeeMakePhone>
				<view class="item" @click="$emit('navgation')">
					<BeeIcon :size="20" color="#e02208" name="revoke"></BeeIcon>
					<text>去这</text>
				</view>
			</view>
		</view>

		<tui-bottom-popup :show="isShowCustomerServicePopup" @close="isShowCustomerServicePopup = false">
			<ATFCustomerService :shop-id="shopId" :data="customerServiceList"></ATFCustomerService>
		</tui-bottom-popup>

		<DragButton text="联系商家" is-dock exist-tab-bar @btnClick="handleOpenCustomerService"></DragButton>
	</view>
</template>

<script>
import { A_TF_MAIN } from '../../../../config'
import { updateCollectCancelApi, updateCollectToCollectApi } from '../../../../api/anotherTFInterface'
export default {
	name: 'BrandInfo',
	props: {
		brandDetail: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			previousMargin: '0',
			nextMargin: '80rpx',
			shopId: '',

			// 客服
			isShowCustomerServicePopup: false,
			customerServiceList: []
		}
	},

	watch: {
		brandDetail: {
			handler(newV) {
				if (newV.shopId) {
					this.shopId = newV.shopId
					// #ifdef H5
					this.$nextTick(() => {
						this.handleShareServe(true)
					})
					// #endif
				}
			},
			immediate: true,
			deep: true
		}
	},
	methods: {
		// 收藏店辅
		handleCollectToggle() {
			uni.showLoading()
			if (this.brandDetail.ifCollect == 0) {
				updateCollectToCollectApi({
					shopId: parseInt(this.brandDetail.shopId)
				})
					.then(() => {
						uni.hideLoading()
						this.$showToast('收藏成功')
						this.$emit('refresh')
					})
					.catch(() => {
						uni.hideLoading()
					})
			} else {
				updateCollectCancelApi({
					ids: [ this.brandDetail.collectId ]
				})
					.then(() => {
						uni.hideLoading()
						this.$showToast('取消收藏成功')
						this.$emit('refresh')
					})
					.catch(() => {
						uni.hideLoading()
					})
			}
		},

		// 分享
		handleShareServe(isQuit) {
			if (!this.isLogin()) return
			const data = {
				data: {
					title: `团蜂社区商圈 - ${this.brandDetail.shopName}`,
					desc: this.brandDetail.shopBrief,
					link: `${A_TF_MAIN}/#/another-tf/another-user/shop/shop-detail?shopId=${this.brandDetail.shopId}`,
					imageUrl: this.common.seamingImgUrl(this.brandDetail.shopLogo)
				},
				successCb: () => { },
				failCb: () => { }
			}
			this.$refs.beeWxShareRef.share(data, isQuit)
		},

		handleSwiperChange(e) {
			if (this.brandDetail.advertisement && this.brandDetail.advertisement.split(',').length === 1) {
				if (e.detail.current === 1) {
					this.nextMargin = '0'
					this.previousMargin = '80rpx'
				} else {
					this.nextMargin = '80rpx'
					this.previousMargin = '0'
				}
			}
		},

		// 打开客服
		async handleOpenCustomerService() {
			const res = await this.$store.dispatch('app/getCustomerServiceAction', {
				shopId: this.brandDetail.shopId
			})
			this.customerServiceList = res.data
			if (!this.customerServiceList.length) this.$showToast('暂无客服')
			else this.isShowCustomerServicePopup = true
		}
	}
}
</script>

<style lang="less" scoped>
.brand-info-container {
	// padding: 28upx 34upx;
	box-sizing: border-box;

	/deep/ .tui-popup-class.tui-bottom-popup {
		height: 85vh !important;
	}

	.tags {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		margin: 10upx 0 0 0;

		.tag {
			font-size: 26upx;
			margin-right: 12upx;
			margin-bottom: 10upx;
			padding: 4upx 12upx;
			background-color: #ff8000;
			color: #ffffff;
			border-radius: 10upx;
		}
	}

	.address-info {
		display: flex;
		align-items: center;
		width: 100%;
		margin-top: 24upx;

		.address-detail-info {
			flex: 1;
			display: flex;
			width: 0;
			font-size: 26upx;

			.address-text-wrapper {
				flex: 1;
				width: 0;
				margin-left: 10upx;

				.address-text {
					margin-bottom: 6upx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					color: #888889;
					font-weight: 500;
				}
			}
		}

		.op-menus {
			display: flex;
			align-items: center;

			.item {
				display: flex;
				align-items: center;
				flex-direction: column;
				margin-left: 30upx;

				text {
					font-size: 24upx;
					color: #888889;
					margin-top: 4upx;
					white-space: nowrap;
				}
			}
		}
	}

}
</style>
