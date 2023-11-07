<template>
	<view class="HotBoxContainer">
		<view class="backHeader">
			<image @click="goBack" class="backIcon" src="@/static/index/convenient-services/return.png"></image>
			<text class="pageTitle">全屋快装</text>
		</view>
		<view class="header">
			<image class="backgroundImg" src="@/static/images/new-index/topBgImg.png"></image>
			<!-- <view> -->
			<!-- <tui-form ref="form">
				<tui-input :lineLeft="false" placeholder="输入商品名" v-model="value"></tui-input>
				<view class="tui-btn__box">
					<tui-button width="400rpx" height="84rpx" bold @click="submit">提交</tui-button>
				</view>
 			</tui-form> -->
			<form class="selectInput">
				<view class="inputView" @click="go('/pages/search-page/search-page')">
					<input type="text" placeholder="输入商品名" class="selects">
					<button type="submit" class="submitBtn">搜索</button>
				</view>
			</form>
			<!-- </view> -->
		</view>
		<view class="HotGoodsList">
			<view style="width:100%;display:flex;align-items: center;position: relative;">
				<view class="filterTab">
					<view class="filterItem" @click="checkoutTab(index,item)" :class="{active:index == currentIndex}" v-for="(item, index) in sortData" :key="item.classifyId">
						{{item.classifyName}}
					</view>
				</view>
				<view class="filterItem" style="position: absolute;right: 0rpx;">
					筛选<image style="width:21rpx;height:23rpx;margin-left:6rpx;" src="@/static/images/new-index/index-1/selecct.png"></image>
				</view>
			</view>
			<view class="GoodsListBox">
				<view class="ListItem" @click="go(`/another-tf/another-serve/goodsDetails/index?shopId=${item.shopId}&productId=${item.productId}&skuId=${item.skuId}`)" v-for="item in goodsList" :key="item.id">
					<view class="GoodsIcon">
						<image v-if="!item.image" src="@/static/images/new-index/index-1/goodsIcon.png"></image>
						<image v-else :src="item.image"></image>
					</view>
					<view class="GoodsDetils">
						<text class="title">{{ item.productName || '小牛马' }}</text>
						<view class="GoodsTag">
							<text style="background: linear-gradient(90deg, #BA883F 0%, #9F5506 100%);">品牌正品</text>
							<text style="background: #222229;">官方补贴</text>
						</view>
						<text class="SalesVolume">已售200+</text>
						<view class="PriceBox">
							<image class="backgroundImg" src="@/static/images/new-index/redback.png"></image>
							<view class="Price Originals">
								<text class="txt1" style="color: #888889;">原价</text>
								<view class="txt2">
									<!-- <text class="RMB">￥</text> -->
									<sup style="color:#888889;">￥</sup><text class="number Original" style="color:#888889;text-decoration: line-through;">{{ item.originalPrice }}</text>
								</view>
							</view>
							<view class="Price Currents">
								<text class="txt1" style="color: #FFFFFF;">直降价</text>
								<view class="txt2">
									<!-- <text class="RMB">￥</text> -->
									<text class="number Current" style="color: #FFFFFF;"><sup>￥</sup>{{ item.price }}</text>
									<text style="color: #FFFFFF;margin-left:25rpx;">起</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getClaasifyProducts, getFirstClassifyApi } from '@/api/anotherTFInterface'
import { unshift } from 'utils/picker.city';
export default {
	data() {
		return {
			currentIndex: 0,
			querList: {
				page: 1,
				pageSize: 20,
				type: 1,
				volume: 1,
			},
			sortData: ['全部','客厅','餐厅','卧室','睡眠','其他'],
			classifyId: '1124',
			goodsList: [],
			value: ''
		};
	},
	onLoad(options){
		getFirstClassifyApi({
			classifyId: '1124'
		}).then(res => {
			console.log(res);
			this.sortData = res.data
			this.sortData.unshift({classifyName: '全部',classifyId: '1124'})
		}).catch(err => console.log(err))
		this.getList()
	},
	methods: {
		getList() {
			getClaasifyProducts({
				classifyId: this.classifyId,
				productName: '',
				...this.querList
			}).then(res => {
				this.goodsList = res.data.list
				// console.log(res);
			}).catch(err => {
				// console.log(err);
			})
		},
		checkoutTab(index,item) {
			this.currentIndex = index
			this.classifyId = item.classifyId
			this.getList()
		},
		goBack() {
			uni.navigateBack();
		}
	},
	onReachBottom(value) {
		this.querList.pageSize+= 10
        this.getList()
    }
}
</script>

<style lang="scss">
.HotBoxContainer {
	width: 100vw;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	.backHeader {
			position: relative;
			width: 750rpx;
			height: 88rpx;
			background-color: #fff;
			display: flex;
			align-items: center;
			.backIcon {
				width: 60rpx;
				height: 60rpx;
			}
			.pageTitle {
				font-family: 思源黑体;
				font-size: 32rpx;
				font-weight: 500;
				line-height: 44rpx;
				letter-spacing: 0.32rpx;
				color: #222229;
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
			}
	}
	.header {
		z-index: 1;
		position: relative;
		width: 100%;
		height: 165rpx;
		background: #E02208;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		.backgroundImg {
			z-index: 1;
			position: absolute;
			top: -52rpx;
			width: 966.76rpx;
			height: 912rpx;
		}
		.selectInput {
			z-index: 2;
			width: 710rpx;
			height: 72rpx;
			border-radius: 50rpx;
			background: #FFFFFF;
			box-sizing: border-box;
			border: 2rpx solid #FFFFFF;
			display: flex;
			.inputView {
				width: 710rpx;
				height: 72rpx;
				display: flex;
				align-items: center;
				.selects {
					box-sizing: border-box;
					padding-left: 30rpx;
					width: 560rpx;
					height: 72rpx;
				}
				.submitBtn {
					white-space: nowrap;
					width: 100rpx;
					height: 58rpx;
					border-radius: 50rpx;
					background: #F8DBB0;
					font-family: 思源黑体;
					font-size: 24rpx;
					font-weight: 500;
					line-height: 58rpx;
					text-align: center;
					color: #9F5506;
				}
			}
		}
	}
	.HotGoodsList {
		box-sizing: border-box;
		padding: 40rpx 20rpx;
		z-index: 2;
		background-color: #fff;
		margin-top: -10rpx;
		width: 100vw;
		flex: 1;
		border-radius: 20rpx;
		.filterTab {
			position: relative;
			width: 568rpx;
			height: 50rpx;
			/* height: 68rpx; */
			display: flex;
			justify-content: space-between;
			font-size: 28rpx;
			font-weight: 500;
			overflow: auto hidden;
			.filterItem {
				display: block;
				white-space: nowrap;
				margin-right: 26rpx;
				line-height: 50rpx;
				position: relative;
			}
			.active {
				color: #E02208;
			}
			.active::before {
				position: absolute;
				width: 100%;
				left: 0;
				bottom: 0rpx;
				content: '';
				height: 4rpx;
				background-color: #E02208;
			}
		}
		.GoodsListBox {
			width: 100%;
			.ListItem {
				width: 100%;
				height: 302rpx;
				display: flex;
				align-items: center;
				.GoodsIcon {
					width: 254rpx;
					height: 254rpx;
					border-radius: 20rpx;
					image {
						border-radius: 20rpx;
						width: 254rpx;
						height: 254rpx;
					}
				}
				.GoodsDetils {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					margin-left: 40rpx;
					height: 254rpx;
					.title {
						font-family: Source Han Sans;
						display: block;
						white-space: nowrap;
						width: 413rpx;
						height: 40rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						font-size: 32rpx;
						font-weight: 600;
						line-height: 40rpx;
						color: #222229;
					}
					.GoodsTag {
						text {
							box-sizing: border-box;
							padding: 4rpx 10rpx;
							font-size: 24rpx;
							font-weight: normal;
							line-height: 32rpx;
							color: #FFFFFF;
							width: 118rpx;
							height: 40rpx;
							border-radius: 4rpx;
							margin-right: 20rpx;
						}
					}
					.SalesVolume {
						font-family: Source Han Sans;
						font-size: 24rpx;
						line-height: 32rpx;
						color: #888889;
					}
					.PriceBox {
						width: 413rpx;
						height: 107rpx;
						border-radius: 15rpx;
						background: #F5F4F6;
						display: flex;
						position: relative;
						.backgroundImg {
							position: absolute;
							right: 0;
							top: 0;
							width: 260rpx;
							height: 107rpx;
							z-index: 1;
						}
						.Price {
							box-sizing: border-box;
							padding: 9rpx 12rpx 17rpx 12rpx;
							z-index: 2;
							flex: 1;
							.txt1 {
								font-size: 24rpx;
								font-weight: 500;
								line-height: 32rpx;
							}
							.txt2 {
								font-weight: 600;
								font-style: oblique 50deg;
							}
						}
						/* overflow: hidden; */
					}
				}
			}
		}
	}
}
</style>
