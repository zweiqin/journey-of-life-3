<template>
	<view class="distribution-order-container">
		<JHeader title="我的分销订单" width="50" height="50" style="padding: 24rpx 0 0;"></JHeader>
		<view v-if="findMySalesDatalist && findMySalesDatalist.length">
			<view v-for="(item, index) in findMySalesDatalist" :key="index" class="flex-center clientList-box">
				<view class="directAward-box font-color-656 fs26">
					<view class="directAward-icon flex-row-plus flex-items flex-sp-between" @click="arrowTypeChange(index)">
						<view class="flex-column-plus font-color-333 fs30">
							<label class="orderId-box">订单号：{{ item.orderId }}</label>
							<view class="orderId-box mar-top-20">
								佣金：<label class="font-color-C5AA7B">¥{{ item.commission }}</label>
							</view>
						</view>
						<view>
							<tui-icon
								:name="item.ifOpen ? 'arrowup' : 'arrowdown'" :size="30" unit="rpx" margin="0"
								color="#b7b7b7"
							></tui-icon>
						</view>
					</view>
					<view v-if="item.ifOpen == true" class="upBox">
						<view class="flex-row-plus flex-items mar-top-30 flex-sp-between">
							<label class="orderId-box font-color-999 fs26">商品数：{{ item.products }}</label>
							<label class="orderId-box font-color-999 fs26">实付金额：¥{{ item.price }}</label>
						</view>
						<view class="flex-row-plus flex-items mar-top-30 flex-sp-between">
							<label class="orderId-box font-color-999 fs26">下单人：{{ item.customerName }}</label>
							<label class="commission-box mar-left-70 font-color-999 fs26">
								状态：<text class="state" :class="{ current: item.state == 0 }">
									{{ item.state === 0 ? '未结算' : '已结算' }}
								</text>
							</label>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="padding-bottom: 45rpx;">
			<LoadingMore
				:status="!isEmpty && !findMySalesDatalist.length
					? 'loading' : !isEmpty && findMySalesDatalist.length && (findMySalesDatalist.length >= findMySalesDataTotal) ? 'no-more' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="isEmpty" :fixed="false" style="padding-top: 60rpx;">这里空空如也~</tui-no-data>
		</view>
	</view>
</template>

<script>
import { getDistributorOrderApi } from '../../../api/anotherTFInterface'

export default {
	name: 'DistributionOrder',
	data() {
		return {
			isEmpty: false,
			findMySalesDatalist: [],
			findMySalesDataTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20,
				shopId: 0,
				distributorId: 0
			}
		}
	},
	onLoad(options) {
		this.queryInfo.shopId = options.shopId
		this.queryInfo.distributorId = options.distributorId
		this.getSalesOrderPage()
	},
	methods: {
		getSalesOrderPage(isLoadmore) {
			uni.showLoading()
			getDistributorOrderApi(this.queryInfo).then((res) => {
				this.findMySalesDataTotal = res.data.total
				if (isLoadmore) {
					this.findMySalesDatalist.push(...res.data.list)
				} else {
					this.findMySalesDatalist = res.data.list
				}
				this.isEmpty = this.findMySalesDatalist.length === 0
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},

		arrowTypeChange(arrowTypeId) {
			this.findMySalesDatalist[arrowTypeId].ifOpen = this.findMySalesDatalist[arrowTypeId].ifOpen != true
		}
	},
	onReachBottom() {
		if (this.findMySalesDatalist.length < this.findMySalesDataTotal) {
			++this.queryInfo.page
			this.getSalesOrderPage(true)
		}
	}
}
</script>

<style lang="less" scoped>
.distribution-order-container {
	min-height: 100%;
	background-color: #F8F8F8;
	box-sizing: border-box;

	.directAward-box {
		width: 95%;
		display: flex;
		justify-content: flex-start;
		flex-direction: column;
		background-color: #FFFFFF;
		padding: 40rpx 20rpx;
		margin-top: 30rpx;

		.orderId-box {
			width: 320rpx;

		}

		.commission-box {
			width: 340rpx;
		}

		.state {
			color: #16BB89;
		}

		.current {
			color: #C83732 !important;
		}

		.upBox {
			border-top: 1rpx solid #EDEDED;
			margin-top: 30rpx;
		}
	}
}
</style>
