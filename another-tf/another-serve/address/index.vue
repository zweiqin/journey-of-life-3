<!-- 地址列表 -->
<template>
	<view class="address-container">
		<JHeader width="50" height="50" title="地址管理"></JHeader>
		<view v-if="addressList && addressList.length" class="pad-bot-20 addAddress">
			<view v-for="(item, index) in addressList" :key="index" class="addAddress-content flex-row-plus">
				<view class="address-detail" @click="handleSelectAddress(item)">
					<view class="userName">
						<text>{{ item.receiveName }}</text>
						<text class="font-color-999 mar-left-30">
							{{ item.receivePhone.replace(/(\d{3})\d+(\d{4})$/, '$1****$2') }}
						</text>
					</view>
					<view class="defaultAD-box">
						<text v-if="item.ifDefault" class="def">默认</text>
						<text v-else-if="item.label != ''" class="lable font-color-999">{{ item.label }}</text>
						<text class="user-address font-color-999">{{ item.receiveAdress }}{{ item.address }}</text>
					</view>
				</view>
				<view style="text-align: center;">
					<view>
						<tui-icon
							name="edit" :size="50" unit="rpx" color="#cccccc"
							@click="go(`/another-tf/another-serve/addAddress/index?receiveId=${item.receiveId}`)"
						></tui-icon>
					</view>
					<view>
						<tui-button
							v-if="isSelect"
							type="black" width="118rpx" height="54rpx"
							margin="8rpx 0 0" @click="handleSelectAddress(item)"
						>
							选择
						</tui-button>
					</view>
				</view>
			</view>
		</view>
		<view style="padding-bottom: 45rpx;">
			<LoadingMore
				:status="!isEmpty && !addressList.length
					? 'loading' : !isEmpty && addressList.length && (addressList.length >= addresTotal) ? 'no-more' : ''"
			>
			</LoadingMore>
			<tui-no-data v-if="isEmpty" :fixed="false" style="padding-top: 60rpx;">你还没有添加地址哦～</tui-no-data>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="wxAddressNBox">
			<view class="flex-items btnBox flex-sp-between">
				<view class="btn flex-items flex-center" @click="wxAddFn">
					<tui-icon :size="50" color="#00c800" name="wechat" unit="rpx" margin="0 20rpx 0 0"></tui-icon>
					<text>微信导入</text>
				</view>
				<view class="addAddressBtn btn" @click="go('/another-tf/another-serve/addAddress/index')">添加新地址</view>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifdef H5 || APP-PLUS || MP-ALIPAY -->
		<view class="addAddress-box">
			<view class="addAddress" @click="go('/another-tf/another-serve/addAddress/index')">添加新地址</view>
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
			isSelect: 0,
			isEmpty: false,
			addressList: [],
			addresTotal: 0,
			queryInfo: {
				page: 1,
				pageSize: 20
			}
		}
	},
	onLoad(options) {
		this.isSelect = Number(options.isSelect) || 0
	},
	onShow() {
		this.getAddressDataList()
	},
	methods: {
		getAddressDataList(isLoadmore) {
			uni.showLoading()
			getAllReceiveAddressApi(this.queryInfo).then((res) => {
				this.addresTotal = res.data.total
				if (isLoadmore) {
					this.addressList.push(...res.data.list)
				} else {
					this.addressList = res.data.list
				}
				this.isEmpty = this.addressList.length === 0
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},
		handleSelectAddress(item) {
			if (this.isSelect) {
				uni.setStorageSync(T_RECEIVE_ITEM, item)
				uni.navigateBack()
			}
		},
		// 微信导入
		wxAddFn() {
			uni.chooseAddress({
				success(res) {
					setTimeout(() => {
						uni.navigateTo({
							url: '/another-tf/another-serve/addAddress/index?wxAddressData=' + JSON.stringify({
								receiveName: res.userName,
								phone: res.telNumber,
								receiveAdress: `${res.provinceName}-${res.cityName}-${res.countyName}-${res.streetName}`,
								defaultRegion: [res.provinceName, res.cityName, res.countyName, res.streetName],
								address: res.detailInfo,
								province: res.provinceName,
								city: res.cityName
							})
						})
					}, 500)
				},
				fail: (e) => { }
			})
		}
	},
	onReachBottom() {
		if (this.addressList.length < this.addresTotal) {
			++this.queryInfo.page
			this.getAddressDataList(true)
		}
	}
}
</script>

<style lang="less" scoped>
.address-container {
	padding: 0 24rpx;
	box-sizing: border-box;

	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}

	.addAddress {
		border-top: 2rpx solid #F3F4F5;
		padding-top: 30rpx;
	}

	.addAddress-box {
		position: fixed;
		bottom: 50rpx;
		left: 30rpx;

		.addAddress {
			width: 690rpx;
			height: 100rpx;
			color: #FFEBC4;
			text-align: center;
			background: #333333;
		}
	}

	.wxAddressNBox {
		width: 100%;
		position: fixed;
		bottom: 50rpx;
		left: 0;
		box-sizing: border-box;

		.btnBox {
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
		}
	}

	.addAddress-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 20rpx;
		margin-bottom: 20rpx;
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

		.defaultAD-box {
			width: 455rpx;
		}
	}
}
</style>
