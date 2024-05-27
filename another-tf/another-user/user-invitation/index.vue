<template>
	<view class="user-invitation-container">
		<JHeader title="我的推广" width="50" height="50" style="padding: 24upx 0 18upx;background-color: #ffffff;">
			<template #ftFn>
				<text style="padding-right: 18upx;font-size: 26upx;color: #2A2B23;">规则</text>
			</template>
		</JHeader>
		<view>
			<view v-if="codePicList && codePicList.length" style="padding: 40upx 0 0;">
				<swiper
					:current="1" previous-margin="150rpx" next-margin="150rpx" style="height: 698upx;"
					@change="handleSwiperChange"
				>
					<swiper-item v-for="(item, index) in codePicList" :key="index">
						<view
							style="display: flex;align-items: center;width: 100%;height: 100%;"
							:style="{ justifyContent: index === currentSwiper - 1 ? 'flex-end' : index === currentSwiper + 1 ? 'flex-start' : 'center' }"
						>
							<view style="position: relative;display: flex;">
								<image
									:src="item" style="border-radius: 20upx;" mode="widthFix"
									:style="{ width: index === currentSwiper ? '428upx' : '350upx' }"
								></image>
								<view
									v-if="index === currentSwiper"
									style="position: absolute;left: 0;top: 0;display: flex;flex-direction: column;align-items: center;width: 100%;"
								>
									<view style="padding-top: 4upx;display: flex;align-items: center;font-size: 24upx;">
										<BeeIcon
											:size="18" :src="common.seamingImgUrl($store.getters.userInfo.headImage)"
											style="border-radius: 50%;overflow: hidden;"
										></BeeIcon>
										<view style="margin-left: 20upx;color: #222229;">
											ID：{{ $store.getters.userInfo.buyerUserId || '--' }}
										</view>
									</view>
									<view style="margin-top: 388upx;font-size: 22upx;color: #ffffff;">邀请码：{{ createCode || '--' }}</view>
									<image
										:src="codePicUrl" style="width: 36%;margin-top: 20upx;" mode="widthFix"
										@click="handlePreviewImage(codePicUrl)"
									/>
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view style="margin: 28upx 30upx 0;font-size: 28upx;color: #222229;">
				<view
					style="display: flex;justify-content: space-between;align-items: center;padding: 34upx 32upx;background-color: #ffffff;border-radius: 24upx;"
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
				<view style="margin-top: 24upx;padding: 34upx 32upx 88upx;background-color: #ffffff;border-radius: 24upx;">
					<view style="font-weight: bold;">推广说明</view>
					<view style="color: #EF530E;margin-top: 18upx;">1、可以通过{{ APPLY_NAME }}APP、团蜂公众号、小程序进入，进行注册邀请好友</view>
					<view style="margin-top: 24upx;">2、注册后海报中是您的专属二维码和邀请码</view>
					<view style="margin-top: 24upx;">3、好友通过您的邀请进行注册后，Ta将成为您的名下会员，如果您的身份升至团长或合伙人，您将享受分享带来的收益，会自动计入您的账号！</view>
				</view>
			</view>
		</view>

		<view style="position: fixed;bottom: 0;z-index: 1;width: 100%;padding: 22upx 0;background-color: #ffffff;border-radius: 32upx 32upx 0 0;box-sizing: border-box;">
			<view style="display: flex;justify-content: space-around;align-items: center;font-size: 24upx;color: #222229;">
				<view
					v-if="createCode"
					@click="$copy(`${rootUrl}/#/pages/jump/jump?userId=${$store.getters.userInfo.buyerUserId}&type=bindingUser&code=${createCode}`)"
				>
					<view
						style="padding: 16upx;background: linear-gradient(180deg, #FF9252 -3%, #FF3F15 100%);border: 6upx solid #ffac81;border-radius: 50%;box-shadow: 0px 22px 44px 0px rgba(255, 77, 0, 0.4);"
					>
						<tui-icon name="link" :size="50" unit="upx" color="#ffffff" margin="0" style="line-height: 1;"></tui-icon>
					</view>
					<view style="margin-top: 20upx;">分享链接</view>
				</view>
				<view v-if="codePicUrl" @click="handleShare">
					<view
						style="padding: 16upx;background: linear-gradient(180deg, #FFCF53 -3%, #FF9900 100%);border: 6upx solid #ffd67a;border-radius: 50%;box-shadow: 0px 22px 44px 0px rgba(255, 153, 0, 0.4);"
					>
						<tui-icon name="strategy" :size="50" unit="upx" color="#ffffff" margin="0" style="line-height: 1;"></tui-icon>
					</view>
					<view style="margin-top: 20upx;">生成海报</view>
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
.generate-code-container {
	position: absolute;
	top: -10000upx;
}

.user-invitation-container {
	min-height: 100vh;
	padding-bottom: 216upx;
	background-color: #f4f4f4;
	box-sizing: border-box;

	/deep/ .j-header-container .title {
		font-size: 36upx;
		color: #2A2B23;
	}
}
</style>
