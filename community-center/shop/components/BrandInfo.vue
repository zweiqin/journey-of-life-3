<template>
	<view class="brand-info-container">
		<view style="display: flex;justify-content: space-between;align-items: center;font-size: 36upx;font-weight: bold;">
			<view>{{ brandDetail.shopName || '--' }}</view>
			<view style="display: flex;align-items: center;">
				<BeeIcon
					:name="brandDetail.ifCollect ? 'star-fill' : 'star'" :size="22"
					:color="brandDetail.ifCollect ? '#ff8000' : '#222229'"
					@click="handleShareServe"
				></BeeIcon>
				<BeeWxShare ref="beeWxShareRef" @click="handleShareServe">
					<BeeIcon
						:src="require('../../../static/images/new-brand/detail/share.png')" :size="22"
						style="margin-left: 24upx;"
					></BeeIcon>
				</BeeWxShare>
			</view>
		</view>
		<view>
			<tui-rate active="#e02208" :size="14" disabled :current="brandDetail.score || 0"></tui-rate>
			<text style="margin-left: 8upx;color: #e02208;font-size: 26upx;">{{ brandDetail.score || 0 }}</text>
			<text style="font-size: 24upx;color: #777777;margin-left: 18upx;">销量 {{ brandDetail.monthlySales }}</text>
			<text style="font-size: 24upx;color: #000000;margin-left: 16upx;">人均{{ brandDetail.perCapita || '：--' }}</text>
		</view>
		<view v-if="brandDetail.voucherReturn || brandDetail.isVoucher" class="tags">
			<view v-if="brandDetail.voucherReturn" class="tag">补贴代金券{{ brandDetail.voucherReturn || 0 }}%</view>
			<view v-if="brandDetail.isVoucher" class="tag">支持代金券</view>
		</view>
		<view style="display: flex;align-items: center;margin-top: 10upx;">
			<BeeIcon name="clock" :size="18" color="#888889" style="width: fit-content;"></BeeIcon>
			<view style="margin-left: 18upx;font-size: 28upx;color: #222229;">营业状态</view>
			<view style="margin-left: 20upx;font-size: 28upx;color: #E02208;">{{ brandDetail.trade || '未知' }}</view>
			<view style="margin-left: 18upx;padding: 2upx 18upx;font-size: 24upx;background-color: #f5f4f6;">
				{{ brandDetail.startTime }}至{{ brandDetail.endTime }}
			</view>
		</view>

		<view v-if="brandDetail.shopLogo" style="margin-top: 22upx;">
			<!-- 轮播图 -->
			<swiper autoplay :interval="3000" next-margin="80rpx" :duration="1000" style="height: 328upx;">
				<swiper-item>
					<tui-lazyload-img
						mode="scaleToFill" width="600rpx" height="100%" radius="20upx"
						:src="common.seamingImgUrl(brandDetail.shopLogo)"
					></tui-lazyload-img>
				</swiper-item>
				<swiper-item v-if="brandDetail.advertisement">
					<tui-lazyload-img
						mode="scaleToFill" width="600rpx" height="100%" radius="20upx"
						:src="common.seamingImgUrl(brandDetail.advertisement)"
					></tui-lazyload-img>
				</swiper-item>
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
						距你{{ brandDetail.distance || 0 }}Km
					</view>
				</view>
			</view>
			<view class="op-menus">
				<BeeMakePhone :phone="brandDetail.phone">
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

		<!-- <view style="display: flex;justify-content: space-between;align-items: center;">
			<view style="display: flex;flex-direction: column;align-items: center;" @click="handleToConnectStore">
			<tui-icon name="people-fill" :size="48" unit="rpx" color="#9aedbe"></tui-icon>
			<text style="font-size: 26upx;color: #8e8e8e;">联系商家</text>
			</view>
			</view> -->
	</view>
</template>

<script>
export default {
	name: 'BrandInfo',
	props: {
		brandDetail: {
			type: Object,
			required: true
		}
	},
	methods: {
		handleToConnectStore() {
			if (!this.brandDetail.userId || !this.brandDetail.name) return this.$showToast('缺少商家信息')
			this.go(`/user/otherServe/chat/chat-detail?chat=${this.brandDetail.userId}&name=${this.brandDetail.name}&avatar=${this.brandDetail.picUrl}`)
		},

		// 收藏商家
		async handleFollowBrand() {
			const { data } = await collectionApi({
				userId: getUserId(),
				// brandId: this.brandDetail.id,
				// is: !this.brandDetail.is,
				valueId: this.brandDetail.id,
				type: 2
			})
			this.ttoast(`${this.brandDetail.is ? '取消收藏' : '收藏'}成功`)
			this.brandDetail.is = !this.brandDetail.is
			console.log(data)
		}
	}
}
</script>

<style lang="less" scoped>
.brand-info-container {
	// padding: 28upx 34upx;
	box-sizing: border-box;

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
