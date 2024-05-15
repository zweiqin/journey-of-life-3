<template>
	<tui-popup :duration="500" :mode-class="[ 'fade' ]" :styles="styles" :show="popupVisible">
		<view class="poster-container">
			<view style="max-height: 75vh;overflow-y: auto;">
				<image v-show="posterImage" class="poster-iamge" :src="posterImage" mode="widthFix" />
				<l-painter v-show="!posterImage" ref="painter" is-canvas-to-temp-file-path @done="handlePainterSuccess">
					<l-painter-view css="text-align: center;border-radius: 16rpx;overflow: hidden;box-sizing: border-box;">
						<l-painter-view css="padding: 48rpx 0 24rpx 0;background-color: #ef530e;">
							<l-painter-view>
								<l-painter-text
									text="扫 码 消 费 有 补 贴"
									css="font-size: 44rpx;font-weight: bold;font-style: italic;color: #ffffff;"
								/>
							</l-painter-view>
							<l-painter-view
								css="position: relative;width: 420rpx;height: 420rpx;margin: 42rpx auto 0;background-color: #ffffff;border-radius: 16rpx;overflow: hidden;box-sizing: border-box;"
							>
								<l-painter-view
									css="position: absolute;left: 0;top: 0;width: 100%;height: 100%;box-sizing: border-box;"
								>
									<l-painter-view
										css="display: flex;align-items: center;justify-content: center;width: 100%;height: 100%;"
									>
										<l-painter-image
											:src="common.seamingImgUrl(shareCode)"
											css="width: 98%;height: 98%;object-fit: contain;"
										/>
									</l-painter-view>
								</l-painter-view>
							</l-painter-view>
						</l-painter-view>

						<l-painter-view css="padding: 32rpx 0 38rpx 0;">
							<l-painter-text
								:text="`${shopName}${shopBrief ? `（${shopBrief}）` : ''}`"
								css="font-size: 26rpx;font-weight: bold;"
							/>
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
	name: 'CollectionCodePoster',
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
			popupVisible: false,
			shopName: '',
			shopBrief: '',
			shareCode: ''
		}
	},

	methods: {
		show({ shopName, shopBrief, shareCode }) {
			this.posterImage = ''
			this.shopName = shopName
			this.shopBrief = shopBrief
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
