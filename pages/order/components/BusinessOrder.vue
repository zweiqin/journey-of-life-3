<template>
	<view class="item ske-loading u-skeleton-fillet">
		<view class="order-list-top">
			<view class="top-l" @click.stop="go(`/community-center/shop/shop-detail?shopId=${data.shopId}`)">
				<image :src="data.shopLogo" class="shop-img" />
				<text class="shop-name">{{ data.shopName }}</text>
				<tui-icon name="arrow-right" :size="25" color="#999999"></tui-icon>
			</view>
			<view class="order-status">
				{{ data.returnType ? '退款中' : orderTypeEnum[data.state] || '--' }}
			</view>
		</view>
		<view class="order-info-box" @click="go(`/another-tf/another-serve/orderDetails/index`, data)">
			<view class="order-info">
				<view v-for="(skuItem, skuIndex) in data.skus" :key="skuIndex" class="order-info-item">
					<image :src="skuItem.image" class="product-img default-img" />
					<view class="info-box">
						<text class="product-name">{{ skuItem.productName && skuItem.productName }}</text>
						<view class="product-sku">{{ skuItem.value && skuItem.value }}</view>
						<view class="price-sku-box">
							<view class="box-h flex-items-plus">
								<text class="product-price">
									<text class="fuhao">
										￥
									</text>
									{{ skuItem.price && skuItem.price }}
								</text>
								<text class="product-num">x {{ skuItem.number && skuItem.number }}</text>
							</view>
							<view
								v-if="skuItem.commentId === 0 && data.state === 4" class="evaluate"
								@click.stop="go(`/another-tf/another-serve/evaluate/index`, { commentData: skuItem, orderId: data.orderId })"
							>
								立即评价
							</view>
							<view
								v-if="skuItem.commentId !== 0 && data.state === 4 && data.skus[0].ifAdd !== 1" class="evaluate2"
								@click.stop="goAdditionalEvaluation(orderIndex, skuItem.commentId)"
							>
								追加评价
							</view>
						</view>
					</view>
				</view>
				<view class="total-price-box">
					<template v-if="data.orderPrice !== undefined || data.discountPrice !== undefined">
						总价¥{{
							(data.orderPrice + data.logisticsPrice).toFixed(2)
						}},优惠¥{{ data.discountPrice }}
						<span v-if="data.price > 0">
							，{{ data.state === 1 ? '应付¥' : '实付¥' }}{{ data.price }}
						</span>
					</template>
				</view>
			</view>
			<view class="btnBox flex-items" :class="{ flexSpBetween: data.state === 5 || data.state === 9 }">
				<tui-icon
					v-if="data.state === 5 || data.state === 9" name="delete" :size="14" color="#333333"
					@click.stop="handleDeleteOrder(data)"
				></tui-icon>
				<view class="order-btn-box">
					<text
						v-for="buttonItem in getOrderOptionButtonObj(data)" :key="buttonItem.name" class="btn"
						:class="[ buttonItem.className ]" @click.stop="handleOrderOptionButtonEvent(buttonItem)"
					>
						{{ buttonItem.name }}
					</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { orderTypeEnum } from '../config'
export default {
	name: 'BusinessOrder',
	props: {
		data: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			orderTypeEnum
		}
	},

	watch: {
	},

	methods: {
		goOrderDesc(orderItem) {
			this.go(`/another-tf/another-serve/orderDetails/index?detail=${encodeURIComponent(JSON.stringify(orderItem)?.replace(/%/g, '%25'))}`)
		}
	}
}
</script>

<style lang="less" scoped>
.item {
	margin-bottom: 20rpx;
	background: #fff;
	border-radius: 10rpx;

	.order-list-top {
		height: 96rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #eee;

		.top-l {
			display: flex;
			flex-direction: row;
			align-items: center;

			.shop-img {
				width: 36rpx;
				height: 36rpx;
				margin-right: 10rpx;
			}

			.shop-name {
				font-size: 30rpx;
				color: #333;
				font-weight: bold;
			}
		}

		.order-status {
			font-size: 32upx;
			color: #C5AA7B;
			font-weight: 400;
		}
	}

	.order-info-box {
		padding: 0 30upx;
		box-sizing: border-box;

		.order-info {
			border-bottom: 1px solid #eee;

			.order-info-item {
				display: flex;
				flex-direction: row;
				padding: 20upx 0;

				.product-img {
					width: 180upx;
					height: 180upx;
					margin-right: 30upx;
				}

				.info-box {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.product-name {
						font-size: 26upx;
						color: #333;
						height: 68upx;
						line-height: 34upx;
						display: -webkit-box;
						overflow: hidden;
						text-overflow: ellipsis;
						word-break: break-all;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}

					.product-sku {
						font-size: 24upx;
						color: #999;
					}

					.price-sku-box {
						display: flex;
						flex-direction: row;
						justify-content: space-between;

						.product-price {
							font-size: 28upx;
							color: #333;
							font-weight: 400;

							.fuhao {
								font-size: 28upx;
							}
						}

						.product-num {
							display: inline-view;
							font-size: 28upx;
							margin-left: 20upx;
							color: #999;
						}

						.evaluate {
							height: 56upx;
							text-align: center;
							line-height: 56upx;
							font-size: 26upx;
							padding: 0 30upx;
							color: #C5AA7B;
							background: #333333;
						}

						.evaluate2 {
							height: 56upx;
							text-align: center;
							line-height: 56upx;
							font-size: 26upx;
							padding: 0 30upx;
							background: #333333;
							color: #C5AA7B;
						}
					}
				}
			}

			.total-price-box {
				font-size: 26upx;
				color: #333;
				text-align: right;
				padding: 30upx 0;
			}
		}

		.btnBox {
			width: 100%;
			justify-content: flex-end;

			.order-btn-box {
				padding: 20upx 0;
				display: flex;
				flex-direction: row;
				justify-content: flex-end;

				.btn {
					display: inline-view;
					width: 150upx;
					height: 56upx;
					text-align: center;
					line-height: 56upx;
					font-size: 26upx;
					color: #333;
					margin-left: 20upx;
				}
			}
		}

		.flexSpBetween {
			justify-content: space-between;
		}
	}
}
</style>
