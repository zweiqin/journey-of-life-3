<template>
	<view class="brand-info-container" :style="{ padding }">
		<view style="display: flex;justify-content: space-between;align-items: center;font-size: 36rpx;font-weight: bold;">
			<view>{{ brandDetail.shopName || '--' }}</view>
			<view style="display: flex;align-items: center;">
				<BeeIcon
					v-if="isShowCollect"
					:name="brandDetail.ifCollect ? 'star-fill' : 'star'" :size="22"
					:color="brandDetail.ifCollect ? '#ff8000' : '#222229'" @click="handleCollectToggle"
				></BeeIcon>
				<BeeWxShare v-if="isShowShare" ref="beeWxShareRef" @click="handleShareServe()">
					<BeeIcon :size="22" color="#333333" name="share" style="margin-left: 24rpx;"></BeeIcon>
				</BeeWxShare>
			</view>
		</view>

		<view style="display: flex;justify-content: space-between;align-items: center;">
			<view style="flex: 1;width: 0;margin-right: 10rpx;">
				<view style="padding-top: 6rpx;font-size: 24rpx;">
					<tui-rate active="#e02208" :size="14" disabled :current="brandDetail.score || 0"></tui-rate>
					<text style="margin-left: 8rpx;color: #e02208;font-size: 26rpx;">{{ brandDetail.score || 0 }}</text>
					<text style="color: #777777;margin-left: 18rpx;">销量 {{ brandDetail.monthlySales }}</text>
					<text style="color: #000000;margin-left: 16rpx;">人均{{ brandDetail.perCapita || '：--' }}</text>
					<text style="color: #777777;margin-left: 20rpx;">粉丝数 {{ brandDetail.fansNumber }}</text>
				</view>
				<view v-if="(brandDetail.isBeeCoin === 1) || brandDetail.isVoucher || brandDetail.voucherReturn" class="tags">
					<view v-if="brandDetail.isBeeCoin === 1" class="tag">支持消费金</view>
					<view v-if="brandDetail.isVoucher" class="tag">支持代金券</view>
					<view v-if="brandDetail.voucherReturn" class="tag">补贴代金券{{ brandDetail.voucherReturn || 0 }}%</view>
				</view>
			</view>
			<!-- <view style="display: flex;flex-direction: column;align-items: center;" @click="handleOpenCustomerService">
				<tui-icon name="people-fill" :size="48" unit="rpx" color="#9aedbe"></tui-icon>
				<text style="font-size: 26rpx;color: #8e8e8e;">联系商家</text>
				</view> -->
		</view>

		<view style="display: flex;align-items: center;margin-top: 10rpx;">
			<BeeIcon name="clock" :size="18" color="#888889" style="width: fit-content;"></BeeIcon>
			<view style="margin-left: 18rpx;font-size: 28rpx;color: #222229;">营业状态</view>
			<view style="margin-left: 20rpx;font-size: 28rpx;color: #E02208;">{{ brandDetail.trade || '未知' }}</view>
			<view style="margin-left: 18rpx;padding: 2rpx 18rpx;font-size: 24rpx;background-color: #f5f4f6;">
				{{ brandDetail.startTime }} 至 {{ brandDetail.endTime }}
			</view>
		</view>

		<view v-if="brandDetail.shopLogo" style="margin-top: 22rpx;">
			<!-- 轮播图 -->
			<swiper
				autoplay :interval="3000" circular :previous-margin="previousMargin"
				:next-margin="nextMargin"
				:duration="1000" style="height: 328rpx;" @change="handleSwiperChange"
			>
				<swiper-item>
					<tui-lazyload-img
						mode="scaleToFill" width="600rpx" height="100%" radius="20rpx"
						:src="common.seamingImgUrl(brandDetail.shopLogo)"
					></tui-lazyload-img>
				</swiper-item>
				<template v-if="brandDetail.advertisement">
					<swiper-item v-for="(item, index) in brandDetail.advertisement.split(',')" :key="index">
						<tui-lazyload-img
							mode="scaleToFill" width="600rpx" height="100%" radius="20rpx"
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
				<view v-if="isShowNavigate" class="item" @click="$emit('navgation')">
					<BeeIcon :size="20" color="#e02208" name="revoke"></BeeIcon>
					<text>去这</text>
				</view>
			</view>
		</view>

		<view v-if="isShowService">
			<tui-bottom-popup :show="isShowCustomerServicePopup" @close="isShowCustomerServicePopup = false">
				<ATFCustomerService :shop-id="shopId" :data="customerServiceList"></ATFCustomerService>
			</tui-bottom-popup>

			<DragButton text="联系商家" is-dock exist-tab-bar @btnClick="handleOpenCustomerService"></DragButton>
		</view>
	</view>
</template>

<script>
import { A_TF_MAIN } from '../../config'
import { updateCollectCancelApi, updateCollectToCollectApi } from '../../api/anotherTFInterface'
export default {
	name: 'ATFBrandInfo',
	props: {
		brandDetail: {
			type: Object,
			required: true
		},
		padding: {
			type: String,
			default: '0'
		},
		isSelection: {
			type: Boolean,
			default: false
		},
		isShowCollect: {
			type: Boolean,
			default: true
		},
		isShowShare: {
			type: Boolean,
			default: true
		},
		isShowNavigate: {
			type: Boolean,
			default: true
		},
		isShowService: {
			type: Boolean,
			default: true
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
			handler(newV, oldV) {
				if (!oldV || (newV.shopId && (newV.shopId !== oldV.shopId))) {
					this.shopId = newV.shopId
					if (this.isShowShare) {
						// #ifdef H5
						this.$nextTick(() => {
							this.handleShareServe(true)
						})
					// #endif
					}
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

		handleShareServe(isQuit) {
			if (!this.isLogin()) return
			const data = {
				data: {
					title: `团蜂${this.isSelection ? '选品中心' : '社区商圈'} - ${this.brandDetail.shopName}`,
					desc: this.brandDetail.shopBrief,
					link: `${A_TF_MAIN}/#/another-tf/another-user/shop/shop-detail?shopId=${this.brandDetail.shopId}&isSelection=${Number(this.isSelection)}`,
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
				shopId: '' // this.brandDetail.shopId
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
	// padding: 28rpx 34rpx;
	box-sizing: border-box;

	/deep/ .tui-popup-class.tui-bottom-popup {
		height: 85vh !important;
	}

	.tags {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		margin: 10rpx 0 0 0;

		.tag {
			font-size: 26rpx;
			margin-right: 12rpx;
			margin-bottom: 10rpx;
			padding: 4rpx 12rpx;
			background-color: #ff8000;
			color: #ffffff;
			border-radius: 10rpx;
		}
	}

	.address-info {
		display: flex;
		align-items: center;
		width: 100%;
		margin-top: 24rpx;

		.address-detail-info {
			flex: 1;
			display: flex;
			width: 0;
			font-size: 26rpx;

			.address-text-wrapper {
				flex: 1;
				width: 0;
				margin-left: 10rpx;

				.address-text {
					margin-bottom: 6rpx;
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
				margin-left: 30rpx;

				text {
					font-size: 24rpx;
					color: #888889;
					margin-top: 4rpx;
					white-space: nowrap;
				}
			}
		}
	}

}
</style>
