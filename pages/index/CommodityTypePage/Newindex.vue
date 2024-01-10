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
					<view class="sub-item" @click="handleFilterSubCategory(item)" :class="{ active: subCategoryId === item.id }" v-for="item in subCategoryList" :key="item.id">{{ item.categoryName }}</view>
				</view>
			</scroll-view>
		</view>
		<view class="shopList">
			<NewGoodsPane v-for="item in categories" :goods="item" :key="item.id"> </NewGoodsPane>
			<!-- <LoadingMore v-show="$data._status !== 'none'" :status="$data._status"></LoadingMore> -->
		</view>
	</view>
</template>

<script>
	import NewGoodsPane from './cpns/NewGoodsPane.vue';
    import { getClassifyProducts2Api } from '@/api/anotherTFInterface';
	// import { homeTopNavs } from './config';
	export default {
		components: {
			NewGoodsPane
		},
		data() {
			return {
                subCategoryId: '',
				subCategoryList: [],
                categories: [],
                queryList: {
                    page: 1,
                    pageSize: 20
                },
                total: '',
			}
		},
		onLoad(options) {
            let data = JSON.parse(options.shopData).data.childs
            this.subCategoryId = data[0].id
            this.subCategoryList = data
            this.getList()
			console.log(JSON.parse(options.shopData))
		},
		methods: {
            handleBack() {
                uni.navigateBack();
            },
			handleFilterSubCategory(item) {
                console.log(item);
                this.subCategoryId = item.id
                this.getList()
            },
            getList() {
                getClassifyProducts2Api({
                    classifyId: this.subCategoryId,
                    type: '1',
                    volume: '1',
                    productName: '',
                    ...this.queryList
                }).then(res => {
                    this.categories = res.data.list
                    this.total = res.data.total
                    console.log(res)
                })
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
