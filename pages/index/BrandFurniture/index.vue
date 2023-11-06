<template>
	<view class="BrandFurniturePage">
		<view class="page-haeder">
			<image @click="handleBack" src="@/static/images/new-business/category/back.png" class="back-icon"></image>
			<view class="search-container" @click="go('/pages/search-page/search-page')">
				<input type="text" class="input" placeholder="请输入您想搜索的商品">
				<button class="uni-btn">搜索</button>
			</view>
		</view>
		<view class="SearchHistory">
			<text class="hisyoryTele_item">功能床垫</text>
			<text class="hisyoryTele_item">智能床垫</text>
			<text class="hisyoryTele_item">我带你们打</text>
		</view>
		<view class="typeList">
			
		</view>
	</view>
</template>

<script>
import { getClassifyProducts2Api } from "@/api/anotherTFInterface";
	export default {
		data() {
			return {
				
			};
		},
		onLoad(options) {
			// getClassifyProducts2Api({
			// 	classifyId: 1124,
			// 	type: 1,
			// 	volume: 1,
			// 	productName: '',
			// 	page: 1,
			// 	pageSize: 20
			// }).then(res => {
			// 	console.log(res);
			// }).catch(err => {
			// 	console.log(err);
			// })
		},
		methods: {
			handleBack() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			}
		}
	}
</script>

<style lang="scss">
.BrandFurniturePage {
	width: 100vw;
	min-height: 100vh;
	background: #F5F4F6;
	.page-haeder {
		width: 100vw;
		display: flex;
		align-items: center;
		height: 128upx;
		/* background-color: #fff; */
		padding: 28upx 30upx;
		box-sizing: border-box;

		.back-icon {
			width: 48upx;
			height: 48upx;
			flex-shrink: 0;
		}

		.search-container {
			height: 72upx;
			flex: 1;
			border: 1upx solid #EF5511;
			border-radius: 100px;
			display: flex;
			align-items: center;
			padding: 14upx 10upx 14upx 30upx;
			box-sizing: border-box;

		.input {
			flex: 1;
			font-size: 24upx;
		}


		.uni-btn {
			height: 54upx;
			width: 112upx;
			display: flex;
			justify-content: center;
			background: linear-gradient(270deg, #EF530E 0%, #EE6C33 100%);
			color: #fff;
			align-items: center;
			border-radius: 100px;
			font-size: 28upx;

			}
		}
	}
	.SearchHistory {
		margin-top: -10rpx;
		width: 100vw;
		height: 60rpx;
		display: flex;
		align-items: center;
		/* gap: 10rpx; */
		.hisyoryTele_item {
			margin-left: 10rpx;
			/* width: 116px; */
			height: 28rpx;
			border-radius: 50rpx;

			/* 自动布局 */
			display: flex;
			flex-direction: column;
			padding: 4px 14rpx;

			background: #FFFFFF;
			font-family: Source Han Sans;
			font-size: 22rpx;
			line-height: 24rpx;
			color: #888889;
		}
	}
	.typeList {
		width: 100vw;
		height: 180rpx;
		overflow: auto hidden;
	}
}
</style>
