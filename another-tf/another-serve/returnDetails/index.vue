<!-- 退货详情 -->
<template>
	<view>
		<JHeader title="退货详情" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view class="">
			<view class="order-details-status">
				<view v-if="status == -1" class="status-title-box">
					<view class="l">
						<text class="status">无退货</text>
					</view>
				</view>
				<view v-if="status == 1" class="status-title-box">
					<view class="l">
						<text class="status">退货审核中</text>
					</view>
				</view>
				<!--  审核通过 -->
				<view v-if="status == 10" class="status-title-box">
					<view class="l">
						<text class="status">审核通过</text>
					</view>
				</view>
				<!--  审核通过 -->
				<view v-if="status == 6" class="status-title-box">
					<view class="l">
						<text class="status">审核不通过</text>
					</view>
				</view>
				<!--  审核中 -->
				<view v-if="status == 7" class="status-title-box">
					<view class="l">
						<text class="status">退货中</text>
					</view>
				</view>
				<!--  退货中 -->
				<view v-if="status == 3" class="status-title-box">
					<view class="l">
						<text class="status">退货中</text>
					</view>
				</view>
				<!--  退货完成拒绝退款 -->
				<view v-if="status == 8" class="status-title-box">
					<view class="l">
						<text class="status">退货完成，拒绝退款</text>
					</view>
				</view>
				<!--  退款成功 -->
				<view v-if="status == 4" class="status-title-box">
					<view class="l">
						<text class="status">已退款</text>
					</view>
				</view>
				<!-- 退款中 -->
				<view v-if="status == 2" class="status-title-box">
					<view class="l">
						<text class="status">退款中</text>
					</view>
				</view>
				<!-- 退款失败 -->
				<view v-if="status == 5" class="status-title-box">
					<view class="l">
						<text class="status">退款失败</text>
					</view>
				</view>
				<!-- 退款关闭 -->
				<view v-if="status == 9" class="status-title-box">
					<view class="l">
						<text class="status">退货关闭</text>
					</view>
				</view>
			</view>

			<view class="order-details-info-box mt20">
				<view v-if="status == 1" class="order-details-price">
					<text>退款总金额</text>
					<text class="price-box"><text class="fuhao">￥</text>{{ itemlist.price }}</text>
				</view>
				<view v-if="status == 10" class="address-box">
					<view>商家已同意退货申请，请尽早发货。</view>
					<view class="address-info">
						<tui-icon name="circle" :size="45" unit="upx" color="#cdcdcd" margin="0 40upx 0 0"></tui-icon>
						<view class="address-info-r">
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
						<text v-if="status == 6 || status == 10" class="btn" @click="cancelRefundTap">撤销申请</text>
						<text
							v-if="status == 6 || status == 8" class="btn"
							@click="platform(itemlist.afterId, itemlist.orderId)"
						>
							平台介入
						</text>
						<text v-if="status == 10" class="btn on" @click="goAddLogistics">填写物流</text>
					</view>

				</view>
			</view>
			<!-- 退款成功 -->
			<view v-if="itemlist.afterState != 6 && status == 6" class="order-details-info-box mt20">
				<view class="order-details-price return-explain-box">
					<text>已原路退回金额 {{ itemlist.afterState }}</text>
					<text class="price-box"><text class="fuhao">￥</text>{{ itemlist.price }}</text>
				</view>
			</view>
			<!-- 退款关闭 -->
			<view v-if="status == 9" class="order-details-info-box mt20">
				<view class="address-box return-explain-box">
					<view>因您撤销退货申请，退货退款已关闭</view>
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
			<view class="interventionBox" style="background-color: #ffffff;border-radius: 14upx;">
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
			status: 0,
			ReturnDetailData: [],
			reason: '',
			images: '',
			intervention: false,
			interventionText: '',
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
		getReturnDetail() {
			getReturnDetailByIdApi({
				afterId: this.orderMsg.afterId,
				orderId: this.orderMsg.orderId
			}).then((res) => {
				this.status = res.data.afterState
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
				image: this.images,
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
page {
	background: #f7f7f7;
}

.order-details-status {
	width: 750upx;
	height: 180upx;
	background: #333333;
}

.status-title-box {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 40upx 30upx 0;
	box-sizing: border-box;
}

.status-title-box .l {
	display: flex;
	flex-direction: column;
}

.status-title-box .l .status,
.status-title-box2 .status {
	font-size: 30upx;
	color: #fff;
}

.status-title-box .r {
	width: 80upx;
	height: 80upx;
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
	color: #ff7911;
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

.address-info {
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-top: 20upx;
}

.address-box .address-info-r {
	flex: 1;
	display: flex;
	flex-direction: column;
	font-size: 28upx;
	color: #999;
}

.ml30 {
	margin-left: 30upx;
}

.address-box .address-info-r .item {
	display: flex;
	flex-direction: row;
}

.address-box .address-info-r .title {
	display: inline-block;
	width: 100upx;
	text-align: justify;
	text-justify: distribute-all-lines;
	text-align-last: justify;
}

.address-box .address-info-r .item .r {
	flex: 1;
	line-height: 40upx;
}

.return-explain-box {
	border-bottom: none;
}

.return-explain-box .address-info-r .item {
	display: flex;
	flex-direction: row;
	align-items: center;
	line-height: 40upx;
}

.address-info-r .item .circle {
	width: 8upx;
	height: 8upx;
	border-radius: 50%;
	background: #bbb;
	margin-right: 10upx;
}

.return-explain-btn {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
	margin-top: 20upx;
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
	color: #333333;
	border: 2rpx solid #333333;
}

.order-list-box {
	margin-top: 20upx;
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
	height: 100upx;
	line-height: 100upx;
	text-align: center;
	border-bottom: 1upx solid #EEE;
	font-size: 32upx;
}

.interventionBox .textarea-text {
	padding: 20upx;
	font-size: 20upx;
	height: 200rpx;
}

.interventionBox /deep/ .uni-textarea-textarea {
	width: 100%;
}

.interventionBox /deep/ .uni-textarea {
	width: 100%;
}
</style>
