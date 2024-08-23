<template>
	<view class="sales-index-container">
		<JHeader title="店铺分销中心" width="50" height="50"></JHeader>
		<view class="salesIndex-topBackImg">
			<view class="topStoreTag flex-row-plus">
				<view class="storeName overflow font-color-FFF">
					<image class="storeLogoImg" :src="common.seamingImgUrl(distributeInfo.shopLogo)"></image>
					<label class=" fs24">{{ distributeInfo.shopName }}</label>
				</view>
			</view>
			<view class="flex-items flex-column">
				<image class="salesHeadImg" :src="common.seamingImgUrl(salesMainData.headImage)"></image>
				<view class="font-color-FFF fs36 mar-top-10">{{ salesMainData.name }}</view>
				<view class="gradeText">{{ distributeInfo.levelName }}</view>
			</view>
			<view class="flex-items-plus awardTopInfo">
				<view class="flex-row-plus award-box flex-items flex-sp-around">
					<view class="flex-column-plus flex-items" @click="go(`/another-tf/another-serve/distributionModule/totalAward?shopId=${distributeInfo.shopId}&distributorId=${distributeInfo.distributorId}`)">
						<label class="fs50">{{ salesMainData.cumulative }}</label>
						<label class="fs26 award">累计奖励(元）</label>
					</view>
					<view class="flex-column-plus flex-items" @click="go(`/another-tf/another-serve/distributionModule/unliquidated?shopId=${distributeInfo.shopId}&distributorId=${distributeInfo.distributorId}`)">
						<label class="fs50">{{ salesMainData.unsettled }}</label>
						<label class="fs26 award">未结算奖励(元）</label>
					</view>
				</view>
			</view>
		</view>
		<view class="flex-items-plus awardInfo">
			<view class="flex-row-plus award-box flex-items flex-sp-around">
				<view class="flex-column-plus flex-items" @click="go(`/another-tf/another-serve/distributionModule/totalClient?shopId=${distributeInfo.shopId}&distributorId=${distributeInfo.distributorId}`)">
					<label class="fs44 font-color-C5AA7B">{{ salesMainData.users }}</label>
					<label class="fs24 font-color-333">累计客户(人）</label>
				</view>
				<view class="borRig-line-E5E5E5 lineRight" style="height: 44rpx;"></view>
				<view class="flex-column-plus flex-items" @click="go(`/another-tf/another-serve/distributionModule/totalPersonnel?shopId=${distributeInfo.shopId}&distributorId=${distributeInfo.distributorId}`)">
					<label class="fs44 font-color-C5AA7B">{{ salesMainData.distributors }}</label>
					<label class="fs24 font-color-333">累计分销员(人）</label>
				</view>
			</view>
		</view>
		<view class="btnList">
			<view class="btnListBox flex-row-plus flex-items flex-sp-around">
				<view class="flex-column-plus flex-items" @click="gopromotion(1)">
					<tui-icon name="shop" :size="64" unit="rpx" color="#333333" margin="0"></tui-icon>
					<label class="fs26 font-color-333">推广店铺</label>
				</view>
				<view class="flex-column-plus flex-items" @click="go(`/another-tf/another-serve/distributionModule/commodity?shopId=${distributeInfo.shopId}&distributorId=${distributeInfo.distributorId}`)">
					<tui-icon name="bag" :size="64" unit="rpx" color="#333333" margin="0"></tui-icon>
					<label class="fs26 font-color-333">推广商品</label>
				</view>
				<view class="flex-column-plus flex-items" @click="go(`/another-tf/another-serve/distributionModule/distributionOrder?shopId=${distributeInfo.shopId}&distributorId=${distributeInfo.distributorId}`)">
					<tui-icon name="order" :size="64" unit="rpx" color="#333333" margin="0"></tui-icon>
					<label class="fs26 font-color-333">分销订单</label>
				</view>
				<view class="flex-column-plus flex-items" @click="gopromotion(2)">
					<tui-icon name="down" :size="64" unit="rpx" color="#333333" margin="0"></tui-icon>
					<label class="fs26 font-color-333">邀请下级</label>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getShopDistributorSalesMainInfoApi, getSharePicShopApi } from '../../../api/anotherTFInterface'

export default {
	name: 'SalesIndex',
	data() {
		return {
			distributeInfo: {},
			salesMainData: {}
		}
	},
	onLoad(options) {
		this.distributeInfo = JSON.parse(options.distributeInfo)
		this.getSalesMainInfo()
	},

	methods: {
		getSalesMainInfo() {
			uni.showLoading()
			getShopDistributorSalesMainInfoApi({
				distributorId: this.distributeInfo.distributorId,
				shopId: this.distributeInfo.shopId
			}).then((res) => {
				uni.hideLoading()
				this.salesMainData = res.data
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		// 推广店铺
		gopromotion(promoteType) {
			let system
			// #ifdef APP
			system = 1
			// #endif
			// #ifdef H5
			system = 3
			// #endif
			// #ifdef MP-WEIXIN
			system = 2
			// #endif
			// #ifdef MP-ALIPAY
			system = 4
			// #endif
			uni.showLoading()
			getSharePicShopApi({
				type: promoteType,
				shopId: this.distributeInfo.shopId,
				distributorId: this.distributeInfo.distributorId,
				terminal: system
			}).then((res) => {
				uni.hideLoading()
				uni.navigateTo({
					url: `/another-tf/another-serve/shareProduct/index?shareType=1&shopId=${this.distributeInfo.shopId}&shareImg=${res.data}&salesId=${this.distributeInfo.distributorId}`
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
.sales-index-container {
	min-height: 100vh;
	box-sizing: border-box;
	background-color: #F7F7F7;
	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}

	.salesIndex-topBackImg {
		width: 100%;
		background: #333333;
		padding-top: 10rpx;
		position: relative;

		.topStoreTag {
			background: #717171;
			height: 50rpx;
			width: 180rpx;
			border-radius: 20rpx 0 0 20rpx;
			position: absolute;
			right: 0;
			top: 50rpx;

			.storeName {
				height: 50rpx;
				display: flex;
				align-items: center;
				margin-left: 5rpx;
			}

			.storeLogoImg {
				width: 40rpx;
				height: 40rpx;
				border-radius: 50%;
				margin-right: 10rpx;
			}
		}

		.salesHeadImg {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			border: 10rpx solid #717171;
		}

		.gradeText {
			font-size: 26rpx;
			color: #FFFFFF;
			font-weight: 400;
			line-height: 36rpx;
			text-align: center;
			margin-top: 15rpx;
			padding: 5rpx 10rpx;
			opacity: 0.7;
		}
	}

	.awardTopInfo {
		.award-box {
			height: 158rpx;
			width: 690rpx;
			margin-top: 30rpx;

			label {
				color: #FDEDD3;
			}

			.award {
				color: #8A734A;
				width: 222rpx;
				height: 78rpx;
				line-height: 78rpx;
				background: linear-gradient(90deg, #FDEDD3 0%, #EDDABA 100%);
				text-align: center;
				margin-bottom: 28rpx;
			}
		}
	}

	.awardInfo {
		.award-box {
			height: 158rpx;
			width: 690rpx;
			margin-top: 30rpx;
			background: #FFFFFF;
		}
	}

	.btnList {
		display: flex;
		width: 100%;
		margin-top: 30rpx;
		flex-flow: wrap;
		justify-content: center;

		.btnListBox {
			background: #FFFFFF;
			height: 196rpx;
			width: 690rpx;
		}

		.salesIcon {
			width: 90rpx;
			height: 90rpx;
		}
	}
}
</style>
