<template>
	<view class="base-info-container">
		<view class="user-info">
			<Avatar
				margin="0 24upx 0 0"
				:src="$store.getters.userInfo.token ? common.seamingImgUrl($store.getters.userInfo.headImage) : require('../../../static/images/new-user/default-user-avatar.png')"
				@click="$store.getters.userInfo.token && go('/another-tf/another-serve/personalDetails/index')"
			></Avatar>

			<view class="right-wrapper">
				<view v-if="!$store.getters.userInfo.token">
					<view class="logout-title">您好!</view>
					<view class="logout-tip">您目前暂未登录，请<text @click="go('/pages/login/login')">前往登录</text></view>
				</view>

				<view v-else class="user-info-detail" @click="go('/another-tf/another-serve/personalDetails/index')">
					<view style="display: flex;align-items: center;">
						<!-- <view style="padding: 6upx 8upx;margin-right: 12upx;font-size: 34upx;background-color: #e7e3e0;">
							{{ $store.getters.userInfo.memberLevelName }}
							</view> -->
						<view class="user-nack-name">
							{{ $store.getters.userInfo.name || $store.getters.userInfo.wechatName || '--' }}
						</view>
					</view>
					<view class="tags">
						<!-- <view>成长值</view> -->
						<view class="tag">
							<tui-icon name="star-fill" :size="22" unit="upx" color="#eaa349" margin="0 4upx 0 0"></tui-icon>
							No.{{ $store.getters.userInfo.buyerUserId }}
							<!-- {{ $store.getters.userInfo.growth || 0 }} / {{ $store.getters.userInfo.nextLevelGrowth || 0 }} -->
						</view>
						<view>
							<image
								v-if="[1, 2].includes($store.getters.levelType)"
								style="width: 68rpx;height: 68rpx;margin: 0 5rpx;" src="../../../static/images/user/displayBadges/huiyuan.png"
								@click="go()"
							></image>
							<image
								v-if="[3, 4].includes($store.getters.levelType)"
								style="width: 68rpx;height: 68rpx;margin: 0 5rpx;" src="../../../static/images/user/displayBadges/tuanzhang.png"
								@click="go()"
							></image>
							<image
								v-if="[ 5 ].includes($store.getters.levelType)"
								style="width: 68rpx;height: 68rpx;margin: 0 5rpx;" src="../../../static/images/user/displayBadges/hehuoren.png"
								@click="go()"
							></image>
						</view>
					</view>
				</view>

				<view class="op-container">
					<view class="wrapper" @click="go('/user/sever/chat/chat')">
						<image src="../../../static/images/new-user/user-chat.png" mode="" />
					</view>
					<view class="wrapper" @click="go('/another-tf/another-serve/personalDetails/index')">
						<image src="../../../static/images/new-user/user-setting.png" mode="" />
					</view>
				</view>
			</view>

			<!-- 团长或合伙人才有 -->
			<!-- <view
				v-if="$store.getters.userInfo.token"
				style="text-align: center;" @click="$refs.codeCreateRef.getCode('teamMembersInvitation')"
				>
				<tui-icon name="qrcode" :size="24" color="#222229"></tui-icon>
				<view style="font-size: 24upx;color: #8f8d85;">
				<text>入驻码</text>
				</view>
				</view> -->
		</view>

		<view class="account-container">
			<view class="account-item" @click="go('/another-tf/another-user/platform-recharge/index')">
				<view class="account-number"> {{ $store.getters.pricePlatformInfo.totalPrice || 0 }} </view>
				<view class="account-title">钱包</view>
			</view>

			<view class="account-item" @click="go('/user/sever/goldButler/gold-butler')">
				<view class="account-number">
					{{ isBuy ? 1 : 0 }}
				</view>
				<view class="account-title">家庭小卫士</view>
			</view>

			<view class="account-item" @click="go('/another-tf/another-serve/integral/index')">
				<view class="account-number">
					{{ $store.getters.userInfo.credit || 0 }}
				</view>
				<view class="account-title">积分</view>
			</view>

			<view class="account-item" @click="go('/user/newVoucher/voucher')">
				<view class="account-number">
					{{ $store.getters.pricePlatformInfo.voucherPrice || 0 }}
				</view>
				<view class="account-title">代金劵</view>
			</view>
		</view>
		<!-- 家庭小卫士 -->
		<view class="goldman" @click="handleToOpen">
			<image src="../../../static/images/center/logo.png" mode="" />
			<view class="text-list">
				<view class="first">家庭小卫士</view>
				<view class="second">享受四大权益</view>
			</view>
			<view class="open">{{ isBuy ? '立即进入' : '立即开通' }}</view>
		</view>

		<tui-modal
			:show="$data._isShowTuiModel" title="提示" content="您还未登录，是否先去登录？"
			@click="_handleClickTuiModel($event, 'login', '/pages/user/user')"
		></tui-modal>

		<tui-modal :show="isShow" title="提示" content="您已开通家庭小卫士" @click="handleToVip"></tui-modal>

		<CodeCreatePopup ref="codeCreateRef"></CodeCreatePopup>
	</view>
</template>

<script>
import { userIsPurchaseApi } from '../../../api/user'
import { USER_ID } from 'constant'
import showModalMixin from 'mixin/showModal'
import { convertToDecimal } from '../../../utils'

export default {
	name: 'BaseInfo',
	data() {
		return {
			isShow: false,
			isBuy: false,
			isDisplayBadges: false
		}
	},
	mixins: [ showModalMixin() ],
	mounted() {
		console.log(this.$store.getters.userInfo)
		this.userIsPurchase()
	},
	methods: {
		convertToDecimal,
		handleToVip(e) {
			if (e.index) {
				uni.navigateTo({ url: '/user/sever/goldButler/gold-butler' })
			}
			this.isShow = false
		},
		// 立即开通
		handleToOpen() {
			const url = this.isBuy ? '/user/sever/goldButler/gold-butler' : '/community-center/vip-center/vip-detail?type=2'
			uni.navigateTo({
				url
			})
		},

		// 查询用户是否购买过家庭小卫士套餐
		async userIsPurchase() {
			try {
				const userId = uni.getStorageSync(USER_ID)
				const res = await userIsPurchaseApi({
					userId,
					price: 399
				})
				if (res.statusCode === 20000) {
					if (res.data && Array.isArray(res.data) && res.data.length) {
						this.isBuy = true
					}
				} else {
					this.isBuy = false
				}
			} catch (error) {
				this.isBuy = false
			}
		}
	}
}
</script>

<style lang="scss" scoped>
view,
text {
	line-height: 1.5 !important;
}

.base-info-container {
	position: relative;
	// height: 400upx;
	background: url('../../../static/images/new-user/info-bg.png') no-repeat;
	background-size: cover;
	padding: 80upx 32upx 0upx;
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

	.goldman {
		padding: 0 22upx;
		box-sizing: border-box;
		margin-top: 20upx;
		width: 100%;
		height: 144upx;
		border-radius: 24upx;
		background: linear-gradient(262deg, #fcd188 -4%, #ecb14c -4%, #ecb24d -4%, #fcd188 56%);
		display: flex;
		align-items: center;

		image {
			width: 56upx;
			height: 56upx;
		}

		.text-list {
			flex: 1;
			padding-left: 22upx;

			.first {
				font-size: 36upx;
				font-weight: 500;
				line-height: 54upx;
				color: #333333;
			}

			.second {
				font-size: 24upx;
				line-height: 32upx;
				color: #333333;
			}
		}

		.open {
			width: 152upx;
			height: 64upx;
			border-radius: 50upx;
			background: #402d0d;
			font-size: 24upx;
			font-weight: 500;
			color: #ffffff;
			display: flex;
			justify-content: center;
			align-items: center;
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
			/* padding-left: 24upx; */
			box-sizing: border-box;
			margin-top: 12upx;
			flex-wrap: wrap;

			.tag {
				margin-left: 12upx;
				box-sizing: border-box;
				padding: 4rpx 6rpx;
				display: flex;
				align-items: center;
				font-size: 24upx;
				color: #c4542f;
				height: 36upx;
				background: #f7d1c2;
				margin-right: 15rpx;
				border-radius: 8rpx;
				opacity: 1;
				background: linear-gradient(90deg, #ffffff 0%, #f9d090 100%);
				border: 1px solid #b4560a;
			}
		}
	}
}

/deep/ .avatar-container {
	image {
		border: 2upx solid #f1f1f0;
		background-color: #fff;
		box-sizing: border-box;
	}
}
</style>
