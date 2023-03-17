<template>
	<view class="orders-container">

		<view v-if="orderList && orderList.length" class="order-list-wrapper">
			<view v-for="item in orderList" :key="item.id" class="goods-pane">
				<view class="order-no-status">
					<view class="order-no">订单号:{{ item.orderSn }}</view>
					<view class="order-status">{{ item.orderStatusText }}</view>
				</view>

				<view class="goods-list">
					<view v-for="goods in item.goodsList" :key="goods.id" class="goods-item">
						<image class="goods-img" :src="goods.picUrl" mode="" />

						<view class="info">
							<view class="name">{{ goods.goodsName }}</view>

							<view class="good-sp-pr">
								<view class="sp">{{ goods.specifications.join(',') }}</view>
								<view class="pr">￥{{ goods.price }}</view>
							</view>
						</view>

						<view>
							<view class="number" style="text-align: right;font-size: 28upx;color: #3A3629;">
								x {{ goods.number }}
							</view>
						</view>
					</view>
				</view>

				<view class="goods-ops">
					<view class="actual-price">
						共计：<text class="number">￥{{ item.actualPrice }}</text>
					</view>

					<view class="btns">
						<view>
							<button
								:style="{
									background: '#FFC117'
								}" class="uni-btn"
								@click="handleOpOrder(item)"
							>
								发送
							</button>
						</view>
					</view>
				</view>
			</view>

			<uni-load-more v-if="loadingStatus !== 'hidden'" style="background: #fff" :status="loadingStatus"></uni-load-more>
		</view>

		<JNoData v-if="loadingStatus === 'hidden' && !orderList.length" text="无购物记录" type="order-shop"></JNoData>
	</view>
</template>

<script>
import {
	getOrderListApi
} from '../../../api/order'
import { getUserId } from '../../../utils'
export default {
	name: 'OrderList',
	data() {
		return {
			orderTypes: [
				{
					label: '全部',
					value: 0,
					key: 'all'
				},
				{
					label: '待付款',
					value: 1,
					key: 'awaitPay'
				},
				{
					label: '待发货',
					value: 2,
					key: 'awaitShipped'
				},
				{
					label: '待收货',
					value: 3,
					key: 'awaitReceipt'
				},
				{
					label: '待评价',
					value: 4,
					key: 'awaitEvaluate'
				}
			],
			currentStatus: 0,
			query: {
				page: 1,
				size: 10
			},
			totalPages: 0,
			orderList: [],
			loadingStatus: 'loading'
		}
	},

	created() {
		this.getOrderList()
	},

	methods: {

		// 获取订单信息
		getOrderList(loadMore) {
			uni.showLoading()
			this.loadingStatus = 'loading'
			getOrderListApi({
				userId: getUserId(),
				showType: this.currentStatus,
				...this.query
			}).then(({ data }) => {
				if (loadMore) {
					this.orderList.push(...data.data)
				} else {
					this.orderList = data.data
				}
				this.totalPages = data.totalPages
				this.loadingStatus = 'hidden'
				uni.hideLoading()

				console.log(data)
			})
		},

		// 点击操作按钮
		handleOpOrder(order) {
			this.$emit('send', { meaning: 'order', msg: { id: order.id, orderSn: order.orderSn || '', orderStatusText: order.orderStatusText || '', mobile: order.mobile || '', goodsPrice: order.goodsPrice || '', actualPrice: order.actualPrice || '' } })
		}
	},

	onReachBottom() {
		if (this.orderList.length < this.query.size) {
			this.loadingStatus = 'noMore'
			return
		}

		if (this.query.page >= this.totalPages) {
			this.loadingStatus = 'noMore'
			return
		}

		this.query.page++
		this.getOrderList(true)
	}
}
</script>

<style lang="less" scoped>
.orders-container {
	font-size: 28upx;
	color: #3d3d3d;
	// padding: 60upx 0;

	.header {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		color: #000;
		padding: 0 32upx;
		box-sizing: border-box;

		h2 {
			font-weight: normal;
			font-size: 32upx;
			margin-top: -8upx;
		}
	}

	.order-list-wrapper {
		background-color: #f6f6f6;
		padding-top: 10px;
		font-size: 24upx;

		.goods-pane {
			padding: 32upx;
			box-sizing: border-box;
			background-color: #fff;
			margin-bottom: 20upx;
			border-radius: 24upx;
			margin-left: 20upx;
			margin-right: 20upx;

			&:nth-of-type(:last-child) {
				margin-bottom: 0;
			}

			.order-no-status {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding-bottom: 16upx;
				// border-bottom: 1upx solid #dbdbdb;

				.order-no {
					font-size: 28upx;
					color: #605D52;
				}

				.order-status {
					color: #FFC117;
					font-size: 28upx;
				}
			}

			.goods-list {
				padding: 20upx 0;

				.goods-item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 30upx;

					.info {
						flex: 1;
						height: 100%;
						display: flex;
						justify-content: space-between;
						flex-direction: column;

						.name {
							font-size: 28upx;
							font-weight: 500;
							width: 300upx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						.good-sp-pr {
							margin-top: 12upx;

							.sp {
								line-height: 1.5;
								color: #8F8D85;
								font-size: 24upx;
								margin-bottom: 20upx;
							}

							.pr {
								font-size: 28upx;
							}
						}
					}

					.goods-img {
						width: 140upx;
						height: 140upx;
						object-fit: cover;
						margin-right: 20upx;
					}
				}
			}

			.goods-ops {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-top: 20upx;
				border-top: 1upx solid #F1F1F0;

				.actual-price {
					font-size: 28upx;
					font-weight: 500;
					color: #141000;

					.number {
						color: #141000;
					}
				}

				.btns {
					display: flex;
					align-items: center;
				}
			}
		}

    .uni-btn {
      border: 1upx solid #3d3d3d;
      padding: 0 28upx;
      color: #3d3d3d;
      line-height: 2.5;
      font-size: 28upx;
      margin-left: 30upx;
    }
	}
}
</style>
