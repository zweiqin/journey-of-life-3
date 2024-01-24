<template>
	<tui-popup :duration="500" :mode-class="[ 'fade' ]" :styles="styles" :show="popupVisible">
		<view class="poster-container">
			<view style="max-height: 75vh;overflow-y: auto;">
				<image v-show="posterImage" class="poster-iamge" :src="posterImage" mode="widthFix" />
				<l-painter v-show="!posterImage" ref="painter" is-canvas-to-temp-file-path @done="handlePainterSuccess">
					<!-- :css="{
						background: `url('../../../../static/images/new-business/order/orange-white-bg.png') no-repeat center top/cover`,
						}"
						background: backgroundImageContainer,
						border-radius: 20rpx;
						css="background-image: url('../../../../static/images/new-business/order/orange-white-bg.png') no-repeat center top/cover;" -->
					<!-- <l-painter-image
						:src="require('../../../../static/images/new-business/order/orange-white-bg.png')"
						css="object-fit: cover;width: 100%;position: absolute;top: 0;left: 0;"
						/> -->
					<l-painter-view
						css="background: linear-gradient(,#fb7338 0%, #ef530e 100%);border-radius: 20rpx;box-sizing: border-box;"
					>
						<l-painter-view css="padding: 24rpx 40rpx;">
							<l-painter-view css="width: 600rpx;margin-top: 10rpx;">
								<l-painter-view css="width: 600rpx;">
									<l-painter-text
										:text="headerTitle"
										css="paddingTop: 64rpx;color: #ffffff;fontSize: 36rpx;fontWeight: bold;"
									/>
								</l-painter-view>
							</l-painter-view>

							<l-painter-view
								css="padding: 30rpx 28rpx;margin-top: 45rpx;background-color: #ffffff;border-radius: 20rpx;"
							>
								<l-painter-view>
									<l-painter-view css="display: flex;align-items: center;">
										<l-painter-image
											:src="common.seamingImgUrl(brandDetail.shopLogo)"
											css="diaplay: inline-block;width: 96rpx;height: 96rpx;margin-right: 24rpx;object-fit: contain;border-radius: 50%;"
										/>
										<l-painter-view css="diaplay: inline-block;font-size: 24rpx;color: #969699;">
											<l-painter-view>
												<l-painter-text
													:text="brandDetail.shopName || '--'"
													css="font-size: 30rpx;color: #333;font-weight: bold;"
												></l-painter-text>
											</l-painter-view>
											<l-painter-view css="margin-top: 8rpx;">
												<l-painter-text text="▣" css="font-size: 20rpx;color: #ff6619;"></l-painter-text>
												<l-painter-text
													text="实名认证"
													css="margin-left: 10rpx;line-height: 40rpx;vertical-align: top;"
												></l-painter-text>
											</l-painter-view>
											<l-painter-view css="margin-top: 8rpx;">
												<l-painter-text text="店铺评分：" css="color: #969699;"></l-painter-text>
												<l-painter-text :text="brandDetail.score" css="color: #303030;"></l-painter-text>
												<l-painter-text text="月售：" css="margin-left: 42rpx;color: #969699;"></l-painter-text>
												<l-painter-text :text="brandDetail.monthlySales" css="color: #303030;"></l-painter-text>
											</l-painter-view>
										</l-painter-view>
									</l-painter-view>

									<l-painter-view css="margin-top: 12rpx;font-size: 24rpx;">
										<l-painter-text text="⊙" css="margin-left: 4rpx;"></l-painter-text>
										<l-painter-text :text="brandDetail.distance" css="margin-left: 4rpx;"></l-painter-text>
										<l-painter-text
											:text="brandDetail.shopAdress && brandDetail.shopAdress.length > 10 ? `${brandDetail.shopAdress.slice(0, 10)}...` : brandDetail.shopAdress"
											css="margin-left: 30rpx;"
										></l-painter-text>
										<l-painter-text text="导航" css="margin-left: 64rpx;font-weight: bold;color: #EF530E;"></l-painter-text>
									</l-painter-view>
								</l-painter-view>

								<l-painter-view css="margin-top: 58rpx;margin-bottom: 30rpx;font-size: 28rpx;color: #222229;">
									<l-painter-view css="font-weight: bold;">
										<l-painter-text text="●" css="color: #e02208;"></l-painter-text>
										<l-painter-text :text="`商品信息（${goodsList.length}）`" css="margin-left: 8rpx;"></l-painter-text>
									</l-painter-view>
									<l-painter-view css="margin-top: 24rpx;">
										<l-painter-view
											v-for="(item, index) in goodsList" :key="index"
											css="max-width: 450rpx;display: flex;align-items: center;margin-bottom: 24rpx;"
										>
											<l-painter-view>
												<l-painter-image
													:src="common.seamingImgUrl(item.image)"
													css="width: 90rpx;height: 90rpx;border-radius: 10rpx;margin-right: 30rpx;"
												/>
												<l-painter-text
													:text="item.productName && item.productName.length > 10 ? `${item.productName.slice(0, 10)}...` : item.productName"
													css="line-height: 90rpx;vertical-align: middle;"
												></l-painter-text>
											</l-painter-view>
											<l-painter-text :text="`￥${item.price}`" css="flex: 1;margin-left: 10rpx;"></l-painter-text>
										</l-painter-view>
									</l-painter-view>
								</l-painter-view>
							</l-painter-view>
						</l-painter-view>

						<l-painter-view css="display: flex;align-items: center;margin-bottom: 24rpx;">
							<l-painter-view css="width: 320rpx;text-align: center;color: #000000;font-size: 28rpx;">
								<l-painter-view>
									<l-painter-text text="下单享优惠！"></l-painter-text>
								</l-painter-view>
								<l-painter-view>
									<l-painter-text text="分享得福利！"></l-painter-text>
								</l-painter-view>
								<l-painter-view>
									<l-painter-text text="赶快行动吧！！"></l-painter-text>
								</l-painter-view>
							</l-painter-view>
							<l-painter-view css="width: 280rpx;text-align: right;margin-left: 10rpx">
								<l-painter-image :src="shareCode" css="width: 280rpx;height: 280rpx"></l-painter-image>
							</l-painter-view>
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
	name: 'ShopCommodityPoster',
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
			// backgroundImageContainer: require('../../../../static/images/new-business/order/orange-white-bg.png'),
			headerTitle: '',
			brandDetail: {},
			goodsList: [],
			shareCode: null
		}
	},

	methods: {
		show({ headerTitle, brandDetail, goodsList, shareCode }) {
			this.posterImage = ''
			this.headerTitle = headerTitle
			this.brandDetail = brandDetail
			this.goodsList = goodsList
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
