<template>
	<view class="after-sale-apply-retund-container">
		<JHeader title="申请退货" width="50" height="50"></JHeader>
		<view class="content" style="padding-bottom: 200rpx;">
			<view v-for="(item, index) in retundlist" :key="index" class="order-list-box">
				<view class="item">
					<view class="order-info-box">
						<view class="order-info">
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
						</view>
					</view>
				</view>
			</view>

			<view class="afterSale-select-box">
				<view class="item" @click="openStatusSelect">
					<view class="l">货物状态</view>
					<view v-if="ReturnMoneyQuery.goodsState == 0" class="r-box">
						<text>未收到货</text>
						<tui-icon name="arrowright" :size="48" unit="rpx" color="#999999" margin="0 0 0 10rpx"></tui-icon>
					</view>
					<view v-if="ReturnMoneyQuery.goodsState == 1" class="r-box">
						<text>已收到货</text>
						<tui-icon name="arrowright" :size="48" unit="rpx" color="#999999" margin="0 0 0 10rpx"></tui-icon>
					</view>
				</view>
				<view class="item" @click="openReasonSelect">
					<view class="l">退款原因</view>
					<view class="r-box">
						<text>{{ liyoutext }}</text>
						<tui-icon name="arrowright" :size="48" unit="rpx" color="#999999" margin="0 0 0 10rpx"></tui-icon>
					</view>
				</view>
			</view>

			<view class="afterSale-select-box mt20">
				<view class="item">
					<view class="l">
						退款金额：
						<text class="order-status">¥ {{ sellPriceitem.toFixed(2) }}</text>
					</view>
				</view>
				<view class="item item-start">
					<view class="l">退款说明：</view>
					<view class="r-box r-box2">
						<input
							v-model="ReturnMoneyQuery.returnDesc" maxlength="200" type="text" placeholder="选填"
							class="r-box-input"
						></input>
					</view>
				</view>
			</view>

			<view class="afterSale-select-box mt20">
				<view class="upload-title">上传凭证</view>
				<view class="mar-left-10 mar-top-10">
					<ATFMoreUpload :imgs="fileList" @upload="handleSaveImg" @delete="handleDeleteImg"></ATFMoreUpload>
				</view>
			</view>

			<view class="order-flow-box">
				<view class="flow-word">退款流程：</view>
				<view class="flow-word mt25">
					<text>1、退货说明并提交</text>
					<text>2、2天内等待卖家处理，超时默认同意退款</text>
					<text>3、卖家同意，退款金额原路退还</text>
				</view>
				<view class="flow-word mt50">注：退款金额以实际支付价格为准</view>
			</view>
		</view>

		<view
			class="order-confirm-box" style="padding-top:30rpx;"
			:style="{ 'padding-bottom': (isIphone == true ? 90 : 0) + 'rpx' }"
		>
			<text class="btn" @click="confirmTap">
				提交
			</text>
		</view>

		<!-- 货物状态弹框 -->
		<tui-bottom-popup :show="cargoStatusShowFalg" @close="closeStatusSelect">
			<view class="alert-box">
				<view class="afterSale-status-box">
					<view class="status-title">货物状态</view>
					<view class="item-box">
						<view class="item" @click="ReturnMoneyQuery.goodsState = 0">
							<text class="status-select-title">未收到货</text>
							<tui-icon
								v-if="ReturnMoneyQuery.goodsState == 0" name="circle-fill" :size="40" unit="rpx"
								color="#c5aa7b"
								margin="30rpx"
							></tui-icon>
							<tui-icon v-else name="circle" :size="40" unit="rpx" color="#cccccc" margin="30rpx"></tui-icon>
						</view>
						<view class="item" @click="ReturnMoneyQuery.goodsState = 1">
							<text class="status-select-title">已收到货</text>
							<tui-icon
								v-if="ReturnMoneyQuery.goodsState == 1" name="circle-fill" :size="40" unit="rpx"
								color="#c5aa7b"
								margin="30rpx"
							></tui-icon>
							<tui-icon v-else name="circle" :size="40" unit="rpx" color="#cccccc" margin="30rpx"></tui-icon>
						</view>
					</view>
					<view class="status-btn" @click="closeStatusSelect">
						确定
					</view>
				</view>
			</view>
		</tui-bottom-popup>
		<!-- 退款原因弹框 -->
		<tui-bottom-popup :show="reasonShowFalg" @close="reasonShowFalg = false">
			<view class="alert-box">
				<view class="afterSale-status-box" scroll-y>
					<view class="status-title">退款原因</view>
					<view class="item-box">
						<view v-for="(item, index) in liyouData" :key="index" class="item" @click="returnReasonTap(item, index)">
							<text class="status-select-title">{{ item }}</text>
							<tui-icon
								v-if="ReturnMoneyQuery.returnReason == index" name="circle-fill" :size="40" unit="rpx"
								color="#c5aa7b" margin="30rpx"
							></tui-icon>
							<tui-icon v-else name="circle" :size="40" unit="rpx" color="#cccccc" margin="30rpx"></tui-icon>
						</view>
					</view>
					<view class="status-btn" @click="closeReasonSelect">
						确定
					</view>
				</view>
			</view>
		</tui-bottom-popup>
	</view>
</template>

<script>
import { getReturnPriceRefundMoneyApi, getReasonSelectEnumsApi, updateApplyReturnMoneySubmitApi } from '../../../api/anotherTFInterface'
export default {
	name: 'AfterSaleApplyRetund',
	data() {
		return {
			cargoStatusShowFalg: false,
			reasonShowFalg: false,
			ReturnMoneyQuery: {
				goodsState: 1,
				orderCode: '',
				orderProductIds: '',
				refundFee: 0,
				returnDesc: '',
				returnImgs: '',
				returnReason: 0,
				returnType: 0
			},
			fileList: [],
			sellPriceitem: 0, // 退款价格

			liyouData: [],
			liyoutext: '',
			retundlist: [],
			orderId: 0,
			isIphone: false,
			isAllSelect: 0,
			commentImgs: ''
		}
	},
	onReady() {
		this.isIphone = getApp().globalData.isIphone
	},
	async onLoad(option) {
		if (option.list) this.retundlist = JSON.parse(decodeURIComponent(option.list))
		this.orderId = option.orderId
		this.isAllSelect = option.isAllSelect
		this.retundlist.forEach((el) => {
			this.sellPriceitem = this.sellPriceitem + el.number * el.price
		})
		this.getReasonEnums()
		this.sellPriceitem = await this.HandleGetRefundMoney()
	},
	methods: {
		handleSaveImg(imgUrl) {
			this.fileList.push(imgUrl)
			this.$forceUpdate()
		},
		handleDeleteImg(imgUrl) {
			this.fileList.splice(this.fileList.findIndex((item) => item === imgUrl), 1)
			this.$forceUpdate()
		},
		// 算钱
		HandleGetRefundMoney() {
			return new Promise((resolve, reject) => {
				// uni.showLoading({
				//   title: "计算中..."
				// })
				const postData = {
					orderId: this.orderId,
					isAllSelect: this.isAllSelect == 1 ? 1 : 0,
					skus: this.retundlist,
					afterType: 2,
					goodsState: this.ReturnMoneyQuery.goodsState
				}
				getReturnPriceRefundMoneyApi(postData).then((res) => {
					uni.hideLoading()
					resolve(parseFloat(res.json))
				})
					.catch((e) => {
						uni.hideLoading()
					})
			})
		},
		confirmTap() {
			if (this.fileList.length) {
				for (let i = 0; i < this.fileList.length; i++) {
					this.commentImgs += this.fileList[i] + ','
				}
			}
			this.ReturnMoney()
		},
		getReasonEnums() {
			getReasonSelectEnumsApi({}).then((res) => {
				this.liyouData = res.data
				this.liyoutext = this.liyouData[0]
			})
		},
		ReturnMoney() {
			if (this.ReturnMoneyQuery.goodsState === '') {
				uni.showToast({
					title: '请选择货物状态！',
					duration: 2000,
					icon: 'none'
				})
			} else if (this.liyoutext === '') {
				uni.showToast({
					title: '请选择退货原因！',
					duration: 2000,
					icon: 'none'
				})
			} else {
				uni.showLoading({
					mask: true,
					title: '正在提交...'
				})
				const skusobjdata = []
				this.retundlist.forEach((i) => {
					const skusobj = {}
					skusobj.skuId = i.skuId
					skusobj.number = i.number
					skusobjdata.push(skusobj)
				})
				updateApplyReturnMoneySubmitApi({
					orderId: this.orderId,
					afterType: 2,
					goodsState: this.ReturnMoneyQuery.goodsState,
					price: this.sellPriceitem,
					returnReason: this.liyoutext,
					explain: this.ReturnMoneyQuery.returnDesc,
					image: this.commentImgs,
					skus: skusobjdata,
					isAllSelect: this.isAllSelect
				}).then((res) => {
					uni.hideLoading()
					uni.showToast({
						title: '提交成功'
					})
					setTimeout(() => {
						uni.redirectTo({
							url: `/another-tf/another-serve/afterSale/index`
						})
					}, 1500)
				})
					.catch((e) => {
						uni.showToast({
							title: '商品已在售后，请勿重新操作！',
							duration: 2000,
							icon: 'none'
						})
						uni.hideLoading()
					})
			}
		},
		// 理由
		returnReasonTap(item, index) {
			this.ReturnMoneyQuery.returnReason = index
			this.liyoutext = item
		},
		openStatusSelect() {
			this.cargoStatusShowFalg = true
		},
		openReasonSelect() {
			this.reasonShowFalg = true
		},
		async closeStatusSelect() {
			this.cargoStatusShowFalg = false
			this.sellPriceitem = await this.HandleGetRefundMoney()
		},
		closeReasonSelect() {
			this.reasonShowFalg = false
		}

	}
}
</script>

<style lang="less" scoped>
.after-sale-apply-retund-container {
	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}

	.content {
		padding: 0 0 120rpx;
		box-sizing: border-box;
	}

	.order-list-box {
		padding: 20rpx 30rpx;
		box-sizing: border-box;
	}

	.order-list-box .item {
		/* margin-bottom: 20rpx; */
		background: #fff;
		border-radius: 10rpx;
	}

	.order-status {
		font-size: 28rpx;
		color: #C83732;
		font-weight: 500;
	}

	.order-info-box {
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.order-info-item {
		display: flex;
		flex-direction: row;
		padding: 20rpx 0;
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
		width: 100%;
		background: #fff;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.afterSale-select-box .item {
		height: 100rpx;
		border-bottom: 1px solid #e5e5e5;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		font-size: 28rpx;
		color: #333;
	}

	.afterSale-select-box .item:last-of-type {
		border-bottom: none;
	}

	.afterSale-select-box .item.item-start {
		justify-content: flex-start;
	}

	.afterSale-select-box .item .l {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.afterSale-select-box .item .r-box {
		display: flex;
		flex-direction: row;
		align-items: center;
		color: #999;
	}

	.afterSale-select-box .item .r-box2 {
		width: 100%;
		flex: 1;
	}

	.mt20 {
		margin-top: 20rpx;
	}

	.r-box-input {
		text-align: left;
		flex: 1;
		z-index: 0;
	}

	.upload-title {
		font-size: 28rpx;
		color: #333;
		padding: 30rpx 0;
	}

	.order-flow-box {
		display: flex;
		flex-direction: column;
		padding: 30rpx;
		box-sizing: border-box;
	}

	.flow-word {
		font-size: 24rpx;
		color: #999;
		display: flex;
		flex-direction: column;
	}

	.mt25 {
		margin-top: 20rpx;
	}

	.mt50 {
		margin-top: 30rpx;
		margin-bottom: 20rpx;
	}

	.order-confirm-box {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 160rpx;
		background: #fff;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.order-confirm-box .btn {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		background: #333333;
		font-size: 28rpx;
		color: #FFEBC4;
		text-align: center;
	}

	.alert-box {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
	}

	.afterSale-status-box {
		width: 100%;
		background: #fff;
		border-radius: 15rpx 15rpx 0rpx 0rpx;
	}

	.status-title {
		width: 100%;
		height: 140rpx;
		background: #fff;
		border-radius: 15rpx 15rpx 0 0;
		font-size: 34rpx;
		color: #333;
		text-align: center;
		line-height: 140rpx;
	}

	.afterSale-status-box .item {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #e5e5e5;
	}

	.afterSale-status-box .item:last-of-type {
		border-bottom: none;
	}

	.afterSale-status-box .item-box {
		padding: 0 0 60rpx 0;
	}

	.afterSale-status-box .status-select-title {
		padding: 0 0 0 30rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		color: #333;
	}

	.afterSale-status-box .status-btn {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		background: #333333;
		font-size: 28rpx;
		color: #FFEBC4;
		text-align: center;
	}
}
</style>
