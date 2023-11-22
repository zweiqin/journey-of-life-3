<!-- 地址列表 -->
<template>
	<view class="address-container">
		<JHeader width="50" height="50" title="地址管理" style="padding: 24upx 0 0;"></JHeader>
		<view v-if="addresListlist.length" class="pad-bot-140 addAddress">
			<view v-for="(item, index) in addresListlist" :key="index" class="addAddress-content flex-row-plus">
				<!--				<view class="address-hesd">{{item.username1}}</view> -->
				<view class="address-detail" @click="itemTap(item)">
					<view class="userName">
						<text>{{ item.receiveName }}</text>
						<text class="font-color-999 mar-left-30">{{ item.receivePhone }}</text>
					</view>
					<view class="defaultAD-box">
						<text v-if="item.ifDefault" class="def">默认</text>
						<text v-else-if="item.label != ''" class="lable font-color-999">{{ item.label }}</text>
						<text class="user-address font-color-999">{{ item.receiveAdress }}{{ item.address }}</text>
					</view>
				</view>
				<tui-icon name="edit" :size="50" unit="upx" color="#cccccc" @click="editAdress(index, item)"></tui-icon>
			</view>
		</view>
		<view v-else class="emptyAddress-box">
			<tui-icon name="position" :size="150" unit="upx" color="#ffffff"></tui-icon>
			<text>你还没有添加地址哦～</text>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="wxAddressNBox">
			<view class="flex-items btnBox flex-sp-between">
				<view class="wxAddress btn flex-items flex-center" @click="wxAddFn">
					<image src="../../../static/images/new-business/shop/weixin2x.png"></image>
					<text>微信导入</text>
				</view>
				<view class="addAddressBtn btn" @click="addAddressClick">添加新地址</view>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifdef H5 || APP-PLUS || MP-ALIPAY -->
		<view class="addAddress-box">
			<view class="addAddress" @click="addAddressClick">添加新地址</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
import { T_RECEIVE_ITEM } from '../../../constant'
import { getAllReceiveAddressApi } from '../../../api/anotherTFInterface'

export default {
	name: 'Address',
	data() {
		return {
			addresList: [],
			headWord: '',
			type: 0,
			addresListlist: [],
			page: 1, // 当前页
			pageSize: 20, // 每页记录数
			loadingType: 0,
			addData: {}
		}
	},
	onLoad(options) {
		this.type = options.type
	},
	onShow() {
		this.addresListlist = []
		this.page = 1
		this.getAddressData()
	},
	onReachBottom() {
		if (this.loadingType == 1) {
			uni.stopPullDownRefresh()
		} else {
			this.page = this.page + 1
			this.getAddressData()
		}
	},
	methods: {
		addAddressClick() {
			if (this.type == 1 || this.type == 2) {
				uni.navigateTo({
					url: '/another-tf/another-serve/addAddress/index?type=1&ordertype=1'
				})
			} else {
				uni.navigateTo({
					url: '/another-tf/another-serve/addAddress/index?type=1'
				})
			}
		},
		getAddressData() {
			uni.showLoading()
			getAllReceiveAddressApi({
				page: this.page,
				pageSize: this.pageSize
			}).then((res) => {
				this.addresList = res.data
				if (res.data.list.length == 0) {
					this.loadingType = 1
				}
				for (let i = 0; i < res.data.list.length; i++) {
					this.addresList.list[i].username1 = this.addresList.list[i].receiveName.slice(0, 1)
				}
				this.addresListlist = this.addresListlist.concat(res.data.list)
				this.addresListlist.forEach((item) => {
					item.receivePhone = item.receivePhone.replace(/(\d{3})\d+(\d{4})$/, '$1****$2')
				})
				uni.hideLoading()
			})
				.catch((err) => {
					uni.hideLoading()
				})
		},
		editAdress(id, item) {
			uni.navigateTo({
				url: '/another-tf/another-serve/addAddress/index?type=2&receiveId=' + item.receiveId
			})
		},
		itemTap(item) {
			if (this.type == 1 || this.type == 2) {
				uni.setStorageSync(T_RECEIVE_ITEM, item)
				uni.navigateBack()
			}
		},
		// 微信导入
		wxAddFn() {
			const self = this
			uni.chooseAddress({
				success(res) {
					self.addData.username = res.userName
					self.addData.phone = res.telNumber
					self.addData.ssqText = `${res.provinceName}-${res.cityName}-${res.countyName}`
					self.addData.defaultRegion = self.addData.ssqText.split('-')
					self.addData.address = res.detailInfo
					self.addData.province = res.provinceName
					self.addData.city = res.cityName
					// uni.showLoading({
					// 	mask: true,
					// 	title: '导入中...',
					// })
					setTimeout(() => {
						uni.hideLoading()
						uni.navigateTo({
							url: '/another-tf/another-serve/addAddress/index?type=3&wxAddressData=' + JSON.stringify(self.addData)
						})
					}, 500)
				},
				fail: (res) => {
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.address-container {
	padding: 0 24rpx;

	.addAddress {
		border-top: 2rpx solid #F3F4F5;
		padding-top: 30rpx;
	}

	.emptyAddress-box {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		margin-top: 50%;

		text {
			margin-top: 40upx;
			color: #999999;
		}
	}

	.addAddress-box {
		position: fixed;
		bottom: 50upx;
		left: 30upx;

		.addAddress {
			width: 690upx;
			height: 100upx;
			color: #FFEBC4;
			text-align: center;
			background: #333333;
		}
	}

	.wxAddressNBox {
		position: fixed;
		bottom: 50upx;
		width: 100%;
		left: 0;

		.btnBox {
			width: 100%;
			background: #FFFFFF;
			height: 120rpx;
			padding: 0 50rpx;

			.btn {
				width: 300rpx;
				background: #FFFFFF;
				height: 90rpx;
				line-height: 90rpx;
				border: 2rpx solid #E4E5E6;
				text-align: center;
			}

			.addAddressBtn {
				color: #FFEBC4;
				background: #333333;
				border: 2rpx solid #333333;
			}

			.wxAddress {
				image {
					width: 45rpx;
					height: 37rpx;
					margin-right: 20rpx;
				}
			}
		}
	}

	.addAddress-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 40rpx;
		margin-bottom: 40rpx;
		border-bottom: 2rpx solid #F3F4F5;

		.address-detail {
			.userName {
				margin-bottom: 15rpx;
			}
		}

		.lable {
			padding: 3rpx 10rpx;
			background: rgba(153, 153, 153, 0.2);
			border-radius: 4rpx;
			font-size: 24rpx;
			font-weight: 500;
			color: rgba(102, 102, 102, 1);
		}

		.def {
			padding: 3rpx 10rpx;
			font-size: 20rpx;
			font-weight: 400;
			color: #C5AA7B !important;
			background: rgba(197, 170, 123, 0.2) !important;
		}

		.user-address {
			font-size: 28rpx;
			margin-left: 10rpx;

		}

		.address-hesd {
			height: 70upx;
			width: 70upx;
			background-color: #BBBBBB;
			color: #FFFFFF;
			border-radius: 50%;
			line-height: 70upx;
			text-align: center;
		}

		.defaultAD-box {
			width: 455upx;

			.default-textBox {
				padding-right: 20upx;
				width: 80upx;
			}

			.default-content {
				width: 435upx;
			}

			.default-text {
				color: #C5AA7B;
				background-color: #FFE4CC;
				height: 36upx;
				width: 60upx;
				font-size: 26upx;
				border-radius: 4upx;
				align-items: center;
				line-height: 36upx;
			}
		}
	}
}
</style>
