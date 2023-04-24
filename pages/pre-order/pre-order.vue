<template>
	<view v-if="calcOrderMsg" class="order-detail">
		<!-- <JHeader title="" width="50" height="50"></JHeader> -->
		<view class="back">
			<image src="../../static/images/user/back.png" alt="" class="back-img" @click="handleBack" />
		</view>
		<view class="main-area">
			<view class="address container" @click="go('/user/site/site-manage?appoint=true')">
				<!-- <JIcon width="26" height="34" type="locale"></JIcon> -->
				<view v-if="!defaultAddress" class="address-text">请选择收货地址</view>
				<view v-else class="address-detail">
					<view class="detailedAddress">
						{{
							defaultAddress.detailedAddress
						}}
					</view>
					<view class="contact">{{ defaultAddress.name }} {{ defaultAddress.mobile }}</view>
				</view>
				<view class="location">
					<image src="../../static/images/icon/location-logo.png" alt="" class="location-logo" />
				</view>
				<!-- <JIcon type="right-arrow" width="34" height="40"></JIcon> -->
			</view>

			<view v-if="orderInfo" class="order container">
				<view class="store-name">
					<text class="title"></text>{{ orderInfo.brand.name }}
				</view>
				<view class="goods">
					<image class="goods-img" :src="orderInfo.currentGoodsImg" mode="" />

					<view class="info">
						<view class="goods-name">{{ orderInfo.info.name }}</view>
						<view class="spa">{{ orderInfo.currentSpecification }}</view>
						<view class="dan-price">￥{{ orderInfo.currentPrice }}</view>
					</view>
				</view>

				<view class="words">
					<view class="title">留言</view>
					<textarea id="" v-model.trim="opForm.message" placeholder="可在此给留言给商家" cols="2" maxlength="20"
						placeholder-class="input-text"></textarea>
				</view>
			</view>
			<view class="line-list">
				<view class="line">
					<view class="title">商品金额</view>
					<view class="value">￥{{ calcOrderMsg.goodsTotalPrice }}</view>
				</view>

				<view class="line">
					<view class="title">运费</view>
					<view class="value">￥{{ calcOrderMsg.freightPrice }}</view>
				</view>

				<view class="line" @click="handleChooseCoupon">
					<view class="title">优惠劵</view>
					<text class="coupon-wrapper">
						<text v-if="couponPrice">-{{ couponPrice }}</text>
						<tui-icon name="arrowright" :size="20"></tui-icon>
					</text>
				</view>

				<view class="line-end">
					<view class="title">合计：</view>
					<view class="value">￥{{ calcOrderMsg.actualPrice }}</view>
				</view>
			</view>
		</view>
		<!-- <view class="prder-cost container" v-if="calcOrderMsg">
			<view class="line">
			<view class="title">订单总金额：</view>
			<view class="value">￥{{ calcOrderMsg.actualPrice }}</view>
			</view>

			<view class="line">
			<view class="title">总运费：</view>
			<view class="value">￥0</view>
			</view>
			</view> -->

		<view v-if="calcOrderMsg" class="footer">
			<text class="footer-text">￥{{ calcOrderMsg.actualPrice }}</text>
			<button class="uni-btn" @click="handleToPay">提交订单</button>
		</view>

		<CouponPopup v-model="couponPopupVisible" :cart-id="cartId" @confirm="handleConfirmChooseCoupon"></CouponPopup>
	</view>
</template>

<script>
import { getAddressListApi } from '../../api/address'
import { firstAddCar, submitOrderApi, payOrderGoodsApi, payOrderGoodsAPPApi } from '../../api/goods'
import { getUserId } from '../../utils'
import { payShopCarApi } from '../../api/cart'
import { PAY_GOODS, SELECT_ADDRESS, TUAN_ORDER_SN } from '../../constant'
export default {
	name: 'PreOrder',
	onLoad(options) {
		this.activityId = options.activityId || null
		this.getAddressList()
		this.getOrderInfo()
	},

	onShow() {
		this.getAddressList()
		if (uni.getStorageSync(TUAN_ORDER_SN)) {
			uni.redirectTo({
				url: '/user/orderForm/order-form?type=1'
			})
		}
	},

	data() {
		return {
			activityId: null,
			defaultAddress: '', // 收货地址
			orderInfo: null, // 订单相关信息
			cartId: '', // 购物车id
			opForm: {
				message: '',
				useVoucher: false
			},
			calcOrderMsg: null, // 计算现在的费用
			couponPopupVisible: false,
			couponId: -1, // 优惠劵id
			couponPrice: null,
			couponPrice: 0
		}
	},

	computed: {
		// 商品总金额
		sumGoodsPrice() {
			if (this.orderInfo) {
				return (
					this.orderInfo.number * this.orderInfo.selectedProduct.product.price
				)
			}
		}
	},

	methods: {
		handleBack() {
			uni.navigateBack()
		},
		// 获取地址
		getAddressList() {
			const address = uni.getStorageSync(SELECT_ADDRESS)
			console.log('有', address)
			if (address) {
				this.defaultAddress = address
				return
			}
			getAddressListApi({
				userId: getUserId()
			}).then(({ data }) => {
				console.log(data)
				const _this = this
				data.forEach((address) => {
					if (address.isDefault) {
						_this.defaultAddress = address
					}
				})
				if (!this.defaultAddress) {
					this.defaultAddress = data[0]
				}
			})
		},

		// 获取订单信息
		getOrderInfo() {
			this.orderInfo = uni.getStorageSync(PAY_GOODS)
			this.getCardId()
		},

		// 计算订单费用
		async getCardId() {
			const data = {
				userId: getUserId(),
				goodsId: this.orderInfo.info.id,
				productId: this.orderInfo.selectedProduct.product.id,
				number: this.orderInfo.number,
				useVoucher: this.isUserVoucher
			}
			const res = await firstAddCar(data)
			if (res.errno === 0) {
				this.cartId = res.data
				this.calcOrderCost()
			} else {
				uni.showToast({
					title: res.errmsg,
					duration: 2000,
					icon: 'none'
				})
			}
		},

		// 计算订单费用
		calcOrderCost() {
			uni.showLoading()
			const _this = this
			const data = {
				// addressId: this.defaultAddress.id,
				brandId: this.orderInfo.info.brandId,
				cartId: this.cartId,
				userId: getUserId(),
				couponId: this.couponId,
				grouponRulesId: '',
				useVoucher: this.opForm.useVoucher
			}
			payShopCarApi(data).then(({ data }) => {
				_this.calcOrderMsg = data
				uni.hideLoading()
			})
		},

		// 提交订单支付
		handleToPay() {
			if (!this.defaultAddress || !this.defaultAddress.id) {
				this.$showToast('请选择地址')
				return
			}
			const _this = this
			const submitData = {
				userId: getUserId(),
				cartId: this.cartId,
				addressId: _this.defaultAddress.id,
				couponId: this.couponId,
				grouponRulesId: '',
				grouponLinkId: '',
				brandId: _this.orderInfo.brandId,
				..._this.opForm
			}
			submitOrderApi(submitData).then(async ({ data: lastData }) => {
				uni.setStorageSync(TUAN_ORDER_SN, lastData.orderSn)

				// #ifdef H5
				payOrderGoodsApi({
					orderNo: lastData.orderSn,
					userId: getUserId(),
					payType: this.activityId ? 6 : 1,
					activityId: this.activityId // 跟活动（爆品）相关的商品
				}).then((res) => {
					const payData = JSON.parse(res.data.h5PayUrl)
					const data = JSON.parse(payData.data)
					const form = document.createElement('form')
					form.setAttribute('action', payData.url)
					form.setAttribute('method', 'POST')
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
				// #endif

				// #ifdef APP
				const payAppesult = await payOrderGoodsAPPApi({
					userId: getUserId(),
					orderNo: lastData.orderSn,
					payType: this.activityId ? 6 : 1,
					activityId: this.activityId // 跟活动（爆品）相关的商品
				})

				if (payAppesult.errno === 0) {

					let query = ''
					for (const key in payAppesult.data) {
						query += key + '=' + payAppesult.data[key] + '&'
					}

					plus.share.getServices(
						function (res) {
							let sweixin = null;
							for (let i in res) {
								if (res[i].id == 'weixin') {
									sweixin = res[i];
								}
							}
							console.log(sweixin);
							if (sweixin) {
								sweixin.launchMiniProgram({
									id: 'gh_e64a1a89a0ad',
									type: 0,
									path: 'pages/orderDetail/orderDetail?' + query
								});
							}
						}, function (e) {
							console.log('获取分享服务列表失败：' + e.message);
						}
					);
				}
				// #endif

			})
		},

		// 选择订单
		handleChooseCoupon() {
			this.couponPopupVisible = !this.couponPopupVisible
		},

		handleConfirmChooseCoupon(couponInfo) {
			this.couponId = couponInfo.id
			this.couponPrice = couponInfo.price
			this.calcOrderCost()
		}
	}
}
</script>

<style lang="less" scoped>
.order-detail {
	background-color: #f6f6f6;
	width: 100%;
	min-height: 100vh;
	height: auto;
	font-size: 28upx;
	color: #000;
	margin-bottom: 50px;

	.container {
		padding: 32upx 32upx;
		box-sizing: border-box;
		background-color: #fff;
	}

	/deep/ .j-header-container {
		padding: 30upx 40upx;
		box-sizing: border-box;
		background-color: #fff;
		border-radius: 0upx 0upx 24upx 24upx;
		// border-bottom: 1upx solid #ccc;
	}

	.back {
		padding: 30upx 40upx;
		box-sizing: border-box;
		background-color: #fff;
		border-radius: 0upx 0upx 24upx 24upx;

		.back-img {
			width: 24upx;
			height: 48upx;
		}
	}

	.main-area {
		padding: 20upx 20upx 0 20upx;
		box-sizing: border-box;
	}

	.address {
		display: flex;
		align-items: center;
		background-color: #fff;
		border-radius: 24upx;
		padding: 20upx;
		margin-top: 20upx;
		box-sizing: border-box;
		width: 100%;

		.address-detail {
			flex: 1;
			line-height: 1.5;
			font-size: 28upx;

			.detailedAddress {
				font-size: 32upx;
				font-weight: 500;
			}

			.contact {
				font-size: 28upx;
				color: #141000;
			}
		}

		/deep/ .j-icon {
			flex-shrink: 0;
			margin-right: 20upx;
		}

		.address-text {
			flex: 1;
			margin-left: 20upx;
		}

		.location {
			width: 64upx;
			height: 64upx;
			border: 2upx solid #605d52;
			border-radius: 40upx;
			display: flex;
			align-items: center;
			justify-content: center;

			.location-logo {
				width: 40upx;
				height: 40upx;
			}
		}
	}

	.coupon-wrapper {
		display: flex;
		align-items: center;
		color: #ef5452;

		/deep/ .tui-icon {
			vertical-align: text-top !important;
		}
	}

	.order {
		margin-top: 20upx;
		border-radius: 24upx;

		.store-name {
			// padding: 20upx 0;
			font-size: 28upx;
			// border-bottom: 1upx solid #dadada;
			color: #605d52;

			.title {
				color: #696969;
			}
		}

		.goods {
			display: flex;
			justify-content: space-around;
			align-items: flex-start;
			padding: 32upx 0;

			.goods-img {
				width: 200upx;
				height: 200upx;
				flex-shrink: 0;
				margin-right: 24upx;
				border-radius: 16upx;
			}

			.info {
				flex: 1;

				.goods-name {
					font-size: 28upx;
					margin-bottom: 20upx;
				}

				.spa {
					font-size: 24upx;
					color: #8f8d85;
				}

				.dan-price {
					color: #141000;
					margin-top: 10upx;
					font-size: 28upx;
					font-weight: 500;
				}
			}
		}

		.words {
			padding-top: 10upx;
			box-sizing: border-box;
			display: flex;
			// background-color: #f6f6f6;
			// border-radius: 4px;
			height: 70upx;

			.title {
				color: #605d52;
				white-space: nowrap;
				font-size: 28upx;
			}

			textarea {
				color: #696969;
				font-size: 28upx;
				margin-left: 144upx;
			}

			.input-text {
				display: flex;
				justify-content: flex-end;
			}
		}
	}

	.line-list {
		background: #ffffff;
		margin-top: 20upx;
		border-radius: 24upx;
		padding: 0upx 32upx;

		.line {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20upx 0;

			// margin-top: 20upx;
			.title {
				font-size: 28upx;
				color: #605d52;
			}

			.value {
				color: #141000;
			}
		}

		.line-end {
			font-size: 28upx;
			color: #141000;
			padding: 20upx 0;
			display: flex;
			justify-content: flex-end;

			.title {}

			.value {}
		}
	}

	.prder-cost {
		margin-top: 20upx;
		margin-bottom: 100upx;
		margin-left: 20upx;
		margin-right: 20upx;
		border-radius: 24upx;

		.line {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10upx 0;

			// margin-top: 20upx;
			.title {
				font-size: 28upx;
				color: #605d52;
			}

			.value {
				color: #141000;
			}
		}
	}

	.footer {
		padding: 0upx 32upx;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #fff;
		height: 120upx;
		display: flex;
		// justify-content: flex-end;
		justify-content: space-between;
		align-items: center;
		font-size: 30upx;
		border-radius: 24upx 24upx 0upx 0upx;

		&-text {
			color: #ef5452;
			font-size: 48upx;
			font-weight: bold;
		}

		.uni-btn {
			font-size: 32upx;
			width: 240upx;
			height: 88upx;
			background-color: #ffcb05;
			padding: 0 20upx;
			color: #fff;
			// line-height: 50px;
			// border-radius: 0;
			// margin-left: 20px;
			border-radius: 44upx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-weight: 500;
		}
	}
}
</style>
