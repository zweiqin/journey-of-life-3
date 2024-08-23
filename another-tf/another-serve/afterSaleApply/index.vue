<!-- 申请售后 -->
<template>
	<view class="after-sale-apply-container">
		<JHeader title="选择商品" width="50" height="50"></JHeader>
		<view class="content">
			<view class="order-list-box">
				<view class="item">
					<view class="order-info-box">
						<view class="order-info">
							<checkbox-group @change="checkboxChange">
								<checkbox
									v-for="(item, index) in orderMsg.skus" :key="index"
									:disabled="item.afterState || (item.classifyId == 1439)" :checked="item.checked" :value="String(index)"
									active-background-color="#C5AA7B"
								>
									<view class="order-info-item">
										<image :src="common.seamingImgUrl(item.image)" class="product-img"></image>
										<view class="info-box">
											<text class="product-name">{{ item.productName }}</text>
											<view class="product-sku">{{ item.value }}</view>
											<view class="price-sku-box">
												<text class="product-price">
													<text class="fuhao">￥</text>
													{{ item.price }}
												</text>
												<text class="product-num">x {{ item.number }}</text>
											</view>
										</view>
									</view>
								</checkbox>
							</checkbox-group>
						</view>
					</view>
				</view>
			</view>
			<view class="afterSale-select-box">
				<view class="selectBtn flex-items flex-sp-between">
					<view class="selectBox">
						<checkbox-group @change="changeAll">
							<view>
								<checkbox
									:disabled="orderMsg.skus.some(i => i.afterState || (i.classifyId == 1439))"
									:checked="allCheck.checked" :value="allCheck.value" color="#C5AA7B"
								></checkbox>
								<text>{{ allCheck.name }}</text>
							</view>
						</checkbox-group>
					</view>
					<view class="selectRight flex-items">
						<view class="selectNum mar-right-25">{{ number || 0 }}件商品</view>
						<view class="totalPrice">
							合计：
							<text>￥{{ total.toFixed(2) }}</text>
						</view>
					</view>
				</view>
				<view class="afterBtnBox flex-items flex-sp-between">
					<view class="afterBtn1" @click="ReturnMoney(orderMsg)">
						仅退款
					</view>
					<view v-if="[3, 4, 5, 7, 9, 10].includes(orderMsg.state)" class="afterBtn2" @click="ReturnGoods(orderMsg)">
						退款退货
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getReturnPriceRefundMoneyApi, getOrderDetailApi } from '../../../api/anotherTFInterface'
import { T_AFTER_SALE_APPLY_REFUND } from '../../../constant'

export default {
	name: 'AfterSaleApply',
	data() {
		return {
			orderMsg: { skus: [] },
			checkboxChangelist: [],
			xuanzlist: [],
			allCheck: {
				name: '全选',
				value: 'all',
				checked: false
			},
			number: null,
			total: 0
		}
	},
	onLoad(options) {
		uni.showLoading()
		getOrderDetailApi({ orderId: options.orderId, noticeId: 0 })
			.then((res) => {
				uni.hideLoading()
				this.orderMsg = res.data
				this.orderMsg.skus.map((item) => ({ ...item, checked: false }))
			})
			.catch((e) => {
				uni.hideLoading()
			})
	},
	methods: {
		// 算钱
		HandleGetRefundMoney() {
			return new Promise((resolve, reject) => {
				if (this.xuanzlist.length <= 0) {
					resolve(0)
					return
				}
				uni.showLoading()
				getReturnPriceRefundMoneyApi({
					orderId: this.orderMsg.orderId,
					isAllSelect: this.xuanzlist.length === this.orderMsg.skus.length ? 1 : 0,
					skus: this.xuanzlist
				})
					.then((res) => {
						uni.hideLoading()
						resolve(parseFloat(res.json))
					})
					.catch((e) => {
						uni.hideLoading()
					})
			})
		},
		// 申请退款
		ReturnMoney(item) {
			if (this.xuanzlist.length <= 0) {
				uni.showToast({
					title: '请选择退款的商品',
					duration: 2000,
					icon: 'none'
				})
			} else {
				uni.setStorageSync(T_AFTER_SALE_APPLY_REFUND, this.xuanzlist)
				uni.redirectTo({
					url: '/another-tf/another-serve/afterSaleApplyRefund/index?orderId=' + this.orderMsg.orderId + '&isAllSelect=' + (this.xuanzlist.length === this.orderMsg.skus.length ? 1 : 0)
				})
			}
		},
		// 全选
		async changeAll(e) {
			if (e.detail.value.length == 0) {
				this.orderMsg.skus.forEach((item) => this.$set(item, 'checked', false))
				this.$set(this.allCheck, 'checked', false)
				this.xuanzlist = []
			} else {
				this.orderMsg.skus.forEach((item) => this.$set(item, 'checked', true))
				this.$set(this.allCheck, 'checked', true)
				this.xuanzlist = this.orderMsg.skus.filter((item) => item.checked == true)
				this.number = 0
				this.orderMsg.skus.forEach((item) => {
					this.number = this.number + item.number
				})
			}
			this.total = await this.HandleGetRefundMoney()
		},
		// 申请退货
		ReturnGoods(item) {
			if (this.xuanzlist.length <= 0) {
				uni.showToast({
					title: '请选择退货的商品',
					duration: 2000,
					icon: 'none'
				})
			} else {
				uni.redirectTo({
					url: '/another-tf/another-serve/afterSaleApplyRetund/index?list=' + encodeURIComponent(JSON.stringify(this.xuanzlist)) + '&orderId=' + this.orderMsg.orderId + '&isAllSelect=' + (this.xuanzlist.length === this.orderMsg.skus.length ? 1 : 0)
				})
			}
		},

		async checkboxChange(e) {
			// 动态设置商品件数和总计
			this.orderMsg.skus[Number(e.detail.value)].checked = !this.orderMsg.skus[Number(e.detail.value)].checked
			if (this.orderMsg.skus[Number(e.detail.value)].checked) {
				this.number = this.number + this.orderMsg.skus[Number(e.detail.value)].number
			} else {
				this.number = this.number - this.orderMsg.skus[Number(e.detail.value)].number
			}
			// 筛选勾选的
			this.xuanzlist = this.orderMsg.skus.filter((item) => item.checked == true)
			// 是否为全选
			if (this.orderMsg.skus.length == this.xuanzlist.length) {
				this.$set(this.allCheck, 'checked', true)
			} else {
				this.$set(this.allCheck, 'checked', false)
			}
			this.total = await this.HandleGetRefundMoney()
		}
	}
}
</script>

<style lang="less" scoped>
.after-sale-apply-container {
	background-color: #F8F8F8;
	min-height: 100vh;
	box-sizing: border-box;

	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}
}

.order-list-box {
	padding: 20rpx 30rpx;
	box-sizing: border-box;
}

.order-list-box .item {
	background: #fff;
	border-radius: 10rpx;
}

.order-info-box {
	padding: 0 30rpx;
	box-sizing: border-box;
}

.order-info-item {
	display: flex;
	flex-direction: row;
	padding: 10rpx 20rpx;
	border-bottom: solid 1px #eee;
}

.order-info-item:last-child {
	border-bottom: none;
}

.product-img {
	width: 180rpx;
	height: 180rpx;
	border-radius: 10rpx;
	margin-right: 30rpx;
}

.info-box {
	flex: 1;
	display: flex;
	flex-direction: column;
}

.product-name {
	font-size: 26rpx;
	color: #333;
	height: 68rpx;
	line-height: 34rpx;
	display: -webkit-box;
	overflow: hidden;
	text-overflow: ellipsis;
	word-break: break-all;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
}

.price-sku-box {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 10rpx;
}

.product-sku {
	font-size: 24rpx;
	color: #999;
	margin-top: 30rpx;
}

.product-price {
	font-size: 28rpx;
	color: #333;
	font-weight: 400;
}

.product-price .fuhao {
	font-size: 28rpx;
}

.product-num {
	font-size: 28rpx;
	color: #999;
}

.afterSale-select-box {
	position: fixed;
	bottom: 0;
	width: 100%;
	background: #fff;
	padding: 30rpx;
	box-sizing: border-box;
	height: 240rpx;
}

.afterBtnBox {
	margin-top: 30rpx;

	.afterBtn1 {
		width: 342rpx;
		line-height: 100rpx;
		border: 2rpx solid #333333;
		text-align: center;
		color: #333333;
		margin-right: 30rpx;
	}

	.afterBtn2 {
		width: 342rpx;
		height: 100rpx;
		line-height: 100rpx;
		background: #333333;
		border: 2rpx solid #333333;
		text-align: center;
		color: #FFEBC4;
	}
}
</style>
