<template>
	<view class="orders-container">

		<view class="navs">
			<view style="font-weight: bold;">商城：</view>
			<view
				v-for="item in orderTypesMall" :key="item.value" class="nav-item"
				:class="{ 'nav-item-active': currentStatus === item.value && currentType === 0 }"
				@click="handleSwitchStatus(item.value, 0)"
			>
				{{ item.label }}
			</view>
		</view>

		<view class="navs">
			<view style="font-weight: bold;">本地生活：</view>
			<view
				v-for="item in orderTypesStore" :key="item.value" class="nav-item"
				:class="{ 'nav-item-active': currentStatus === item.value && currentType === 1 }"
				@click="handleSwitchStatus(item.value, 1)"
			>
				{{ item.label }}
			</view>
		</view>

		<view v-if="orderList && orderList.length" class="order-list-wrapper">
			<view v-for="item in orderList" :key="item.id" class="goods-pane">
				<view class="order-no-status">
					<view class="order-no">订单号:{{ item.orderSn }}</view>
					<view class="order-status">{{ item.orderStatusText }}</view>
				</view>

				<view class="goods-list">
					<view v-for="goods in item.goodsList" :key="goods.id" class="goods-item">
						<image class="goods-img" :src="common.seamingImgUrl(goods.picUrl)" mode="" />

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
								}" class="uni-btn" @click="handleOpOrder(item)"
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
} from '../../../../api/order'
import { getUserId } from '../../../../utils'
export default {
	name: 'OrderList',
	data() {
		return {
			orderTypesMall: [
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
			orderTypesStore: [
				{
					label: '待付款',
					value: 8
				},
				{
					label: '已付款',
					value: 5
				},
				{
					label: '已核销',
					value: 6
				},
				{
					label: '已过期',
					value: 7
				},
				{
					label: '已取消',
					value: 9
				}
			],
			currentStatus: 0,
			currentType: 0,
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
				orderType: this.currentType,
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

		// 切换状态
		handleSwitchStatus(status, type) {
			this.currentStatus = status
			this.currentType = type
			this.query.page = 1
			this.query.size = 20
			this.getOrderList()
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

	.navs {
		display: flex;
		justify-content: space-between;
		margin: 34upx 0;
		padding-bottom: 20upx;
		padding: 0 32upx;
		box-sizing: border-box;

		.nav-item {
			transition: all 350ms;

			&.nav-item-active {
				color: #ff8f1f;
			}
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
