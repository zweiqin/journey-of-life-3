<template>
	<view class="orders-container">
		<!-- <view class="header">
      <JBack width="50" dark height="50" tabbar="/pages/user/user"></JBack>
      <h2>我的订单</h2>
    </view> -->

		<view class="navs">
			<img src="../../static/images/user/back.png" alt="" class="back" @click="handleBack">
			<view class="nav-item" :class="{ 'nav-item-active': currentStatus === item.value }" v-for="item in orderTypes"
				:key="item.value" @click="handleSwitchStatus(item.value)">
				{{ item.label }}
			</view>
		</view>

		<view class="order-list-wrapper" v-if="orderList && orderList.length">
			<view class="goods-pane" v-for="item in orderList" :key="item.id">
				<view class="order-no-status" @click="handleToViewOrderDetail(item)">
					<view class="order-no">订单号:{{ item.orderSn }}</view>
					<view class="order-status">{{ item.orderStatusText }}</view>
				</view>

				<view class="goods-list" @click="handleToViewOrderDetail(item)">
					<view class="goods-item" v-for="goods in item.goodsList" :key="goods.id">
						<image class="goods-img" :src="goods.picUrl" mode="" />

						<view class="info">
							<view class="name">{{ goods.goodsName }}</view>

							<view class="good-sp-pr">
								<view class="sp">{{goods.specifications.join(',') }}</view>
								<view class="pr">￥{{ goods.price }}</view>
							</view>
						</view>

						<view>
							<view class="number" style="text-align: right;font-size: 28upx;color: #3A3629;">
								x {{ goods.number }}
							</view>
							<button v-if="item.handleOption.comment" class="ev-btn uni-btn"
								@click.stop="handleOpOrder(item, 'comment', goods)">
								去评论
							</button>
						</view>
					</view>
				</view>

				<view class="goods-ops">
					<view class="actual-price">
						共计：<text class="number">￥{{ item.actualPrice }}</text>
					</view>

					<view class="btns">
						<view v-for="btn in orderOpButtons" :key="btn.label">
							<button :style="{
								background: btn.color,
							}" @click="handleOpOrder(item, btn.key)" class="uni-btn"
								v-if="item.handleOption[btn.key] && btn.label !== '去评论'">
								{{ btn.label }}
							</button>
						</view>
					</view>
				</view>
			</view>

			<uni-load-more style="background: #fff" v-if="loadingStatus !== 'hidden'" :status="loadingStatus"></uni-load-more>
		</view>

		<JNoData v-if="loadingStatus === 'hidden' && !orderList.length" text="无购物记录" type="order-shop"></JNoData>
	</view>
</template>

<script>
import { orderTypes, orderOpButtons } from './config'
import {
	getOrderListApi,
	orderCancelApi,
	orderDeleteApi,
	receiveGoodsApi,
} from '../../api/order'
import { payOrderGoodsApi } from '../../api/goods'
import { getUserId } from '../../utils'
import { TUAN_ORDER_SN, PAY_SHORT_ORDER_NO } from '../../constant'
export default {
	data() {
		return {
			orderTypes,
			currentStatus: 0,
			query: {
				page: 1,
				size: 10,
			},
			orderOpButtons,
			totalPages: 0,
			orderList: [],
			loadingStatus: 'loading',
		}
	},

	onLoad(options) {
		this.currentStatus = options.type[0] * 1 || 0
		this.getOrderList()
	},

	onShow() {
		uni.removeStorageSync(PAY_SHORT_ORDER_NO)
		uni.removeStorageSync(TUAN_ORDER_SN)
	},

	methods: {
		handleBack() {
			uni.switchTab({ url: "/pages/user/user" })
		},

		// 获取订单信息
		getOrderList(loadMore) {
			uni.showLoading()
			this.loadingStatus = 'loading'
			getOrderListApi({
				userId: getUserId(),
				showType: this.currentStatus,
				...this.query,
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
		handleSwitchStatus(status) {
			this.currentStatus = status
			this.query.page = 1
			this.query.size = 20
			this.getOrderList()
		},

		// 点击操作按钮
		handleOpOrder(goods, key, currentGoods) {
			if (key === 'comment') {
				this.handleToViewOrderDetail(goods, currentGoods)
				return
			}
			const mapMethods = {
				cancel: {
					text: '确定要取消当前订单吗?',
					api: orderCancelApi,
				},
				delete: {
					text: '确定要删除当前订单吗?',
					api: orderDeleteApi,
				},
				confirm: {
					text: '确定要收货吗',
					api: receiveGoodsApi,
				},
			}

			const _this = this
			if (
				goods.handleOption[key] &&
				['cancel', 'delete', 'confirm'].includes(key)
			) {
				uni.showModal({
					title: '提示',
					content: mapMethods[key].text,
					success: function (res) {
						if (res.confirm) {
							mapMethods[key]
								.api({
									userId: getUserId(),
									orderId: goods.id,
								})
								.then(() => {
									_this.query.page = 1
									_this.getOrderList()
								})
						}
					},
				})
			} else {
				if (key === 'pay') {
					payOrderGoodsApi({
						orderNo: goods.orderSn,
						userId: getUserId(),
						payType: 1,
					}).then(res => {
						const payData = JSON.parse(res.h5PayUrl)
						const form = document.createElement('form')
						form.setAttribute('action', payData.url)
						form.setAttribute('method', 'POST')
						const data = JSON.parse(payData.data)
						let input
						for (const key in data) {
							input = document.createElement('input')
							input.name = key
							input.value = data[key]
							form.appendChild(input)
						}

						document.body.appendChild(form)
						form.submit()
						document.body.removeChild(form)
					})
				}
			}
		},

		// 查看详情
		handleToViewOrderDetail(goods, currentGoods) {
			uni.navigateTo({
				url:
					'/user/orderForm/order-form-detail?id=' +
					goods.id +
					(currentGoods ? '&goodsId=' + currentGoods.id : ''),
			})
		},
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
	},
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

	.navs {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 34upx 0;
		padding-bottom: 20upx;
		padding: 0 32upx;
		box-sizing: border-box;

		.back {
			width: 24upx;
			height: 48upx;
		}

		.nav-item {
			padding-top: 14upx;
			display: flex;
			justify-content: center;
			position: relative;
			width: 96upx;
			height: 56upx;
			transition: all 350ms;
			font-size: 32upx;
			color: #8F8D85;

			&::after {
				content: '';
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				bottom: 0;
				width: 0;
				height: 8upx;
				border-radius: 10upx;
				background-color: #FFC117;
				transition: all 350ms ease-in;
			}

			&.nav-item-active {
				color: #141000;
				font-weight: 500;

				// color: #ff8f1f;
				&::after {
					width: 40upx;
				}
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

					.uni-btn {
						font-size: 24upx;
						color: #fff;
						line-height: 2.5;
						padding: 0 28upx;
						background-color: #f40;
						white-space: nowrap;
						margin-left: 20upx;
						border-radius: 32upx;
					}
				}
			}
		}

		.ev-btn {
			font-size: 24upx;
			color: #fff;
			padding: 18upx 28upx;
			background-color: rgb(132, 195, 65);
			white-space: nowrap;
			margin-left: 20upx;
			border-radius: 4upx;
			margin-top: 20upx;
		}
	}
}</style>
