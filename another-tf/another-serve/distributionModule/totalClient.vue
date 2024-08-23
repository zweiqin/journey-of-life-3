<template>
	<view class="total-client-container">
		<JHeader :dark="false" title="累计客户" width="50" height="50"></JHeader>
		<view class="totalClient-topBackImg">
			<view class="topBg">
				<view class="font-color-8A734A pad-top-40 fs60">{{ salesCustomerDataTotal }}</view>
				<view class="font-color-C5AA7B">累计客户（人）</view>
			</view>
		</view>
		<view v-if="salesCustomerDataList && salesCustomerDataList.length" class="content directAwardInfo">
			<view class="directAwardTit fs32 font-color-333">我的客户信息</view>
			<view v-for="(item, index) in salesCustomerDataList" :key="index" class="flex-center clientList-box mar-top-30">
				<view class="directAward-box font-color-656 fs26" @click="arrowTypeChange1(index)">
					<view class="directAward-icon flex-row-plus flex-items flex-sp-between">
						<view>
							<view class="flex-row-plus flex-items mar-top-30 flex-sp-between">
								<label class="orderId-box font-color-999">客户昵称：{{ item.customerName }}</label>
							</view>
						</view>
						<tui-icon
							:name="item.ifOpen ? 'arrowup' : 'arrowdown'" :size="30" unit="rpx" margin="0"
							color="#b7b7b7"
						></tui-icon>
					</view>
					<view v-if="item.ifOpen == true">
						<view class="flex-row-plus flex-itdistributionOrderems mar-top-30 flex-sp-between">
							<label class="orderId-box font-color-999">手机号：{{ item.customerPhone }}</label>
						</view>
						<view class="flex-row-plus flex-itdistributionOrderems mar-top-30 flex-sp-between">
							<label class="orderId-box font-color-999">累计下单数：{{ item.orders }}</label>
							<label class="commission-box mar-left-70 font-color-999">累计消费金额：¥{{ item.price }}</label>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="padding-bottom: 45rpx;">
			<LoadingMore
				:status="!isEmpty && !salesCustomerDataList.length
					? 'loading' : !isEmpty && salesCustomerDataList.length && (salesCustomerDataList.length >= salesCustomerDataTotal) ? 'no-more' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="isEmpty" :fixed="false" style="padding-top: 60rpx;">这里空空如也~</tui-no-data>
		</view>
	</view>
</template>

<script>
import { getBuyersDistributorApi } from '../../../api/anotherTFInterface'

export default {
	name: 'TotalClient',
	data() {
		return {
			isEmpty: false,
			salesCustomerDataList: [],
			salesCustomerDataTotal: 0,
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
		this.getSalesCustomer()
	},
	methods: {
		getSalesCustomer(isLoadmore) {
			uni.showLoading()
			getBuyersDistributorApi(this.queryInfo).then((res) => {
				this.salesCustomerDataTotal = res.data.total
				if (isLoadmore) {
					this.salesCustomerDataList.push(...res.data.list)
				} else {
					this.salesCustomerDataList = res.data.list
				}
				this.isEmpty = this.salesCustomerDataList.length === 0
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		arrowTypeChange1(arrowTypeId) {
			this.salesCustomerDataList[arrowTypeId].ifOpen = this.salesCustomerDataList[arrowTypeId].ifOpen == false
		}
	},
	onReachBottom() {
		if (this.salesCustomerDataList.length < this.salesCustomerDataTotal) {
			++this.queryInfo.page
			this.getSalesCustomer(true)
		}
	}
}
</script>

<style lang="less" scoped>
.total-client-container {
	min-height: 100%;
	background-color: #333333;
	box-sizing: border-box;
	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}

	.totalClient-topBackImg {
		padding: 0 20rpx;

		.topBg {
			height: 196rpx;
			background-color: #f5e3c7;
			margin-top: 50rpx;
			text-align: center;
		}

		.content {
			background-color: #FFFFFF;
		}
	}

	.directAwardInfo {
		height: 100vh;
		background: #F8F8F8;
		padding: 0 20rpx;

		.directAwardTit {
			height: 88rpx;
			line-height: 88rpx;
			font-size: 32rpx;
			color: #333333;
			text-align: center;
			padding-bottom: 20rpx;
			border-bottom: 2rpx solid #EEEEEE;
			font-weight: bold;
		}
	}

	.directAward-box {
		display: flex;
		justify-content: flex-start;
		flex-direction: column;
		background-color: #FFFFFF;
		padding: 50rpx 20rpx;

		.orderId-box {
			width: 320rpx;
			display: flex;
			justify-content: flex-start;
			flex-direction: row;
		}
	}
}
</style>
