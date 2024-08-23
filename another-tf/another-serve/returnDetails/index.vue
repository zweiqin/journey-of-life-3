<!-- 退货详情 -->
<template>
	<view class="return-details-container">
		<JHeader title="退货详情" width="50" height="50"></JHeader>
		<view>
			<view class="order-details-status">
				<view style="font-size: 34rpx;text-align: center;">{{ afterConditionEnum(afterState) }}</view>
			</view>

			<view class="order-details-info-box mt20">
				<view v-if="afterState == 1" class="order-details-price">
					<text>退款总金额</text>
					<text class="price-box"><text class="fuhao">￥</text>{{ itemlist.price }}</text>
				</view>
				<view v-if="afterState == 10" class="address-box">
					<view>商家已同意退货申请，请尽早发货。</view>
					<view class="address-info">
						<view class="item">
							<text><text class="title">收货人</text>：</text>
							<text class="r">
								<text>{{ itemlist.returnPerson }}</text>
								<text class="ml30">{{ itemlist.returnPhone }}</text>
							</text>
						</view>
						<view class="item">
							<text><text class="title">地址</text>：</text>
							<text class="r">{{ itemlist.returnAdress }}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 退款成功 -->
			<view v-if="afterState == 4" class="order-details-info-box mt20">
				<view class="order-details-price return-explain-box">
					<text>已原路退回金额 {{ itemlist.afterState }}</text>
					<text class="price-box"><text class="fuhao">￥</text>{{ itemlist.price }}</text>
				</view>
			</view>
			<!-- 退款关闭 -->
			<view v-if="afterState == 9" class="order-details-info-box mt20">
				<view class="address-box return-explain-box">
					<view>因您撤销退货申请，退货退款已关闭</view>
				</view>
			</view>
			<!-- 发起退货 -->
			<view class="order-details-info-box mt20">
				<view class="address-box return-explain-box">
					<view>退货说明</view>
					<view class="address-info-r mt20 mar-top-20">
						<view class="item fs24">
							<text class="circle"></text>
							<text class="">未与商家协商一致，请勿使用到付或平邮，以免商家拒签</text>
						</view>
						<view class="item fs24">
							<text class="circle"></text>
							<text class="">交易栋钱款还在平台中间账户，确保您的资金安全</text>
						</view>
						<view class="item fs24">
							<text class="circle"></text>
							<text class="">填写物流写真实物流信息，逾期未填写退货申请将被取消</text>
						</view>
					</view>
					<view class="return-explain-btn">
						<text v-if="afterState == 6 || afterState == 10" class="btn" @click="cancelRefundTap">撤销申请</text>
						<text v-if="afterState == 6 || afterState == 8" class="btn" @click="platform(itemlist.afterId, itemlist.orderId)">
							平台介入
						</text>
						<text v-if="afterState == 10" class="btn on" @click="goAddLogistics">填写物流</text>
					</view>
				</view>
			</view>

			<view class="order-list-box">
				<view class="title">退货信息</view>
				<view class="item">
					<view class="order-info-box">
						<view v-for="item in itemlist.skus" class="order-info">
							<view class="order-info-item">
								<image :src="common.seamingImgUrl(item.image)" class="product-img"></image>
								<view class="info-box">
									<text class="product-name">{{ item.productName }}</text>
									<view class="product-sku mt20">{{ item.value }}</view>
								</view>
							</view>
						</view>
						<view class="delivery-way-box">
							<view class="item">
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
			<view class="order-list-box">
				<view class="title">协商历史</view>
				<view
					v-for="item in itemlist.afterHistory" v-if="itemlist.afterHistory.length > 0"
					style="margin: 30rpx;padding: 30rpx;border-left: 1px solid #CCCCCC;"
				>
					<text style="color: #999999;">{{ item.title }}</text>
					<br>
					<br>
					<text style="color: #999999;">{{ item.time }}</text>
				</view>
			</view>
		</view>
		<tui-popup :show="intervention" mode="fade" style="background-color: rgba(0,0,0,0.4);">
			<view class="interventionBox" style="background-color: #ffffff;border-radius: 14rpx;">
				<view class="intTit">申请平台介入</view>
				<textarea
					v-model="reason" class="textarea-text" maxlength="200" placeholder-style="color:#BBBBBB"
					placeholder="请输入介入原因"
				/>
				<view class="btnBox">
					<button class="primary" @click="interventionFn">确定</button>
					<button @click="intervention = false">取消</button>
				</view>
			</view>
		</tui-popup>
	</view>
</template>

<script>
import { afterConditionEnum } from '../../../components/ATFOrderInfo/config'
import {
	getReturnDetailByIdApi,
	updateCancelReturnGoodsApi,
	applyAfterPlatformApi
} from '../../../api/anotherTFInterface'
export default {
	name: 'ReturnDetails',
	data() {
		return {
			orderMsg: {},
			itemlist: {},
			afterState: 0,
			reason: '',
			intervention: false,
			afterId: '',
			orderId: ''
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
		},
		goAddLogistics() {
			uni.navigateTo({
				url: `/another-tf/another-serve/addLogistics/index?orderId=${this.orderMsg.orderId}&afterId=${this.orderMsg.afterId}`
			})
		},
		// 平台介入
		platform(afterId, orderId) {
			uni.navigateTo({
				url: `/another-tf/another-serve/platformJoin/index?afterId=${afterId}&orderId=${orderId}`
			})
			// this.intervention = true
			// this.afterId = afterId
			// this.orderId = orderId
		},
		interventionFn() {
			uni.showLoading({
				title: '正在申请介入...'
			})
			applyAfterPlatformApi({
				afterId: this.afterId,
				orderId: this.orderId,
				image: '',
				reason: this.reason
			}).then((res) => {
				uni.hideLoading()
				this.intervention = false
				uni.showToast({
					title: '申请成功'
				})
			})
				.catch((e) => {
					uni.hideLoading()
				})
		}
	}
}
</script>

<style lang="less" scoped>
.return-details-container {
	min-height: 100vh;
	background: #f7f7f7;
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

	.order-details-info-box {
		padding: 0 30rpx;
		box-sizing: border-box;
		background: #fff;
	}

	.order-details-info-box.mt20 {
		margin-top: 20rpx;
	}

	.order-details-price {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		height: 100rpx;
		border-bottom: 1px solid #e5e5e5;
		font-size: 30rpx;
		color: #333;
	}

	.order-details-price .price-box {
		font-size: 36rpx;
		color: #ff7911;
	}

	.order-details-price .fuhao {
		font-size: 24rpx;
	}

	.address-box {
		background: #fff;
		padding: 30rpx 0;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		font-size: 28rpx;
		color: #333;
		border-bottom: 1px solid #e5e5e5;
	}

	.address-info {
		margin-top: 20rpx;
		flex: 1;
		display: flex;
		flex-direction: column;
		font-size: 28rpx;
		color: #999;
	}

	.ml30 {
		margin-left: 30rpx;
	}

	.address-box .address-info-r .item {
		display: flex;
		flex-direction: row;
	}

	.address-box .address-info-r .title {
		display: inline-block;
		width: 100rpx;
		text-align: justify;
		text-justify: distribute-all-lines;
		text-align-last: justify;
	}

	.address-box .address-info-r .item .r {
		flex: 1;
		line-height: 40rpx;
	}

	.return-explain-box {
		border-bottom: none;
	}

	.return-explain-box .address-info-r .item {
		display: flex;
		flex-direction: row;
		align-items: center;
		line-height: 40rpx;
	}

	.address-info-r .item .circle {
		width: 8rpx;
		height: 8rpx;
		border-radius: 50%;
		background: #bbb;
		margin-right: 10rpx;
	}

	.return-explain-btn {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		margin-top: 20rpx;
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

	.return-explain-btn .btn.on {
		color: #333333;
		border: 2rpx solid #333333;
	}

	.order-list-box {
		margin-top: 20rpx;
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

	.interventionBox .btnBox {
		display: flex;
	}

	.interventionBox .btnBox button {
		width: 50%;
		border-radius: 0;
	}

	.interventionBox .btnBox .primary {
		color: #FFFFFF;
		background: #FF7700;
	}

	.interventionBox .btnBox /deep/ uni-button:after {
		border-radius: 0;
	}

	.interventionBox .intTit {
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		border-bottom: 1rpx solid #EEE;
		font-size: 32rpx;
	}

	.interventionBox .textarea-text {
		padding: 20rpx;
		font-size: 20rpx;
		height: 200rpx;
	}

	.interventionBox /deep/ .uni-textarea-textarea {
		width: 100%;
	}

	.interventionBox /deep/ .uni-textarea {
		width: 100%;
	}
}
</style>
