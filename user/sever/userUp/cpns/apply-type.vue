<template>
	<view class="apply-type-container vip-container">
		<view class="pane-title"> </view>

		<view class="pane-container">
			<view class="item" @click="changeVipType('partner')" :class="{ active: value === 'partner' }">
				<!-- <image
          src="../../../../static/images/center/userUp/vip_2.png"
          mode=""
        /> -->
				<view class="img" v-if="value === 'sup-partner'">
					<image src="../../../../static/images/user/logo1.png" mode="" class="logo" />
				</view>
				<view class="lg" v-if="value === 'partner'">
					<image src="../../../../static/images/user/logo3.png" mode="" class="logo"  />
				</view>
				<view class="vip-type-name">合伙人</view>
				<view class="vip-cost">￥<text>2000</text></view>
				
				<!-- <tui-icon class="icon" :size="28" color="#fff" name="check"></tui-icon> -->
			</view>

			<view class="item" @click="changeVipType('sup-partner')" :class="{ active: value === 'sup-partner' }">
				<!-- <image src="../../../../static/images/center/userUp/vip_1.png" mode="" /> -->
				<view class="img" v-if="value === 'partner'">
					<image src="../../../../static/images/user/logo2.png" mode="" class="logo" />
				</view>
				<view class="lg" v-if="value === 'sup-partner'">
						<image src="../../../../static/images/user/logo4.png" mode="" class="logo"  />
					</view>
				<view class="vip-type-name">超级合伙人</view>
				<view class="vip-cost">￥<text>5000</text></view>
				
				<!-- <tui-icon class="icon" :size="28" color="#fff" name="check"></tui-icon> -->
			</view>
		</view>
	</view>
</template>

<script>
import { USER_INFO } from '../../../../constant'
export default {
	props: {
		value: {
			type: String,
			required: true,
		},
	},

	methods: {
		changeVipType(tag) {
			const userInfo = uni.getStorageSync(USER_INFO)

			if (tag === 'partner') {
				if (userInfo.userLevel == 6) {
					uni.showToast({
						title: '您已经是合伙人了，无需申请',
						icon: 'none',
					})
					return
				}

				if (userInfo.userLevel == 7) {
					uni.showToast({
						title: '您已经是超级合伙人了，无需申请',
						icon: 'none',
					})
					return
				}

				if (userInfo.userLevel == 1) {
					uni.showToast({
						title: '您已经是门店了，无需申请',
						icon: 'none',
					})
					return
				}

				this.$emit('input', tag)
			} else {
				if (userInfo.userLevel == 7) {
					uni.showToast({
						title: '您已经是超级合伙人了，无需申请',
						icon: 'none',
					})
					return
				}

				if (userInfo.userLevel == 1) {
					uni.showToast({
						title: '您已经是门店了，无需申请',
						icon: 'none',
					})
					return
				}

				this.$emit('input', tag)
			}
		},
	},
}
</script>

<style lang="less" scoped>
@color: #424890;

.apply-type-container {
	.pane-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 20upx;
		margin-bottom: 20upx;

		.item {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			width: 280upx;
			height: 292upx;
			box-sizing: border-box;
			border-radius: 24upx;
			transition: box-shadow 350ms;
			// box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
			border: 1.5px solid #F6F6F5;
			color: #B3B2AD;

			.icon {
				position: absolute;
				right: 0;
				bottom: 0;
				z-index: 10;
			}

			&.active {
				border: 1.5px solid #FFC117;
				// box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
				background: #FFF6DC;
				color: #141000;

				// &::before {
				// 	position: absolute;
				// 	// right: -1upx;
				// 	top: 30upx;
				// 	content: '';
				// 	width: 104upx;
				// 	height: 104upx;
				// 	background: linear-gradient(134deg, #FF9E0E 1%, #FFC117 99%);
				// 	border-radius: 16upx;
				// }
			}

			.vip-type-name {
				// color: @color;
				// color: #B3B2AD;
				font-weight: 500;
				margin-top: 22upx;
				margin-bottom: 6upx;
			}

			image {
				width: 80upx;
				height: 80upx;
			}

			.vip-cost {
				font-size: 28upx;
				font-weight: bold;

				// color: #B3B2AD;
				text {
					// color: @color;
					// color: #B3B2AD;
					font-size: 42upx;
					font-weight: bold;
				}
			}

			.img {
				width: 104upx;
				height: 104upx;
				border-radius: 16upx;
				background: #D5D4D1;
				display: flex;
				align-items: center;
				justify-content: center;

				.logo {
					width: 64upx;
					height: 64upx;
				}
			}

			.lg {
				width: 104upx;
				height: 104upx;
				border-radius: 16upx;
				background: linear-gradient(135deg, #FF9E0E 0%, #FFC117 100%);
				display: flex;
				align-items: center;
				justify-content: center;

				.logo {
					width: 64upx;
					height: 64upx;
				}
			}
		}
	}
}
</style>
