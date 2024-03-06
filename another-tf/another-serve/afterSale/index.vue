<!-- 售后列表 -->
<template>
	<view>
		<JHeader title="我的售后" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view class="content">
			<view class="order-list-box">
				<view>
					<view v-for="item in findReturnDatalist" class="item">
						<view class="order-list-top">
							<view class="top-l" @click="go(`/another-tf/another-user/shop/shop-detail?shopId=${item.shopId}`)">
								<image :src="common.seamingImgUrl(item.shopLogo)" class="shop-img"></image>
								<text class="shop-name">{{ item.shopName }}</text>
								<tui-icon name="arrowright" :size="24" unit="upx" color="#999999" margin="0 0 0 15upx"></tui-icon>
							</view>
							<view class="top-r">
								<tui-icon name="wealth" :size="50" unit="upx" color="#c5aa7b" margin="0 8upx 0 0"></tui-icon>
								<text class="order-status">{{ item.afterType == 1 ? '退款' : '退货' }}</text>
							</view>
						</view>
						<view v-for="(itemlist, index) in item.skus" :key="index" class="order-info-box">
							<view
								class="order-info"
								@click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${itemlist.shopId}&productId=${itemlist.productId}&skuId=${itemlist.skuId}`)"
							>
								<view class="order-info-item">
									<image :src="common.seamingImgUrl(itemlist.image)" class="product-img"></image>
									<view class="info-box">
										<text class="product-name">{{ itemlist.productName }}</text>
										<view class="product-sku">{{ itemlist.value }}</view>
										<view class="price-sku-box">
											<text class="product-price">退款：<text class="fuhao">￥{{ itemlist.total }}</text></text>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="total-price-box">
							<view class="total-price-l">{{ afterConditionEnum(item.afterState, item.afterType) }}</view>
							<text v-if="item.afterState" class="total-price-r mar-left-30">
								退款金额 ¥ {{ item.price }}
							</text>
						</view>
						<!-- 退款 -->
						<view v-if="item.afterType == 1" class="order-btn-box">
							<text class="btn l" @click="deleteRecord(item)">删除记录</text>
							<text v-if="(item.afterState == 1) || (item.afterState == 6)" class="btn l" @click="cancelRefundTap(item)">
								撤销退款
							</text>
							<!-- 退款查看详情 -->
							<text
								class="btn viewDetail l"
								@click="go(`/another-tf/another-serve/refundDetails/index?orderId=${item.orderId}&afterId=${item.afterId}`)"
							>
								查看详情
							</text>
						</view>
						<!-- 退货 -->
						<view v-if="item.afterType == 2" class="order-btn-box">
							<text class="btn l" @click="deleteRecord(item)">删除记录</text>
							<text
								v-if="(item.afterState == 1) || (item.afterState == 10) || (item.afterState == 6)" class="btn l"
								@click="cancelRefundTaphuo(item)"
							>
								撤销退货
							</text>
							<!-- 退货查看详情 -->
							<text
								class="btn viewDetail l"
								@click="go(`/another-tf/another-serve/returnDetails/index?orderId=${item.orderId}&afterId=${item.afterId}`)"
							>
								查看详情
							</text>
						</view>
					</view>
				</view>
				<view style="padding-bottom: 45upx;">
					<LoadingMore
						:status="!isEmpty && !findReturnDatalist.length
							? 'loading' : !isEmpty && findReturnDatalist.length && (findReturnDatalist.length >= findReturnDatalistTotal) ? 'no-more' : ''"
					>
					</LoadingMore>
					<tui-no-data v-if="isEmpty" :fixed="false" style="margin-top: 60upx;">暂无数据</tui-no-data>
				</view>
			</view>
		</view>
		<!-- 优惠券领取 -->
		<tui-modal :show="delRecord" :custom="true" :fadein="true">
			<view class="Put-box1">
				<view class="text-align fs34 fs-bold">
					是否删除此记录
				</view>
				<view class="flex-display flex-sp-between">
					<view class="btn" @click="delRecord = false">
						取消
					</view>
					<view class="btn submit" @click="delRecordFn">
						确定
					</view>
				</view>
			</view>
		</tui-modal>
	</view>
</template>

<script>
import { afterConditionEnum } from '../../../components/ATFOrderInfo/config'
import { getAllFindReturnListApi, updateDeleteAfterRecordApi, updateCancelReturnRefundApi, updateCancelReturnGoodsApi } from '../../../api/anotherTFInterface'
export default {
	name: 'AfterSale',
	data() {
		return {
			FindReturnData: [],
			moneyReturnId: {
				id: ''
			},
			sellPriceitem: '',
			findReturnDatalist: [],
			page: 1, // 当前页
			pageSize: 20, // 每页记录数
			findReturnDatalistTotal: 0,
			isEmpty: false,
			delRecord: false,
			currentAfterId: ''
		}
	},
	onLoad() {
		this.getFindReturn()
	},
	methods: {
		afterConditionEnum,
		// 获取售后列表数据
		getFindReturn(isLoadmore) {
			uni.showLoading()
			getAllFindReturnListApi({
				page: this.page,
				pageSize: this.pageSize
			})
				.then((res) => {
					this.findReturnDatalistTotal = res.data.total
					if (isLoadmore) {
						this.findReturnDatalist.push(...res.data.list)
					} else {
						this.findReturnDatalist = res.data.list
					}
					this.isEmpty = this.findReturnDatalist.length === 0
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		// 删除记录
		deleteRecord(item) {
			this.currentAfterId = item.afterId
			this.delRecord = true
		},
		delRecordFn() {
			this.delRecord = false
			uni.showLoading({
				title: '正在删除...'
			})
			updateDeleteAfterRecordApi({
				id: this.currentAfterId
			}).then((res) => {
				uni.hideLoading()
				uni.showToast({
					title: '删除成功',
					icon: 'none',
					duration: 1500
				})
				this.currentAfterId = ''
				setTimeout(() => {
					this.page = 1
					this.findReturnDatalist = []
					this.getFindReturn()
				}, 2000)
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		// 撤销申请
		cancelRefundTap(item) {
			this.Delete(item)
		},
		// 退款
		Delete(item) {
			uni.showLoading({
				title: '正在撤销退款...'
			})
			updateCancelReturnRefundApi({
				afterId: item.afterId,
				orderId: item.orderId
			}).then((res) => {
				uni.hideLoading()
				uni.showToast({
					title: '撤销成功',
					icon: 'none',
					duration: 2000
				})
				setTimeout(() => {
					this.page = 1
					this.findReturnDatalist = []
					this.getFindReturn()
				}, 2500)
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		// 撤销退货
		cancelRefundTaphuo(item) {
			this.Deletehuo(item)
		},
		// 退货
		Deletehuo(item) {
			updateCancelReturnGoodsApi({
				afterId: item.afterId,
				orderId: item.orderId
			}).then((res) => {
				uni.showToast({
					title: '撤销成功',
					icon: 'none',
					duration: 2000
				})
				setTimeout(() => {
					this.page = 1
					this.findReturnDatalist = []
					this.getFindReturn()
				}, 2500)
			})
		}

	},
	onReachBottom() {
		if (this.findReturnDatalist.length < this.findReturnDatalistTotal) {
			++this.page
			this.getFindReturn(true)
		}
	}
}
</script>

<style lang="scss" scoped>
page {
	background-color: #F7F7F7;
}

.Put-box1 {
	.btn {
		text-align: center;
		margin-top: 40rpx;
		border: 2rpx solid #333333;
		height: 80upx;
		line-height: 80upx;
		width: 100%;
		color: #333333;
	}

	.submit {
		background-color: #333333;
		color: #FFEBC4;
		margin-left: 20rpx;
	}
}

.order-list-box {
	padding: 20upx 30upx 0;
	box-sizing: border-box;
}

.order-list-box .item {
	margin-bottom: 20upx;
	background: #fff;
	border-radius: 10upx;
}

.order-list-top {
	height: 96upx;
	padding: 0 30upx;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #eee;
}

.top-l {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.shop-img {
	width: 36upx;
	height: 36upx;
	margin-right: 10upx;
}

.shop-name {
	font-size: 30upx;
	color: #333;
	font-weight: bold;
}

.top-r {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.order-status {
	font-size: 32rpx;
	color: #C5AA7B;
}

.order-info-box {
	padding: 0 30upx;
	box-sizing: border-box;
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
	justify-content: space-between;
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

.price-sku-box {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

.product-sku {
	font-size: 24upx;
	color: #999;
}

.product-price {
	font-size: 28upx;
	color: #333;
	font-weight: 400;
}

.product-price .fuhao {
	font-size: 32upx;
	color: #C83732;
	font-weight: bold;
}

.total-price-box {
	font-size: 26upx;
	color: #333;
	border: 2rpx solid #E4E5E6;
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 70upx;
	line-height: 70upx;
	margin: 0 30rpx;
}

.total-price-l {
	margin-left: 40upx;
	font-size: 30upx;
	color: #333;
}

.total-price-r {
	text-align: left;
}

.order-btn-box {
	padding: 30upx 0;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
}

.order-btn-box .btn {
	display: inline-view;
	width: 140upx;
	height: 58upx;
	text-align: center;
	line-height: 58upx;
	font-size: 26upx;
	color: #333;
	margin-left: 20upx;
}

.order-btn-box .btn.l {
	color: #333;
	border: 2rpx solid #333333;
}

.order-btn-box .viewDetail {
	background: #333333;
	border: none;
	color: #FFEBC4 !important;
}
</style>
