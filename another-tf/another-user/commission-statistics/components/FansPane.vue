<template>
	<view v-if="fansInfo" class="item" @click="$emit('view', fansInfo)">
		<view class="avatar-wrapper">
			<image class="avatar" :src="fansInfo.headImage"></image>
			<view class="mask">{{ fansInfo.role | filterRole }}</view>
		</view>
		<view class="info">
			<view class="name">
				{{ fansInfo.userName }}
				<!-- <tui-icon margin="0 0 0 10rpx" :color="fansInfo.gender === 0 ? '#10aeff' : '#f37e7d'" name="friendadd-fill" :size="18"></tui-icon> -->
				<!-- <view class="add-time">绑定时间:{{ fansInfo.addTime }}</view> -->

				<view class="account-wrapper" style="font-size: 24rpx; color: #3d3d3d; ">
					产生佣金: <text style="color: #f40;">
						￥{{ fansInfo.amount }}
					</text>
				</view>
			</view>

			<view style="padding: 16rpx 0;font-size: 26rpx;text-align: right;">{{ fansInfo.updateTime || '--' }}</view>

			<view class="phone">
				<view class="phone-number">
					{{ fansInfo.phone ? fansInfo.phone.slice(0, 3) + '****' + fansInfo.phone.slice(7) : '-' }}
				</view>
				<view @click.stop="() => { }">
					<BeeMakePhone :phone="fansInfo.phone">
						<tui-icon name="voipphone" color="#ccc" :size="16" margin="0 10rpx 0 0"></tui-icon>
						<text style="color: #cccccc;">拨打</text>
					</BeeMakePhone>
				</view>
			</view>

			<view class="fans-wrapper">
				<view class="fans-item">
					<view class="fans-title">粉丝数：</view>
					<view class="numbers">{{ fansInfo.fans }}</view>
				</view>
				<view class="fans-item">
					<view class="fans-title">今日粉丝数：</view>
					<view class="numbers">{{ fansInfo.todayFans }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {

	filters: {
		filterRole(role) {
			return { 5: '区代理', 4: '加盟商', 3: '合伙人', 2: '团长', 1: '会员', 0: '未知' }[role]
		}
	},
	props: {
		fansInfo: {
			type: Object,
			required: true
		}
	},

	methods: {
	}
}
</script>

<style lang="less" scoped>
.item {
	margin-top: 30rpx;
	padding: 20rpx;
	box-sizing: border-box;
	margin: 0 20rpx 8rpx;
	background-color: #fff;
	border-radius: 10rpx;
	display: flex;
	align-items: flex-start;

	.avatar-wrapper {
		position: relative;
		border-radius: 10rpx;
		overflow: hidden;
		border: 1rpx solid #f3f3f3;

		.mask {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100%;
			height: 40rpx;
			background-color: rgba(0, 0, 0, 0.5);
			font-size: 24rpx;
			color: #fff;
			text-align: center;
			line-height: 40rpx;
		}
	}

	.avatar {
		flex-shrink: 0;
		width: 100rpx;
		height: 100rpx;
		border-radius: 10rpx;
		display: block;
	}

	.info {
		flex: 1;
		margin-left: 20rpx;

		.name {
			display: flex;
			align-items: center;
			justify-content: space-between;

			font-size: 28rpx;
			font-weight: 500;

			.add-time {
				font-size: 24rpx;
			}
		}

		.phone {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 24rpx;

			.uni-btn {
				display: flex;
				align-items: center;
				color: #ccc;
				font-size: 24rpx;

				.icon {
					margin-right: 10rpx !important;
				}
			}
		}
	}
}

.fans-wrapper {
	font-size: 24rpx;
	color: #3d3d3d;
	display: flex;
	align-items: center;
	margin-top: 20rpx;

	.fans-item {
		flex: 1;
		color: #000;
		display: flex;

		&:nth-child(2) {
			text-align: right;
			justify-content: flex-end;
		}

		.fans-title {
			color: #ccc;
		}
	}
}
</style>
