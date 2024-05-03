<template>
	<view
		v-if="brandInfo" class="brand-shop-container"
		@click="go(`/another-tf/another-user/shop/shop-detail?shopId=${brandInfo.shopId}`)"
	>
		<view class="brand-logo-container">
			<tui-lazyload-img
				:src="common.seamingImgUrl(brandInfo.shopLogo) || 'https://zhult-com.oss-cn-beijing.aliyuncs.com/commodity/4cf6ad189ac84546a55f5dcb73c88e87.jpg'"
			></tui-lazyload-img>
		</view>

		<view class="brand-info">
			<view class="brand-title-wrapper">
				<image v-if="showLogo" class="icon" src="../../../static/images/new-community/home/tag.png"></image>
				<view class="name">{{ brandInfo.shopName || brandInfo.chargePersonName }}</view>
			</view>

			<view v-if="bottomType === 'detail'" class="brand-detail">
				<!-- <view class="detail-msg">{{ brandInfo.elegantDemeanour || '--' }}</view> -->
				<view class="rate-wrapper">
					<view>
						<tui-rate :size="12" active="#EF530E" :current="brandInfo.score || 5"></tui-rate>
						<text class="rate-count">{{ brandInfo.score || 5 }}</text>
					</view>
					<!-- <text class="receive-order">接单率：{{ brandInfo.acceptanceRate * 100 }}%</text> -->
					<text v-if="brandInfo.monthlySales" class="receive-order">月售{{ brandInfo.monthlySales }}</text>
				</view>
			</view>

			<view v-if="bottomType === 'brief'" class="brand-brief">
				<view v-if="brandInfo.shopBrief" class="brief-line brief-top">
					{{ brandInfo.shopBrief }}
				</view>
				<view v-if="brandInfo.authenType || brandInfo.checkState || brandInfo.authenticationState" class="brief-line brief-bottom">
					<text v-if="brandInfo.authenType" class="item">
						<template v-if="brandInfo.authenType === 1">个人</template>
						<template v-else-if="brandInfo.authenType === 2">个体工商户</template>
						<template v-else-if="brandInfo.authenType === 3">企业</template>
						<template v-else-if="brandInfo.authenType === 4">其它组织</template>
						<template v-else>特殊角色</template>
					</text>
					<text v-if="brandInfo.checkState" class="item">
						已入驻
					</text>
					<text v-if="brandInfo.authenticationState" class="item">
						已签约
					</text>
				</view>
			</view>

			<view style="display: flex;flex-wrap: wrap;padding: 4upx 0;">
				<view
					v-if="brandInfo.isBeeCoin === 1"
					style="width: fit-content;padding: 2upx 6upx;margin: 8upx 6upx 0 0;border: 1upx solid rgba(226, 71, 71, 0.5);border-radius: 12upx;font-size: 24upx;color: #E24747;"
				>
					支持交易金
				</view>
				<view
					v-if="brandInfo.isVoucher"
					style="width: fit-content;padding: 2upx 6upx;margin: 8upx 6upx 0 0;border: 1upx solid rgba(226, 71, 71, 0.5);border-radius: 12upx;font-size: 24upx;color: #E24747;"
				>
					支持代金券
				</view>
				<view
					style="width: fit-content;padding: 2upx 6upx;margin: 8upx 6upx 0 0;border: 1upx solid rgba(226, 71, 71, 0.5);border-radius: 12upx;font-size: 24upx;color: #E24747;"
				>
					补贴代金券{{ brandInfo.voucherReturn ? brandInfo.voucherReturn : 0 }}%
				</view>
			</view>

			<view v-if="bottomType === 'detail'" class="brand-detail">
				<view class="other-info">
					<view v-if="brandInfo.distance" class="item">
						<image class="icon" src="../../../static/images/new-business/home/location.png"></image>
						<text>{{ brandInfo.distance || 0 }}km</text>
					</view>
					<view class="item">
						<image style="width: 44upx" class="icon" src="../../../static/images/new-business/home/views.png"></image>
						<text style="color: #888889">{{ brandInfo.fansNumber || 0 }}</text>
					</view>
				</view>
			</view>

			<view v-if="showPrice" style="margin-top: 16upx;">
				<text style="color: #E02208;">
					<text style="font-size: 28upx;">￥</text>
					<text style="font-size: 38upx;font-weight: bold;">99.99</text>
				</text>
				<text style="color: #979797;">
					<text style="font-size: 26upx;">起</text>
					<text style="margin-left: 10upx;font-size: 24upx;text-decoration: line-through;">￥199.44</text>
				</text>
			</view>
		</view>
	</view>
</template>

<script>

export default {
	name: 'BrandShop',
	props: {
		brandInfo: {
			type: Object,
			required: true
		},
		showLogo: {
			type: Boolean,
			default: true
		},
		bottomType: {
			type: String,
			default: 'detail'
		},
		showPrice: {
			type: Boolean,
			default: false
		}
	}
}
</script>

<style lang="less" scoped>
/deep/ .tui-lazyload__box {
	position: relative;
	width: 100% !important;
	height: auto !important;
	border-radius: 20upx !important;
	overflow: hidden;
	z-index: 10;
}

.brand-shop-container {
	background-color: #fff;
	border-radius: 20upx;
	margin-bottom: 20upx;

	.brand-logo-container {
		position: relative;

		&::after {
			content: '';
			display: block;
			position: absolute;
			bottom: -20upx;
			left: 50%;
			transform: translateX(-50%);
			height: 251upx;
			background: url('../../../static/images/new-business/home/diu.png') no-repeat;
			background-size: cover;
			z-index: -1;
		}
	}

	.brand-info {
		width: 100%;
		padding: 16upx 14upx 18upx;
		box-sizing: border-box;

		.brand-title-wrapper {
			display: flex;
			align-items: center;

			.icon {
				width: 32upx;
				height: 32upx;
			}

			.name {
				flex: 1;
				width: 0;
				margin-left: 10upx;
				font-size: 28upx;
				color: #222229;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}

		.brand-detail {
			.rate-wrapper {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 24upx;
				color: #EF530E;
				margin: 12upx 0 0;

				.receive-order {
					font-size: 24upx;
					color: #888889;
					margin-left: 16upx;
					white-space: nowrap;
				}
			}

			.detail-msg {
				font-size: 24upx;
				color: #9E9E9E;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			.other-info {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin: 12upx 0;

				.item {
					display: flex;
					align-items: center;
					color: #EF530E;
					font-size: 24upx;

					.icon {
						width: 24upx;
						height: 24upx;
						flex-shrink: 0;
						margin-right: 4upx;
					}
				}
			}
		}

		.brand-brief {
			.brief-line {
				padding-top: 18upx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			.brief-top {
				font-size: 24upx;
				color: #9E9E9E;
			}

			.brief-bottom {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;

				.item {
					color: #9E9E9E;
					margin-right: 10upx;
					padding: 4upx 18upx;
					font-size: 24upx;
					background-color: #f7f7f7;
				}
			}
		}
	}
}
</style>
