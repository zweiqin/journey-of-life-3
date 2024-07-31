<template>
	<view class="total-personnel-container">
		<JHeader :dark="false" title="累计分销员" width="50" height="50" style="padding: 24rpx 0 0;"></JHeader>
		<view class="totalClient-topBackImg">
			<view class="topBg">
				<view class="font-color-8A734A mar-top-30 fs60">{{ subordinateSalesDataTotal }}</view>
				<view class="font-color-C5AA7B">累计分销员（人）</view>
			</view>
		</view>
		<view v-if="subordinateSalesDatalist && subordinateSalesDatalist.length" class="content directAwardInfo">
			<view class="directAwardTit fs32 font-color-333">我的客户信息</view>
			<view v-for="(item, index) in subordinateSalesDatalist" :key="index" class="flex-center clientList-box mar-top-30">
				<view class="directAward-box font-color-656 fs26" @click="arrowTypeChange(index)">
					<view class="directAward-icon flex-row-plus flex-items flex-sp-between">
						<view>
							<label class="orderId-box name font-color-333 fs28">分销员昵称：{{ item.distributorName }}</label>
							<view class="flex-row-plus flex-items mar-top-30 flex-sp-between">
								<label class="orderId-box font-color-999">手机号：{{ item.distributorPhone }}</label>
							</view>
						</view>
						<tui-icon
							:name="item.ifOpen ? 'arrowup' : 'arrowdown'" :size="30" unit="rpx" margin="0"
							color="#b7b7b7"
						></tui-icon>
					</view>
					<view v-if="item.ifOpen == true">
						<view class="flex-row-plus flex-itdistributionOrderems mar-top-30 flex-sp-between">
							<label class="orderId-box font-color-999">累计下单数：{{ item.orders }}</label>
							<label class="commission-box mar-left-70 font-color-999">累计分佣：¥{{ item.price }}</label>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="padding-bottom: 45rpx;">
			<LoadingMore
				:status="!isEmpty && !subordinateSalesDatalist.length
					? 'loading' : !isEmpty && subordinateSalesDatalist.length && (subordinateSalesDatalist.length >= subordinateSalesDataTotal) ? 'no-more' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="isEmpty" :fixed="false" style="padding-top: 60rpx;">这里空空如也~</tui-no-data>
		</view>
	</view>
</template>

<script>
import { getDistributorsDistributorApi } from '../../../api/anotherTFInterface'

export default {
	name: 'TotalPersonnel',
	data() {
		return {
			isEmpty: false,
			subordinateSalesDatalist: [],
			subordinateSalesDataTotal: 0,
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
		this.getSubordinateSales()
	},
	methods: {
		getSubordinateSales(isLoadmore) {
			uni.showLoading()
			getDistributorsDistributorApi(this.queryInfo).then((res) => {
				this.subordinateSalesDataTotal = res.data.total
				if (isLoadmore) {
					this.subordinateSalesDatalist.push(...res.data.list)
				} else {
					this.subordinateSalesDatalist = res.data.list
				}
				this.isEmpty = this.subordinateSalesDatalist.length === 0
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		arrowTypeChange(arrowTypeId) {
			this.subordinateSalesDatalist[arrowTypeId].ifOpen = this.subordinateSalesDatalist[arrowTypeId].ifOpen == false
		}
	},
	onReachBottom() {
		if (this.subordinateSalesDatalist.length < this.subordinateSalesDataTotal) {
			++this.queryInfo.page
			this.getSubordinateSales(true)
		}
	}
}
</script>

<style lang="less" scoped>
.total-personnel-container {
	min-height: 100%;
	background-color: #333333;
	box-sizing: border-box;

	.totalClient-topBackImg {
		padding: 0 20rpx;

		.topBg {
			height: 196rpx;
			background-color: #f5e3c7;
			margin-top: 50rpx;
			text-align: center;
		}

		.content {
			width: 690rpx;
			background-color: #FFFFFF;
		}
	}

	.directAwardInfo {
		width: 100%;
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
		width: 100%;
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

		label.name {
			font-weight: bold;
		}

		.commission-box {
			text-align: right;
		}
	}
}
</style>
