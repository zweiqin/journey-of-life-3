<template>
	<view
		v-if="shopInfo" class="common-shop-container" :style="{ margin, borderRadius: radius }"
		@click="go('/community-center/shop/shop-detail?shopId=' + shopInfo.shopId)"
	>
		<view class="shop-top" :style="{ padding }">
			<image class="shop-logo" :src="shopInfo.shopLogo || require('../../../static/images/new-user/fee.icon.png')">
			</image>

			<view class="shop-info">
				<view class="shop-name">
					<image v-if="showLogo" class="icon" src="../../../static/images/new-community/home/tag.png"></image>
					<view class="name">{{ shopInfo.shopName || shopInfo.shopNameSimple || '附近商家' }}</view>
				</view>

				<view class="shop-middle">
					<view class="rate">
						<tui-rate active="#EF530E" :current="shopInfo.score" :size="14" disabled></tui-rate>
						<text class="rate-text">{{ shopInfo.score }}</text>
					</view>
					<view class="accept-precentage">接单率{{ shopInfo.acceptanceRate * 100 }}%</view>
				</view>

				<view style="display: flex;flex-wrap: wrap;padding: 4upx 0;">
					<view
						style="width: fit-content;margin-top: 8upx;margin-right: 8upx;padding: 4upx 8upx;border: 0.25px solid #0d0e0d;border-radius: 12upx;font-size: 28upx;font-weight: bold;color: #0d0e0d;"
					>
						补贴代金券{{ shopInfo.voucherProportion ? Number(shopInfo.voucherProportion) * 100 : 0 }}%
					</view>
					<view
						v-if="shopInfo.isVoucher"
						style="width: fit-content;margin-top: 8upx;margin-right: 8upx;padding: 4upx 8upx;border: 0.25px solid #51cc46;border-radius: 12upx;font-size: 28upx;font-weight: bold;color: #51cc46;"
					>
						支持代金券
					</view>
				</view>

				<view v-if="bottomType === 'detail'" class="bottom-detail">
					<view class="detail-msg">{{ shopInfo.elegantDemeanour || '--' }}</view>
					<view class="op-info">
						<view class="item">
							<image class="icon" src="../../../static/images/new-community/home/follow.png"></image>
							<text class="num">{{ shopInfo.attentionNum || 0 }}</text>
						</view>
						<view class="item">
							<image class="icon" src="../../../static/images/new-community/home/views.png"></image>
							<text class="num">{{ shopInfo.accessNum || 0 }}</text>
						</view>
						<view v-if="shopInfo.distance" class="item">
							<image class="icon" src="../../../static/images/new-community/home/location.png"></image>
							<text class="num">{{ shopInfo.distance || 0 }}km</text>
						</view>
					</view>
				</view>

				<view v-else-if="bottomType === 'brief'" class="bottom-brief">
					<view class="brief-left">
						<view v-if="shopInfo.mainBusiness" class="serve-list">
							<text v-for="(item, index) in shopInfo.mainBusiness.split(',')" :key="index" class="item">
								{{ item }}
							</text>
						</view>
						<view v-if="shopInfo.shopTypeName" class="type-list">
							<text v-for="(item, index) in shopInfo.shopTypeName.split(',')" :key="index" class="item">
								{{ item }}
							</text>
						</view>
					</view>
					<view v-if="shopInfo.distance" class="brief-right">
						<image class="icon" src="../../../static/images/new-community/home/location.png"></image>
						<text>{{ shopInfo.distance || 0 }}km</text>
					</view>
				</view>
			</view>
		</view>

		<view class="shop-bottom">
			<slot></slot>
		</view>
	</view>
</template>

<script>
export default {
	name: 'CommonShop',
	props: {
		shopInfo: {
			type: Object,
			require: true
		},
		padding: {
			type: String,
			default: '22upx 26upx'
		},
		margin: {
			type: String,
			default: '0' // 22upx 0
		},
		radius: {
			type: String,
			default: '0' // 20upx
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
.common-shop-container {
	box-sizing: border-box;
	background-color: #ffffff;

	.shop-top {
		display: flex;

		.shop-logo {
			width: 140upx;
			height: 140upx;
			flex-shrink: 0;
			border-radius: 14upx;
			margin-right: 26upx;
		}

		.shop-info {
			flex: 1;
			width: 0;

			.shop-name {
				display: flex;
				align-items: center;

				.icon {
					position: relative;
					top: 2upx;
					width: 32upx;
					height: 32upx;
					margin-right: 6upx;
					flex-shrink: 0;
				}

				.name {
					font-size: 32upx;
					font-weight: bold;
					color: #222229;
					margin-left: 5upx;
				}
			}
		}

		.shop-middle {
			display: flex;
			align-items: center;

			.rate {
				line-height: 1;
				.rate-text {
					font-size: 24upx;
					color: #ef530e;
					margin-left: 4upx;
				}
			}

			.accept-precentage {
				color: #888889;
				font-size: 24upx;
				margin-left: 15upx;
			}
		}

		.bottom-detail {
			.detail-msg {
				font-size: 26upx;
				color: #9E9E9E;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			.op-info {
				display: flex;
				align-items: center;

				.item {
					display: flex;
					align-items: center;
					width: 33%;

					.icon {
						width: 44upx;
						height: 44upx;
					}

					.num {
						color: #888889;
						font-size: 24upx;
					}

					&:nth-child(3) {
						.num {
							color: #ef530e;
						}
					}
				}
			}
		}

		.bottom-brief {
			display: flex;
			justify-content: space-between;

			.brief-left {
				flex: 1;
				width: 0;

				.serve-list {
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					margin-bottom: 6upx;

					.item {
						color: #9E9E9E;
						margin-left: 10upx;
						padding-right: 10upx;
						font-size: 26upx;
						border-right: 1upx solid #D8D8D8;
					}

					.item:last-child {
						border: none !important;
					}
				}

				.type-list {
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

			.brief-right {
				display: flex;
				align-items: center;
				margin-left: 20upx;
				color: #ef530e;
				font-size: 24upx;

				.icon {
					width: 44upx;
					height: 44upx;
				}
			}
		}
	}
}
</style>
