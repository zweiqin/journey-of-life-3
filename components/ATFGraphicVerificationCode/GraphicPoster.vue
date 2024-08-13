<template>
	<view class="poster-container" :style="{ display: isOpenFrame ? 'block' : 'none', height }">
		<view
			v-if="isShowPic"
			style="width: 256rpx;max-height: 64rpx;overflow-y: auto;"
		>
			<image
				v-show="posterImage" style="width: 256rpx;height: 64rpx;" :src="posterImage" mode="scaleToFill"
			/>

			<l-painter v-show="!posterImage" ref="painter" is-canvas-to-temp-file-path @done="handleGenerateSuccess">
				<l-painter-view
					:css="`position: relative;width: 256rpx;height: 64rpx;box-sizing: border-box;background-color: ${backgroundColor};`"
				>
					<!-- rotate不生效？ -->
					<l-painter-view
						v-for="(item, index) in generatedCodeList" :key="index"
						:css="`position: absolute;top: ${item.top};left: ${item.left};width: 64rpx;height: 64rpx;box-sizing: border-box;transform-style: preserve-3d;perspective: 10000px;transform: rotateZ(${item.rotate}) translateX(-${item.fontSize / 2}rpx) translateY(-${item.fontSize / 2}rpx);`"
					>
						<l-painter-text
							:text="item.text"
							:css="`font-size: ${item.fontSize}rpx;font-weight: ${item.fontWeight};font-style: ${item.fontStyle};color: ${item.color};`"
						/>
					</l-painter-view>
					<l-painter-view
						:css="`position: absolute;top: ${lineTop}rpx;left: ${lineLeft}rpx;width: 888rpx;height: 66rpx;border-radius: 50%;border-bottom: 1rpx solid #000000;transform: translateX(-444rpx)`"
					>
					</l-painter-view>
				</l-painter-view>
			</l-painter>

		</view>
	</view>
</template>

<script>
export default {
	name: 'GraphicPoster',
	props: {
		isOpenFrame: {
			type: Boolean,
			default: true
		},
		height: {
			type: String,
			default: '0'
		}
	},
	data() {
		return {
			isShowPic: false,
			posterImage: '',
			generatedCodeList: [],
			handleGenerateSuccess: () => {},
			// 其它样式
			backgroundColor: '',
			lineTop: '',
			lineLeft: ''

		}
	},
	created() {
	},

	methods: {
		handleGenerateCode() {
			uni.showLoading()
			return new Promise((resolve, reject) => {
				this.handleGenerateSuccess = () => {
					this.$nextTick(() => {
						this.$refs.painter.canvasToTempFilePathSync({
							fileType: 'jpg',
							pathType: 'url',
							quality: 1,
							success: (res) => {
								this.isShowPic = false
								uni.hideLoading()
								resolve(res.tempFilePath)
							},
							fail: (err) => {
								this.isShowPic = false
								uni.hideLoading()
								reject(err)
							}
						})
					})
				}
				const backgroundColorList = ['#ffffff', '#c4c4c4', '#b0e2ff', '#eedfcc', '#e6e6fa', '#ffffe0', '#e0ffff']
				this.backgroundColor = backgroundColorList[Math.floor(Math.random() * backgroundColorList.length)]
				const lineTopList = [0, 3, 6, 9, -3, -6, -9]
				this.lineTop = lineTopList[Math.floor(Math.random() * lineTopList.length)] - 24
				const lineLeftList = [0, 10, 20, 30, 40, -10, -20, -30, -40]
				this.lineLeft = lineLeftList[Math.floor(Math.random() * lineLeftList.length)] + 128
				// 生成码
				const generatedWordCode = this.getRandomWord(1)
				const generatedCharacterCode = this.getRandomCharacter(3)
				const generatedCodeArr = (generatedWordCode + generatedCharacterCode).split('')
				generatedCodeArr.sort(() => Math.random() - 0.5)
				// 宽256rpx，高64rpx，每个空间64rpx
				this.generatedCodeList = generatedCodeArr.map((item, index) => {
					const topArr = [0, 3, 6, 9, -3, -6, -9]
					const leftArr = [0, 3, 6, 9, -3, -6, -9]
					const fontSizeArr = [32, 28, 30, 34, 36]
					const fontWeightArr = ['normal', 'bold']
					const fontStyleArr = ['normal', 'italic']
					const colorArr = ['#000000', '#0000cd', '#8470ff', '#2f4f4f', '#ff4500', '#b22222', '#104e8b']
					const rotateArr = [0, 10, 30, 45, -10, -30, -45]
					return {
						text: item,
						top: topArr[Math.floor(Math.random() * topArr.length)] + 32 + 'rpx',
						left: leftArr[Math.floor(Math.random() * leftArr.length)] + 32 + 64 * index + 'rpx',
						fontSize: fontSizeArr[Math.floor(Math.random() * fontSizeArr.length)],
						fontWeight: fontWeightArr[Math.floor(Math.random() * fontWeightArr.length)],
						fontStyle: fontStyleArr[Math.floor(Math.random() * fontStyleArr.length)],
						color: colorArr[Math.floor(Math.random() * colorArr.length)],
						rotate: rotateArr[Math.floor(Math.random() * rotateArr.length)] + 'deg'
					}
				})
				console.log(this.generatedCodeList)
				this.$emit('success', this.generatedCodeList.map((i) => i.text).join(''))
				this.isShowPic = true
				this.$forceUpdate()
			})
		},
		getRandomWord(length) {
			let name = ''
			for (let i = 0; i < length; i++) {
				name += String.fromCharCode(Math.floor(Math.random() * (0x4e00 - 0x9fa5) + 0x9fa5))
			}
			return name
		},
		getRandomCharacter(length) {
			const charStr = 'abacdefghjklmnopqrstuvwxyz0123456789' // abacdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789
			let name = ''
			for (let i = 0; i < length; i++) {
				name += charStr.charAt(Math.floor(Math.random() * charStr.length))
			}
			return name
		},

		// 绘制图片成功
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
		}
	}
}
</script>

<style lang="less" scoped>
.poster-container {
	box-sizing: border-box;
	overflow: hidden;
}
</style>
