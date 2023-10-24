<template>
	<view class="b-order-form">
		<PageLoading v-if="pageLoading"></PageLoading>

		<view v-if="orderDetailInfo && !pageLoading" class="main">
			<view class="page-header">
				<view class="status-wrapper">
					<image
						class="back-icon" src="../../static/images/new-community/shop/order-detail-back.png"
						@click="handleNavigate('/pages/order/order', 'tabbar')"
					>
					</image>
					<view class="order-status">{{ orderDetailInfo.orderStatus | mapOrderStatus }}</view>
				</view>

				<view class="other-btns" style="margin-right: 20upx;">
					<tui-icon
						style="margin-left: 20upx;" name="order" color="#ef5613"
						:size="20" @click="handleNavigate('/pages/order/order', 'tabbar')"
					></tui-icon>
				</view>
			</view>
			<view class="main">
				<view class="item user-info">
					<tui-icon name="gps"></tui-icon>
					<view class="content">
						<text class="text">{{ orderDetailInfo.customerName }}</text>
						<text class="text">{{ orderDetailInfo.customerMobile }}</text>
						<text class="text">{{ orderDetailInfo.customerAddress }}</text>
						<text class="text">{{ orderDetailInfo.customerAddressDetail }}</text>
					</view>
				</view>

				<view class="item goods-info">
					<view
						v-if="orderDetailInfo.laoaModuanShop" class="shop-info"
						@click="handleNavigate('/community-center/shop/shop-detail?shopId=' + orderDetailInfo.laoaModuanShop.id, 'url')"
					>
						<tui-icon color="#ef5613" :size="20" name="shop-fill"></tui-icon>
						<view class="shop-name">
							{{ orderDetailInfo.laoaModuanShop.shopName ||
								orderDetailInfo.laoaModuanShop.shopNameSimple }}
						</view>
						<tui-icon name="arrowright" :size="20" color="#ccc"></tui-icon>
					</view>

					<view class="goods-wrapper">
						<image :src="orderDetailInfo.goodsVo.goodsUrl" class="goods-img"></image>
						<view class="order-goods-info">
							<view class="goods-name">{{ orderDetailInfo.goodsVo.goodsName }}</view>
							<view class="goods-price">￥{{ orderDetailInfo.goodsVo.goodsPrice }}</view>
						</view>
						<view class="goods-number">x 1</view>
					</view>

				</view>

				<view class="item">
					<view class="item-bar">
						<view class="item-bar-title">订单号</view>
						<view class="item-bar-content orderNo">
							<view class="order-no-text">{{ orderDetailInfo.orderNo }} </view><button
								class="uni-btn"
								@click="handleCopyOrderNo(orderDetailInfo.orderNo)"
							>
								复制单号
							</button>
						</view>
					</view>

					<view class="item-bar">
						<view class="item-bar-title">订单总额</view>
						<view class="item-bar-content">￥{{ orderDetailInfo.totalAmount }}</view>
					</view>

					<view class="item-bar">
						<view class="item-bar-title">代金券使用</view>
						<view class="item-bar-content">{{ orderDetailInfo.deductionAmount }} 个</view>
					</view>

					<view class="item-bar">
						<view class="item-bar-title">实付款</view>
						<view class="item-bar-content" style="color: #fa5151">￥{{ orderDetailInfo.actualAmount }}</view>
					</view>
				</view>
			</view>
			<view class="footer">
				<block v-for="item in businessOrderOPButtons" :key="item.key">
					<button
						v-if="item.show(orderDetailInfo)" :style="{ background: item.color }" class="uni-btn"
						@click="handleOpBOrder(item.key)"
					>
						{{ item.label
						}}
					</button>
				</block>
			</view>
		</view>

		<tui-toast ref="toast"></tui-toast>
		<CancelOrderPopup ref="cancelOrderPopupRef" @success="getOrderInfo(orderDeatil.orderNo)"></CancelOrderPopup>
		<tui-modal
			:show="deleteOrderVisible" title="提示" content="确定要删除当前订单吗？"
			@click="handleDeleteOrderModal" @cancel=" deleteOrderVisible = false;"
		></tui-modal>
	</view>
</template>

<script>
import { getBOrderInfoApi, deleteBOrderApi } from '../../api/community-center'
import PageLoading from '../../pages/order/components/Loading'
import { mapBusinessOrderStatus, businessOrderOPButtons } from '../../pages/order/config'
import CancelOrderPopup from '../../pages/order/components/CancelOrderPopup.vue'
import { payShopFn } from '../../utils'

export default {
	name: 'BOrderForm',
	components: {
		PageLoading,
		CancelOrderPopup
	},

	filters: {
		mapOrderStatus(status) {
			if (!status && status !== 0) return '未知状态'
			const statusInfo = mapBusinessOrderStatus.find((item) => item.value === status)
			if (!statusInfo) return '未知状态'
			return statusInfo.label
		}
	},
	data() {
		return {
			pageLoading: false,
			businessOrderOPButtons: Object.freeze(businessOrderOPButtons),
			orderDetailInfo: null,
			deleteOrderVisible: false,
			timer: null
		}
	},
	onLoad(params) {
		this.$nextTick(() => {
			const { orderNo } = params
			if (orderNo) {
				this.getOrderInfo(orderNo)
			} else {
			}
		})
	},

	methods: {
		async getOrderInfo(orderNo) {
			try {
				this.pageLoading = true
				const res = await getBOrderInfoApi({
					orderNo
				})

				this.orderDetailInfo = res
			} catch (error) {
				this.ttoast({
					type: 'fail',
					title: '获取订单详情失败'
				})
			} finally {
				this.pageLoading = false
			}
		},

		/**
     * 点击复制单号
     */

		handleCopyOrderNo(orderNo) {
			uni.setClipboardData({
				data: orderNo,
				showToast: false,
				success: () => {
					this.ttoast('复制成功')
				},
				fail: (fail) => {
					this.ttoast({
						type: 'fail',
						title: '复制失败',
						content: fail
					})
				}
			})
		},

		// 操作商圈订单
		async handleOpBOrder(key) {
			switch (key) {
				case 'cancel':
					this.$refs.cancelOrderPopupRef.show(this.orderDetailInfo)
					break
				case 'delete':
					this.deleteOrderVisible = true
					break
				case 'pay':
					try {
						payShopFn(this.orderDetailInfo, '', false)
					} catch (error) {
						this.ttoast({
							type: 'fail',
							title: '支付失败',
							content: error
						})
					}
					break
				default:
					break
			}
		},

		// 删除订单
		async handleDeleteOrderModal(e) {
			if (e.index) {
				try {
					await deleteBOrderApi(this.orderDetailInfo.id)
					this.ttoast('订单删除成功')

					if (this.timer) {
						clearTimeout(this.timer)
					}

					this.timer = setTimeout(() => {
						uni.switchTab({
							url: '/pages/order/order'
						})
					}, 2000)
				} catch (error) {
					this.ttoast({
						type: 'fail',
						title: '订单删除失败',
						content: error
					})
				} finally {
					this.deleteOrderVisible = false
				}
			} else {
				this.deleteOrderVisible = false
			}
		},

		handleNavigate(url, type) {
			if (type === 'tabbar') {
				uni.switchTab({
					url
				})
			} else if (type === 'url') {
				uni.navigateTo({
					url
				})
			}
		}
	}
}
</script>

<style lang="less" scoped>
.b-order-form {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #f6f6f6;

  .main {
    width: 100%;
    padding: 10upx;
    box-sizing: border-box;
    overflow: scroll;

    .page-header {
      height: 100upx;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      // background-color: #ff0000;

      .status-wrapper {
        display: flex;
        align-items: center;

        .back-icon {
          width: 50upx;
          height: 50upx;
          flex-shrink: 0;
        }

        .order-status {
          font-size: 32upx;
          font-weight: bold;
          color: #000;
          margin-left: 40upx;
        }
      }
    }

    .item {
      width: 100%;
      padding: 20upx;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 20upx;
      margin-bottom: 20upx;
    }

    .user-info {
      display: flex;
      align-items: center;

      .content {
        margin-left: 30upx;

        .text {
          font-size: 28upx;
        }
      }
    }

    .goods-info {
      padding: 30upx 20upx;

      .shop-info {
        display: flex;
        align-items: center;
        font-size: 32upx;
        font-weight: 500;
        margin-bottom: 20upx;

        .shop-name {
          margin-left: 10upx;
        }
      }

      .goods-wrapper {
        display: flex;
        align-items: center;
        margin-bottom: 20upx;

        .goods-img {
          width: 140upx;
          height: 140upx;
          border-radius: 20upx;
        }

        .order-goods-info {
          flex: 1;
          margin: 0 30upx;

          .goods-name {
            font-size: 30upx;
            font-weight: 500;
            margin-bottom: 20upx;
          }

          .goods-price {
            font-size: 24upx;
            color: #fa5151;
          }
        }
      }

    }

    .item-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20upx 0;

      &-title {
        font-size: 28upx;
        font-weight: 500;
      }

      &-content {
        font-size: 28upx;
        // color: #fa5151;

        &.orderNo {
          display: flex;
          align-items: center;
          color: #3d3d3d;

          .order-no-text {
            padding-right: 16upx;
            margin-right: 16upx;
            border-right: 1upx solid #ccc;
          }

          .uni-btn {
            font-size: 28upx;
            color: #ccc;
          }
        }
      }
    }
  }

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    height: 120upx;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 20upx;
    box-sizing: border-box;

    .uni-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20upx 30upx;
      font-size: 28upx;
      color: #fff;
      margin-left: 20upx;
    }
  }
}
</style>
