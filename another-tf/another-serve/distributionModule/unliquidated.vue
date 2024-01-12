<template>
	<view>
		<global-loading />

		<view v-if="ifShow">
			<view class="unliquidated-topBackImg flex-items flex-column">
				<view class="totalAward-content flex-column font-color-FFF">
					<view class="flex-items-plus  mar-top-60">
						<label class="fs60 amount">￥{{ ZSalesOrderData.total }}</label>
					</view>
					<view class="flex-row-plus flex-sp-around fs24 mar-top-30">
						<view class="awardBox">
							<view class="fs36 font-color-FFF">{{ ZSalesOrderData.directPrice }}</view>
							<view class="awardTit font-color-FFF">直接奖励(元）</view>
						</view>
						<view class="awardBox">
							<view class="fs36 font-color-FFF">{{ ZSalesOrderData.indirectPrice }}</view>
							<view class="awardTit font-color-FFF">间接奖励(元）</view>
						</view>
					</view>
				</view>
			</view>
			<view class="awardType">
				<view class="awardType-box flex-center">
					<view class="awardType-content">
						<u-tabs
							:list="awardTypeList" bar-width="60" :bold="false" active-color="#C5AA7B"
							inactive-color="#999999"
							:is-scroll="false" :current="awardTypeFlag" @change="awardTypeActive"
						></u-tabs>
					</view>
				</view>
				<view v-if="awardTypeFlag == 0">
					<view v-if="ZStotallength > 0">
						<view v-for="(item, index) in ZSalesOrderDatalist" :key="index" class="flex-center">
							<view class="directAward-box font-color-656 fs26" @click="arrowTypeChange1(index)">
								<view style="display: flex;" class="directAwardInfo">
									<view style="flex: 1;" class="flex-items flex-sp-between">
										<label class="orderId-box font-color-999">订单号：{{ item.orderFormid }}</label>
										<view class="mar-right-50 font-color-999">
											佣金：<label class="font-color-C5AA7B">¥{{ item.commission }}</label>
										</view>
									</view>
									<view>
										<image
											v-if="item.ifOpen == false" class="arrow-down"
											src="../../static/images/origin/arrowDownIcon.png"
										></image>
										<image
											v-if="item.ifOpen == true" class="arrow-down"
											src="../../static/images/origin/arrowUpIcon.png"
										></image>
									</view>
								</view>
								<view v-if="item.ifOpen == true">
									<view class="flex-row-plus flex-items flex-sp-between mar-top-30">
										<label class="orderId-box font-color-999">商品数：{{ item.products }}</label>
										<label class="commission-box mar-left-70 font-color-999">实付金额：¥{{ item.price }}</label>
									</view>
									<view class="flex-row-plus flex-items mar-top-30">
										<label class="orderId-box font-color-999">下单人：{{ item.customerName }}</label>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view v-else class="emptyCart-box flex-items-plus flex-column">
						<image class="emptyCart-img" src="../../static/images/origin/bgnull.png"></image>
						<label class="font-color-999 fs26 mar-top-30">这里空空如也~</label>
					</view>
				</view>
				<view v-if="awardTypeFlag == 1">
					storeName
					<view v-if="JStotallength > 0">
						<view v-for="(item, index) in JSalesOrderDatalist" :key="index" class="flex-center">
							<view class="directAward-box font-color-656 fs26" @click="arrowTypeChange(index)">
								<view style="display: flex;" class="directAwardInfo">
									<view style="flex: 1;" class="flex-items flex-sp-between">
										<label class="orderId-box font-color-999">订单号：{{ item.orderFormid }}</label>
										<view class="mar-right-50 font-color-999">
											佣金：<label class="font-color-C5AA7B">¥{{ item.commission }}</label>
										</view>
									</view>
									<view>
										<image
											v-if="item.ifOpen == false" class="arrow-down"
											src="../../static/images/origin/arrowDownIcon.png"
										></image>
										<image
											v-if="item.ifOpen == true" class="arrow-down"
											src="../../static/images/origin/arrowUpIcon.png"
										></image>
									</view>
								</view>
								<view v-if="item.ifOpen == true">
									<view class="flex-row-plus flex-items flex-sp-between mar-top-30">
										<label class="orderId-box font-color-999">商品数：{{ item.products }}</label>
										<label class="commission-box mar-left-70 font-color-999">实付金额：¥{{ item.price }}</label>
									</view>
									<view class="flex-row-plus flex-items mar-top-30">
										<label class="orderId-box font-color-999">下单人：{{ item.customerName }}</label>
									</view>
									<view class="flex-row-plus flex-items mar-top-30">
										<label class="orderId-box font-color-999">分销员：{{ item.distributorName }}</label>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view v-else class="emptyCart-box flex-items-plus flex-column">
						<image class="emptyCart-img" src="../../static/images/origin/bgnull.png"></image>
						<label class="font-color-999 fs26 mar-top-30">这里空空如也~</label>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
const NET = require('../../utils/request')
const API = require('../../config/api')
export default {
	data() {
		return {
			awardTypeList: [{
				name: '直接奖励'
			}, {
				name: '间接奖励'
			}],
			awardTypeFlag: 0,
			SalesOrderQuery: {
				model: {
					tenantCode: '',
					settleStatus: '',
					type: ''
				},
				current: 0,
				size: 10
			},
			SalesOrderData: [],
			ZSalesOrderData: [],
			JSalesOrderData: [],
			shopId: 0,
			distributorId: 0,
			ZStotallength: 0,
			JStotallength: 0,
			page: 1,
			pageSize: 20,
			loadingType: 0,
			loadingType1: 0,
			ZSalesOrderDatalist: [],
			JSalesOrderDatalist: [],
			ifShow: false
		}
	},
	onLoad(options) {
		this.shopId = options.shopId
		this.distributorId = options.distributorId
		this.getZSalesOrderData()
		this.getJSalesOrderData()
	},
	onReachBottom() {
		if (this.awardTypeFlag == 0) {
			if (this.loadingType == 1) {
				uni.stopPullDownRefresh()
			} else {
				this.page = this.page + 1
				this.getZSalesOrderData()
			}
		} else if (this.loadingType1 == 1) {
			uni.stopPullDownRefresh()
		} else {
			this.page = this.page + 1
			this.getJSalesOrderData()
		}
	},
	methods: {
		getZSalesOrderData() {
			// uni.showLoading({
			//   mask: true,
			// 	title:'加载中...'
			// })
			NET.request(API.GetNotReward, {
				shopId: this.shopId,
				distributorId: this.distributorId,
				type: 1,
				page: this.page,
				pageSize: this.pageSize
			}, 'GET').then((res) => {
				uni.hideLoading()
				if (res.data.page.list.length == 0) {
					this.loadingType = 1
					this.page = this.page
				}
				this.ZSalesOrderDatalist = this.ZSalesOrderDatalist.concat(res.data.page.list)
				this.ZSalesOrderData = res.data
				this.ZStotallength = this.ZSalesOrderData.page.total
				this.ifShow = true
			})
				.catch((res) => {
					uni.hideLoading()
				})
		},
		getJSalesOrderData() {
			// uni.showLoading({
			//   mask: true,
			// 	title:'加载中...'
			// })
			NET.request(API.GetNotReward, {
				shopId: this.shopId,
				distributorId: this.distributorId,
				type: 2,
				page: this.page,
				pageSize: this.pageSize
			}, 'GET').then((res) => {
				uni.hideLoading()
				if (res.data.page.list.length == 0) {
					this.loadingType1 = 1
					uni.showToast({
						title: '已加载全部···',
						duration: 2000,
						icon: 'none'
					})
					this.page = this.page
				}
				this.JSalesOrderDatalist = this.JSalesOrderDatalist.concat(res.data.page.list)
				this.JSalesOrderData = res.data
				this.JStotallength = this.JSalesOrderData.page.total
			})
				.catch((res) => {
					uni.hideLoading()
				})
		},

		awardTypeActive(type) {
			this.awardTypeFlag = type
			this.page = 1
		},
		arrowTypeChange1(arrowTypeId) {
			this.ZSalesOrderData.page.list[arrowTypeId].ifOpen = this.ZSalesOrderData.page.list[arrowTypeId].ifOpen == false
		},
		arrowTypeChange(arrowTypeId) {
			this.JSalesOrderData.page.list[arrowTypeId].ifOpen = this.JSalesOrderData.page.list[arrowTypeId].ifOpen == false
		}
	}
}
</script>

<style lang="scss">
page {
	background: #333333;
}

.emptyCart-box {
	margin-top: 70 upx;

	.emptyCart-img {
		width: 225 upx;
		height: 196 upx;
	}
}

.unliquidated-topBackImg {
	width: 100%;
	height: 360 rpx;
	background: url(../../static/images/origin/unliquidatedBg.png) no-repeat;
	background-size: 100%;
	margin-top: 30 rpx;

	.totalAward-content {
		width: 90%;

		.awardBox {
			text-align: center;

			.awardTit {
				opacity: 0.7;
			}
		}

		.amount {
			color: #FFEBC4;
		}
	}
}

.awardType-box {
	border-bottom: 1 upx solid #666666;

	.awardType-content {
		height: 80 upx;
		width: 500 upx;
	}
}

.directAward-box {
	width: 94%;
	border-bottom: 1 upx solid #666666;
	padding: 30 upx;
	display: flex;
	justify-content: flex-start;
	flex-direction: column;
	background: #FFFFFF;
	margin-top: 30 rpx;

	.orderId-box {
		display: flex;
		justify-content: flex-start;
		flex-direction: row;
	}

	.commission-box {
		width: 260 upx;
	}

	.arrow-down {
		width: 24 upx;
		height: 24 upx;
	}

	.directAwardInfo {}
}

.totalAwardEmpty-box {
	margin-top: 65 upx;

	.totalAwardEmpty {
		width: 270 upx;
		height: 270 upx;
	}
}
</style>

<style scoped>
.awardType /deep/ .u-tabs {
	background: none !important;
}
</style>
