<template>
	<view class="shop-commodity-container">
		<JHeader title="商家商品" width="50" height="50" style="padding: 24upx 0 0;"></JHeader>
		<view class="flex-items-plus flex-row search">
			<view class="searchBg">
				<view class="searchImg-box flex-items-plus">
					<tui-icon style="position: absolute;left: 0;" name="search" :size="50" unit="upx" color="#d1d1d1"></tui-icon>
					<input
						v-model="queryInfo.search" class="search-box" maxlength="20" placeholder-class="searchboxPlace"
						placeholder="请输入您想要的宝贝"
					/>
				</view>
				<label class="mar-left-40 fs28" @click="(queryInfo.page = 1) && getSearchProductsBusiness()">
					搜索
				</label>
			</view>
		</view>
		<view style="display: flex;align-items: center;justify-content: space-around;padding: 10upx 0;font-size: 26upx;">
			<view :style="{ color: sortGoodsIndex == 1 ? '#ff7911' : '#000000' }" @click="handleGoodsSortTap(1)">
				<text>价格</text>
				<tui-icon
					:name="queryInfo.type == 1 ? 'turningup' : queryInfo.type == 2 ? 'turningdown' : ''" color="#666666"
					:size="16"
				></tui-icon>
			</view>
			<view :style="{ color: sortGoodsIndex == 2 ? '#ff7911' : '#000000' }" @click="handleGoodsSortTap(2)">
				<text>销量</text>
				<tui-icon
					v-if="[1, 2].includes(queryInfo.volume)"
					:name="queryInfo.volume == 1 ? 'turningup' : queryInfo.volume == 2 ? 'turningdown' : ''" color="#666666"
					:size="16"
				></tui-icon>
			</view>
		</view>
		<!-- 商品列表 -->
		<view v-if="shopList && shopList.length" class="shop-list">
			<ATFCommonShop
				v-for="shop in shopList" :key="shop.shopId" :shop-info="shop" bottom-type="detail"
				margin="22upx 0"
				radius="20upx"
			>
				<view style="padding: 20upx 26upx">
					<scroll-view scroll-x="true">
						<view style="display: flex;">
							<view
								v-for="item in shop.productList"
								:key="item.productId"
								style="display: flex;flex-direction: column;justify-content: space-between;padding-right: 18upx;"
								@click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${item.shopId}&productId=${item.productId}&skuId=${item.skuId}`)"
							>
								<view style="width: 160upx;">
									<tui-lazyload-img
										width="100%" height="168upx" mode="scaleToFill" radius="20upx"
										:src="common.seamingImgUrl(item.image)"
									></tui-lazyload-img>
									<view
										style="line-height: 1;word-break: break-all;display: -webkit-box;overflow: hidden;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
									>
										<text style="font-size: 24upx;">{{ item.productName }}</text>
									</view>
								</view>
								<view style="margin-top: 14upx;display: flex;align-items: center;flex-wrap: wrap;">
									<view style="font-size: 28upx;font-weight: bold;color: #E02208;margin-right: 10upx;">
										<text style="font-size: 26upx;">￥</text>
										{{ item.price }}
									</view>
									<view v-if="item.price !== item.originalPrice" style="font-size: 24upx;color: #979797;text-decoration: line-through;">
										￥{{ item.originalPrice }}
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</ATFCommonShop>
		</view>
		<view style="padding-bottom: 45upx;">
			<LoadingMore
				:status="!isEmpty && !shopList.length
					? 'loading' : !isEmpty && shopList.length && (shopList.length >= shopTotal) ? 'no-more' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="isEmpty" :fixed="false" style="margin-top: 60upx;">暂无数据</tui-no-data>
		</view>
	</view>
</template>

<script>
import { mapGetters } from 'vuex'
import { getBusinessSearchProductsApi } from '../../../api/anotherTFInterface'

export default {
	name: 'ShopCommodity',
	data() {
		return {
			sortGoodsIndex: 1,
			isEmpty: false,
			shopList: [],
			shopTotal: 0,
			queryInfo: {
				search: '',
				type: 1,
				volume: 0,
				page: 1,
				pageSize: 20,
				longitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[0],
				latitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[1]
			}
		}
	},
	onLoad(option) {
		if (option.search) {
			this.queryInfo.search = option.search
		}
		this.getSearchProductsBusiness()
	},
	computed: {
		...mapGetters([ 'obtainLocationCount' ])
	},
	watch: {
		obtainLocationCount(val, oldVal) {
			const pages = getCurrentPages()
			if (pages[pages.length - 1].route === 'another-tf/another-user/shop-commodity/index') this.getSearchProductsBusiness()
		}
	},

	methods: {
		handleGoodsSortTap(index) {
			this.queryInfo.page = 1
			this.shopList = []
			if (index == 1) {
				this.queryInfo.type = this.queryInfo.type != 1 ? 1 : 2,
				this.queryInfo.volume = 1,
				this.sortGoodsIndex = index
			} else if (index == 2) {
				this.queryInfo.type = 1,
				this.queryInfo.volume = this.queryInfo.volume != 1 ? 1 : 2,
				this.sortGoodsIndex = index
			}
			this.getSearchProductsBusiness()
		},
		getSearchProductsBusiness(isLoadmore) {
			if (!this.queryInfo.longitude || !this.queryInfo.latitude) this.$showToast('缺少定位数据')
			uni.showLoading()
			getBusinessSearchProductsApi({
				...this.queryInfo,
				longitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[0],
				latitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[1]
			})
				.then((res) => {
					this.shopTotal = res.data.total
					if (isLoadmore) {
						this.shopList.push(...res.data.list)
					} else {
						this.shopList = res.data.list
					}
					this.isEmpty = this.shopList.length === 0
					uni.hideLoading()
				})
				.catch((e) => {
					uni.hideLoading()
				})
		}
	},
	onReachBottom() {
		if (this.shopList.length < this.shopTotal) {
			++this.queryInfo.page
			this.getSearchProductsBusiness(true)
		}
	}
}
</script>

<style lang="less" scoped>
input {
	padding-left: 80upx;
}

.shop-commodity-container {
	position: relative;
	min-height: 100%;
	background-color: #f8f8f8;
	box-sizing: border-box;

	.search {
		padding: 20rpx;
		padding-top: 20rpx;
		background: #FFFFFF;
		border-top: 2rpx solid #F3F4F5;
		position: relative;
		z-index: 2;
	}

	.searchImg-box {
		position: relative;
	}

	.searchBg {
		width: 100%;
		display: flex;
		background-color: #F7F7F7;
		align-items: center;
		height: 78rpx;
		justify-content: space-between;
		padding: 0 20rpx;

		label {
			font-weight: 400;
			color: #333333;
		}
	}

	.search-box {
		width: 400upx;
		height: 66upx;
	}

	.shop-list {
		padding: 20upx;
		box-sizing: border-box;

		.sub-menus {
			display: flex;
			align-items: center;
			margin-top: 8upx;
			margin-left: 36upx;
		}
	}
}
</style>
