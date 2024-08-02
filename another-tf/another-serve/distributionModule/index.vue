<template>
	<view class="distribution-module-container">
		<JHeader title="分销中心" width="50" height="50" style="padding: 24rpx 0 0;"></JHeader>
		<view v-if="storeDataList.length > 0" class="inStoreBackImg flex-items-plus">
			<label>选择进入的店铺</label>
		</view>
		<view>
			<view v-if="storeDataList && storeDataList.length" class="listBox">
				<view
					v-for="(item, index) in storeDataList" :key="index" class="flex-items-plus flex-column"
					@click="go(`/another-tf/another-serve/distributionModule/salesIndex?distributeInfo=${JSON.stringify(item)}`)"
				>
					<view class="store-box flex-items-plus flex-sp-between mar-top-30 bor-line-E5E5E5 pad-bot-30">
						<view class="flex-items-plus">
							<image class="storeLogoImg" :src="common.seamingImgUrl(item.shopLogo)"></image>
							<view class="font-color-656 fs24 mar-left-20">
								<label class="fs30 font-color-333">{{ item.shopName }}</label>
								<view class="flex-row-plus mar-top-20">
									<label>等级：{{ item.levelName }} </label>
								</view>
								<view class="mar-top-10">关系：<label>{{ item.state == 1 ? '有效' : '被清退' }}</label></view>
							</view>
						</view>
						<view class="income">
							<view class="font-color-333 fs30">总收益</view>
							<view class="font-color-C5AA7B fs30">{{ item.price }}元</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="padding-bottom: 45rpx;">
			<LoadingMore
				:status="!isEmpty && !storeDataList.length
					? 'loading' : !isEmpty && storeDataList.length && (storeDataList.length >= storeDataTotal) ? 'no-more' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="isEmpty" :fixed="false" style="padding-top: 60rpx;">这里空空如也~</tui-no-data>
		</view>
	</view>
</template>

<script>
import { getDistributorAllShopApi } from '../../../api/anotherTFInterface'
export default {
	name: 'DistributionModule',
	data() {
		return {
			isEmpty: false,
			storeDataList: [],
			storeDataTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20
			}
		}
	},
	onLoad() {
		this.getStoreList()
	},
	methods: {
		getStoreList(isLoadmore) {
			uni.showLoading()
			getDistributorAllShopApi(this.queryInfo).then((res) => {
				this.storeDataTotal = res.data.total
				if (isLoadmore) {
					this.storeDataList.push(...res.data.list)
				} else {
					this.storeDataList = res.data.list
				}
				this.isEmpty = this.storeDataList.length === 0
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		}
	},
	onReachBottom() {
		if (this.storeDataList.length < this.storeDataTotal) {
			++this.queryInfo.page
			this.getStoreList(true)
		}
	}
}
</script>

<style lang="less" scoped>
.distribution-module-container {
	min-height: 100vh;
	box-sizing: border-box;
	background-color: #F8F8F8;

	.inStoreBackImg {
		width: 100%;
		height: 100rpx;
		background: #333333;
		color: #FFFFFF;
	}

	.store-box {
		width: 690rpx;
		background: #FFFFFF;
		padding: 22rpx;

		.storeLogoImg {
			width: 140rpx;
			height: 140rpx;
		}

		.income {
			width: 200rpx;
			text-align: center;
			border-left: 2rpx solid #F3F4F5;
		}
	}
}
</style>
