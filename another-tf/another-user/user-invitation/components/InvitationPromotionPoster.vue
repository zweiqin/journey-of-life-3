<template>
	<tui-popup :duration="500" :mode-class="[ 'fade' ]" :styles="styles" :show="popupVisible">
		<view class="poster-container">
			<view style="max-height: 75vh;overflow-y: auto;">
				<image v-show="posterImage" class="poster-iamge" :src="posterImage" mode="widthFix" />
				<l-painter v-show="!posterImage" ref="painter" is-canvas-to-temp-file-path @done="handlePainterSuccess">
					<l-painter-view css="position: relative;border-radius: 20rpx;box-sizing: border-box;">
						<l-painter-image :src="backgroundImageContainerArr[picType]" css="object-fit: contain;width: 100%;" />
						<l-painter-view css="position: absolute;top: 14rpx;left: 0;z-index: 1;width: 100%;text-align: center;">
							<l-painter-view
								css="width: 100%;font-size: 30rpx;"
							>
								<l-painter-view>
									<l-painter-image
										:src="common.seamingImgUrl(headImage)"
										css="width: 48rpx;height: 48rpx;border-radius: 50%;object-fit: contain;"
									/>
									<l-painter-text :text="`ID：${userId}`" css="margin-left: 20rpx;color: #222229;line-height: 48rpx;" />
								</l-painter-view>
							</l-painter-view>
							<l-painter-view css="margin-top: 616rpx;">
								<l-painter-text :text="`邀请码：${createCode}`" css="font-size: 34rpx;color: #ffffff;" />
							</l-painter-view>
							<l-painter-image :src="shareCode" css="width: 36%;margin-top: 26rpx;"></l-painter-image>
						</l-painter-view>
					</l-painter-view>
				</l-painter>
			</view>

			<view style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
				<button class="uni-btn" @click="handleSaveImage">
					<!-- #ifdef H5 -->
					<text>提示：可长按或截屏进行保存</text>
					<!-- #endif -->
					<!-- #ifdef APP || MP -->
					<text>保存</text>
					<!-- #endif -->
				</button>
				<view class="close-wrapper">
					<tui-icon name="close" color="#fff" :size="37" @click="handleClosePopup"></tui-icon>
				</view>
			</view>
		</view>

		<!-- 分析logo颜色 -->
		<canvas id="tui-color-palette" class="canvas-el" canvas-id="tui-color-palette"></canvas>

		<tui-toast ref="toast"></tui-toast>
	</tui-popup>
</template>

<script>
import { saveImg } from '../../../../utils'
export default {
	name: 'InvitationPromotionPoster',
	data() {
		return {
			styles: Object.freeze({
				'position': 'fixed',
				'bottom': 0,
				'top': 0,
				'left': 0,
				'right': 0,
				'z-index': 997,
				'display': 'flex',
				'justify-content': 'center',
				'align-items': 'flex-start',
				'padding-top': '7vh',
				'background': 'rgba(0, 0, 0, 0.6)'
				// 'pointer-events': 'visible'
			}),
			posterImage: '',
			logoBg: '#fff',
			popupVisible: false,
			backgroundImageContainerArr: [require('../../../../static/images/user/code/code-red.png'), require('../../../../static/images/user/code/code-pink.png'), require('../../../../static/images/user/code/code-yellow.png')],
			userId: '',
			headImage: '',
			picType: '',
			createCode: '',
			shareCode: null
		}
	},

	methods: {
		show({ userId, headImage, picType, createCode, shareCode }) {
			this.posterImage = ''
			this.userId = userId
			this.headImage = headImage
			this.picType = picType
			this.createCode = createCode
			this.shareCode = shareCode
			this.popupVisible = true
			this.$forceUpdate()
		},

		handleSaveImage() {
			// // #ifdef H5
			// uni.showToast({
			// 	title: '长按二维码即可分享和保存活动邀请码',
			// 	duration: 2000,
			// 	icon: 'none'
			// })
			// // #endif
			// // #ifdef APP || MP
			// uni.saveFile({
			// 	tempFilePath: this.posterImage,
			// 	success:(res)=> {
			// 		var savedFilePath = res.savedFilePath
			// 		this.ttoast({
			// 			title: '活动邀请码保存成功'
			// 		})
			// 	}
			// })
			// // #endif

			if (this.posterImage) {
				saveImg(this.posterImage)
			} else {
				this.$refs.painter.canvasToTempFilePathSync({
					// 在nvue里是jpeg
					fileType: 'jpg',
					pathType: 'url',
					quality: 1,
					success: (res) => {
						saveImg(res.tempFilePath)
					}
				})
			}
		},

		// 绘制活动邀请码成功
		handlePainterSuccess() {
			this.$nextTick(() => {
				this.$refs.painter.canvasToTempFilePathSync({
					fileType: 'jpg',
					pathType: 'url',
					quality: 1,
					success: (res) => {
						if (!this.posterImage) {
							this.posterImage = res.tempFilePath
							console.log(this.posterImage)
						}
					},
					fail: (res) => {
						// this.posterImage = JSON.stringify(res)
					}
				})
			})
		},

		handleClosePopup() {
			this.popupVisible = false
		}
	}
}
</script>

<style lang="less" scoped>
.poster-container {
	width: 670upx;
	text-align: center;
	border-radius: 32upx;
	box-sizing: border-box;

	.uni-btn {
		width: 80%;
		height: 60upx;
		font-size: 28upx;
		line-height: 60upx;
		border-radius: 100px;
		background-color: #fff;
		margin: 16upx 0;
	}

	.poster-iamge {
		width: 670upx;
		border-radius: 32upx;
	}
}

.canvas-el {
	position: absolute;
	z-index: -1;
}
</style>
