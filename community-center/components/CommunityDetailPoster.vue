<template>
	<tui-popup
		:duration="500"
		:mode-class="[ 'fade' ]"
		:styles="styles"
		:show="popupVisible"
	>
		<view class="poster-container">
			<image
				v-show="posterImage"
				class="poster-iamge"
				:src="posterImage"
				mode=""
			/>
			<l-painter
				v-show="!posterImage"
				ref="painter"
				is-canvas-to-temp-file-path
				css=" background: #fff; border-radius: 32rpx;"
				@done="handlePainterSuccess"
			>
				<l-painter-view css="width: 600rpx;height: 380rpx;padding: 0 11rpx;">
					<l-painter-view css="width: 600rpx;textAlign: center;">
						<l-painter-text
							:text="headerTitle"
							css=" paddingTop: 16rpx;
										display: inline-block;
										color: #000;
										fontSize: 32rpx;
										fontWeight: bold;
										textAlign: center;"
						/>
					</l-painter-view>

					<l-painter-text
						:text="topDesc"
						css=" display: block;
					color: #605D52;
					fontSize: 28rpx;
					marginTop: 12rpx;
					marginBottom: 14rpx;
					line-clamp: 4;
					"
					></l-painter-text>

					<l-painter-text
						:text="downDesc"
						css=" display: block;
					color: #605D52;
					fontSize: 28rpx;
					marginTop: 8rpx;
					marginBottom: 14rpx;
					line-clamp: 3;
					"
					></l-painter-text>

					<!-- <l-painter-image
						:src="require('../../static/images/user/code/line.png')"
						css="width: 48rpx;
						height: 48rpx"
						></l-painter-image> -->
				</l-painter-view>

				<l-painter-view
					css="padding: 10rpx;
              display: flex;
              justifyContent: flex-start;
              width: 602rpx;"
				>
					<l-painter-view css="width: 350rpx;textAlign: center;">
						<l-painter-image
							:src="logo"
							:css="{
								background: logoBg,
								objectFit: 'contain',
								width: '158rpx',
								height: '158rpx'
							}"
						/>
						<l-painter-text
							text="下单享优惠，分享得福利！"
							css=" display: block;
                      color: #605D52;
                      fontSize: 22rpx;
                      marginTop: 20rpx"
						></l-painter-text>
					</l-painter-view>

					<l-painter-view css="width: 170rpx;textAlign: center;marginLeft: 28rpx">
						<l-painter-image
							:src="shareCode"
							css="width: 158rpx;
                      height: 158rpx"
						></l-painter-image>

						<l-painter-text
							text="赶快行动吧！！"
							css=" display: block;
                      color: #605D52;
                      fontSize: 22rpx;
                      marginTop: 20rpx"
						></l-painter-text>
					</l-painter-view>
				</l-painter-view>
			</l-painter>

			<button class="uni-btn" @click="handleSaveImage">提示：可长按二维码或截屏进行保存</button>

			<view class="close-wrapper">
				<tui-icon
					name="close"
					color="#fff"
					:size="37"
					@click="handleClosePopup"
				></tui-icon>
			</view>
		</view>

		<!-- 分析logo颜色 -->
		<canvas
			id="tui-color-palette"
			class="canvas-el"
			canvas-id="tui-color-palette"
		></canvas>

		<tui-toast ref="toast"></tui-toast>
	</tui-popup>
</template>

<script>
export default {
	name: 'CommunityDetailPoster',
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
			}),
			posterImage: '',
			logoBg: '#fff',
			popupVisible: false,
			shareCode: null,
			headerTitle: '',
			topDesc: '',
			downDesc: '',
			logo: ''
		}
	},

	methods: {
		show({ shareCode, logo, headerTitle, topDesc, downDesc }) {
			const _this = this
			this.popupVisible = true
			this.shareCode = shareCode
			this.headerTitle = headerTitle
			this.topDesc = topDesc
			this.downDesc = downDesc
			this.logo = logo
			this.$forceUpdate()

			this.$nextTick(() => {
				this.$refs.painter.canvasToTempFilePathSync({
					fileType: 'jpg',
					quality: 1,
					success: (res) => {
						this.$forceUpdate()
						if (!_this.posterImage) {
							_this.posterImage = res.tempFilePath
						}
					}
				})
			})
		},
		handleSaveImage() {
			const _this = this
			// #ifdef H5
			uni.showToast({
				title: '长按二维码即可分享和保存活动邀请码',
				duration: 2000,
				icon: 'none'
			})
			// #endif

			// #ifdef APP
			uni.saveFile({
				tempFilePath: this.posterImage,
				success(res) {
					var savedFilePath = res.savedFilePath
					_this.ttoast({
						title: '活动邀请码保存成功'
					})
				}
			})
			// #endif
		},

		// 绘制活动邀请码成功
		handlePainterSuccess() {
			const _this = this
			this.$nextTick(() => {
				this.$refs.painter.canvasToTempFilePathSync({
					fileType: 'jpg',
					quality: 1,
					success: (res) => {
						if (!_this.posterImage) {
							_this.posterImage = res.tempFilePath
						}
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
  width: 622upx;
  border-radius: 32upx;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

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
    width: 622upx;
    height: 600upx;
    border-radius: 32upx;
  }
}

.canvas-el {
  position: absolute;
  z-index: -1;
}
</style>
