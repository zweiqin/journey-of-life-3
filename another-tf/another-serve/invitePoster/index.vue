<template>
	<view class="invitePoster-box">
		<JHeader title="生成邀请海报" width="50" height="50"></JHeader>
		<view class="poster-box flex-items-plus flex-column">
			<image class="header-img mar-top-10" :src="common.seamingImgUrl(data.headImage)"></image>
			<label class="mar-top-30">发现一件好物，快来和我一起拼</label>
			<image class="poster-img mar-top-50" :src="common.seamingImgUrl(data.image)"></image>
			<view class="flex-row-plus flex-sp-between mar-top-40">
				<view class="flex-column-plus">
					<label class="title-lab fs28">{{ data.productName }}</label>
					<view class="spellNum flex-items-plus font-color-C5AA7B mar-top-30 fs24">{{ data.person }}人团</view>
					<view class="flex-row-plus mar-top-20 flex-items">
						<label class="font-color-C5AA7B fs24">¥</label>
						<label class="font-color-C5AA7B fs36 mar-left-5">{{ data.price }}</label>
						<label class="font-color-999 fs26 mar-left-20">原价：¥{{ data.originalPrice }}</label>
					</view>
				</view>
				<view class="flex-column-plus flex-items-plus">
					<image style="width: 180rpx;height: 180rpx;" :src="qrcode"></image>
					<label class="font-color-666">扫描二维码</label>
				</view>
			</view>
			<!-- #ifndef H5 -->
			<view class="saveposter-but flex-items-plus mar-top-50" @click="savePoster(1)">
				保存海报
			</view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="saveposter-but flex-items-plus mar-top-50" @click="savePoster(2)">
				预览海报
			</view>
			<!-- #endif -->
		</view>
		<view class="bor-reu-8 pad-bot-30 canvas-box">
			<canvas id="posterCanvas" style="width: 375px; height: 560px;" canvas-id="posterCanvas"></canvas>
		</view>
	</view>
</template>

<script>
// import { base64ToPath } from 'image-tools'
import { getShareWorkApi } from '../../../api/anotherTFInterface'

export default {
	name: 'InvitePoster',
	data() {
		return {
			data: {},
			canvasWidth: 0,
			codeImg: '',
			codeImg2: '',
			headImage: '',
			image: '',
			qrcode: '',
			qrcodeimg: '',
			loadingQrcode: true
		}
	},
	onLoad(options) {
		this.data = JSON.parse(options.data)
		this.getShare()
	},
	methods: {
		savePoster(type) {
			if (this.loadingQrcode) {
				uni.showToast({
					icon: 'none',
					title: '请稍等,正在生成二维码...'
				})
				return
			}
			uni.showLoading()
			if (type == 1) {
				// uni.showLoading({
				//   mask: true,
				// 	title:"生成图片中..."
				// })
				const that = this
				setTimeout(() => {
					// #ifdef H5 || MP-WEIXIN || APP-PLUS
					uni.canvasToTempFilePath({ // 把画布转化成临时文件进行保存
						fileType: 'png', // 保存成的文件类型
						quality: 0, // 图片质量
						canvasId: 'posterCanvas', // 画布ID
						success: (res) => {
							uni.hideLoading()
							that.saveDownload(res.tempFilePath)
						},
						fail: () => {
							uni.showToast({
								title: '保存失败，稍后再试',
								duration: 2000,
								icon: 'none'
							})
							uni.hideLoading()
						}
					})
					// #endif
					// #ifdef MP-ALIPAY
					const CanvasContext = my.createCanvasContext('posterCanvas')
					CanvasContext.toTempFilePath({
						success: (res) => {
							my.saveImage({
								url: res.apFilePath,
								success: (res) => {
									uni.hideLoading()
									uni.showToast({
										title: '图片保存成功~',
										duration: 2000
									})
								},
								fail: (err) => {
									console.error('saveImage err', err)
								}
							})
						},
						fail: () => {
							uni.hideLoading()
							uni.showToast({
								title: '保存失败，稍后再试',
								duration: 2000,
								icon: 'none'
							})
						}
					})
					// #endif
				}, 5000)
			} else if (type == 2) {
				// uni.showLoading({
				//   mask: true,
				// 	title:"图片生成中..."
				// })
				setTimeout(() => {
					uni.canvasToTempFilePath({ // 把画布转化成临时文件进行保存
						fileType: 'png', // 保存成的文件类型
						quality: 0, // 图片质量
						canvasId: 'posterCanvas', // 画布ID
						success: (res) => {
							console.log(res.tempFilePath)
							uni.downloadFile({
								url: res.tempFilePath, // 网络路径，下载下来
								success: (res1) => {
									uni.hideLoading()
									if (res1.statusCode === 200) {
										uni.showModal({
											title: '提示',
											content: '长按即可保存图片',
											confirmText: '确定',
											cancelText: '取消',
											success: (res2) => {
												if (res2.confirm) {
													uni.previewImage({
														current: res1.tempFilePath, // 当前显示图片的http链接
														urls: [ res1.tempFilePath ] // 需要预览的图片http链接列表
													})
												}
											}
										})
									}
								}
							})
						},
						fail: (err) => {
							uni.hideLoading()
							uni.showToast({
								title: '保存失败，稍后再试',
								duration: 2000,
								icon: 'none'
							})
						}
					})
				}, 5000)
			}
		},
		saveDownload(file) {
			const that = this
			// uni.showLoading({
			// mask: true,
			// 			title:"图片保存中..."
			// 		})
			uni.showLoading()
			uni.getImageInfo({
				src: file,
				success: (res1) => {
					// 2-保存图片至相册
					uni.saveImageToPhotosAlbum({ // 存成图片至手机
						filePath: res1.path, // 画布保存的图片临时文件
						success: (res2) => {
							uni.hideLoading()
							uni.showToast({
								title: '图片保存成功~',
								duration: 2000
							})
						},
						fail: (res3) => {
							uni.hideLoading()
							if (res3.errMsg === 'saveImageToPhotosAlbum:fail auth deny') {
								// that.$store.dispatch('SetPhoneShow', 1)
								uni.showToast({
									title: '保存失败，请检查是否授权小程序保存图片！',
									duration: 3000,
									icon: 'none'
								})
							} else {
								uni.showToast({
									title: '保存失败，稍后再试',
									duration: 2000,
									icon: 'none'
								})
							}
						}
					})
				}
			})
		},
		getShare() {
			getShareWorkApi({
				collageId: this.data.collageId,
				orderId: this.data.orderId,
				productId: this.data.productId,
				skuId: this.data.skuId,
				type: 0
			})
				.then((res) => {
					// #ifndef MP-WEIXIN
					this.qrcode = res.data.qrcode
					// #endif
					// #ifdef MP-WEIXIN
					this.qrcode = res.data.xcxQrcode
					// #endif
					this.getCanvas()
					this.loadingQrcode = false
				})
		},
		getCanvas() {
			const that = this
			// #ifndef MP-WEIXIN
			uni.getImageInfo({
				src: that.data.headImage,
				success(image) {
					that.headImage = image.path
					uni.getImageInfo({
						src: that.data.image,
						success(image2) {
							that.image = image2.path
							uni.getImageInfo({
								src: that.qrcode,
								success(image3) {
									that.qrcodeimg = image3.path
									setTimeout(() => {
										var ctx = uni.createCanvasContext('posterCanvas')
										ctx.setFillStyle('#FFFFFF')
										ctx.fillRect(0, 0, 375, 560)
										// ctx.drawImage(that.data.headImage, 0, 0, 150, 100)
										that.drawRound(ctx, 25, 160, 28, that.headImage)
										ctx.setFontSize(14)
										ctx.setFillStyle('#333333')
										ctx.fillText('发现一件好物，快来和我一起拼', 89, 120)
										ctx.drawImage(that.image, 25, 150, 310, 200)
										ctx.setFontSize(14)
										ctx.setFillStyle('#333333')
										ctx.fillText(that.data.productName, 40, 390)
										ctx.setFontSize(14)
										ctx.setFillStyle('#C5AA7B')
										ctx.fillText(that.data.person + '人团', 40, 430)
										ctx.setFontSize(24)
										ctx.setFillStyle('#C5AA7B')
										ctx.fillText('¥' + that.data.price, 40, 470)
										ctx.setFontSize(14)
										ctx.setFillStyle('#999999')
										ctx.fillText('原价：¥' + that.data.originalPrice, 120, 468)
										ctx.drawImage(that.qrcodeimg, 245, 370, 80, 80)
										ctx.setFontSize(14)
										ctx.setStrokeStyle('#666666')
										ctx.fillText('扫描二维码', 250, 468)
										ctx.draw()
									}, 1500)
								}
							})
						}
					})
				}
			})
			// #endif
			// #ifdef MP-WEIXIN

			uni.getImageInfo({
				src: that.data.image,
				success(image2) {
					that.image = image2.path
					uni.getImageInfo({
						src: that.qrcode,
						success(image3) {
							that.qrcodeimg = image3.path
							setTimeout(() => {
								var ctx = uni.createCanvasContext('posterCanvas')
								ctx.setFillStyle('#FFFFFF')
								ctx.fillRect(0, 0, 375, 560)
								// ctx.drawImage(that.data.headImage, 0, 0, 150, 100)
								// that.drawRound(ctx, 25, 160, 28, that.headImage)
								ctx.setFontSize(14)
								ctx.setFillStyle('#333333')
								ctx.fillText('发现一件好物，快来和我一起拼', 89, 120)
								ctx.drawImage(that.image, 25, 150, 310, 200)
								ctx.setFontSize(14)
								ctx.setFillStyle('#333333')
								let newStr = ''; let startPartIndex = 0
								for (let i = 0; i < that.data.productName.length; i++) {
									if (i % 14 === 0) {
										newStr += that.data.productName.slice(startPartIndex, i) + '\n'
										startPartIndex = i
									}
									if (i === that.data.productName.length - 1) newStr += that.data.productName.slice(startPartIndex)
								}
								const productNameArr = newStr.split('\n').filter((item) => item)
								productNameArr.forEach((productNameItem, productNameIndex) => {
									const y = 390 + (productNameIndex * 22)
									ctx.fillText(productNameItem, 40, y)
								})
								ctx.setFontSize(14)
								ctx.setFillStyle('#C5AA7B')
								ctx.fillText(that.data.person + '人团', 40, 430 + ((productNameArr.length - 1) * 22))
								ctx.setFontSize(24)
								ctx.setFillStyle('#C5AA7B')
								ctx.fillText('¥' + that.data.price, 40, 470 + ((productNameArr.length - 1) * 22))
								ctx.setFontSize(14)
								ctx.setFillStyle('#999999')
								ctx.fillText('原价：¥' + that.data.originalPrice, 120, 468 + ((productNameArr.length - 1) * 22))
								ctx.drawImage(that.qrcodeimg, 245, 370 + (productNameArr.length - 1) * 22, 80, 80)
								ctx.setFontSize(14)
								ctx.setStrokeStyle('#666666')
								ctx.fillText('扫描二维码', 250, 468 + (productNameArr.length - 1) * 22)
								ctx.draw()
							}, 1500)
						}
					})
				}
			})
			// #endif
		},
		exportImg() {
			uni.canvasToTempFilePath({
				fileType: 'jpg',
				canvasId: 'couponQrcode',
				success(res) {
					const that = this
					// 在H5平台下，tempFilePath 为 base64
					// #ifndef H5
					that.codeImg = res.tempFilePath
					// #endif
					// #ifdef H5
					base64ToPath(res.tempFilePath).then((path) => {
						that.codeImg = path
					})
					// #endif
				}
			})
		},
		drawRound(ctx, r, x, y, img) {
			ctx.save() // 保存之前的
			var r = r // 半径*屏幕分辨率比例
			var d = 2 * r // 直径
			var cx = x + r // 圆弧坐标x
			var cy = y + r // 圆弧坐标 y
			ctx.arc(cx, cy, r, 0, 2 * Math.PI)
			ctx.clip() // 裁剪
			ctx.drawImage(img, x, y, d, d) // 画头像
			ctx.restore() // 返回上一状态
		}
	}
}
</script>

<style lang="less" scoped>

.invitePoster-box {
	min-height: 100vh;
	background-color: #F7F7F7;
	box-sizing: border-box;

	/deep/ .j-header-wrapper {
		padding: 24rpx 0 0;
	}

	.bor-reu-8 {
		border-radius: 8rpx;
	}

	.poster-box {
		background-color: #FFFFFF;
		margin: 30rpx 30rpx;
		// width: 690rpx;
		padding: 40rpx 34rpx;
		border-radius: 8rpx;

		.header-img {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
		}

		.poster-img {
			width: 100%;
			height: 414rpx;
		}

		.title-lab {
			width: 400rpx;
		}

		.spellNum {
			background-color: #FFEDDF;
			border-radius: 22rpx;
			width: 144rpx;
			height: 44rpx;
		}

		.saveposter-but {
			border-radius: 5rpx;
			background-color: #C5AA7B;
			color: #FFFFFF;
			width: 420rpx;
			height: 66rpx;
		}
	}
}

.canvas-box {
	position: absolute;
	top: -88888rpx;
}
</style>
