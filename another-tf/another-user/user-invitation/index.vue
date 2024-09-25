<template>
	<view class="user-invitation-container">
		<JHeader title="我的推广" width="50" height="50">
			<template #ftFn>
				<text style="padding-right: 18rpx;font-size: 26rpx;color: #2A2B23;">规则</text>
			</template>
		</JHeader>
		<view>
			<view v-if="codePicList && codePicList.length" style="padding: 40rpx 0 0;">
				<swiper
					:current="1" previous-margin="150rpx" next-margin="150rpx" style="height: 698rpx;"
					@change="handleSwiperChange"
				>
					<swiper-item v-for="(item, index) in codePicList" :key="index">
						<view
							style="display: flex;align-items: center;width: 100%;height: 100%;"
							:style="{ justifyContent: index === currentSwiper - 1 ? 'flex-end' : index === currentSwiper + 1 ? 'flex-start' : 'center' }"
						>
							<view style="position: relative;display: flex;">
								<image
									:src="item" style="border-radius: 20rpx;" mode="widthFix"
									:style="{ width: index === currentSwiper ? '428rpx' : '350rpx' }"
								></image>
								<view
									v-if="index === currentSwiper"
									style="position: absolute;left: 0;top: 0;display: flex;flex-direction: column;align-items: center;width: 100%;"
								>
									<view style="padding-top: 4rpx;display: flex;align-items: center;font-size: 24rpx;">
										<BeeIcon
											:size="18" :src="common.seamingImgUrl($store.getters.userInfo.headImage)"
											style="border-radius: 50%;overflow: hidden;"
										></BeeIcon>
										<view style="margin-left: 20rpx;color: #222229;">
											ID：{{ $store.getters.userInfo.buyerUserId || '--' }}
										</view>
									</view>
									<view style="margin-top: 388rpx;font-size: 22rpx;color: #ffffff;">邀请码：{{ createCode || '--' }}</view>
									<image
										:src="codePicUrl" style="width: 36%;margin-top: 20rpx;" mode="widthFix"
										@click="handlePreviewImage(codePicUrl)"
									/>
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view style="margin: 28rpx 30rpx 0;font-size: 28rpx;color: #222229;">
				<view
					style="display: flex;justify-content: space-between;align-items: center;padding: 34rpx 32rpx;background-color: #ffffff;border-radius: 24rpx;"
				>
					<view style="font-weight: bold;">我的邀请码：{{ createCode || '--' }}</view>
					<view>
						<tui-button
							type="warning" width="132rpx" height="60rpx" margin="0"
							:size="24" shape="circle"
							style="background: #ef530e!important;" @click="$copy(createCode)"
						>
							复制
						</tui-button>
					</view>
				</view>
				<view style="margin-top: 24rpx;padding: 34rpx 32rpx 88rpx;background-color: #ffffff;border-radius: 24rpx;">
					<view style="font-weight: bold;">推广说明</view>
					<view style="color: #EF530E;margin-top: 18rpx;">1、可以通过{{ APPLY_NAME }}APP、团蜂公众号、小程序进入，进行注册邀请好友</view>
					<view style="margin-top: 24rpx;">2、注册后海报中是您的专属二维码和邀请码</view>
					<view style="margin-top: 24rpx;">3、好友通过您的邀请进行注册后，Ta将成为您的名下会员，如果您的身份升至团长或合伙人，您将享受分享带来的收益，会自动计入您的账号！</view>
				</view>
			</view>
		</view>

		<view style="position: fixed;bottom: 0;z-index: 1;width: 100%;padding: 22rpx 0;background-color: #ffffff;border-radius: 32rpx 32rpx 0 0;box-sizing: border-box;">
			<view style="display: flex;justify-content: space-around;align-items: center;font-size: 24rpx;color: #222229;">
				<view
					v-if="createCode"
					@click="$copy(`${rootUrl}/#/pages/jump/jump?userId=${$store.getters.userInfo.buyerUserId}&type=bindingUser&code=${createCode}`)"
				>
					<view
						style="padding: 16rpx;background: linear-gradient(180deg, #FF9252 -3%, #FF3F15 100%);border: 6rpx solid #ffac81;border-radius: 50%;box-shadow: 0px 22px 44px 0px rgba(255, 77, 0, 0.4);"
					>
						<tui-icon name="link" :size="50" unit="rpx" color="#ffffff" margin="0" style="line-height: 1;"></tui-icon>
					</view>
					<view style="margin-top: 20rpx;">分享链接</view>
				</view>
				<view v-if="codePicUrl" @click="handleShare">
					<view
						style="padding: 16rpx;background: linear-gradient(180deg, #FFCF53 -3%, #FF9900 100%);border: 6rpx solid #ffd67a;border-radius: 50%;box-shadow: 0px 22px 44px 0px rgba(255, 153, 0, 0.4);"
					>
						<tui-icon name="strategy" :size="50" unit="rpx" color="#ffffff" margin="0" style="line-height: 1;"></tui-icon>
					</view>
					<view style="margin-top: 20rpx;">生成海报</view>
				</view>
			</view>
		</view>

		<!-- 生成二维码 -->
		<view>
			<uqrcode
				ref="uqrcode" class="generate-code-container" canvas-id="qrcode" :value="qrcodeUrl + createCode"
				@complete="handleCompleteCode"
			></uqrcode>
		</view>

		<InvitationPromotionPoster ref="refInvitationPromotionPoster"></InvitationPromotionPoster>
	</view>
</template>

<script>
import { APPLY_NAME, A_TF_MAIN } from '../../../config'
import InvitationPromotionPoster from './components/InvitationPromotionPoster.vue'
import { getPlatformRelationshipCodeApi } from '../../../api/anotherTFInterface'

export default {
	name: 'UserInvitation',
	components: { InvitationPromotionPoster },
	data() {
		return {
			APPLY_NAME,
			rootUrl: A_TF_MAIN,
			createCode: '',
			qrcodeUrl: '',
			codePicUrl: '',
			currentSwiper: 1,
			codePicList: [require('../../../static/images/user/code/code-red.png'), require('../../../static/images/user/code/code-pink.png'), require('../../../static/images/user/code/code-yellow.png')]
		}
	},
	onLoad() {
		this.getCode()
	},

	methods: {
		getCode() {
			uni.showLoading({
				title: '生成中...'
			})
			getPlatformRelationshipCodeApi({})
				.then((res) => {
					this.createCode = res.data.invitationCode || ''
					this.qrcodeUrl = `${this.rootUrl}/#/pages/jump/jump?userId=${this.$store.getters.userInfo.buyerUserId}&type=bindingUser&code=`
				})
		},
		// 完成
		handleCompleteCode(e) {
			if (e.success) {
				this.$refs.uqrcode.toTempFilePath({
					success: (res) => {
						console.log(res)
						this.codePicUrl = res.tempFilePath
						uni.hideLoading()
					}
				})
			}
		},

		handleSwiperChange(e) {
			this.currentSwiper = e.detail.current
		},
		handlePreviewImage(url) {
			uni.previewImage({
				urls: [ url ],
				current: 0
			})
		},
		handleShare() {
			if (this.codePicUrl) {
				if (this.$store.getters.userInfo.buyerUserId) {
					this.$refs.refInvitationPromotionPoster.show({
						picType: this.currentSwiper,
						headImage: this.$store.getters.userInfo.headImage,
						userId: this.$store.getters.userInfo.buyerUserId,
						createCode: this.createCode,
						shareCode: this.codePicUrl
					})
				} else {
					return this.$showToast('缺少个人信息')
				}
			} else {
				return this.$showToast('缺少邀请码！')
			}
		}
	}
}
</script>

<style lang="less" scoped>
.user-invitation-container {
	min-height: 100vh;
	padding-bottom: 216rpx;
	background-color: #f4f4f4;
	box-sizing: border-box;

	/deep/ .j-header-wrapper {
		padding: 24rpx 0 18rpx;
		background-color: #ffffff;
		.title {
			font-size: 36rpx;
			color: #2A2B23;
		}
	}

	.generate-code-container {
		position: absolute;
		top: -10000rpx;
	}
}
</style>
