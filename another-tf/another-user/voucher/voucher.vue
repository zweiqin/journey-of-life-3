<template>
	<view class="voucherContainer">
		<JHeader title="我的代金券" width="50" height="50" style="padding: 24upx 0 10upx;z-index: 2;">
		</JHeader>
		<image class="topBackgrpound" src="../../../static/images/user/vcbgimg.png"></image>
		<!-- header区 -->
		<view class="userInfo">
			<image class="avatar" :src="common.seamingImgUrl($store.getters.userInfo.headImage)"></image>
			<text class="userPhone">{{ hiddenPhone(userInfo.phone) }}</text>
		</view>
		<!-- <view class="tabNavs">
			<view
			v-for="(item, index) in tabNavsData" :key="item" class="tabItem" :class="{ isActice: index == currIndex }"
			@click="currIndex = index"
			>
			{{ item }}
			</view>
			</view> -->
		<view class="main">
			<TopUp
				v-if="currIndex != 2" :user-acount="userAcount" :user-info="userInfo" :is-gift="currIndex == 1"
				@getVouvher="getUserVoucher"
			></TopUp>
			<NewRecords v-if="currIndex == 2"></NewRecords>
		</view>
		<!-- <view class="footer">

			</view> -->
	</view>
</template>

<script>
import topUp from './components/topUp.vue'
import { getByUserVoucherShopHoldApi } from '../../../api/anotherTFInterface'
import newRecords from './components/newRecords.vue'
export default {
	name: 'Voucher',
	components: {
		TopUp: topUp,
		NewRecords: newRecords
	},
	data() {
		return {
			userInfo: null,
			tabNavsData: ['充值', '转赠', '流水'],
			userAcount: {
				number: ''
			},
			currIndex: 2 // 0
		}
	},
	onLoad() {
		this.userInfo = this.$store.getters.userInfo
		this.getUserVoucher()
	},
	methods: {
		hiddenPhone(Phone) {
			return Phone.substring(0, 3) + '****' + Phone.substring(7, 11)
		},
		getUserVoucher() {
			getByUserVoucherShopHoldApi().then((res) => {
				this.userAcount = res.data
				// console.log(res);
			})
				.catch((err) => {
					console.log(err)
				})
		}
	}
}
</script>

<style lang="scss" scoped>
.voucherContainer {
	position: relative;
	width: 100vw;
	min-height: 100vh;
	overflow: hidden;
	background: linear-gradient(180deg, #FF380C 0%, rgba(255, 56, 12, 0.88) 20%, #F4F3F8 27%);

	.topBackgrpound {
		width: 100vw;
		height: 418rpx;
		position: absolute;
		top: 0rpx;
		left: 0;
		z-index: 0;
	}

	.tabNavs {
		margin-top: 48rpx;
		position: relative;
		z-index: 2;
		width: 100vw;
		box-sizing: border-box;
		padding: 0 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;

		.tabItem {
			position: relative;
			font-size: 36rpx;
			font-weight: 500;
			font-feature-settings: "kern" on;
			color: #FFFFFF;
		}

		.isActice::before {
			content: '';
			position: absolute;
			width: 100%;
			height: 6rpx;
			left: 0;
			bottom: -8rpx;
			background-color: #F4F3F8;
			border-radius: 10rpx;
		}
	}

	.userInfo {
		box-sizing: border-box;
		padding: 0 30rpx;
		margin-top: 60rpx;
		width: 100%;
		height: 70rpx;
		display: flex;
		align-items: center;

		.avatar {
			width: 68rpx;
			height: 68rpx;
			border-radius: 50%;
		}

		.userPhone {
			margin-left: 20rpx;
			font-size: 42rpx;
			font-weight: 500;
			font-feature-settings: "kern" on;
			color: #FFFFFF;
		}
	}

	.main {
		display: flex;
		flex-direction: column;
		flex: 1;
		position: relative;
		z-index: 2;
		margin-top: 25rpx;
	}
}
</style>
