<template>
	<view class="item ske-loading">
		<view class="order-list-top">
			<view
				v-if="!data.shopName.startsWith('团蜂')" style="display: flex;align-items: center;"
				@click.stop="go(`/another-tf/another-user/shop/shop-detail?shopId=${data.shopId}`)"
			>
				<image :src="data.shopLogo" style="width: 36rpx;height: 36rpx;margin-right: 10rpx;" />
				<text style="font-size: 30rpx;color: #333;font-weight: bold;">{{ data.shopName }}</text>
				<tui-icon name="arrowright" :size="25" color="#999999"></tui-icon>
			</view>
			<view class="order-status">
				{{ data.returnType ? '退款中' : orderTypeEnum[data.state] || '--' }}
			</view>
		</view>
		<view class="order-info-box">
			<view
				style="border-bottom: 1px solid #eeeeee;"
				@click="go(`/another-tf/another-serve/orderDetails/index?orderId=${data.orderId}`)"
			>
				<view style="max-height: 52vh;overflow-y: auto;">
					<view v-for="(skuItem, skuIndex) in data.skus" :key="skuIndex" class="order-info-item">
						<image :src="skuItem.image" class="product-img default-img" />
						<view class="info-box">
							<text class="product-name">{{ skuItem.productName && skuItem.productName }}</text>
							<view
								v-if="skuItem.presenterVoucher"
								style="width: fit-content;margin-top: 10upx;padding: 6upx 12upx;background-color: #f0f0f0;font-size: 28upx;color: #fa5151;border-radius: 22upx;"
							>
								赠送 {{ skuItem.presenterVoucher }} 代金券
							</view>
							<view class="product-sku">{{ skuItem.value && skuItem.value }}</view>
							<view class="price-sku-box">
								<view class="box-h flex-items-plus">
									<text class="product-price">
										<text class="fuhao">￥</text>
										{{ skuItem.price || 0 }}
									</text>
									<text class="product-num">x {{ skuItem.number && skuItem.number }}</text>
								</view>
								<view v-if="showOperate">
									<view
										v-if="[3, 4].includes(data.state) && (data.orderType === 1)" class="evaluate"
										@click.stop="go(`/another-tf/another-user/product-logistics/index?orderId=${data.orderId}&skuId=${skuItem.skuId}`)"
									>
										查看物流
									</view>
									<view
										v-if="[4, 10].includes(data.state) && (skuItem.commentId === 0)" class="evaluate2"
										@click.stop="go(`/another-tf/another-serve/evaluate/index?orderId=${data.orderId}&skuId=${skuItem.skuId}`)"
									>
										立即评价
									</view>
									<view
										v-if="[4, 10].includes(data.state) && (skuItem.commentId !== 0) && (data.skus[0].ifAdd !== 1)"
										class="evaluate2" @click.stop="handleAddEvaluate(skuItem)"
									>
										追加评价
									</view>
								</view>
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
			<view v-if="showOperate" class="btnBox flex-items" :class="{ flexSpBetween: data.state === 5 || data.state === 9 }">
				<!-- <tui-icon
					v-if="data.state === 5 || data.state === 9" name="delete" :size="14" color="#333333"
					@click="handleDeleteOrder(data)"
					></tui-icon> -->
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
import { orderTypeEnum } from '../../../components/ATFOrderInfo/config'
import { deleteShopOrderApi, cancelShopOrderApi, updateOrderConfirmApi, getProductDetailsByIdApi } from '../../../api/anotherTFInterface'
import { T_SKU_ITEM_DTO_LIST } from '../../../constant'
export default {
	name: 'BusinessOrder',
	props: {
		data: {
			type: Object,
			required: true
		},
		showOperate: {
			type: Boolean,
			default: true
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
		handleDeleteOrder(orderItem) {
			uni.showModal({
				title: '温馨提示',
				content: '您确定要删除该订单吗？',
				confirmText: '确定删除',
				cancelText: '点错了',
				success: async ({ confirm }) => {
					if (confirm) {
						uni.showLoading()
						const { orderId } = orderItem
						try {
							await deleteShopOrderApi({ orderId })
							uni.showToast({
								icon: 'none',
								title: '删除成功'
							})
							this.$emit('refresh')
						} finally {
							uni.hideLoading()
						}
					}
				}
			})
		},
		handleAddEvaluate(skuItem) {
			uni.navigateTo({
				url: '/another-tf/another-serve/addEvaluate/index?type=1',
				success: () => {
					setTimeout(() => {
						uni.$emit('sendAddEvaluateMsg', { addCommentVOData: this.data, commentId: skuItem.commentId })
					}, 400)
				}
			})
		},
		getOrderOptionButtonObj(orderItem) {
			const { state, returnType, afterState, skus = [], collageId, paymentState, orderType } = orderItem
			const orderNeedBtnList = [] // 订单应有的btn
			// 取消订单
			// if ([1, 6, 8].includes(state)) {
			// 	orderNeedBtnList.push({
			// 		name: '取消订单',
			// 		className: 'l',
			// 		functionName: 'handleCancelOrder',
			// 		functionParams: [ orderItem ]
			// 	})
			// }
			// 核销码
			if ([8, 9].includes(state)) {
				orderNeedBtnList.push({
					name: '核销码',
					className: 'l',
					functionName: 'handleOrderWriteOff',
					functionParams: [ orderItem ]
				})
			}
			// 立即付款
			if ([1, 8].includes(state)) {
				orderNeedBtnList.push({
					name: '立即付款',
					className: 'r',
					functionName: 'handlePayOrder',
					functionParams: [ orderItem ]
				})
			}
			// 申请售后
			// if ([2, 3, 4, 9, 10].includes(state) && [0, 6].includes(Number(afterState)) && (skus[0].ifAdd !== 1) && skus.some((i) => i.classifyId != 1439)) {
			// 	orderNeedBtnList.push({
			// 		name: '申请售后',
			// 		className: 'l',
			// 		functionName: 'goAfterSalesService',
			// 		functionParams: [ orderItem ]
			// 	})
			// }
			// 退款详情
			if ([ 1 ].includes(returnType)) {
				orderNeedBtnList.push({
					name: '退款详情',
					className: 'l',
					functionName: 'goRefundDetail',
					functionParams: [ orderItem ]
				})
			}
			// 查看物流
			if ([3, 4].includes(state) && (orderType === 2)) { // orderType：1半子，2商城
				orderNeedBtnList.push({
					name: '查看物流',
					className: 'l',
					functionName: 'goLogisticsInformation',
					functionParams: [ orderItem ]
				})
			}
			// 确认收货
			if ([ 3 ].includes(state)) {
				orderNeedBtnList.push({
					name: '确认收货',
					className: 'r',
					functionName: 'handleConfirmReceipt',
					functionParams: [ orderItem ]
				})
			}
			// 邀请拼单
			if ([ 6 ].includes(state)) {
				orderNeedBtnList.push({
					name: '邀请拼单',
					className: 'r',
					functionName: 'goSpellGroup',
					functionParams: [ orderItem ]
				})
			}
			// 再次开团 | 再次购买
			if ([5, 4, 10].includes(state)) {
				orderNeedBtnList.push({
					name: collageId !== 0 ? '再次开团' : '再次购买',
					className: 'r',
					functionName: 'handleBuyAgainEvent',
					functionParams: [ orderItem ]
				})
			}
			return orderNeedBtnList
		},
		handleOrderOptionButtonEvent(buttonItem) {
			const { functionName, functionParams } = buttonItem
			if (this[functionName]) {
				this[functionName](...functionParams)
			} else {
				throw new Error(`${buttonItem.name}的function在本VM中不存在`)
			}
		},
		handleOrderWriteOff(orderItem) {
			this.go(`/another-tf/another-serve/orderDetails/index?orderId=${orderItem.orderId}&showType=writeOff`)
		},
		handleCancelOrder(orderItem) {
			const modalOptions = {
				title: '温馨提示',
				content: '您确定要取消该订单吗？',
				confirmText: '确定取消',
				cancelText: '点错了',
				success: async (res) => {
					if (res.confirm) {
						uni.showLoading()
						try {
							await cancelShopOrderApi({ orderId: orderItem.orderId })
							this.$emit('refresh')
							uni.showToast({
								icon: 'none',
								title: '取消成功'
							})
						} finally {
							uni.hideLoading()
						}
					}
				}
			}
			uni.showModal(modalOptions)
		},
		handlePayOrder(orderItem) {
			const { orderPrice, collageId, orderId, shopId } = orderItem
			this.$emit('pay-order', {
				showPayPopup: true,
				pricePay: orderPrice,
				shopId,
				payInfo: {
					collageId,
					money: orderPrice,
					orderId,
					type: 2
				}
			})
		},
		goAfterSalesService(orderItem) {
			this.go(`/another-tf/another-serve/afterSaleApply/index?orderId=${orderItem.orderId}`)
		},
		goLogisticsInformation(orderItem) {
			this.go(`/another-tf/another-serve/logisticsInfo/index?express=${orderItem.express}&deliverFormid=${orderItem.deliverFormid}`)
		},
		handleConfirmReceipt(orderItem) {
			uni.showModal({
				title: '温馨提示',
				content: '确定您已经收到货物，否则会造成财产损失',
				confirmText: '确定收到',
				cancelText: '点错了',
				success: (res) => {
					if (res.confirm) {
						uni.showLoading({
							title: '确认中...'
						})
						updateOrderConfirmApi({
							orderId: orderItem.orderId
						}).then((result) => {
							uni.hideLoading()
							uni.showToast({
								title: '确认成功'
							})
							this.$emit('refresh')
						})
							.catch((e) => {
								uni.hideLoading()
							})
					}
				}
			})
		},
		goRefundDetail(orderItem) {
			this.go(`/another-tf/another-serve/refundDetails/index?item=${JSON.stringify(orderItem)}`)
		},
		goSpellGroup(orderItem) {
			this.go(`/another-tf/another-serve/inviteSpell/index?collageId=${orderItem.collageId}&orderId=${orderItem.orderId}&type=1&productId=${orderItem.skus[0].productId}&skuId=${orderItem.skus[0].skuId}&shopGroupWorkId=${orderItem.shopGroupWorkId}`)
		},
		handleBuyAgainEvent(orderItem) {
			// 判断拼团ID是否为0
			if (orderItem.collageId) {
				// 拼团直接跳回商品详情
				this.go(`/another-tf/another-serve/goodsDetails/index?shopId=${orderItem.shopId}&productId=${orderItem.skus[0].productId}&skuId=${orderItem.skus[0].skuId}`)
			} else {
				// 跳转详情
				this.handleGoBuyAgain(orderItem)
			}
		},
		async handleGoBuyAgain(orderItem) {
			// 循环sku，获取商品详情，并且判断库存
			const postAjax = []
			orderItem.skus.forEach((skuItem) => {
				postAjax.push(this.queryProductDetail(skuItem))
			})
			// 并发执行
			const skuDetailList = await Promise.all(postAjax)
			const canNotBuyNameList = []
			// 判断库存
			skuDetailList.forEach((skuDetail) => {
				for (const skuDetailSkuMapKey in skuDetail.map) {
					// 判断此SKU是否存在于传进来的item
					const findSku = orderItem.skus.find((skuItem) => skuItem.skuId === skuDetail.map[skuDetailSkuMapKey].skuId)
					if (findSku) {
						if (findSku.number > skuDetail.map[skuDetailSkuMapKey].stockNumber) {
							canNotBuyNameList.push(findSku.productName)
						}
					}
				}
			})
			// 如果有库存不足
			if (canNotBuyNameList.length > 0) return this.$showToast(canNotBuyNameList.join(',') + ' 库存不足')
			// 制造数据
			uni.setStorageSync(T_SKU_ITEM_DTO_LIST, [ {
				ifWork: orderItem.ifWork,
				shopId: orderItem.shopId,
				shopName: orderItem.shopName,
				shopDiscountId: orderItem.shopDiscountId,
				shopSeckillId: orderItem.shopSeckillId,
				skus: orderItem.skus
			} ])
			this.go('/another-tf/another-serve/orderConfirm/index?type=1')
		},
		async queryProductDetail(skuItem) {
			uni.showLoading({
				title: '加载中...',
				mask: true
			})
			const res = await getProductDetailsByIdApi({
				shopId: skuItem.shopId,
				productId: skuItem.productId,
				skuId: skuItem.skuId,
				terminal: 1
			})
			uni.hideLoading()
			return res.data
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
		align-items: center;
		justify-content: space-between;
		border-bottom: 1upx solid #eeeeee;

		.order-status {
			flex: 1;
			font-size: 32upx;
			color: #C5AA7B;
			text-align: right;
		}
	}

	.order-info-box {
		padding: 0 30upx;
		box-sizing: border-box;

		.order-info-item {
			display: flex;
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
						margin-top: 6upx;
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

				.btn.l {
					border: 2rpx solid #333333;
					color: #333;
				}

				.btn.r {
					border: 2rpx solid #C5AA7B;
					color: #C5AA7B;
				}
			}
		}

		.flexSpBetween {
			justify-content: space-between;
		}
	}
}
</style>
