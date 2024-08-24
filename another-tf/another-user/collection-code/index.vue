<template>
	<view class="collection-code-container">
		<BeeBack>
			<view
				style="display: flex;align-items: center;justify-content: space-between;padding: 20rpx 20rpx 16rpx;background-color: #f5f5f5;"
			>
				<BeeIcon name="home-fill" :size="26" color="#222229" style="width: fit-content;">
				</BeeIcon>
				<text style="flex: 1;margin-left: -40rpx;text-align: center;">商家点单码</text>
			</view>
		</BeeBack>
		<view style="padding: 60rpx 76rpx 42rpx;margin: 40rpx 36rpx 0;background-color: #ffffff;border-radius: 18rpx;">
			<view
				style="display: flex;flex-direction: column;align-items: center;justify-content: center;text-align: center;border-radius: 16rpx;overflow: hidden;box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);"
			>
				<view style="width: 100%;padding: 18rpx 0 24rpx;background-color: #ef530e;">
					<view style="font-size: 34rpx;font-weight: bold;font-style: italic;color: #ffffff;letter-spacing: 4rpx;">团蜂同城生活</view>
					<view style="margin-top: 8rpx;font-size: 44rpx;font-weight: bold;font-style: italic;color: #ffffff;">扫 码 消 费 有 补 贴</view>
					<view
						style="position: relative;width: 420rpx;height: 420rpx;margin: 22rpx auto 0;background-color: #ffffff;border-radius: 16rpx;overflow: hidden;box-sizing: border-box;"
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
					保存商家点单码
				</view>
			</view>
		</view>

		<view class="operation-btn" style="position: fixed;bottom: 0;z-index: 1;width: 100%;box-sizing: border-box;">
			<view
				v-if="isShowExplain"
				style="padding: 30rpx 42rpx 32rpx;background-color: #ffffff;border-radius: 38rpx 38rpx 0 0;"
			>
				<view style="text-align: center;font-weight: bold;">商家点单码使用说明</view>
				<view style="margin-top: 20rpx;">商家点单码仅限已入驻{{ APPLY_NAME }}平台的商家使用，请勿向他人出租商家点单码，否则可能被他人用于违法犯罪活动。</view>
				<view>
					<tui-button
						type="gray" width="520rpx" height="90rpx" margin="40rpx auto 0"
						bold
						@click="isShowExplain = false"
					>
						知 道 了
					</tui-button>
				</view>
			</view>
			<view v-else style="padding: 0 0 66rpx;">
				<tui-button
					type="black" width="250rpx" height="60rpx" margin="0 auto"
					plain link bold
					@click="isShowExplain = true"
				>
					商家点单码使用说明
				</tui-button>
			</view>
		</view>
		<tui-gallery :urls="galleryUrls" :show="isShowGallery" @hide="isShowGallery = false"></tui-gallery>

		<CollectionCodePoster ref="refCollectionCodePoster"></CollectionCodePoster>
	</view>
</template>

<script>
import CollectionCodePoster from './components/CollectionCodePoster.vue'
import { getPaymentGenerateCodeApi } from '../../../api/anotherTFInterface'
import { APPLY_NAME } from '../../../config'

export default {
	name: 'CollectionCode',
	components: { CollectionCodePoster },
	data() {
		return {
			APPLY_NAME,
			codePicUrl: '',
			isShowExplain: false,
			galleryUrls: [ { src: '', desc: '' } ],
			isShowGallery: false
		}
	},
	onLoad() {
		this.getCode()
	},

	methods: {
		getCode() {
			uni.showLoading()
			getPaymentGenerateCodeApi({ codeType: '1', state: '1' })
				.then((res) => {
					this.codePicUrl = res.data.shopCode
					uni.hideLoading()
				})
				.catch((e) => {
					uni.hideLoading()
				})
		},

		async handlePreviewImage(url) {
			const generateUrl = await this.$refs.refCollectionCodePoster.handleGeneratePic({
				shopName: this.$store.state.auth.identityInfo.shopInfo.shopName,
				shopBrief: this.$store.state.auth.identityInfo.shopInfo.shopBrief,
				shareCode: url
			})
			this.galleryUrls = [ { src: generateUrl, desc: '' } ]
			this.isShowGallery = true
			// uni.previewImage({
			// 	urls: [ url ],
			// 	current: 0
			// })
		},
		handleShare() {
			if (this.codePicUrl) {
				if (this.$store.state.auth.identityInfo.shopInfo.shopId) {
					this.$refs.refCollectionCodePoster.show({
						shopName: this.$store.state.auth.identityInfo.shopInfo.shopName,
						shopBrief: this.$store.state.auth.identityInfo.shopInfo.shopBrief,
						shareCode: this.codePicUrl
					})
				} else {
					return this.$showToast('缺少商家信息')
				}
			} else {
				return this.$showToast('缺少商家点单码！')
			}
		}
	}
}
</script>

<style lang="less" scoped>
.collection-code-container {
	min-height: 100vh;
	background-color: #f0f0f0;
	box-sizing: border-box;

	.operation-btn {
		/deep/ .tui-btn {
			border-radius: 20rpx;
		}

		/deep/ .tui-btn-gray {
			background-color: #d8d8d8 !important;
			color: #000000 !important;
		}
	}

	/deep/ .tui-gallery {
		.tui-gallery__info {
			display: none;
		}
	}
}
</style>
