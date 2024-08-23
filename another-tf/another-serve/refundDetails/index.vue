<!-- 退款详情 -->
<template>
	<view class="refund-details-container">
		<JHeader title="退款详情" width="50" height="50"></JHeader>
		<view v-if="ifShow">
			<view>
				<view class="order-details-status">
					<view style="font-size: 34rpx;text-align: center;">{{ afterConditionEnum(afterState) }}</view>
					<view style="margin-top: 20rpx;">
						<view v-if="afterState == 4">已原路退回金额：￥{{ itemlist.price }}</view>
						<view v-if="afterState == 6" class="reason">原因: {{ itemlist.reason }}</view>
						<view v-if="afterState == 9" style="text-align: center;">因您撤销退款申请，退款已关闭</view>
					</view>
				</view>

				<view v-if="afterState == 6 || afterState == 8" class="return-explain-btn">
					<text class="btn" @click="cancelRefundTap">撤销申请</text>
					<text class="btn" @click="platform(itemlist.afterId, itemlist.orderId)">平台介入</text>
				</view>

				<!-- 发起退款 -->
				<view v-if="afterState" class="order-details-price">
					<text>退款总金额</text>
					<text class="price-box"><text class="fuhao">￥</text>{{ itemlist.price }}</text>
				</view>
				<view v-else class="address-box">
					<view>您已成功发起退款申请，请耐心等待商家处理。</view>
					<view style="margin-top: 20rpx;">
						<view class="item fs24">
							<text class="circle"></text>
							<text class="">卖家同意或超时未处理，系统将退款给您</text>
						</view>
						<view class="item fs24">
							<text class="circle"></text>
							<text class="">如果卖家拒绝，您可以修改退款申请后再次发起，卖家会重新处理</text>
						</view>
					</view>
				</view>

				<view class="order-list-box">
					<view class="title">退款信息</view>
					<view class="item">
						<view class="order-info-box">
							<view v-for="(item, index) in itemlist.skus" :key="index" class="order-info">
								<view class="order-info-item">
									<image :src="common.seamingImgUrl(item.image)" class="product-img"></image>
									<view class="info-box">
										<text class="product-name">{{ item.productName }}</text>
										<view class="product-sku">{{ item.value }}</view>
									</view>
								</view>
							</view>
							<view class="delivery-way-box">
								<view v-if="deliveryfalse" class="item">
									<!-- <text class="way">退款原因：多拍/错拍/不想要</text> -->
								</view>
								<view class="item">
									<text class="way">退款金额：￥{{ itemlist.price }}</text>
								</view>
								<view class="item">
									<text class="way">退款编号：{{ itemlist.afterFormid }}</text>
								</view>
								<view class="item">
									<text class="way">申请时间：{{ itemlist.createTime }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="order-list-box negotiate">
					<view class="title">协商历史</view>
					<view class="orderLineBox">
						<tui-time-axis>
							<tui-timeaxis-item
								v-for="(item, index) in itemlist.afterHistory" v-if="itemlist.afterHistory.length > 0"
								:key="index" background-color="#ffffff"
							>
								<template #content>
									<view>
										<view class="order-desc">{{ item.title }}</view>
										<view class="order-time">{{ item.time }}</view>
									</view>
								</template>
							</tui-timeaxis-item>
						</tui-time-axis>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { afterConditionEnum } from '../../../components/ATFOrderInfo/config'
import {
	getReturnDetailByIdApi,
	updateCancelReturnGoodsApi
} from '../../../api/anotherTFInterface'
export default {
	name: 'RefundDetails',
	data() {
		return {
			orderMsg: {
				afterId: '',
				orderId: ''
			},
			itemlist: {},
			afterState: 0,
			deliveryfalse: false,
			ifShow: false
		}
	},
	onLoad(options) {
		this.orderMsg.afterId = options.afterId
		this.orderMsg.orderId = options.orderId
		this.getReturnDetail()
	},
	methods: {
		afterConditionEnum,
		getReturnDetail() {
			getReturnDetailByIdApi({
				afterId: this.orderMsg.afterId,
				orderId: this.orderMsg.orderId
			}).then((res) => {
				this.afterState = res.data.afterState
				this.itemlist = res.data
				this.ifShow = true
			})
		},
		cancelRefundTap() {
			uni.showLoading({
				title: '正在撤销退货...'
			})
			updateCancelReturnGoodsApi({
				afterId: this.orderMsg.afterId,
				orderId: this.orderMsg.orderId
			}).then((res) => {
				uni.hideLoading()
				uni.showToast({
					title: '撤销成功'
				})
				this.$switchTab('/pages/user/user')
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		// 平台介入
		platform(afterId, orderId) {
			uni.navigateTo({
				url: `/another-tf/another-serve/platformJoin/index?afterId=${afterId}&orderId=${orderId}`
			})
		}
	}
}
</script>

<style  lang="less" scoped>
.refund-details-container {
	min-height: 100vh;
	background: #f8f8f8;
	box-sizing: border-box;

	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}

	.order-details-status {
		padding: 30rpx;
		background-color: #333333;
		font-size: 30rpx;
		color: #ffffff;
	}

	.reason {
		padding-left: 32rpx;
		color: #FFFFFF;
	}

	.order-details-price {
		padding: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx solid #e5e5e5;
		font-size: 30rpx;
		color: #333333;
	}

	.order-details-price .price-box {
		font-size: 36rpx;
		color: #C83732;
	}

	.order-details-price .fuhao {
		font-size: 24rpx;
	}

	.address-box {
		padding: 30rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		font-size: 28rpx;
		color: #333;
		border-bottom: 1rpx solid #e5e5e5;
	}

	.return-explain-btn {
		padding: 30rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.return-explain-btn .btn {
		width: 130rpx;
		height: 56rpx;
		background: #fff;
		border: 1px solid #bbb;
		border-radius: 4rpx;
		text-align: center;
		line-height: 56rpx;
		margin-left: 20rpx;
		color: #333;
		font-size: 26rpx;
	}

	.negotiate {
		padding-bottom: 20rpx;
		background: #FFFFFF;
	}

	.order-list-box {
		margin-top: 20rpx;
	}

	.orderLineBox {
		padding: 0 30rpx;
		background: #FFFFFF;
	}

	.order-list-box .title {
		padding: 30rpx;
		box-sizing: border-box;
		font-size: 30rpx;
		color: #333;
		background: #fff;
	}

	.order-list-box .item {
		margin-bottom: 20rpx;
		background: #fff;
		border-radius: 10rpx;
	}

	.order-info-box {
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.order-info {
		border-bottom: 1px solid #eee;
	}

	.order-info-item {
		display: flex;
		flex-direction: row;
		padding: 20rpx 0;
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

	.product-sku {
		margin-top: 20rpx;
		font-size: 24rpx;
		color: #999;
	}

	.delivery-way-box {
		display: flex;
		flex-direction: column;
		margin: 30rpx 0 10rpx;
	}

	.delivery-way-box .item {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 26rpx;
		color: #333;
	}

	.delivery-way-box .item .way {
		color: #999;
	}

	.order-desc {
		color: rgb(150, 150, 150);
		font-size: 28rpx;
		margin-bottom: 6rpx;
	}

	.order-time {
		color: rgb(200, 200, 200);
		font-size: 26rpx;
	}
}
</style>
