<template>
	<view
		v-if="brandInfo" class="brand-shop-container"
		@click="go('/community-center/shop/shop-detail?shopId=' + brandInfo.shopId)"
	>
		<view class="brand-logo-container">
			<tui-lazyload-img
				:src="brandInfo.shopLogo || 'https://zhult-com.oss-cn-beijing.aliyuncs.com/commodity/4cf6ad189ac84546a55f5dcb73c88e87.jpg'"
			></tui-lazyload-img>
		</view>

		<view class="brand-info">
			<view class="brand-title-wrapper">
				<image v-if="showLogo" class="icon" src="../../../static/images/new-community/home/tag.png"></image>
				<view class="name">{{ brandInfo.shopName || brandInfo.shopNameSimple }}</view>
			</view>

			<view style="display: flex;flex-wrap: wrap;padding: 4upx 0;">
				<view
					style="width: fit-content;margin-top: 8upx;margin-right: 8upx;padding: 4upx 8upx;border: 0.25px solid #0d0e0d;border-radius: 12upx;font-size: 28upx;font-weight: bold;color: #0d0e0d;"
				>
					补贴代金券{{ brandInfo.voucherProportion ? Number(brandInfo.voucherProportion) * 100 : 0 }}%
				</view>
				<view
					v-if="brandInfo.isVoucher"
					style="width: fit-content;margin-top: 8upx;margin-right: 8upx;padding: 4upx 8upx;border: 0.25px solid #51cc46;border-radius: 12upx;font-size: 28upx;font-weight: bold;color: #51cc46;"
				>
					支持代金券
				</view>
			</view>

			<view v-if="bottomType === 'detail'" class="brand-detail">
				<view class="rate-wrapper">
					<tui-rate :size="12" active="#EF530E" :current="brandInfo.score || 5"></tui-rate>
					<text class="rate-count">{{ brandInfo.score || 5 }}</text>
					<text class="receive-order">接单率：{{ brandInfo.acceptanceRate * 100 }}%</text>
				</view>
				<view class="detail-msg">
					{{ brandInfo.elegantDemeanour || '--' }}
				</view>
				<view class="other-info">
					<view v-if="brandInfo.distance" class="item">
						<image class="icon" src="../../../static/images/new-business/home/location.png"></image>
						<text>{{ brandInfo.distance || 0 }}km</text>
					</view>
					<view class="item">
						<image style="width: 44upx" class="icon" src="../../../static/images/new-business/home/views.png"></image>
						<text style="color: #888889">{{ brandInfo.accessNum || 0 }}</text>
					</view>
				</view>
			</view>

			<view v-else-if="bottomType === 'brief'" class="brand-brief">
				<view v-if="brandInfo.mainBusiness" class="brief-line brief-top">
					{{
						brandInfo.mainBusiness && typeof brandInfo.mainBusiness === 'string'
							? brandInfo.mainBusiness.replaceAll(',', ' | ') : null
					}}
				</view>
				<view class="brief-line brief-top">
					{{
						'brandIn,fo.mainBus,iness && ty,peof brandInfo.mainBusiness'.replaceAll(',', ' | ')
					}}
				</view>
				<view v-if="brandInfo.shopTypeName" class="brief-line brief-bottom">
					<text v-for="(item, index) in brandInfo.shopTypeName.split(',')" :key="index" class="item">
						{{ item }}
					</text>
				</view>
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
		}
	}
}
</script>

<style lang="less" scoped>
/deep/ .tui-lazyload__box {
	position: relative;
	width: 333upx !important;
	height: auto !important;
	border-radius: 20upx !important;
	overflow: hidden;
	z-index: 10;
}

.brand-shop-container {
	width: 333upx;
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
			width: 306upx;
			height: 251upx;
			background: url('../../../static/images/new-business/home/diu.png') no-repeat;
			background-size: cover;
			z-index: -1;
		}
	}

	.brand-info {
		width: 100%;
		padding: 16upx 20upx 40upx;
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
				align-items: center;
				font-size: 24upx;
				color: #EF530E;
				margin: 12upx 0;

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
					font-weight: bold;
					background-color: #f7f7f7;
				}
			}
		}
	}
}
</style>
