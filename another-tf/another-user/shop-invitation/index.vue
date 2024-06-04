<template>
	<view class="shop-invitation-container">
		<BeeBack>
			<view
				style="display: flex;align-items: center;justify-content: space-between;padding: 32rpx 20rpx 16rpx;background-color: #f5f5f5;"
			>
				<BeeIcon name="home-fill" :size="26" color="#222229" style="width: fit-content;">
				</BeeIcon>
				<text style="flex: 1;margin-left: -40rpx;text-align: center;">商家店铺码</text>
			</view>
		</BeeBack>
		<view style="padding: 60rpx 76rpx 42rpx;margin: 40rpx 36rpx 0;background-color: #ffffff;border-radius: 18rpx;">
			<view
				style="display: flex;flex-direction: column;align-items: center;justify-content: center;text-align: center;border-radius: 16rpx;overflow: hidden;box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);"
			>
				<view style="width: 100%;padding: 48rpx 0 24rpx;background-color: #ef530e;">
					<view style="font-size: 44rpx;font-weight: bold;font-style: italic;color: #ffffff;">扫 码 消 费 有 补 贴</view>
					<view
						style="position: relative;width: 420rpx;height: 420rpx;margin: 42rpx auto 0;background-color: #ffffff;border-radius: 10rpx;overflow: hidden;box-sizing: border-box;"
					>
						<view style="position: absolute;left: 0;top: 0;width: 100%;height: 100%;box-sizing: border-box;">
							<view style="display: flex;align-items: center;justify-content: center;width: 100%;height: 100%;">
								<image
									:src="codePicUrl" style="width: 98%;height: 98%;" mode="widthFix"
									@click="handlePreviewImage(codePicUrl)"
								/>
							</view>
						</view>
					</view>
				</view>
				<view style="width: 100%;padding: 32rpx 0 38rpx;font-size: 26rpx;font-weight: bold;">
					<text>{{ $store.state.auth.identityInfo.shopInfo.shopName || '--' }}</text>
					<text v-if="$store.state.auth.identityInfo.shopInfo.shopBrief">
						（{{ $store.state.auth.identityInfo.shopInfo.shopBrief }}）
					</text>
				</view>
			</view>
			<view
				style="margin: 42rpx 0 0;display: flex;justify-content: space-around;align-items: center;font-size: 30rpx;color: #507AFC;font-weight: bold;"
			>
				<view v-if="codePicUrl" @click="handleShare">
					保存商家店铺码
				</view>
			</view>
		</view>
		<tui-gallery :urls="galleryUrls" :show="isShowGallery" @hide="isShowGallery = false"></tui-gallery>

		<!-- 生成二维码 -->
		<view>
			<uqrcode
				ref="uqrcode" class="generate-code-container" canvas-id="qrcode" :value="qrcodeUrl + createCode"
				@complete="handleCompleteCode"
			></uqrcode>
		</view>

		<ShopInvitationPoster ref="refShopInvitationPoster"></ShopInvitationPoster>
	</view>
</template>

<script>
import { A_TF_MAIN } from '../../../config'
import ShopInvitationPoster from './components/ShopInvitationPoster.vue'

export default {
	name: 'ShopInvitation',
	components: { ShopInvitationPoster },
	data() {
		return {
			createCode: '',
			qrcodeUrl: '',
			codePicUrl: '',
			galleryUrls: [ { src: '', desc: '' } ],
			isShowGallery: false
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
			this.createCode = this.$store.getters.userInfo.phone || ''
			this.qrcodeUrl = `${A_TF_MAIN}/#/pages/jump/jump?userId=${this.$store.getters.userInfo.buyerUserId}&type=bindingShop&code=${this.$store.state.auth.identityInfo.shopInfo.shopId || ''}~`
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

		async handlePreviewImage(url) {
			const generateUrl = await this.$refs.refShopInvitationPoster.handleGeneratePic({
				shopName: this.$store.state.auth.identityInfo.shopInfo.shopName,
				shopBrief: this.$store.state.auth.identityInfo.shopInfo.shopBrief,
				shareCode: url
			})
			this.galleryUrls = [ { src: generateUrl, desc: '' } ]
			this.isShowGallery = true
		},
		handleShare() {
			if (this.codePicUrl) {
				if (this.$store.state.auth.identityInfo.shopInfo.shopId) {
					this.$refs.refShopInvitationPoster.show({
						shopName: this.$store.state.auth.identityInfo.shopInfo.shopName,
						shopBrief: this.$store.state.auth.identityInfo.shopInfo.shopBrief,
						shareCode: this.codePicUrl
					})
				} else {
					return this.$showToast('缺少商家信息')
				}
			} else {
				return this.$showToast('缺少商家码！')
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

.shop-invitation-container {
	min-height: 100vh;
	background-color: #f0f0f0;
	box-sizing: border-box;

	/deep/ .tui-gallery {
		.tui-gallery__info {
			display: none;
		}
	}
}
</style>
