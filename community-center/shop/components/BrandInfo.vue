<template>
	<view v-if="brandDetail" class="brand-info-container">
		<view style="display: flex;justify-content: space-between;align-items: center;">
			<view>
				<view style="font-weight: bold;color: #000;font-size: 32upx;">{{ brandDetail.name }}</view>
				<view class="rate">
					<BeeIcon :src="require('../../../static/brand/detail/star.png')" :size="14"></BeeIcon>
					<text>{{ brandDetail.starTotal || 0 }}</text>
					<text>月售 {{ brandDetail.salesVolume }}</text>
					<text>人均{{ brandDetail.perCapita || '：--' }}</text>
				</view>
			</view>
			<view
				style="display: flex;flex-direction: column;align-items: center;"
				@click="handleToConnectStore"
			>
				<tui-icon name="people-fill" :size="48" unit="rpx" color="#9aedbe"></tui-icon>
				<text style="font-size: 26upx;color: #8e8e8e;">联系商家</text>
			</view>
		</view>
		<view v-if="brandDetail.businessSlogan || brandDetail.voucherNum || brandDetail.supportVoucher" class="tags">
			<view v-if="brandDetail.voucherNum" class="tag">补贴代金券{{ brandDetail.voucherNum * 2 || 0 }}%</view>
			<view v-if="brandDetail.supportVoucher" class="tag">支持代金券</view>
			<block v-if="brandDetail.businessSlogan">
				<view v-for="item in brandDetail.businessSlogan.split(',')" :key="item" class="tag">{{ item }}</view>
			</block>
		</view>
		<!-- <scroll-view v-if="brandDetail.bgUrl" scroll-x="true">
			<view class="goods-list">
			<tui-lazyload-img
			v-for="(img, index) in JSON.parse(brandDetail.bgUrl)" :key="index" class="goods-img"
			mode="scaleToFill" width="250rpx" height="210rpx"
			:radius="!index ? '20rpx 0 0 20rpx' : index === JSON.parse(brandDetail.bgUrl).length - 1 ? '0 20rpx 20rpx 0' : ''"
			:src="common.seamingImgUrl(img)"
			></tui-lazyload-img>
			</view>
			</scroll-view> -->
		<view class="brand-status">
			店铺状态：<text class="status">{{ brandDetail.status ? '打烊啦~' : '营业中' }}</text>
		</view>
		<view class="open-time"> 营业时间：{{ brandDetail.startTime }}-{{ brandDetail.endTime }} </view>

		<view class="address-info">
			<view class="address-detail-info">
				<view class="address-text" style="font-weight: bold;">{{ brandDetail.address }}</view>
				<view style="color: #777777" class="address-text">
					距你{{ brandDetail.distance || 0 }}公里，驾车{{ brandDetail.driveTime }}分钟
				</view>
			</view>
			<view class="op-menus">
				<BeeMakePhone :phone="brandDetail.phone">
					<view class="item">
						<BeeIcon :size="26" :src="require('../../../static/brand/detail/phone.png')"></BeeIcon>
						<text>电话</text>
					</view>
				</BeeMakePhone>

				<view class="item" @click="$emit('navgation')">
					<BeeIcon :size="26" :src="require('../../../static/brand/detail/location.png')"></BeeIcon>
					<text>到这去</text>
				</view>

				<!-- <view class="item" @click="$emit('follow')">
					<BeeIcon :size="26" :src="require('../../../../static/brand/detail/collection.png')"></BeeIcon>
					<text>{{ brandDetail.is ? '取消收藏' : '收藏' }}</text>
					</view> -->
			</view>
		</view>
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
		}
	}
}
</script>

<style lang="less" scoped>
.brand-info-container {
	padding: 28upx 34upx;
	box-sizing: border-box;
	background-color: #fff;
	border-radius: 40upx 40upx 0 0;

	.rate {
		display: flex;
		align-items: center;
		margin: 12upx 0 16upx 0;

		text {
			font-size: 24upx;

			&:nth-child(2) {
				color: #fb782d;
				margin: 0 16upx 0 8upx;
			}

			&:nth-child(3) {
				color: #777;
			}

			&:nth-child(4) {
				color: #000000;
				margin-left: 16upx;
			}
		}
	}

	.tags {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		margin: 0 0 20upx 0;

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

	.goods-list {
		margin: 34upx 0 12upx 0;
		white-space: nowrap;

		.goods-img {
			margin-right: 12upx;
		}
	}

	.brand-status {
		font-size: 26upx;

		.status {
			color: #fa5151;
			font-weight: bold;
		}
	}

	.open-time {
		display: inline-block;
		margin-top: 15upx;
		padding: 0 6upx;
		border-radius: 10upx;
		background-color: #f6f6f6;
		font-size: 26upx;
		color: #777;
	}

	.address-info {
		display: flex;
		align-items: center;
		width: 100%;
		margin-top: 18upx;

		.address-detail-info {
			flex: 1;
			width: 0;
			font-size: 26upx;

			.address-text {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				color: #000000;
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
				margin-top: 4upx;
				white-space: nowrap;
			}
		}
	}
}
</style>
