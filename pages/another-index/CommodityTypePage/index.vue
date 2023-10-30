<template>
	<view class="goods-list">
		<view class="op-container">
			<view @click="handleBack" class="back">
				<tui-icon color="#8a2a2a" name="arrowleft"></tui-icon>
			</view>

			<view class="right-container">

			</view>
		</view>
		<view class="subMenus">
			<scroll-view scroll-x>
				<view class="sub-list-container">
					<view class="sub-item" @click="handleFilterSubCategory(item)" :class="{ active: subCategoryId === item.id }" v-for="item in subCategoryList" :key="item.id">{{ item.name }}</view>
				</view>
			</scroll-view>
		</view>
		<view class="shopList">
			<NewGoodsPane v-for="item in $data._list.slice(4)" :goods="item" :key="item.id"> </NewGoodsPane>
			<LoadingMore v-show="$data._status !== 'none'" :status="$data._status"></LoadingMore>
		</view>
	</view>
</template>

<script>
	import NewGoodsPane from '../cpns/NewGoodsPane.vue';

	import { goodsListApi } from '@/api/goods';
	import { getGoodsTypesApi, getTypeDetailList } from '@/api/home';
	import loadMore from '@/mixin/loadMore';
	// import { homeTopNavs } from './config';
	export default {
		components: {
			NewGoodsPane
		},
		mixins: [
			loadMore({
			api: goodsListApi,
			mapKey: { totalPages: 'totalPages', list: 'goodsList', size: 'size' },
			dataFn(goodsArr) {
				if (!this.ad.hot.length) {
				this.ad.hot.push(...goodsArr.slice(0, 2));
				this.ad.good.push(...goodsArr.slice(2, 4));
				}
				return goodsArr;
			}
			})
		],
		data() {
			return {
				// homeTopNavs: homeTopNavs,
				ad: {
					hot: [],
					good: []
				},
				categories: [],
      			subCategoryList: [],
				subCategoryId: -1,
			};
		},
		onLoad(options) {
			this.$data._query.categoryId = options.id;
			this.$data._query.page = 1;
			this.$data._list = [];
			this.ad.hot = [];
			this.ad.good = [];
			this._loadData();
			this.getSubMenus(options.id);
		},
		methods: {
			handleBack() {
				uni.navigateBack()
			},
			async getSubMenus(id) {
				const res = await getTypeDetailList({ id });
				if (res.errno === 0) {
					this.subCategoryList = res.data.currentSubCategory;
					this.subCategoryList.unshift({ id: -1, name: '全部', pid: res.data.currentSubCategory[0].pid });
				}
			},
			handleFilterSubCategory(info) {
				this.$data._list = [];
				this.ad.hot = [];
				this.ad.good = [];
				this.$data._query.page = 1;
				this.$data._query.categoryId = info.id === -1 ? info.pid : info.id;
				this.subCategoryId = info.id;
				this._loadData();
			}
		}
	}
</script>

<style lang="scss">
	.goods-list {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: 140upx;
		background-color: #eff3f6;
	}
	.op-container {
		height: 90upx;
		width: 100%;
		top: 0;
		left: 0;
		right: 0;
		transition: all 350ms;
		/* background-color: #eff3f6; */
		// background-color: aqua;
		background: rgba(255, 255, 255, 0.2);
		-webkit-backdrop-filter: blur(8px);
		backdrop-filter: blur(8px);

		display: flex;
		align-items: center;
		justify-content: space-between;

		.right-container {
			display: flex;
			align-items: center;
		}

		.image-wrapper {
			width: 72upx;
			height: 72upx;
			background-color: rgba(0, 0, 0, 0.2);
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: 20upx;

			.image {
			width: 40upx;
			height: 40upx;
			}
  }
}
.subMenus {
	width: 100vw;
	display: flex;
}
.sub-list-container {
	box-sizing: border-box;
	display: flex;
	align-items: center;
	white-space: nowrap;
	margin-bottom: 20upx;
	padding: 0 30rpx;

	.sub-item {
		font-size: 32upx;
		padding: 6upx 18upx;
		/* border: 1upx solid #777; */
		border-radius: 12upx;
		margin-right: 20upx;
		color: #777;
		background: rgba(255, 255, 255, 0.693);
		-webkit-backdrop-filter: blur(8px);
		backdrop-filter: blur(8px);

		&.active {
		border-color: #ef530e;
		color: #ef530e;
		}
	}
}
.shopList {
	box-sizing: border-box;
	padding: 10rpx 30rpx;
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
}
</style>
