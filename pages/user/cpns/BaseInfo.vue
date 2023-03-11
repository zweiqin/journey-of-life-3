<template>
	<view class="base-info-container">
		<view class="user-info">
			<Avatar margin="0 24upx 0 0" :src="
				$store.getters.userId
					? $store.getters.userInfo.avatarUrl
					: require('../../../static/images/new-user/default-user-avatar.png')
			"></Avatar>

			<view class="right-wrapper">
				<view v-if="!$store.getters.userId">
					<view class="logout-title">您好!</view>
					<view class="logout-tip">您目前暂未登录，请<text @click="go('/pages/login/login')">前往登录</text></view>
				</view>

				<view class="user-info-detail" v-else>
					<view class="user-nack-name">{{
						$store.getters.userInfo.nickName
					}}</view>
					<view class="tags">
						<view class="tag">
							<view class="vip-level">{{
								$store.getters.userInfo.userLevelDesc || '会员'
							}}</view>
						</view>

						<view class="tag">
							{{
								$store.getters.userInfo.invitationCode ||
								'No.' + $store.getters.userInfo.userId
							}}
						</view>
					</view>
				</view>

				<view class="op-container">
					<view class="wrapper" @click="$emit('handleNavigate', { url: '/user/chat/chat' })">
						<image src="../../../static/images/new-user/user-chat.png" mode="" />
					</view>
					<view class="wrapper" @click="$emit('handleNavigate', { url: '/user/info/detail' })">
						<image src="../../../static/images/new-user/user-setting.png" mode="" />
					</view>
				</view>
			</view>
		</view>

		<view class="account-container">
			<view class="account-item">
				<!-- <view class="account-item" @click="$emit('handleNavigate', { url: '/user/sever/surplus/surplus' })"> -->
				<view class="account-number"> 0 </view>
				<view class="account-title">余额</view>
			</view>

			<view class="account-item" @click="$emit('handleNavigate', { url: '/user/sever/coupon/coupon' })">
				<view class="account-number"> 0 </view>
				<view class="account-title">优惠劵</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
view,
text {
	line-height: 1.5 !important;
}

.base-info-container {
	position: relative;
	height: 400upx;
	background: url('../../../static/images/new-user/info-bg.png') no-repeat;
	background-size: cover;
	padding: 80upx 32upx 8upx;
	box-sizing: border-box;

	.user-info {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.right-wrapper {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.logout-title {
				font-size: 28upx;
				font-weight: bold;
				line-height: 42upx;
			}

			.logout-tip {
				font-size: 24upx;
				line-height: 36upx;
				margin-top: 6upx;

				text {
					color: #ffc117;
				}
			}

			.op-container {
				display: flex;
				align-items: center;
				position: absolute;
				top: 32upx;
				right: 32upx;

				.wrapper {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 80upx;
					height: 80upx;
					border-radius: 50%;
					background: rgba(255, 255, 255, 0.4);
					box-sizing: border-box;
					border: 2upx solid #f1f1f0;

					&:nth-child(1) {
						margin-right: 24upx;
					}

					image {
						width: 48upx;
						height: 48upx;
					}
				}
			}
		}
	}

	.account-container {
		width: 100%;
		height: 144upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
		margin-top: 48upx;
		border-radius: 24upx;

		.account-item {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;

			.account-number {
				font-size: 42upx;
				line-height: 64upx;
				font-weight: bold;
			}

			.account-title {
				color: #8f8d85;
				font-size: 24upx;
				line-height: 36upx;
			}
		}
	}

	.user-info-detail {
		.user-nack-name {
			font-size: 32upx;
			font-weight: bold;
			color: #141000;
		}

		.tags {
			display: flex;
			align-items: center;
			padding-left: 24upx;
			box-sizing: border-box;
			margin-top: 12upx;
			flex-wrap: wrap;

			.tag {
				display: flex;
				align-items: center;
				font-size: 24upx;
				color: #c4542f;
				height: 36upx;
				background: #f7d1c2;

				&:nth-child(1) {
					white-space: nowrap;
					position: relative;
					padding-left: 22upx;
					padding-right: 20upx;
					box-sizing: border-box;
					border: 4upx solid #ff7a4e;
					border-radius: 0px 12upx 12upx 0px;
					margin-right: 16upx;

					&::after {
						content: '';
						width: 40upx;
						height: 40upx;
						display: block;
						position: absolute;
						background: url('../../../static/images/new-user/star.png') no-repeat;
						background-size: cover;
						left: -24upx;
					}
				}

				&:nth-child(2) {
					padding: 0 16upx;
					color: #3a3629;
					border: 4upx solid #3a3629;
					font-weight: 500;
					border-radius: 12upx;
					background-color: #fff;
				}
			}
		}
	}
}

/deep/ .avatar-container {
	image {
		border: 2px solid #F1F1F0;
		background-color: #fff;
	}
}
</style>
