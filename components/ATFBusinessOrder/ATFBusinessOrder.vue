<template>
	<view class="business-order">
		<view
			style="padding: 20rpx 30rpx;display: flex;align-items: center;justify-content: space-between;border-bottom: 2rpx solid #eeeeee;"
		>
			<view
				v-if="!data.shopName.startsWith('团蜂')" style="display: flex;align-items: center;"
				@click.stop="go(`/another-tf/another-user/shop/shop-detail?shopId=${data.shopId}`)"
			>
				<image :src="data.shopLogo" style="width: 36rpx;height: 36rpx;margin-right: 10rpx;" />
				<text style="font-size: 30rpx;color: #333;font-weight: bold;">{{ data.shopName }}</text>
				<tui-icon name="arrowright" :size="25" color="#999999"></tui-icon>
			</view>
			<view style="flex: 1;font-size: 32rpx;color: #C5AA7B;text-align: right;">
				<text v-if="data.afterState">
					<text v-if="[5, 6, 9].includes(data.afterState)">
						{{ `【退】${afterConditionEnum(data.afterState)}-${orderTypeEnum[data.state]}` }}
					</text>
					<text v-else>{{ `【退】${afterConditionEnum(data.afterState)}` }}</text>
				</text>
				<text v-else>{{ orderTypeEnum[data.state] || '--' }}</text>
			</view>
		</view>
		<view style="padding: 20rpx;">
			<view @click="isToDetail && go(`/another-tf/another-serve/orderDetails/index?orderId=${data.orderId}`)">
				<view>
					<view v-for="(skuItem, skuIndex) in showSkusArr" :key="skuIndex" style="display: flex;padding: 20rpx 0 0;">
						<image :src="skuItem.image" style="width: 180rpx;height: 180rpx;margin-right: 30rpx;" />
						<view style="flex: 1;display: flex;flex-direction: column;justify-content: space-between;">
							<view
								v-if="skuItem.productName"
								style="font-size: 26rpx;color: #333;display: -webkit-box;overflow: hidden;text-overflow: ellipsis;word-break: break-all;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
							>
								{{ skuItem.productName }}
							</view>
							<view
								v-if="skuItem.presenterVoucher"
								style="width: fit-content;margin-top: 10rpx;padding: 6rpx 12rpx;background-color: #f0f0f0;font-size: 28rpx;color: #fa5151;border-radius: 22rpx;"
							>
								赠送 {{ skuItem.price
									? `${(Number.parseFloat(skuItem.presenterVoucher / skuItem.price).toFixed(3) * 1000) / 10}%`
									: skuItem.presenterVoucher }} 代金券
							</view>
							<view v-if="skuItem.value" style="margin-top: 8rpx;font-size: 24rpx;color: #999999;">
								{{ skuItem.value }}
							</view>
							<view style="display: flex;justify-content: space-between;">
								<view style="font-size: 28rpx;">
									<text style="color: #333333;">￥{{ skuItem.price || 0 }}</text>
									<text style="margin-left: 20rpx;color: #999;">x {{ skuItem.number && skuItem.number }}</text>
								</view>
								<view v-if="showOperate">
									<tui-button
										v-if="[3, 4].includes(data.state) && (data.orderType === 1)" type="brown" width="150rpx"
										height="56rpx" margin="8rpx 0 0" :size="28"
										@click="go(`/another-tf/another-user/product-logistics/index?orderId=${data.orderId}&skuId=${skuItem.skuId}`)"
									>
										查看物流
									</tui-button>
									<tui-button
										v-if="[4, 10].includes(data.state) && (skuItem.commentId === 0)" type="brown"
										width="150rpx" height="56rpx" margin="8rpx 0 0" :size="28"
										@click="go(`/another-tf/another-serve/evaluate/index?orderId=${data.orderId}&skuId=${skuItem.skuId}`)"
									>
										立即评价
									</tui-button>
									<tui-button
										v-if="[4, 10].includes(data.state) && (skuItem.commentId !== 0) && (data.skus[0].ifAdd !== 1)"
										type="brown" width="150rpx" height="56rpx" margin="8rpx 0 0"
										:size="28"
										@click="handleAddEvaluate(skuItem)"
									>
										追加评价
									</tui-button>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-if="!isShowAll" style="padding: 20rpx 0 0;">
					<tui-button
						type="warning" plain width="180rpx" height="54rpx"
						shape="circle" margin="0 auto"
						@click="(isShowAll = true) && (showSkusArr = data.skus)"
					>
						显示全部
					</tui-button>
				</view>
				<view style="font-size: 26rpx;color: #333333;text-align: right;padding: 20rpx 0 0;">
					<text v-if="data.orderPrice">
						总价￥{{ Number.parseFloat(Number(data.orderPrice || 0)).toFixed(2) }}
						<text v-if="data.logisticsPrice">
							，物流￥{{ Number.parseFloat(Number(data.logisticsPrice || 0)).toFixed(2) }}
						</text>
						，优惠￥{{ data.discountPrice }}
						<text v-if="data.price">
							，{{ [1, 8].includes(data.state) ? '应付￥' : '实付￥' }}{{ data.price }}
						</text>
					</text>
				</view>
				<view v-if="isShowOther" style="font-size: 26rpx;padding: 20rpx 0 0;">
					<view style="display: flex;align-items: center;justify-content: space-between;padding-top: 4upx;">
						<view>
							<text>订单编号</text>
							<text style="margin-left: 32upx;">{{ data.orderFormid || '--' }}</text>
						</view>
						<view style="color: #EF530E;" @click="$copy(data.orderFormid)">复制</view>
					</view>
					<view style="padding-top: 4upx;">
						<text>创建时间</text>
						<text style="margin-left: 32upx;">{{ data.createTime || '--' }}</text>
					</view>
					<view style="padding-top: 4upx;">
						<text>收货人</text>
						<text style="margin-left: 32upx;">{{ data.receiveName || '--' }}</text>
					</view>
				</view>
			</view>

			<view v-if="showOperate" style="padding: 10rpx 0 0;">
				<view style="display: flex;align-items: center;border-top: 2rpx solid #eeeeee;padding: 10rpx 0 0;">
					<tui-button
						v-for="buttonItem in getOrderOptionButtonObj(data)" :key="buttonItem.name"
						:type="buttonItem.btnType" plain width="150rpx" height="56rpx"
						margin="0 18rpx 0 0" :size="28"
						@click="handleOrderOptionButtonEvent(buttonItem)"
					>
						{{ buttonItem.name }}
					</tui-button>
				</view>
				<!-- <tui-icon
					v-if="(data.state === 5) || (data.state === 9)" name="delete" :size="14" color="#333333"
					@click="handleDeleteOrder(data)"
					></tui-icon> -->
			</view>
		</view>
	</view>
</template>

<script>
import { afterConditionEnum, orderTypeEnum } from '../../components/ATFOrderInfo/config'
import { deleteShopOrderApi, cancelShopOrderApi, updateOrderConfirmApi } from '../../api/anotherTFInterface'
import { T_SKU_ITEM_DTO_LIST } from '../../constant'
import { resolveShowCanNotBuyMsg } from '../../utils'
export default {
	name: 'ATFBusinessOrder',
	props: {
		data: {
			type: Object,
			required: true
		},
		showOperate: {
			type: Boolean,
			default: false
		},
		isToDetail: {
			type: Boolean,
			default: false
		},
		isShowOther: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			orderTypeEnum,
			showSkusArr: [],
			isShowAll: false
		}
	},

	watch: {
		data: {
			handler(newValue, oldValue) {
				if (newValue.skus && (newValue.skus.length === 1)) {
					this.showSkusArr = newValue.skus
					this.isShowAll = true
				} else if (newValue.skus && (newValue.skus.length > 1)) {
					if (this.isShowAll) {
						this.showSkusArr = newValue.skus
					} else {
						this.showSkusArr = [ newValue.skus[0] ]
					}
				} else if (!newValue.skus || !newValue.skus.length) {
					this.isShowAll = true
				}
			},
			immediate: true,
			deep: true
		}
	},

	methods: {
		afterConditionEnum,
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
			// 		btnType: 'black',
			// 		functionName: 'handleCancelOrder',
			// 		functionParams: [ orderItem ]
			// 	})
			// }
			// 核销码
			if ([8, 9].includes(state)) {
				orderNeedBtnList.push({
					name: '核销码',
					btnType: 'black',
					functionName: 'handleOrderWriteOff',
					functionParams: [ orderItem ]
				})
			}
			// 立即付款
			if ([1, 8].includes(state)) {
				orderNeedBtnList.push({
					name: '立即付款',
					btnType: 'warning',
					functionName: 'handlePayOrder',
					functionParams: [ orderItem ]
				})
			}
			// 申请售后
			// if ([2, 3, 4, 9, 10].includes(state) && [0, 6].includes(Number(afterState)) && (skus[0].ifAdd !== 1) && skus.some((i) => i.classifyId != 1439)) {
			// 	orderNeedBtnList.push({
			// 		name: '申请售后',
			// 		btnType: 'black',
			// 		functionName: 'goAfterSalesService',
			// 		functionParams: [ orderItem ]
			// 	})
			// }
			// 退款详情
			if ([ 1 ].includes(returnType)) {
				orderNeedBtnList.push({
					name: '退款详情',
					btnType: 'black',
					functionName: 'goRefundDetail',
					functionParams: [ orderItem ]
				})
			}
			// 查看物流
			if ([3, 4].includes(state) && (orderType === 2)) { // orderType：1半子，2商城
				orderNeedBtnList.push({
					name: '查看物流',
					btnType: 'black',
					functionName: 'goLogisticsInformation',
					functionParams: [ orderItem ]
				})
			}
			// 确认收货
			if ([ 3 ].includes(state)) {
				orderNeedBtnList.push({
					name: '确认收货',
					btnType: 'warning',
					functionName: 'handleConfirmReceipt',
					functionParams: [ orderItem ]
				})
			}
			// 邀请拼单
			if ([ 6 ].includes(state)) {
				orderNeedBtnList.push({
					name: '邀请拼单',
					btnType: 'warning',
					functionName: 'goSpellGroup',
					functionParams: [ orderItem ]
				})
			}
			// 再次开团 | 再次购买
			if ([5, 4, 10].includes(state)) {
				orderNeedBtnList.push({
					name: collageId !== 0 ? '再次开团' : '再次购买',
					btnType: 'warning',
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
			this.go(`/another-tf/another-serve/refundDetails/index?orderId=${orderItem.orderId}&afterId=${orderItem.afterId}`)
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
			const { canNotBuySkuList, canNotSaleSkuList } = await resolveShowCanNotBuyMsg(orderItem.skus)
			if (canNotBuySkuList.length || canNotSaleSkuList.length) return
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
		}
	}
}
</script>

<style lang="less" scoped>
.business-order {
	margin-bottom: 20rpx;
	background: #fff;
	border-radius: 10rpx;
	box-sizing: border-box;
}
</style>
