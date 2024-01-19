<template>
	<tui-popup :duration="500" :mode-class="[ 'fade' ]" :styles="styles" :show="popupVisible">
		<view class="poster-container">
			<view style="max-height: 70vh;overflow-y: auto;">
				<image v-show="posterImage" class="poster-iamge" :src="posterImage" mode="widthFix" />
				<l-painter
					v-show="!posterImage" ref="painter" is-canvas-to-temp-file-path
					css=" background: #fff;border-radius: 32rpx;" @done="handlePainterSuccess"
				>
					<l-painter-view css="width: 600rpx;padding: 0 11rpx;">
						<l-painter-view css="width: 600rpx;textAlign: center;">
							<l-painter-text
								:text="headerTitle" css=" paddingTop: 16rpx;
										display: inline-block;
										color: #000;
										fontSize: 32rpx;
										fontWeight: bold;
										textAlign: center;"
							/>
						</l-painter-view>
						<!-- <l-painter-text
							:text="topDesc" css=" display: block;
							color: #605D52;
							fontSize: 28rpx;
							marginTop: 12rpx;
							marginBottom: 14rpx;
							line-clamp: 4;
							"
							></l-painter-text> -->
					</l-painter-view>

					<l-painter-view css="margin: 32rpx;width: 602rpx;">
						<l-painter-view v-for="(brand, i) in brandList" :key="i">
							<l-painter-view css="marginTop: 10rpx;marginBottom: 10rpx;">
								<l-painter-image
									:src="require('../../static/images/user/mendianshenqing.png')" :css="{
										background: logoBg,
										objectFit: 'contain',
										width: '38rpx'
									}"
								/>
								<l-painter-text :text="brand.brandName" css="marginLeft: 10rpx;color: #000000;fontSize: 32rpx;line-clamp: 1;"></l-painter-text>
							</l-painter-view>
							<l-painter-view
								v-for="(item, index) in brand.goodsList" :key="index"
								css="display: flex;align-items: center;width: 538rpx;marginBottom: 18rpx;"
							>
								<l-painter-image
									:src="common.seamingImgUrl(item.picUrl)" :css="{
										background: logoBg,
										objectFit: 'contain',
										width: '208rpx'
									}"
								/>
								<l-painter-view css="flex: 1;marginLeft: 20rpx;marginTop: 10rpx;">
									<l-painter-text
										:text="item.goodsName"
										css="display: block;color: #605D52;fontSize: 28rpx;line-clamp: 3;"
									></l-painter-text>
									<l-painter-text
										:text="item.specifications"
										css="display: block;color: #605D52;fontSize: 24rpx;"
									></l-painter-text>
									<l-painter-view css="marginTop: 10rpx;">
										<l-painter-text text="￥" css="color: #ff0000;fontSize: 26rpx;"></l-painter-text>
										<l-painter-text :text="item.price" css="color: #ff0000;fontSize: 28rpx;"></l-painter-text>
									</l-painter-view>
								</l-painter-view>
							</l-painter-view>
						</l-painter-view>
					</l-painter-view>

					<!-- :src="require('../../static/images/icon/line.png')" -->
					<!-- <l-painter-view
						css="padding: 10rpx;
						display: flex;
						justifyContent: flex-start;
						width: 602rpx;"
						>
						<l-painter-view css="width: 350rpx;textAlign: center;">
						<l-painter-image
						:src="logo" :css="{
						background: logoBg,
						objectFit: 'contain',
						width: '158rpx',
						height: '158rpx'
						}"
						/>
						<l-painter-text
						text="下单享优惠，分享得福利！" css=" display: block;
						color: #605D52;
						fontSize: 22rpx;
						marginTop: 20rpx"
						></l-painter-text>
						</l-painter-view>
						<l-painter-view css="width: 170rpx;textAlign: center;marginLeft: 28rpx">
						<l-painter-image
						:src="shareCode" css="width: 158rpx;
						height: 158rpx"
						></l-painter-image>

						<l-painter-text
						text="赶快行动吧！！" css=" display: block;
						color: #605D52;
						fontSize: 22rpx;
						marginTop: 20rpx"
						></l-painter-text>
						</l-painter-view>
						</l-painter-view> -->
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
import { saveImg } from '../../utils'
export default {
	name: 'OrderPoster',
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
			brandList: [],
			shareCode: null,
			headerTitle: ''
		}
	},

	methods: {
		show({ headerTitle, brandList }) {
			this.posterImage = ''
			this.headerTitle = headerTitle
			this.brandList = brandList
			// this.topDesc = topDesc
			// this.logo = logo
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
							// console.log(this.posterImage)
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
		width: 622upx;
		border-radius: 32upx;
	}
}

.canvas-el {
	position: absolute;
	z-index: -1;
}
</style>
