<template>
	<view v-if="shopInfo" class="common-shop-container" :style="{ margin, borderRadius: radius }">
		<view
			class="shop-top" :style="{ padding }"
			@click="go(`/another-tf/another-user/shop/shop-detail?shopId=${shopInfo.shopId}`)"
		>
			<image
				class="shop-logo" :style="{ width: picWidth, height: picHeight }"
				:src="common.seamingImgUrl(shopInfo.shopLogo) || require('../../static/images/new-user/fee.icon.png')"
			>
			</image>

			<view class="shop-info">
				<view class="shop-name">
					<view style="flex: 1;width: 0;display: flex;align-items: center;">
						<image
							v-if="showLogo" style="width: 32upx;height: 32upx;margin-right: 6upx;"
							src="../../static/images/new-community/home/tag.png"
						></image>
						<view
							style="flex: 1;margin-left: 5upx;font-size: 32upx;font-weight: bold;color: #222229;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
						>
							{{ shopInfo.shopName || shopInfo.chargePersonName || '附近商家' }}
						</view>
					</view>
					<image
						v-if="showSign && shopInfo.contractState" src="../../static/images/new-community/home/gold-star.png"
						style="width: 48upx;height: 48upx;"
					></image>
				</view>

				<view class="shop-middle" :style="{ marginTop: bottomType !== 'brief' ? '10upx' : '0' }">
					<view class="rate">
						<tui-rate active="#EF530E" :current="shopInfo.score" :size="14" disabled></tui-rate>
						<text class="rate-text">{{ shopInfo.score }}</text>
					</view>
					<!-- && shopInfo.monthlySales -->
					<view v-if="(bottomType === 'detail')" style="color: #888889;font-size: 24upx;margin-left: 15upx;">
						月售{{ shopInfo.monthlySales || 1 }}
					</view>
				</view>

				<view v-if="bottomType === 'detail'">
					<view style="display: flex;align-items: center;justify-content: space-between;padding-top: 6upx;">
						<view
							style="flex: 1;width: 0;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;font-size: 26upx;color: #888889;"
						>
							<!-- <template v-if="shopInfo.mainBusiness">
								<text
								v-for="(item, index) in shopInfo.mainBusiness.split(',')" :key="index"
								style="padding-right: 10upx;margin-left: 10upx;border-right: 1upx solid #D8D8D8;"
								>
								{{ item }}
								</text>
								</template> -->
							<text>{{ shopInfo.shopBrief || '--' }}</text>
						</view>
						<view v-if="shopInfo.distance" style="margin-left: 6upx;">
							<tui-icon name="gps" :size="14" color="#888889"></tui-icon>
							<text style="margin-left: 4upx;color: #888889;font-size: 26upx;">{{ shopInfo.distance || 0 }}Km</text>
						</view>
					</view>
					<view style="display: flex;align-items: center;justify-content: flex-end;padding-top: 6upx;">
						<!-- <view
							v-if="shopInfo.shopTypeName"
							style="flex: 1;width: 0;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
							>
							<text
							v-for="(item, index) in shopInfo.shopTypeName.split(',')" :key="index"
							style="padding: 4upx 18upx;margin-right: 10upx;font-size: 24upx;color: #c8530a;background-color: #fff1d7;"
							>
							{{ item }}
							</text>
							</view> -->
						<view
							v-if="shopInfo.authenType || shopInfo.checkState || shopInfo.authenticationState || shopInfo.startTime"
							style="flex: 1;width: 0;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;font-size: 24upx;color: #c8530a;"
						>
							<text v-if="shopInfo.authenType" style="padding: 4upx 18upx;margin-right: 10upx;background-color: #fff1d7;">
								<template v-if="shopInfo.authenType === 1">个人</template>
								<template v-else-if="shopInfo.authenType === 2">个体工商户</template>
								<template v-else-if="shopInfo.authenType === 3">企业</template>
								<template v-else-if="shopInfo.authenType === 4">其它组织</template>
								<template v-else>特殊角色</template>
							</text>
							<text v-if="shopInfo.checkState" style="padding: 4upx 18upx;margin-right: 10upx;background-color: #fff1d7;">
								已入驻
							</text>
							<text
								v-if="shopInfo.authenticationState"
								style="padding: 4upx 18upx;margin-right: 10upx;background-color: #fff1d7;"
							>
								已签约
							</text>
							<text v-if="shopInfo.startTime" style="padding: 4upx 18upx;margin-right: 10upx;background-color: #fff1d7;">
								{{ shopInfo.startTime }}营业
							</text>
						</view>
						<!-- <view v-if="shopInfo.accessNum" style="margin-left: 6upx;">
							<text style="color: #888889;font-size: 26upx;">{{ shopInfo.accessNum || 0 }}浏览量</text>
							</view> -->
						<view style="margin-left: 6upx;">
							<text style="color: #888889;font-size: 26upx;">{{ shopInfo.fansNumber || '0 ' }}粉丝</text>
						</view>
					</view>
				</view>

				<view v-if="bottomType === 'brief'" class="bottom-brief">
					<view class="brief-left">
						<!-- <view v-if="shopInfo.mainBusiness" class="serve-list">
							<text v-for="(item, index) in shopInfo.mainBusiness.split(',')" :key="index" class="item">
							{{ item }}
							</text>
							</view> -->
						<view v-if="shopInfo.shopBrief" class="serve-list">
							<text>{{ shopInfo.shopBrief || '--' }}</text>
						</view>
						<!-- <view v-if="shopInfo.shopTypeName" class="type-list">
							<text v-for="(item, index) in shopInfo.shopTypeName.split(',')" :key="index" class="item">
							{{ item }}
							</text>
							</view> -->
						<view
							v-if="shopInfo.authenType || shopInfo.checkState || shopInfo.authenticationState || shopInfo.startTime"
							class="type-list"
						>
							<text
								v-if="shopInfo.authenType"
								style="padding: 4upx 18upx;margin-right: 10upx;background-color: #f7f7f7;border-radius: 24upx;"
							>
								<template v-if="shopInfo.authenType === 1">个人</template>
								<template v-else-if="shopInfo.authenType === 2">个体工商户</template>
								<template v-else-if="shopInfo.authenType === 3">企业</template>
								<template v-else-if="shopInfo.authenType === 4">其它组织</template>
								<template v-else>特殊角色</template>
							</text>
							<text
								v-if="shopInfo.checkState"
								style="padding: 4upx 18upx;margin-right: 10upx;background-color: #f7f7f7;border-radius: 24upx;"
							>
								已入驻
							</text>
							<text
								v-if="shopInfo.authenticationState"
								style="padding: 4upx 18upx;margin-right: 10upx;background-color: #f7f7f7;"
							>
								已签约
							</text>
							<text
								v-if="shopInfo.startTime"
								style="padding: 4upx 18upx;margin-right: 10upx;background-color: #f7f7f7;border-radius: 24upx;"
							>
								{{ shopInfo.startTime }}营业
							</text>
						</view>
					</view>
					<view v-if="shopInfo.distance" class="brief-right">
						<image class="icon" src="../../static/images/new-community/home/location.png"></image>
						<text>{{ shopInfo.distance || 0 }}Km</text>
					</view>
				</view>

				<view v-if="bottomType === 'display'">
					<!-- <view class="detail-msg">{{ shopInfo.elegantDemeanour || '--' }}</view> -->
					<view class="detail-msg">{{ shopInfo.shopBrief || '--' }}</view>
				</view>

				<view style="display: flex;flex-wrap: wrap;padding: 4upx 0;">
					<view
						v-if="shopInfo.isBeeCoin"
						style="width: fit-content;padding: 2upx 6upx;margin: 8upx 6upx 0 0;border: 1upx solid rgba(226, 71, 71, 0.5);border-radius: 12upx;font-size: 24upx;color: #E24747;"
					>
						支持交易金
					</view>
					<view
						v-if="shopInfo.voucherReturn"
						style="width: fit-content;padding: 2upx 6upx;margin: 8upx 6upx 0 0;border: 1upx solid rgba(226, 71, 71, 0.5);border-radius: 12upx;font-size: 24upx;color: #E24747;"
					>
						补贴代金券{{ shopInfo.voucherReturn || 0 }}%
					</view>
					<view
						v-if="shopInfo.isVoucher"
						style="width: fit-content;padding: 2upx 6upx;margin: 8upx 6upx 0 0;border: 1upx solid rgba(226, 71, 71, 0.5);border-radius: 12upx;font-size: 24upx;color: #E24747;"
					>
						支持代金券
					</view>
				</view>

				<view v-if="bottomType === 'display'" class="bottom-detail">
					<view class="op-info">
						<view class="item">
							<image class="icon" src="../../static/images/new-community/home/follow.png"></image>
							<text class="num">{{ shopInfo.score || 0 }}</text>
						</view>
						<view class="item">
							<image class="icon" src="../../static/images/new-community/home/views.png"></image>
							<text class="num">{{ shopInfo.fansNumber || 0 }}</text>
						</view>
						<view v-if="shopInfo.distance" class="item">
							<image class="icon" src="../../static/images/new-community/home/location.png"></image>
							<text class="num">{{ shopInfo.distance || 0 }}Km</text>
						</view>
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
	name: 'ATFCommonShop',
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
		picWidth: {
			type: String,
			default: '168upx'
		},
		picHeight: {
			type: String,
			default: '168upx'
		},
		showLogo: {
			type: Boolean,
			default: false
		},
		showSign: {
			type: Boolean,
			default: false
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
			flex-shrink: 0;
			border-radius: 14upx;
			margin-right: 26upx;
		}

		.shop-info {
			flex: 1;
			width: 0;

			.shop-name {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}

		.shop-middle {
			display: flex;
			align-items: center;

			.rate {
				flex: 1;
				width: 0;
				line-height: 1;

				.rate-text {
					font-size: 24upx;
					color: #ef530e;
					margin-left: 4upx;
				}
			}

		}

		.detail-msg {
			font-size: 26upx;
			color: #9E9E9E;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		.bottom-detail {

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
					font-size: 26upx;
					color: #9E9E9E;

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
					font-size: 24upx;
					color: #979797;

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
