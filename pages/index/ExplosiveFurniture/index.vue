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
				<view class="inputView">
					<input type="text" placeholder="输入商品名" class="selects">
					<button type="submit" class="submitBtn">搜索</button>
				</view>
			</form>
			<!-- </view> -->
		</view>
		<view class="HotGoodsList">
			<view style="width:100%;display:flex;align-items: center;position: relative;">
				<view class="filterTab">
					<view class="filterItem" @click="currentIndex = index" :class="{active:index == currentIndex}" v-for="(item, index) in sortData" :key="item">
						{{item}}
					</view>
				</view>
				<view class="filterItem" style="position: absolute;right: 0rpx;">
					筛选<image style="width:21rpx;height:23rpx;margin-left:6rpx;" src="@/static/images/new-index/index-1/selecct.png"></image>
				</view>
			</view>
			<view class="GoodsListBox">
				<view class="ListItem" v-for="item in 10" :key="item">
					<view class="GoodsIcon">
						<image src="@/static/images/new-index/index-1/goodsIcon.png"></image>
					</view>
					<view class="GoodsDetils">
						<text class="title">网红沙发网红沙发网红沙发无敌无敌无敌</text>
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
									<sup style="color:#888889;">￥</sup><text class="number Original" style="color:#888889;text-decoration: line-through;">8999</text>
								</view>
							</view>
							<view class="Price Currents">
								<text class="txt1" style="color: #FFFFFF;">直降价</text>
								<view class="txt2">
									<!-- <text class="RMB">￥</text> -->
									<text class="number Current" style="color: #FFFFFF;"><sup>￥</sup>6999</text>
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
import view from 'user/view.vue';
	export default {
  components: { view },
		data() {
			return {
				currentIndex: 0,
				sortData: ['全部','客厅','餐厅','卧室','睡眠','其他'],
				value: ''
			};
		},
		methods: {
			goBack() {
				uni.navigateBack();
			}
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
			display: flex;
			justify-content: space-between;
			font-size: 28rpx;
			font-weight: 500;
			line-height: 32rpx;
			.filterItem {
				position: relative;
			}
			.active {
				color: #E02208;
			}
			.active::before {
				position: absolute;
				width: 56rpx;
				left: 0;
				bottom: -10rpx;
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
