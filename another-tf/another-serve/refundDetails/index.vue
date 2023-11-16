<!-- 退货详情 -->
<template>
	<view>
		<view v-if="ifShow">
			<view>
				<view class="order-details-status">
					<view v-if="status == 1" class="status-title-box">
						<view class="l">
							<text class="status">审核中</text>
						</view>
					</view>
					<!--  审核通过 -->
					<view v-if="status == 10" class="status-title-box">
						<view class="l">
							<text class="status">审核通过</text>
						</view>
					</view>
					<!--  审核不通过 -->
					<view v-if="status == 6" class="status-title-box">
						<view class="l">
							<text class="status">审核不通过</text>
						</view>
					</view>
					<view v-if="status == 6" class="reason">原因: {{ itemlist.reason }}</view>
					<!--  退款中 -->
					<view v-if="status == 2" class="status-title-box">
						<view class="l">
							<text class="status">退款中</text>
						</view>
					</view>
					<!--  退款中 -->
					<view v-if="status == 7" class="status-title-box">
						<view class="l">
							<text class="status">评审中</text>
						</view>
					</view>
					<!--  退货完成待退款 -->
					<view v-if="status == 4" class="status-title-box">
						<view class="l">
							<text class="status">退款成功</text>
						</view>
					</view>
					<!--  退货完成拒绝退款 -->
					<view v-if="status == 5" class="status-title-box">
						<view class="l">
							<text class="status">退款失败</text>
						</view>
					</view>
					<!--  平台介入拒绝 -->
					<view v-if="status == 9 && isPlaformState === 1" class="status-title-box">
						<view class="l">
							<text class="status">审核失败</text>
						</view>
					</view>
					<!--  退款成功 -->
					<view v-if="status == 9" class="status-title-box">
						<view class="l">
							<text class="status">撤销申请</text>
						</view>
					</view>

				</view>

				<!-- 发起退款 -->
				<view v-if="status == 0" class="order-details-info-box mt20">
					<view v-if="status != 0" class="order-details-price">
						<text>退款总金额</text>
						<text class="price-box"><text class="fuhao">￥</text>{{ itemlist.price }}</text>
					</view>
					<view class="address-box return-explain-box">
						<view>您已成功发起退款申请，请耐心等待商家处理。</view>
						<view class="address-info-r mt20 mar-top-20">
							<view class="item fs24">
								<text class="circle"></text>
								<text class="">卖家同意或超时未处理，系统将退款给您</text>
							</view>
							<view class="item fs24">
								<text class="circle"></text>
								<text class="">如果卖家拒绝，您可以修改退款申请后再次发起，卖家会重新处理</text>
							</view>
						</view>
						<view class="return-explain-btn">
							<text class="btn" @click="cancelRefundTap">撤销申请</text>
							<text v-if="status == 6 || status == 8" class="btn" @click="platform(itemlist.afterId, itemlist.orderId)">
								平台介入
							</text>
						</view>
					</view>
				</view>
				<view v-if="status == 6 || status == 8" class="order-details-info-box mt20">
					<view class="return-explain-btn">
						<text class="btn" @click="cancelRefundTap">撤销申请</text>
						<text class="btn" @click="platform(itemlist.afterId, itemlist.orderId)">平台介入</text>
					</view>
				</view>
				<!-- 退款成功 -->
				<view v-if="status == 4" class="order-details-info-box mt20">
					<view class="order-details-price return-explain-box">
						<text>已原路退回金额</text>
						<text class="price-box"><text class="fuhao">￥</text>{{ itemlist.price }}</text>
					</view>
				</view>
				<!-- 平台介入关闭 -->
				<view v-if="status == 9 && isPlaformState === 1" class="order-details-info-box mt20">
					<view class="address-box return-explain-box">
						<view>平台介入申请失败</view>
					</view>
				</view>
				<!-- 退款关闭 -->
				<view v-if="status == 9" class="order-details-info-box mt20">
					<view class="address-box return-explain-box">
						<view>因您撤销退款申请，退款已关闭</view>
					</view>
				</view>

				<view class="order-list-box">
					<view class="title">退款信息</view>
					<view class="item">
						<view class="order-info-box">
							<view v-for="item in itemlist.skus" class="order-info">
								<view class="order-info-item">
									<image :src="item.image" class="product-img"></image>
									<view class="info-box">
										<text class="product-name">{{ item.productName }}</text>
										<view class="product-sku mt20">{{ item.value }}</view>
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
						<u-time-line>
							<u-time-line-item v-for="item in itemlist.afterHistory" v-if="itemlist.afterHistory.length > 0">
								<!-- 此处没有自定义左边的内容，会默认显示一个点 -->
								<template #content>
									<view>
										<view class="order-desc">{{ item.title }}</view>
										<view class="order-time">{{ item.time }}</view>
									</view>
								</template>
							</u-time-line-item>
						</u-time-line>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import {
	getReturnDetailByIdApi,
	updateCancelReturnGoodsApi
} from '../../../api/anotherTFInterface'
export default {
	name: 'RefundDetails',
	data() {
		return {
			item: {},
			itemlist: {},
			status: 0,
			deliveryfalse: false,
			ReturnDetailData: [],
			images: '',
			afterId: '',
			orderId: '',
			ifShow: false
		}
	},
	onLoad(options) {
		this.item = JSON.parse(options.item)
		this.getReturnDetail()
	},
	methods: {
		getReturnDetail() {
			getReturnDetailByIdApi({
				afterId: this.item.afterId,
				orderId: this.item.orderId
			}).then((res) => {
				this.status = res.data.afterState
				this.itemlist = res.data
				this.ifShow = true
			})
		},
		cancelRefundTap() {
			uni.showLoading({
				title: '正在撤销退货...'
			})
			updateCancelReturnGoodsApi({
				afterId: this.item.afterId,
				orderId: this.item.orderId
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
				url: `/another-tf/another-serve/Intervene/index?afterId=${afterId}&orderId=${orderId}`
			})
		}
	}
}
</script>

<style  lang="less" scoped>
page {
	background: #f8f8f8;
}

.order-details-status {
	width: 100%;
	height: 302upx;
	background-color: #333333;
	background-size: contain;
}

.status-title-box {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 40upx 30upx 0;
	box-sizing: border-box;
}

.reason {
	padding-left: 32rpx;
	color: #FFFFFF;
}

.status-title-box .l {
	display: flex;
	flex-direction: column;
}

.status-title-box .l .status {
	font-size: 30upx;
	color: #fff;
}

.status-title-box .l .label {
	font-size: 24upx;
	color: #fff;
	margin-top: 14upx;
}

.order-details-info-box {
	padding: 0 30upx;
	box-sizing: border-box;
	background: #fff;
}

.order-details-info-box.mt20 {
	margin-top: 20upx;
}

.order-details-price {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	height: 100upx;
	border-bottom: 1px solid #e5e5e5;
	font-size: 30upx;
	color: #333;
}

.order-details-price .price-box {
	font-size: 36upx;
	color: #C83732;
}

.order-details-price .fuhao {
	font-size: 24upx;
}

.address-box {
	background: #fff;
	padding: 30upx 0;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	font-size: 28upx;
	color: #333;
	border-bottom: 1px solid #e5e5e5;
}

.address-box .address-info-r .title {
	display: inline-block;
	width: 100upx;
	text-align: justify;
	text-justify: distribute-all-lines;
	text-align-last: justify;
}

.return-explain-btn {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
	margin-top: 20upx;
}

.negotiate {
	padding-bottom: 20rpx;
	background: #FFFFFF;
}

.return-explain-btn .btn {
	width: 130upx;
	height: 56upx;
	background: #fff;
	border: 1px solid #bbb;
	border-radius: 4upx;
	text-align: center;
	line-height: 56upx;
	margin-left: 20upx;
	color: #333;
	font-size: 26upx;
}

.return-explain-btn .btn.on {
	color: #ff7911;
	border: 1px solid #ff7911;
}

.order-list-box {
	margin-top: 20upx;
}

.orderLineBox {
	padding: 0 30rpx;
	background: #FFFFFF;
}

.order-list-box .title {
	padding: 30upx;
	box-sizing: border-box;
	font-size: 30upx;
	color: #333;
	background: #fff;
}

.order-list-box .item {
	margin-bottom: 20upx;
	background: #fff;
	border-radius: 10upx;
}

.order-info-box {
	padding: 0 30upx;
	box-sizing: border-box;
}

.order-info {
	border-bottom: 1px solid #eee;
}

.order-info-item {
	display: flex;
	flex-direction: row;
	padding: 20upx 0;
}

.product-img {
	width: 180upx;
	height: 180upx;
	border-radius: 10upx;
	margin-right: 30upx;
}

.info-box {
	flex: 1;
	display: flex;
	flex-direction: column;
}

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

.delivery-way-box {
	display: flex;
	flex-direction: column;
	margin: 30upx 0 10upx;
}

.delivery-way-box .item {
	display: flex;
	flex-direction: row;
	align-items: center;
	font-size: 26upx;
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
</style>
