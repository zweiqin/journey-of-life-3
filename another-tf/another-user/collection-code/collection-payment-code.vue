<template>
	<view class="user-invitation-container">
		<JHeader title="商家收款" width="50" height="50" style="padding: 24upx 0 18upx;background-color: #ffffff;">
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
		</view>

		<!-- 生成二维码 -->
		<view>
			<uqrcode
				ref="uqrcode" class="generate-code-container" canvas-id="qrcode" :value="qrcodeUrl + createCode"
				@complete="handleCompleteCode"
			></uqrcode>
		</view>
	</view>
</template>

<script>
import { A_TF_MAIN } from '../../../config'
import { getPlatformRelationshipCodeApi } from '../../../api/anotherTFInterface'

export default {
	name: 'CollectionPaymentCode',
	data() {
		return {
			rootUrl: A_TF_MAIN,
			createCode: '',
			qrcodeUrl: '',
			codePicUrl: '',
			currentSwiper: 1,
			codePicList: [require('../../../static/images/user/code/code-red.png'), require('../../../static/images/user/code/code-pink.png'), require('../../../static/images/user/code/code-yellow.png')]
		}
	},
	onLoad(options) {
		this.collageId = options.collageId || ''
		this.money = options.money || ''
		this.orderId = options.orderId || ''
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
